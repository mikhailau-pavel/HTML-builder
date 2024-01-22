const fs = require('node:fs/promises');
const path = require('node:path');

const templatePath = path.join(__dirname, 'template.html')
const completeProjectPath = path.join(__dirname, 'project-dist')
const componentsPath = path.join(__dirname, 'components')
const pathToStyles = path.join(__dirname, 'styles')
const pathToAssets = path.join(__dirname, 'assets')

const createDirectory = async (pathName, folderName) => {
  await fs.rm(path.join(pathName, folderName), { force: true, recursive: true })
  await fs.mkdir(path.join(pathName, folderName), { recursive: true })
}


const buildPage = async () => {
  try {
    const headerTemplate = await fs.readFile(templatePath, "utf-8")
    let editedTemplate = headerTemplate
    await createDirectory(__dirname, 'project-dist')
    
    const components = await fs.readdir(path.join(__dirname, 'components'))

    for (let i = 0; i < components.length; i += 1) {
      const name = components[i].split('.')[0]
      const replacingChunk = await fs.readFile(path.join(componentsPath, components[i]), { encoding: 'utf8' })
      const replacedChunk = editedTemplate.replaceAll(`{{${name}}}`,`${replacingChunk}`)
      editedTemplate = replacedChunk
    }

    await fs.writeFile(path.join(completeProjectPath,'index.html'), editedTemplate)

    const styleFiles = await fs.readdir(pathToStyles, { withFileTypes: true })
    const stylesArr = []

    styleFiles.forEach(async (el) => {
      const isStyle = el.name.split('.').at(-1)
      if (el.isFile() & isStyle === 'css') {
        const data = await fs.readFile(path.join(pathToStyles, el.name), { encoding: 'utf8' });
        stylesArr.push(data)
        fs.appendFile(`${completeProjectPath}/style.css`, data)
      }
    })


  
    await createDirectory(completeProjectPath,'assets')

    const assets = await fs.readdir(pathToAssets, { recursive: true, withFileTypes: true })
    assets.forEach(async (el) => {
        
        if (el.isDirectory()) {
          const assetFolder = await fs.readdir(path.join(pathToAssets, el.name), { recursive: true, withFileTypes: true })
          if (assetFolder.length) {
            await createDirectory(path.join(completeProjectPath, 'assets'), el.name)
          }
          assetFolder.forEach(async (file) => {
            await fs.copyFile(path.join(pathToAssets, el.name, file.name), `${completeProjectPath}/assets/${el.name}/${file.name}`)
          
          })
        } else {
          await fs.copyFile(path.join(pathToAssets, el.name), `${completeProjectPath}/assets/${el.name}`)
        }

       
      
    })
  }
  catch (err) {
    console.error(err)
  }
}
buildPage()