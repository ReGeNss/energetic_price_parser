export class ForaDataParser{
    #siteUrl = 'https://fora.ua/category/energetychni-napoi-2486';

    parse = async (browser) => {
        const page = await browser.newPage();
        await page.goto(this.#siteUrl);
        const parsedData = await page.evaluate(() => {
            const products = [];
            let elements = document.querySelectorAll('.product-list-item');
            // for(let e of elements){
            //     return e.innerHTML;
            // }
            for(let e of elements){
                let pricesBloc = e.querySelector('.product-price-container');
                if( pricesBloc == null){
                    console.log('pricesBloc is null');
                    continue;
                }
                let currentPriceInt = pricesBloc.querySelector('.current-integer').innerText;
                let currentPriceFractionElement = pricesBloc.querySelector('.current-fraction');
                // if(currentPriceFractionElement == null){continue;}
                let currentPriceFraction = currentPriceFractionElement.innerText;
                let currentPrice = currentPriceInt + '.' + currentPriceFraction;

                let oldPriceElement = pricesBloc.querySelector('.old-integer');
                let oldPrice = null; // подумай нужно ли оно с налл
                if(oldPriceElement != null){
                    oldPrice = oldPriceElement.innerText;
                }
                let titleElement = e.querySelector('.product-title');
                let title = titleElement.innerText;

                let imgElement = e.querySelector('.product-list-item__image');
                let imgSrc = imgElement.getAttribute('src');
                products.push({title,currentPrice,oldPrice,imgSrc});
            }
            return products;
        });
        page.close();
        return parsedData;
    }

}