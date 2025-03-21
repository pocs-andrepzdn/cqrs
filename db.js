const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/cqrs_demo';

mongoose.connect(MONGO_URI, {});

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  completed: { type: Boolean, default: false }});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;
