'use strict';

const postCss = require('postcss');

const plugin = require('./');

/**
 * @param {Object} pluginOptions
 * @param {Object} processOptions
 * @param {string} input
 * @param {string} expected
 *
 * @return {Promise<Result>}
 */
function run(pluginOptions, input, processOptions, expected) {
    if (!Object.prototype.hasOwnProperty.call(processOptions, 'from')) {
        processOptions.from = undefined;
    }

    return postCss([plugin(pluginOptions)])
        .process(input, processOptions)
        .then(result => {
            expect(result.css).toEqual(expected);
            expect(result.warnings()).toHaveLength(0);
        });
}

it('without any comment; only rule', () => {
    const input = [
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('without any comment; first rule', () => {
    const input = [
        'b,',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    const expected = [
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('without any comment; last rule', () => {
    const input = [
        'a {',
        '  e: f;',
        '}',
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        'a {',
        '  e: f;',
        '}',
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with debug comment; only rule', () => {
    const input = [
        '/* line 42, a.scss */',
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        '/* line 42, a.scss */',
        'b {',
        '  g: h;',
        '}',
        '/* line 42, a.scss */',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with debug comment; first rule', () => {
    const input = [
        '/* line 42, a.scss */',
        'b,',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    const expected = [
        '/* line 42, a.scss */',
        'b {',
        '  g: h;',
        '}',
        '/* line 42, a.scss */',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with debug comment; last rule', () => {
    const input = [
        'a {',
        '  e: f;',
        '}',
        '/* line 42, a.scss */',
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        'a {',
        '  e: f;',
        '}',
        '/* line 42, a.scss */',
        'b {',
        '  g: h;',
        '}',
        '/* line 42, a.scss */',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with regular comment; only rule', () => {
    const input = [
        '/* Foo */',
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        '/* Foo */',
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with regular comment; first rule', () => {
    const input = [
        '/* Foo */',
        'b,',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    const expected = [
        '/* Foo */',
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}',
        'd {',
        '  i: j;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('with regular comment; last rule', () => {
    const input = [
        'a {',
        '  e: f;',
        '}',
        '/* Foo */',
        'b,',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    const expected = [
        'a {',
        '  e: f;',
        '}',
        '/* Foo */',
        'b {',
        '  g: h;',
        '}',
        'c {',
        '  g: h;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});

it('four selectors', () => {
    const input = [
        'a,',
        'b,',
        'c,',
        'd {',
        '  e: f;',
        '}'
    ].join('\n');

    const expected = [
        'a {',
        '  e: f;',
        '}',
        'b {',
        '  e: f;',
        '}',
        'c {',
        '  e: f;',
        '}',
        'd {',
        '  e: f;',
        '}'
    ].join('\n');

    return run({}, input, {}, expected);
});
