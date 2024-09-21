import {ParsersHandler} from './parsers_handler.js';
import { MongoDataBase } from './database_services/database.js';

const parser = new ParsersHandler();
const parsedData = await parser.parseSites();
// new MongoDataBase(); 

