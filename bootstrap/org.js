function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

function spaces (depth) {
    var i;
    var s = "";
    for (i = 0 ; i < depth ; i += 1) {
	s = s + '*';
    }
    return s + " ";
}

function unparse (depth, obj) {
    var s;
    debugger;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return unparse (depth, x) }).join ('\n');
	  } else {
	      return "";
	  }
      } else if (isLeafNode (obj)) {
	  s = spaces (depth);
	  return `${s}<leaf> "${obj.value}"`;
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
    } else {
	return "";
    }
}


var tree = readJSONFromStdin ();
var str = unparse (1, tree);
console.log (str);
