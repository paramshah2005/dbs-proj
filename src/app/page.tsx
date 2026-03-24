"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type ApiBody = {
  acc_no: number;
  amount: number;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

export default function Home() {
  const [acc, setAcc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");

  const parseError = (msg: string): string => {
    if (msg.includes("Account not found")) return "Invalid account number";
    if (msg.includes("Insufficient balance")) return "Insufficient balance";
    return msg;
  };

  const callAPI = async (url: string, body: ApiBody): Promise<void> => {
    const loading = toast.loading("Processing...");

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
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

        <h1 className="text-3xl text-center">Transactions</h1>

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Account Number"
          value={acc}
          onChange={(e) => setAcc(e.target.value)}
        />

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <div className="grid grid-cols-2 gap-3">
          <button
            className="backdrop-blur-md bg-green-500/10 border border-green-400/20 text-green-300 p-3 rounded-lg"
            onClick={() =>
              callAPI("/api/deposit", {
                acc_no: Number(acc),
                amount: Number(amount),
              })
            }
          >
            Deposit
          </button>

          <button
            className="backdrop-blur-md bg-red-500/10 border border-red-400/20 text-red-300 p-3 rounded-lg"
            onClick={() =>
              callAPI("/api/withdraw", {
                acc_no: Number(acc),
                amount: Number(amount),
              })
            }
          >
            Withdraw
          </button>
        </div>

      </div>
    </div>
  );
}