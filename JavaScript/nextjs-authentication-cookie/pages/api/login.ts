import { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
    username: string;
    password: string;
};

const correctUsername = 'admin';
const correctPassword = 'password';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(400).json({ success: false });
        return;
    }

    const { username, password } = req.body as RequestBody;
    if (username === correctUsername && password === correctPassword) {
        res.status(200)
            .setHeader('Set-Cookie', `token=${username}; sameSite=strict; httpOnly=true; maxAge=60*60*24`)
            .json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
};

export default handler;
