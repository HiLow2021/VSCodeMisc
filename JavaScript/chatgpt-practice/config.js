import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const Config = {
    ApiKey: process.env.API_KEY || ''
};
