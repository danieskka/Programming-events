const puppeteer = require('puppeteer');
const fs = require("fs");
const fsp = fs.promises;

(async()=>{
    const browser = await puppeteer.launch({headless:false});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });

    let url = `https://www.eventbrite.es/d/spain/all-events/?page=1`;

    await page.goto(url, {waitUntil: "load", timeout: 15000 });

    try {
        // clear any previous selected events
        if (!! await page.$('span[class$=_desktop] *[class$=Button_root]', {visible: true})) {
            let btn = await page.waitForSelector('span[class$=_desktop] *[class$=Button_root]');
            await btn.click();
        }

        // make whatever selection here..
        async function clickLabel(txt) {
            let selector = "xpath/" + `//label/descendant::span[text()='${txt}']`;
            let lbl = await page.waitForSelector(selector, { visible: true });
            await lbl.click();
        }

        let selectionsArr = ['Gratis','Hoy','Negocios','Euro'];

        for (let sel of selectionsArr) {
            await clickLabel(sel);
        }        

        await page.waitForSelector('ul[class=search-main-content]'); // after clicking this reloads

        // get pages
        let pages = await page.$eval('li[data-spec=pagination-parent]', el => el.textContent);
        pages = pages.split(' de ')[1]; // get last page number

        
        // get links
        let links = [];
        for (let i = 1; i <= pages ; i++) {
            let pageUrl = await page.url();
            pageUrl = (i==1) ? pageUrl : pageUrl.replace(`page=${i-1}`, `page=${i}`);
            await page.goto(pageUrl, { waitUntil: "load", timeout: 15000 });
            await page.waitForSelector('body');
            let eventLinks = await page.$$eval('div > div[class$=desktop-card] .event-card-details a', el => el.map( x => x.getAttribute('href').split('?')[0])); // get href but remove affiliate stuff ?aff=..
            links.push(eventLinks);
        }
        links = links.flat(); // flatten the array

        // go through links to get title & details
        let events = [];
        for (let link of links) {
            await page.goto(link, { waitUntil: "load", timeout: 15000 });
            await page.waitForSelector('body');

            let title = await page.$eval(".event-title", el => el.textContent);
            let startDate = (!! await page.$('.start-date')) ? await page.$eval('.start-date', el => el.getAttribute('datetime')) : null; // if exists get the datetime
            let summary = await page.$eval('p.summary', el => el.textContent);
            let description = await page.$$eval("div[class$=main-inner]", el => el.map(x => x.textContent.replace(/[\uFEFF]/g, ''))); // get text and remove utf8 bom
            let image = await page.$$eval("[data-testid=hero-img]", el => el.map( x => x.getAttribute('src'))); // can be multiple

            events.push({
                link : link,
                title : title,
                startDate : startDate,
                summary : summary,
                description : description,
                image : image
            })
        }

        const json = JSON.stringify(events, null, 2);
        await fsp.writeFile('events.json', json);

        browser.close();

    } catch (e) {
        console.log(e);
    }

})();