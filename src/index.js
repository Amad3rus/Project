// import AppController from './controllers/appcontroller';
import { ReaderDom } from './app';
import AppComponent from './pages/app/app-component.html';
import AppPage from './pages/app/app-component';


export default class Root extends HTMLElement{
    constructor(){
        super();
        this.appendChild(ReaderDom.appendComponent(AppComponent));

        this.app = new AppPage();
        const self = this;
        
        this.app.el.app.addEventListener('isAuth', stopLoading);
        function stopLoading(e){
            document.querySelector('app-loading-page').hide();
            self.app.el['app'].css({display:'flex'});
        }
    }
}