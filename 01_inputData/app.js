const yargs      = require('yargs');
const methods   = require('./methods');


// yargs settings
const commandsArr = yargs
    .command('add', 'Add a new note',       { title: yargsOptions("t"), body:  yargsOptions("b") })
    .command('read', 'Read note by title',  { title: yargsOptions("t") })
    .command('del', 'Remove note by title', { title: yargsOptions("t") })
    .command('list', 'Print all notes titles')
    .help()
    .argv._;
const flags = {
    titleFlag: yargs.argv.title,
    bodyFlag: yargs.argv.body
};

// launch methods
if(commandsArr.length === 1 ) {
    if(commandsArr[0] in methods) {
        methods[commandsArr[0]](flags);
    }
    else {
        console.log("Command not recognized");
    }
}
else {
    console.log("There are more then 1 command");
}

// set up yargs options
function yargsOptions(alias) {
    var describe = alias === "t" ? "Title of the note" : "Body of the note";
    return { describe, demand: true, alias}
}
