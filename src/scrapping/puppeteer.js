const config = require('../config');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  let fusionBtnElement;
  let fusionImgElement;
  let imageBuffer;

  await page.setViewport(config.viewPort);
  await page.goto(config.fusionURL);
  await page.waitForSelector(config.fusionBtnSelector);
  fusionBtnElement = await page.$(config.fusionBtnSelector);
  if (fusionBtnElement) fusionBtnElement.click();

  await page.waitForSelector(config.fusionImgSelector);
  // in case you need a screenshot
  // await page.setViewport(config.viewPort);

  // delaying
  await delay();

  fusionImgElement = await page.evaluate(config.getFusionImg);

  imageBuffer = decodeBase64Image(fusionImgElement.slice(5, fusionImgElement.length -2)); // ignore the 'url("")'
  fs.writeFile('./src/twitter/img/fusion.png', imageBuffer.data, 'binary', function (err) {});
 
  await browser.close();
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
  
function delay() {
    return new Promise((resolve) => {
      setTimeout( () => {resolve()}, 15000);
    })
  }