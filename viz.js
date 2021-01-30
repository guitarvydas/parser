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
    debugger;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return unparse (depth, x) }).join ('\n');
	  } else {
	      return "";
	  }
      } else if (obj.node === "_terminal") {
	  s = spaces (depth);
	  return `${s}"${obj.value}"`;
      } else if (obj.node === "kw") {
	  s = spaces (depth);
	  return `${s}kw[${obj.value}]`;
      } else if (obj.node === "literal") {
	  s = spaces (depth);
	  return `${s}[${obj.value}]`;
      } else if (obj.node === "logicVar") {
	  s = spaces (depth);
	  return `${s}lv[${obj.value}]`;
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
//var tree = '{"node":"MatcherStatement","children":[{"node":"Statement","children":[{"node":"Fact","children":[{"node":"Head","children":[{"node":"UnaryHead","children":[{"node":"identifier","children":[{"node":"lowerCaseLetter","children":[{"node":"_terminal","value":"l"}]},[{"node":"identLetter","children":[{"node":"lowerCaseLetter","children":[{"node":"_terminal","value":"i"}]}]},{"node":"identLetter","children":[{"node":"lowerCaseLetter","children":[{"node":"_terminal","value":"n"}]}]},{"node":"identLetter","children":[{"node":"lowerCaseLetter","children":[{"node":"_terminal","value":"e"}]}]}]]},{"node":"_terminal","value":"("},{"node":"Formal","children":[{"node":"NonaryFunctor","children":[{"node":"identifier","children":[{"node":"lowerCaseLetter","children":[{"node":"_terminal","value":"a"}]},[]]}]}]},{"node":"_terminal","value":")"}]}]}]},{"node":"_terminal","value":";"}]}]}';
var str = unparse (0, tree);
console.log (str);
console.log ('done');
