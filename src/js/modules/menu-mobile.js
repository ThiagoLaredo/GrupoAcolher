// 

import gsap from "gsap";

export default class MenuMobile {
  constructor(logoMobile, menuButton, menuList, events) {
    this.logoMobile = document.querySelector(logoMobile);
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
    this.whatsappIcon = document.querySelector('.whatsapp-float'); // Seleciona o ícone do WhatsApp
    this.activeClass = "active";
    this.events = events || ["click"];
    this.menuOpened = false; // Flag para controle de estado
    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);
    this.handleSubmenuClick = this.handleSubmenuClick.bind(this); // Vincula o método ao contexto da classe
  }

  isMobile() {
    return window.innerWidth <= 800; // Exemplo de breakpoint para mobile
  }

  openMenu(event) {
    if (this.isMobile()) {
      event.stopPropagation(); // Impede a propagação do evento para o documento apenas em mobile
      console.log('Menu button clicked on mobile');
      
      if (this.menuOpened) {
        console.log('Menu already opened, closing menu now');
        this.closeMenu();
      } else {
        console.log('Opening menu on mobile');
        this.menuOpened = true;
        this.menuList.classList.add(this.activeClass);
        this.menuButton.classList.add(this.activeClass);
        this.whatsappIcon.classList.add('hidden'); // Adiciona a classe 'hidden' ao ícone do WhatsApp
        this.animateMenuItems();
        this.toggleMenuAnimation(true);
      }
    }
  }

  closeMenu() {
    if (this.isMobile()) {
      console.log('Closing menu on mobile');
      this.menuOpened = false;
      this.menuList.classList.remove(this.activeClass);
      this.menuButton.classList.remove(this.activeClass);
      this.whatsappIcon.classList.remove('hidden'); // Remove a classe 'hidden' do ícone do WhatsApp
      this.toggleMenuAnimation(false);
    }
  }

  handleSubmenuClick() {
    const submenuItems = this.menuList.querySelectorAll('.has-submenu > span');
    submenuItems.forEach(item => {
      const parent = item.closest('.has-submenu');
      const submenu = parent ? parent.querySelector('.submenu') : null;
      
      // Verifica se o elemento de seta já existe, caso contrário, cria um novo SVG
      let arrow = item.querySelector('.submenu-arrow');
      if (!arrow) {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('class', 'submenu-arrow');
        svg.setAttribute('width', '20');
        svg.setAttribute('height', '20');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        path.setAttribute('d', 'M8 10l4 4 4-4');
        path.setAttribute('stroke', 'currentColor');
        path.setAttribute('stroke-width', '2');
        path.setAttribute('stroke-linecap', 'round');
        path.setAttribute('stroke-linejoin', 'round');
        svg.appendChild(path);
  
        item.appendChild(svg);
        arrow = svg; // Atualiza a referência da seta para o SVG recém-criado
      }
  
      if (submenu && arrow) {
        // Lógica para alternar submenu no clique apenas no mobile
        item.addEventListener('click', (e) => {
          if (this.isMobile()) {
            e.preventDefault();
            e.stopPropagation(); // Evita o fechamento ao clicar no item do submenu
  
            // Alterna entre abrir e fechar o submenu
            const isActive = submenu.classList.contains('active');
            
            if (isActive) {
              // Animação para fechar o submenu
              gsap.to(submenu, { 
                height: 0, 
                opacity: 0, 
                duration: 0.3, 
                ease: "power2.inOut",
                onComplete: () => submenu.classList.remove('active')
              });
            } else {
              // Define a altura automática antes da animação
              gsap.set(submenu, { height: 'auto', display: 'block' });
              const fullHeight = submenu.offsetHeight + "px"; // Captura a altura do submenu
              gsap.fromTo(submenu, 
                { height: 0, opacity: 0 }, 
                { height: fullHeight, opacity: 1, duration: 0.3, ease: "power2.inOut", onComplete: () => submenu.classList.add('active') }
              );
            }
  
            // Alterna a rotação da seta
            arrow.classList.toggle('open', !isActive);
          }
        });
  
        // Lógica para alternar rotação da seta no hover para desktop
        if (!this.isMobile()) {
          item.addEventListener('mouseover', () => {
            arrow.classList.add('open'); // Rotaciona a seta para cima no hover
          });
          item.addEventListener('mouseout', () => {
            arrow.classList.remove('open'); // Retorna a seta ao estado normal
          });
        }
      }
    });
  }
  

  addMenuMobileEvents() {
    this.menuButton.addEventListener('click', this.openMenu);
  
    // Fechar o menu quando um item do menuList é clicado
    this.menuList.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {  // Garante que o menu feche apenas quando os links são clicados
        console.log('Menu list item clicked');
        this.closeMenu();
      }
    });
  }

  addLinkClickEvents() {
    // Seleciona todos os links no menu
    const links = this.menuList.querySelectorAll('a');
    // Adiciona os eventos aos links do menu
    links.forEach(link => this.addLinkEventListener(link));

    // Seleciona o link da frase de destaque do banner e adiciona o evento
    const highlightLink = document.querySelector('.sublinhado');
    if (highlightLink) {
      this.addLinkEventListener(highlightLink);
    }
  }

  addLinkEventListener(link) {
    link.addEventListener('click', (event) => {
      if (this.isMobile()) {
        this.closeMenu(); // Fecha o menu
      }
    });
  }

  animateMenuItems() {
    // Animação para os itens do menu principal
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach((item, index) => {
      gsap.fromTo(item, 
        { opacity: 0, y: 10 }, 
        { opacity: 1, y: 0, duration: 0.5, ease: "power1.out", delay: 0.1 + index * 0.1,
          onComplete: function() {
            gsap.set(item, { clearProps: "all" });
          }
        }
      );
    });
  }

  toggleMenuAnimation(show) {
    const menuList = document.querySelector('.js [data-menu="list"]');
    if (show) {
      gsap.to(menuList, {
        duration: 0.5,
        opacity: 1,
        visibility: 'visible',
        ease: 'power1.inOut',
        onStart: function() {
          menuList.style.display = 'flex';
        }
      });
    } else {
      gsap.to(menuList, {
        duration: 0.5,
        opacity: 0,
        visibility: 'hidden',
        ease: 'power1.inOut',
        onComplete: function() {
          menuList.style.display = 'none';
        }
      });
    }
  }

  init() {
    if (this.logoMobile && this.menuButton && this.menuList) {
      this.addMenuMobileEvents();
      this.addLinkClickEvents(); 
    }
    this.handleSubmenuClick(); // Garante que a seta é sempre criada
    return this;
  }
}
