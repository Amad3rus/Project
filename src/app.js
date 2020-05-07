import ButtonRandom from '../src/components/random-button/button-random-search.component';
import Root from './index';
import Sidebar from './components/sidebar/sidebar-component';
import ListContacts from './components/list-contacts/list-contacts-component';

export const ReaderDom = {
    appendComponent: function(component){
        return new DOMParser().parseFromString(component, 'text/html').querySelector('body').firstChild;
    }
}

window.customElements.define('app-root', Root);
window.customElements.define('app-sidebar', Sidebar);
window.customElements.define('app-list-contacts', ListContacts);
window.customElements.define('app-button-random', ButtonRandom);