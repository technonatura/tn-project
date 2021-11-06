import { NextApiRequest, NextApiResponse } from "next";
import dbConncect from "utils/dbConnect";
import UserProjectModel from "models/userProject";
import User, { UserInterface } from "models/User/User.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    await dbConncect();
    const user = await User.findOne({ username: req.query.username })
      .select("-password")
      .select("-email");
    if (user) {
      const userProject = await UserProjectModel.findOne({ userId: user._id });

      if (!userProject) {
        res.send({
          message: "User found!",
          status: "success",
          user: user,
        });
        return;
      }
      const followers = await UserProjectModel.find({
        follows: userProject.userId,
      });

      // console.log("user");
      res.send({
        message: "User project found!",
        status: "success",
        userProject: { ...userProject._doc, followers },
        user: user,
      });
      return;
    }
    res.send({ message: "user not found", status: "error" });
    return;
  }

  res.send("yow!");
};

export default handler;
