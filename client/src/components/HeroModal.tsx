import { useState } from "react";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

console.log('========== HeroModal ==========');

interface Hero {
  id: number;
  name: string;
  description: string;
  thumbnail: string;
}

interface Props {
  onClose: () => void;
  onHeroAdded: (hero: Hero) => void;
}

export default function HeroModal({ onClose, onHeroAdded }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newHero = { name, description, thumbnail };

    const response = await fetch(`${API_BASE_URL}/api/hero`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newHero),
    });

    if (response.ok) {
      const heroData = await response.json();
      onHeroAdded(heroData);
      onClose();
    } else {
      alert("Error adding hero");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl mb-4">Add a Hero</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Hero Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <input
            type="text"
            placeholder="Thumbnail URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            className="border p-2 w-full mb-2"
            required
          />
          <div className="flex justify-end mt-4">
            <button type="button" onClick={onClose} className="mr-2 bg-gray-400 text-white px-4 py-2">
              Cancel
            </button>
            <button type="submit" className="bg-blue-500 text-white px-4 py-2">
              Add Hero
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
