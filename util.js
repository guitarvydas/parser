
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

function getIdent (obj) {
    return getValue (obj);
}

function dig (nodeName, obj) {
    console.log ();
    console.log ('dig ' + nodeName);
    console.log (obj);
    if (isCompositeNode (obj)) {
	if (nodeName === obj.node) {
	    var s = getIdent (obj);
	    return s;
	} else {
	    var s = obj.children.map (x => dig (nodeName, x)).join ('');
	    return s;
	}
    }
    return null;
};

