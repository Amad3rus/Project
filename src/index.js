import RoutesService from './services/routes-service';
import { ReaderDom } from './app';
import AppComponent from './pages/app/app-component.html';
import AppPage from './pages/app/app-component';
import NoPageComponent from './pages/no-page/no-page-component.html';
import Teste from './pages/test/test-component.html';

export default class Root extends HTMLElement{
    constructor(){
        super();
        const self = this;
        
        this.router = new RoutesService({
            mode:'hash',
            root:'/',
            hooks:{
                before: function(newPage){
                    console.info('before page load hooks', newPage);
                }
            },
            page404: function(path){
                console.log(`/${path} not found`);
                document.querySelector('app-loading-page').style.display = 'none';

                if(!self.querySelector('#page-not-found'))
                    self.appendChild(ReaderDom.appendComponent(NoPageComponent));
            }
        });

        this.router.add('', function(){
            self.showMainPage();
            console.log('home page', this);
        });

        // this.router.remove('about')
        // this.router.navigateTo('hello/World', {foo: "bar"})
        // this.router.refresh();
        
        this.router.add('search', function(){
            console.log('search page')
        }, {unloadCb: function(async){
            if(async){
                console.warn('you have unsave data, continue?');
                return confirm('you have unsave data, continue?');
            }
            return false;
        }});
        
        this.router.add('test', function(name){
            self.showTestPage();
        });
     
        this.router.check()
        this.router.addUriListener();
    }

    clearIfExistsComponents(component){
        // document.querySelector('app-loading-page').style.display = 'none';
        while(component.firstChild){
            component.removeChild(component.firstChild);
        }
    }

    showMainPage(){
        this.clearIfExistsComponents(this);
        this.appendChild(ReaderDom.appendComponent(AppComponent));
        this.app = new AppPage();
        
        this.app.el.app.on('isAuth', e => {
            document.querySelector('app-loading-page').hide();
            this.app.el['app'].css({display:'flex'});
        });
    }
    showTestPage(){
        this.clearIfExistsComponents(this);
        this.appendChild(ReaderDom.appendComponent(Teste));

        this.querySelector('#back-from-page-teste')
            .on('click', e => {
                this.router.navigateTo('');
        });
    }
}