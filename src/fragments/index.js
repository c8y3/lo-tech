import Parser from '/fragments/Parser';

const parser = Parser();
const tree = parser.parse(
  '<div class="root">'
+ '    {children}'
+ '</div>');
console.log(JSON.stringify(tree));
