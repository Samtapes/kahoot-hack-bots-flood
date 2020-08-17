const puppeteer = require('puppeteer');

module.exports = async function flood(data){
    try{
        const browser = await puppeteer.launch({headless: true, args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--single-process', // <- this one doesn't works in Windows
        '--disable-gpu'
        ]});
    
        const start = Date.now();
    
        async function newPage(data, pos){
            const page = await browser.newPage();
        
        
            await page.goto('https://kahoot.it/');
        
        
            // Focus on pin input
            await page.focus("input");
        
            // Typing at the inpu
            await page.keyboard.type(data.pin);
        
        
            // Loggin
            await page.click('button');
        
        
        
        
            await page.waitForNavigation();
        
        
        
        
            // Focus on nick input
            await page.focus("input");
        
            // Typing at the input
            await page.keyboard.type(data.nick + pos);
        
        
            // Entering the game
            await page.click('button');
        }
        
    
        for(var i = 0; i < 7; i++){
            await newPage(data, i);
        }
    
    
        console.log('Took', Date.now() - start, 'ms');
    
    
        // await browser.close();

        return "Sucess!"
    }

    catch(err){
        return err;
    }
};