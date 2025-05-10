import { Client, Events, GatewayIntentBits, REST, Routes, SlashCommandBuilder } from 'discord.js';
import { Config } from './config.js';

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const token = Config.DiscordBotToken;
const clientId = Config.DiscordClientId;

await registerCommand();
registerEvent();
await client.login(token);

async function registerCommand() {
    console.log('Started refreshing application (/) commands.');

    const commands = [new SlashCommandBuilder().setName('ping').setDescription('Check Connection').toJSON()];
    const rest = new REST({ version: '10' }).setToken(token);
    await rest.put(Routes.applicationCommands(clientId), { body: commands });

    console.log('Successfully reloaded application (/) commands.');
}

function registerEvent() {
    client.once(Events.ClientReady, (client) => {
        console.log(`Client ready. Logged in as ${client.user.tag}`);
    });

    client.on(Events.MessageCreate, async (message) => {
        if (message.author.bot) {
            return;
        }

        console.log(`Message Create. ${message.content}`);
    });

    client.on(Events.InteractionCreate, async (interaction) => {
        if (!interaction.isCommand()) {
            return;
        }

        await interaction.reply('Ping has succeeded.');
    });
}
