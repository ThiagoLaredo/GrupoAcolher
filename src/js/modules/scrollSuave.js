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
          const hash = href.split('#')[1];

          // Verifica se o link é para a própria página ou se contém o hash
          // A URL pode ou não conter .html, por isso verificamos ambos os casos
          if (window.location.pathname.includes('servicos') && hash) {
            event.preventDefault();
            this.scrollToSection(`#${hash}`);
            window.history.pushState(null, null, `#${hash}`); // Atualiza a hash na URL
          } else {
            // Caso esteja em outra página, apenas permite a navegação normal
            window.location.href = href; // Redireciona normalmente para outra página
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
        block: 'end',  // Alinha a seção no fim da janela
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
            block: 'end',  // Alinha a seção no fim da janela
          });
        }, 100);  // Pequeno atraso para garantir que a página carregue completamente
      }
    }
  }
}
