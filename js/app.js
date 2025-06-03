var ht = Object.defineProperty;
var pt = (e, t, o) => t in e ? ht(e, t, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: o
}) : e[t] = o;
var f = (e, t, o) => (pt(e, typeof t != "symbol" ? t + "" : t, o),
o);
const N = {
    isStreamerApp: !1
};
function fn(e) {
    N.isStreamerApp = e
}
const St = navigator.userAgent.includes("Safari") && !/(chrome|firefox)/i.test(window.navigator.userAgent);
function ie() {
    const e = window.innerWidth * (window.devicePixelRatio ?? 1)
      , t = window.innerHeight * (window.devicePixelRatio ?? 1);
    return e <= 640 && t <= 480 ? "480p" : e <= 1920 && t <= 1080 ? "1080p" : "4K"
}
const Y = new Map;
function y(e, t, o) {
    function n(d) {
        Y.set(e, {
            value: d,
            defaultOption: t,
            options: o
        })
    }
    let a = new URL(location.href).searchParams.get(e);
    return o.includes(a) || (a = localStorage[`settings.${e}`],
    o.includes(a)) ? n(a) : n(t)
}
function u(e, t=null) {
    return Y.has(e) ? Y.get(e).value : t
}
function w(e, t, o=!0) {
    const n = Y.get(e);
    if (n == null) {
        console.warn(`Option "${e}" is not supported. ignoring...`);
        return
    } else if (!n.options.includes(t)) {
        console.warn(`Value "${t}" for option "${e}" is not supported. ignoring...`);
        return
    }
    n.value = t,
    localStorage[`settings.${e}`] = t,
    o && (t == n.defaultOption ? Re(e, null) : Re(e, t))
}
function yt() {
    const e = {};
    for (const [t,o] of Y.entries())
        e[t] = o.value;
    return e
}
function wt() {
    const e = new URL(location.origin + location.pathname);
    for (const [t,o] of Y.entries())
        e.searchParams.set(t, o.value);
    return e.href
}
function Re(e, t=null) {
    try {
        const o = new URL(location.href);
        t == null ? o.searchParams.delete(e) : o.searchParams.set(e, t),
        history.replaceState(null, document.title, location.pathname + o.search)
    } catch (o) {
        console.error(o)
    }
}
function vt() {
    return /(chrome|safari|firefox)/i.test(window.navigator.userAgent) ? "image" : "system"
}
function Tt() {
    try {
        if (Intl.DateTimeFormat(void 0, {
            hour: "numeric"
        }).resolvedOptions().hour12)
            return "12-ampm"
    } catch (e) {
        console.error(e)
    }
    return "24"
}
function _t() {
    for (const e of navigator.languages ?? [])
        switch (e) {
        case "en-US":
        case "en-CA":
            return "american";
        case "en-GB":
        case "en-AU":
        case "en-NZ":
            return "british"
        }
    return "custom"
}
function Ct() {
    y("theme", vt(), ["system", "light", "dark", "image"]),
    y("hours", Tt(), ["24", "12", "12-ampm"]),
    y("seconds", "hide", ["show", "hide"]),
    y("date", "d", ["hide", "d", "dd", "dm", "md"]),
    y("dateFormat", _t(), ["american", "british", "custom"]),
    y("day", "short", ["short", "full", "hide"]),
    y("month", "short", ["short", "full", "hide"]),
    y("year", "hide", ["short", "full", "hide"]),
    y("clockSize", "fill", ["xs", "s", "m", "l", "xl", "fill"]),
    y("font", "1", ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]),
    y("imageDescription", "show", ["show", "caption", "credit", "hide"]),
    y("imageDescriptionSize", "fit", ["xs", "s", "m", "l", "xl", "fit"]),
    y("imageChangeInterval", "latest", ["latest", "1d", "12h", "6h", "3h", "1h", "30m", "10m", "5m", "3m", "1m"]),
    y("imageEffect", "normal", ["normal", "blur", "darken"]),
    y("textEffect", "adaptive-white", ["adaptive-white", "white"]),
    y("clockPosition", "center", ["center", "aboveCenter", "top", "belowCenter", "bottom"])
}
Ct();
const Ne = 2147483647;
class Xe {
    constructor(t, o) {
        f(this, "_callback");
        f(this, "_startTime");
        f(this, "_delay");
        f(this, "_timeout");
        this._callback = t,
        this._delay = o,
        this._startTime = Date.now(),
        this._onTimeout = this._onTimeout.bind(this),
        this._timeout = setTimeout(this._onTimeout, Math.floor(Math.max(0, Math.min(o, Ne))))
    }
    destroy() {
        this._timeout != null && (clearTimeout(this._timeout),
        this._timeout = void 0)
    }
    _onTimeout() {
        const o = Date.now() - this._startTime
          , n = this._delay - o;
        n <= 0 ? (this._timeout = void 0,
        this._callback()) : this._timeout = setTimeout(this._onTimeout, Math.min(n, Ne))
    }
}
function ce(e, t) {
    return new Xe(e,t)
}
function se(e) {
    e != null && (e instanceof Xe ? e.destroy() : clearTimeout(e))
}
const G = ["480p", "1080p", "4K"];
function He(e, t) {
    return t == null ? !0 : G.indexOf(e) > G.indexOf(t)
}
function _e(e, t) {
    switch (t) {
    case "480p":
        return e.thumbUrl;
    case "1080p":
        return e.fullUrl;
    case "4K":
        return e.imageUrl
    }
    return e.fullUrl
}
function Ue(e) {
    const t = G.indexOf(e);
    return G.slice(t + 1)
}
function kt(e) {
    const t = G.indexOf(e);
    return G.slice(0, t).reverse()
}
function fe(e, t="show") {
    return t === "caption" ? (e.title || "").trim() : t === "credit" ? (e.copyright || "").trim() : [e.title, e.copyright].filter(o => o != null && o.trim() !== "").join(" | ")
}
function J(e) {
    return e.pageUrl
}
function et(e) {
    switch (e) {
    case "latest":
        return 1e3 * 60 * 60;
    case "1d":
        return 1e3 * 60 * 60 * 24;
    case "12h":
        return 1e3 * 60 * 60 * 12;
    case "6h":
        return 1e3 * 60 * 60 * 6;
    case "3h":
        return 1e3 * 60 * 60 * 3;
    case "1h":
        return 1e3 * 60 * 60;
    case "30m":
        return 1e3 * 60 * 30;
    case "10m":
        return 1e3 * 60 * 10;
    case "5m":
        return 1e3 * 60 * 5;
    case "3m":
        return 1e3 * 60 * 3;
    case "1m":
        return 1e3 * 60
    }
    return 1e3 * 60
}
function We(e) {
    const [t,o] = e.filename.split(".json")[0].split("-").map(Number);
    return isNaN(t) || isNaN(o) ? [0, 0] : [t, o]
}
function Le(e, t) {
    const o = new Date(e);
    o.setHours(0, 0, 0, 0);
    const s = (e - o.getTime()) % t;
    return e - s
}
const Be = "wallpapersCache"
  , we = {
    get backgroundImage() {
        return document.querySelector("#container>.backgroundImage")
    },
    get imageInfoMessage() {
        return document.querySelector("#footer>.messages>.imageInfo")
    }
};
function tt(e, t=1, o=100) {
    let n = null, s, a = !1, d = t;
    function l() {
        a || (a = !0,
        n = null,
        clearTimeout(s),
        s = void 0,
        e())
    }
    function c() {
        a || (d--,
        d === 0 ? l() : n = requestAnimationFrame(c))
    }
    return n = requestAnimationFrame(c),
    s = setTimeout( () => {
        a || (a = !0,
        s = void 0,
        n != null && cancelAnimationFrame(n),
        n = null,
        e())
    }
    , o),
    {
        destroy() {
            a || (a = !0,
            n != null && cancelAnimationFrame(n),
            n = null,
            clearTimeout(s),
            s = void 0)
        }
    }
}
function Ie(e) {
    var t;
    (t = e == null ? void 0 : e.destroy) == null || t.call(e)
}
const Lt = 1e3 * 4;
let Q = null
  , he = null
  , pe = null
  , be = null
  , ue = !1
  , U = null
  , X = null
  , re = null
  , ee = null
  , K = null
  , te = null;
