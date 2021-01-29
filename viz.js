const fs = require ('fs');

function readJSONFromStdin () {
    var jsonText = fs.readFileSync (0, 'utf-8'); 
    const obj = JSON.parse (jsonText);
    return obj;
}

function spaces (depth) {
    var i;
    for (i = 0 ; i < depth ; i += 1) {
	process.stdout.write (' ');
    }
}

function unparse (depth, obj) {
    if (obj) {
      if (Array.isArray (obj)) {
	  if (0 < obj.length) {
	      obj.forEach (x => { unparse (depth, x) });
	  }
      } else if (obj.node === "_terminal") {
	  spaces (depth);
	  process.stdout.write (obj.primitiveValue + '\n');
      } else if (obj.node === "kw") {
	  spaces (depth);
	  process.stdout.write (`kw[${obj.value}]\n`);
      } else if (obj.node === "literal") {
	  spaces (depth);
	  process.stdout.write (`[${obj.value}]\n`);
      } else if (obj.node === "logicVar") {
	  spaces (depth);
	  process.stdout.write (`lv[${obj.value}]\n`);
      } else {
	  spaces (depth);
	  process.stdout.write (obj.node + '\n');
	  if (obj.children) {
	      obj.children.forEach (x => { unparse (depth + 1, x); });
	  }
      }
    }
}


var tree = readJSONFromStdin ();
unparse (0, tree);
console.log ('done');
