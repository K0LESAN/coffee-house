import products from '../data/products.json' assert { type: 'json' };

const menu = document.querySelector('.menu__grid'),
  buttons = document.querySelector('.menu__buttons');

function toggleCategory(event) {
  const element = event.target.closest('.menu__button');

  if (!element || element.classList.contains('menu__button_select')) {
    return;
  }

  menu.innerHTML = '';

  let count = 0;

  while (count < buttons.childElementCount) {
    buttons.children[count].classList.remove('menu__button_select');
    count++;
  }

  element.classList.add('menu__button_select');

  const selectCategory = element.getAttribute('data-category'),
    data = products.filter((product) => product.category === selectCategory);

  data.forEach((product) => {
    const productElement = document.createElement('div'),
      pathToImage = product.name.toLowerCase().replace(/\s/g, '-');

    productElement.classList.add('menu__item');

    productElement.innerHTML = `
		<div class="menu__inner">
		<img src="assets/images/menu/menu/${pathToImage}.jpg" alt="${product.name}" class="menu__image">
		</div>
		<div class="menu__info">
			<div class="menu__text">
				<h2 class="menu__title">${product.name}</h2>
				<p class="menu__description">
					${product.description}
				</p>
			</div>
			<p class="menu__price">$${product.price}</p>
		</div>
		`;

    menu.append(productElement);
  });
}

buttons.addEventListener('click', toggleCategory);
