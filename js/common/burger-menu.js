if (window.innerWidth <= 768) {
  const burgerMenu = document.querySelector('#burger-menu'),
    burgerMenuLines = document.querySelectorAll('.burger-menu__wrapper'),
    nav = document.querySelector('.nav'),
    headerMenu = document.querySelector('.header-menu'),
    headerWrapper = document.createElement('div');

  headerWrapper.append(nav, headerMenu);
  headerWrapper.classList.add('header__wrapper');
  burgerMenu.before(headerWrapper);

  let isClicked = false;

  function toggleMenu() {
    if (isClicked) {
      return;
    }

    isClicked = true;

    setTimeout(() => {
      isClicked = false;

      headerWrapper.classList.add('header__wrapper_scroll');

      if (
        !burgerMenuLines[0].classList.contains('burger-menu__wrapper_active')
      ) {
        document.body.classList.remove('body_block-scroll');
      }
    }, 550);

    headerWrapper.classList.remove('header__wrapper_scroll');
    headerWrapper.classList.toggle('header__wrapper_visible');

    document.body.classList.add('body_block-scroll');

    burgerMenuLines.forEach((element) => {
      element.classList.toggle('burger-menu__wrapper_active');
    });
  }

  function scrollToSection(event) {
    if (!event.target.href) {
      return;
    }

    event.preventDefault();
    toggleMenu();

    setTimeout(() => {
      window.location.href = event.target.href;
    }, 550);
  }

  burgerMenu.addEventListener('click', toggleMenu);
  nav.addEventListener('click', scrollToSection);
}
