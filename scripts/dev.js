const { execSync } = require("child_process");
const http = require("http");
const path = require("path");
const fs = require("fs");

const PORT = process.env.PORT || 8080;
const INDEX_PATH = path.join(process.cwd(), "src", "dev", "index.html");
const ALLOWED_PATHS = ["/src/dev", "/dist"];
const MYME_TYPES = {
  ".html": "text/html",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpg",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
};

execSync("npm run build");

http.createServer((req, res) => {
  const filePath = req.url === "/" ? INDEX_PATH : ("." + req.url);

  if (!ALLOWED_PATHS.some(allowedPath => req.url.startsWith(allowedPath)) && req.url !== "/")
    if (req.url.includes("."))
      return sendFile(res, req.url);

  return sendFile(res, filePath);
}).listen(PORT);

console.log(`Server running at http://127.0.0.1:${PORT}/`);

function sendFile(res, filePath = INDEX_PATH) {
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = MYME_TYPES[extname] || "application/octet-stream";

    if (fs.existsSync(filePath) === false)
    return sendFile(res);

  const content = fs.readFileSync(filePath);
  res.writeHead(200, { "Content-Type": contentType });
  return res.end(content, "utf-8");
}