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
	};

	// line(x). --> fact1 ("line", functor0 ("a"));
	// UnaryFact = FactIdentifier "(" FactFormal ")" --> fact1 ($FactIdentifier, functor0 ($FactFormal))
	if ("UnaryFact" === obj.node) {
            //   obj ~ /[fid] ( [fformal] )/ => `fact1 (${fid}, functor0 (${fformal}));`
	    console.log (JSON.stringify (obj));
	    return null;
        };

	// NonaryFact = FactIdentifier --> `fact0 ($FactIdentifier)`
	if ("NonaryFact" === obj.node) {
            //   obj ~ /[fid]/ => `fact0 (${fid});`
	    console.log (JSON.stringify (obj));
	    return null;
        };

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
