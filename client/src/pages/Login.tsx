import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(4, "Password too short"),
});

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data: { email: string; password: string }) => {
    if (login(data.email, data.password)) {
      navigate("/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 shadow-md">
        <h2 className="text-xl mb-4">Login</h2>
        <input type="email" {...register("email")} placeholder="Email" className="border p-2 mb-2 w-full" />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}
        <input type="password" {...register("password")} placeholder="Password" className="border p-2 mb-2 w-full" />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        <button type="submit" className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
