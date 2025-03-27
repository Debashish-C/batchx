import React from "react";
import Link from "next/link";
export default function JoinBatch() {
  return (
    <div className="sm:w-xl w-5/6 bg-transparent pb-8 rounded-2xl flex flex-col justify-start items-center gap-3  shadow-2xl shadow-black text-center p-2">
      <h1 className="text-2xl font-bold">Join Batch</h1>
      <div className="flex w-full flex-col justify-center items-start p-2">
        <label htmlFor="" className="p-1">
          Enter Code Of Your Batch
        </label>
        <input
          type="text"
          placeholder="Batch Code"
          className="p-1 border-1 border-black rounded-md w-full"
        />
      </div>
      <div className="flex gap-4">
        <Link
          href="/"
          className="p-2 pl-3 pr-3 shadow-2xl border-1 border-black font-bold rounded-md "
        >
          Cancel
        </Link>
        <Link
          href="/"
          className="p-2 pl-3 pr-3 shadow-2xl bg-slate-800 text-white rounded-md "
        >
          Send Request
        </Link>
      </div>
    </div>
  );
}
