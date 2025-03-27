import { getServerSession } from "next-auth";
import Image from "next/image";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import prisma from "@/lib/prisma";

export default async function Home() {
  let content;
  let session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || " ",
    },
  });
  // if (session) {
  content = (
    <div className="w-full gap-4 flex">
      <Link
        href="/create"
        className="p-2 pl-3 pr-3 border-1 rounded-md border-cyan-400"
      >
        Create
      </Link>
      <Link
        href="/Join"
        className="p-2 pl-3 pr-3 bg-cyan-600 rounded-md text-white"
      >
        Join
      </Link>
    </div>
  );
  // }

  // if (session && !user?.batchId) {
  // content = <div className="">U are in a Batch {user?.batchId}</div>;
  // }
  return (
    <div className="flex  flex-col p-4 justify-center items-center">
      <header className="text-center pb-8">
        <h1 className="text-3xl p-2">Welcome To BatchX</h1>
        <p>A Resource Sharing Platform For Students and Professionals</p>
      </header>
      <main>{content}</main>
    </div>
  );
}
