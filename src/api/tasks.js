import { checkResponse } from "@/helpers/check-response";
import { URL } from "@/constants/api";
import { getToken } from "@/helpers/access-token";

export const getTasks = (data) => {
  return fetch(`${URL}/tasks/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const createTask = (data) => {
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};
