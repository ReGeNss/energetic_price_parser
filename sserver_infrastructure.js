import {express} from 'express';

export class ServerInfrastructure {
    app = null;
    port = 80;
    constructor() {
        this.app = express();
        app.listen(this.port, () => {
            console.log(`Server is running on port ${this.port}`);
        });
        app.get('/', (req, res) => {
            res.send('Hello, World!');
        });
    }

}