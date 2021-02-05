const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

function spaces (depth) {
    var i;
    var s = "";
    for (i = 0 ; i < depth ; i += 1) {
	s = s + ' ';
    }
    return s;
}

function emitTree (depth, obj) {
    var s;
    debugger;
    if (obj) {
	if (Array.isArray (obj)) {
	    if (0 < obj.length) {
		return obj.map (x => { return emitTree (depth, x) }).join ('\n');
	    } else {
		return "";
	    }
	} else if (isLeafNode (obj)) {
	    // nothing
	} else if (isEmitNode (obj)) {
	    s = spaces (depth);
	    return `${s}'${obj.value}'`;
	} else {
	    var spc = `${spaces (depth)}`;
	    s = `${spc}${obj.node}`;
	    if (obj.children) {
		var arr = obj.children.map (x => { return emitTree (depth + 1, x); });
	    } else {
		// nothing
	    }
	}
    } else {
	// nothing
    }
}


var tree = readJSONFromStdin ();
var str = emitTree (0, tree);
console.log (str);
console.log ('done');
