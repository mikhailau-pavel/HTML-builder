const fs = require('node:fs/promises');
const path = require('node:path');
const completePath = path.join(__dirname, 'files')

const copyDir = async () => {
  try {
    const files = await fs.readdir(completePath, { withFileTypes: true })
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })
    console.log('Directory created')

    files.forEach(async (el) => {
      if (el.isFile()) {
        await fs.copyFile(`./04-copy-directory/files/${el.name}`, `./04-copy-directory/files-copy/${el.name}`)
      }
    })
  }
  catch (err) {
    console.error(err)
  }
}
copyDir()