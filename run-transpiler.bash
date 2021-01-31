#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#

# includes
cat nodes.mjs parser.js semantics.js >_parser.js
cat nodes.mjs walker-template.js >_walker-template.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs util.js idents.js >_idents.js
cat nodes.mjs viz.js >_viz.js
cat nodes.mjs util.js transpiler.js >_transpiler.js

#
node _parser.js ohm.ohm <matcher.scl | node _idents | node _viz
node _parser.js ohm.ohm <matcher.scl | node _idents | node _transpiler
