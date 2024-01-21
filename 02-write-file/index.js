const fs = require('node:fs/promises');
const path = require('node:path')
const { stdout, stdin, exit } = require('node:process')

const greetingText = 'Greeting!\n'
const farewellText = 'Goodbye!'
const fileName = 'text.txt'
const completePath = path.join(__dirname, fileName)

const exitOn = () => {
  stdout.write(farewellText);
  exit();
}
const writeFile = async () => {
  process.on('SIGINT', () => {
    exitOn()
  });
  try {
    stdout.write(greetingText)
    stdin.on('data', async (data) => {
      if (data.toString().trim() === 'exit') exitOn()
      await fs.appendFile(completePath, data.toString())
    })
  }
  catch (err) {
    console.error(err)
  }
}

writeFile()



