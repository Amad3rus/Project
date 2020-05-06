import { ReaderDom } from '../../app';
import SidebarComponent from './sidebar-component.html';
import Format from '../../utils/format';
import ProtoService from '../../services/prototype-serivce';

export default class Sidebar extends HTMLElement{
    constructor(){
        super();
        new ProtoService();
        this.appendChild(ReaderDom.appendComponent(SidebarComponent));
        this.el = {};

        this.querySelectorAll('[id]').forEach(element => {
            this.el[Format.formatToCamelCase(element.id)] = element;
        });
        
        this.initEvents();
    }

    initEvents(){
        this.el.headerMessages.on('click', e => {
            this.el.panelContacts.show();
            setTimeout(() => {
                this.el.panelContacts.addClass('open-panel');
            },300);
        });
    }
}
