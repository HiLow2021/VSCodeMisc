import fs from 'fs';
import fetch from 'node-fetch';

(async () => {
    const buffer = fs.readFileSync('./media/image.png');
    const blob = new Blob([buffer], { type: 'image/png' });
    const data = Array.from(new Uint8Array(await blob.arrayBuffer()));

    const response = await fetch('http://localhost:5000/upload-json', {
        method: 'POST',
        body: JSON.stringify({
            name: 'upload.png',
            data
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        console.log('Succeeded to upload');
    } else {
        console.log('Failed to upload');
    }
})();
