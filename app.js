console.log('Starting app.');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const titleOptions = {          //title argument requirements
  describe: 'Title of note.',   //description of title argument
  demand: true,                 //title must be present for commands using title
  alias: 't'                    //--title and -t are interchangeable
};
const  bodyOptions = {
  description: 'Body of note.',
  demand: true,
  alias: 'b'
};

//const pargv=process.argv;
const argv = yargs
.command('add','Add a new note.',{    //using command mehtod to improve user experience when entering commands
  title: titleOptions,
  body: bodyOptions
})
.command('read','Read a note by title.',{
  title: titleOptions
})
.command('remove','Remove a note by title.',{
  title: titleOptions
})
.command('list','List all notes.')
.help()                                         //node app.js --help will display app information
.argv;
const command = argv._[0];                      //set the command to the first instance of the _ array provided by yargs

if(command=='add'){
  var note = notes.addNote(argv.title,argv.body);
  if(note){
    console.log('Note added.\n---');
    console.log(`Title: ${argv.title}`);
    console.log(`Body: ${argv.body}`);
  }else{
    console.log('Note has not been added');
  }
}else if(command=='list'){
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).\n`);
    var count=1;
    allNotes.forEach((note) => {
      console.log(`Note ${count}\nTitle: ${note.title}\nBody: ${note.body}\n`);
      count+=1;
    })
}else if(command=='read'){
    var foundNote = notes.readNote(argv.title);
    if(foundNote){
      console.log('Note found.\n---');
      console.log(foundNote.title);
      console.log(foundNote.body);
    }
}else if(command=='remove'){
    notes.removeNote(argv.title);
}else(console.log('command not recognized'))
