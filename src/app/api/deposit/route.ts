import { pool } from "@/lib/db";

type RequestBody = {
  acc_no: number;
  amount: number;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body: RequestBody = await req.json();

    await pool.query(
      "SELECT deposit_money($1, $2)",
      [body.acc_no, body.amount]
    );

    const res: ApiResponse = { message: "Deposit successful" };
    return Response.json(res);
  } catch {
    const res: ApiResponse = { error: "Deposit failed" };
    return Response.json(res);
  }
}