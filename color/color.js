let diffculty = 2;
const levels = [[0.25, 0.1], [0.15, 0.1], [0.02, 0.1]];

const refColorEl = document.getElementById('color-1');
const testColorEl = document.getElementById('color-2');
const sliderEls = Array.from(document.querySelectorAll('.sliders'));

const hDownBtn = document.getElementById('h-down');
const hUpBtn = document.getElementById('h-up');
const sDownBtn = document.getElementById('s-down');
const sUpBtn = document.getElementById('s-up');
const lDownBtn = document.getElementById('l-down');
const lUpBtn = document.getElementById('l-up');

const hChangeEl = document.getElementById('h-change');
const sChangeEl = document.getElementById('s-change');
const lChangeEl = document.getElementById('l-change');

const confirmBtn = document.getElementById('confirm');
const nextBtn = document.getElementById('next');
const diffcultySwitch = document.getElementById('diffculty');

let answer = [0, 0, 0];


const refColorSliders = [
  document.querySelector('.ref-color .h-slider'),
  document.querySelector('.ref-color .s-slider'),
  document.querySelector('.ref-color .l-slider'),
];

const testColorSliders = [
  document.querySelector('.test-color .h-slider'),
  document.querySelector('.test-color .s-slider'),
  document.querySelector('.test-color .l-slider'),
];

const refColorPointers = [
  document.querySelector('.ref-color .h-slider .pointer'),
  document.querySelector('.ref-color .s-slider .pointer'),
  document.querySelector('.ref-color .l-slider .pointer'),
];

const testColorPointers = [
  document.querySelector('.test-color .h-slider .pointer'),
  document.querySelector('.test-color .s-slider .pointer'),
  document.querySelector('.test-color .l-slider .pointer'),
];

let refColorArray;
let testColorArray;

let testColorDirection;

/**
 * b > a
 * @param {number} a 
 * @param {number} b 
 * @returns {number} random float between a and b
 */
function randomRange(a, b) {
  return Math.random() * (b - a) + a;
}

/**
 * b > a > 0
 * @param {number} a 
 * @param {number} b 
 * @returns {number} random float between -b to -a or between a and b
 */
function randomRange2(a, b) {
  const n = Math.random() * (b - a) + a;
  const sign = Math.random() > 0.5 ? 1 : -1;
  return n * sign;
}

function arrayToCode(arr) {
  return '#' + arr.map(a => a.toString(16)).map(hex => hex.length == 1 ? "0" + hex : hex).join('');
}

function updateRandomRefColor() {
  const h = randomRange(0, 1);
  const s = randomRange(0.1, 0.9);
  const l = randomRange(0.2, 0.9);
  refColorArray = [h, s, l];
}

/**
 * @param   {number}  h       
 * @param   {number}  s       
 * @param   {number}  l       
 */
function updateTestColor() {
  testColorArray = [0, 0, 0];
  testColorDirection = [0, 0, 0];
  const range = levels[diffculty];
  testColorDirection[0] = randomRange(range[0]/2, range[1]/2);
  testColorDirection[1] = randomRange(range[0], range[1]);
  testColorDirection[2] = randomRange(range[0], range[1]);

  testColorArray[0] = refColorArray[0] + testColorDirection[0];
  if (testColorArray[0] > 1) {
    testColorArray[0] -= 1;
  } else if (testColorArray[0] < 0) {
    testColorArray[0] += 1;
  }

  for (let i = 1; i < 3; ++i) {
    testColorArray[i] = refColorArray[i] + testColorDirection[i];
    if (testColorArray[i] > 1) {
      testColorArray[i] = 1;
      testColorDirection[i] = 1 - refColorArray[i];
    } else if (testColorArray[i] < 0) {
      testColorArray[i] = 0;
      testColorDirection[i] = refColorArray[i];
    }
  }
}

function updateSlider() {
  for (let i = 0; i < 3; ++i) {
    refColorPointers[i].style.left = `${refColorArray[i] * 100}%`;
    testColorPointers[i].style.left = `${testColorArray[i] * 100}%`;
  }
  const refS0 = arrayToCode(hsvToRgb(refColorArray[0], 0, refColorArray[2]));
  const refS1 = arrayToCode(hsvToRgb(refColorArray[0], 1, refColorArray[2]));
  const testS0 = arrayToCode(hsvToRgb(testColorArray[0], 0, testColorArray[2]));
  const testS1 = arrayToCode(hsvToRgb(testColorArray[0], 1, testColorArray[2]));
  const refL1 = arrayToCode(hsvToRgb(refColorArray[0], refColorArray[1], .9));
  const testL1 = arrayToCode(hsvToRgb(testColorArray[0], testColorArray[2], .9));

  refColorSliders[1].style.background = `linear-gradient(90deg, ${refS0}, ${refS1})`;
  testColorSliders[1].style.background = `linear-gradient(90deg, ${testS0}, ${testS1})`;
  refColorSliders[2].style.background = `linear-gradient(90deg, #000, ${refL1})`;
  testColorSliders[2].style.background = `linear-gradient(90deg, #000, ${testL1})`;
}

function updateElement() {
  updateRandomRefColor();
  updateTestColor();
  updateSlider();
  refColorEl.style.backgroundColor = arrayToCode(hsvToRgb(...refColorArray));
  testColorEl.style.backgroundColor = arrayToCode(hsvToRgb(...testColorArray));
}

function showSliders() {
  sliderEls.forEach(e => {
    e.querySelector('.h-slider .pointer').style.opacity = '1';
    e.querySelector('.s-slider').style.opacity = '1';
    e.querySelector('.l-slider').style.opacity = '1';
  });
}

function hideSliders() {
  sliderEls.forEach(e => {
    e.querySelector('.h-slider .pointer').style.opacity = '0';
    e.querySelector('.s-slider').style.opacity = '0';
    e.querySelector('.l-slider').style.opacity = '0';
  });
}

function reset() {
  answer = [0, 0, 0];
  confirmBtn.classList.remove('disable');
  nextBtn.classList.add('disable');
  hDownBtn.classList.remove('active', 'correct', 'wrong');
  hUpBtn.classList.remove('active', 'correct', 'wrong');
  sDownBtn.classList.remove('active', 'correct', 'wrong');
  sUpBtn.classList.remove('active', 'correct', 'wrong');
  lDownBtn.classList.remove('active', 'correct', 'wrong');
  lUpBtn.classList.remove('active', 'correct', 'wrong');
  hChangeEl.textContent = '';
  sChangeEl.textContent = '';
  lChangeEl.textContent = '';
  hideSliders();
  updateElement();
}

(() => {
  reset();
})();
