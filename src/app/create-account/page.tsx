"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type ApiResponse = {
  message?: string;
  acc_no?: number;
  error?: string;
};

export default function CreateAccount() {
  const [name, setName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [balance, setBalance] = useState<string>("");

  const handleCreate = async (): Promise<void> => {
    const loading = toast.loading("Creating account...");

    try {
      const res = await fetch("/api/create-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          city,
          balance: Number(balance),
        }),
      });

      const data: ApiResponse = await res.json();

      toast.dismiss(loading);

      if (data.message && data.acc_no !== undefined) {
        toast.success(`Account created. Account No: ${data.acc_no}`);
        setName("");
        setCity("");
        setBalance("");
      } else if (data.error) {
        toast.error(data.error);
      }
    } catch {
      toast.dismiss(loading);
      toast.error("Server error");
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6">

        <h1 className="text-3xl text-center">Create Account</h1>

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Customer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Initial Balance"
          value={balance}
          onChange={(e) => setBalance(e.target.value)}
        />

        <button
          className="
            w-full
            backdrop-blur-md
            bg-green-500/10
            border border-green-400/20
            hover:bg-green-500/20
            text-green-300
            p-3 rounded-lg font-semibold
            transition duration-200
            hover:scale-[1.02] active:scale-[0.98]
          "
          onClick={handleCreate}
        >
          Create Account
        </button>

      </div>
    </div>
  );
}