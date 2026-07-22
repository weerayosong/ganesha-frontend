import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
    const path = request.nextUrl.pathname;
    const token = request.cookies.get("admin_token")?.value;

    // 1. ถ้าพยายามเข้าหน้า /admin แล้ว "ไม่มี" คุกกี้ -> ดีดกลับหน้าแรก (เติม ! หน้า token ให้ถูกต้อง)
    if (path.startsWith("/admin") && !token) {
        return NextResponse.redirect(new URL("/", request.url));
    }

    // 2. ป้องกัน API ของ ganeshas ถ้าไม่มีคุกกี้ห้ามแก้ไขข้อมูล
    if (path.startsWith("/api/ganeshas") && request.method !== "GET") {
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized: กรุณาเข้าสู่ระบบก่อนทำรายการ" },
                { status: 401 },
            );
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/ganeshas/:path*"],
};
