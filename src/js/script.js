import "../css/global.css";
import "../css/header.css";
import "../css/introducao.css";
import "../css/introducao-pg-interna.css";
import "../css/sobre-home.css";
import "../css/servicos-home.css";
import "../css/diferenciais.css";
import "../css/galeria.css";
import "../css/destaques.css";
import "../css/contato-home.css";
import "../css/footer.css";
import "../css/menu-mobile.css";
import "../css/submenu.css";
import "../css/cores.css";
import "../css/componentes.css";
import "../css/sobre.css";
import "../css/pg-servicos.css";
import "../css/acoes.css";
import "../css/treinamentos.css";
import "../css/blog.css";
import "../css/contato.css";
// import SwiperGallery from './modules/swiper.js';
import MenuMobile from './modules/menu-mobile.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';
import initScrollSuave from './modules/scrollSuave.js';

// Função principal de inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // Inicializa o menu mobile com submenu integrado
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]');
    if (menuMobile) {
        console.log('MenuMobile initialized successfully');
        menuMobile.init();
    } else {
        console.error('MenuMobile failed to initialize');
    }

    initPageOpenAnimations();
    initScrollAnimations();

  // Inicializa a rolagem suave na página de serviços
 // Verifica se estamos na página 'servicos.html'
 if (window.location.pathname.includes('servicos')) {
    console.log('Inicializando rolagem suave na página de serviços');
    new initScrollSuave();
  }

    // const gallery = new SwiperGallery('.swiper-container', {
    //     // Aqui você pode passar opções personalizadas se necessário
    // });
    // gallery.initialize();

});