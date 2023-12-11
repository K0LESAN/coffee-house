import products from '../data/products.json' assert { type: 'json' };

const menuGrid = document.querySelector('.menu__grid'),
  modal = document.querySelector('.modal'),
  modalTitle = document.querySelector('#modal__title'),
  modalDescription = document.querySelector('#modal__description'),
  image = document.querySelector('#modal__image'),
  modalSizes = document.querySelector('#modal__sizes'),
  modalAdditives = document.querySelector('#modal__additives'),
  modalPrice = document.querySelector('#modal__price'),
  buttonClose = document.querySelector('#modal__close');

function openModal(event) {
  function setButtonData(localButton, dataProperty, text) {
    localButton.classList.remove('modal__sizes-and-additives-item_active');
    localButton.setAttribute('data-add-price', dataProperty);
    localButton.children[1].textContent = text;
  }

  const productName = event.target
    .closest('.menu__item')
    ?.getAttribute('data-product-name');

  if (!productName) {
    return;
  }

  document.body.style.overflow = 'hidden';

  const searchProduct = products.find(({ name }) => name === productName);

  if (!searchProduct) {
    return;
  }

  const { name, description, price, sizes, additives } = searchProduct,
    pathToImage = name.toLowerCase().replace(/\s/g, '-');

  modalTitle.textContent = name;
  modalDescription.textContent = description;
  image.src = `assets/images/menu/menu/${pathToImage}.jpg`;
  modalPrice.textContent = `$${price}`;

  for (let index = 0; index < 3; index++) {
    setButtonData(
      modalSizes.children[index],
      sizes[index]['add-price'],
      sizes[index].size
    );
    setButtonData(
      modalAdditives.children[index],
      additives[index]['add-price'],
      additives[index].name
    );
  }

  modalSizes.children[0].classList.add(
    'modal__sizes-and-additives-item_active'
  );

  modal.classList.add('modal_open');

  setTimeout(() => {
    modal.style.opacity = 1;
  }, 5);
}

function closeModal(event) {
  if (
    !event.target.closest('.modal__button') &&
    !event.target.classList.contains('modal')
  ) {
    return;
  }

  modal.style.opacity = 0;

  modal.addEventListener(
    'transitionend',
    () => {
      document.body.style.overflow = 'auto';
      modal.classList.remove('modal_open');
    },
    {
      once: true,
      passive: true,
    }
  );
}

function toggleSize(event) {
  const button = event.target.closest('.modal__sizes-and-additives-item');

  if (
    !button ||
    button.classList.contains('modal__sizes-and-additives-item_active')
  ) {
    return;
  }

  let prevPrice = 0;

  for (const element of modalSizes.children) {
    if (element.classList.contains('modal__sizes-and-additives-item_active')) {
      prevPrice = element.getAttribute('data-add-price');
    }

    element.classList.remove('modal__sizes-and-additives-item_active');
  }

  button.classList.add('modal__sizes-and-additives-item_active');

  const totalPrice = Number.parseFloat(modalPrice.textContent.slice(1)),
    addPrice = Number.parseFloat(button.getAttribute('data-add-price'));

  modalPrice.textContent = `$${(totalPrice + addPrice - prevPrice).toFixed(2)}`;
}

function addAdditives(event) {
  const button = event.target.closest('.modal__sizes-and-additives-item');

  if (!button) {
    return;
  }

  button.classList.toggle('modal__sizes-and-additives-item_active');

  const totalPrice = Number.parseFloat(modalPrice.textContent.slice(1)),
    addPrice = Number.parseFloat(button.getAttribute('data-add-price'));

  modalPrice.textContent = `$${(
    totalPrice +
    addPrice *
      (button.classList.contains('modal__sizes-and-additives-item_active') ||
        -1)
  ).toFixed(2)}`;
}

menuGrid.addEventListener('click', openModal, { passive: true });
modal.addEventListener('click', closeModal, { passive: true });
modalSizes.addEventListener('click', toggleSize, { passive: true });
modalAdditives.addEventListener('click', addAdditives, { passive: true });
buttonClose.addEventListener('click', closeModal, { passive: true });
