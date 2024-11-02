import { NextFetchEvent, NextRequest, NextResponse } from "next/server";

import { getToken } from "next-auth/jwt";
import { Locale, i18n } from "@/i18n.config";
import { CustomMiddleware } from "./chain";
import { cookies } from "next/headers";
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
    return middleware(request, event, response);
  };
}
