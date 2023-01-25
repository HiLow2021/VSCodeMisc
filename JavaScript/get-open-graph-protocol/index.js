import ogs from 'open-graph-scraper';

const options = { url: 'http://ogp.me/' };
const result = await ogs(options);

console.log('error:', result.error); // This returns true or false. True if there was an error. The error itself is inside the results object.
console.log('result:', result.result); // This contains all of the Open Graph results
console.log('response:', result.response); // This contains the HTML of page
