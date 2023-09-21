"use strict";var o=function(e,r){return function(){return r||e((r={exports:{}}).exports,r),r.exports}};var t=o(function(E,s){
var v=require('@stdlib/assert-is-nonnegative-integer/dist').isPrimitive,g=require('@stdlib/assert-is-string/dist').isPrimitive,m=require('@stdlib/assert-is-boolean/dist').isPrimitive,l=require('@stdlib/slice-base-seq2slice/dist'),i=require('@stdlib/error-tools-fmtprodmsg/dist');function d(e,r,a){var n,u;if(!g(e))throw new TypeError(i('1j5Ej',e));if(!v(r))throw new TypeError(i('1j53X',r));if(!m(a))throw new TypeError(i('1j5AL',a));if(u=l(e,r,a),n=u.code,n===void 0)return u;throw n==="ERR_SLICE_INVALID_INCREMENT"?new RangeError(i('1j5Ek',e)):n==="ERR_SLICE_OUT_OF_BOUNDS"?new RangeError(i('1j5El',e)):new TypeError(i('1j5Ej',e))}s.exports=d
});var c=t();module.exports=c;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
