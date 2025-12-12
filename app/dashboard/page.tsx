"use client";

import { useSession } from "next-auth/react";

export default function Dashboard() {
  const { data } = useSession();

  console.log("data", data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>u are signed in as {data?.user?.email}</p>
    </div>
  );
}
