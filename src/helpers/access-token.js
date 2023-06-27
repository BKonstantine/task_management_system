export function saveToken(token) {
  localStorage.setItem("accessToken", token);
}

export function getToken() {
  return `Bearer ${localStorage.getItem("accessToken")}`;
}
