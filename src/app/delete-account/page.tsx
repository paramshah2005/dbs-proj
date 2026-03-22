"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type ApiResponse = {
  message?: string;
  error?: string;
};

export default function DeleteAccount() {
  const [acc, setAcc] = useState<string>("");

  const parseError = (msg: string): string => {
    if (msg.includes("Account does not exist")) {
      return "❌ Account not found";
    }
    if (msg.includes("foreign key")) {
      return "⚠️ Cannot delete account with transactions";
    }
    return msg;
  };

  const handleDelete = async (): Promise<void> => {
    const loading = toast.loading("Deleting account...");

    try {
      const res = await fetch("/api/delete-account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acc_no: Number(acc),
        }),
      });

      const data: ApiResponse = await res.json();

      toast.dismiss(loading);

      if (data.message) {
        toast.success(data.message);
        setAcc("");
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

        <h1 className="text-3xl text-center">Delete Account</h1>

        <input
          className="w-full p-3 rounded bg-white/10 border border-white/20"
          placeholder="Account Number"
          value={acc}
          onChange={(e) => setAcc(e.target.value)}
        />

        <button
          className="
            w-full
            backdrop-blur-md
            bg-red-500/10
            border border-red-400/20
            hover:bg-red-500/20
            text-red-300
            p-3 rounded-lg font-semibold
            transition duration-200
            hover:scale-[1.02] active:scale-[0.98]
          "
          onClick={handleDelete}
        >
          Delete Account
        </button>

      </div>
    </div>
  );
}