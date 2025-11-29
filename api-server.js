import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { promisify } from "util";
import { fileURLToPath } from "url";
import { installGlobals } from "@remix-run/node";
import ignoreStyles from "ignore-styles";
import bodyParser from "body-parser";
import pkg from "@prisma/client";

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const englishI18n = await import("@shopify/polaris/locales/en.json", {
  assert: { type: "json" },
}).then((m) => m.default);


// ----------------------------------------------
// FIX 1 — ignore CSS imports BEFORE Remix loads
// ----------------------------------------------
ignoreStyles.default([".css", ".scss", ".sass"]);

// Install Remix globals (fetch, Headers, etc.)
installGlobals();

const { PrismaClient } = pkg;
const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// ----------------------------------------------
// MIDDLEWARE
// ----------------------------------------------
app.use(cors());
app.use(express.json());      // correct
app.use(bodyParser.json());   // optional

// ----------------------------------------------
// STATIC STOREFRONT FILES
// ----------------------------------------------
app.use("/diamond-filter", express.static(path.join(__dirname, "public")));

app.use(
  "/assets",
  express.static(path.join(__dirname, "public", "assets"), {
    setHeaders: (res, filePath) => {
      if (filePath.endsWith(".css")) res.setHeader("Content-Type", "text/css");
      if (filePath.endsWith(".js")) res.setHeader("Content-Type", "application/javascript");
      if (filePath.endsWith(".svg")) res.setHeader("Content-Type", "image/svg+xml");
    },
  })
);

// ----------------------------------------------
// API ROUTES (must be BEFORE Remix)
// ----------------------------------------------

// products
app.get("/api/products", async (req, res) => {
  try {
    // your existing filter logic reused exactly:
    const page = parseInt(req.query.page) || 1;
    const perPage = parseInt(req.query.perPage) || 25;

    const shapes = req.query.Shape ? decodeURIComponent(req.query.Shape).split(",") : [];

    const priceMin = req.query.price_min ? parseFloat(req.query.price_min) : undefined;
    const priceMax = req.query.price_max ? parseFloat(req.query.price_max) : undefined;

    const caratMin = req.query.carat_min ? parseFloat(req.query.carat_min) : undefined;
    const caratMax = req.query.carat_max ? parseFloat(req.query.carat_max) : undefined;

    const colorMin = req.query.color_min || undefined;
    const colorMax = req.query.color_max || undefined;

    const clarityMin = req.query.clarity_min || undefined;
    const clarityMax = req.query.clarity_max || undefined;

    const cutMin = req.query.cut_min ? decodeURIComponent(req.query.cut_min) : undefined;
    const cutMax = req.query.cut_max ? decodeURIComponent(req.query.cut_max) : undefined;

    const skip = (page - 1) * perPage;
    const take = perPage;

    const filterCriteria = {};

    if (shapes.length > 0) filterCriteria.shape = { in: shapes };

    if (priceMin || priceMax)
      filterCriteria.finalPrice = {
        ...(priceMin && { gte: priceMin }),
        ...(priceMax && { lte: priceMax }),
      };

    if (caratMin || caratMax)
      filterCriteria.weight = {
        ...(caratMin && { gte: caratMin }),
        ...(caratMax && { lte: caratMax }),
      };

    if (colorMin || colorMax)
      filterCriteria.color = {
        ...(colorMin && { gte: colorMin }),
        ...(colorMax && { lte: colorMax }),
      };

    if (clarityMin || clarityMax)
      filterCriteria.clarity = {
        ...(clarityMin && { gte: clarityMin }),
        ...(clarityMax && { lte: clarityMax }),
      };

    if (cutMin || cutMax)
      filterCriteria.cutGrade = {
        ...(cutMin && { gte: cutMin }),
        ...(cutMax && { lte: cutMax }),
      };

    const products = await prisma.diamond_api.findMany({
      where: filterCriteria,
      skip,
      take,
    });

    const totalCount = await prisma.diamond_api.count({ where: filterCriteria });
    const totalPages = Math.ceil(totalCount / perPage);

    res.json({
      products,
      pagination: {
        currentPage: page,
        perPage,
        totalPages,
        totalCount,
      },
    });
  } catch (err) {
    console.log("Error:", err);
    res.status(500).json({ error: "Error fetching products" });
  }
});

// get color
app.get("/api/get-color", async (req, res) => {
  try {
    const colorSetting = await prisma.colorsetting.findFirst({
      orderBy: { createdAt: "desc" },
    });

    res.json({ color: colorSetting?.color || "#ffffff" });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch color" });
  }
});

// save color
app.post("/api/save-color", async (req, res) => {
  try {
    const { color } = req.body;
    if (!color) return res.status(400).json({ error: "No color provided" });

    await prisma.colorsetting.create({ data: { color } });

    res.json({ message: "Color saved successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save color" });
  }
});

// ------------------------------------------------------
// REMIX HANDLER — MUST BE LAST
// ------------------------------------------------------
import * as remixBuild from "./build/index.js";
import { createRequestHandler } from "@remix-run/express";

app.all(
  "*",
  createRequestHandler({
    build: remixBuild,
    mode: process.env.NODE_ENV,
    getLoadContext() {
      return { prisma };
    },
  })
);

// ------------------------------------------------------
app.listen(PORT, () => {
  console.log(`Running on http://localhost:${PORT}`);
});
