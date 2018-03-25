import Parser from '/fragments/Parser';
import CodeGenerator from '/fragments/CodeGenerator';

const parser = Parser();
const generator = CodeGenerator();

// note, a node will have a constructor with its children
// and a method setAttributes and also setAttribute
export default function() {
    return {
        compile(code) {
            const bodyStart = code.indexOf('<');
            const headers = code.substring(0, bodyStart);
            const body = code.substring(bodyStart);
            const tree = parser.parse(body);
            const instructions = generator.generate(tree);
            // TODO the generator should most probably do the generate too...
            return 'import lotech from \'/lotech\';\n'
                 + headers
                 + 'export default function(children) {\n'
// TODO check it, but most probably it is not necessary to wrap here with a lotech.Component (all components should have the same API?)
                 + '  ' + instructions.join('\n  ') + '\n'
                 + '}';
        }
    };
};

/* TODO
'ProductRow__'
<Row>
    <span className="ProductRow__name {isMissing:ProductRow__isMissing}">
        {name}
    </span>
    <span>
        {price}
    </span>
</Row>

=>

function ProductRow(children) {
  var n1 = index.String('');
  var price = index.String('');
  var x = index.createElement('span', {'scope': "ProductRow", 'style': ["name"]}, [n1]);
  var result = index.Component(index.createElement(Row, {}, [x,index.createElement('span', {}, [price])]));
  result.setName = function(name) {
      n1.setData(name);
  }
  result.setPrice = function(price) {
      n1.setData(price);
  }
  reset.setIsMissing = function(isMissing) {
      if (isMissing) {
        x.addClass('ProductRow__isMissing');
      } else {
        x.removeClass('ProductRow__isMissing');
      }
  }
    return result;
}
*/
