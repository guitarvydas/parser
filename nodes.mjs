function Leaf (val) {
    return { node: "_leaf", value: val };
}

function Emit (val) {
    return { node: "_emit", value: val };
}

function Composite (name, children) {
    return { node: name, children: children };
}

function isNode (obj) {
    if (obj && obj.node) {
        return true;
	// return obj.children || obj.value;
    } else {
	return false;
    }
}    

function isLeafNode (obj) {
    return isNode (obj) && (obj.node === "_leaf");
}

function isEmitNode (obj) {
    return isNode (obj) && (obj.node === "_emit");
}

function isStarNode (obj) {
    return isNode (obj) && (obj.node === "_star");
}

function isCompositeNode (obj) {
    return (isNode (obj) && !isLeafNode (obj)) ||
     (isStarNode (obj));
}
