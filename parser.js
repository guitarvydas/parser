var fs = require ('fs');
var ohm = require ('ohm-js');


function getSCLSource (fname) {
    if (fname === undefined || fname === null || fname === "-") {
	return fs.readFileSync (0, 'utf-8');  // SCL <== DSL but more specific
    } else {
	return fs.readFileSync (fname);
    }	
}

function main () {
    var argv = process.argv.slice (1);
    grammarPath = argv [1];
    var grammarSource = fs.readFileSync (grammarPath, 'utf8');
    var sclSource = getSCLSource (argv [2]);
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

main ();
