const mongoose = require('mongoose');
// destructuring
const { Schema } = mongoose;

// database is called music

const songSchema = new Schema({
	artist: {
		type: String,
		trim: true // name="    Sugar " - the white spaces will be trimmed!
	},
  name: {
    type: String,
    trim: true // name="    Sugar " - the white spaces will be trimmed!
  },
  year: {
    type: Number,
    trim: true // name="    Sugar " - the white spaces will be trimmed!
  },
	created_at: {
		type: Date,
		default: Date.now
	}
});

const Song = mongoose.model('Music', songSchema);

module.exports = Song;
