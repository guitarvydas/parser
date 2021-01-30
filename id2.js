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


function rw_terminal (obj, depth) {
    if (obj.node === "_terminal") {
	s = spaces (depth);
	return `${s}"${obj.primitiveValue}"`;
    } else {
	return null;
    }
}

function rw_kw (obj, depth) {
    if (obj.node === "kw") {
	s = spaces (depth);
	return `${s}kw[${obj.value}] }`;
    } else {
	return null;
    }
}

function rw_literal (obj, depth) {
    if (obj.node === "literal") {
	s = spaces (depth);
	return `${s}[${obj.value}]`;
    } else {
	return null;
    }
}

function rw_logicVar (obj, depth) {
    if (obj.node === "logicVar") {
	s = spaces (depth);
	return `${s}lv[${obj.value}]`;
    } else {
	return null;
    }
}

function rewrite (obj, depth) {
    var rw = rw_terminal (obj, depth);
    if (rw) {
	return rw;
    } else {
	rw = rw_kw (obj, depth);
	if (rw) { 
	    return rw;
	} else {
	    rw = rw_literal (obj, depth);
	    if (rw) {
		return rw;
	    } else {
		rw = rw_logicVar (obj, depth);
		if (rw) {
		    return rw;
		} else {
		    return null;
		}
	    }
	}
    }
}
  
function unparse (depth, obj) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { unparse (depth, x) }).join ('');
	  } else {
	      return "";
	  }
      } else {
	  var rw = rewrite (obj, depth);
	  if (rw) {
	      return rw;
	  } else {
	      var spc = `${spaces (depth)}`;
	      s = `${spc}${obj.node}`;
	      if (obj.children) {
		  var arr = obj.children.map (x => { return unparse (depth + 1, x); });
		  return `${spc}${obj.node}\n${arr.join ('\n')}`;
	      } else {
		  return `${s}`;
	      }
	  }
      }
    } else {
	return "";
    }
}


var tree = readJSONFromStdin ();
var str = unparse (0, tree);
console.log (str);
console.log ('template done');
