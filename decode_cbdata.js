const Web3 = require('web3');

// Load sample data
const cbdata1 = require('./cbdata1.json');
const cbdata2 = require('./cbdata2.json');
const cbdata3 = require('./cbdata3.json');

/* Decodes ABI encoded Coinbase Oracle data and attempts to recover the public key and veirfy the signature
 *
 * ABI decoding works great, I am pretty unsure about the pubkey recovry and verification though...
 */


async function decodeAndVerify(data) {
	const { messages, signatures } = data;
	
	const web3 = new Web3()
	for (let i=0; i<messages.length; ++i) {

		// Decode the data — this works just fine and we get extremely reasonable looking data
		data = Object.values(web3.eth.abi.decodeParameters(['string', 'uint', 'string', 'uint'], messages[i])).slice(0, -1);

		// Attempt to recover the signer (I think this should also verify the sig but haven't been able to confirm):
		// - 3rd arg is whether or not message is prefixed Ethereum signed data. I do not know the answer to this question, but I suspect not, and changing it doesn't help so far.
		adr = web3.eth.accounts.recover(messages[i], signatures[i], false); 
		
		// Print what we found...
		console.log(data, 'signed by', adr);
	}
}


// Print the outputs for some sample data (you can use fetch_cbdata.js to get your own if you have a Coinbase API key)

// I would have more confidence in the signature recovery if I *ever* saw the same address/pubkey twice! Not only do we get different pubkeys for every ticker but also each time we get updated prices ALL the pubkeys seem to change. It looks like random noise to me at this point and I have no idea what is wrong :(

console.log('cbdata1');
decodeAndVerify(cbdata1);

console.log('\ncbdata2');
decodeAndVerify(cbdata2);

console.log('\ncbdata3');
decodeAndVerify(cbdata3);
