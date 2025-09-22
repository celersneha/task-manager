import "dotenv/config"; // This should be first
import app from "./app.js";
import connectDB from "./db/index.js";

connectDB()
  .then(() => {
    app.get("/", (req, res) => {
      res.send("Hello World");
    });

    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port ${process.env.NODE_ENV}`);
    });
  })
  .catch((err) => {
    console.log("MONGO DB connection failed! ", err);
  });

export default app;
