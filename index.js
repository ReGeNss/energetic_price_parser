import puppeteer from 'puppeteer';
// const {ATBDataParser} = require('./atb_data_parsing');
import {ATBDataParser} from './atb_data_parsing.js';

const atbParser = new ATBDataParser();
atbParser.atbDataParse();


