import express, { Request, Response } from 'express';
import heroes from '../config/db';
import { fetchHeroFromMarvel } from '../services/marvelService';
import { Hero } from '../models/hero';

const router = express.Router();

router.post('/hero', async (req: Request, res: Response) => {
    try {
        const { name } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Hero name is required' });
        }

        let hero: Hero | undefined = heroes.find(h => h.name.toLowerCase() === name.toLowerCase());

        if (!hero) {
            const fetchedHero = await fetchHeroFromMarvel(name);
            if (fetchedHero) {
                heroes.push(fetchedHero);
                hero = fetchedHero;
            }
        }

        if (hero) {
            res.json(hero);
        }

        res.status(404).json({ error: 'Hero not found' });

    } catch (error) {
        console.error('Error fetching hero:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/hero', async(req: Request, res: Response) => {
    if (heroes.length === 0) {
        res.status(204).send();
    }
    res.status(200).json(heroes);
});

router.get('/hero/:id', async(req: Request, res: Response) => {
    const heroId = Number(req.params.id);
    const heroIndex = heroes.findIndex(h => h.id === heroId);    

    if (heroIndex === -1) {
        res.status(404).json({ error: 'Hero not found' });
    }

    res.status(200).json({ message: 'Hero found!' });
});


router.delete('/hero/:id', async (req: Request, res: Response) => {
    console.log(`Received DELETE request for hero ID: ${req.params.id}`);
    res.json({ message: 'Debugging...' });
});

export default router;
