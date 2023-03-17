var Simple1DNoise = function() {
    var MAX_VERTICES = 256;
    var MAX_VERTICES_MASK = MAX_VERTICES -1;
    var amplitude = 1;
    var scale = 1;

    var r = [];

    for ( var i = 0; i < MAX_VERTICES; ++i ) {
        r.push(Math.random());
    }

    var getVal = function( x ){
        var scaledX = x * scale;
        var xFloor = Math.floor(scaledX);
        var t = scaledX - xFloor;
        var tRemapSmoothstep = t * t * ( 3 - 2 * t );

        /// Modulo using &
        var xMin = xFloor & MAX_VERTICES_MASK;
        var xMax = ( xMin + 1 ) & MAX_VERTICES_MASK;

        var y = lerp( r[ xMin ], r[ xMax ], tRemapSmoothstep );

        return y * amplitude;
    };

    /**
     * Linear interpolation function.
     * @param a The lower integer value
     * @param b The upper integer value
     * @param t The value between the two
     * @returns {number}
     */
    var lerp = function(a, b, t ) {
        return a * ( 1 - t ) + b * t;
    };

    // return the API
    return {
        getVal: getVal,
        setAmplitude: function(newAmplitude) {
            amplitude = newAmplitude;
        },
        setScale: function(newScale) {
            scale = newScale;
        }
    };
};
var noise = new Simple1DNoise()
// noise.setAmplitude(2)
// noise.setScale(2)
var params = new URLSearchParams(window.location.search)
var hueDeltaTime = (params.get("hueDeltaTime")?parseFloat(params.get("hueDeltaTime")):null)
var hueDeltaAngle = (params.get("hueDeltaAngle")?parseFloat(params.get("hueDeltaAngle")):null)
var useNoise = (params.get("useNoise")?params.get("useNoise")=='true':null)
globalThis.hueStartAngle = (params.get("hueStartAngle")?parseFloat(params.get("hueStartAngle")):360)
globalThis.hueFinishAngle = (params.get("hueFinishAngle")?parseFloat(params.get("hueFinishAngle")):0)
var time = 0
if (hueDeltaTime && hueDeltaAngle){
    console.log(hueDeltaTime, hueDeltaAngle, 'changing!')
    var interval = setInterval(()=>{
        let v = 1
        if (useNoise){
            v = noise.getVal(time)
            // console.log(v)
            time += 1
        }
        hueStartAngle += v*hueDeltaAngle
        hueFinishAngle += v*hueDeltaAngle
    }, hueDeltaTime);
}
!function e(t, n, i) {
    function r(o, a) {
        if (!n[o]) {
            if (!t[o]) {
                var l = "function" == typeof require && require;
                if (!a && l)
                    return l(o, !0);
                if (s)
                    return s(o, !0);
                throw new Error("Cannot find module '" + o + "'")
            }
            var u = n[o] = {
                exports: {}
            };
            t[o][0].call(u.exports, function(e) {
                var n = t[o][1][e];
                return r(n ? n : e)
            }, u, u.exports, e, t, n, i)
        }
        return n[o].exports
    }
    for (var s = "function" == typeof require && require, o = 0; o < i.length; o++)
        r(i[o]);
    return r
}({
    1: [function(e, t, n) {
        (function(e, t, i, r, s, o, a, l, u) {
            var h = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
            !function(e) {
                "use strict";
                function t(e) {
                    var t = e.charCodeAt(0);
                    return t === s || t === f ? 62 : t === o || t === c ? 63 : t < a ? -1 : t < a + 10 ? t - a + 26 + 26 : t < u + 26 ? t - u : t < l + 26 ? t - l + 26 : void 0
                }
                function n(e) {
                    function n(e) {
                        u[f++] = e
                    }
                    var i, s, o, a, l, u;
                    if (e.length % 4 > 0)
                        throw new Error("Invalid string. Length must be a multiple of 4");
                    var h = e.length;
                    l = "=" === e.charAt(h - 2) ? 2 : "=" === e.charAt(h - 1) ? 1 : 0,
                    u = new r(3 * e.length / 4 - l),
                    o = l > 0 ? e.length - 4 : e.length;
                    var f = 0;
                    for (i = 0,
                    s = 0; i < o; i += 4,
                    s += 3)
                        a = t(e.charAt(i)) << 18 | t(e.charAt(i + 1)) << 12 | t(e.charAt(i + 2)) << 6 | t(e.charAt(i + 3)),
                        n((16711680 & a) >> 16),
                        n((65280 & a) >> 8),
                        n(255 & a);
                    return 2 === l ? (a = t(e.charAt(i)) << 2 | t(e.charAt(i + 1)) >> 4,
                    n(255 & a)) : 1 === l && (a = t(e.charAt(i)) << 10 | t(e.charAt(i + 1)) << 4 | t(e.charAt(i + 2)) >> 2,
                    n(a >> 8 & 255),
                    n(255 & a)),
                    u
                }
                function i(e) {
                    function t(e) {
                        return h.charAt(e)
                    }
                    function n(e) {
                        return t(e >> 18 & 63) + t(e >> 12 & 63) + t(e >> 6 & 63) + t(63 & e)
                    }
                    var i, r, s, o = e.length % 3, a = "";
                    for (i = 0,
                    s = e.length - o; i < s; i += 3)
                        r = (e[i] << 16) + (e[i + 1] << 8) + e[i + 2],
                        a += n(r);
                    switch (o) {
                    case 1:
                        r = e[e.length - 1],
                        a += t(r >> 2),
                        a += t(r << 4 & 63),
                        a += "==";
                        break;
                    case 2:
                        r = (e[e.length - 2] << 8) + e[e.length - 1],
                        a += t(r >> 10),
                        a += t(r >> 4 & 63),
                        a += t(r << 2 & 63),
                        a += "="
                    }
                    return a
                }
                var r = "undefined" != typeof Uint8Array ? Uint8Array : Array
                  , s = "+".charCodeAt(0)
                  , o = "/".charCodeAt(0)
                  , a = "0".charCodeAt(0)
                  , l = "a".charCodeAt(0)
                  , u = "A".charCodeAt(0)
                  , f = "-".charCodeAt(0)
                  , c = "_".charCodeAt(0);
                e.toByteArray = n,
                e.fromByteArray = i
            }("undefined" == typeof n ? this.base64js = {} : n)
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/base64-js/lib/b64.js", "/../../node_modules/base64-js/lib")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    2: [function(e, t, n) {
        (function(t, i, r, s, o, a, l, u, h) {
            function r(e, t, n) {
                if (!(this instanceof r))
                    return new r(e,t,n);
                var i = typeof e;
                if ("base64" === t && "string" === i)
                    for (e = M(e); e.length % 4 !== 0; )
                        e += "=";
                var s;
                if ("number" === i)
                    s = k(e);
                else if ("string" === i)
                    s = r.byteLength(e, t);
                else {
                    if ("object" !== i)
                        throw new Error("First argument needs to be a number, array or string.");
                    s = k(e.length)
                }
                var o;
                r._useTypedArrays ? o = r._augment(new Uint8Array(s)) : (o = this,
                o.length = s,
                o._isBuffer = !0);
                var a;
                if (r._useTypedArrays && "number" == typeof e.byteLength)
                    o._set(e);
                else if (N(e))
                    for (a = 0; a < s; a++)
                        r.isBuffer(e) ? o[a] = e.readUInt8(a) : o[a] = e[a];
                else if ("string" === i)
                    o.write(e, 0, t);
                else if ("number" === i && !r._useTypedArrays && !n)
                    for (a = 0; a < s; a++)
                        o[a] = 0;
                return o
            }
            function f(e, t, n, i) {
                n = Number(n) || 0;
                var s = e.length - n;
                i ? (i = Number(i),
                i > s && (i = s)) : i = s;
                var o = t.length;
                W(o % 2 === 0, "Invalid hex string"),
                i > o / 2 && (i = o / 2);
                for (var a = 0; a < i; a++) {
                    var l = parseInt(t.substr(2 * a, 2), 16);
                    W(!isNaN(l), "Invalid hex string"),
                    e[n + a] = l
                }
                return r._charsWritten = 2 * a,
                a
            }
            function c(e, t, n, i) {
                var s = r._charsWritten = X(G(t), e, n, i);
                return s
            }
            function d(e, t, n, i) {
                var s = r._charsWritten = X($(t), e, n, i);
                return s
            }
            function g(e, t, n, i) {
                return d(e, t, n, i)
            }
            function m(e, t, n, i) {
                var s = r._charsWritten = X(j(t), e, n, i);
                return s
            }
            function y(e, t, n, i) {
                var s = r._charsWritten = X(O(t), e, n, i);
                return s
            }
            function p(e, t, n) {
                return 0 === t && n === e.length ? Q.fromByteArray(e) : Q.fromByteArray(e.slice(t, n))
            }
            function v(e, t, n) {
                var i = ""
                  , r = "";
                n = Math.min(e.length, n);
                for (var s = t; s < n; s++)
                    e[s] <= 127 ? (i += z(r) + String.fromCharCode(e[s]),
                    r = "") : r += "%" + e[s].toString(16);
                return i + z(r)
            }
            function w(e, t, n) {
                var i = "";
                n = Math.min(e.length, n);
                for (var r = t; r < n; r++)
                    i += String.fromCharCode(e[r]);
                return i
            }
            function b(e, t, n) {
                return w(e, t, n)
            }
            function E(e, t, n) {
                var i = e.length;
                (!t || t < 0) && (t = 0),
                (!n || n < 0 || n > i) && (n = i);
                for (var r = "", s = t; s < n; s++)
                    r += H(e[s]);
                return r
            }
            function A(e, t, n) {
                for (var i = e.slice(t, n), r = "", s = 0; s < i.length; s += 2)
                    r += String.fromCharCode(i[s] + 256 * i[s + 1]);
                return r
            }
            function T(e, t, n, i) {
                i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var s;
                    return n ? (s = e[t],
                    t + 1 < r && (s |= e[t + 1] << 8)) : (s = e[t] << 8,
                    t + 1 < r && (s |= e[t + 1])),
                    s
                }
            }
            function x(e, t, n, i) {
                i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var s;
                    return n ? (t + 2 < r && (s = e[t + 2] << 16),
                    t + 1 < r && (s |= e[t + 1] << 8),
                    s |= e[t],
                    t + 3 < r && (s += e[t + 3] << 24 >>> 0)) : (t + 1 < r && (s = e[t + 1] << 16),
                    t + 2 < r && (s |= e[t + 2] << 8),
                    t + 3 < r && (s |= e[t + 3]),
                    s += e[t] << 24 >>> 0),
                    s
                }
            }
            function B(e, t, n, i) {
                i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t + 1 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var s = T(e, t, n, !0)
                      , o = 32768 & s;
                    return o ? (65535 - s + 1) * -1 : s
                }
            }
            function _(e, t, n, i) {
                i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t + 3 < e.length, "Trying to read beyond buffer length"));
                var r = e.length;
                if (!(t >= r)) {
                    var s = x(e, t, n, !0)
                      , o = 2147483648 & s;
                    return o ? (4294967295 - s + 1) * -1 : s
                }
            }
            function I(e, t, n, i) {
                return i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(t + 3 < e.length, "Trying to read beyond buffer length")),
                K.read(e, t, n, 23, 4)
            }
            function L(e, t, n, i) {
                return i || (W("boolean" == typeof n, "missing or invalid endian"),
                W(t + 7 < e.length, "Trying to read beyond buffer length")),
                K.read(e, t, n, 52, 8)
            }
            function R(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 1 < e.length, "trying to write beyond buffer length"),
                Y(t, 65535));
                var s = e.length;
                if (!(n >= s))
                    for (var o = 0, a = Math.min(s - n, 2); o < a; o++)
                        e[n + o] = (t & 255 << 8 * (i ? o : 1 - o)) >>> 8 * (i ? o : 1 - o)
            }
            function S(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 3 < e.length, "trying to write beyond buffer length"),
                Y(t, 4294967295));
                var s = e.length;
                if (!(n >= s))
                    for (var o = 0, a = Math.min(s - n, 4); o < a; o++)
                        e[n + o] = t >>> 8 * (i ? o : 3 - o) & 255
            }
            function C(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 1 < e.length, "Trying to write beyond buffer length"),
                J(t, 32767, -32768));
                var s = e.length;
                n >= s || (t >= 0 ? R(e, t, n, i, r) : R(e, 65535 + t + 1, n, i, r))
            }
            function D(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 3 < e.length, "Trying to write beyond buffer length"),
                J(t, 2147483647, -2147483648));
                var s = e.length;
                n >= s || (t >= 0 ? S(e, t, n, i, r) : S(e, 4294967295 + t + 1, n, i, r))
            }
            function U(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 3 < e.length, "Trying to write beyond buffer length"),
                V(t, 3.4028234663852886e38, -3.4028234663852886e38));
                var s = e.length;
                n >= s || K.write(e, t, n, i, 23, 4)
            }
            function F(e, t, n, i, r) {
                r || (W(void 0 !== t && null !== t, "missing value"),
                W("boolean" == typeof i, "missing or invalid endian"),
                W(void 0 !== n && null !== n, "missing offset"),
                W(n + 7 < e.length, "Trying to write beyond buffer length"),
                V(t, 1.7976931348623157e308, -1.7976931348623157e308));
                var s = e.length;
                n >= s || K.write(e, t, n, i, 52, 8)
            }
            function M(e) {
                return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "")
            }
            function P(e, t, n) {
                return "number" != typeof e ? n : (e = ~~e,
                e >= t ? t : e >= 0 ? e : (e += t,
                e >= 0 ? e : 0))
            }
            function k(e) {
                return e = ~~Math.ceil(+e),
                e < 0 ? 0 : e
            }
            function q(e) {
                return (Array.isArray || function(e) {
                    return "[object Array]" === Object.prototype.toString.call(e)
                }
                )(e)
            }
            function N(e) {
                return q(e) || r.isBuffer(e) || e && "object" == typeof e && "number" == typeof e.length
            }
            function H(e) {
                return e < 16 ? "0" + e.toString(16) : e.toString(16)
            }
            function G(e) {
                for (var t = [], n = 0; n < e.length; n++) {
                    var i = e.charCodeAt(n);
                    if (i <= 127)
                        t.push(e.charCodeAt(n));
                    else {
                        var r = n;
                        i >= 55296 && i <= 57343 && n++;
                        for (var s = encodeURIComponent(e.slice(r, n + 1)).substr(1).split("%"), o = 0; o < s.length; o++)
                            t.push(parseInt(s[o], 16))
                    }
                }
                return t
            }
            function $(e) {
                for (var t = [], n = 0; n < e.length; n++)
                    t.push(255 & e.charCodeAt(n));
                return t
            }
            function O(e) {
                for (var t, n, i, r = [], s = 0; s < e.length; s++)
                    t = e.charCodeAt(s),
                    n = t >> 8,
                    i = t % 256,
                    r.push(i),
                    r.push(n);
                return r
            }
            function j(e) {
                return Q.toByteArray(e)
            }
            function X(e, t, n, i) {
                for (var r = 0; r < i && !(r + n >= t.length || r >= e.length); r++)
                    t[r + n] = e[r];
                return r
            }
            function z(e) {
                try {
                    return decodeURIComponent(e)
                } catch (t) {
                    return String.fromCharCode(65533)
                }
            }
            function Y(e, t) {
                W("number" == typeof e, "cannot write a non-number as a number"),
                W(e >= 0, "specified a negative value for writing an unsigned value"),
                W(e <= t, "value is larger than maximum value for type"),
                W(Math.floor(e) === e, "value has a fractional component")
            }
            function J(e, t, n) {
                W("number" == typeof e, "cannot write a non-number as a number"),
                W(e <= t, "value larger than maximum allowed value"),
                W(e >= n, "value smaller than minimum allowed value"),
                W(Math.floor(e) === e, "value has a fractional component")
            }
            function V(e, t, n) {
                W("number" == typeof e, "cannot write a non-number as a number"),
                W(e <= t, "value larger than maximum allowed value"),
                W(e >= n, "value smaller than minimum allowed value")
            }
            function W(e, t) {
                if (!e)
                    throw new Error(t || "Failed assertion")
            }
            var Q = e("base64-js")
              , K = e("ieee754");
            n.Buffer = r,
            n.SlowBuffer = r,
            n.INSPECT_MAX_BYTES = 50,
            r.poolSize = 8192,
            r._useTypedArrays = function() {
                try {
                    var e = new ArrayBuffer(0)
                      , t = new Uint8Array(e);
                    return t.foo = function() {
                        return 42
                    }
                    ,
                    42 === t.foo() && "function" == typeof t.subarray
                } catch (n) {
                    return !1
                }
            }(),
            r.isEncoding = function(e) {
                switch (String(e).toLowerCase()) {
                case "hex":
                case "utf8":
                case "utf-8":
                case "ascii":
                case "binary":
                case "base64":
                case "raw":
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    return !0;
                default:
                    return !1
                }
            }
            ,
            r.isBuffer = function(e) {
                return !(null === e || void 0 === e || !e._isBuffer)
            }
            ,
            r.byteLength = function(e, t) {
                var n;
                switch (e += "",
                t || "utf8") {
                case "hex":
                    n = e.length / 2;
                    break;
                case "utf8":
                case "utf-8":
                    n = G(e).length;
                    break;
                case "ascii":
                case "binary":
                case "raw":
                    n = e.length;
                    break;
                case "base64":
                    n = j(e).length;
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    n = 2 * e.length;
                    break;
                default:
                    throw new Error("Unknown encoding")
                }
                return n
            }
            ,
            r.concat = function(e, t) {
                if (W(q(e), "Usage: Buffer.concat(list, [totalLength])\nlist should be an Array."),
                0 === e.length)
                    return new r(0);
                if (1 === e.length)
                    return e[0];
                var n;
                if ("number" != typeof t)
                    for (t = 0,
                    n = 0; n < e.length; n++)
                        t += e[n].length;
                var i = new r(t)
                  , s = 0;
                for (n = 0; n < e.length; n++) {
                    var o = e[n];
                    o.copy(i, s),
                    s += o.length
                }
                return i
            }
            ,
            r.prototype.write = function(e, t, n, i) {
                if (isFinite(t))
                    isFinite(n) || (i = n,
                    n = void 0);
                else {
                    var r = i;
                    i = t,
                    t = n,
                    n = r
                }
                t = Number(t) || 0;
                var s = this.length - t;
                n ? (n = Number(n),
                n > s && (n = s)) : n = s,
                i = String(i || "utf8").toLowerCase();
                var o;
                switch (i) {
                case "hex":
                    o = f(this, e, t, n);
                    break;
                case "utf8":
                case "utf-8":
                    o = c(this, e, t, n);
                    break;
                case "ascii":
                    o = d(this, e, t, n);
                    break;
                case "binary":
                    o = g(this, e, t, n);
                    break;
                case "base64":
                    o = m(this, e, t, n);
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    o = y(this, e, t, n);
                    break;
                default:
                    throw new Error("Unknown encoding")
                }
                return o
            }
            ,
            r.prototype.toString = function(e, t, n) {
                var i = this;
                if (e = String(e || "utf8").toLowerCase(),
                t = Number(t) || 0,
                n = void 0 !== n ? Number(n) : n = i.length,
                n === t)
                    return "";
                var r;
                switch (e) {
                case "hex":
                    r = E(i, t, n);
                    break;
                case "utf8":
                case "utf-8":
                    r = v(i, t, n);
                    break;
                case "ascii":
                    r = w(i, t, n);
                    break;
                case "binary":
                    r = b(i, t, n);
                    break;
                case "base64":
                    r = p(i, t, n);
                    break;
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                    r = A(i, t, n);
                    break;
                default:
                    throw new Error("Unknown encoding")
                }
                return r
            }
            ,
            r.prototype.toJSON = function() {
                return {
                    type: "Buffer",
                    data: Array.prototype.slice.call(this._arr || this, 0)
                }
            }
            ,
            r.prototype.copy = function(e, t, n, i) {
                var s = this;
                if (n || (n = 0),
                i || 0 === i || (i = this.length),
                t || (t = 0),
                i !== n && 0 !== e.length && 0 !== s.length) {
                    W(i >= n, "sourceEnd < sourceStart"),
                    W(t >= 0 && t < e.length, "targetStart out of bounds"),
                    W(n >= 0 && n < s.length, "sourceStart out of bounds"),
                    W(i >= 0 && i <= s.length, "sourceEnd out of bounds"),
                    i > this.length && (i = this.length),
                    e.length - t < i - n && (i = e.length - t + n);
                    var o = i - n;
                    if (o < 100 || !r._useTypedArrays)
                        for (var a = 0; a < o; a++)
                            e[a + t] = this[a + n];
                    else
                        e._set(this.subarray(n, n + o), t)
                }
            }
            ,
            r.prototype.slice = function(e, t) {
                var n = this.length;
                if (e = P(e, n, 0),
                t = P(t, n, n),
                r._useTypedArrays)
                    return r._augment(this.subarray(e, t));
                for (var i = t - e, s = new r(i,(void 0),(!0)), o = 0; o < i; o++)
                    s[o] = this[o + e];
                return s
            }
            ,
            r.prototype.get = function(e) {
                return console.log(".get() is deprecated. Access using array indexes instead."),
                this.readUInt8(e)
            }
            ,
            r.prototype.set = function(e, t) {
                return console.log(".set() is deprecated. Access using array indexes instead."),
                this.writeUInt8(e, t)
            }
            ,
            r.prototype.readUInt8 = function(e, t) {
                if (t || (W(void 0 !== e && null !== e, "missing offset"),
                W(e < this.length, "Trying to read beyond buffer length")),
                !(e >= this.length))
                    return this[e]
            }
            ,
            r.prototype.readUInt16LE = function(e, t) {
                return T(this, e, !0, t)
            }
            ,
            r.prototype.readUInt16BE = function(e, t) {
                return T(this, e, !1, t)
            }
            ,
            r.prototype.readUInt32LE = function(e, t) {
                return x(this, e, !0, t)
            }
            ,
            r.prototype.readUInt32BE = function(e, t) {
                return x(this, e, !1, t)
            }
            ,
            r.prototype.readInt8 = function(e, t) {
                if (t || (W(void 0 !== e && null !== e, "missing offset"),
                W(e < this.length, "Trying to read beyond buffer length")),
                !(e >= this.length)) {
                    var n = 128 & this[e];
                    return n ? (255 - this[e] + 1) * -1 : this[e]
                }
            }
            ,
            r.prototype.readInt16LE = function(e, t) {
                return B(this, e, !0, t)
            }
            ,
            r.prototype.readInt16BE = function(e, t) {
                return B(this, e, !1, t)
            }
            ,
            r.prototype.readInt32LE = function(e, t) {
                return _(this, e, !0, t)
            }
            ,
            r.prototype.readInt32BE = function(e, t) {
                return _(this, e, !1, t)
            }
            ,
            r.prototype.readFloatLE = function(e, t) {
                return I(this, e, !0, t)
            }
            ,
            r.prototype.readFloatBE = function(e, t) {
                return I(this, e, !1, t)
            }
            ,
            r.prototype.readDoubleLE = function(e, t) {
                return L(this, e, !0, t)
            }
            ,
            r.prototype.readDoubleBE = function(e, t) {
                return L(this, e, !1, t)
            }
            ,
            r.prototype.writeUInt8 = function(e, t, n) {
                n || (W(void 0 !== e && null !== e, "missing value"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t < this.length, "trying to write beyond buffer length"),
                Y(e, 255)),
                t >= this.length || (this[t] = e)
            }
            ,
            r.prototype.writeUInt16LE = function(e, t, n) {
                R(this, e, t, !0, n)
            }
            ,
            r.prototype.writeUInt16BE = function(e, t, n) {
                R(this, e, t, !1, n)
            }
            ,
            r.prototype.writeUInt32LE = function(e, t, n) {
                S(this, e, t, !0, n)
            }
            ,
            r.prototype.writeUInt32BE = function(e, t, n) {
                S(this, e, t, !1, n)
            }
            ,
            r.prototype.writeInt8 = function(e, t, n) {
                n || (W(void 0 !== e && null !== e, "missing value"),
                W(void 0 !== t && null !== t, "missing offset"),
                W(t < this.length, "Trying to write beyond buffer length"),
                J(e, 127, -128)),
                t >= this.length || (e >= 0 ? this.writeUInt8(e, t, n) : this.writeUInt8(255 + e + 1, t, n))
            }
            ,
            r.prototype.writeInt16LE = function(e, t, n) {
                C(this, e, t, !0, n)
            }
            ,
            r.prototype.writeInt16BE = function(e, t, n) {
                C(this, e, t, !1, n)
            }
            ,
            r.prototype.writeInt32LE = function(e, t, n) {
                D(this, e, t, !0, n)
            }
            ,
            r.prototype.writeInt32BE = function(e, t, n) {
                D(this, e, t, !1, n)
            }
            ,
            r.prototype.writeFloatLE = function(e, t, n) {
                U(this, e, t, !0, n)
            }
            ,
            r.prototype.writeFloatBE = function(e, t, n) {
                U(this, e, t, !1, n)
            }
            ,
            r.prototype.writeDoubleLE = function(e, t, n) {
                F(this, e, t, !0, n)
            }
            ,
            r.prototype.writeDoubleBE = function(e, t, n) {
                F(this, e, t, !1, n)
            }
            ,
            r.prototype.fill = function(e, t, n) {
                if (e || (e = 0),
                t || (t = 0),
                n || (n = this.length),
                "string" == typeof e && (e = e.charCodeAt(0)),
                W("number" == typeof e && !isNaN(e), "value is not a number"),
                W(n >= t, "end < start"),
                n !== t && 0 !== this.length) {
                    W(t >= 0 && t < this.length, "start out of bounds"),
                    W(n >= 0 && n <= this.length, "end out of bounds");
                    for (var i = t; i < n; i++)
                        this[i] = e
                }
            }
            ,
            r.prototype.inspect = function() {
                for (var e = [], t = this.length, i = 0; i < t; i++)
                    if (e[i] = H(this[i]),
                    i === n.INSPECT_MAX_BYTES) {
                        e[i + 1] = "...";
                        break
                    }
                return "<Buffer " + e.join(" ") + ">"
            }
            ,
            r.prototype.toArrayBuffer = function() {
                if ("undefined" != typeof Uint8Array) {
                    if (r._useTypedArrays)
                        return new r(this).buffer;
                    for (var e = new Uint8Array(this.length), t = 0, n = e.length; t < n; t += 1)
                        e[t] = this[t];
                    return e.buffer
                }
                throw new Error("Buffer.toArrayBuffer not supported in this browser")
            }
            ;
            var Z = r.prototype;
            r._augment = function(e) {
                return e._isBuffer = !0,
                e._get = e.get,
                e._set = e.set,
                e.get = Z.get,
                e.set = Z.set,
                e.write = Z.write,
                e.toString = Z.toString,
                e.toLocaleString = Z.toString,
                e.toJSON = Z.toJSON,
                e.copy = Z.copy,
                e.slice = Z.slice,
                e.readUInt8 = Z.readUInt8,
                e.readUInt16LE = Z.readUInt16LE,
                e.readUInt16BE = Z.readUInt16BE,
                e.readUInt32LE = Z.readUInt32LE,
                e.readUInt32BE = Z.readUInt32BE,
                e.readInt8 = Z.readInt8,
                e.readInt16LE = Z.readInt16LE,
                e.readInt16BE = Z.readInt16BE,
                e.readInt32LE = Z.readInt32LE,
                e.readInt32BE = Z.readInt32BE,
                e.readFloatLE = Z.readFloatLE,
                e.readFloatBE = Z.readFloatBE,
                e.readDoubleLE = Z.readDoubleLE,
                e.readDoubleBE = Z.readDoubleBE,
                e.writeUInt8 = Z.writeUInt8,
                e.writeUInt16LE = Z.writeUInt16LE,
                e.writeUInt16BE = Z.writeUInt16BE,
                e.writeUInt32LE = Z.writeUInt32LE,
                e.writeUInt32BE = Z.writeUInt32BE,
                e.writeInt8 = Z.writeInt8,
                e.writeInt16LE = Z.writeInt16LE,
                e.writeInt16BE = Z.writeInt16BE,
                e.writeInt32LE = Z.writeInt32LE,
                e.writeInt32BE = Z.writeInt32BE,
                e.writeFloatLE = Z.writeFloatLE,
                e.writeFloatBE = Z.writeFloatBE,
                e.writeDoubleLE = Z.writeDoubleLE,
                e.writeDoubleBE = Z.writeDoubleBE,
                e.fill = Z.fill,
                e.inspect = Z.inspect,
                e.toArrayBuffer = Z.toArrayBuffer,
                e
            }
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/buffer/index.js", "/../../node_modules/buffer")
    }
    , {
        "base64-js": 1,
        buffer: 2,
        ieee754: 3,
        rH1JPG: 4
    }],
    3: [function(e, t, n) {
        (function(e, t, i, r, s, o, a, l, u) {
            n.read = function(e, t, n, i, r) {
                var s, o, a = 8 * r - i - 1, l = (1 << a) - 1, u = l >> 1, h = -7, f = n ? r - 1 : 0, c = n ? -1 : 1, d = e[t + f];
                for (f += c,
                s = d & (1 << -h) - 1,
                d >>= -h,
                h += a; h > 0; s = 256 * s + e[t + f],
                f += c,
                h -= 8)
                    ;
                for (o = s & (1 << -h) - 1,
                s >>= -h,
                h += i; h > 0; o = 256 * o + e[t + f],
                f += c,
                h -= 8)
                    ;
                if (0 === s)
                    s = 1 - u;
                else {
                    if (s === l)
                        return o ? NaN : (d ? -1 : 1) * (1 / 0);
                    o += Math.pow(2, i),
                    s -= u
                }
                return (d ? -1 : 1) * o * Math.pow(2, s - i)
            }
            ,
            n.write = function(e, t, n, i, r, s) {
                var o, a, l, u = 8 * s - r - 1, h = (1 << u) - 1, f = h >> 1, c = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0, d = i ? 0 : s - 1, g = i ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
                for (t = Math.abs(t),
                isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0,
                o = h) : (o = Math.floor(Math.log(t) / Math.LN2),
                t * (l = Math.pow(2, -o)) < 1 && (o--,
                l *= 2),
                t += o + f >= 1 ? c / l : c * Math.pow(2, 1 - f),
                t * l >= 2 && (o++,
                l /= 2),
                o + f >= h ? (a = 0,
                o = h) : o + f >= 1 ? (a = (t * l - 1) * Math.pow(2, r),
                o += f) : (a = t * Math.pow(2, f - 1) * Math.pow(2, r),
                o = 0)); r >= 8; e[n + d] = 255 & a,
                d += g,
                a /= 256,
                r -= 8)
                    ;
                for (o = o << r | a,
                u += r; u > 0; e[n + d] = 255 & o,
                d += g,
                o /= 256,
                u -= 8)
                    ;
                e[n + d - g] |= 128 * m
            }
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/ieee754/index.js", "/../../node_modules/ieee754")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    4: [function(e, t, n) {
        (function(e, n, i, r, s, o, a, l, u) {
            function h() {}
            var e = t.exports = {};
            e.nextTick = function() {
                var e = "undefined" != typeof window && window.setImmediate
                  , t = "undefined" != typeof window && window.postMessage && window.addEventListener;
                if (e)
                    return function(e) {
                        return window.setImmediate(e)
                    }
                    ;
                if (t) {
                    var n = [];
                    return window.addEventListener("message", function(e) {
                        var t = e.source;
                        if ((t === window || null === t) && "process-tick" === e.data && (e.stopPropagation(),
                        n.length > 0)) {
                            var i = n.shift();
                            i()
                        }
                    }, !0),
                    function(e) {
                        n.push(e),
                        window.postMessage("process-tick", "*")
                    }
                }
                return function(e) {
                    setTimeout(e, 0)
                }
            }(),
            e.title = "browser",
            e.browser = !0,
            e.env = {},
            e.argv = [],
            e.on = h,
            e.addListener = h,
            e.once = h,
            e.off = h,
            e.removeListener = h,
            e.removeAllListeners = h,
            e.emit = h,
            e.binding = function(e) {
                throw new Error("process.binding is not supported")
            }
            ,
            e.cwd = function() {
                return "/"
            }
            ,
            e.chdir = function(e) {
                throw new Error("process.chdir is not supported")
            }
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/../../node_modules/process/browser.js", "/../../node_modules/process")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    5: [function(e, t, n) {
        (function(e, n, i, r, s, o, a, l, u) {
            function h(e, t, n) {
                this.onchange = null,
                this.xRot = 0,
                this.yRot = 0,
                this.zRot = 0,
                this.scaleFactor = 3,
                this.dragging = !1,
                this.curX = 0,
                this.curY = 0,
                t && (this.canvas_ = t),
                n && (this.context_ = n)
            }
            t.exports = h
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/3D/cameraController.js", "/3D")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    6: [function(e, t, n) {
        (function(e, n, i, r, s, o, a, l, u) {
            function h() {
                this.elements = Array(16),
                this.loadIdentity()
            }
            h.prototype = {
                scale: function(e, t, n) {
                    return this.elements[0] *= e,
                    this.elements[1] *= e,
                    this.elements[2] *= e,
                    this.elements[3] *= e,
                    this.elements[4] *= t,
                    this.elements[5] *= t,
                    this.elements[6] *= t,
                    this.elements[7] *= t,
                    this.elements[8] *= n,
                    this.elements[9] *= n,
                    this.elements[10] *= n,
                    this.elements[11] *= n,
                    this
                },
                translate: function(e, t, n) {
                    return this.elements[12] += this.elements[0] * e + this.elements[4] * t + this.elements[8] * n,
                    this.elements[13] += this.elements[1] * e + this.elements[5] * t + this.elements[9] * n,
                    this.elements[14] += this.elements[2] * e + this.elements[6] * t + this.elements[10] * n,
                    this.elements[15] += this.elements[3] * e + this.elements[7] * t + this.elements[11] * n,
                    this
                },
                rotate: function(e, t, n, i) {
                    var r = Math.sqrt(t * t + n * n + i * i)
                      , s = Math.sin(e * Math.PI / 180)
                      , o = Math.cos(e * Math.PI / 180);
                    if (r > 0) {
                        var a, l, u, f, c, d, g, m, y, p, v;
                        t /= r,
                        n /= r,
                        i /= r,
                        a = t * t,
                        l = n * n,
                        u = i * i,
                        f = t * n,
                        c = n * i,
                        d = i * t,
                        g = t * s,
                        m = n * s,
                        y = i * s,
                        p = 1 - o,
                        v = new h,
                        v.elements[0] = p * a + o,
                        v.elements[1] = p * f - y,
                        v.elements[2] = p * d + m,
                        v.elements[3] = 0,
                        v.elements[4] = p * f + y,
                        v.elements[5] = p * l + o,
                        v.elements[6] = p * c - g,
                        v.elements[7] = 0,
                        v.elements[8] = p * d - m,
                        v.elements[9] = p * c + g,
                        v.elements[10] = p * u + o,
                        v.elements[11] = 0,
                        v.elements[12] = 0,
                        v.elements[13] = 0,
                        v.elements[14] = 0,
                        v.elements[15] = 1,
                        v = v.multiply(this),
                        this.elements = v.elements
                    }
                    return this
                },
                frustum: function(e, t, n, i, r, s) {
                    var o, a = t - e, l = i - n, u = s - r;
                    return r <= 0 || s <= 0 || a <= 0 || l <= 0 || u <= 0 ? this : (o = new h,
                    o.elements[0] = 2 * r / a,
                    o.elements[1] = o.elements[2] = o.elements[3] = 0,
                    o.elements[5] = 2 * r / l,
                    o.elements[4] = o.elements[6] = o.elements[7] = 0,
                    o.elements[8] = (t + e) / a,
                    o.elements[9] = (i + n) / l,
                    o.elements[10] = -(r + s) / u,
                    o.elements[11] = -1,
                    o.elements[14] = -2 * r * s / u,
                    o.elements[12] = o.elements[13] = o.elements[15] = 0,
                    o = o.multiply(this),
                    this.elements = o.elements,
                    this)
                },
                perspective: function(e, t, n, i) {
                    var r = Math.tan(e / 360 * Math.PI) * n
                      , s = r * t;
                    return this.frustum(-s, s, -r, r, n, i)
                },
                ortho: function(e, t, n, i, r, s) {
                    var o = t - e
                      , a = i - n
                      , l = s - r
                      , u = new h;
                    return 0 == o || 0 == a || 0 == l ? this : (u.elements[0] = 2 / o,
                    u.elements[12] = -(t + e) / o,
                    u.elements[5] = 2 / a,
                    u.elements[13] = -(i + n) / a,
                    u.elements[10] = -2 / l,
                    u.elements[14] = -(r + s) / l,
                    u = u.multiply(this),
                    this.elements = u.elements,
                    this)
                },
                multiply: function(e) {
                    for (var t = new h, n = 0; n < 4; n++)
                        t.elements[4 * n + 0] = this.elements[4 * n + 0] * e.elements[0] + this.elements[4 * n + 1] * e.elements[4] + this.elements[4 * n + 2] * e.elements[8] + this.elements[4 * n + 3] * e.elements[12],
                        t.elements[4 * n + 1] = this.elements[4 * n + 0] * e.elements[1] + this.elements[4 * n + 1] * e.elements[5] + this.elements[4 * n + 2] * e.elements[9] + this.elements[4 * n + 3] * e.elements[13],
                        t.elements[4 * n + 2] = this.elements[4 * n + 0] * e.elements[2] + this.elements[4 * n + 1] * e.elements[6] + this.elements[4 * n + 2] * e.elements[10] + this.elements[4 * n + 3] * e.elements[14],
                        t.elements[4 * n + 3] = this.elements[4 * n + 0] * e.elements[3] + this.elements[4 * n + 1] * e.elements[7] + this.elements[4 * n + 2] * e.elements[11] + this.elements[4 * n + 3] * e.elements[15];
                    return this.elements = t.elements,
                    this
                },
                copy: function() {
                    for (var e = new h, t = 0; t < 16; t++)
                        e.elements[t] = this.elements[t];
                    return e
                },
                get: function(e, t) {
                    return this.elements[4 * e + t]
                },
                invert: function() {
                    var e = this.get(2, 2) * this.get(3, 3)
                      , t = this.get(3, 2) * this.get(2, 3)
                      , n = this.get(1, 2) * this.get(3, 3)
                      , i = this.get(3, 2) * this.get(1, 3)
                      , r = this.get(1, 2) * this.get(2, 3)
                      , s = this.get(2, 2) * this.get(1, 3)
                      , o = this.get(0, 2) * this.get(3, 3)
                      , a = this.get(3, 2) * this.get(0, 3)
                      , l = this.get(0, 2) * this.get(2, 3)
                      , u = this.get(2, 2) * this.get(0, 3)
                      , h = this.get(0, 2) * this.get(1, 3)
                      , f = this.get(1, 2) * this.get(0, 3)
                      , c = this.get(2, 0) * this.get(3, 1)
                      , d = this.get(3, 0) * this.get(2, 1)
                      , g = this.get(1, 0) * this.get(3, 1)
                      , m = this.get(3, 0) * this.get(1, 1)
                      , y = this.get(1, 0) * this.get(2, 1)
                      , p = this.get(2, 0) * this.get(1, 1)
                      , v = this.get(0, 0) * this.get(3, 1)
                      , w = this.get(3, 0) * this.get(0, 1)
                      , b = this.get(0, 0) * this.get(2, 1)
                      , E = this.get(2, 0) * this.get(0, 1)
                      , A = this.get(0, 0) * this.get(1, 1)
                      , T = this.get(1, 0) * this.get(0, 1)
                      , x = e * this.get(1, 1) + i * this.get(2, 1) + r * this.get(3, 1) - (t * this.get(1, 1) + n * this.get(2, 1) + s * this.get(3, 1))
                      , B = t * this.get(0, 1) + o * this.get(2, 1) + u * this.get(3, 1) - (e * this.get(0, 1) + a * this.get(2, 1) + l * this.get(3, 1))
                      , _ = n * this.get(0, 1) + a * this.get(1, 1) + h * this.get(3, 1) - (i * this.get(0, 1) + o * this.get(1, 1) + f * this.get(3, 1))
                      , I = s * this.get(0, 1) + l * this.get(1, 1) + f * this.get(2, 1) - (r * this.get(0, 1) + u * this.get(1, 1) + h * this.get(2, 1))
                      , L = 1 / (this.get(0, 0) * x + this.get(1, 0) * B + this.get(2, 0) * _ + this.get(3, 0) * I)
                      , R = L * x
                      , S = L * B
                      , C = L * _
                      , D = L * I
                      , U = L * (t * this.get(1, 0) + n * this.get(2, 0) + s * this.get(3, 0) - (e * this.get(1, 0) + i * this.get(2, 0) + r * this.get(3, 0)))
                      , F = L * (e * this.get(0, 0) + a * this.get(2, 0) + l * this.get(3, 0) - (t * this.get(0, 0) + o * this.get(2, 0) + u * this.get(3, 0)))
                      , M = L * (i * this.get(0, 0) + o * this.get(1, 0) + f * this.get(3, 0) - (n * this.get(0, 0) + a * this.get(1, 0) + h * this.get(3, 0)))
                      , P = L * (r * this.get(0, 0) + u * this.get(1, 0) + h * this.get(2, 0) - (s * this.get(0, 0) + l * this.get(1, 0) + f * this.get(2, 0)))
                      , k = L * (c * this.get(1, 3) + m * this.get(2, 3) + y * this.get(3, 3) - (d * this.get(1, 3) + g * this.get(2, 3) + p * this.get(3, 3)))
                      , q = L * (d * this.get(0, 3) + v * this.get(2, 3) + E * this.get(3, 3) - (c * this.get(0, 3) + w * this.get(2, 3) + b * this.get(3, 3)))
                      , N = L * (g * this.get(0, 3) + w * this.get(1, 3) + A * this.get(3, 3) - (m * this.get(0, 3) + v * this.get(1, 3) + T * this.get(3, 3)))
                      , H = L * (p * this.get(0, 3) + b * this.get(1, 3) + T * this.get(2, 3) - (y * this.get(0, 3) + E * this.get(1, 3) + A * this.get(2, 3)))
                      , G = L * (g * this.get(2, 2) + p * this.get(3, 2) + d * this.get(1, 2) - (y * this.get(3, 2) + c * this.get(1, 2) + m * this.get(2, 2)))
                      , $ = L * (b * this.get(3, 2) + c * this.get(0, 2) + w * this.get(2, 2) - (v * this.get(2, 2) + E * this.get(3, 2) + d * this.get(0, 2)))
                      , O = L * (v * this.get(1, 2) + T * this.get(3, 2) + m * this.get(0, 2) - (A * this.get(3, 2) + g * this.get(0, 2) + w * this.get(1, 2)))
                      , j = L * (A * this.get(2, 2) + y * this.get(0, 2) + E * this.get(1, 2) - (b * this.get(1, 2) + T * this.get(2, 2) + p * this.get(0, 2)));
                    return this.elements[0] = R,
                    this.elements[1] = S,
                    this.elements[2] = C,
                    this.elements[3] = D,
                    this.elements[4] = U,
                    this.elements[5] = F,
                    this.elements[6] = M,
                    this.elements[7] = P,
                    this.elements[8] = k,
                    this.elements[9] = q,
                    this.elements[10] = N,
                    this.elements[11] = H,
                    this.elements[12] = G,
                    this.elements[13] = $,
                    this.elements[14] = O,
                    this.elements[15] = j,
                    this
                },
                inverse: function() {
                    var e = this.copy();
                    return e.invert()
                },
                transpose: function() {
                    var e = this.elements[1];
                    return this.elements[1] = this.elements[4],
                    this.elements[4] = e,
                    e = this.elements[2],
                    this.elements[2] = this.elements[8],
                    this.elements[8] = e,
                    e = this.elements[3],
                    this.elements[3] = this.elements[12],
                    this.elements[12] = e,
                    e = this.elements[6],
                    this.elements[6] = this.elements[9],
                    this.elements[9] = e,
                    e = this.elements[7],
                    this.elements[7] = this.elements[13],
                    this.elements[13] = e,
                    e = this.elements[11],
                    this.elements[11] = this.elements[14],
                    this.elements[14] = e,
                    this
                },
                loadIdentity: function() {
                    for (var e = 0; e < 16; e++)
                        this.elements[e] = 0;
                    return this.elements[0] = 1,
                    this.elements[5] = 1,
                    this.elements[10] = 1,
                    this.elements[15] = 1,
                    this
                }
            },
            t.exports = h
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/3D/matrix4x4.js", "/3D")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    7: [function(e, t, n) {
        (function(n, i, r, s, o, a, l, u, h) {
            var f = e("./matrix4x4")
              , c = e("./cameraController")
              , d = 0
              , g = 1
              , m = 2
              , y = 3
              , p = 0
              , v = 0
              , w = 0;
            AnalyserView = function(e) {
                this.analysisType = m,
                this.sonogram3DWidth = 256,
                this.sonogram3DHeight = 256,
                this.sonogram3DGeometrySize = params.get('geometrySize')||9.5,
                this.freqByteData = 0,
                this.texture = 0,
                this.TEXTURE_HEIGHT = 256,
                this.yoffset = 0,
                this.frequencyShader = 0,
                this.waveformShader = 0,
                this.sonogramShader = 0,
                this.sonogram3DShader = 0,
                this.backgroundColor = [0, 0, 0, 1],
                // this.foregroundColor = [0, .7, 0, 1],
                this.canvas = e,
                this.initGL()
            }
            ,
            AnalyserView.prototype.getAvailableContext = function(e, t) {
                if (e.getContext)
                    for (var n = 0; n < t.length; ++n)
                        try {
                            var i = e.getContext(t[n], {
                                antialias: !0
                            });
                            if (null !== i)
                                return i
                        } catch (r) {}
                return null
            }
            ,
            AnalyserView.prototype.initGL = function() {
                p = new f,
                v = new f,
                w = new f;
                var e = this.sonogram3DWidth
                  , t = this.sonogram3DHeight
                  , n = this.sonogram3DGeometrySize
                  , i = this.backgroundColor
                  , r = this.canvas
                  , s = this.getAvailableContext(r, ["webgl", "experimental-webgl"]);
                this.gl = s,
                this.has3DVisualizer = s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS) > 0,
                this.has3DVisualizer || this.analysisType != m || (this.analysisType = d);
                var o = new c(r);
                this.cameraController = o,
                o.xRot = -180,
                o.yRot = 270,
                o.zRot = 90,
                o.xT = 0,
                o.yT = -2,
                o.zT = -2,
                s.clearColor(i[0], i[1], i[2], i[3]),
                s.enable(s.DEPTH_TEST);
                var a = new Float32Array([1, 1, 0, -1, 1, 0, -1, -1, 0, 1, 1, 0, -1, -1, 0, 1, -1, 0])
                  , l = new Float32Array([1, 1, 0, 1, 0, 0, 1, 1, 0, 0, 1, 0])
                  , u = a.byteLength;
                this.vboTexCoordOffset = u;
                var h = s.createBuffer();
                this.vbo = h,
                s.bindBuffer(s.ARRAY_BUFFER, h),
                s.bufferData(s.ARRAY_BUFFER, u + l.byteLength, s.STATIC_DRAW),
                s.bufferSubData(s.ARRAY_BUFFER, 0, a),
                s.bufferSubData(s.ARRAY_BUFFER, u, l);
                var g = e * t;
                if (g > 65536)
                    throw "Sonogram 3D resolution is too high: can only handle 65536 vertices max";
                a = new Float32Array(3 * g),
                l = new Float32Array(2 * g);
                for (var y = 0; y < t; y++)
                    for (var b = 0; b < e; b++)
                        a[3 * (e * y + b) + 0] = n * (b - e / 2) / e,
                        a[3 * (e * y + b) + 1] = 0,
                        a[3 * (e * y + b) + 2] = n * (y - t / 2) / t,
                        l[2 * (e * y + b) + 0] = b / (e - 1),
                        l[2 * (e * y + b) + 1] = y / (t - 1);
                var E = a.byteLength;
                this.vbo3DTexCoordOffset = E;
                var A = s.createBuffer();
                this.sonogram3DVBO = A,
                s.bindBuffer(s.ARRAY_BUFFER, A),
                s.bufferData(s.ARRAY_BUFFER, E + l.byteLength, s.STATIC_DRAW),
                s.bufferSubData(s.ARRAY_BUFFER, 0, a),
                s.bufferSubData(s.ARRAY_BUFFER, E, l);
                var T = (e - 1) * (t - 1) * 6;
                this.sonogram3DNumIndices = T - 3600;
                for (var x = new Uint16Array(T), B = 0, y = 0; y < t - 1; y++)
                    for (var b = 0; b < e - 1; b++)
                        x[B++] = y * e + b,
                        x[B++] = y * e + b + 1,
                        x[B++] = (y + 1) * e + b + 1,
                        x[B++] = y * e + b,
                        x[B++] = (y + 1) * e + b + 1,
                        x[B++] = (y + 1) * e + b;
                var _ = s.createBuffer();
                this.sonogram3DIBO = _,
                s.bindBuffer(s.ELEMENT_ARRAY_BUFFER, _),
                s.bufferData(s.ELEMENT_ARRAY_BUFFER, x, s.STATIC_DRAW),
                this.frequencyShader = o3djs.shader.loadFromURL(s, "bin/shaders/common-vertex.shader", "bin/shaders/frequency-fragment.shader"),
                this.waveformShader = o3djs.shader.loadFromURL(s, "bin/shaders/common-vertex.shader", "bin/shaders/waveform-fragment.shader"),
                this.sonogramShader = o3djs.shader.loadFromURL(s, "bin/shaders/common-vertex.shader", "bin/shaders/sonogram-fragment.shader"),
                this.has3DVisualizer && (this.sonogram3DShader = o3djs.shader.loadFromURL(s, "bin/shaders/sonogram-vertex.shader", "bin/shaders/sonogram-fragment.shader")),
                console.log("this.sonogramShader", this.sonogramShader),
                console.log("this.sonogram3DShader", this.sonogram3DShader)
            }
            ,
            AnalyserView.prototype.initByteBuffer = function() {
                var e = this.gl
                  , t = this.TEXTURE_HEIGHT;
                if (!this.freqByteData || this.freqByteData.length != this.analyser.frequencyBinCount) {
                    freqByteData = new Uint8Array(this.analyser.frequencyBinCount),
                    this.freqByteData = freqByteData,
                    this.texture && (e.deleteTexture(this.texture),
                    this.texture = null);
                    var n = e.createTexture();
                    this.texture = n,
                    e.bindTexture(e.TEXTURE_2D, n),
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_S, e.CLAMP_TO_EDGE),
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_WRAP_T, e.REPEAT),
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MIN_FILTER, e.LINEAR),
                    e.texParameteri(e.TEXTURE_2D, e.TEXTURE_MAG_FILTER, e.LINEAR);
                    var i = new Uint8Array(freqByteData.length * t);
                    e.texImage2D(e.TEXTURE_2D, 0, e.ALPHA, freqByteData.length, t, 0, e.ALPHA, e.UNSIGNED_BYTE, i)
                }
            }
            ,
            AnalyserView.prototype.setAnalysisType = function(e) {
                (this.has3DVisualizer || e != m) && (this.analysisType = e)
            }
            ,
            AnalyserView.prototype.analysisType = function() {
                return this.analysisType
            }
            ,
            AnalyserView.prototype.doFrequencyAnalysis = function(e) {
                var t = this.freqByteData;
                switch (this.analysisType) {
                case d:
                    this.analyser.smoothingTimeConstant = .75,
                    this.analyser.getByteFrequencyData(t);
                    break;
                case g:
                case m:
                    this.analyser.smoothingTimeConstant = 0,
                    this.analyser.getByteFrequencyData(t);
                    break;
                case y:
                    this.analyser.smoothingTimeConstant = .1,
                    this.analyser.getByteTimeDomainData(t)
                }
                this.drawGL()
            }
            ,
            AnalyserView.prototype.drawGL = function() {
                var e = this.canvas
                  , t = this.gl
                  , n = this.vbo
                  , i = this.vboTexCoordOffset
                  , r = this.sonogram3DVBO
                  , s = this.vbo3DTexCoordOffset
                  , o = this.sonogram3DGeometrySize
                  , a = this.sonogram3DNumIndices
                  , l = (this.sonogram3DWidth,
                this.sonogram3DHeight)
                  , u = this.freqByteData
                  , h = this.texture
                  , c = this.TEXTURE_HEIGHT
                  , b = this.frequencyShader
                  , E = this.waveformShader
                  , A = this.sonogramShader
                  , T = this.sonogram3DShader;
                t.bindTexture(t.TEXTURE_2D, h),
                t.pixelStorei(t.UNPACK_ALIGNMENT, 1),
                this.analysisType != g && this.analysisType != m && (this.yoffset = 0),
                t.texSubImage2D(t.TEXTURE_2D, 0, 0, this.yoffset, u.length, 1, t.ALPHA, t.UNSIGNED_BYTE, u),
                this.analysisType != g && this.analysisType != m || (this.yoffset = (this.yoffset + 1) % c);
                var x, B, _, I, L, R, S, C = this.yoffset;
                switch (this.analysisType) {
                case d:
                case y:
                    t.bindBuffer(t.ARRAY_BUFFER, n),
                    S = this.analysisType == d ? b : E,
                    S.bind(),
                    x = S.gPositionLoc,
                    B = S.gTexCoord0Loc,
                    _ = S.frequencyDataLoc,
                    I = S.foregroundColorLoc,
                    L = S.backgroundColorLoc,
                    t.uniform1f(S.yoffsetLoc, .5 / (c - 1)),
                    R = i;
                    break;
                case g:
                    t.bindBuffer(t.ARRAY_BUFFER, n),
                    A.bind(),
                    x = A.gPositionLoc,
                    B = A.gTexCoord0Loc,
                    _ = A.frequencyDataLoc,
                    I = A.foregroundColorLoc,
                    L = A.backgroundColorLoc,
                    t.uniform1f(A.yoffsetLoc, C / (c - 1)),
                    R = i;
                    break;
                case m:
                    t.bindBuffer(t.ARRAY_BUFFER, r),
                    T.bind(),
                    x = T.gPositionLoc,
                    B = T.gTexCoord0Loc,
                    _ = T.frequencyDataLoc,
                    I = T.foregroundColorLoc,
                    L = T.backgroundColorLoc,
                    t.uniform1i(T.vertexFrequencyDataLoc, 0);
                    var D = this.yoffset / (c - 1);
                    t.uniform1f(T.yoffsetLoc, D);
                    var U = Math.floor(D * (l - 1)) / (l - 1);
                    t.uniform1f(T.vertexYOffsetLoc, U),
                    t.uniform1f(T.verticalScaleLoc, o / 3.5),
                    t.uniform1f(T.hueStartAngleLoc, globalThis.hueStartAngle),
                    t.uniform1f(T.hueFinishAngleLoc, globalThis.hueFinishAngle),
                    t.uniform1f(T.satStartLoc, params.get("satStart")?parseFloat(params.get("satStart")):1),
                    t.uniform1f(T.satFinishLoc, params.get("satFinish")?parseFloat(params.get("satFinish")):1),
                    t.uniform1f(T.valStartLoc, params.get("valStart")?parseFloat(params.get("valStart")):1),
                    t.uniform1f(T.valFinishLoc, params.get("valFinish")?parseFloat(params.get("valFinish")):1),
                    w.loadIdentity(),
                    w.perspective(55, e.width / e.height, 1, 100),
                    v.loadIdentity(),
                    v.translate(0, 0, -9),
                    p.loadIdentity(),
                    p.rotate(this.cameraController.xRot, 1, 0, 0),
                    p.rotate(this.cameraController.yRot, 0, 1, 0),
                    p.rotate(this.cameraController.zRot, 0, 0, 1),
                    p.translate(this.cameraController.xT, this.cameraController.yT, this.cameraController.zT);
                    var F = new f;
                    F.multiply(p),
                    F.multiply(v),
                    F.multiply(w),
                    t.uniformMatrix4fv(T.worldViewProjectionLoc, t.FALSE, F.elements),
                    R = s
                }
                _ && t.uniform1i(_, 0),
                I && t.uniform4fv(I, this.foregroundColor),
                L && t.uniform4fv(L, this.backgroundColor),
                t.enableVertexAttribArray(x),
                t.vertexAttribPointer(x, 3, t.FLOAT, !1, 0, 0),
                t.enableVertexAttribArray(B),
                t.vertexAttribPointer(B, 2, t.FLOAT, t.FALSE, 0, R),
                t.clear(t.COLOR_BUFFER_BIT | t.DEPTH_BUFFER_BIT),
                this.analysisType == d || this.analysisType == y || this.analysisType == g ? t.drawArrays(t.TRIANGLES, 0, 6) : this.analysisType == m && t.drawElements(t.TRIANGLES, a, t.UNSIGNED_SHORT, 0),
                t.disableVertexAttribArray(x),
                t.disableVertexAttribArray(B)
            }
            ,
            AnalyserView.prototype.setAnalyserNode = function(e) {
                this.analyser = e
            }
            ,
            t.exports = AnalyserView
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/3D/visualizer.js", "/3D")
    }
    , {
        "./cameraController": 5,
        "./matrix4x4": 6,
        buffer: 2,
        rH1JPG: 4
    }],
    8: [function(e, t, n) {
        (function(e, t, n, i, r, s, o, a, l) {
            !function() {
                var e = navigator.userAgent
                  , t = "ontouchstart"in document.documentElement
                  , n = e.match(/iPhone|iPad|iPod/i)
                  , i = document.createElement("div")
                  , r = document.createElement("div")
                  , s = document.createElement("style");
                s.innerText = "#start:active, #start:focus { transform: scale(1.1); };",
                document.head.appendChild(s),
                (t || n) && (i.style.top = 0,
                i.style.left = 0,
                i.style.position = "absolute",
                i.style.height = "100%",
                i.style.width = "100%",
                i.style.textAlign = "center",
                i.style.zIndex = 99999,
                r.style.borderRadius = "5px",
                r.style.font = "normal 4vmin/6vmin Poppins, Helvetica, Arial",
                r.style.color = "white",
                r.style.margin = "0 auto",
                r.style.zIndex = 999,
                r.style.textAlign = "center",
                r.style.padding = "10px",
                n ? (r.style.background = "#707070",
                r.style.marginTop = "15%",
                r.style.width = "75%",
                r.innerText = "Heads up — if you have your iOS device in Silent Mode, audio playback is affected.") : (i.style.display = "flex",
                i.style.alignItems = "center",
                i.style.background = "#fff",
                r.style.padding = "0",
                r.id = "start",
                r.style.width = "5pc",
                r.style.height = "5pc",
                r.style.display = "flex",
                r.style.alignItems = "center",
                r.style.justifyContent = "center",
                r.style.lineHeight = "5pc",
                r.style.backgroundColor = "#fff",
                r.style.boxShadow = "0 0 10px 0 rgba(0, 0, 0, 0.4)",
                r.style.borderRadius = "50%",
                r.style.color = "#646464",
                r.style.transition = "transform .05s ease-in",
                r.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="currentColor" d="M8 5v14l11-7z"/><path d="M0 0h24v24H0z" fill="none"/></svg>'),
                i.appendChild(r),
                document.body.appendChild(i));
                var o = !n && t ? document.querySelector("#start") : window
                  , a = !n && t ? "touchend" : "touchstart";
                o.addEventListener(a, function l() {
                    r.style.display = "none",
                    i.style.display = "none";
                    const e = window.AudioContext || window.webkitAudioContext;
                    e && e.state && "running" !== e.state && e.resume(),
                    o.removeEventListener(a, l, !1)
                }, !1)
            }()
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/Touchstart.js", "/")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }],
    9: [function(e, t, n) {
        (function(t, n, i, r, s, o, a, l, u) {
            "use strict";
            window.isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
            window.isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream,
            window.isAndroid = /Android/.test(navigator.userAgent) && !window.MSStream,
            window.requestAnimFrame = function() {
                return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(e) {
                    window.setTimeout(e, 1e3 / 60)
                }
            }(),
            e("./Touchstart");
            var h = e("./ui/spectrogram");
            $(function() {
                var e = function() {
                    for (var e = window.location.search.slice(1).split("&"), t = 0; t < e.length; ++t) {
                        var n = e[t].split("=");
                        e[t] = {},
                        e[t][n[0]] = n[1]
                    }
                    return e
                }
                  , t = function() {
                    for (var t = e(), n = "en", i = 0; i < t.length; i++)
                        void 0 != t[i].ln && (n = t[i].ln);
                    var r = "https://gweb-musiclab-site.appspot.com/static/locales/" + n + "/locale-music-lab.json";
                    $.ajax({
                        url: r,
                        dataType: "json",
                        async: !0,
                        success: function(e) {
                            $.each(e, function(e, t) {
                                var n = $("[data-name='" + e + "']");
                                n.length > 0 && (console.log("value.message", t.message),
                                n.attr("data-name", t.message))
                            })
                        },
                        error: function(e) {
                            console.warn(e)
                        }
                    })
                }
                  , n = function() {
                    var e = null;
                    t(),
                    window.parent.postMessage("ready", "*");
                    var n = h;
                    n.attached(),
                    $(".music-box__tool-tip").hide(0),
                    $("#loadingSound").hide(0),
                    $(".music-box__buttons__button").click(function(e) {
                        n.startRender();
                        n.isPlaying();
                        n.stop(),
                        n.drawingMode = !1,
                        $(this).hasClass("selected") ? $(".music-box__buttons__button").removeClass("selected") : ($(".music-box__buttons__button").removeClass("selected"),
                        void 0 !== $(this).attr("data-mic") ? ($("#record").fadeIn().delay(2e3).fadeOut(),
                        n.live()) : void 0 !== $(this).attr("data-draw") ? (n.drawingMode = !0,
                        $("#drawAnywhere").fadeIn().delay(2e3).fadeOut()) : void 0 !== $(this).attr("data-src") && (n.loopChanged(!0),
                        $("#loadingMessage").text($(this).attr("data-name")),
                        n.play($(this).attr("data-src"))))
                    });
                    var i = function() {
                        n.startRender();
                        n.isPlaying();
                        n.stop(),
                        n.drawingMode = !1,
                        $(".music-box__buttons__button").removeClass("selected")
                    };
                    window.addEventListener("blur", function() {
                        i()
                    }),
                    document.addEventListener("visibilitychange", function() {
                        i()
                    });
                    var r = function(t) {
                        var i = window.AudioContext || window.webkitAudioContext
                          , r = new i
                          , s = null
                          , o = new FileReader;
                        o.onload = function(t) {
                            var i = t.target.result;
                            r.decodeAudioData(i, function(t) {
                                s = t,
                                e = r.createBufferSource(),
                                e.buffer = s,
                                e.loop = !0,
                                e.connect(r.destination),
                                n.startRender(),
                                n.loopChanged(!0),
                                n.userAudio(e),
                                $("#loadingSound").delay(500).fadeOut().hide(0)
                            }, function(e) {
                                console.log("Error decoding file", e)
                            })
                        }
                        ,
                        o.readAsArrayBuffer(t)
                    }
                      , s = function() {
                        var e = $("#fileDrop")
                          , t = $(".file-overlay-description");
                        $(window).on({
                            dragover: function(n) {
                                n.preventDefault(),
                                n.stopPropagation(),
                                t.text("Drop your sound file here."),
                                e.addClass("active")
                            },
                            dragleave: function(t) {
                                t.preventDefault(),
                                t.stopPropagation(),
                                e.removeClass("active")
                            },
                            drop: function(n) {
                                n.preventDefault(),
                                n.stopPropagation(),
                                e.addClass("pointer-events"),
                                i();
                                var s = n.originalEvent.dataTransfer;
                                s && s.files.length && s.items[0] && "audio/midi" !== s.items[0].type ? $.each(s.files, function(n, i) {
                                    i.type.indexOf("audio") > -1 ? ($("#loadingMessage").text(i.name),
                                    $("#loadingSound").show(0),
                                    r(i),
                                    e.removeClass("active"),
                                    e.removeClass("pointer-events")) : t.text("Only sound files will work here.")
                                }) : t.text("Only sound files will work here.")
                            }
                        }),
                        e.on("click", function() {
                            e.removeClass("active"),
                            e.removeClass("pointer-events")
                        })
                    };
                    s()
                }
                  , i = $("#iosButton");
                window.isIOS ? (window.parent.postMessage("loaded", "*"),
                window.addEventListener("touchend", function r() {
                    n(),
                    window.removeEventListener("touchend", r, !1)
                }, !1)) : (i.addClass("hide"),
                n())
            })
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/fake_a7cf4434.js", "/")
    }
    , {
        "./Touchstart": 8,
        "./ui/spectrogram": 11,
        buffer: 2,
        rH1JPG: 4
    }],
    10: [function(e, t, n) {
        (function(n, i, r, s, o, a, l, u, h) {
            function f() {
                window.AudioContext = window.AudioContext || window.webkitAudioContext,
                context = new AudioContext;
                var e = context.createAnalyser();
                e.fftSize = window.isMobile ? 1024 : 2048,
                e.smoothingTimeConstant = 0;
                var t = context.createGain()
                  , n = context.createBiquadFilter();
                n.Q.value = 10,
                n.type = "bandpass";
                var i = context.createGain();
                i.gain.value = 1,
                t.connect(e),
                e.connect(i),
                i.connect(context.destination),
                this.context = context,
                this.mix = t,
                this.filterGain = i,
                this.analyser = e,
                this.buffers = {},
                c.loadTrackSrc(this.context, "bin/snd/empty.mp3", function(e) {
                    var t = this.createSource_(e, !0);
                    t.loop = !0,
                    t.start(0)
                }
                .bind(this))
            }
            var c = e("../util/util.js");
            f.prototype.playSrc = function(e) {
                return this.filterGain.gain.value = 1,
                this.input ? (this.input.disconnect(),
                void (this.input = null)) : this.buffers[e] ? ($("#loadingSound").fadeIn(100).delay(1e3).fadeOut(500),
                void this.playHelper_(e)) : ($("#loadingSound").fadeIn(100),
                void c.loadTrackSrc(this.context, e, function(t) {
                    this.buffers[e] = t,
                    this.playHelper_(e),
                    $("#loadingSound").delay(500).fadeOut(500)
                }
                .bind(this)))
            }
            ,
            f.prototype.playUserAudio = function(e) {
                return this.filterGain.gain.value = 1,
                this.input ? (this.input.disconnect(),
                void (this.input = null)) : (this.buffers.user = e.buffer,
                void this.playHelper_("user"))
            }
            ,
            f.prototype.playHelper_ = function(e) {
                var t = this.buffers[e];
                this.source = this.createSource_(t, !0),
                this.source.start(0),
                this.loop || (this.playTimer = setTimeout(function() {
                    this.stop()
                }
                .bind(this), 2e3 * t.duration))
            }
            ,
            f.prototype.live = function() {
                if ("suspended" === this.context.state && this.context.resume(),
                this.input)
                    return this.input.disconnect(),
                    void (this.input = null);
                var e = this;
                navigator.mediaDevices.getUserMedia({
                    audio: !0
                }).then(function(t) {
                    e.onStream_(t)
                })["catch"](function() {
                    e.onStreamError(this)
                }),
                this.filterGain.gain.value = 0
            }
            ,
            f.prototype.onStream_ = function(e) {
                var t = this.context.createMediaStreamSource(e);
                t.connect(this.mix),
                this.input = t,
                this.stream = e
            }
            ,
            f.prototype.onStreamError_ = function(e) {
                console.log(e)
            }
            ,
            f.prototype.setLoop = function(e) {
                this.loop = e
            }
            ,
            f.prototype.createSource_ = function(e, t) {
                var n = this.context.createBufferSource();
                return n.buffer = e,
                n.loop = t,
                n.connect(this.mix),
                n
            }
            ,
            f.prototype.setMicrophoneInput = function() {}
            ,
            f.prototype.stop = function() {
                if (this.source && (this.source.stop(0),
                this.source = null,
                clearTimeout(this.playTimer),
                this.playTimer = null),
                this.input)
                    return this.input.disconnect(),
                    void (this.input = null)
            }
            ,
            f.prototype.getAnalyserNode = function() {
                return this.analyser
            }
            ,
            f.prototype.setBandpassFrequency = function(e) {
                null == e ? (console.log("Removing bandpass filter"),
                this.mix.disconnect(),
                this.mix.connect(this.analyser)) : (this.bandpass.frequency.value = e,
                this.mix.disconnect(),
                this.mix.connect(this.bandpass),
                this.filterGain.connect(this.analyser))
            }
            ,
            f.prototype.playTone = function(e) {
                this.context && this.context.state && "running" !== this.context.state && this.context.resume(),
                this.osc || (this.osc = this.context.createOscillator(),
                this.osc.connect(this.mix),
                this.osc.type = "sine",
                this.osc.start(0)),
                this.osc.frequency.value = e,
                this.filterGain.gain.value = .2
            }
            ,
            f.prototype.stopTone = function() {
                this.osc.stop(0),
                this.osc = null
            }
            ,
            t.exports = f
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/ui/player.js", "/ui")
    }
    , {
        "../util/util.js": 12,
        buffer: 2,
        rH1JPG: 4
    }],
    11: [function(e, t, n) {
        (function(n, i, r, s, o, a, l, u, h) {
            "use strict";
            var f = e("../util/util.js")
              , c = e("../ui/player")
              , d = e("../3D/visualizer")
              , g = {
                cxRot: 90,
                drawingMode: !1,
                prevX: 0,
                handleTrack: function(e) {
                    switch (e.type) {
                    case "mousedown":
                    case "touchstart":
                        if (g.prevX = Number(e.pageX) || Number(e.originalEvent.touches[0].pageX),
                        $(e.currentTarget).on("mousemove", g.handleTrack),
                        $(e.currentTarget).on("touchmove", g.handleTrack),
                        0 == g.drawingMode)
                            return !1;
                        var t = g.yToFreq(Number(e.pageY) || Number(e.originalEvent.touches[0].pageY));
                        return g.isPlaying() ? g.player.setBandpassFrequency(t) : g.player.playTone(t),
                        !1;
                    case "mousemove":
                    case "touchmove":
                        var n = (Number(e.pageX) || Number(e.originalEvent.touches[0].pageX)) - g.prevX;
                        if (g.prevX = Number(e.pageX) || Number(e.originalEvent.touches[0].pageX),
                        g.drawingMode) {
                            var i = Number(e.pageY) || Number(e.originalEvent.touches[0].pageY)
                              , t = g.yToFreq(i);
                            g.isPlaying() ? g.player.setBandpassFrequency(t) : g.player.playTone(t)
                        } else
                            g.isPlaying() && (g.cxRot += .2 * n,
                            g.cxRot < 0 ? g.cxRot = 0 : g.cxRot > 90 && (g.cxRot = 90));
                        return !1;
                    case "mouseup":
                    case "touchend":
                        return $(e.currentTarget).off("mousemove", g.handleTrack),
                        $(e.currentTarget).off("touchmove", g.handleTrack),
                        0 != g.drawingMode && (g.isPlaying() ? g.player.setBandpassFrequency(null) : g.player.stopTone(),
                        !1)
                    }
                },
                attached: function() {
                    console.log("spectrogram-3d attached"),
                    f.setLogScale(20, 20, 2e4, 2e4),
                    g.onResize_(),
                    g.init_(),
                    window.addEventListener("resize", g.onResize_.bind(g))
                },
                stop: function() {
                    g.player.stop()
                },
                isPlaying: function() {
                    return !!this.player.source
                },
                stopRender: function() {
                    g.isRendering = !1
                },
                startRender: function() {
                    g.isRendering || (g.isRendering = !0,
                    g.draw_())
                },
                loopChanged: function(e) {
                    g.player.setLoop(e)
                },
                play: function(e) {
                    g.src = e,
                    g.player.playSrc(e)
                },
                live: function() {
                    g.player.live()
                },
                userAudio: function(e) {
                    g.player.playUserAudio(e)
                },
                init_: function() {
                    var e = new c
                      , t = e.getAnalyserNode()
                      , n = new d(this.canvas);
                    n.setAnalyserNode(t),
                    n.initByteBuffer(),
                    g.player = e,
                    g.analyserView = n,
                    $("#spectrogram").on("mousedown", this.handleTrack).on("touchstart", this.handleTrack).on("mouseup", this.handleTrack).on("touchend", this.handleTrack)
                },
                onResize_: function() {
                    console.log("onResize_");
                    var e = $("#spectrogram")[0];
                    g.canvas = e,
                    e.width = $(window).width(),
                    e.height = $(window).height()*(params.get('height')?parseFloat(params.get('height')):100)/100;
                    // var t = $("#legend")[0];
                    // t.width = $(window).width(),
                    // t.height = $(window).height() - 158,
                    // g.drawLegend_()
                },
                draw_: function() {
                    return g.isRendering ? (g.analyserView.doFrequencyAnalysis(),
                    void requestAnimationFrame(g.draw_.bind(g))) : void console.log("stopped draw_")
                },
                drawLegend_: function() {
                    var e = $("#legend")[0]
                      , t = e.getContext("2d")
                      , n = e.width - 10;
                    t.fillStyle = "#FFFFFF",
                    t.font = "14px Roboto",
                    t.textAlign = "right",
                    t.textBaseline = "middle",
                    t.fillText("20,000 Hz -", n, e.height - g.freqToY(2e4)),
                    t.fillText("2,000 Hz -", n, e.height - g.freqToY(2e3)),
                    t.fillText("200 Hz -", n, e.height - g.freqToY(200)),
                    t.fillText("20 Hz -", n, e.height - g.freqToY(20))
                },
                freqStart: 20,
                freqEnd: 2e4,
                padding: 30,
                yToFreq: function(e) {
                    var t = g.padding
                      , n = $("#spectrogram").height();
                    if (n < 2 * t || e < t || e > n - t)
                        return null;
                    var i = 1 - (e - t) / (n - t)
                      , r = g.freqStart + (g.freqEnd - g.freqStart) * i;
                    return f.lin2log(r)
                },
                freqToY: function(e) {
                    var t = f.log2lin(e)
                      , n = $("#spectrogram").height()
                      , i = g.padding
                      , r = (t - g.freqStart) / (g.freqEnd - g.freqStart);
                    return g.padding + r * (n - 2 * i)
                },
                easeInOutCubic: function(e, t, n, i) {
                    return (e /= i / 2) < 1 ? n / 2 * e * e * e + t : n / 2 * ((e -= 2) * e * e + 2) + t
                },
                easeInOutQuad: function(e, t, n, i) {
                    return (e /= i / 2) < 1 ? n / 2 * e * e + t : -n / 2 * (--e * (e - 2) - 1) + t
                },
                easeInOutQuint: function(e, t, n, i) {
                    return (e /= i / 2) < 1 ? n / 2 * e * e * e * e * e + t : n / 2 * ((e -= 2) * e * e * e * e + 2) + t
                },
                easeInOutExpo: function(e, t, n, i) {
                    return 0 == e ? t : e == i ? t + n : (e /= i / 2) < 1 ? n / 2 * Math.pow(2, 10 * (e - 1)) + t : n / 2 * (-Math.pow(2, -10 * --e) + 2) + t
                }
            };
            t.exports = g
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/ui/spectrogram.js", "/ui")
    }
    , {
        "../3D/visualizer": 7,
        "../ui/player": 10,
        "../util/util.js": 12,
        buffer: 2,
        rH1JPG: 4
    }],
    12: [function(e, t, n) {
        (function(e, n, i, r, s, o, a, l, u) {
            var h = window.Util || {};
            h.loadTrackSrc = function(e, t, n, i) {
                var r = new XMLHttpRequest;
                r.open("GET", t, !0),
                r.responseType = "arraybuffer",
                r.onload = function() {
                    e.decodeAudioData(r.response, function(e) {
                        n(e)
                    }, function(e) {
                        console.error(e)
                    })
                }
                ,
                i && (r.onprogress = function(e) {
                    var t = e.loaded / e.total;
                    i(t)
                }
                ),
                r.send()
            }
            ,
            h.setLogScale = function(e, t, n, i) {
                this.b = Math.log(t / i) / (e - n),
                this.a = t / Math.exp(this.b * e)
            }
            ,
            h.lin2log = function(e) {
                return this.a * Math.exp(this.b * e)
            }
            ,
            h.log2lin = function(e) {
                return Math.log(e / this.a) / this.b
            }
            ,
            t.exports = h
        }
        ).call(this, e("rH1JPG"), "undefined" != typeof self ? self : "undefined" != typeof window ? window : {}, e("buffer").Buffer, arguments[3], arguments[4], arguments[5], arguments[6], "/util/util.js", "/util")
    }
    , {
        buffer: 2,
        rH1JPG: 4
    }]
}, {}, [9]);
