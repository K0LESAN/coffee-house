import products from '../data/products.json' assert { type: 'json' };

const menu = document.querySelector('.menu__grid'),
  buttons = document.querySelector('.menu__buttons'),
  buttonUpdate = document.querySelector('.menu__update');

let selectButton = buttons.children[0];

function appendProductItem(data) {
  const productElement = document.createElement('div'),
    pathToImage = data.name.toLowerCase().replace(/\s/g, '-');

  productElement.classList.add('menu__item');

  productElement.setAttribute('data-product-name', data.name);

  productElement.innerHTML = `
    <div class="menu__inner">
      <img src="assets/images/menu/menu/${pathToImage}.jpg" alt="${data.name}" class="menu__image">
    </div>
    <div class="menu__info">
      <div class="menu__text">
        <h2 class="menu__title">${data.name}</h2>
        <p class="menu__description">
          ${data.description}
        </p>
      </div>
      <p class="menu__price">$${data.price}</p>
    </div>
  `;

  menu.append(productElement);
}

function toggleCategory(event) {
  const element = event.target.closest('.menu__button');

  if (
    !element ||
    (element.classList.contains('menu__button_select') && event.isTrusted)
  ) {
    return;
  }

  menu.innerHTML = '';

  let count = 0;

  while (count < buttons.childElementCount) {
    buttons.children[count].classList.remove('menu__button_select');
    count++;
  }

  selectButton = element;

  selectButton.classList.add('menu__button_select');

  const data = products.filter(
      (product) =>
        product.category === selectButton.getAttribute('data-category')
    ),
    length = window.innerWidth > 1089 ? data.length : 4;

  for (let index = 0; index < length; index++) {
    appendProductItem(data[index]);
  }

  if (data.length <= 4) {
    buttonUpdate.remove();
  } else {
    menu.after(buttonUpdate);
  }
}

function loadProducts(event) {
  const button = event.target.closest('.menu__update'),
    data = products.filter(
      (product) =>
        product.category === selectButton.getAttribute('data-category')
    ),
    length = data.length;

  button.remove();

  for (let index = menu.childElementCount; index < length; index++) {
    appendProductItem(data[index]);
  }
}

function correctMenu(event) {
  if (event.target.innerWidth <= 1089) {
    if (menu.childElementCount > 4) {
      menu.after(buttonUpdate);
    }

    while (menu.childElementCount > 4) {
      menu.removeChild(menu.lastElementChild);
    }
  } else {
    menu.innerHTML = '';
    selectButton.click();
  }
}

buttons.addEventListener('click', toggleCategory, {
  passive: true,
});

selectButton.click();

buttonUpdate.addEventListener('click', loadProducts, {
  passive: true,
});
window.addEventListener('resize', correctMenu, {
  passive: true,
});
