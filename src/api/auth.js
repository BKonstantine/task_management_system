import { checkResponse } from "@/helpers/check-response";
import { URL, userData } from "@/constants/api";

export const login = () => {
  return fetch(`${URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  }).then(checkResponse);
};
