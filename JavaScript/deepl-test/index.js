import translate from 'deepl';
import { Config } from './config.js';

try {
    const response = await translate({
        free_api: true,
        text: 'I am a text',
        target_lang: 'JA',
        auth_key: Config.DeepLAuthKey
        // All optional parameters available in the official documentation can be defined here as well.
    });

    console.log(response.data);
} catch (error) {
    console.error(error);
}
