const { existsSync, mkdirSync, rmSync } = require("fs");
const { execSync } = require("child_process");

function deleteDirectory(dirPath) {
  if (existsSync(dirPath) === false)
    return false;
    
  rmSync(dirPath, { recursive: true });
  mkdirSync(dirPath);
}

console.log("Setting things up...");

deleteDirectory("./dist");
deleteDirectory("./ts-out");

try {
  console.log("Compiling TS files");
  execSync("tsc");
  console.log("Compiled successfully!");
} catch (error) {
  console.error("TS Error", error);
  process.exit(1);
}

try {
  console.log("Building distribution version...");
  execSync("rollup -c");
  console.log("Script completed successfully!");
} catch (error) {
  console.error("Rollup Error", error);
  process.exit(1);
}