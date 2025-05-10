import { NextApiRequest, NextApiResponse } from 'next';

const handler = (req: NextApiRequest, res: NextApiResponse): void => {
    if (req.method !== 'GET') {
        res.status(400).json({ success: false });
        return;
    }

    const token = req.cookies.token;

    res.status(200).json({ success: true, user: token });
};

export default handler;
