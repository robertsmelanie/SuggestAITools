// File: api/parse-job.js
// A Vercel Serverless Function to parse a job listing using OpenAI's Chat API

import OpenAI from 'openai';

// Initialize the OpenAI client with your API key
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { listing } = req.body;
        if (!listing) {
            return res.status(400).json({ error: 'Missing job listing in request body.' });
        }

        // Construct the master prompt
        const prompt = `You are an expert freelance-advisor assistant. 
Given the following job listing, extract and return exactly a JSON object with these fields:

1. tasks: An array of concise task strings the freelancer must perform.
2. tools: An array of objects, each with name, benefit, and link.
3. manual_hours: Estimated total hours if done entirely by hand.
4. ai_hours: Estimated total hours if using the above AI tools.
5. market_rate: A suggested $/hr rate based on industry benchmarks (round to nearest dollar).
6. tool_costs: Estimated monthly subscription cost for these tools (round to nearest dollar).

Return only valid JSON. Do not include any other text.

---
Job Listing:
\"\"\"
${listing}
\"\"\"`;

        // Call the OpenAI Chat Completion API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            temperature: 0.2
        });

        // Parse the JSON reply
        const reply = completion.choices[0].message.content;
        let data;
        try {
            data = JSON.parse(reply);
        } catch (parseErr) {
            return res.status(500).json({
                error: 'Failed to parse JSON from OpenAI response.',
                response: reply
            });
        }

        // Return structured JSON to the frontend
        return res.status(200).json(data);

    } catch (err) {
        console.error('Error in parse-job function:', err);
        return res.status(500).json({ error: 'Internal server error.' });
    }
}