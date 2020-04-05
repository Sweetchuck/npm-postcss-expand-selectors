
# PostCSS Expand Selectors

[![Build Status](https://travis-ci.org/Cheppers/postcss-expand-selectors.svg?branch=master)](https://travis-ci.org/Cheppers/postcss-expand-selectors)

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

If there are no somma separated selectors in a rule then you can get a
more accurate CSS coverage report from Google Chrome with Puppeteer.

So use this plugin only when you prepare your application for CSS coverage
generatation with Google Chrome, but do not use this plugin when you create
production release.
