require('mocha/mocha');
require('mocha/mocha.css');

mocha.setup('bdd');

require('./deleteIn-tests');
require('./getIn-tests');
// require('./mergeDeep-tests');
require('./setIn-tests');
require('./updateIn-tests');

mocha.run();
