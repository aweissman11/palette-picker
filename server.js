const express = require('express');
const bodyParser = require('body-parser');
const environment = process.env.NODE_ENV || 'development';
const config = require('./knexfile')[environment];
const database = require('knex')(config);

const app = express();

app.use(bodyParser.json());

app.use(express.static('public'));

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/projects', (request, response) => {
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

app.get('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).select()
  .then(palettes => {
    if (palettes.length) {
      response.status(200).json(palettes);
    } else {
      response.status(404).json({
        error: `Could not find palette with id ${request.params.id}`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.delete('/api/v1/palettes/:id', (request, response) => {
  database('palettes').where('id', request.params.id).del()
  .then(palette => {
    if (palette > 0) {
      response.status(200).json({ message: `palette ${request.params.id} deleted`});
    } else {
      response.status(404).json({
        error: `No palette with id ${request.params.id} exists`
      });
    }
  })
  .catch(error => {
    response.status(500).json({ error })
  })
})

app.get('/api/v1/projects/:id', (request, response) => {
  database('palettes').where('project_id', request.params.id).select()
    .then(projects => {
      if (projects.length) {
        response.status(200).json(projects);
      } else {
        response.status(404).json({ 
          error: `Could not find any palettes for project id ${request.params.id}`
        });
      }
    })
    .catch(error => {
      response.status(500).json({ error });
    });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParam of ['name']) {
    if(!project[requiredParam]) {
      return response
        .status(422)
        .send({ error: 'missing required param of name'})
    }
  }
    
    database('projects').insert(project, 'id')
    .then(projectIds => {
      response.status(201).json({ id: projectIds[0] })
    })
    .catch(error => {
      response.status(500).json({ error: error.message })
    })
})

app.post('/api/v1/palettes/', (request, response) => {
  const palette = request.body;

  for(let requiredParam of [
    'name', 'hex_1', 'hex_2', 'hex_3', 'hex_4', 'hex_5', 'project_id'
  ]) {
    if(!palette[requiredParam]) {
      return response
        .status(422)
        .send({ error: `missing required param of ${requiredParam}`})
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