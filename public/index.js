let newPalette;
let lockedPalettes;
let currentPalettes;
let currentPaletteId;
let allProjects;

let currentProject = null;
let paletteIsSaved = true;

const logo = $('.logo-p');

const currentProjectText = $('.project-text');

const generateBtn = $('.generate-btn');
const color1 = $('.color-1');
const color2 = $('.color-2');
const color2box = $('.color-2-box');
const color3 = $('.color-3');
const color4 = $('.color-4');
const color5 = $('.color-5');

const lockHex1 = $('.lock-hex-1');
const lockHex2 = $('.lock-hex-2');
const lockHex3 = $('.lock-hex-3');
const lockHex4 = $('.lock-hex-4');
const lockHex5 = $('.lock-hex-5');

const hexLock = $('.lock');

const lock1 = $('.lock-1');
const lock2 = $('.lock-2');
const lock3 = $('.lock-3');
const lock4 = $('.lock-4');
const lock5 = $('.lock-5');

const projectLink = $('.project-link');

const createProjectForm = $('.new-project');
const createProjectInput = $('.new-project-input');
const newProjectInput = $('.new-project-input');

const newPaletteInput = $('.new-palette');
const saveNewPalette = $('.save-new-palette');
const deletePaletteBtn = $('.delete-btn');

generatePalettes();
getProjects();

logo.on('click', () => generatePalettes(lockedPalettes));

lock1.on('click', () => toggleLockPalette(1));
lock2.on('click', () => toggleLockPalette(2));
lock3.on('click', () => toggleLockPalette(3));
lock4.on('click', () => toggleLockPalette(4));
lock5.on('click', () => toggleLockPalette(5));

projectLink.on('click', () => linkToProject(e));
createProjectForm.on('submit', () => createNewProject());

hexLock.on('click', toggleLock);
generateBtn.on('click', () => generatePalettes(lockedPalettes));

saveNewPalette.on('submit', savePalette);
deletePaletteBtn.on('click', deletePalette);

function toggleLock() {
  $(this).toggleClass('unlocked');
}

function randomColor() {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
 };

function getRandomPalettes(locked) {
    if (!locked) {
      locked = [null, null, null, null, null];
    }
  lockedPalettes = locked
  let palettesWithLocks = lockedPalettes.map( function(palette, i) {
    if (palette !== null) {
      return palette
    } else {
      return randomColor();
    }
  })
  return palettesWithLocks;
}

function generatePalettes(locked) {
  paletteIsSaved = false;
  toggleSaveBtn(false)
  newPalette = getRandomPalettes(locked);
  updateDisplay(newPalette);
}

function toggleLockPalette(pltNum) {
  if (lockedPalettes[pltNum-1] === null) {
    lockedPalettes.splice((pltNum-1), 1, newPalette[pltNum-1])
  } else {
    lockedPalettes.splice(pltNum-1, 1, null)
  }
  console.log(lockedPalettes);
}

function getProjects() {
  fetch('/api/v1/projects')
    .then(function(response) {
      return response.json();
    })
    .then(function(projects) {
      appendProjects(projects)
      allProjects = projects
    })
    .catch(function(error) {
      console.warn(error);
    })
}

function appendProjects(projects) {
  if (projects) {
    $('.projects').children().html('')
    projects.forEach( function(project) {
      if (project.name) {
        $('.projects').prepend(`<a id="${project.id}" onclick="linkToProject()" href="#">${project.name}</a>`)
      } else {
        return;
      }
    })
  }
}

function getPalettes(projectId) {
  fetch(`/api/v1/projects/${projectId}`)
    .then(function(response) {
      return response.json();
    })
    .then(function(palettes) {
      showPalettesDropdown(palettes)
    })
    .catch(function(error) {
      showPalettesDropdown([{ name: 'no palettes saved', noP: true }])
      throw new Error(error);
    })
}

function linkToProject(linkedProject) {
  let id;
  let text;

  paletteIsSaved = false;
  toggleSaveBtn(false);

  if (!linkedProject) {
    id = event.target.id;
    text = event.target.text;
  } else {
    id = linkedProject.id;
    text = linkedProject.name
  }
  currentProject = { id, name: text }
  currentProjectText.text(`${currentProject.name.toUpperCase()}`)
  getPalettes(id);
  $('.palette-drp').html('')
  $('.title-box').append(`<div class="dropdown palette-drp">
      <button class="dropbtn">Palettes</button>
      <div class="dropdown-content Palettes">
      </div>
    </div>`)
}

function showPalettesDropdown(palettes) {
  $('.palettes').html('')
  if (palettes[0].noP) {
    paletteIsSaved = false;
  } else {
    paletteIsSaved = true;
  }
  currentPalettes = palettes;
  if (palettes) {
    palettes.forEach( function(palette) {
      if (palette.name) {
        $('.palettes').prepend(`<a id="${palette.id}" onclick="showPalette()" href="#">${palette.name}</a>`)
      }
    })
  }
}

