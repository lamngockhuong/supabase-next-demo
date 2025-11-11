"use client";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabaseClient";

type Profile = {
  id: string | number;
  email?: string | null;
  created_at?: string | null;
  [key: string]: unknown;
};

export default function Home() {
  const supabase = createClient();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("profiles").select("*");

      if (error) {
        setError(error.message);
        setProfiles([]);
      } else {
        setProfiles((data as Profile[]) || []);
      }
      setLoading(false);
    };

    fetchData();
  }, [supabase]);

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-10 px-6 py-16">
        <header className="flex flex-col gap-4 text-center">
          <span className="mx-auto rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
            Supabase Demo
          </span>
          <h1 className="text-4xl font-semibold sm:text-5xl">
            Quản lý người dùng
          </h1>
          <p className="text-white/70 sm:text-lg">
            Dữ liệu được tải trực tiếp từ bảng `users` trong Supabase. Giao diện
            hiển thị đầy đủ trạng thái tải, lỗi và danh sách người dùng.
          </p>
        </header>

        <section className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur">
          {loading && (
            <div className="flex flex-col items-center justify-center gap-2 py-10 text-white/70">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/20 border-t-white" />
              <span>Đang tải danh sách người dùng...</span>
            </div>
          )}

          {!loading && error && (
            <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-6 text-red-200">
              <h2 className="text-lg font-medium">Không thể tải dữ liệu</h2>
              <p className="mt-2 text-sm text-red-200/70">{error}</p>
            </div>
          )}

          {!loading && !error && profiles.length === 0 && (
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
              <h2 className="text-lg font-medium text-white">Chưa có người dùng</h2>
              <p className="mt-2 text-sm">
                Tạo tài khoản mới tại trang đăng ký để thấy dữ liệu hiển thị ở đây.
              </p>
            </div>
          )}

          {!loading && !error && profiles.length > 0 && (
            <div className="overflow-hidden rounded-2xl border border-white/10">
              <div className="hidden grid-cols-[1fr_auto_auto] bg-white/10 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-white/70 sm:grid">
                <span>Email</span>
                <span>Ngày tạo</span>
                <span>Mã</span>
              </div>
              <ul className="divide-y divide-white/5">
                {profiles.map((profile, index) => (
                  <li
                    key={profile.id ?? index}
                    className="grid grid-cols-1 gap-3 bg-white/5 px-6 py-5 text-sm text-white/80 sm:grid-cols-[1fr_auto_auto] sm:items-center"
                  >
                    <span className="font-medium text-white">
                      {(profile.email as string) ?? "Không có email"}
                    </span>
                    <span className="text-xs text-white/60 sm:text-right">
                      {profile.created_at
                        ? new Date(profile.created_at).toLocaleString()
                        : "—"}
                    </span>
                    <span className="text-xs text-white/50 sm:text-right">
                      {String(profile.id)}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </section>

        <footer className="text-center text-xs text-white/50">
          Dự án mẫu Supabase + Next.js ·{" "}
          <a
            href="https://supabase.com"
            target="_blank"
            rel="noreferrer"
            className="underline decoration-white/30 underline-offset-4 hover:decoration-white"
          >
            supabase.com
          </a>
        </footer>
      </div>
    </main>
  );
}
