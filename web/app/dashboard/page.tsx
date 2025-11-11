import { redirect } from "next/navigation";
import LogoutButton from "@/app/components/LogoutButton";
import { createServer } from "@/lib/supabaseServer";

type Profile = {
  id: string | number;
  created_at?: string | null;
  [key: string]: unknown;
};

export default async function DashboardPage() {
  const supabase = await createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/signin");
  }

  // Query from your application's `profiles` table
  const [{ count }, { data: recentProfiles }] = await Promise.all([
    supabase.from("profiles").select("*", { count: "exact", head: true }),
    supabase
      .from("profiles")
      .select("id, created_at")
      .order("created_at", { ascending: false })
      .limit(5),
  ]);
  const totalUsers = count ?? 0;
  const profiles = (recentProfiles as Profile[] | null) ?? [];

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-12 px-6 py-16">
        <header className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-2">
            <span className="w-fit rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
              Bảng điều khiển
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Xin chào, {user.email ?? "người dùng"}!
            </h1>
            <p className="text-white/70 sm:text-lg">
              Đây là tổng quan nhanh về dữ liệu Supabase của bạn.
            </p>
          </div>
          <LogoutButton />
        </header>

        <section className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <p className="text-sm text-white/60">Tổng số hồ sơ (profiles)</p>
            <p className="mt-4 text-4xl font-semibold">
              {totalUsers ?? 0}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <p className="text-sm text-white/60">Email đăng nhập</p>
            <p className="mt-4 text-lg font-semibold">
              {user.email ?? "Không có dữ liệu"}
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/40 backdrop-blur">
            <p className="text-sm text-white/60">Mã người dùng</p>
            <p className="mt-4 break-all text-sm font-semibold text-white/80">
              {user.id}
            </p>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">
              Hồ sơ mới nhất
            </h2>
            <span className="text-xs uppercase tracking-[0.3em] text-white/40">
              5 hồ sơ gần đây
            </span>
          </div>

          {profiles.length === 0 ? (
            <div className="mt-8 rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
              Hiện chưa có hồ sơ nào. Hãy tạo tài khoản mới để xem dữ liệu hiển thị tại đây.
            </div>
          ) : (
            <ul className="mt-8 divide-y divide-white/10">
              {profiles.map((p) => (
                <li
                  key={p.id}
                  className="grid gap-3 py-4 text-sm text-white/80 sm:grid-cols-[1fr_auto] sm:items-center"
                >
                  <div>
                    <p className="font-medium text-white">Profile</p>
                    <p className="text-xs text-white/60">ID: <span className="font-mono">{String(p.id)}</span></p>
                  </div>
                  <div className="text-xs text-white/60 sm:text-right">
                    {p.created_at
                      ? new Date(p.created_at).toLocaleString("vi-VN")
                      : "—"}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

