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

function digText (obj) {
    return getValue (obj);
}

function makePairs (array1, array2) { // return a single array of double elements
    if (0 >= array1.length) {
	return [];
    } else {
	var e1 = array1.shift ();
	var e2 = array2.shift ();
	if (0 >= array1.length) {
	    return [[e1, e2]];
	} else {
	    return [[e1,e2], makePairs (array1, array2)];
	}
    }
}

