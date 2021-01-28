var fs = require ('fs');
var ohm = require ('ohm-js');

function main (grammarPath) {
    var grammarSource = fs.readFileSync (grammarPath, 'utf8');
    var sclSource = fs.readFileSync (0, 'utf-8');  // SCL <== DSL but more specific
    var grammar = ohm.grammar (grammarSource);
    const parseTree = grammar.match (sclSource);
    if (parseTree.failed ()) {
	console.log ("Matching Failed")
	var tr = grammar.trace (sclSource);
	console.log (tr.toString ());
	throw ("parse error");
    } else {
	// console.log ("Matching Succeeded")
	var sem = makeSemantics (grammar);
	var cst = sem (parseTree).cst ();
	console.log (JSON.stringify (cst));
    };
}

main ('ohm.ohm');
