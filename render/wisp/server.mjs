import http from "node:http";
import { server as wisp } from "@mercuryworkshop/wisp-js/server";

const port = Number(process.env.PORT || 10000);

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("ok");
    return;
  }

  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("browser.js wisp endpoint");
});

server.on("upgrade", (req, socket, head) => {
  wisp.routeRequest(req, socket, head);
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Wisp listening on 0.0.0.0:${port}`);
});
