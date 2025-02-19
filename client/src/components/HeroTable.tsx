import { useState, useEffect } from "react";
import HeroModal from "./HeroModal";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

export default function HeroTable() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/hero`)
      .then((res) => res.json())
      .then((data) => setHeroes(data))
      .catch((err) => console.error("Error fetching heroes:", err));
  }, []);

  const addHero = (newHero: Hero) => {
    setHeroes([...heroes, newHero]);
  };

  const deleteHero = (id: number) => {
    setHeroes(heroes.filter(hero => hero.id !== id));
  };

  return (
    <div className="p-6">
      <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 mb-4">
        + Add Hero
      </button>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border p-2">ID</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Description</th>
            <th className="border p-2">Thumbnail</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {heroes.length > 0 ? (
            heroes.map((hero) => (
              <tr key={hero.id} className="border">
                <td className="border p-2">{hero.id}</td>
                <td className="border p-2">{hero.name}</td>
                <td className="border p-2">{hero.description}</td>
                <td className="border p-2">
                  <img src={hero.thumbnail} alt={hero.name} className="w-16 h-16 object-cover" />
                </td>
                <td className="border p-2">
                    <button className="bg-red-500 text-white px-4 py-2" onClick={() => deleteHero(hero.id)}>
                        Delete
                    </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={4} className="text-center p-4">No heroes found</td>
            </tr>
          )}
        </tbody>
      </table>

      {isModalOpen && <HeroModal onClose={() => setIsModalOpen(false)} onHeroAdded={addHero} />}
    </div>
  );
}
