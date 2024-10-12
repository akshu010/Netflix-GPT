export const checkValidData = (
  email,
  password,
  name,
  createPassword,
  isSignIn
) => {
  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const passwordRegex =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const isValidName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/.test(name);

  if (!isEmailValid) return "Email is not valid";

  if (isSignIn) {
    if (!password) return "Password is required";
    if (!passwordRegex.test(password)) return "Password is not valid";
  }

  if (!isSignIn) {
    if (!isValidName) return "Enter full Name";
    if (!createPassword) return "Create password is required";
    if (!passwordRegex.test(createPassword))
      return "Create password is not valid";
  }

  return null;
};
