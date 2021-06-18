/*
1. Create a function that parses a string into an integer (like the js function parseInt, but without the base parameter)
* */

function myParseInt(str) {
  return +str;
}

document.addEventListener('DOMContentLoaded', function (){
  console.log('parseInt:', myParseInt('123')+2);
})
