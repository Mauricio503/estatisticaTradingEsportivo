const phantom = require('phantom');

const takeScreenshot = async(url) =>{
    const instance = await phantom.create()
    const page = await instance.createPage()

    const status = await page.open(url);
    console.log(status);

    const content = await page.property('content');
    console.log(content);

    await instance.exit();
}

takeScreenshot("https://cs.betradar.com/sportcenter/soccer#matchId=18611822");