// include './nodes.js'

function makeSemantics (grammar) {
    const semantics = grammar.createSemantics ();
    semantics.addOperation(
	'cst',
	{
	    MatcherStatement: function (statement) { return new Composite ("MatcherStatement", statement.cst ()); }, //Statement+
	    Statement: function (_1, _2) { return new Composite ("Statement", [_1.cst (), _2.cst ()]); }, //(ClearStatement | Query | Rule | Fact) ";"

	    ClearStatement: function (_1) { return new Composite ("ClearStatement",[_1.cst ()]); }, //"clear"
	    Rule: function (_1, _2, _3) {
		// Rule = Head "=" (RuleBodyTwoOrMore | RuleBodySingle)
		//        1    2   3
		return new Composite ("Rule", [_1.cst (), _2.cst (), _3.cst ()]);
	    },
	    RuleBodyTwoOrMore: function (_1, _2s, _3s) {
		// RuleBodyTwoOrMore = Body ("|" Body)+
		//                     1     2s  3s
		var _1 = _1.cst ();
		var _2 = _2s.cst ();
		var _3 = _3s.cst ();
		var r = new Composite ("RuleBodyTwoOrMore", 
				       [_1,
					new Composite ("_star", makePairs (_2, _3))
				       ]);
		return r;
	    },
	    RuleBodySingle: function (_1) {
		// RuleBodySingle = Body
		//                  1
		return new Composite ("RuleBodySingle", [_1.cst ()]);
	    },
	    Fact: function (_1) {return new Composite ("Fact", [_1.cst ()]); }, //Head
	    Query: function (_1, _2, _3, _4) { return new Composite ("Query", [_1.cst (), _2.cst (), _3.cst (), _4.cst ()]); }, //"query" "(" MatchExpression ")"
	    Subject: function (_1) { return new Composite ("Subject", [_1.cst ()]); }, //Primary
	    Object: function (_1) { return new Composite ("Object", [_1.cst ()]); }, //Primary

	    Head: function (_1) { return new Composite ("Head", [_1.cst ()]); }, //BinaryHead | UnaryHead | NonaryHead
	    BinaryHead: function (_1, _2, _3, _4, _5, _6) { return new Composite ("BinaryHead", [_1.cst (), _2.cst (), _3.cst (), _4.cst (), _5.cst(), _6.cst ()]); }, //identifier "(" Formal "," Formal ")"
	    UnaryHead: function (_1, _2, _3, _4) { return new Composite ("UnaryHead", [_1.cst (), _2.cst (), _3.cst (), _4.cst ()]); }, //identifier "(" Formal ")"
	    NonaryHead: function (_1) { return new Composite ("NonaryHead", [_1.cst ()]); }, //identifier
	    Body: function (_1) { return new Composite ("Body", [_1.cst ()]); }, //MatchExpression

	    Formal: function (_1) { return new Composite ("Formal", [_1.cst ()]); }, //BinaryFunctor | UnaryFunctor | NonaryFunctor | logicVariable | identifier
	    MatchExpression: function (_1) { return new Composite ("MatchExpression", [_1.cst ()]); }, //MatchFactor
	    MatchFactor: function (_1) {
		// MatchFactor = (MatchFactorOneOrMore | MatchFactorSingle)
		return new Composite ("MatchFactor", [_1.cst ()]);
	    },
	    MatchFactorTwoOrMore: function (_1s, _2s, _3) { 
		// MatchFactorOneOrMore = (MatchAtom "&")*  MatchAtom
		//                        1s         2s     3
		var _1 = _1s.cst ();
		var _2 = _2s.cst ();
		var _3 = _3.cst ();
		return new Composite ("MatchFactorTwoOrMore", 
				      [
					  new Composite ("_star", makePairs (_1, _2)), 
					  _3.cst ()
				      ]
				     );
	    },
	    MatchFactorSingle: function (_1) {
		//MatchFactorSingle = MatchAtom
		return new Composite ("MatchFactorSingle", [_1.cst ()]);
	    },
	    MatchAtom: function (_1) { return new Composite ("MatchAtom", [_1.cst ()]); }, //Keyword | BinaryFunctor | UnaryFunctor | NonaryFunctor
	    Keyword: function (_1) { return new Composite ("Keyword", [_1.cst ()]); }, //kwCut | kwSucceed | kwFail
	    kwCut: function (_1) { return new Composite ("kwCut", [_1.cst ()]); }, //"cut"
	    kwSucceed: function (_1) { return new Composite ("kwSucceed", [_1.cst ()]); }, //"succeed"
	    kwFail: function (_1) { return new Composite ("kwFail", [_1.cst ()]); }, //"fail"
	    BinaryFunctor: function (_1, _2, _3, _4, _5, _6) { return new Composite ("BinaryFunctor", [_1.cst (), _2.cst (), _3.cst (), _4.cst (), _5.cst (),_6.cst ()]); }, //identifier "(" Primary "," Primary ")"
	    UnaryFunctor: function (_1, _2, _3, _4) { return new Composite ("UnaryFunctor", [_1.cst (), _2.cst (), _3.cst (), _4.cst ()]); }, //identifier "(" Primary ")"
	    NonaryFunctor: function (_1) { return new Composite ("NonaryFunctor", [_1.cst ()]); }, //identifier
	    Primary: function (_1) { return new Composite ("Primary", [_1.cst ()]); }, //identifier | logicVariable
	    identifier: function (_1, _2s) {
		var _2sval = _2s.cst ();
		if (0 < _2sval.length) {
		    return new Composite ("identifier", [_1.cst (), new Composite ("_star",  _2sval)]); //lowerCaseLetter identLetter*
		} else {
		    return new Composite ("identifier", [_1.cst (), new Composite ("_star", [])]);
		}
	    },
	    logicVariable: function (_1, _2s) {
		var _2sval = _2s.cst ();
		if (0 < _2sval.length) {
		    return new Composite ("logicVariable", [_1.cst (), new Composite ("_star",  _2sval)]); //lowerCaseLetter identLetter*
		} else {
		    return new Composite ("logicVariable", [_1.cst (), new Composite ("_star", [])]);
		}
	    },
	    lowerCaseLetter: function (_1) { return new Composite ("lowerCaseLetter", [_1.cst ()]); }, //"a" .. "z"
	    upperCaseLetter: function (_1) { return new Composite ("upperCaseLetter", [_1.cst ()]); }, //"A" .. "Z"
	    identLetter: function (_1) { return new Composite ("identLetter", [_1.cst ()]); }, //lowerCaseLetter | upperCaseLetter | "0" .. "9" | "_" | "-"
	    _terminal: function () { return new Leaf (this.primitiveValue); },

	    // additions
	    UnaryFact: function (_1, _2, _3, _4) { return new Composite ("UnaryFact", [_1.cst (), _2.cst (), _3.cst (), _4.cst ()]); },
	    NonaryFact: function (_1) { return new Composite ("NonaryFact", [_1.cst ()] ); },
	    FactIdentifier: function (_1) { return new Composite ("FactIdentifier", [_1.cst ()]); },
	    FactFormal: function (_1) { return new Composite ("FactFormal", [_1.cst ()]); },

	});
    return semantics;
}

