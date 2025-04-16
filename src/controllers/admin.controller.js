export const isAdmin = async (req) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASS
    ) {
      return true;
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    throw new Error(error);
  }
};
