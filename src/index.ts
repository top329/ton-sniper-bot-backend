import express, { Express, Request, Response } from 'express';
import http from 'http';
import axios from 'axios';
import TonWeb from 'tonweb';
import { StonApiClient } from '@ston-fi/api';
import { Router, ROUTER_REVISION, ROUTER_REVISION_ADDRESS } from '@ston-fi/sdk';
import { libNode } from '@tonclient/lib-node';
import {
  SortDirection,
  TonClient,
  ParamsOfSubscribe,
  ParamsOfSubscribeCollection,
} from '@tonclient/core';
import { Readable } from 'stream';
import WebSocket from 'ws';

const _client = new StonApiClient();

TonClient.useBinaryLibrary(libNode);
const client = new TonClient({
  network: {
    endpoints: ['https://toncenter.com/api/v2/jsonRPC'],
  },
});

const port = process.env.PORT || 5000;

const app: Express = express();
const server = http.createServer(app);
const ws = new WebSocket('wss://tonapi.io/v2/websocket', {
  headers: {
    Authorization:
      'Bearer AHC4IYTEMUOMVZYAAAACRCIPDXYY3OMJHLYG4G4KAFMYAY4YHGS5TGCXQJKWQEJA7HDESSY',
  },
});

// ws.on('open', () => {
//   // Subscribe to the "subscribe_mempool" method
//   const subscribeRequest = {
//     id: 1,
//     jsonrpc: '2.0',
//     method: 'subscribe_mempool',
//   };

//   ws.send(JSON.stringify(subscribeRequest));
// });

// ws.on('message', async (data) => {
//   try {
//     const message = JSON.parse(data.toString());
//     // console.log('WebSocket message received:', message);

//     // Handle different types of messages, e.g., mempool_message events
//     if (message.method === 'mempool_message') {
//       const bocData = message.params.boc;
//       // Process the mempool message data as needed
//       // console.log('Received mempool message:', await decodeBoCData(bocData));
//       const decodedData = await decodeBoCData(bocData);
//       if (decodedData !== null) {
//         // if (decodedData.parsed.dst === ROUTER_REVISION_ADDRESS) {
//         //   console.log('Message to router:', decodedData);
//         // }
//         const bounceableAddress = await client.utils.convert_address({
//           address: decodedData.parsed.dst,
//           output_format: {
//             type: 'Base64',
//             url: false,
//             test: false,
//             bounce: true,
//           },
//         });
//         console.log(bounceableAddress.address);
//         if (bounceableAddress.address === ROUTER_REVISION_ADDRESS.V1) {
//           console.log(decodedData);
//         }
//         // ws.send(JSON.stringify(decodedData));
//       }
//     }
//   } catch (err) {
//     console.log(err);
//   }
// });

// ws.on('error', (error) => {
//   console.error('WebSocket Error:', error);
// });

// const wss = new WebSocket.Server({ server });

// wss.on('connection', (ws) => {
//   ws.on('message', async (message) => {
//     try {
//       const data = JSON.parse(message.toString());
//       console.log('WebSocket message received:', data);
//       if (data.method === 'subscribe_mempool') {
//         ws.send(
//           JSON.stringify({
//             method: 'subscribe_mempool',
//             result: 'success! you have subscribed to mempool',
//           }),
//         );
//       }
//     } catch (error) {
//       console.error('WebSocket Error:', error);
//     }
//   });
// });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Replace with the address of the token pair factory contract
const tokenPairFactoryAddress = '...';

// Subscribe to new transactions in the mempool
client.net.subscribe_collection({
  collection: 'transactions',
  filter: {
    src: { eq: tokenPairFactoryAddress },
  },
  result: 'id,src,data',
});

async function decodeBoCData(bocData: string) {
  try {
    const decodedData = await client.boc.parse_message({ boc: bocData });
    // console.log(decodedData);
    return decodedData;
  } catch (error) {
    console.error('Error decoding BoC data:', error);
    return null;
  }
}

app.get('/monitor', async (req, res) => {
  try {
    // Get the latest block
    const { result } = await client.net.query_collection({
      collection: 'blocks_signatures',
      result: 'id,seq_no',
      order: [{ path: 'seq_no', direction: SortDirection.DESC }],
      limit: 1,
    });

    const latestBlock = result[0];

    // Get the transactions in the latest block
    const { result: transactions } = await client.net.query_collection({
      collection: 'transactions',
      filter: { block_id: { eq: latestBlock.id } },
      result: 'id,account_addr,lt',
    });

    // Send the transactions as the response
    res.json(transactions);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send('An error occurred while monitoring the TON blockchain.');
  }
});

