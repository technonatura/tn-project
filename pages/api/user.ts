import { NextApiRequest, NextApiResponse } from "next";
import { UserInterface } from "types/models/User.model";
import axios from "axios";
import dbConncect from "utils/dbConnect";
import UserProjectModel from "models/userProject";

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void;
};

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

const handler = async (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  if (req.method == "POST") {
    const data = await checkTokenRes(req.body.token)();
    if (data.status == "success") {
      await dbConncect();

      const isThere = await UserProjectModel.findOne({ userId: data.user._id });
      if (
        !isThere &&
        // @ts-ignore
        !data.user.roleInTechnoNatura.teacher &&
        // @ts-ignore
        !data.user.roleInTechnoNatura.staff
      ) {
        const user = new UserProjectModel({ userId: data.user._id });
        await user.save();
      }
    }
    res.send(data);
    return;
  }

  res.send("hello!");
  return;
};

export default handler;
