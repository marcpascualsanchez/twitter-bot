const phantom = require('phantom');

const takeScreenShot = async(url) => {
    // phantom needs
    const instance = await phantom.create();
    const page = await instance.createPage();
    page.property('viewportSize', { width: 1920, height: 1080 });

    const status = await page.open(url);
    console.log('status: ', status);

    await page.render('screenshot1.png'); // initial
    console.log('first shot taken');

    await page.evaluateJavaScript('LoadNewFusionDelay(100,143,0);');

    // const data = await page.evaluate(function() {
    //     //const el = document.getElementById('msc_SuperMarioMaker2_1585037');
    //     //return el.getBoundingClientRect();
    //     // LoadNewFusionDelay(1,143,0);
    //     return document.scripts;
    // });
    // console.log(data);
    // page.sendEvent('mouseOver', rect.left + rect.width / 2, rect.top + rect.height / 2);

    // const DOMdata = await page.evaluate(function() {
    //     const el = document.getElementById('fbutton');
    //     return el;
    // });
    // console.log('element:\n', DOMdata);

    await page.render('screenshot2.png');
    console.log('second shot taken');

    await instance.exit();
}

takeScreenShot('https://japeal.com/pkm/');