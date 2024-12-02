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
import MenuMobile from './modules/menu-mobile.js';
import { initPageOpenAnimations, initScrollAnimations } from './modules/animations.js';
import initScrollSuave from './modules/scrollSuave.js';
import FormHandler from './modules/formHandler.js';
import { fetchWordPressPosts } from './modules/wpAPI.js';

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
    new FormHandler('.contato-form');

  // Inicializa a rolagem suave na página de serviços
 // Verifica se estamos na página 'servicos.html'
 if (window.location.pathname.includes('servicos')) {
    console.log('Inicializando rolagem suave na página de serviços');
    new initScrollSuave();
  }

 
});

let currentPage = 1; // Página inicial
const postsPerPage = 6; // Número de posts por página

// Função para renderizar posts
async function renderBlogPosts(page = 1) {
  const postsContainer = document.getElementById('blog-container');
  const paginationContainer = document.getElementById('pagination-container');

  // Verifica se os elementos existem antes de tentar manipulá-los
  if (!postsContainer || !paginationContainer) {
    console.warn('Elementos necessários para a renderização do blog não foram encontrados.');
    return; // Sai da função se os elementos não forem encontrados
  }

  const { posts, totalPages } = await fetchWordPressPosts(page, postsPerPage);
  
  // Limpa o container antes de adicionar os posts
  postsContainer.innerHTML = '';
  paginationContainer.innerHTML = '';

  // Verifica se posts é um array antes de usar forEach
  if (Array.isArray(posts) && posts.length > 0) {
    posts.forEach(post => {
      const imageUrl = post._embedded['wp:featuredmedia'] ? post._embedded['wp:featuredmedia'][0].source_url : '';
      
      const postElement = document.createElement('div');
      postElement.classList.add('blog-post');
      
      postElement.innerHTML = `
        <h2>${post.title.rendered}</h2>
        ${imageUrl ? `<img src="${imageUrl}" alt="${post.title.rendered}">` : ''}
        <p>${post.excerpt.rendered}</p>
        <a href="${post.link}">Leia mais</a>
      `;
      
      postsContainer.appendChild(postElement);
    });

    // Gera os botões de paginação
    for (let i = 1; i <= totalPages; i++) {
      const pageButton = document.createElement('button');
      pageButton.textContent = i;
      pageButton.classList.add('pagination-button');
      if (i === page) {
        pageButton.classList.add('active');
      }
      
      pageButton.addEventListener('click', () => {
        currentPage = i;
        renderBlogPosts(currentPage);
      });
      
      paginationContainer.appendChild(pageButton);
    }
  } else {
    postsContainer.innerHTML = '<p>Nenhum post disponível no momento.</p>';
  }
}

// Chama a função de renderização após o DOM ser carregado
document.addEventListener('DOMContentLoaded', () => {
  const postsContainer = document.getElementById('blog-container');
  
  // Somente chama renderBlogPosts se o #blog-container existir
  if (postsContainer) {
    renderBlogPosts(currentPage);
  }
});
