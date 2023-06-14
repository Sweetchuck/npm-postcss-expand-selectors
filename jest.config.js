
module.exports = {
    testEnvironment: 'node',
    verbose: true,
    testRegex: '\\.test\\.js$',

    moduleFileExtensions: [
        'js'
    ],

    collectCoverage: true,
    collectCoverageFrom: [
        'index.js'
    ],
    coverageDirectory: 'log/coverage',
    coverageReporters: [
        'html',
        'json',
        'lcov'
    ],
};
