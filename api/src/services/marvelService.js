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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchHeroFromMarvel = fetchHeroFromMarvel;
const axios_1 = __importDefault(require("axios"));
const crypto_1 = __importDefault(require("crypto"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MARVEL_PUBLIC_KEY = process.env.MARVEL_PUBLIC_KEY;
const MARVEL_PRIVATE_KEY = process.env.MARVEL_PRIVATE_KEY;
const BASE_URL = 'https://gateway.marvel.com/v1/public/characters';
if (!MARVEL_PUBLIC_KEY || !MARVEL_PRIVATE_KEY) {
    throw new Error("Missing Marvel API keys in .env");
}
function fetchHeroFromMarvel(name, age) {
    return __awaiter(this, void 0, void 0, function* () {
        const ts = new Date().getTime().toString();
        const hash = crypto_1.default.createHash('md5')
            .update(ts + MARVEL_PRIVATE_KEY + MARVEL_PUBLIC_KEY)
            .digest('hex');
        try {
            const response = yield axios_1.default.get(`${BASE_URL}`, {
                params: { name, ts, apikey: MARVEL_PUBLIC_KEY, hash },
            });
            const data = response.data.data.results[0];
            console.log(data);
            if (!data)
                return null;
            return {
                id: data.id,
                name: data.name,
                description: data.description,
                thumbnail: `${data.thumbnail.path}.${data.thumbnail.extension}`
            };
        }
        catch (error) {
            console.error('Marvel API error:', error);
            return null;
        }
    });
}
