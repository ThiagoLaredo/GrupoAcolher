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
        event.stopPropagation();
        console.log('Menu button clicked on mobile');

        if (this.menuOpened) {
            console.log('Menu already opened, closing menu now');
            this.closeMenu();
        } else {
            console.log('Opening menu on mobile');
            this.menuOpened = true;
            this.menuList.classList.add(this.activeClass);
            this.menuButton.classList.add(this.activeClass);
            this.whatsappIcon.classList.add('hidden');
            document.querySelector('.header-contacts-background').classList.add('hidden'); // Esconde o header
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
          this.whatsappIcon.classList.remove('hidden');
          document.querySelector('.header-contacts-background').classList.remove('hidden'); // Mostra o header
          this.toggleMenuAnimation(false);
      }
  }

  handleSubmenuClick() {
    const submenuItems = this.menuList.querySelectorAll('.has-submenu > span');
  
    submenuItems.forEach(item => {
      const parent = item.closest('.has-submenu');
      const submenu = parent.querySelector('.submenu');
      let arrow = parent.querySelector('.submenu-arrow');
  
      if (!arrow) {
        arrow = this.createArrow();
        item.appendChild(arrow);
      }
  
      // Inicializa o estado do submenu e a seta
      this.initializeSubmenuState(submenu, arrow);
  
      // Remove qualquer evento previamente atribuído para evitar duplicidade
      arrow.removeEventListener('click', this.toggleSubmenu);
      parent.removeEventListener('mouseenter', this.showSubmenu);
      parent.removeEventListener('mouseleave', this.hideSubmenu);
  
      if (this.isMobile()) {
        // No mobile: Toggle no clique da seta
        arrow.addEventListener('click', this.toggleSubmenu.bind(this, submenu, arrow));
      } else {
        // No desktop: Mostra e esconde no hover
        parent.addEventListener('mouseenter', this.showSubmenu.bind(this, submenu, arrow));
        parent.addEventListener('mouseleave', this.hideSubmenu.bind(this, submenu, arrow));
      }
    });
  }
  
  showSubmenu(submenu, arrow) {
    submenu.style.display = 'flex';
    submenu.classList.add('active');
    arrow.style.transform = 'rotate(180deg)';  // Seta para cima
  }
  
  hideSubmenu(submenu, arrow) {
    submenu.style.display = 'none';
    submenu.classList.remove('active');
    arrow.style.transform = 'rotate(0deg)';  // Seta para baixo
  }
  
  toggleSubmenu(submenu, arrow, event) {
    event.preventDefault();
    const isOpen = submenu.classList.contains('active');
  
    if (isOpen) {
      this.hideSubmenu(submenu, arrow);
    } else {
      this.showSubmenu(submenu, arrow);
    }
  }
  
  
  toggleSubmenu(submenu, arrow, event) {
    event.preventDefault();
    const isOpen = submenu.classList.contains('active');
  
    if (isOpen) {
      submenu.style.display = 'none';
      submenu.classList.remove('active');
      arrow.style.transform = 'rotate(0deg)'; // Seta para baixo
    } else {
      submenu.style.display = 'flex';
      submenu.classList.add('active');
      arrow.style.transform = 'rotate(180deg)'; // Seta para cima
    }
  }
  
  
  initializeSubmenuState(submenu, arrow) {
    if (submenu.classList.contains('active')) {
      submenu.style.display = 'flex'; // Certifique-se de que está visível se ativo
      arrow.style.transform = 'rotate(180deg)'; // Seta para cima
    } else {
      submenu.style.display = 'none'; // Certifique-se de que está escondido se não ativo
      arrow.style.transform = 'rotate(0deg)'; // Seta para baixo
    }
  }
  
  toggleSubmenu(submenu, arrow, event) {
    event.preventDefault();
    const isOpen = submenu.classList.contains('active');
  
    if (isOpen) {
      submenu.style.display = 'none';
      submenu.classList.remove('active');
      arrow.style.transform = 'rotate(0deg)'; // Seta para baixo
    } else {
      submenu.style.display = 'flex';
      submenu.classList.add('active');
      arrow.style.transform = 'rotate(180deg)'; // Seta para cima
    }
  }
  
  
  createArrow() {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('class', 'submenu-arrow');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
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
  
    return svg;
  }
  
  toggleSubmenu(submenu, arrow, event) {
    event.preventDefault();
    const isOpen = submenu.classList.contains('active');
  
    if (isOpen) {
      submenu.style.display = 'none';
      submenu.classList.remove('active');
      arrow.style.transform = 'rotate(0deg)'; // Seta para baixo
    } else {
      submenu.style.display = 'flex';
      submenu.classList.add('active');
      arrow.style.transform = 'rotate(180deg)'; // Seta para cima
    }
  }
  
  isMobile() {
    return window.matchMedia("(max-width: 768px)").matches;
  }
  
  
  createArrow() {
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
  
    return svg;
  }
  
  handleSubmenuToggle(submenu, arrow, e) {
    if (this.isMobile()) {
      e.preventDefault();
      e.stopPropagation();
  
      const isActive = submenu.classList.contains('active');
  
      if (isActive) {
        gsap.to(submenu, {
          height: 0,
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            submenu.classList.remove('active');
            arrow.style.transform = ''; // Set arrow down
          }
        });
      } else {
        gsap.set(submenu, { height: 'auto', display: 'block' });
        const fullHeight = submenu.offsetHeight + "px";
        gsap.fromTo(submenu, {
          height: 0, opacity: 0
        }, {
          height: fullHeight, opacity: 1, duration: 0.3, ease: "power2.inOut", onComplete: () => {
            submenu.classList.add('active');
            arrow.style.transform = 'rotate(180deg)'; // Set arrow up
          }
        });
      }
    }
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
