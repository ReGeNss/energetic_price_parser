

export class SilpoDataParser{
    #siteUrl = 'https://silpo.ua/category/energetychni-napoi-59';

    parse = async (browser) => {
        const page = await browser.newPage();
        await page.goto(this.#siteUrl);
        await sleep(4000);
        const parsedData = await page.evaluate(() => {
            const products = [];
            let elements = document.querySelectorAll('.ng-star-inserted');
            // for(let e of elements){
            //     return e.innerHTML;
            // }
            for(let e of elements){
                let currentPriceElement = e.querySelector('.ft-whitespace-nowrap');
                if(currentPriceElement == null){
                    console.log('currentPriceElement is null');
                    continue;
                }
                let currentPrice = currentPriceElement.innerText;
                let oldPriceElement = e.querySelector('.ft-line-through');
                let oldPrice = null; // подумай нужно ли оно с налл
                if(oldPriceElement != null){
                    oldPrice = oldPriceElement.innerText;
                }
                let titleElement = e.querySelector('.product-card__title');
                if(titleElement == null){
                    console.log('titleElement is null');
                    continue;
                }
                let title = titleElement.innerText;

                let imgElement = e.querySelector('.product-card__top-inner');
                let imgSrc = imgElement.firstChild.getAttribute('src');
                products.push({title ,currentPrice, oldPrice,imgSrc});
            }
            return products;
        });
        page.close();
        return parsedData;
    }



}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}