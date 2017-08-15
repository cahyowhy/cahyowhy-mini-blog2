export const generateRandomId = function () {
  return Math.random().toString(36).substr(2, 124) + Math.random().toString(36).substr(2, 124) + Math.random().toString(36).substr(2, 124) + ".jpg";
};
