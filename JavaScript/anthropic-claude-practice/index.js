import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY
});

const message = await anthropic.messages.create({
    model: 'claude-3-5-haiku-latest',
    max_tokens: 8192,
    temperature: 1,
    system: 'You are an excellent assistant.',
    messages: [
        {
            role: 'user',
            content: [
                {
                    type: 'text',
                    text: 'What is the biggest lake in Japan?'
                }
            ]
        }
    ]
});

console.log(message);
