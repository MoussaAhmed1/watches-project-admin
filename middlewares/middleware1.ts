import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { Locale, i18n } from "@/i18n.config";
import { CustomMiddleware } from "./chain";
import { cookies } from "next/headers";
import { getSession } from "next-auth/react";
const protectedPaths = ["/dashboard"];

function getProtectedRoutes(protectedPaths: string[], locales: Locale[]) {
  let protectedPathsWithLocale = [...protectedPaths];

  protectedPaths.forEach((route) => {
    locales.forEach(
      (locale) =>
        (protectedPathsWithLocale = [
          ...protectedPathsWithLocale,
          `/${locale}${route}`,
        ]),
    );
  });

  return protectedPathsWithLocale;
}
export function withAuthMiddleware(middleware: CustomMiddleware) {
  return async (request: NextRequest, event: NextFetchEvent) => {
    // Create a response object to pass down the chain
    const response = NextResponse.next();

    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
    // @ts-ignore
    request.nextauth = request.nextauth || {};
    // @ts-ignore
    request.nextauth.token = token;
    const pathname = request.nextUrl.pathname;

    const protectedPathsWithLocale = getProtectedRoutes(protectedPaths, [
      ...i18n.locales,
    ]);

    const apiToken = cookies()?.get("access_token")?.value;
    if (
      !(apiToken && token) &&
      (protectedPathsWithLocale.includes(pathname) ||
        pathname.includes("dashboard"))
    ) {
      const signInUrl = new URL("/api/auth/signin", request.url);
      signInUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(signInUrl);
    }
    // permissions you can make a preAction
    const _permissions = cookies()?.get("permissions")?.value ?? "";
    if (_permissions) {
      const ifUserHasPermission = (path: string) => {
        path =
          path?.startsWith("/en") || path?.startsWith("/ar")
            ? path.split("/")[3]
            : path.split("/")[2];
        if (path?.includes("profile") || path === undefined) {
          return true;
        }
        // console.log("p_itemsath", path);
        if (
          (path?.includes("admins") ||
            path?.includes("doctors") ||
            path?.includes("nurses") ||
            path?.includes("patients") ||
            path?.includes("pharmacies")) &&
          _permissions?.includes("Users")
        ) {
          return true;
        }

        if (
          (path?.includes("reservations") ||
            path?.includes("pharmacy-orders") ||
            path?.includes("nurse-orders")) &&
          _permissions?.includes("Orders")
        ) {
          return true;
        }

        if (path?.includes("banars") && _permissions?.includes("Banners")) {
          return true;
        }

        if (path?.includes("packages") && _permissions?.includes("Packages")) {
          return true;
        }

        if (
          path?.includes("cancel-requests") &&
          _permissions?.includes("Cancel Requests")
        ) {
          return true;
        }
        if (
          path?.includes("notifications") &&
          _permissions?.includes("Notifications")
        ) {
          return true;
        }
        if (path?.includes("messages") && _permissions?.includes("Messages")) {
          return true;
        }

        if (
          path?.includes("settings") &&
          _permissions?.includes("General Settings")
        ) {
          return true;
        }

        if (
          path?.includes("verification-requests") &&
          _permissions?.includes("Verification Requests")
        ) {
          return true;
        }
        if (
          path?.includes("data-management") &&
          _permissions?.includes("Data Management")
        ) {
          return true;
        }
      };
      // console.log("permissions",permissions)
      // console.log("pathname",pathname)
      // console.log("pathname",pathname.split("/")[3])
      if (!ifUserHasPermission(pathname)) {
        const NotAllowed = new URL("/en/dashboard/not-allowed", request.url);
        return NextResponse.rewrite(NotAllowed);
      }
    }

    return middleware(request, event, response);
  };
}
