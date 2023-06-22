import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

export const Config = {
    DiscordBotToken: process.env.DISCORD_BOT_TOKEN || '',
    DiscordClientId: process.env.DISCORD_CLIENT_ID || ''
};
