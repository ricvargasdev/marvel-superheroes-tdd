import { http, HttpResponse } from "msw";

export const mockHeroes = [
    { id: 1, name: "Iron Man", description: "Genius billionaire" },
    { id: 2, name: "Spider-Man", description: "Friendly neighborhood hero" },
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
