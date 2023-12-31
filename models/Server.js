const mongoose = require('mongoose');

const serverSchema = mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  isActive: { type: Boolean, required: true },
});

module.exports = mongoose.model('Server', serverSchema);