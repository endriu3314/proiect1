function dom(tag, text) {
  let r = document.createElement(tag);
  if (text) r.innerText = text;
  return r;
}

function append(parent, child) {
  parent.appendChild(child);
  return parent;
}

function generate_table(json) {
  //console.log(json);
  let table = dom('table');
  table.classList.add('table-auto');
  table.classList.add('w-full');
  table.classList.add('bg-white');
  console.log(Object.keys(json[0]));

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
}
