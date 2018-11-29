


const randomColor = () => {
  return "#" + Math.floor(Math.random() * 16777215).toString(16);
 };

const getPalette = () => {
  return [randomColor(), randomColor(), randomColor(), randomColor(), randomColor()]
}

 module.exports = getPalette;