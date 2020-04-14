import Format from '../utils/Format';

export default class AppController {
    constructor(){
        this.fetchIds();
        this.initEvents();

        this.config = {
            animate:'animated',
            fadeinleft:'fadeInLeft',
            left:'hide-left',
            el_sidebar: this.el['sidebar'],
            sidebar:false,
            el_main: this.el['app']
        }
    }

    fetchIds(){
        this.el = {};
        document.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });
        this.el['menuSetinha'].checked = true;
    }

    initEvents(){
        this.el['hideMenu'].onclick = (e) => {
            e.preventDefault();
            if(this.config.sidebar && !this.config.el_sidebar.classList.contains(this.config.animate)){
                this.config.el_sidebar.classList.remove(this.config.left);
                this.config.el_sidebar.classList.add(this.config.animate);
                this.config.el_sidebar.classList.add(this.config.fadeinleft);
                this.config.el_main.style.marginLeft = '256px';

                this.config.sidebar = false;
                this.el['menuSetinha'].checked = true;

            }else{
                this.config.el_sidebar.classList.remove(this.config.animate);
                this.config.el_sidebar.classList.remove(this.config.fadeinleft);
                
                this.config.el_main.style.marginLeft = 0;
                this.config.el_main.style.transition = 'margin-left 1s';

                this.config.el_sidebar.style.transition = 'left 1s';
                this.config.el_sidebar.classList.add(this.config.left);
                
                this.config.sidebar = true;
                this.el['menuSetinha'].checked = false;
            }
        }
    }
}