import instance from "./interceptor";

// export const mutateLoginApi=(LoginData:())
interface ILoginData {
  username: string;
  password: string;
}

export const mutateLoginApi = async (LoginData: ILoginData) => {
  const { data } = await instance.post("auth/login", LoginData);
  console.log(data);

  return data;
};
