### coinbase-oracle-verify (likely unmaintained)

In this repo are two small node scripts:

-  **fetch_cbdata.js:** fetches and prints the current [Coinbase Oracle](https://docs.cloud.coinbase.com/exchange/reference/exchangerestapi_getcoinbasepriceoracle) signed price data as JSON, given an API key as environment variables.
-  **decode_cbdata.js:** attempts (sucessfully) to decode the price data, and (posssibly unsuccesfully) to verify the signature and recover the signing public key.

Use `yarn install` or whatever to get the deps and read the comments in the files for other instructions.