const swap = async () => {
  const WALLET_ADDRESS = 'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi'; // ! replace with your address
  const JETTON0 = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c'; // TON
  const JETTON1 = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs'; // USDT

  const provider = new TonWeb.HttpProvider(
    'https://toncenter.com/api/v2/jsonRPC',
    {
      apiKey:
        'f5ab31973aad609dda3dd212b552f842a616f2a866b46eb3085c15038864bedb',
    },
  );
  console.log('Provider: ', provider);

  const router = new Router(provider, {
    revision: ROUTER_REVISION.V1,
    address: ROUTER_REVISION_ADDRESS.V1,
  });
  console.log('Router: ', router);

  // transaction to swap 1.0 JETTON0 to JETTON1 but not less than 1 nano JETTON1
  const swapTxParams = await router.buildSwapJettonTxParams({
    // address of the wallet that holds offerJetton you want to swap
    userWalletAddress: WALLET_ADDRESS,
    // address of the jetton you want to swap
    offerJettonAddress: JETTON0,
    // amount of the jetton you want to swap
    offerAmount: new TonWeb.utils.BN('1000000'),
    // address of the jetton you want to receive
    askJettonAddress: JETTON1,
    // minimal amount of the jetton you want to receive as a result of the swap.
    // If the amount of the jetton you want to receive is less than minAskAmount
    // the transaction will bounce
    minAskAmount: 0,
    // query id to identify your transaction in the blockchain (optional)
    queryId: 12345,
    // address of the wallet to receive the referral fee (optional)
    referralAddress: undefined,
  });

  // to execute the transaction you need to send transaction to the blockchain
  // (replace with your wallet implementation, logging is used for demonstration purposes)
  console.log({
    to: swapTxParams.to,
    amount: swapTxParams.gasAmount,
    payload: swapTxParams.payload,
  });

  // reverse transaction is the same,
  // you just need to swap `offerJettonAddress` and `askJettonAddress` values
  // and adjust `offerAmount` and `minAskAmount` accordingly
};

app.get('/mempool-stream', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
    const streamMempoolData = async () => {
      const response = await axios.get('https://tonapi.io/v2/sse/mempool', {
        headers: {
          Authorization:
            'Bearer AHC4IYTEMUOMVZYAAAACRCIPDXYY3OMJHLYG4G4KAFMYAY4YHGS5TGCXQJKWQEJA7HDESSY',
        },
        responseType: 'stream',
      });

      // response.data.pipe(res);
      response.data.on('data', async (chunk: any) => {
        try {
          const data = chunk.toString();
          const splits = data
            .split('\n')
            .map((item: string) => item.trim())
            .filter((item: string) => item);
          if (splits[0].includes('message')) {
            const _data = String(splits[2]);
            const bocData = _data.substring(14, _data.length - 2);
            const decodedData = await client.boc.parse_message({
              boc: bocData,
            });
            res.write(`data: ${JSON.stringify(decodedData)}\n\n`);
          }
          //   if (eventData.event === 'message') {
          //     const bocData = eventData.data.boc;
          //     const decodedData = await client.boc.parse_message({
          //       boc: bocData,
          //     });
          //     console.log('Decoded Data:', decodedData);
          //     res.write(`data: ${JSON.stringify(decodedData)}\n\n`); // Send decoded data as a response
          //   }
        } catch (error) {
          console.error('Error parsing or decoding data:', error);
        }
      });
      response.data.on('error', (error: any) => {
        console.error('SSE Error:', error);
        res.end();
      });
    };
    streamMempoolData();
  } catch (error: any) {
    console.error('Error: ', error);
    console.error('Error: ', error.response.data.error);
    res.status(500).json({ error: error.response.data.error });
  }
});

app.get('/decode', async (req, res) => {
  try {
    const { boc } = req.body;
    const decodedString = await decodeBoCData(boc);
    console.log(decodedString);
    res.json({ result: decodedString });
  } catch (error: any) {
    console.error('Error: ', error);
    res.status(500).json({ error: error });
  }
});

app.get('/pools', async (req: Request, res: Response) => {
  const response = await _client.getPools();
  console.log('Number of pools: ', response.length);
  res.json(response);
});

app.get('/assets', async (req: Request, res: Response) => {
  const assets = await _client.getAssets();
  console.log('Number of assets: ', assets.length);
  res.json(assets);
});

app.get('/wallet-assets', async (req: Request, res: Response) => {
  const walletAssets = await _client.getWalletAssets(
    'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi',
  );
  console.log('Number of wallet assets: ', walletAssets.length);
  res.json(walletAssets);
});

app.post('/swap', async (req: Request, res: Response) => {
  try {
    // Make a POST request to the STON.fi API for the swap
    const swapResponse = await axios.post('https://api.ston/v1/swap', {
      userWalletAddress: 'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi',
      offerJettonAddress: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
      offerAmount: 1000000, // Offer amount
      askJettonAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
      minAskAmount: 0.1, // Minimum ask amount
      // Add any other necessary parameters here
    });

    // Handle the swap response
    const swapResult = swapResponse.data;
    console.log('Swap result: ', swapResult);

    // Return the swap result to the client
    res.json({ success: true, result: swapResult });
  } catch (error) {
    console.error('Error during swap:', error);
    res
      .status(500)
      .json({ success: false, error: 'An error occurred during the swap' });
  }
});

app.post('/swap1', async (req: Request, res: Response) => {
  try {
    await swap();
  } catch (error) {
    console.error('Error during swap:', error);
    res
      .status(500)
      .json({ success: false, error: 'An error occurred during the swap' });
  }
});

server.listen(port, () => {
  console.log('server is running on port ' + port);
});
