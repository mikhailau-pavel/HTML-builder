const fs = require('node:fs')
const path = require('node:path')
const { stdout } = require('node:process')

const fileName = 'text.txt'

const read = fs.createReadStream(path.join(__dirname, fileName))
read.on('data', (chunk) =>{

  stdout.write(chunk)
}
)