function ze() {
    const e = Q;
    e == null || ue || (e.classList.add("hide"),
    e.inert = !0,
    ue = !0,
    setTimeout( () => {
        e.remove(),
        Q === e && (Q = null,
        he = null,
        pe = null,
        be = null,
        ue = !1,
        te == null || te())
    }
    , Lt))
}
function It(e) {
    if (e == null) {
        ze();
        return
    }
    const t = J(e);
    if (be === t && !ue)
        return;
    if (K != null) {
        if (K === t)
            return;
        Ie(re),
        re = null,
        ee = null,
        K = null,
        U == null || U.remove(),
        U = null,
        X = null,
        te = null
    }
    const o = u("imageDescription")
      , n = document.createElement("a");
    n.classList.add("message", "hide"),
    n.inert = !0,
    n.href = e.pageUrl,
    n.rel = "noopener nofollow",
    n.target = "_blank";
    const s = document.createElement("div");
    s.classList.add("text"),
    s.innerText = fe(e, o),
    n.appendChild(s);
    function a() {
        n.classList.remove("hide"),
        n.inert = !1,
        Q = n,
        he = s,
        pe = e,
        be = t,
        U === n && (U = null,
        X = null,
        ee = null,
        K = null,
        re = null)
    }
    we.imageInfoMessage.appendChild(n),
    U = n,
    X = s,
    ee = e,
    K = t,
    Q != null ? (te = a,
    ze()) : re = tt(a)
}
function bt() {
    const e = u("imageDescription");
    he != null && pe != null && (he.innerText = fe(pe, e)),
    X != null && ee != null && (X.innerText = fe(ee, e))
}
const xt = 1e3 * 9
  , Pe = new Set
  , V = new Map;
let $e = null
  , L = null
  , Se = [];
function De() {
    return L != null && L.isShown
}
function nt(e) {
    const t = J(e);
    if (V.has(t))
        return V.get(t);
    const o = new Pt(e);
    return V.set(J(e), o),
    o
}
async function Ve(e, t=ie()) {
    const o = nt(e)
      , n = J(e);
    if ($e = n,
    await o.load(t),
    !($e !== n || L === o || o.isShown)) {
        o.show(L == null),
        It(e),
        L == null || L.hide(),
        L = o;
        for (const s of Pe)
            s()
    }
}
async function ot(e) {
    L != null && L.isShown && await L.load(e)
}
function je(e, t=ie()) {
    const o = new Set;
    Se = [];
    for (const n of e) {
        o.add(J(n));
        const s = nt(n);
        s.isLoading && s.load(t),
        Se.push([s, t])
    }
    for (const [n,s] of V.entries())
        s.isShown || L === s || o.has(n) || s.destroy();
    st()
}
let Ce = !1
  , de = !1;
async function st() {
    if (de = !0,
    Ce)
        return;
    if (Se.length === 0) {
        de = !1;
        return
    }
    Ce = !0;
    const [e,t] = Se.shift();
    try {
        await e.load(t)
    } catch (o) {
        o instanceof ge || console.error("Failed to preload wallpaper", o)
    } finally {
        Ce = !1,
        de && st()
    }
}
function At() {
    de = !1
}
class ge extends Error {
}
class Pt {
    constructor(t) {
        f(this, "_wallpaper");
        f(this, "_loadedImageContainer", null);
        f(this, "_loadedImage", null);
        f(this, "_loadedImageResolution", null);
        f(this, "_loadedImageResolutionIsFallback", !1);
        f(this, "_loadingPromise", null);
        f(this, "_loadingResolution", null);
        f(this, "_loadingController", null);
        f(this, "_isLoaded", !1);
        f(this, "_isShown", !1);
        f(this, "_isVisible", !1);
        f(this, "_destroyAfterNotVisible", !1);
        f(this, "_removeVisibleTimeout");
        f(this, "_isDestroyed", !1);
        f(this, "_showAnimationFrame", null);
        this._wallpaper = t
    }
    destroy() {
        var o, n;
        (o = this._loadingController) == null || o.abort(),
        this._loadingController = null,
        this._isDestroyed = !0;
        const t = J(this._wallpaper);
        if (V.get(t) === this && V.delete(t),
        this._isVisible) {
            this._destroyAfterNotVisible = !0,
            this.hide();
            return
        }
        (n = this._loadedImageContainer) == null || n.remove(),
        this._loadedImageContainer = null,
        this._loadedImage = null,
        this._loadedImageResolution = null,
        this._isLoaded = !1,
        this._isShown = !1
    }
    get isLoading() {
        return this._loadingPromise != null
    }
    get isLoaded() {
        return this._isLoaded
    }
    get isDestroyed() {
        return this._isDestroyed
    }
    get loadedImageResolution() {
        return this._loadedImageResolution
    }
    get isShown() {
        return this._isShown
    }
    get wallpaper() {
        return this._wallpaper
    }
    show(t=!1) {
        var o;
        t && ((o = this._loadedImageContainer) == null || o.classList.add("first")),
        Ie(this._showAnimationFrame),
        this._showAnimationFrame = tt( () => {
            var n;
            (n = this._loadedImageContainer) == null || n.classList.remove("hide")
        }
        , 2),
        this._isVisible = !0,
        this._isShown = !0,
        clearTimeout(this._removeVisibleTimeout),
        this._removeVisibleTimeout = void 0
    }
    hide() {
        var t;
        (t = this._loadedImageContainer) == null || t.classList.add("hide"),
        this._isShown = !1,
        this._isVisible && (Ie(this._showAnimationFrame),
        this._showAnimationFrame = null,
        clearTimeout(this._removeVisibleTimeout),
        this._removeVisibleTimeout = setTimeout( () => {
            this._removeVisibleTimeout = void 0,
            this._isVisible = !1,
            this._destroyAfterNotVisible && this.destroy()
        }
        , xt))
    }
    async load(t=ie()) {
        if (this._isDestroyed || this._isLoaded && this._loadedImageResolution != null && (this._loadedImageResolution === t || He(this._loadedImageResolution, t) || this._loadedImageResolutionIsFallback))
            return;
        let o = null;
        if (this._loadingPromise != null)
            if (He(t, this._loadingResolution))
                o = this._loadingController;
            else
                return this._loadingPromise;
        this._loadingController = new AbortController,
        this._loadingResolution = t;
        const n = this._load(this._loadingResolution, this._loadingController.signal);
        this._loadingPromise = n,
        o == null || o.abort();
        try {
            await n
        } catch (s) {
            if (s instanceof ge && n !== this._loadingPromise)
                return this._loadingPromise;
            throw this._loadingPromise = null,
            this._loadingController = null,
            this._loadingResolution = null,
            s
        }
        this._loadingPromise = null,
        this._loadingController = null,
        this._loadingResolution = null
    }
    async _load(t, o) {
        let n, s, a, d = null, l = !0;
        const c = this._loadedImageContainer
          , g = this._wallpaper
          , S = Ue(t)
          , p = typeof caches < "u" && caches.open instanceof Function ? caches.open(Be) : null
          , b = [...p == null ? [] : await Promise.all(S.map(async x => {
            const H = _e(g, x);
            try {
                if (await (await p).match(H, {
                    ignoreVary: !0,
                    ignoreMethod: !0,
                    ignoreSearch: !0
                }) != null)
                    return x
            } catch {
                console.error("Failed to search for image in cache")
            }
            return null
        }
        )), t, t, ...Ue(t)].filter(x => x != null)
          , z = kt(t);
        let $ = !1;
        return new Promise( (x, H) => {
            const Te = T => {
                l && (console.error(T),
                H((T == null ? void 0 : T.error) ?? T))
            }
              , Ee = () => {
                var T;
                l && (o.removeEventListener("abort", Me),
                l = !1,
                a.classList.remove("hide"),
                (T = this._loadedImage) == null || T.remove(),
                this._loadedImageContainer = d,
                this._loadedImage = a,
                this._loadedImageResolution = s,
                this._isLoaded = !0,
                this._loadedImageResolutionIsFallback = $,
                x())
            }
            ;
            async function mt(T) {
                var Oe;
                if (typeof caches < "u" && caches.open instanceof Function)
                    try {
                        await (await caches.open(Be)).delete(n, {
                            ignoreVary: !0,
                            ignoreMethod: !0,
                            ignoreSearch: !0
                        })
                    } catch {
                        console.error("Failed to delete image from cache")
                    }
                if (!l)
                    return;
                const P = Fe();
                P != null ? (s = P,
                n = _e(g, s),
                a.remove(),
                a = qe(n),
                (Oe = d || c) == null || Oe.appendChild(a)) : (d == null || d.remove(),
                a.remove(),
                Te(T))
            }
            function qe(T) {
                const P = new Image;
                return P.loading = "eager",
                P.src = T,
                P.alt = fe(g),
                P.classList.add("image", "hide"),
                P.addEventListener("load", Ee),
                P.addEventListener("error", mt),
                P
            }
            function Fe(T=!0) {
                return T ? b.length > 0 ? ($ = !1,
                b.shift()) : ($ = !0,
                z.shift()) : b[0]
            }
            if (o.aborted) {
                l = !1,
                H(new ge("Wallpaper load aborted"));
                return
            }
            s = Fe() ?? t,
            n = _e(g, s),
            a = qe(n);
            function Me() {
                l && (l = !1,
                H(new ge("Wallpaper load aborted")),
                d == null || d.remove(),
                a.remove())
            }
            o.addEventListener("abort", Me),
            c == null ? (d = document.createElement("div"),
            d.classList.add("imageContainer", "hide"),
            d.appendChild(a),
            we.backgroundImage.appendChild(d)) : c.appendChild(a)
        }
        )
    }
}
async function Dt(e=new Date) {
    const o = await (await fetch("https://peapix.com/bing/feed?country=us")).json()
      , n = new Date(e);
    n.setDate(n.getDate() - 1);
    const s = `${n.getFullYear()}-${`${n.getMonth() + 1}`.padStart(2, "0")}-${`${n.getDate()}`.padStart(2, "0")}`
      , a = `${e.getFullYear()}-${`${e.getMonth() + 1}`.padStart(2, "0")}-${`${e.getDate()}`.padStart(2, "0")}`;
    return (o.find(l => (l == null ? void 0 : l.date) == s && (l == null ? void 0 : l.fullUrl) != null) || o.find(l => (l == null ? void 0 : l.date) == a && (l == null ? void 0 : l.fullUrl) != null) || o.find(l => (l == null ? void 0 : l.fullUrl) != null)) ?? null
}
const Et = "/wallpaperUrls/index.json"
  , qt = 1e3 * 20
  , at = new Set;
