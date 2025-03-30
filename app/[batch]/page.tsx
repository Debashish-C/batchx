import prisma from "@/lib/prisma";
import NavbarBatch from "@/ui/Navbar";

export default async function Page({ params }: { params: { batch: string } }) {
  console.log("Received params:", params); // Debugging

  // Ensure params.batch exists before querying
  if (!params.batch) {
    return <div>Error: Missing batch parameter</div>;
  }

  const batch = await prisma.batch.findUnique({
    where: {
      id: "cm8soln05000b2nxrjj0fnvz1", // Using batch string from URL
    },
  });

  if (!batch) {
    return <div>{params.batch}</div>;
  }

  return (
    <div className="flex  flex-col justify-center items-center">
      <NavbarBatch />
      <div className="sm:w-2xl w-5/6 border-1 p-3 border-black shadow-sm shadow-black rounded-md">
        <h1 className="text-2xl font-bold">{batch.name}</h1>
        <p>Batch from URL: {params.batch}</p> {/* Display the batch param */}
        <p>ID from DB: {batch.id}</p>
      </div>
    </div>
  );
}
