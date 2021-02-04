const fs = require ('fs');

const debug = false;
//const debug = true;

function readJSON (fname) {
    var text =  getNamedFile (fname);
    const obj = JSON.parse (text);
    return obj;
}



function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {
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

	// Rule = Head "=" (RuleBodyOneOrMore | RuleBodySingle)
	//        0    1   2
	if ("Rule" === obj.node) {
	    var c0 = walk (obj.children[0]);
	    var c1 = walk (obj.children[1]);
	    var c2 = walk (obj.children[2]);
	    if (debug) {
		return `rule[${c0},${c1},${c2}]`;
	    } else {
		return `${c0}, ${c2}`;
	    }
        };

	// RuleBodyOneOrMore "=" (RuleBodyMany "|")* RuleBodyLast
        //                   0    1*                 2
	if ("RuleBodyOneOrMore" === obj.node) {
	    return walk (obj.children, depth + 1);
        };
	// RuleBodySingle "=" RuleBodyLast
        //                0   1
	if ("RuleBodySingle" === obj.node) {
	    return walk (obj.children, depth + 1);
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
	    return `head[${walk (obj.children)}]`;
	};

	if ("BinaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("UnaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("NonaryHead" === obj.node) {
	    return walk (obj.children);
	};

	if ("Body" === obj.node) {
	    return `body[${walk (obj.children)}]`;
	};

	if ("Formal" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchExpression" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchFactor" === obj.node ) {
	    return walk (obj.children);
	};

	if ("MatchFactorOneOrMore" === obj.node ) {
	    if (debug) {
		return walk (obj.children);
	    } else {
		return `${walk (obj.children[0])}, ${walk (obj.children[1])}`;
	    }
	};
	if ("MatchFactorSingle" === obj.node ) {
	    if (debug) {
		return walk (obj.children);
	    } else {
		return `${walk (obj.children[0])}`;
	    }
	};
	
	if ("MatchFactor" === obj.node) {
	    return walk (obj.children);
	};

	if ("MatchAtom" === obj.node) {
	    return walk (obj.children);
	};

	if ("Keyword" === obj.node) {
	    if (debug) {
		return walk (obj.children);
	    } else {
		var text = digText (obj);
		return `${text} ()`;
	    }
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
	    if (debug) {
		return walk (obj.children);
	    } else {
		var lvid = digText (obj);
		return `lvar ("${lvid}")`;
	    }
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
		return null;
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


var argv = process.argv.slice (1);
var tree = readJSON (argv[1]);
var transpiledString = walk (tree, 0);
console.log (transpiledString.join (''));
