const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}


function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    return "clear;\n";
	};

	// line(x). --> fact1 ("line", functor0 ("a"));
	// UnaryFact = FactIdentifier "(" FactFormal ")" --> fact1 ($FactIdentifier, functor0 ($FactFormal))
	if ("UnaryFact" === obj.node) {
            //   obj ~ /[fid] ( [fformal] )/ => `fact1 (${fid}, functor0 (${fformal}));`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    var fformal = dig ("FactFormal", obj.children[2]);
	    return `fact1 ("${fid}", functor0 ("${fformal}"));\n`;
        };

	// NonaryFact = FactIdentifier --> `fact0 ($FactIdentifier)`
	if ("NonaryFact" === obj.node) {
            //   obj ~ /[fid]/ => `fact0 (${fid});`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    return `fact0 ("${fid}");\n`;
	    return null;
        };


	// Rule = Head "=" (Body "|")* Body
        //        0     1  2           3
	if ("Rule" === obj.node) {
	    var head = walk (obj.children[0], depth + 1);
	    return `rule (head ("${head}"), body(...));\n`;
        };

	if ("BinaryHead" === obj.node) {
	    // BinaryHead = id "(" Formal "," Formal ")"
	    //              0   1  2       3  4      5
	    console.log (obj.children);
	    var id = dig (obj.children [0]);
	    var s = `binaryhead /${id}/`;
	    return s;
	}

	if ("identifier" === obj.node) {
	    return dig ("identifier", obj.children [0]);
	}


	
	if ("LogicVariable" === obj.node) {
	    var lvid = dig ("LogicVariable", obj);
	    return `lvar("${lvid}")`;
        };

	

    };
    return null;
}

function walk (obj, depth) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return walk (x, depth) }).join ('');
	  } else {
	      return "";
	  }
      } else {
	  var rw = rewrite (obj, depth);
	  if (rw) {
	      return rw;
	  } else {
	      if (isCompositeNode (obj)) {
		  return obj.children.map (x => {return walk (x, depth + 1)}).join ('');
	      } else {
		  return "";
	      }
	  }
      }
    } else {
	return "";
    }
}


var tree = readJSONFromStdin ();
var transpiledString = walk (tree, 0);
console.log (transpiledString);
