import express from 'express';
import cors from 'cors';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(__dirname, 'src/app/data');
const PROJECTS_FILE = path.join(DATA_DIR, 'persistent_projects.json');
const GALLERY_FILE = path.join(DATA_DIR, 'persistent_gallery.json');

// Ensure data files exist
async function ensureFiles() {
    await fs.ensureDir(DATA_DIR);
    if (!(await fs.pathExists(PROJECTS_FILE))) {
        await fs.writeJson(PROJECTS_FILE, []);
    }
    if (!(await fs.pathExists(GALLERY_FILE))) {
        await fs.writeJson(GALLERY_FILE, []);
    }
}

ensureFiles();

app.get('/api/projects', async (req, res) => {
    try {
        const data = await fs.readJson(PROJECTS_FILE);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read projects' });
    }
});

app.post('/api/projects', async (req, res) => {
    try {
        await fs.writeJson(PROJECTS_FILE, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save projects' });
    }
});

app.get('/api/gallery', async (req, res) => {
    try {
        const data = await fs.readJson(GALLERY_FILE);
        res.json(data);
    } catch (err) {
        res.status(500).json({ error: 'Failed to read gallery' });
    }
});

app.post('/api/gallery', async (req, res) => {
    try {
        await fs.writeJson(GALLERY_FILE, req.body);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: 'Failed to save gallery' });
    }
});

app.listen(PORT, () => {
    console.log(`Persistence server running at http://localhost:${PORT}`);
});
