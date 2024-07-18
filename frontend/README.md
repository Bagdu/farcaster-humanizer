# WorldWote frontend

## Requirements
- node.js v18.18.2
- npm 9.8.1
- Metamask extension for your browser (Optimism Goerli network)

## Run

```shell
cd frontend
npm i
npm run start
```

Open http://localhost:3000 in your browser.

You need to have Optimism Goerli network in your Metamask extension.
- Network name: Optimism Goerli
- RPC URL: https://goerli.optimism.io
- Chain ID: 420
- Symbol: ETH
- Block Explorer URL: https://goerli-optimism.etherscan.io

## Voting
1. Connect your Metamask wallet to the app. 
2. Go to Vote page.
3. Choose your candidate and click `Vote` button.
4. Scan QR code with the help of WorldCoin [Simulator](https://simulator.worldcoin.org/) on your mobile device.
5. Confirm transaction in Metamask.

Note: if there is no candidates in the list, 
you can register them on the page http://localhost:3000/dev by clicking `Register Candidates` button.
