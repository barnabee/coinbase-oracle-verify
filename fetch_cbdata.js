const crypto = require('crypto');

/* Grabs the latest data from the Coinbase Oracle (ABI encoded signed prices) 
 *
 * Note: you need to run this with `node --experimental-fetch fetch_cbdata.js` or add a fetch(…) shim 
 * Supply your Coinbase API key, secret, and passphrase as environment variables (API_KEY, API_SECRET, API_PASSPHRASE)
 */


const { API_KEY, API_SECRET, API_PASSPHRASE } = process.env;
const API_URL = 'https://api.exchange.coinbase.com'

async function main() {
  const timestamp = (new Date().getTime() / 1000).toString();
  const message = timestamp + 'GET' + '/oracle';
  const hmac = crypto.createHmac('sha256', Buffer.from(API_SECRET, 'base64')).update(message);
  const signature = hmac.digest('base64')
  
  const headers = {
    'CB-ACCESS-SIGN': signature,
    'CB-ACCESS-TIMESTAMP': timestamp,
    'CB-ACCESS-KEY': API_KEY,
    'CB-ACCESS-PASSPHRASE': API_PASSPHRASE
  }
  
  const res = await fetch(API_URL + '/oracle', { method: 'GET', headers });
  process.stdout.write(await res.text());
}

main();
