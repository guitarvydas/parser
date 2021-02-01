#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs utils.js parser.js semantics.js >_parser.js
cat nodes.mjs walker-template.js >_walker-template.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs util.js idents.js >_idents.js
cat nodes.mjs viz.js >_viz.js
node _parser.js ohm.ohm <matcher.scl | node _idents | node _walker-template | node _viz

