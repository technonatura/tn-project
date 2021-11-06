import { NextApiRequest, NextApiResponse } from "next";

import dbConncect from "utils/dbConnect";
import UserProjectModel from "models/userProject";

type NextApiRequestWithFoo = NextApiRequest & {
  foo: (bar: string) => void;
};

const handler = async (req: NextApiRequestWithFoo, res: NextApiResponse) => {
  if (req.method == "POST") {
    if (req.body.userId && req.body.roleInTechnoNatura) {
      await dbConncect();

      const isThere = await UserProjectModel.findOne({
        userId: req.body.userId,
      });
      if (!isThere && req.body.roleInTechnoNatura.student) {
        const user = new UserProjectModel({ userId: req.body.userId });
        await user.save();
      }
    }
    res.send("success!");
    return;
  }

  res.send("yo!");
};

export default handler;
