import { pool } from "@/lib/db";

type RequestBody = {
  acc_no: number;
};

type ApiResponse = {
  message?: string;
  error?: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body: RequestBody = await req.json();

    await pool.query(
      "SELECT delete_account($1)",
      [body.acc_no]
    );

    const res: ApiResponse = { message: "Account deleted" };
    return Response.json(res);
  } catch (err: unknown) {
    const res: ApiResponse = { error: "Delete failed" };
    return Response.json(res);
  }
}