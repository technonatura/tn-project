import axios from "axios";
import { UserProjectInterface } from "models/userProject";
import { UserInterface } from "models/User/index";

export default async function getUser(username: string): Promise<{
  message: string;
  status: "success" | "error" | "info";
  userProject?: UserProjectInterface;
  user?: UserInterface;
}> {
  const user = await axios.get<{
    data: {
      message: string;
      status: "success" | "error" | "info";
      userProject?: UserProjectInterface;
      user?: UserInterface;
    };
  }>(`${process.env.NEXT_PUBLIC_SELF}/api/u/${username}`);
  //   console.log(user);

  // @ts-ignore
  return user.data;
}
