// function onLoadPage(){
//     console.log('li')
//     document.onreadystatechange = function(){
//         if(document.readyState === 'complete'){
//         }
//     }
// }

/*
* Tipo Primitivos: 
*
* Int (Integer) 2 ou 0.2
* Double (Double) 0.0002
* Bool (Boolean) false ou true
* Number (Number) 2
* Float (Number) 0.02
* String (char) 'texto' ou "texto"
* Array (Lista) ['string', 0, 'texto']
* Object {propriedade:'valor', propriedade:10, propriedade:[]}
*/
const config = {
    animate:'animated',
    fadeinleft:'fadeInLeft',
    left:'hide-left',
    el_sidebar: document.querySelector('#sidebar'),
    sidebar:false,
    el_main: document.querySelector('.main')
}
function hideMenu(){
    // config.sidebar = true;
    // if(config.el_sidebar.classList.contains(config.animate)){
    //     config.el_sidebar.classList.remove(config.animate);
    //     config.el_sidebar.classList.remove(config.fadeinleft);
    // }else{
    //     config.el_sidebar.classList.add(config.animate);
    //     config.el_sidebar.classList.add(config.fadeinleft);
    //     clear();
    // }
    if(config.sidebar && !config.el_sidebar.classList.contains(config.animate)){
        config.el_sidebar.classList.remove(config.left);
        config.el_sidebar.classList.add(config.animate);
        config.el_sidebar.classList.add(config.fadeinleft);
        config.el_main.style.marginLeft = '256px';

        config.sidebar = false;
    }else{
        config.el_sidebar.classList.remove(config.animate);
        config.el_sidebar.classList.remove(config.fadeinleft);
        
        config.el_main.style.marginLeft = 0;
        config.el_main.style.transition = 'margin-left 1s';

        config.el_sidebar.style.transition = 'left 1s';
        config.el_sidebar.classList.add(config.left);

        config.sidebar = true;
    }
}
function clear(){
    setTimeout(() => {
        config.element.classList.remove(config.animate);
        config.element.classList.remove(config.fadeinleft);
    },1000);
}
