import { NextApiRequest, NextApiResponse } from "next";
import { serialize, CookieSerializeOptions } from "cookie";

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void;
};

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value);

  if (options && "maxAge" in options) {
    // @ts-ignore
    options.expires = new Date(Date.now() + options.maxAge);
    // @ts-ignore
    options.maxAge /= 1000;
  }

  res.setHeader("Set-Cookie", serialize(name, String(stringValue), options));
};

const handler = (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  res.setHeader(
    "Set-Cookie",
    serialize("authCookie", "", {
      maxAge: 1000 * 60 * 60 * 24 * 365 * 2,
      secure: process.env.NODE_ENV !== "development",
      path: "/",
    })
  );

  window.history.back();
};

export default handler;
