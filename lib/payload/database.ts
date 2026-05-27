/** True when Payload can reach a real database (Postgres on Vercel, SQLite locally). */
export function canUsePayloadDatabase(): boolean {
  if (!process.env.PAYLOAD_SECRET) return false;

  const uri = process.env.DATABASE_URI ?? "file:./universe-security.db";
  const isServerless = process.env.VERCEL === "1";

  if (isServerless && uri.startsWith("file:")) {
    return false;
  }

  return true;
}
