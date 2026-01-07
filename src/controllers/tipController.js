/**
 * Tip Controller - handles HTTP requests for tips
 * Includes emoji logging for fun debugging experience
 */
import * as tipService from '../services/tipService.js';

/**
 * Get all tips
 */
export const getAll = async (req, res, next) => {
  try {
    console.log('📝 Fetching all tips...');
    const tips = await tipService.getAll();
    console.log(`✅ Found ${tips.length} tips`);
    res.json(tips);
  } catch (error) {
    console.log('❌ Error fetching tips:', error.message);
    next(error);
  }
};

/**
 * Get a random tip
 */
export const getRandom = async (req, res, next) => {
  try {
    console.log('🎲 Fetching random tip...');
    const tip = await tipService.getRandom();
    if (!tip) {
      console.log('⚠️ No tips available');
      return res.status(404).json({ error: 'No tips available' });
    }
    console.log(`✅ Random tip: "${tip.title}"`);
    res.json(tip);
  } catch (error) {
    console.log('❌ Error fetching random tip:', error.message);
    next(error);
  }
};

/**
 * Get tip by ID
 */
export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`🔍 Looking for tip with id: ${id}`);
    const tip = await tipService.getById(id);
    if (!tip) {
      console.log(`⚠️ Tip not found: ${id}`);
      return res.status(404).json({ error: 'Tip not found' });
    }
    console.log(`✅ Found tip: "${tip.title}"`);
    res.json(tip);
  } catch (error) {
    console.log('❌ Error fetching tip by ID:', error.message);
    next(error);
  }
};

/**
 * Get tips by topic
 */
export const getByTopic = async (req, res, next) => {
  try {
    const { topic } = req.params;
    console.log(`🏷️ Fetching tips for topic: ${topic}`);
    const tips = await tipService.getByTopic(topic);
    console.log(`✅ Found ${tips.length} tips for topic "${topic}"`);
    res.json(tips);
  } catch (error) {
    console.log('❌ Error fetching tips by topic:', error.message);
    next(error);
  }
};

/**
 * Create a new tip
 */
export const create = async (req, res, next) => {
  try {
    console.log('➕ Creating new tip...');
    const tip = await tipService.create(req.body);
    console.log(`✅ Created tip: "${tip.title}"`);
    res.status(201).json(tip);
  } catch (error) {
    console.log('❌ Error creating tip:', error.message);
    next(error);
  }
};

/**
 * Update a tip
 */
export const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`✏️ Updating tip: ${id}`);
    const tip = await tipService.update(id, req.body);
    if (!tip) {
      console.log(`⚠️ Tip not found for update: ${id}`);
      return res.status(404).json({ error: 'Tip not found' });
    }
    console.log(`✅ Updated tip: "${tip.title}"`);
    res.json(tip);
  } catch (error) {
    console.log('❌ Error updating tip:', error.message);
    next(error);
  }
};

/**
 * Delete a tip
 */
export const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(`🗑️ Deleting tip: ${id}`);
    const deleted = await tipService.remove(id);
    if (!deleted) {
      console.log(`⚠️ Tip not found for deletion: ${id}`);
      return res.status(404).json({ error: 'Tip not found' });
    }
    console.log(`✅ Deleted tip: ${id}`);
    res.status(204).send();
  } catch (error) {
    console.log('❌ Error deleting tip:', error.message);
    next(error);
  }
};

//get tips count by topic
export const getCountByTopic = async (req, res, next) => {
  try {
    const tips = await tipService.getAll();

    const byTopic = {};

    // Loop through all tips to count topics dynamically
    tips.forEach(tip => {
      if (tip.topic) {
        const topic = tip.topic.toLowerCase(); // lowercase for consistency
        if (!byTopic[topic]) {
          byTopic[topic] = 0;
        }
        byTopic[topic]++;
      }
    });

    res.json({
      total: tips.length,
      byTopic
    });
  } catch (error) {
    console.log('❌ Error fetching tips count by topic:', error.message);
    next(error);
  }
}
