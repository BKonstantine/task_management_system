import { checkResponse } from "@/helpers/check-response";
import { URL } from "@/constants/api";
import { getToken } from "@/helpers/access-token";

export const getCurrentUserRequest = () => {
  return fetch(`${URL}/users/current`, {
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
  }).then(checkResponse);
};
