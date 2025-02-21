import { http, HttpResponse } from "msw";

export const mockHeroes = [
    { id: 1, name: "Iron Man", description: "Genius, billionaire, playboy, philantropist", 
        thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/9/c0/527bb7b37ff55.jpg"},
    { id: 2, name: "Wolverine", description: "Born with super-human senses and the power to heal from almost any wound, Wolverine was captured by a secret Canadian organization and given an unbreakable skeleton and claws. Treated like an animal, it took years for him to control himself. Now, he's a premiere member of both the X-Men and the Avengers.", 
        thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/2/60/537bcaef0f6cf.jpg"},
    { id: 1009187, name: "Black Panther", description: "Prince of Wakanda, wears a high tech suit that absorbs energy.", 
        thumbnail: "http://i.annihil.us/u/prod/marvel/i/mg/6/60/5261a80a67e7d.jpg"},
];

export const handlers = [
    http.get("http://localhost:3000/api/hero", () => {
        return HttpResponse.json(mockHeroes, { status: 200 });
    }),

    http.delete("http://localhost:3000/api/hero/:id", async ({ params }) => {
        const heroId = Number(params.id);
        const updatedHeroes = mockHeroes.filter(hero => hero.id !== heroId);

        return HttpResponse.json(updatedHeroes, { status: 200 });
    }),
];
