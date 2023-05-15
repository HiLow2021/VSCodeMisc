import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const Config = {
    DeepLAuthKey: process.env.DEEPL_AUTH_KEY || ''
};
