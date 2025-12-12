import { NextRequest, NextResponse } from "next/server";

const SECTIONS = [
    { id: "email", password: "corptech@demos.com" },
    { id: "stats", password: "" },
    { id: "auth", password: "D03591TUFF114AS51" }, // Główny auth
];

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { sectionId, password } = body;

        // Znajdź sekcję
        const section = SECTIONS.find(s => s.id === sectionId);

        if (!section) {
            return NextResponse.json(
                { success: false, message: "Nieznana sekcja" },
                { status: 404 }
            );
        }

        // Sprawdź hasło
        if (password === section.password) {
            return NextResponse.json({ success: true });
        }

        return NextResponse.json(
            { success: false, message: "Nieprawidłowe hasło" },
            { status: 401 }
        );
    } catch (error) {
        return NextResponse.json(
            { success: false, message: "Błąd serwera" },
            { status: 500 }
        );
    }
}