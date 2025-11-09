// pages/api/unlock-section.ts
import type { NextApiRequest, NextApiResponse } from "next";
import {NextResponse} from "next/server";

const SECTIONS = [
    { id: "email", password: "innotech-solutions@gmail.com" },
    { id: "data", password: "notifyme" },
    { id: "stats", password: "chartlover" },
];

export async function POST(req: NextResponse) {
    const body = await req.json();
    const { sectionId, password } = body;

    if (password === "tajne-haslo") {
        return NextResponse.json({ success: true });
    }

    return NextResponse.json(
        { success: false, message: "Wrong password" },
        { status: 401 }
    );
}
