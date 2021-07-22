
hDownBtn.onclick = function () {
  hDownBtn.classList.add('active');
  hUpBtn.classList.remove('active');
  answer[0] = -1;
};

hUpBtn.onclick = function () {
  hUpBtn.classList.add('active');
  hDownBtn.classList.remove('active');
  answer[0] = 1;
};

sDownBtn.onclick = function () {
  sDownBtn.classList.add('active');
  sUpBtn.classList.remove('active');
  answer[1] = -1;
};

sUpBtn.onclick = function () {
  sUpBtn.classList.add('active');
  sDownBtn.classList.remove('active');
  answer[1] = 1;
};

lDownBtn.onclick = function () {
  lDownBtn.classList.add('active');
  lUpBtn.classList.remove('active');
  answer[2] = -1;
};

lUpBtn.onclick = function () {
  lUpBtn.classList.add('active');
  lDownBtn.classList.remove('active');
  answer[2] = 1;
};

confirmBtn.onclick = function () {
  if (answer[0] && answer[1] && answer[2]) {
    showSliders();
    if (testColorDirection[0] > 0) {
      if (answer[0] > 0) {
        hUpBtn.classList.add('correct');
      } else {
        hDownBtn.classList.add('correct');
        hUpBtn.classList.add('wrong');
      }
    } else if (testColorDirection[0] < 0) {
      if (answer[0] > 0) {
        hUpBtn.classList.add('wrong');
        hDownBtn.classList.add('correct');
      } else {
        hDownBtn.classList.add('correct');
      }
    }

    if (testColorDirection[1] > 0) {
      if (answer[1] > 0) {
        sUpBtn.classList.add('correct');
      } else {
        sDownBtn.classList.add('correct');
        sUpBtn.classList.add('wrong');
      }
    } else if (testColorDirection[1] < 0) {
      if (answer[1] > 0) {
        sUpBtn.classList.add('wrong');
        sDownBtn.classList.add('correct');
      } else {
        sDownBtn.classList.add('correct');
      }
    }

    if (testColorDirection[2] > 0) {
      if (answer[2] > 0) {
        lUpBtn.classList.add('correct');
      } else {
        lDownBtn.classList.add('correct');
        lUpBtn.classList.add('wrong');
      }
    } else if (testColorDirection[2] < 0) {
      if (answer[2] > 0) {
        lUpBtn.classList.add('wrong');
        lDownBtn.classList.add('correct');
      } else {
        lDownBtn.classList.add('correct');
      }
    }

    hChangeEl.textContent = `${Math.round(testColorDirection[0] * 100)}`;
    sChangeEl.textContent = `${Math.round(testColorDirection[1] * 100)}`;
    lChangeEl.textContent = `${Math.round(testColorDirection[2] * 100)}`;

    confirmBtn.classList.add('disable');
    nextBtn.classList.remove('disable');
  }
};

nextBtn.onclick = function() {
  if (nextBtn.classList.contains('disable')) return;
  reset();
};
