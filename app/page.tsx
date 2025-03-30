import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Navbar from "@/ui/Navbar";

export default async function Home() {
  let content;
  let batchContent = null;
  let session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email || " ",
    },
  });
  // if (session) {
  content = (
    <div className="w-full gap-4 flex-col">
      <header className="text-center pb-8">
        <h1 className="text-3xl p-2">Welcome To BatchX</h1>
        <p>A Resource Sharing Platform For Students and Professionals</p>
      </header>
      <div className="flex w-full gap-4 justify-center">
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
    </div>
  );
  const batch = await prisma.batchUser.findMany({
    where: { userId: user?.id },
  });

  // const batchName = await prisma.batch.findMany( { where : {  })
  console.log(batch);

  if (batch.length !== 0 && session) {
    content = null;
    // content = (
    // <div className="flex flex-col gap-3">
    //   {batch.map((batchName) => (
    //     <Link
    //       href="/"
    //       className="border-1 w-1/4 overflow-hidden border-black shadow-sm shadow-black p-3 "
    //       key={batchName.batchId}
    //     >
    //       {batchName.batchId}
    //     </Link>
    //   ))}
    // </div>
    // );
    batchContent = (
      <div className="w-full border-1 border-black shadow-sm shadow-black">
        <div>
          {batch.map((value) => (
            <h1 key={value.batchId}>{value.batchId}</h1>
          ))}
        </div>
      </div>
    );
  }
  // }

  // if (session && !user?.batchId) {
  // content = <div className="">U are in a Batch {user?.batchId}</div>;
  // }
  return (
    <div className="flex  flex-col p-4 justify-center items-center">
      <Navbar />
      <main className="flex sm:w-2xl w-5/6 justify-center items-start">
        <div className="">{content}</div>
        <div className="">{batchContent}</div>
      </main>
    </div>
  );
}
