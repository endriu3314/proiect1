function create() {
  const url = 'http://localhost/proiect1/assets/php/api/categories/create.php';

  var formElement = document.getElementsByTagName('form')[0],
    inputElements = formElement.getElementsByTagName('input'),
    jsonObject = {};

  for (var i = 0; i < inputElements.length; i++) {
    var inputElement = inputElements[i];
    jsonObject[inputElement.name] = inputElement.value;
  }

  let data = JSON.stringify(jsonObject);
  console.log(data);

  var request = new Request(url, {
    method: 'POST',
    body: data,
    heards: new Headers(),
  });

  //TODO: handle response api sweetalert or smth
  fetch(request).then(function () {});
}
