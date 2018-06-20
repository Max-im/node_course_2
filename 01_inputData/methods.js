const fs = require("fs");


// ADD NEW ITEM
// @example <node app.js add --title='first title' --body='first body'>
// ----------------------------------------------------------------
const add = ({titleFlag, bodyFlag}) => {

    // get data from db
    const notes = fetchData();
    
    // check is the title alredy exict
    const isItemExist = checkItemsUniq(notes, titleFlag);
    
    // write data in db
    if(isItemExist) { 
        console.log("The title already exist");
        return;
    }
    else {
        const newNote = { title: titleFlag, body: bodyFlag };
        notes.push(newNote);
    }
    
    // save data in db
    saveData(notes);
    console.log("The item was added success!");
}



// READ ITEM BY TITLE
// @example <node app.js read --title='first title'>
// ----------------------------------------------------------------
const read = ({titleFlag}) => {
    
    // get data from db
    const notes = fetchData();
    
    // check is the title alredy exict
    const isItemExist = checkItemsUniq(notes, titleFlag);
    
    // get target item
    const noteItem = notes.filter(item => item.title === titleFlag)[0];
    
    if(isItemExist) {
        console.log("The title not found");
        return;
    }
    else {
        console.log(`Title: ${noteItem.title}; Body: ${noteItem.body}`);
    }
    
    
}
 



// RETURN TITLES LIST WITH ALL ITEMS
// @example <node app.js list>
// ----------------------------------------------------------------
const list = () => {
    
    // get data from db
    const notes = fetchData();
    
    // print 
    notes.forEach(item => console.log(`Title: ${item.title}`));
    
}




// REMOVE ITEM BY TITLE
// @example <node app.js del --title='first title'>
// ----------------------------------------------------------------
const del = ({titleFlag}) => {

    // get data from db
    const notes = fetchData();
    
    // check is the title alredy exict
    const isItemExist = checkItemsUniq(notes, titleFlag);
    
    // remove item from array
    const newNotes = notes.filter(item => item.title !== titleFlag );
    
    // save data in db
    if(isItemExist) {
        console.log("The title not found");
        return;
    }
    else {
        saveData(newNotes);
        console.log("The item was removed success!");
    }
}






// GET DATA FROM DATABASE
// helper
// ----------------------------------------------------------------
function fetchData() {
    let notes;
    try { notes = JSON.parse(fs.readFileSync("db.json")) }
    catch (err) { notes = [] }
    return notes;
}



// CHECK IS THE ITEM EXISTS IN THE DB
// helper
// ----------------------------------------------------------------
function checkItemsUniq(notes, titleFlag) {
    let isItemExist = false;
    notes.forEach(item => {
        if(item.title === titleFlag) {
            return true;
        }
    });
    return isItemExist;
}


// SAVE DATA IN THE DB
// helper
// ----------------------------------------------------------------
function saveData(notes) {
    fs.writeFileSync("db.json", JSON.stringify(notes));
}



module.exports = { add, list, read, del };