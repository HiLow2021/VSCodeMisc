import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const Config = {
    keyFilename: process.env.KEY_FILENAME || '',
    projectId: process.env.PROJECT_ID || '',
    DeepLAuthKey: process.env.DEEPL_AUTH_KEY || ''
};
