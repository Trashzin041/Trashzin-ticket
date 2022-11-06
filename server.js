//This is server.js file where your bot will be hosted 24/7. Do not edit anything here or your bot will not work.

const express = require('express');
const server = express();
 
server.all('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html');
  res.send(`<html><head> <link href="https://fonts.googleapis.com/css?famiy=Roboto Condensed" rel="stylesheet"> <style>body{font-family: "Roboto Condensed"; font-size: 21px; color: white; background-color: #23272A; margin-left: 5%; margin-top: 2%;}a{color: #5865F2}a:hover{color: #818bff}h1{font-size: 48px;}</style></head><body> <h1>Hosting Active</h1> </p></a><i>Make sure to add the repl.co URL to <a href="https://uptimerobot.com/">UPTIME ROBOT</a> to make Bot 24/7 Online!</i></p> <h1>DEVELOPER'S CAFE</h1> <b><a href=https://discord.gg/xXkDRH44Ha>Discord Server</a> 😎 |  <a href="https://discord.gg/xXkDRH44Ha">Website</a></b><br/><br/♥️  ahref="https://dsc.gg/friday-discord-bot"> <img src="<iframe src="https://discord.com/widget?id=925792452697280542&theme=dark" width="350" height="500" allowtransparency="true" frameborder="0" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin allow-scripts"</iframe>"> </a><br/><br/>SUPPORT ME AND DEVELOPER'S CAFE</a></p></a>You can always Support me by inviting one of my own Discord Bots</p></a><a href="https://dsc.gg/friday-discord-bot">FRIDAY</a>`)
})
 
function keepAlive() {
  server.listen(3000, () => { 
    console.log('\x1b[36m%s\x1b[0m','[V H MODMAIL HANDLER] ModMail.js is Running!')
    console.log('\x1b[33m%s\x1b[0m','[V H MODMAIL HANDLER] Loading files and packages... This might take few seconds to load, please be patient!')
    console.log('\x1b[31m%s\x1b[0m','[V H MODMAIL HANDLER] V H#5111 | Do not share this code without credits. This will be in a copyright warning.')
    console.log('\x1b[37m%s\x1b[0m','---------------------------------------------------------')
    console.log('\x1b[33m%s\x1b[0m','[SERVER] Server.js is loading...')
  ;});
}
 
module.exports = keepAlive;