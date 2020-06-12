function create() {
  const url = "http://localhost/proiect1/assets/php/api/posts/create.php";

  var formElement = document.getElementsByTagName("form")[0],
    inputElements = formElement.getElementsByTagName("input"),
    inputElements2 = formElement.getElementsByTagName("textarea"),
    inputElements3 = formElement.getElementsByTagName("select"),
    jsonObject = {};

  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    jsonObject[inputElement.name] = inputElement.value;
  }
  for (var i = 0; i < inputElements2.length; i++) {
    var inputElement = inputElements2[i];
    jsonObject[inputElement.name] = inputElement.value;
  }
  for (var i = 0; i < inputElements3.length; i++) {
    var inputElement = inputElements3[i];
    jsonObject[inputElement.name] = inputElement.value;
  }
  let data = JSON.stringify(jsonObject);
  console.log(data);

  var request = new Request(url, {
    method: "POST",
    body: data,
    headers: new Headers(),
  });

  //TODO:handle responses api
  fetch(request).then(function () {});
}
