import Announcement from "@/ui/announcement/Announcement";
import React from "react";

export default function page() {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <Announcement />
      <Announcement />
      <Announcement />
    </div>
  );
}
