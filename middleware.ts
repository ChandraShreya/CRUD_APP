// import { NextResponse } from "next/server";
// import { toast } from "react-toastify";

// export function middleware(request: any) {
//   const token = request.cookies.get("token");

//   if (!token) {
//     return NextResponse.redirect URL
//     const url = new URL()
//   }

//   console.log("Token found, proceeding to next response");

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/product/createProduct", "/product/productList"],
// };



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token");

  if (!token) {
    const url = new URL("/auth/signIn", request.url);

    url.searchParams.set("message", "login_required");

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/product/createProduct", "/product/productList", "/product/updateProduct"],
};
