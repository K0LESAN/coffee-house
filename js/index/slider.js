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

  setTransition('0', 'transform 1s ease');

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

    setTransition('100%', `transform 5s ease`);
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

  if (['touchend', 'mouseout'].includes(event.type)) {
    setTransition('100%', `transform ${durationTransition}s ease`);
  }
}

function getStartClick(event) {
  startClickPosition = event.screenX ?? event.touches?.[0]?.screenX;
}

function scrollCoffee(event) {
  const endClickPosition = event.screenX ?? event.changedTouches?.[0]?.screenX,
    betweenDistance = startClickPosition - endClickPosition;

  if (Math.abs(betweenDistance) < 174) {
    return;
  }

  arrows[Number(startClickPosition > endClickPosition)].click();

  startClickPosition = 0;
}

sliderControls.addEventListener('transitioncancel', setDurationTransition, {
  passive: true,
});

favoriteCoffeeBlock.addEventListener('mouseover', stopTransition, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('mouseout', stopTransition, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchstart', stopTransition, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchend', stopTransition, {
  passive: true,
});

favoriteCoffeeBlock.addEventListener('mousedown', getStartClick, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('mouseup', scrollCoffee, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchstart', getStartClick, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchend', scrollCoffee, {
  passive: true,
});

slider.addEventListener('click', nextCoffee, { passive: true });
sliderControls.addEventListener('transitionend', nextCoffee, { passive: true });

control.style.setProperty('--animate', '100%');
