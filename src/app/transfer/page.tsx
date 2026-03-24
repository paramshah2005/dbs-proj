"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type ApiResponse = {
  message?: string;
  error?: string;
};

export default function Transfer() {
  const [fromAcc, setFromAcc] = useState<string>("");
  const [toAcc, setToAcc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const parseError = (msg: string): string => {
    if (msg.includes("Account not found")) return "Invalid account number";
    if (msg.includes("Insufficient balance")) return "Insufficient balance";
    return msg;
  };

  const handleTransfer = async (): Promise<void> => {
    const loading = toast.loading("Processing transfer...");

    try {
      const res = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from_acc: Number(fromAcc),
          to_acc: Number(toAcc),
          amount: Number(amount),
        }),
      });

      const data: ApiResponse = await res.json();
      toast.dismiss(loading);

      if (data.message) toast.success(data.message);
      else if (data.error) toast.error(parseError(data.error));
    } catch {
      toast.dismiss(loading);
      toast.error("Server error");
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6">

        <h1 className="text-3xl text-center">Transfer Money</h1>

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="From Account"
          value={fromAcc}
          onChange={(e) => setFromAcc(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="To Account"
          value={toAcc}
          onChange={(e) => setToAcc(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button
          className="
            w-full
            backdrop-blur-md
            bg-blue-500/10
            border border-blue-400/20
            text-blue-300
            p-3 rounded-lg font-semibold
          "
          onClick={handleTransfer}
        >
          Transfer
        </button>

      </div>
    </div>
  );
}