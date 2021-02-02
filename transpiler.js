const fs = require ('fs');

const debug = false;

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}


function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	if (!debug) {

	    if ("Statement" === obj.node) {
		return `${walk (obj.children[0])};\n`;
	    }
	    
	    // line(x). --> fact1 ("line", functor0 ("a"));
	    // UnaryFact = FactIdentifier "(" FactFormal ")" --> fact1 ($FactIdentifier, functor0 ($FactFormal))
	    if ("UnaryFact" === obj.node) {
		//   obj ~ /[fid] ( [fformal] )/ => `fact1 (${fid}, functor0 (${fformal}));`
		var fid = dig ("FactIdentifier", obj.children[0]);
		var fformal = dig ("FactFormal", obj.children[2]);
		return `fact1 ("${fid}", functor0 ("${fformal}"))`;
            };

	    // NonaryFact = FactIdentifier --> `fact0 ($FactIdentifier)`
	    if ("NonaryFact" === obj.node) {
		//   obj ~ /[fid]/ => `fact0 (${fid});`
		var fid = dig ("FactIdentifier", obj.children[0]);
		return `fact0 ("${fid}")`;
		return null;
            };



	    if ("BinaryFunctor" === obj.node) {
		// BinaryFunctor = id "(" Formal "," Formal ")"
		//              0   1  2       3  4      5
		var id = digText (obj.children [0]);
		var f1 = walk (obj.children [2]);
		var f2 = walk (obj.children [4]);
		var s = `"${id}", ${f1}, ${f2}`;
		return s;
	    }

	    if ("logicVar" === obj.node) {
		var lvid = digText (obj);
		return `lvar ("${lvid}")`;
            };
	    
	    if ("Keyword" === obj.node) {
		var text = digText (obj);
		return `${text} ()`;
            };

	    if ("MatchFactor" === obj.node ) {
		// MatchFactor = (MatchAtom "&")*  MatchAtom
		//                0          1     2
		var matchAtomStar = walk (obj.children [0]);
		var lastMatchAtom = walk (obj.children [2]);
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
	}


	//
	// debug - raw walk, no rewriting
	//

	if ("MatcherStatement" === obj.node) {
	    return walk (obj.children);
	}
	
	if ("Statement" === obj.node) {
	    // (ClearStatement | Query | Rule | Fact) ";"
	    // var stmt = walk (obj.children[0], depth + 1);
	    // return `${stmt};\n`;
	    if (debug) {
		return `statement[${walk (obj.children[0])}]\n`;
	    } else {
		return `${walk (obj.children[0])};\n`;
	    }
	}
	
	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    // return "clear";
	    return ""
	};

	// Head "=" (RuleBodyMany "|")* RuleBodyLast
        // 0    1    2*                 3
	if ("Rule" === obj.node) {
	    var c0 = walk (obj.children[0]);
	    var c1 = walk (obj.children[1]);
	    var c2 = walk (obj.children[2]);
	    var c3 = walk (obj.children[3]);
	    return `rule[[${c0}][${c1}][${c2}][${c3}]]`;
	    // return `rule[${walk (obj.children)}]`;
	    // var head = walk (obj.children[0], depth + 1);
	    // var bodymany = walk (obj.children[2], depth + 1);
	    // var lastbody = walk (obj.children[3], depth + 1);
	    // if (bodymany) {
	    // 	return `rule (head (${head}), body(LOR (${bodymany}, ${lastbody})))`;
	    // } else {
	    // 	return `rule (head (${head}), body(${lastbody}))`;
	    // }
        };

	if ("Fact" === obj.node) {
	    return walk (obj.children);
	};

	if ("Query" === obj.node) {
	    return walk (obj.children);
	};

	if ("Subject" === obj.node) {
	    return walk (obj.children);
	};

	if ("Object" === obj.node) {
	    return walk (obj.children);
	};

	if ("Head" === obj.node) {
	    return walk (obj.children);
	};

	if ("UniaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("BinaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("NonaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("Body" === obj.node) {
	    return walk (obj.children);
	};

	if ("Formal" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchExpression" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchFactor" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchAtom" === obj.node) {
	    return walk (obj.children);
	};

	if ("Keyword" === obj.node) {
	    return walk (obj.children);
	};

	if ("kwCut" === obj.node) {
	    return walk (obj.children);
	};

	if ("kwSucceed" === obj.node) {
	    return walk (obj.children);
	};

	if ("kwFail" === obj.node) {
	    return walk (obj.children);
	};

	if ("BinaryFunctor" === obj.node) {
	    return walk (obj.children);
	};

	if ("UnaryFunctor" === obj.node) {
	    return walk (obj.children);
	};

	if ("NonaryFunctor" === obj.node) {
	    return walk (obj.children);
	};

	if ("Primary" === obj.node) {
	    return walk (obj.children);
	};

	if ("identifier" === obj.node) {
	    return walk (obj.children);
	};

	if ("logicVariable" === obj.node) {
	    return walk (obj.children);
	};

	if ("lowerCaseLetter" === obj.node) {
	    return walk (obj.children);
	};

	if ("upperCaseLetter" === obj.node) {
	    return walk (obj.children);
	};

	if ("identLetter" === obj.node) {
	    return walk (obj.children);
	};

	if ("UnaryFact" === obj.node) {
	    return walk (obj.children);
	};

	if ("NonaryFact" === obj.node) {
	    return walk (obj.children);
	};

	if ("FactIdentifier" === obj.node) {
	    return walk (obj.children);
	};

	if ("FactFormal" === obj.node) {
	    return walk (obj.children);
	};

	if ("RuleBodyMany" === obj.node) {
	    return walk (obj.children);
	};

	if ("RuleBodyLast" === obj.node) {
	    return walk (obj.children);
	};




	if ("_star"  === obj.node) {
	    if (0 >= obj.children.length) {
		return "$";
	    } else {
		var rArray= obj.children.map (x => { return walk (x, depth) + ""; });
		return rArray;
	    }
	};

	if ("logicVar" === obj.node) {
	    return walk (obj.children);
	};
	
	throw `rewrite: ?(${obj.node})`;
	
    };

    if (isLeafNode (obj)) {
	return obj.value;
	//return "%";
    };
    
    return `!(${obj.node})`;
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
