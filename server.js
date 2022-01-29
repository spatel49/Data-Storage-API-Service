// You are welcome to drop express for any other server implementation
const express = require("express");
const server = express();
const configRoutes = require("./routes");
// const connection = require("./config/mongoConnection");
// const MongoClient = require("mongodb").MongoClient;

let _connection = undefined;

configRoutes(server);

// The tests exercise the server by requiring it as a module,
// rather than running it in a separate process and listening on a port
module.exports = server;

if (require.main === module) {
  // Start server only when we run this on the command line and explicitly ignore this while testing

  const port = process.env.PORT || 3000;
  server.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  });
  // const main = async () => {
  //   if (!_connection) {
  //     _connection = await MongoClient.connect("mongodb://localhost:27017/", {
  //       useNewUrlParser: true,
  //       useUnifiedTopology: true,
  //     });
  //   }
  //   await _connection.close();
  // };
  // main();
}
