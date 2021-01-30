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

function rewrite (tree, depth) {
    if (tree.node === "ClearStatement") {
	return {rewritten: true, tree: "clear;"};
    } else {
	return { rewritten: false, tree: null };
    }
}

function walk (depth, obj) {
    var s;
    if (obj) {
	if (Array.isArray (obj)) {
	    if (0 < obj.length) {
		return obj.map (x => { walk (depth, x) }).join ('');
	    } else {
		return "";
	    }
	} else {
	    var rw = rewrite (obj, depth);
	    if (rw.rewritten) {
		return (rw.tree);
	    } else {
		if (obj.node === "_terminal") {
		    s = spaces (depth);
		    return `${s}"${obj.primitiveValue}"`;
		} else {
		    var spc = `${spaces (depth)}`;
		    s = `${spc}${obj.node}`;
		    if (obj.children) {
			var arr = obj.children.map (x => { return walk (depth + 1, x); });
			return `${spc}${obj.node}\n${arr.join ('\n')}`;
		    } else {
			return `${s}`;
		    }
		}
	    }
	}
    } else {
	return "";
    }
}

var tree = readJSONFromStdin ();
var code = walk (0, tree);
console.log (code);
console.log ('matcher done');
