const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

//////// rewrite ////////////

function rewrite (obj, depth) {
    if (obj.node === "identifier") {
	var str = concatenateIdentToString (obj);
	return new Composite ("ident", [new Leaf (str)]);
    } else {
	return null;
    }
}

//////// end rewrite ////////////

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
	      if (isCompositeNode (obj)) {
		  return new Composite (obj.node, obj.children.map (x => { return walk (x, depth + 1); }));
	      } else {
		  return obj;
	  }
      }
    } else {
	return {};
    }
}


var tree = readJSONFromStdin ();
var rw = walk (tree, 0);
console.log (JSON.stringify (rw));


/// utilities
function getValue (obj) {
    if (Array.isArray (obj)) {
	if (0 >= obj.length) {
	    return "";
	} else {
	    return obj.map (x => getValue (x)).join ('');
	}
    } else if (obj.node === "_leaf") {
	return obj.value;
    } else {
	return obj.children.map (x => getValue (x)).join ('');
    }
}

function concatenateIdentToString (obj) {
    // identifier = lowerCaseLetter identLetter*
    // obj.children = [ {node: identifier ...} , [ {node: "star", children: [{node: identLetter ...}, ... ]} ]]
    // obj.children = [ {node: identifier ...} , [] ]
    var str;
    if (obj.value) {
	str = obj.value;
    } else {
	str = "";
    };
    str = str + obj.children.map (x => { return getValue (x); }).join ('');
    return str;
}
