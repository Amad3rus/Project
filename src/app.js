import AppControler from './controllers/AppController';

window.app = new AppControler();

// const config = {
//     animate:'animated',
//     fadeinleft:'fadeInLeft',
//     left:'hide-left',
//     el_sidebar: document.querySelector('#sidebar'),
//     sidebar:false,
//     el_main: document.querySelector('.main')
// }
// window.onclick = function hideMenu(){
    // console.log(config);


    
    // if(config.sidebar && !config.el_sidebar.classList.contains(config.animate)){
    //     config.el_sidebar.classList.remove(config.left);
    //     config.el_sidebar.classList.add(config.animate);
    //     config.el_sidebar.classList.add(config.fadeinleft);
    //     config.el_main.style.marginLeft = '256px';

    //     config.sidebar = false;
    // }else{
    //     config.el_sidebar.classList.remove(config.animate);
    //     config.el_sidebar.classList.remove(config.fadeinleft);
        
    //     config.el_main.style.marginLeft = 0;
    //     config.el_main.style.transition = 'margin-left 1s';

    //     config.el_sidebar.style.transition = 'left 1s';
    //     config.el_sidebar.classList.add(config.left);

    //     config.sidebar = true;
    // }
// }
// function clear(){
//     setTimeout(() => {
//         config.element.classList.remove(config.animate);
//         config.element.classList.remove(config.fadeinleft);
//     },1000);
// }