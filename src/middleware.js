import { i18nRouter } from 'next-i18n-router';
import { NextResponse } from 'next/server';

import i18nConfig from '../i18nConfig';
import { LANGUAGES } from './shared/constants';

const SUPPORTED_LOCALES = Object.values(LANGUAGES);

export function middleware(request) {
  const { cookies, nextUrl } = request;
  const currentLocale = cookies.get('NEXT_LOCALE')?.value;

  const stackedLocaleRegex = new RegExp(
    `^/(${SUPPORTED_LOCALES.join('|')})/(${SUPPORTED_LOCALES.join('|')})(/|$)`
  );
  if (stackedLocaleRegex.test(nextUrl.pathname)) {
    nextUrl.pathname = nextUrl.pathname.replace(stackedLocaleRegex, '/$1$3');
    return NextResponse.redirect(nextUrl, 301);
  }

  const hasAnyLocalePrefix = new RegExp(
    `^/(${SUPPORTED_LOCALES.join('|')})(/|$)`
  ).test(nextUrl.pathname);

  if (!currentLocale && !hasAnyLocalePrefix) {
    const defaultLocale = LANGUAGES.DE;
    nextUrl.pathname = `/${defaultLocale}${nextUrl.pathname}`;
    const response = NextResponse.redirect(nextUrl, 301);
    response.cookies.set('NEXT_LOCALE', defaultLocale);
    return response;
  }

  return i18nRouter(request, i18nConfig);
}

export const config = {
  matcher: '/((?!api|static|.*\\..*|_next).*)',
};
