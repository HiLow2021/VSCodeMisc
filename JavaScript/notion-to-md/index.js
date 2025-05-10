import { APIErrorCode, Client } from '@notionhq/client';
import * as dotenv from 'dotenv';
import fs from 'fs';
import { NotionToMarkdown } from 'notion-to-md';

dotenv.config();

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const n2m = new NotionToMarkdown({ notionClient: notion });

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

    if (databaseResponse.results.length > 0) {
        const mdblocks = await n2m.pageToMarkdown(databaseResponse.results[0].id);
        const mdString = n2m.toMarkdownString(mdblocks);

        fs.writeFile('out\\result.md', mdString, (err) => {
            if (err != undefined) {
                console.log(err);
            }
        });
    }
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
