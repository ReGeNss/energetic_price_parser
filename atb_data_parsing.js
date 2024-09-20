import puppeteer from 'puppeteer';


export class ATBDataParser{
    #siteUrl = 'https://www.atbmarket.com/catalog/364-yenergetichni';

    atbDataParse = async () => {
        const browser = await puppeteer.launch({
            headless: false,
            defaultViewport: null,
            executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe' // Укажите путь к вашему браузеру
        });
        const page = await browser.newPage();
        await page.goto(this.#siteUrl);
        const products = await page.evaluate(() => {
            const products = [];
            let elements = document.querySelectorAll('.catalog-item');
            console.log(elements);
            for(let e of elements){
                let pricesBloc = e.querySelector('.catalog-item__bottom');
                let currentPrice = pricesBloc.querySelector('.product-price__top').innerText;
                let oldPriceElement = pricesBloc.querySelector('.product-price__bottom');
                let oldPrice = null; // подумай нужно ли оно с налл
                if(oldPriceElement != null){
                    oldPrice = oldPriceElement.innerText;
                }
                let titleElement = e.querySelector('.catalog-item__title');
                let title = titleElement.innerText;

                let imgElement = e.querySelector('.catalog-item__img');
                let imgSrc = imgElement.getAttribute('src');
                products.push({title ,currentPrice, oldPrice,imgSrc});
            }
            return products;
        });
        console.log({products});
        await browser.close();
    }

}

