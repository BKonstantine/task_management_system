export function saveToken(token) {
  localStorage.setItem("accessToken", token);
}

export function getToken() {
  return `Bearer ${localStorage.getItem("accessToken")}`;
}

export function checkToken(tokenName) {
  const token = localStorage.getItem(tokenName);
  return token ? true : false;
}
