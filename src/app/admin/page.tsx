import { requireAdmin } from "@/lib/auth";

export default async function AdminPage() {
  const user = await requireAdmin();

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      <p className="mt-4">
        Welcome, <strong>{user.email}</strong>
      </p>
    </div>
  );
}