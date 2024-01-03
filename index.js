import http from "http";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const obj = {
  name: "nike",
  brand: "nike",
  capital: "2billion",
};

const fileName = import.meta.url;
const dirName = path.dirname(fileURLToPath(fileName));

const PORT = process.env.PORT || 5000;

const server = http.createServer((req, res) => {
  //   if (req.url === "/") {
  //     fs.readFile(path.join(dirName, "public", "index.html"), (err, content) => {
  //       res.writeHead(200, { "Content-Type": "text/html" });
  //       res.end(content);
  //     });
  //   }
  //   if (req.url === "/api/users") {
  //     const users = [
  //       { name: "Bob Smith", age: 40 },
  //       { name: "John Doe", age: 30 },
  //       { name: "Bobby Lee", age: 40 },
  //     ];
  //     res.writeHead(200, { "Content-Type": "application/json" });
  //     res.end(JSON.stringify(users));
  //   }

  // Build file path

  let filePath = path.join(
    dirName,
    "public",
    req.url === "/" ? "index.html" : req.url
  );

  // Extension of file
  let extname = path.extname(filePath);
  let contentType = "text/html";

  switch (extname) {
    case ".js":
      contentType = "text/javascript";
      break;
    case ".css":
      contentType = "text/css";
      break;
    case ".json":
      contentType = "application/json";
      break;
    case ".png":
      contentType = "image/png";
      break;
    case ".jpg":
      contentType = "image/jpg";
      break;
  }

  // Readfile
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === "ENOENT") {
        // Page not found
        fs.readFile(
          path.join(dirname, "public", "404.html"),
          (err, content) => {
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(content, "utf-8");
          }
        );
      } else {
        //Some server error
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      //Succss
      res.writeHead(200, { "Content-Type": contentType });
      res.end(content, "utf-8");
    }
  });

  //   res.end();
});

server.listen(PORT, () => console.log(`server running on Port: ${PORT}`));

// const server = http.createServer((req, res) => {
//   if (req.url === "/") {
//     res.setHeader("Content-Type", "application/json");
//     res.end(JSON.stringify(obj));
//   }
// });

// const PORT = process.env.PORT || 5000;

// server.listen(PORT, () => console.log(`Server running on ${PORT}`));
