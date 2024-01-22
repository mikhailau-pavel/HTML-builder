const fs = require('node:fs/promises');
const path = require('node:path');
const completePath = path.join(__dirname, 'files')

const copyDir = async () => {
  try {
    const files = await fs.readdir(completePath, { withFileTypes: true })
    await fs.rm(path.join(__dirname, 'files-copy'), { force: true, recursive: true })
    await fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true })

    files.forEach(async (el) => {
      if (el.isFile()) {
        await fs.copyFile(path.join(completePath, el.name), `${completePath}/../files-copy/${el.name}`)
      }
    })
  }
  catch (err) {
    console.error(err)
  }
}
copyDir()