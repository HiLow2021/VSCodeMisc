import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== 'GET') {
        res.status(400).json({ success: false });
        return;
    }

    console.log(req.cookies);

    const token = req.cookies.token;

    res.status(200).json({ success: true, user: token });
};

export default handler;
