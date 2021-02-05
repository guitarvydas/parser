function walk (obj, depth, fn) {
    if (obj === undefined || obj === null) {
        throw "Internal error in walk";
    }
    if (Array.isArray (obj)) {
        var a = obj.map (x => { return walk (x, depth, fn); });
        return a.join ('');
    } else if ("_collection"  === obj.node) {
        if (0 >= obj.children.length) {
            return "";
        } else {
            if (isCompositeNode (obj)) {
                return obj.children.map (x => { return walk (x, depth, fn); });
	    }
        }
        return "";
    } else {
        // _leaf and _composite nodes come here
        var r = fn (obj, depth, fn);
        return r;
    };
}
