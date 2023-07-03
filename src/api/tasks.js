import { checkResponse } from "@/helpers/check-response";
import { URL } from "@/constants/api";
import { getToken } from "@/helpers/access-token";

export const getTasksRequest = (data) => {
  return fetch(`${URL}/tasks/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const createTaskRequest = (data) => {
  return fetch(`${URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
    body: JSON.stringify(data),
  }).then(checkResponse);
};

export const getCurrentTaskRequest = (id) => {
  return fetch(`${URL}/tasks/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: getToken(),
    },
  }).then(checkResponse);
};
