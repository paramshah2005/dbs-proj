import { pool } from "@/lib/db";

type RequestBody = {
  from_acc: number;
  to_acc: number;
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
      "SELECT transfer_money($1, $2, $3)",
      [body.from_acc, body.to_acc, body.amount]
    );

    const res: ApiResponse = { message: "Transfer successful" };
    return Response.json(res);
  } catch (err: unknown) {
    let message = "Transfer failed";

    if (err instanceof Error) {
      message = err.message;
    }

    const res: ApiResponse = { error: message };
    return Response.json(res);
  }
}