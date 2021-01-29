const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

function spaces (depth) {
    var i;
    for (i = 0 ; i < depth ; i += 1) {
	process.stdout.write (' ');
    }
}

function unparse (depth, obj) {
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      obj.forEach (x => { unparse (depth, x) });
	  }
      } else if (obj.node === "_terminal") {
	  spaces (depth);
	  process.stdout.write (obj.primitiveValue + '\n');
      } else if (obj.node === "kw") {
	  spaces (depth);
	  process.stdout.write (`kw[${obj.value}]\n`);
      } else if (obj.node === "literal") {
	  spaces (depth);
	  process.stdout.write (`[${obj.value}]\n`);
      } else if (obj.node === "logicVar") {
	  spaces (depth);
	  process.stdout.write (`lv[${obj.value}]\n`);
      } else {
	  spaces (depth);
	  process.stdout.write (obj.node + '\n');
	  if (obj.children) {
	      obj.children.forEach (x => { unparse (depth + 1, x); });
	  }
      }
    }
}

// function walk (obj) {
//     if (Array.isArray (obj)) {
// 	return [ obj.forEach (x => { walk (x) }) ];
//     } else if (obj.node === "_terminal") {
// 	return obj;
//     } else {
// 	var children;
// 	if (obj.children) {
// 	    children = [ obj.children.forEach (x => { walk (x); }) ];
// 	}
// 	var newNode = { node: obj.node, children: children };
// 	return newNode;
//     }
// }

function getTerminal (obj) {
    if (Array.isArray (obj)) {
	if (0 >= obj.length) {
	    return "";
	} else {
	    return obj.map (x => getTerminal (x)).join ('');
	}
    } else if (obj.node === "_terminal") {
	return obj.primitiveValue;
    } else {
	return obj.children.map (x => getTerminal (x)).join ('');
    }
}

function concatenateIdentToString (obj) {
    // identifier = lowerCaseLetter identLetter*
    // obj.children = [ {node: identifier ...} , [ {node: identLetter ...}, ... ] ]
    // obj.children = [ {node: identifier ...} , [] ]
    var str = obj.children.map (x => { return getTerminal (x); }).join ('');
    return str;
}

function walk_identifiers_and_logicVariables (obj) {
    if (Array.isArray (obj)) {
	if (0 >= obj.length) {
	    return [];
	} else {
	    return [ obj.forEach (x => {  return walk_identifiers_and_logicVariables (x) }) ];
	}
    } else if (obj.node === "_terminal") {
	return obj;
    } else if (obj.node === "Keyword") {
	var str = concatenateIdentToString (obj);
	return { node: "kw", value: str };
    } else if (obj.node === "identifier") {
	var str = concatenateIdentToString (obj);
	return { node: "literal", value: str };
    } else if (obj.node === "logicVariable") {
	var str = concatenateIdentToString (obj);
	return { node: "logicVar", value: str };
    } else {
	var children;
	if (obj.children) {
	    children = obj.children.map (x => { return walk_identifiers_and_logicVariables (x); });
	}
	var newNode = { node: obj.node, children: children };
	return newNode;
    }
}
    
function rewrite (obj) {
    return walk_identifiers_and_logicVariables (obj);
}


var jobj = readJSONFromStdin ();
var rw = rewrite (jobj);
//unparse (0, rw);
console.log (JSON.stringify (rw));
//console.log ('done');
