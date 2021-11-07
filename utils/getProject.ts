import axios from "axios";

import { ProjectPostInterface } from "types/models/Project/index";

export default async function getUser(name: string): Promise<{
  message: string;
  status: "success" | "error" | "info";
  project?: ProjectPostInterface;
}> {
  const project = await axios.get<{
    data: {
      message: string;
      status: "success" | "error" | "info";
      project?: ProjectPostInterface;
    };
  }>(`${process.env.NEXT_PUBLIC_SERVER}/project/${name}`);
  //   console.log(project);

  // @ts-ignore
  return project.data;
}
