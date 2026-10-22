"use strict";var o=function(r,e){return function(){try{return e||r((e={exports:{}}).exports,e),e.exports}catch(n){throw (e=0, n)}};};var t=o(function(E,s){
var v=require('@stdlib/assert-is-nonnegative-integer/dist').isPrimitive,g=require('@stdlib/assert-is-string/dist').isPrimitive,m=require('@stdlib/assert-is-boolean/dist').isPrimitive,l=require('@stdlib/slice-base-seq2slice/dist'),i=require('@stdlib/error-tools-fmtprodmsg/dist');function d(r,e,n){var a,u;if(!g(r))throw new TypeError(i('1j5Ej',r));if(!v(e))throw new TypeError(i('1j53X',e));if(!m(n))throw new TypeError(i('1j5AL',n));if(u=l(r,e,n),a=u.code,a===void 0)return u;throw a==="ERR_SLICE_INVALID_INCREMENT"?new RangeError(i('1j5Ek',r)):a==="ERR_SLICE_OUT_OF_BOUNDS"?new RangeError(i('1j5El',r)):new TypeError(i('1j5Ej',r))}s.exports=d
});var c=t();module.exports=c;
/** @license Apache-2.0 */
//# sourceMappingURL=index.js.map
