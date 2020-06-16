import { dom, addClasses } from './utils.js';
import { append } from './utils.js';
import { loopSelected } from './utils.js';

window.onload = () => {
  initApp();
};

let mainContainer;

const initApp = () => {
  defineEvents();

  mainContainer = document.querySelector('#container');

  createComponents();
};

const createComponents = () => {
  //Loader
  //Verificari
};

const defineEvents = () => {
  let viewPostTableButton = document.querySelector('#view-post-table');
  let createPostButton = document.querySelector('#create-post');

  let viewCategoriesTableButton = document.querySelector(
    '#view-categories-table'
  );
  let createCategoriesButton = document.querySelector('#create-categories');

  const viewPostTableHandler = (evt) => {
    let contComp = createPostTableComps();
    append(mainContainer, contComp);
  };

  const createPostHandler = (evt) => {
    let contComp = createPostComps();
    append(mainContainer, contComp);

    const select = document.querySelector('#category_id');
    fetch('http://localhost/proiect1/assets/php/api/categories/get_all.php', {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    })
      .then((response) => response.json())
      .then(function (data) {
        let title = data.body;
        return title.map(function (categ) {
          let option = document.createElement('option');
          option.value = categ.id;
          option.innerHTML = `${categ.name}`;
          select.appendChild(option);
        });
      })
      .catch(function (error) {
        console.log(error);
      });

    let btn = document.querySelector('#submit');
    btn.addEventListener('click', function (evt) {
      createPost();
      document.querySelector('#form-create-post').reset();
    });
  };

  const viewCategoriesTableHandler = (evt) => {
    let contComp = createCategoriesTableComps();
    append(mainContainer, contComp);
  };

  const createCategoriesHandler = (evt) => {
    let contComp = createCategoriesComps();
    append(mainContainer, contComp);
  };

  viewPostTableButton.addEventListener('click', viewPostTableHandler);
  createPostButton.addEventListener('click', createPostHandler);

  viewCategoriesTableButton.addEventListener(
    'click',
    viewCategoriesTableHandler
  );
  createCategoriesButton.addEventListener('click', createCategoriesHandler);
};

const createPostTableComps = () => {
  mainContainer.innerHTML = '';
  let cont = dom('div');

  let table = dom('table');
  addClasses(table, 'table-auto w-full bg-white');
  //console.log(Object.keys(json[0]));

  //----- TABLE HEAD -----
  let tr = dom('tr');
  Object.keys(json[0]).forEach(function (cheie) {
    console.log(cheie);
    let th = dom('th', cheie);
    th.classList.add('border');
    th.classList.add('px-4');
    th.classList.add('py-2');
    append(tr, th);
  });
  let th = dom('th', 'actions');
  th.classList.add('border');
  th.classList.add('px-4');
  th.classList.add('py-2');
  append(tr, th);
  append(table, tr);

  //----- TABLE BODY -----
  json.forEach(function (element) {
    //console.log(element);
    let tr = dom('tr');
    Object.keys(element).forEach(function (cheie, cheiedx, array) {
      if (element[cheie] != '') {
        let td = dom('td', element[cheie]);
        td.classList.add('border');
        td.classList.add('px-4');
        td.classList.add('py-2');
        append(tr, td);
      } else {
        let td = dom('td', '');
        td.classList.add('border');
        td.classList.add('px-4');
        td.classList.add('py-2');
        append(tr, td);
      }

      //DELETE BUTTON
      if (cheiedx == array.length - 1) {
        let td = dom('td', 'test');
        td.classList.add('border');
        td.classList.add('px-4');
        td.classList.add('py-2');
        append(tr, td);
      }
    });
    append(table, tr);
  });
  let container = document.querySelector('#content');
  append(container, table);

  return cont;
};

