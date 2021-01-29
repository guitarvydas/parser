#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat parser.js semantics.js >_parser.js
node _parser.js ohm.ohm <matcher.scl >temp.out # node --inspect viz <temp.out
node _parser.js ohm.ohm <matcher.scl | node viz
echo
echo '----------'
echo
node _parser.js ohm.ohm <matcher.scl | node idents | node viz
# node _parser.js ohm.ohm <matcher.scl | node idents | node matcher-semantics
