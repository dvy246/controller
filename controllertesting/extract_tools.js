const https = require('https');
const fs = require('fs');

https.get('https://controllertest.io/tools/', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    // Basic regex extraction since it's an Astro page with a consistent format
    // Look for <a href="..."> <h3>Title</h3> <p>Desc</p> </a>
    const matches = data.match(/<a[^>]*href="([^"]+)"[^>]*>.*?<h[23][^>]*>(.*?)<\/h[23]>.*?<p[^>]*>(.*?)<\/p>/gs);
    
    console.log("--- TOOLS EXTRACTED ---");
    if (matches) {
        matches.forEach(m => {
            const link = m.match(/href="([^"]+)"/)[1];
            const title = m.match(/<h[23][^>]*>(.*?)<\/h[23]>/)[1].replace(/<[^>]+>/g, '').trim();
            const desc = m.match(/<p[^>]*>(.*?)<\/p>/)[1].replace(/<[^>]+>/g, '').trim();
            console.log(`- **${title}** (${link}): ${desc}`);
        });
    } else {
        console.log("Regex didn't match perfectly. Dumping the raw translations dictionary.");
        const jsonMatch = data.match(/&quot;tools&quot;:\[0,\{.*?\}\]/g);
        if (jsonMatch) {
            console.log(jsonMatch[0]);
        }
    }
  });
}).on('error', (e) => {
  console.error(e);
});