let ne = null
  , xe = !1
  , ae = !1
  , W = null;
function Ft() {
    return (W == null ? void 0 : W.files) ?? null
}
function Mt() {
    if (W == null)
        return null;
    const e = Date.now();
    return W.files.filter(t => {
        if (t.minRelevance != null) {
            const o = new Date(t.minRelevance.year,t.minRelevance.month - 1,t.minRelevance.day,0,0,0,0);
            return e >= o.getTime()
        }
        return !0
    }
    )
}
function Ot(e=Date.now()) {
    if (W == null)
        return e + qt;
    const t = new Date(e);
    return t.setDate(t.getDate() + 1),
    t.setHours(Math.round(Math.random() * 23), Math.round(Math.random() * 59), Math.round(Math.random() * 59), Math.round(Math.random() * 999)),
    t.getTime()
}
async function it() {
    xe = !0,
    se(ne),
    ne = null;
    const e = Date.now();
    try {
        const t = await fetch(Et);
        if (!t.ok)
            throw new Error(`Failed to fetch wallpaper index: ${t.status} ${t.statusText}`);
        if (W = await t.json(),
        ae)
            for (const n of at)
                n()
    } catch (t) {
        console.error("Failed to check for wallpaper updates: ", t)
    } finally {
        if (xe = !1,
        ae) {
            const t = Ot(e);
            ne = ce(it, t - Date.now())
        }
    }
}
function Rt() {
    ae || (ae = !0,
    !xe && it())
}
function Nt() {
    ae = !1,
    se(ne),
    ne = null
}
const Ht = "/wallpaperUrls/"
  , ye = new Map
  , oe = new Map;
function Ut() {
    for (const e of oe.values())
        e.abort()
}
async function Ye(e) {
    var a, d;
    const t = []
      , o = []
      , n = Mt();
    if (n == null)
        return t;
    for (const {index: l, month: c, wholeYear: g, skipMonths: S} of e)
        if (c != null) {
            let p = 0;
            if (g === !0)
                for (let b = 0; b < n.length; b++) {
                    const [,z] = We(n[b]);
                    if (z === 12) {
                        p = b;
                        break
                    }
                }
            p += S ?? 0,
            o.push([((a = n[c + p]) == null ? void 0 : a.filename) ?? n[p].filename, ((d = n[c + p]) == null ? void 0 : d.filename) == null ? (l + c) % n[p].items : l % n[c + p].items])
        } else {
            let p = 0
              , b = !1
              , z = g === !0
              , $ = S ?? 0;
            for (const x of n) {
                if (z) {
                    const [,H] = We(x);
                    if (H === 12)
                        z = !1;
                    else
                        continue
                }
                if ($ > 0) {
                    $--;
                    continue
                }
                if (l < p + x.items) {
                    o.push([x.filename, l - p]),
                    b = !0;
                    break
                }
                p += x.items
            }
            b || (console.warn(`Cannot resolve background image index ${l}. Falling back to first images`),
            o.push([n[0].filename, l % n[0].items]))
        }
    const s = await Promise.all(o.map(async ([l,c]) => [await Bt(l), c]));
    for (const [l,c] of s) {
        if (l == null)
            break;
        t.push(l[c % l.length])
    }
    return t
}
function Ge(e, t) {
    function o(a=24, d=1) {
        const l = new Date(e);
        l.setMonth(0, 1),
        l.setHours(0, 0, 0, 0);
        const c = Math.floor((e - l.getTime()) / (1e3 * 60 * 60 * a))
          , g = Math.floor(c % (12 * d));
        return {
            index: Math.floor(c / (12 * d)),
            month: g,
            wholeYear: !0
        }
    }
    function n(a=60, d=2, l=!0) {
        const c = new Date(e);
        c.setDate(1),
        c.setHours(0, 0, 0, 0);
        const g = Math.floor((e - c.getTime()) / (1e3 * 60 * a))
          , S = Math.floor(g % (12 * d));
        return {
            index: Math.floor(g / (12 * d)),
            month: S,
            wholeYear: l
        }
    }
    function s(a=10, d=3) {
        const l = new Date(e);
        return l.setHours(0, 0, 0, 0),
        {
            index: Math.floor((e - l.getTime()) / (1e3 * 60 * a)),
            skipMonths: d * (l.getDate() - 1)
        }
    }
    return t === "1d" ? o(24, 1) : t === "12h" ? o(24 / 2, 2) : t === "6h" ? o(24 / 4, 4) : t === "3h" ? o(24 / 8, 8) : t === "1h" ? n(60, 2, !0) : t === "30m" ? n(30, 4, !0) : t === "10m" ? s(10, 3) : t === "5m" ? s(5, 2) : t === "3m" ? s(3, 2) : t === "1m" ? s(1, 2) : s(1, 0)
}
class Wt {
    constructor(t) {
        f(this, "_filename");
        f(this, "_fetchPromise", null);
        f(this, "_fetchAbortController", null);
        f(this, "_isDone", !1);
        this._filename = t
    }
    async fetch() {
        if (this._isDone)
            return ye.get(this._filename);
        if (this._fetchPromise != null)
            return this._fetchPromise;
        this._fetchAbortController = new AbortController,
        this._fetchPromise = this._fetch(this._fetchAbortController.signal);
        try {
            return await this._fetchPromise
        } catch (t) {
            if (t instanceof DOMException && t.name === "AbortError")
                return;
            throw t
        } finally {
            this._fetchPromise = null,
            this._fetchAbortController = null
        }
    }
    abort() {
        var t;
        this._isDone || ((t = this._fetchAbortController) == null || t.abort(),
        this._fetchAbortController = null,
        this._fetchPromise = null)
    }
    async _fetch(t) {
        const o = await fetch(Ht + this._filename, {
            signal: t
        });
        if (!o.ok)
            throw new Error(`Failed to fetch wallpaper list: ${o.status} ${o.statusText}`);
        const n = await o.json();
        return ye.set(this._filename, n),
        oe.delete(this._filename),
        this._isDone = !0,
        n
    }
}
async function Bt(e) {
    if (ye.has(e))
        return ye.get(e);
    if (oe.has(e))
        return oe.get(e).fetch();
    const t = new Wt(e);
    return oe.set(e, t),
    t.fetch()
}
const zt = 6
  , $t = 1e3 * 20
  , Vt = 1e3 * 60 * 10
  , jt = 1e3 * 10;
let Ae = !1
  , E = ie()
  , R = null
  , rt = u("imageChangeInterval") ?? "latest"
  , B = !1
  , ke = !1
  , me = !1;
