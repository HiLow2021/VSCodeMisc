import { NextApiRequest, NextApiResponse } from 'next';

type RequestBody = {
    name: string;
    password: string;
};

const correctName = 'admin';
const correctPassword = 'password';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'POST') {
        res.status(400).json({ success: false });
        return;
    }

    const { name, password } = req.body as RequestBody;
    if (name === correctName && password === correctPassword) {
        res.status(200).setHeader('Set-Cookie', `token=${name}; sameSite=strict; httpOnly=true; maxAge=60*60*24`).json({ success: true });
    } else {
        res.status(400).json({ success: false });
    }
};

export default handler;
