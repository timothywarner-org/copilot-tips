/**
 * Tip Service - business logic for tip operations
 * Reads from /data/tips.json file
 */
import { readFile, writeFile } from 'fs/promises';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DATA_FILE = join(__dirname, '../../data/tips.json');

/**
 * Read tips from JSON file
 */
async function readTips() {
  try {
    const data = await readFile(DATA_FILE, 'utf8');
    const parsed = JSON.parse(data);
    // Handle both array format and {tips: []} format
    return Array.isArray(parsed) ? parsed : (parsed.tips || []);
  } catch (error) {
    console.log('⚠️ Could not read tips file, returning empty array');
    return [];
  }
}

/**
 * Write tips to JSON file
 */
async function writeTips(tips) {
  await writeFile(DATA_FILE, JSON.stringify(tips, null, 2));
}

/**
 * Get all tips
 */
export const getAll = async () => {
  return readTips();
};

/**
 * Get a random tip
 */
export const getRandom = async () => {
  const tips = await readTips();
  if (tips.length === 0) return null;
  const randomIndex = Math.floor(Math.random() * tips.length);
  return tips[randomIndex];
};

/**
 * Get tip by ID
 */
export const getById = async (id) => {
  const tips = await readTips();
  // Support both string and number IDs
  return tips.find(tip => String(tip.id) === String(id));
};

/**
 * Get tips by topic
 */
export const getByTopic = async (topic) => {
  const tips = await readTips();
  return tips.filter(tip =>
    tip.topic?.toLowerCase() === topic.toLowerCase()
  );
};

/**
 * Create a new tip
 */
export const create = async (data) => {
  const tips = await readTips();
  const newTip = {
    id: String(tips.length + 1),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tips.push(newTip);
  await writeTips(tips);
  return newTip;
};

/**
 * Update a tip
 */
export const update = async (id, data) => {
  const tips = await readTips();
  const index = tips.findIndex(tip => String(tip.id) === String(id));
  if (index === -1) return null;

  tips[index] = {
    ...tips[index],
    ...data,
    id, // Preserve original ID
    updatedAt: new Date().toISOString()
  };
  await writeTips(tips);
  return tips[index];
};

/**
 * Delete a tip
 */
export const remove = async (id) => {
  const tips = await readTips();
  const index = tips.findIndex(tip => String(tip.id) === String(id));
  if (index === -1) return false;

  tips.splice(index, 1);
  await writeTips(tips);
  return true;
};
