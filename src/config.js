module.exports = {
    fusionURL: 'https://japeal.com/pkm/',
    fusionBtnSelector: '#fbutton', 
    fusionImgSelector: '#Char0div', // selector from fusion result element at fusionURL
    imgPath: './src/twitter/img/fusion.png', // relative to process.cwd() -> always called w npm start
    viewPort: { width: 1920, height: 1080 },
    tweetTime: 3600000,
    getFusionData: () => {
        const fusion = {
            name: document.querySelector('#fnametxt').textContent,
            dad: document.querySelector('#Ltxt').textContent,
            mom: document.querySelector('#Rtxt').textContent,
            base64Img: document.querySelector('#Char0div').style.backgroundImage,
        }
  
        return new Promise((resolve, reject) => {
              if(fusion.name && fusion.base64Img) {
                  resolve(fusion);
              } else {
                  reject('ERROR: element not found');
              }
          })
    }
}