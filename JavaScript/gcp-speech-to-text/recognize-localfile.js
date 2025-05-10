import { SpeechClient } from '@google-cloud/speech';
import fs from 'fs';
import { Config } from './config.js';

async function start() {
    const filename = './media/sample-en.wav';
    const audio = {
        content: fs.readFileSync(filename).toString('base64')
    };
    const config = {
        encoding: 'LINEAR16',
        languageCode: 'en-US',
        audioChannelCount: 2,
        enableSeparateRecognitionPerChannel: true
    };
    const request = {
        audio: audio,
        config: config
    };

    const options = {
        keyFilename: Config.keyFilename,
        projectId: Config.projectId
    };
    const client = new SpeechClient(options);
    const [response] = await client.recognize(request);
    const transcription = response.results.map((result) => result.alternatives[0].transcript).join('\n');
    console.log(`Transcription: ${transcription}`);
}
start();