function showPalette() {
  event.preventDefault();


  currentPaletteId = event.target.id;
  $('.lock').addClass('unlocked');
  lockedPalettes = [null, null, null, null, null];
  console.log(paletteIsSaved)
  if (!paletteIsSaved) {
    window.setTimeout(() => $('body').addClass('delete-palette-alert'), 25);
    window.setTimeout(() => $('body').removeClass('delete-palette-alert'), 300)
    return;
  }
  paletteIsSaved = true;
  toggleSaveBtn(true);
  newPalette = currentPalettes.reduce( function(acc, palette) {
    if (palette.id == event.target.id) {
      acc = [
        palette.hex_1,
        palette.hex_2,
        palette.hex_3,
        palette.hex_4,
        palette.hex_5
      ]
    }
    return acc;
  }, [])

  updateDisplay(newPalette)
}

function updateDisplay(newPalette) {
  color1.css('background', newPalette[0])
  color2.css('background', newPalette[1])
  color2box.css('background', `linear-gradient(${newPalette[1]}, white 150%)`)
  color3.css('background', newPalette[2])
  color4.css('background', newPalette[3])
  color5.css('background', `linear-gradient(${newPalette[4]}, lightGray 90%`)


  lockHex1.text(newPalette[0])
  lockHex2.text(newPalette[1])
  lockHex3.text(newPalette[2])
  lockHex4.text(newPalette[3])
  lockHex5.text(newPalette[4])
}

function createNewProject() {
  event.preventDefault();
  const projectName = newProjectInput.val()
  let nameTaken = allProjects.find(function(project) {
    return project.name === projectName
  })

  if (nameTaken) {
    newProjectInput.val('');
    flashPlaceholder('name taken')
    return
  } 
  
  if (projectName.length) {
    newProjectInput.val('');
    currentProjectText.text(`${projectName.toUpperCase()}`);
    fetch('/api/v1/projects', {
      method: 'POST',
      body: JSON.stringify({ name: projectName }),
      headers:{
        'Content-Type': 'application/json'
      }
    })
    .then( response => response.json())
    .then(newProjectId => {
      linkToProject({ id: newProjectId.id, name: projectName })
      console.log('prepend project, name:', projectName);
      // $('.projects').prepend(`<a id="${newProjectId.id}" onclick="linkToProject()" href="#">${projectName}</a>`)
      getProjects();
      return;
    })
    .catch(error => console.log(error))
    
    getProjects()
  } else {
    newProjectInput.val('');
    flashPlaceholder('must enter a name')
  }
}

function flashPlaceholder(text) {
  newProjectInput.attr('placeholder', `${text}`).val();
  newProjectInput.addClass('input-flash');
  window.setTimeout(resetProjectPlaceholder, 3000)
}

function resetProjectPlaceholder() {
  newProjectInput.attr('placeholder', `new project name`).val();
  newProjectInput.removeClass('input-flash');
}

function resetPalettePlaceholder() {
  newPaletteInput.attr('placeholder', `palette name`).val();
  newPaletteInput.removeClass('input-flash');
}



function savePalette() {
  event.preventDefault();
  const name = $('.new-palette').val();
  let savedPalette;
  
  if (!currentProject) {
    newPaletteInput.val('')
    newPaletteInput.attr('placeholder', 'select a project');
    newPaletteInput.addClass('input-flash');
    window.setTimeout(resetPalettePlaceholder, 3000)
    return;
  }
  
  if (!name.length) {
    newPaletteInput.addClass('input-flash');
    window.setTimeout(resetPalettePlaceholder, 3000)
    return;
  }
  
  const nameTaken = currentPalettes.find(function(palette) {
    return name === palette.name;
  })
  
  if (nameTaken) {
    newPaletteInput.val('')
    newPaletteInput.attr('placeholder', 'name taken');
    newPaletteInput.addClass('input-flash');
    window.setTimeout(resetPalettePlaceholder, 3000)
    return;
  }
  
  savedPalette = {
    name,
    hex_1: newPalette[0],
    hex_2: newPalette[1],
    hex_3: newPalette[2],
    hex_4: newPalette[3],
    hex_5: newPalette[4],
    project_id: currentProject.id
  }
  
  newPaletteInput.val('');
  window.setTimeout(() => $('body').addClass('save-palette-alert'), 25);
  window.setTimeout(() => $('body').removeClass('save-palette-alert'), 300)

  fetch('/api/v1/palettes', {
    method: 'POST',
    body: JSON.stringify(savedPalette),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(response => response.json())
    .then(newPaletteId => {
      $('.palettes').prepend(`<a id="${newPaletteId.id}" onclick="showPalette()" href="#">${name}</a>`)
    })
    .catch(error => console.log(error))
}

function toggleSaveBtn(isSaved) {
  if (isSaved) {
    saveNewPalette.addClass('hide-btn');
    deletePaletteBtn.removeClass('hide-btn');
  } else {
    saveNewPalette.removeClass('hide-btn');
    deletePaletteBtn.addClass('hide-btn');
  }
}

function deletePalette() {
  window.setTimeout(() => $('body').addClass('delete-palette-alert'), 25);
  window.setTimeout(() => $('body').removeClass('delete-palette-alert'), 300)
  deleteFromDatabase()
}

function deleteFromDatabase() {
  console.log('delet fom datbas');
  console.log(currentProject)

  fetch(`/api/v1/palettes/${currentPaletteId}`, {
    method: 'DELETE'
  })
    .then(response => response.json())
    .then(message => {
      console.log('message:', message.message);
      getPalettes(currentProject.id)
      toggleSaveBtn(false)
    })
    .catch(error => console.log('error:', error))
}