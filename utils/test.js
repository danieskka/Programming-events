const puppeteer = require('puppeteer')
const fs = require('fs');
const url = 'https://www.eventbrite.es/d/spain/development/'


const extractData = async () => {
    try{
        const browser = await puppeteer.launch({headless:true})
        const page = await browser.newPage()
        await page.goto(url)
        // let events = [];

        // await  new Promise(r => setTimeout(r, 4000)); //page.waitForTimeout(4000);
        // const eventData = await page.evaluate((url) => {
        // const eventContainer = Array.from(document.querySelectorAll('.Container_root__16e3w'))
        // const data = eventContainer.map(elem  => ({
        //     title: elem.querySelector('.Typography_root__lp5bn').innerText,
        //     date: elem.querySelector('.Stack_root__1ksk7 > p').innerText,
        //     location: elem.querySelector('.Stack_root__1ksk7 > p:nth-of-type(2)').innerText,
        //     price: elem.querySelector('.Stack_root__1ksk7 > p:nth-of-type(3)').innerText,
        //     image: elem.querySelector('img').getAttribute('src')
        // }))
       const infoData = await page.removeScriptToEvaluateOnNewDocument((url) => {
        const infoContainer = Array.from(document.querySelectorAll('.event-details__main-inner'))
        const info = infoContainer.map(elem => ({
            summary: elem.querySelector('p.summary').innerText
        }))
        return info;
       }, url)
       
        // }, url)
        // console.log(eventData)

        await browser.close();
        }
    catch(err){
        return {error:err}
    }
        
    

   

    // fs.writeFile('data.json', JSON.stringify(eventData), (err) => {
    //     if (err) throw err;
    //     console.log('Datos guardados');
    // });


}

extractData()