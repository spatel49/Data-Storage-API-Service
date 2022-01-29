const repoRoutes = require("./repoData");

const constructorMethod = (app) => {
  app.use("/data", repoRoutes);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
