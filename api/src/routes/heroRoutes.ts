import express, { Request, Response } from 'express';
import heroes from '../config/db';
import { fetchHeroFromMarvel } from '../services/marvelService';
import { Hero } from '../models/hero';

const router = express.Router();

router.get('/getHeroFromMarvel/:name', async(req: Request, res: Response) => {
    const name = req.params.name;
    let hero = await fetchHeroFromMarvel(name);

    res.status(200).json(hero);
});

router.post('/hero', async (req: Request, res: Response) => {
    try {
        const { name, description, thumbnail } = req.body;
        if (!name) {
            res.status(400).json({ error: 'Hero name is required' });
            return;
        }

        let hero = await fetchHeroFromMarvel(name);

        if(!hero){
            hero = {
                id: Date.now(),
                name: name,
                description: description,
                thumbnail: thumbnail
            }
        }
        heroes.push(hero);

        res.status(200).json(hero);
    } catch (error) {
        console.error('Error fetching hero:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/hero', async(req: Request, res: Response) => {
    if (heroes.length === 0) {
        console.log('No heroes in the database');
        res.status(204).json({message: 'No heroes in the database'});
        return;
    }
    res.status(200).json(heroes);
});

router.get('/hero/:id', async(req: Request, res: Response) => {
    const heroId = Number(req.params.id);
    const hero = heroes.find(h => Number(h.id) === heroId);

    if (isNaN(hero?.id)) {
        res.status(404).json({ error: 'Hero not found' });
        return;
    }
    res.status(200).json(hero);
});

// TODO: Implement 'delete'
router.delete('/hero/:id', async (req: Request, res: Response) => {
    const heroId = Number(req.params.id);
    const heroIndex = heroes.findIndex(h => Number(h.id) === heroId);

    if (heroIndex === -1) {
        res.status(404).json({ error: 'Hero not found' });
        return;
    }
    heroes.splice(heroIndex, 1);
    res.status(200).json({ message: 'Hero deleted successfully' });
});

export default router;
