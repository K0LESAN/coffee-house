const slider = document.querySelector('.slider'),
  sliderControls = document.querySelector('.slider-controls'),
  favoriteCoffeeBlock = document.querySelector(
    '.favorite-coffee-info__wrapper'
  ),
  arrows = document.querySelectorAll('.slider__button');

let control = document.querySelector('.slider-controls__item'),
  durationTransition = 5,
  startClickPosition = null;

function setTransition(translate, transition) {
  control.style.setProperty('--duration', transition);
  control.style.setProperty('--animate', translate);
}

function nextCoffee(event) {
  const arrow = event.target.closest('.slider__button');

  if (
    (event.type === 'click' && !arrow) ||
    (event.type === 'transitionend' && event.target !== control)
  ) {
    return;
  }

  arrows.forEach((element) => {
    element.disabled = true;
  });

  setTransition('0', 'transform ease 1s');

  if (arrow?.getAttribute('data-direction') === 'left') {
    control = control.previousElementSibling || sliderControls.lastElementChild;
  } else {
    control = control.nextElementSibling || sliderControls.firstElementChild;
  }

  favoriteCoffeeBlock.style.transform = `translateX(${
    -100 * control.getAttribute('data-position')
  }%)`;

  durationTransition = 5;

  setTimeout(() => {
    arrows.forEach((element) => {
      element.disabled = false;
    });

    setTransition('100%', `transform ease 5s`);
  }, 1000);
}

function setDurationTransition(event) {
  durationTransition = Math.max(0, durationTransition - event.elapsedTime);
}

function stopTransition(event) {
  const xCoordinate = getComputedStyle(control, '::after')
    .transform.split(', ')
    .at(-2);

  if (['touchstart', 'mouseover'].includes(event.type)) {
    setTransition(`${xCoordinate}px`, 'none');
  }

  if (['touchcancel', 'mouseout'].includes(event.type)) {
    setTransition('100%', `transform ease ${durationTransition}s`);
  }
}

function getStartClick(event) {
  startClickPosition = event.screenX;
}

function scrollCoffee(event) {
  const betweenDistance = startClickPosition - event.screenX;

  if (Math.abs(betweenDistance) < 100) {
    return;
  }

  arrows[Number(betweenDistance >= 0)].click();

  startClickPosition = 0;
}

control.style.setProperty('--animate', '100%');

sliderControls.addEventListener('transitioncancel', setDurationTransition);

favoriteCoffeeBlock.addEventListener('touchstart', stopTransition);
favoriteCoffeeBlock.addEventListener('mouseover', stopTransition);
favoriteCoffeeBlock.addEventListener('touchcancel', stopTransition);
favoriteCoffeeBlock.addEventListener('mouseout', stopTransition);

favoriteCoffeeBlock.addEventListener('mousedown', getStartClick);
favoriteCoffeeBlock.addEventListener('mouseup', scrollCoffee);

slider.addEventListener('click', nextCoffee);
sliderControls.addEventListener('transitionend', nextCoffee);
