#!/bin/bash
# prerequisites:
# npm install ohm-js
# npm install fs
#
cat parser.js semantics.js >combined.js
node combined.js <test.scl >temp.js
node idents <temp.js

