import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'POST') {
        res.status(400).json({ success: false });
        return;
    }

    res.status(200).setHeader('Set-Cookie', `token=; sameSite=strict; httpOnly=true; maxAge=0`).json({ success: true });
};

export default handler;
