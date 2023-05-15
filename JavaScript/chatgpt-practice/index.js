import { Configuration, OpenAIApi } from 'openai';
import { Config } from './config.js';

const configuration = new Configuration({ apiKey: Config.ApiKey });
const openai = new OpenAIApi(configuration);

const response = await openai.createChatCompletion(
    {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: 'You are an excellent assistant.' },
            { role: 'user', content: 'What is the highest mountain in Japan?' }
        ]
    },
    {
        timeout: 1000 * 60 // 60 seconds
    }
);

console.log(response.data.choices[0].message?.content);
