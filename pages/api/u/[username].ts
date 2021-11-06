import { NextApiRequest, NextApiResponse } from "next";
import dbConncect from "utils/dbConnect";
import UserProjectModel from "models/userProject";
import User, { UserInterface } from "models/User/User.model";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method == "GET") {
    await dbConncect();
    const user = await User.findOne({ username: req.query.username });
    if (user) {
      // @ts-ignore
      const copyOfUser: UserInterface & { password: never; _id: string } = {
        username: user.username,
        _id: user._id,
        isAccountVerified: user.isAccountVerified,
        active: user.active, // shows if the student is alumni or not

        fullName: user.fullName,
        email: user.email,
        avatar: user.avatar,

        banner: user.banner,
        bio: user.bio,
        status: user.status,

        gender: user.gender,

        roles: user.roles,

        roleInTechnoNatura: user.roleInTechnoNatura,

        alumni: user.alumni,
      };
      const userProject = await UserProjectModel.findOne({ userId: user._id });
      console.log(userProject);

      if (!userProject) {
        res.send({
          message: "User found!",
          status: "success",
          user: copyOfUser,
        });
      }
      res.send({
        message: "User project found!",
        status: "success",
        userProject: userProject,
        user: copyOfUser,
      });
      return;
    }
    res.send({ message: "user not found", status: "error" });
    return;
  }

  res.send({});
};

export default handler;
