/**
* @license Apache-2.0
*
* Copyright (c) 2023 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/

'use strict';

// MODULES //

var isNonNegativeInteger = require( '@stdlib/assert-is-nonnegative-integer' ).isPrimitive;
var isString = require( '@stdlib/assert-is-string' ).isPrimitive;
var isBoolean = require( '@stdlib/assert-is-boolean' ).isPrimitive;
var base = require( '@stdlib/slice-base-seq2slice' );
var format = require( '@stdlib/string-format' );


// MAIN //

/**
* Converts a subsequence string to a Slice object.
*
* ## Notes
*
* -   A subsequence string has the following format:
*
*     ```text
*     <start>:<stop>:<increment>
*     ```
*
*     where
*
*     -   If an `increment` is not specified, the default increment is `1`. An increment of zero is **not** allowed.
*     -   The `start` index is **inclusive**.
*     -   The `stop` index is **exclusive**.
*     -   Both `start` and `stop` indices are _optional_. If not provided, `start` and `stop` default to index extremes. Which extremes correspond to which index depends on whether the `increment` is positive or negative.
*     -   Both `start` and `stop` can be negative; in which case, the corresponding index is resolved by subtracting the respective value from the provided length `len`.
*     -   Both `start` and `stop` can use the `end` keyword (e.g., `end-2::2`, `end-3:`, etc), which supports basic subtraction and division.
*     -   The `end` keyword resolves to the provided length `len`. Thus, `:-1` is equivalent to `:end-1`, `:-2` is equivalent to `:end-2`, and so on and so forth. The exception is when performing a division operation when the `increment` is less than zero; in which case, `end` is equal to `len-1` in order to preserve user expectations when `end/d` equals a whole number and slicing from right-to-left. The result from a division operation is **rounded down** to the nearest integer value.
*
* -   When `strict` is `false`, the resolved slice start is clamped to the slice index bounds (i.e., `[0, len)`).
*
* -   When `strict` is `false`, the resolved slice end is upper bound clamped to `len` (i.e., one greater than the last possible index).
*
* -   When the increment is negative, the resolved slice end value may be `null`, thus indicating that a non-empty slice should include the first index.
*
* -   The function ensures that results satisfy the convention that `:n` combined with `n:` is equivalent to `:` (i.e., selecting all elements).
*
* -   When `len` is zero, the function always returns a Slice object equivalent to `0:0:<increment>`.
*
* @param {string} str - input string
* @param {NonNegativeInteger} len - maximum number of elements allowed in the slice
* @param {boolean} strict - boolean indicating whether to enforce strict bounds checking
* @throws {TypeError} first argument must be a valid subsequence string
* @throws {TypeError} second argument must be a nonnegative integer
* @throws {TypeError} third argument must be a boolean
* @throws {RangeError} a subsequence string must have a non-zero increment
* @throws {RangeError} a subsequence string resolves to a slice which exceeds index bounds
* @returns {Slice} Slice object
*
* @example
* var s = seq2slice( '0:10:1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 10
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( '::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 9
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( ':0:-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 9
*
* v = s.stop;
* // returns 0
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( '4::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 4
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( '::', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 10
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( ':end:', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 10
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( 'end::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 9
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( 'end-2::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 8
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( 'end/2::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 4
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( 'end:end/2:-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 9
*
* v = s.stop;
* // returns 4
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( ':end/2:-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 9
*
* v = s.stop;
* // returns 4
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( ':end/2:1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 5
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( ':end/3', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 3
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( 'end/3::-1', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 3
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( 'end/3::', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 3
*
* v = s.stop;
* // returns 10
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( 'end/3::', 9, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 3
*
* v = s.stop;
* // returns 9
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( 'end/3::-1', 9, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 2
*
* v = s.stop;
* // returns null
*
* v = s.step;
* // returns -1
*
* @example
* var s = seq2slice( '5:5', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 5
*
* v = s.stop;
* // returns 5
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( '5:5', 0, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 0
*
* v = s.stop;
* // returns 0
*
* v = s.step;
* // returns 1
*
* @example
* var s = seq2slice( 'end:', 10, false );
* // returns <Slice>
*
* var v = s.start;
* // returns 10
*
* v = s.stop;
* // returns 10
*
* v = s.step;
* // returns 1
*/
function seq2slice( str, len, strict ) {
	var code;
	var s;
	if ( !isString( str ) ) {
		throw new TypeError( format( 'invalid argument. First argument must be a valid subsequence string. Value: `%s`.', str ) );
	}
	if ( !isNonNegativeInteger( len ) ) {
		throw new TypeError( format( 'invalid argument. Second argument must be a nonnegative integer. Value: `%s`.', len ) );
	}
	if ( !isBoolean( strict ) ) {
		throw new TypeError( format( 'invalid argument. Third argument must be a boolean. Value: `%s`.', strict ) );
	}
	s = base( str, len, strict );
	code = s.code;
	if ( code === void 0 ) {
		return s;
	}
	if ( code === 'ERR_SLICE_INVALID_INCREMENT' ) {
		throw new RangeError( format( 'invalid argument. A subsequence string must have a non-zero increment. Value: `%s`.', str ) );
	}
	if ( code === 'ERR_SLICE_OUT_OF_BOUNDS' ) {
		throw new RangeError( format( 'invalid argument. The subsequence string resolves to a slice which exceeds index bounds. Value: `%s`.', str ) );
	}
	// code === 'ERR_SLICE_INVALID_SUBSEQUENCE'
	throw new TypeError( format( 'invalid argument. First argument must be a valid subsequence string. Value: `%s`.', str ) );
}


// EXPORTS //

module.exports = seq2slice;
