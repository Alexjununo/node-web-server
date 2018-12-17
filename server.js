const express = require('express');
const hbs = require('hbs');
const fs = require ('fs');
const port = process.env.PORT || 8080;


var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err){
            console.log('Unable to append to server.log');
        }
    });
    next();
})

// app.use((req, res, next) => {
//     res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('year', () => {
    return new Date().getFullYear();
})

app.get('/', (req, res) => {
    //res.send('<h1>Hello World!!</h1>');
   res.render('home.hbs', {
       title: 'Home Page',
       welcome: 'Bem vindo ao site do cleito'
   })
});


app.get('/about', (req, res) => {
    res.render('about.hbs', {
        title: 'About Page',
    });
});

app.get('/home', (req, res) => {
    res.send('home do site');
})

app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`)
});