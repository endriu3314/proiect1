//TODO: update is not working well
import {
  dom,
  append,
  addClasses,
  removeClasses,
  loopSelected,
} from './utils.js';

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
        if (data.success === true) {
          let title = data.body;
          return title.map(function (categ) {
            let option = document.createElement('option');
            option.value = categ.id;
            option.innerHTML = `${categ.name}`;
            append(select, option);
          });
        }
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
  addClasses(
    cont,
    'container mx-auto bg-indigo-800 font-bold rounded-lg border shadow-lg p-5 w-11/12 m-5'
  );

  let table = dom('table');
  addClasses(table, 'table-auto w-full bg-white');

  fetch('http://localhost/proiect1/assets/php/api/posts/get_all.php', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => response.json())
    .then(function (json) {
      if (json.success === true) {
        //----- TABLE HEAD -----
        let tr = dom('tr');

        Object.keys(json.body[0]).forEach(function (cheie) {
          //console.log(cheie);

          let th = dom('th', cheie);
          addClasses(th, 'border px-4 py-2');

          append(tr, th);
        });

        let th = dom('th', 'actions');
        addClasses(th, 'border px-4 py-2');

        append(tr, th);
        append(table, tr);

        //----- TABLE BODY -----
        json.body.forEach(function (element) {
          let tr = dom('tr');

          Object.keys(element).forEach(function (cheie, cheiedx, array) {
            if (element[cheie] != '') {
              let td = dom('td', element[cheie]);
              addClasses(td, 'border px-4 py-2');

              append(tr, td);
            } else {
              let td = dom('td', '');
              addClasses(td, 'border px-4 py-2');

              append(tr, td);
            }

            if (cheiedx == array.length - 1) {
              //----- Edit Button -----/
              let td = dom('td');
              addClasses(td, 'border px-4 py-2');

              let buttonEdit = dom('button');
              addClasses(
                buttonEdit,
                'bg-indigo-800 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded mr-4'
              );
              buttonEdit.onclick = () => {
                editPostCallback(element['id']);
              };
              buttonEdit.innerHTML = 'edit';

              append(td, buttonEdit);

              //----- Delete Button -----/
              let buttonDelete = dom('button');
              addClasses(
                buttonDelete,
                'bg-red-800 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
              );
              buttonDelete.onclick = () => {
                deletePostCallback(element['id']);
              };
              buttonDelete.innerHTML = 'delete';

              append(td, buttonDelete);

              append(tr, td);
            }
          });
          append(table, tr);
        });
      }
    })
    .catch((error) => {
      console.log(error);
    });

  append(cont, table);

  return cont;
};

const createPostComps = () => {
  mainContainer.innerHTML = '';

  let cont = dom('div');
  addClasses(
    cont,
    'container mx-auto bg-indigo-800 font-bold rounded-lg border shadow-lg p-5 w-11/12 m-5 flex items-center justify-center'
  );

  let formContainer = dom('div');
  addClasses(formContainer, 'w-full');

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
  //console.log(data);

  var request = new Request(url, {
    method: 'POST',
    body: data,
    headers: new Headers(),
  });

  //TODO:handle responses api
  fetch(request).then(function () {});
};

const updatePost = (id) => {
  const url = 'http://localhost/proiect1/assets/php/api/posts/update.php';

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
  jsonObject['id'] = id;
  jsonObject['categories'] = loopSelected('category_id');
  let data = JSON.stringify(jsonObject);
  //console.log(data);

  var request = new Request(url, {
    method: 'POST',
    body: data,
    headers: new Headers(),
  });

  //TODO:handle responses api
  fetch(request).then(function () {});

  let contComp = createPostTableComps();
  append(mainContainer, contComp);
};

const deletePost = (id) => {
  const url = 'http://localhost/proiect1/assets/php/api/posts/delete.php';

  // prettier-ignore
  let jsonObject = {
    "id": id,
  };
  let data = JSON.stringify(jsonObject);

  var request = new Request(url, {
    method: 'DELETE',
    body: data,
    heards: new Headers(),
  });

  //TODO:handle responses api
  fetch(request).then(function () {});

  let contComp = createPostTableComps();
  append(mainContainer, contComp);
};

