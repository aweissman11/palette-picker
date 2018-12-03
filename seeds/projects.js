const mockPalettes1 = [
  {
    name: "Frankenstein",
    hex_1: "#86da26",
    hex_2: "#773273",
    hex_3: "#b56367",
    hex_4: "#c1f1c9",
    hex_5: "#dd9ce8"
  },
  {
    name: 'another',
    hex_1: "#1965bb",
    hex_2: "#90a2ec",
    hex_3: "#508471",
    hex_4: "#544992",
    hex_5: "#85b1a2"
  },
  {
    name: 'and another',
    hex_1:   "#a48398",
    hex_2:   "#7f38eb",
    hex_3:   "#c1b6bd",
    hex_4:   "#6f4c9b",
    hex_5:   "#43812d"
  },
  {
    name: 'and one more',
    hex_1:   "#945d71",
    hex_2:   "#fe9f1",
    hex_3:   "#5a76a1",
    hex_4:   "#629c5a",
    hex_5:   "#fb2502"
  },
]

const mockPalettes2 = [
  {
    name: "m2p1",
    hex_1: "#34935e",
    hex_2: "#f0b490",
    hex_3: "#fe3b01",
    hex_4: "#65e9d4",
    hex_5: "#611d1b"
  },
  {
    name: 'm2p2',
    hex_1: "#7f7ebe",
    hex_2: "#ffe444",
    hex_3: "#84f0fd",
    hex_4: "#efb26a",
    hex_5: "#e3372a"
  },
  {
    name: 'm2p3',
    hex_1:  "#947894",
    hex_2:  "#e0c026",
    hex_3:  "#966ba3",
    hex_4:  "#41fbe4",
    hex_5:  "#e0bc3b"
  },
  {
    name: 'm2p4',
    hex_1:  "#bce421",
    hex_2:  "#cd88da",
    hex_3:  "#5bce3b",
    hex_4:  "#441d6d",
    hex_5:  "#fdda0c"
  },
]

const mockPalettes3 = [
  {
    name: "my palette",
    hex_1:  "#a7407f",
    hex_2:  "#237b8",
    hex_3:  "#8ea133",
    hex_4:  "#6f8249",
    hex_5:  "#18ad1f"
  },
  {
    name: 'palette much?',
    hex_1:  "#1f2ab6",
    hex_2:  "#3624cc",
    hex_3:  "#35dfc4",
    hex_4:  "#95b296",
    hex_5:  "#c909a4"
  },
  {
    name: 'palettio',
    hex_1:  "#42ce73",
    hex_2:  "#d14191",
    hex_3:  "#4b5a2d",
    hex_4:  "#8c1af3",
    hex_5:  "#2a8ee7"
  },
  {
    name: 'pilates',
    hex_1:  "#9a7be9",
    hex_2:  "#a3781f",
    hex_3:  "#35442f",
    hex_4:  "#7fec5",
    hex_5:  "#d32494"
  },
]

let projectsData = [
  {
    name: 'amzing',
    palettes: [...mockPalettes1]
  },
  {
    name: 'chels',
    palettes: [...mockPalettes2]
  },
  {
    name: 'frank',
    palettes: [...mockPalettes3]
  }
];

const createProject = (knex, project) => {
  return knex('projects').insert({ name: project.name }, 'id')
  .then(projectIds => {
    let palettePromises = project.palettes.map( palette => {
      // console.log('project palette:', palette)
      const { name, hex_1, hex_2, hex_3, hex_4, hex_5 } = palette;
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
