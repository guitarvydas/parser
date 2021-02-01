function Leaf (val) {
    return { node: "_leaf", value: val };
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

function isStarNode (obj) {
    return isNode (obj) && (obj.node === "_star");
}

function isCompositeNode (obj) {
    return (isNode (obj) && !isLeafNode (obj)) ||
     (isStarNode (obj));
}
