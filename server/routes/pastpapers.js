const express = require('express');

const PastpaperController = require('../controllers/pastpapers');

const storage = require('../helpers/pastpaperstorage');

const router = express.Router();

router.get('/', PastpaperController.getPastpaper);

router.post('/', storage, PastpaperController.postPastpaper);

module.exports = router;
