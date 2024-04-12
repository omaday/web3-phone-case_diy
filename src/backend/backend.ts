import express from 'express';
import { Principal, Server, ic, query, nat, text, update } from 'azle';
import {
    HttpResponse,
    HttpTransformArgs,
} from 'azle/canisters/management';
import { Ledger } from 'azle/canisters/ledger';

export default Server(
    () => {
        const app = express();
        app.use(express.json());

        let balanceMap = {
            'Alice': { 
                'balance': 10000 }
        };

        let phonebook = {
            'Alice': { 'phone': '123-456-789', 'added': new Date() }
        };

        app.get('/contacts', (_req, res) => {
            res.json(phonebook);
        });

        app.post('/contacts/add', (req, res) => {
            if (Object.keys(phonebook).includes(req.body.name)) {
                res.json({ error: 'Name already exists' });
            } else {
                const contact = { [req.body.name]: { phone: req.body.phone, added: new Date() } };
                phonebook = { ...phonebook, ...contact };
                res.json({ status: 'Ok' });
            }
        });

        app.get('/greet', (req, res) => {
            res.json({ greeting: `Hello, ${req.query.name}` });
        });

        app.post('/balance', async (req, res) => {
            let account_hex_str : string = `${req.body.account}`;
            let account_id = new Uint8Array(Buffer.from(account_hex_str, 'hex'));
            let icp_ledger_id  = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
            let icp_ledger : typeof Ledger = Ledger(icp_ledger_id);
            let balance = await ic.call(icp_ledger.account_balance, { args: [{ account: account_id }] });
            res.json({balance:balance.e8s.toString()});
        });

        app.post('/price-oracle', async (req, res) => {
            ic.setOutgoingHttpOptions({
                maxResponseBytes: 20_000n,
                cycles: 500_000_000_000n, // HTTP outcalls cost cycles. Unused cycles are returned.
                transformMethodName: 'transform'
            });

            const date = '2024-04-01';
            const response = await fetch(`https://api.coinbase.com/v2/prices/${req.body.pair}/spot?date=${date}`)
            const response_text = await response.text();
            res.json(response_text);
        });

        app.use(express.static('/dist'));
        return app.listen();
    },
    {
        // The transformation function for the HTTP outcall responses.
        // Required to reach consensus among different results the nodes might get.
        // Only if they all get the same response, the result is returned, so make sure
        // your HTTP requests are idempotent and don't depend e.g. on the time.
        transform: query([HttpTransformArgs], HttpResponse, (args) => {
            return {
                ...args.response,
                headers: []
            };
        }),
        balance_of: update([text], nat, async (account_hex_str) => {
            // 1. convert account_hex_str to Uint8Array
            // 2. call ICP ledger balance method
            // 3. return balance from the call result
            let account_id = new Uint8Array(Buffer.from(account_hex_str, 'hex'));
            let icp_ledger_id  = Principal.fromText("ryjl3-tyaaa-aaaaa-aaaba-cai");
            let icp_ledger : typeof Ledger = Ledger(icp_ledger_id);
            let balance = await ic.call(icp_ledger.account_balance, { args: [{ account: account_id }] });
            return balance.e8s
        }),
    }
);
