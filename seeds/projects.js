let mockPalettes = [
  {
    name: 'Frankenstein',
    hex_1: '#FFFFFF',
    hex_2: '#BADASS',
    hex_3: '#HELLO1',
    hex_4: '#CHELSE',
    hex_5: '#GIDEON'
  },
  {
    name: 'another',
    hex_1: '#FFFFFF',
    hex_2: '#BADASS',
    hex_3: '#HELLO1',
    hex_4: '#CHELSE',
    hex_5: '#GIDEON'
  },
  {
    name: 'and another',
    hex_1: '#FFFFFF',
    hex_2: '#BADASS',
    hex_3: '#HELLO1',
    hex_4: '#CHELSE',
    hex_5: '#GIDEON'
  },
  {
    name: 'and one more',
    hex_1: '#BADASS',
    hex_2: '#FFFFFF',
    hex_3: '#HELLO1',
    hex_4: '#CHELSE',
    hex_5: '#GIDEON'
  },
]

let projectsData = [
  {
    name: 'amzing',
    palettes: [mockPalettes]
  },
  {
    name: 'chels',
    palettes: [mockPalettes]
  },
  {
    name: 'frank',
    palettes: [mockPalettes]
  }
];

const createProject = (knex, project) => {
  return knex('projects').insert({ name: project.name }, 'id')
  .then(projectIds => {
    let palettePromises = project.palettes.map( (palette, i) => {

      // I need an endpoint for each project
      // that endpoint will return all the paletts that correspond to that project.
      // A post request would go to the same endpoint
      // will need to handle endpoints that do not exist...

      console.log('project palette:', project.palettes)
      const { name, hex_1, hex_2, hex_3, hex_4, hex_5 } = palette[0];
      return createPalette(knex, {
        name,
        hex_1,
        hex_2,
        hex_3,
        hex_4,
        hex_5,
        project_id: projectIds[0]
      })
    })

    return Promise.all(palettePromises);
  })
}

const createPalette = (knex, palette) => {
  return knex('palettes').insert(palette);
}

exports.seed = (knex, Promise) => {
  return knex('palettes').del()
    .then(() => knex('projects').del())
    .then(() => {
      let projectPromises = projectsData.map( project => {
        return createProject(knex, project)
      })

      return Promise.all(projectPromises);
    })
    .then(() => console.log('Successful db seeding'))
    .catch(error => console.log(`Error seeding db ${error.message}`))
}

// exports.seed = function(knex, Promise) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
