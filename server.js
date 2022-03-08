const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');
const {nanoid} = require("nanoid");

const express = require('express');
const app = express();

const note = require('./db/db.json');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req,res) => {
  res.json(note);
  console.log(`${req.method} request received to ${req.method} note`);
});

app.post('/api/notes', (req,res) => {
  let uid = nanoid(4).toLowerCase();
  req.body.id = uid;
  const noteToAdd = req.body;
  note.push(noteToAdd);
  fs.writeFileSync(path.join(__dirname,'/db/db.json'),
  JSON.stringify(note)
  );
  res.json(`${req.method} request received to ${req.method} note`);
  console.log(`${req.method} request received to ${req.method} note`);

});

app.delete('/api/notes/:id', (req, res) => {
  const {id} = req.params;
  const delIndex = note.findIndex(p => p.id == id);
  note.splice(delIndex, 1);
 
  fs.writeFileSync(
    path.join(__dirname, '/db/db.json'), 
    JSON.stringify(note)
  );
 
  res.json(`${req.method} request received to ${req.method} ${delIndex} note`);
  console.log(`${req.method} request received to ${req.method} ${delIndex} note`);
});

app.get('/notes', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('*', (req,res) =>{
  res.sendFile(path.join(__dirname, '/public/index.html'));
});


app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});