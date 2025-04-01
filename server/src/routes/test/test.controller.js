const path = require("path");

function getGhost(req, res) {
  res.sendFile(
    path.join(__dirname, "..", "..", "test_page", "index.html")
  );
}

function getGhostX(req, res) {
  res.sendFile(path.join(__dirname, "..", "..", "test_page", "x.html"));
}

function myJson(req, res) {
  res.json({ a: 1, b: 2, c: 3, arr: [123, "abc", "xyz"] });
}

module.exports = {
  getGhost,
  getGhostX,
  myJson,
};
