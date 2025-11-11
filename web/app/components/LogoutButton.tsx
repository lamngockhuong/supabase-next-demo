"use client";

import { createClient } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return (
    <button
      onClick={handleLogout}
      className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-all hover:bg-white/90 hover:shadow-lg hover:shadow-white/20"
    >
      Logout
    </button>
  );
}

