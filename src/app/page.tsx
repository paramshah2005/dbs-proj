"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type ApiBody = {
  acc_no?: number;
  amount?: number;
  from_acc?: number;
  to_acc?: number;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

export default function Home() {
  const [acc, setAcc] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [toAcc, setToAcc] = useState<string>("");

  const parseError = (msg: string): string => {
    if (msg.includes("foreign key")) return "❌ Invalid account number";
    if (msg.includes("Minimum balance")) return "⚠️ Minimum balance must be ₹500";
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

      if (data.message) {
        toast.success(data.message);
      } else if (data.error) {
        toast.error(parseError(data.error));
      }
    } catch {
      toast.dismiss(loading);
      toast.error("❌ Server error");
    }
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6">

        <h1 className="text-3xl text-center">Banking System</h1>

        {/* Account Input */}
        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Account Number"
          value={acc}
          onChange={(e) => setAcc(e.target.value)}
        />

        {/* Amount Input */}
        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        {/* Deposit & Withdraw */}
        <div className="grid grid-cols-2 gap-3">
          <button
            className="
              backdrop-blur-md
              bg-green-500/10
              border border-green-400/20
              hover:bg-green-500/20
              text-green-300
              p-3 rounded-lg font-semibold
              transition duration-200
              hover:scale-[1.02] active:scale-[0.98]
            "
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
            className="
              backdrop-blur-md
              bg-red-500/10
              border border-red-400/20
              hover:bg-red-500/20
              text-red-300
              p-3 rounded-lg font-semibold
              transition duration-200
              hover:scale-[1.02] active:scale-[0.98]
            "
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

        {/* Transfer Input */}
        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="To Account Number"
          value={toAcc}
          onChange={(e) => setToAcc(e.target.value)}
        />

        {/* Transfer Button */}
        <button
          className="
            w-full
            backdrop-blur-md
            bg-gradient-to-r from-blue-500/10 to-purple-500/10
            border border-blue-400/20
            hover:from-blue-500/20 hover:to-purple-500/20
            text-blue-300
            p-3 rounded-lg font-semibold
            transition duration-200
            hover:scale-[1.02] active:scale-[0.98]
          "
          onClick={() =>
            callAPI("/api/transfer", {
              from_acc: Number(acc),
              to_acc: Number(toAcc),
              amount: Number(amount),
            })
          }
        >
          Transfer
        </button>

      </div>
    </div>
  );
}