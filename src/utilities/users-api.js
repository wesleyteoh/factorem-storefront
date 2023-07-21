import sendRequest from "./send-request";

const BASE_URL = "/api/users";

export async function signUp(userData) {
  return sendRequest(`${BASE_URL}/register`, "POST", userData);
}

export async function login(userData) {
  return sendRequest(`${BASE_URL}/login`, "POST", userData);
}

export async function checkToken() {
  return sendRequest(`${BASE_URL}/check-token`);
}

export async function userDetail(userData) {
  return sendRequest(`${BASE_URL}/profile`, "POST", userData);
}

export async function updUserDetail(userData) {
  return sendRequest(`${BASE_URL}/profile/update`, "POST", userData);
}
export async function updUserPwd(userData) {
  return sendRequest(`${BASE_URL}/profile/updatePass`, "PUT", userData);
}
