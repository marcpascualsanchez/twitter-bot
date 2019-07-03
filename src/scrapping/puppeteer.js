const config = require('../config');
const puppeteer = require('puppeteer');
const fs = require('fs');
const tweetFusion = require('../twitter/twitter');

// using let for all since it is an infinite loop
let time;
let browser;
let page;
let fusionBtnElement;
let fusionData;
let imageBuffer;

(async () => {
  while(true){
    browser = await puppeteer.launch();
    page = await browser.newPage();

    await page.setViewport(config.viewPort);
    await page.goto(config.fusionURL);
    await page.waitForSelector(config.fusionBtnSelector);
    fusionBtnElement = await page.$(config.fusionBtnSelector);
    if (fusionBtnElement) fusionBtnElement.click();

    await page.waitForSelector(config.fusionImgSelector);
    // in case you need a screenshot
    // await page.setViewport(config.viewPort);
    
    // waiting for server response since there is no promises or so
    await delay(15000); // it is a private API fetched from config in url

    fusionData = await page.evaluate(config.getFusionData);

    imageBuffer = decodeBase64Image(fusionData.base64Img.slice(5, fusionData.base64Img.length -2)); // ignore the 'url("")'
    fs.writeFile(config.imgPath, imageBuffer.data, 'binary', function (err) {});
  
    await browser.close();
    tweetFusion(fusionData, imageBuffer.data);
    await delay(config.tweetTime);
    console.log(`[${getTime()}] Aw shet, here we go again...`)
  }
})();

function decodeBase64Image(dataString) {
    // base64 img always starts like this 'data:image/png;base64, ...' so use regex
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), 
      response = {};
  
    if (matches.length !== 3) {
      return new Error('Invalid input string');
    }
  
    response.type = matches[1];
    response.data = Buffer.from(matches[2], 'base64');
  
    return response;
  }
  
function delay(time) {
  return new Promise((resolve) => {
    setTimeout(() => {resolve()}, time);
  })
}

function getTime(){
  let date = new Date();
  return `${date.getHours()}:${date.getMinutes()}`;
}