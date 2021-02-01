const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}


function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	if ("Statement" == obj.node) {
	    // Statement = (ClearStatement | Query | Rule | Fact) ";"
	    var stmt = walk (obj.children[0], depth + 1);
	    return `${stmt}\n`;
	}
	
	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    return "clear;";
	};

	// line(x). --> fact1 ("line", functor0 ("a"));
	// UnaryFact = FactIdentifier "(" FactFormal ")" --> fact1 ($FactIdentifier, functor0 ($FactFormal))
	if ("UnaryFact" === obj.node) {
            //   obj ~ /[fid] ( [fformal] )/ => `fact1 (${fid}, functor0 (${fformal}));`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    var fformal = dig ("FactFormal", obj.children[2]);
	    return `fact1 ("${fid}", functor0 ("${fformal}"));`;
        };

	// NonaryFact = FactIdentifier --> `fact0 ($FactIdentifier)`
	if ("NonaryFact" === obj.node) {
            //   obj ~ /[fid]/ => `fact0 (${fid});`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    return `fact0 ("${fid}");`;
	    return null;
        };


	// Rule = Head "=" (RuleBodyMany "|")* RuleBodyLast
        //        0     1  2           3
	if ("Rule" === obj.node) {
	    var head = walk (obj.children[0], depth + 1);
	    var bodymany = walk (obj.children[2], depth + 1);
	    var lastbody = walk (obj.children[3], depth + 1);
	    if (bodymany) {
		return `rule (head (${head}), body(LOR (${bodymany}, ${lastbody})));\n`;
	    } else {
		return `rule (head (${head}), body(${lastbody}));\n`;
	    }
        };

	if ("BinaryHead" === obj.node) {
	    // BinaryHead = id "(" Formal "," Formal ")"
	    //              0   1  2       3  4      5
	    var id = digText (obj.children [0]);
	    var f1 = walk (obj.children [2]);
	    var f2 = walk (obj.children [4]);
	    var s = `"${id}", ${f1}, ${f2}`;
	    return s;
	}

	if ("MatchFactor" === obj.node ) {
	    // MatchFactor = (MatchAtom "&")*  MatchAtom
	    //                0                1
	    var matchAtomStar = walk (obj.children [0]);
	    var lastMatchAtom = walk (obj.children [1]);
	    if (matchAtomStar) {
		return `LAND (${matchAtomStar}, ${lastMatchAtom})`;
	    } else {
		return `${lastMatchAtom}`;
	    }
	}

	if ("NonaryFunctor" === obj.node) {
	    var v = digText (obj);
	    return `"${v}"`;
	}

	if ("logicVar" === obj.node) {
	    var lvid = digText (obj);
	    return `lvar ("${lvid}")`;
        };

	if ("Keyword" === obj.node) {
	    var text = digText (obj);
	    return `${text} ()`;
        };

	if ("_star"  === obj.node) {
	    if (0 >= obj.children.length) {
		return null;
	    } else {
		var rArray= obj.children.map (x => { return walk (x, depth); });
		return rArray;
	    }
	}

    };
    return null;
}

function walk (obj, depth) {
    var s;
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      return obj.map (x => { return walk (x, depth) });
	  } else {
	      return null;
	  }
      } else {
	  var rw = rewrite (obj, depth);
	  if (rw) {
	      return rw;
	  } else {
	      if (isCompositeNode (obj)) {
		  return obj.children.map (x => {return walk (x, depth + 1)});
	      } else {
		  return null;
	      }
	  }
      }
    } else {
	return null;
    }
}


var tree = readJSONFromStdin ();
var transpiledString = walk (tree, 0);
console.log (transpiledString.join (''));
