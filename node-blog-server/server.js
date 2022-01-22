import express from "express";
import cors from "cors";

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ encoded: true }));

const PORT = 8000;

app.get("/", (req, res) => {
  res.json("Welcome to the backend server");
});

require("./app/routes/blog.routes")(app);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
