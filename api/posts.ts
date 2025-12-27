
import { VercelRequest, VercelResponse } from '@vercel/node';
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: process.env.TIDB_HOST,
  user: process.env.TIDB_USER,
  password: process.env.TIDB_PASSWORD,
  database: process.env.TIDB_DB,
  port: Number(process.env.TIDB_PORT) || 4000,
  ssl: { minVersion: 'TLSv1.2', rejectUnauthorized: true }
});

export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    if (req.method === 'GET') {
      const [rows] = await pool.query('SELECT * FROM posts ORDER BY date DESC');
      return res.status(200).json(rows);
    }

    if (req.method === 'POST') {
      const { id, title, content, category, date, readTime } = req.body;
      await pool.query(
        'INSERT INTO posts (id, title, content, category, date, readTime) VALUES (?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE title=?, content=?, category=?',
        [id, title, content, category, date, readTime, title, content, category]
      );
      return res.status(200).json({ success: true });
    }

    if (req.method === 'DELETE') {
      const { id } = req.query;
      await pool.query('DELETE FROM posts WHERE id = ?', [id]);
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'POST', 'DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
