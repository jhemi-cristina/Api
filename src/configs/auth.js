module.exports = {
  jwt: {
    secret: Process.env.AUTH_SECRET || "default",
    expiresIn: "1d",
  },
};
