const mongoose = require('mongoose');
const Song = require('../models/Song')

exports.getSong = (req, res) => {
  Song.find()
    .then((allsongs) => {
      // index refers to the to the file name index in the views folder
      res.render('index', {allsongs: allsongs, title: 'Music Station'})
    });
};

exports.getSongApi = (req, res) => {
  Song.find()
    .then((allsongs) => {
      // index refers to the to the file name index in the views folder
      res.json(allsongs)
    });
};

exports.createSong = (req, res) => {
  console.log(req)
  const artist = req.body.artist;
  const song_name = req.body.song_name;
  const year = req.body.year;

  let song = new Song ();
  song.artist = artist;
  song.name = song_name;
  song.year = year;

  song.save()
    .then(() => {
      res.redirect('/');
    })
};

exports.createSongApi = (req, res) => {
  console.log(req)
  const artist = req.query.artist;
  const song_name = req.query.song_name;
  const year = req.query.year;

  let song = new Song ();
  song.artist = artist;
  song.name = song_name;
  song.year = year;

  song.save()
    .then(() => {
      res.redirect('/api');
    })
};

exports.getEdit = (req, res) => {
  // edit refers to the file name edit in the views folder
  // Make sure that you start the model/class with a capital letter mate!
  Song.findOne({_id: req.params.id})
    .then(song => {
        res.render('edit', {song: song})
    })
};

exports.getSingleSongApi = (req, res) => {
  // edit refers to the file name edit in the views folder
  // Make sure that you start the model/class with a capital letter mate!
  Song.findOne({_id: req.params.id})
    .then(song => {
        res.json(song)
    })
};

exports.updateSong = (req, res) => {
  // edit refers to the file name edit in the views folder
  // findOneAndUpdate needs three arguements to be passed through! Id, body and this new shit (READ ME - read the docs)
  Song.findOneAndUpdate({ _id: req.params.id}, req.body, {
    new: true
  })
    .then(() => {
      res.redirect('/');
    });
};

exports.updateSongApi = (req, res) => {
  // edit refers to the file name edit in the views folder
  // findOneAndUpdate needs three arguements to be passed through! Id, body and this new shit (READ ME - read the docs)
  Song.findOneAndUpdate({ _id: req.params.id}, req.query, {
    new: true
  })
    .then(() => {
      res.redirect(`/api/${req.params.id}`);
    });
};

exports.deleteSong = (req,res) => {
  Song.findOneAndRemove({ _id: req.params.id})
    .then(() => {
      res.redirect('/');
    });
};

exports.deleteSongApi = (req,res) => {
  Song.findOneAndRemove({ _id: req.params.id})
    .then(() => {
      res.redirect('/api');
    });
};
