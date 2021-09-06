const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
// const path = require('path');
const noteDb = require('../db/db.json');
// const app = express();
// const noteForm = document.querySelector('.icons');

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((noteDb) => res.json(noteDb))
);

// GET Route for a specific note
// notes.get('/:id', (req, res) => {
//   const noteId = req.params.note_id;
//   readFromFile('./db/db.json')
//     .then((noteDb) => JSON.parse(noteDb))
//     .then((json) => {
//       const noteDb = json.filter((notes) => notes.notes_id === noteId);
//       return noteDb.length > 0
//         ? res.json(noteDb)
//         : res.json('no notes');
//     });
// });


// POST Route for a new note
notes.post('/', (req, res) => {
 

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      id: uuidv4(),
    };
    noteDb.push(newNote);
    readAndAppend(newNote, './db/db.json');
    res.json(newNote);
  } 
});

// DELETE Route for a specific note
notes.delete('/:id', (req, res) => {
  const noteId = req.params;
  readFromFile('./db/db.json')
    .then((notes) => JSON.parse(notes))
    .then((json) => {
      // Make a new array of all notes except the one with the noteI provided in the URL
      let noteDb = noteDb.filter((notes) => notes.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', noteDb);

      // Respond to the DELETE request
      res.json(noteDb);
    });
});


  
  module.exports = notes;