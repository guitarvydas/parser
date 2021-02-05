#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs util.js read.mjs ohm.mjs parser.js semantics.js >_parser.js
cat template.js util.mjs nodes.mjs transpiler.js >_transpiler.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs util.mjs idents.js >_idents.js
cat nodes.mjs read.mjs util.mjs walk.js viz2.js >_viz2.js

#node _parser.js ohm.ohm <matcher.scl | node _idents 
node _parser.js ohm.ohm <matcher.scl | node _idents >_1.json
echo
echo "*** viz ***"
#node _parser.js ohm.ohm <matcher.scl | node _idents >_scanned.json
#node _viz2 <_scanned.json
node _parser.js ohm.ohm <matcher.scl | node _idents | node _viz2


