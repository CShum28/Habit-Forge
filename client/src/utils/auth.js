import { jwtDecode } from "jwt-decode";

export const getDecodedJWT = () => {
  const token = localStorage.getItem("jwt");
  if (!token) {
    return null;
  }

  try {
    return jwtDecode(token);
  } catch (err) {
    console.log("Invalid token: ", err);
    return null;
  }
};
