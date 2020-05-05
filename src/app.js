import ButtonRandom from '../src/components/button-random-search.component';
import Root from './index';

export const ReaderDom = {
    appendComponent: function(component){
        return new DOMParser().parseFromString(component, 'text/html').querySelector('body').firstChild;
    }
}

window.customElements.define('app-root', Root);
window.customElements.define('app-button-random', ButtonRandom);