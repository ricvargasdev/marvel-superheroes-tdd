import HeroTable from "../components/HeroTable";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { logout } = useAuth();

  return (
    <div className="p-6">
      <button onClick={logout} className="bg-red-500 text-white px-4 py-2">Logout</button>
      <h1 className="text-2xl">Hero List</h1>
      <HeroTable />
    </div>
  );
}
