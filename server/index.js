const express = require("express");
const bodyParser = require("body-parser");
const compression = require("compression");
const app = express();
const PORT = process.env.PORT || 3001;

// Setting up middlewares
app.use(compression());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Demo api route
app.get("/api/test", (req, res) => {
  res.json({ text: "Successfully fetched data from server." });
});

// Serve production build of client
if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client/build"));

  app.get("*", (req, res) => {
    res.sendFile("../client/build/index.html");
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port: ${PORT}`);
});
