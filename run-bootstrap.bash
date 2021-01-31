#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs parser.js semantics.js >_parser.js
cat nodes.mjs walker-template.js >_walker-template.js
cat nodes.mjs idents-bootstrap.js >_idents-bootstrap.js
cat nodes.mjs idents.js >_idents.js
cat nodes.mjs viz.js >_viz.js
# bootstrap commented out...
# node _parser.js ohm.ohm <matcher.scl >temp.json #? node --inspect viz <temp.json
# echo
# echo '0----------'
# echo
# node _parser.js ohm.ohm <matcher.scl | node _viz
# echo
# echo '1----------' 'bootstrap'
# echo
# node _parser.js ohm.ohm <matcher.scl | node _idents-bootstrap | node _viz
# echo
# echo '2----------'
# echo
# node _parser.js ohm.ohm <matcher.scl >temp1.json
# echo '2a----------'
# node _parser.js ohm.ohm <matcher.scl | node _walker-template >temp2.json
# echo '2b----------'
# node _parser.js ohm.ohm <matcher.scl | node _walker-template | node _viz
# echo


echo '5----------'
echo
# node _parser.js ohm.ohm <matcher.scl >temp1.json
# node _parser.js ohm.ohm <matcher.scl | node _idents >temp2.json
node _parser.js ohm.ohm <matcher.scl | node _idents | node _walker-template | node _viz

