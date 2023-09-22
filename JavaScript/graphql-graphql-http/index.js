import express from 'express';
import { createHandler } from 'graphql-http/lib/use/express';
import { schema } from './schema.js';

const app = express();
const port = 4000;

app.all('/graphql', createHandler({ schema }));

app.listen(port, () => {
    console.log(`GraphQL Server is running on http://localhost:${port}/graphql`);
});
