const Domain = require("../domain");
const UserRoutes = require("./user.routes");

module.exports = app => {
  const domain = new Domain();

  // create routes
  const userRoutes = new UserRoutes({ ...domain }).generateRoutes();

  // apply routes to express app
  app.use("/api/users", userRoutes);
};
