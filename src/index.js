import AppController from './controllers/appcontroller';

export default class Root extends HTMLElement{
    constructor(){
        super();
        this.app = new AppController();
    }
}