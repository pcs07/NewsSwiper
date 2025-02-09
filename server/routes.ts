import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { getTodayDate } from "@shared/schema";

export function registerRoutes(app: Express): Server {
  app.get("/api/articles", async (req, res) => {
    const date = (req.query.date as string) || getTodayDate();
    const articles = await storage.getArticles(date);
    res.json(articles);
  });

  app.get("/api/articles/:id", async (req, res) => {
    const date = (req.query.date as string) || getTodayDate();
    const article = await storage.getArticle(parseInt(req.params.id), date);
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(article);
  });

  const httpServer = createServer(app);
  return httpServer;
}