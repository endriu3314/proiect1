function loopSelected(id) {
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

export { loopSelected };
