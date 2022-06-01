## coinbase-oracle-verify (likely unmaintained)

### Scripts

In this repo are two small node scripts:

-  **fetch_cbdata.js:** fetches and prints the current [Coinbase Oracle](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcoinbasepriceoracle) signed price data as JSON, given an API key as environment variables.
-  **decode_cbdata.js:** attempts (sucessfully) to decode the price data, and (now succesfully) to verify the signature and recover the signing public key.

Use `yarn install` or whatever to get the deps and read the comments in the files for other instructions.


### Example data

There are also several JSON files (cbdata?.json) containing example messages and their signatures from the Coinbase API. In these files `messages` is an array of hex encoded Open Oracle messages and `signatures` is a corresponding array of hex encoded signatures for those messages.
