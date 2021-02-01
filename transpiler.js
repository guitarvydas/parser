const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}


function rewrite (obj, depth) {
    if (isCompositeNode (obj)) {

	if ("MatcherStatement" === obj.node) {
	    return walk (obj.children);
	}
	
	if ("Statement" === obj.node) {
	    // Statement = (ClearStatement | Query | Rule | Fact) ";"
	    var stmt = walk (obj.children[0], depth + 1);
	    return `${stmt};\n`;
	}
	
	// ClearStatement --> clear;
	if ("ClearStatement" === obj.node) {
	    return "clear";
	};

	// Rule = Head "=" (RuleBodyMany "|")* RuleBodyLast
        //        0     1  2           3
	if ("Rule" === obj.node) {
	    return walk (obj.children);
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
	    console.log(obj.children.length);
	    if (0 >= obj.children.length) {
		return "#";
	    } else {
		console.log (obj.children);
		var rArray= obj.children.map (x => { return walk (x, depth) + "$"; });
		return rArray;
	    }
	};

	if ("logicVar" === obj.node) {
	    return walk (obj.children);
	};
	
	return `?(${obj.node})`;
	
    };

    if (isLeafNode (obj)) {
	return "%";
    };
    
	console.log (obj);
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
