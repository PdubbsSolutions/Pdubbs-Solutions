const fs = require("fs");
const path = require("path");

function updatePaths(dir, oldPath, newPath) {
    fs.readdirSync(dir).forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            updatePaths(filePath, oldPath, newPath); // Recursively check directories
        } else if (stat.isFile() && file.endsWith(".html")) {
            let content = fs.readFileSync(filePath, "utf-8");
            content = content.replace(new RegExp(oldPath, "g"), newPath); // Replace old paths with new paths
            fs.writeFileSync(filePath, content, "utf-8");
        }
    });
}

// Example usage
// Update these paths based on your needs
const oldPath = "old/path";
const newPath = "new/path";
updatePaths("/public", oldPath, newPath);
