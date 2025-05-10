import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const Config = {
    deepLAuthKey: process.env.DEEPL_AUTH_KEY || ''
};
