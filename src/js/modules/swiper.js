import Swiper from 'swiper';
import 'swiper/swiper-bundle.css';

export default class SwiperGallery {
    constructor(containerSelector, options = {}) {
        // Define the default options
        this.defaultOptions = {
            loop: true,
            slidesPerView: 1,
            spaceBetween: 90, 
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            breakpoints: {
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                640: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        };

        // Merge default options with user-provided options
        this.options = { ...this.defaultOptions, ...options };

        // Selector for the Swiper container
        this.containerSelector = containerSelector;
    }

    initialize() {
        new Swiper(this.containerSelector, this.options);
    }
}