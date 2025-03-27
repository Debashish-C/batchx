"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Router } from "next/router";
import { redirect } from "next/navigation";
const CreateBatch: React.FC = () => {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDesc] = useState("");

  const submitData = async (e: React.SyntheticEvent) => {
    console.log("trying to submit data");

    e.preventDefault();
    try {
      const body = { name, title, description };
      const result = await fetch(`/api/batch`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      console.log(result);
      await redirect("/");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <form
      onSubmit={submitData}
      className="sm:w-xl w-5/6 bg-transparent min-h-60 rounded-2xl pb-4 flex flex-col justify-start items-center gap-3  shadow-2xl shadow-black text-center p-2"
    >
      <h1 className="text-xl font-bold">Create Your BatchX </h1>
      <div className="flex flex-col p-3 w-full items-start">
        <label htmlFor="" className="p-1">
          Batch Name
        </label>
        <input
          type="text"
          placeholder="Enter Your Batch Name"
          className="w-full border-1 border-black p-1 rounded-md"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-3 w-full items-start">
        <label htmlFor="" className="p-1">
          Enter Title Of Your Batch
        </label>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-1 border-1 border-black rounded-md"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col p-3 w-full items-start">
        <label htmlFor="" className="p-1">
          Description
        </label>
        <textarea
          name=""
          id=""
          placeholder="A description of Your Batch"
          className="w-full p-1 border-1 border-black rounded-md"
          value={description}
          onChange={(e) => setDesc(e.target.value)}
        />
      </div>
      <div className="flex gap-4">
        <button>
          <Link
            href="/"
            className="p-3 pl-3 pr-3 border-1 border-blue-500 rounded-md"
          >
            Cancel
          </Link>
        </button>
        <input
          type="submit"
          disabled={!name || !title}
          className="p-2 pl-3 pr-3 bg-slate-800 font-bold text-white rounded-md"
          value="Create"
        />
      </div>
    </form>
  );
};

export default CreateBatch;
