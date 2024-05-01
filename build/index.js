"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var http_1 = __importDefault(require("http"));
var axios_1 = __importDefault(require("axios"));
var tonweb_1 = __importDefault(require("tonweb"));
var api_1 = require("@ston-fi/api");
var sdk_1 = require("@ston-fi/sdk");
var lib_node_1 = require("@tonclient/lib-node");
var core_1 = require("@tonclient/core");
// import { Readable } from 'stream';
// import WebSocket from 'ws';
var _client = new api_1.StonApiClient();
core_1.TonClient.useBinaryLibrary(lib_node_1.libNode);
var client = new core_1.TonClient({
    network: {
        endpoints: ['https://toncenter.com/api/v2/jsonRPC'],
    },
});
var port = process.env.PORT || 5000;
var app = (0, express_1.default)();
var server = http_1.default.createServer(app);
// const ws = new WebSocket('wss://tonapi.io/v2/websocket', {
//   headers: {
//     Authorization:
//       'Bearer AHC4IYTEMUOMVZYAAAACRCIPDXYY3OMJHLYG4G4KAFMYAY4YHGS5TGCXQJKWQEJA7HDESSY',
//   },
// });
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
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
// Replace with the address of the token pair factory contract
var tokenPairFactoryAddress = '...';
// Subscribe to new transactions in the mempool
client.net.subscribe_collection({
    collection: 'transactions',
    filter: {
        src: { eq: tokenPairFactoryAddress },
    },
    result: 'id,src,data',
});
function decodeBoCData(bocData) {
    return __awaiter(this, void 0, void 0, function () {
        var decodedData, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, client.boc.parse_message({ boc: bocData })];
                case 1:
                    decodedData = _a.sent();
                    // console.log(decodedData);
                    return [2 /*return*/, decodedData];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error decoding BoC data:', error_1);
                    return [2 /*return*/, null];
                case 3: return [2 /*return*/];
            }
        });
    });
}
app.get('/monitor', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var result, latestBlock, transactions, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, client.net.query_collection({
                        collection: 'blocks_signatures',
                        result: 'id,seq_no',
                        order: [{ path: 'seq_no', direction: core_1.SortDirection.DESC }],
                        limit: 1,
                    })];
            case 1:
                result = (_a.sent()).result;
                latestBlock = result[0];
                return [4 /*yield*/, client.net.query_collection({
                        collection: 'transactions',
                        filter: { block_id: { eq: latestBlock.id } },
                        result: 'id,account_addr,lt',
                    })];
            case 2:
                transactions = (_a.sent()).result;
                // Send the transactions as the response
                res.json(transactions);
                return [3 /*break*/, 4];
            case 3:
                error_2 = _a.sent();
                console.error(error_2);
                res
                    .status(500)
                    .send('An error occurred while monitoring the TON blockchain.');
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); });
var swap = function () { return __awaiter(void 0, void 0, void 0, function () {
    var WALLET_ADDRESS, JETTON0, JETTON1, provider, router, swapTxParams;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                WALLET_ADDRESS = 'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi';
                JETTON0 = 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c';
                JETTON1 = 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs';
                provider = new tonweb_1.default.HttpProvider('https://toncenter.com/api/v2/jsonRPC', {
                    apiKey: 'f5ab31973aad609dda3dd212b552f842a616f2a866b46eb3085c15038864bedb',
                });
                console.log('Provider: ', provider);
                router = new sdk_1.Router(provider, {
                    revision: sdk_1.ROUTER_REVISION.V1,
                    address: sdk_1.ROUTER_REVISION_ADDRESS.V1,
                });
                console.log('Router: ', router);
                return [4 /*yield*/, router.buildSwapJettonTxParams({
                        // address of the wallet that holds offerJetton you want to swap
                        userWalletAddress: WALLET_ADDRESS,
                        // address of the jetton you want to swap
                        offerJettonAddress: JETTON0,
                        // amount of the jetton you want to swap
                        offerAmount: new tonweb_1.default.utils.BN('1000000'),
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
                    })];
            case 1:
                swapTxParams = _a.sent();
                // to execute the transaction you need to send transaction to the blockchain
                // (replace with your wallet implementation, logging is used for demonstration purposes)
                console.log({
                    to: swapTxParams.to,
                    amount: swapTxParams.gasAmount,
                    payload: swapTxParams.payload,
                });
                return [2 /*return*/];
        }
    });
}); };
app.get('/mempool-stream', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var streamMempoolData;
    return __generator(this, function (_a) {
        try {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            streamMempoolData = function () { return __awaiter(void 0, void 0, void 0, function () {
                var response;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, axios_1.default.get('https://tonapi.io/v2/sse/mempool', {
                                headers: {
                                    Authorization: 'Bearer AHC4IYTEMUOMVZYAAAACRCIPDXYY3OMJHLYG4G4KAFMYAY4YHGS5TGCXQJKWQEJA7HDESSY',
                                },
                                responseType: 'stream',
                            })];
                        case 1:
                            response = _a.sent();
                            // response.data.pipe(res);
                            response.data.on('data', function (chunk) { return __awaiter(void 0, void 0, void 0, function () {
                                var data, splits, _data, bocData, decodedData, error_3;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            _a.trys.push([0, 3, , 4]);
                                            data = chunk.toString();
                                            splits = data
                                                .split('\n')
                                                .map(function (item) { return item.trim(); })
                                                .filter(function (item) { return item; });
                                            if (!splits[0].includes('message')) return [3 /*break*/, 2];
                                            _data = String(splits[2]);
                                            bocData = _data.substring(14, _data.length - 2);
                                            return [4 /*yield*/, client.boc.parse_message({
                                                    boc: bocData,
                                                })];
                                        case 1:
                                            decodedData = _a.sent();
                                            res.write("data: ".concat(JSON.stringify(decodedData), "\n\n"));
                                            _a.label = 2;
                                        case 2: return [3 /*break*/, 4];
                                        case 3:
                                            error_3 = _a.sent();
                                            console.error('Error parsing or decoding data:', error_3);
                                            return [3 /*break*/, 4];
                                        case 4: return [2 /*return*/];
                                    }
                                });
                            }); });
                            response.data.on('error', function (error) {
                                console.error('SSE Error:', error);
                                res.end();
                            });
                            return [2 /*return*/];
                    }
                });
            }); };
            streamMempoolData();
        }
        catch (error) {
            console.error('Error: ', error);
            console.error('Error: ', error.response.data.error);
            res.status(500).json({ error: error.response.data.error });
        }
        return [2 /*return*/];
    });
}); });
app.get('/decode', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var boc, decodedString, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                boc = req.body.boc;
                return [4 /*yield*/, decodeBoCData(boc)];
            case 1:
                decodedString = _a.sent();
                console.log(decodedString);
                res.json({ result: decodedString });
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                console.error('Error: ', error_4);
                res.status(500).json({ error: error_4 });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.get('/pools', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _client.getPools()];
            case 1:
                response = _a.sent();
                console.log('Number of pools: ', response.length);
                res.json(response);
                return [2 /*return*/];
        }
    });
}); });
app.get('/assets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var assets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _client.getAssets()];
            case 1:
                assets = _a.sent();
                console.log('Number of assets: ', assets.length);
                res.json(assets);
                return [2 /*return*/];
        }
    });
}); });
app.get('/wallet-assets', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var walletAssets;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, _client.getWalletAssets('UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi')];
            case 1:
                walletAssets = _a.sent();
                console.log('Number of wallet assets: ', walletAssets.length);
                res.json(walletAssets);
                return [2 /*return*/];
        }
    });
}); });
app.post('/swap', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var swapResponse, swapResult, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, axios_1.default.post('https://api.ston/v1/swap', {
                        userWalletAddress: 'UQDJNqhcUuLKTHYbX5kmeE1X4IixRPBZjl6nlqlDhOZ3s4Yi',
                        offerJettonAddress: 'EQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAM9c',
                        offerAmount: 1000000,
                        askJettonAddress: 'EQCxE6mUtQJKFnGfaROTKOt1lZbDiiX1kCixRv7Nw2Id_sDs',
                        minAskAmount: 0.1, // Minimum ask amount
                        // Add any other necessary parameters here
                    })];
            case 1:
                swapResponse = _a.sent();
                swapResult = swapResponse.data;
                console.log('Swap result: ', swapResult);
                // Return the swap result to the client
                res.json({ success: true, result: swapResult });
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                console.error('Error during swap:', error_5);
                res
                    .status(500)
                    .json({ success: false, error: 'An error occurred during the swap' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
app.post('/swap1', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, swap()];
            case 1:
                _a.sent();
                return [3 /*break*/, 3];
            case 2:
                error_6 = _a.sent();
                console.error('Error during swap:', error_6);
                res
                    .status(500)
                    .json({ success: false, error: 'An error occurred during the swap' });
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
server.listen(port, function () {
    console.log('server is running on port ' + port);
});
