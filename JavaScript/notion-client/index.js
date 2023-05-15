import { APIErrorCode, Client } from '@notionhq/client';
import * as dotenv from 'dotenv';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });

try {
    const databaseId = process.env.DATABASE_ID;
    const databaseResponse = await notion.databases.query({
        database_id: databaseId,
        sorts: [
            {
                timestamp: 'created_time',
                direction: 'descending'
            }
        ]
    });

    console.log(databaseResponse);
} catch (error) {
    if (error.code === APIErrorCode.ObjectNotFound) {
        //
        // For example: handle by asking the user to select a different database
        //
    } else {
        // Other error handling code
        console.error(error);
    }
}
