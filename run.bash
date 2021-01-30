#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs parser.js semantics.js >_parser.js
node _parser.js ohm.ohm <matcher.scl >temp.json #? node --inspect viz <temp.json
echo
echo '0----------'
echo
node _parser.js ohm.ohm <matcher.scl | node viz
echo
echo '1----------'
echo
node _parser.js ohm.ohm <matcher.scl | node idents | node viz
echo
echo '2----------'
echo
node _parser.js ohm.ohm <matcher.scl | node walker-template | node viz
echo

# echo '3----------'
# echo
# node _parser.js ohm.ohm <matcher.scl | node idents | node walker-template | node viz
# echo
# echo '4----------'
# echo
# node _parser.js ohm.ohm <matcher.scl | node walker-template | node viz
# node _parser.js ohm.ohm <matcher.scl | node idents2 | node viz

# echo '5----------'
# echo
# node _parser.js ohm.ohm <matcher.scl >temp0.json
# node _parser.js ohm.ohm <matcher.scl | node idents2 >temp.json
# node _parser.js ohm.ohm <matcher.scl | node idents2 | node walker-template | node viz


#
# .text
