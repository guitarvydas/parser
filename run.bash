#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs util.js parser.js semantics.js >_parser.js
cat template.js util.js nodes.mjs transpiler.js >_transpiler.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs util.js idents.js >_idents.js
cat nodes.mjs viz.js >_viz.js
cat nodes.mjs emit.js >_emit.js

#node _parser.js ohm.ohm <matcher.scl | node _idents 
node _parser.js ohm.ohm <matcher.scl | node _idents >_1.json
echo
echo "*** viz ***"
node _parser.js ohm.ohm <matcher.scl | node _idents | node _viz
echo
echo "*** transpiler ***"
node _transpiler _1.json

#node _parser.js ohm.ohm <matcher.scl | node _idents | node _emit
#node _parser.js ohm.ohm <matcher.scl | node _idents | node _transpiler | node _viz


