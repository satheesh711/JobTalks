// filepath: c:\Users\sathe\OneDrive\Desktop\Git_hub\jobtalks\src\json-server\server.js
const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('src/json-server/JsonServer.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);
server.use(router);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`JSON Server is running on port ${PORT}`);
});