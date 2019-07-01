const config = require('./config.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  await page.setViewport(config.viewPort);
  await page.goto(config.fusionURL);
  await page.waitForSelector(config.fusionBtnSelector);
  const fusionBtnElement = await page.$(config.fusionBtnSelector);
  if (fusionBtnElement) fusionBtnElement.click();

  await page.waitForSelector(config.fusionImgSelector);
  
  // delaying
  console.time('hi');
  await delay();
  console.timeEnd('hi');

  const fusionImgElement = await page.evaluate(() => {
      const elemento = document.querySelector('#Char0div').style.backgroundImage;

      return new Promise((resolve, reject) => {
            if(elemento) {
                console.log('****** resolving');
                resolve(elemento);
            } else {
                console.log('****** rejecting');
                reject('ERROR: element not found');
            }
        })
  });

  // console.log(fusionImgElement);

  await page.screenshot({path: 'example.png', fullPage: true});

  var imageBuffer = decodeBase64Image(fusionImgElement.slice(5, fusionImgElement.length -2));
  fs.writeFile('fusion2.png', imageBuffer.data, 'binary', function (err) {});
 
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
    response.data = new Buffer(matches[2], 'base64');
  
    return response;
  }
  
function delay() {
    return new Promise((resolve, reject) => {
      setTimeout( () => {resolve()}, 15000);
      //reject();
    })
  }