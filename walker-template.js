const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}
function rewrite (obj, depth) {
    return null;
}

function walk (obj, depth) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return walk (x, depth) });
	  } else {
	      return {};
	  }
      } else {
	  var rw = rewrite (obj, depth);
	  if (rw) {
	      return rw;
	  } else {
	      if (Array.isArray (obj.children)) {
		  return { node: obj.node, children: obj.children.map (x => { return walk (x, depth + 1); }) };
	      } else if (obj.children) {
		  return { node: obj.node, children: obj.children };
	      } else if (obj.primitiveValue) {
		  return { node: obj.node, primitiveValue: obj.primitiveValue };
	      } else {
		  return { node: obj.node, children: [] };
	      }
	  }
      }
    } else {
	return {};
    }
}


var tree = readJSONFromStdin ();
var rw = walk (tree, 0);
console.log (JSON.stringify (rw));
