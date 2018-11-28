const express = require('express');
const bodyParser = require('body-parser');

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
  const projects = app.locals.projects;
  
  return response.status(200).json(projects);
  // get projects
  // should just return names and ID numbers
})

// app.get('/api/v1/palettes', (request, response) => {
// })

// app.get('/generate-palette', (request, response) => {
//   const randomColor = () => {
//     return "#" + Math.floor(Math.random() * 16777215).toString(16);
//   };
//   const getPalette = () => {
//     return [randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]
//   };
  
//   return response.status(200).json(getPalette());
// });

app.listen(app.get('port'), () => {
  console.log(`App is now running on ${app.get('port')}`);
})


// Questions:

// can I import the getPalette function into here
// What should my filestructure be? 
// Should I use dirs?