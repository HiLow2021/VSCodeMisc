import * as dotenv from 'dotenv';
import fetch from 'node-fetch';

dotenv.config();

const webhookUrl = process.env.WEBHOOK_URL;
const response = await fetch(webhookUrl, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        attachments: [
            {
                color: '#DD0000',
                blocks: [
                    {
                        type: 'header',
                        text: {
                            type: 'plain_text',
                            text: ':exclamation:Header',
                            emoji: true
                        }
                    },
                    {
                        type: 'divider'
                    },
                    {
                        type: 'section',
                        text: {
                            type: 'mrkdwn',
                            text: 'Plain\n*Emphasis*\n~Strikethrough~\n<https://google.com|Link>\n:sunny::cloud::rain_cloud::crescent_moon:'
                        },
                        accessory: {
                            type: 'image',
                            image_url: 'https://s3-media3.fl.yelpcdn.com/bphoto/c7ed05m9lC2EmA3Aruue7A/o.jpg',
                            alt_text: 'alt text for image'
                        }
                    },
                    {
                        type: 'divider'
                    }
                ]
            }
        ]
    })
});

console.log(response.statusText);
