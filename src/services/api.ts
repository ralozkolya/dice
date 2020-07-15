import Bluebird from 'bluebird';
import axios from 'axios';

export async function getRolls(sides = 6, retries = 1): Promise<{ data: number[], warning?: string }> {

    try {
        const response = await axios.get('/api/random', { params: { sides } });
        return response.data;
    } catch (e) {
        retries = Math.min(20, retries);
        await Bluebird.delay(retries++ * 1000);
        return getRolls(sides, retries);
    }
}

// For animation
export function getFakeRolls(sides = 6, dice = 2, count = 8): number[] {

    const data = [];

    for (let i = 0; i < dice * count; i++) {
        data.push(Math.floor(Math.random() * sides));
    }

    return data;
}
