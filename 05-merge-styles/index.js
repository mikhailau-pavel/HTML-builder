const fs = require('node:fs/promises');
const path = require('node:path');

const completePath = path.join(__dirname, 'styles')

const combineStyles = async () => {
  try {
    const files = await fs.readdir(completePath, { withFileTypes: true })
    const stylesArr = []

    files.forEach(async (el) => {
      const isStyle = el.name.split('.').at(-1)
      if (el.isFile() & isStyle === 'css') {
        const data = await fs.readFile(path.join(completePath,el.name), { encoding: 'utf8' });
        stylesArr.push(data)
        fs.appendFile(`${completePath}/../project-dist/bundle.css`, data)
      }
    })
  }
  catch (err) {
    console.error(err)
  }
}
combineStyles()