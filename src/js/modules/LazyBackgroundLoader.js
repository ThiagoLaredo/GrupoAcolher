class LazyBackgroundLoader {
  constructor(elements) {
    this.elements = elements.map(el => ({
      ...el,
      ref: document.querySelector(el.selector)
    }));
    this.observer = null;
    this.init();
  }

  loadImage(element) {
    if (element.ref) {
      element.ref.style.backgroundImage = `url('${element.imageUrl}')`;
    }
  }

  setupObserver() {
    const options = {
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const foundElement = this.elements.find(el => el.ref === entry.target);
          this.loadImage(foundElement);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    this.elements.forEach(el => {
      if (el.ref) {
        this.observer.observe(el.ref);
      }
    });
  }

  init() {
    document.addEventListener("DOMContentLoaded", () => {
      this.setupObserver();
    });
  }
}

export default LazyBackgroundLoader;
