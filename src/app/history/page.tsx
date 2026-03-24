"use client";
import { useState } from "react";
import toast from "react-hot-toast";

type Transaction = {
  acc_no: number;
  amount: number;
  type: string;
  txn_date: string;
};

type ApiResponse = {
  data?: Transaction[];
  error?: string;
};

export default function History() {
  const [acc, setAcc] = useState<string>("");
  const [data, setData] = useState<Transaction[]>([]);

  const fetchHistory = async (): Promise<void> => {
    const loading = toast.loading("Fetching history...");

    try {
      const res = await fetch("/api/history", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          acc_no: Number(acc),
        }),
      });

      const result: ApiResponse = await res.json();
      toast.dismiss(loading);

      if (result.data) {
        setData(result.data);
        if (result.data.length === 0) {
          toast("No transactions found");
        }
      } else if (result.error) {
        toast.error(result.error);
      }
    } catch {
      toast.dismiss(loading);
      toast.error("Server error");
    }
  };

  const getTypeStyle = (type: string): string => {
    if (type === "deposit") return "text-green-400";
    if (type === "withdraw") return "text-red-400";
    return "text-blue-400";
  };

  return (
    <div className="relative w-full flex justify-center">
      <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-8 rounded-2xl w-full max-w-md space-y-6">

        <h1 className="text-3xl text-center">Transaction History</h1>

        <div className="flex flex-col gap-3 mt-2">
          <input
            className="w-full p-3 rounded bg-white/10 border border-white/20 text-center"
            placeholder="Account Number"
            value={acc}
            onChange={(e) => setAcc(e.target.value)}
          />

          <button
            className="
  w-full mt-4
  backdrop-blur-md
  bg-blue-500/10
  border border-blue-400/20
  hover:bg-blue-500/20
  text-blue-300
  p-3 rounded-lg font-semibold
  transition duration-200
"
            onClick={fetchHistory}
          >
            Get History
          </button>
        </div>

        {/* Table */}
        {data.length > 0 && (
          <div className="overflow-hidden rounded-xl border border-white/10">
            <table className="w-full text-sm text-left">

              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="p-3">Type</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                </tr>
              </thead>

              <tbody>
                {data.map((t, index) => (
                  <tr
                    key={index}
                    className="border-t border-white/10 hover:bg-white/5 transition"
                  >
                    <td className={`p-3 font-medium ${getTypeStyle(t.type)}`}>
                      {t.type}
                    </td>
                    <td className="p-3">{t.amount}</td>
                    <td className="p-3">
                      {new Date(t.txn_date).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}

      </div>
    </div>
  );
}