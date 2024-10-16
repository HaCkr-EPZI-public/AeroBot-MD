import './config.js'
import './system/func/settings.js'
import { fetchLatestBaileysVersion } from '@whiskeysockets/baileys'
import cfont from "cfonts";
import { spawn } from 'child_process';
import { createInterface } from "readline";
import { promises as fsPromises } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { sizeFormatter } from 'human-readable';

import axios from 'axios';
import * as cheerio from "cheerio";
import os from 'os';
import path from 'path';
import moment from 'moment-timezone';
import fs from 'fs';
import yargs from "yargs";
import express from 'express';
import chalk from 'chalk';

let formatSize = sizeFormatter({
	std: 'JEDEC',
	decimalPlaces: '2',
	keepTrailingZeroes: false,
	render: (literal, symbol) => `${literal} ${symbol}B`
})
const { 
 say } = cfont
const {
 tz } = moment
const app = express();
const port = process.env.PORT || 8040;
const time = tz('Africa/Casablanca').format('HH:mm:ss');
const currentFilePath = new URL(import.meta.url).pathname;


say(info.figlet, {
  font: "simpleBlock",
  align: "center",
  gradient: ["yellow", "cyan", "red"],
  transitionGradient: 1,
})
say('by ' + info.nameown, {
  font: "tiny",
  align: "center",
  colors: ["white"]
})
app.listen(port, () => {
  console.log(chalk.green(`⚡ Port ${port} is open`));
});
const folderPath = './src/tmp';
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath);
        console.log(chalk.green('tmp folder created successfully.'));
        }
        
let isRunning = false;

const rl = createInterface(process.stdin, process.stdout)

async function start(file) {
    if (isRunning) return;
  isRunning = true;
  const args = [join(dirname(currentFilePath), file), ...process.argv.slice(2)];
const p = spawn(process.argv[0], args, {
    stdio: ['inherit', 'inherit', 'inherit', 'ipc'],
  });
    p.on("message", data => {
    console.log(chalk.magenta("[ ✅ Accepted  ]", data))
        switch (data) {
            case "reset":
                p.process.kill()
                isRunning = false
                start.apply(this, arguments)
                break
            case "uptime":
                p.send(process.uptime())
                break
        }
    })
    p.on("exit", (_, code) => {
        isRunning = false
        console.error("[❗] Exited with code :", code)
        if (code !== 0) return start(file)
        watchFile(args[0], () => {
            unwatchFile(args[0])
            start(file)
        })
    })
    
    let opts = new Object(yargs(process.argv.slice(2)).exitProcess(false).parse())
    if (!opts["test"])
        if (!rl.listenerCount()) rl.on("line", line => {
            p.emit("message", line.trim())
        })


const packageJsonPath = join(dirname(currentFilePath), './package.json');
const pluginsFolder = join(dirname(currentFilePath), 'plugins');
const totalFoldersAndFiles = await getTotalFoldersAndFiles(pluginsFolder);
  fs.readdir(pluginsFolder, async (err, files) => {
    if (err) {
      console.error(chalk.red(`Folder Plugins Error: ${err}`));
      return;
    }

    try {
      console.log(chalk.bgGreen(chalk.white(`Library Baileys Versi ${(await fetchLatestBaileysVersion()).version} Telah Terinstall`)));
    } catch (e) {
      console.error(chalk.bgRed(chalk.white('Baileys Library Not Installed')));
    }
  })


  try {
    const packageJsonData = await fsPromises.readFile(packageJsonPath, 'utf-8');
    const packageJsonObj = JSON.parse(packageJsonData);
    // let fitur = Object.values(plugins).filter(v => v.help ).map(v => v.help).flat(1)
    const { data } = await axios.get('https://api.ipify.org')
    const ramInGB = os.totalmem() / (1024 * 1024 * 1024);
    const freeRamInGB = os.freemem() / (1024 * 1024 * 1024);

   console.log(`╭──⎔ System Dashboard ⎔
┣ Bot Name: ${chalk.white(packageJsonObj.name)}
┣ Version: ${chalk.white(packageJsonObj.version)}
┣ Description: ${chalk.white(packageJsonObj.description)}
┣ Os: ${chalk.white(os.type())}
┣ Memory: ${chalk.white(freeRamInGB.toFixed(2) + ' / ' + ramInGB.toFixed(2))}
┣ IP: ${chalk.red(data)}
┣ Owner: ${chalk.white(global.info.nomerown)}
╰──⎔⎔
╭──⎔⎔ ${chalk.bgCyan(chalk.white('Bot Specifications'))} ⎔⎔
┣ Features: ${chalk.white(totalFoldersAndFiles.files)} Feature
╰──⎔⎔ 
╭──⎔⎔ ${chalk.bgCyan(chalk.white('Nitce'))} ⎔⎔
┣ message: ${chalk.green(`Hadith History of Bukhari and Muslim:\n"Whoever sells other people's goods without his permission, then he will not enter heaven."`)}
╰──⎔⎔ 

⎔──⎔⎔ Creator: ${chalk.bold.cyan('Aymane Touzani')} ⎔⎔──⎔`)
    
  } catch (err) {
    console.error(chalk.red(`Cannot Read Package.json File: ${err}`));
  }

  setInterval(() => {}, 1000);
}

function getTotalFoldersAndFiles(folderPath) {
  return new Promise((resolve, reject) => {
    fs.readdir(folderPath, (err, files) => {
      if (err) {
        reject(err);
      } else {
        let folders = 0;
        let filesCount = 0;
        files.forEach((file) => {
          const filePath = join(folderPath, file);
          if (fs.statSync(filePath).isDirectory()) {
            folders++;
          } else {
            filesCount++;
          }
        });
        resolve({ folders, files: filesCount });
      }
    });
  });
}


/**
Memulai sistem
**/
start('main.js');
