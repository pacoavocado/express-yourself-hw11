const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, readFromFile } = require('../helpers/fsUtils');
const path = require('path');

// const app = express();
// const noteForm = document.querySelector('.icons');

notes.get('/', (req, res) =>
  readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
);

// GET Route for a specific note
notes.get('/api/notes/:id', (req, res) => {
  const noteId = req.params.note_id;
  readFromFile('./db/db.json')
    .then((data) => JSON.parse(data))
    .then((json) => {
      const result = json.filter((notes) => notes.notes_id === noteId);
      return result.length > 0
        ? res.json(result)
        : res.json('no notes');
    });
});


// DELETE Route for a specific tip
notes.delete('/api/notes/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((notes) => JSON.parse(notes))
    .then((json) => {
      // Make a new array of all notes except the one with the ID provided in the URL
      const result = allNotes.filter((notes) => notes.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', result);

      // Respond to the DELETE request
      res.json(`Item ${noteId} has been deleted`);
    });
});


// POST Route for a new note
notes.post('/api/notes/:id', (req, res) => {
  console.log(req.body);

  const { noteTitle, noteText } = req.body;

  if (req.body) {
    const newNote = {
      noteTitle,
      noteText,
      note_id: uuidv4(),
    };

    readAndAppend(newNote, './db/db.json');
    res.json(`Note added successfully`);
  } else {
    res.error('Error in adding tip');
  }
});

  
  module.exports = notes;