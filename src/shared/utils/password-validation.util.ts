export const passwordValidator = (password: string): boolean => {
  const regex = /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};
