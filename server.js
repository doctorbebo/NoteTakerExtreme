// Dependancies
const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3300;

// Sets up middleware to parse data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(__dirname + '/public'));

app.listen(PORT, ()=>
{
    console.log(`app is listening on port: ${PORT}`)
});

app.get('/notes', (req, res,)=>
{
    res.sendFile(path.join(__dirname, "public/notes.html"));
});

app.get('/', (req, res,)=>
{
    res.sendFile(path.join(__dirname, "public/index.html"));
});

app.get('/api/notes', (req, res) =>
{
    res.sendFile(path.join(__dirname, 'db/db.json'), (err)=>
    {
        if(err) throw err;
    });
});

app.post('/api/notes', (req, res) =>
{
    fs.readFile(path.join(__dirname, 'db/db.json'), (err, data)=>
    {   
         if(err) throw err;
         const oldData = JSON.parse(data);
         const newData = {title: req.body.title, text: req.body.text, id: Date.now()}
         oldData.push(newData);
         fs.writeFile(path.join(__dirname, 'db/db.json'),JSON.stringify(oldData), (err) =>
         {
             if(err) throw err;
             res.send("note saved");
         });
    });
});

app.delete('/api/notes/:id',(req, res) =>
{
    idToDelete = req.params.id
    fs.readFile(path.join(__dirname, 'db/db.json'), (err, data)=>
    {
        if(err) throw err;
        const notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) 
        {   
            const note = notes[i];
            if(note.id == idToDelete)
            {
                notes.splice(i,1);
                break;
            }
        }
        fs.writeFile(path.join(__dirname, 'db/db.json'), JSON.stringify(notes), (err)=>
        {
            if(err) throw err;
            res.send(`note with id of ${idToDelete} was deleted`);
        });
    });

});


fs.readFile('db/db.json', (err, data) => {
    if (err) throw err;
  });
