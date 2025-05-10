import fs from 'fs/promises';

export async function POST(req: Request): Promise<Response> {
    try {
        const blob = await req.blob();
        const buffer = await blob.arrayBuffer();

        await fs.writeFile('static/upload.png', Buffer.from(buffer));

        return Response.json({ success: true }, { status: 200 });
    } catch (error) {
        return Response.json({ success: false }, { status: 500 });
    }
}