function lt() {
    B || (B = !0,
    Rt(),
    F())
}
function Yt() {
    const e = u("imageChangeInterval") ?? "latest";
    B && rt !== e && F(!0)
}
function Gt() {
    B && (B = !1,
    me = !1,
    se(R),
    R = null,
    Nt(),
    Ut(),
    At())
}
async function F(e=!1) {
    if (ke) {
        e && (me = !0);
        return
    }
    if (se(R),
    R = null,
    !B)
        return;
    const t = new Date
      , o = u("imageChangeInterval") ?? "latest";
    rt = o;
    const n = et(o);
    if (o !== "latest" && Ft() == null)
        return;
    ke = !0;
    let s = !1;
    try {
        await Jt(t, o),
        Ae = !1
    } catch (a) {
        console.error("Failed to update background image", a),
        s = !0,
        Ae = !0
    } finally {
        if (ke = !1,
        B)
            if (se(R),
            me)
                me = !1,
                F();
            else if (!De())
                R = ce(F, $t);
            else if (s) {
                const a = Le(t.getTime(), n) + n;
                R = ce(F, Math.max(Math.max(0, jt - (Date.now() - t.getTime())), Math.min(Vt, a - Date.now())))
            } else {
                const a = Le(t.getTime(), n) + n;
                R = ce(F, a - Date.now())
            }
    }
}
async function Jt(e, t) {
    if (t === "latest") {
        const o = await Dt(e);
        if (o == null)
            throw new Error("Failed to get today image");
        const n = E;
        await Ve(o, n),
        n !== E && ot(E),
        je([], E)
    } else {
        const o = et(t)
          , n = Le(e.getTime(), o)
          , s = Ge(n, t)
          , a = [];
        for (let c = 1; c <= zt; c++)
            a.push(Ge(n + o * c, t));
        const [d] = await Ye([s]);
        await Ve(d, E);
        const l = await Ye(a);
        je(l, E)
    }
}
at.add( () => F(!0));
window.addEventListener("resize", () => {
    const e = ie();
    e !== E && (E = e,
    u("imageChangeInterval") === "latest" ? ot(E) : F(!0))
}
);
window.addEventListener("online", () => {
    Ae && F(!0)
}
);
function ve() {
    const e = we.imageInfoMessage
      , t = u("imageDescription")
      , o = t === "hide"
      , n = u("theme") === "image"
      , s = o || !n || !De();
    t !== "hide" && bt(),
    e.classList.toggle("hide", o),
    e.ariaHidden = String(s),
    e.inert = s
}
function Kt() {
    const e = we.imageInfoMessage
      , t = u("imageDescriptionSize");
    e.classList.toggle("xsSize", t == "xs"),
    e.classList.toggle("sSize", t == "s"),
    e.classList.toggle("mSize", t == "m"),
    e.classList.toggle("lSize", t == "l"),
    e.classList.toggle("xlSize", t == "xl")
}
function ct() {
    document.documentElement.classList.add("imageTheme"),
    document.documentElement.classList.remove("darkTheme"),
    ve()
}
function Zt() {
    De() ? ct() : Pe.add(ut),
    lt(),
    ve()
}
function Qt() {
    ve()
}
function ut() {
    Pe.delete(ut),
    u("theme") === "image" && ct()
}
function Xt() {
    Yt()
}
async function en(e) {
    var s;
    if (((s = navigator.clipboard) == null ? void 0 : s.writeText)instanceof Function)
        try {
            return await navigator.clipboard.writeText(e),
            !0
        } catch (a) {
            console.error("Failed to copy text to clipboard:", a)
        }
    if (document.execCommand == null)
        return !1;
    const t = document.activeElement
      , o = document.createElement("textarea");
    o.classList.add("copyTextToClipboardInput"),
    o.value = e,
    document.body.appendChild(o),
    o.select();
    let n = !1;
    try {
        n = document.execCommand("copy")
    } catch (a) {
        console.error("Failed to copy text to clipboard:", a)
    }
    document.body.removeChild(o);
    try {
        t == null || t.focus()
    } catch {}
    return n
}
const Je = ["true", "noPad", "noPad2xZoom"];
function tn() {
    const e = new URL(location.href).searchParams.get("tvApp");
    return Je.includes(e) ? (sessionStorage.isTvApp = e,
    e) : Je.includes(sessionStorage.isTvApp) ? sessionStorage.isTvApp : null
}
const nn = 1e3 * 4
  , on = 1e3 * 60 * 60
  , sn = 1e3
  , an = 1e3 * 4
  , rn = "FC11425E"
  , Z = (document.referrer || "").startsWith("android-app://")
  , ln = (navigator.userAgentData || {}).mobile || !1
  , O = tn()
  , le = () => !Z && !N.isStreamerApp && O == null && gt();
let k = "unsupported"
  , D = "unsupported"
  , Ke = !1
  , dt = !1;
