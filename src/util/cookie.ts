interface CookieOptions {
    path?: string;
    domain?: string;
    secure?: boolean;
    expires?: number;
}

export const setCookie = (name: string, value: string | number, options: CookieOptions) => {
    const cookieOptions = options;
    const path = cookieOptions.path ? `; path=${cookieOptions.path}` : '';
    const domain = cookieOptions.domain ? `; domain=${cookieOptions.domain}` : '';
    const secure = cookieOptions.secure ? '; secure' : '';
    const date = new Date();
    let expires = '';

    if (cookieOptions.expires) {
        date.setTime(date.getTime() + cookieOptions.expires);
        expires = `; expires=${date.toUTCString()}`;
    }

    document.cookie = [name, '=', value, expires, path, domain, secure].join('');
};

export const readCookie = (cookieName: string): string | undefined => {
    const cookie =
        (document.cookie.match(new RegExp(`(?:^|; )(?:${cookieName}=)([^;]*)`)) || [0, undefined])[1] || undefined;
    return cookie ? cookie.toString() : undefined;
};
