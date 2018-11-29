const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

const app = express();

// const { getPalette } = require('./getPalette');

app.use(bodyParser.json());

app.locals.title = 'Palette Picker';
app.locals.projects = [
  {
    name: 'Aaron',
    id: 1
  },
  {
    name: 'pallete 2',
    id: 2
  },
  {
    name: 'palette 3', 
    id: 3
  },
  {
    name: 'another palette',
    id: 4
  }
];

// app.locals.palettes = [
//   {

//   }
// ]

// colors: ['#badass', '#asdf87', '#aqwe76', '#ini907', '#jhsjdf'],
// colors: ['#badass', '#asdfad', '#sadfew', '#hither', '#dither'],
// colors: ['#badass', '#franki', '#gideon', '#fgj908', '#dolly0'],
// colors: ['#badass', '#chelse', '#joel53', '#asdfgh', '#aaron1'],

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects', (request, response) => {
  // const projects = app.locals.projects;
  database('projects').select()
  .then(projects => {
    response.status(200).json(projects)
  })
  .catch(error => {
    response.status(500).json({ error: error.message })
  })
})

app.get('/api/v1/palettes', (request, response) => {
  // const palettes = app.locals.palettes;
  database('palettes').select()
  .then(palettes => {
    response.status(200).json(palettes)
  })
  .catch(error => {
    response.status(500).json({ error: error.message })
  })
})

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  if(!project.name) {
    response.status(422).json({ error: 'missing required param of name'})
  }

  database('projects').insert(project, 'id')
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

app.post('/api/v1/palettes', (request, response) => {
  const palette = request.body;

  for(let requiredParam of ['name', 'hex_1', 'hex_2', 'hex_3', 'hex_4', 'hex_5']) {
    if(!palette[requiredParam]) {
      response.status(422).json({ error: `missing required param of ${requiredParam}`})
    }
  }

  database('palettes').insert(palette, 'id')
    .then(paletteIds => {
      response.status(201).json({ id: paletteIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

app.listen(app.get('port'), () => {
  console.log(`App is now running on ${app.get('port')}`);
})


// Questions:

// can I import the getPalette function into here
// What should my filestructure be? 
// Should I use dirs?