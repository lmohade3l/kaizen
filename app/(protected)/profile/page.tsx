"use client";

import { logout } from "@/actions/auth/logout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data } = useSession();

  const profileItems = [
    {
        label: 'Theme',
        link: '',
        icon: '',

    },
    {
        label: 'Logout',
        link: '',
        icon: '',

    },
  ]

  return (
    <div className="flex flex-col items-start justify-start my-4 gap-3">
      <Card className="flex flex-row items-center justify-start w-full p-4">
        {data?.user?.image && (
          <>
            <Image
              src={data.user.image}
              alt="avatar"
              width={42}
              height={42}
              className="rounded-full"
              unoptimized
            />
          </>
        )}
        <p className="text-[18px] font-[500]">{data?.user?.email?.split("@")[0]}</p>
      </Card>

      <Card className="p-0">
        <div>
      <Button onClick={logout}>logout</Button>

        </div>

      </Card>
    </div>
  );
}
