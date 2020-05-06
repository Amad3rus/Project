// import AppController from './controllers/appcontroller';
import { ReaderDom } from './app';
import AppComponent from './pages/app/app-component.html';
import AppPage from './pages/app/app-component';


export default class Root extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(AppComponent));
        // this.app = new AppController();
        this.app = new AppPage();
    }
}