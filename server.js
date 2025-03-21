const express = require('express');
const Task = require('./db');
const redisClient = require('./cache');

const app = express();
app.use(express.json());

app.post('/tasks', async (req, res) => {
  const { title, description } = req.body;
  const task = new Task({ title, description, completed: false });
  await task.save();

  // Se deberia ralizar mediante un evento o crontab
  redisClient.setEx(`task:${task.id}`, 3600, JSON.stringify(task));

  res.json(task);
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const taskId = req.params.id;
    console.log(taskId)

    const cachedData = await redisClient.get(`task:${taskId}`);

    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }

    console.log('error')
    const task = await Task.findById(taskId).lean();
    if (!task) return res.status(404).json({ message: 'Task not found' });

    redisClient.setEx(`task:${taskId}`, 3600, JSON.stringify(task));

    res.json(task);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.listen(3000, () => console.log('Server running on port 3000'));
