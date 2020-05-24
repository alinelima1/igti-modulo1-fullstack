window.addEventListener('load', () => {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
});

let globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
let inputName = null;
let isEditing = false;
let currentIndex = null;

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  let form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function handleTyping(event) {
    if (event.key === 'Enter' && event.target.value.trim() !== '') {
      if (isEditing) {
        globalNames[currentIndex] = event.target.value;
      } else {
        console.log('Insere ' + event.target.value);
        globalNames.push(event.target.value);
      }
      render();
      clearInput();
      isEditing = false;
    }
  }
  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName(event) {
      if (event.clientX !== 0) {
        // método mais elegante porém é mutável
        // globalNames.splice(index, 1);
        // método menos elegante que o splice, porém é imutável
        globalNames = globalNames.filter((_, i) => i != index);
        // O underscore significa que o primeiro parâmetro está sendo ignorado, ou seja, não será utilizado
        render();
      }
    }
    let button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    let span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  let divNames = document.querySelector('#names');
  divNames.innerHTML = '';

  let ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    let currentName = globalNames[i];

    let li = document.createElement('li');
    let button = createDeleteButton(i);
    let span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);

    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