const editPostCallback = (id) => {
  let modal = dom('div');
  addClasses(modal, 'popup w-1/2 bg-white rounded-lg shadow-lg');
  addClasses(document.querySelector('.container'), 'is-blurred');

  let cont = dom('div');
  addClasses(
    cont,
    'container mx-auto bg-indigo-800 font-bold rounded-lg border shadow-lg p-5 w-11/12 m-5 flex items-center justify-center'
  );

  let formContainer = dom('div');
  addClasses(formContainer, 'w-full');

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
  submitButton.innerHTML = 'Update';
  submitButton.type = 'button';
  submitButton.id = 'submit';

  //----- FETCH CATEGORIES -----/
  fetch('http://localhost/proiect1/assets/php/api/categories/get_all.php', {
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  })
    .then((response) => response.json())
    .then(function (data) {
      if (data.success === true) {
        let title = data.body;
        return title.map(function (categ) {
          let option = document.createElement('option');
          option.value = categ.id;
          option.innerHTML = `${categ.name}`;
          append(document.querySelector('#category_id'), option);
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  //----- FETCH VALUES -----/
  // prettier-ignore
  let data = {
    'id': id,
  };

  fetch('http://localhost/proiect1/assets/php/api/posts/get_one.php', {
    method: 'post',
    mode: 'cors',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(data),
  })
    .then((response) => response.json())
    .then(function (data) {
      if (data.success === true) {
        let post = data.body;

        let inputTitle = document.querySelector('#title');
        let inputBody = document.querySelector('#body');

        inputTitle.value = post[0].title;
        inputBody.value = post[0].body;

        let select = document.querySelector('#category_id');
        //console.log(select);
        post[0].categories.forEach(function (categorie) {
          //console.log(categorie);
          let options = document
            .querySelector('#category_id')
            .querySelectorAll('option');
          options.forEach(function (option) {
            if (categorie == option.value) {
              for (let i = 0; i < select.length; i++) {
                if (select[i].value == option.value) {
                  select[i].selected = true;
                }
              }
            }
          });
        });
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  append(submitContainer, submitButton);

  append(form, submitContainer);

  append(formContainer, form);

  append(cont, formContainer);

  append(modal, cont);

  append(mainContainer, modal);

  let btn = document.querySelector('#submit');
  btn.addEventListener('click', function (evt) {
    updatePost(id);
  });
};

const deletePostCallback = (id) => {
  let modal = dom('div');
  addClasses(modal, 'popup w-1/2 bg-white rounded-lg shadow-lg');
  addClasses(document.querySelector('.container'), 'is-blurred');

  let cont = dom('div');
  addClasses(
    cont,
    'container mx-auto bg-indigo-800 font-bold rounded-lg border shadow-lg p-5 w-11/12 m-5 flex items-center justify-center'
  );

  let verificare = dom('div');
  addClasses(verificare, 'w-full shadow-md bg-white rounded px-8 pt-6 pb-8');

  let title = dom('h1', 'Are you sure you want to delete?');
  addClasses(title, 'text-2xl text-gray-700 mb-4');

  let yesButton = dom('button');
  addClasses(
    yesButton,
    'bg-indigo-800 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mr-4'
  );
  yesButton.innerHTML = 'Yes';
  yesButton.id = 'yes';

  let closeButton = dom('button');
  addClasses(
    closeButton,
    'bg-gray-600 hover:bg-gray-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
  );
  closeButton.innerHTML = 'Close';
  closeButton.id = 'close';

  append(verificare, title);

  append(verificare, yesButton);
  append(verificare, closeButton);
  append(cont, verificare);

  append(modal, cont);

  append(mainContainer, modal);

  let btn = document.querySelector('#yes');
  btn.addEventListener('click', function (evt) {
    //console.log('delete');
    deletePost(id);
  });
};
