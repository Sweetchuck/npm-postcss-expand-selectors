# PostCSS Expand Selectors

[![CircleCI](https://circleci.com/gh/Sweetchuck/npm-postcss-expand-selectors/tree/1.x.svg?style=svg)](https://circleci.com/gh/Sweetchuck/npm-postcss-expand-selectors/?branch=1.x)
[![codecov](https://codecov.io/gh/Sweetchuck/npm-postcss-expand-selectors/branch/1.x/graph/badge.svg?token=HSF16OGPyr)](https://app.codecov.io/gh/Sweetchuck/npm-postcss-expand-selectors/branch/1.x)


[PostCSS] plugin to expand comma separated selectors into individual rules.

**SCSS source**
```scss
a {
  e: f;
}

b,
c {
  g: h;
}

d {
  i: j;
}
```

Compile the SCSS files with these options: `{ sourceComments: true, outputStyle: 'expanded' }`

**CSS before**
```css
a {
  e: f;
}

/* line 4, style.css */
b,
c {
  g: h;
}

d {
  i: j;
}
```


## Usage

```javascript
postcss([ require('postcss-expand-selectors') ])
```


**CSS after**
```css
a {
  e: f;
}

/* line 4, style.css */
b {
  g: h;
}

/* line 4, style.css */
c {
  g: h;
}

d {
  i: j;
}
```


## When to use this plugin

If there are no comma separated selectors in a rule then you can get a
more accurate CSS coverage report from Google Chrome with Puppeteer.

So use this plugin only when you prepare your application for CSS coverage
generation with Google Chrome, but do not use this plugin when you create
production release.

[PostCSS]: https://postcss.org/
