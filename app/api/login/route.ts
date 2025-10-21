import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const SECRET = process.env.JWT_SECRET || "dev_secret";

export async function POST(req: Request) {
    try {
        const { name, nis } = await req.json();

        if (!name || !nis) {
        return NextResponse.json(
            { error: "Missing name or NIS" },
            { status: 400 }
        );
        }

        const token = jwt.sign({ name, nis }, SECRET, { expiresIn: "1m" });
        
        return NextResponse.json({ token });
    } catch {
        return NextResponse.json(
        { error: "Invalid request or JSON format" },
        { status: 400 }
        );
    }
}
