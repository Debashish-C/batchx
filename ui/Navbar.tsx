import React from "react";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

import { GetServerSideProps } from "next";

interface PageProps {
  pathname: string;
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const pathname: string = req.url || "";

  return {
    props: {
      pathname,
    },
  };
};

export default async function Navbar() {
  // const isActive: (path: String) => boolean = (path) => pathname === path;
  let session = await getServerSession(authOptions);
  //   if()
  let left, right;
  if (!session) {
    left = (
      <div>
        <Link
          href="/"
          className={`isActive('/') ? 'bg-blue-500 ' : 'bg-red-400' font-bold`}
        >
          BatchX
        </Link>
      </div>
    );
    right = (
      <div className="">
        <Link
          href="/api/auth/signin"
          className="p-2 border-1 rounded-md border-blue-600"
        >
          Login
        </Link>
      </div>
    );
  }

  if (session) {
    left = (
      <div className="w-full flex justify-between items-center">
        <Link href="/">Home</Link>
        <Link href="/announcement">Announcement</Link>
        <Link href="/resource">Resource</Link>
        <Link href="/setting">Setting</Link>
        <Link
          href="/api/auth/signout"
          className="p-1 border-1 border-blue-600 rounded-md"
        >
          Signout
        </Link>
      </div>
    );
    right = null;
  }
  return (
    <div className="w-full flex justify-center items-center">
      <div
        className="max-w-2xl sm:w-xl w-5/6 flex justify-between items-center p-3
      "
      >
        {left}
        {right}
      </div>
    </div>
  );
}
