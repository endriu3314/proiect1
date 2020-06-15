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
  if (json.length === 0) return;
  let keys = Object.keys(json[0]);
  let table = dom("table");
  append(table, keys.map((k) => dom("th", k)).reduce(append, dom("tr")));
  const makeRow = (acc, row) =>
    append(acc, keys.map((k) => dom("td", row[k])).reduce(append, dom("tr")));
  json.reduce(makeRow, table);
  wrapper.appendChild(table);
}
