const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

app.locals.title = 'Palette Picker';

app.set('port', process.env.PORT || 3000);

app.get('/palette/:id', (request, response) => {
  const id = parseInt(request.params.id);

})