const r = {
    updateTheme() {
        const e = u("theme");
        let t = !1
          , o = !1;
        e == "dark" ? t = !0 : e == "system" && window.matchMedia != null ? t = !!window.matchMedia("(prefers-color-scheme: dark)").matches : e == "image" && (t = !0,
        o = !0);
        const n = document.querySelector(".toggles .toggle.imageDescription")
          , s = document.querySelector(".toggles .toggle.imageDescriptionSize")
          , a = document.querySelector(".toggles .toggle.imageChangeInterval")
          , d = document.querySelector(".toggles .toggle.imageEffect")
          , l = document.querySelector(".toggles .toggle.textEffect")
          , c = document.querySelector(".toggles .toggle.clockPosition")
          , g = document.querySelector("#panels>.settings>.toggles>.section>.sectionButtons>.sectionButton.imageTheme");
        document.documentElement.classList.remove("imageTheme"),
        document.documentElement.classList.toggle("darkTheme", t),
        document.documentElement.classList.toggle("lightTheme", !t);
        try {
            document.head.querySelector('meta[name="theme-color"]').content = getComputedStyle(document.body).getPropertyValue("--background-color").trim()
        } catch (S) {
            console.error(S)
        }
        if (n.classList.toggle("hide", !o),
        n.inert = !o,
        s.classList.toggle("hide", !o),
        s.inert = !o,
        a.classList.toggle("hide", !o),
        a.inert = !o,
        d.classList.toggle("hide", !o),
        d.inert = !o,
        l.classList.toggle("hide", !o),
        l.inert = !o,
        c.classList.toggle("hide", !o),
        c.inert = !o,
        !o)
            Gt(),
            clearTimeout(g._removeCanHideTimeout),
            g._removeCanHideTimeout = null,
            g.classList.add("canHide"),
            g._hideAnimationFrame == null && (g._hideAnimationFrame = requestAnimationFrame( () => {
                g.classList.add("hide"),
                g._hideAnimationFrame = null
            }
            ));
        else {
            if (lt(),
            g.classList.contains("canHide") && g._removeCanHideTimeout == null) {
                const S = getComputedStyle(g).getPropertyValue("--remove-canHide-timeout") || ""
                  , p = /\ds$/.test(S) ? parseFloat(S) * 1e3 : parseFloat(S);
                Number.isFinite(p) && (g._removeCanHideTimeout = setTimeout( () => {
                    g.classList.remove("canHide"),
                    g._removeCanHideTimeout = null
                }
                , p))
            }
            cancelAnimationFrame(g._hideAnimationFrame),
            g.classList.remove("hide")
        }
        g.inert = !o,
        o ? Zt() : Qt()
    },
    updateDate() {
        const e = u("date")
          , t = e == "hide";
        document.querySelector(".clock").classList.toggle("hideDate", t),
        document.querySelector(".clock>.date>.days").classList.toggle("show", !t),
        document.querySelector(".clock").classList.toggle("hideMonthNumber", e == "d" || e == "dd")
    },
    updateDateFormat() {
        const e = u("dateFormat");
        document.querySelector(".clock").classList.toggle("americanFormat", e === "american"),
        document.querySelector(".clock").classList.toggle("britishFormat", e === "british")
    },
    updateSeconds() {
        document.querySelector(".clock").classList.toggle("hideSeconds", u("seconds") == "hide")
    },
    updateIsFullscreen() {
        const e = document.fullscreen || document.webkitIsFullScreen || Z || O != null
          , t = document.querySelector("#header .edgeButton.exitFullscreen")
          , o = document.querySelector("#header .edgeButton.fullscreen");
        e ? (document.body.classList.add("isFullscreen"),
        t.ariaHidden = !1,
        t.tabIndex = 0,
        o.ariaHidden = le(),
        o.tabIndex = le() ? 0 : -1,
        m.start()) : (document.body.classList.remove("isFullscreen"),
        t.ariaHidden = le(),
        t.tabIndex = le() ? 0 : -1,
        o.ariaHidden = !1,
        o.tabIndex = 0,
        m.stop())
    },
    updatePwa() {
        const e = document.querySelector("#footer .edgeButton.installPwa");
        e.classList.toggle("show", j._event != null),
        e.ariaHidden = Z || O != null || j._event == null,
        e.tabIndex = Z || O != null || j._event == null ? -1 : 0
    },
    updateAmPm() {
        document.querySelector(".clock").classList.toggle("showAmpm", u("hours") == "12-ampm")
    },
    updateDay() {
        const e = u("day") == "hide"
          , t = u("day") == "full";
        document.querySelector(".clock>.date>.dayText").classList.toggle("show", !e),
        document.querySelector(".clock").classList.toggle("hideDay", e),
        document.querySelector(".clock").classList.toggle("fullDay", t)
    },
    updateMonth() {
        const e = u("month") == "hide"
          , t = u("month") == "full";
        document.querySelector(".clock>.date>.monthText").classList.toggle("show", !e),
        document.querySelector(".clock").classList.toggle("hideMonth", e),
        document.querySelector(".clock").classList.toggle("fullMonth", t)
    },
    updateYear() {
        const e = u("year") == "hide";
        document.querySelector(".clock>.date>.years").classList.toggle("show", !e),
        document.querySelector(".clock").classList.toggle("hideYear", e)
    },
    updateClockSize() {
        const e = u("clockSize")
          , t = document.querySelector(".clock");
        t.classList.toggle("xsSize", e == "xs"),
        t.classList.toggle("sSize", e == "s"),
        t.classList.toggle("mSize", e == "m"),
        t.classList.toggle("lSize", e == "l"),
        t.classList.toggle("xlSize", e == "xl")
    },
    updateFont() {
        const e = u("font")
          , t = document.querySelector(".clock");
        t.classList.toggle("font1", e == "1"),
        t.classList.toggle("font2", e == "2"),
        t.classList.toggle("font3", e == "3"),
        t.classList.toggle("font4", e == "4"),
        t.classList.toggle("font5", e == "5"),
        t.classList.toggle("font6", e == "6"),
        t.classList.toggle("font7", e == "7"),
        t.classList.toggle("font8", e == "8"),
        t.classList.toggle("font9", e == "9"),
        t.classList.toggle("font10", e == "10"),
        t.classList.toggle("font11", e == "11"),
        t.classList.toggle("font12", e == "12")
    },
    updateImageDescription: ve,
    updateImageDescriptionSize: Kt,
    updateImageChangeInterval: Xt,
    updateImageEffect() {
        const e = u("imageEffect")
          , t = document.querySelector("#container>.backgroundImage");
        t.classList.toggle("blurEffect", e == "blur"),
        t.classList.toggle("darkenEffect", e == "darken")
    },
    updateTextEffect() {
        const e = u("textEffect");
        document.querySelector(".clockContainer").classList.toggle("adaptiveTextEffect", e == "adaptive-white")
    },
    updateClockPosition() {
        const e = u("clockPosition")
          , t = document.querySelector(".clockContainer");
        t.classList.toggle("aboveCenterPosition", e == "aboveCenter"),
        t.classList.toggle("topPosition", e == "top"),
        t.classList.toggle("belowCenterPosition", e == "belowCenter"),
        t.classList.toggle("bottomPosition", e == "bottom")
    },
    updateIsTwa() {
        document.body.classList.toggle("isTwa", Z)
    },
    updateIsTvApp() {
        document.body.classList.toggle("isTvApp", O != null),
        document.body.classList.toggle("tvNoPad", O === "noPad" || O === "noPad2xZoom"),
        document.body.classList.toggle("tv2xZoom", O === "noPad2xZoom")
    },
    updateIsFullscreenSupported() {
        gt() || document.body.classList.add("fullscreenUnsupported")
    },
    updateIsStreamerApp() {
        document.body.classList.toggle("isStreamerApp", N.isStreamerApp)
    },
    updateIsMobile() {
        document.body.classList.toggle("isMobile", ln)
    },
    updateCast() {
        const e = k === "connected" || k === "connecting" || k === "notConnected"
          , t = k === "connected"
          , o = k === "connecting" && (D === "starting" || D === "active")
          , n = document.querySelector("#footer>.settingsContainer>.cast")
          , s = document.querySelector("#footer>.settingsContainer>.cast>.connectingContainer>svg")
          , a = document.querySelector("#cast")
          , d = document.querySelector("#cast>.controls>.castStatus>.deviceName");
        n.classList.toggle("show", e),
        n.ariaHidden = !e,
        n.tabIndex = e ? 0 : -1,
        !t && i.isOpen(a) && i.hide(a),
        n.classList.toggle("active", k === "connected" || s == null && k === "connecting");
        const l = C.getSessionDeviceName();
        if (d.innerText = l || "a Chromecast-enabled device",
        !o && n.classList.contains("connecting"))
            if (s != null && s._removeConnectingTimeout == null && s.getAnimations instanceof Function) {
                const c = s.getAnimations().find(g => g instanceof CSSAnimation);
                if (c != null) {
                    let p = function() {
                        s._removeConnectingTimeout = null,
                        n.classList.remove("connecting")
                    };
                    const g = c.effect.getComputedTiming()
                      , S = (1 - g.progress) * g.duration;
                    clearTimeout(s._removeConnectingTimeout),
                    s._removeConnectingTimeout = null,
                    S > 0 ? s._removeConnectingTimeout = setTimeout(p, S) : p()
                } else
                    n.classList.remove("connecting")
            } else
                n.classList.remove("connecting");
        else
            o && s != null && (clearTimeout(s._removeConnectingTimeout),
            s._removeConnectingTimeout = null,
            n.classList.contains("connecting") || n.classList.add("connecting"))
    },
    updateAll() {
        r.updateTheme(),
        r.updatePwa(),
        r.updateSeconds(),
        r.updateAmPm(),
        r.updateDate(),
        r.updateDateFormat(),
        r.updateDay(),
        r.updateMonth(),
        r.updateYear(),
        r.updateClockSize(),
        r.updateFont(),
        r.updateImageDescription(),
        r.updateImageDescriptionSize(),
        r.updateImageChangeInterval(),
        r.updateImageEffect(),
        r.updateTextEffect(),
        r.updateClockPosition(),
        r.updateIsFullscreen(),
        r.updateIsFullscreenSupported(),
        r.updateIsTwa(),
        r.updateIsTvApp(),
        r.updateIsStreamerApp(),
        r.updateIsMobile(),
        r.updateCast()
    }
};
function I(e, t) {
    e.addEventListener("click", o => {
        o.preventDefault(),
        document.activeElement != null && document.activeElement != document.body && document.activeElement.blur(),
        t(o)
    }
    ),
    e.addEventListener("mousedown", o => {
        o.preventDefault()
    }
    ),
    e.addEventListener("keydown", o => {
        o.code === "Enter" || o.code === "Space" ? t(o) : o.code === "Escape" && document.activeElement === e && e.blur()
    }
    )
}
const m = {
    _hiding: !1,
    _idleTimeout: null,
    _eventListeners: {},
    _showMouse() {
        m._hiding && (document.body.classList.remove("idleMouse"),
        clearTimeout(m._idleTimeout),
        m._idleTimeout = setTimeout( () => {
            document.body.classList.add("idleMouse");
            for (const e of m._eventListeners.idleMouse || [])
                e()
        }
        , nn))
    },
    start() {
        m._hiding || (m._hiding = !0,
        window.addEventListener("mousemove", m._showMouse),
        window.addEventListener("mouseenter", m._showMouse),
        window.addEventListener("pointerdown", m._showMouse),
        window.addEventListener("pointermove", m._showMouse),
        window.addEventListener("focus", m._showMouse),
        window.addEventListener("keydown", m._showMouse),
        window.addEventListener("keypress", m._showMouse),
        window.addEventListener("keyup", m._showMouse),
        m._showMouse())
    },
    stop() {
        window.removeEventListener("mousemove", m._showMouse),
        window.removeEventListener("mouseenter", m._showMouse),
        window.removeEventListener("pointerdown", m._showMouse),
        window.removeEventListener("pointermove", m._showMouse),
        window.removeEventListener("focus", m._showMouse),
        window.removeEventListener("keydown", m._showMouse),
        window.removeEventListener("keypress", m._showMouse),
        window.removeEventListener("keyup", m._showMouse),
        m._hiding = !1,
        clearTimeout(m._idleTimeout),
        document.body.classList.remove("idleMouse")
    },
    addEventListener(e, t) {
        m._eventListeners[e] == null && (m._eventListeners[e] = new Set),
        m._eventListeners[e].add(t)
    },
    removeEventListener(e, t) {
        m._eventListeners[e] != null && (m._eventListeners[e].delete(t),
        m._eventListeners[e].size == 0 && (m._eventListeners[e] = null))
    }
}
  , j = {
    _event: null,
    isPwa() {
        return !!window.matchMedia("(display-mode: standalone)").matches
    },
    initListenEvents() {
        window.addEventListener("beforeinstallprompt", e => {
            e.preventDefault(),
            j._event = e,
            r.updatePwa()
        }
        ),
        I(document.querySelector("#footer .edgeButton.installPwa"), () => {
            j._event.prompt()
        }
        ),
        r.updatePwa()
    }
}
  , C = {
    getSessionDeviceName() {
        try {
            const e = C.getCurrentSession();
            return e == null ? null : e.getCastDevice().friendlyName
        } catch {
            return null
        }
    },
    async updateRemoteSettings() {
        if (!N.isStreamerApp)
            try {
                const e = C.getCurrentSession();
                if (e == null)
                    return;
                await e.sendMessage("urn:x-cast:app.clockie", {
                    settings: yt()
                })
            } catch (e) {
                console.error("Failed to update remote settings:", e)
            }
    },
    isFrameworkLoaded() {
        return (((window.cast || {}).framework || {}).CastContext || {}).getInstance != null
    },
    getCurrentSession() {
        if (!C.isFrameworkLoaded())
            return null;
        try {
            return cast.framework.CastContext.getInstance().getCurrentSession()
        } catch (e) {
            return console.error("Failed to get cast session:", e),
            null
        }
    },
    stopCurrentSession() {
        const e = C.getCurrentSession();
        if (e != null)
            try {
                e.endSession(!0);
                const t = e.getSessionObj();
                t != null && t.leave( () => {}
                , o => {
                    console.error("Failed to leave session:", o)
                }
                )
            } catch (t) {
                console.error("Failed to stop cast session:", t)
            }
        r.updateCast()
    },
    init() {
        if (!(!dt || Ke || !C.isFrameworkLoaded() || N.isStreamerApp)) {
            Ke = !0;
            try {
                let t = function(n) {
                    switch (n) {
                    case cast.framework.CastState.NO_DEVICES_AVAILABLE:
                        k = "noDevicesAvailable";
                        break;
                    case cast.framework.CastState.NOT_CONNECTED:
                        k = "notConnected";
                        break;
                    case cast.framework.CastState.CONNECTING:
                        k = "connecting";
                        break;
                    case cast.framework.CastState.CONNECTED:
                        k = "connected",
                        C.updateRemoteSettings();
                        break
                    }
                    console.debug("Cast status:", k),
                    r.updateCast()
                }
                  , o = function(n) {
                    switch (n) {
                    case cast.framework.SessionState.SESSION_STARTED:
                    case cast.framework.SessionState.SESSION_RESUMED:
                        D = "active",
                        C.updateRemoteSettings();
                        break;
                    case cast.framework.SessionState.SESSION_STARTING:
                        D = "starting";
                        break;
                    case cast.framework.SessionState.SESSION_START_FAILED:
                        D = "notConnected";
                        break;
                    case cast.framework.SessionState.SESSION_ENDING:
                        D = "ending";
                        break;
                    case cast.framework.SessionState.SESSION_ENDED:
                        D = "notConnected";
                        break;
                    case cast.framework.SessionState.NO_SESSION:
                        D = "notConnected";
                        break
                    }
                    console.debug("Cast session status:", D),
                    r.updateCast()
                };
                const e = cast.framework.CastContext.getInstance();
                e.setOptions({
                    receiverApplicationId: rn,
                    autoJoinPolicy: chrome.cast.AutoJoinPolicy.TAB_AND_ORIGIN_SCOPED,
                    language: "en-US",
                    resumeSavedSession: !0
                }),
                e.addEventListener(cast.framework.CastContextEventType.CAST_STATE_CHANGED, n => {
                    t(n.castState)
                }
                ),
                t(e.getCastState()),
                e.addEventListener(cast.framework.CastContextEventType.SESSION_STATE_CHANGED, n => {
                    o(n.sessionState)
                }
                ),
                o(e.getSessionState())
            } catch (e) {
                console.error("Failed to initialize cast:", e)
            }
            r.updateCast()
        }
    }
}
  , i = {
    _onHide: new Map,
    _openedFromElement: new Map,
    _openedFromElementPanel: new Map,
    _openPanels: [],
    _unregisterEvents: null,
    _registerEvents() {
        if (i._unregisterEvents != null)
            return;
        function e() {
            i.closeAllPanels()
        }
        function t(s) {
            s._preventAutoPanelClose !== !0 && s.target != null && (i._openPanels.length == 0 || !i._openPanels[i._openPanels.length - 1].contains(s.target)) && i.hideTopPanel()
        }
        function o() {
            i.closeAllPanels()
        }
        function n(s) {
            s.key == "Escape" && i.hideTopPanel()
        }
        window.addEventListener("click", t),
        window.addEventListener("keydown", n),
        window.addEventListener("blur", o),
        m.addEventListener("idleMouse", e),
        i._unregisterEvents = () => {
            window.removeEventListener("click", t),
            window.removeEventListener("keydown", n),
            window.removeEventListener("blur", o),
            m.removeEventListener("idleMouse", e),
            i._unregisterEvents = null
        }
    },
    _updatePanelOpenerVars(e, t) {
        const o = t.getBoundingClientRect()
          , n = e.getBoundingClientRect();
        e.style.setProperty("--opener-x", `${o.left - n.left}px`),
        e.style.setProperty("--opener-y", `${o.top - n.top}px`),
        e.style.setProperty("--opener-width", `${o.width}px`),
        e.style.setProperty("--opener-height", `${o.height}px`),
        e.style.setProperty("--natural-width", `${n.width}px`),
        e.style.setProperty("--natural-height", `${n.height}px`)
    },
    _updateSubPanelOpenFromOpenerVars(e, t) {
        e.style.setProperty("--sub-panel-opener-x", `${t.offsetLeft}px`),
        e.style.setProperty("--sub-panel-opener-y", `${t.offsetTop}px`)
    },
    initPanel(e) {
        const t = e.querySelector(".header>.closeButton");
        t != null && I(t, () => {
            setTimeout( () => {
                i.hide(e)
            }
            , 0)
        }
        )
    },
    hideTopPanel() {
        i._openPanels.length != 0 && i.hide(i._openPanels[i._openPanels.length - 1])
    },
    async closeAllPanels() {
        for (; i._openPanels.length > 0; )
            await i.hide(i._openPanels[i._openPanels.length - 1])
    },
    show(e, t, o, n) {
        if (t != null && (i._onHide.has(e) || i._onHide.set(e, new Set),
        i._onHide.get(e).add(t)),
        i.isOpen(e)) {
            if (o != null) {
                const s = i._openedFromElement.get(e);
                s != null && s != o && s.classList.remove("panelOpenerHide"),
                i._openedFromElement.set(e, o),
                o.classList.add("panelOpenerHide")
            }
            if (n != null) {
                const s = i._openedFromElementPanel.get(e);
                s != null && s != n && (clearTimeout(s._removeSubpanelTimeout),
                s._removeSubpanelTimeout = null,
                s.classList.remove("subPanel", "subPanelOpen"),
                s.inert = !1,
                s.inert = !i.isOpen(s)),
                i._openedFromElementPanel.set(e, n),
                i._updateSubPanelOpenFromOpenerVars(n, o),
                clearTimeout(n._removeSubpanelTimeout),
                n._removeSubpanelTimeout = null,
                n.classList.add("subPanel", "subPanelOpen"),
                n.inert = !0
            }
            return
        }
        o != null && (i._openedFromElement.set(e, o),
        i._updatePanelOpenerVars(e, o),
        o.classList.add("panelOpenerHide")),
        e.classList.toggle("fromElement", o != null),
        n != null && (i._openedFromElementPanel.set(e, n),
        i._updateSubPanelOpenFromOpenerVars(n, o),
        clearTimeout(n._removeSubpanelTimeout),
        n._removeSubpanelTimeout = null,
        n.classList.add("subPanel", "subPanelOpen"),
        n.inert = !0),
        i._openPanels.includes(e) || i._openPanels.push(e),
        e.classList.add("show"),
        e.ariaHidden = "false",
        e.inert = !1,
        i._registerEvents()
    },
    isOpen(e) {
        return i._openPanels.includes(e)
    },
    async hide(e) {
        if (!i.isOpen(e))
            return;
        const t = i._onHide.get(e);
        if (t != null) {
            for (const a of t)
                await a();
            i._onHide.delete(e)
        }
        const o = [];
        e.classList.remove("show"),
        e.ariaHidden = "true",
        e.inert = !0,
        i._openPanels.includes(e) && i._openPanels.splice(i._openPanels.indexOf(e), 1),
        i._openPanels.length == 0 && i._unregisterEvents != null && i._unregisterEvents();
        const n = i._openedFromElement.get(e);
        if (n != null) {
            i._openedFromElement.delete(e),
            e.classList.add("fromElement");
            let a = e.getAnimations().find(c => c instanceof CSSAnimation);
            a == null && (e.classList.remove("fromElement"),
            e.offsetWidth,
            e.classList.add("fromElement"),
            a = e.getAnimations().find(c => c instanceof CSSAnimation)),
            a != null && (a.playState === "finished" && a.play(),
            o.push(a.finished.then( () => {
                i.isOpen(e) || (n.classList.remove("panelOpenerHide"),
                e.classList.remove("fromElement"),
                a.cancel())
            }
            )));
            const d = e.querySelector(".header");
            if (d != null) {
                const c = d.getAnimations().find(g => g instanceof CSSAnimation);
                c != null && (c.playState === "finished" && c.play(),
                o.push(c.finished.then( () => {
                    i.isOpen(e) || c.cancel()
                }
                )))
            }
            const l = e.querySelector(".header>.title");
            if (l != null) {
                const c = l.getAnimations().find(g => g instanceof CSSAnimation);
                c != null && (c.playState === "finished" && c.play(),
                o.push(c.finished.then( () => {
                    i.isOpen(e) || c.cancel()
                }
                )))
            }
        }
        const s = i._openedFromElementPanel.get(e);
        if (s != null && (i._openedFromElementPanel.delete(e),
        s.classList.remove("subPanelOpen"),
        s.inert = !i.isOpen(s),
        clearTimeout(s._removeSubpanelTimeout),
        s._removeSubpanelTimeout = setTimeout( () => {
            s.classList.remove("subPanel"),
            s._removeSubpanelTimeout = null
        }
        , sn)),
        o.length > 0)
            return Promise.all(o)
    }
}
  , q = {
    init() {
        q.settings.init(),
        q.cast.init(),
        q.timeAndDate.init(),
        q.imageTheme.init()
    },
    settings: {
        init() {
            const e = document.querySelector("#panels>.settings");
            i.initPanel(e);
            const t = document.querySelector("#settings>.info>.links>.copySettingsLink");
            let o = null
              , n = !1;
            function s() {
                clearTimeout(o),
                o = null,
                t.classList.remove("showSuccessTooltip"),
                n && (n = !1,
                t.removeEventListener("pointerleave", s))
            }
            I(t, () => {
                gtag("event", "buttonClicked", {
                    buttonName: "copySettingsLink"
                }),
                s();
                const g = wt();
                en(g).then(S => {
                    s(),
                    S && (t.classList.add("showSuccessTooltip"),
                    n || (n = !0,
                    t.addEventListener("pointerleave", s, {
                        passive: !0
                    })),
                    o = setTimeout( () => {
                        t.classList.remove("showSuccessTooltip")
                    }
                    , an))
                }
                )
            }
            );
            const a = document.querySelector("#panels>.settings>.toggles>.section>.sectionButtons>.sectionButton.timeAndDate")
              , d = document.querySelector("#panels>.timeAndDate");
            I(a, () => {
                gtag("event", "buttonClicked", {
                    buttonName: "timeAndDateSection"
                }),
                s(),
                i.isOpen(d) || setTimeout(q.timeAndDate.open, 0)
            }
            );
            const l = document.querySelector("#panels>.settings>.toggles>.section>.sectionButtons>.sectionButton.imageTheme")
              , c = document.querySelector("#panels>.imageTheme");
            I(l, () => {
                gtag("event", "buttonClicked", {
                    buttonName: "imageThemeSection"
                }),
                s(),
                i.isOpen(c) || setTimeout(q.imageTheme.open, 0)
            }
            )
        },
        async open() {
            const e = document.querySelector("#footer>.settingsContainer>.settings")
              , t = document.querySelector("#settings")
              , o = document.querySelector("#panels>.timeAndDate")
              , n = document.querySelector("#panels>.imageTheme");
            async function s() {
                e.classList.remove("noTooltip"),
                document.querySelector("#settings>.info>.links>.copySettingsLink").classList.remove("showSuccessTooltip"),
                await i.hide(o),
                await i.hide(n)
            }
            i.isOpen(t) || (await i.closeAllPanels(),
            i.show(t, s),
            e.classList.add("noTooltip"))
        }
    },
    cast: {
        init() {
            const e = document.querySelector("#panels>.cast");
            i.initPanel(e)
        },
        async open() {
            const e = document.querySelector("#footer>.settingsContainer>.cast")
              , t = document.querySelector("#cast");
            function o() {
                e.classList.remove("noTooltip")
            }
            i.isOpen(t) || (await i.closeAllPanels(),
            i.show(t, o),
            e.classList.add("noTooltip"))
        }
    },
    timeAndDate: {
        init() {
            const e = document.querySelector("#panels>.timeAndDate");
            i.initPanel(e)
        },
        open() {
            const e = document.querySelector("#panels>.settings")
              , t = document.querySelector("#panels>.timeAndDate")
              , o = document.querySelector("#panels>.timeAndDate>.toggles")
              , n = document.querySelector("#panels>.settings>.toggles>.section>.sectionButtons>.sectionButton.timeAndDate");
            i.isOpen(t) || (o.scrollTop = 0,
            i.show(t, null, n, e))
        },
        close() {
            const e = document.querySelector("#panels>.timeAndDate");
            i.hide(e)
        }
    },
    imageTheme: {
        init() {
            const e = document.querySelector("#panels>.imageTheme");
            i.initPanel(e)
        },
        open() {
            const e = document.querySelector("#panels>.settings")
              , t = document.querySelector("#panels>.imageTheme")
              , o = document.querySelector("#panels>.imageTheme>.toggles")
              , n = document.querySelector("#panels>.settings>.toggles>.section>.sectionButtons>.sectionButton.imageTheme");
            i.isOpen(t) || (o.scrollTop = 0,
            i.show(t, null, n, e))
        },
        close() {
            const e = document.querySelector("#panels>.imageTheme");
            i.hide(e)
        }
    }
};
function v(e, {defaultValue: t, changeCallback: o}) {
    const n = e.querySelector(".options");
    let s = [];
    if (n.classList.contains("multiline"))
        for (const a of Array.from(n.children))
            s = s.concat(Array.from(a.children));
    else
        s = Array.from(n.children);
    for (const a of s) {
        const d = a.getAttribute("value");
        d == t ? (a.classList.add("selected"),
        a.ariaChecked = !0) : a.ariaChecked = !1,
        I(a, () => {
            if (!a.classList.contains("selected")) {
                const l = e.querySelector(".option.selected");
                l != null && (l.classList.remove("selected"),
                l.ariaChecked = !1),
                a.classList.add("selected"),
                a.ariaChecked = !0,
                o(d),
                C.updateRemoteSettings()
            }
        }
        )
    }
}
const M = (e, t=2) => `${e}`.padStart(t, "0")
  , h = {
    years: {
        tag: null
    },
    months: {
        tag: null
    },
    days: {
        tag: null
    },
    hours: {
        tag: null
    },
    minutes: {
        tag: null
    },
    seconds: {
        tag: null
    },
    ampm: {
        tag: null
    },
    dayText: {
        tag: null
    },
    monthText: {
        tag: null
    }
};
function cn() {
    const e = document.querySelector("#container");
    Promise.resolve((e.requestFullscreen || e.webkitRequestFullScreen).call(e, {
        navigationUI: "hide"
    })).then(r.updateIsFullscreen).catch(t => console.error(t))
}
function gt() {
    const e = document.querySelector("#container");
    return ((e == null ? void 0 : e.requestFullscreen) || (e == null ? void 0 : e.webkitRequestFullScreen)) != null
}
function un() {
    Promise.resolve((document.exitFullscreen || document.webkitExitFullscreen).call(document)).then(r.updateIsFullscreen).catch(e => console.error(e))
}
function dn() {
    if (navigator.wakeLock == null || navigator.wakeLock.request == null) {
        console.warn("Wake lock API not supported");
        return
    }
    let e = null;
    async function t() {
        try {
            e = await navigator.wakeLock.request("screen"),
            e.addEventListener("release", () => {
                e = null,
                o()
            }
            )
        } catch (n) {
            console.error("Failed to acquire wake lock:", n)
        }
    }
    function o() {
        e != null || document.visibilityState != "visible" || t()
    }
    document.addEventListener("visibilitychange", o),
    o()
}
function _(e, t) {
    e.innerText != t && (e.innerText = t,
    e.setAttribute("data-value", t))
}
let Ze = null;
function A() {
    clearTimeout(Ze);
    const e = new Date;
    let t = e.getHours()
      , o = "AM"
      , n = `${e.getDate()}`;
    u("hours") != "24" && (t >= 12 && (o = "PM",
    t -= 12),
    t == 0 && (t = 12)),
    u("date") != "d" && (n = M(e.getDate(), 2)),
    u("year") == "short" ? _(h.years.tag, M(e.getFullYear() % 1e3, 2)) : _(h.years.tag, M(e.getFullYear(), 4)),
    u("date") == "md" ? (_(h.days.tag, M(e.getMonth() + 1, 2)),
    _(h.months.tag, n)) : (_(h.months.tag, M(e.getMonth() + 1, 2)),
    _(h.days.tag, n)),
    _(h.hours.tag, M(t, 2)),
    _(h.minutes.tag, M(e.getMinutes(), 2)),
    _(h.seconds.tag, M(e.getSeconds(), 2)),
    _(h.ampm.tag, o),
    u("day") == "short" ? _(h.dayText.tag, Intl.DateTimeFormat("en-US", {
        weekday: "short"
    }).format(e)) : u("day") == "full" && _(h.dayText.tag, Intl.DateTimeFormat("en-US", {
        weekday: "long"
    }).format(e)),
    u("month") == "short" ? _(h.monthText.tag, Intl.DateTimeFormat("en-US", {
        month: "short"
    }).format(e)) : u("month") == "full" && _(h.monthText.tag, Intl.DateTimeFormat("en-US", {
        month: "long"
    }).format(e)),
    Ze = setTimeout(A, 1e3 - Date.now() % 1e3)
}
function gn() {
    "serviceWorker"in navigator && navigator.serviceWorker.register(`/serviceWorker.js${N.isStreamerApp ? "?streamer=true" : ""}`).then(e => {
        async function t() {
            try {
                await e.update()
            } catch (o) {
                console.error("Error in updating SW. error:", o)
            }
            setTimeout(t, on)
        }
        return t()
    }
    )
}
function Qe() {
    dt = !0;
    try {
        let n = function(s, a) {
            a.tag = s.querySelector(".value")
        };
        v(document.querySelector(".toggles .toggle.theme"), {
            defaultValue: u("theme"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "theme",
                    newValue: s
                }),
                w("theme", s),
                r.updateTheme()
            }
        }),
        r.updateTheme(),
        v(document.querySelector(".toggles .toggle.seconds"), {
            defaultValue: u("seconds"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "seconds",
                    newValue: s
                }),
                w("seconds", s),
                r.updateSeconds()
            }
        }),
        r.updateSeconds(),
        v(document.querySelector(".toggles .toggle.hours"), {
            defaultValue: u("hours"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "hours",
                    newValue: s
                }),
                w("hours", s),
                r.updateAmPm(),
                A()
            }
        }),
        r.updateAmPm(),
        v(document.querySelector(".toggles .toggle.date"), {
            defaultValue: u("date"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "date",
                    newValue: s
                }),
                w("date", s),
                r.updateDate(),
                A()
            }
        }),
        r.updateDate(),
        v(document.querySelector(".toggles .toggle.dateFormat"), {
            defaultValue: u("dateFormat"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "dateFormat",
                    newValue: s
                }),
                w("dateFormat", s),
                r.updateDateFormat(),
                A()
            }
        }),
        r.updateDateFormat(),
        v(document.querySelector(".toggles .toggle.day"), {
            defaultValue: u("day"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "day",
                    newValue: s
                }),
                w("day", s),
                r.updateDay(),
                A()
            }
        }),
        r.updateDay(),
        v(document.querySelector(".toggles .toggle.month"), {
            defaultValue: u("month"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "month",
                    newValue: s
                }),
                w("month", s),
                r.updateMonth(),
                A()
            }
        }),
        r.updateMonth(),
        v(document.querySelector(".toggles .toggle.year"), {
            defaultValue: u("year"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "year",
                    newValue: s
                }),
                w("year", s),
                r.updateYear(),
                A()
            }
        }),
        r.updateYear(),
        v(document.querySelector(".toggles .toggle.clockSize"), {
            defaultValue: u("clockSize"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "clockSize",
                    newValue: s
                }),
                w("clockSize", s),
                r.updateClockSize(),
                A()
            }
        }),
        r.updateClockSize(),
        v(document.querySelector(".toggles .toggle.font"), {
            defaultValue: u("font"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "font",
                    newValue: s
                }),
                w("font", s),
                r.updateFont(),
                A()
            }
        }),
        r.updateFont(),
        v(document.querySelector(".toggles .toggle.imageDescription"), {
            defaultValue: u("imageDescription"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "imageDescription",
                    newValue: s
                }),
                w("imageDescription", s),
                r.updateImageDescription()
            }
        }),
        r.updateImageDescription(),
        v(document.querySelector(".toggles .toggle.imageDescriptionSize"), {
            defaultValue: u("imageDescriptionSize"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "imageDescriptionSize",
                    newValue: s
                }),
                w("imageDescriptionSize", s),
                r.updateImageDescriptionSize()
            }
        }),
        r.updateImageDescriptionSize(),
        v(document.querySelector(".toggles .toggle.imageChangeInterval"), {
            defaultValue: u("imageChangeInterval"),
            changeCallback(s) {
                gtag("event", "imageChangeInterval", {
                    key: "imageChangeInterval",
                    newValue: s
                }),
                w("imageChangeInterval", s),
                r.updateImageChangeInterval()
            }
        }),
        r.updateImageChangeInterval(),
        v(document.querySelector(".toggles .toggle.imageEffect"), {
            defaultValue: u("imageEffect"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "imageEffect",
                    newValue: s
                }),
                w("imageEffect", s),
                r.updateImageEffect()
            }
        }),
        r.updateImageEffect(),
        v(document.querySelector(".toggles .toggle.textEffect"), {
            defaultValue: u("textEffect"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "textEffect",
                    newValue: s
                }),
                w("textEffect", s),
                r.updateTextEffect()
            }
        }),
        r.updateTextEffect(),
        v(document.querySelector(".toggles .toggle.clockPosition"), {
            defaultValue: u("clockPosition"),
            changeCallback(s) {
                gtag("event", "settingsChanged", {
                    key: "clockPosition",
                    newValue: s
                }),
                w("clockPosition", s),
                r.updateClockPosition(),
                A()
            }
        }),
        r.updateClockPosition(),
        r.updateIsFullscreen(),
        r.updateIsFullscreenSupported(),
        r.updateIsTwa(),
        r.updateIsTvApp(),
        r.updateIsStreamerApp(),
        r.updateIsMobile(),
        r.updateCast(),
        n(document.querySelector(".clock>.date>.years"), h.years),
        n(document.querySelector(".clock>.date>.months"), h.months),
        n(document.querySelector(".clock>.date>.days"), h.days),
        n(document.querySelector(".clock>.time>.hours"), h.hours),
        n(document.querySelector(".clock>.time>.minutes"), h.minutes),
        n(document.querySelector(".clock>.time>.seconds"), h.seconds),
        n(document.querySelector(".clock>.time>.ampm"), h.ampm),
        n(document.querySelector(".clock>.date>.dayText"), h.dayText),
        n(document.querySelector(".clock>.date>.monthText"), h.monthText),
        A()
    } catch (n) {
        console.error(n)
    }
    document.addEventListener("fullscreenchange", r.updateIsFullscreen),
    document.addEventListener("webkitfullscreenchange", r.updateIsFullscreen),
    q.init();
    const e = document.querySelector("#cast");
    I(document.querySelector("#footer>.settingsContainer>.cast"), () => {
        if (gtag("event", "buttonClicked", {
            buttonName: "cast"
        }),
        C.getCurrentSession() == null) {
            cast.framework.CastContext.getInstance().requestSession();
            return
        }
        if (i.isOpen(e))
            return i.closeAllPanels();
        setTimeout(q.cast.open, 0)
    }
    ),
    I(document.querySelector("#cast>.controls>.buttons>.panelButton.stopCasting"), () => {
        gtag("event", "buttonClicked", {
            buttonName: "stopCasting"
        }),
        C.stopCurrentSession()
    }
    );
    const t = document.querySelector("#settings");
    I(document.querySelector("#footer>.settingsContainer>.settings"), n => {
        if (gtag("event", "buttonClicked", {
            buttonName: "settings"
        }),
        i.isOpen(t))
            return n._preventAutoPanelClose = !0,
            i.closeAllPanels();
        setTimeout(q.settings.open, 0)
    }
    ),
    I(document.querySelector("#header .edgeButton.fullscreen"), () => {
        gtag("event", "buttonClicked", {
            buttonName: "enterFullscreen"
        }),
        cn()
    }
    ),
    I(document.querySelector("#header .edgeButton.exitFullscreen"), () => {
        gtag("event", "buttonClicked", {
            buttonName: "exitFullscreen"
        }),
        un()
    }
    ),
    j.initListenEvents(),
    setTimeout( () => {
        document.head.parentElement.classList.contains("animate") && (document.head.parentElement.classList.add("show"),
        document.querySelector("#container").style.opacity = "1")
    }
    , 100),
    gn(),
    dn(),
    N.isStreamerApp || C.init();
    try {
        document.querySelector("#settings .about .email").setAttribute("href", "mailto:giladgd@gmail.com")
    } catch {}
    function o() {
        const n = document.querySelector("#settings>.info>.links>.productHunt");
        I(n, () => {
            gtag("event", "buttonClicked", {
                buttonName: "productHunt"
            }),
            window.open(n.href, n.target || "_blank")
        }
        )
    }
    try {
        const n = document.createElement("script");
        n.setAttribute("src", "https://www.googletagmanager.com/gtag/js?id=G-RK9JB7J11W"),
        n.setAttribute("async", ""),
        document.head.appendChild(n),
        o()
    } catch {}
    St && document.documentElement.classList.add("isSafari"),
    /(chrome|safari|firefox)/i.test(window.navigator.userAgent) && (document.title = "Clockie");
    try {
        typeof CSS < "u" && CSS.registerProperty instanceof Function && CSS.registerProperty({
            name: "--clock-scale",
            syntax: "<number>",
            inherits: !1,
            initialValue: "0"
        })
    } catch {
        console.warn("CSS.registerProperty not supported")
    }
    fetch("img/cast.connecting.svg").then(n => n.text()).then(n => {
        document.querySelector("#footer .edgeButton.cast>.connectingContainer").innerHTML = n
    }
    ).catch(n => {
        console.error("Failed to load cast.connecting.svg", n)
    }
    )
}
window.dataLayer = window.dataLayer || [];
window.gtag = function() {
    window.dataLayer.push(arguments)
}
;
gtag("js", new Date);
gtag("config", "G-RK9JB7J11W", {
    send_page_view: !0
});
function hn() {
    N.isStreamerApp || (window.__onGCastApiAvailable = e => {
        e ? C.init() : console.warn("Cast API not available")
    }
    ),
    document.readyState == "loading" ? document.addEventListener("DOMContentLoaded", Qe) : Qe()
}
const {updateAll: pn} = r;
export {w as a, hn as i, fn as s, pn as u};
