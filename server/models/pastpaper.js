const mongoose = require('mongoose');

const PastpaperSchema = mongoose.Schema({
  name: { type: String, required: true },
  paperPath: { type: String, required: true },
 
});

module.exports = mongoose.model('Pastpaper', PastpaperSchema,'pastpapers');
