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
import "../css/cores.css";

import MenuMobile from './modules/menu-mobile.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';
import { ProgramasMulheresLoader } from './modules/programasMulheresLoader.js';
import { ProgramasEquipesLoader } from './modules/programasEquipesLoader.js';
import mulheresData from '../programaMulheres.json';
import equipesData from '../programaEquipes.json';



// Função para configurar os links dos serviços
function setupServiceLinks(serviceLoader, page) {
    const serviceLinks = document.querySelectorAll(`a[href*="${page}"]`);
    serviceLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            const serviceId = link.hash.substring(1);
            if (window.location.pathname.includes(page)) {
                console.log('Already on the correct page, loading service dynamically:', serviceId);
                serviceLoader.loadService(serviceId);
            } else {
                console.log('Redirecting to page with hash:', page, serviceId);
                window.location.href = `${page}#${serviceId}`;
            }
        });
    });
}

// Função principal de inicialização
document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM completamente carregado.");

    // Inicializa o menu mobile com submenu integrado
    const menuMobile = new MenuMobile('[data-menu="logo"]', '[data-menu="button"]', '[data-menu="list"]', '[data-menu="contato-mobile"]', '[data-menu="linkedin"]', '[data-menu="instagram"]');
    if (menuMobile) {
        console.log('MenuMobile initialized successfully');
        menuMobile.init();
    } else {
        console.error('MenuMobile failed to initialize');
    }

  initPageOpenAnimations();
    initScrollAnimations();

  const pathname = window.location.pathname.toLowerCase();

    if (pathname.includes('programa-mulheres')) {
        console.log('Initializing loader for "programa-mulheres".');
        const loader = new ProgramasMulheresLoader(mulheresData);
        setupServiceLinks(loader, 'programa-mulheres');
        handleInitialLoad(loader);
    } else if (pathname.includes('programa-equipes')) {
        console.log('Initializing loader for "programa-equipes".');
        const loader = new ProgramasEquipesLoader(equipesData);
        setupServiceLinks(loader, 'programa-equipes');
        handleInitialLoad(loader);
    } else {
        console.info('Nenhum loader necessário para esta página.');
    }
});



// Função para carregar o serviço inicial com base no hash da URL
function handleInitialLoad(loader) {
    const serviceId = window.location.hash.substring(1);
    if (serviceId) {
        console.log('Carregando serviço com ID:', serviceId);
        loader.loadService(serviceId);
    } else {
        console.info('Nenhum Service ID encontrado na URL. Carregando conteúdo padrão...');
    }

    window.addEventListener('hashchange', () => {
        const newServiceId = window.location.hash.substring(1);
        if (newServiceId) {
            console.log('Hash changed, carregando novo serviço com ID:', newServiceId);
            loader.loadService(newServiceId);
        } else {
            console.warn('Service ID is undefined or null on hash change');
        }
    });
}
