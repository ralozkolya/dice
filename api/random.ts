import { NowRequest, NowResponse } from '@vercel/node';
import assert from 'assert';
import axios from 'axios';
import { Random } from 'random-js';

const apiKey = process.env.API_KEY;

export default async (request: NowRequest, response: NowResponse) => {

    if (request.cookies.random) {
        return response.status(429).end();
    }

    response.setHeader('Set-Cookie', `random=requested; Max-Age=5; HttpOnly; SameSite=strict`);

    response.send(await getNumbers());
}

async function getNumbers(): Promise<number[]> {

    assert(apiKey, 'API_KEY environmental variable is required');

    try {
        const response = await axios.post('https://api.random.org/json-rpc/1/invoke', {
            jsonrpc: '2.0',
            id: 1,
            method: 'generateIntegers',
            params: {
                apiKey,
                n: 1000,
                min: 0,
                max: 5
            }
        });

        if (response.data.result) {
            return response.data.result.random.data;
        }

    } catch (e) {
        console.log(e);
    }

    // Fallback. Not truly random :(
    return new Random().dice(6, 1000);
}