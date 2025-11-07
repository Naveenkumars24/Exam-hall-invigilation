export const saveUserData = (data) => {
  localStorage.setItem("token", data.token);
  localStorage.setItem("name", data.name);
  localStorage.setItem("role", data.role);
};

export const clearUserData = () => {
  localStorage.clear();
};

export const getUserData = () => ({
  token: localStorage.getItem("token"),
  name: localStorage.getItem("name"),
  role: localStorage.getItem("role"),
});
