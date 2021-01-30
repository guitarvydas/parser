function makeSemantics (grammar) {
    const semantics = grammar.createSemantics ();
    semantics.addOperation(
	'cst',
	{
	    MatcherStatement: function (_1s) { return {node: "MatcherStatement", children: _1s.cst ()}; }, //Statement+
	    Statement: function (_1, _2) { return {node: "Statement", children: [_1.cst (), _2.cst ()]}; }, //(ClearStatement | Query | Rule | Fact) ";"

	    ClearStatement: function (_1) { return {node: "ClearStatement", children: [_1.cst ()]}; }, //"clear"
	    Rule: function (_1, _2, _3s, _4s, _5) {
		var _3 = _3s.cst ();
		var _4 = _4s.cst ();
		if (0 < _3.length) {
		    return {node: "Rule", children: [_1.cst (), _2.cst (), {node: "star", children: [_3, _4]}, _5.cst ()]}; //Head "=" (Body "|")* Body
		} else {
		    return {node: "Rule", children: [_1.cst (), _2.cst (), _5.cst ()]}; //Head "=" Body
		}
	    },
	    Fact: function (_1) {return {node: "Fact", children: [_1.cst ()]}; }, //Head
	    Query: function (_1, _2, _3, _4) { return {node: "Query", children:[_1.cst (), _2.cst (), _3.cst (), _4.cst ()]}; }, //"query" "(" MatchExpression ")"

	    Subject: function (_1) { return {node: "Subject", children:[_1.cst ()]}; }, //Primary
	    Object: function (_1) { return {node: "Object", children:[_1.cst ()]}; }, //Primary

	    Head: function (_1) { return {node: "Head", children:[_1.cst ()]}; }, //BinaryHead | UnaryHead | NonaryHead
	    BinaryHead: function (_1, _2, _3, _4, _5, _6) { return {node: "BinaryHead", children:[_1.cst (), _2.cst (), _3.cst (), _4.cst (), _5.cst(), _6.cst ()]}; }, //identifier "(" Formal "," Formal ")"
	    UnaryHead: function (_1, _2, _3, _4) { return {node: "UnaryHead", children:[_1.cst (), _2.cst (), _3.cst (), _4.cst ()]}; }, //identifier "(" Formal ")"
	    NonaryHead: function (_1) { return {node: "NonaryHead", children:[_1.cst ()]}; }, //identifier
	    Body: function (_1) { return {node: "Body", children:[_1.cst ()]}; }, //MatchExpression

	    Formal: function (_1) { return {node: "Formal", children:[_1.cst ()]}; }, //BinaryFunctor | UnaryFunctor | NonaryFunctor | logicVariable | identifier
	    MatchExpression: function (_1) { return {node: "MatchExpression", children:[_1.cst ()]}; }, //MatchFactor
	    MatchFactor: function (_1s, _2s, _3) { 
		var _1 = _1s.cst ();
		var _2 = _2s.cst ();
		if (0 < _1.length) {
		    return {node:"MatchFactor", children:[{node: "star", children: [_1, _2]}, _3.cst ()]}; //(MatchAtom "&")*  MatchAtom
		} else {
		    return {node:"MatchFactor", children: [_3.cst ()]}; // MatchAtom
		}
	    },
	    MatchAtom: function (_1) { return {node: "MatchAtom", children:[_1.cst ()]}; }, //Keyword | BinaryFunctor | UnaryFunctor | NonaryFunctor
	    Keyword: function (_1) { return {node: "Keyword", children:[_1.cst ()]}; }, //kwCut | kwSucceed | kwFail
	    kwCut: function (_1) { return {node: "kwCut", children:[_1.cst ()]}; }, //"cut"
	    kwSucceed: function (_1) { return {node: "kwSucceed", children:[_1.cst ()]}; }, //"succeed"
	    kwFail: function (_1) { return {node: "kwFail", children:[_1.cst ()]}; }, //"fail"
	    BinaryFunctor: function (_1, _2, _3, _4, _5, _6) { return {node: "BinaryFunctor", children:[_1.cst (), _2.cst (), _3.cst (), _4.cst (), _5.cst (),_6.cst ()]}; }, //identifier "(" Primary "," Primary ")"
	    UnaryFunctor: function (_1, _2, _3, _4) { return {node: "UnaryFunctor", children:[_1.cst (), _2.cst (), _3.cst (), _4.cst ()]}; }, //identifier "(" Primary ")"
	    NonaryFunctor: function (_1) { return {node: "NonaryFunctor", children:[_1.cst ()]}; }, //identifier
	    Primary: function (_1) { return {node: "Primary", children:[_1.cst ()]}; }, //identifier | logicVariable
	    identifier: function (_1, _2s) {
		var _2sval = _2s.cst ();
		if (0 < _2sval.length) {
		    return {node: "identifier", children:[_1.cst (), {node: "star", children: _2sval}]}; //lowerCaseLetter identLetter*
		} else {
		    return {node: "identifier", children:[_1.cst ()]}
		}
	    },
	    logicVariable: function (_1, _2s) {
		var _2sval = _2s.cst ();
		if (0 < _2sval.length) {
		    return {node: "logicVariable", children:[_1.cst (), {node: "star", children: _2sval}]}; //lowerCaseLetter identLetter*
		} else {
		    return {node: "logicVariable", children:[_1.cst ()]}
		}
	    },
	    lowerCaseLetter: function (_1) { return {node: "lowerCaseLetter", children:[_1.cst ()]}; }, //"a" .. "z"
	    upperCaseLetter: function (_1) { return {node: "upperCaseLetter", children:[_1.cst ()]}; }, //"A" .. "Z"
	    identLetter: function (_1) { return {node: "identLetter", children:[_1.cst ()]}; }, //lowerCaseLetter | upperCaseLetter | "0" .. "9" | "_" | "-"
	    _terminal: function () { return {node: "_terminal", value: this.primitiveValue}; }
	});
    return semantics;
}
    
