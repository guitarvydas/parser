#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat parser.js semantics.js >combined.js
node combined.js ohm.ohm <test.scl | node viz
node combined.js ohm.ohm <test.scl | node idents | node viz
