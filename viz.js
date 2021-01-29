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

function unparse (depth, obj) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { unparse (depth, x) }).join ('');
	  } else {
	      return "";
	  }
      } else if (obj.node === "_terminal") {
	  s = spaces (depth);
	  return `${s}${obj.primitiveValue}\n`;
      } else if (obj.node === "kw") {
	  s = spaces (depth);
	  return `${s}kw[${obj.value}]\n`;
      } else if (obj.node === "literal") {
	  s = spaces (depth);
	  return `${s}[${obj.value}]\n`;
      } else if (obj.node === "logicVar") {
	  s = spaces (depth);
	  return `${s}lv[${obj.value}]\n`;
      } else {
	  var spc = `${spaces (depth)}`;
	  s = `${spc}${obj.node}`;
	  if (obj.children) {
	      var arr = obj.children.map (x => { return unparse (depth + 1, x); });
	      return `${spc}${obj.node}\n${arr.join ('')}`;
	  } else {
	      return `${s}`;
	  }
      }
    } else {
	return "[3]";
    }
}


var tree = readJSONFromStdin ();
var str = unparse (0, tree);
console.log (str);
console.log ('done');
