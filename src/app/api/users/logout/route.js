import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const cookieStore = cookies();

    //delete the cookie
    cookieStore.delete("token");

    return NextResponse.json({
      success: true,
      message: "You have logged out successfully.",
    });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
