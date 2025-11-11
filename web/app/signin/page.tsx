"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabaseClient";

export default function Login() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 text-center">
            <span className="mx-auto rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
              Đăng nhập tài khoản
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Chào mừng trở lại
            </h1>
            <p className="text-white/70 sm:text-lg">
              Điền email và mật khẩu để truy cập vào tài khoản của bạn.
            </p>
          </header>

          <form
            onSubmit={handleLogin}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <div className="flex flex-col gap-6">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-white/90"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  required
                  disabled={loading}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-white/90"
                >
                  Mật khẩu
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  disabled={loading}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-white/40 focus:border-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <div className="flex justify-end">
                  <button
                    type="button"
                    className="text-xs text-white/50 underline decoration-white/20 underline-offset-4 hover:decoration-white/40"
                    disabled
                    title="Tính năng này đang được phát triển"
                  >
                    Quên mật khẩu?
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    Đang đăng nhập...
                  </span>
                ) : (
                  "Đăng nhập"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-white/70">
              Chưa có tài khoản?{" "}
              <Link
                href="/signup"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
              >
                Đăng ký ngay
              </Link>
            </p>
          </div>

          <div className="text-center">
            <Link
              href="/"
              className="text-xs text-white/50 underline decoration-white/20 underline-offset-4 hover:decoration-white/40 transition-colors"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
