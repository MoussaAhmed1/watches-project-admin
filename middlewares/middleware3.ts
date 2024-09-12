import createMiddleware from "next-intl/middleware";
import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { CustomMiddleware } from "./chain";

export const locales = ["en", "ar"] as const;

export const intlMiddleware = createMiddleware({
 // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: "en",
  localeDetection: false,
});

export function withIntlMiddleware(middleware: CustomMiddleware) {
  return async (
    request: NextRequest,
    event: NextFetchEvent,
    response: NextResponse
  ) => {
 
    return intlMiddleware(request)
  }
}