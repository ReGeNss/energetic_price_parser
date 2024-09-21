import { MongoClient } from 'mongodb';

export class MongoDataBase{
    #database = null;
    constructor() {
        this.initDatabase();
    }

    initDatabase = async (url, options) => {
        const uri = "mongodb://uamarketplaceparserbyregens-server:vPgb0auf4W1Je6ya9olA81dx0JrTieoxnHNCtsk6xoWVmTizO25WOaY8WUhWFWf81fg7dWfaco4JACDbNmVkPg%3D%3D@uamarketplaceparserbyregens-server.mongo.cosmos.azure.com:10255/?ssl=true&retrywrites=false&maxIdleTimeMS=120000&appName=@uamarketplaceparserbyregens-server@";
        const mongoClient = new MongoClient(uri);
        console.log('Connected to database');
        await mongoClient.startSession();
        let database =  await mongoClient.db('uamarketplaceparserbyregens-database').collection('marketplaceProducts');
        await database.insertOne({_id: '3', marketPlace: 'atb', products: [{title: 'title', currentPrice: 'currentPrice', oldPrice: 'oldPrice', imgSrc: 'imgSrc'}]});
        this.#database = database;
        console.log('Collection created');
        await mongoClient.close();
    }
}
