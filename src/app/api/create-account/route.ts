import { pool } from "@/lib/db";

type RequestBody = {
  name: string;
  balance: number;
};

type ApiResponse = {
  message?: string;
  acc_no?: number;
  error?: string;
};

export async function POST(req: Request): Promise<Response> {
  try {
    const body: RequestBody = await req.json();

    const result = await pool.query(
      "SELECT create_account($1, $2) AS acc_no",
      [body.name, body.balance]
    );

    const accNo: number = result.rows[0].acc_no;

    const res: ApiResponse = {
      message: "Account created successfully",
      acc_no: accNo,
    };

    return Response.json(res);
  } catch {
    return Response.json({ error: "Account creation failed" });
  }
}