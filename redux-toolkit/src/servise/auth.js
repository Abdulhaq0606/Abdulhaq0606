import axios from "./api";

const AuthServise = {
  async userRegister(user) {
    const data = await axios.post("/users", { user });
    return data;
  },
  async userLogin(user) {
    const { data } = await axios.post("/users/login", { user });
    return data;
  },
  async getUser() {
    const { data } = await axios.get("/user");
    return data;
  },
  async getUsername(username) {
    const { data } = await axios.get(`/profiles/${username}`);
    return data;
  },
};

export default AuthServise;
