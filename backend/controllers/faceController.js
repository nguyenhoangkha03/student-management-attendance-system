const { recognizeFace } = require('../models/faceModel');

async function detectFace(req, res) {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).json({ error: 'No image provided' });

    const result = await recognizeFace(image);
    return res.json(result);
  } catch (error) {
    console.error('❌ Error processing image:', error);
    return res.status(500).json({ error: 'Error processing image' });
  }
}

module.exports = { detectFace };
