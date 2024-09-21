// тут відбувається парсинг тільки тих товарів, що мають знижку
// TODO: випаршувати саме енергетики
export class TrashDataParser{
    #siteUrl = 'https://thrash.ua/promotions';

    parse = async (browser) => {
        const page = await browser.newPage();
        await page.goto(this.#siteUrl);
        await sleep(2000);
        const parsedData = await page.evaluate(() => {
            const products = [];
            let elements = document.querySelectorAll('.normal');
            for(let e of elements){
                let currentPriceInteger = e.querySelector('.current-integer').innerText;
                let currentPriceFraction = e.querySelector('.current-fraction').innerText;

                let oldPriceInteger = e.querySelector('.old-integer').innerText;
                let oldPriceFraction = e.querySelector('.old-fraction').innerText;

                let currentPrice = currentPriceInteger + '.' + currentPriceFraction;
                let oldPrice = oldPriceInteger + '.' + oldPriceFraction;

                let titleElement = e.querySelector('.product-title');
                let title = titleElement.innerText;

                let imgElement = e.querySelector('.product-img');
                let imgSrc = imgElement.getAttribute('src');
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