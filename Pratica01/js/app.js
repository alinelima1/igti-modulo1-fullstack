window.addEventListener('load', start);
window.addEventListener('change', start);

function start() {
  const r = document.querySelector('#rangeR');
  const g = document.querySelector('#rangeG');
  const b = document.querySelector('#rangeB');
  updateInput(r, g, b);
}

const updateInput = (r, g, b) => {
  let inputR = document.querySelector('#inputR');
  let inputG = document.querySelector('#inputG');
  let inputB = document.querySelector('#inputB');
  inputR.value = r.value;
  inputG.value = g.value;
  inputB.value = b.value;
  changeColor(inputR.value, inputG.value, inputB.value);
};

const changeColor = (r, g, b) => {
  console.log('Entrou aqui');
  let color = document.querySelector('#result');
  color.style.backgroundColor = `rgb(${r},${g},${b})`;
};
