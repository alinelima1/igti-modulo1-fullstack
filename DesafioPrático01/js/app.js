let allUsers = [];
let filterUser = '';
let filteredUsers = [];
let statistics = [];

window.addEventListener('load', () => {
  doFetch();
});

async function doFetch() {
  const res = await fetch(
    'https://randomuser.me/api/?seed=javascript&results=100&nat=BR&noinfo'
  );
  const data = await res.json();

  allUsers = data.results.map((user) => {
    const { name, picture, dob, gender } = user;
    return {
      name: name.first + name.last,
      picture: picture.medium,
      age: dob.age,
      gender,
    };
  });
  render();
}

function render() {
  captureFilter();
}

function captureFilter() {
  const buttonSearch = document.querySelector('.btn');
  const inputFilter = document.querySelector('#input_text');

  inputFilter.addEventListener('input', (evt) => {
    filterUser = evt.target.value;
    if (filterUser.length > 0) {
      buttonSearch.removeAttribute('disabled');
    } else {
      buttonSearch.setAttribute('disabled', '');
    }
  });

  inputFilter.addEventListener('keyup', (evt) => {
    if (evt.keyCode === 13 && filterUser.length > 0) {
      searchUsersByFilter();
    }
  });

  buttonSearch.addEventListener('click', (evt) => {
    searchUsersByFilter();
  });
}

function searchUsersByFilter() {
  const filteredUsers = allUsers.filter((user) =>
    user.name.toLowerCase().includes(filterUser.toLowerCase())
  );

  let usersTitle = document.querySelector('#title-filtered-users');
  usersTitle.innerHTML = `${filteredUsers.length} usuário(s) encontrado(s)`;

  let statisticsTitle = document.querySelector('#statistics');
  statisticsTitle.innerHTML = `Estatísticas`;
  renderUsers(filteredUsers);
  renderStatistics(filteredUsers);
}

function renderUsers(filteredUsers) {
  let usersHTML = '<div>';
  filteredUsers.forEach((user) => {
    const { name, picture, age, gender } = user;
    const userHTML = `
    <div>
      <div class='user-data'>
        <img src='${picture}' alt='${name}'>
        <span>${name}, ${age} anos</span>
      </div>
    </div> 
    `;
    usersHTML += userHTML;
  });
  usersHTML += '</div>';
  tabUsers.innerHTML = usersHTML;
}

function renderStatistics(filteredUsers) {
  let masc = countMasc(filteredUsers);
  let fem = countFem(filteredUsers);
  let sum = sumAge(filteredUsers);
  let average = avgAge(sum, filteredUsers);

  const statisticsHTML = `
    <div>
      <div>
        Sexo masculino: <b>${masc}</b></br>
        Sexo feminino: <b>${fem}</b></br>
        Soma das idades: <b>${sum}</b></br>
        Média das idades: <b>${average}</b>
      </div>
    </div>
  `;
  tabStatistics.innerHTML = statisticsHTML;
  render();
}

function countMasc(users) {
  return users.filter((user) => user.gender === 'male').length;
}

function countFem(users) {
  return users.filter((user) => user.gender === 'female').length;
}

function sumAge(users) {
  return users.reduce((acc, curr) => {
    return acc + curr.age;
  }, 0);
}

function avgAge(sum, users) {
  return (sum / users.length).toFixed(2);
}
