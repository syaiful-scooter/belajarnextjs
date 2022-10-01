import jwtDecode from "jwt-decode";

const initialState: any = {
  token: null,
  auth: {},
};

interface IUser {
  email: string;
  is: string;
  name: string;
  role: string;
  username: string;
}

const createAuthSlice = (set: any, get: any) => ({
  ...initialState,
  setToken: (token: string) => {
    const decodedToken: { token: string; user: IUser } = jwtDecode(token);
    set({
      token,
      auth: decodedToken.user,
    });
    // console.log("ini decoded toklen : ", decodedToken);
  },
});

export default createAuthSlice;
