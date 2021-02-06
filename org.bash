#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs util.mjs read.mjs ohm.mjs parser.js semantics.js >_parser.js
cat template.js util.mjs nodes.mjs transpiler.js >_transpiler.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs read.mjs util.mjs idents.js >_idents.js
cat nodes.mjs read.mjs util.mjs walk.js org.js >_org.js

node _parser.js ohm.ohm <matcher.scl | node _idents | node _org


