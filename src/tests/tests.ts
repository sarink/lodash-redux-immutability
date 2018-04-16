require('mocha/mocha');
require('mocha/mocha.css');

mocha.setup('bdd');

require('./lodash-redux-immutability-tests');

mocha.run();
