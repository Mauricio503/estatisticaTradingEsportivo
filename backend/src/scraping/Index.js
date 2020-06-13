const phantom = require('phantom');

module.exports = async function takeScreenshot(url){
    const instance = await phantom.create()
    const page = await instance.createPage()
    const status = await page.open(url);
    const content = await page.property('content');
    await instance.exit();
    return content;
}