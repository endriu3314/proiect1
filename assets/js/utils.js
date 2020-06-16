export function dom(tag, text) {
  let r = document.createElement(tag);
  if (text) r.innerText = text;
  return r;
}

export function append(parent, child) {
  parent.appendChild(child);
  return parent;
}

export function addClasses(element, clase) {
  clase.split(' ').forEach((clasa) => {
    element.classList.add(clasa);
  });
}

export function loopSelected(id) {
  var selectedArray = new Array();
  var selObj = document.getElementById(id);
  var i;
  var count = 0;
  for (i = 0; i < selObj.options.length; i++) {
    if (selObj.options[i].selected) {
      selectedArray[count] = selObj.options[i].value;
      count++;
    }
  }
  return selectedArray;
  //console.log(selectedArray);
}
