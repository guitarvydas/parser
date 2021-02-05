function getSCLSource (fname) {
    return getNamedFile (fname);
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
