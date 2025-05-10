import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const baseUrl = 'https://vrchat.com/api/1/';
const worldId = 'wrld_4432ea9b-729c-46e3-8eaf-846aa0a37fdd';

const response = await fetch(`${baseUrl}worlds/${worldId}`, {
    headers: {
        cookie: `apiKey=${process.env.VRCHAT_API_KEY}`,
        'User-Agent': 'Mozilla/5.0'
    }
});
const body = await response.text();

console.log(body);
