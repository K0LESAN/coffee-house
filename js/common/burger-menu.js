const header = document.querySelector('.header'),
  burgerMenu = document.querySelector('#burger-menu'),
  headerWrapper = document.querySelector('.header__wrapper'),
  burgerMenuLines = document.querySelectorAll('.burger-menu__wrapper');

let isClicked = false;

function hideBurgerMenu() {
  if (window.innerWidth <= 768) {
    return;
  }

  burgerMenuLines.forEach((element) => {
    element.classList.remove('burger-menu__wrapper_active');
  });

  document.body.classList.remove('body_block-scroll');
  headerWrapper.classList.remove('header__wrapper_visible');
  headerWrapper.classList.remove('header__wrapper_scroll');
}

function toggleMenu() {
  if (isClicked) {
    return;
  }

  window.scrollTo(0, 0);

  if (!headerWrapper.classList.contains('header__wrapper_visible')) {
    headerWrapper.scrollTo(0, 0);
  }

  isClicked = true;

  setTimeout(() => {
    isClicked = false;

    headerWrapper.classList.add('header__wrapper_scroll');

    if (!headerWrapper.classList.contains('header__wrapper_visible')) {
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

function followingALink(event) {
  const element = event.target.closest('a'),
    delay = headerWrapper.classList.contains('header__wrapper_visible')
      ? 550
      : 0;

  event.preventDefault();

  if (element && headerWrapper.classList.contains('header__wrapper_visible')) {
    toggleMenu();
  }

  if (element.href.at(-1) === '#') {
    return;
  }

  setTimeout(() => {
    window.location.href = element.href;
  }, delay);
}

window.addEventListener('resize', hideBurgerMenu);
header.addEventListener('click', followingALink);
burgerMenu.addEventListener('click', toggleMenu);
