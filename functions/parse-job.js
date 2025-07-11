exports.handler = async (event, context) => {
    const { listing } = JSON.parse(event.body);
    // call OpenAI with process.env.OPENAI_API_KEY…
    return { statusCode: 200, body: JSON.stringify(data) };
    };