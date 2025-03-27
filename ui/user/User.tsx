import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import React from "react";
import Image from "next/image";
import prisma from "@/lib/prisma";
export default async function User() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || "",
    },
  });

  return (
    <div className="sm:w-2xl w-5/6 p-4 shadow-sm shadow-black border-1 border-black rounded-md">
      {/* <Image
        src={`${session?.user?.image}`}
        alt="profile picture"
        width={300}
        height={300}
        className="rounded-full"
      /> */}
      <h1>Hello, {user?.name}</h1>
    </div>
  );
}
