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
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("../config/db"));
const marvelService_1 = require("../services/marvelService");
const router = express_1.default.Router();
router.post('/hero', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(400).json({ error: 'Hero name is required' });
        }
        let hero = db_1.default.find(h => h.name.toLowerCase() === name.toLowerCase());
        if (!hero) {
            const fetchedHero = yield (0, marvelService_1.fetchHeroFromMarvel)(name);
            if (fetchedHero) {
                db_1.default.push(fetchedHero);
                hero = fetchedHero;
            }
        }
        if (hero) {
            return res.json(hero); // ✅ Fix: Return correct Response type
        }
        return res.status(404).json({ error: 'Hero not found' });
    }
    catch (error) {
        console.error('Error fetching hero:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}));
router.get('/hero', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (db_1.default.length === 0) {
        return res.status(204).send(); // No Content
    }
    return res.status(200).json(db_1.default);
}));
exports.default = router;
