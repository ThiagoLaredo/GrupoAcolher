import gsap from "gsap";

export default class MenuMobile {
  constructor(logoMobile, menuButton, menuList, events) {
    this.logoMobile = document.querySelector(logoMobile);
    this.menuButton = document.querySelector(menuButton);
    this.menuList = document.querySelector(menuList);
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
      this.toggleMenuAnimation(false);
    }
  }

  handleSubmenuClick() {
    const submenuToggle = this.menuList.querySelector('.has-submenu .submenu-arrow'); // Seletor apenas para a seta
    const submenu = this.menuList.querySelector('.has-submenu .submenu'); // Seletor para o submenu

    const toggleSubmenu = () => { // Defina a função no escopo correto para ser acessível
        const isActive = submenu.classList.contains('active');
        if (isActive) {
            gsap.to(submenu, { height: 0, opacity: 0, duration: 0.3, ease: "power2.inOut", onComplete: () => submenu.classList.remove('active') });
        } else {
            gsap.set(submenu, { height: 'auto', display: 'block' });
            const fullHeight = submenu.scrollHeight + "px";
            gsap.fromTo(submenu, { height: 0, opacity: 0 }, { height: fullHeight, opacity: 1, duration: 0.3, ease: "power2.inOut", onComplete: () => submenu.classList.add('active') });
        }
    };

    submenuToggle.addEventListener('click', (e) => {
        e.stopPropagation(); // Impede a propagação do evento para outros elementos
        toggleSubmenu(); // Chama a função de alternar o submenu
    });

    if (this.isMobile()) {
        // Expande o submenu automaticamente no mobile ao carregar a página
        gsap.set(submenu, { height: 'auto', display: 'block', opacity: 1 });
        submenu.classList.add('active');
    }
}

  
  addMenuMobileEvents() {
    this.menuButton.addEventListener('click', this.openMenu);
    this.menuList.addEventListener('click', (event) => {
      if (event.target.tagName === 'A') {
        console.log('Menu list item clicked');
        this.closeMenu();
      }
    });
  }

  addLinkClickEvents() {
    // Adiciona os eventos a todos os links no menu
    const links = this.menuList.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', (event) => {
        if (link.id === 'servicosLink' && this.isMobile()) {
          // Se é o link de "Serviços" e estamos no mobile, não fazemos nada extra
          // O link pode funcionar normalmente para navegar para a página de "Serviços"
        } else {
          // Para todos os outros links ou se não estivermos no mobile, fechamos o menu
          this.closeMenu();
        }
      });
    });
  }
  
  animateMenuItems() {
    const menuItems = document.querySelectorAll('.menu li');
    menuItems.forEach((item, index) => {
      gsap.fromTo(item, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.5, ease: "power1.out", delay: 0.1 + index * 0.1, onComplete: function() { gsap.set(item, { clearProps: "all" }); } });
    });
  }

  toggleMenuAnimation(show) {
    const menuList = document.querySelector('.menu [data-menu="list"]');
    if (show) {
      gsap.to(menuList, { duration: 0.5, opacity: 1, visibility: 'visible', ease: 'power1.inOut', onStart: function() { menuList.style.display = 'flex'; } });
    } else {
      gsap.to(menuList, { duration: 0.5, opacity: 0, visibility: 'hidden', ease: 'power1.inOut', onComplete: function() { menuList.style.display = 'none'; } });
    }
  }

  init() {
    if (this.isMobile()) {
      const submenu = this.menuList.querySelector('.has-submenu .submenu');
      submenu.classList.add('active'); // Adiciona a classe 'active' no carregamento da página
      this.setSubmenuInitialState(submenu); // Ajusta a altura e a visibilidade iniciais
    }
    this.addMenuMobileEvents();
    this.addLinkClickEvents();
    this.handleSubmenuClick();
    return this;
  }
  
  setSubmenuInitialState(submenu) {
    gsap.set(submenu, { height: 'auto', display: 'block', opacity: 1 });
  }
  
}
