<!--

@license Apache-2.0

Copyright (c) 2023 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# seq2slice

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Convert a subsequence string to a [`Slice`][@stdlib/slice/ctor] object.

<!-- Section to include introductory text. Make sure to keep an empty line after the intro `section` element and another before the `/section` close. -->

<section class="intro">

</section>

<!-- /.intro -->

<!-- Package usage documentation. -->



<section class="usage">

## Usage

To use in Observable,

```javascript
seq2slice = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/slice-seq2slice@umd/browser.js' )
```
The previous example will load the latest bundled code from the umd branch. Alternatively, you may load a specific version by loading the file from one of the [tagged bundles](https://github.com/stdlib-js/slice-seq2slice/tags). For example,

```javascript
seq2slice = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/slice-seq2slice@v0.0.1-umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var seq2slice = require( 'path/to/vendor/umd/slice-seq2slice/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/slice-seq2slice@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.seq2slice;
})();
</script>
```

<a name="main"></a>

#### seq2slice( str, len, strict )

Converts a subsequence string to a [`Slice`][@stdlib/slice/ctor] object, where `len` specifies the maximum number of elements allowed in the slice.

```javascript
var s = seq2slice( ':5', 10, false );
// returns <Slice>

var v = s.start;
// returns 0

v = s.stop;
// returns 5

v = s.step;
// returns 1
```

A subsequence string has the following format:

```text
<start>:<stop>:<increment>
```

where

-   If an `increment` is not specified, the default increment is `1`. An increment of zero is **not** allowed.
-   The `start` index is **inclusive**.
-   The `stop` index is **exclusive**.
-   Both `start` and `stop` indices are _optional_. If not provided, `start` and `stop` default to index extremes. Which extremes correspond to which index depends on whether the `increment` is positive or negative. 
-   Both `start` and `stop` can be negative; in which case, the corresponding index is resolved by subtracting the respective value from the provided length `len`.
-   Both `start` and `stop` can use the `end` keyword (e.g., `end-2::2`, `end-3:`, etc), which supports basic subtraction and division.
-   The `end` keyword resolves to the provided length `len`. Thus, `:-1` is equivalent to `:end-1`, `:-2` is equivalent to `:end-2`, and so on and so forth. The exception is when performing a division operation when the `increment` is less than zero; in which case, `end` is equal to `len-1` in order to preserve user expectations when `end/d` equals a whole number and slicing from right-to-left. The result from a division operation is **rounded down** to the nearest integer value.

```javascript
var s = seq2slice( 'end:2:-1', 10, false );
// returns <Slice>

var v = s.start;
// returns 9

v = s.stop;
// returns 2

v = s.step;
// returns -1

s = seq2slice( 'end-2:2:-1', 10, false );
// returns <Slice>

v = s.start;
// returns 8

v = s.stop;
// returns 2

v = s.step;
// returns -1

s = seq2slice( 'end/2:2:-1', 10, false );
// returns <Slice>

v = s.start;
// returns 4

v = s.stop;
// returns 2

v = s.step;
// returns -1
```

When `strict` is `true`, the function throws an error if a subsequence string resolves to a slice exceeding index bounds.

<!-- run throws: true -->

```javascript
var s = seq2slice( '10:20', 10, true );
// throws <RangeError>
```

</section>

<!-- /.usage -->

<!-- Package usage notes. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="notes">

## Notes

-   When `len` is zero, the function always returns a Slice object equivalent to `0:0:<increment>`.
-   When `strict` is `false`, the resolved slice start is clamped to the slice index bounds (i.e., `[0, len)`).
-   When `strict` is `false`, the resolved slice end is upper bound clamped to `len` (i.e., one greater than the last possible index).
-   When the increment is negative, the resolved slice end value may be `null`, thus indicating that a non-empty slice should include the first index.
-   The function ensures that results satisfy the convention that `:n` combined with `n:` is equivalent to `:` (i.e., selecting all elements). This convention matches Python slice semantics, but diverges from the MATLAB convention where `:n` and `n:` overlap by one element. 
-   Unlike MATLAB, but like Python, the subsequence string is upper-bound exclusive. For example, in Python, `0:2` corresponds to the sequence `{0,1}`. In MATLAB, `1:3` corresponds to `{1,2,3}`.

</section>

<!-- /.notes -->

<!-- Package usage examples. -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/slice-seq2slice@umd/browser.js"></script>
<script type="text/javascript">
(function () {

var s = seq2slice( ':', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 5. step: 1.'

s = seq2slice( '2:', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 2. stop: 5. step: 1.'

s = seq2slice( ':3', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 3. step: 1.'

s = seq2slice( '2:4', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 2. stop: 4. step: 1.'

s = seq2slice( '1:4:2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 1. stop: 4. step: 2.'

s = seq2slice( '2::2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 2. stop: 5. step: 2.'

s = seq2slice( ':-2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 3. step: 1.'

s = seq2slice( ':-1:2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 4. step: 2.'

s = seq2slice( '-4:-1:2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 1. stop: 4. step: 2.'

s = seq2slice( '-5:-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 4. step: 1.'

s = seq2slice( '::-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 4. stop: null. step: -1.'

s = seq2slice( ':0:-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 4. stop: 0. step: -1.'

s = seq2slice( '3:0:-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 3. stop: 0. step: -1.'

s = seq2slice( '-1:-4:-2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 4. stop: 1. step: -2.'

s = seq2slice( ':end', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 5. step: 1.'

s = seq2slice( ':end-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 4. step: 1.'

s = seq2slice( ':end/2', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 0. stop: 2. step: 1.'

s = seq2slice( 'end/2::-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 2. stop: null. step: -1.'

s = seq2slice( 'end-2::-1', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 3. stop: null. step: -1.'

s = seq2slice( 'end/2:', 5, false );
console.log( 'start: %s. stop: %s. step: %s.', s.start, s.stop, s.step );
// => 'start: 2. stop: 5. step: 1.'

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

<!-- Section to include cited references. If references are included, add a horizontal rule *before* the section. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="references">

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2023. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/slice-seq2slice.svg
[npm-url]: https://npmjs.org/package/@stdlib/slice-seq2slice

[test-image]: https://github.com/stdlib-js/slice-seq2slice/actions/workflows/test.yml/badge.svg?branch=v0.0.1
[test-url]: https://github.com/stdlib-js/slice-seq2slice/actions/workflows/test.yml?query=branch:v0.0.1

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/slice-seq2slice/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/slice-seq2slice?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/slice-seq2slice.svg
[dependencies-url]: https://david-dm.org/stdlib-js/slice-seq2slice/main

-->

[chat-image]: https://img.shields.io/gitter/room/stdlib-js/stdlib.svg
[chat-url]: https://app.gitter.im/#/room/#stdlib-js_stdlib:gitter.im

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/slice-seq2slice/tree/deno
[umd-url]: https://github.com/stdlib-js/slice-seq2slice/tree/umd
[esm-url]: https://github.com/stdlib-js/slice-seq2slice/tree/esm
[branches-url]: https://github.com/stdlib-js/slice-seq2slice/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/slice-seq2slice/main/LICENSE

[@stdlib/slice/ctor]: https://github.com/stdlib-js/slice-ctor/tree/umd

</section>

<!-- /.links -->
