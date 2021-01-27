var fs = require ('fs');
var ohm = require ('ohm-js');

function main (grammarPath) {
    var grammar = fs.readFileSync (grammarPath, 'utf8');
    var sclSource = fs.readFileSync (0, 'utf-8');  // SCL == DSL but more specific
    console.log (sclSource);
}

main ('ohm.ohm');


// const grammars = ohm.grammars (matcherGrammar);
// const grammar = grammars["Matcher"];
// var args = require('minimist') (process.argv.slice (2));
// var inputFilename = args['input'];
// const input = fs.readFileSync("./" + inputFilename);
// const parseTree = grammar.match (input);

// if (parseTree.failed ()) {
    
//     console.log ("Matching Failed")
//     var tr = grammar.trace (input);
//     console.log (tr.toString ());

//     throw ("parse error");

// } else {
//     // console.log ("Matching Succeeded")
// };
