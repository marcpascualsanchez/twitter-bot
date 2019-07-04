module.exports = {
    fusionURL: 'https://japeal.com/pkm/',
    fusionBtnSelector: '#fbutton', 
    fusionImgSelector: '#Char0div', // selector from fusion result element at fusionURL
    imgPath: './src/twitter/img/fusion.png', // relative to process.cwd() -> always called w npm start
    viewPort: { width: 1920, height: 1080 },
    tweetTime: 1800000,
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
    },
    sentences: [
        "had a baby, their name is",
        "had unprotected sex, the result is",
        "fell in a blender, now they're",
        "hugged so violently hard they became",
        "where alone in the kindergarten too long, now they have to take care of",
        "where in a radioactive kindergarten for so long they became",
        "left alone make",
        "moved in together and it led to",
        "were lost for a few months, came back yesterday with",
        "contacted a stork company to their baby delivered,",
        "were blessed by God with",
        "worked really hard to cover the baby expenses of",
        "used some weird toy last time they had fun, now they have",
        "thought they were happy until...",
        "are enjoying their parenthood with little",
        "are NOT the parents of",
        "got drugged so hard that next day came this",
        "are crazy scientist or something, look at his son",
        "are another two happy pokémons that just had",
        "don't want to take care of poor",
        "thank God for their little",
        "are ugly, and so is",
        "are cute, and so is",
        "have put for adoption their last child,",
        "are selling their son",
        "still can't believe that exists someone like",
        "haven't got married but yet there's",
        "didn't abort when they had to and now look at this",
        "were wild rockstars but then came",
        "are not like Marc and Maria and decided to have this little",
        "are not like Greesty and Sergi and decided to have this little",
        "nowadays say no to party rock all night because of",
        "were really happy and had a good life, that ended because of",
        "thought having a child would be nice, fate cursed them with",
    ]
}
