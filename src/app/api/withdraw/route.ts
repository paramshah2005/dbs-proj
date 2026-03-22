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

    await pool.query("SELECT withdraw_money($1, $2)", [
      body.acc_no,
      body.amount,
    ]);

    const res: ApiResponse = { message: "Withdrawal successful" };
    return Response.json(res);
  } catch (err: unknown) {
    let message = "Withdrawal failed";

    if (err instanceof Error) {
      message = err.message;
    }

    const res: ApiResponse = { error: message };
    return Response.json(res);
  }
}
