const router = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readFromFile, readAndAppend, writeToFile } = require('../helpers/fsUtils');
// const path = require('path');
const noteDb = require('../db/db.json');
// const app = express();
// const noteForm = document.querySelector('.icons');

router.get('/', (req, res) =>
  readFromFile('./db/db.json', 'utf-8').then((noteDb) => res.json(JSON.parse(noteDb))
  ));

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
router.post('/', (req, res) => {
 

  const { title, text } = req.body;

  if (req.body) {
    const newNote = {
      title,
      text,
      id: uuidv4(),
    };
    // noteDb.push(newNote);
    readAndAppend(newNote, './db/db.json');
    res.json('newNote');
  } else {
    res.error("error adding notes");
  }
});

// DELETE Route for a specific note
router.delete('/:id', (req, res) => {
  const noteId = req.params.id;
  readFromFile('./db/db.json')
    .then((notes) => JSON.parse(notes))
    .then((json) => {
      // Make a new array of all notes except the one with the noteI provided in the URL
      let noteDb = json.filter((note) => note.id !== noteId);

      // Save that array to the filesystem
      writeToFile('./db/db.json', noteDb);

      // Respond to the DELETE request
      res.json(`note has been deleted ${noteId}`);
    });
});


  
  module.exports = router;