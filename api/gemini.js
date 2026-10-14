// Función de servidor (Vercel) para DAMASO AI.
// Recibe las preguntas del chat desde el frontend, llama a Gemini usando
// la API key guardada en la variable de entorno GEMINI_API_KEY (nunca
// expuesta al navegador) y regresa la respuesta a la interfaz.

const GEMINI_MODEL = 'gemini-2.0-flash';

module.exports = async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Método no permitido' });
        return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        res.status(500).json({ error: 'GEMINI_API_KEY no está configurada en el servidor' });
        return;
    }

    let body = req.body;
    if (typeof body === 'string') {
        try { body = JSON.parse(body); } catch (e) { body = {}; }
    }
    const { messages, systemInstruction } = body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
        res.status(400).json({ error: 'Falta "messages"' });
        return;
    }

    const contents = messages.map(m => ({
        role: m.role === 'bot' || m.role === 'model' ? 'model' : 'user',
        parts: [{ text: String(m.text || '').replace(/<[^>]+>/g, '') }]
    }));

    const payload = { contents };
    if (systemInstruction) {
        payload.systemInstruction = { parts: [{ text: String(systemInstruction) }] };
    }

    try {
        const upstream = await fetch(
            `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${apiKey}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            }
        );
        const data = await upstream.json().catch(() => ({}));
        if (!upstream.ok) {
            res.status(upstream.status).json({ error: data?.error?.message || 'Error al conectar con Gemini' });
            return;
        }
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) {
            res.status(502).json({ error: 'Respuesta vacía de Gemini' });
            return;
        }
        res.status(200).json({ text });
    } catch (err) {
        res.status(500).json({ error: err && err.message ? err.message : 'Error interno del servidor' });
    }
};
