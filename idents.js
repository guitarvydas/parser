const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

function getTerminal (obj) {
    if (Array.isArray (obj)) {
	if (0 >= obj.length) {
	    return "";
	} else {
	    return obj.map (x => getTerminal (x)).join ('');
	}
    } else if (obj.node === "_leaf") {
	return obj.value;
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
    } else if (obj.node === "_leaf") {
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
console.log (JSON.stringify (rw));
