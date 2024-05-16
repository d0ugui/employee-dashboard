import express from "express";
import mongoose from "mongoose";
import { router } from "./routes";

const app = express();

mongoose
  .connect("mongodb://root:root@localhost:27017")
  .then(() => {
    const port = 3333;

    app.use((req, res, next) => {
      res.setHeader("Access-Control-Allow-Origin", "*");
      res.setHeader("Access-Control-Allow-Methods", "*");
      res.setHeader("Access-Control-Allow-Headers", "*");

      next();
    });

    app.use(express.json());
    app.use(router);

    app.listen(port, () => {
      console.log(`🚀 Server is running on http://localhost:${port}`);
    });
  })
  .catch(() => console.log("Erro ao conectar ao MongoDB"));
