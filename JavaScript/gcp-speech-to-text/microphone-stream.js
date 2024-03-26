import { SpeechClient } from '@google-cloud/speech';
import recorder from 'node-record-lpcm16';
import { Config } from './config.js';

function start() {
    const config = {
        encoding: 'LINEAR16',
        sampleRateHertz: 16000,
        languageCode: 'ja-JP'
    };
    const request = {
        config,
        interimResults: false
    };

    const options = {
        keyFilename: Config.keyFilename,
        projectId: Config.projectId
    };
    const client = new SpeechClient(options);
    const recognizeStream = client
        .streamingRecognize(request)
        .on('error', console.error)
        .on('data', (data) =>
            process.stdout.write(
                data.results[0] && data.results[0].alternatives[0]
                    ? `Transcription: ${data.results[0].alternatives[0].transcript}\n`
                    : '\n\nReached transcription time limit, press Ctrl+C\n'
            )
        );

    recorder
        .record({
            sampleRateHertz: 16000,
            threshold: 0, // silence threshold
            recordProgram: 'rec', // Try also "arecord" or "sox"
            silence: '0.0' // seconds of silence before ending
        })
        .stream()
        .on('error', console.error)
        .pipe(recognizeStream);

    console.log('Listening, press Ctrl+C to stop.');
}

process.on('unhandledRejection', (err) => {
    console.error(err.message);
    process.exitCode = 1;
});

start();
