import CreateEvent from '../utils/createEvents';

export default class CarouselController {
    constructor(config){
        this.eventService = new CreateEvent();
        this.imageDelete = new Event('imageDelete');
        this.carousel = config.carousel;
        this.control = config.control;
        this.imagesCount = 0;
        this.carouseContainer = this.carousel.querySelector('#container-document-preview');
        this.slideIndex = 1;
        
        if(this.control) this.createControl();
        this.deleteImages();

        this.showSlides(this.slideIndex);
    }

    showSlides(n){
        const slides = this.carousel.querySelectorAll('.slides');

        if(n > slides.length) this.slideIndex = 1;
        if(n < 1) this.slideIndex = slides.length;

        for(let i = 0; i < slides.length; i++){
            slides[i].hide();
        }
        if(slides.length >= 1) slides[this.slideIndex - 1].show();
    }

    createControl(){
        this.next = document.createElement('a');
        this.prev = document.createElement('a');

        this.next.addClass('next');
        this.prev.addClass('prev');

        this.prev.innerHTML = '&#10094;';
        this.next.innerHTML = '&#10095;';

        this.carouseContainer.appendChild(this.next);
        this.carouseContainer.appendChild(this.prev);

        this.next.on('click', e => {
            this.showSlides(this.slideIndex += 1);
        });
        this.prev.on('click', e => {
            this.showSlides(this.slideIndex -= 1);
        });
    }

    deleteImages(){
     this.carousel.querySelectorAll('.slides')
        .forEach((value, index) => {
            value.on('click', e => {
                if(value.childElementCount > 0){
                    value.remove();
                    this.showSlides(this.slideIndex += 1);
                    this.carousel.querySelector('#container-document-preview').dispatchEvent(this.imageDelete);
                }else{
                    console.log('Bingo - não há mais images');
                }
            });
        });
    }
}