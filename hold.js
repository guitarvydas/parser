



	// line(x). --> fact1 ("line", functor0 ("a"));
	// UnaryFact = FactIdentifier "(" FactFormal ")" --> fact1 ($FactIdentifier, functor0 ($FactFormal))
	if ("UnaryFact" === obj.node) {
            //   obj ~ /[fid] ( [fformal] )/ => `fact1 (${fid}, functor0 (${fformal}));`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    var fformal = dig ("FactFormal", obj.children[2]);
	    return `fact1 ("${fid}", functor0 ("${fformal}"));`;
        };

	// NonaryFact = FactIdentifier --> `fact0 ($FactIdentifier)`
	if ("NonaryFact" === obj.node) {
            //   obj ~ /[fid]/ => `fact0 (${fid});`
	    var fid = dig ("FactIdentifier", obj.children[0]);
	    return `fact0 ("${fid}")`;
	    return null;
        };



	if ("BinaryFunctor" === obj.node) {
	    // BinaryFunctor = id "(" Formal "," Formal ")"
	    //              0   1  2       3  4      5
p	    var id = digText (obj.children [0]);
	    var f1 = walk (obj.children [2]);
	    var f2 = walk (obj.children [4]);
	    var s = `"${id}", ${f1}, ${f2}`;
	    return s;
	}

	if ("MatchFactor" === obj.node ) {
	    // MatchFactor = (MatchAtom "&")*  MatchAtom
	    //                0          1     2
	    var matchAtomStar = walk (obj.children [0]);
	    var lastMatchAtom = walk (obj.children [2]);
	    if (matchAtomStar) {
		return `LAND (${matchAtomStar}, ${lastMatchAtom})`;
	    } else {
		return `${lastMatchAtom}`;
	    }
	}

	if ("NonaryFunctor" === obj.node) {
	    var v = digText (obj);
	    return `"${v}"`;
	}

	if ("logicVar" === obj.node) {
	    var lvid = digText (obj);
	    return `lvar ("${lvid}")`;
        };

	if ("Keyword" === obj.node) {
	    var text = digText (obj);
	    return `${text} ()`;
        };

