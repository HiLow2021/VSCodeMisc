import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config({ path: '.env' });

const client = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

const response = await client.responses.create({
    model: 'o3-mini',
    instructions: 'You are an excellent assistant.',
    input: 'What is the highest mountain in Japan?'
});

console.log(response.output_text);
