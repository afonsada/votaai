const express = require('express'),
app = express();

const fs = require('fs');
bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})

app.get('/poll', (req, res) => {
    fs.readFile(__dirname + "/poll.json", 'utf8', function (err, data){
        res.send(data);
    })
})

function choosePollOption(req, res, topic){
    let poll = {};
    fs.readFile(__dirname + '/poll.json', 'utf8', function(err, data){
        poll = JSON.parse(data);

        poll[topic] += 1;

        fs.writeFile(__dirname + '/poll.json', JSON.stringify(poll), function(err, data){
            res.status(200).send('<a href="/">Voltar para menu principal</a> ')
        })
    })
}

app.post("/vote/new", (req, res) =>{
    if(req.body.manha === 'on'){
        choosePollOption(req, res, 'manha');
    }else if(req.body.tarde === 'on'){
            choosePollOption(req, res, 'tarde');
    }else if(req.body.noite === 'on'){
            choosePollOption(req, res, 'noite');
    }else{
        res.redirect('/?incorrect+input');
    }
})

app.listen(3001, () =>{});

