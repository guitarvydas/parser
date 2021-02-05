function identity (obj, depth, fn) {
    if (isLeafNode (obj)) {
	return obj;
    } else {
	return new Composite (obj.node, walk (obj.children, depth, fn););
    }
}
