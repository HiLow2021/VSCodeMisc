import fetch from 'node-fetch';

const postal = '100-0001';
const url = `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postal}`;

const response = await fetch(url);

if (response.ok) {
    const data = await response.json();

    console.log(data);
}
