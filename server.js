const http = require("http");

// Declaring some random data
const todos = [
  {
    id: 1,
    text: "Todo 1"
  },
  {
    id: 2,
    text: "Todo 2"
  },
  {
    id: 3,
    text: "Todo 3"
  }
];


// Creating a server 
const server = http.createServer((req, res) => {
  let body = [];
  const { headers, url, method } = req;

  // Getting data from Client without Express JS
  req
    .on("data", chunk => {
      body.push(chunk);
    })
    .on("end", () => {
      body = Buffer.concat(body).toString();
      console.log(body);
    });

  // Those two commented lines are just another way to use "writeHead"

  //   res.setHeader("Content-Type", "application/json");
  //   res.setHeader("X-Powered-BY", "JAN");

  // Example how to sent data to user

  let status = 404;
  const response = {
    success: false,
    data: null
  };

  // Change the response based on the request 
  if (method === "GET" && url === "/todos") {
    status = 200;
    response.success = true;
    response.data = todos;
  }

  res.writeHead(status, {
    "Content-Type": "application/json",
    "X-Powered-BY": "JAN"
  });
  res.write("<h1>Hello!</h1>");
  res.write("<h2>Hello Hello !</h2>");

  res.end(JSON.stringify(response));
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
