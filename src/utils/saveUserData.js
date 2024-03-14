export const setInfo = (userInfo) => {
  localStorage.setItem("user", JSON.stringify(userInfo));
};

export const getInfo = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export const clearInfo = () => {
  localStorage.removeItem("user");
};
