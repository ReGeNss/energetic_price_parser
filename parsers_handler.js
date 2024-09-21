import puppeteer from 'puppeteer-core';
import {ATBDataParser} from './parsers/atb_data_parsing.js';
import {ForaDataParser} from './parsers/fora_data_parsing.js';
import {SilpoDataParser} from "./parsers/silpo_data_parsing.js";
import {TrashDataParser} from "./parsers/trash_data_parsing.js";

export class ParsersHandler{
    #browser = null;
    constructor() {
        // this.#initializeBrowser();
    }
    async #initializeBrowser() {
        this.#browser = await this.#createBrowser();
    }

    #createBrowser = async () => {
        return await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox'], 
            executablePath: '/usr/bin/chromium-browse'
            // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\Chrome.exe',
        });
    }



    parseSites = async () => {
        await this.#initializeBrowser()
        let parsedData = {};
        const atbParser = new ATBDataParser();
        const foraParser = new ForaDataParser();
        const silpoParser = new SilpoDataParser();
        const thrashParser = new TrashDataParser();
        parsedData['atb'] = await atbParser.parse(this.#browser);
        parsedData['fora'] = await foraParser.parse(this.#browser);
        parsedData['silpo'] = await silpoParser.parse(this.#browser);
        parsedData['trash'] = await thrashParser.parse(this.#browser);
        console.log(parsedData);
        this.#browser.close();
        return parsedData;
    }

}