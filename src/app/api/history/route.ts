import { pool } from "@/lib/db";

type ApiResponse = {
  data?: {
    acc_no: number;
    amount: number;
    type: string;
    t_date: string;
  }[];
  error?: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const { acc_no } = await req.json();

    const result = await pool.query(
      "SELECT acc_no, amount, type, txn_date FROM transaction WHERE acc_no = $1 ORDER BY txn_date DESC",
      [acc_no],
    );  

    const res: ApiResponse = { data: result.rows };
    return Response.json(res);
  } catch (err: unknown) {
    let message = "Failed to fetch history";

    if (err instanceof Error) {
      message = err.message;
    }

    return Response.json({ error: message });
  }
}
