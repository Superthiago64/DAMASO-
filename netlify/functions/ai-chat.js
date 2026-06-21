// Proxy seguro hacia OpenAI: la API key vive solo en la variable de entorno
// OPENAI_API_KEY del lado del servidor (Netlify), nunca en el HTML público.
exports.handler = async function(event) {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: JSON.stringify({ error: 'OPENAI_API_KEY no configurada' }) };
    }

    let payload;
    try {
        payload = JSON.parse(event.body || '{}');
    } catch (e) {
        return { statusCode: 400, body: JSON.stringify({ error: 'JSON inválido' }) };
    }

    const messages = Array.isArray(payload.messages) ? payload.messages : [];
    if (messages.length === 0) {
        return { statusCode: 400, body: JSON.stringify({ error: 'messages requerido' }) };
    }

    try {
        const response = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages,
                max_tokens: 800
            })
        });

        if (!response.ok) {
            const errText = await response.text();
            return { statusCode: response.status, body: JSON.stringify({ error: errText }) };
        }

        const data = await response.json();
        const text = data?.choices?.[0]?.message?.content;
        if (!text) {
            return { statusCode: 502, body: JSON.stringify({ error: 'Respuesta vacía de OpenAI' }) };
        }

        return { statusCode: 200, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) };
    } catch (error) {
        return { statusCode: 502, body: JSON.stringify({ error: error.message }) };
    }
};
