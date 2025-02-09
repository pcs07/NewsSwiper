import { articles, type Article, type InsertArticle, getTodayDate } from "@shared/schema";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export interface IStorage {
  getArticles(date?: string): Promise<Article[]>;
  getArticle(id: number, date?: string): Promise<Article | undefined>;
}

export class MemStorage implements IStorage {
  private articles: Map<string, Article[]>;

  constructor() {
    this.articles = new Map();
    this.initializeData();
  }

  private async initializeData() {
    try {
      const jsonPath = path.join(__dirname, '..', 'shared', 'dailyNews.json');
      const data = await fs.readFile(jsonPath, 'utf-8');
      const newsData = JSON.parse(data);

      Object.entries(newsData).forEach(([date, articles]) => {
        this.articles.set(date, articles as Article[]);
      });
    } catch (error) {
      console.error('Error loading news data:', error);
      this.articles.set(getTodayDate(), []);
    }
  }

  async getArticles(date: string = getTodayDate()): Promise<Article[]> {
    return this.articles.get(date) || [];
  }

  async getArticle(id: number, date: string = getTodayDate()): Promise<Article | undefined> {
    const articles = await this.getArticles(date);
    return articles.find(article => article.id === id);
  }
}

export const storage = new MemStorage();