const createPostComps = () => {
  mainContainer.innerHTML = '';

  let cont = dom('div');
  addClasses(cont, 'flex items-center justify-center h-screen');

  let formContainer = dom('div');
  addClasses(
    formContainer,
    'bg-indigo-800 text-white font-bold rounded-lg border shadow-lg p-5 w-1/2'
  );

  let form = dom('form');
  addClasses(form, 'shadow-md bg-white rounded px-8 pt-6 pb-8');
  form.id = 'form-create-post';

  //----- TITLE -----
  let titleContainerInput = dom('div');
  addClasses(titleContainerInput, 'mb-4');

  let labelTitle = dom('label');
  labelTitle.innerHTML = 'Title';
  addClasses(labelTitle, 'block text-gray-700 text-sm font-bold mb-2');

  let inputTitle = dom('input');
  addClasses(
    inputTitle,
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  );
  inputTitle.id = 'title';
  inputTitle.name = 'title';
  inputTitle.type = 'text';
  inputTitle.placeholder = 'Title';

  append(titleContainerInput, labelTitle);
  append(titleContainerInput, inputTitle);

  append(form, titleContainerInput);

  //----- CATEGORY -----
  let categoryContainerInput = dom('div');
  addClasses(categoryContainerInput, 'mb-4');
  let labelCategory = dom('label');
  labelCategory.innerHTML = 'Category';
  addClasses(labelCategory, 'block text-gray-700 text-sm font-bold mb-2');

  let selectCategory = dom('select');
  addClasses(
    selectCategory,
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline'
  );
  selectCategory.name = 'category_id';
  selectCategory.id = 'category_id';
  selectCategory.multiple = 'multiple';

  append(categoryContainerInput, labelCategory);
  append(categoryContainerInput, selectCategory);

  append(form, categoryContainerInput);

  //----- BODY -----
  let bodyContainerInput = dom('div');
  addClasses(bodyContainerInput, 'mb-6');
  let labelBody = dom('label');
  labelBody.innerHTML = 'Body';
  addClasses(labelBody, 'block text-gray-700 text-sm font-bold mb-2');

  let textareaBody = dom('textarea');
  addClasses(
    textareaBody,
    'shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
  );
  textareaBody.id = 'body';
  textareaBody.name = 'body';
  textareaBody.placeholder = 'Body';

  append(bodyContainerInput, labelBody);
  append(bodyContainerInput, textareaBody);

  append(form, bodyContainerInput);

  //----- SUBMIT -----
  let submitContainer = dom('div');
  addClasses(submitContainer, 'flex items-center justify-between');

  let submitButton = dom('button');
  addClasses(
    submitButton,
    'bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
  );
  submitButton.innerHTML = 'Create';
  submitButton.type = 'button';
  submitButton.id = 'submit';

  append(submitContainer, submitButton);

  append(form, submitContainer);

  append(formContainer, form);

  append(cont, formContainer);

  return cont;
};

const createCategoriesTableComps = () => {
  mainContainer.innerHTML = '';

  let cont = dom('div');
  cont.style.background = 'green';
  cont.style.width = '100%';
  cont.style.height = '400px';

  return cont;
};

const createCategoriesComps = () => {
  mainContainer.innerHTML = '';

  let cont = dom('div');
  cont.style.background = 'yellow';
  cont.style.width = '100%';
  cont.style.height = '400px';

  return cont;
};

const createPost = () => {
  const url = 'http://localhost/proiect1/assets/php/api/posts/create.php';

  var formElement = document.getElementsByTagName('form')[0],
    inputElements = formElement.getElementsByTagName('input'),
    inputElements2 = formElement.getElementsByTagName('textarea'),
    jsonObject = {};

  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    jsonObject[inputElement.name] = inputElement.value;
  }
  for (var i = 0; i < inputElements2.length; i++) {
    var inputElement = inputElements2[i];
    jsonObject[inputElement.name] = inputElement.value;
  }

  jsonObject['categories'] = loopSelected('category_id');
  let data = JSON.stringify(jsonObject);
  console.log(data);

  var request = new Request(url, {
    method: 'POST',
    body: data,
    headers: new Headers(),
  });

  //TODO:handle responses api
  fetch(request).then(function () {});
};
