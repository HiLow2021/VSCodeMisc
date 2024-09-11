import fs from 'fs';
import fetch from 'node-fetch';

(async () => {
    const buffer = fs.readFileSync('./media/image.png');
    const blob = new Blob([buffer], { type: 'image/png' });

    const formData = new FormData();
    formData.append('file', blob);
    formData.append('name', 'upload.png');

    const response = await fetch('http://localhost:5000/upload-file', {
        method: 'POST',
        body: formData
    });

    if (response.ok) {
        console.log('Succeeded to upload');
    } else {
        console.log('Failed to upload');
    }
})();
