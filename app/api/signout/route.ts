import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
    const res = NextResponse.json({ success: true });

    res.cookies.set({
        name: "auth",
        value: "",
        maxAge: 0,
        path: "/",
    });

    return res;

}
