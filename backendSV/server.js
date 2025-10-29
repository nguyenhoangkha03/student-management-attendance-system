const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const studentRoutes = require('./routes/student');
const loginRoutes = require('./routes/login');
const registerRoutes = require('./routes/register');
const resultRoutes = require('./routes/result');

const app = express();
const port = 3333;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/student', studentRoutes);
app.use('/api/login', loginRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/result', resultRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
