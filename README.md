# Crypto Insurance

A simple implementation of blockchain based insurance which uses factory model contracts to deploy as many pools as you need. this contains the most simple implementation of the risk pools. This project also has a test frontend.

## hardhat configuration

Custom scripts have been written to ease the workflow
To run the local node run the following command

```shell
npm run node
```

> note that this will create a different set of wallets every single time. So the wallet has to be configured before every use. to get around this use some other test nets

To run the test scripts run the following command

```shell
npm run test
```

To run the deploy script in local node

```shell
npm run deploy
```

## frontend configuration

make sure to install the packages with `npm i` before running the frontend

To run the frontend use the following command

```shell
cd frontend
npm run dev
```

> get your project id from https://cloud.walletconnect.com/

To update the networks, go to `/frontend/src/app/page.tsx` and update the `chains` array

PLEASE DO NOT USE THIS CODE IN PRODUCATION UNDER ANY CIRCUMSTANCES
