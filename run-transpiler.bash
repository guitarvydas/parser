#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat nodes.mjs util.mjs read.mjs ohm.mjs parser.js semantics.js >_parser.js
cat nodes.mjs read.mjs util.mjs idents.js >_idents.js
cat nodes.mjs read.mjs util.mjs walk.js transpiler.js >_transpiler.js

node _parser.js ohm.ohm <matcher.scl | node _idents | node _transpiler



