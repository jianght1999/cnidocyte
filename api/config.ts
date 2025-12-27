
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
      const [rows]: any = await pool.query('SELECT * FROM config WHERE id = 1');
      const config = rows[0] || { avatarUrl: '', galleryImages: '[]' };
      return res.status(200).json({
        avatarUrl: config.avatarUrl,
        galleryImages: JSON.parse(config.galleryImages || '[]')
      });
    }

    if (req.method === 'PATCH') {
      const { avatarUrl, galleryImages } = req.body;
      if (avatarUrl !== undefined) {
        await pool.query('UPDATE config SET avatarUrl = ? WHERE id = 1', [avatarUrl]);
      }
      if (galleryImages !== undefined) {
        await pool.query('UPDATE config SET galleryImages = ? WHERE id = 1', [JSON.stringify(galleryImages)]);
      }
      return res.status(200).json({ success: true });
    }

    res.setHeader('Allow', ['GET', 'PATCH']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
