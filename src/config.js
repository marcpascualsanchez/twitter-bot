module.exports = {
    fusionURL: 'https://japeal.com/pkm/',
    fusionBtnSelector: '#fbutton', 
    fusionImgSelector: '#Char0div', // selector from fusion result element at fusionURL
    imgPath: '../twitter/img/fusion.png',
    viewPort: { width: 1920, height: 1080 },
    getFusionImg: () => {
        const base64Img = document.querySelector('#Char0div').style.backgroundImage;
  
        return new Promise((resolve, reject) => {
              if(base64Img) {
                  resolve(base64Img);
              } else {
                  reject('ERROR: element not found');
              }
          })
    }
}