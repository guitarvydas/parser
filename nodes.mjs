function Leaf (val) {
    return { node: "_leaf", value: val };
}

function Composite (name, children) {
    return { node: name, children: children };
}
