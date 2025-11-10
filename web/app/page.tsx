"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [users, setUsers] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data } = await supabase.from("users").select("*");
      setUsers(data || []);
    };
    fetchData();
  }, []);

  return (
    <main>
      <h1>Hello Supabase</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </main>
  );
}
