const fs = require('node:fs/promises');
const path = require('node:path')


const dirName = 'secret-folder'
const completePath = path.join(__dirname, dirName)

const readFiles = async () => {
  try {
    const files = await fs.readdir(completePath, { withFileTypes: true })
    files.forEach(async (el) => {
      if (el.isFile()) {
        const stat = await fs.stat(path.join(completePath, el.name))
        const size = `${stat.size / 1024}kB`
        const name = el.name.split('.')[0]
        const extension = el.name.split('.').at(-1)
        console.log(`${name} - ${extension} - ${size}`)
      }
    })
  }
  catch (err) {
    console.error(err)
  }
}

readFiles()