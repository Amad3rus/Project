import Format from '../utils/Format';

export default class AppController {
    constructor(){
        this.fetchIds();
        this.initEvents();
        this.fetchContacts();
        this.small = false;
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
        console.log(this.el);
    }

    initEvents(){
        this.hideMenuOnclick();
        this.onRizeWindow();
    }
    hideMenuOnclick(){
        this.el['hideMenu'].onclick = (e) => {
            e.preventDefault();
            if(this.config.sidebar && !this.config.el_sidebar.classList.contains(this.config.animate)){
                this.config.el_sidebar.classList.add(this.config.animate);
                this.config.el_sidebar.classList.add(this.config.fadeinleft);
                this.config.el_sidebar.style.width = '100%';
                this.config.sidebar = false;
                this.el['menuSetinha'].checked = true;
            }else{
                this.config.el_sidebar.classList.remove(this.config.animate);
                this.config.el_sidebar.classList.remove(this.config.fadeinleft);
                this.config.el_sidebar.style.width = 0;
                this.config.sidebar = true;
                this.el['menuSetinha'].checked = false;
            }
        }
    }
    fetchContacts(){
        const contacts = [
            {
                name:'Kakashi',
                message:'olá',
                time: new Date().getTime()
            },
            {
                name:'Maria',
                message:'já estou aqui',
                time: new Date().getTime()
            },
            {
                name:'João',
                message:'Não foi?',
                time: new Date().getTime()
            },
            {
                name:'Vinícius',
                message:'tudo bem?',
                time: new Date().getTime()
            },
        ]
        contacts.forEach((value, index) => {
            let li = document.createElement('li');
            li.id = 'list-' + index;
            li.innerHTML += `
                <button type="button">
                    <div class="img">
                        <i class="large material-icons">person</i>
                    </div>
                    <div class="text">
                        <span class="name">${value.name}</span>
                        <span class="message">${value.message}</span>
                        <span class="time">${value.time}</span>
                    </div>
                </button>
            `
            this.el['listContact'].appendChild(li);
        });
    }
    onRizeWindow(){
        window.addEventListener('resize', (e) => {
            if(e.target.innerWidth <= 1024){
                this.config.el_sidebar.classList.remove(this.config.animate);
                this.config.el_sidebar.classList.remove(this.config.fadeinleft);
                this.config.el_sidebar.style.width = 0;
                this.config.sidebar = true;
                this.el['menuSetinha'].checked = false;
            }else{
                this.config.el_sidebar.classList.remove(this.config.left);
                this.config.el_sidebar.classList.add(this.config.animate);
                this.config.el_sidebar.classList.add(this.config.fadeinleft);
                this.config.el_sidebar.style.width = '100%';
                this.config.sidebar = false;
                this.el['menuSetinha'].checked = true;
            }
        });
    }
}