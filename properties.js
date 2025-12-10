const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../middleware/auth');
const { Property, PropertyImage } = require('../models');

const upload = multer({ dest: 'uploads/' });

router.post('/', auth, upload.array('images', 8), async (req, res) => {
  try {
    const body = req.body;
    const p = await Property.create({ ...body, created_by: req.user.id });
    if (req.files) {
      await Promise.all(req.files.map(f => PropertyImage.create({
        propertyId: p.id,
        url: `/${f.path}`,
        alt_text: f.originalname
      })));
    }
    res.json(p);
  } catch (err) { res.status(400).json({ error: err.message }); }
});

router.get('/', async (req, res) => {
  const props = await Property.findAll({ include: [PropertyImage] , order: [['createdAt','DESC']]});
  res.json(props);
});

router.get('/:id', async (req, res) => {
  const p = await Property.findByPk(req.params.id, { include: [PropertyImage] });
  if (!p) return res.status(404).json({ error: 'Not found' });
  res.json(p);
});

module.exports = router;
