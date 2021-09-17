const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

const PORT = process.env.PORT ?? config.get("port");
const app = express();

app.use(express.json({ extended: true }));
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/links.routes"));
app.use("/t", require("./routes/redirect.routes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

async function start() {
  try {
    await mongoose.connect(
      config.get("mongoUri"),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      () => {}
    );
    app.listen(PORT, () => {
      console.log(`Server is working on ${PORT} port`);
    });
  } catch (e) {
    console.log(e.message);
    process.exit(1);
  }
}

start().then();