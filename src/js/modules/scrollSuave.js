export default class initScrollSuave {
  constructor() {
    this.linksInternos = document.querySelectorAll('.submenu a');
    this.addLinkEvent();
    this.scrollToHashOnLoad();
  }

  // Adiciona evento de clique nos links internos
  addLinkEvent() {
    if (this.linksInternos.length) {
      this.linksInternos.forEach((link) => {
        link.addEventListener('click', (event) => {
          const href = event.currentTarget.getAttribute('href');

          // Verifica se o link é para a própria página ou se contém um hash
          if (href.startsWith('#') || href.includes(window.location.pathname)) {
            event.preventDefault();
            const hash = href.split('#')[1];
            this.scrollToSection(`#${hash}`);
          }
        });
      });
    }
  }

  // Método para rolar suavemente até a seção correspondente
  scrollToSection(hash) {
    const section = document.querySelector(hash);
    if (section) {
      section.scrollIntoView({
        behavior: 'smooth',
        block: 'end',  // Centraliza a seção na página
      });
    }
  }

  // Detecta o hash na URL ao carregar a página e rola até a seção correspondente
  scrollToHashOnLoad() {
    const hash = window.location.hash;  // Obtém o hash da URL
    if (hash) {
      const section = document.querySelector(hash);
      if (section) {
        // Usa setTimeout para garantir que a página esteja totalmente carregada antes de rolar
        setTimeout(() => {
          section.scrollIntoView({
            behavior: 'smooth',
            block: 'end',  // Centraliza a seção na página
          });
        }, 100);  // Pequeno atraso para garantir que a página carregue completamente
      }
    }
  }
}
