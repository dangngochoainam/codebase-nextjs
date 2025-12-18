import postgres from 'postgres';
import { POSTGRES_URL } from '../lib/constant';

const sql = postgres(
  process.env.POSTGRES_URL || POSTGRES_URL,
  process.env.POSTGRES_URL ? { ssl: "require" } : { ssl: false }
); // No SSL for localhost);

async function listInvoices() {
	const data = await sql`
    SELECT invoices.amount, customers.name
    FROM invoices
    JOIN customers ON invoices.customer_id = customers.id
    WHERE invoices.amount = 666;
  `;

	return data;
}

export async function GET() {
  // return Response.json({
  //   message:
  //     'Uncomment this file and remove this line. You can delete this file when you are finished.',
  // });
  try {
    return Response.json(await listInvoices());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
