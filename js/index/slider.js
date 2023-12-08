const slider = document.querySelector('.slider'),
  [leftArrow, rightArrow] = document.querySelectorAll('.slider__button'),
  sliderControls = document.querySelector('.slider-controls'),
  favoriteCoffeeBlock = document.querySelector(
    '.favorite-coffee-info__wrapper'
  );

let control = document.querySelector('.slider-controls__item');

control.style.setProperty('--animate', '100%');

function chandeDirection(line, coordinate, direction) {
  return direction === 'left'
    ? [
        line.previousElementSibling ? coordinate + 100 : -200,
        line.previousElementSibling || sliderControls.lastElementChild,
      ]
    : [
        line.nextElementSibling ? coordinate - 100 : 0,
        line.nextElementSibling || sliderControls.firstElementChild,
      ];
}

function nextCoffee(event) {
  if (event.type === 'transitionend' && event.target !== control) {
    return;
  }

  let arrow = event.target;

  if (event.type === 'click') {
    arrow = arrow.closest('.slider__button') || arrow;
  }

  control.style.setProperty('--duration', '0.5s');
  control.style.setProperty('--animate', '0');

  let xCoordinate = +favoriteCoffeeBlock.style.transform.match(/-\d+/g);

  [xCoordinate, control] = chandeDirection(
    control,
    xCoordinate,
    arrow.getAttribute('data-direction')
  );

  favoriteCoffeeBlock.style.transform = `translateX(${xCoordinate}%)`;

  setTimeout(() => {
    control.style.setProperty('--duration', '5s');
    control.style.setProperty('--animate', '100%');
  }, 500);
}

leftArrow.addEventListener('click', nextCoffee);
rightArrow.addEventListener('click', nextCoffee);
sliderControls.addEventListener('transitionend', nextCoffee);
