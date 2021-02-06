function spaces (depth) {
    var i;
    var s = "";
    for (i = 0 ; i < depth ; i += 1) {
        s = s + ' ';
    }
    return s;
}

function viz (obj, depth, fn) {
    if (isLeafNode (obj)) {
        var s = spaces (depth);
        return `\n${s} ${obj.value}`;
    } else if (isCompositeNode (obj)) {
        var s = spaces (depth);
        var w = walk (obj.children, depth + 1, fn);
        return `\n${s} ${obj.node}${w}`;
    } else {
        throw "internal error in viz";
    }
}

var argv = process.argv.slice (1);
var JSONtree = getJSON (argv[1]);
var s = walk (JSONtree, 1, viz);
console.log (s);

