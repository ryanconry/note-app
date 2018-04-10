console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try{                                                                //error handling for working with file
    var notesString = fs.readFileSync('notes-data.json');               //read file as string
    return JSON.parse(notesString);                                   //objectify the string
  }catch(e){
    return [];                                                        //return empty array if no file or error
  }
}

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

var addNote = (title,body) =>{
  var notes = fetchNotes();                                      //array for existing notes
  var note = {                                                        //note to be added
    title,
    body
  };

  var duplicateNotes = notes.filter((note) => note.title === title)   //if new title is already in notes
                                                                      //the duplicate will be returned to duplicateNotes
  if(duplicateNotes.length === 0){                                    //if no duplicates are found, push new note
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};

var getAll = () => {
  return fetchNotes();
}

var readNote = (title) => {
  var notes = fetchNotes();
  var readNote = notes.filter((note) => note.title === title);
  if(readNote.length === 0){
    console.log(`The note with title ${title} was not found.`)
  }else{
    return readNote[0];
  }
}

var removeNote = (title) => {
  var notes = fetchNotes();
  var newNotes = notes.filter((note) => note.title != title);
  if(notes.length === newNotes.length){
    console.log(`Could not find note with title ${title} to delete`);
  }else{
    saveNotes(newNotes);
    console.log(`The note with title ${title} was deleted.`)
  }
}

module.exports = {
  addNote,
  getAll,
  readNote,
  removeNote
}
