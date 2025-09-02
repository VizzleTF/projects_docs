import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { lookup } from 'mime-types';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: filePath } = req.query;
  
  if (!filePath || !Array.isArray(filePath)) {
    return res.status(400).json({ error: 'Invalid path' });
  }

  // Construct the file path
  const projectSlug = filePath[0];
  const fileName = filePath[1];
  
  if (!projectSlug || !fileName) {
    return res.status(400).json({ error: 'Missing project or file name' });
  }

  const fullPath = path.join(process.cwd(), 'content', 'projects', projectSlug, fileName);
  
  // Security check - ensure the path is within the projects directory
  const projectsDir = path.join(process.cwd(), 'content', 'projects');
  if (!fullPath.startsWith(projectsDir)) {
    return res.status(403).json({ error: 'Access denied' });
  }

  try {
    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return res.status(404).json({ error: 'File not found' });
    }

    // Get file stats
    const stats = fs.statSync(fullPath);
    if (!stats.isFile()) {
      return res.status(404).json({ error: 'Not a file' });
    }

    // Determine content type
    const mimeType = lookup(fullPath) || 'application/octet-stream';
    
    // Set headers
    res.setHeader('Content-Type', mimeType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    
    // Stream the file
    const fileStream = fs.createReadStream(fullPath);
    fileStream.pipe(res);
    
  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}