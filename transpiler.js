const fs = require ('fs');

function readJSON (fname) {
    var text =  getNamedFile (fname);
    const obj = JSON.parse (text);
    return obj;
}



function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	if ("MatcherStatement" === obj.node) {
	    return new Composite ("MatcherStatement", walk (obj.children));
	}
	
	if ("Statement" === obj.node) {
	    // (ClearStatement | Query | Rule | Fact) ";"
	    // var stmt = walk (obj.children[0], depth + 1);
	    // return `${stmt};\n`;
	    return new Composite ("Statement", walk (obj.children[0]));
	}
	
	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    // return "clear";
	    return new Composite ("ClearStatement", walk (obj.children));
	};

	// Rule = Head "=" (RuleBodyTwoOrMore | RuleBodySingle)
	//        0    1   2
	if ("Rule" === obj.node) {
	    return new Composite ("Rule", walk (obj.children));
        };

	// RuleBodyTwoOrMore "=" Body RuleBodyTail+
        //                   0   1    2+
	if ("RuleBodyTwoOrMore" === obj.node) {
		return new Composite ("RuleBodyTwoOrMore", walk (obj.children, depth + 1));
        };
	// RuleBodySingle = Body
        //                  0
	if ("RuleBodySingle" === obj.node) {
	    return new Composite ("RuleBodySingle", walk (obj.children));
        };


	// RuleBodyTail = "|" Body
        //                 0  1
	if ("RuleBodyTail" === obj.node) {
	    return new Composite ("RuleBodyTail", walk (obj.children));
        };

	if ("Fact" === obj.node) {
	    return new Composite("Fact", walk (obj.children));
	};

	if ("Query" === obj.node) {
	    return new Composite("Query", walk (obj.children));
	};

	if ("Subject" === obj.node) {
	    return new Composite("Subject", walk (obj.children));
	};

	if ("Object" === obj.node) {
	    return new Composite("Object", walk (obj.children));
	};

	if ("Head" === obj.node) {
	    return new Composite("Head", walk (obj.children));
	};

	if ("BinaryHead" === obj.node) {
	    return new Composite("BinaryHead", walk (obj.children));
	};

	if ("UnaryHead" === obj.node) {
	    return new Composite("UnaryHead", walk (obj.children));
	};

	if ("NonaryHead" === obj.node) {
	    return new Composite("NonaryHead", walk (obj.children));
	};

	if ("Body" === obj.node) {
	    return new Composite("Body", walk (obj.children));
	};

	if ("Formal" === obj.node) {
	    return new Composite("Formal", walk (obj.children));
	};

	if ("MatchExpression" === obj.node) {
	    return new Composite("MatchExpression", walk (obj.children));
	};

	if ("MatchFactor" === obj.node ) {
	    return new Composite("MatchFactor", walk (obj.children));
	};

	if ("MatchFactorTwoOrMore" === obj.node ) {
	    return new Composite("MatchFactorTwoOrMore", walk (obj.children));
	};
	if ("MatchFactorSingle" === obj.node ) {
	    return new Composite("MatchFactorSingle", walk (obj.children));
	};
	
	if ("MatchFactorTail" === obj.node ) {
	    // MatchFactorTail = "&" MatchAtom
	    //                   0   1
	    return new Composite("MatchFactorTail", walk (obj.children));
	};
	
	if ("MatchAtom" === obj.node) {
	    return new Composite("MatchAtom", walk (obj.children));
	};

	if ("Keyword" === obj.node) {
	    return new Composite("Keyword", walk (obj.children));
	};

	if ("kwCut" === obj.node) {
	    return new Composite("kwCut", walk (obj.children));
	};

	if ("kwSucceed" === obj.node) {
	    return new Composite("kwSucceed", walk (obj.children));
	};

	if ("kwFail" === obj.node) {
	    return new Composite("kwFail", walk (obj.children));
	};

	if ("BinaryFunctor" === obj.node) {
	    return new Composite("BinaryFunctor", walk (obj.children));
	};

	if ("UnaryFunctor" === obj.node) {
	    return new Composite("UnaryFunctor", walk (obj.children));
	};

	if ("NonaryFunctor" === obj.node) {
	    return new Composite("NonaryFunctor", walk (obj.children));
	};

	if ("Primary" === obj.node) {
	    return new Composite("Primary", walk (obj.children));
	};

	if ("identifier" === obj.node) {
	    return new Composite("identifier", walk (obj.children));
	};

	if ("logicVariable" === obj.node) {
	    return new Composite("logicVariable", walk (obj.children));
	};

	if ("lowerCaseLetter" === obj.node) {
	    return new Composite("lowerCaseLetter", walk (obj.children));
	};

	if ("upperCaseLetter" === obj.node) {
	    return new Composite("upperCaseLetter", walk (obj.children));
	};

	if ("identLetter" === obj.node) {
	    return new Composite("identLetter", walk (obj.children));
	};

	if ("UnaryFact" === obj.node) {
	    return new Composite("UnaryFact", walk (obj.children));
	};

	if ("NonaryFact" === obj.node) {
	    return new Composite("NonaryFact", walk (obj.children));
	};

	if ("FactIdentifier" === obj.node) {
	    return new Composite("FactIdentifier", walk (obj.children));
	};

	if ("FactFormal" === obj.node) {
	    return new Composite("FactFormal", walk (obj.children));
	};

	if ("RuleBodyMany" === obj.node) {
	    return new Composite("RuleBodyMany", walk (obj.children));
	};

	if ("RuleBodyLast" === obj.node) {
	    return new Composite("RuleBodyLast", walk (obj.children));
	};




	if ("_star"  === obj.node) {
	    if (0 >= obj.children.length) {
		return new Composite ("_star", [null]);
	    } else {
		var rArray= obj.children.map (x => { return walk (x, depth) + ""; });
		return new Composite ("_star", rArray);
	    }
	};

	if ("logicVar" === obj.node) {
	    return new Composite ("logicVar", walk (obj.children));
	};
	
	throw `rewrite: ?(${obj.node})`; // obj.node isn't implemented above!
	
    };
    
    if (isLeafNode (obj)) {
	return obj;
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
var transpiledTree = walk (tree, 0);
console.log (JSON.stringify (transpiledTree));
