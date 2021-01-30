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
	return { node: "ident", value: str };
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
	      if (Array.isArray (obj.children)) {
		  return { node: obj.node, children: obj.children.map (x => { return walk (x, depth + 1); }) };
	      } else if (obj.children) {
		  return { node: obj.node, children: obj.children };
	      } else if (obj.value) {
		  return { node: obj.node, value: obj.value };
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


/// utilities
function getTerminal (obj) {
    if (Array.isArray (obj)) {
	if (0 >= obj.length) {
	    return "";
	} else {
	    return obj.map (x => getTerminal (x)).join ('');
	}
    } else if (obj.node === "_terminal") {
	return obj.value;
    } else {
	return obj.children.map (x => getTerminal (x)).join ('');
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
    str = str + obj.children.map (x => { return getTerminal (x); }).join ('');
    return str;
}
