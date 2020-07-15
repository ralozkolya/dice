import { NowRequest, NowResponse } from '@vercel/node';
import assert from 'assert';
import axios from 'axios';
import { Random } from 'random-js';

const { API_KEY: apiKey, NODE_ENV } = process.env;

export default async (request: NowRequest, response: NowResponse) => {

    if (request.cookies.random) {
        return response.status(429).send({ error: 'Too many requests' });
    }

    response.setHeader('Set-Cookie', `random=requested; Max-Age=5; HttpOnly; SameSite=strict`);

    const sides = parseInt(request.query.sides as string) || 6;

    try {
        response.send(await getNumbers(sides));
    } catch (e) {
        response.status(e.status || 500).send({ error: e.message });
    }
}

async function getNumbers(sides: number): Promise<{ data: number[]; warning?: string | undefined }> {

    try {
        assert(sides > 1 && sides < 21, "'sides' must be an integer between 2 and 20");
    } catch (e) {
        e.status = 422;
        throw e;
    }

    if (NODE_ENV === 'production') {

        assert(apiKey, 'API_KEY environmental variable is required in production');

        try {
            const response = await axios.post('https://api.random.org/json-rpc/1/invoke', {
                jsonrpc: '2.0',
                id: 1,
                method: 'generateIntegers',
                params: {
                    apiKey,
                    n: 1000,
                    min: 0,
                    max: sides - 1
                }
            });
    
            if (response.data.result) {
                return { data: response.data.result.random.data };
            }

            throw Error(response.data.error);
    
        } catch (e) {
            console.log(e);
        }
    } else {
        console.log('Development mode, not querying random.org');
    }

    // Fallback. Not truly random :(
    const data = new Random().dice(sides, 1000).map(i => --i);
    return { data, warning: 'Unable to retrieve data from random.org. Falling back to PRNG' };
}