const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}
function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    return "clear;";
	}

	// line(x). --> fact1 ("line", functor0 ("a"));
	//if ("Fact" === obj.node) {
    };
    return null;
}

function walk (obj, depth) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return walk (x, depth) }).join ('');
	  } else {
	      return "";
	  }
      } else {
	  var rw = rewrite (obj, depth);
	  if (rw) {
	      return rw;
	  } else {
	      if (isCompositeNode (obj)) {
		  return obj.children.map (x => {return walk (x, depth + 1)}).join ('');
	      } else {
		  return "";
	      }
	  }
      }
    } else {
	return {};
    }
}


var tree = readJSONFromStdin ();
var transpiledString = walk (tree, 0);
console.log (transpiledString);
