var express = require('express');
var router = express.Router();

const Song = require('../models/Song')
const SongController = require('../controllers/song_controller')

/* GET home page. */
router.get('/', SongController.getSong);
router.post('/', SongController.createSong);

// Edit page
router.get('/:id/edit', SongController.getEdit);
router.post('/:id/edit', SongController.updateSong);

// Delete
router.post('/:id/delete', SongController.deleteSong);

module.exports = router;

// APIs

// GET API

router.get('/api', SongController.getSongApi);
router.post('/api', SongController.createSongApi);

// EDIT API

router.get('/api/:id', SongController.getSingleSongApi);
router.post('/api/:id/edit', SongController.updateSongApi);

// DELETE API

router.delete('/api/:id/delete', SongController.deleteSongApi);
