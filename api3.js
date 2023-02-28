
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');


const app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


mongoose.connect('mongodb://localhost/my_database', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to database'))
  .catch(err => console.error('Error connecting to database:', err));


const studentSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  age: Number,
  gender: String,
  hobbies: [String],
});


const Student = mongoose.model('Student', studentSchema);


app.post('/students', async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.json({ message: 'Student registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error registering student' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));

