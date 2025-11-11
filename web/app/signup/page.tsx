"use client";
import { useState } from "react";
import { createClient } from "@/lib/supabaseClient";
import Link from "next/link";

export default function Signup() {
  const supabase = createClient();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    setLoading(true);

    const { error } = await supabase.auth.signUp({ email, password });

    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      setEmail("");
      setPassword("");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col justify-center px-6 py-16">
        <div className="flex flex-col gap-8">
          <header className="flex flex-col gap-4 text-center">
            <span className="mx-auto rounded-full bg-white/10 px-4 py-1 text-xs uppercase tracking-[0.35em] text-white/70">
              Đăng ký tài khoản
            </span>
            <h1 className="text-4xl font-semibold sm:text-5xl">
              Tạo tài khoản mới
            </h1>
            <p className="text-white/70 sm:text-lg">
              Điền thông tin bên dưới để tạo tài khoản mới
            </p>
          </header>

          <form
            onSubmit={handleSignup}
            className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl shadow-black/40 backdrop-blur"
          >
            <div className="flex flex-col gap-6">
              {error && (
                <div className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
                  <p className="text-sm font-medium">{error}</p>
                </div>
              )}

              {success && (
                <div className="rounded-2xl border border-green-500/30 bg-green-500/10 p-4 text-green-200">
                  <p className="text-sm font-medium">
                    Đăng ký thành công! Vui lòng kiểm tra email để xác nhận tài khoản.
                  </p>
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
                <p className="text-xs text-white/50">
                  Mật khẩu phải có ít nhất 6 ký tự
                </p>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-900 border-t-transparent" />
                    Đang xử lý...
                  </span>
                ) : (
                  "Đăng ký"
                )}
              </button>
            </div>
          </form>

          <div className="text-center">
            <p className="text-sm text-white/70">
              Đã có tài khoản?{" "}
              <Link
                href="/signin"
                className="font-medium text-white underline decoration-white/30 underline-offset-4 hover:decoration-white transition-colors"
              >
                Đăng nhập ngay
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
