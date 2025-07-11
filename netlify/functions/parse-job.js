// exports.handler = async (event, context) => {
//     const { listing } = JSON.parse(event.body);
//     // call OpenAI with process.env.OPENAI_API_KEY…
//     return { statusCode: 200, body: JSON.stringify(data) };
// };
    
exports.handler = async (event, context) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
        return { statusCode: 500, body: "Missing API key" };
    }
    const { listing } = JSON.parse(event.body);

    const response = await fetch("https://api.openai.com/v1/completions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
            model: "text-davinci-003",
            prompt: listing,
            max_tokens: 150
        })
    });

    const data = await response.json();

    return {
        statusCode: 200,
        headers: { "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data),
    };
    };