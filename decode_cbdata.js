const Web3 = require('web3');
const fs = require('fs');

/* Decodes ABI encoded Coinbase Oracle data and attempts to recover the public key and verify the signature
 *
 * Try: `node decode_cbdata.js < cbdata1.json` OR `node --experimental-fetch fetch_cbdata.js | node decode_cbdata.js`
 */


async function decodeAndVerify(data) {
	const { messages, signatures } = data;
	
	const web3 = new Web3()
	for (let i=0; i<messages.length; ++i) {

		// Decode the data — this works just fine and we get extremely reasonable looking data
		const record = Object.values(web3.eth.abi.decodeParameters(['string', 'uint', 'string', 'uint'], messages[i])).slice(0, -1);

		// Attempt to recover the signer, if this is 0xfCEAdAFab14d46e20144F48824d0C09B1a03F2BC we think it's "good"
		const adr = web3.eth.accounts.recover(web3.utils.keccak256(messages[i]), signatures[i], false); 
		
		// Print what we found...
		console.log(record, adr === '0xfCEAdAFab14d46e20144F48824d0C09B1a03F2BC' ? 'signature OK' : 'BAD signature!');
	}
}


// Decide and verify the signature from standard input (expect JSON in Coinbase Oracle API format)
const inputJson = JSON.parse(fs.readFileSync(0))
decodeAndVerify(inputJson);
