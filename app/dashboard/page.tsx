"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data } = useSession();

  console.log("data", data);
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <p>u are signed in as {data?.user?.email}</p>
      {data?.user?.image && (
        <>
          <Image
            src={data.user.image}
            alt="avatar"
            width={40}
            height={40}
            className="rounded-full"
          />

          <img src={data?.user?.image} />
        </>
      )}
    </div>
  );
}
