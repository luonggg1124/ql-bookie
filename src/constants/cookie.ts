type SameSite = "lax" | "strict" | "none";
export type CookieOptions = {
  path?: string;
  domain?: string;
  maxAge?: number; // seconds
  secure?: boolean;
  sameSite?: SameSite;
  httpOnly?: boolean;
};

export interface CookieKeyConfig {
  KEY: string;
  OPTIONS: CookieOptions;
}

export interface GlobalCookieKey {
  AUTH: {
    TOKEN: CookieKeyConfig;
  };
  DOMAIN: CookieKeyConfig;
 
}
const MAX_AGE_AUTH = 3 * 24 * 60 * 60; // 3 days in seconds
export const GLOBAL_COOKIES: GlobalCookieKey = {
  AUTH: {
    TOKEN: {
      KEY: "t",
      OPTIONS: {
        maxAge: MAX_AGE_AUTH, 
        path: "/",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax" as const,
        httpOnly: true,
      },
    },
   
  },
  DOMAIN: {
    KEY: "d",
    OPTIONS: {
      path: "/",
      maxAge: MAX_AGE_AUTH,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax" as const,
      httpOnly: true,
    },
  }
};

