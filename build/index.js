// api-server.js
import express from "express";
import pkg from "@prisma/client";
import cors from "cors";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import bodyParser from "body-parser";
import "dotenv";
import { createRequestHandler } from "@remix-run/express";
var { PrismaClient } = pkg, app = express(), prisma = new PrismaClient(), PORT = process.env.PORT || 3e3;
app.use(bodyParser.json());
app.use((req, res, next) => {
  console.log(`[${(/* @__PURE__ */ new Date()).toISOString()}] ${req.method} ${req.path} - Origin: ${req.get("origin")}`), next();
});
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "API server is running" });
});
app.use("/diamond-filter", express.static(path.join(process.cwd(), "public")));
app.use("/assets", express.static(path.join(process.cwd(), "public", "assets"), {
  setHeaders: (res, filePath) => {
    filePath.endsWith(".css") && res.setHeader("Content-Type", "text/css"), filePath.endsWith(".js") && res.setHeader("Content-Type", "application/javascript"), filePath.endsWith(".svg") && res.setHeader("Content-Type", "image/svg+xml");
  }
}));
var readFileAsync = promisify(fs.readFile), writeFileAsync = promisify(fs.writeFile), allowedOrigins = process.env.ALLOWED_ORIGINS || "http://localhost:3000, https://shopify-app-pndl.onrender.com, https://quickstart-fad8588b.myshopify.com, http://192.168.1.136:3000,";
app.use(cors({
  origin: allowedOrigins.split(","),
  methods: ["GET", "POST"],
  // Allow only specific methods
  allowedHeaders: ["Content-Type", "Authorization"],
  // Adjust headers as needed
  credentials: !0
  // If your app uses credentials (like cookies)
}));
app.use(express.json());
app.get("/api/products", async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1, perPage = parseInt(req.query.perPage) || 25, shapes = req.query.Shape ? decodeURIComponent(req.query.Shape).split(",") : [], priceMin = req.query.price_min ? parseFloat(req.query.price_min) : void 0, priceMax = req.query.price_max ? parseFloat(req.query.price_max) : void 0, caratMin = req.query.carat_min ? parseFloat(req.query.carat_min) : void 0, caratMax = req.query.carat_max ? parseFloat(req.query.carat_max) : void 0, colorMin = req.query.color_min ? req.query.color_min : void 0, colorMax = req.query.color_max ? req.query.color_max : void 0, clarityMin = req.query.clarity_min ? req.query.clarity_min : void 0, clarityMax = req.query.clarity_max ? req.query.clarity_max : void 0, cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : void 0, cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : void 0, skip = (page - 1) * perPage, take = perPage, filterCriteria = {};
    shapes.length > 0 && (filterCriteria.shape = { in: shapes }), priceMin !== null && priceMax !== null ? filterCriteria.finalPrice = {
      gte: priceMin,
      lte: priceMax
    } : priceMin !== null ? filterCriteria.finalPrice = {
      gte: priceMin
    } : priceMax !== null && (filterCriteria.finalPrice = {
      lte: priceMax
    }), caratMin !== null && caratMax !== null ? filterCriteria.weight = { gte: caratMin, lte: caratMax } : caratMin !== null ? filterCriteria.weight = { gte: caratMin } : caratMax !== null && (filterCriteria.weight = { lte: caratMax }), colorMin !== null && colorMax !== null ? filterCriteria.color = { gte: colorMin, lte: colorMax } : colorMin !== null ? filterCriteria.color = { gte: colorMin } : colorMax !== null && (filterCriteria.color = { lte: colorMax }), clarityMin !== null && clarityMax !== null ? filterCriteria.clarity = { gte: clarityMin, lte: clarityMax } : clarityMin !== null ? filterCriteria.clarity = { gte: clarityMin } : clarityMax !== null && (filterCriteria.clarity = { lte: clarityMax }), cutMin !== null && cutMax !== null ? filterCriteria.cutGrade = { gte: cutMin, lte: cutMax } : cutMin !== null ? filterCriteria.cutGrade = { gte: cutMin } : cutMax !== null && (filterCriteria.cutGrade = { lte: cutMax });
    let products = await prisma.diamond_api.findMany({
      where: filterCriteria,
      skip,
      take
    }), totalCount = await prisma.diamond_api.count({
      where: filterCriteria
    }), totalPages = Math.ceil(totalCount / perPage);
    res.json({
      products,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalCount
      }
    });
  } catch (error) {
    console.error("Error fetching products:", error), res.status(500).json({ message: "Error fetching products from the database" });
  }
});
app.use(express.json());
app.get("/api/get-color", async (req, res) => {
  try {
    let colorSetting = await prisma.colorsetting.findFirst({
      orderBy: { createdAt: "desc" }
      // Get the most recent color setting
    });
    colorSetting ? res.json({ color: colorSetting.color }) : res.json({ color: "#ffffff" });
  } catch (error) {
    console.error("Error fetching color:", error), res.status(500).json({ error: "Failed to fetch color" });
  }
});
app.post("/api/save-color", async (req, res) => {
  let { color } = req.body;
  if (!color)
    return res.status(400).json({ error: "No color provided" });
  try {
    await prisma.colorsetting.create({
      data: {
        color
      }
    }), res.status(200).json({ message: "Color saved successfully" });
  } catch (error) {
    console.error("Error saving color:", error), res.status(500).json({ error: "Failed to save color" });
  }
});
app.all(
  "*",
  createRequestHandler({
    // build: await import("./build/index.js"), // ⬅️ IMPORTANT
  })
);
app.listen(PORT, () => {
  console.log(`API server is running on http://localhost:${PORT}`);
});
