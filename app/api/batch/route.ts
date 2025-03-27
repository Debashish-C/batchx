import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: Request) {
    const { name, title, description } = await req.json();
    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    const result = await prisma.batch.create({
        data: { name, title, description }
    });

    return new Response(JSON.stringify(result), { status: 200 });
}

export async function PUT(req: Request) {
    const { name, title, description } = await req.json();
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get("id");

    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (!batchId) {
        return new Response(JSON.stringify({ message: "Batch ID is required" }), { status: 400 });
    }

    const result = await prisma.batch.update({
        where: { id: Number(batchId) },
        data: { name, title, description }
    });

    return new Response(JSON.stringify(result), { status: 200 });
}

export async function DELETE(req: Request) {
    const { searchParams } = new URL(req.url);
    const batchId = searchParams.get("id");

    const session = await getServerSession(authOptions);

    if (!session) {
        return new Response(JSON.stringify({ message: "Unauthorized" }), { status: 401 });
    }

    if (!batchId) {
        return new Response(JSON.stringify({ message: "Batch ID is required" }), { status: 400 });
    }

    const result = await prisma.batch.delete({
        where: { id: Number(batchId) }
    });

    return new Response(JSON.stringify(result), { status: 200 });
}
