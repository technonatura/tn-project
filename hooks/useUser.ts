import { useEffect } from "react";
import { useCookies } from "react-cookie";

import { useRouter } from "next/router";

import useSWR from "swr";
import axios from "axios";

import { useDispatch } from "react-redux";

import { UserCheckTokenSuccess, UserAuthFail } from "global/actions/auth";

import { UserInterface } from "types/models/User.model";
import { UserProjectInterface } from "models/userProject";

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
//   .eyJwYXNzd29yZCI6IiQyYiQxMCRILk9yQ1lXbGZZeGE2Rk5PSkoyQ251bzBLSEZZRVVNN0hlMDlEbVdZci9KN0picnNWNm5PSyIsIl9pZCI6IjYxMGU3NDUwMjE3ZWEzOGNmMTY2ODhmNCIsImlhdCI6MTYyODMzNzIzMiwiZXhwIjoxNjU5ODk0ODMyfQ
//   .xlPL -
//   qovbTLegx7qZ8SR08LdYDxu443LVdWWGgL -
//   O4Y;
const checkTokenRes = (authToken: string) => async () =>
  (
    await axios.post<
      { token: string },
      {
        data:
          | { status: "warning" | "error"; message: string }
          | { status: "success"; user: UserInterface; message: "string" };
      }
    >(`${process.env.NEXT_PUBLIC_SERVER}/auth/checkJWT`, {
      token: authToken,
    })
  ).data;

// eslint-disable-next-line spaced-comment
/*{
  redirectTo = false,
  redirectIfFound = false,
}: {
  redirectTo: false | string;
  redirectIfFound: boolean;
}*/
export default function useUser() {
  const router = useRouter();
  const [authCookie] = useCookies([
    process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie",
  ]);

  const { data: user, mutate: mutateUser } = useSWR<
    | {
        status: "error" | "warning";
        message: string;
      }
    | {
        status: "success";
        user: UserInterface;
        token: string;
      }
  >(
    // @ts-ignore
    `/api/user?token=${process.env.NEXT_PUBLIC_COOKIE_PASSWORD}`,
    checkTokenRes(
      authCookie[process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie"]
    )
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // if no redirect needed, just return (example: already on /dashboard)
    // if user data not yet there (fetch in progress, logged in or not) then don't do anything yet

    if (!user) return;

    if (
      user.status === "success" &&
      ["/login", "/signin", "/register", "/signup"].includes(router.pathname)
    ) {
      if (String(router.query.app) == "tn-project") {
        // console.log(router.query);
      } else {
        router.push("/");
      }
    }
    if (
      user.status !== "success" &&
      !["/login", "/signin", "/register", "/signup"].includes(
        router.pathname
      ) &&
      ["/account", "/my", "/"].includes(router.pathname)
    ) {
      router.push(`/login?to=${router.pathname}`);
    }

    if (user.status === "success") {
      register();
    } else {
      dispatch(UserAuthFail(user.message));
    }
  }, [user]);

  async function register() {
    if (user && user.status == "success") {
      const self = await axios.post<
        { userId: string; roleInTechnoNatura: any },
        {
          data: UserProjectInterface;
        }
      >(`/api/register`, {
        userId: user.user._id,
        roleInTechnoNatura: user.user.roleInTechnoNatura,
      });

      dispatch(
        UserCheckTokenSuccess(
          user.user,
          authCookie[
            process.env.NEXT_PUBLIC_AUTH_TOKEN_COOKIE_NAME || "authCookie"
          ],
          self.data
        )
      );
    }
  }

  return { user, mutateUser, isLoading: true };
}
