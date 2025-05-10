export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query') || 'default';

    const encoder = new TextEncoder();

    const stream = new ReadableStream({
        async start(controller) {
            for (let i = 0; i < 10; i++) {
                const message = `Data chunk ${i + 1} for query: ${query}\n`;
                controller.enqueue(encoder.encode(`data: ${JSON.stringify({ message })}\n\n`));
                await new Promise((resolve) => setTimeout(resolve, 1000));
            }

            controller.close();
        }
    });

    return new Response(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            Connection: 'keep-alive'
        }
    });
}
