import fs from 'fs/promises';

export async function GET(): Promise<Response> {
    try {
        const buffer = await fs.readFile('static/download.png');
        const blob = new Blob([buffer], { type: 'image/png' });

        return new Response(blob);
    } catch (error) {
        return Response.json({ success: false }, { status: 500 });
    }
}
