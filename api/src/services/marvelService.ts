import axios from 'axios';
import crypto from 'crypto';
import { Hero } from '../models/hero';
import dotenv from 'dotenv';
dotenv.config();

const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY!;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY!;
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';

if (!MARVEL_PUBLIC_KEY || !MARVEL_PRIVATE_KEY) {
    throw new Error("Missing Marvel API keys in .env");
}

async function fetchHeroFromMarvel(name: string, age?: number): Promise<Hero | null> {

    const ts = new Date().getTime().toString();
    const hash = crypto.createHash('md5')
        .update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
        .digest('hex');

    try {
        const response = await axios.get(`${BASE_URL}`, {
            params: { name, ts, apikey: MARVEL_PUBLIC_KEY, hash },
        });
        const data = response.data.data.results[0];
        console.log(data);

        if (!data) return null;
        return {
            id: data.id,
            name: data.name,
            description: data.description,
            thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`
        };
    } catch (error) {
        console.error('Marvel API error:', error);
        return null;
    }
}
export { fetchHeroFromMarvel };
