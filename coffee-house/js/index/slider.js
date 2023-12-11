const slider = document.querySelector('.slider'),
  sliderControls = document.querySelector('.slider-controls'),
  favoriteCoffeeBlock = document.querySelector(
    '.favorite-coffee-info__wrapper'
  ),
  arrows = document.querySelectorAll('.slider__button');

let control = document.querySelector('.slider-controls__item'),
  durationTransition = 5,
  startClickPosition = null,
  blockEvents = false;

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

  blockEvents = true;

  arrows.forEach((element) => {
    element.disabled = true;
  });

  setTransition('0', 'transform 1s linear');

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

    setTransition('100%', `transform 5s linear`);

    blockEvents = false;
  }, 1000);
}

function setDurationTransition(event) {
  if (blockEvents) {
    return;
  }

  durationTransition = Math.max(0, durationTransition - event.elapsedTime);
}

function stopTransition() {
  if (blockEvents) {
    return;
  }

  const xCoordinate = getComputedStyle(control, '::after')
    .transform.split(', ')
    .at(-2);

  setTransition(`${xCoordinate}px`, 'none');
}

function continueTransition() {
  if (blockEvents) {
    return;
  }

  setTransition('100%', `transform ${durationTransition}s linear`);
}

function getStartClick(event) {
  if (blockEvents) {
    return;
  }

  startClickPosition = event.screenX ?? event.touches?.[0]?.screenX;
}

function scrollCoffee(event) {
  if (blockEvents) {
    return;
  }

  const endClickPosition = event.screenX ?? event.changedTouches?.[0]?.screenX,
    betweenDistance = startClickPosition - endClickPosition;

  if (Math.abs(betweenDistance) < 174) {
    return;
  }

  const clickRightArrow = Number(startClickPosition > endClickPosition);

  startClickPosition = 0;

  arrows[clickRightArrow].click();
}

favoriteCoffeeBlock.addEventListener('mouseover', stopTransition, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchstart', stopTransition, {
  passive: true,
});

favoriteCoffeeBlock.addEventListener('mouseout', continueTransition, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchend', continueTransition, {
  passive: true,
});

favoriteCoffeeBlock.addEventListener('mousedown', getStartClick, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchstart', getStartClick, {
  passive: true,
});

favoriteCoffeeBlock.addEventListener('mouseup', scrollCoffee, {
  passive: true,
});
favoriteCoffeeBlock.addEventListener('touchend', scrollCoffee, {
  passive: true,
});

slider.addEventListener('click', nextCoffee, { passive: true });

sliderControls.addEventListener('transitionend', nextCoffee, { passive: true });
sliderControls.addEventListener('transitioncancel', setDurationTransition, {
  passive: true,
});

control.style.setProperty('--animate', '100%');
