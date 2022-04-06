const Web3 = require('web3');

// Load sample data
const cbdata1 = require('./cbdata1.json');
const cbdata2 = require('./cbdata2.json');
const cbdata3 = require('./cbdata3.json');

/* Decodes ABI encoded Coinbase Oracle data and attempts to recover the public key and verify the signature
 *
 */


async function decodeAndVerify(data) {
	const { messages, signatures } = data;
	
	const web3 = new Web3()
	for (let i=0; i<messages.length; ++i) {

		// Decode the data — this works just fine and we get extremely reasonable looking data
		data = Object.values(web3.eth.abi.decodeParameters(['string', 'uint', 'string', 'uint'], messages[i])).slice(0, -1);

		// Attempt to recover the signer, if this is 0xfCEAdAFab14d46e20144F48824d0C09B1a03F2BC we think it's "good"
		adr = web3.eth.accounts.recover(web3.utils.keccak256(messages[i]), signatures[i], false); 
		
		// Print what we found...
		console.log(data, adr === '0xfCEAdAFab14d46e20144F48824d0C09B1a03F2BC' ? 'signature OK' : 'BAD signature!');
	}
}


// Print the outputs for some sample data (you can use fetch_cbdata.js to get your own if you have a Coinbase API key)

console.log('cbdata1');
decodeAndVerify(cbdata1);

console.log('\ncbdata2');
decodeAndVerify(cbdata2);

console.log('\ncbdata3');
decodeAndVerify(cbdata3);
