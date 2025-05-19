// build/server/root.js
import express from "express";
import path from "path";
import { createRequestHandler } from "@remix-run/express";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";
dotenv.config();
var app = express(), prisma = new PrismaClient();
app.use(express.static(path.join(path.resolve(), "public")));
app.all(
  "*",
  createRequestHandler({
    getLoadContext({ req }) {
      return {
        prisma
        // Add more context if needed
      };
    }
  })
);
var port = process.env.PORT || 3e3;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
