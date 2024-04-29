window.Laya = function(v) {
    "use strict";
    class n {
    }
    n.animationInterval = 50,
    n.isAntialias = !0,
    n.isAlpha = !1,
    n.premultipliedAlpha = !0,
    n.isStencil = !0,
    n.preserveDrawingBuffer = !1,
    n.webGL2D_MeshAllocMaxMem = !0,
    n.is2DPixelArtGame = !1,
    n.useWebGL2 = !0,
    n.printWebglOrder = !1,
    n.allowGPUInstanceDynamicBatch = !0,
    n.enableStaticBatch = !0,
    n.useRetinalCanvas = !1,
    window.Config = n;
    class R {
        static regClass(t) {
            R.__classMap[t.name] = t
        }
    }
    R.Laya = null,
    R.Timer = null,
    R.WorkerLoader = null,
    R.Dragging = null,
    R.GraphicsBounds = null,
    R.Sprite = null,
    R.TextRender = null,
    R.TextAtlas = null,
    R.timer = null,
    R.systemTimer = null,
    R.startTimer = null,
    R.updateTimer = null,
    R.lateTimer = null,
    R.physicsTimer = null,
    R.stage = null,
    R.Loader = null,
    R.loader = null,
    R.TTFLoader = null,
    R.SoundManager = null,
    R.WebAudioSound = null,
    R.AudioSound = null,
    R.ShaderCompile = null,
    R.ClassUtils = null,
    R.SceneUtils = null,
    R.Context = null,
    R.Render = null,
    R.MouseManager = null,
    R.Text = null,
    R.Browser = null,
    R.WebGL = null,
    R.Pool = null,
    R.Utils = null,
    R.Graphics = null,
    R.Submit = null,
    R.Stage = null,
    R.Resource = null,
    R.__classMap = {};
    class p {
        static getPoolBySign(t) {
            return p._poolDic[t] || (p._poolDic[t] = [])
        }
        static clearBySign(t) {
            p._poolDic[t] && (p._poolDic[t].length = 0)
        }
        static recover(t, e) {
            e[p.POOLSIGN] || (e[p.POOLSIGN] = !0,
            p.getPoolBySign(t).push(e))
        }
        static recoverByClass(t) {
            var e;
            t && (e = t.__className || t.constructor._$gid) && p.recover(e, t)
        }
        static _getClassSign(t) {
            var e = t.__className || t._$gid;
            return e || (t._$gid = e = p._CLSID + "",
            p._CLSID++),
            e
        }
        static createByClass(t) {
            return p.getItemByClass(p._getClassSign(t), t)
        }
        static getItemByClass(t, e) {
            if (!p._poolDic[t])
                return new e;
            var i, t = p.getPoolBySign(t);
            return t.length ? (i = t.pop())[p.POOLSIGN] = !1 : i = new e,
            i
        }
        static getItemByCreateFun(t, e, i=null) {
            t = p.getPoolBySign(t),
            t = t.length ? t.pop() : e.call(i);
            return t[p.POOLSIGN] = !1,
            t
        }
        static getItem(t) {
            t = p.getPoolBySign(t),
            t = t.length ? t.pop() : null;
            return t && (t[p.POOLSIGN] = !1),
            t
        }
    }
    p._CLSID = 0,
    p.POOLSIGN = "__InPool",
    p._poolDic = {};
    class G {
        static create(t) {
            var e = p.getItemByClass("AlphaCmd", G);
            return e.alpha = t,
            e
        }
        recover() {
            p.recover("AlphaCmd", this)
        }
        run(t, e, i) {
            t.alpha(this.alpha)
        }
        get cmdID() {
            return G.ID
        }
    }
    G.ID = "Alpha";
    class k {
        static create(t, e, i, s, r, a, n) {
            var h = p.getItemByClass("DrawCircleCmd", k);
            return h.x = t,
            h.y = e,
            h.radius = i,
            h.fillColor = s,
            h.lineColor = r,
            h.lineWidth = a,
            h.vid = n,
            h
        }
        recover() {
            this.fillColor = null,
            this.lineColor = null,
            p.recover("DrawCircleCmd", this)
        }
        run(t, e, i) {
            t._drawCircle(this.x + e, this.y + i, this.radius, this.fillColor, this.lineColor, this.lineWidth, this.vid)
        }
        get cmdID() {
            return k.ID
        }
    }
    k.ID = "DrawCircle";
    class W {
        static create(t, e, i, s, r) {
            var a = p.getItemByClass("DrawCurvesCmd", W);
            return a.x = t,
            a.y = e,
            a.points = i,
            a.lineColor = s,
            a.lineWidth = r,
            a
        }
        recover() {
            this.points = null,
            this.lineColor = null,
            p.recover("DrawCurvesCmd", this)
        }
        run(t, e, i) {
            this.points && t.drawCurves(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth)
        }
        get cmdID() {
            return W.ID
        }
    }
    W.ID = "DrawCurves";
    class Y {
        static create(t, e, i, s, r) {
            var a = p.getItemByClass("DrawImageCmd", Y);
            return (a.texture = t)._addReference(),
            a.x = e,
            a.y = i,
            a.width = s,
            a.height = r,
            a
        }
        recover() {
            this.texture && this.texture._removeReference(),
            this.texture = null,
            p.recover("DrawImageCmd", this)
        }
        run(t, e, i) {
            this.texture && t.drawTexture(this.texture, this.x + e, this.y + i, this.width, this.height)
        }
        get cmdID() {
            return Y.ID
        }
    }
    Y.ID = "DrawImage";
    class V {
        static create(t, e, i, s, r, a, n) {
            var h = p.getItemByClass("DrawLineCmd", V);
            return h.fromX = t,
            h.fromY = e,
            h.toX = i,
            h.toY = s,
            h.lineColor = r,
            h.lineWidth = a,
            h.vid = n,
            h
        }
        recover() {
            p.recover("DrawLineCmd", this)
        }
        run(t, e, i) {
            t._drawLine(e, i, this.fromX, this.fromY, this.toX, this.toY, this.lineColor, this.lineWidth, this.vid)
        }
        get cmdID() {
            return V.ID
        }
    }
    V.ID = "DrawLine";
    class X {
        static create(t, e, i, s, r, a) {
            var n = p.getItemByClass("DrawLinesCmd", X);
            return n.x = t,
            n.y = e,
            n.points = i,
            n.lineColor = s,
            n.lineWidth = r,
            n.vid = a,
            n
        }
        recover() {
            this.points = null,
            this.lineColor = null,
            p.recover("DrawLinesCmd", this)
        }
        run(t, e, i) {
            this.points && t._drawLines(this.x + e, this.y + i, this.points, this.lineColor, this.lineWidth, this.vid)
        }
        get cmdID() {
            return X.ID
        }
    }
    X.ID = "DrawLines";
    class H {
        static create(t, e, i, s, r) {
            var a = p.getItemByClass("DrawPathCmd", H);
            return a.x = t,
            a.y = e,
            a.paths = i,
            a.brush = s,
            a.pen = r,
            a
        }
        recover() {
            this.paths = null,
            this.brush = null,
            this.pen = null,
            p.recover("DrawPathCmd", this)
        }
        run(t, e, i) {
            this.paths && t._drawPath(this.x + e, this.y + i, this.paths, this.brush, this.pen)
        }
        get cmdID() {
            return H.ID
        }
    }
    H.ID = "DrawPath";
    class z {
        static create(t, e, i, s, r, a, n, h, o) {
            var l = p.getItemByClass("DrawPieCmd", z);
            return l.x = t,
            l.y = e,
            l.radius = i,
            l._startAngle = s,
            l._endAngle = r,
            l.fillColor = a,
            l.lineColor = n,
            l.lineWidth = h,
            l.vid = o,
            l
        }
        recover() {
            this.fillColor = null,
            this.lineColor = null,
            p.recover("DrawPieCmd", this)
        }
        run(t, e, i) {
            t._drawPie(this.x + e, this.y + i, this.radius, this._startAngle, this._endAngle, this.fillColor, this.lineColor, this.lineWidth, this.vid)
        }
        get cmdID() {
            return z.ID
        }
        get startAngle() {
            return 180 * this._startAngle / Math.PI
        }
        set startAngle(t) {
            this._startAngle = t * Math.PI / 180
        }
        get endAngle() {
            return 180 * this._endAngle / Math.PI
        }
        set endAngle(t) {
            this._endAngle = t * Math.PI / 180
        }
    }
    z.ID = "DrawPie";
    class K {
        static create(t, e, i, s, r, a, n, h) {
            var o = p.getItemByClass("DrawPolyCmd", K);
            return o.x = t,
            o.y = e,
            o.points = i,
            o.fillColor = s,
            o.lineColor = r,
            o.lineWidth = a,
            o.isConvexPolygon = n,
            o.vid = h,
            o
        }
        recover() {
            this.points = null,
            this.fillColor = null,
            this.lineColor = null,
            p.recover("DrawPolyCmd", this)
        }
        run(t, e, i) {
            this.points && t._drawPoly(this.x + e, this.y + i, this.points, this.fillColor, this.lineColor, this.lineWidth, this.isConvexPolygon, this.vid)
        }
        get cmdID() {
            return K.ID
        }
    }
    K.ID = "DrawPoly";
    class j {
        static create(t, e, i, s, r, a, n) {
            var h = p.getItemByClass("DrawRectCmd", j);
            return h.x = t,
            h.y = e,
            h.width = i,
            h.height = s,
            h.fillColor = r,
            h.lineColor = a,
            h.lineWidth = n,
            h
        }
        recover() {
            this.fillColor = null,
            this.lineColor = null,
            p.recover("DrawRectCmd", this)
        }
        run(t, e, i) {
            t.drawRect(this.x + e, this.y + i, this.width, this.height, this.fillColor, this.lineColor, this.lineWidth)
        }
        get cmdID() {
            return j.ID
        }
    }
    j.ID = "DrawRect";
    class y {
        constructor(t=1, e=0, i=0, s=1, r=0, a=0, n=0) {
            if (this._bTransform = !1,
            null != y._createFun)
                return y._createFun(t, e, i, s, r, a, n);
            this.a = t,
            this.b = e,
            this.c = i,
            this.d = s,
            this.tx = r,
            this.ty = a,
            this._checkTransform()
        }
        identity() {
            return this.a = this.d = 1,
            this.b = this.tx = this.ty = this.c = 0,
            this._bTransform = !1,
            this
        }
        _checkTransform() {
            return this._bTransform = 1 !== this.a || 0 !== this.b || 0 !== this.c || 1 !== this.d
        }
        setTranslate(t, e) {
            return this.tx = t,
            this.ty = e,
            this
        }
        translate(t, e) {
            return this.tx += t,
            this.ty += e,
            this
        }
        scale(t, e) {
            return this.a *= t,
            this.d *= e,
            this.c *= t,
            this.b *= e,
            this.tx *= t,
            this.ty *= e,
            this._bTransform = !0,
            this
        }
        rotate(t) {
            var e = Math.cos(t)
              , t = Math.sin(t)
              , i = this.a
              , s = this.c
              , r = this.tx;
            return this.a = i * e - this.b * t,
            this.b = i * t + this.b * e,
            this.c = s * e - this.d * t,
            this.d = s * t + this.d * e,
            this.tx = r * e - this.ty * t,
            this.ty = r * t + this.ty * e,
            this._bTransform = !0,
            this
        }
        skew(t, e) {
            var t = Math.tan(t)
              , e = Math.tan(e)
              , i = this.a
              , s = this.b;
            return this.a += e * this.c,
            this.b += e * this.d,
            this.c += t * i,
            this.d += t * s,
            this
        }
        invertTransformPoint(t) {
            var e = this.a
              , i = this.b
              , s = this.c
              , r = this.d
              , a = this.tx
              , n = e * r - i * s
              , h = (s * this.ty - r * a) / n
              , a = -(e * this.ty - i * a) / n;
            return t.setTo(r / n * t.x + -s / n * t.y + h, -i / n * t.x + e / n * t.y + a)
        }
        transformPoint(t) {
            return t.setTo(this.a * t.x + this.c * t.y + this.tx, this.b * t.x + this.d * t.y + this.ty)
        }
        transformPointN(t) {
            return t.setTo(this.a * t.x + this.c * t.y, this.b * t.x + this.d * t.y)
        }
        getScaleX() {
            return 0 === this.b ? this.a : Math.sqrt(this.a * this.a + this.b * this.b)
        }
        getScaleY() {
            return 0 === this.c ? this.d : Math.sqrt(this.c * this.c + this.d * this.d)
        }
        invert() {
            var t = this.a
              , e = this.b
              , i = this.c
              , s = this.d
              , r = this.tx
              , a = t * s - e * i;
            return this.a = s / a,
            this.b = -e / a,
            this.c = -i / a,
            this.d = t / a,
            this.tx = (i * this.ty - s * r) / a,
            this.ty = -(t * this.ty - e * r) / a,
            this
        }
        setTo(t, e, i, s, r, a) {
            return this.a = t,
            this.b = e,
            this.c = i,
            this.d = s,
            this.tx = r,
            this.ty = a,
            this
        }
        concat(t) {
            var e = this.a
              , i = this.c
              , s = this.tx;
            return this.a = e * t.a + this.b * t.c,
            this.b = e * t.b + this.b * t.d,
            this.c = i * t.a + this.d * t.c,
            this.d = i * t.b + this.d * t.d,
            this.tx = s * t.a + this.ty * t.c + t.tx,
            this.ty = s * t.b + this.ty * t.d + t.ty,
            this
        }
        static mul(t, e, i) {
            var s = t.a
              , r = t.b
              , a = t.c
              , n = t.d
              , h = t.tx
              , t = t.ty
              , o = e.a
              , l = e.b
              , _ = e.c
              , u = e.d
              , c = e.tx
              , e = e.ty;
            return 0 !== l || 0 !== _ ? (i.a = s * o + r * _,
            i.b = s * l + r * u,
            i.c = a * o + n * _,
            i.d = a * l + n * u,
            i.tx = o * h + _ * t + c,
            i.ty = l * h + u * t + e) : (i.a = s * o,
            i.b = r * u,
            i.c = a * o,
            i.d = n * u,
            i.tx = o * h + c,
            i.ty = u * t + e),
            i
        }
        static mul16(t, e, i) {
            var s = t.a
              , r = t.b
              , a = t.c
              , n = t.d
              , h = t.tx
              , t = t.ty
              , o = e.a
              , l = e.b
              , _ = e.c
              , u = e.d
              , c = e.tx
              , e = e.ty;
            return 0 !== l || 0 !== _ ? (i[0] = s * o + r * _,
            i[1] = s * l + r * u,
            i[4] = a * o + n * _,
            i[5] = a * l + n * u,
            i[12] = o * h + _ * t + c,
            i[13] = l * h + u * t + e) : (i[0] = s * o,
            i[1] = r * u,
            i[4] = a * o,
            i[5] = n * u,
            i[12] = o * h + c,
            i[13] = u * t + e),
            i
        }
        scaleEx(t, e) {
            var i = this.a
              , s = this.b
              , r = this.c
              , a = this.d;
            0 !== s || 0 !== r ? (this.a = t * i,
            this.b = t * s,
            this.c = e * r) : (this.a = t * i,
            this.b = 0 * a,
            this.c = 0 * i),
            this.d = e * a,
            this._bTransform = !0
        }
        rotateEx(t) {
            var e = Math.cos(t)
              , t = Math.sin(t)
              , i = this.a
              , s = this.b
              , r = this.c
              , a = this.d;
            0 !== s || 0 !== r ? (this.a = e * i + t * r,
            this.b = e * s + t * a,
            this.c = -t * i + e * r,
            this.d = -t * s + e * a) : (this.a = e * i,
            this.b = t * a,
            this.c = -t * i,
            this.d = e * a),
            this._bTransform = !0
        }
        clone() {
            var t = y.create();
            return t.a = this.a,
            t.b = this.b,
            t.c = this.c,
            t.d = this.d,
            t.tx = this.tx,
            t.ty = this.ty,
            t._bTransform = this._bTransform,
            t
        }
        copyTo(t) {
            return t.a = this.a,
            t.b = this.b,
            t.c = this.c,
            t.d = this.d,
            t.tx = this.tx,
            t.ty = this.ty,
            t._bTransform = this._bTransform,
            t
        }
        toString() {
            return this.a + "," + this.b + "," + this.c + "," + this.d + "," + this.tx + "," + this.ty
        }
        destroy() {
            this.recover()
        }
        recover() {
            p.recover("Matrix", this.identity())
        }
        static create() {
            return p.getItemByClass("Matrix", y)
        }
    }
    y.EMPTY = new y,
    y.TEMP = new y,
    y._createFun = null;
    class q {
        constructor(t=0, e=0) {
            this.x = t,
            this.y = e
        }
        static create() {
            return p.getItemByClass("Point", q)
        }
        setTo(t, e) {
            return this.x = t,
            this.y = e,
            this
        }
        reset() {
            return this.x = this.y = 0,
            this
        }
        recover() {
            p.recover("Point", this.reset())
        }
        distance(t, e) {
            return Math.sqrt((this.x - t) * (this.x - t) + (this.y - e) * (this.y - e))
        }
        toString() {
            return this.x + "," + this.y
        }
        normalize() {
            var t = Math.sqrt(this.x * this.x + this.y * this.y);
            0 < t && (this.x *= t = 1 / t,
            this.y *= t)
        }
        copy(t) {
            return this.setTo(t.x, t.y)
        }
    }
    q.TEMP = new q,
    q.EMPTY = new q;
    class E {
        constructor(t=0, e=0, i=0, s=0) {
            this.x = t,
            this.y = e,
            this.width = i,
            this.height = s
        }
        get right() {
            return this.x + this.width
        }
        get bottom() {
            return this.y + this.height
        }
        setTo(t, e, i, s) {
            return this.x = t,
            this.y = e,
            this.width = i,
            this.height = s,
            this
        }
        reset() {
            return this.x = this.y = this.width = this.height = 0,
            this
        }
        recover() {
            this == E.TEMP || this == E.EMPTY ? console.log("recover Temp or Empty:", this) : p.recover("Rectangle", this.reset())
        }
        static create() {
            return p.getItemByClass("Rectangle", E)
        }
        copyFrom(t) {
            return this.x = t.x,
            this.y = t.y,
            this.width = t.width,
            this.height = t.height,
            this
        }
        contains(t, e) {
            return !(this.width <= 0 || this.height <= 0) && (t >= this.x && t < this.right && e >= this.y && e < this.bottom)
        }
        intersects(t) {
            return !(t.x > this.x + this.width || t.x + t.width < this.x || t.y > this.y + this.height || t.y + t.height < this.y)
        }
        intersection(t, e=null) {
            return this.intersects(t) ? ((e = e || new E).x = Math.max(this.x, t.x),
            e.y = Math.max(this.y, t.y),
            e.width = Math.min(this.right, t.right) - e.x,
            e.height = Math.min(this.bottom, t.bottom) - e.y,
            e) : null
        }
        union(t, e=null) {
            return e = e || new E,
            this.clone(e),
            t.width <= 0 || t.height <= 0 ? e : (e.addPoint(t.x, t.y),
            e.addPoint(t.right, t.bottom),
            this)
        }
        clone(t=null) {
            return (t = t || new E).x = this.x,
            t.y = this.y,
            t.width = this.width,
            t.height = this.height,
            t
        }
        toString() {
            return this.x + "," + this.y + "," + this.width + "," + this.height
        }
        equals(t) {
            return !(!t || t.x !== this.x || t.y !== this.y || t.width !== this.width || t.height !== this.height)
        }
        addPoint(t, e) {
            return this.x > t && (this.width += this.x - t,
            this.x = t),
            this.y > e && (this.height += this.y - e,
            this.y = e),
            this.width < t - this.x && (this.width = t - this.x),
            this.height < e - this.y && (this.height = e - this.y),
            this
        }
        _getBoundPoints() {
            var t = E._temB;
            return (t.length = 0) == this.width || 0 == this.height || t.push(this.x, this.y, this.x + this.width, this.y, this.x, this.y + this.height, this.x + this.width, this.y + this.height),
            t
        }
        static _getBoundPointS(t, e, i, s) {
            var r = E._temA;
            return (r.length = 0) == i || 0 == s || r.push(t, e, t + i, e, t, e + s, t + i, e + s),
            r
        }
        static _getWrapRec(t, e=null) {
            if (!t || t.length < 1)
                return (e || E.TEMP).setTo(0, 0, 0, 0);
            e = e || E.create();
            for (var i, s, r = t.length, a = q.TEMP, n = i = 99999, h = s = -n, o = 0; o < r; o += 2)
                a.x = t[o],
                a.y = t[o + 1],
                n = n < a.x ? n : a.x,
                i = i < a.y ? i : a.y,
                h = h > a.x ? h : a.x,
                s = s > a.y ? s : a.y;
            return e.setTo(n, i, h - n, s - i)
        }
        isEmpty() {
            return this.width <= 0 || this.height <= 0
        }
    }
    E.EMPTY = new E,
    E.TEMP = new E,
    E._temB = [],
    E._temA = [];
    class d {
    }
    d.ARRAY_BUFFER_TYPE_DATA = 0,
    d.ARRAY_BUFFER_TYPE_CMD = 1,
    d.ARRAY_BUFFER_REF_REFERENCE = 0,
    d.ARRAY_BUFFER_REF_COPY = 1,
    d.UPLOAD_SHADER_UNIFORM_TYPE_ID = 0;
    var c = d.UPLOAD_SHADER_UNIFORM_TYPE_DATA = 1
      , Z = 0;
    class m {
        static __init__() {
            var t = d.instance
              , e = (m._depthFunc = t.LESS,
            m._blendEquation = t.FUNC_ADD,
            m._blendEquationRGB = t.FUNC_ADD,
            m._blendEquationAlpha = t.FUNC_ADD,
            c = t.ONE,
            Z = t.ZERO,
            m._sFactorAlpha = t.ONE,
            m._dFactorAlpha = t.ZERO,
            m._activedTextureID = t.TEXTURE0,
            t.getParameter(t.MAX_VERTEX_TEXTURE_IMAGE_UNITS))
              , e = (m._activeTextures = new Array(e),
            m._glTextureIDs = [t.TEXTURE0, t.TEXTURE1, t.TEXTURE2, t.TEXTURE3, t.TEXTURE4, t.TEXTURE5, t.TEXTURE6, t.TEXTURE7, t.TEXTURE8, t.TEXTURE9, t.TEXTURE10, t.TEXTURE11, t.TEXTURE12, t.TEXTURE13, t.TEXTURE14, t.TEXTURE15, t.TEXTURE16, t.TEXTURE17, t.TEXTURE18, t.TEXTURE19, t.TEXTURE20, t.TEXTURE21, t.TEXTURE22, t.TEXTURE23, t.TEXTURE24, t.TEXTURE25, t.TEXTURE26, t.TEXTURE27, t.TEXTURE28, t.TEXTURE29, t.TEXTURE30, t.TEXTURE31],
            t.getParameter(t.MAX_VERTEX_UNIFORM_VECTORS))
              , t = t.getParameter(t.MAX_FRAGMENT_UNIFORM_VECTORS);
            m._maxUniformFragmentVectors = Math.min(e, t)
        }
        static useProgram(t, e) {
            return m._useProgram !== e && (t.useProgram(e),
            m._useProgram = e,
            !0)
        }
        static setDepthTest(t, e) {
            e !== m._depthTest && ((m._depthTest = e) ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST))
        }
        static setDepthMask(t, e) {
            e !== m._depthMask && (m._depthMask = e,
            t.depthMask(e))
        }
        static setDepthFunc(t, e) {
            e !== m._depthFunc && (m._depthFunc = e,
            t.depthFunc(e))
        }
        static setBlend(t, e) {
            e !== m._blend && ((m._blend = e) ? t.enable(t.BLEND) : t.disable(t.BLEND))
        }
        static setBlendEquation(t, e) {
            e !== m._blendEquation && (m._blendEquation = e,
            m._blendEquationRGB = m._blendEquationAlpha = null,
            t.blendEquation(e))
        }
        static setBlendEquationSeparate(t, e, i) {
            e === m._blendEquationRGB && i === m._blendEquationAlpha || (m._blendEquationRGB = e,
            m._blendEquationAlpha = i,
            m._blendEquation = null,
            t.blendEquationSeparate(e, i))
        }
        static setBlendFunc(t, e, i, s=!1) {
            !s && e === c && i === Z || (c = e,
            Z = i,
            m._sFactorRGB = null,
            m._dFactorRGB = null,
            m._sFactorAlpha = null,
            m._dFactorAlpha = null,
            t.blendFunc(e, i))
        }
        static setBlendFuncSeperate(t, e, i, s, r) {
            e === m._sFactorRGB && i === m._dFactorRGB && s === m._sFactorAlpha && r === m._dFactorAlpha || (m._sFactorRGB = e,
            m._dFactorRGB = i,
            m._sFactorAlpha = s,
            m._dFactorAlpha = r,
            Z = c = null,
            t.blendFuncSeparate(e, i, s, r))
        }
        static setCullFace(t, e) {
            e !== m._cullFace && ((m._cullFace = e) ? t.enable(t.CULL_FACE) : t.disable(t.CULL_FACE))
        }
        static setFrontFace(t, e) {
            e !== m._frontFace && (m._frontFace = e,
            t.frontFace(e))
        }
        static activeTexture(t, e) {
            m._activedTextureID !== e && (t.activeTexture(e),
            m._activedTextureID = e)
        }
        static bindTexture(t, e, i) {
            m._activeTextures[m._activedTextureID - t.TEXTURE0] !== i && (t.bindTexture(e, i),
            m._activeTextures[m._activedTextureID - t.TEXTURE0] = i)
        }
        static __init_native() {
            var t;
            R.Render.supportWebGLPlusRendering && ((t = m).activeTexture = t.activeTextureForNative,
            t.bindTexture = t.bindTextureForNative)
        }
        static useProgramForNative(t, e) {
            return t.useProgram(e),
            !0
        }
        static setDepthTestForNative(t, e) {
            e ? t.enable(t.DEPTH_TEST) : t.disable(t.DEPTH_TEST)
        }
        static setDepthMaskForNative(t, e) {
            t.depthMask(e)
        }
        static setDepthFuncForNative(t, e) {
            t.depthFunc(e)
        }
        static setBlendForNative(t, e) {
            e ? t.enable(t.BLEND) : t.disable(t.BLEND)
        }
        static setBlendFuncForNative(t, e, i) {
            t.blendFunc(e, i)
        }
        static setCullFaceForNative(t, e) {
            e ? t.enable(t.CULL_FACE) : t.disable(t.CULL_FACE)
        }
        static setFrontFaceForNative(t, e) {
            t.frontFace(e)
        }
        static activeTextureForNative(t, e) {
            t.activeTexture(e)
        }
        static bindTextureForNative(t, e, i) {
            t.bindTexture(e, i)
        }
        static bindVertexArrayForNative(t, e) {
            t.bindVertexArray(e)
        }
        static getUniformMaxVector() {
            return m._maxUniformFragmentVectors
        }
    }
    m._activeTextures = new Array(1),
    m._useProgram = null,
    m._depthTest = !0,
    m._depthMask = !0,
    m._blend = !1,
    m._cullFace = !1,
    m.mainContext = null;
    class Q {
        constructor(t=null, e=null, i=null, s=!1) {
            this.once = !1,
            this._id = 0,
            this.setTo(t, e, i, s)
        }
        setTo(t, e, i, s=!1) {
            return this._id = Q._gid++,
            this.caller = t,
            this.method = e,
            this.args = i,
            this.once = s,
            this
        }
        run() {
            if (null == this.method)
                return null;
            var t = this._id
              , e = this.method.apply(this.caller, this.args);
            return this._id === t && this.once && this.recover(),
            e
        }
        runWith(t) {
            if (null == this.method)
                return null;
            var e = this._id
              , t = null == t ? this.method.apply(this.caller, this.args) : this.args || t.unshift ? this.args ? this.method.apply(this.caller, this.args.concat(t)) : this.method.apply(this.caller, t) : this.method.call(this.caller, t);
            return this._id === e && this.once && this.recover(),
            t
        }
        clear() {
            return this.caller = null,
            this.method = null,
            this.args = null,
            this
        }
        recover() {
            0 < this._id && (this._id = 0,
            Q._pool.push(this.clear()))
        }
        static create(t, e, i=null, s=!0) {
            return Q._pool.length ? Q._pool.pop().setTo(t, e, i, s) : new Q(t,e,i,s)
        }
    }
    Q._pool = [],
    Q._gid = 1;
    class i {
        hasListener(t) {
            return !!(this._events && this._events[t])
        }
        event(t, e=null) {
            if (!this._events || !this._events[t])
                return !1;
            var i = this._events[t];
            if (i.run)
                i.once && delete this._events[t],
                null != e ? i.runWith(e) : i.run();
            else {
                for (var s = 0, r = i.length; s < r; s++) {
                    var a = i[s];
                    a && (null != e ? a.runWith(e) : a.run()),
                    a && !a.once || (i.splice(s, 1),
                    s--,
                    r--)
                }
                0 === i.length && this._events && !this._events[t].run && delete this._events[t]
            }
            return !0
        }
        on(t, e, i, s=null) {
            return this._createListener(t, e, i, s, !1)
        }
        once(t, e, i, s=null) {
            return this._createListener(t, e, i, s, !0)
        }
        _createListener(t, e, i, s, r, a=!0) {
            a && this.off(t, e, i, r);
            a = $.create(e || this, i, s, r),
            this._events || (this._events = {}),
            e = this._events;
            return e[t] ? e[t].run ? e[t] = [e[t], a] : e[t].push(a) : e[t] = a,
            this
        }
        off(t, e, i, s=!1) {
            if (!this._events || !this._events[t])
                return this;
            var r = this._events[t];
            if (null != r)
                if (r.run)
                    e && r.caller !== e || null != i && r.method !== i || s && !r.once || (delete this._events[t],
                    r.recover());
                else {
                    for (var a = 0, n = 0, h = r.length; n < h; n++) {
                        var o = r[n];
                        o ? !o || e && o.caller !== e || null != i && o.method !== i || s && !o.once || (a++,
                        r[n] = null,
                        o.recover()) : a++
                    }
                    a === h && delete this._events[t]
                }
            return this
        }
        offAll(t=null) {
            var e = this._events;
            if (!e)
                return this;
            if (t)
                this._recoverHandlers(e[t]),
                delete e[t];
            else {
                for (var i in e)
                    this._recoverHandlers(e[i]);
                this._events = null
            }
            return this
        }
        offAllCaller(t) {
            if (t && this._events)
                for (var e in this._events)
                    this.off(e, t, null);
            return this
        }
        _recoverHandlers(t) {
            if (t)
                if (t.run)
                    t.recover();
                else
                    for (var e = t.length - 1; -1 < e; e--)
                        t[e] && (t[e].recover(),
                        t[e] = null)
        }
        isMouseEvent(t) {
            return i.MOUSE_EVENTS[t] || !1
        }
    }
    i.MOUSE_EVENTS = {
        rightmousedown: !0,
        rightmouseup: !0,
        rightclick: !0,
        mousedown: !0,
        mouseup: !0,
        mousemove: !0,
        mouseover: !0,
        mouseout: !0,
        click: !0,
        doubleclick: !0
    };
    class $ extends Q {
        constructor(t, e, i, s) {
            super(t, e, i, s)
        }
        recover() {
            0 < this._id && (this._id = 0,
            $._pool.push(this.clear()))
        }
        static create(t, e, i=null, s=!0) {
            return $._pool.length ? $._pool.pop().setTo(t, e, i, s) : new $(t,e,i,s)
        }
    }
    $._pool = [];
    class C {
        constructor(t) {
            this._url = C.formatURL(t),
            this._path = C.getPath(t)
        }
        get url() {
            return this._url
        }
        get path() {
            return this._path
        }
        static set basePath(t) {
            C._basePath = R.Laya._getUrlPath(),
            C._basePath = C.formatURL(t)
        }
        static get basePath() {
            return C._basePath
        }
        static formatURL(t) {
            if (!t)
                return "null path";
            if (0 < t.indexOf(":"))
                return t;
            C.exportSceneToJson && (t = C.getAdptedFilePath(t));
            var e = (t = null != C.customFormat ? C.customFormat(t) : t).charAt(0);
            if ("." === e)
                return C._formatRelativePath(C._basePath + t);
            if ("~" === e)
                return C.rootPath + t.substring(1);
            if ("d" === e) {
                if (0 === t.indexOf("data:image"))
                    return t
            } else if ("/" === e)
                return t;
            return C._basePath + t
        }
        static _formatRelativePath(t) {
            for (var e = t.split("/"), i = 0, s = e.length; i < s; i++)
                ".." == e[i] && (e.splice(i - 1, 2),
                i -= 2);
            return e.join("/")
        }
        static getPath(t) {
            var e = t.lastIndexOf("/");
            return 0 < e ? t.substr(0, e + 1) : ""
        }
        static getFileName(t) {
            var e = t.lastIndexOf("/");
            return 0 < e ? t.substr(e + 1) : t
        }
        static getAdptedFilePath(t) {
            if (!C.exportSceneToJson || !t)
                return t;
            for (var e, i = C._adpteTypeList.length, s = 0; s < i; s++)
                e = C._adpteTypeList[s],
                t = t.replace(e[0], e[1]);
            return t
        }
    }
    C.version = {},
    C.exportSceneToJson = !1,
    C._basePath = "",
    C.rootPath = "",
    C.customFormat = function(t) {
        var e = C.version[t];
        return !window.conch && e && (t += "?v=" + e),
        t
    }
    ,
    C._adpteTypeList = [[".scene3d", ".json"], [".scene", ".json"], [".taa", ".json"], [".prefab", ".json"]];
    class J extends i {
        constructor() {
            super(),
            this._id = 0,
            this._url = null,
            this._cpuMemory = 0,
            this._gpuMemory = 0,
            this._destroyed = !1,
            this._referenceCount = 0,
            this.lock = !1,
            this.name = null,
            this._id = ++J._uniqueIDCounter,
            this._destroyed = !1,
            this._referenceCount = 0,
            (J._idResourcesMap[this.id] = this).lock = !1
        }
        static get cpuMemory() {
            return J._cpuMemory
        }
        static get gpuMemory() {
            return J._gpuMemory
        }
        static _addCPUMemory(t) {
            J._cpuMemory += t
        }
        static _addGPUMemory(t) {
            J._gpuMemory += t
        }
        static _addMemory(t, e) {
            J._cpuMemory += t,
            J._gpuMemory += e
        }
        static getResourceByID(t) {
            return J._idResourcesMap[t]
        }
        static getResourceByURL(t, e=0) {
            return J._urlResourcesMap[t][e]
        }
        static destroyUnusedResources() {
            for (var t in J._idResourcesMap) {
                t = J._idResourcesMap[t];
                t.lock || 0 !== t._referenceCount || t.destroy()
            }
        }
        get id() {
            return this._id
        }
        get url() {
            return this._url
        }
        get cpuMemory() {
            return this._cpuMemory
        }
        get gpuMemory() {
            return this._gpuMemory
        }
        get destroyed() {
            return this._destroyed
        }
        get referenceCount() {
            return this._referenceCount
        }
        _setCPUMemory(t) {
            var e = t - this._cpuMemory;
            this._cpuMemory = t,
            J._addCPUMemory(e)
        }
        _setGPUMemory(t) {
            var e = t - this._gpuMemory;
            this._gpuMemory = t,
            J._addGPUMemory(e)
        }
        _setCreateURL(t) {
            var e;
            t = C.formatURL(t),
            this._url !== t && (this._url && ((e = J._urlResourcesMap[this._url]).splice(e.indexOf(this), 1),
            0 === e.length && delete J._urlResourcesMap[this._url]),
            t && ((e = J._urlResourcesMap[t]) || (J._urlResourcesMap[t] = e = []),
            e.push(this)),
            this._url = t)
        }
        _addReference(t=1) {
            this._referenceCount += t
        }
        _removeReference(t=1) {
            this._referenceCount -= t
        }
        _clearReference() {
            this._referenceCount = 0
        }
        _recoverResource() {}
        _disposeResource() {}
        _activeResource() {}
        destroy() {
            var t;
            this._destroyed || (this._destroyed = !0,
            this.lock = !1,
            this._disposeResource(),
            delete J._idResourcesMap[this.id],
            this._url && ((t = J._urlResourcesMap[this._url]) && (t.splice(t.indexOf(this), 1),
            0 === t.length && delete J._urlResourcesMap[this._url]),
            R.Loader.loadedMap[this._url] == this && delete R.Loader.loadedMap[this._url]))
        }
    }
    J._uniqueIDCounter = 0,
    J._idResourcesMap = {},
    J._urlResourcesMap = {},
    J._cpuMemory = 0,
    J._gpuMemory = 0;
    class tt extends J {
        constructor() {
            super(),
            this._width = -1,
            this._height = -1
        }
        get width() {
            return this._width
        }
        set width(t) {
            this._width = t
        }
        get height() {
            return this._height
        }
        set height(t) {
            this._height = t
        }
        _getSource() {
            throw "Bitmap: must override it."
        }
    }
    (t = v.FilterMode || (v.FilterMode = {}))[t.Point = 0] = "Point",
    t[t.Bilinear = 1] = "Bilinear",
    t[t.Trilinear = 2] = "Trilinear",
    (t = v.TextureFormat || (v.TextureFormat = {}))[t.R8G8B8 = 0] = "R8G8B8",
    t[t.R8G8B8A8 = 1] = "R8G8B8A8",
    t[t.R5G6B5 = 16] = "R5G6B5",
    t[t.Alpha8 = 2] = "Alpha8",
    t[t.DXT1 = 3] = "DXT1",
    t[t.DXT5 = 4] = "DXT5",
    t[t.ETC1RGB = 5] = "ETC1RGB",
    t[t.ETC2RGB = 6] = "ETC2RGB",
    t[t.ETC2RGBA = 7] = "ETC2RGBA",
    t[t.ETC2RGB_Alpha8 = 8] = "ETC2RGB_Alpha8",
    t[t.ETC2SRGB = 28] = "ETC2SRGB",
    t[t.PVRTCRGB_2BPPV = 9] = "PVRTCRGB_2BPPV",
    t[t.PVRTCRGBA_2BPPV = 10] = "PVRTCRGBA_2BPPV",
    t[t.PVRTCRGB_4BPPV = 11] = "PVRTCRGB_4BPPV",
    t[t.PVRTCRGBA_4BPPV = 12] = "PVRTCRGBA_4BPPV",
    t[t.R32G32B32A32 = 15] = "R32G32B32A32",
    t[t.R16G16B16A16 = 17] = "R16G16B16A16",
    t[t.ASTC4x4 = 18] = "ASTC4x4",
    t[t.ASTC4x4SRGB = 23] = "ASTC4x4SRGB",
    t[t.ASTC6x6 = 19] = "ASTC6x6",
    t[t.ASTC6x6SRGB = 24] = "ASTC6x6SRGB",
    t[t.ASTC8x8 = 20] = "ASTC8x8",
    t[t.ASTC8x8SRGB = 25] = "ASTC8x8SRGB",
    t[t.ASTC10x10 = 21] = "ASTC10x10",
    t[t.ASTC10x10SRGB = 26] = "ASTC10x10SRGB",
    t[t.ASTC12x12 = 22] = "ASTC12x12",
    t[t.ASTC12x12SRGB = 27] = "ASTC12x12SRGB",
    t[t.KTXTEXTURE = -1] = "KTXTEXTURE",
    t[t.PVRTEXTURE = -2] = "PVRTEXTURE",
    (t = v.WarpMode || (v.WarpMode = {}))[t.Repeat = 0] = "Repeat",
    t[t.Clamp = 1] = "Clamp",
    t[t.Mirrored = 2] = "Mirrored";
    class et extends tt {
        constructor(t, e) {
            super(),
            this._wrapModeU = v.WarpMode.Repeat,
            this._wrapModeV = v.WarpMode.Repeat,
            this._filterMode = v.FilterMode.Bilinear,
            this._readyed = !1,
            this._width = -1,
            this._height = -1,
            this._format = t,
            this._mipmap = e,
            this._anisoLevel = 1,
            this._glTexture = d.instance.createTexture()
        }
        get mipmap() {
            return this._mipmap
        }
        get format() {
            return this._format
        }
        get wrapModeU() {
            return this._wrapModeU
        }
        set wrapModeU(t) {
            this._wrapModeU !== t && (this._wrapModeU = t,
            -1 !== this._width && this._setWarpMode(d.instance.TEXTURE_WRAP_S, t))
        }
        get wrapModeV() {
            return this._wrapModeV
        }
        set wrapModeV(t) {
            this._wrapModeV !== t && (this._wrapModeV = t,
            -1 !== this._height && this._setWarpMode(d.instance.TEXTURE_WRAP_T, t))
        }
        get filterMode() {
            return this._filterMode
        }
        set filterMode(t) {
            t !== this._filterMode && (this._filterMode = t,
            -1 !== this._width && -1 !== this._height && this._setFilterMode(t))
        }
        get anisoLevel() {
            return this._anisoLevel
        }
        set anisoLevel(t) {
            t !== this._anisoLevel && (this._anisoLevel = Math.max(1, Math.min(16, t)),
            -1 !== this._width && -1 !== this._height && this._setAnisotropy(t))
        }
        get mipmapCount() {
            return this._mipmapCount
        }
        set mipmapCount(t) {
            this._mipmapCount = t
        }
        get defaulteTexture() {
            throw "BaseTexture:must override it."
        }
        _getFormatByteCount() {
            switch (this._format) {
            case v.TextureFormat.R8G8B8:
                return 3;
            case v.TextureFormat.R8G8B8A8:
                return 4;
            case v.TextureFormat.R5G6B5:
            case v.TextureFormat.Alpha8:
                return 1;
            case v.TextureFormat.R16G16B16A16:
                return 2;
            case v.TextureFormat.R32G32B32A32:
                return 4;
            default:
                throw "Texture2D: unknown format."
            }
        }
        _isPot(t) {
            return 0 == (t & t - 1)
        }
        _getGLFormat() {
            var t, e = d.instance, i = d.layaGPUInstance;
            switch (this._format) {
            case v.TextureFormat.R8G8B8:
            case v.TextureFormat.R5G6B5:
                t = e.RGB;
                break;
            case v.TextureFormat.R8G8B8A8:
                t = e.RGBA;
                break;
            case v.TextureFormat.Alpha8:
                t = e.ALPHA;
                break;
            case v.TextureFormat.R32G32B32A32:
            case v.TextureFormat.R16G16B16A16:
                t = e.RGBA;
                break;
            case v.TextureFormat.DXT1:
                if (!i._compressedTextureS3tc)
                    throw "BaseTexture: not support DXT1 format.";
                t = i._compressedTextureS3tc.COMPRESSED_RGB_S3TC_DXT1_EXT;
                break;
            case v.TextureFormat.DXT5:
                if (!i._compressedTextureS3tc)
                    throw "BaseTexture: not support DXT5 format.";
                t = i._compressedTextureS3tc.COMPRESSED_RGBA_S3TC_DXT5_EXT;
                break;
            case v.TextureFormat.ETC1RGB:
                if (!i._compressedTextureEtc1)
                    throw "BaseTexture: not support ETC1RGB format.";
                t = i._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL;
                break;
            case v.TextureFormat.ETC2RGB:
                if (!i._compressedTextureETC)
                    throw "BaseTexture: not support ETC2RGB format.";
                t = i._compressedTextureETC.COMPRESSED_RGB8_ETC2;
                break;
            case v.TextureFormat.ETC2RGBA:
                if (!i._compressedTextureETC)
                    throw "BaseTexture: not support ETC2RGBA format.";
                t = i._compressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC;
                break;
            case v.TextureFormat.ETC2RGB_Alpha8:
                if (!i._compressedTextureETC)
                    throw "BaseTexture: not support ETC2SRGB_Alpha8 format.";
                t = i._compressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
                break;
            case v.TextureFormat.ETC2SRGB:
                if (!i._compressedTextureETC)
                    throw "BaseTexture: not support ETC2SRGB format.";
                t = i._compressedTextureETC.COMPRESSED_SRGB8_ETC2;
                break;
            case v.TextureFormat.PVRTCRGB_2BPPV:
                if (!i._compressedTexturePvrtc)
                    throw "BaseTexture: not support PVRTCRGB_2BPPV format.";
                t = i._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
                break;
            case v.TextureFormat.PVRTCRGBA_2BPPV:
                if (!i._compressedTexturePvrtc)
                    throw "BaseTexture: not support PVRTCRGBA_2BPPV format.";
                t = i._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
                break;
            case v.TextureFormat.PVRTCRGB_4BPPV:
                if (!i._compressedTexturePvrtc)
                    throw "BaseTexture: not support PVRTCRGB_4BPPV format.";
                t = i._compressedTexturePvrtc.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
                break;
            case v.TextureFormat.PVRTCRGBA_4BPPV:
                if (!i._compressedTexturePvrtc)
                    throw "BaseTexture: not support PVRTCRGBA_4BPPV format.";
                t = i._compressedTexturePvrtc.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
                break;
            case v.TextureFormat.ASTC4x4:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC4x4 format.";
                t = i._compressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR;
                break;
            case v.TextureFormat.ASTC4x4SRGB:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC4x4_KHR format.";
                t = i._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
                break;
            case v.TextureFormat.ASTC6x6:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC6x6 format.";
                t = i._compressedTextureASTC.COMPRESSED_RGBA_ASTC_6x6_KHR;
                break;
            case v.TextureFormat.ASTC6x6SRGB:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC6x6_KHR format.";
                t = i._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
                break;
            case v.TextureFormat.ASTC8x8:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC8x8 format.";
                t = i._compressedTextureASTC.COMPRESSED_RGBA_ASTC_8x8_KHR;
                break;
            case v.TextureFormat.ASTC8x8SRGB:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC8x8 format.";
                t = i._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
                break;
            case v.TextureFormat.ASTC10x10:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC10x10 format.";
                t = i._compressedTextureASTC.COMPRESSED_RGBA_ASTC_10x10_KHR;
                break;
            case v.TextureFormat.ASTC10x10SRGB:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC10x10 format.";
                t = i._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
                break;
            case v.TextureFormat.ASTC12x12:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC12x12 format.";
                t = i._compressedTextureASTC.COMPRESSED_RGBA_ASTC_12x12_KHR;
                break;
            case v.TextureFormat.ASTC12x12SRGB:
                if (!i._compressedTextureASTC)
                    throw "BaseTexture: not support ASTC12x12 format.";
                t = i._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
                break;
            default:
                throw "BaseTexture: unknown texture format."
            }
            return t
        }
        _setFilterMode(t) {
            var e = d.instance;
            switch (m.bindTexture(e, this._glTextureType, this._glTexture),
            t) {
            case v.FilterMode.Point:
                this._mipmap ? e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.NEAREST_MIPMAP_NEAREST) : e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.NEAREST),
                e.texParameteri(this._glTextureType, e.TEXTURE_MAG_FILTER, e.NEAREST);
                break;
            case v.FilterMode.Bilinear:
                this._mipmap ? e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_NEAREST) : e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.LINEAR),
                e.texParameteri(this._glTextureType, e.TEXTURE_MAG_FILTER, e.LINEAR);
                break;
            case v.FilterMode.Trilinear:
                this._mipmap ? e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.LINEAR_MIPMAP_LINEAR) : e.texParameteri(this._glTextureType, e.TEXTURE_MIN_FILTER, e.LINEAR),
                e.texParameteri(this._glTextureType, e.TEXTURE_MAG_FILTER, e.LINEAR);
                break;
            default:
                throw new Error("BaseTexture:unknown filterMode value.")
            }
        }
        _setWarpMode(t, e) {
            var i = d.instance;
            if (m.bindTexture(i, this._glTextureType, this._glTexture),
            this._isPot(this._width) && this._isPot(this._height))
                switch (e) {
                case v.WarpMode.Repeat:
                    i.texParameteri(this._glTextureType, t, i.REPEAT);
                    break;
                case v.WarpMode.Clamp:
                    i.texParameteri(this._glTextureType, t, i.CLAMP_TO_EDGE);
                    break;
                case v.WarpMode.Mirrored:
                    i.texParameteri(this._glTextureType, t, i.MIRRORED_REPEAT)
                }
            else
                i.texParameteri(this._glTextureType, t, i.CLAMP_TO_EDGE)
        }
        _setAnisotropy(t) {
            var e, i = d.layaGPUInstance._extTextureFilterAnisotropic;
            i && (t = Math.max(t, 1),
            e = d.instance,
            m.bindTexture(e, this._glTextureType, this._glTexture),
            t = Math.min(e.getParameter(i.MAX_TEXTURE_MAX_ANISOTROPY_EXT), t),
            e.texParameterf(this._glTextureType, i.TEXTURE_MAX_ANISOTROPY_EXT, t))
        }
        _disposeResource() {
            this._glTexture && (d.instance.deleteTexture(this._glTexture),
            this._glTexture = null,
            this._setGPUMemory(0))
        }
        _getSource() {
            return this._readyed ? this._glTexture : null
        }
        generateMipmap() {
            this._isPot(this.width) && this._isPot(this.height) && d.instance.generateMipmap(this._glTextureType)
        }
    }
    et._rgbmRange = 5,
    et.FORMAT_R8G8B8 = 0,
    et.FORMAT_R8G8B8A8 = 1,
    et.FORMAT_ALPHA8 = 2,
    et.FORMAT_DXT1 = 3,
    et.FORMAT_DXT5 = 4,
    et.FORMAT_ETC1RGB = 5,
    et.FORMAT_PVRTCRGB_2BPPV = 9,
    et.FORMAT_PVRTCRGBA_2BPPV = 10,
    et.FORMAT_PVRTCRGB_4BPPV = 11,
    et.FORMAT_PVRTCRGBA_4BPPV = 12,
    et.RENDERTEXTURE_FORMAT_RGBA_HALF_FLOAT = 14,
    et.FORMAT_R32G32B32A32 = 15,
    et.FORMAT_DEPTH_16 = 0,
    et.FORMAT_STENCIL_8 = 1,
    et.FORMAT_DEPTHSTENCIL_16_8 = 2,
    et.FORMAT_DEPTHSTENCIL_NONE = 3,
    et.FILTERMODE_POINT = 0,
    et.FILTERMODE_BILINEAR = 1,
    et.FILTERMODE_TRILINEAR = 2,
    et.WARPMODE_REPEAT = 0,
    et.WARPMODE_CLAMP = 1;
    class it {
        constructor(t=null) {
            this._xd_ = !0,
            this._allocated_ = 8,
            this._pos_ = 0,
            this._length = 0,
            t ? (this._u8d_ = new Uint8Array(t),
            this._d_ = new DataView(this._u8d_.buffer),
            this._length = this._d_.byteLength) : this._resizeBuffer(this._allocated_)
        }
        static getSystemEndian() {
            var t;
            return it._sysEndian || (t = new ArrayBuffer(2),
            new DataView(t).setInt16(0, 256, !0),
            it._sysEndian = 256 === new Int16Array(t)[0] ? it.LITTLE_ENDIAN : it.BIG_ENDIAN),
            it._sysEndian
        }
        get buffer() {
            var t = this._d_.buffer;
            return t.byteLength === this._length ? t : t.slice(0, this._length)
        }
        get endian() {
            return this._xd_ ? it.LITTLE_ENDIAN : it.BIG_ENDIAN
        }
        set endian(t) {
            this._xd_ = t === it.LITTLE_ENDIAN
        }
        set length(t) {
            this._allocated_ < t ? this._resizeBuffer(this._allocated_ = Math.floor(Math.max(t, 2 * this._allocated_))) : this._allocated_ > t && this._resizeBuffer(this._allocated_ = t),
            this._length = t
        }
        get length() {
            return this._length
        }
        _resizeBuffer(e) {
            try {
                var t = new Uint8Array(e);
                null != this._u8d_ && (this._u8d_.length <= e ? t.set(this._u8d_) : t.set(this._u8d_.subarray(0, e))),
                this._u8d_ = t,
                this._d_ = new DataView(t.buffer)
            } catch (t) {
                throw "Invalid typed array length:" + e
            }
        }
        getString() {
            return this.readString()
        }
        readString() {
            return this._rUTF(this.getUint16())
        }
        getFloat32Array(t, e) {
            return this.readFloat32Array(t, e)
        }
        readFloat32Array(t, e) {
            e = (e = t + e) > this._length ? this._length : e,
            t = new Float32Array(this._d_.buffer.slice(t, e));
            return this._pos_ = e,
            t
        }
        getUint8Array(t, e) {
            return this.readUint8Array(t, e)
        }
        readUint8Array(t, e) {
            e = (e = t + e) > this._length ? this._length : e,
            t = new Uint8Array(this._d_.buffer.slice(t, e));
            return this._pos_ = e,
            t
        }
        getInt16Array(t, e) {
            return this.readInt16Array(t, e)
        }
        readInt16Array(t, e) {
            e = (e = t + e) > this._length ? this._length : e,
            t = new Int16Array(this._d_.buffer.slice(t, e));
            return this._pos_ = e,
            t
        }
        getFloat32() {
            return this.readFloat32()
        }
        readFloat32() {
            if (this._pos_ + 4 > this._length)
                throw "getFloat32 error - Out of bounds";
            var t = this._d_.getFloat32(this._pos_, this._xd_);
            return this._pos_ += 4,
            t
        }
        getFloat64() {
            return this.readFloat64()
        }
        readFloat64() {
            if (this._pos_ + 8 > this._length)
                throw "getFloat64 error - Out of bounds";
            var t = this._d_.getFloat64(this._pos_, this._xd_);
            return this._pos_ += 8,
            t
        }
        writeFloat32(t) {
            this._ensureWrite(this._pos_ + 4),
            this._d_.setFloat32(this._pos_, t, this._xd_),
            this._pos_ += 4
        }
        writeFloat64(t) {
            this._ensureWrite(this._pos_ + 8),
            this._d_.setFloat64(this._pos_, t, this._xd_),
            this._pos_ += 8
        }
        getInt32() {
            return this.readInt32()
        }
        readInt32() {
            if (this._pos_ + 4 > this._length)
                throw "getInt32 error - Out of bounds";
            var t = this._d_.getInt32(this._pos_, this._xd_);
            return this._pos_ += 4,
            t
        }
        getUint32() {
            return this.readUint32()
        }
        readUint32() {
            if (this._pos_ + 4 > this._length)
                throw "getUint32 error - Out of bounds";
            var t = this._d_.getUint32(this._pos_, this._xd_);
            return this._pos_ += 4,
            t
        }
        writeInt32(t) {
            this._ensureWrite(this._pos_ + 4),
            this._d_.setInt32(this._pos_, t, this._xd_),
            this._pos_ += 4
        }
        writeUint32(t) {
            this._ensureWrite(this._pos_ + 4),
            this._d_.setUint32(this._pos_, t, this._xd_),
            this._pos_ += 4
        }
        getInt16() {
            return this.readInt16()
        }
        readInt16() {
            if (this._pos_ + 2 > this._length)
                throw "getInt16 error - Out of bounds";
            var t = this._d_.getInt16(this._pos_, this._xd_);
            return this._pos_ += 2,
            t
        }
        getUint16() {
            return this.readUint16()
        }
        readUint16() {
            if (this._pos_ + 2 > this._length)
                throw "getUint16 error - Out of bounds";
            var t = this._d_.getUint16(this._pos_, this._xd_);
            return this._pos_ += 2,
            t
        }
        writeUint16(t) {
            this._ensureWrite(this._pos_ + 2),
            this._d_.setUint16(this._pos_, t, this._xd_),
            this._pos_ += 2
        }
        writeInt16(t) {
            this._ensureWrite(this._pos_ + 2),
            this._d_.setInt16(this._pos_, t, this._xd_),
            this._pos_ += 2
        }
        getUint8() {
            return this.readUint8()
        }
        readUint8() {
            if (this._pos_ + 1 > this._length)
                throw "getUint8 error - Out of bounds";
            return this._u8d_[this._pos_++]
        }
        writeUint8(t) {
            this._ensureWrite(this._pos_ + 1),
            this._d_.setUint8(this._pos_, t),
            this._pos_++
        }
        _getUInt8(t) {
            return this._readUInt8(t)
        }
        _readUInt8(t) {
            return this._d_.getUint8(t)
        }
        _getUint16(t) {
            return this._readUint16(t)
        }
        _readUint16(t) {
            return this._d_.getUint16(t, this._xd_)
        }
        _getMatrix() {
            return this._readMatrix()
        }
        _readMatrix() {
            return new y(this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32(),this.getFloat32())
        }
        _rUTF(t) {
            var e, i, s, r, a = this._pos_ + t, n = String.fromCharCode, h = this._u8d_, o = [], l = 0;
            for (o.length = 1e3; this._pos_ < a; )
                (r = h[this._pos_++]) < 128 ? 0 != r && (o[l++] = n(r)) : r < 224 ? o[l++] = n((63 & r) << 6 | 127 & h[this._pos_++]) : r < 240 ? (e = h[this._pos_++],
                o[l++] = n((31 & r) << 12 | (127 & e) << 6 | 127 & h[this._pos_++])) : 65536 <= (r = (15 & r) << 18 | (127 & (e = h[this._pos_++])) << 12 | (127 & h[this._pos_++]) << 6 | 127 & h[this._pos_++]) ? (s = 56320 | 1023 & (i = r - 65536),
                o[l++] = n(55296 | i >> 10),
                o[l++] = n(s)) : o[l++] = n(r);
            return o.length = l,
            o.join("")
        }
        getCustomString(t) {
            return this.readCustomString(t)
        }
        readCustomString(t) {
            for (var e, i = "", s = 0, r = String.fromCharCode, a = this._u8d_; 0 < t; )
                if ((e = a[this._pos_]) < 128)
                    i += r(e),
                    this._pos_++,
                    t--;
                else
                    for (s = e - 128,
                    this._pos_++,
                    t -= s; 0 < s; )
                        e = a[this._pos_++],
                        i += r(a[this._pos_++] << 8 | e),
                        s--;
            return i
        }
        get pos() {
            return this._pos_
        }
        set pos(t) {
            this._pos_ = t
        }
        get bytesAvailable() {
            return this._length - this._pos_
        }
        clear() {
            this._pos_ = 0,
            this.length = 0
        }
        __getBuffer() {
            return this._d_.buffer
        }
        writeUTFBytes(t) {
            for (var e = 0, i = (t += "").length; e < i; e++) {
                var s, r, a, n, h = t.charCodeAt(e);
                h <= 127 ? this.writeByte(h) : h <= 2047 ? (this._ensureWrite(this._pos_ + 2),
                this._u8d_.set([192 | h >> 6, 128 | 63 & h], this._pos_),
                this._pos_ += 2) : 55296 <= h && h <= 56319 ? (e++,
                a = t.charCodeAt(e),
                !Number.isNaN(a) && 56320 <= a && a <= 57343 && (s = 240 | (n = 64 + (1023 & h)) >> 8 & 63,
                r = 128 | n >> 2 & 63,
                a = 128 | (3 & n) << 4 | (n = 1023 & a) >> 6 & 15,
                n = 128 | 63 & n,
                this._ensureWrite(this._pos_ + 4),
                this._u8d_.set([s, r, a, n], this._pos_),
                this._pos_ += 4)) : h <= 65535 ? (this._ensureWrite(this._pos_ + 3),
                this._u8d_.set([224 | h >> 12, 128 | h >> 6 & 63, 128 | 63 & h], this._pos_),
                this._pos_ += 3) : (this._ensureWrite(this._pos_ + 4),
                this._u8d_.set([240 | h >> 18, 128 | h >> 12 & 63, 128 | h >> 6 & 63, 128 | 63 & h], this._pos_),
                this._pos_ += 4)
            }
        }
        writeUTFString(t) {
            var e = this.pos
              , t = (this.writeUint16(1),
            this.writeUTFBytes(t),
            this.pos - e - 2);
            this._d_.setUint16(e, t, this._xd_)
        }
        writeUTFString32(t) {
            var e = this.pos
              , t = (this.writeUint32(1),
            this.writeUTFBytes(t),
            this.pos - e - 4);
            this._d_.setUint32(e, t, this._xd_)
        }
        readUTFString() {
            return this.readUTFBytes(this.getUint16())
        }
        readUTFString32() {
            return this.readUTFBytes(this.getUint32())
        }
        getUTFString() {
            return this.readUTFString()
        }
        readUTFBytes(t=-1) {
            if (0 === t)
                return "";
            var e = this.bytesAvailable;
            if (e < t)
                throw "readUTFBytes error - Out of bounds";
            return this._rUTF(t = 0 < t ? t : e)
        }
        getUTFBytes(t=-1) {
            return this.readUTFBytes(t)
        }
        writeByte(t) {
            this._ensureWrite(this._pos_ + 1),
            this._d_.setInt8(this._pos_, t),
            this._pos_ += 1
        }
        readByte() {
            if (this._pos_ + 1 > this._length)
                throw "readByte error - Out of bounds";
            return this._d_.getInt8(this._pos_++)
        }
        getByte() {
            return this.readByte()
        }
        _ensureWrite(t) {
            this._length < t && (this._length = t),
            this._allocated_ < t && (this.length = t)
        }
        writeArrayBuffer(t, e=0, i=0) {
            if (e < 0 || i < 0)
                throw "writeArrayBuffer error - Out of bounds";
            0 == i && (i = t.byteLength - e),
            this._ensureWrite(this._pos_ + i);
            t = new Uint8Array(t);
            this._u8d_.set(t.subarray(e, e + i), this._pos_),
            this._pos_ += i
        }
        readArrayBuffer(t) {
            var e = this._u8d_.buffer.slice(this._pos_, this._pos_ + t);
            return this._pos_ = this._pos_ + t,
            e
        }
    }
    it.BIG_ENDIAN = "bigEndian",
    it.LITTLE_ENDIAN = "littleEndian",
    it._sysEndian = null,
    (t = v.RenderTextureFormat || (v.RenderTextureFormat = {}))[t.R8G8B8 = 0] = "R8G8B8",
    t[t.R8G8B8A8 = 1] = "R8G8B8A8",
    t[t.Alpha8 = 2] = "Alpha8",
    t[t.R16G16B16A16 = 14] = "R16G16B16A16",
    t[t.Depth = 15] = "Depth",
    t[t.ShadowMap = 16] = "ShadowMap",
    (t = v.RenderTextureDepthFormat || (v.RenderTextureDepthFormat = {}))[t.DEPTH_16 = 0] = "DEPTH_16",
    t[t.STENCIL_8 = 1] = "STENCIL_8",
    t[t.DEPTHSTENCIL_24_8 = 2] = "DEPTHSTENCIL_24_8",
    t[t.DEPTHSTENCIL_NONE = 3] = "DEPTHSTENCIL_NONE",
    t[t.DEPTH_32 = 4] = "DEPTH_32",
    t[t.DEPTHSTENCIL_16_8 = 2] = "DEPTHSTENCIL_16_8",
    (t = v.RTDEPTHATTACHMODE || (v.RTDEPTHATTACHMODE = {}))[t.RENDERBUFFER = 0] = "RENDERBUFFER",
    t[t.TEXTURE = 1] = "TEXTURE";
    class st {
        static get maxTextureCount() {
            return this._maxTextureCount
        }
        static get maxTextureSize() {
            return this._maxTextureSize
        }
        static get shaderCapailityLevel() {
            return this._shaderCapailityLevel
        }
        static supportTextureFormat(t) {
            switch (t) {
            case v.TextureFormat.R32G32B32A32:
                return !(!d.layaGPUInstance._isWebGL2 && !d.layaGPUInstance._oesTextureFloat);
            case v.TextureFormat.R16G16B16A16:
                return !(!d.layaGPUInstance._isWebGL2 && !d.layaGPUInstance._oesTextureHalfFloat);
            default:
                return !0
            }
        }
        static supportRenderTextureFormat(t) {
            switch (t) {
            case v.RenderTextureFormat.R16G16B16A16:
                return !!(d.layaGPUInstance._isWebGL2 && d.layaGPUInstance._extColorBufferFloat || d.layaGPUInstance._oesTextureHalfFloat && d.layaGPUInstance._oesTextureHalfFloatLinear);
            case v.RenderTextureFormat.Depth:
                return !(!d.layaGPUInstance._isWebGL2 && !d.layaGPUInstance._webgl_depth_texture);
            case v.RenderTextureFormat.ShadowMap:
                return !!d.layaGPUInstance._isWebGL2;
            default:
                return !0
            }
        }
    }
    class u {
        static __init__() {
            for (var t = 0; t < 256; ++t) {
                var e = t - 127;
                e < -27 ? (u._baseTable[0 | t] = 0,
                u._baseTable[256 | t] = 32768,
                u._shiftTable[0 | t] = 24,
                u._shiftTable[256 | t] = 24) : e < -14 ? (u._baseTable[0 | t] = 1024 >> -e - 14,
                u._baseTable[256 | t] = 1024 >> -e - 14 | 32768,
                u._shiftTable[0 | t] = -e - 1,
                u._shiftTable[256 | t] = -e - 1) : e <= 15 ? (u._baseTable[0 | t] = e + 15 << 10,
                u._baseTable[256 | t] = e + 15 << 10 | 32768,
                u._shiftTable[0 | t] = 13,
                u._shiftTable[256 | t] = 13) : e < 128 ? (u._baseTable[0 | t] = 31744,
                u._baseTable[256 | t] = 64512,
                u._shiftTable[0 | t] = 24,
                u._shiftTable[256 | t] = 24) : (u._baseTable[0 | t] = 31744,
                u._baseTable[256 | t] = 64512,
                u._shiftTable[0 | t] = 13,
                u._shiftTable[256 | t] = 13)
            }
            for (u._mantissaTable[0] = 0,
            t = 1; t < 1024; ++t) {
                for (var i = t << 13, e = 0; 0 == (8388608 & i); )
                    e -= 8388608,
                    i <<= 1;
                i &= -8388609,
                e += 947912704,
                u._mantissaTable[t] = i | e
            }
            for (t = 1024; t < 2048; ++t)
                u._mantissaTable[t] = 939524096 + (t - 1024 << 13);
            for (u._exponentTable[0] = 0,
            t = 1; t < 31; ++t)
                u._exponentTable[t] = t << 23;
            for (u._exponentTable[31] = 1199570944,
            u._exponentTable[32] = 2147483648,
            t = 33; t < 63; ++t)
                u._exponentTable[t] = 2147483648 + (t - 32 << 23);
            for (u._exponentTable[63] = 3347054592,
            u._offsetTable[0] = 0,
            t = 1; t < 64; ++t)
                u._offsetTable[t] = 32 === t ? 0 : 1024
        }
        static roundToFloat16Bits(t) {
            u._floatView[0] = t;
            var t = u._uint32View[0]
              , e = t >> 23 & 511;
            return u._baseTable[e] + ((8388607 & t) >> u._shiftTable[e])
        }
        static convertToNumber(t) {
            var e = t >> 10;
            return u._uint32View[0] = u._mantissaTable[u._offsetTable[e] + (1023 & t)] + u._exponentTable[e],
            u._floatView[0]
        }
    }
    u._buffer = new ArrayBuffer(4),
    u._floatView = new Float32Array(u._buffer),
    u._uint32View = new Uint32Array(u._buffer),
    u._baseTable = new Uint32Array(512),
    u._shiftTable = new Uint32Array(512),
    u._mantissaTable = new Uint32Array(2048),
    u._exponentTable = new Uint32Array(64),
    u._offsetTable = new Uint32Array(64);
    class rt extends et {
        constructor(t=0, e=0, i=v.TextureFormat.R8G8B8A8, s=!0, r=!1) {
            super(i, s);
            i = d.instance,
            this._glTextureType = i.TEXTURE_2D,
            this._width = t,
            this._height = e,
            this._canRead = r,
            this._setWarpMode(i.TEXTURE_WRAP_S, this._wrapModeU),
            this._setWarpMode(i.TEXTURE_WRAP_T, this._wrapModeV),
            this._setFilterMode(this._filterMode),
            this._setAnisotropy(this._anisoLevel),
            r = this._gpuCompressFormat();
            if (s) {
                var a = Math.max(Math.ceil(Math.log2(t)) + 1, Math.ceil(Math.log2(e)) + 1);
                if (!r)
                    for (var n = 0; n < a; n++)
                        this._setPixels(null, n, Math.max(t >> n, 1), Math.max(e >> n, 1));
                this._mipmapCount = a,
                this._setGPUMemory(t * e * 4 * (1 + 1 / 3))
            } else
                r || this._setPixels(null, 0, t, e),
                this._mipmapCount = 1,
                this._setGPUMemory(t * e * 4)
        }
        static __init__() {
            var t = new Uint8Array(3);
            t[0] = 128,
            t[1] = 128,
            t[2] = 128,
            rt.grayTexture = new rt(1,1,v.TextureFormat.R8G8B8,!1,!1),
            rt.grayTexture.setPixels(t),
            rt.grayTexture.lock = !0,
            t[0] = 255,
            t[1] = 255,
            t[2] = 255,
            rt.whiteTexture = new rt(1,1,v.TextureFormat.R8G8B8,!1,!1),
            rt.whiteTexture.setPixels(t),
            rt.whiteTexture.lock = !0,
            t[0] = 0,
            t[1] = 0,
            t[2] = 0,
            rt.blackTexture = new rt(1,1,v.TextureFormat.R8G8B8,!1,!1),
            rt.blackTexture.setPixels(t),
            rt.blackTexture.lock = !0,
            rt.erroTextur = rt.whiteTexture
        }
        static _parse(t, e=null, i=null) {
            var s = i ? new rt(i[0],i[1],i[2],i[3],i[4]) : new rt(0,0);
            switch (e && (s.wrapModeU = e.wrapModeU,
            s.wrapModeV = e.wrapModeV,
            s.filterMode = e.filterMode,
            s.anisoLevel = e.anisoLevel),
            s._format) {
            case v.TextureFormat.R8G8B8:
            case v.TextureFormat.R8G8B8A8:
                s.loadImageSource(t);
                break;
            case v.TextureFormat.DXT1:
            case v.TextureFormat.DXT5:
            case v.TextureFormat.ETC1RGB:
            case v.TextureFormat.PVRTCRGB_2BPPV:
            case v.TextureFormat.PVRTCRGBA_2BPPV:
            case v.TextureFormat.PVRTCRGB_4BPPV:
            case v.TextureFormat.PVRTCRGBA_4BPPV:
            case v.TextureFormat.ETC2RGB:
            case v.TextureFormat.ETC2RGBA:
            case v.TextureFormat.ETC2SRGB:
            case v.TextureFormat.ASTC4x4:
            case v.TextureFormat.ASTC6x6:
            case v.TextureFormat.ASTC8x8:
            case v.TextureFormat.ASTC10x10:
            case v.TextureFormat.ASTC12x12:
            case v.TextureFormat.KTXTEXTURE:
            case v.TextureFormat.PVRTEXTURE:
                s.setCompressData(t);
                break;
            default:
                throw "Texture2D:unkonwn format."
            }
            return s
        }
        static _SimpleAnimatorTextureParse(t, e=0, i) {
            var s = new it(t);
            switch (s.readUTFString()) {
            case "LAYAANIMATORTEXTURE:0000":
                var r, a = s.readInt32(), n = s.readInt32(), h = new Float32Array(a * a * 4), o = new Float32Array(s.readArrayBuffer(4 * n));
                h.set(o, 0),
                (r = new rt(a,a,v.TextureFormat.R32G32B32A32,!1,!1)).setPixels(h, 0),
                r.filterMode = v.FilterMode.Point;
                break;
            case "LAYACOMPRESSANIMATORTEXTURE:0000":
                a = s.readInt32(),
                n = s.readInt32();
                if (h = new Uint16Array(s.readArrayBuffer(2 * n)),
                st.supportTextureFormat(v.TextureFormat.R16G16B16A16))
                    (o = new Uint16Array(a * a * 4)).set(h, 0),
                    (r = new rt(a,a,v.TextureFormat.R16G16B16A16,!1,!1)).setPixels(o, 0),
                    r.filterMode = v.FilterMode.Point;
                else {
                    console.log("The platform does not support 16-bit floating-point textures"),
                    st.supportTextureFormat(v.TextureFormat.R32G32B32A32) || console.error("The platform does not support 32-bit floating-point textures"),
                    o = new Float32Array(a * a * 4);
                    for (var l = 0, _ = h.length; l < _; l++)
                        o[l] = u.convertToNumber(h[l]);
                    (r = new rt(a,a,v.TextureFormat.R32G32B32A32,!1,!1)).setPixels(o, 0),
                    r.filterMode = v.FilterMode.Point
                }
                break;
            default:
                throw "Laya3D:unknow version."
            }
            return r
        }
        static load(t, e) {
            R.loader.create(t, e, null, R.Loader.TEXTURE2D)
        }
        get defaulteTexture() {
            return rt.grayTexture
        }
        _gpuCompressFormat() {
            return this._format != v.TextureFormat.R8G8B8A8 && this._format != v.TextureFormat.R8G8B8 && this._format != v.TextureFormat.R16G16B16A16 && this._format != v.TextureFormat.R32G32B32A32 && this._format != v.TextureFormat.R5G6B5 && this._format != v.TextureFormat.Alpha8
        }
        _setPixels(t, e, i, s) {
            var r = d.instance
              , a = this._glTextureType
              , n = this._getGLFormat();
            switch (m.bindTexture(r, a, this._glTexture),
            this.format) {
            case v.TextureFormat.R8G8B8:
            case v.TextureFormat.R8G8B8A8:
                r.pixelStorei(r.UNPACK_ALIGNMENT, 1),
                r.texImage2D(a, e, n, i, s, 0, n, r.UNSIGNED_BYTE, t),
                r.pixelStorei(r.UNPACK_ALIGNMENT, 4);
                break;
            case v.TextureFormat.R5G6B5:
                r.pixelStorei(r.UNPACK_ALIGNMENT, 2),
                r.texImage2D(a, e, n, i, s, 0, n, r.UNSIGNED_SHORT_5_6_5, t),
                r.pixelStorei(r.UNPACK_ALIGNMENT, 4);
                break;
            case v.TextureFormat.R32G32B32A32:
                d.layaGPUInstance._isWebGL2 ? r.texImage2D(a, e, r.RGBA32F, i, s, 0, n, r.FLOAT, t) : r.texImage2D(a, e, r.RGBA, i, s, 0, n, r.FLOAT, t);
                break;
            case v.TextureFormat.R16G16B16A16:
                d.layaGPUInstance._isWebGL2 ? r.texImage2D(a, e, r.RGBA16F, i, s, 0, n, r.HALF_FLOAT, t) : r.texImage2D(a, e, r.RGBA, i, s, 0, n, d.layaGPUInstance._oesTextureHalfFloat.HALF_FLOAT_OES, t);
                break;
            default:
                r.texImage2D(a, e, n, i, s, 0, n, r.UNSIGNED_BYTE, t)
            }
        }
        _calcualatesCompressedDataSize(t, e, i) {
            switch (t) {
            case v.TextureFormat.DXT1:
                return (e + 3 >> 2) * (i + 3 >> 2) * 8;
            case v.TextureFormat.DXT5:
                return (e + 3 >> 2) * (i + 3 >> 2) * 16;
            case v.TextureFormat.PVRTCRGB_4BPPV:
            case v.TextureFormat.PVRTCRGBA_4BPPV:
                return Math.floor((Math.max(e, 8) * Math.max(i, 8) * 4 + 7) / 8);
            case v.TextureFormat.PVRTCRGB_2BPPV:
            case v.TextureFormat.PVRTCRGBA_2BPPV:
                return Math.floor((Math.max(e, 16) * Math.max(i, 8) * 2 + 7) / 8);
            default:
                return 0
            }
        }
        _pharseDDS(t) {
            var e = new Int32Array(t,0,31);
            if (542327876 != e[0])
                throw "Invalid magic number in DDS header";
            if (!(4 & e[20]))
                throw "Unsupported format, must contain a FourCC code";
            var i = e[21];
            switch (this._format) {
            case v.TextureFormat.DXT1:
                if (827611204 !== i)
                    throw "the FourCC code is not same with texture format.";
                break;
            case v.TextureFormat.DXT5:
                if (894720068 !== i)
                    throw "the FourCC code is not same with texture format.";
                break;
            default:
                throw "unknown texture format."
            }
            var s = 1;
            if (131072 & e[2]) {
                if (s = Math.max(1, e[7]),
                !this._mipmap)
                    throw "the mipmap is not same with Texture2D."
            } else if (this._mipmap)
                throw "the mipmap is not same with Texture2D.";
            var r = e[4]
              , a = e[3]
              , e = (this._width = r,
            this._height = a,
            e[1] + 4);
            this._upLoadCompressedTexImage2D(t, r, a, s, e, 0)
        }
        _pharseKTX(t) {
            var e = new Uint8Array(t,0,12);
            if (171 != e[0] || 75 != e[1] || 84 != e[2] || 88 != e[3] || 32 != e[4] || 49 != e[5] || 49 != e[6] || 187 != e[7] || 13 != e[8] || 10 != e[9] || 26 != e[10] || 10 != e[11])
                throw "Invalid fileIdentifier in KTX header";
            var e = new Int32Array(e.buffer,e.length,13)
              , i = e[4];
            if (this._format = -1,
            d.layaGPUInstance._compressedTextureASTC)
                switch (i) {
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_RGBA_ASTC_4x4_KHR:
                    this._format = v.TextureFormat.ASTC4x4;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:
                    this._format = v.TextureFormat.ASTC4x4SRGB;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:
                    this._format = v.TextureFormat.ASTC6x6SRGB;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:
                    this._format = v.TextureFormat.ASTC8x8SRGB;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:
                    this._format = v.TextureFormat.ASTC10x10SRGB;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:
                    this._format = v.TextureFormat.ASTC12x12SRGB;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_RGBA_ASTC_6x6_KHR:
                    this._format = v.TextureFormat.ASTC6x6;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_RGBA_ASTC_8x8_KHR:
                    this._format = v.TextureFormat.ASTC8x8;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_RGBA_ASTC_10x10_KHR:
                    this._format = v.TextureFormat.ASTC10x10;
                    break;
                case d.layaGPUInstance._compressedTextureASTC.COMPRESSED_RGBA_ASTC_12x12_KHR:
                    this._format = v.TextureFormat.ASTC12x12
                }
            if (d.layaGPUInstance._compressedTextureEtc1 && i === d.layaGPUInstance._compressedTextureEtc1.COMPRESSED_RGB_ETC1_WEBGL && (this._format = v.TextureFormat.ETC1RGB),
            d.layaGPUInstance._compressedTextureETC)
                switch (i) {
                case d.layaGPUInstance._compressedTextureETC.COMPRESSED_RGBA8_ETC2_EAC:
                    this._format = v.TextureFormat.ETC2RGBA;
                    break;
                case d.layaGPUInstance._compressedTextureETC.COMPRESSED_RGB8_ETC2:
                    this._format = v.TextureFormat.ETC2RGB;
                    break;
                case d.layaGPUInstance._compressedTextureETC.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:
                    this._format = v.TextureFormat.ETC2RGB_Alpha8;
                    break;
                case d.layaGPUInstance._compressedTextureETC.COMPRESSED_SRGB8_ETC2:
                    this._format = v.TextureFormat.ETC2SRGB
                }
            if (-1 == this._format)
                throw "unknown texture format.";
            var i = e[11]
              , s = e[6]
              , r = e[7]
              , e = (this._width = s,
            this._height = r,
            64 + e[12]);
            this._upLoadKTXCompressedTexImage2D(t, s, r, i, e, 4)
        }
        _pharsePVR(t) {
            var e = new Int32Array(t,0,13);
            if (55727696 != e[0])
                throw "Invalid magic number in PVR header";
            switch (e[2]) {
            case 0:
                this._format = v.TextureFormat.PVRTCRGB_2BPPV;
                break;
            case 2:
                this._format = v.TextureFormat.PVRTCRGB_4BPPV;
                break;
            case 1:
                this._format = v.TextureFormat.PVRTCRGBA_2BPPV;
                break;
            case 3:
                this._format = v.TextureFormat.PVRTCRGBA_4BPPV;
                break;
            default:
                throw "Texture2D:unknown PVR format."
            }
            var i = e[11]
              , s = e[7]
              , r = e[6]
              , e = (this._width = s,
            this._height = r,
            e[12] + 52);
            this._upLoadCompressedTexImage2D(t, s, r, i, e, 0)
        }
        _upLoadCompressedTexImage2D(t, e, i, s, r, a) {
            for (var n = d.instance, h = this._glTextureType, o = (m.bindTexture(n, h, this._glTexture),
            this._getGLFormat()), l = r, _ = 0; _ < s; _++) {
                l += a;
                var u = this._calcualatesCompressedDataSize(this._format, e, i)
                  , c = new Uint8Array(t,l,u);
                n.compressedTexImage2D(h, _, o, e, i, 0, c),
                e = Math.max(e >> 1, 1),
                i = Math.max(i >> 1, 1),
                l += u
            }
            r = l;
            this._setGPUMemory(r),
            this._readyed = !0,
            this._activeResource()
        }
        _upLoadKTXCompressedTexImage2D(t, e, i, s, r, a) {
            for (var n = d.instance, h = this._glTextureType, o = (m.bindTexture(n, h, this._glTexture),
            this._getGLFormat()), l = r, _ = 0; _ < s; _++) {
                var u = new Int32Array(t,l,1)[0]
                  , c = (l += a,
                new Uint8Array(t,l,u));
                n.compressedTexImage2D(h, _, o, e, i, 0, c),
                e = Math.max(e >> 1, 1),
                i = Math.max(i >> 1, 1),
                l = l + u + (3 - (u + 3) % 4)
            }
            r = l;
            this._setGPUMemory(r),
            this._readyed = !0,
            this._activeResource()
        }
        loadImageSource(t, e=!1) {
            var i = d.instance
              , s = t.width
              , r = t.height
              , a = (this._width = s,
            this._height = r,
            this._isPot(s) && this._isPot(r) || (this._mipmap = !1),
            this._setWarpMode(i.TEXTURE_WRAP_S, this._wrapModeU),
            this._setWarpMode(i.TEXTURE_WRAP_T, this._wrapModeV),
            this._setFilterMode(this._filterMode),
            m.bindTexture(i, this._glTextureType, this._glTexture),
            this._getGLFormat());
            R.Render.isConchApp ? (t.setPremultiplyAlpha && t.setPremultiplyAlpha(e),
            i.texImage2D(this._glTextureType, 0, i.RGBA, i.RGBA, i.UNSIGNED_BYTE, t)) : (e && i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
            this.format == v.TextureFormat.R5G6B5 ? i.texImage2D(this._glTextureType, 0, i.RGB, i.RGB, i.UNSIGNED_SHORT_5_6_5, t) : i.texImage2D(this._glTextureType, 0, a, a, i.UNSIGNED_BYTE, t),
            e && i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1)),
            this._mipmap ? (i.generateMipmap(this._glTextureType),
            this._setGPUMemory(s * r * 4 * (1 + 1 / 3))) : this._setGPUMemory(s * r * 4),
            this._canRead && (R.Render.isConchApp ? this._pixels = new Uint8Array(t._nativeObj.getImageData(0, 0, s, r)) : (R.Browser.canvas.size(s, r),
            R.Browser.canvas.clear(),
            R.Browser.context.drawImage(t, 0, 0, s, r),
            this._pixels = new Uint8Array(R.Browser.context.getImageData(0, 0, s, r).data.buffer))),
            this._readyed = !0,
            this._activeResource()
        }
        setPixels(t, e=0) {
            if (this._gpuCompressFormat())
                throw "Texture2D:the format is GPU compression format.";
            if (!t)
                throw "Texture2D:pixels can't be null.";
            var i = Math.max(this._width >> e, 1)
              , s = Math.max(this._height >> e, 1)
              , r = i * s * this._getFormatByteCount();
            if (t.length < r)
                throw "Texture2D:pixels length should at least " + r + ".";
            this._setPixels(t, e, i, s),
            this._canRead && (this._pixels = t),
            this._readyed = !0,
            this._activeResource()
        }
        setSubPixels(t, e, i, s, r, a=0) {
            if (this._gpuCompressFormat())
                throw "Texture2D:the format is GPU compression format.";
            if (!r)
                throw "Texture2D:pixels can't be null.";
            var n = d.instance
              , h = this._glTextureType
              , o = (m.bindTexture(n, h, this._glTexture),
            this._getGLFormat());
            switch (this.format) {
            case v.TextureFormat.R8G8B8:
                n.pixelStorei(n.UNPACK_ALIGNMENT, 1),
                n.texSubImage2D(h, a, t, e, i, s, o, n.UNSIGNED_BYTE, r),
                n.pixelStorei(n.UNPACK_ALIGNMENT, 4);
                break;
            case v.TextureFormat.R5G6B5:
                n.pixelStorei(n.UNPACK_ALIGNMENT, 2),
                n.texSubImage2D(h, a, t, e, i, s, o, n.UNSIGNED_SHORT_5_6_5, r),
                n.pixelStorei(n.UNPACK_ALIGNMENT, 4);
                break;
            case v.TextureFormat.R32G32B32A32:
                n.texSubImage2D(h, a, t, e, i, s, o, n.FLOAT, r);
                break;
            default:
                n.texSubImage2D(h, a, t, e, i, s, o, n.UNSIGNED_BYTE, r)
            }
            this._readyed = !0,
            this._activeResource()
        }
        setCompressData(t) {
            switch (this._format) {
            case v.TextureFormat.DXT1:
            case v.TextureFormat.DXT5:
                this._pharseDDS(t);
                break;
            case v.TextureFormat.ETC1RGB:
            case v.TextureFormat.ETC2RGB:
            case v.TextureFormat.ETC2RGBA:
            case v.TextureFormat.ETC2RGB_Alpha8:
            case v.TextureFormat.ETC2SRGB:
            case v.TextureFormat.ASTC4x4:
            case v.TextureFormat.ASTC4x4SRGB:
            case v.TextureFormat.ASTC6x6:
            case v.TextureFormat.ASTC6x6SRGB:
            case v.TextureFormat.ASTC8x8:
            case v.TextureFormat.ASTC8x8SRGB:
            case v.TextureFormat.ASTC10x10:
            case v.TextureFormat.ASTC10x10SRGB:
            case v.TextureFormat.ASTC12x12:
            case v.TextureFormat.ASTC12x12SRGB:
            case v.TextureFormat.KTXTEXTURE:
                this._pharseKTX(t);
                break;
            case v.TextureFormat.PVRTCRGB_2BPPV:
            case v.TextureFormat.PVRTCRGBA_2BPPV:
            case v.TextureFormat.PVRTCRGB_4BPPV:
            case v.TextureFormat.PVRTCRGBA_4BPPV:
            case v.TextureFormat.PVRTEXTURE:
                this._pharsePVR(t);
                break;
            default:
                throw "Texture2D:unkonwn format."
            }
            1 == this.mipmapCount || this.width != 1 << this.mipmapCount - 1 && this.height != 1 << this.mipmapCount ? this._mipmap = !1 : this._mipmap = !0;
            var e = d.instance;
            this._setWarpMode(e.TEXTURE_WRAP_S, this._wrapModeU),
            this._setWarpMode(e.TEXTURE_WRAP_T, this._wrapModeV),
            this._setFilterMode(this._filterMode)
        }
        getPixels() {
            if (this._canRead)
                return this._pixels;
            throw new Error("Texture2D: must set texture canRead is true.")
        }
    }
    rt.TEXTURE2D = "TEXTURE2D",
    rt.grayTexture = null,
    rt.whiteTexture = null,
    rt.blackTexture = null,
    rt.erroTextur = null;
    class at extends J {
        constructor() {
            super()
        }
    }
    class l {
        static mat2MatArray(t, e) {
            var i = e;
            return i[0] = t.a,
            i[1] = t.b,
            i[2] = l.EMPTYMAT4_ARRAY[2],
            i[3] = l.EMPTYMAT4_ARRAY[3],
            i[4] = t.c,
            i[5] = t.d,
            i[6] = l.EMPTYMAT4_ARRAY[6],
            i[7] = l.EMPTYMAT4_ARRAY[7],
            i[8] = l.EMPTYMAT4_ARRAY[8],
            i[9] = l.EMPTYMAT4_ARRAY[9],
            i[10] = l.EMPTYMAT4_ARRAY[10],
            i[11] = l.EMPTYMAT4_ARRAY[11],
            i[12] = t.tx,
            i[13] = t.ty,
            i[14] = l.EMPTYMAT4_ARRAY[14],
            i[15] = l.EMPTYMAT4_ARRAY[15],
            e
        }
        static restoreTempArray() {
            l.TEMPMAT4_ARRAY[0] = 1,
            l.TEMPMAT4_ARRAY[1] = 0,
            l.TEMPMAT4_ARRAY[4] = 0,
            l.TEMPMAT4_ARRAY[5] = 1,
            l.TEMPMAT4_ARRAY[12] = 0,
            l.TEMPMAT4_ARRAY[13] = 0
        }
        static clear() {
            l.worldScissorTest = !1,
            l.worldAlpha = 1
        }
    }
    l._MAXSIZE = 99999999,
    l.EMPTYMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    l.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    l.worldMatrix4 = l.TEMPMAT4_ARRAY,
    l.worldMatrix = new y,
    l.matWVP = null,
    l.worldAlpha = 1,
    l.worldScissorTest = !1,
    l.width = 0,
    l.height = 0;
    class nt extends et {
        constructor(t, e, i=v.RenderTextureFormat.R8G8B8, s=v.RenderTextureDepthFormat.DEPTH_16) {
            super(i, !1),
            this._mgrKey = 0,
            this._glTextureType = d.instance.TEXTURE_2D,
            this._width = t,
            this._height = e,
            this._depthStencilFormat = s,
            this._create(t, e),
            this.lock = !0
        }
        static get currentActive() {
            return nt._currentActive
        }
        get depthStencilFormat() {
            return this._depthStencilFormat
        }
        get defaulteTexture() {
            return rt.grayTexture
        }
        getIsReady() {
            return !0
        }
        get sourceWidth() {
            return this._width
        }
        get sourceHeight() {
            return this._height
        }
        get offsetX() {
            return 0
        }
        get offsetY() {
            return 0
        }
        _create(t, e) {
            var i = d.instance
              , s = (this._frameBuffer = i.createFramebuffer(),
            m.bindTexture(i, this._glTextureType, this._glTexture),
            this._getGLFormat());
            if (i.texImage2D(this._glTextureType, 0, s, t, e, 0, s, i.UNSIGNED_BYTE, null),
            this._setGPUMemory(t * e * 4),
            i.bindFramebuffer(i.FRAMEBUFFER, this._frameBuffer),
            i.framebufferTexture2D(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, this._glTexture, 0),
            this._depthStencilFormat !== v.RenderTextureDepthFormat.DEPTHSTENCIL_NONE)
                switch (this._depthStencilBuffer = i.createRenderbuffer(),
                i.bindRenderbuffer(i.RENDERBUFFER, this._depthStencilBuffer),
                this._depthStencilFormat) {
                case v.RenderTextureDepthFormat.DEPTH_16:
                    i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_COMPONENT16, t, e),
                    i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, this._depthStencilBuffer);
                    break;
                case v.RenderTextureDepthFormat.STENCIL_8:
                    i.renderbufferStorage(i.RENDERBUFFER, i.STENCIL_INDEX8, t, e),
                    i.framebufferRenderbuffer(i.FRAMEBUFFER, i.STENCIL_ATTACHMENT, i.RENDERBUFFER, this._depthStencilBuffer);
                    break;
                case v.RenderTextureDepthFormat.DEPTHSTENCIL_24_8:
                    i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, t, e),
                    i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, this._depthStencilBuffer)
                }
            i.bindFramebuffer(i.FRAMEBUFFER, null),
            i.bindRenderbuffer(i.RENDERBUFFER, null),
            this._setWarpMode(i.TEXTURE_WRAP_S, this._wrapModeU),
            this._setWarpMode(i.TEXTURE_WRAP_T, this._wrapModeV),
            this._setFilterMode(this._filterMode),
            this._setAnisotropy(this._anisoLevel),
            this._readyed = !0,
            this._activeResource()
        }
        generateMipmap() {
            this._isPot(this.width) && this._isPot(this.height) ? (this._mipmap = !0,
            d.instance.generateMipmap(this._glTextureType),
            this._setFilterMode(this._filterMode),
            this._setGPUMemory(this.width * this.height * 4 * (1 + 1 / 3))) : (this._mipmap = !1,
            this._setGPUMemory(this.width * this.height * 4))
        }
        static pushRT() {
            nt.rtStack.push({
                rt: nt._currentActive,
                w: l.width,
                h: l.height
            })
        }
        static popRT() {
            var t = d.instance
              , e = nt.rtStack.pop();
            e && (nt._currentActive != e.rt && (d.instance.bindFramebuffer(t.FRAMEBUFFER, e.rt ? e.rt._frameBuffer : null),
            nt._currentActive = e.rt),
            t.viewport(0, 0, e.w, e.h),
            l.width = e.w,
            l.height = e.h)
        }
        start() {
            var t = d.instance;
            d.instance.bindFramebuffer(t.FRAMEBUFFER, this._frameBuffer),
            this._lastRT = nt._currentActive,
            (nt._currentActive = this)._readyed = !0,
            t.viewport(0, 0, this._width, this._height),
            this._lastWidth = l.width,
            this._lastHeight = l.height,
            l.width = this._width,
            l.height = this._height,
            at.activeShader = null
        }
        end() {
            var t = d.instance;
            t.bindFramebuffer(t.FRAMEBUFFER, null),
            nt._currentActive = null,
            this._readyed = !0
        }
        restore() {
            var t = d.instance;
            this._lastRT != nt._currentActive && (d.instance.bindFramebuffer(t.FRAMEBUFFER, this._lastRT ? this._lastRT._frameBuffer : null),
            nt._currentActive = this._lastRT),
            this._readyed = !0,
            t.viewport(0, 0, this._lastWidth, this._lastHeight),
            l.width = this._lastWidth,
            l.height = this._lastHeight,
            at.activeShader = null
        }
        clear(t=0, e=0, i=0, s=1) {
            var r = d.instance
              , a = (r.clearColor(t, e, i, s),
            r.COLOR_BUFFER_BIT);
            switch (this._depthStencilFormat) {
            case r.DEPTH_COMPONENT16:
                a |= r.DEPTH_BUFFER_BIT;
                break;
            case r.STENCIL_INDEX8:
                a |= r.STENCIL_BUFFER_BIT;
                break;
            case r.DEPTH_STENCIL:
                a = (a |= r.DEPTH_BUFFER_BIT) | r.STENCIL_BUFFER_BIT
            }
            r.clear(a)
        }
        getData(t, e, i, s) {
            if (R.Render.isConchApp && 2 == window.conchConfig.threadMode)
                throw "native 2 thread mode use getDataAsync";
            var r = d.instance;
            if (r.bindFramebuffer(r.FRAMEBUFFER, this._frameBuffer),
            !(r.checkFramebufferStatus(r.FRAMEBUFFER) === r.FRAMEBUFFER_COMPLETE))
                return r.bindFramebuffer(r.FRAMEBUFFER, null),
                null;
            var a = new Uint8Array(this._width * this._height * 4)
              , n = this._getGLFormat();
            return r.readPixels(t, e, i, s, n, r.UNSIGNED_BYTE, a),
            r.bindFramebuffer(r.FRAMEBUFFER, null),
            a
        }
        getDataAsync(t, e, i, s, r) {
            var a = d.instance;
            a.bindFramebuffer(a.FRAMEBUFFER, this._frameBuffer),
            a.readPixelsAsync(t, e, i, s, a.RGBA, a.UNSIGNED_BYTE, function(t) {
                r(new Uint8Array(t))
            }),
            a.bindFramebuffer(a.FRAMEBUFFER, null)
        }
        recycle() {}
        _disposeResource() {
            var t;
            this._frameBuffer && ((t = d.instance).deleteTexture(this._glTexture),
            t.deleteFramebuffer(this._frameBuffer),
            t.deleteRenderbuffer(this._depthStencilBuffer),
            this._glTexture = null,
            this._frameBuffer = null,
            this._depthStencilBuffer = null,
            this._setGPUMemory(0))
        }
    }
    nt.rtStack = [],
    nt.defuv = [0, 0, 1, 0, 1, 1, 0, 1],
    nt.flipyuv = [0, 1, 1, 1, 1, 0, 0, 0];
    class ht {
        static getRT(t, e) {
            return e |= 0,
            1e4 <= (t |= 0) && console.error("getRT error! w too big"),
            new nt(t,e,v.RenderTextureFormat.R8G8B8A8,-1)
        }
        static releaseRT(t) {
            t.destroy()
        }
    }
    ht.dict = {};
    class A {
        static _init_(t) {
            A.fns = [A.BlendNormal, A.BlendAdd, A.BlendMultiply, A.BlendScreen, A.BlendOverlay, A.BlendLight, A.BlendMask, A.BlendDestinationOut, A.BlendAddOld],
            A.targetFns = [A.BlendNormalTarget, A.BlendAddTarget, A.BlendMultiplyTarget, A.BlendScreenTarget, A.BlendOverlayTarget, A.BlendLightTarget, A.BlendMask, A.BlendDestinationOut, A.BlendAddTargetOld]
        }
        static BlendNormal(t) {
            m.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA, !0)
        }
        static BlendAddOld(t) {
            m.setBlendFunc(t, t.ONE, t.DST_ALPHA, !0)
        }
        static BlendAdd(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendMultiply(t) {
            m.setBlendFunc(t, t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, !0)
        }
        static BlendScreen(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendOverlay(t) {
            m.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_COLOR, !0)
        }
        static BlendLight(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendNormalTarget(t) {
            m.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA, !0)
        }
        static BlendAddTargetOld(t) {
            m.setBlendFunc(t, t.ONE, t.DST_ALPHA, !0)
        }
        static BlendAddTarget(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendMultiplyTarget(t) {
            m.setBlendFunc(t, t.DST_COLOR, t.ONE_MINUS_SRC_ALPHA, !0)
        }
        static BlendScreenTarget(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendOverlayTarget(t) {
            m.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_COLOR, !0)
        }
        static BlendLightTarget(t) {
            m.setBlendFunc(t, t.ONE, t.ONE, !0)
        }
        static BlendMask(t) {
            m.setBlendFunc(t, t.ZERO, t.SRC_ALPHA, !0)
        }
        static BlendDestinationOut(t) {
            m.setBlendFunc(t, t.ZERO, t.ZERO, !0)
        }
    }
    A.activeBlendFunction = null,
    A.NAMES = ["normal", "add", "multiply", "screen", "overlay", "light", "mask", "destination-out", "add_old"],
    A.TOINT = {
        normal: 0,
        add: 1,
        multiply: 2,
        screen: 3,
        overlay: 4,
        light: 5,
        mask: 6,
        "destination-out": 7,
        lighter: 1,
        lighter_old: 8,
        add_old: 8
    },
    A.NORMAL = "normal",
    A.MASK = "mask",
    A.LIGHTER = "lighter";
    class ot {
        constructor(t, e, i) {
            this._value = 0,
            this._name2int = t,
            this._int2name = e,
            this._int2nameMap = i
        }
        add(t) {
            return this._value |= "string" == typeof t ? this._name2int[t] : t,
            this._value
        }
        addInt(t) {
            return this._value |= t,
            this._value
        }
        remove(t) {
            return this._value &= "string" == typeof t ? ~this._name2int[t] : ~t,
            this._value
        }
        isDefine(t) {
            return (this._value & t) === t
        }
        getValue() {
            return this._value
        }
        setValue(t) {
            this._value = t
        }
        toNameDic() {
            var t = this._int2nameMap[this._value];
            return t || ot._toText(this._value, this._int2name, this._int2nameMap)
        }
        static _reg(t, e, i, s) {
            s[i[t] = e] = t
        }
        static _toText(t, e, i) {
            var s = i[t];
            if (s)
                return s;
            for (var r, a, n = {}, h = 0; h < 32 && !(t < (r = 1 << h)); h++)
                t & r && ((a = e[r]) && (n[a] = ""));
            return i[t] = n
        }
        static _toInt(t, e) {
            for (var i = t.split("."), s = 0, r = 0, a = i.length; r < a; r++) {
                var n = e[i[r]];
                if (!n)
                    throw new Error("Defines to int err:" + t + "/" + i[r]);
                s |= n
            }
            return s
        }
    }
    class b extends ot {
        constructor() {
            super(b.__name2int, b.__int2name, b.__int2nameMap)
        }
        static __init__() {
            b.reg("TEXTURE2D", b.TEXTURE2D),
            b.reg("PRIMITIVE", b.PRIMITIVE),
            b.reg("GLOW_FILTER", b.FILTERGLOW),
            b.reg("BLUR_FILTER", b.FILTERBLUR),
            b.reg("COLOR_FILTER", b.FILTERCOLOR),
            b.reg("COLOR_ADD", b.COLORADD),
            b.reg("WORLDMAT", b.WORLDMAT),
            b.reg("FILLTEXTURE", b.FILLTEXTURE),
            b.reg("MVP3D", b.MVP3D)
        }
        static reg(t, e) {
            this._reg(t, e, b.__name2int, b.__int2name)
        }
        static toText(t, e, i) {
            return this._toText(t, e, i)
        }
        static toInt(t) {
            return this._toInt(t, b.__name2int)
        }
    }
    b.TEXTURE2D = 1,
    b.PRIMITIVE = 4,
    b.FILTERGLOW = 8,
    b.FILTERBLUR = 16,
    b.FILTERCOLOR = 32,
    b.COLORADD = 64,
    b.WORLDMAT = 128,
    b.FILLTEXTURE = 256,
    b.SKINMESH = 512,
    b.MVP3D = 2048,
    b.NOOPTMASK = b.FILTERGLOW | b.FILTERBLUR | b.FILTERCOLOR | b.FILLTEXTURE,
    b.__name2int = {},
    b.__int2name = [],
    b.__int2nameMap = [];
    class g {
        static show(t=0, e=0) {
            g._StatRender.show(t, e)
        }
        static enable() {
            g._StatRender.enable()
        }
        static hide() {
            g._StatRender.hide()
        }
        static clear() {
            g.trianglesFaces = g.renderBatches = g.savedRenderBatches = g.shaderCall = g.spriteRenderUseCacheCount = g.frustumCulling = g.octreeNodeCulling = g.canvasNormal = g.canvasBitmap = g.canvasReCache = 0
        }
        static set onclick(t) {
            g._StatRender.set_onclick(t)
        }
    }
    g.FPS = 0,
    g.loopCount = 0,
    g.shaderCall = 0,
    g.renderBatches = 0,
    g.savedRenderBatches = 0,
    g.trianglesFaces = 0,
    g.spriteCount = 0,
    g.spriteRenderUseCacheCount = 0,
    g.frustumCulling = 0,
    g.octreeNodeCulling = 0,
    g.canvasNormal = 0,
    g.canvasBitmap = 0,
    g.canvasReCache = 0,
    g.renderSlow = !1,
    g._fpsData = [],
    g._timer = 0,
    g._count = 0,
    g._StatRender = null;
    class lt {
        constructor() {
            this._strsToID = {},
            this._idToStrs = [],
            this._length = 0
        }
        add(t) {
            var e = this._strsToID[t];
            return null != e ? e : (this._idToStrs[this._length] = t,
            this._strsToID[t] = this._length++)
        }
        getID(t) {
            t = this._strsToID[t];
            return null == t ? -1 : t
        }
        getName(t) {
            t = this._idToStrs[t];
            return null == t ? void 0 : t
        }
    }
    class _t extends at {
        constructor(t, e, i=null, s=null, r=null) {
            if (super(),
            this._attribInfo = null,
            this.customCompile = !1,
            this._curActTexIndex = 0,
            this.tag = {},
            this._program = null,
            this._params = null,
            this._paramsMap = {},
            !t || !e)
                throw "Shader Error";
            this._attribInfo = r,
            this._id = ++_t._count,
            this._vs = t,
            this._ps = e,
            this._nameMap = s || {},
            null != i && (_t.sharders[i] = this),
            this.recreateResource(),
            this.lock = !0
        }
        static getShader(t) {
            return _t.sharders[t]
        }
        static create(t, e, i=null, s=null, r=null) {
            return new _t(t,e,i,s,r)
        }
        static withCompile(t, e, i, s) {
            if (i && _t.sharders[i])
                return _t.sharders[i];
            var r = _t._preCompileShader[_t.SHADERNAME2ID * t];
            if (r)
                return r.createShader(e, i, s, null);
            throw new Error("withCompile shader err!" + t)
        }
        static withCompile2D(t, e, i, s, r, a=null) {
            if (s && _t.sharders[s])
                return _t.sharders[s];
            var n = _t._preCompileShader[_t.SHADERNAME2ID * t + e];
            if (n)
                return n.createShader(i, s, r, a);
            throw new Error("withCompile shader err!" + t + " " + e)
        }
        static addInclude(t, e) {
            R.ShaderCompile.addInclude(t, e)
        }
        static preCompile(t, e, i, s) {
            t = _t.SHADERNAME2ID * t;
            _t._preCompileShader[t] = new R.ShaderCompile(e,i,s)
        }
        static preCompile2D(t, e, i, s, r) {
            t = _t.SHADERNAME2ID * t + e;
            _t._preCompileShader[t] = new R.ShaderCompile(i,s,r)
        }
        recreateResource() {
            this._compile(),
            this._setGPUMemory(0)
        }
        _disposeResource() {
            m.mainContext.deleteShader(this._vshader),
            m.mainContext.deleteShader(this._pshader),
            m.mainContext.deleteProgram(this._program),
            this._vshader = this._pshader = this._program = null,
            this._params = null,
            this._paramsMap = {},
            this._setGPUMemory(0),
            this._curActTexIndex = 0
        }
        _compile() {
            if (this._vs && this._ps && !this._params) {
                this._reCompile = !0,
                this._params = [],
                this.customCompile && (t = R.ShaderCompile.preGetParams(this._vs, this._ps));
                for (var t, e, i = m.mainContext, s = (this._program = i.createProgram(),
                this._vshader = _t._createShader(i, this._vs, i.VERTEX_SHADER),
                this._pshader = _t._createShader(i, this._ps, i.FRAGMENT_SHADER),
                i.attachShader(this._program, this._vshader),
                i.attachShader(this._program, this._pshader),
                this._attribInfo ? this._attribInfo.length : 0), r = 0; r < s; r += 2)
                    i.bindAttribLocation(this._program, this._attribInfo[r + 1], this._attribInfo[r]);
                if (i.linkProgram(this._program),
                !this.customCompile && !i.getProgramParameter(this._program, i.LINK_STATUS))
                    throw i.getProgramInfoLog(this._program);
                var a = this.customCompile ? t.uniforms.length : i.getProgramParameter(this._program, i.ACTIVE_UNIFORMS);
                for (r = 0; r < a; r++) {
                    var n, h = this.customCompile ? t.uniforms[r] : i.getActiveUniform(this._program, r);
                    0 < (n = {
                        vartype: "uniform",
                        glfun: null,
                        ivartype: 1,
                        location: i.getUniformLocation(this._program, h.name),
                        name: h.name,
                        type: h.type,
                        isArray: !1,
                        isSame: !1,
                        preValue: null,
                        indexOfParams: 0
                    }).name.indexOf("[0]") && (n.name = n.name.substr(0, n.name.length - 3),
                    n.isArray = !0,
                    n.location = i.getUniformLocation(this._program, n.name)),
                    this._params.push(n)
                }
                for (r = 0,
                e = this._params.length; r < e; r++)
                    switch ((n = this._params[r]).indexOfParams = r,
                    n.index = 1,
                    n.value = [n.location, null],
                    n.codename = n.name,
                    n.name = this._nameMap[n.codename] || n.codename,
                    (this._paramsMap[n.name] = n)._this = this,
                    n.uploadedValue = [],
                    n.type) {
                    case i.INT:
                        n.fun = n.isArray ? this._uniform1iv : this._uniform1i;
                        break;
                    case i.FLOAT:
                        n.fun = n.isArray ? this._uniform1fv : this._uniform1f;
                        break;
                    case i.FLOAT_VEC2:
                        n.fun = n.isArray ? this._uniform_vec2v : this._uniform_vec2;
                        break;
                    case i.FLOAT_VEC3:
                        n.fun = n.isArray ? this._uniform_vec3v : this._uniform_vec3;
                        break;
                    case i.FLOAT_VEC4:
                        n.fun = n.isArray ? this._uniform_vec4v : this._uniform_vec4;
                        break;
                    case i.SAMPLER_2D:
                        n.fun = this._uniform_sampler2D;
                        break;
                    case i.SAMPLER_CUBE:
                        n.fun = this._uniform_samplerCube;
                        break;
                    case i.FLOAT_MAT4:
                        n.glfun = i.uniformMatrix4fv,
                        n.fun = this._uniformMatrix4fv;
                        break;
                    case i.BOOL:
                        n.fun = this._uniform1i;
                        break;
                    case i.FLOAT_MAT2:
                    case i.FLOAT_MAT3:
                    default:
                        throw new Error("compile shader err!")
                    }
            }
        }
        static _createShader(t, e, i) {
            i = t.createShader(i);
            return t.shaderSource(i, e),
            t.compileShader(i),
            t.getShaderParameter(i, t.COMPILE_STATUS) ? i : (console.log(t.getShaderInfoLog(i)),
            null)
        }
        getUniform(t) {
            return this._paramsMap[t]
        }
        _uniform1f(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (m.mainContext.uniform1f(t.location, i[0] = e),
            1) : 0
        }
        _uniform1fv(t, e) {
            var i;
            return e.length < 4 ? (i = t.uploadedValue)[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (m.mainContext.uniform1fv(t.location, e),
            i[0] = e[0],
            i[1] = e[1],
            i[2] = e[2],
            i[3] = e[3],
            1) : 0 : (m.mainContext.uniform1fv(t.location, e),
            1)
        }
        _uniform_vec2(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (m.mainContext.uniform2f(t.location, i[0] = e[0], i[1] = e[1]),
            1) : 0
        }
        _uniform_vec2v(t, e) {
            var i;
            return e.length < 2 ? (i = t.uploadedValue)[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (m.mainContext.uniform2fv(t.location, e),
            i[0] = e[0],
            i[1] = e[1],
            i[2] = e[2],
            i[3] = e[3],
            1) : 0 : (m.mainContext.uniform2fv(t.location, e),
            1)
        }
        _uniform_vec3(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (m.mainContext.uniform3f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]),
            1) : 0
        }
        _uniform_vec3v(t, e) {
            return m.mainContext.uniform3fv(t.location, e),
            1
        }
        _uniform_vec4(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (m.mainContext.uniform4f(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]),
            1) : 0
        }
        _uniform_vec4v(t, e) {
            return m.mainContext.uniform4fv(t.location, e),
            1
        }
        _uniformMatrix2fv(t, e) {
            return m.mainContext.uniformMatrix2fv(t.location, !1, e),
            1
        }
        _uniformMatrix3fv(t, e) {
            return m.mainContext.uniformMatrix3fv(t.location, !1, e),
            1
        }
        _uniformMatrix4fv(t, e) {
            return m.mainContext.uniformMatrix4fv(t.location, !1, e),
            1
        }
        _uniform1i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e ? (m.mainContext.uniform1i(t.location, i[0] = e),
            1) : 0
        }
        _uniform1iv(t, e) {
            return m.mainContext.uniform1iv(t.location, e),
            1
        }
        _uniform_ivec2(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] ? (m.mainContext.uniform2i(t.location, i[0] = e[0], i[1] = e[1]),
            1) : 0
        }
        _uniform_ivec2v(t, e) {
            return m.mainContext.uniform2iv(t.location, e),
            1
        }
        _uniform_vec3i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] ? (m.mainContext.uniform3i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2]),
            1) : 0
        }
        _uniform_vec3vi(t, e) {
            return m.mainContext.uniform3iv(t.location, e),
            1
        }
        _uniform_vec4i(t, e) {
            var i = t.uploadedValue;
            return i[0] !== e[0] || i[1] !== e[1] || i[2] !== e[2] || i[3] !== e[3] ? (m.mainContext.uniform4i(t.location, i[0] = e[0], i[1] = e[1], i[2] = e[2], i[3] = e[3]),
            1) : 0
        }
        _uniform_vec4vi(t, e) {
            return m.mainContext.uniform4iv(t.location, e),
            1
        }
        _uniform_sampler2D(t, e) {
            var i = m.mainContext
              , s = t.uploadedValue;
            return null == s[0] ? (s[0] = this._curActTexIndex,
            i.uniform1i(t.location, this._curActTexIndex),
            m.activeTexture(i, i.TEXTURE0 + this._curActTexIndex),
            m.bindTexture(i, i.TEXTURE_2D, e),
            this._curActTexIndex++,
            1) : (m.activeTexture(i, i.TEXTURE0 + s[0]),
            m.bindTexture(i, i.TEXTURE_2D, e),
            0)
        }
        _uniform_samplerCube(t, e) {
            var i = m.mainContext
              , s = t.uploadedValue;
            return null == s[0] ? (s[0] = this._curActTexIndex,
            i.uniform1i(t.location, this._curActTexIndex),
            m.activeTexture(i, i.TEXTURE0 + this._curActTexIndex),
            m.bindTexture(i, i.TEXTURE_CUBE_MAP, e),
            this._curActTexIndex++,
            1) : (m.activeTexture(i, i.TEXTURE0 + s[0]),
            m.bindTexture(i, i.TEXTURE_CUBE_MAP, e),
            0)
        }
        _noSetValue(t) {
            console.log("no....:" + t.name)
        }
        uploadOne(t, e) {
            m.useProgram(m.mainContext, this._program);
            t = this._paramsMap[t];
            t.fun.call(this, t, e)
        }
        uploadTexture2D(t) {
            var e = m;
            e._activeTextures[0] !== t && (e.bindTexture(m.mainContext, d.instance.TEXTURE_2D, t),
            e._activeTextures[0] = t)
        }
        upload(t, e=null) {
            at.activeShader = at.bindShader = this;
            var i = m.mainContext;
            m.useProgram(i, this._program),
            this._reCompile ? (e = this._params,
            this._reCompile = !1) : e = e || this._params;
            for (var s, r, a = e.length, n = 0, h = 0; h < a; h++)
                null !== (r = t[(s = e[h]).name]) && (n += s.fun.call(this, s, r));
            g.shaderCall += n
        }
        uploadArray(t, e, i) {
            at.activeShader = this,
            at.bindShader = this,
            m.useProgram(m.mainContext, this._program);
            this._params;
            for (var s, r, a = 0, n = e - 2; 0 <= n; n -= 2)
                (r = this._paramsMap[t[n]]) && null != (s = t[n + 1]) && (i && i[r.name] && i[r.name].bind(),
                a += r.fun.call(this, r, s));
            g.shaderCall += a
        }
        getParams() {
            return this._params
        }
        setAttributesLocation(t) {
            this._attribInfo = t
        }
    }
    _t._count = 0,
    _t._preCompileShader = {},
    _t.SHADERNAME2ID = 2e-4,
    _t.nameKey = new lt,
    _t.sharders = new Array(32);
    class ut extends _t {
        constructor(t, e, i=null, s=null, r=null) {
            super(t, e, i, s, r),
            this._params2dQuick2 = null,
            this._shaderValueWidth = 0,
            this._shaderValueHeight = 0
        }
        _disposeResource() {
            super._disposeResource(),
            this._params2dQuick2 = null
        }
        upload2dQuick2(t) {
            this.upload(t, this._params2dQuick2 || this._make2dQuick2())
        }
        _make2dQuick2() {
            if (!this._params2dQuick2) {
                this._params2dQuick2 = [];
                for (var t, e = this._params, i = 0, s = e.length; i < s; i++)
                    "size" !== (t = e[i]).name && this._params2dQuick2.push(t)
            }
            return this._params2dQuick2
        }
        static create(t, e, i=null, s=null, r=null) {
            return new ut(t,e,i,s,r)
        }
    }
    class ct {
        constructor(t, e) {
            this.defines = new b,
            this.size = [0, 0],
            this.alpha = 1,
            this.ALPHA = 1,
            this.subID = 0,
            this.ref = 1,
            this._cacheID = 0,
            this.clipMatDir = [R.Context._MAXSIZE, 0, 0, R.Context._MAXSIZE],
            this.clipMatPos = [0, 0],
            this.clipOff = [0, 0],
            this.mainID = t,
            this.subID = e,
            this.textureHost = null,
            this.texture = null,
            this.color = null,
            this.colorAdd = null,
            this.u_mmat2 = null,
            this._cacheID = t | e,
            this._inClassCache = ct._cache[this._cacheID],
            0 < t && !this._inClassCache && (this._inClassCache = ct._cache[this._cacheID] = [],
            this._inClassCache._length = 0),
            this.clear()
        }
        static _initone(t, e) {
            ct._typeClass[t] = e,
            ct._cache[t] = [],
            ct._cache[t]._length = 0
        }
        static __init__() {}
        setValue(t) {}
        _ShaderWithCompile() {
            return _t.withCompile2D(0, this.mainID, this.defines.toNameDic(), this.mainID | this.defines._value, ut.create, this._attribLocation)
        }
        upload() {
            var t = l
              , e = (l.worldMatrix4 !== l.TEMPMAT4_ARRAY && this.defines.addInt(b.WORLDMAT),
            this.mmat = t.worldMatrix4,
            l.matWVP && (this.defines.addInt(b.MVP3D),
            this.u_MvpMatrix = l.matWVP.elements),
            _t.sharders[this.mainID | this.defines._value] || this._ShaderWithCompile());
            e._shaderValueWidth !== t.width || e._shaderValueHeight !== t.height ? (this.size[0] = t.width,
            this.size[1] = t.height,
            e._shaderValueWidth = t.width,
            e._shaderValueHeight = t.height,
            e.upload(this, null)) : e.upload(this, e._params2dQuick2 || e._make2dQuick2())
        }
        setFilters(t) {
            if (this.filters = t)
                for (var e, i = t.length, s = 0; s < i; s++)
                    (e = t[s]) && (this.defines.add(e.type),
                    e.action.setValue(this))
        }
        clear() {
            this.defines._value = this.subID,
            this.clipOff[0] = 0
        }
        release() {
            --this.ref < 1 && (this._inClassCache && (this._inClassCache[this._inClassCache._length++] = this),
            this.clear(),
            this.filters = null,
            this.ref = 1,
            this.clipOff[0] = 0)
        }
        static create(t, e) {
            var i = ct._cache[t | e];
            return i._length ? i[--i._length] : new ct._typeClass[t | e](e)
        }
    }
    ct._cache = [],
    ct._typeClass = [],
    ct.TEMPMAT4_ARRAY = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    class dt {
        constructor() {
            this.clear()
        }
        clear() {
            this.submitType = -1,
            this.blendShader = this.other = 0
        }
        copyFrom(t) {
            this.other = t.other,
            this.blendShader = t.blendShader,
            this.submitType = t.submitType
        }
        copyFrom2(t, e, i) {
            this.other = i,
            this.submitType = e
        }
        equal3_2(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader
        }
        equal4_2(t, e, i) {
            return this.submitType === e && this.other === i && this.blendShader === t.blendShader
        }
        equal_3(t) {
            return this.submitType === t.submitType && this.blendShader === t.blendShader
        }
        equal(t) {
            return this.other === t.other && this.submitType === t.submitType && this.blendShader === t.blendShader
        }
    }
    class pt {
        constructor() {
            this._ref = 1,
            this._key = new dt
        }
        renderSubmit() {
            return this.fun.apply(this._this, this.args),
            1
        }
        getRenderType() {
            return 0
        }
        releaseRender() {
            var t;
            --this._ref < 1 && ((t = pt.POOL)[t._length++] = this)
        }
        static create(t, e, i) {
            var s = pt.POOL._length ? pt.POOL[--pt.POOL._length] : new pt;
            return s.fun = e,
            s.args = t,
            s._this = i,
            s._ref = 1,
            s._key.clear(),
            s
        }
    }
    pt.POOL = [],
    pt.POOL._length = 0;
    class mt {
        constructor() {}
        get type() {
            return -1
        }
    }
    mt.BLUR = 16,
    mt.COLOR = 32,
    mt.GLOW = 8,
    mt._filter = function(t, e, i, s) {
        var r = e
          , a = this._next;
        if (a) {
            var n = t.filters
              , h = n.length;
            if (1 == h && n[0].type == mt.COLOR)
                return e.save(),
                e.setColorFilter(n[0]),
                a._fun.call(a, t, e, i, s),
                void e.restore();
            var o, l = ct.create(b.TEXTURE2D, 0), _ = q.TEMP, u = r._curMat, c = y.create(), u = (u.copyTo(c),
            0), d = 0, p = null, m = t._cacheStyle.filterCache || null;
            if (m && 0 == t.getRepaint()) {
                if ((t._isHaveGlowFilter() || !1) && (u = 50,
                d = 25),
                (o = t.getBounds()).width <= 0 || o.height <= 0)
                    return;
                o.width += u + 8,
                o.height += u + 8,
                o.x -= t.pivotX + 4,
                o.y -= t.pivotY + 4,
                _.x = o.x * c.a + o.y * c.c,
                _.y = o.y * c.d + o.x * c.b,
                o.x = _.x,
                o.y = _.y,
                _.x = o.width * c.a + o.height * c.c,
                _.y = o.height * c.d + o.width * c.b,
                o.width = _.x,
                o.height = _.y
            } else {
                t._isHaveGlowFilter() && (u = 50,
                d = 25),
                (o = new E).copyFrom(t.getSelfBounds()),
                o.x += t.x,
                o.y += t.y,
                o.x -= t.pivotX + 4,
                o.y -= t.pivotY + 4;
                var g = o.x
                  , f = o.y;
                if (o.width += u + 8,
                o.height += u + 8,
                _.x = o.x * c.a + o.y * c.c,
                _.y = o.y * c.d + o.x * c.b,
                o.x = _.x,
                o.y = _.y,
                _.x = o.width * c.a + o.height * c.c,
                _.y = o.height * c.d + o.width * c.b,
                o.width = _.x,
                o.height = _.y,
                o.width <= 0 || o.height <= 0)
                    return;
                m && ht.releaseRT(m);
                var p = ht.getRT(o.width, o.height)
                  , T = m = ht.getRT(o.width, o.height)
                  , u = (t._getCacheStyle().filterCache = m,
                r.pushRT(),
                r.useRT(p),
                t.x - g + d)
                  , g = t.y - f + d;
                a._fun.call(a, t, e, u, g),
                r.useRT(T);
                for (var x = 0; x < h; x++) {
                    0 != x && (r.useRT(p),
                    r.drawTarget(T, 0, 0, o.width, o.height, y.TEMP.identity(), l, null, A.TOINT.overlay),
                    r.useRT(T));
                    var v = n[x];
                    switch (v.type) {
                    case mt.BLUR:
                    case mt.GLOW:
                        v._glRender && v._glRender.render(p, e, o.width, o.height, v);
                        break;
                    case mt.COLOR:
                        r.setColorFilter(v),
                        r.drawTarget(p, 0, 0, o.width, o.height, y.EMPTY.identity(), ct.create(b.TEXTURE2D, 0)),
                        r.setColorFilter(null)
                    }
                }
                r.popRT()
            }
            i = i - d - t.x,
            s = s - d - t.y,
            _.setTo(i, s),
            c.transformPoint(_),
            i = _.x + o.x,
            s = _.y + o.y,
            r._drawRenderTexture(m, i, s, o.width, o.height, y.TEMP.identity(), 1, nt.defuv),
            p && (f = pt.create([p], function(t) {
                t.destroy()
            }, this),
            p = null,
            e.addRenderObject(f)),
            c.destroy()
        }
    }
    ;
    class S {
        static toRadian(t) {
            return t * S._pi2
        }
        static toAngle(t) {
            return t * S._pi
        }
        static toHexColor(t) {
            if (t < 0 || isNaN(t))
                return null;
            for (var e = t.toString(16); e.length < 6; )
                e = "0" + e;
            return "#" + e
        }
        static getGID() {
            return S._gid++
        }
        static concatArray(t, e) {
            if (!e)
                return t;
            if (!t)
                return e;
            for (var i = e.length, s = 0; s < i; s++)
                t.push(e[s]);
            return t
        }
        static clearArray(t) {
            return t && (t.length = 0,
            t)
        }
        static copyArray(t, e) {
            if (t = t || [],
            !e)
                return t;
            t.length = e.length;
            for (var i = e.length, s = 0; s < i; s++)
                t[s] = e[s];
            return t
        }
        static getGlobalRecByPoints(t, e, i, s, r) {
            e = q.create().setTo(e, i),
            e = t.localToGlobal(e),
            i = q.create().setTo(s, r),
            i = t.localToGlobal(i),
            s = E._getWrapRec([e.x, e.y, i.x, i.y]);
            return e.recover(),
            i.recover(),
            s
        }
        static getGlobalPosAndScale(t) {
            return S.getGlobalRecByPoints(t, 0, 0, 1, 1)
        }
        static bind(t, e) {
            return t.bind(e)
        }
        static updateOrder(t) {
            if (!t || t.length < 2)
                return !1;
            for (var e, i, s, r = 1, a = t.length; r < a; ) {
                for (s = t[e = r],
                i = t[e]._zOrder; -1 < --e && t[e]._zOrder > i; )
                    t[e + 1] = t[e];
                t[e + 1] = s,
                r++
            }
            return !0
        }
        static transPointList(t, e, i) {
            for (var s = t.length, r = 0; r < s; r += 2)
                t[r] += e,
                t[r + 1] += i
        }
        static parseInt(t, e=0) {
            t = parseInt(t, e);
            return isNaN(t) ? 0 : t
        }
        static getFileExtension(t) {
            S._extReg.lastIndex = t.lastIndexOf(".");
            t = S._extReg.exec(t);
            return t && 1 < t.length ? t[1].toLowerCase() : null
        }
        static getFilecompatibleExtension(t) {
            var t = t.split(".")
              , e = t.length;
            return 2 < t.length ? t[e - 2] + "." + t[e - 1] : null
        }
        static getTransformRelativeToWindow(t, e, i) {
            var s, r, a, n = S.gStage, t = S.getGlobalPosAndScale(t), h = n._canvasTransform.clone(), o = h.tx, l = h.ty, _ = (h.rotate(-Math.PI / 180 * n.canvasDegree),
            h.scale(n.clientScaleX, n.clientScaleY),
            n.canvasDegree % 180 != 0);
            return _ ? (s = i + t.y,
            r = e + t.x,
            s *= h.d,
            r *= h.a,
            90 == n.canvasDegree ? (s = o - s,
            r += l) : (s += o,
            r = l - r)) : (s = e + t.x,
            r = i + t.y,
            s = s * h.a + o,
            r = r * h.d + l),
            r += n._safariOffsetY,
            e = _ ? (a = h.d * t.height,
            h.a * t.width) : (a = h.a * t.width,
            h.d * t.height),
            {
                x: s,
                y: r,
                scaleX: a,
                scaleY: e
            }
        }
        static fitDOMElementInArea(t, e, i, s, r, a) {
            t._fitLayaAirInitialized || (t._fitLayaAirInitialized = !0,
            t.style.transformOrigin = t.style.webKittransformOrigin = "left top",
            t.style.position = "absolute");
            e = S.getTransformRelativeToWindow(e, i, s);
            t.style.transform = t.style.webkitTransform = "scale(" + e.scaleX + "," + e.scaleY + ") rotate(" + S.gStage.canvasDegree + "deg)",
            t.style.width = r + "px",
            t.style.height = a + "px",
            t.style.left = e.x + "px",
            t.style.top = e.y + "px"
        }
        static isOkTextureList(t) {
            if (!t)
                return !1;
            for (var e, i = t.length, s = 0; s < i; s++)
                if (!(e = t[s]) || !e._getSource())
                    return !1;
            return !0
        }
        static isOKCmdList(t) {
            if (!t)
                return !1;
            for (var e = t.length, i = 0; i < e; i++)
                t[i];
            return !0
        }
        static getQueryString(t) {
            if (R.Browser.onMiniGame)
                return null;
            if (!window.location || !window.location.search)
                return null;
            t = new RegExp("(^|&)" + t + "=([^&]*)(&|$)"),
            t = window.location.search.substr(1).match(t);
            return null != t ? unescape(t[2]) : null
        }
    }
    S.gStage = null,
    S._gid = 1,
    S._pi = 180 / Math.PI,
    S._pi2 = Math.PI / 180,
    S._extReg = /\.(\w+)\??/g,
    S.parseXMLFromString = function(t) {
        if (t = t.replace(/>\s+</g, "><"),
        -1 < (t = (new DOMParser).parseFromString(t, "text/xml")).firstChild.textContent.indexOf("This page contains the following errors"))
            throw new Error(t.firstChild.firstChild.textContent);
        return t
    }
    ;
    class gt {
        constructor(t) {
            if (this.arrColor = [],
            null == t || "none" == t)
                return this.strColor = "#00000000",
                this.numColor = 0,
                void (this.arrColor = [0, 0, 0, 0]);
            var e;
            if ("string" == typeof t)
                if (0 <= t.indexOf("rgba(") || 0 <= t.indexOf("rgb(")) {
                    var i = (r = t).indexOf("(")
                      , s = r.indexOf(")")
                      , r = r.substring(i + 1, s);
                    for (this.arrColor = r.split(","),
                    e = this.arrColor.length,
                    n = 0; n < e; n++)
                        this.arrColor[n] = parseFloat(this.arrColor[n]),
                        n < 3 && (this.arrColor[n] = Math.round(this.arrColor[n]));
                    i = 4 == this.arrColor.length ? 256 * (256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2]) + Math.round(255 * this.arrColor[3]) : 256 * (256 * this.arrColor[0] + this.arrColor[1]) + this.arrColor[2],
                    this.strColor = t
                } else {
                    if (3 === (e = (t = "#" === (this.strColor = t).charAt(0) ? t.substr(1) : t).length) || 4 === e) {
                        for (var a = "", n = 0; n < e; n++)
                            a += t[n] + t[n];
                        t = a
                    }
                    i = parseInt(t, 16)
                }
            else
                i = t,
                this.strColor = S.toHexColor(i);
            0 <= this.strColor.indexOf("rgba") || 9 === this.strColor.length ? (this.arrColor = [((4278190080 & i) >>> 24) / 255, ((16711680 & i) >> 16) / 255, ((65280 & i) >> 8) / 255, (255 & i) / 255],
            this.numColor = (4278190080 & i) >>> 24 | (16711680 & i) >> 8 | (65280 & i) << 8 | (255 & i) << 24) : (this.arrColor = [((16711680 & i) >> 16) / 255, ((65280 & i) >> 8) / 255, (255 & i) / 255, 1],
            this.numColor = 4278190080 | (16711680 & i) >> 16 | 65280 & i | (255 & i) << 16),
            this.arrColor.__id = ++gt._COLODID
        }
        static _initDefault() {
            for (var t in gt._DEFAULT = {},
            gt._COLOR_MAP)
                gt._SAVE[t] = gt._DEFAULT[t] = new gt(gt._COLOR_MAP[t]);
            return gt._DEFAULT
        }
        static _initSaveMap() {
            for (var t in gt._SAVE_SIZE = 0,
            gt._SAVE = {},
            gt._DEFAULT)
                gt._SAVE[t] = gt._DEFAULT[t]
        }
        static create(t) {
            var e = t + ""
              , i = gt._SAVE[e];
            return null != i ? i : (gt._SAVE_SIZE < 1e3 && gt._initSaveMap(),
            gt._SAVE[e] = new gt(t))
        }
    }
    gt._SAVE = {},
    gt._SAVE_SIZE = 0,
    gt._COLOR_MAP = {
        purple: "#800080",
        orange: "#ffa500",
        white: "#FFFFFF",
        red: "#FF0000",
        green: "#00FF00",
        blue: "#0000FF",
        black: "#000000",
        yellow: "#FFFF00",
        gray: "#808080"
    },
    gt._DEFAULT = gt._initDefault(),
    gt._COLODID = 1;
    class ft extends mt {
        constructor(t=null) {
            super(),
            t = t || this._copyMatrix(ft.IDENTITY_MATRIX),
            this._mat = new Float32Array(16),
            this._alpha = new Float32Array(4),
            this.setByMatrix(t)
        }
        gray() {
            return this.setByMatrix(ft.GRAY_MATRIX)
        }
        color(t=0, e=0, i=0, s=1) {
            return this.setByMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, e, 0, 0, 1, 0, i, 0, 0, 0, 1, s])
        }
        setColor(t) {
            t = gt.create(t).arrColor,
            t = [0, 0, 0, 0, 256 * t[0], 0, 0, 0, 0, 256 * t[1], 0, 0, 0, 0, 256 * t[2], 0, 0, 0, 1, 0];
            return this.setByMatrix(t)
        }
        setByMatrix(t) {
            this._matrix != t && this._copyMatrix(t);
            for (var e = 0, i = 0, s = 0; s < 20; s++)
                s % 5 != 4 ? this._mat[e++] = t[s] : this._alpha[i++] = t[s];
            return this
        }
        get type() {
            return mt.COLOR
        }
        adjustColor(t, e, i, s) {
            return this.adjustHue(s),
            this.adjustContrast(e),
            this.adjustBrightness(t),
            this.adjustSaturation(i),
            this
        }
        adjustBrightness(t) {
            return 0 == (t = this._clampValue(t, 100)) || isNaN(t) ? this : this._multiplyMatrix([1, 0, 0, 0, t, 0, 1, 0, 0, t, 0, 0, 1, 0, t, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        }
        adjustContrast(t) {
            if (0 == (t = this._clampValue(t, 100)) || isNaN(t))
                return this;
            var e = t < 0 ? 127 + t / 100 * 127 : 127 * (e = 0 == (e = t % 1) ? ft.DELTA_INDEX[t] : ft.DELTA_INDEX[t << 0] * (1 - e) + ft.DELTA_INDEX[1 + (t << 0)] * e) + 127
              , t = e / 127
              , e = .5 * (127 - e);
            return this._multiplyMatrix([t, 0, 0, 0, e, 0, t, 0, 0, e, 0, 0, t, 0, e, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        }
        adjustSaturation(t) {
            if (0 == (t = this._clampValue(t, 100)) || isNaN(t))
                return this;
            var t = 1 + (0 < t ? 3 * t / 100 : t / 100)
              , e = 1 - t
              , i = .3086 * e
              , s = .6094 * e
              , e = .082 * e;
            return this._multiplyMatrix([i + t, s, e, 0, 0, i, s + t, e, 0, 0, i, s, e + t, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        }
        adjustHue(t) {
            if (0 == (t = this._clampValue(t, 180) / 180 * Math.PI) || isNaN(t))
                return this;
            var e = Math.cos(t)
              , t = Math.sin(t)
              , i = .213
              , s = .715
              , r = .072;
            return this._multiplyMatrix([i + .787 * e + t * -i, s + e * -s + t * -s, r + e * -r + .928 * t, 0, 0, i + e * -i + .143 * t, s + e * (1 - s) + .14 * t, r + e * -r + -.283 * t, 0, 0, i + e * -i + -.787 * t, s + e * -s + t * s, r + .928 * e + t * r, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1])
        }
        reset() {
            return this.setByMatrix(this._copyMatrix(ft.IDENTITY_MATRIX))
        }
        _multiplyMatrix(t) {
            var e = [];
            this._matrix = this._fixMatrix(this._matrix);
            for (var i = 0; i < 5; i++) {
                for (var s = 0; s < 5; s++)
                    e[s] = this._matrix[s + 5 * i];
                for (s = 0; s < 5; s++) {
                    for (var r = 0, a = 0; a < 5; a++)
                        r += t[s + 5 * a] * e[a];
                    this._matrix[s + 5 * i] = r
                }
            }
            return this.setByMatrix(this._matrix)
        }
        _clampValue(t, e) {
            return Math.min(e, Math.max(-e, t))
        }
        _fixMatrix(t=null) {
            return null == t ? ft.IDENTITY_MATRIX : (t.length < ft.LENGTH ? t = t.slice(0, t.length).concat(ft.IDENTITY_MATRIX.slice(t.length, ft.LENGTH)) : t.length > ft.LENGTH && (t = t.slice(0, ft.LENGTH)),
            t)
        }
        _copyMatrix(t) {
            var e = ft.LENGTH;
            this._matrix || (this._matrix = []);
            for (var i = 0; i < e; i++)
                this._matrix[i] = t[i];
            return this._matrix
        }
    }
    ft.DELTA_INDEX = [0, .01, .02, .04, .05, .06, .07, .08, .1, .11, .12, .14, .15, .16, .17, .18, .2, .21, .22, .24, .25, .27, .28, .3, .32, .34, .36, .38, .4, .42, .44, .46, .48, .5, .53, .56, .59, .62, .65, .68, .71, .74, .77, .8, .83, .86, .89, .92, .95, .98, 1, 1.06, 1.12, 1.18, 1.24, 1.3, 1.36, 1.42, 1.48, 1.54, 1.6, 1.66, 1.72, 1.78, 1.84, 1.9, 1.96, 2, 2.12, 2.25, 2.37, 2.5, 2.62, 2.75, 2.87, 3, 3.2, 3.4, 3.6, 3.8, 4, 4.3, 4.7, 4.9, 5, 5.5, 6, 6.5, 6.8, 7, 7.3, 7.5, 7.8, 8, 8.4, 8.7, 9, 9.4, 9.6, 9.8, 10],
    ft.GRAY_MATRIX = [.3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, .3086, .6094, .082, 0, 0, 0, 0, 0, 1, 0],
    ft.IDENTITY_MATRIX = [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    ft.LENGTH = 25;
    class Tt {
        constructor() {
            this.colorFlt = null,
            this.uv = null
        }
        static create(t, e, i, s, r, a, n, h, o, l) {
            var _ = p.getItemByClass("DrawTextureCmd", Tt);
            return (_.texture = t)._addReference(),
            _.x = e,
            _.y = i,
            _.width = s,
            _.height = r,
            _.matrix = a,
            _.alpha = n,
            _.color = h,
            _.blendMode = o,
            _.uv = null == l ? null : l,
            h && (_.colorFlt = new ft,
            _.colorFlt.setColor(h)),
            _
        }
        recover() {
            this.texture && this.texture._removeReference(),
            this.texture = null,
            this.matrix = null,
            p.recover("DrawTextureCmd", this)
        }
        run(t, e, i) {
            this.texture && t.drawTextureWithTransform(this.texture, this.x, this.y, this.width, this.height, this.matrix, e, i, this.alpha, this.blendMode, this.colorFlt, this.uv)
        }
        get cmdID() {
            return Tt.ID
        }
    }
    Tt.ID = "DrawTexture";
    class xt {
        static create(t, e, i, s, r, a, n, h) {
            var o = p.getItemByClass("FillTextureCmd", xt);
            return o.texture = t,
            o.x = e,
            o.y = i,
            o.width = s,
            o.height = r,
            o.type = a,
            o.offset = n,
            o.other = h,
            o
        }
        recover() {
            this.texture = null,
            this.offset = null,
            this.other = null,
            p.recover("FillTextureCmd", this)
        }
        run(t, e, i) {
            t.fillTexture(this.texture, this.x + e, this.y + i, this.width, this.height, this.type, this.offset, this.other)
        }
        get cmdID() {
            return xt.ID
        }
    }
    xt.ID = "FillTexture";
    class vt {
        static create() {
            return p.getItemByClass("RestoreCmd", vt)
        }
        recover() {
            p.recover("RestoreCmd", this)
        }
        run(t, e, i) {
            t.restore()
        }
        get cmdID() {
            return vt.ID
        }
    }
    vt.ID = "Restore";
    class yt {
        static create(t, e, i) {
            var s = p.getItemByClass("RotateCmd", yt);
            return s.angle = t,
            s.pivotX = e,
            s.pivotY = i,
            s
        }
        recover() {
            p.recover("RotateCmd", this)
        }
        run(t, e, i) {
            t._rotate(this.angle, this.pivotX + e, this.pivotY + i)
        }
        get cmdID() {
            return yt.ID
        }
    }
    yt.ID = "Rotate";
    class Et {
        static create(t, e, i, s) {
            var r = p.getItemByClass("ScaleCmd", Et);
            return r.scaleX = t,
            r.scaleY = e,
            r.pivotX = i,
            r.pivotY = s,
            r
        }
        recover() {
            p.recover("ScaleCmd", this)
        }
        run(t, e, i) {
            t._scale(this.scaleX, this.scaleY, this.pivotX + e, this.pivotY + i)
        }
        get cmdID() {
            return Et.ID
        }
    }
    Et.ID = "Scale";
    class Ct {
        static create(t, e, i) {
            var s = p.getItemByClass("TransformCmd", Ct);
            return s.matrix = t,
            s.pivotX = e,
            s.pivotY = i,
            s
        }
        recover() {
            this.matrix = null,
            p.recover("TransformCmd", this)
        }
        run(t, e, i) {
            t._transform(this.matrix, this.pivotX + e, this.pivotY + i)
        }
        get cmdID() {
            return Ct.ID
        }
    }
    Ct.ID = "Transform";
    class Rt {
        static create(t, e) {
            var i = p.getItemByClass("TranslateCmd", Rt);
            return i.tx = t,
            i.ty = e,
            i
        }
        recover() {
            p.recover("TranslateCmd", this)
        }
        run(t, e, i) {
            t.translate(this.tx, this.ty)
        }
        get cmdID() {
            return Rt.ID
        }
    }
    Rt.ID = "Translate";
    class At {
        constructor() {
            this._controlPoints = [new q, new q, new q],
            this._calFun = this.getPoint2
        }
        _switchPoint(t, e) {
            var i = this._controlPoints.shift();
            i.setTo(t, e),
            this._controlPoints.push(i)
        }
        getPoint2(t, e) {
            var i = this._controlPoints[0]
              , s = this._controlPoints[1]
              , r = this._controlPoints[2]
              , a = Math.pow(1 - t, 2) * i.x + 2 * t * (1 - t) * s.x + Math.pow(t, 2) * r.x
              , i = Math.pow(1 - t, 2) * i.y + 2 * t * (1 - t) * s.y + Math.pow(t, 2) * r.y;
            e.push(a, i)
        }
        getPoint3(t, e) {
            var i = this._controlPoints[0]
              , s = this._controlPoints[1]
              , r = this._controlPoints[2]
              , a = this._controlPoints[3]
              , n = Math.pow(1 - t, 3) * i.x + 3 * s.x * t * (1 - t) * (1 - t) + 3 * r.x * t * t * (1 - t) + a.x * Math.pow(t, 3)
              , i = Math.pow(1 - t, 3) * i.y + 3 * s.y * t * (1 - t) * (1 - t) + 3 * r.y * t * t * (1 - t) + a.y * Math.pow(t, 3);
            e.push(n, i)
        }
        insertPoints(t, e) {
            for (var i = 1 / (t = 0 < t ? t : 5), s = 0; s <= 1; s += i)
                this._calFun(s, e)
        }
        getBezierPoints(t, e=5, i=2) {
            var s, r = t.length;
            if (r < 2 * (i + 1))
                return [];
            var a = [];
            switch (i) {
            case 2:
                this._calFun = this.getPoint2;
                break;
            case 3:
                this._calFun = this.getPoint3;
                break;
            default:
                return []
            }
            for (; this._controlPoints.length <= i; )
                this._controlPoints.push(q.create());
            for (s = 0; s < 2 * i; s += 2)
                this._switchPoint(t[s], t[s + 1]);
            for (s = 2 * i; s < r; s += 2)
                this._switchPoint(t[s], t[s + 1]),
                s / 2 % i == 0 && this.insertPoints(e, a);
            return a
        }
    }
    At.I = new At;
    class bt {
        static multiply(t, e, i) {
            return (t.x - i.x) * (e.y - i.y) - (e.x - i.x) * (t.y - i.y)
        }
        static dis(t, e) {
            return (t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y)
        }
        static _getPoints(t, e=!1, i=null) {
            for (bt._mPointList || (bt._mPointList = []); bt._mPointList.length < t; )
                bt._mPointList.push(new q);
            return (i = i || []).length = 0,
            e ? bt.getFrom(i, bt._mPointList, t) : bt.getFromR(i, bt._mPointList, t),
            i
        }
        static getFrom(t, e, i) {
            for (var s = 0; s < i; s++)
                t.push(e[s]);
            return t
        }
        static getFromR(t, e, i) {
            for (var s = 0; s < i; s++)
                t.push(e.pop());
            return t
        }
        static pListToPointList(t, e=!1) {
            for (var i = t.length / 2, s = bt._getPoints(i, e, bt._tempPointList), r = 0; r < i; r++)
                s[r].setTo(t[r + r], t[r + r + 1]);
            return s
        }
        static pointListToPlist(t) {
            for (var e, i = t.length, s = bt._temPList, r = s.length = 0; r < i; r++)
                e = t[r],
                s.push(e.x, e.y);
            return s
        }
        static scanPList(t) {
            return S.copyArray(t, bt.pointListToPlist(bt.scan(bt.pListToPointList(t, !0))))
        }
        static scan(t) {
            var e, i, s, r, a, n = 0, h = (t.length,
            {}), o = bt._temArr;
            for (o.length = 0,
            e = t.length - 1; 0 <= e; e--)
                (a = (s = t[e]).x + "_" + s.y)in h || (h[a] = !0,
                o.push(s));
            for (r = o.length,
            S.copyArray(t, o),
            e = 1; e < r; e++)
                (t[e].y < t[n].y || t[e].y == t[n].y && t[e].x < t[n].x) && (n = e);
            for (s = t[0],
            t[0] = t[n],
            t[n] = s,
            e = 1; e < r - 1; e++) {
                for (i = (n = e) + 1; i < r; i++)
                    (0 < bt.multiply(t[i], t[n], t[0]) || 0 == bt.multiply(t[i], t[n], t[0]) && bt.dis(t[0], t[i]) < bt.dis(t[0], t[n])) && (n = i);
                s = t[e],
                t[e] = t[n],
                t[n] = s
            }
            if ((o = bt._temArr).length = 0,
            t.length < 3)
                return S.copyArray(o, t);
            for (o.push(t[0], t[1], t[2]),
            e = 3; e < r; e++) {
                for (; 2 <= o.length && 0 <= bt.multiply(t[e], o[o.length - 1], o[o.length - 2]); )
                    o.pop();
                t[e] && o.push(t[e])
            }
            return o
        }
    }
    bt._tempPointList = [],
    bt._temPList = [],
    bt._temArr = [];
    class St {
        constructor(t) {
            this.setValue(t)
        }
        static create(t) {
            var e;
            return t ? (e = t instanceof gt ? t : gt.create(t))._drawStyle || (e._drawStyle = new St(t)) : St.DEFAULT
        }
        setValue(t) {
            this._color = t ? t instanceof gt ? t : gt.create(t) : gt.create("#000000")
        }
        reset() {
            this._color = gt.create("#000000")
        }
        toInt() {
            return this._color.numColor
        }
        equal(t) {
            return "string" == typeof t ? this._color.strColor === t : t instanceof gt && this._color.numColor === t.numColor
        }
        toColorStr() {
            return this._color.strColor
        }
    }
    St.DEFAULT = new St("#000000");
    class wt {
        constructor() {
            this._lastOriX = 0,
            this._lastOriY = 0,
            this.paths = [],
            this._curPath = null
        }
        beginPath(t) {
            this.paths.length = 1,
            this._curPath = this.paths[0] = new Mt,
            this._curPath.convex = t
        }
        closePath() {
            this._curPath.loop = !0
        }
        newPath() {
            this._curPath = new Mt,
            this.paths.push(this._curPath)
        }
        addPoint(t, e) {
            this._curPath.path.push(t, e)
        }
        push(t, e) {
            (!this._curPath || 0 < this._curPath.path.length) && (this._curPath = new Mt,
            this.paths.push(this._curPath));
            var i = this._curPath;
            i.path = t.slice(),
            i.convex = e
        }
        reset() {
            this.paths.length = 0
        }
    }
    class Mt {
        constructor() {
            this.path = [],
            this.loop = !1,
            this.convex = !1
        }
    }
    class w {
        constructor(t=w.TYPE_2D) {
            this.clipInfoID = -1,
            this._mesh = null,
            this._blendFn = null,
            this._id = 0,
            this._renderType = 0,
            this._parent = null,
            this._key = new dt,
            this._startIdx = 0,
            this._numEle = 0,
            this._ref = 1,
            this.shaderValue = null,
            this._renderType = t,
            this._id = ++w.ID
        }
        static __init__() {
            var t = w.RENDERBASE = new w(-1);
            t.shaderValue = new ct(0,0),
            t.shaderValue.ALPHA = 1,
            t._ref = 4294967295
        }
        getID() {
            return this._id
        }
        getRenderType() {
            return this._renderType
        }
        toString() {
            return "ibindex:" + this._startIdx + " num:" + this._numEle + " key=" + this._key
        }
        renderSubmit() {
            return 1
        }
        releaseRender() {}
    }
    w.TYPE_2D = 1e4,
    w.TYPE_CANVAS = 10003,
    w.TYPE_CMDSETRT = 10004,
    w.TYPE_CUSTOM = 10005,
    w.TYPE_BLURRT = 10006,
    w.TYPE_CMDDESTORYPRERT = 10007,
    w.TYPE_DISABLESTENCIL = 10008,
    w.TYPE_OTHERIBVB = 10009,
    w.TYPE_PRIMITIVE = 10010,
    w.TYPE_RT = 10011,
    w.TYPE_BLUR_RT = 10012,
    w.TYPE_TARGET = 10013,
    w.TYPE_CHANGE_VALUE = 10014,
    w.TYPE_SHAPE = 10015,
    w.TYPE_TEXTURE = 10016,
    w.TYPE_FILLTEXTURE = 10017,
    w.KEY_ONCE = -1,
    w.KEY_FILLRECT = 1,
    w.KEY_DRAWTEXTURE = 2,
    w.KEY_VG = 3,
    w.KEY_TRIANGLES = 4,
    w.ID = 1,
    w.preRender = null;
    class a {
        constructor() {}
        static _createArray() {
            var t = [];
            return t._length = 0,
            t
        }
        static _init() {
            var t = a._namemap = {};
            return t[a.TYPE_ALPHA] = "ALPHA",
            t[a.TYPE_FILESTYLE] = "fillStyle",
            t[a.TYPE_FONT] = "font",
            t[a.TYPE_LINEWIDTH] = "lineWidth",
            t[a.TYPE_STROKESTYLE] = "strokeStyle",
            t[a.TYPE_ENABLEMERGE] = "_mergeID",
            t[a.TYPE_MARK] = t[a.TYPE_TRANSFORM] = t[a.TYPE_TRANSLATE] = [],
            t[a.TYPE_TEXTBASELINE] = "textBaseline",
            t[a.TYPE_TEXTALIGN] = "textAlign",
            t[a.TYPE_GLOBALCOMPOSITEOPERATION] = "_nBlendType",
            t[a.TYPE_SHADER] = "shader",
            t[a.TYPE_FILTERS] = "filters",
            t[a.TYPE_COLORFILTER] = "_colorFiler",
            t
        }
        isSaveMark() {
            return !1
        }
        restore(t) {
            this._dataObj[this._valueName] = this._value,
            (a.POOL[a.POOL._length++] = this)._newSubmit && (t._curSubmit = w.RENDERBASE)
        }
        static save(t, e, i, s) {
            var r;
            (t._saveMark._saveuse & e) !== e && (t._saveMark._saveuse |= e,
            (r = 0 < (r = a.POOL)._length ? r[--r._length] : new a)._value = i[r._valueName = a._namemap[e]],
            r._dataObj = i,
            r._newSubmit = s,
            (e = t._save)[e._length++] = r)
        }
    }
    a.TYPE_ALPHA = 1,
    a.TYPE_FILESTYLE = 2,
    a.TYPE_FONT = 8,
    a.TYPE_LINEWIDTH = 256,
    a.TYPE_STROKESTYLE = 512,
    a.TYPE_MARK = 1024,
    a.TYPE_TRANSFORM = 2048,
    a.TYPE_TRANSLATE = 4096,
    a.TYPE_ENABLEMERGE = 8192,
    a.TYPE_TEXTBASELINE = 16384,
    a.TYPE_TEXTALIGN = 32768,
    a.TYPE_GLOBALCOMPOSITEOPERATION = 65536,
    a.TYPE_CLIPRECT = 131072,
    a.TYPE_CLIPRECT_STENCIL = 262144,
    a.TYPE_IBVB = 524288,
    a.TYPE_SHADER = 1048576,
    a.TYPE_FILTERS = 2097152,
    a.TYPE_FILTERS_TYPE = 4194304,
    a.TYPE_COLORFILTER = 8388608,
    a.POOL = a._createArray(),
    a._namemap = a._init();
    class It {
        constructor() {
            this._globalClipMatrix = new y,
            this._clipInfoID = -1,
            this._clipRect = new E,
            this.incache = !1
        }
        isSaveMark() {
            return !1
        }
        restore(t) {
            this._globalClipMatrix.copyTo(t._globalClipMatrix),
            this._clipRect.clone(t._clipRect),
            t._clipInfoID = this._clipInfoID,
            It.POOL[It.POOL._length++] = this,
            t._clipInCache = this.incache
        }
        static save(t) {
            var e;
            (t._saveMark._saveuse & a.TYPE_CLIPRECT) != a.TYPE_CLIPRECT && (t._saveMark._saveuse |= a.TYPE_CLIPRECT,
            e = 0 < (e = It.POOL)._length ? e[--e._length] : new It,
            t._globalClipMatrix.copyTo(e._globalClipMatrix),
            t._clipRect.clone(e._clipRect),
            e._clipInfoID = t._clipInfoID,
            e.incache = t._clipInCache,
            (t = t._save)[t._length++] = e)
        }
    }
    It.POOL = a._createArray();
    class Pt {
        constructor() {
            this._saveuse = 0
        }
        isSaveMark() {
            return !0
        }
        restore(t) {
            t._saveMark = this._preSaveMark,
            Pt.POOL[Pt.POOL._length++] = this
        }
        static Create(t) {
            var e = Pt.POOL
              , e = 0 < e._length ? e[--e._length] : new Pt;
            return e._saveuse = 0,
            e._preSaveMark = t._saveMark,
            t._saveMark = e
        }
    }
    Pt.POOL = a._createArray();
    class Dt {
        constructor() {
            this._matrix = new y
        }
        isSaveMark() {
            return !1
        }
        restore(t) {
            t._curMat = this._savematrix,
            Dt.POOL[Dt.POOL._length++] = this
        }
        static save(t) {
            var e = t._saveMark;
            (e._saveuse & a.TYPE_TRANSFORM) !== a.TYPE_TRANSFORM && (e._saveuse |= a.TYPE_TRANSFORM,
            (e = 0 < (e = Dt.POOL)._length ? e[--e._length] : new Dt)._savematrix = t._curMat,
            t._curMat = t._curMat.copyTo(e._matrix),
            (t = t._save)[t._length++] = e)
        }
    }
    Dt.POOL = a._createArray();
    class Lt {
        constructor() {
            this._mat = new y
        }
        isSaveMark() {
            return !1
        }
        restore(t) {
            this._mat.copyTo(t._curMat),
            Lt.POOL[Lt.POOL._length++] = this
        }
        static save(t) {
            var e = Lt.POOL
              , e = 0 < e._length ? e[--e._length] : new Lt
              , t = (t._curMat.copyTo(e._mat),
            t._save);
            t[t._length++] = e
        }
    }
    Lt.POOL = a._createArray();
    class Bt {
        constructor() {
            this._nativeVertexArrayObject = d.layaGPUInstance.createVertexArray()
        }
        bind() {
            Bt._curBindedBufferState !== this && (d.layaGPUInstance.bindVertexArray(this._nativeVertexArrayObject),
            Bt._curBindedBufferState = this)
        }
        unBind() {
            if (Bt._curBindedBufferState !== this)
                throw "BufferState: must call bind() function first.";
            d.layaGPUInstance.bindVertexArray(null),
            Bt._curBindedBufferState = null
        }
        destroy() {
            d.layaGPUInstance.deleteVertexArray(this._nativeVertexArrayObject)
        }
        bindForNative() {
            d.instance.bindVertexArray(this._nativeVertexArrayObject),
            Bt._curBindedBufferState = this
        }
        unBindForNative() {
            d.instance.bindVertexArray(null),
            Bt._curBindedBufferState = null
        }
    }
    class Ft extends Bt {
        constructor() {
            super()
        }
    }
    class Ot {
        constructor() {
            this._byteLength = 0,
            this._glBuffer = d.instance.createBuffer()
        }
        get bufferUsage() {
            return this._bufferUsage
        }
        _bindForVAO() {}
        bind() {
            return !1
        }
        destroy() {
            this._glBuffer && (d.instance.deleteBuffer(this._glBuffer),
            this._glBuffer = null)
        }
    }
    class Nt {
    }
    Nt.loopStTm = 0,
    Nt.loopCount = 0;
    class Ut extends Ot {
        constructor() {
            super(),
            this._maxsize = 0,
            this._upload = !0,
            this._uploadSize = 0,
            this._bufferSize = 0,
            this._u8Array = null
        }
        static __int__(t) {}
        get bufferLength() {
            return this._buffer.byteLength
        }
        set byteLength(t) {
            this.setByteLength(t)
        }
        setByteLength(t) {
            this._byteLength !== t && (t <= this._bufferSize || this._resizeBuffer(2 * t + 256, !0),
            this._byteLength = t)
        }
        needSize(t) {
            var e = this._byteLength;
            return t && ((t = this._byteLength + t) <= this._bufferSize || this._resizeBuffer(t << 1, !0),
            this._byteLength = t),
            e
        }
        _bufferData() {
            this._maxsize = Math.max(this._maxsize, this._byteLength),
            Nt.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64),
            this._bufferSize = this._buffer.byteLength,
            this._checkArrayUse()),
            this._maxsize = this._byteLength),
            this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength,
            d.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)),
            d.instance.bufferSubData(this._bufferType, 0, new Uint8Array(this._buffer,0,this._byteLength))
        }
        _bufferSubData(t=0, e=0, i=0) {
            this._maxsize = Math.max(this._maxsize, this._byteLength),
            Nt.loopCount % 30 == 0 && (this._buffer.byteLength > this._maxsize + 64 && (this._buffer = this._buffer.slice(0, this._maxsize + 64),
            this._bufferSize = this._buffer.byteLength,
            this._checkArrayUse()),
            this._maxsize = this._byteLength),
            this._uploadSize < this._buffer.byteLength && (this._uploadSize = this._buffer.byteLength,
            d.instance.bufferData(this._bufferType, this._uploadSize, this._bufferUsage)),
            e || i ? (e = this._buffer.slice(e, i),
            d.instance.bufferSubData(this._bufferType, t, e)) : d.instance.bufferSubData(this._bufferType, t, this._buffer)
        }
        _checkArrayUse() {}
        _bind_uploadForVAO() {
            return !!this._upload && (this._upload = !1,
            this._bindForVAO(),
            this._bufferData(),
            !0)
        }
        _bind_upload() {
            return !!this._upload && (this._upload = !1,
            this.bind(),
            this._bufferData(),
            !0)
        }
        _bind_subUpload(t=0, e=0, i=0) {
            return !!this._upload && (this._upload = !1,
            this.bind(),
            this._bufferSubData(t, e, i),
            !0)
        }
        _resizeBuffer(t, e) {
            var i = this._buffer;
            if (t <= i.byteLength)
                return this;
            var s, r = this._u8Array;
            return e && i && 0 < i.byteLength ? (e = new ArrayBuffer(t),
            s = r && r.buffer == i ? r : new Uint8Array(i),
            (r = this._u8Array = new Uint8Array(e)).set(s, 0),
            i = this._buffer = e) : (i = this._buffer = new ArrayBuffer(t),
            this._u8Array = null),
            this._checkArrayUse(),
            this._upload = !0,
            this._bufferSize = i.byteLength,
            this
        }
        append(t) {
            var e, i;
            this._upload = !0,
            e = t.byteLength,
            t instanceof Uint8Array ? (this._resizeBuffer(this._byteLength + e, !0),
            i = new Uint8Array(this._buffer,this._byteLength)) : t instanceof Uint16Array ? (this._resizeBuffer(this._byteLength + e, !0),
            i = new Uint16Array(this._buffer,this._byteLength)) : t instanceof Float32Array && (this._resizeBuffer(this._byteLength + e, !0),
            i = new Float32Array(this._buffer,this._byteLength)),
            i.set(t, 0),
            this._byteLength += e,
            this._checkArrayUse()
        }
        appendU16Array(t, e) {
            this._resizeBuffer(this._byteLength + 2 * e, !0);
            var i = new Uint16Array(this._buffer,this._byteLength,e);
            if (6 == e)
                i[0] = t[0],
                i[1] = t[1],
                i[2] = t[2],
                i[3] = t[3],
                i[4] = t[4],
                i[5] = t[5];
            else if (100 <= e)
                i.set(new Uint16Array(t.buffer,0,e));
            else
                for (var s = 0; s < e; s++)
                    i[s] = t[s];
            this._byteLength += 2 * e,
            this._checkArrayUse()
        }
        appendEx(t, e) {
            var i;
            this._upload = !0,
            i = t.byteLength,
            this._resizeBuffer(this._byteLength + i, !0),
            new e(this._buffer,this._byteLength).set(t, 0),
            this._byteLength += i,
            this._checkArrayUse()
        }
        appendEx2(t, e, i, s=1) {
            var r, a;
            for (this._upload = !0,
            this._resizeBuffer(this._byteLength + (s = i * s), !0),
            r = new e(this._buffer,this._byteLength),
            a = 0; a < i; a++)
                r[a] = t[a];
            this._byteLength += s,
            this._checkArrayUse()
        }
        getBuffer() {
            return this._buffer
        }
        setNeedUpload() {
            this._upload = !0
        }
        getNeedUpload() {
            return this._upload
        }
        upload() {
            var t = d.instance
              , e = this._bind_upload();
            return t.bindBuffer(this._bufferType, null),
            this._bufferType == t.ARRAY_BUFFER && (Ot._bindedVertexBuffer = null),
            this._bufferType == t.ELEMENT_ARRAY_BUFFER && (Ot._bindedIndexBuffer = null),
            at.activeShader = null,
            e
        }
        subUpload(t=0, e, i) {
            var s = d.instance
              , r = this._bind_subUpload();
            return s.bindBuffer(this._bufferType, null),
            this._bufferType == s.ARRAY_BUFFER && (Ot._bindedVertexBuffer = null),
            this._bufferType == s.ELEMENT_ARRAY_BUFFER && (Ot._bindedIndexBuffer = null),
            at.activeShader = null,
            r
        }
        _disposeResource() {
            this._upload = !0,
            this._uploadSize = 0
        }
        clear() {
            this._byteLength = 0,
            this._upload = !0
        }
    }
    Ut.FLOAT32 = 4,
    Ut.SHORT = 2;
    class Gt extends Ut {
        constructor(t=35044) {
            super(),
            this._bufferUsage = t,
            this._bufferType = d.instance.ELEMENT_ARRAY_BUFFER,
            this._buffer = new ArrayBuffer(8)
        }
        _checkArrayUse() {
            this._uint16Array && (this._uint16Array = new Uint16Array(this._buffer))
        }
        getUint16Array() {
            return this._uint16Array || (this._uint16Array = new Uint16Array(this._buffer))
        }
        _bindForVAO() {
            var t = d.instance;
            t.bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._glBuffer)
        }
        bind() {
            var t;
            return Ot._bindedIndexBuffer !== this._glBuffer && ((t = d.instance).bindBuffer(t.ELEMENT_ARRAY_BUFFER, this._glBuffer),
            Ot._bindedIndexBuffer = this._glBuffer,
            !0)
        }
        destory() {
            this._uint16Array = null,
            this._buffer = null
        }
        disposeResource() {
            this._disposeResource()
        }
    }
    Gt.create = function(t=35044) {
        return new Gt(t)
    }
    ;
    class kt extends Ut {
        constructor(t, e) {
            super(),
            this._vertexStride = t,
            this._bufferUsage = e,
            this._bufferType = d.instance.ARRAY_BUFFER,
            this._buffer = new ArrayBuffer(8),
            this._floatArray32 = new Float32Array(this._buffer),
            this._uint32Array = new Uint32Array(this._buffer)
        }
        get vertexStride() {
            return this._vertexStride
        }
        getFloat32Array() {
            return this._floatArray32
        }
        appendArray(t) {
            var e = this._byteLength >> 2;
            this.setByteLength(this._byteLength + 4 * t.length),
            this.getFloat32Array().set(t, e),
            this._upload = !0
        }
        _checkArrayUse() {
            this._floatArray32 && (this._floatArray32 = new Float32Array(this._buffer)),
            this._uint32Array && (this._uint32Array = new Uint32Array(this._buffer))
        }
        deleteBuffer() {
            super._disposeResource()
        }
        _bindForVAO() {
            var t = d.instance;
            t.bindBuffer(t.ARRAY_BUFFER, this._glBuffer)
        }
        bind() {
            var t;
            return Ot._bindedVertexBuffer !== this._glBuffer && ((t = d.instance).bindBuffer(t.ARRAY_BUFFER, this._glBuffer),
            Ot._bindedVertexBuffer = this._glBuffer,
            !0)
        }
        destroy() {
            super.destroy(),
            this._byteLength = 0,
            this._upload = !0,
            this._buffer = null,
            this._floatArray32 = null
        }
    }
    kt.create = function(t, e=35048) {
        return new kt(t,e)
    }
    ;
    class Wt {
        constructor(t, e, i) {
            this._stride = 0,
            this.vertNum = 0,
            this.indexNum = 0,
            this._applied = !1,
            this._quadNum = 0,
            this.canReuse = !1,
            this._stride = t,
            this._vb = new kt(t,d.instance.DYNAMIC_DRAW),
            e ? this._vb._resizeBuffer(e, !1) : n.webGL2D_MeshAllocMaxMem && this._vb._resizeBuffer(65536 * t, !1),
            this._ib = new Gt,
            i && this._ib._resizeBuffer(i, !1)
        }
        cloneWithNewVB() {
            var t = new Wt(this._stride,0,0);
            return t._ib = this._ib,
            t._quadNum = this._quadNum,
            t._attribInfo = this._attribInfo,
            t
        }
        cloneWithNewVBIB() {
            var t = new Wt(this._stride,0,0);
            return t._attribInfo = this._attribInfo,
            t
        }
        getVBW() {
            return this._vb.setNeedUpload(),
            this._vb
        }
        getVBR() {
            return this._vb
        }
        getIBR() {
            return this._ib
        }
        getIBW() {
            return this._ib.setNeedUpload(),
            this._ib
        }
        createQuadIB(t) {
            this._quadNum = t,
            this._ib._resizeBuffer(6 * t * 2, !1),
            this._ib.byteLength = this._ib.bufferLength;
            for (var e = this._ib.getUint16Array(), i = 0, s = 0, r = 0; r < t; r++)
                e[i++] = s,
                e[i++] = s + 2,
                e[i++] = s + 1,
                e[i++] = s,
                e[i++] = s + 3,
                e[i++] = s + 2,
                s += 4;
            this._ib.setNeedUpload()
        }
        setAttributes(t) {
            if (this._attribInfo = t,
            this._attribInfo.length % 3 != 0)
                throw "Mesh2D setAttributes error!"
        }
        configVAO(t) {
            if (!this._applied) {
                this._applied = !0,
                this._vao || (this._vao = new Ft),
                this._vao.bind(),
                this._vb._bindForVAO(),
                this._ib.setNeedUpload(),
                this._ib._bind_uploadForVAO();
                for (var e = this._attribInfo.length / 3, i = 0, s = 0; s < e; s++) {
                    var r = this._attribInfo[i + 1]
                      , a = this._attribInfo[i]
                      , n = this._attribInfo[i + 2];
                    t.enableVertexAttribArray(s),
                    t.vertexAttribPointer(s, r, a, !1, this._stride, n),
                    i += 3
                }
                this._vao.unBind()
            }
        }
        useMesh(t) {
            this._applied || this.configVAO(t),
            this._vao.bind(),
            this._vb.bind(),
            this._ib._bind_upload() || this._ib.bind(),
            this._vb._bind_upload() || this._vb.bind()
        }
        getEleNum() {
            return this._ib.getBuffer().byteLength / 2
        }
        releaseMesh() {}
        destroy() {}
        clearVB() {
            this._vb.clear()
        }
    }
    Wt._gvaoid = 0;
    class Yt extends Wt {
        constructor() {
            super(Yt.const_stride, 4, 4),
            this.canReuse = !0,
            this.setAttributes(Yt._fixattriInfo),
            Yt._fixib ? (this._ib = Yt._fixib,
            this._quadNum = Yt._maxIB) : (this.createQuadIB(Yt._maxIB),
            Yt._fixib = this._ib)
        }
        static __int__() {
            Yt._fixattriInfo = [5126, 4, 0, 5121, 4, 16, 5121, 4, 20]
        }
        static getAMesh(t) {
            var e = null
              , e = Yt._POOL.length ? Yt._POOL.pop() : new Yt;
            return t && e._vb._resizeBuffer(65536 * Yt.const_stride, !1),
            e
        }
        releaseMesh() {
            this._vb.setByteLength(0),
            this.vertNum = 0,
            this.indexNum = 0,
            Yt._POOL.push(this)
        }
        destroy() {
            this._vb.destroy(),
            this._vb.deleteBuffer()
        }
        addQuad(t, e, i, s) {
            var r = this._vb
              , a = r._byteLength >> 2
              , n = (r.setByteLength(a + Yt.const_stride << 2),
            r._floatArray32 || r.getFloat32Array())
              , h = r._uint32Array
              , s = s ? 255 : 0;
            n[a++] = t[0],
            n[a++] = t[1],
            n[a++] = e[0],
            n[a++] = e[1],
            h[a++] = i,
            h[a++] = s,
            n[a++] = t[2],
            n[a++] = t[3],
            n[a++] = e[2],
            n[a++] = e[3],
            h[a++] = i,
            h[a++] = s,
            n[a++] = t[4],
            n[a++] = t[5],
            n[a++] = e[4],
            n[a++] = e[5],
            h[a++] = i,
            h[a++] = s,
            n[a++] = t[6],
            n[a++] = t[7],
            n[a++] = e[6],
            n[a++] = e[7],
            h[a++] = i,
            h[+a] = s,
            r._upload = !0
        }
    }
    Yt.const_stride = 24,
    Yt._maxIB = 16384,
    Yt._POOL = [];
    class Vt extends Wt {
        constructor() {
            super(Vt.const_stride, 4, 4),
            this.canReuse = !0,
            this.setAttributes(Vt._fixattriInfo)
        }
        static __init__() {
            Vt._fixattriInfo = [5126, 4, 0, 5121, 4, 16, 5121, 4, 20]
        }
        static getAMesh(t) {
            var e = Vt._POOL.length ? Vt._POOL.pop() : new Vt;
            return t && e._vb._resizeBuffer(65536 * Vt.const_stride, !1),
            e
        }
        addData(t, e, i, s, r) {
            var a = this._vb
              , n = this._ib
              , h = t.length >> 1
              , o = a.needSize(h * Vt.const_stride) >> 2
              , l = a._floatArray32 || a.getFloat32Array()
              , _ = a._uint32Array
              , u = 0
              , c = s.a
              , d = s.b
              , p = s.c
              , m = s.d
              , g = s.tx
              , f = s.ty
              , T = 0;
            for (T = 0; T < h; T++) {
                var x = t[u]
                  , v = t[u + 1];
                l[o] = x * c + v * p + g,
                l[o + 1] = x * d + v * m + f,
                l[o + 2] = e[u],
                l[o + 3] = e[u + 1],
                _[o + 4] = r,
                _[o + 5] = 255,
                o += 6,
                u += 2
            }
            a.setNeedUpload();
            var y = this.vertNum
              , s = i.length
              , a = n.needSize(i.byteLength)
              , E = n.getUint16Array()
              , a = a >> 1;
            if (0 < y)
                for (var C = a + s, R = 0, T = a; T < C; T++,
                R++)
                    E[T] = i[R] + y;
            else
                E.set(i, a);
            n.setNeedUpload(),
            this.vertNum += h,
            this.indexNum += i.length
        }
        releaseMesh() {
            this._vb.setByteLength(0),
            this._ib.setByteLength(0),
            this.vertNum = 0,
            this.indexNum = 0,
            Vt._POOL.push(this)
        }
        destroy() {
            this._ib.destroy(),
            this._vb.destroy(),
            this._ib.disposeResource(),
            this._vb.deleteBuffer()
        }
    }
    Vt.const_stride = 24,
    Vt._POOL = [];
    class Xt extends Wt {
        constructor() {
            super(Xt.const_stride, 4, 4),
            this.canReuse = !0,
            this.setAttributes(Xt._fixattriInfo)
        }
        static __init__() {
            Xt._fixattriInfo = [5126, 2, 0, 5121, 4, 8]
        }
        static getAMesh(t) {
            var e = Xt._POOL.length ? Xt._POOL.pop() : new Xt;
            return t && e._vb._resizeBuffer(65536 * Xt.const_stride, !1),
            e
        }
        addVertAndIBToMesh(t, e, i, s) {
            for (var r = this._vb.needSize(e.length / 2 * Xt.const_stride) >> 2, a = this._vb._floatArray32 || this._vb.getFloat32Array(), n = this._vb._uint32Array, h = 0, o = e.length / 2, l = 0; l < o; l++)
                a[r++] = e[h],
                a[r++] = e[h + 1],
                h += 2,
                n[r++] = i;
            this._vb.setNeedUpload(),
            this._ib.append(new Uint16Array(s)),
            this._ib.setNeedUpload(),
            this.vertNum += o,
            this.indexNum += s.length
        }
        releaseMesh() {
            this._vb.setByteLength(0),
            this._ib.setByteLength(0),
            this.vertNum = 0,
            this.indexNum = 0,
            Xt._POOL.push(this)
        }
        destroy() {
            this._ib.destroy(),
            this._vb.destroy(),
            this._ib.disposeResource(),
            this._vb.deleteBuffer()
        }
    }
    Xt.const_stride = 12,
    Xt._POOL = [];
    class Ht {
        constructor(t, e) {
            this.submitStartPos = 0,
            this.submitEndPos = 0,
            this.touches = [],
            this.submits = [],
            this.sprite = null,
            this.meshlist = [],
            this.cachedClipInfo = new y,
            this.oldTx = 0,
            this.oldTy = 0,
            this.invMat = new y,
            this.context = t,
            this.sprite = e,
            t._globalClipMatrix.copyTo(this.cachedClipInfo)
        }
        startRec() {
            let t = this.context;
            t._charSubmitCache && t._charSubmitCache._enable && (t._charSubmitCache.enable(!1, t),
            t._charSubmitCache.enable(!0, t)),
            t._incache = !0,
            this.touches.length = 0,
            t.touches = this.touches,
            t._globalClipMatrix.copyTo(this.cachedClipInfo),
            this.submits.length = 0,
            this.submitStartPos = t._submits._length;
            for (var e = 0, i = this.meshlist.length; e < i; e++) {
                var s = this.meshlist[e];
                s.canReuse ? s.releaseMesh() : s.destroy()
            }
            this.meshlist.length = 0,
            this._mesh = Yt.getAMesh(!1),
            this._pathMesh = Xt.getAMesh(!1),
            this._triangleMesh = Vt.getAMesh(!1),
            this.meshlist.push(this._mesh),
            this.meshlist.push(this._pathMesh),
            this.meshlist.push(this._triangleMesh),
            t._curSubmit = w.RENDERBASE,
            this._oldMesh = t._mesh,
            this._oldPathMesh = t._pathMesh,
            this._oldTriMesh = t._triangleMesh,
            this._oldMeshList = t.meshlist,
            t._mesh = this._mesh,
            t._pathMesh = this._pathMesh,
            t._triangleMesh = this._triangleMesh,
            t.meshlist = this.meshlist,
            this.oldTx = t._curMat.tx,
            this.oldTy = t._curMat.ty,
            t._curMat.tx = 0,
            t._curMat.ty = 0,
            t._curMat.copyTo(this.invMat),
            this.invMat.invert()
        }
        endRec() {
            let t = this.context;
            t._charSubmitCache && t._charSubmitCache._enable && (t._charSubmitCache.enable(!1, t),
            t._charSubmitCache.enable(!0, t));
            for (var e = t._submits, i = (this.submitEndPos = e._length,
            this.submitEndPos - this.submitStartPos), s = 0; s < i; s++)
                this.submits.push(e[this.submitStartPos + s]);
            e._length -= i,
            t._mesh = this._oldMesh,
            t._pathMesh = this._oldPathMesh,
            t._triangleMesh = this._oldTriMesh,
            t.meshlist = this._oldMeshList,
            t._curSubmit = w.RENDERBASE,
            t._curMat.tx = this.oldTx,
            t._curMat.ty = this.oldTy,
            t.touches = null,
            t._incache = !1
        }
        isCacheValid() {
            var t = this.context._globalClipMatrix;
            return t.a == this.cachedClipInfo.a && t.b == this.cachedClipInfo.b && t.c == this.cachedClipInfo.c && t.d == this.cachedClipInfo.d && t.tx == this.cachedClipInfo.tx && t.ty == this.cachedClipInfo.ty
        }
        flushsubmit() {
            var e = w.RENDERBASE;
            this.submits.forEach(function(t) {
                t != w.RENDERBASE && (w.preRender = e,
                (e = t).renderSubmit())
            })
        }
        releaseMem() {}
    }
    Ht.matI = new y;
    class zt {
        constructor() {
            this.ALPHA = 1,
            this.defines = new b,
            this.shaderType = 0,
            this.fillStyle = St.DEFAULT,
            this.strokeStyle = St.DEFAULT
        }
        destroy() {
            this.defines = null,
            this.filters = null
        }
        static __init__() {
            _t.preCompile2D(0, b.TEXTURE2D, "/*\r\n\ttexture和fillrect使用的。\r\n*/\r\nattribute vec4 posuv;\r\nattribute vec4 attribColor;\r\nattribute vec4 attribFlags;\r\n//attribute vec4 clipDir;\r\n//attribute vec2 clipRect;\r\nuniform vec4 clipMatDir;\r\nuniform vec2 clipMatPos;\t\t// 这个是全局的，不用再应用矩阵了。\r\nvarying vec2 cliped;\r\nuniform vec2 size;\r\nuniform vec2 clipOff;\t\t\t// 使用要把clip偏移。cacheas normal用. 只用了[0]\r\n#ifdef WORLDMAT\r\n\tuniform mat4 mmat;\r\n#endif\r\n#ifdef MVP3D\r\n\tuniform mat4 u_MvpMatrix;\r\n#endif\r\nvarying vec4 v_texcoordAlpha;\r\nvarying vec4 v_color;\r\nvarying float v_useTex;\r\n\r\nvoid main() {\r\n\r\n\tvec4 pos = vec4(posuv.xy,0.,1.);\r\n#ifdef WORLDMAT\r\n\tpos=mmat*pos;\r\n#endif\r\n\tvec4 pos1  =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,0.,1.0);\r\n#ifdef MVP3D\r\n\tgl_Position=u_MvpMatrix*pos1;\r\n#else\r\n\tgl_Position=pos1;\r\n#endif\r\n\tv_texcoordAlpha.xy = posuv.zw;\r\n\t//v_texcoordAlpha.z = attribColor.a/255.0;\r\n\tv_color = attribColor/255.0;\r\n\tv_color.xyz*=v_color.w;//反正后面也要预乘\r\n\t\r\n\tv_useTex = attribFlags.r/255.0;\r\n\tfloat clipw = length(clipMatDir.xy);\r\n\tfloat cliph = length(clipMatDir.zw);\r\n\t\r\n\tvec2 clpos = clipMatPos.xy;\r\n\t#ifdef WORLDMAT\r\n\t\t// 如果有mmat，需要修改clipMatPos,因为 这是cacheas normal （如果不是就错了）， clipMatPos被去掉了偏移\r\n\t\tif(clipOff[0]>0.0){\r\n\t\t\tclpos.x+=mmat[3].x;\t//tx\t最简单处理\r\n\t\t\tclpos.y+=mmat[3].y;\t//ty\r\n\t\t}\r\n\t#endif\r\n\tvec2 clippos = pos.xy - clpos;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\r\n\tif(clipw>20000. && cliph>20000.)\r\n\t\tcliped = vec2(0.5,0.5);\r\n\telse {\r\n\t\t//转成0到1之间。/clipw/clipw 表示clippos与normalize之后的clip朝向点积之后，再除以clipw\r\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\r\n\t}\r\n\r\n}", "/*\r\n\ttexture和fillrect使用的。\r\n*/\r\n#if defined(GL_FRAGMENT_PRECISION_HIGH)// 原来的写法会被我们自己的解析流程处理，而我们的解析是不认内置宏的，导致被删掉，所以改成 if defined 了\r\nprecision highp float;\r\n#else\r\nprecision mediump float;\r\n#endif\r\n\r\nvarying vec4 v_texcoordAlpha;\r\nvarying vec4 v_color;\r\nvarying float v_useTex;\r\nuniform sampler2D texture;\r\nvarying vec2 cliped;\r\n\r\n#ifdef BLUR_FILTER\r\nuniform vec4 strength_sig2_2sig2_gauss1;//TODO模糊的过程中会导致变暗变亮  \r\nuniform vec2 blurInfo;\r\n\r\n#define PI 3.141593\r\n\r\nfloat getGaussian(float x, float y){\r\n    return strength_sig2_2sig2_gauss1.w*exp(-(x*x+y*y)/strength_sig2_2sig2_gauss1.z);\r\n}\r\n\r\nvec4 blur(){\r\n    const float blurw = 9.0;\r\n    vec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\r\n    vec2 halfsz=vec2(blurw,blurw)/2.0/blurInfo;    \r\n    vec2 startpos=v_texcoordAlpha.xy-halfsz;\r\n    vec2 ctexcoord = startpos;\r\n    vec2 step = 1.0/blurInfo;  //每个像素      \r\n    \r\n    for(float y = 0.0;y<=blurw; ++y){\r\n        ctexcoord.x=startpos.x;\r\n        for(float x = 0.0;x<=blurw; ++x){\r\n            //TODO 纹理坐标的固定偏移应该在vs中处理\r\n            vec4Color += texture2D(texture, ctexcoord)*getGaussian(x-blurw/2.0,y-blurw/2.0);\r\n            ctexcoord.x+=step.x;\r\n        }\r\n        ctexcoord.y+=step.y;\r\n    }\r\n    vec4Color.w=1.0;\r\n    return vec4Color;\r\n}\r\n#endif\r\n\r\n#ifdef COLOR_FILTER\r\nuniform vec4 colorAlpha;\r\nuniform mat4 colorMat;\r\n#endif\r\n\r\n#ifdef GLOW_FILTER\r\nuniform vec4 u_color;\r\nuniform vec4 u_blurInfo1;\r\nuniform vec4 u_blurInfo2;\r\n#endif\r\n\r\n#ifdef COLOR_ADD\r\nuniform vec4 colorAdd;\r\n#endif\r\n\r\n#ifdef FILLTEXTURE\t\r\nuniform vec4 u_TexRange;//startu,startv,urange, vrange\r\n#endif\r\nvoid main() {\r\n\tif(cliped.x<0.) discard;\r\n\tif(cliped.x>1.) discard;\r\n\tif(cliped.y<0.) discard;\r\n\tif(cliped.y>1.) discard;\r\n\t\r\n#ifdef FILLTEXTURE\t\r\n   vec4 color= texture2D(texture, fract(v_texcoordAlpha.xy)*u_TexRange.zw + u_TexRange.xy);\r\n#else\r\n   vec4 color= texture2D(texture, v_texcoordAlpha.xy);\r\n#endif\r\n\r\n   if(v_useTex<=0.)color = vec4(1.,1.,1.,1.);\r\n   color.a*=v_color.w;\r\n   //color.rgb*=v_color.w;\r\n   color.rgb*=v_color.rgb;\r\n   gl_FragColor=color;\r\n   \r\n   #ifdef COLOR_ADD\r\n\tgl_FragColor = vec4(colorAdd.rgb,colorAdd.a*gl_FragColor.a);\r\n\tgl_FragColor.xyz *= colorAdd.a;\r\n   #endif\r\n   \r\n   #ifdef BLUR_FILTER\r\n\tgl_FragColor =   blur();\r\n\tgl_FragColor.w*=v_color.w;   \r\n   #endif\r\n   \r\n   #ifdef COLOR_FILTER\r\n\tmat4 alphaMat =colorMat;\r\n\r\n\talphaMat[0][3] *= gl_FragColor.a;\r\n\talphaMat[1][3] *= gl_FragColor.a;\r\n\talphaMat[2][3] *= gl_FragColor.a;\r\n\r\n\tgl_FragColor = gl_FragColor * alphaMat;\r\n\tgl_FragColor += colorAlpha/255.0*gl_FragColor.a;\r\n   #endif\r\n   \r\n   #ifdef GLOW_FILTER\r\n\tconst float c_IterationTime = 10.0;\r\n\tfloat floatIterationTotalTime = c_IterationTime * c_IterationTime;\r\n\tvec4 vec4Color = vec4(0.0,0.0,0.0,0.0);\r\n\tvec2 vec2FilterDir = vec2(-(u_blurInfo1.z)/u_blurInfo2.x,-(u_blurInfo1.w)/u_blurInfo2.y);\r\n\tvec2 vec2FilterOff = vec2(u_blurInfo1.x/u_blurInfo2.x/c_IterationTime * 2.0,u_blurInfo1.y/u_blurInfo2.y/c_IterationTime * 2.0);\r\n\tfloat maxNum = u_blurInfo1.x * u_blurInfo1.y;\r\n\tvec2 vec2Off = vec2(0.0,0.0);\r\n\tfloat floatOff = c_IterationTime/2.0;\r\n\tfor(float i = 0.0;i<=c_IterationTime; ++i){\r\n\t\tfor(float j = 0.0;j<=c_IterationTime; ++j){\r\n\t\t\tvec2Off = vec2(vec2FilterOff.x * (i - floatOff),vec2FilterOff.y * (j - floatOff));\r\n\t\t\tvec4Color += texture2D(texture, v_texcoordAlpha.xy + vec2FilterDir + vec2Off)/floatIterationTotalTime;\r\n\t\t}\r\n\t}\r\n\tgl_FragColor = vec4(u_color.rgb,vec4Color.a * u_blurInfo2.z);\r\n\tgl_FragColor.rgb *= gl_FragColor.a;   \r\n   #endif\r\n   \r\n}", null),
            _t.preCompile2D(0, b.PRIMITIVE, "attribute vec4 position;\r\nattribute vec4 attribColor;\r\n//attribute vec4 clipDir;\r\n//attribute vec2 clipRect;\r\nuniform vec4 clipMatDir;\r\nuniform vec2 clipMatPos;\r\n#ifdef WORLDMAT\r\n\tuniform mat4 mmat;\r\n#endif\r\nuniform mat4 u_mmat2;\r\n//uniform vec2 u_pos;\r\nuniform vec2 size;\r\nvarying vec4 color;\r\n//vec4 dirxy=vec4(0.9,0.1, -0.1,0.9);\r\n//vec4 clip=vec4(100.,30.,300.,600.);\r\nvarying vec2 cliped;\r\nvoid main(){\r\n\t\r\n#ifdef WORLDMAT\r\n\tvec4 pos=mmat*vec4(position.xy,0.,1.);\r\n\tgl_Position =vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\r\n#else\r\n\tgl_Position =vec4((position.x/size.x-0.5)*2.0,(0.5-position.y/size.y)*2.0,position.z,1.0);\r\n#endif\t\r\n\tfloat clipw = length(clipMatDir.xy);\r\n\tfloat cliph = length(clipMatDir.zw);\r\n\tvec2 clippos = position.xy - clipMatPos.xy;\t//pos已经应用矩阵了，为了减的有意义，clip的位置也要缩放\r\n\tif(clipw>20000. && cliph>20000.)\r\n\t\tcliped = vec2(0.5,0.5);\r\n\telse {\r\n\t\t//clipdir是带缩放的方向，由于上面clippos是在缩放后的空间计算的，所以需要把方向先normalize一下\r\n\t\tcliped=vec2( dot(clippos,clipMatDir.xy)/clipw/clipw, dot(clippos,clipMatDir.zw)/cliph/cliph);\r\n\t}\r\n  //pos2d.x = dot(clippos,dirx);\r\n  color=attribColor/255.;\r\n}", "precision mediump float;\r\n//precision mediump float;\r\nvarying vec4 color;\r\n//uniform float alpha;\r\nvarying vec2 cliped;\r\nvoid main(){\r\n\t//vec4 a=vec4(color.r, color.g, color.b, 1);\r\n\t//a.a*=alpha;\r\n    gl_FragColor= color;// vec4(color.r, color.g, color.b, alpha);\r\n\tgl_FragColor.rgb*=color.a;\r\n\tif(cliped.x<0.) discard;\r\n\tif(cliped.x>1.) discard;\r\n\tif(cliped.y<0.) discard;\r\n\tif(cliped.y>1.) discard;\r\n}", null),
            _t.preCompile2D(0, b.SKINMESH, "attribute vec2 position;\r\nattribute vec2 texcoord;\r\nattribute vec4 color;\r\nuniform vec2 size;\r\nuniform float offsetX;\r\nuniform float offsetY;\r\nuniform mat4 mmat;\r\nuniform mat4 u_mmat2;\r\nvarying vec2 v_texcoord;\r\nvarying vec4 v_color;\r\nvoid main() {\r\n  vec4 pos=mmat*u_mmat2*vec4(offsetX+position.x,offsetY+position.y,0,1 );\r\n  gl_Position = vec4((pos.x/size.x-0.5)*2.0,(0.5-pos.y/size.y)*2.0,pos.z,1.0);\r\n  v_color = color;\r\n  v_color.rgb *= v_color.a;\r\n  v_texcoord = texcoord;  \r\n}", "precision mediump float;\r\nvarying vec2 v_texcoord;\r\nvarying vec4 v_color;\r\nuniform sampler2D texture;\r\nuniform float alpha;\r\nvoid main() {\r\n\tvec4 t_color = texture2D(texture, v_texcoord);\r\n\tgl_FragColor = t_color.rgba * v_color;\r\n\tgl_FragColor *= alpha;\r\n}", null)
        }
    }
    class Kt {
        constructor() {
            var t = d.instance;
            this.ib = Gt.create(t.DYNAMIC_DRAW),
            this.vb = kt.create(8)
        }
        static getInstance() {
            return Kt.instance = Kt.instance || new Kt
        }
        addSkinMesh(t) {
            t.getData2(this.vb, this.ib, this.vb._byteLength / 32)
        }
        reset() {
            this.vb.clear(),
            this.ib.clear()
        }
    }
    class jt {
        static createLine2(t, e, i, s, r, a) {
            if (t.length < 4)
                return null;
            for (var n = jt.tempData.length > t.length + 2 ? jt.tempData : new Array(t.length + 2), h = (n[0] = t[0],
            n[1] = t[1],
            2), o = 0, l = t.length, o = 2; o < l; o += 2)
                .01 < Math.abs(t[o] - t[o - 2]) + Math.abs(t[o + 1] - t[o - 1]) && (n[h++] = t[o],
                n[h++] = t[o + 1]);
            a && .01 < Math.abs(t[0] - n[h - 2]) + Math.abs(t[1] - n[h - 1]) && (n[h++] = t[0],
            n[h++] = t[1]);
            var _, u, c, d, p, m, g, f = r, l = h / 2, T = i / 2, x = n[0], v = n[1], y = n[2], E = n[3], C = -(v - E), R = x - y, A = Math.sqrt(C * C + R * R);
            for (f.push(x - (C = C / A * T), v - (R = R / A * T), x + C, v + R),
            o = 1; o < l - 1; o++)
                x = n[2 * (o - 1)],
                v = n[2 * (o - 1) + 1],
                y = n[2 * o],
                E = n[2 * o + 1],
                d = n[2 * (o + 1)],
                u = n[2 * (o + 1) + 1],
                R = x - y,
                g = y - d,
                c = (-(C = (C = -(v - E)) / (A = Math.sqrt(C * C + R * R)) * T) + x) * (-(R = R / A * T) + E) - (-C + y) * (-R + v),
                m = (-(p = (p = -(E - u)) / (A = Math.sqrt(p * p + g * g)) * T) + d) * (-(g = g / A * T) + E) - (-p + y) * (-g + u),
                g = (_ = -R + v - (-R + E)) * (p = -p + y - (-p + d)) - (d = -g + u - (-g + E)) * (u = -C + y - (-C + x)),
                Math.abs(g) < .1 ? (g += 10.1,
                f.push(y - C, E - R, y + C, E + R)) : f.push(u = (u * m - p * c) / g, p = (d * c - _ * m) / g, y - (u - y), E - (p - E));
            for (x = n[h - 4],
            v = n[h - 3],
            y = n[h - 2],
            C = -(v - (E = n[h - 1])),
            R = x - y,
            A = Math.sqrt(C * C + R * R),
            f.push(y - (C = C / A * T), E - (R = R / A * T), y + C, E + R),
            o = 1; o < l; o++)
                e.push(s + 2 * (o - 1), s + 2 * (o - 1) + 1, s + 2 * o + 1, s + 2 * o + 1, s + 2 * o, s + 2 * (o - 1));
            return f
        }
        static createLineTriangle(t, e, i, s, r, a, n) {
            var h = t.slice()
              , t = h.length
              , o = h[0]
              , l = h[1]
              , _ = h[2]
              , u = (h[2],
            0)
              , c = 0
              , d = 0
              , p = 0
              , m = t / 2;
            if (!(m <= 1) && 2 != m) {
                for (var g = new Array(4 * m), f = 0, T = 0, x = 0; x < m - 1; x++)
                    o = h[T++],
                    l = h[T++],
                    _ = h[T++],
                    p = h[T++] - l,
                    0 != (d = _ - o) && 0 != p && .001 < (u = Math.sqrt(d * d + p * p)) && (g[c = 4 * f] = o,
                    g[c + 1] = l,
                    g[c + 2] = d / u,
                    g[c + 3] = p / u,
                    f++);
                for (s ? (o = h[t - 2],
                l = h[t - 1],
                _ = h[0],
                p = h[1] - l,
                0 != (d = _ - o) && 0 != p && .001 < (u = Math.sqrt(d * d + p * p)) && (g[c = 4 * f] = o,
                g[c + 1] = l,
                g[c + 2] = d / u,
                g[c + 3] = p / u,
                f++)) : (g[c = 4 * f] = o,
                g[c + 1] = l,
                g[c + 2] = d / u,
                g[c + 3] = p / u,
                f++),
                x = T = 0; x < m; x++)
                    o = h[T],
                    l = h[T + 1],
                    _ = h[T + 2],
                    h[T + 3]
            }
        }
    }
    jt.tempData = new Array(256);
    class qt {
        constructor(t, e, i) {
            this.i = t,
            this.x = e,
            this.y = i,
            this.prev = null,
            this.next = null,
            this.z = null,
            this.prevZ = null,
            this.nextZ = null,
            this.steiner = !1
        }
    }
    class M {
        static earcut(t, e, i) {
            i = i || 2;
            var s, r, a, n, h, o = e && e.length, l = o ? e[0] * i : t.length, _ = M.linkedList(t, 0, l, i, !0), u = [];
            if (!_)
                return u;
            if (o && (_ = M.eliminateHoles(t, e, _, i)),
            t.length > 80 * i) {
                for (var c = s = t[0], d = r = t[1], p = i; p < l; p += i)
                    (a = t[p]) < c && (c = a),
                    (n = t[p + 1]) < d && (d = n),
                    s < a && (s = a),
                    r < n && (r = n);
                h = 0 !== (h = Math.max(s - c, r - d)) ? 1 / h : 0
            }
            return M.earcutLinked(_, u, i, c, d, h),
            u
        }
        static linkedList(t, e, i, s, r) {
            var a, n;
            if (r === 0 < M.signedArea(t, e, i, s))
                for (a = e; a < i; a += s)
                    n = M.insertNode(a, t[a], t[a + 1], n);
            else
                for (a = i - s; e <= a; a -= s)
                    n = M.insertNode(a, t[a], t[a + 1], n);
            return n && M.equals(n, n.next) && (M.removeNode(n),
            n = n.next),
            n
        }
        static filterPoints(t, e) {
            if (!t)
                return t;
            e = e || t;
            var i, s = t;
            do {
                if (i = !1,
                s.steiner || !M.equals(s, s.next) && 0 !== M.area(s.prev, s, s.next))
                    s = s.next;
                else {
                    if (M.removeNode(s),
                    (s = e = s.prev) === s.next)
                        break;
                    i = !0
                }
            } while (i || s !== e);
            return e
        }
        static earcutLinked(t, e, i, s, r, a, n=null) {
            if (t) {
                !n && a && M.indexCurve(t, s, r, a);
                for (var h, o, l = t; t.prev !== t.next; )
                    if (h = t.prev,
                    o = t.next,
                    a ? M.isEarHashed(t, s, r, a) : M.isEar(t))
                        e.push(h.i / i),
                        e.push(t.i / i),
                        e.push(o.i / i),
                        M.removeNode(t),
                        t = o.next,
                        l = o.next;
                    else if ((t = o) === l) {
                        n ? 1 === n ? (t = M.cureLocalIntersections(t, e, i),
                        M.earcutLinked(t, e, i, s, r, a, 2)) : 2 === n && M.splitEarcut(t, e, i, s, r, a) : M.earcutLinked(M.filterPoints(t, null), e, i, s, r, a, 1);
                        break
                    }
            }
        }
        static isEar(t) {
            var e = t.prev
              , i = t
              , s = t.next;
            if (0 <= M.area(e, i, s))
                return !1;
            for (var r = t.next.next; r !== t.prev; ) {
                if (M.pointInTriangle(e.x, e.y, i.x, i.y, s.x, s.y, r.x, r.y) && 0 <= M.area(r.prev, r, r.next))
                    return !1;
                r = r.next
            }
            return !0
        }
        static isEarHashed(t, e, i, s) {
            var r = t.prev
              , a = t
              , n = t.next;
            if (0 <= M.area(r, a, n))
                return !1;
            for (var h = (r.x < a.x ? r.x < n.x ? r : n : a.x < n.x ? a : n).x, o = (r.y < a.y ? r.y < n.y ? r : n : a.y < n.y ? a : n).y, l = (r.x > a.x ? r.x > n.x ? r : n : a.x > n.x ? a : n).x, _ = (r.y > a.y ? r.y > n.y ? r : n : a.y > n.y ? a : n).y, u = M.zOrder(h, o, e, i, s), c = M.zOrder(l, _, e, i, s), d = t.nextZ; d && d.z <= c; ) {
                if (d !== t.prev && d !== t.next && M.pointInTriangle(r.x, r.y, a.x, a.y, n.x, n.y, d.x, d.y) && 0 <= M.area(d.prev, d, d.next))
                    return !1;
                d = d.nextZ
            }
            for (d = t.prevZ; d && d.z >= u; ) {
                if (d !== t.prev && d !== t.next && M.pointInTriangle(r.x, r.y, a.x, a.y, n.x, n.y, d.x, d.y) && 0 <= M.area(d.prev, d, d.next))
                    return !1;
                d = d.prevZ
            }
            return !0
        }
        static cureLocalIntersections(t, e, i) {
            var s = t;
            do {
                var r = s.prev
                  , a = s.next.next
            } while (!M.equals(r, a) && M.intersects(r, s, s.next, a) && M.locallyInside(r, a) && M.locallyInside(a, r) && (e.push(r.i / i),
            e.push(s.i / i),
            e.push(a.i / i),
            M.removeNode(s),
            M.removeNode(s.next),
            s = t = a),
            (s = s.next) !== t);
            return s
        }
        static splitEarcut(t, e, i, s, r, a) {
            var n = t;
            do {
                for (var h, o = n.next.next; o !== n.prev; ) {
                    if (n.i !== o.i && M.isValidDiagonal(n, o))
                        return h = M.splitPolygon(n, o),
                        n = M.filterPoints(n, n.next),
                        h = M.filterPoints(h, h.next),
                        M.earcutLinked(n, e, i, s, r, a),
                        void M.earcutLinked(h, e, i, s, r, a);
                    o = o.next
                }
            } while ((n = n.next) !== t)
        }
        static eliminateHoles(t, e, i, s) {
            for (var r, a, n = [], h = 0, o = e.length; h < o; h++)
                a = e[h] * s,
                r = h < o - 1 ? e[h + 1] * s : t.length,
                (a = M.linkedList(t, a, r, s, !1)) === a.next && (a.steiner = !0),
                n.push(M.getLeftmost(a));
            for (n.sort(M.compareX),
            h = 0; h < n.length; h++)
                M.eliminateHole(n[h], i),
                i = M.filterPoints(i, i.next);
            return i
        }
        static compareX(t, e) {
            return t.x - e.x
        }
        static eliminateHole(t, e) {
            (e = M.findHoleBridge(t, e)) && (e = M.splitPolygon(e, t),
            M.filterPoints(e, e.next))
        }
        static findHoleBridge(t, e) {
            var i, s = e, r = t.x, a = t.y, n = -1 / 0;
            do {
                if (a <= s.y && a >= s.next.y && s.next.y !== s.y) {
                    var h = s.x + (a - s.y) * (s.next.x - s.x) / (s.next.y - s.y);
                    if (h <= r && n < h) {
                        if ((n = h) === r) {
                            if (a === s.y)
                                return s;
                            if (a === s.next.y)
                                return s.next
                        }
                        i = s.x < s.next.x ? s : s.next
                    }
                }
            } while ((s = s.next) !== e);
            if (!i)
                return null;
            if (r === n)
                return i.prev;
            for (var o, l = i, _ = i.x, u = i.y, c = 1 / 0, s = i.next; s !== l; )
                r >= s.x && s.x >= _ && r !== s.x && M.pointInTriangle(a < u ? r : n, a, _, u, a < u ? n : r, a, s.x, s.y) && ((o = Math.abs(a - s.y) / (r - s.x)) < c || o === c && s.x > i.x) && M.locallyInside(s, t) && (i = s,
                c = o),
                s = s.next;
            return i
        }
        static indexCurve(t, e, i, s) {
            for (var r = t; null === r.z && (r.z = M.zOrder(r.x, r.y, e, i, s)),
            r.prevZ = r.prev,
            r.nextZ = r.next,
            (r = r.next) !== t; )
                ;
            r.prevZ.nextZ = null,
            r.prevZ = null,
            M.sortLinked(r)
        }
        static sortLinked(t) {
            var e, i, s, r, a, n, h, o, l = 1;
            do {
                for (i = t,
                a = t = null,
                n = 0; i; ) {
                    for (n++,
                    s = i,
                    e = h = 0; e < l && (h++,
                    s = s.nextZ); e++)
                        ;
                    for (o = l; 0 < h || 0 < o && s; )
                        0 !== h && (0 === o || !s || i.z <= s.z) ? (i = (r = i).nextZ,
                        h--) : (s = (r = s).nextZ,
                        o--),
                        a ? a.nextZ = r : t = r,
                        r.prevZ = a,
                        a = r;
                    i = s
                }
            } while (a.nextZ = null,
            l *= 2,
            1 < n);
            return t
        }
        static zOrder(t, e, i, s, r) {
            return (t = 1431655765 & ((t = 858993459 & ((t = 252645135 & ((t = 16711935 & ((t = 32767 * (t - i) * r) | t << 8)) | t << 4)) | t << 2)) | t << 1)) | (e = 1431655765 & ((e = 858993459 & ((e = 252645135 & ((e = 16711935 & ((e = 32767 * (e - s) * r) | e << 8)) | e << 4)) | e << 2)) | e << 1)) << 1
        }
        static getLeftmost(t) {
            for (var e = t, i = t; e.x < i.x && (i = e),
            (e = e.next) !== t; )
                ;
            return i
        }
        static pointInTriangle(t, e, i, s, r, a, n, h) {
            return 0 <= (r - n) * (e - h) - (t - n) * (a - h) && 0 <= (t - n) * (s - h) - (i - n) * (e - h) && 0 <= (i - n) * (a - h) - (r - n) * (s - h)
        }
        static isValidDiagonal(t, e) {
            return t.next.i !== e.i && t.prev.i !== e.i && !M.intersectsPolygon(t, e) && M.locallyInside(t, e) && M.locallyInside(e, t) && M.middleInside(t, e)
        }
        static area(t, e, i) {
            return (e.y - t.y) * (i.x - e.x) - (e.x - t.x) * (i.y - e.y)
        }
        static equals(t, e) {
            return t.x === e.x && t.y === e.y
        }
        static intersects(t, e, i, s) {
            return !!(M.equals(t, e) && M.equals(i, s) || M.equals(t, s) && M.equals(i, e)) || 0 < M.area(t, e, i) != 0 < M.area(t, e, s) && 0 < M.area(i, s, t) != 0 < M.area(i, s, e)
        }
        static intersectsPolygon(t, e) {
            var i = t;
            do {
                if (i.i !== t.i && i.next.i !== t.i && i.i !== e.i && i.next.i !== e.i && M.intersects(i, i.next, t, e))
                    return !0
            } while ((i = i.next) !== t);
            return !1
        }
        static locallyInside(t, e) {
            return M.area(t.prev, t, t.next) < 0 ? 0 <= M.area(t, e, t.next) && 0 <= M.area(t, t.prev, e) : M.area(t, e, t.prev) < 0 || M.area(t, t.next, e) < 0
        }
        static middleInside(t, e) {
            for (var i = t, s = !1, r = (t.x + e.x) / 2, a = (t.y + e.y) / 2; i.y > a != i.next.y > a && i.next.y !== i.y && r < (i.next.x - i.x) * (a - i.y) / (i.next.y - i.y) + i.x && (s = !s),
            (i = i.next) !== t; )
                ;
            return s
        }
        static splitPolygon(t, e) {
            var i = new qt(t.i,t.x,t.y)
              , s = new qt(e.i,e.x,e.y)
              , r = t.next
              , a = e.prev;
            return (t.next = e).prev = t,
            (i.next = r).prev = i,
            (s.next = i).prev = s,
            (a.next = s).prev = a,
            s
        }
        static insertNode(t, e, i, s) {
            t = new qt(t,e,i);
            return s ? (t.next = s.next,
            (t.prev = s).next.prev = t,
            s.next = t) : (t.prev = t).next = t,
            t
        }
        static removeNode(t) {
            t.next.prev = t.prev,
            t.prev.next = t.next,
            t.prevZ && (t.prevZ.nextZ = t.nextZ),
            t.nextZ && (t.nextZ.prevZ = t.prevZ)
        }
        static signedArea(t, e, i, s) {
            for (var r = 0, a = e, n = i - s; a < i; a += s)
                r += (t[n] - t[a]) * (t[a + 1] + t[n + 1]),
                n = a;
            return r
        }
    }
    class Zt {
    }
    Zt.BYTES_PE = 4,
    Zt.BYTES_PIDX = 2,
    Zt.defaultMatrix4 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    Zt.defaultMinusYMatrix4 = [1, 0, 0, 0, 0, -1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    Zt.uniformMatrix3 = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    Zt._TMPARRAY = [],
    Zt._OFFSETX = 0,
    Zt._OFFSETY = 0;
    class Qt extends w {
        constructor(t=w.TYPE_2D) {
            super(t)
        }
        renderSubmit() {
            if (0 === this._numEle || !this._mesh || 0 == this._numEle)
                return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                t = t._getSource();
                if (!t)
                    return 1;
                this.shaderValue.texture = t
            }
            t = m.mainContext;
            return this._mesh.useMesh(t),
            this.shaderValue.upload(),
            A.activeBlendFunction !== this._blendFn && (m.setBlend(t, !0),
            this._blendFn(t),
            A.activeBlendFunction = this._blendFn),
            t.drawElements(t.TRIANGLES, this._numEle, t.UNSIGNED_SHORT, this._startIdx),
            g.renderBatches++,
            g.trianglesFaces += this._numEle / 3,
            1
        }
        releaseRender() {
            w.RENDERBASE != this && --this._ref < 1 && ((Qt.POOL[Qt._poolSize++] = this).shaderValue.release(),
            this.shaderValue = null,
            this._mesh = null,
            this._parent && (this._parent.releaseRender(),
            this._parent = null))
        }
        static create(t, e, i) {
            var s = Qt._poolSize ? Qt.POOL[--Qt._poolSize] : new Qt
              , e = (s._ref = 1,
            s._mesh = e,
            s._key.clear(),
            s._startIdx = e.indexNum * Zt.BYTES_PIDX,
            s._numEle = 0,
            t._nBlendType)
              , e = (s._blendFn = (t._targets ? A.targetFns : A.fns)[e],
            s.shaderValue = i,
            s.shaderValue.setValue(t._shader2D),
            t._shader2D.filters);
            return e && s.shaderValue.setFilters(e),
            s
        }
        static createShape(t, e, i, s) {
            var r = Qt._poolSize ? Qt.POOL[--Qt._poolSize] : new Qt
              , i = (r._mesh = e,
            r._numEle = i,
            r._startIdx = 2 * e.indexNum,
            r._ref = 1,
            r.shaderValue = s,
            r.shaderValue.setValue(t._shader2D),
            t._nBlendType);
            return r._key.blendShader = i,
            r._blendFn = (t._targets ? A.targetFns : A.fns)[i],
            r
        }
    }
    Qt._poolSize = 0,
    Qt.POOL = [];
    class $t extends w {
        constructor() {
            super(w.TYPE_2D),
            this._matrix = new y,
            this._matrix4 = Zt.defaultMatrix4.concat(),
            this.shaderValue = new ct(0,0)
        }
        static create(t, e, i) {
            var s = $t.POOL._length ? $t.POOL[--$t.POOL._length] : new $t
              , t = (s.canv = t,
            s._ref = 1,
            s._numEle = 0,
            s.shaderValue);
            return t.alpha = e,
            t.defines.setValue(0),
            i && i.length && t.setFilters(i),
            s
        }
        renderSubmit() {
            var t = l.worldAlpha
              , e = l.worldMatrix4
              , i = l.worldMatrix
              , s = l.worldFilters
              , r = l.worldShaderDefines
              , a = this.shaderValue
              , n = this._matrix
              , h = this._matrix4
              , o = y.TEMP;
            return y.mul(n, i, o),
            h[0] = o.a,
            h[1] = o.b,
            h[4] = o.c,
            h[5] = o.d,
            h[12] = o.tx,
            h[13] = o.ty,
            l.worldMatrix = o.clone(),
            l.worldMatrix4 = h,
            l.worldAlpha = l.worldAlpha * a.alpha,
            a.filters && a.filters.length && (l.worldFilters = a.filters,
            l.worldShaderDefines = a.defines),
            this.canv.flushsubmit(),
            l.worldAlpha = t,
            l.worldMatrix4 = e,
            l.worldMatrix.destroy(),
            l.worldMatrix = i,
            l.worldFilters = s,
            l.worldShaderDefines = r,
            1
        }
        releaseRender() {
            var t;
            --this._ref < 1 && (t = $t.POOL,
            this._mesh = null,
            t[t._length++] = this)
        }
        getRenderType() {
            return w.TYPE_CANVAS
        }
    }
    $t.POOL = [],
    $t.POOL._length = 0;
    class Jt {
        constructor() {
            this.blendType = 0,
            this._ref = 1,
            this._key = new dt
        }
        renderSubmit() {
            var t = m.mainContext
              , e = (this._mesh.useMesh(t),
            this.srcRT);
            return e && (this.shaderValue.texture = e._getSource(),
            this.shaderValue.upload(),
            this.blend(),
            g.renderBatches++,
            g.trianglesFaces += this._numEle / 3,
            t.drawElements(t.TRIANGLES, this._numEle, t.UNSIGNED_SHORT, this._startIdx)),
            1
        }
        blend() {
            var t;
            A.activeBlendFunction !== A.fns[this.blendType] && ((t = m.mainContext).enable(t.BLEND),
            A.fns[this.blendType](t),
            A.activeBlendFunction = A.fns[this.blendType])
        }
        getRenderType() {
            return 0
        }
        releaseRender() {
            var t;
            --this._ref < 1 && ((t = Jt.POOL)[t._length++] = this)
        }
        static create(t, e, i, s) {
            var r = Jt.POOL._length ? Jt.POOL[--Jt.POOL._length] : new Jt;
            return r._mesh = e,
            r.srcRT = s,
            r._startIdx = e.indexNum * Zt.BYTES_PIDX,
            r._ref = 1,
            r._key.clear(),
            r._numEle = 0,
            r.blendType = t._nBlendType,
            r._key.blendShader = r.blendType,
            r.shaderValue = i,
            r.shaderValue.setValue(t._shader2D),
            t._colorFiler && (s = t._colorFiler,
            i.defines.add(s.type),
            i.colorMat = s._mat,
            i.colorAlpha = s._alpha),
            r
        }
    }
    Jt.POOL = [],
    Jt.POOL._length = 0;
    class te extends w {
        constructor(t=w.TYPE_2D) {
            super(t)
        }
        releaseRender() {
            --this._ref < 1 && ((te.POOL[te._poolSize++] = this).shaderValue.release(),
            this._mesh = null,
            this._parent && (this._parent.releaseRender(),
            this._parent = null))
        }
        renderSubmit() {
            if (0 === this._numEle)
                return 1;
            var t = this.shaderValue.textureHost;
            if (t) {
                var e = t ? t._getSource() : null;
                if (!e)
                    return 1
            }
            var t = m.mainContext
              , i = (this._mesh.useMesh(t),
            w.preRender)
              , s = w.preRender._key;
            return 0 === this._key.blendShader && this._key.submitType === s.submitType && this._key.blendShader === s.blendShader && at.activeShader && w.preRender.clipInfoID == this.clipInfoID && i.shaderValue.defines._value === this.shaderValue.defines._value && 0 == (this.shaderValue.defines._value & b.NOOPTMASK) ? at.activeShader.uploadTexture2D(e) : (A.activeBlendFunction !== this._blendFn && (m.setBlend(t, !0),
            this._blendFn(t),
            A.activeBlendFunction = this._blendFn),
            this.shaderValue.texture = e,
            this.shaderValue.upload()),
            t.drawElements(t.TRIANGLES, this._numEle, t.UNSIGNED_SHORT, this._startIdx),
            g.renderBatches++,
            g.trianglesFaces += this._numEle / 3,
            1
        }
        static create(t, e, i) {
            var s = te._poolSize ? te.POOL[--te._poolSize] : new te(w.TYPE_TEXTURE)
              , e = (s._mesh = e,
            s._key.clear(),
            s._key.submitType = w.KEY_DRAWTEXTURE,
            s._ref = 1,
            s._startIdx = e.indexNum * Zt.BYTES_PIDX,
            s._numEle = 0,
            t._nBlendType);
            return s._key.blendShader = e,
            s._blendFn = (t._targets ? A.targetFns : A.fns)[e],
            s.shaderValue = i,
            t._colorFiler && (e = t._colorFiler,
            i.defines.add(e.type),
            i.colorMat = e._mat,
            i.colorAlpha = e._alpha),
            s
        }
    }
    te._poolSize = 0,
    te.POOL = [];
    class ee {
        constructor() {
            this._data = [],
            this._ndata = 0,
            this._clipid = -1,
            this._clipMatrix = new y,
            this._enable = !1
        }
        clear() {
            this._tex = null,
            this._imgId = -1,
            this._ndata = 0,
            this._enable = !1,
            this._colorFiler = null
        }
        destroy() {
            this.clear(),
            this._data.length = 0,
            this._data = null
        }
        add(t, e, i, s, r, a) {
            0 < this._ndata && (this._tex != e || this._imgId != i || 0 <= this._clipid && this._clipid != t._clipInfoID) && this.submit(t),
            this._clipid = t._clipInfoID,
            t._globalClipMatrix.copyTo(this._clipMatrix),
            this._tex = e,
            this._imgId = i,
            this._colorFiler = t._colorFiler,
            this._data[this._ndata] = s,
            this._data[this._ndata + 1] = r,
            this._data[this._ndata + 2] = a,
            this._ndata += 3
        }
        getPos() {
            return 0 == ee.__nPosPool ? new Array(8) : ee.__posPool[--ee.__nPosPool]
        }
        enable(t, e) {
            t !== this._enable && (this._enable = t,
            this._enable || this.submit(e))
        }
        submit(t) {
            var e = this._ndata;
            if (e) {
                var i = t._mesh
                  , s = t._colorFiler
                  , r = (t._colorFiler = this._colorFiler,
                te.create(t, i, ct.create(b.TEXTURE2D, 0)));
                (t._submits[t._submits._length++] = t._curSubmit = r).shaderValue.textureHost = this._tex,
                r._key.other = this._imgId,
                t._colorFiler = s,
                t._copyClipInfo(r, this._clipMatrix),
                r.clipInfoID = this._clipid;
                for (var a = 0; a < e; a += 3)
                    i.addQuad(this._data[a], this._data[a + 1], this._data[a + 2], !0),
                    ee.__posPool[ee.__nPosPool++] = this._data[a];
                r._numEle += 6 * (e /= 3),
                i.indexNum += 6 * e,
                i.vertNum += 4 * e,
                t._drawCount += e,
                this._ndata = 0,
                Nt.loopCount % 100 == 0 && (this._data.length = 0)
            }
        }
    }
    ee.__posPool = [],
    ee.__nPosPool = 0;
    class ie {
        constructor(t=0, e=0, i=0) {
            this.atlasID = 0,
            this._width = 0,
            this._height = 0,
            this._texCount = 0,
            this._rowInfo = null,
            this._cells = null,
            this._used = 0,
            this._cells = null,
            this._rowInfo = null,
            this.atlasID = i,
            this._init(t, e)
        }
        addRect(t, e, i, s) {
            return !!this._get(e, i, s) && (this._fill(s.x, s.y, e, i, t),
            this._texCount++,
            !0)
        }
        _release() {
            this._cells = null,
            this._rowInfo = null
        }
        _init(t, e) {
            return this._width = t,
            this._height = e,
            this._release(),
            0 != this._width && (this._cells = new Uint8Array(this._width * this._height * 3),
            this._rowInfo = new Uint8Array(this._height),
            this._used = 0,
            this._clear(),
            !0)
        }
        _get(t, e, i) {
            if (t > this._width || e > this._height)
                return !1;
            for (var s = -1, r = this._width, a = this._height, n = this._cells, h = 0; h < a; h++)
                if (!(this._rowInfo[h] < t))
                    for (var o = 0; o < r; ) {
                        var l = 3 * (h * r + o);
                        if (0 != n[l] || n[1 + l] < t || n[2 + l] < e)
                            o += n[1 + l];
                        else {
                            for (var s = o, _ = h, u = 0; u < t; u++)
                                if (n[3 * u + l + 2] < e) {
                                    s = -1;
                                    break
                                }
                            if (!(s < 0))
                                return i.x = s,
                                i.y = _,
                                !0;
                            o += n[1 + l]
                        }
                    }
            return !1
        }
        _fill(t, e, i, s, r) {
            var a = this._width
              , n = this._height;
            this._check(t + i <= a && e + s <= n);
            for (var h = e; h < s + e; ++h) {
                this._check(this._rowInfo[h] >= i),
                this._rowInfo[h] -= i;
                for (var o = 0; o < i; o++) {
                    var l = 3 * (t + h * a + o);
                    this._check(0 == this._cells[l]),
                    this._cells[l] = r,
                    this._cells[1 + l] = i,
                    this._cells[2 + l] = s
                }
            }
            if (0 < t)
                for (h = 0; h < s; ++h) {
                    for (var _ = 0, o = t - 1; 0 <= o && 0 == this._cells[3 * ((e + h) * a + o)]; --o,
                    ++_)
                        ;
                    for (o = _; 0 < o; --o)
                        this._cells[3 * ((e + h) * a + t - o) + 1] = o,
                        this._check(0 < o)
                }
            if (0 < e)
                for (o = t; o < t + i; ++o) {
                    for (_ = 0,
                    h = e - 1; 0 <= h && 0 == this._cells[3 * (o + h * a)]; --h,
                    _++)
                        ;
                    for (h = _; 0 < h; --h)
                        this._cells[3 * (o + (e - h) * a) + 2] = h,
                        this._check(0 < h)
                }
            this._used += i * s / (this._width * this._height)
        }
        _check(t) {
            0 == t && console.log("xtexMerger 错误啦")
        }
        _clear() {
            for (var t = this._texCount = 0; t < this._height; t++)
                this._rowInfo[t] = this._width;
            for (var e = 0; e < this._height; e++)
                for (var i = 0; i < this._width; i++) {
                    var s = 3 * (e * this._width + i);
                    this._cells[s] = 0,
                    this._cells[1 + s] = this._width - i,
                    this._cells[2 + s] = this._width - e
                }
        }
    }
    class se extends J {
        constructor(t, e) {
            super(),
            this._texW = 0,
            this._texH = 0,
            this.__destroyed = !1,
            this._discardTm = 0,
            this.genID = 0,
            this.bitmap = {
                id: 0,
                _glTexture: null
            },
            this.curUsedCovRate = 0,
            this.curUsedCovRateAtlas = 0,
            this.lastTouchTm = 0,
            this.ri = null,
            this._texW = t || se.gTextRender.atlasWidth,
            this._texH = e || se.gTextRender.atlasWidth,
            this.bitmap.id = this.id,
            this.lock = !0
        }
        recreateResource() {
            var t, e;
            this._source || (t = d.instance,
            e = this._source = t.createTexture(),
            this.bitmap._glTexture = e,
            m.bindTexture(t, t.TEXTURE_2D, e),
            t.texImage2D(t.TEXTURE_2D, 0, t.RGBA, this._texW, this._texH, 0, t.RGBA, t.UNSIGNED_BYTE, null),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MIN_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_MAG_FILTER, t.LINEAR),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_S, t.CLAMP_TO_EDGE),
            t.texParameteri(t.TEXTURE_2D, t.TEXTURE_WRAP_T, t.CLAMP_TO_EDGE),
            se.gTextRender.debugUV && this.fillWhite())
        }
        addChar(t, e, i, s=null) {
            if (se.gTextRender.isWan1Wan)
                return this.addCharCanvas(t, e, i, s);
            this._source || this.recreateResource();
            var r = d.instance
              , a = (m.bindTexture(r, r.TEXTURE_2D, this._source),
            R.Render.isConchApp || r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
            t.data);
            return t.data instanceof Uint8ClampedArray && (a = new Uint8Array(a.buffer)),
            r.texSubImage2D(r.TEXTURE_2D, 0, e, i, t.width, t.height, r.RGBA, r.UNSIGNED_BYTE, a),
            R.Render.isConchApp || r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
            a = e / this._texW,
            r = i / this._texH,
            e = (e + t.width) / this._texW,
            i = (i + t.height) / this._texH,
            (s = s || new Array(8))[0] = a,
            s[1] = r,
            s[2] = e,
            s[3] = r,
            s[4] = e,
            s[5] = i,
            s[6] = a,
            s[7] = i,
            s
        }
        addCharCanvas(t, e, i, s=null) {
            this._source || this.recreateResource();
            var r, a, n, h = d.instance;
            return m.bindTexture(h, h.TEXTURE_2D, this._source),
            R.Render.isConchApp || h.pixelStorei(h.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !0),
            h.texSubImage2D(h.TEXTURE_2D, 0, e, i, h.RGBA, h.UNSIGNED_BYTE, t),
            R.Render.isConchApp || h.pixelStorei(h.UNPACK_PREMULTIPLY_ALPHA_WEBGL, !1),
            h = R.Render.isConchApp ? (r = e / this._texW,
            a = i / this._texH,
            n = (e + t.width) / this._texW,
            (i + t.height) / this._texH) : (r = (e + 1) / this._texW,
            a = (i + 1) / this._texH,
            n = (e + t.width - 1) / this._texW,
            (i + t.height - 1) / this._texH),
            (s = s || new Array(8))[0] = r,
            s[1] = a,
            s[2] = n,
            s[3] = a,
            s[4] = n,
            s[5] = h,
            s[6] = r,
            s[7] = h,
            s
        }
        fillWhite() {
            this._source || this.recreateResource();
            var t = d.instance
              , e = new Uint8Array(this._texW * this._texH * 4);
            e.fill(255),
            t.texSubImage2D(t.TEXTURE_2D, 0, 0, 0, this._texW, this._texH, t.RGBA, t.UNSIGNED_BYTE, e)
        }
        discard() {
            R.stage.setGlobalRepaint(),
            this.destroy()
        }
        static getTextTexture(t, e) {
            return new se(t,e)
        }
        destroy() {
            this.__destroyed = !0;
            var t = d.instance;
            this._source && t.deleteTexture(this._source),
            this._source = null
        }
        static clean() {
            var t = Nt.loopStTm;
            if (0 === se.cleanTm && (se.cleanTm = t),
            t - se.cleanTm >= se.gTextRender.checkCleanTextureDt) {
                for (var e = 0; e < se.poolLen; e++) {
                    var i = se.pool[e];
                    t - i._discardTm >= se.gTextRender.destroyUnusedTextureDt && (i.destroy(),
                    se.pool[e] = se.pool[se.poolLen - 1],
                    se.poolLen--,
                    e--)
                }
                se.cleanTm = t
            }
        }
        touchRect(t, e) {
            this.lastTouchTm != e && (this.curUsedCovRate = 0,
            this.curUsedCovRateAtlas = 0,
            this.lastTouchTm = e);
            var e = se.gTextRender.atlasWidth * se.gTextRender.atlasWidth
              , i = R.TextAtlas.atlasGridW * R.TextAtlas.atlasGridW;
            this.curUsedCovRate += t.bmpWidth * t.bmpHeight / e,
            this.curUsedCovRateAtlas += Math.ceil(t.bmpWidth / R.TextAtlas.atlasGridW) * Math.ceil(t.bmpHeight / R.TextAtlas.atlasGridW) / (e / i)
        }
        get texture() {
            return this
        }
        _getSource() {
            return this._source
        }
        drawOnScreen(t, e) {}
    }
    se.gTextRender = null,
    se.pool = new Array(10),
    se.poolLen = 0,
    se.cleanTm = 0;
    class re {
        constructor() {
            this.texWidth = 1024,
            this.texHeight = 1024,
            this.texture = null,
            this.charMaps = {},
            this.texHeight = this.texWidth = R.TextRender.atlasWidth,
            this.texture = se.getTextTexture(this.texWidth, this.texHeight),
            256 < this.texWidth / re.atlasGridW && (re.atlasGridW = Math.ceil(this.texWidth / 256)),
            this.atlasgrid = new ie(this.texWidth / re.atlasGridW,this.texHeight / re.atlasGridW,this.texture.id)
        }
        setProtecteDist(t) {}
        getAEmpty(t, e, i) {
            t = this.atlasgrid.addRect(1, Math.ceil(t / re.atlasGridW), Math.ceil(e / re.atlasGridW), i);
            return t && (i.x *= re.atlasGridW,
            i.y *= re.atlasGridW),
            t
        }
        get usedRate() {
            return this.atlasgrid._used
        }
        destroy() {
            for (var t in this.charMaps)
                this.charMaps[t].deleted = !0;
            this.texture.discard()
        }
        printDebugInfo() {}
    }
    re.atlasGridW = 16;
    class I {
        setTo(t, e, i) {
            return this.type = t,
            this.currentTarget = e,
            this.target = i,
            this
        }
        stopPropagation() {
            this._stoped = !0
        }
        get touches() {
            if (!this.nativeEvent)
                return null;
            var t = this.nativeEvent.touches;
            if (t)
                for (var e = R.stage, i = 0, s = t.length; i < s; i++) {
                    var r = t[i]
                      , a = q.TEMP;
                    a.setTo(r.clientX, r.clientY),
                    e._canvasTransform.invertTransformPoint(a),
                    e.transform.invertTransformPoint(a),
                    r.stageX = a.x,
                    r.stageY = a.y
                }
            return t
        }
        get altKey() {
            return this.nativeEvent.altKey
        }
        get ctrlKey() {
            return this.nativeEvent.ctrlKey
        }
        get shiftKey() {
            return this.nativeEvent.shiftKey
        }
        get charCode() {
            return this.nativeEvent.charCode
        }
        get keyLocation() {
            return this.nativeEvent.location || this.nativeEvent.keyLocation
        }
        get stageX() {
            return R.stage.mouseX
        }
        get stageY() {
            return R.stage.mouseY
        }
    }
    I.EMPTY = new I,
    I.MOUSE_DOWN = "mousedown",
    I.MOUSE_UP = "mouseup",
    I.CLICK = "click",
    I.RIGHT_MOUSE_DOWN = "rightmousedown",
    I.RIGHT_MOUSE_UP = "rightmouseup",
    I.RIGHT_CLICK = "rightclick",
    I.MOUSE_MOVE = "mousemove",
    I.MOUSE_OVER = "mouseover",
    I.MOUSE_OUT = "mouseout",
    I.MOUSE_WHEEL = "mousewheel",
    I.ROLL_OVER = "mouseover",
    I.ROLL_OUT = "mouseout",
    I.DOUBLE_CLICK = "doubleclick",
    I.CHANGE = "change",
    I.CHANGED = "changed",
    I.RESIZE = "resize",
    I.ADDED = "added",
    I.REMOVED = "removed",
    I.DISPLAY = "display",
    I.UNDISPLAY = "undisplay",
    I.ERROR = "error",
    I.COMPLETE = "complete",
    I.LOADED = "loaded",
    I.READY = "ready",
    I.PROGRESS = "progress",
    I.INPUT = "input",
    I.RENDER = "render",
    I.OPEN = "open",
    I.MESSAGE = "message",
    I.CLOSE = "close",
    I.KEY_DOWN = "keydown",
    I.KEY_PRESS = "keypress",
    I.KEY_UP = "keyup",
    I.FRAME = "enterframe",
    I.DRAG_START = "dragstart",
    I.DRAG_MOVE = "dragmove",
    I.DRAG_END = "dragend",
    I.ENTER = "enter",
    I.SELECT = "select",
    I.BLUR = "blur",
    I.FOCUS = "focus",
    I.VISIBILITY_CHANGE = "visibilitychange",
    I.FOCUS_CHANGE = "focuschange",
    I.PLAYED = "played",
    I.PAUSED = "paused",
    I.STOPPED = "stopped",
    I.START = "start",
    I.END = "end",
    I.COMPONENT_ADDED = "componentadded",
    I.COMPONENT_REMOVED = "componentremoved",
    I.RELEASED = "released",
    I.LINK = "link",
    I.LABEL = "label",
    I.FULL_SCREEN_CHANGE = "fullscreenchange",
    I.DEVICE_LOST = "devicelost",
    I.TRANSFORM_CHANGED = "transformchanged",
    I.ANIMATION_CHANGED = "animationchanged",
    I.TRAIL_FILTER_CHANGE = "trailfilterchange",
    I.TRIGGER_ENTER = "triggerenter",
    I.TRIGGER_STAY = "triggerstay",
    I.TRIGGER_EXIT = "triggerexit";
    class ae extends i {
        constructor(t=null, e=null, i=0, s=0) {
            super(),
            this.uvrect = [0, 0, 1, 1],
            this._destroyed = !1,
            this._referenceCount = 0,
            this.$_GID = 0,
            this.offsetX = 0,
            this.offsetY = 0,
            this._w = 0,
            this._h = 0,
            this.sourceWidth = 0,
            this.sourceHeight = 0,
            this.url = null,
            this.scaleRate = 1,
            this.setTo(t, e, i, s)
        }
        static moveUV(t, e, i) {
            for (var s = 0; s < 8; s += 2)
                i[s] += t,
                i[s + 1] += e;
            return i
        }
        static create(t, e, i, s, r, a=0, n=0, h=0, o=0) {
            return ae._create(t, e, i, s, r, a, n, h, o)
        }
        static _create(t, e, i, s, r, a=0, n=0, h=0, o=0, l=null) {
            var _, u = t instanceof ae, c = u ? t.uv : ae.DEF_UV, u = u ? t.bitmap : t, t = (u.width && e + s > u.width && (s = u.width - e),
            u.height && i + r > u.height && (r = u.height - i),
            l ? (_ = l).setTo(u, null, h || s, o || r) : _ = new ae(u,null,h || s,o || r),
            _.width = s,
            _.height = r,
            _.offsetX = a,
            _.offsetY = n,
            1 / u.width), l = 1 / u.height, h = (e *= t,
            i *= l,
            s *= t,
            r *= l,
            _.uv[0]), o = _.uv[1], a = _.uv[4], n = _.uv[5], t = a - h, l = n - o, c = ae.moveUV(c[0], c[1], [e, i, e + s, i, e + s, i + r, e, i + r]), s = (_.uv = new Float32Array([h + c[0] * t, o + c[1] * l, a - (1 - c[2]) * t, o + c[3] * l, a - (1 - c[4]) * t, n - (1 - c[5]) * l, h + c[6] * t, n - (1 - c[7]) * l]),
            u.scaleRate);
            return s && 1 != s ? (_.sourceWidth /= s,
            _.sourceHeight /= s,
            _.width /= s,
            _.height /= s,
            _.scaleRate = s,
            _.offsetX /= s,
            _.offsetY /= s) : _.scaleRate = 1,
            _
        }
        static createFromTexture(t, e, i, s, r) {
            var a = t.scaleRate
              , a = (1 != a && (e *= a,
            i *= a,
            s *= a,
            r *= a),
            E.TEMP.setTo(e - t.offsetX, i - t.offsetY, s, r))
              , e = a.intersection(ae._rect1.setTo(0, 0, t.width, t.height), ae._rect2);
            return e ? ae.create(t, e.x, e.y, e.width, e.height, e.x - a.x, e.y - a.y, s, r) : null
        }
        get uv() {
            return this._uv
        }
        set uv(t) {
            this.uvrect[0] = Math.min(t[0], t[2], t[4], t[6]),
            this.uvrect[1] = Math.min(t[1], t[3], t[5], t[7]),
            this.uvrect[2] = Math.max(t[0], t[2], t[4], t[6]) - this.uvrect[0],
            this.uvrect[3] = Math.max(t[1], t[3], t[5], t[7]) - this.uvrect[1],
            this._uv = t
        }
        get width() {
            return this._w || (this.bitmap ? this.uv && this.uv !== ae.DEF_UV ? (this.uv[2] - this.uv[0]) * this.bitmap.width : this.bitmap.width : 0)
        }
        set width(t) {
            this._w = t,
            this.sourceWidth || (this.sourceWidth = t)
        }
        get height() {
            return this._h || (this.bitmap ? this.uv && this.uv !== ae.DEF_UV ? (this.uv[5] - this.uv[1]) * this.bitmap.height : this.bitmap.height : 0)
        }
        set height(t) {
            this._h = t,
            this.sourceHeight || (this.sourceHeight = t)
        }
        get bitmap() {
            return this._bitmap
        }
        set bitmap(t) {
            this._bitmap && this._bitmap._removeReference(this._referenceCount),
            (this._bitmap = t) && t._addReference(this._referenceCount)
        }
        get destroyed() {
            return this._destroyed
        }
        _addReference() {
            this._bitmap && this._bitmap._addReference(),
            this._referenceCount++
        }
        _removeReference() {
            this._bitmap && this._bitmap._removeReference(),
            this._referenceCount--
        }
        _getSource(t=null) {
            return this._destroyed || !this._bitmap ? null : (this.recoverBitmap(t),
            this._bitmap.destroyed ? null : this.bitmap._getSource())
        }
        _onLoaded(t, e) {
            var i;
            e && e != this && (e instanceof ae ? (i = e,
            ae._create(e, 0, 0, i.width, i.height, 0, 0, i.sourceWidth, i.sourceHeight, this)) : (this.bitmap = e,
            this.sourceWidth = this._w = e.width,
            this.sourceHeight = this._h = e.height)),
            t && t.run(),
            this.event(I.READY, this)
        }
        getIsReady() {
            return !this._destroyed && !!this._bitmap
        }
        setTo(t=null, e=null, i=0, s=0) {
            this.bitmap = t,
            this.sourceWidth = i,
            this.sourceHeight = s,
            t && (this._w = t.width,
            this._h = t.height,
            this.sourceWidth = this.sourceWidth || t.width,
            this.sourceHeight = this.sourceHeight || t.height),
            this.uv = e || ae.DEF_UV
        }
        load(t, e=null) {
            this._destroyed || R.loader.load(t, Q.create(this, this._onLoaded, [e]), null, "htmlimage", 1, !0)
        }
        getTexturePixels(t, e, i, s) {
            var r = this.bitmap
              , a = this._w
              , n = this._h
              , h = this.sourceWidth
              , o = this.sourceHeight
              , l = r.width
              , _ = r.height
              , u = this.offsetX
              , c = this.offsetY;
            let d = i
              , p = s;
            if (a + u < t + i && (d -= t + i - a - u),
            h < t + i && (i -= t + i - h),
            n + c < e + s && (p -= e + s - n - c),
            o < e + s && (s -= e + s - o),
            i <= 0 || s <= 0)
                return null;
            var m = t < u ? u - t : 0
              , g = e < c ? c - e : 0
              , h = u < t ? t - u : 0
              , o = c < e ? e - c : 0
              , f = (d -= m,
            p -= g,
            4 * i)
              , T = null;
            try {
                T = r.getPixels()
            } catch (t) {}
            if (T) {
                if (0 == t && 0 == e && i == l && s == _)
                    return T;
                for (var x, u = this._uv.slice(), c = Math.round(u[0] * l), r = Math.round(u[1] * _), v = new Uint8Array(i * s * 4), y = 4 * c + 4 * h + (x = (r + o) * (f = 4 * l)), E = 0; E < p; E++)
                    v.set(T.slice(y, y + 4 * d), 4 * i * (E + g) + 4 * m),
                    y += f;
                return v
            }
            var u = new R.Context
              , c = (u.size(i, s),
            u.asBitmap = !0,
            null)
              , C = (0 == t && 0 == e && i == l && s == _ || (r = (c = this._uv.slice())[0],
            t = c[1],
            c = [r + h * (e = (c[2] - r) / a), t + o * (l = (c[7] - t) / n), r + (h + d) * e, t + o * l, r + (h + d) * e, t + (o + p) * l, r + h * e, t + (o + p) * l]),
            u._drawTextureM(this, m, g, d, p, null, 1, c),
            u._targets.start(),
            u.flush(),
            u._targets.end(),
            u._targets.restore(),
            u._targets.getData(0, 0, i, s));
            for (u.destroy(),
            v = new Uint8Array(i * s * 4),
            y = 0,
            x = (s - 1) * f,
            E = s - 1; 0 <= E; E--)
                v.set(C.slice(x, x + f), y),
                y += f,
                x -= f;
            return v
        }
        getPixels(t, e, i, s) {
            return window.conch ? this._nativeObj.getImageData(t, e, i, s) : this.getTexturePixels(t, e, i, s)
        }
        recoverBitmap(e=null) {
            var t, i = this._bitmap.url;
            this._destroyed || this._bitmap && !this._bitmap.destroyed || !i || ((t = R.Loader.loadedMap[i]) ? (this.bitmap = t,
            e && e()) : R.loader.load(i, Q.create(this, t=>{
                this.bitmap = t,
                e && e()
            }
            ), null, "htmlimage", 1, !0))
        }
        disposeBitmap() {
            !this._destroyed && this._bitmap && this._bitmap.destroy()
        }
        destroy(t=!1) {
            var e;
            this._destroyed || (this._destroyed = !0,
            (e = this._bitmap) && (e._removeReference(this._referenceCount),
            0 !== e.referenceCount && !t || e.destroy(),
            e = null),
            this.url && this === R.loader.getRes(this.url) && R.Loader.clearRes(this.url))
        }
    }
    ae.DEF_UV = new Float32Array([0, 0, 1, 0, 1, 1, 0, 1]),
    ae.NO_UV = new Float32Array([0, 0, 0, 0, 0, 0, 0, 0]),
    ae.INV_UV = new Float32Array([0, 1, 1, 1, 1, 0, 0, 0]),
    ae._rect1 = new E,
    ae._rect2 = new E;
    class ne {
        constructor(t) {
            this._font = "14px Arial",
            this._family = "Arial",
            this._size = 14,
            this._italic = !1,
            this._bold = !1,
            this._id = ne._gfontID++,
            this.setFont(t || this._font)
        }
        static Parse(t) {
            if (t === ne._lastFont)
                return ne._lastFontInfo;
            var e = (e = ne._cache[t]) || (ne._cache[t] = new ne(t));
            return ne._lastFont = t,
            ne._lastFontInfo = e
        }
        setFont(t) {
            var e = (this._font = t).split(" ")
              , i = e.length;
            if (i < 2)
                1 == i && 0 < e[0].indexOf("px") && (this._size = parseInt(e[0]));
            else {
                for (var s = -1, r = 0; r < i; r++)
                    if (0 < e[r].indexOf("px") || 0 < e[r].indexOf("pt")) {
                        s = r,
                        this._size = parseInt(e[r]),
                        this._size <= 0 && (console.error("font parse error:" + t),
                        this._size = 14);
                        break
                    }
                var a = s + 1
                  , n = e[a];
                for (a++; a < i; a++)
                    n += " " + e[a];
                this._family = n.split(",")[0],
                this._italic = 0 <= e.indexOf("italic"),
                this._bold = 0 <= e.indexOf("bold")
            }
        }
    }
    ne.EMPTY = new ne(null),
    ne._cache = {},
    ne._gfontID = 0,
    ne._lastFont = "";
    class he {
        constructor() {
            this.save = [],
            this.toUpperCase = null,
            this.width = -1,
            this.pageChars = [],
            this.startID = 0,
            this.startIDStroke = 0,
            this.lastGCCnt = 0,
            this.splitRender = !1,
            this.scalex = 1,
            this.scaley = 1
        }
        setText(t) {
            this.changed = !0,
            this._text = t,
            this.width = -1,
            this.cleanCache()
        }
        toString() {
            return this._text
        }
        get length() {
            return this._text ? this._text.length : 0
        }
        charCodeAt(t) {
            return this._text ? this._text.charCodeAt(t) : NaN
        }
        charAt(t) {
            return this._text ? this._text.charAt(t) : null
        }
        cleanCache() {
            var t, e = this.pageChars;
            for (t in e) {
                var i = e[t]
                  , s = i.tex;
                1 == i.words.length && s && s.ri && s.destroy()
            }
            this.pageChars = [],
            this.startID = 0,
            this.scalex = 1,
            this.scaley = 1
        }
    }
    class oe {
        constructor() {
            this.char = "",
            this.deleted = !1,
            this.uv = new Array(8),
            this.pos = 0,
            this.orix = 0,
            this.oriy = 0,
            this.touchTick = 0,
            this.isSpace = !1
        }
        touch() {
            var t = Nt.loopCount;
            this.touchTick != t && this.tex.touchRect(this, t),
            this.touchTick = t
        }
    }
    class le {
        constructor() {
            this.fontsz = 16
        }
        getWidth(t, e) {
            return 0
        }
        scale(t, e) {}
        get canvasWidth() {
            return 0
        }
        set canvasWidth(t) {}
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _=0) {
            return null
        }
    }
    class P {
        static __init__() {
            var t = window.Laya || R.Laya;
            if (P._window)
                return P._window;
            for (var e = P._window = window, i = P._document = e.document, s = P.userAgent = e.navigator.userAgent, r = e.navigator.maxTouchPoints || 0, a = e.navigator.platform, t = ("my"in P.window && (-1 < s.indexOf("TB/") || -1 < s.indexOf("Taobao/") || -1 < s.indexOf("TM/") ? (window.tbMiniGame(t, t),
            t.TBMiniAdapter ? t.TBMiniAdapter.enable() : console.error("请先添加淘宝适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0")) : -1 < s.indexOf("AlipayMiniGame") && (window.aliPayMiniGame(t, t),
            t.ALIMiniAdapter ? t.ALIMiniAdapter.enable() : console.error("请先添加阿里小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-6-0"))),
            -1 == s.indexOf("OPPO") && -1 < s.indexOf("MiniGame") && "wx"in P.window && ("tt"in P.window ? (window.ttMiniGame(t, t),
            t.TTMiniAdapter ? t.TTMiniAdapter.enable() : console.error("请引入字节跳动小游戏的适配库")) : "bl"in P.window ? (window.biliMiniGame(t, t),
            t.BLMiniAdapter ? t.BLMiniAdapter.enable() : console.error("请引入bilibili小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-7-0")) : "qq"in P.window ? (window.qqMiniGame(t, t),
            t.QQMiniAdapter ? t.QQMiniAdapter.enable() : console.error("请引入手机QQ小游戏的适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-0-0")) : (window.wxMiniGame(t, t),
            t.MiniAdpter ? t.MiniAdpter.enable() : console.error("请先添加小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?nav=zh-ts-5-0-0"))),
            "hbs"in P.window && (window.hwMiniGame(t, t),
            t.HWMiniAdapter ? t.HWMiniAdapter.enable() : console.error("请先添加小游戏适配库!")),
            -1 < s.indexOf("SwanGame") && (window.bdMiniGame(t, t),
            t.BMiniAdapter ? t.BMiniAdapter.enable() : console.error("请先添加百度小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-1-0")),
            -1 < s.indexOf("QuickGame") && (window.miMiniGame(t, t),
            t.KGMiniAdapter ? t.KGMiniAdapter.enable() : console.error("请先添加小米小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-2-0")),
            -1 < s.indexOf("OPPO") && -1 < s.indexOf("MiniGame") && (window.qgMiniGame(t, t),
            t.QGMiniAdapter ? t.QGMiniAdapter.enable() : console.error("请先添加OPPO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-3-0")),
            -1 < s.indexOf("VVGame") && (window.vvMiniGame(t, t),
            t.VVMiniAdapter ? t.VVMiniAdapter.enable() : console.error("请先添加VIVO小游戏适配库,详细教程：https://ldc2.layabox.com/doc/?language=zh&nav=zh-ts-5-4-0")),
            e.trace = console.log,
            e.requestAnimationFrame = e.requestAnimationFrame || e.webkitRequestAnimationFrame || e.mozRequestAnimationFrame || e.oRequestAnimationFrame || e.msRequestAnimationFrame || function(t) {
                return e.setTimeout(t, 1e3 / 60)
            }
            ,
            i.body.style), n = (t.margin = 0,
            t.overflow = "hidden",
            t["-webkit-user-select"] = "none",
            t["-webkit-tap-highlight-color"] = "rgba(200,200,200,0)",
            i.getElementsByTagName("meta")), h = 0, o = !1, l = "width=device-width,initial-scale=1.0,minimum-scale=1.0,maximum-scale=1.0,user-scalable=no"; h < n.length; ) {
                var _ = n[h];
                if ("viewport" == _.name) {
                    _.content = l,
                    o = !0;
                    break
                }
                h++
            }
            return o || ((_ = i.createElement("meta")).name = "viewport",
            _.content = l,
            i.getElementsByTagName("head")[0].appendChild(_)),
            P.onMobile = !!window.conch || -1 < s.indexOf("Mobile"),
            P.onIOS = !!s.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
            P.onIPhone = -1 < s.indexOf("iPhone"),
            P.onMac = -1 < s.indexOf("Mac OS X"),
            P.onIPad = -1 < s.indexOf("iPad") || "MacIntel" === a && 1 < r,
            P.onAndroid = -1 < s.indexOf("Android") || -1 < s.indexOf("Adr"),
            P.onWP = -1 < s.indexOf("Windows Phone"),
            P.onQQBrowser = -1 < s.indexOf("QQBrowser"),
            P.onMQQBrowser = -1 < s.indexOf("MQQBrowser") || -1 < s.indexOf("Mobile") && -1 < s.indexOf("QQ"),
            P.onIE = !!e.ActiveXObject || "ActiveXObject"in e,
            P.onWeiXin = -1 < s.indexOf("MicroMessenger"),
            P.onSafari = -1 < s.indexOf("Safari"),
            P.onPC = !P.onMobile,
            P.onFirefox = -1 < s.indexOf("Firefox"),
            P.onEdge = -1 < s.indexOf("Edge"),
            P.onMiniGame = -1 < s.indexOf("MiniGame"),
            P.onBDMiniGame = -1 < s.indexOf("SwanGame"),
            P.onLayaRuntime = !!window.conch,
            -1 < s.indexOf("OPPO") && -1 < s.indexOf("MiniGame") ? (P.onQGMiniGame = !0,
            P.onMiniGame = !1) : "qq"in P.window && -1 < s.indexOf("MiniGame") ? (P.onQQMiniGame = !0,
            P.onMiniGame = !1) : "bl"in P.window && -1 < s.indexOf("MiniGame") ? (P.onBLMiniGame = !0,
            P.onMiniGame = !1) : "tt"in P.window && -1 < s.indexOf("MiniGame") && (P.onTTMiniGame = !0,
            P.onMiniGame = !1),
            P.onHWMiniGame = "hbs"in P.window,
            P.onVVMiniGame = -1 < s.indexOf("VVGame"),
            P.onKGMiniGame = -1 < s.indexOf("QuickGame"),
            -1 < s.indexOf("AlipayMiniGame") && (P.onAlipayMiniGame = !0,
            P.onMiniGame = !1),
            (-1 < s.indexOf("TB/") || -1 < s.indexOf("Taobao/") || -1 < s.indexOf("TM/")) && (P.onTBMiniGame = !0),
            e
        }
        static get _isMiniGame() {
            return P.onMiniGame || P.onBDMiniGame || P.onQGMiniGame || P.onKGMiniGame || P.onVVMiniGame || P.onAlipayMiniGame || P.onQQMiniGame || P.onBLMiniGame || P.onTTMiniGame || P.onHWMiniGame || P.onTBMiniGame
        }
        static createElement(t) {
            return P.__init__(),
            P._document.createElement(t)
        }
        static getElementById(t) {
            return P.__init__(),
            P._document.getElementById(t)
        }
        static removeElement(t) {
            t && t.parentNode && t.parentNode.removeChild(t)
        }
        static now() {
            return Date.now()
        }
        static get clientWidth() {
            return P.__init__(),
            P._window.innerWidth || P._document.body.clientWidth
        }
        static get clientHeight() {
            return P.__init__(),
            P._window.innerHeight || P._document.body.clientHeight || P._document.documentElement.clientHeight
        }
        static get width() {
            return P.__init__(),
            (R.stage && R.stage.canvasRotation ? P.clientHeight : P.clientWidth) * P.pixelRatio
        }
        static get height() {
            return P.__init__(),
            (R.stage && R.stage.canvasRotation ? P.clientWidth : P.clientHeight) * P.pixelRatio
        }
        static get pixelRatio() {
            return P._pixelRatio < 0 && (P.__init__(),
            -1 < P.userAgent.indexOf("Mozilla/6.0(Linux; Android 6.0; HUAWEI NXT-AL10 Build/HUAWEINXT-AL10)") ? P._pixelRatio = 2 : (P._pixelRatio = P._window.devicePixelRatio || 1,
            P._pixelRatio < 1 && (P._pixelRatio = 1))),
            P._pixelRatio
        }
        static get container() {
            return P._container || (P.__init__(),
            P._container = P.createElement("div"),
            P._container.id = "layaContainer",
            P._document.body.appendChild(P._container)),
            P._container
        }
        static set container(t) {
            P._container = t
        }
        static get window() {
            return P._window || P.__init__()
        }
        static get document() {
            return P.__init__(),
            P._document
        }
    }
    P._pixelRatio = -1,
    P.mainCanvas = null,
    P.hanzi = new RegExp("^[一-龥]$"),
    P.fontMap = {},
    P.measureText = function(t, e) {
        var i = P.hanzi.test(t);
        if (i && P.fontMap[e])
            return P.fontMap[e];
        var s = P.context
          , s = (s.font = e,
        s.measureText(t));
        return i && (P.fontMap[e] = s),
        s
    }
    ;
    class _e extends le {
        constructor(t, e, i=!0, s=!0, r=!1) {
            super(),
            this.ctx = null,
            this.lastScaleX = 1,
            this.lastScaleY = 1,
            this.maxTexW = 0,
            this.maxTexH = 0,
            this.scaleFontSize = !0,
            this.showDbgInfo = !1,
            this.supportImageData = !0,
            this.maxTexW = t,
            this.maxTexH = e,
            this.scaleFontSize = i,
            this.supportImageData = s,
            this.showDbgInfo = r,
            _e.canvas || (_e.canvas = P.createElement("canvas"),
            _e.canvas.width = 1024,
            _e.canvas.height = 512,
            _e.canvas.style.left = "-10000px",
            _e.canvas.style.position = "absolute",
            document.body.appendChild(_e.canvas),
            this.ctx = _e.canvas.getContext("2d"))
        }
        get canvasWidth() {
            return _e.canvas.width
        }
        set canvasWidth(t) {
            _e.canvas.width != t && (2048 < (_e.canvas.width = t) && console.warn("画文字设置的宽度太大，超过2048了"),
            this.ctx.setTransform(1, 0, 0, 1, 0, 0),
            this.ctx.scale(this.lastScaleX, this.lastScaleY))
        }
        getWidth(t, e) {
            return this.ctx ? (this.ctx._lastFont != t && (this.ctx.font = t,
            this.ctx._lastFont = t),
            this.ctx.measureText(e).width) : 0
        }
        scale(t, e) {
            if (!this.supportImageData)
                return this.lastScaleX = t,
                void (this.lastScaleY = e);
            this.lastScaleX == t && this.lastScaleY == e || (this.ctx.setTransform(t, 0, 0, e, 0, 0),
            this.lastScaleX = t,
            this.lastScaleY = e)
        }
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _=null) {
            if (!this.supportImageData)
                return this.getCharCanvas(t, e, i, s, r, a, n, h, o, l);
            var u = this.ctx
              , c = this.fontsz
              , e = (u.font != e && (u.font = e,
            u._lastFont = e),
            a.width = u.measureText(t).width,
            a.width * this.lastScaleX)
              , d = a.height * this.lastScaleY
              , o = (e += (n + o) * this.lastScaleX,
            d += (h + l) * this.lastScaleY,
            e = Math.ceil(e),
            d = Math.ceil(d),
            (e = Math.min(e, _e.canvas.width)) + 2 * i + 1)
              , l = (d = Math.min(d, _e.canvas.height)) + 2 * i + 1
              , o = (_ && (o = Math.max(o, _[0] + _[2] + 1),
            l = Math.max(l, _[1] + _[3] + 1)),
            u.clearRect(0, 0, o / this.lastScaleX + 1, l / this.lastScaleY + 1),
            u.save(),
            u.textBaseline = "middle",
            0 < i && (u.strokeStyle = r,
            u.lineWidth = i,
            u.strokeText(t, n, h + c / 2)),
            s && (u.fillStyle = s,
            u.fillText(t, n, h + c / 2)),
            this.showDbgInfo && (u.strokeStyle = "#ff0000",
            u.strokeRect(1, 1, e - 2, d - 2),
            u.strokeStyle = "#00ff00",
            u.strokeRect(n, h, a.width, a.height)),
            _ && (-1 == _[2] && (_[2] = Math.ceil((a.width + 2 * i) * this.lastScaleX)),
            _[2] <= 0 && (_[2] = 1)),
            _ ? u.getImageData(_[0], _[1], _[2], _[3] + 1) : u.getImageData(0, 0, e, d + 1));
            return u.restore(),
            a.bmpWidth = o.width,
            a.bmpHeight = o.height,
            o
        }
        getCharCanvas(t, e, i, s, r, a, n, h, o, l) {
            var _ = this.ctx
              , u = (_.font != e && (_.font = e,
            _._lastFont = e),
            a.width = _.measureText(t).width,
            a.width * this.lastScaleX)
              , c = a.height * this.lastScaleY
              , o = (u += (n + o) * this.lastScaleX,
            c += (h + l) * this.lastScaleY + 1,
            u = Math.min(u, this.maxTexW),
            c = Math.min(c, this.maxTexH),
            _e.canvas.width = Math.min(u + 1, this.maxTexW),
            _e.canvas.height = Math.min(c + 1, this.maxTexH),
            _.font = e,
            _.clearRect(0, 0, u + 1 + i, c + 1 + i),
            _.setTransform(1, 0, 0, 1, 0, 0),
            _.save(),
            this.scaleFontSize && _.scale(this.lastScaleX, this.lastScaleY),
            _.translate(n, h),
            _.textAlign = "left",
            this.fontsz);
            return _.textBaseline = "middle",
            0 < i ? (_.strokeStyle = r,
            _.fillStyle = s,
            _.lineWidth = i,
            _.fillAndStrokeText ? _.fillAndStrokeText(t, 0, o / 2) : (_.strokeText(t, 0, o / 2),
            _.fillText(t, 0, o / 2))) : s && (_.fillStyle = s,
            _.fillText(t, 0, o / 2)),
            this.showDbgInfo && (_.strokeStyle = "#ff0000",
            _.strokeRect(0, 0, u, c),
            _.strokeStyle = "#00ff00",
            _.strokeRect(0, 0, a.width, a.height)),
            _.restore(),
            a.bmpWidth = _e.canvas.width,
            a.bmpHeight = _e.canvas.height,
            _e.canvas
        }
    }
    _e.canvas = null;
    class ue extends le {
        constructor() {
            super(),
            this.lastFont = "",
            this.lastScaleX = 1,
            this.lastScaleY = 1
        }
        getWidth(t, e) {
            return window.conchTextCanvas ? (window.conchTextCanvas.font = t,
            this.lastFont = t,
            window.conchTextCanvas.measureText(e).width) : 0
        }
        scale(t, e) {
            this.lastScaleX = t,
            this.lastScaleY = e
        }
        getCharBmp(t, e, i, s, r, a, n, h, o, l, _=0) {
            if (!window.conchTextCanvas)
                return null;
            window.conchTextCanvas.font = e,
            this.lastFont = e;
            a.width = window.conchTextCanvas.measureText(t).width,
            a.height;
            window.conchTextCanvas.scale && window.conchTextCanvas.scale(this.lastScaleX, this.lastScaleY);
            e = gt.create(r).numColor,
            r = gt.create(s).numColor,
            s = window.conchTextCanvas.getTextBitmapData(t, r, 2 < i ? 2 : i, e);
            return a.bmpWidth = s.width,
            a.bmpHeight = s.height,
            s
        }
    }
    class D {
        constructor() {
            this.fontSizeInfo = {},
            this.mapFont = {},
            this.fontID = 0,
            this.fontScaleX = 1,
            this.fontScaleY = 1,
            this._curStrPos = 0,
            this.textAtlases = [],
            this.isoTextures = [],
            this.lastFont = null,
            this.fontSizeW = 0,
            this.fontSizeH = 0,
            this.fontSizeOffX = 0,
            this.fontSizeOffY = 0,
            this.renderPerChar = !0,
            this.tmpAtlasPos = new q,
            this.textureMem = 0,
            R.TextAtlas = re;
            var t = !1
              , e = R.Laya.MiniAdpter;
            e && e.systemInfo && e.systemInfo.system && (t = "ios 10.1.1" === e.systemInfo.system.toLowerCase()),
            (R.Browser.onMiniGame || R.Browser.onTTMiniGame || R.Browser.onBLMiniGame || R.Browser.onAlipayMiniGame || R.Browser.onTBMiniGame) && !t && (D.isWan1Wan = !0),
            this.charRender = R.Render.isConchApp ? new ue : new _e(2048,2048,D.scaleFontWithCtx,!D.isWan1Wan,!1),
            D.textRenderInst = this,
            R.Laya.textRender = this,
            D.atlasWidth2 = D.atlasWidth * D.atlasWidth
        }
        setFont(t) {
            var e, i, s, r, a;
            this.lastFont != t && (this.lastFont = t,
            e = (r = this.getFontSizeInfo(t._family)) >> 24,
            i = r >> 16 & 255,
            s = r >> 8 & 255,
            r = 255 & r,
            a = t._size / D.standardFontSize,
            this.fontSizeOffX = Math.ceil(e * a),
            this.fontSizeOffY = Math.ceil(i * a),
            this.fontSizeW = Math.ceil(s * a),
            this.fontSizeH = Math.ceil(r * a),
            0 <= t._font.indexOf("italic") ? this.fontStr = t._font.replace("italic", "") : this.fontStr = t._font)
        }
        getNextChar(t) {
            var e = t.length
              , i = this._curStrPos;
            if (!t.substring)
                return null;
            if (e <= i)
                return null;
            for (var s = i, r = 0; s < e; s++) {
                var a = t.charCodeAt(s);
                if (a >>> 11 == 27) {
                    if (1 == r)
                        break;
                    r = 1,
                    s++
                } else if (65038 !== a && 65039 !== a)
                    if (8205 == a)
                        r = 2;
                    else if (0 == r)
                        r = 1;
                    else if (1 == r)
                        break
            }
            return this._curStrPos = s,
            t.substring(i, s)
        }
        filltext(t, e, i, s, r, a, n, h, o, l=0) {
            if (!(e.length <= 0)) {
                var r = ne.Parse(r)
                  , _ = 0;
                switch (o) {
                case "center":
                    _ = R.Context.ENUM_TEXTALIGN_CENTER;
                    break;
                case "right":
                    _ = R.Context.ENUM_TEXTALIGN_RIGHT
                }
                this._fast_filltext(t, e, null, i, s, r, a, n, h, _, l)
            }
        }
        fillWords(t, e, i, s, r, a, n, h) {
            !e || e.length <= 0 || (r = "string" == typeof r ? ne.Parse(r) : r,
            this._fast_filltext(t, null, e, i, s, r, a, n, h, 0, 0))
        }
        _fast_filltext(t, e, i, s, r, a, n, h, o, l, _=0) {
            if ((!e || 1 <= e.length) && !(i && i.length < 1)) {
                if (o < 0 && (o = 0),
                this.setFont(a),
                this.fontScaleX = this.fontScaleY = 1,
                D.scaleFontWithCtx) {
                    var u = 1
                      , c = 1;
                    if (R.Render.isConchApp && !window.conchTextCanvas.scale || (u = t.getMatScaleX(),
                    c = t.getMatScaleY()),
                    u < 1e-4 || c < .1)
                        return;
                    1 < u && (this.fontScaleX = u),
                    1 < c && (this.fontScaleY = c)
                }
                a._italic && (t._italicDeg = 13);
                var u = e
                  , c = !i && e instanceof he
                  , d = e && e.toString()
                  , e = !!i
                  , p = c ? u.pageChars : []
                  , m = 0;
                switch (c ? (d = u._text,
                (m = u.width) < 0 && (m = u.width = this.charRender.getWidth(this.fontStr, d))) : m = d ? this.charRender.getWidth(this.fontStr, d) : 0,
                l) {
                case R.Context.ENUM_TEXTALIGN_CENTER:
                    s -= m / 2;
                    break;
                case R.Context.ENUM_TEXTALIGN_RIGHT:
                    s -= m
                }
                u && p && this.hasFreedText(p) && (p = u.pageChars = []);
                var g = null
                  , l = this.renderPerChar = !c || D.forceSplitRender || e || c && u.splitRender;
                if (!p || p.length < 1)
                    if (c && (u.scalex = this.fontScaleX,
                    u.scaley = this.fontScaleY),
                    l) {
                        var f, T, x, v = 0, y = 0;
                        for (this._curStrPos = 0; ; ) {
                            if (i ? (x = i[this._curStrPos++]) ? (f = x.char,
                            v = x.x,
                            y = x.y) : f = null : f = this.getNextChar(d),
                            !f)
                                break;
                            if (!(g = this.getCharRenderInfo(f, a, n, h, o, !1)))
                                break;
                            g.isSpace || ((x = (x = p[g.tex.id]) ? x.words : (T = {
                                texgen: g.tex.genID,
                                tex: g.tex,
                                words: new Array
                            },
                            (p[g.tex.id] = T).words)).push({
                                ri: g,
                                x: v,
                                y: y,
                                w: g.bmpWidth / this.fontScaleX,
                                h: g.bmpHeight / this.fontScaleY
                            }),
                            v += g.width)
                        }
                    } else {
                        e = R.Render.isConchApp ? 0 : a._size / 3 | 0,
                        c = D.noAtlas || (m + e + e) * this.fontScaleX > D.atlasWidth,
                        g = this.getCharRenderInfo(d, a, n, h, o, c);
                        p[0] = {
                            texgen: g.tex.genID,
                            tex: g.tex,
                            words: [{
                                ri: g,
                                x: 0,
                                y: 0,
                                w: g.bmpWidth / this.fontScaleX,
                                h: g.bmpHeight / this.fontScaleY
                            }]
                        }
                    }
                this._drawResortedWords(t, s, r, p),
                t._italicDeg = 0
            }
        }
        _drawResortedWords(t, e, i, s) {
            var r, a = !!t._charSubmitCache && t._charSubmitCache._enable, n = t._curMat;
            for (r in s) {
                var h = s[r];
                if (h) {
                    var o = h.words
                      , l = o.length;
                    if (!(l <= 0))
                        for (var _ = s[r].tex, u = 0; u < l; u++) {
                            var c = o[u]
                              , d = c.ri;
                            d.isSpace || (d.touch(),
                            t.drawTexAlign = !0,
                            R.Render.isConchApp ? t._drawTextureM(_.texture, e + c.x - d.orix, i + c.y - d.oriy, c.w, c.h, null, 1, d.uv) : t._inner_drawTexture(_.texture, _.id, e + c.x - d.orix, i + c.y - d.oriy, c.w, c.h, n, d.uv, 1, a),
                            t.touches && t.touches.push(d))
                        }
                }
            }
        }
        hasFreedText(t) {
            for (var e in t) {
                e = t[e];
                if (e) {
                    var i = e.tex;
                    if (i.__destroyed || i.genID != e.texgen)
                        return !0
                }
            }
            return !1
        }
        getCharRenderInfo(t, e, i, s, r, a=!1) {
            var n, h, o = this.mapFont[e._family], l = (null == o && (this.mapFont[e._family] = o = this.fontID++),
            t + "_" + o + "_" + e._size + "_" + i), _ = (0 < r && (l += "_" + s + r),
            e._bold && (l += "P"),
            1 == this.fontScaleX && 1 == this.fontScaleY || (l += (20 * this.fontScaleX | 0) + "_" + (20 * this.fontScaleY | 0)),
            0), u = this.textAtlases.length;
            if (!a)
                for (_ = 0; _ < u; _++)
                    if (n = (h = this.textAtlases[_]).charMaps[l])
                        return n.touch(),
                        n;
            n = new oe,
            this.charRender.scale(this.fontScaleX, this.fontScaleY),
            n.char = t,
            n.height = e._size;
            var c, d, p, o = R.Render.isConchApp ? 0 : e._size / 3 | 0, m = null, g = (r = r || 0,
            Math.ceil((this.charRender.getWidth(this.fontStr, t) + 2 * r) * this.fontScaleX));
            return g > this.charRender.canvasWidth && (this.charRender.canvasWidth = Math.min(2048, g + 2 * o)),
            a ? (this.charRender.fontsz = e._size,
            (m = this.charRender.getCharBmp(t, this.fontStr, r, i, s, n, o, o, o, o, null)) && ((a = se.getTextTexture(m.width, m.height)).addChar(m, 0, 0, n.uv),
            n.tex = a,
            n.orix = o,
            n.oriy = o,
            a.ri = n,
            this.isoTextures.push(a))) : (a = t.length,
            c = +r,
            d = Math.ceil((this.fontSizeW + 2 * c) * this.fontScaleX),
            p = Math.ceil((this.fontSizeH + 2 * c) * this.fontScaleY),
            D.imgdtRect[0] = (o - this.fontSizeOffX - c) * this.fontScaleX | 0,
            D.imgdtRect[1] = (o - this.fontSizeOffY - c) * this.fontScaleY | 0,
            this.renderPerChar || 1 == a ? (D.imgdtRect[2] = Math.max(g, d),
            D.imgdtRect[3] = Math.max(g, p)) : (D.imgdtRect[2] = -1,
            D.imgdtRect[3] = p),
            this.charRender.fontsz = e._size,
            (m = this.charRender.getCharBmp(t, this.fontStr, r, i, s, n, o, o, o, o, D.imgdtRect)) && (h = this.addBmpData(m, n),
            D.isWan1Wan ? (n.orix = o,
            n.oriy = o) : (n.orix = this.fontSizeOffX + c,
            n.oriy = this.fontSizeOffY + c),
            h.charMaps[l] = n)),
            n
        }
        addBmpData(t, e) {
            for (var i, s = t.width, r = t.height, a = this.textAtlases.length, n = !1, h = 0; h < a && !(n = (i = this.textAtlases[h]).getAEmpty(s, r, this.tmpAtlasPos)); h++)
                ;
            if (!n) {
                if (i = new re,
                this.textAtlases.push(i),
                !(n = i.getAEmpty(s, r, this.tmpAtlasPos)))
                    throw "err1";
                this.cleanAtlases()
            }
            return n && (i.texture.addChar(t, this.tmpAtlasPos.x, this.tmpAtlasPos.y, e.uv),
            e.tex = i.texture),
            i
        }
        GC() {
            for (var t, e = 0, i = this.textAtlases.length, s = D.destroyAtlasDt, r = 0, a = Nt.loopCount, n = -1, h = 0, o = null, l = null; e < i; e++)
                (o = (l = this.textAtlases[e]).texture) && (o.curUsedCovRate,
                r += o.curUsedCovRateAtlas,
                h < (t = l.usedRate - o.curUsedCovRateAtlas) && (h = t,
                n = e)),
                s < a - l.texture.lastTouchTm && (D.showLog && console.log(l.texture.id),
                l.destroy(),
                this.textAtlases[e] = this.textAtlases[i - 1],
                i--,
                e--,
                n = -1);
            for (this.textAtlases.length = i,
            i = this.isoTextures.length,
            e = 0; e < i; e++)
                a - (o = this.isoTextures[e]).lastTouchTm > D.destroyUnusedTextureDt && (o.ri.deleted = !0,
                o.ri.tex = null,
                o.destroy(),
                this.isoTextures[e] = this.isoTextures[i - 1],
                i--,
                e--);
            this.isoTextures.length = i;
            var _ = 1 < this.textAtlases.length && 2 <= this.textAtlases.length - r;
            (D.atlasWidth * D.atlasWidth * 4 * this.textAtlases.length > D.cleanMem || _ || D.simClean) && (D.simClean = !1,
            D.showLog && console.log("清理使用率低的贴图。总使用率:", r, ":", this.textAtlases.length, "最差贴图:" + n),
            0 <= n && ((l = this.textAtlases[n]).destroy(),
            this.textAtlases[n] = this.textAtlases[this.textAtlases.length - 1],
            this.textAtlases.length = this.textAtlases.length - 1)),
            se.clean()
        }
        cleanAtlases() {}
        getCharBmp(t) {}
        checkBmpLine(t, e, i, s) {
            this.bmpData32.buffer != t.data.buffer && (this.bmpData32 = new Uint32Array(t.data.buffer));
            for (var r = t.width * e + i, a = i; a < s; a++)
                if (0 != this.bmpData32[r++])
                    return !0;
            return !1
        }
        updateBbx(t, e, i=!1) {
            var s = t.width
              , r = t.height
              , a = 0
              , n = e[1]
              , h = 0
              , o = n;
            if (this.checkBmpLine(t, n, 0, s))
                for (; ; ) {
                    if (n <= (o = (n + h) / 2 | 0) + 1) {
                        e[1] = o;
                        break
                    }
                    this.checkBmpLine(t, o, 0, s) ? n = o : h = o
                }
            if (e[3] > r)
                e[3] = r;
            else if (o = n = e[3],
            h = r,
            this.checkBmpLine(t, n, 0, s))
                for (; ; ) {
                    if ((o = (n + h) / 2 | 0) - 1 <= n) {
                        e[3] = o;
                        break
                    }
                    this.checkBmpLine(t, o, 0, s) ? n = o : h = o
                }
            if (!i) {
                for (var l = e[0], _ = s * e[1], o = e[1]; o < e[3]; o++) {
                    for (a = 0; a < l; a++)
                        if (0 != this.bmpData32[_ + a]) {
                            l = a;
                            break
                        }
                    _ += s
                }
                e[0] = l;
                var u = e[2]
                  , _ = s * e[1];
                for (o = e[1]; o < e[3]; o++) {
                    for (a = u; a < s; a++)
                        if (0 != this.bmpData32[_ + a]) {
                            u = a;
                            break
                        }
                    _ += s
                }
                e[2] = u
            }
        }
        getFontSizeInfo(t) {
            var e = this.fontSizeInfo[t];
            if (null != e)
                return e;
            e = "bold " + D.standardFontSize + "px " + t;
            if (D.isWan1Wan)
                return this.fontSizeW = 1.5 * this.charRender.getWidth(e, "有"),
                this.fontSizeH = 1.5 * D.standardFontSize,
                i = this.fontSizeW << 8 | this.fontSizeH,
                this.fontSizeInfo[t] = i;
            D.pixelBBX[0] = D.standardFontSize / 2,
            D.pixelBBX[1] = D.standardFontSize / 2,
            D.pixelBBX[2] = D.standardFontSize,
            D.pixelBBX[3] = D.standardFontSize;
            var i = 16
              , s = 16
              , r = (this.charRender.scale(1, 1),
            D.tmpRI.height = D.standardFontSize,
            this.charRender.fontsz = D.standardFontSize,
            this.charRender.getCharBmp("g", e, 0, "red", null, D.tmpRI, i, s, 16, 16));
            R.Render.isConchApp && (r.data = new Uint8ClampedArray(r.data)),
            this.bmpData32 = new Uint32Array(r.data.buffer),
            this.updateBbx(r, D.pixelBBX, !1),
            r = this.charRender.getCharBmp("有", e, 0, "red", null, D.tmpRI, s, s, 16, 16),
            R.Render.isConchApp && (r.data = new Uint8ClampedArray(r.data)),
            this.bmpData32 = new Uint32Array(r.data.buffer),
            D.pixelBBX[2] < i + D.tmpRI.width && (D.pixelBBX[2] = i + D.tmpRI.width),
            this.updateBbx(r, D.pixelBBX, !1),
            R.Render.isConchApp && (s = i = 0);
            e = Math.max(i - D.pixelBBX[0], 0) << 24 | Math.max(s - D.pixelBBX[1], 0) << 16 | D.pixelBBX[2] - D.pixelBBX[0] << 8 | D.pixelBBX[3] - D.pixelBBX[1];
            return this.fontSizeInfo[t] = e
        }
        printDbgInfo() {
            for (var t in console.log("图集个数:" + this.textAtlases.length + ",每个图集大小:" + D.atlasWidth + "x" + D.atlasWidth, " 用canvas:", D.isWan1Wan),
            console.log("图集占用空间:" + D.atlasWidth * D.atlasWidth * 4 / 1024 / 1024 * this.textAtlases.length + "M"),
            console.log("缓存用到的字体:"),
            this.mapFont) {
                var e = this.getFontSizeInfo(t);
                console.log("    " + t, " off:", e >> 24, e >> 16 & 255, " size:", e >> 8 & 255, 255 & e)
            }
            var a = 0
              , n = (console.log("缓存数据:"),
            0)
              , h = 0;
            this.textAtlases.forEach(function(t) {
                var e, i = t.texture.id, s = Nt.loopCount - t.texture.lastTouchTm;
                for (e in n += t.texture.curUsedCovRate,
                h += t.texture.curUsedCovRateAtlas,
                console.log("--图集(id:" + i + ",当前使用率:" + (1e3 * t.texture.curUsedCovRate | 0) + "‰", "当前图集使用率:", (100 * t.texture.curUsedCovRateAtlas | 0) + "%", "图集使用率:", 100 * t.usedRate | 0, "%, 使用于:" + (0 < s ? s + "帧以前" : "当前帧") + ")--:"),
                t.charMaps) {
                    var r = t.charMaps[e];
                    console.log("     off:", r.orix, r.oriy, " bmp宽高:", r.bmpWidth, r.bmpHeight, "无效:", r.deleted, "touchdt:", Nt.loopCount - r.touchTick, "位置:", r.uv[0] * D.atlasWidth | 0, r.uv[1] * D.atlasWidth | 0, "字符:", r.char, "key:", e),
                    a++
                }
            }),
            console.log("独立贴图文字(" + this.isoTextures.length + "个):"),
            this.isoTextures.forEach(function(t) {
                console.log("    size:", t._texW, t._texH, "touch间隔:", Nt.loopCount - t.lastTouchTm, "char:", t.ri.char)
            }),
            console.log("总缓存:", a, "总使用率:", n, "总当前图集使用率:", h)
        }
        showAtlas(t, i, e, s, r, a) {
            if (!this.textAtlases[t])
                return console.log("没有这个图集"),
                null;
            var n = new R.Sprite
              , h = this.textAtlases[t].texture
              , o = {
                width: D.atlasWidth,
                height: D.atlasWidth,
                sourceWidth: D.atlasWidth,
                sourceHeight: D.atlasWidth,
                offsetX: 0,
                offsetY: 0,
                getIsReady: function() {
                    return !0
                },
                _addReference: function() {},
                _removeReference: function() {},
                _getSource: function() {
                    return h._getSource()
                },
                bitmap: {
                    id: h.id
                },
                _uv: ae.DEF_UV
            };
            return n.size = function(t, e) {
                return this.width = t,
                this.height = e,
                n.graphics.clear(),
                n.graphics.drawRect(0, 0, n.width, n.height, i),
                n.graphics.drawTexture(o, 0, 0, n.width, n.height),
                this
            }
            ,
            n.graphics.drawRect(0, 0, r, a, i),
            n.graphics.drawTexture(o, 0, 0, r, a),
            n.pos(e, s),
            R.stage.addChild(n),
            n
        }
        filltext_native(t, e, i, s, r, a, n, h, o, l, _=0) {
            if (!(e && e.length <= 0 || i && i.length < 1)) {
                var a = ne.Parse(a)
                  , u = 0;
                switch (l) {
                case "center":
                    u = R.Context.ENUM_TEXTALIGN_CENTER;
                    break;
                case "right":
                    u = R.Context.ENUM_TEXTALIGN_RIGHT
                }
                return this._fast_filltext(t, e, i, s, r, a, n, h, o, u, _)
            }
        }
    }
    D.useOldCharBook = !1,
    D.atlasWidth = 1024,
    D.noAtlas = !1,
    D.forceSplitRender = !1,
    D.forceWholeRender = !1,
    D.scaleFontWithCtx = !0,
    D.standardFontSize = 32,
    D.destroyAtlasDt = 10,
    D.checkCleanTextureDt = 2e3,
    D.destroyUnusedTextureDt = 3e3,
    D.cleanMem = 104857600,
    D.isWan1Wan = !1,
    D.showLog = !1,
    D.debugUV = !1,
    D.tmpRI = new oe,
    D.pixelBBX = [0, 0, 0, 0],
    D.imgdtRect = [0, 0, 0, 0],
    D.simClean = !1,
    se.gTextRender = D;
    class L {
        constructor() {
            var t;
            this._tmpMatrix = new y,
            this._drawTexToDrawTri_Vert = new Float32Array(8),
            this._drawTexToDrawTri_Index = new Uint16Array([0, 1, 2, 0, 2, 3]),
            this._tempUV = new Float32Array(8),
            this._drawTriUseAbsMatrix = !1,
            this._id = ++L._COUNT,
            this._other = null,
            this._renderNextSubmitIndex = 0,
            this._path = null,
            this._drawCount = 1,
            this._width = L._MAXSIZE,
            this._height = L._MAXSIZE,
            this._renderCount = 0,
            this._submits = null,
            this._curSubmit = null,
            this._submitKey = new dt,
            this._pathMesh = null,
            this._triangleMesh = null,
            this.meshlist = [],
            this._transedPoints = new Array(8),
            this._temp4Points = new Array(8),
            this._clipRect = L.MAXCLIPRECT,
            this._globalClipMatrix = new y(L._MAXSIZE,0,0,L._MAXSIZE,0,0),
            this._clipInCache = !1,
            this._clipInfoID = 0,
            this._clipID_Gen = 0,
            this._lastMatScaleX = 1,
            this._lastMatScaleY = 1,
            this._lastMat_a = 1,
            this._lastMat_b = 0,
            this._lastMat_c = 0,
            this._lastMat_d = 1,
            this._nBlendType = 0,
            this._save = null,
            this._targets = null,
            this._charSubmitCache = null,
            this._saveMark = null,
            this._shader2D = new zt,
            this.sprite = null,
            this._italicDeg = 0,
            this._lastTex = null,
            this._fillColor = 0,
            this._flushCnt = 0,
            this.defTexture = null,
            this._colorFiler = null,
            this.drawTexAlign = !1,
            this._incache = !1,
            this.isMain = !1,
            L._contextcount++,
            L._textRender = L._textRender || new D,
            this.defTexture || ((t = new rt(2,2)).setPixels(new Uint8Array(16)),
            t.lock = !0,
            this.defTexture = new ae(t)),
            this._lastTex = this.defTexture,
            this.clear()
        }
        static __init__() {
            L.MAXCLIPRECT = new E(0,0,L._MAXSIZE,L._MAXSIZE),
            ce.DEFAULT = new ce
        }
        drawImage() {}
        getImageData() {}
        measureText(t) {
            return null
        }
        setTransform() {}
        $transform(t, e, i, s, r, a) {}
        get lineJoin() {
            return ""
        }
        set lineJoin(t) {}
        get lineCap() {
            return ""
        }
        set lineCap(t) {}
        get miterLimit() {
            return ""
        }
        set miterLimit(t) {}
        clearRect(t, e, i, s) {}
        _drawRect(t, e, i, s, r) {
            g.renderBatches++,
            r && (this.fillStyle = r),
            this.fillRect(t, e, i, s, null)
        }
        drawTexture2(t, e, i, s, r, a) {}
        transformByMatrix(t, e, i) {
            this.transform(t.a, t.b, t.c, t.d, t.tx + e, t.ty + i)
        }
        saveTransform(t) {
            this.save()
        }
        restoreTransform(t) {
            this.restore()
        }
        drawRect(t, e, i, s, r, a, n) {
            var h = this;
            null != r && (h.fillStyle = r,
            h.fillRect(t, e, i, s)),
            null != a && (h.strokeStyle = a,
            h.lineWidth = n,
            h.strokeRect(t, e, i, s))
        }
        alpha(t) {
            this.globalAlpha *= t
        }
        _transform(t, e, i) {
            this.translate(e, i),
            this.transform(t.a, t.b, t.c, t.d, t.tx, t.ty),
            this.translate(-e, -i)
        }
        _rotate(t, e, i) {
            this.translate(e, i),
            this.rotate(t),
            this.translate(-e, -i)
        }
        _scale(t, e, i, s) {
            this.translate(i, s),
            this.scale(t, e),
            this.translate(-i, -s)
        }
        _drawLine(t, e, i, s, r, a, n, h, o) {
            this.beginPath(),
            this.strokeStyle = n,
            this.lineWidth = h,
            this.moveTo(t + i, e + s),
            this.lineTo(t + r, e + a),
            this.stroke()
        }
        _drawLines(t, e, i, s, r, a) {
            this.beginPath(),
            this.strokeStyle = s,
            this.lineWidth = r,
            this.addPath(i.slice(), !1, !1, t, e),
            this.stroke()
        }
        drawCurves(t, e, i, s, r) {
            this.beginPath(),
            this.strokeStyle = s,
            this.lineWidth = r,
            this.moveTo(t + i[0], e + i[1]);
            for (var a = 2, n = i.length; a < n; )
                this.quadraticCurveTo(t + i[a++], e + i[a++], t + i[a++], e + i[a++]);
            this.stroke()
        }
        _fillAndStroke(t, e, i, s=0) {
            null != t && (this.fillStyle = t,
            this.fill()),
            null != e && 0 < i && (this.strokeStyle = e,
            this.lineWidth = i,
            this.stroke())
        }
        _drawCircle(t, e, i, s, r, a, n) {
            g.renderBatches++,
            this.beginPath(!0),
            this.arc(t, e, i, 0, L.PI2),
            this.closePath(),
            this._fillAndStroke(s, r, a)
        }
        _drawPie(t, e, i, s, r, a, n, h, o) {
            this.beginPath(),
            this.moveTo(t, e),
            this.arc(t, e, i, s, r),
            this.closePath(),
            this._fillAndStroke(a, n, h)
        }
        _drawPoly(t, e, i, s, r, a, n, h) {
            this.beginPath(),
            this.addPath(i.slice(), !0, n, t, e),
            this.closePath(),
            this._fillAndStroke(s, r, a, n)
        }
        _drawPath(t, e, i, s, r) {
            this.beginPath();
            for (var a = 0, n = i.length; a < n; a++) {
                var h = i[a];
                switch (h[0]) {
                case "moveTo":
                    this.moveTo(t + h[1], e + h[2]);
                    break;
                case "lineTo":
                    this.lineTo(t + h[1], e + h[2]);
                    break;
                case "arcTo":
                    this.arcTo(t + h[1], e + h[2], t + h[3], e + h[4], h[5]);
                    break;
                case "closePath":
                    this.closePath()
                }
            }
            null != s && (this.fillStyle = s.fillStyle,
            this.fill()),
            null != r && (this.strokeStyle = r.strokeStyle,
            this.lineWidth = r.lineWidth || 1,
            this.lineJoin = r.lineJoin,
            this.lineCap = r.lineCap,
            this.miterLimit = r.miterLimit,
            this.stroke())
        }
        static set2DRenderConfig() {
            var t = d.instance;
            m.setBlend(t, !0),
            m.setBlendEquation(t, t.FUNC_ADD),
            A.activeBlendFunction = null,
            m.setBlendFunc(t, t.ONE, t.ONE_MINUS_SRC_ALPHA),
            m.setDepthTest(t, !1),
            m.setCullFace(t, !1),
            m.setDepthMask(t, !0),
            m.setFrontFace(t, t.CCW),
            t.viewport(0, 0, l.width, l.height),
            t.enable(t.SCISSOR_TEST),
            t.scissor(0, 0, l.width, l.height)
        }
        clearBG(t, e, i, s) {
            var r = m.mainContext;
            r.clearColor(t, e, i, s),
            r.clear(r.COLOR_BUFFER_BIT)
        }
        _getSubmits() {
            return this._submits
        }
        _releaseMem(t=!1) {
            if (this._submits) {
                this._curMat && this._curMat.destroy(),
                this._curMat = null,
                this._shader2D.destroy(),
                this._shader2D = null,
                this._charSubmitCache.clear();
                for (var e, i = 0, s = this._submits._length; i < s; i++)
                    this._submits[i].releaseRender();
                for (this._submits.length = 0,
                this._submits._length = 0,
                this._submits = null,
                this._curSubmit = null,
                this._path = null,
                this._save = null,
                i = 0,
                e = this.meshlist.length; i < e; i++)
                    this.meshlist[i].destroy();
                this.meshlist.length = 0,
                this.sprite = null,
                t || (this._targets && this._targets.destroy(),
                this._targets = null)
            }
        }
        destroy(t=!1) {
            --L._contextcount,
            this.sprite = null,
            this._releaseMem(t),
            this._charSubmitCache && this._charSubmitCache.destroy(),
            this._mesh.destroy(),
            t || (this._targets && this._targets.destroy(),
            this._targets = null)
        }
        clear() {
            this._submits || (this._other = ce.DEFAULT,
            this._curMat = y.create(),
            this._charSubmitCache = new ee,
            this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh),
            this._pathMesh = Xt.getAMesh(this.isMain),
            this.meshlist.push(this._pathMesh),
            this._triangleMesh = Vt.getAMesh(this.isMain),
            this.meshlist.push(this._triangleMesh),
            this._submits = [],
            this._save = [Pt.Create(this)],
            this._save.length = 10,
            this._shader2D = new zt),
            this._submitKey.clear(),
            this._mesh.clearVB(),
            this._drawCount = 1,
            this._other = ce.DEFAULT,
            this._other.lineWidth = this._shader2D.ALPHA = 1,
            this._nBlendType = 0,
            this._clipRect = L.MAXCLIPRECT,
            this._curSubmit = w.RENDERBASE,
            w.RENDERBASE._ref = 16777215,
            w.RENDERBASE._numEle = 0,
            this._shader2D.fillStyle = this._shader2D.strokeStyle = St.DEFAULT;
            for (var t = 0, e = this._submits._length; t < e; t++)
                this._submits[t].releaseRender();
            this._submits._length = 0,
            this._curMat.identity(),
            this._other.clear(),
            this._saveMark = this._save[0],
            this._save._length = 1
        }
        size(t, e) {
            this._width == t && this._height == e || (this._width = t,
            this._height = e,
            this._targets && (this._targets.destroy(),
            this._targets = new nt(t,e,v.RenderTextureFormat.R8G8B8A8,-1)),
            this.isMain && (m.mainContext.viewport(0, 0, t, e),
            l.width = t,
            l.height = e)),
            0 === t && 0 === e && this._releaseMem()
        }
        set asBitmap(t) {
            if (t) {
                let t = this._targets;
                if (!this._width || !this._height)
                    throw Error("asBitmap no size!");
                t && t.width == this._width && t.height == this._height || (t && t.destroy(),
                this._targets = new nt(this._width,this._height,v.RenderTextureFormat.R8G8B8A8,-1))
            } else
                this._targets && this._targets.destroy(),
                this._targets = null
        }
        getMatScaleX() {
            return this._lastMat_a == this._curMat.a && this._lastMat_b == this._curMat.b || (this._lastMatScaleX = this._curMat.getScaleX(),
            this._lastMat_a = this._curMat.a,
            this._lastMat_b = this._curMat.b),
            this._lastMatScaleX
        }
        getMatScaleY() {
            return this._lastMat_c == this._curMat.c && this._lastMat_d == this._curMat.d || (this._lastMatScaleY = this._curMat.getScaleY(),
            this._lastMat_c = this._curMat.c,
            this._lastMat_d = this._curMat.d),
            this._lastMatScaleY
        }
        setFillColor(t) {
            this._fillColor = t
        }
        getFillColor() {
            return this._fillColor
        }
        set fillStyle(t) {
            this._shader2D.fillStyle.equal(t) || (a.save(this, a.TYPE_FILESTYLE, this._shader2D, !1),
            this._shader2D.fillStyle = St.create(t),
            this._submitKey.other = -this._shader2D.fillStyle.toInt())
        }
        get fillStyle() {
            return this._shader2D.fillStyle
        }
        set globalAlpha(t) {
            (t = Math.floor(1e3 * t) / 1e3) != this._shader2D.ALPHA && (a.save(this, a.TYPE_ALPHA, this._shader2D, !1),
            this._shader2D.ALPHA = t)
        }
        get globalAlpha() {
            return this._shader2D.ALPHA
        }
        set textAlign(t) {
            this._other.textAlign !== t && (this._other = this._other.make(),
            a.save(this, a.TYPE_TEXTALIGN, this._other, !1),
            this._other.textAlign = t)
        }
        get textAlign() {
            return this._other.textAlign
        }
        set textBaseline(t) {
            this._other.textBaseline !== t && (this._other = this._other.make(),
            a.save(this, a.TYPE_TEXTBASELINE, this._other, !1),
            this._other.textBaseline = t)
        }
        get textBaseline() {
            return this._other.textBaseline
        }
        set globalCompositeOperation(t) {
            t = A.TOINT[t];
            null != t && this._nBlendType !== t && (a.save(this, a.TYPE_GLOBALCOMPOSITEOPERATION, this, !0),
            this._curSubmit = w.RENDERBASE,
            this._nBlendType = t)
        }
        get globalCompositeOperation() {
            return A.NAMES[this._nBlendType]
        }
        set strokeStyle(t) {
            this._shader2D.strokeStyle.equal(t) || (a.save(this, a.TYPE_STROKESTYLE, this._shader2D, !1),
            this._shader2D.strokeStyle = St.create(t),
            this._submitKey.other = -this._shader2D.strokeStyle.toInt())
        }
        get strokeStyle() {
            return this._shader2D.strokeStyle
        }
        translate(t, e) {
            0 === t && 0 === e || (Lt.save(this),
            this._curMat._bTransform ? (Dt.save(this),
            this._curMat.tx += t * this._curMat.a + e * this._curMat.c,
            this._curMat.ty += t * this._curMat.b + e * this._curMat.d) : (this._curMat.tx = t,
            this._curMat.ty = e))
        }
        set lineWidth(t) {
            this._other.lineWidth !== t && (this._other = this._other.make(),
            a.save(this, a.TYPE_LINEWIDTH, this._other, !1),
            this._other.lineWidth = t)
        }
        get lineWidth() {
            return this._other.lineWidth
        }
        save() {
            this._save[this._save._length++] = Pt.Create(this)
        }
        restore() {
            var t = this._save._length
              , e = this._nBlendType;
            if (!(t < 1)) {
                for (var i = t - 1; 0 <= i; i--) {
                    var s = this._save[i];
                    if (s.restore(this),
                    s.isSaveMark())
                        return void (this._save._length = i)
                }
                e != this._nBlendType && (this._curSubmit = w.RENDERBASE)
            }
        }
        set font(t) {
            this._other = this._other.make(),
            a.save(this, a.TYPE_FONT, this._other, !1)
        }
        fillText(t, e, i, s, r, a, n=0, h="") {
            L._textRender.filltext(this, t, e, i, s, r, h, n, a)
        }
        drawText(t, e, i, s, r, a) {
            L._textRender.filltext(this, t, e, i, s, r, null, 0, a)
        }
        fillWords(t, e, i, s, r) {
            L._textRender.fillWords(this, t, e, i, s, r, null, 0)
        }
        strokeWord(t, e, i, s, r, a, n) {
            L._textRender.filltext(this, t, e, i, s, null, r, a, n)
        }
        fillBorderText(t, e, i, s, r, a, n, h) {
            L._textRender.filltext(this, t, e, i, s, r, a, n, h)
        }
        fillBorderWords(t, e, i, s, r, a, n) {
            L._textRender.fillWords(this, t, e, i, s, r, a, n)
        }
        _fast_filltext(t, e, i, s, r, a, n, h, o=0) {
            L._textRender._fast_filltext(this, t, null, e, i, s, r, a, n, h, o)
        }
        _fillRect(t, e, i, s, r) {
            var a = this._curSubmit
              , n = a && a._key.submitType === w.KEY_DRAWTEXTURE && a._key.blendShader === this._nBlendType;
            this._mesh.vertNum + 4 > L._MAXVERTNUM && (this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh),
            n = !1),
            n = n && (n && this.isSameClipInfo(a)),
            this.transformQuad(t, e, i, s, 0, this._curMat, this._transedPoints),
            this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, ae.NO_UV, r, !1),
            n || (a = this._curSubmit = te.create(this, this._mesh, ct.create(b.TEXTURE2D, 0)),
            this._submits[this._submits._length++] = a,
            this._copyClipInfo(a, this._globalClipMatrix),
            a.shaderValue.textureHost = this._lastTex,
            a._key.other = this._lastTex && this._lastTex.bitmap ? this._lastTex.bitmap.id : -1,
            a._renderType = w.TYPE_TEXTURE),
            this._curSubmit._numEle += 6,
            this._mesh.indexNum += 6,
            this._mesh.vertNum += 4)
        }
        fillRect(t, e, i, s, r) {
            r = r ? St.create(r) : this._shader2D.fillStyle,
            r = this.mixRGBandAlpha(r.toInt());
            this._fillRect(t, e, i, s, r)
        }
        fillTexture(t, e, i, s, r, a, n, h) {
            t._getSource() ? this._fillTexture(t, t.width, t.height, t.uvrect, e, i, s, r, a, n.x, n.y) : this.sprite && R.systemTimer.callLater(this, this._repaintSprite)
        }
        _fillTexture(t, e, i, s, r, a, n, h, o, l, _) {
            var u = this._curSubmit
              , c = (this._mesh.vertNum + 4 > L._MAXVERTNUM && (this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh)),
            !0)
              , d = !0;
            switch (o) {
            case "repeat":
                break;
            case "repeat-x":
                d = !1;
                break;
            case "repeat-y":
                c = !1;
                break;
            case "no-repeat":
                c = d = !1
            }
            var o = this._temp4Points
              , p = 0
              , m = 0
              , g = 0
              , f = 0
              , T = 0
              , x = 0;
            l < 0 ? (g = r,
            p = -l % e / e) : g = r + l,
            _ < 0 ? (f = a,
            m = -_ % i / i) : f = a + _,
            T = r + n,
            x = a + h,
            c || (T = Math.min(T, r + l + e)),
            d || (x = Math.min(x, a + _ + i)),
            T < r || x < a || T < g || x < f || (n = (T - r - l) / e,
            h = (x - a - _) / i,
            this.transformQuad(g, f, T - g, x - f, 0, this._curMat, this._transedPoints),
            o[0] = p,
            o[1] = m,
            o[2] = n,
            o[3] = m,
            o[4] = n,
            o[5] = h,
            o[6] = p,
            o[7] = h,
            this.clipedOff(this._transedPoints) || (r = this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA),
            this._mesh.addQuad(this._transedPoints, o, r, !0),
            (l = ct.create(b.TEXTURE2D, 0)).defines.add(b.FILLTEXTURE),
            l.u_TexRange = s.concat(),
            u = this._curSubmit = te.create(this, this._mesh, l),
            this._submits[this._submits._length++] = u,
            this._copyClipInfo(u, this._globalClipMatrix),
            u.shaderValue.textureHost = t,
            u._renderType = w.TYPE_TEXTURE,
            this._curSubmit._numEle += 6,
            this._mesh.indexNum += 6,
            this._mesh.vertNum += 4),
            this.breakNextMerge())
        }
        setColorFilter(t) {
            a.save(this, a.TYPE_COLORFILTER, this, !0),
            this._colorFiler = t,
            this._curSubmit = w.RENDERBASE
        }
        drawTexture(t, e, i, s, r) {
            this._drawTextureM(t, e, i, s, r, null, 1, null)
        }
        drawTextures(t, e, i, s) {
            if (t._getSource())
                for (var r = e.length / 2, a = 0, n = t.bitmap.id, h = 0; h < r; h++)
                    this._inner_drawTexture(t, n, e[a++] + i, e[a++] + s, 0, 0, null, null, 1, !1);
            else
                this.sprite && R.systemTimer.callLater(this, this._repaintSprite)
        }
        _drawTextureAddSubmit(t, e) {
            var i = null
              , i = te.create(this, this._mesh, ct.create(b.TEXTURE2D, 0));
            (this._submits[this._submits._length++] = i).shaderValue.textureHost = e,
            i._key.other = t,
            i._renderType = w.TYPE_TEXTURE,
            this._curSubmit = i
        }
        _drawTextureM(t, e, i, s, r, a, n, h) {
            var o = this.sprite;
            return !!t._getSource(function() {
                o && o.repaint()
            }) && this._inner_drawTexture(t, t.bitmap.id, e, i, s, r, a, h, n, !1)
        }
        _drawRenderTexture(t, e, i, s, r, a, n, h) {
            return this._inner_drawTexture(t, -1, e, i, s, r, a, h, 1, !1)
        }
        submitDebugger() {
            this._submits[this._submits._length++] = pt.create([], function() {}, this)
        }
        _copyClipInfo(t, e) {
            var i = t.shaderValue.clipMatDir
              , i = (i[0] = e.a,
            i[1] = e.b,
            i[2] = e.c,
            i[3] = e.d,
            t.shaderValue.clipMatPos);
            i[0] = e.tx,
            i[1] = e.ty,
            t.clipInfoID = this._clipInfoID,
            this._clipInCache && (t.shaderValue.clipOff[0] = 1)
        }
        isSameClipInfo(t) {
            return t.clipInfoID === this._clipInfoID
        }
        _useNewTex2DSubmit(t, e) {
            this._mesh.vertNum + e > L._MAXVERTNUM && (this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh));
            e = te.create(this, this._mesh, ct.create(b.TEXTURE2D, 0));
            (this._submits[this._submits._length++] = this._curSubmit = e).shaderValue.textureHost = t,
            this._copyClipInfo(e, this._globalClipMatrix)
        }
        _drawTexRect(t, e, i, s, r) {
            this.transformQuad(t, e, i, s, this._italicDeg, this._curMat, this._transedPoints);
            t = this._transedPoints;
            t[0] = t[0] + .5 | 0,
            t[1] = t[1] + .5 | 0,
            t[2] = t[2] + .5 | 0,
            t[3] = t[3] + .5 | 0,
            t[4] = t[4] + .5 | 0,
            t[5] = t[5] + .5 | 0,
            t[6] = t[6] + .5 | 0,
            t[7] = t[7] + .5 | 0,
            this.clipedOff(this._transedPoints) || (this._mesh.addQuad(this._transedPoints, r, this._fillColor, !0),
            this._curSubmit._numEle += 6,
            this._mesh.indexNum += 6,
            this._mesh.vertNum += 4)
        }
        drawCallOptimize(t) {
            return this._charSubmitCache.enable(t, this),
            t
        }
        _inner_drawTexture(t, e, i, s, r, a, n, h, o, l) {
            if (r <= 0 || a <= 0)
                return !1;
            var _ = this._curSubmit._key;
            if (h = h || t._uv,
            _.submitType === w.KEY_TRIANGLES && _.other === e)
                return (u = this._drawTexToDrawTri_Vert)[0] = i,
                u[1] = s,
                u[2] = i + r,
                u[3] = s,
                u[4] = i + r,
                u[5] = s + a,
                u[6] = i,
                u[7] = s + a,
                this._drawTriUseAbsMatrix = !0,
                (c = this._tempUV)[0] = h[0],
                c[1] = h[1],
                c[2] = h[2],
                c[3] = h[3],
                c[4] = h[4],
                c[5] = h[5],
                c[6] = h[6],
                c[7] = h[7],
                this.drawTriangles(t, 0, 0, u, c, this._drawTexToDrawTri_Index, n || this._curMat, o, null, null),
                !(this._drawTriUseAbsMatrix = !1);
            var u = this._mesh
              , c = this._curSubmit
              , d = l ? this._charSubmitCache.getPos() : this._transedPoints
              , s = (this.transformQuad(i, s, r || t.width, a || t.height, this._italicDeg, n || this._curMat, d),
            this.drawTexAlign && (i = Math.round,
            d[0] = i(d[0]),
            d[1] = i(d[1]),
            d[2] = i(d[2]),
            d[3] = i(d[3]),
            d[4] = i(d[4]),
            d[5] = i(d[5]),
            d[6] = i(d[6]),
            d[7] = i(d[7]),
            this.drawTexAlign = !1),
            this._mixRGBandAlpha(4294967295, this._shader2D.ALPHA * o));
            if (l)
                return this._charSubmitCache.add(this, t, e, d, h, s),
                !0;
            this._drawCount++;
            r = (r = 0 <= e && _.submitType === w.KEY_DRAWTEXTURE && _.other === e) && r && this.isSameClipInfo(c);
            return this._lastTex = t,
            u.vertNum + 4 > L._MAXVERTNUM && (u = this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(u),
            r = !1),
            u.addQuad(d, h, s, !0),
            r || (this._submits[this._submits._length++] = this._curSubmit = c = te.create(this, u, ct.create(b.TEXTURE2D, 0)),
            c.shaderValue.textureHost = t,
            c._key.other = e,
            this._copyClipInfo(c, this._globalClipMatrix)),
            c._numEle += 6,
            u.indexNum += 6,
            u.vertNum += 4,
            !0
        }
        transform4Points(t, e, i) {
            var s = e.tx
              , r = e.ty
              , a = e.a
              , n = e.b
              , h = e.c
              , o = e.d
              , l = t[0]
              , _ = t[1]
              , u = t[2]
              , c = t[3]
              , d = t[4]
              , p = t[5]
              , m = t[6]
              , t = t[7];
            e._bTransform ? (i[0] = l * a + _ * h + s,
            i[1] = l * n + _ * o + r,
            i[2] = u * a + c * h + s,
            i[3] = u * n + c * o + r,
            i[4] = d * a + p * h + s,
            i[5] = d * n + p * o + r,
            i[6] = m * a + t * h + s,
            i[7] = m * n + t * o + r) : (i[0] = l + s,
            i[1] = _ + r,
            i[2] = u + s,
            i[3] = c + r,
            i[4] = d + s,
            i[5] = p + r,
            i[6] = m + s,
            i[7] = t + r)
        }
        clipedOff(t) {
            return this._clipRect.width <= 0 || this._clipRect.height <= 0
        }
        transformQuad(t, e, i, s, r, a, n) {
            var h = 0
              , r = (0 != r && (h = Math.tan(r * Math.PI / 180) * s),
            t + i)
              , i = e + s
              , s = a.tx
              , o = a.ty
              , l = a.a
              , _ = a.b
              , u = a.c
              , c = a.d
              , d = t + h
              , p = e
              , h = r + h
              , m = i;
            a._bTransform ? (n[0] = d * l + p * u + s,
            n[1] = d * _ + p * c + o,
            n[2] = h * l + e * u + s,
            n[3] = h * _ + e * c + o,
            n[4] = r * l + m * u + s,
            n[5] = r * _ + m * c + o,
            n[6] = t * l + i * u + s,
            n[7] = t * _ + i * c + o) : (n[0] = d + s,
            n[1] = p + o,
            n[2] = h + s,
            n[3] = e + o,
            n[4] = r + s,
            n[5] = m + o,
            n[6] = t + s,
            n[7] = i + o)
        }
        pushRT() {
            this.addRenderObject(pt.create(null, nt.pushRT, this))
        }
        popRT() {
            this.addRenderObject(pt.create(null, nt.popRT, this)),
            this.breakNextMerge()
        }
        useRT(t) {
            this.addRenderObject(pt.create([t], function(t) {
                if (!t)
                    throw "error useRT";
                t.start(),
                t.clear(0, 0, 0, 0)
            }, this)),
            this.breakNextMerge()
        }
        RTRestore(t) {
            this.addRenderObject(pt.create([t], function(t) {
                t.restore()
            }, this)),
            this.breakNextMerge()
        }
        breakNextMerge() {
            this._curSubmit = w.RENDERBASE
        }
        _repaintSprite() {
            this.sprite && this.sprite.repaint()
        }
        drawTextureWithTransform(t, e, i, s, r, a, n, h, o, l, _=null, u) {
            var c, d = this._curMat, p = (l && (c = this.globalCompositeOperation,
            this.globalCompositeOperation = l),
            this._colorFiler);
            if (_ && this.setColorFilter(_),
            !a)
                return this._drawTextureM(t, e + n, i + h, s, r, d, o, u),
                l && (this.globalCompositeOperation = c),
                void (_ && this.setColorFilter(p));
            var m = this._tmpMatrix;
            m.a = a.a,
            m.b = a.b,
            m.c = a.c,
            m.d = a.d,
            m.tx = a.tx + n,
            m.ty = a.ty + h,
            m._bTransform = a._bTransform,
            a && d._bTransform ? (y.mul(m, d, m),
            (a = m)._bTransform = !0) : (m.tx += d.tx,
            m.ty += d.ty,
            a = m),
            this._drawTextureM(t, e, i, s, r, a, o, u),
            l && (this.globalCompositeOperation = c),
            _ && this.setColorFilter(p)
        }
        _flushToTarget(t, e) {
            l.worldScissorTest = !1;
            var i = d.instance
              , i = (i.disable(i.SCISSOR_TEST),
            l.worldAlpha)
              , s = l.worldMatrix4
              , r = l.worldMatrix;
            l.worldMatrix = y.EMPTY,
            l.restoreTempArray(),
            l.worldMatrix4 = l.TEMPMAT4_ARRAY,
            l.worldAlpha = 1,
            at.activeShader = null,
            e.start(),
            0 < t._submits._length && e.clear(0, 0, 0, 0),
            t._curSubmit = w.RENDERBASE,
            t.flush(),
            t.clear(),
            e.restore(),
            t._curSubmit = w.RENDERBASE,
            at.activeShader = null,
            l.worldAlpha = i,
            l.worldMatrix4 = s,
            l.worldMatrix = r
        }
        drawCanvas(t, e, i, s, r) {
            var a, n;
            t && ((n = t.context)._targets ? (0 < n._submits._length && (a = pt.create([n, n._targets], this._flushToTarget, this),
            this._submits[this._submits._length++] = a),
            this._drawRenderTexture(n._targets, e, i, s, r, null, 1, nt.flipyuv)) : ((n = t).touches && n.touches.forEach(function(t) {
                t.touch()
            }),
            a = $t.create(t, this._shader2D.ALPHA, this._shader2D.filters),
            (this._submits[this._submits._length++] = a)._key.clear(),
            s = a._matrix,
            this._curMat.copyTo(s),
            r = s.tx,
            t = s.ty,
            s.tx = s.ty = 0,
            s.transformPoint(q.TEMP.setTo(e, i)),
            s.translate(q.TEMP.x + r, q.TEMP.y + t),
            y.mul(n.invMat, s, s)),
            this._curSubmit = w.RENDERBASE)
        }
        drawTarget(t, e, i, s, r, a, n, h=null, o=-1) {
            return this._drawCount++,
            this._mesh.vertNum + 4 > L._MAXVERTNUM && (this._mesh = Yt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh)),
            this.transformQuad(e, i, s, r, 0, a || this._curMat, this._transedPoints),
            this.clipedOff(this._transedPoints) ? (this._curSubmit = w.RENDERBASE,
            !1) : (this._mesh.addQuad(this._transedPoints, h || ae.DEF_UV, 4294967295, !0),
            (e = this._curSubmit = Jt.create(this, this._mesh, n, t)).blendType = -1 == o ? this._nBlendType : o,
            this._copyClipInfo(e, this._globalClipMatrix),
            e._numEle = 6,
            this._mesh.indexNum += 6,
            this._mesh.vertNum += 4,
            this._submits[this._submits._length++] = e,
            this._curSubmit = w.RENDERBASE,
            !0)
        }
        drawTriangles(t, e, i, s, r, a, n, h, o, l, _=4294967295) {
            var u, c, d, p, m, g;
            t._getSource() ? (u = null,
            l && (u = this.globalCompositeOperation,
            this.globalCompositeOperation = l),
            this._drawCount++,
            c = this._tmpMatrix,
            d = this._triangleMesh,
            p = null,
            m = !1,
            o && (p = this._colorFiler,
            this._colorFiler = o,
            this._curSubmit = w.RENDERBASE,
            m = p != o),
            (o = t.bitmap) ? (g = (g = this._curSubmit._key).submitType === w.KEY_TRIANGLES && g.other === o.id && g.blendShader == this._nBlendType,
            d.vertNum + s.length / 2 > L._MAXVERTNUM && (d = this._triangleMesh = Vt.getAMesh(this.isMain),
            this.meshlist.push(d),
            g = !1),
            g || ((g = this._curSubmit = te.create(this, d, ct.create(b.TEXTURE2D, 0))).shaderValue.textureHost = t,
            g._renderType = w.TYPE_TEXTURE,
            g._key.submitType = w.KEY_TRIANGLES,
            g._key.other = o.id,
            this._copyClipInfo(g, this._globalClipMatrix),
            this._submits[this._submits._length++] = g),
            o = this._mixRGBandAlpha(_, this._shader2D.ALPHA * h),
            this._drawTriUseAbsMatrix ? d.addData(s, r, a, n, o) : (n ? (c.a = n.a,
            c.b = n.b,
            c.c = n.c,
            c.d = n.d,
            c.tx = n.tx + e,
            c.ty = n.ty + i) : (c.a = 1,
            c.b = 0,
            c.c = 0,
            c.d = 1,
            c.tx = e,
            c.ty = i),
            y.mul(c, this._curMat, c),
            d.addData(s, r, a, c || this._curMat, o)),
            this._curSubmit._numEle += a.length,
            m && (this._colorFiler = p,
            this._curSubmit = w.RENDERBASE),
            l && (this.globalCompositeOperation = u)) : console.log("webGLImg", t)) : this.sprite && R.systemTimer.callLater(this, this._repaintSprite)
        }
        transform(t, e, i, s, r, a) {
            Dt.save(this),
            y.mul(y.TEMP.setTo(t, e, i, s, r, a), this._curMat, this._curMat),
            this._curMat._checkTransform()
        }
        _transformByMatrix(t, e, i) {
            t.setTranslate(e, i),
            y.mul(t, this._curMat, this._curMat),
            t.setTranslate(0, 0),
            this._curMat._bTransform = !0
        }
        setTransformByMatrix(t) {
            t.copyTo(this._curMat)
        }
        rotate(t) {
            Dt.save(this),
            this._curMat.rotateEx(t)
        }
        scale(t, e) {
            Dt.save(this),
            this._curMat.scaleEx(t, e)
        }
        clipRect(t, e, i, s) {
            It.save(this),
            this._clipRect == L.MAXCLIPRECT ? this._clipRect = new E(t,e,i,s) : (this._clipRect.width = i,
            this._clipRect.height = s,
            this._clipRect.x = t,
            this._clipRect.y = e),
            this._clipID_Gen++,
            this._clipID_Gen %= 1e4,
            this._clipInfoID = this._clipID_Gen;
            var r, a, i = this._globalClipMatrix, s = i.tx, t = i.ty, e = s + i.a, n = t + i.d;
            this._clipRect.width >= L._MAXSIZE ? (i.a = i.d = L._MAXSIZE,
            i.b = i.c = i.tx = i.ty = 0) : (this._curMat._bTransform ? (i.tx = this._clipRect.x * this._curMat.a + this._clipRect.y * this._curMat.c + this._curMat.tx,
            i.ty = this._clipRect.x * this._curMat.b + this._clipRect.y * this._curMat.d + this._curMat.ty,
            i.a = this._clipRect.width * this._curMat.a,
            i.b = this._clipRect.width * this._curMat.b,
            i.c = this._clipRect.height * this._curMat.c,
            i.d = this._clipRect.height * this._curMat.d) : (i.tx = this._clipRect.x + this._curMat.tx,
            i.ty = this._clipRect.y + this._curMat.ty,
            i.a = this._clipRect.width,
            i.b = i.c = 0,
            i.d = this._clipRect.height),
            this._incache && (this._clipInCache = !0)),
            0 < i.a && 0 < i.d && (r = i.tx + i.a,
            a = i.ty + i.d,
            r <= s || a <= t || i.tx >= e || i.ty >= n ? (i.a = -.1,
            i.d = -.1) : (i.tx < s && (i.a -= s - i.tx,
            i.tx = s),
            e < r && (i.a -= r - e),
            i.ty < t && (i.d -= t - i.ty,
            i.ty = t),
            n < a && (i.d -= a - n),
            i.a <= 0 && (i.a = -.1),
            i.d <= 0 && (i.d = -.1)))
        }
        drawMesh(t, e, i, s, r, a, n, h, o=0) {}
        addRenderObject(t) {
            this._submits[this._submits._length++] = t
        }
        submitElement(t, e) {
            this.isMain;
            for (var i = this._submits, s = i._length, r = (e < 0 && (e = i._length),
            w.RENDERBASE); t < e; )
                this._renderNextSubmitIndex = t + 1,
                i[t] === w.RENDERBASE ? t++ : (w.preRender = r,
                t += (r = i[t]).renderSubmit());
            return s
        }
        flush() {
            this._clipID_Gen = 0;
            var t = this.submitElement(0, this._submits._length);
            this._path && this._path.reset(),
            Kt.instance && Kt.getInstance().reset(),
            this._curSubmit = w.RENDERBASE;
            for (var e = 0, i = this.meshlist.length; e < i; e++) {
                var s = this.meshlist[e];
                s.canReuse ? s.releaseMesh() : s.destroy()
            }
            return this.meshlist.length = 0,
            this._mesh = Yt.getAMesh(this.isMain),
            this._pathMesh = Xt.getAMesh(this.isMain),
            this._triangleMesh = Vt.getAMesh(this.isMain),
            this.meshlist.push(this._mesh, this._pathMesh, this._triangleMesh),
            this._flushCnt++,
            this._flushCnt % 60 == 0 && this.isMain && D.textRenderInst && D.textRenderInst.GC(),
            t
        }
        beginPath(t=!1) {
            this._getPath().beginPath(t)
        }
        closePath() {
            this._path.closePath()
        }
        addPath(t, e, i, s, r) {
            for (var a = 0, n = 0, h = t.length / 2; n < h; n++) {
                var o = t[a] + s
                  , l = t[a + 1] + r;
                t[a] = o,
                t[a + 1] = l,
                a += 2
            }
            this._getPath().push(t, i)
        }
        fill() {
            var t = this._curMat
              , e = this._getPath()
              , i = this._curSubmit
              , s = i._key.submitType === w.KEY_VG && i._key.blendShader === this._nBlendType;
            (s = s && (s && this.isSameClipInfo(i))) || (this._curSubmit = this.addVGSubmit(this._pathMesh));
            for (var r = this.mixRGBandAlpha(this.fillStyle.toInt()), a = 0, n = 0, h = e.paths.length; n < h; n++) {
                var o = e.paths[n]
                  , l = o.path.length / 2;
                if (!(l < 3 || 3 == l && !o.convex)) {
                    var _, u, c, d, p = o.path.concat(), m = 0;
                    if (t._bTransform)
                        for (m = 0; m < l; m++)
                            c = p[_ = m << 1],
                            d = p[u = _ + 1],
                            p[_] = t.a * c + t.c * d + t.tx,
                            p[u] = t.b * c + t.d * d + t.ty;
                    else
                        for (m = 0; m < l; m++)
                            c = p[_ = m << 1],
                            d = p[u = _ + 1],
                            p[_] = c + t.tx,
                            p[u] = d + t.ty;
                    this._pathMesh.vertNum + l > L._MAXVERTNUM && (this._curSubmit._numEle += a,
                    a = 0,
                    this._pathMesh = Xt.getAMesh(this.isMain),
                    this._curSubmit = this.addVGSubmit(this._pathMesh));
                    var g = this._pathMesh.vertNum;
                    if (o.convex)
                        for (var f = l - 2, T = new Array(3 * f), x = 0, v = 0; v < f; v++)
                            T[x++] = g,
                            T[x++] = v + 1 + g,
                            T[x++] = v + 2 + g;
                    else if (T = M.earcut(p, null, 2),
                    0 < g)
                        for (var y = 0; y < T.length; y++)
                            T[y] += g;
                    this._pathMesh.addVertAndIBToMesh(this, p, r, T),
                    a += T.length
                }
            }
            this._curSubmit._numEle += a
        }
        addVGSubmit(t) {
            t = Qt.createShape(this, t, 0, ct.create(b.PRIMITIVE, 0));
            return t._key.submitType = w.KEY_VG,
            this._submits[this._submits._length++] = t,
            this._copyClipInfo(t, this._globalClipMatrix),
            t
        }
        stroke() {
            if (0 < this.lineWidth) {
                var t = this.mixRGBandAlpha(this.strokeStyle._color.numColor)
                  , e = this._getPath()
                  , i = this._curSubmit
                  , s = i._key.submitType === w.KEY_VG && i._key.blendShader === this._nBlendType;
                (s = s && (s && this.isSameClipInfo(i))) || (this._curSubmit = this.addVGSubmit(this._pathMesh));
                for (var r = 0, a = 0, n = e.paths.length; a < n; a++) {
                    var h = e.paths[a];
                    if (!(h.path.length <= 0)) {
                        var o = []
                          , l = []
                          , _ = 2 * h.path.length;
                        if (!(_ < 2)) {
                            this._pathMesh.vertNum + _ > L._MAXVERTNUM && (this._curSubmit._numEle += r,
                            r = 0,
                            this._pathMesh = Xt.getAMesh(this.isMain),
                            this.meshlist.push(this._pathMesh),
                            this._curSubmit = this.addVGSubmit(this._pathMesh)),
                            jt.createLine2(h.path, o, this.lineWidth, this._pathMesh.vertNum, l, h.loop);
                            var u, c, d, p, m = l.length / 2, g = this._curMat, f = 0;
                            if (g._bTransform)
                                for (f = 0; f < m; f++)
                                    d = l[u = f << 1],
                                    p = l[c = u + 1],
                                    l[u] = g.a * d + g.c * p + g.tx,
                                    l[c] = g.b * d + g.d * p + g.ty;
                            else
                                for (f = 0; f < m; f++)
                                    d = l[u = f << 1],
                                    p = l[c = u + 1],
                                    l[u] = d + g.tx,
                                    l[c] = p + g.ty;
                            this._pathMesh.addVertAndIBToMesh(this, l, t, o),
                            r += o.length
                        }
                    }
                }
                this._curSubmit._numEle += r
            }
        }
        moveTo(t, e) {
            var i = this._getPath();
            i.newPath(),
            i._lastOriX = t,
            i._lastOriY = e,
            i.addPoint(t, e)
        }
        lineTo(t, e) {
            var i = this._getPath();
            Math.abs(t - i._lastOriX) < .001 && Math.abs(e - i._lastOriY) < .001 || (i._lastOriX = t,
            i._lastOriY = e,
            i.addPoint(t, e))
        }
        arcTo(t, e, i, s, r) {
            var a = 0
              , n = 0
              , h = 0
              , o = this._path._lastOriX - t
              , l = this._path._lastOriY - e
              , _ = Math.sqrt(o * o + l * l);
            if (!(_ <= 1e-6)) {
                var o = o / _
                  , l = l / _
                  , i = i - t
                  , s = s - e
                  , u = Math.sqrt(i * i + s * s);
                if (!(u <= 1e-6)) {
                    var i = i / u
                      , s = s / u
                      , u = o + i
                      , c = l + s
                      , d = Math.sqrt(u * u + c * c);
                    if (!(d <= 1e-6))
                        for (var u = u / d, c = c / d, d = Math.acos(u * o + c * l), d = Math.PI / 2 - d, p = (_ = r / Math.tan(d)) * o + t, m = _ * l + e, _ = Math.sqrt(_ * _ + r * r), g = t + u * _, f = e + c * _, T = 0, x = 0, v = (x = (T = (r = 0 <= o * s - l * i ? 2 * d / L.SEGNUM : 2 * -d / L.SEGNUM,
                        Math.sin(r)),
                        Math.cos(r)),
                        this._path._lastOriX), y = this._path._lastOriY, t = p, u = m, E = ((.1 < Math.abs(t - this._path._lastOriX) || .1 < Math.abs(u - this._path._lastOriY)) && (v = n = t,
                        y = h = u,
                        this._path._lastOriX = n,
                        this._path._lastOriY = h,
                        this._path.addPoint(n, h)),
                        p - g), C = m - f, a = 0; a < L.SEGNUM; a++) {
                            var R = E * x + C * T
                              , A = -E * T + C * x
                              , n = R + g
                              , h = A + f;
                            (.1 < Math.abs(v - n) || .1 < Math.abs(y - h)) && (this._path._lastOriX = n,
                            this._path._lastOriY = h,
                            this._path.addPoint(n, h),
                            v = n,
                            y = h),
                            E = R,
                            C = A
                        }
                }
            }
        }
        arc(t, e, i, s, r, a=!1, n) {
            var h, o = 0, l = 0, _ = 0, u = 0, o = r - s;
            if (a)
                if (Math.abs(o) >= 2 * Math.PI)
                    o = 2 * -Math.PI;
                else
                    for (; 0 < o; )
                        o -= 2 * Math.PI;
            else if (Math.abs(o) >= 2 * Math.PI)
                o = 2 * Math.PI;
            else
                for (; o < 0; )
                    o += 2 * Math.PI;
            for (var a = this.getMatScaleX(), c = this.getMatScaleY(), a = 2 * Math.PI * (i * (c < a ? a : c)), d = 0 | Math.max(a / 10, 10), p = this._getPath(), m = 0; m <= d; m++)
                h = s + o * (m / d),
                l = Math.cos(h),
                u = e + Math.sin(h) * i,
                (_ = t + l * i) == this._path._lastOriX && u == this._path._lastOriY || p.addPoint(_, u);
            l = Math.cos(r),
            u = e + Math.sin(r) * i,
            (_ = t + l * i) == this._path._lastOriX && u == this._path._lastOriY || p.addPoint(_, u)
        }
        quadraticCurveTo(t, e, i, s) {
            for (var r = At.I.getBezierPoints([this._path._lastOriX, this._path._lastOriY, t, e, i, s], 30, 2), a = 0, n = r.length / 2; a < n; a++)
                this.lineTo(r[2 * a], r[2 * a + 1]);
            this.lineTo(i, s)
        }
        mixRGBandAlpha(t) {
            return this._mixRGBandAlpha(t, this._shader2D.ALPHA)
        }
        _mixRGBandAlpha(t, e) {
            if (1 <= e)
                return t;
            var i = (4278190080 & t) >>> 24;
            return 0 != i ? i *= e : i = 255 * e,
            16777215 & t | i << 24
        }
        strokeRect(t, e, i, s, r) {
            var a, n;
            0 < this.lineWidth && (a = this.mixRGBandAlpha(this.strokeStyle._color.numColor),
            n = this.lineWidth / 2,
            this._fillRect(t - n, e - n, i + this.lineWidth, this.lineWidth, a),
            this._fillRect(t - n, e - n + s, i + this.lineWidth, this.lineWidth, a),
            this._fillRect(t - n, e + n, this.lineWidth, s - this.lineWidth, a),
            this._fillRect(t - n + i, e + n, this.lineWidth, s - this.lineWidth, a))
        }
        clip() {}
        drawParticle(t, e, i) {
            i.x = t,
            i.y = e,
            this._submits[this._submits._length++] = i
        }
        _getPath() {
            return this._path || (this._path = new wt)
        }
        get canvas() {
            return this._canvas
        }
        _fillTexture_h(t, e, i, s, r, a, n, h) {
            s <= 0 && console.error("_fillTexture_h error: oriw must>0");
            for (var o, l = a, _ = Math.floor(h / s), a = h % s, u = 0; u < _; u++)
                this._inner_drawTexture(t, e, l, n, s, r, this._curMat, i, 1, !1),
                l += s;
            0 < a && (h = i[2] - i[0],
            h = i[0] + a / s * h,
            (o = L.tmpuv1)[0] = i[0],
            o[1] = i[1],
            o[2] = h,
            o[3] = i[3],
            o[4] = h,
            o[5] = i[5],
            o[6] = i[6],
            o[7] = i[7],
            this._inner_drawTexture(t, e, l, n, a, r, this._curMat, o, 1, !1))
        }
        _fillTexture_v(t, e, i, s, r, a, n, h) {
            r <= 0 && console.error("_fillTexture_v error: orih must>0");
            for (var o, l = n, _ = Math.floor(h / r), n = h % r, u = 0; u < _; u++)
                this._inner_drawTexture(t, e, a, l, s, r, this._curMat, i, 1, !1),
                l += r;
            0 < n && (h = i[7] - i[1],
            h = i[1] + n / r * h,
            (o = L.tmpuv1)[0] = i[0],
            o[1] = i[1],
            o[2] = i[2],
            o[3] = i[3],
            o[4] = i[4],
            o[5] = h,
            o[6] = i[6],
            o[7] = h,
            this._inner_drawTexture(t, e, a, l, s, n, this._curMat, o, 1, !1))
        }
        drawTextureWithSizeGrid(t, e, i, s, r, a, n, h) {
            var o, l, _, u, c, d, p, m, g, f, T, x, v, y, E, C, R, A;
            t._getSource() && (e += n,
            i += h,
            n = t.uv,
            h = t.bitmap.width,
            p = t.bitmap.height,
            o = a[0],
            l = a[3],
            _ = a[1],
            u = a[2],
            a = a[4],
            c = (o = r == p ? u = 0 : o) / p,
            d = (l = s == h ? _ = 0 : l) / h,
            h = _ / h,
            p = u / p,
            m = t.bitmap.id,
            g = this._curMat,
            f = this._tempUV,
            T = A = 1,
            _ *= A = s < l + _ ? s / (l + _) : A,
            o *= T = r < o + u ? r / (o + u) : T,
            u *= T,
            y = T = n[0],
            E = x = n[1],
            C = v = n[4],
            R = n = n[5],
            (l *= A) && o && (C = T + d,
            R = x + c,
            f[0] = T,
            f[1] = x,
            f[2] = C,
            f[3] = x,
            f[4] = C,
            f[5] = R,
            f[6] = T,
            f[7] = R,
            this._inner_drawTexture(t, m, e, i, l, o, g, f, 1, !1)),
            _ && o && (R = (E = x) + c,
            f[0] = y = (C = v) - h,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            this._inner_drawTexture(t, m, s - _ + e, 0 + i, _, o, g, f, 1, !1)),
            l && u && (E = n - p,
            C = (y = T) + d,
            R = n,
            f[0] = y,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            this._inner_drawTexture(t, m, 0 + e, r - u + i, l, u, g, f, 1, !1)),
            _ && u && (E = n - p,
            R = n,
            f[0] = y = (C = v) - h,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            this._inner_drawTexture(t, m, s - _ + e, r - u + i, _, u, g, f, 1, !1)),
            o && (C = v - h,
            R = (E = x) + c,
            f[0] = y = T + d,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            a ? this._fillTexture_h(t, m, f, t.width - l - _, o, l + e, i, s - l - _) : this._inner_drawTexture(t, m, l + e, i, s - l - _, o, g, f, 1, !1)),
            u && (E = n - p,
            C = v - h,
            R = n,
            f[0] = y = T + d,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            a ? this._fillTexture_h(t, m, f, t.width - l - _, u, l + e, r - u + i, s - l - _) : this._inner_drawTexture(t, m, l + e, r - u + i, s - l - _, u, g, f, 1, !1)),
            l && (E = x + c,
            C = (y = T) + d,
            R = n - p,
            f[0] = y,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            a ? this._fillTexture_v(t, m, f, l, t.height - o - u, e, o + i, r - o - u) : this._inner_drawTexture(t, m, e, o + i, l, r - o - u, g, f, 1, !1)),
            _ && (E = x + c,
            R = n - p,
            f[0] = y = (C = v) - h,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            a ? this._fillTexture_v(t, m, f, _, t.height - o - u, s - _ + e, o + i, r - o - u) : this._inner_drawTexture(t, m, s - _ + e, o + i, _, r - o - u, g, f, 1, !1)),
            E = x + c,
            C = v - h,
            R = n - p,
            f[0] = y = T + d,
            f[1] = E,
            f[2] = C,
            f[3] = E,
            f[4] = C,
            f[5] = R,
            f[6] = y,
            f[7] = R,
            a ? ((A = L.tmpUVRect)[0] = y,
            A[1] = E,
            A[2] = C - y,
            A[3] = R - E,
            this._fillTexture(t, t.width - l - _, t.height - o - u, A, l + e, o + i, s - l - _, r - o - u, "repeat", 0, 0)) : this._inner_drawTexture(t, m, l + e, o + i, s - l - _, r - o - u, g, f, 1, !1))
        }
    }
    L.ENUM_TEXTALIGN_DEFAULT = 0,
    L.ENUM_TEXTALIGN_CENTER = 1,
    L.ENUM_TEXTALIGN_RIGHT = 2,
    L._SUBMITVBSIZE = 32e3,
    L._MAXSIZE = 99999999,
    L._MAXVERTNUM = 65535,
    L.MAXCLIPRECT = null,
    L._COUNT = 0,
    L.SEGNUM = 32,
    L._contextcount = 0,
    L.PI2 = 2 * Math.PI,
    L._textRender = null,
    L.tmpuv1 = [0, 0, 0, 0, 0, 0, 0, 0],
    L.tmpUV = [0, 0, 0, 0, 0, 0, 0, 0],
    L.tmpUVRect = [0, 0, 0, 0];
    class ce {
        constructor() {
            this.lineWidth = 1
        }
        clear() {
            this.lineWidth = 1,
            this.textAlign = this.textBaseline = null
        }
        make() {
            return this === ce.DEFAULT ? new ce : this
        }
    }
    class de {
        static _uint8ArraySlice() {
            for (var t = this.length, e = new Uint8Array(this.length), i = 0; i < t; i++)
                e[i] = this[i];
            return e
        }
        static _float32ArraySlice() {
            for (var t = this.length, e = new Float32Array(this.length), i = 0; i < t; i++)
                e[i] = this[i];
            return e
        }
        static _uint16ArraySlice(...t) {
            var e, i, s;
            if (0 === t.length)
                for (e = this.length,
                i = new Uint16Array(e),
                s = 0; s < e; s++)
                    i[s] = this[s];
            else if (2 === t.length) {
                var r = t[0]
                  , a = t[1];
                if (r < a)
                    for (e = a - r,
                    i = new Uint16Array(e),
                    s = r; s < a; s++)
                        i[s - r] = this[s];
                else
                    i = new Uint16Array(0)
            }
            return i
        }
        static _nativeRender_enable() {}
        static enable() {
            return !0
        }
        static inner_enable() {
            return Float32Array.prototype.slice || (Float32Array.prototype.slice = de._float32ArraySlice),
            Uint16Array.prototype.slice || (Uint16Array.prototype.slice = de._uint16ArraySlice),
            Uint8Array.prototype.slice || (Uint8Array.prototype.slice = de._uint8ArraySlice),
            !0
        }
        static onStageResize(t, e) {
            null != m.mainContext && (m.mainContext.viewport(0, 0, t, e),
            l.width = t,
            l.height = e)
        }
    }
    de._isWebGL2 = !1,
    de.isNativeRender_enable = !1;
    var pe = {};
    function me(t, e) {
        pe[t] = !0,
        void 0 !== e && (t = e,
        window.console && window.console.error && window.console.error(t))
    }
    function ge(t) {
        var e = t.gl;
        this.ext = t,
        this.isAlive = !0,
        this.hasBeenBound = !1,
        this.elementArrayBuffer = null,
        this.attribs = new Array(t.maxVertexAttribs);
        for (var i = 0; i < this.attribs.length; i++) {
            var s = new ge.VertexAttrib(e);
            this.attribs[i] = s
        }
        this.maxAttrib = 0
    }
    function fe(s) {
        var i, r, h = this, o = (this.gl = s,
        r = (i = s).getError,
        i.getError = function() {
            for (var t, e; (t = r.apply(i)) != i.NO_ERROR && (pe[t] = !0),
            t != i.NO_ERROR; )
                ;
            for (e in pe)
                if (pe[e])
                    return delete pe[e],
                    parseInt(e);
            return i.NO_ERROR
        }
        ,
        this.original = {
            getParameter: s.getParameter,
            enableVertexAttribArray: s.enableVertexAttribArray,
            disableVertexAttribArray: s.disableVertexAttribArray,
            bindBuffer: s.bindBuffer,
            getVertexAttrib: s.getVertexAttrib,
            vertexAttribPointer: s.vertexAttribPointer
        });
        s.getParameter = function(t) {
            return t == h.VERTEX_ARRAY_BINDING_OES ? h.currentVertexArrayObject == h.defaultVertexArrayObject ? null : h.currentVertexArrayObject : o.getParameter.apply(this, arguments)
        }
        ,
        s.enableVertexAttribArray = function(t) {
            var e = h.currentVertexArrayObject;
            return e.maxAttrib = Math.max(e.maxAttrib, t),
            e.attribs[t].enabled = !0,
            o.enableVertexAttribArray.apply(this, arguments)
        }
        ,
        s.disableVertexAttribArray = function(t) {
            var e = h.currentVertexArrayObject;
            return e.maxAttrib = Math.max(e.maxAttrib, t),
            e.attribs[t].enabled = !1,
            o.disableVertexAttribArray.apply(this, arguments)
        }
        ,
        s.bindBuffer = function(t, e) {
            switch (t) {
            case s.ARRAY_BUFFER:
                h.currentArrayBuffer = e;
                break;
            case s.ELEMENT_ARRAY_BUFFER:
                h.currentVertexArrayObject.elementArrayBuffer = e
            }
            return o.bindBuffer.apply(this, arguments)
        }
        ,
        s.getVertexAttrib = function(t, e) {
            var i = h.currentVertexArrayObject.attribs[t];
            switch (e) {
            case s.VERTEX_ATTRIB_ARRAY_BUFFER_BINDING:
                return i.buffer;
            case s.VERTEX_ATTRIB_ARRAY_ENABLED:
                return i.enabled;
            case s.VERTEX_ATTRIB_ARRAY_SIZE:
                return i.size;
            case s.VERTEX_ATTRIB_ARRAY_STRIDE:
                return i.stride;
            case s.VERTEX_ATTRIB_ARRAY_TYPE:
                return i.type;
            case s.VERTEX_ATTRIB_ARRAY_NORMALIZED:
                return i.normalized;
            default:
                return o.getVertexAttrib.apply(this, arguments)
            }
        }
        ,
        s.vertexAttribPointer = function(t, e, i, s, r, a) {
            var n = h.currentVertexArrayObject
              , n = (n.maxAttrib = Math.max(n.maxAttrib, t),
            n.attribs[t]);
            return n.buffer = h.currentArrayBuffer,
            n.size = e,
            n.type = i,
            n.normalized = s,
            n.stride = r,
            n.offset = a,
            n.recache(),
            o.vertexAttribPointer.apply(this, arguments)
        }
        ,
        s.instrumentExtension && s.instrumentExtension(this, "OES_vertex_array_object"),
        s.canvas.addEventListener("webglcontextrestored", function() {
            window.console && window.console.log && window.console.log("OESVertexArrayObject emulation library context restored"),
            h.reset_()
        }, !0),
        this.reset_()
    }
    (ge.VertexAttrib = function(t) {
        this.enabled = !1,
        this.buffer = null,
        this.size = 4,
        this.type = t.FLOAT,
        this.normalized = !1,
        this.stride = 16,
        this.offset = 0,
        this.cached = "",
        this.recache()
    }
    ).prototype.recache = function() {
        this.cached = [this.size, this.type, this.normalized, this.stride, this.offset].join(":")
    }
    ,
    fe.prototype.VERTEX_ARRAY_BINDING_OES = 34229,
    fe.prototype.reset_ = function() {
        if (void 0 !== this.vertexArrayObjects)
            for (var t = 0; t < this.vertexArrayObjects.length; ++t)
                this.vertexArrayObjects.isAlive = !1;
        var e = this.gl;
        this.maxVertexAttribs = e.getParameter(e.MAX_VERTEX_ATTRIBS),
        this.defaultVertexArrayObject = new ge(this),
        this.currentVertexArrayObject = null,
        this.currentArrayBuffer = null,
        this.vertexArrayObjects = [this.defaultVertexArrayObject],
        this.bindVertexArrayOES(null)
    }
    ,
    fe.prototype.createVertexArrayOES = function() {
        var t = new ge(this);
        return this.vertexArrayObjects.push(t),
        t
    }
    ,
    fe.prototype.deleteVertexArrayOES = function(t) {
        t.isAlive = !1,
        this.vertexArrayObjects.splice(this.vertexArrayObjects.indexOf(t), 1),
        this.currentVertexArrayObject == t && this.bindVertexArrayOES(null)
    }
    ,
    fe.prototype.isVertexArrayOES = function(t) {
        return !!(t && t instanceof ge && t.hasBeenBound && t.ext == this)
    }
    ,
    fe.prototype.bindVertexArrayOES = function(t) {
        var e = this.gl;
        if (t && !t.isAlive)
            me(e.INVALID_OPERATION, "bindVertexArrayOES: attempt to bind deleted arrayObject");
        else {
            var i = this.original
              , s = this.currentVertexArrayObject
              , r = (this.currentVertexArrayObject = t || this.defaultVertexArrayObject,
            this.currentVertexArrayObject.hasBeenBound = !0,
            this.currentVertexArrayObject);
            if (s != r) {
                s && r.elementArrayBuffer == s.elementArrayBuffer || i.bindBuffer.call(e, e.ELEMENT_ARRAY_BUFFER, r.elementArrayBuffer);
                for (var a = this.currentArrayBuffer, n = Math.max(s ? s.maxAttrib : 0, r.maxAttrib), h = 0; h <= n; h++) {
                    var o, l = r.attribs[h], _ = s ? s.attribs[h] : null;
                    s && l.enabled == _.enabled || (l.enabled ? i.enableVertexAttribArray : i.disableVertexAttribArray).call(e, h),
                    l.enabled && (o = !1,
                    s && l.buffer == _.buffer || (a != l.buffer && (i.bindBuffer.call(e, e.ARRAY_BUFFER, l.buffer),
                    a = l.buffer),
                    o = !0),
                    !o && l.cached == _.cached || i.vertexAttribPointer.call(e, h, l.size, l.type, l.normalized, l.stride, l.offset))
                }
                this.currentArrayBuffer != a && i.bindBuffer.call(e, e.ARRAY_BUFFER, this.currentArrayBuffer)
            }
        }
    }
    ,
    window._setupVertexArrayObject = function(t) {
        var e = t.getSupportedExtensions
          , i = (t.getSupportedExtensions = function() {
            var t = e.call(this) || [];
            return t.indexOf("OES_vertex_array_object") < 0 && t.push("OES_vertex_array_object"),
            t
        }
        ,
        t.getExtension);
        t.getExtension = function(t) {
            var e = i.call(this, t);
            return e || ("OES_vertex_array_object" !== t ? null : (this.__OESVertexArrayObject || (console.log("Setup OES_vertex_array_object polyfill"),
            this.__OESVertexArrayObject = new fe(this)),
            this.__OESVertexArrayObject))
        }
    }
    ;
    class Te {
        constructor(t, e) {
            this._gl = null,
            this._vaoExt = null,
            this._angleInstancedArrays = null,
            this._isWebGL2 = !1,
            this._oesTextureHalfFloat = null,
            this._oes_element_index_uint = null,
            this._oesTextureHalfFloatLinear = null,
            this._oesTextureFloat = null,
            this._extShaderTextureLod = null,
            this._extTextureFilterAnisotropic = null,
            this._compressedTextureS3tc = null,
            this._compressedTexturePvrtc = null,
            this._compressedTextureEtc1 = null,
            this._compressedTextureETC = null,
            this._compressedTextureASTC = null,
            this._webgl_depth_texture = null,
            this._extColorBufferFloat = null,
            this._gl = t,
            this._isWebGL2 = e;
            var i = t.getParameter(t.MAX_TEXTURE_IMAGE_UNITS)
              , s = t.getParameter(t.MAX_TEXTURE_SIZE);
            e ? (this._extColorBufferFloat = this._getExtension("EXT_color_buffer_float"),
            st._shaderCapailityLevel = 35) : (R.Render.isConchApp || window._setupVertexArrayObject && window._setupVertexArrayObject(t),
            this._vaoExt = this._getExtension("OES_vertex_array_object"),
            this._angleInstancedArrays = this._getExtension("ANGLE_instanced_arrays"),
            this._oesTextureHalfFloat = this._getExtension("OES_texture_half_float"),
            this._oesTextureHalfFloatLinear = this._getExtension("OES_texture_half_float_linear"),
            this._oesTextureFloat = this._getExtension("OES_texture_float"),
            this._oes_element_index_uint = this._getExtension("OES_element_index_uint"),
            this._extShaderTextureLod = this._getExtension("EXT_shader_texture_lod"),
            this._webgl_depth_texture = this._getExtension("WEBGL_depth_texture"),
            st._shaderCapailityLevel = 30),
            this._extTextureFilterAnisotropic = this._getExtension("EXT_texture_filter_anisotropic"),
            this._compressedTextureS3tc = this._getExtension("WEBGL_compressed_texture_s3tc"),
            this._compressedTexturePvrtc = this._getExtension("WEBGL_compressed_texture_pvrtc"),
            this._compressedTextureEtc1 = this._getExtension("WEBGL_compressed_texture_etc1"),
            this._compressedTextureETC = this._getExtension("WEBGL_compressed_texture_etc"),
            this._compressedTextureASTC = this._getExtension("WEBGL_compressed_texture_astc"),
            st._maxTextureCount = i,
            st._maxTextureSize = s
        }
        _getExtension(t) {
            var e, i = Te._extentionVendorPrefixes;
            for (e in i) {
                var s = this._gl.getExtension(i[e] + t);
                if (s)
                    return s
            }
            return null
        }
        createVertexArray() {
            return this._isWebGL2 ? this._gl.createVertexArray() : this._vaoExt.createVertexArrayOES()
        }
        bindVertexArray(t) {
            this._isWebGL2 ? this._gl.bindVertexArray(t) : this._vaoExt.bindVertexArrayOES(t)
        }
        deleteVertexArray(t) {
            this._isWebGL2 ? this._gl.deleteVertexArray(t) : this._vaoExt.deleteVertexArrayOES(t)
        }
        isVertexArray(t) {
            this._isWebGL2 ? this._gl.isVertexArray(t) : this._vaoExt.isVertexArrayOES(t)
        }
        drawElementsInstanced(t, e, i, s, r) {
            this._isWebGL2 ? this._gl.drawElementsInstanced(t, e, i, s, r) : this._angleInstancedArrays.drawElementsInstancedANGLE(t, e, i, s, r)
        }
        drawArraysInstanced(t, e, i, s) {
            this._isWebGL2 ? this._gl.drawArraysInstanced(t, e, i, s) : this._angleInstancedArrays.drawArraysInstancedANGLE(t, e, i, s)
        }
        vertexAttribDivisor(t, e) {
            this._isWebGL2 ? this._gl.vertexAttribDivisor(t, e) : this._angleInstancedArrays.vertexAttribDivisorANGLE(t, e)
        }
        supportInstance() {
            return !(!this._isWebGL2 && !this._angleInstancedArrays || !n.allowGPUInstanceDynamicBatch)
        }
        supportElementIndexUint32() {
            return !(!this._isWebGL2 && !this._oes_element_index_uint)
        }
    }
    Te._extentionVendorPrefixes = ["", "WEBKIT_", "MOZ_"];
    class f {
        constructor(t, e, i) {
            this._timeId = 0,
            f._mainCanvas = i;
            let s = f._mainCanvas.source;
            s.id = "layaCanvas",
            s.width = t,
            s.height = e,
            f.isConchApp && document.body.appendChild(s),
            this.initRender(f._mainCanvas, t, e),
            window.requestAnimationFrame(function t(e) {
                R.stage._loop();
                window.requestAnimationFrame(t)
            }),
            R.stage.on("visibilitychange", this, this._onVisibilitychange)
        }
        _onVisibilitychange() {
            //Fix me 1
            //R.stage.isVisibility ? 0 != this._timeId && window.clearInterval(this._timeId) : this._timeId =
            if(!this._timeId)
                this._timeId = window.setInterval(this._enterFrame, 1e3)
        }
        initRender(t, e, i) {
            var s = d.instance = m.mainContext = function(t) {
                var e, i = ["webgl2", "webgl", "experimental-webgl", "webkit-3d", "moz-webgl"];
                n.useWebGL2 && !P.onBDMiniGame || i.shift();
                for (var s = 0; s < i.length; s++) {
                    try {
                        e = t.getContext(i[s], {
                            stencil: n.isStencil,
                            alpha: n.isAlpha,
                            antialias: n.isAntialias,
                            premultipliedAlpha: n.premultipliedAlpha,
                            preserveDrawingBuffer: n.preserveDrawingBuffer
                        })
                    } catch (t) {}
                    if (e)
                        return "webgl2" === i[s] && (de._isWebGL2 = !0),
                        e
                }
                return null
            }(f._mainCanvas.source);
            if (n.printWebglOrder && this._replaceWebglcall(s),
            !s)
                return !1;
            d.instance = s,
            d.layaGPUInstance = new Te(s,de._isWebGL2),
            t.size(e, i),
            L.__init__(),
            w.__init__();
            e = new L;
            return e.isMain = !0,
            f._context = e,
            t._setContext(e),
            b.__init__(),
            ct.__init__(),
            zt.__init__(),
            Ut.__int__(s),
            A._init_(s),
            !0
        }
        _replaceWebglcall(s) {
            var r = {};
            for (const a in s)
                "function" == typeof s[a] && "getError" != a && "__SPECTOR_Origin_getError" != a && "__proto__" != a && (r[a] = s[a],
                s[a] = function() {
                    let e = [];
                    for (let t = 0; t < arguments.length; t++)
                        e.push(arguments[t]);
                    var t = r[a].apply(s, e)
                      , i = (console.log(Nt.loopCount + ":gl." + a + ":" + e),
                    s.getError());
                    return i && console.log(i),
                    t
                }
                )
        }
        _enterFrame(t=0) {
            R.stage._loop()
        }
        static get context() {
            return f._context
        }
        static get canvas() {
            return f._mainCanvas.source
        }
    }
    f.supportWebGLPlusAnimation = !1,
    f.supportWebGLPlusRendering = !1,
    f.isConchApp = !1,
    f.isConchApp = null != window.conch,
    (f.isConchApp || null != window.qq && null != window.qq.webglPlus) && (f.supportWebGLPlusRendering = !1);
    class xe {
        static create(t, e, i, s, r, a, n, h, o, l, _) {
            var u = p.getItemByClass("DrawTrianglesCmd", xe);
            return u.texture = t,
            u.x = e,
            u.y = i,
            u.vertices = s,
            u.uvs = r,
            u.indices = a,
            u.matrix = n,
            u.alpha = h,
            o && (u.color = new ft,
            t = gt.create(o).arrColor,
            u.color.color(255 * t[0], 255 * t[1], 255 * t[2], 255 * t[3])),
            u.blendMode = l,
            u.colorNum = _,
            u
        }
        recover() {
            this.texture = null,
            this.vertices = null,
            this.uvs = null,
            this.indices = null,
            this.matrix = null,
            p.recover("DrawTrianglesCmd", this)
        }
        run(t, e, i) {
            t.drawTriangles(this.texture, this.x + e, this.y + i, this.vertices, this.uvs, this.indices, this.matrix, this.alpha, this.color, this.blendMode, this.colorNum)
        }
        get cmdID() {
            return xe.ID
        }
    }
    xe.ID = "DrawTriangles";
    class ve {
        constructor() {}
        static create(t, e, i, s, r, a) {
            var n = p.getItemByClass("Draw9GridTexture", ve);
            return (n.texture = t)._addReference(),
            n.x = e,
            n.y = i,
            n.width = s,
            n.height = r,
            n.sizeGrid = a,
            n
        }
        recover() {
            this.texture._removeReference(),
            p.recover("Draw9GridTexture", this)
        }
        run(t, e, i) {
            t.drawTextureWithSizeGrid(this.texture, this.x, this.y, this.width, this.height, this.sizeGrid, e, i)
        }
        get cmdID() {
            return ve.ID
        }
    }
    ve.ID = "Draw9GridTexture";
    class ye {
        static create() {
            return p.getItemByClass("SaveCmd", ye)
        }
        recover() {
            p.recover("SaveCmd", this)
        }
        run(t, e, i) {
            t.save()
        }
        get cmdID() {
            return ye.ID
        }
    }
    ye.ID = "Save";
    class T {
        constructor() {
            this._cacheBoundsType = !1
        }
        destroy() {
            this._graphics = null,
            this._cacheBoundsType = !1,
            this._temp && (this._temp.length = 0),
            this._rstBoundPoints && (this._rstBoundPoints.length = 0),
            this._bounds && this._bounds.recover(),
            this._bounds = null,
            p.recover("GraphicsBounds", this)
        }
        static create() {
            return p.getItemByClass("GraphicsBounds", T)
        }
        reset() {
            this._temp && (this._temp.length = 0)
        }
        getBounds(t=!1) {
            return this._bounds && this._temp && !(this._temp.length < 1) && t == this._cacheBoundsType || (this._bounds = E._getWrapRec(this.getBoundPoints(t), this._bounds)),
            this._cacheBoundsType = t,
            this._bounds
        }
        getBoundPoints(t=!1) {
            return (!this._temp || this._temp.length < 1 || t != this._cacheBoundsType) && (this._temp = this._getCmdPoints(t)),
            this._cacheBoundsType = t,
            this._rstBoundPoints = S.copyArray(this._rstBoundPoints, this._temp)
        }
        _getCmdPoints(t=!1) {
            var e = this._graphics.cmds
              , i = this._temp || (this._temp = []);
            if (i.length = 0,
            e || null == this._graphics._one || (T._tempCmds.length = 0,
            T._tempCmds.push(this._graphics._one),
            e = T._tempCmds),
            !e)
                return i;
            for (var s, r = T._tempMatrixArrays, a = (r.length = 0,
            T._initMatrix), n = (a.identity(),
            T._tempMatrix), h = 0, o = e.length; h < o; h++)
                switch ((s = e[h]).cmdID) {
                case G.ID:
                case ye.ID:
                    r.push(a),
                    a = a.clone();
                    break;
                case vt.ID:
                    a = r.pop();
                    break;
                case Et.ID:
                    n.identity(),
                    n.translate(-s.pivotX, -s.pivotY),
                    n.scale(s.scaleX, s.scaleY),
                    n.translate(s.pivotX, s.pivotY),
                    this._switchMatrix(a, n);
                    break;
                case yt.ID:
                    n.identity(),
                    n.translate(-s.pivotX, -s.pivotY),
                    n.rotate(s.angle),
                    n.translate(s.pivotX, s.pivotY),
                    this._switchMatrix(a, n);
                    break;
                case Rt.ID:
                    n.identity(),
                    n.translate(s.tx, s.ty),
                    this._switchMatrix(a, n);
                    break;
                case Ct.ID:
                    n.identity(),
                    n.translate(-s.pivotX, -s.pivotY),
                    n.concat(s.matrix),
                    n.translate(s.pivotX, s.pivotY),
                    this._switchMatrix(a, n);
                    break;
                case Y.ID:
                case xt.ID:
                    T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), a);
                    break;
                case Tt.ID:
                    a.copyTo(n),
                    s.matrix && n.concat(s.matrix),
                    T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), n);
                    break;
                case Y.ID:
                    var l, _, u, c, d, p, m = s.texture;
                    t ? s.width && s.height ? T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), a) : T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, m.width, m.height), a) : (l = (s.width || m.sourceWidth) / m.width,
                    _ = (s.height || m.sourceHeight) / m.height,
                    u = l * m.sourceWidth,
                    c = _ * m.sourceHeight,
                    d = 0 < m.offsetX ? m.offsetX : 0,
                    p = 0 < m.offsetY ? m.offsetY : 0,
                    d *= l,
                    p *= _,
                    T._addPointArrToRst(i, E._getBoundPointS(s.x - d, s.y - p, u, c), a));
                    break;
                case xt.ID:
                    s.width && s.height ? T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), a) : (m = s.texture,
                    T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, m.width, m.height), a));
                    break;
                case Tt.ID:
                    var g = s.matrix ? (a.copyTo(n),
                    n.concat(s.matrix),
                    n) : a;
                    t ? s.width && s.height ? T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), g) : (m = s.texture,
                    T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, m.width, m.height), g)) : (m = s.texture,
                    l = (s.width || m.sourceWidth) / m.width,
                    _ = (s.height || m.sourceHeight) / m.height,
                    u = l * m.sourceWidth,
                    c = _ * m.sourceHeight,
                    d = 0 < m.offsetX ? m.offsetX : 0,
                    p = 0 < m.offsetY ? m.offsetY : 0,
                    d *= l,
                    p *= _,
                    T._addPointArrToRst(i, E._getBoundPointS(s.x - d, s.y - p, u, c), g));
                    break;
                case j.ID:
                    T._addPointArrToRst(i, E._getBoundPointS(s.x, s.y, s.width, s.height), a);
                    break;
                case k.ID:
                    T._addPointArrToRst(i, E._getBoundPointS(s.x - s.radius, s.y - s.radius, s.radius + s.radius, s.radius + s.radius), a);
                    break;
                case V.ID:
                    T._tempPoints.length = 0,
                    g = .5 * s.lineWidth,
                    s.fromX == s.toX ? T._tempPoints.push(s.fromX + g, s.fromY, s.toX + g, s.toY, s.fromX - g, s.fromY, s.toX - g, s.toY) : s.fromY == s.toY ? T._tempPoints.push(s.fromX, s.fromY + g, s.toX, s.toY + g, s.fromX, s.fromY - g, s.toX, s.toY - g) : T._tempPoints.push(s.fromX, s.fromY, s.toX, s.toY),
                    T._addPointArrToRst(i, T._tempPoints, a);
                    break;
                case W.ID:
                    T._addPointArrToRst(i, At.I.getBezierPoints(s.points), a, s.x, s.y);
                    break;
                case X.ID:
                case K.ID:
                    T._addPointArrToRst(i, s.points, a, s.x, s.y);
                    break;
                case H.ID:
                    T._addPointArrToRst(i, this._getPathPoints(s.paths), a, s.x, s.y);
                    break;
                case z.ID:
                    T._addPointArrToRst(i, this._getPiePoints(s.x, s.y, s.radius, s.startAngle, s.endAngle), a);
                    break;
                case xe.ID:
                    T._addPointArrToRst(i, this._getTriAngBBXPoints(s.vertices), a);
                    break;
                case ve.ID:
                    T._addPointArrToRst(i, this._getDraw9GridBBXPoints(s), a)
                }
            return 200 < i.length ? i = S.copyArray(i, E._getWrapRec(i)._getBoundPoints()) : 8 < i.length && (i = bt.scanPList(i)),
            i
        }
        _switchMatrix(t, e) {
            e.concat(t),
            e.copyTo(t)
        }
        static _addPointArrToRst(t, e, i, s=0, r=0) {
            for (var a = e.length, n = 0; n < a; n += 2)
                T._addPointToRst(t, e[n] + s, e[n + 1] + r, i)
        }
        static _addPointToRst(t, e, i, s) {
            var r = q.TEMP;
            r.setTo(e || 0, i || 0),
            s.transformPoint(r),
            t.push(r.x, r.y)
        }
        _getPiePoints(t, e, i, s, r) {
            var a = T._tempPoints
              , n = (T._tempPoints.length = 0,
            Math.PI / 180)
              , r = r - s;
            if (360 <= r || r <= -360)
                return a.push(t - i, e - i),
                a.push(t + i, e - i),
                a.push(t + i, e + i),
                a.push(t - i, e + i),
                a;
            a.push(t, e);
            for (var r = r % 360, r = (r < 0 && (r += 360),
            s + r), h = s * n, o = r * n, h = (a.push(t + i * Math.cos(h), e + i * Math.sin(h)),
            a.push(t + i * Math.cos(o), e + i * Math.sin(o)),
            90 * Math.ceil(s / 90)), l = 90 * Math.floor(r / 90), _ = h; _ <= l; _ += 90) {
                var u = _ * n;
                a.push(t + i * Math.cos(u), e + i * Math.sin(u))
            }
            return a
        }
        _getTriAngBBXPoints(t) {
            var e = t.length;
            if (e < 2)
                return [];
            for (var i = t[0], s = t[1], r = i, a = s, n = 2; n < e; ) {
                var h = t[n++]
                  , o = t[n++];
                h < i && (i = h),
                o < s && (s = o),
                r < h && (r = h),
                a < o && (a = o)
            }
            return [i, s, r, s, r, a, i, a]
        }
        _getDraw9GridBBXPoints(t) {
            var e = t.width
              , t = t.height;
            return [0, 0, e, 0, e, t, 0, t]
        }
        _getPathPoints(t) {
            var e, i, s, r = T._tempPoints;
            for (r.length = 0,
            i = t.length,
            e = 0; e < i; e++)
                1 < (s = t[e]).length && (r.push(s[1], s[2]),
                3 < s.length && r.push(s[3], s[4]));
            return r
        }
    }
    T._tempMatrix = new y,
    T._initMatrix = new y,
    T._tempPoints = [],
    T._tempMatrixArrays = [],
    T._tempCmds = [];
    class x {
    }
    x.ALPHA = 1,
    x.TRANSFORM = 2,
    x.BLEND = 4,
    x.CANVAS = 8,
    x.FILTERS = 16,
    x.MASK = 32,
    x.CLIP = 64,
    x.STYLE = 128,
    x.TEXTURE = 256,
    x.GRAPHICS = 512,
    x.LAYAGL3D = 1024,
    x.CUSTOM = 2048,
    x.ONECHILD = 4096,
    x.CHILDS = 8192,
    x.REPAINT_NONE = 0,
    x.REPAINT_NODE = 1,
    x.REPAINT_CACHE = 2,
    x.REPAINT_ALL = 3;
    class Ee {
        static create(t, e, i, s) {
            var r = p.getItemByClass("ClipRectCmd", Ee);
            return r.x = t,
            r.y = e,
            r.width = i,
            r.height = s,
            r
        }
        recover() {
            p.recover("ClipRectCmd", this)
        }
        run(t, e, i) {
            t.clipRect(this.x + e, this.y + i, this.width, this.height)
        }
        get cmdID() {
            return Ee.ID
        }
    }
    Ee.ID = "ClipRect";
    class Ce {
        static create(t, e) {
            var i = p.getItemByClass("DrawTexturesCmd", Ce);
            return (i.texture = t)._addReference(),
            i.pos = e,
            i
        }
        recover() {
            this.texture._removeReference(),
            this.texture = null,
            this.pos = null,
            p.recover("DrawTexturesCmd", this)
        }
        run(t, e, i) {
            t.drawTextures(this.texture, this.pos, e, i)
        }
        get cmdID() {
            return Ce.ID
        }
    }
    Ce.ID = "DrawTextures";
    class Re {
        constructor() {
            this._textIsWorldText = !1,
            this._fontColor = 4294967295,
            this._strokeColor = 0,
            this._fontObj = Re._defFontObj,
            this._nTexAlign = 0
        }
        static create(t, e, i, s, r, a, n, h, o) {
            var l = p.getItemByClass("FillTextCmd", Re);
            return l.text = t,
            l._textIsWorldText = t instanceof he,
            l._words = e,
            l.x = i,
            l.y = s,
            l.font = r,
            l.color = a,
            l.textAlign = n,
            l._lineWidth = h,
            l._borderColor = o,
            l
        }
        recover() {
            p.recover("FillTextCmd", this)
        }
        run(t, e, i) {
            R.stage.isGlobalRepaint() && this._textIsWorldText && this._text.cleanCache(),
            this._words ? L._textRender.fillWords(t, this._words, this.x + e, this.y + i, this._fontObj, this._color, this._borderColor, this._lineWidth) : this._textIsWorldText ? t._fast_filltext(this._text, this.x + e, this.y + i, this._fontObj, this._color, this._borderColor, this._lineWidth, this._nTexAlign, 0) : L._textRender.filltext(t, this._text, this.x + e, this.y + i, this.font, this.color, this._borderColor, this._lineWidth, this._textAlign)
        }
        get cmdID() {
            return Re.ID
        }
        get text() {
            return this._text
        }
        set text(t) {
            this._text = t,
            this._textIsWorldText = t instanceof he,
            this._textIsWorldText && this._text.cleanCache()
        }
        get font() {
            return this._font
        }
        set font(t) {
            this._font = t,
            this._fontObj = ne.Parse(t),
            this._textIsWorldText && this._text.cleanCache()
        }
        get color() {
            return this._color
        }
        set color(t) {
            this._color = t,
            this._fontColor = gt.create(t).numColor,
            this._textIsWorldText && this._text.cleanCache()
        }
        get textAlign() {
            return this._textAlign
        }
        set textAlign(t) {
            switch (this._textAlign = t) {
            case "center":
                this._nTexAlign = R.Context.ENUM_TEXTALIGN_CENTER;
                break;
            case "right":
                this._nTexAlign = R.Context.ENUM_TEXTALIGN_RIGHT;
                break;
            default:
                this._nTexAlign = R.Context.ENUM_TEXTALIGN_DEFAULT
            }
            this._textIsWorldText && this._text.cleanCache()
        }
    }
    Re.ID = "FillText",
    Re._defFontObj = new ne(null);
    class Ae {
        constructor() {}
        static regCacheByFunction(t, e) {
            Ae.unRegCacheByFunction(t, e),
            t = {
                tryDispose: t,
                getCacheList: e
            },
            Ae._cacheList.push(t)
        }
        static unRegCacheByFunction(t, e) {
            for (var i = Ae._cacheList.length, s = 0; s < i; s++)
                if (Ae._cacheList[s].tryDispose == t && Ae._cacheList[s].getCacheList == e)
                    return void Ae._cacheList.splice(s, 1)
        }
        static forceDispose() {
            for (var t = Ae._cacheList.length, e = 0; e < t; e++)
                Ae._cacheList[e].tryDispose(!0)
        }
        static beginCheck(t=15e3) {
            R.systemTimer.loop(t, null, Ae._checkLoop)
        }
        static stopCheck() {
            R.systemTimer.clear(null, Ae._checkLoop)
        }
        static _checkLoop() {
            var t = Ae._cacheList;
            if (!(t.length < 1))
                for (var e, i = R.Browser.now(), s = e = t.length; 0 < e && (Ae._index++,
                Ae._index = Ae._index % s,
                t[Ae._index].tryDispose(!1),
                !(R.Browser.now() - i > Ae.loopTimeLimit)); )
                    e--
        }
    }
    Ae.loopTimeLimit = 2,
    Ae._cacheList = [],
    Ae._index = 0;
    class be {
        constructor() {
            this.useDic = {},
            this.shapeDic = {},
            this.shapeLineDic = {},
            this._id = 0,
            this._checkKey = !1,
            this._freeIdArray = [],
            Ae.regCacheByFunction(this.startDispose.bind(this), this.getCacheList.bind(this))
        }
        static getInstance() {
            return be.instance = be.instance || new be
        }
        getId() {
            return this._id++
        }
        addShape(t, e) {
            this.shapeDic[t] = e,
            this.useDic[t] || (this.useDic[t] = !0)
        }
        addLine(t, e) {
            this.shapeLineDic[t] = e,
            this.shapeLineDic[t] || (this.shapeLineDic[t] = !0)
        }
        getShape(t) {
            this._checkKey && null != this.useDic[t] && (this.useDic[t] = !0)
        }
        deleteShape(t) {
            this.shapeDic[t] && (this.shapeDic[t] = null,
            delete this.shapeDic[t]),
            this.shapeLineDic[t] && (this.shapeLineDic[t] = null,
            delete this.shapeLineDic[t]),
            null != this.useDic[t] && delete this.useDic[t]
        }
        getCacheList() {
            var t, e = [];
            for (t in this.shapeDic)
                e.push(this.shapeDic[t]);
            for (t in this.shapeLineDic)
                e.push(this.shapeLineDic[t]);
            return e
        }
        startDispose(t) {
            for (var e in this.useDic)
                this.useDic[e] = !1;
            this._checkKey = !0
        }
        endDispose() {
            if (this._checkKey) {
                for (var t in this.useDic)
                    this.useDic[t] || this.deleteShape(t);
                this._checkKey = !1
            }
        }
    }
    class Se {
        constructor() {
            this._sp = null,
            this._one = null,
            this._render = this._renderEmpty,
            this._cmds = null,
            this._vectorgraphArray = null,
            this._graphicBounds = null,
            this.autoDestroy = !1,
            this._createData()
        }
        _createData() {}
        _clearData() {}
        _destroyData() {}
        destroy() {
            this.clear(!0),
            this._graphicBounds && this._graphicBounds.destroy(),
            this._graphicBounds = null,
            this._vectorgraphArray = null,
            this._sp && (this._sp._renderType = 0,
            this._sp._setRenderType(0),
            this._sp = null),
            this._destroyData()
        }
        clear(t=!0) {
            if (t) {
                var e = this._one;
                if (this._cmds) {
                    for (var i = this._cmds.length, s = 0; s < i; s++)
                        (e = this._cmds[s]).recover();
                    this._cmds.length = 0
                } else
                    e && e.recover()
            } else
                this._cmds = null;
            if (this._one = null,
            this._render = this._renderEmpty,
            this._clearData(),
            this._sp && (this._sp._renderType &= ~x.GRAPHICS,
            this._sp._setRenderType(this._sp._renderType)),
            this._repaint(),
            this._vectorgraphArray) {
                for (s = 0,
                i = this._vectorgraphArray.length; s < i; s++)
                    be.getInstance().deleteShape(this._vectorgraphArray[s]);
                this._vectorgraphArray.length = 0
            }
        }
        _clearBoundsCache() {
            this._graphicBounds && this._graphicBounds.reset()
        }
        _initGraphicBounds() {
            this._graphicBounds || (this._graphicBounds = T.create(),
            this._graphicBounds._graphics = this)
        }
        _repaint() {
            this._clearBoundsCache(),
            this._sp && this._sp.repaint()
        }
        _isOnlyOne() {
            return !this._cmds || 0 === this._cmds.length
        }
        get cmds() {
            return this._cmds
        }
        set cmds(t) {
            this._sp && (this._sp._renderType |= x.GRAPHICS,
            this._sp._setRenderType(this._sp._renderType)),
            this._cmds = t,
            this._render = this._renderAll,
            this._repaint()
        }
        getBounds(t=!1) {
            return this._initGraphicBounds(),
            this._graphicBounds.getBounds(t)
        }
        getBoundPoints(t=!1) {
            return this._initGraphicBounds(),
            this._graphicBounds.getBoundPoints(t)
        }
        drawImage(t, e=0, i=0, s=0, r=0) {
            if (!t)
                return null;
            if (s = s || t.sourceWidth,
            r = r || t.sourceHeight,
            t.getIsReady()) {
                var a = s / t.sourceWidth
                  , n = r / t.sourceHeight;
                if (s = t.width * a,
                r = t.height * n,
                s <= 0 || r <= 0)
                    return null;
                e += t.offsetX * a,
                i += t.offsetY * n
            }
            this._sp && (this._sp._renderType |= x.GRAPHICS,
            this._sp._setRenderType(this._sp._renderType));
            a = Y.create.call(this, t, e, i, s, r);
            return null == this._one ? (this._one = a,
            this._render = this._renderOneImg) : this._saveToCmd(null, a),
            this._repaint(),
            a
        }
        drawTexture(t, e=0, i=0, s=0, r=0, a=null, n=1, h=null, o=null, l) {
            if (!t || n < .01)
                return null;
            if (!t.getIsReady())
                return null;
            if (s = s || t.sourceWidth,
            r = r || t.sourceHeight,
            t.getIsReady()) {
                var _ = s / t.sourceWidth
                  , u = r / t.sourceHeight;
                if (s = t.width * _,
                r = t.height * u,
                s <= 0 || r <= 0)
                    return null;
                e += t.offsetX * _,
                i += t.offsetY * u
            }
            this._sp && (this._sp._renderType |= x.GRAPHICS,
            this._sp._setRenderType(this._sp._renderType));
            _ = Tt.create.call(this, t, e, i, s, r, a, n, h, o, l);
            return this._repaint(),
            this._saveToCmd(null, _)
        }
        drawTextures(t, e) {
            return t ? this._saveToCmd(f._context.drawTextures, Ce.create.call(this, t, e)) : null
        }
        drawTriangles(t, e, i, s, r, a, n=null, h=1, o=null, l=null, _=4294967295) {
            return this._saveToCmd(f._context.drawTriangles, xe.create.call(this, t, e, i, s, r, a, n, h, o, l, _))
        }
        fillTexture(t, e, i, s=0, r=0, a="repeat", n=null) {
            return t && t.getIsReady() ? this._saveToCmd(f._context._fillTexture, xt.create.call(this, t, e, i, s, r, a, n || q.EMPTY, {})) : null
        }
        _saveToCmd(t, e) {
            return this._sp && (this._sp._renderType |= x.GRAPHICS,
            this._sp._setRenderType(this._sp._renderType)),
            null == this._one ? (this._one = e,
            this._render = this._renderOne) : (this._render = this._renderAll,
            0 === (this._cmds || (this._cmds = [])).length && this._cmds.push(this._one),
            this._cmds.push(e)),
            this._repaint(),
            e
        }
        clipRect(t, e, i, s) {
            return this._saveToCmd(f._context.clipRect, Ee.create.call(this, t, e, i, s))
        }
        fillText(t, e, i, s, r, a) {
            return this._saveToCmd(f._context.fillText, Re.create.call(this, t, null, e, i, s || R.Text.defaultFontStr(), r, a, 0, ""))
        }
        fillBorderText(t, e, i, s, r, a, n, h) {
            return this._saveToCmd(f._context.fillText, Re.create.call(this, t, null, e, i, s || R.Text.defaultFontStr(), r, a, n, h))
        }
        fillWords(t, e, i, s, r) {
            return this._saveToCmd(f._context.fillText, Re.create.call(this, null, t, e, i, s || R.Text.defaultFontStr(), r, "", 0, null))
        }
        fillBorderWords(t, e, i, s, r, a, n) {
            return this._saveToCmd(f._context.fillText, Re.create.call(this, null, t, e, i, s || R.Text.defaultFontStr(), r, "", n, a))
        }
        strokeText(t, e, i, s, r, a, n) {
            return this._saveToCmd(f._context.fillText, Re.create.call(this, t, null, e, i, s || R.Text.defaultFontStr(), null, n, a, r))
        }
        alpha(t) {
            return this._saveToCmd(f._context.alpha, G.create.call(this, t))
        }
        transform(t, e=0, i=0) {
            return this._saveToCmd(f._context._transform, Ct.create.call(this, t, e, i))
        }
        rotate(t, e=0, i=0) {
            return this._saveToCmd(f._context._rotate, yt.create.call(this, t, e, i))
        }
        scale(t, e, i=0, s=0) {
            return this._saveToCmd(f._context._scale, Et.create.call(this, t, e, i, s))
        }
        translate(t, e) {
            return this._saveToCmd(f._context.translate, Rt.create.call(this, t, e))
        }
        save() {
            return this._saveToCmd(f._context._save, ye.create.call(this))
        }
        restore() {
            return this._saveToCmd(f._context.restore, vt.create.call(this))
        }
        replaceText(t) {
            this._repaint();
            var e = this._cmds;
            if (e) {
                for (var i = e.length - 1; -1 < i; i--)
                    if (this._isTextCmd(e[i]))
                        return e[i].text = t,
                        !0
            } else if (this._one && this._isTextCmd(this._one))
                return this._one.text = t,
                !0;
            return !1
        }
        _isTextCmd(t) {
            return t.cmdID == Re.ID
        }
        replaceTextColor(t) {
            this._repaint();
            var e = this._cmds;
            if (e)
                for (var i = e.length - 1; -1 < i; i--)
                    this._isTextCmd(e[i]) && this._setTextCmdColor(e[i], t);
            else
                this._one && this._isTextCmd(this._one) && this._setTextCmdColor(this._one, t)
        }
        _setTextCmdColor(t, e) {
            t.cmdID === Re.ID && (t.color = e)
        }
        loadImage(t, e=0, i=0, s=0, r=0, a=null) {
            var n = R.Loader.getRes(t);
            n ? n.getIsReady() ? this.drawImage(n, e, i, s, r) : n.once(I.READY, this, this.drawImage, [n, e, i, s, r]) : ((n = new ae).load(t),
            R.Loader.cacheTexture(t, n),
            n.once(I.READY, this, this.drawImage, [n, e, i, s, r])),
            null != a && (n.getIsReady() ? a.call(this._sp) : n.on(I.READY, this._sp, a))
        }
        _renderEmpty(t, e, i, s) {}
        _renderAll(t, e, i, s) {
            for (var r = this._cmds, a = 0, n = r.length; a < n; a++)
                r[a].run(e, i, s)
        }
        _renderOne(t, e, i, s) {
            e.sprite = t,
            this._one.run(e, i, s)
        }
        _renderOneImg(t, e, i, s) {
            e.sprite = t,
            this._one.run(e, i, s)
        }
        drawLine(t, e, i, s, r, a=1) {
            var n = a < 1 || a % 2 == 0 ? 0 : .5;
            return this._saveToCmd(f._context._drawLine, V.create.call(this, t + n, e + n, i + n, s + n, r, a, 0))
        }
        drawLines(t, e, i, s, r=1) {
            if (!i || i.length < 4)
                return null;
            var a = r < 1 || r % 2 == 0 ? 0 : .5;
            return this._saveToCmd(f._context._drawLines, X.create.call(this, t + a, e + a, i, s, r, 0))
        }
        drawCurves(t, e, i, s, r=1) {
            return this._saveToCmd(f._context.drawCurves, W.create.call(this, t, e, i, s, r))
        }
        drawRect(t, e, i, s, r, a=null, n=1) {
            var h = 1 <= n && a ? n / 2 : 0
              , o = a ? n : 0;
            return this._saveToCmd(f._context.drawRect, j.create.call(this, t + h, e + h, i - o, s - o, r, a, n))
        }
        drawCircle(t, e, i, s, r=null, a=1) {
            var n = 1 <= a && r ? a / 2 : 0;
            return this._saveToCmd(f._context._drawCircle, k.create.call(this, t, e, i - n, s, r, a, 0))
        }
        drawPie(t, e, i, s, r, a, n=null, h=1) {
            var o = 1 <= h && n ? h / 2 : 0
              , l = n ? h : 0;
            return this._saveToCmd(f._context._drawPie, z.create.call(this, t + o, e + o, i - l, S.toRadian(s), S.toRadian(r), a, n, h, 0))
        }
        drawPoly(t, e, i, s, r=null, a=1) {
            var n = !1
              , n = !(6 < i.length)
              , h = !(1 <= a && r) || a % 2 == 0 ? 0 : .5;
            return this._saveToCmd(f._context._drawPoly, K.create.call(this, t + h, e + h, i, s, r, a, n, 0))
        }
        drawPath(t, e, i, s=null, r=null) {
            return this._saveToCmd(f._context._drawPath, H.create.call(this, t, e, i, s, r))
        }
        draw9Grid(t, e=0, i=0, s=0, r=0, a) {
            this._saveToCmd(null, ve.create(t, e, i, s, r, a))
        }
    }
    class B {
    }
    B.NOT_ACTIVE = 1,
    B.ACTIVE_INHIERARCHY = 2,
    B.AWAKED = 4,
    B.NOT_READY = 8,
    B.DISPLAY = 16,
    B.HAS_ZORDER = 32,
    B.HAS_MOUSE = 64,
    B.DISPLAYED_INSTAGE = 128,
    B.DRAWCALL_OPTIMIZE = 256;
    class we {
        static __init__() {
            we.map[x.ALPHA | x.TRANSFORM | x.GRAPHICS] = we.alpha_transform_drawLayaGL,
            we.map[x.ALPHA | x.GRAPHICS] = we.alpha_drawLayaGL,
            we.map[x.TRANSFORM | x.GRAPHICS] = we.transform_drawLayaGL,
            we.map[x.TRANSFORM | x.CHILDS] = we.transform_drawNodes,
            we.map[x.ALPHA | x.TRANSFORM | x.TEXTURE] = we.alpha_transform_drawTexture,
            we.map[x.ALPHA | x.TEXTURE] = we.alpha_drawTexture,
            we.map[x.TRANSFORM | x.TEXTURE] = we.transform_drawTexture,
            we.map[x.GRAPHICS | x.CHILDS] = we.drawLayaGL_drawNodes
        }
        static transform_drawTexture(t, e, i, s) {
            t._style;
            var r = t.texture
              , i = (e.saveTransform(we.curMat),
            e.transformByMatrix(t.transform, i, s),
            t._width || r.sourceWidth)
              , s = t._height || r.sourceHeight
              , a = i / r.sourceWidth
              , n = s / r.sourceHeight
              , i = r.width * a
              , s = r.height * n;
            if (i <= 0 || s <= 0)
                return null;
            a = -t.pivotX + r.offsetX * a,
            t = -t.pivotY + r.offsetY * n;
            e.drawTexture(r, a, t, i, s),
            e.restoreTransform(we.curMat)
        }
        static alpha_drawTexture(t, e, i, s) {
            var r = t._style
              , a = t.texture;
            if (.01 < (h = r.alpha) || t._needRepaint()) {
                var n = e.globalAlpha
                  , h = (e.globalAlpha *= h,
                t._width || a.width)
                  , t = t._height || a.height
                  , o = h / a.sourceWidth
                  , l = t / a.sourceHeight
                  , h = a.width * o
                  , t = a.height * l;
                if (h <= 0 || t <= 0)
                    return null;
                i = i - r.pivotX + a.offsetX * o,
                o = s - r.pivotY + a.offsetY * l;
                e.drawTexture(a, i, o, h, t),
                e.globalAlpha = n
            }
        }
        static alpha_transform_drawTexture(t, e, i, s) {
            var r = t._style
              , a = t.texture;
            if (.01 < (h = r.alpha) || t._needRepaint()) {
                var n = e.globalAlpha
                  , h = (e.globalAlpha *= h,
                e.saveTransform(we.curMat),
                e.transformByMatrix(t.transform, i, s),
                t._width || a.sourceWidth)
                  , i = t._height || a.sourceHeight
                  , s = h / a.sourceWidth
                  , t = i / a.sourceHeight
                  , h = a.width * s
                  , i = a.height * t;
                if (h <= 0 || i <= 0)
                    return null;
                s = -r.pivotX + a.offsetX * s,
                r = -r.pivotY + a.offsetY * t;
                e.drawTexture(a, s, r, h, i),
                e.restoreTransform(we.curMat),
                e.globalAlpha = n
            }
        }
        static alpha_transform_drawLayaGL(t, e, i, s) {
            var r, a, n = t._style;
            (.01 < (r = n.alpha) || t._needRepaint()) && (a = e.globalAlpha,
            e.globalAlpha *= r,
            e.saveTransform(we.curMat),
            e.transformByMatrix(t.transform, i, s),
            t._graphics && t._graphics._render(t, e, -n.pivotX, -n.pivotY),
            e.restoreTransform(we.curMat),
            e.globalAlpha = a)
        }
        static alpha_drawLayaGL(t, e, i, s) {
            var r, a, n = t._style;
            (.01 < (r = n.alpha) || t._needRepaint()) && (a = e.globalAlpha,
            e.globalAlpha *= r,
            t._graphics && t._graphics._render(t, e, i - n.pivotX, s - n.pivotY),
            e.globalAlpha = a)
        }
        static transform_drawLayaGL(t, e, i, s) {
            var r = t._style;
            e.saveTransform(we.curMat),
            e.transformByMatrix(t.transform, i, s),
            t._graphics && t._graphics._render(t, e, -r.pivotX, -r.pivotY),
            e.restoreTransform(we.curMat)
        }
        static transform_drawNodes(t, e, i, s) {
            var r, a = t._getBit(B.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0), n = t._style, h = (e.saveTransform(we.curMat),
            e.transformByMatrix(t.transform, i, s),
            i = -n.pivotX,
            s = -n.pivotY,
            t._children), o = h.length;
            if (n.viewport)
                for (var l, t = n.viewport, _ = t.x, u = t.y, c = t.right, d = t.bottom, p = 0; p < o; ++p)
                    (r = h[p])._visible && (l = r._x) < c && l + r.width > _ && (l = r._y) < d && l + r.height > u && r.render(e, i, s);
            else
                for (var p = 0; p < o; ++p)
                    (r = h[p])._visible && r.render(e, i, s);
            e.restoreTransform(we.curMat),
            a && e.drawCallOptimize(!1)
        }
        static drawLayaGL_drawNodes(t, e, i, s) {
            var r, a = t._getBit(B.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0), n = t._style, h = (i -= n.pivotX,
            s -= n.pivotY,
            t._graphics && t._graphics._render(t, e, i, s),
            t._children), o = h.length;
            if (n.viewport)
                for (var l, t = n.viewport, _ = t.x, u = t.y, c = t.right, d = t.bottom, p = 0; p < o; ++p)
                    (r = h[p])._visible && (l = r._x) < c && l + r.width > _ && (l = r._y) < d && l + r.height > u && r.render(e, i, s);
            else
                for (var p = 0; p < o; ++p)
                    (r = h[p])._visible && r.render(e, i, s);
            a && e.drawCallOptimize(!1)
        }
    }
    we.map = [],
    we.curMat = new y;
    class Me {
        constructor(t, e) {
            if (we.map[t])
                return this._fun = we.map[t],
                void (this._next = Me.NORENDER);
            switch (this._next = e || Me.NORENDER,
            t) {
            case 0:
                return void (this._fun = this._no);
            case x.ALPHA:
                return void (this._fun = this._alpha);
            case x.TRANSFORM:
                return void (this._fun = this._transform);
            case x.BLEND:
                return void (this._fun = this._blend);
            case x.CANVAS:
                return void (this._fun = this._canvas);
            case x.MASK:
                return void (this._fun = this._mask);
            case x.CLIP:
                return void (this._fun = this._clip);
            case x.STYLE:
                return void (this._fun = this._style);
            case x.GRAPHICS:
                return void (this._fun = this._graphics);
            case x.CHILDS:
                return void (this._fun = this._children);
            case x.CUSTOM:
                return void (this._fun = this._custom);
            case x.TEXTURE:
                return void (this._fun = this._texture);
            case x.FILTERS:
                return void (this._fun = mt._filter);
            case Me.INIT:
                return void (this._fun = Me._initRenderFun)
            }
            this.onCreate(t)
        }
        static __init__() {
            var t, e, i;
            for (we.__init__(),
            i = new Me(Me.INIT,null),
            e = Me.renders.length = 2 * x.CHILDS,
            t = 0; t < e; t++)
                Me.renders[t] = i;
            Me.renders[0] = new Me(0,null)
        }
        static _initRenderFun(t, e, i, s) {
            var r = t._renderType;
            (Me.renders[r] = Me._getTypeRender(r))._fun(t, e, i, s)
        }
        static _getTypeRender(t) {
            if (we.map[t])
                return new Me(t,null);
            for (var e = null, i = x.CHILDS; 0 < i; )
                i & t && (e = new Me(i,e)),
                i >>= 1;
            return e
        }
        onCreate(t) {}
        _style(t, e, i, s) {
            var r = t._style
              , r = (null != r.render && r.render(t, e, i, s),
            this._next);
            r._fun.call(r, t, e, i, s)
        }
        _no(t, e, i, s) {}
        _custom(t, e, i, s) {
            t.customRender(e, i, s),
            this._next._fun.call(this._next, t, e, 0, 0)
        }
        _clip(t, e, i, s) {
            var r, a, n, h = this._next;
            h != Me.NORENDER && (a = (r = t._style.scrollRect).width,
            n = r.height,
            0 !== a && 0 !== n && (e.save(),
            e.clipRect(i, s, a, n),
            h._fun.call(h, t, e, i - r.x, s - r.y),
            e.restore()))
        }
        _texture(t, e, i, s) {
            var r = t.texture;
            if (r._getSource()) {
                var a = t._width || r.sourceWidth
                  , n = t._height || r.sourceHeight
                  , h = a / r.sourceWidth
                  , o = n / r.sourceHeight
                  , a = r.width * h
                  , n = r.height * o;
                if (a <= 0 || n <= 0)
                    return;
                h = i - t.pivotX + r.offsetX * h,
                o = s - t.pivotY + r.offsetY * o;
                e.drawTexture(r, h, o, a, n)
            }
            r = this._next;
            r != Me.NORENDER && r._fun.call(r, t, e, i, s)
        }
        _graphics(t, e, i, s) {
            var r = t._style
              , a = t._graphics
              , a = (a && a._render(t, e, i - r.pivotX, s - r.pivotY),
            this._next);
            a != Me.NORENDER && a._fun.call(a, t, e, i, s)
        }
        _image(t, e, i, s) {
            var r = t._style;
            e.drawTexture2(i, s, r.pivotX, r.pivotY, t.transform, t._graphics._one)
        }
        _image2(t, e, i, s) {
            var r = t._style;
            e.drawTexture2(i, s, r.pivotX, r.pivotY, t.transform, t._graphics._one)
        }
        _alpha(t, e, i, s) {
            var r, a;
            (.01 < (a = t._style.alpha) || t._needRepaint()) && (r = e.globalAlpha,
            e.globalAlpha *= a,
            (a = this._next)._fun.call(a, t, e, i, s),
            e.globalAlpha = r)
        }
        _transform(t, e, i, s) {
            var r = t.transform
              , a = this._next;
            t._style;
            r && a != Me.NORENDER ? (e.save(),
            e.transform(r.a, r.b, r.c, r.d, r.tx + i, r.ty + s),
            a._fun.call(a, t, e, 0, 0),
            e.restore()) : a != Me.NORENDER && a._fun.call(a, t, e, i, s)
        }
        _children(t, e, i, s) {
            var r, a = t._style, n = t._children, h = n.length, t = (i -= t.pivotX,
            s -= t.pivotY,
            t._getBit(B.DRAWCALL_OPTIMIZE) && e.drawCallOptimize(!0));
            if (a.viewport)
                for (var o, a = a.viewport, l = a.x, _ = a.y, u = a.right, c = a.bottom, d = 0; d < h; ++d)
                    (r = n[d])._visible && (o = r._x) < u && o + r.width > l && (o = r._y) < c && o + r.height > _ && r.render(e, i, s);
            else
                for (var d = 0; d < h; ++d)
                    (r = n[d])._visible && r.render(e, i, s);
            t && e.drawCallOptimize(!1)
        }
        _canvas(t, e, i, s) {
            var r = t._cacheStyle
              , a = this._next;
            if (r.enableCanvasRender) {
                "bitmap" === r.cacheAs ? g.canvasBitmap++ : g.canvasNormal++;
                var n = !1
                  , h = !1;
                if (r.canvas) {
                    var o = r.canvas
                      , l = (o.context,
                    o.touches);
                    if (l)
                        for (var _ = 0; _ < l.length; _++)
                            if (l[_].deleted) {
                                h = !0;
                                break
                            }
                    n = o.isCacheValid && !o.isCacheValid()
                }
                if (t._needRepaint() || !r.canvas || h || n || R.stage.isGlobalRepaint())
                    if ("normal" === r.cacheAs) {
                        if (e._targets)
                            return void a._fun.call(a, t, e, i, s);
                        this._canvas_webgl_normal_repaint(t, e)
                    } else
                        this._canvas_repaint(t, e, i, s);
                o = r.cacheRect;
                e.drawCanvas(r.canvas, i + o.x, s + o.y, o.width, o.height)
            } else
                a._fun.call(a, t, e, i, s)
        }
        _canvas_repaint(t, e, i, s) {
            var r, a = t._cacheStyle, n = this._next, h = a.canvas, o = a.cacheAs, l = a._calculateCacheRect(t, o, i, s), _ = l.x, l = l.y, u = a.cacheRect, c = u.width * _, d = u.height * l, p = u.x, u = u.y;
            if ("bitmap" === o && (2048 < c || 2048 < d))
                return console.warn("cache bitmap size larger than 2048,cache ignored"),
                a.releaseContext(),
                void n._fun.call(n, t, e, i, s);
            h || (a.createContext(),
            h = a.canvas),
            (e = h.context).sprite = t,
            h.width == c && h.height == d || h.size(c, d),
            "bitmap" === o ? e.asBitmap = !0 : "normal" === o && (e.asBitmap = !1),
            e.clear(),
            1 != _ || 1 != l ? ((r = e).save(),
            r.scale(_, l),
            n._fun.call(n, t, e, -p, -u),
            r.restore()) : (r = e,
            n._fun.call(n, t, e, -p, -u)),
            t._applyFilters(),
            a.staticCache && (a.reCache = !1),
            g.canvasReCache++
        }
        _canvas_webgl_normal_repaint(t, e) {
            var i = t._cacheStyle
              , s = this._next
              , r = i.canvas
              , a = i.cacheAs
              , a = (i._calculateCacheRect(t, a, 0, 0),
            r || (r = new Ht(e,t),
            i.canvas = r),
            r.context);
            r.startRec(),
            s._fun.call(s, t, a, t.pivotX, t.pivotY),
            t._applyFilters(),
            g.canvasReCache++,
            r.endRec()
        }
        _blend(t, e, i, s) {
            var r = t._style
              , a = this._next;
            r.blendMode ? (e.save(),
            e.globalCompositeOperation = r.blendMode,
            a._fun.call(a, t, e, i, s),
            e.restore()) : a._fun.call(a, t, e, i, s)
        }
        _mask(t, e, i, s) {
            var r, a, n, h, o, l, _ = this._next, u = t.mask, c = e;
            u ? (c.save(),
            r = c.globalCompositeOperation,
            (a = new E).copyFrom(u.getBounds()),
            a.width = Math.round(a.width),
            a.height = Math.round(a.height),
            a.x = Math.round(a.x),
            a.y = Math.round(a.y),
            0 < a.width && 0 < a.height && (n = a.width,
            h = a.height,
            o = ht.getRT(n, h),
            c.breakNextMerge(),
            c.pushRT(),
            c.addRenderObject(pt.create([c, o, n, h], Me.tmpTarget, this)),
            u.render(c, -a.x, -a.y),
            c.breakNextMerge(),
            c.popRT(),
            c.save(),
            c.clipRect(i + a.x - t.getStyle().pivotX + .1, s + a.y - t.getStyle().pivotY + .1, n - .2, h - .2),
            _._fun.call(_, t, c, i, s),
            c.restore(),
            r = c.globalCompositeOperation,
            c.addRenderObject(pt.create(["mask"], Me.setBlendMode, this)),
            u = ct.create(b.TEXTURE2D, 0),
            l = ae.INV_UV,
            c.drawTarget(o, i + a.x - t.getStyle().pivotX, s + a.y - t.getStyle().pivotY, n, h, y.TEMP.identity(), u, l, 6),
            c.addRenderObject(pt.create([o], Me.recycleTarget, this)),
            c.addRenderObject(pt.create([r], Me.setBlendMode, this))),
            c.restore()) : _._fun.call(_, t, e, i, s)
        }
        static tmpTarget(t, e, i, s) {
            e.start(),
            e.clear(0, 0, 0, 0)
        }
        static recycleTarget(t) {
            ht.releaseRT(t)
        }
        static setBlendMode(t) {
            var e = m.mainContext;
            A.targetFns[A.TOINT[t]](e)
        }
    }
    Me.INIT = 69905,
    Me.renders = [],
    Me.NORENDER = new Me(0,null),
    Me.tempUV = new Array(8);
    class Ie extends tt {
        constructor(t=!1) {
            super(),
            this._source = t ? P.createElement("canvas") : this,
            this.lock = !0
        }
        get source() {
            return this._source
        }
        _getSource() {
            return this._source
        }
        clear() {
            this._ctx && (this._ctx.clear ? this._ctx.clear() : this._ctx.clearRect(0, 0, this._width, this._height)),
            this._texture && (this._texture.destroy(),
            this._texture = null)
        }
        destroy() {
            super.destroy(),
            this._setCPUMemory(0),
            this._ctx && this._ctx.destroy && this._ctx.destroy(),
            this._ctx = null
        }
        release() {}
        get context() {
            return this._ctx || (this._source == this ? this._ctx = new R.Context : this._ctx = this._source.getContext(R.Render.isConchApp ? "layagl" : "2d"),
            (this._ctx._canvas = this)._ctx)
        }
        _setContext(t) {
            this._ctx = t
        }
        getContext(t, e=0) {
            return this.context
        }
        getMemSize() {
            return 0
        }
        size(t, e) {
            this._width == t && this._height == e && (!this._source || this._source.width == t && this._source.height == e) || (this._width = t,
            this._height = e,
            this._setCPUMemory(t * e * 4),
            this._ctx && this._ctx.size && this._ctx.size(t, e),
            this._source && (this._source.height = e,
            this._source.width = t),
            this._texture && (this._texture.destroy(),
            this._texture = null))
        }
        getTexture() {
            var t;
            return this._texture || ((t = new rt).loadImageSource(this.source),
            this._texture = new ae(t)),
            this._texture
        }
        toBase64(t, e) {
            if (this._source) {
                if (R.Render.isConchApp) {
                    var i = window;
                    if (2 == i.conchConfig.threadMode)
                        throw "native 2 thread mode use toBase64Async";
                    var s = this._ctx._targets.sourceWidth
                      , r = this._ctx._targets.sourceHeight
                      , a = this._ctx._targets.getData(0, 0, s, r);
                    return i.conchToBase64FlipY ? i.conchToBase64FlipY(t, e, a.buffer, s, r) : i.conchToBase64(t, e, a.buffer, s, r)
                }
                return this._source.toDataURL(t, e)
            }
            return null
        }
        toBase64Async(i, s, r) {
            var a = this._ctx._targets.sourceWidth
              , n = this._ctx._targets.sourceHeight;
            this._ctx._targets.getDataAsync(0, 0, a, n, function(t) {
                let e = window;
                t = e.conchToBase64FlipY ? e.conchToBase64FlipY(i, s, t.buffer, a, n) : e.conchToBase64(i, s, t.buffer, a, n);
                r(t)
            })
        }
    }
    class Pe {
        contains(t, e) {
            return !!Pe._isHitGraphic(t, e, this.hit) && !Pe._isHitGraphic(t, e, this.unHit)
        }
        static _isHitGraphic(t, e, i) {
            if (!i)
                return !1;
            var s, r, a, n = i.cmds;
            if (!n && i._one && ((n = Pe._cmds).length = 1,
            n[0] = i._one),
            !n)
                return !1;
            for (r = n.length,
            s = 0; s < r; s++)
                if ((a = n[s]) && ("Translate" === a.cmdID && (t -= a.tx,
                e -= a.ty),
                Pe._isHitCmd(t, e, a)))
                    return !0;
            return !1
        }
        static _isHitCmd(t, e, i) {
            if (!i)
                return !1;
            var s = !1;
            switch (i.cmdID) {
            case "DrawRect":
                Pe._rect.setTo(i.x, i.y, i.width, i.height),
                s = Pe._rect.contains(t, e);
                break;
            case "DrawCircle":
                s = (t -= i.x) * t + (e -= i.y) * e < i.radius * i.radius;
                break;
            case "DrawPoly":
                t -= i.x,
                e -= i.y,
                s = Pe._ptInPolygon(t, e, i.points)
            }
            return s
        }
        static _ptInPolygon(t, e, i) {
            for (var s = Pe._ptPoint, r = (s.setTo(t, e),
            0), a = i.length, n = 0; n < a; n += 2) {
                var h, o = i[n], l = i[n + 1], _ = i[(n + 2) % a];
                l == (h = i[(n + 3) % a]) || s.y < Math.min(l, h) || s.y >= Math.max(l, h) || (s.y - l) * (_ - o) / (h - l) + o > s.x && r++
            }
            return r % 2 == 1
        }
        get hit() {
            return this._hit || (this._hit = new R.Graphics),
            this._hit
        }
        set hit(t) {
            this._hit = t
        }
        get unHit() {
            return this._unHit || (this._unHit = new R.Graphics),
            this._unHit
        }
        set unHit(t) {
            this._unHit = t
        }
    }
    Pe._cmds = [],
    Pe._rect = new E,
    Pe._ptPoint = new q;
    class F {
        static regClass(t, e) {
            F._classMap[t] = e
        }
        static regShortClassName(t) {
            for (var e = 0; e < t.length; e++) {
                var i = t[e]
                  , s = i.name;
                F._classMap[s] = i
            }
        }
        static getRegClass(t) {
            return F._classMap[t]
        }
        static getClass(t) {
            var e = F._classMap[t] || F._classMap["Laya." + t] || t
              , i = R.Laya;
            return "string" == typeof e ? R.__classMap[e] || i[t] : e
        }
        static getInstance(t) {
            var e = F.getClass(t);
            return e ? new e : (console.warn("[error] Undefined class:", t),
            null)
        }
        static createByJson(t, e=null, i=null, s=null, r=null) {
            var a = (t = "string" == typeof t ? JSON.parse(t) : t).props;
            if (!e && !(e = r ? r.runWith(t) : F.getInstance(a.runtime || t.type)))
                return null;
            var n = t.child;
            if (n)
                for (var h = 0, o = n.length; h < o; h++) {
                    var l, _ = n[h];
                    "render" !== _.props.name && "render" !== _.props.renderType || !e._$set_itemRender ? "Graphic" == _.type ? F._addGraphicsToSprite(_, e) : F._isDrawType(_.type) ? F._addGraphicToSprite(_, e, !0) : (l = F.createByJson(_, null, i, s, r),
                    "Script" === _.type ? "owner"in l ? l.owner = e : "target"in l && (l.target = e) : "mask" == _.props.renderType ? e.mask = l : e.addChild(l)) : e.itemRender = _
                }
            if (a)
                for (var u in a) {
                    var c = a[u];
                    "var" === u && i ? i[c] = e : c instanceof Array && e[u]instanceof Function ? e[u].apply(e, c) : e[u] = c
                }
            return s && t.customProps && s.runWith([e, t]),
            e.created && e.created(),
            e
        }
        static _addGraphicsToSprite(t, e) {
            var i = t.child;
            if (i && !(i.length < 1)) {
                var s, r, a = F._getGraphicsFromSprite(t, e), e = 0, n = 0;
                for (t.props && (e = F._getObjVar(t.props, "x", 0),
                n = F._getObjVar(t.props, "y", 0)),
                0 != e && 0 != n && a.translate(e, n),
                r = i.length,
                s = 0; s < r; s++)
                    F._addGraphicToGraphics(i[s], a);
                0 != e && 0 != n && a.translate(-e, -n)
            }
        }
        static _addGraphicToSprite(t, e, i=!1) {
            i = i ? F._getGraphicsFromSprite(t, e) : e.graphics;
            F._addGraphicToGraphics(t, i)
        }
        static _getGraphicsFromSprite(t, e) {
            if (!t || !t.props)
                return e.graphics;
            var i, t = t.props.renderType;
            return "hit" !== t && "unHit" !== t || ((i = e._style.hitArea || (e.hitArea = new Pe))[t] || (i[t] = new Se),
            i = i[t]),
            i = i || e.graphics
        }
        static _getTransformData(t) {
            ("pivotX"in t || "pivotY"in t) && (e = e || new y).translate(-F._getObjVar(t, "pivotX", 0), -F._getObjVar(t, "pivotY", 0));
            var e, i = F._getObjVar(t, "scaleX", 1), s = F._getObjVar(t, "scaleY", 1), r = F._getObjVar(t, "rotation", 0);
            F._getObjVar(t, "skewX", 0),
            F._getObjVar(t, "skewY", 0);
            return 1 == i && 1 == s && 0 == r || ((e = e || new y).scale(i, s),
            e.rotate(.0174532922222222 * r)),
            e
        }
        static _addGraphicToGraphics(t, e) {
            var i, s = t.props;
            !s || (t = F.DrawTypeDic[t.type]) && (e = e,
            s = F._getParams(s, t[1], t[2], t[3]),
            !(i = F._tM) && 1 == F._alpha || (e.save(),
            i && e.transform(i),
            1 != F._alpha && e.alpha(F._alpha)),
            e[t[0]].apply(e, s),
            !i && 1 == F._alpha || e.restore())
        }
        static _adptLineData(t) {
            return t[2] = parseFloat(t[0]) + parseFloat(t[2]),
            t[3] = parseFloat(t[1]) + parseFloat(t[3]),
            t
        }
        static _adptTextureData(t) {
            return t[0] = R.Loader.getRes(t[0]),
            t
        }
        static _adptLinesData(t) {
            return t[2] = F._getPointListByStr(t[2]),
            t
        }
        static _isDrawType(t) {
            return "Image" !== t && t in F.DrawTypeDic
        }
        static _getParams(t, e, i=0, s=null) {
            var r, a, n, h = F._temParam;
            for (h.length = e.length,
            a = e.length,
            r = 0; r < a; r++)
                h[r] = F._getObjVar(t, e[r][0], e[r][1]);
            return F._alpha = F._getObjVar(t, "alpha", 1),
            (n = F._getTransformData(t)) ? (n.translate(h[i = i || 0], h[i + 1]),
            h[i] = h[i + 1] = 0,
            F._tM = n) : F._tM = null,
            h = s && F[s] ? F[s](h) : h
        }
        static _getPointListByStr(t) {
            for (var e = t.split(","), i = e.length, s = 0; s < i; s++)
                e[s] = parseFloat(e[s]);
            return e
        }
        static _getObjVar(t, e, i) {
            return e in t ? t[e] : i
        }
    }
    F.DrawTypeDic = {
        Rect: ["drawRect", [["x", 0], ["y", 0], ["width", 0], ["height", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Circle: ["drawCircle", [["x", 0], ["y", 0], ["radius", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Pie: ["drawPie", [["x", 0], ["y", 0], ["radius", 0], ["startAngle", 0], ["endAngle", 0], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]]],
        Image: ["drawTexture", [["x", 0], ["y", 0], ["width", 0], ["height", 0]]],
        Texture: ["drawTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0]], 1, "_adptTextureData"],
        FillTexture: ["fillTexture", [["skin", null], ["x", 0], ["y", 0], ["width", 0], ["height", 0], ["repeat", null]], 1, "_adptTextureData"],
        FillText: ["fillText", [["text", ""], ["x", 0], ["y", 0], ["font", null], ["color", null], ["textAlign", null]], 1],
        Line: ["drawLine", [["x", 0], ["y", 0], ["toX", 0], ["toY", 0], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLineData"],
        Lines: ["drawLines", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"],
        Curves: ["drawCurves", [["x", 0], ["y", 0], ["points", ""], ["lineColor", null], ["lineWidth", 0]], 0, "_adptLinesData"],
        Poly: ["drawPoly", [["x", 0], ["y", 0], ["points", ""], ["fillColor", null], ["lineColor", null], ["lineWidth", 1]], 0, "_adptLinesData"]
    },
    F._temParam = [],
    F._classMap = {};
    class De {
        reset() {
            return this.bounds && this.bounds.recover(),
            this.userBounds && this.userBounds.recover(),
            this.bounds = null,
            this.userBounds = null,
            this.temBM = null,
            this
        }
        recover() {
            p.recover("BoundsStyle", this.reset())
        }
        static create() {
            return p.getItemByClass("BoundsStyle", De)
        }
    }
    class Le {
        constructor() {
            this.reset()
        }
        needBitmapCache() {
            return this.cacheForFilters || !!this.mask
        }
        needEnableCanvasRender() {
            return "none" != this.userSetCache || this.cacheForFilters || !!this.mask
        }
        releaseContext() {
            if (this.canvas && this.canvas.size) {
                p.recover("CacheCanvas", this.canvas),
                this.canvas.size(0, 0);
                try {
                    this.canvas.width = 0,
                    this.canvas.height = 0
                } catch (t) {}
            }
            this.canvas = null
        }
        createContext() {
            this.canvas || (this.canvas = p.getItem("CacheCanvas") || new Ie(!1),
            this.canvas.context || this.canvas.getContext("2d"))
        }
        releaseFilterCache() {
            var t = this.filterCache;
            t && (t.destroy(),
            t.recycle(),
            this.filterCache = null)
        }
        recover() {
            this !== Le.EMPTY && p.recover("SpriteCache", this.reset())
        }
        reset() {
            return this.releaseContext(),
            this.releaseFilterCache(),
            this.cacheAs = "none",
            this.enableCanvasRender = !1,
            this.userSetCache = "none",
            this.cacheForFilters = !1,
            this.staticCache = !1,
            this.reCache = !0,
            this.mask = null,
            this.maskParent = null,
            this.filterCache = null,
            this.filters = null,
            this.hasGlowFilter = !1,
            this.cacheRect && this.cacheRect.recover(),
            this.cacheRect = null,
            this
        }
        static create() {
            return p.getItemByClass("SpriteCache", Le)
        }
        _calculateCacheRect(t, e, i, s) {
            var r, a = t._cacheStyle;
            return a.cacheRect || (a.cacheRect = E.create()),
            "bitmap" === e ? ((r = t.getSelfBounds()).width = r.width + 2 * Le.CANVAS_EXTEND_EDGE,
            r.height = r.height + 2 * Le.CANVAS_EXTEND_EDGE,
            r.x = r.x - t.pivotX,
            r.y = r.y - t.pivotY,
            r.x = r.x - Le.CANVAS_EXTEND_EDGE,
            r.y = r.y - Le.CANVAS_EXTEND_EDGE,
            r.x = Math.floor(r.x + i) - i,
            r.y = Math.floor(r.y + s) - s,
            r.width = Math.floor(r.width),
            r.height = Math.floor(r.height),
            a.cacheRect.copyFrom(r)) : a.cacheRect.setTo(-t._style.pivotX, -t._style.pivotY, 1, 1),
            r = a.cacheRect,
            t._style.scrollRect && (e = t._style.scrollRect,
            r.x -= e.x,
            r.y -= e.y),
            Le._scaleInfo.setTo(1, 1),
            Le._scaleInfo
        }
    }
    Le.EMPTY = new Le,
    Le._scaleInfo = new q,
    Le.CANVAS_EXTEND_EDGE = 16;
    class Be {
        constructor() {
            this.reset()
        }
        reset() {
            return this.scaleX = this.scaleY = 1,
            this.skewX = this.skewY = 0,
            this.pivotX = this.pivotY = this.rotation = 0,
            this.alpha = 1,
            this.scrollRect && this.scrollRect.recover(),
            this.scrollRect = null,
            this.viewport && this.viewport.recover(),
            this.viewport = null,
            this.hitArea = null,
            this.dragging = null,
            this.blendMode = null,
            this
        }
        recover() {
            this !== Be.EMPTY && p.recover("SpriteStyle", this.reset())
        }
        static create() {
            return p.getItemByClass("SpriteStyle", Be)
        }
    }
    Be.EMPTY = new Be;
    class Fe extends i {
        constructor() {
            super(),
            this._bits = 0,
            this._children = Fe.ARRAY_EMPTY,
            this._extUIChild = Fe.ARRAY_EMPTY,
            this._parent = null,
            this.name = "",
            this.destroyed = !1,
            this.createGLBuffer()
        }
        createGLBuffer() {}
        _setBit(t, e) {
            t === B.DISPLAY && this._getBit(t) != e && this._updateDisplayedInstage(),
            e ? this._bits |= t : this._bits &= ~t
        }
        _getBit(t) {
            return 0 != (this._bits & t)
        }
        _setUpNoticeChain() {
            this._getBit(B.DISPLAY) && this._setBitUp(B.DISPLAY)
        }
        _setBitUp(t) {
            var e = this;
            for (e._setBit(t, !0),
            e = e._parent; e; ) {
                if (e._getBit(t))
                    return;
                e._setBit(t, !0),
                e = e._parent
            }
        }
        on(t, e, i, s=null) {
            return t !== I.DISPLAY && t !== I.UNDISPLAY || this._getBit(B.DISPLAY) || this._setBitUp(B.DISPLAY),
            this._createListener(t, e, i, s, !1)
        }
        once(t, e, i, s=null) {
            return t !== I.DISPLAY && t !== I.UNDISPLAY || this._getBit(B.DISPLAY) || this._setBitUp(B.DISPLAY),
            this._createListener(t, e, i, s, !0)
        }
        destroy(t=!0) {
            this.destroyed = !0,
            this._destroyAllComponent(),
            this._parent && this._parent.removeChild(this),
            this._children && (t ? this.destroyChildren() : this.removeChildren()),
            this.onDestroy(),
            this._children = null,
            this.offAll()
        }
        onDestroy() {}
        destroyChildren() {
            if (this._children)
                for (var t = 0, e = this._children.length; t < e; t++)
                    this._children[0].destroy(!0)
        }
        addChild(t) {
            return !t || this.destroyed || t === this || (t._zOrder && this._setBit(B.HAS_ZORDER, !0),
            t._parent === this ? (e = this.getChildIndex(t)) !== this._children.length - 1 && (this._children.splice(e, 1),
            this._children.push(t),
            this._childChanged()) : (t._parent && t._parent.removeChild(t),
            this._children === Fe.ARRAY_EMPTY && (this._children = []),
            this._children.push(t),
            t._setParent(this),
            this._childChanged())),
            t;
            var e
        }
        addInputChild(t) {
            if (this._extUIChild == Fe.ARRAY_EMPTY)
                this._extUIChild = [t];
            else {
                if (0 <= this._extUIChild.indexOf(t))
                    return null;
                this._extUIChild.push(t)
            }
            return null
        }
        removeInputChild(t) {
            t = this._extUIChild.indexOf(t);
            0 <= t && this._extUIChild.splice(t, 1)
        }
        addChildren(...t) {
            for (var e = 0, i = t.length; e < i; )
                this.addChild(t[e++])
        }
        addChildAt(t, e) {
            if (!t || this.destroyed || t === this)
                return t;
            var i;
            if (t._zOrder && this._setBit(B.HAS_ZORDER, !0),
            0 <= e && e <= this._children.length)
                return t._parent === this ? (i = this.getChildIndex(t),
                this._children.splice(i, 1),
                this._children.splice(e, 0, t),
                this._childChanged()) : (t._parent && t._parent.removeChild(t),
                this._children === Fe.ARRAY_EMPTY && (this._children = []),
                this._children.splice(e, 0, t),
                t._setParent(this)),
                t;
            throw new Error("appendChildAt:The index is out of bounds")
        }
        getChildIndex(t) {
            return this._children.indexOf(t)
        }
        getChildByName(t) {
            var e = this._children;
            if (e)
                for (var i = 0, s = e.length; i < s; i++) {
                    var r = e[i];
                    if (r.name === t)
                        return r
                }
            return null
        }
        getChildAt(t) {
            return this._children[t] || null
        }
        setChildIndex(t, e) {
            var i = this._children;
            if (e < 0 || e >= i.length)
                throw new Error("setChildIndex:The index is out of bounds.");
            var s = this.getChildIndex(t);
            if (s < 0)
                throw new Error("setChildIndex:node is must child of this object.");
            return i.splice(s, 1),
            i.splice(e, 0, t),
            this._childChanged(),
            t
        }
        _childChanged(t=0) {}
        removeChild(t) {
            if (!this._children)
                return t;
            t = this._children.indexOf(t);
            return this.removeChildAt(t)
        }
        removeSelf() {
            return this._parent && this._parent.removeChild(this),
            this
        }
        removeChildByName(t) {
            t = this.getChildByName(t);
            return t && this.removeChild(t),
            t
        }
        removeChildAt(t) {
            var e = this.getChildAt(t);
            return e && (this._children.splice(t, 1),
            e._setParent(null)),
            e
        }
        removeChildren(t=0, e=2147483647) {
            if (this._children && 0 < this._children.length) {
                var i, s = this._children;
                0 === t && e >= s.length - 1 ? (i = s,
                this._children = Fe.ARRAY_EMPTY) : i = s.splice(t, e - t + 1);
                for (var r = 0, a = i.length; r < a; r++)
                    i[r]._setParent(null)
            }
            return this
        }
        replaceChild(t, e) {
            var i = this._children.indexOf(e);
            return -1 < i ? (this._children.splice(i, 1, t),
            e._setParent(null),
            t._setParent(this),
            t) : null
        }
        get numChildren() {
            return this._children.length
        }
        get parent() {
            return this._parent
        }
        _setParent(t) {
            this._parent !== t && (t ? (this._parent = t,
            this._onAdded(),
            this.event(I.ADDED),
            this._getBit(B.DISPLAY) && (this._setUpNoticeChain(),
            t.displayedInStage && this._displayChild(this, !0)),
            t._childChanged(this)) : (this._onRemoved(),
            this.event(I.REMOVED),
            this._parent._childChanged(),
            this._getBit(B.DISPLAY) && this._displayChild(this, !1),
            this._parent = t))
        }
        get displayedInStage() {
            return this._getBit(B.DISPLAY) || this._setBitUp(B.DISPLAY),
            this._getBit(B.DISPLAYED_INSTAGE)
        }
        _updateDisplayedInstage() {
            for (var t = this, e = R.stage, i = !1; t; ) {
                if (t._getBit(B.DISPLAY)) {
                    i = t._getBit(B.DISPLAYED_INSTAGE);
                    break
                }
                if (t === e || t._getBit(B.DISPLAYED_INSTAGE)) {
                    i = !0;
                    break
                }
                t = t._parent
            }
            this._setBit(B.DISPLAYED_INSTAGE, i)
        }
        _setDisplay(t) {
            this._getBit(B.DISPLAYED_INSTAGE) !== t && (this._setBit(B.DISPLAYED_INSTAGE, t),
            t ? this.event(I.DISPLAY) : this.event(I.UNDISPLAY))
        }
        _displayChild(t, e) {
            var i = t._children;
            if (i)
                for (var s = 0, r = i.length; s < r; s++) {
                    var a = i[s];
                    a._getBit(B.DISPLAY) && (0 < a._children.length ? this._displayChild(a, e) : a._setDisplay(e))
                }
            t._setDisplay(e)
        }
        contains(t) {
            if (t === this)
                return !0;
            for (; t; ) {
                if (t._parent === this)
                    return !0;
                t = t._parent
            }
            return !1
        }
        timerLoop(t, e, i, s=null, r=!0, a=!1) {
            (this.scene || R).timer.loop(t, e, i, s, r, a)
        }
        timerOnce(t, e, i, s=null, r=!0) {
            (this.scene || R).timer._create(!1, !1, t, e, i, s, r)
        }
        frameLoop(t, e, i, s=null, r=!0) {
            (this.scene || R).timer._create(!0, !0, t, e, i, s, r)
        }
        frameOnce(t, e, i, s=null, r=!0) {
            (this.scene || R).timer._create(!0, !1, t, e, i, s, r)
        }
        clearTimer(t, e) {
            (this.scene || R).timer.clear(t, e)
        }
        callLater(t, e=null) {
            (this.scene || R).timer.callLater(this, t, e)
        }
        runCallLater(t) {
            (this.scene || R).timer.runCallLater(this, t)
        }
        get scene() {
            return this._scene
        }
        get active() {
            return !this._getBit(B.NOT_READY) && !this._getBit(B.NOT_ACTIVE)
        }
        set active(t) {
            if (t = !!t,
            !this._getBit(B.NOT_ACTIVE) !== t) {
                if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length)
                    throw t ? "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event." : "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
                this._setBit(B.NOT_ACTIVE, !t),
                this._parent && this._parent.activeInHierarchy && (t ? this._processActive() : this._processInActive())
            }
        }
        get activeInHierarchy() {
            return this._getBit(B.ACTIVE_INHIERARCHY)
        }
        _onActive() {
            g.spriteCount++
        }
        _onInActive() {
            g.spriteCount--
        }
        _onActiveInScene() {}
        _onInActiveInScene() {}
        _parse(t, e) {}
        _setBelongScene(t) {
            if (!this._scene) {
                this._scene = t,
                this._onActiveInScene();
                for (var e = 0, i = this._children.length; e < i; e++)
                    this._children[e]._setBelongScene(t)
            }
        }
        _setUnBelongScene() {
            if (this._scene !== this) {
                this._onInActiveInScene(),
                this._scene = null;
                for (var t = 0, e = this._children.length; t < e; t++)
                    this._children[t]._setUnBelongScene()
            }
        }
        onAwake() {}
        onEnable() {}
        _processActive() {
            this._activeChangeScripts || (this._activeChangeScripts = []),
            this._activeHierarchy(this._activeChangeScripts),
            this._activeScripts()
        }
        _activeHierarchy(t) {
            if (this._setBit(B.ACTIVE_INHIERARCHY, !0),
            this._components)
                for (var e = 0, i = this._components.length; e < i; e++) {
                    var s = this._components[e];
                    s._isScript() ? s._enabled && t.push(s) : s._setActive(!0)
                }
            for (this._onActive(),
            e = 0,
            i = this._children.length; e < i; e++) {
                var r = this._children[e];
                r._getBit(B.NOT_ACTIVE) || r._getBit(B.NOT_READY) || r._activeHierarchy(t)
            }
            this._getBit(B.AWAKED) || (this._setBit(B.AWAKED, !0),
            this.onAwake()),
            this.onEnable()
        }
        _activeScripts() {
            for (var t = 0, e = this._activeChangeScripts.length; t < e; t++) {
                var i = this._activeChangeScripts[t];
                i._awaked || (i._awaked = !0,
                i._onAwake()),
                i._onEnable()
            }
            this._activeChangeScripts.length = 0
        }
        _processInActive() {
            this._activeChangeScripts || (this._activeChangeScripts = []),
            this._inActiveHierarchy(this._activeChangeScripts),
            this._inActiveScripts()
        }
        _inActiveHierarchy(t) {
            if (this._onInActive(),
            this._components)
                for (var e = 0, i = this._components.length; e < i; e++) {
                    var s = this._components[e];
                    s._isScript() || s._setActive(!1),
                    s._isScript() && s._enabled && t.push(s)
                }
            for (this._setBit(B.ACTIVE_INHIERARCHY, !1),
            e = 0,
            i = this._children.length; e < i; e++) {
                var r = this._children[e];
                r && !r._getBit(B.NOT_ACTIVE) && r._inActiveHierarchy(t)
            }
            this.onDisable()
        }
        _inActiveScripts() {
            for (var t = 0, e = this._activeChangeScripts.length; t < e; t++)
                this._activeChangeScripts[t].owner && this._activeChangeScripts[t]._onDisable();
            this._activeChangeScripts.length = 0
        }
        onDisable() {}
        _onAdded() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length)
                throw "Node: can't set the main inActive node active in hierarchy,if the operate is in main inActive node or it's children script's onDisable Event.";
            var t = this._parent.scene;
            t && this._setBelongScene(t),
            this._parent.activeInHierarchy && this.active && this._processActive()
        }
        _onRemoved() {
            if (this._activeChangeScripts && 0 !== this._activeChangeScripts.length)
                throw "Node: can't set the main active node inActive in hierarchy,if the operate is in main active node or it's children script's onEnable Event.";
            this._parent.activeInHierarchy && this.active && this._processInActive(),
            this._parent.scene && this._setUnBelongScene()
        }
        _addComponentInstance(t) {
            this._components = this._components || [],
            this._components.push(t),
            t.owner = this,
            t._onAdded(),
            this.activeInHierarchy && t._setActive(!0)
        }
        _destroyComponent(t) {
            if (this._components)
                for (var e = 0, i = this._components.length; e < i; e++) {
                    var s = this._components[e];
                    if (s === t) {
                        s._destroy(),
                        this._components.splice(e, 1);
                        break
                    }
                }
        }
        _destroyAllComponent() {
            if (this._components) {
                for (var t = 0, e = this._components.length; t < e; t++) {
                    var i = this._components[t];
                    i && i._destroy()
                }
                this._components.length = 0
            }
        }
        _cloneTo(t, e, i) {
            var s = t;
            if (this._components)
                for (var r = 0, a = this._components.length; r < a; r++) {
                    var n = s.addComponent(this._components[r].constructor);
                    this._components[r]._cloneTo(n)
                }
        }
        addComponentIntance(t) {
            if (t.owner)
                throw "Node:the component has belong to other node.";
            if (t.isSingleton && this.getComponent(t.constructor))
                throw "Node:the component is singleton,can't add the second one.";
            return this._addComponentInstance(t),
            t
        }
        addComponent(t) {
            var e = p.createByClass(t);
            if (!e)
                throw t.toString() + "组件不存在";
            if (e._destroyed = !1,
            e.isSingleton && this.getComponent(t))
                throw "无法实例" + t + "组件，" + t + "组件已存在！";
            return this._addComponentInstance(e),
            e
        }
        getComponent(t) {
            if (this._components)
                for (var e = 0, i = this._components.length; e < i; e++) {
                    var s = this._components[e];
                    if (s instanceof t)
                        return s
                }
            return null
        }
        getComponents(t) {
            var e;
            if (this._components)
                for (var i = 0, s = this._components.length; i < s; i++) {
                    var r = this._components[i];
                    r instanceof t && (e = e || []).push(r)
                }
            return e
        }
        get timer() {
            return (this.scene || R).timer
        }
    }
    Fe.ARRAY_EMPTY = [],
    F.regClass("laya.display.Node", Fe),
    F.regClass("Laya.Node", Fe);
    class Oe extends Fe {
        constructor() {
            super(),
            this._x = 0,
            this._y = 0,
            this._width = 0,
            this._height = 0,
            this._visible = !0,
            this._mouseState = 0,
            this._zOrder = 0,
            this._renderType = 0,
            this._transform = null,
            this._tfChanged = !1,
            this._repaint = x.REPAINT_NONE,
            this._texture = null,
            this._style = Be.EMPTY,
            this._cacheStyle = Le.EMPTY,
            this._boundStyle = null,
            this._graphics = null,
            this.mouseThrough = !1,
            this.autoSize = !1,
            this.hitTestPrior = !1
        }
        destroy(t=!0) {
            super.destroy(t),
            this._style && this._style.recover(),
            this._cacheStyle && this._cacheStyle.recover(),
            this._boundStyle && this._boundStyle.recover(),
            this._transform && this._transform.recover(),
            this._style = null,
            this._cacheStyle = null,
            this._boundStyle = null,
            this._transform = null,
            this._graphics && this._graphics.autoDestroy && this._graphics.destroy(),
            this._graphics = null,
            this.texture = null
        }
        updateZOrder() {
            S.updateOrder(this._children) && this.repaint()
        }
        _getBoundsStyle() {
            return this._boundStyle || (this._boundStyle = De.create()),
            this._boundStyle
        }
        _setCustomRender() {}
        set customRenderEnable(t) {
            t && (this._renderType |= x.CUSTOM,
            this._setRenderType(this._renderType),
            this._setCustomRender())
        }
        get cacheAs() {
            return this._cacheStyle.cacheAs
        }
        _setCacheAs(t) {}
        set cacheAs(t) {
            t === this._cacheStyle.userSetCache || this.mask && "normal" === t || (this._setCacheAs(t),
            this._getCacheStyle().userSetCache = t,
            this._checkCanvasEnable(),
            this.repaint())
        }
        _checkCanvasEnable() {
            var t = this._cacheStyle.needEnableCanvasRender();
            (this._getCacheStyle().enableCanvasRender = t) ? (this._cacheStyle.needBitmapCache() ? this._cacheStyle.cacheAs = "bitmap" : this._cacheStyle.cacheAs = this._cacheStyle.userSetCache,
            this._cacheStyle.reCache = !0,
            this._renderType |= x.CANVAS) : (this._cacheStyle.cacheAs = "none",
            this._cacheStyle.releaseContext(),
            this._renderType &= ~x.CANVAS),
            this._setCacheAs(this._cacheStyle.cacheAs),
            this._setRenderType(this._renderType)
        }
        get staticCache() {
            return this._cacheStyle.staticCache
        }
        set staticCache(t) {
            (this._getCacheStyle().staticCache = t) || this.reCache()
        }
        reCache() {
            this._cacheStyle.reCache = !0,
            this._repaint |= x.REPAINT_CACHE
        }
        getRepaint() {
            return this._repaint
        }
        _setX(t) {
            this._x = t
        }
        _setY(t) {
            this._y = t
        }
        _setWidth(t, e) {}
        _setHeight(t, e) {}
        get x() {
            return this._x
        }
        set x(t) {
            this.destroyed || this._x !== t && (this._setX(t),
            this.parentRepaint(x.REPAINT_CACHE),
            (t = this._cacheStyle.maskParent) && t.repaint(x.REPAINT_CACHE))
        }
        get y() {
            return this._y
        }
        set y(t) {
            this.destroyed || this._y !== t && (this._setY(t),
            this.parentRepaint(x.REPAINT_CACHE),
            (t = this._cacheStyle.maskParent) && t.repaint(x.REPAINT_CACHE))
        }
        get width() {
            return this.get_width()
        }
        set width(t) {
            this.set_width(t)
        }
        set_width(t) {
            this._width !== t && (this._width = t,
            this._setWidth(this.texture, t),
            this._setTranformChange())
        }
        get_width() {
            return this.autoSize ? this.texture ? this.texture.width : this._graphics || 0 !== this._children.length ? this.getSelfBounds().width : 0 : this._width || (this.texture ? this.texture.width : 0)
        }
        get height() {
            return this.get_height()
        }
        set height(t) {
            this.set_height(t)
        }
        set_height(t) {
            this._height !== t && (this._height = t,
            this._setHeight(this.texture, t),
            this._setTranformChange())
        }
        get_height() {
            return this.autoSize ? this.texture ? this.texture.height : this._graphics || 0 !== this._children.length ? this.getSelfBounds().height : 0 : this._height || (this.texture ? this.texture.height : 0)
        }
        get displayWidth() {
            return this.width * this.scaleX
        }
        get displayHeight() {
            return this.height * this.scaleY
        }
        setSelfBounds(t) {
            this._getBoundsStyle().userBounds = t
        }
        getBounds() {
            return this._getBoundsStyle().bounds = E._getWrapRec(this._boundPointsToParent())
        }
        getSelfBounds() {
            return this._boundStyle && this._boundStyle.userBounds ? this._boundStyle.userBounds : this._graphics || 0 !== this._children.length || this._texture ? this._getBoundsStyle().bounds = E._getWrapRec(this._getBoundPointsM(!1)) : E.TEMP.setTo(0, 0, this.width, this.height)
        }
        _boundPointsToParent(t=!1) {
            var e = 0
              , i = 0
              , s = (this._style && (e = this.pivotX,
            i = this.pivotY,
            t = t || 0 !== this._style.rotation,
            this._style.scrollRect && (e += this._style.scrollRect.x,
            i += this._style.scrollRect.y)),
            this._getBoundPointsM(t));
            if (!s || s.length < 1)
                return s;
            if (8 != s.length && (s = t ? bt.scanPList(s) : E._getWrapRec(s, E.TEMP)._getBoundPoints()),
            !this.transform)
                return S.transPointList(s, this._x - e, this._y - i),
                s;
            for (var r = q.TEMP, a = s.length, n = 0; n < a; n += 2)
                r.x = s[n],
                r.y = s[n + 1],
                this.toParentPoint(r),
                s[n] = r.x,
                s[n + 1] = r.y;
            return s
        }
        getGraphicBounds(t=!1) {
            return this._graphics ? this._graphics.getBounds(t) : E.TEMP.setTo(0, 0, 0, 0)
        }
        _getBoundPointsM(t=!1) {
            if (this._boundStyle && this._boundStyle.userBounds)
                return this._boundStyle.userBounds._getBoundPoints();
            var e, i, s, r;
            if (this._boundStyle || this._getBoundsStyle(),
            this._boundStyle.temBM || (this._boundStyle.temBM = []),
            this._style.scrollRect)
                return e = S.clearArray(this._boundStyle.temBM),
                (i = E.TEMP).copyFrom(this._style.scrollRect),
                S.concatArray(e, i._getBoundPoints()),
                e;
            s = this._graphics ? this._graphics.getBoundPoints() : S.clearArray(this._boundStyle.temBM),
            this._texture && ((i = E.TEMP).setTo(0, 0, this.width || this._texture.width, this.height || this._texture.height),
            S.concatArray(s, i._getBoundPoints()));
            for (var a, n = 0, h = (a = this._children).length; n < h; n++)
                (r = a[n])instanceof Oe && !0 === r._visible && (r = r._boundPointsToParent(t)) && (s = s ? S.concatArray(s, r) : r);
            return s
        }
        _getCacheStyle() {
            return this._cacheStyle === Le.EMPTY && (this._cacheStyle = Le.create()),
            this._cacheStyle
        }
        getStyle() {
            return this._style === Be.EMPTY && (this._style = Be.create()),
            this._style
        }
        setStyle(t) {
            this._style = t
        }
        get scaleX() {
            return this._style.scaleX
        }
        set scaleX(t) {
            this.set_scaleX(t)
        }
        _setScaleX(t) {
            this._style.scaleX = t
        }
        get scaleY() {
            return this._style.scaleY
        }
        set scaleY(t) {
            this.set_scaleY(t)
        }
        _setScaleY(t) {
            this._style.scaleY = t
        }
        set_scaleX(t) {
            this.getStyle().scaleX !== t && (this._setScaleX(t),
            this._setTranformChange())
        }
        get_scaleX() {
            return this._style.scaleX
        }
        set_scaleY(t) {
            this.getStyle().scaleY !== t && (this._setScaleY(t),
            this._setTranformChange())
        }
        get_scaleY() {
            return this._style.scaleY
        }
        get rotation() {
            return this._style.rotation
        }
        set rotation(t) {
            this.getStyle().rotation !== t && (this._setRotation(t),
            this._setTranformChange())
        }
        _setRotation(t) {
            this._style.rotation = t
        }
        get skewX() {
            return this._style.skewX
        }
        set skewX(t) {
            this.getStyle().skewX !== t && (this._setSkewX(t),
            this._setTranformChange())
        }
        _setSkewX(t) {
            this._style.skewX = t
        }
        get skewY() {
            return this._style.skewY
        }
        set skewY(t) {
            this.getStyle().skewY !== t && (this._setSkewY(t),
            this._setTranformChange())
        }
        _setSkewY(t) {
            this._style.skewY = t
        }
        _createTransform() {
            return y.create()
        }
        _adjustTransform() {
            this._tfChanged = !1;
            var t, e = this._style, i = e.scaleX, s = e.scaleY, r = e.skewX, a = e.skewY, e = e.rotation, n = this._transform || (this._transform = this._createTransform());
            return e || 1 !== i || 1 !== s || 0 !== r || 0 !== a ? (n._bTransform = !0,
            r = .0174532922222222 * (e - r),
            e = .0174532922222222 * (e + a),
            a = Math.cos(e),
            e = Math.sin(e),
            t = Math.sin(r),
            r = Math.cos(r),
            n.a = i * a,
            n.b = i * e,
            n.c = -s * t,
            n.d = s * r,
            n.tx = n.ty = 0) : (n.identity(),
            this._renderType &= ~x.TRANSFORM,
            this._setRenderType(this._renderType)),
            n
        }
        _setTransform(t) {}
        get transform() {
            return this._tfChanged ? this._adjustTransform() : this._transform
        }
        set transform(t) {
            this.set_transform(t)
        }
        get_transform() {
            return this._tfChanged ? this._adjustTransform() : this._transform
        }
        set_transform(t) {
            this._tfChanged = !1;
            var e = this._transform || (this._transform = this._createTransform());
            t.copyTo(e),
            this._setTransform(e),
            t && (this._x = e.tx,
            this._y = e.ty,
            e.tx = e.ty = 0),
            t ? this._renderType |= x.TRANSFORM : this._renderType &= ~x.TRANSFORM,
            this._setRenderType(this._renderType),
            this.parentRepaint()
        }
        _setPivotX(t) {
            this.getStyle().pivotX = t
        }
        _getPivotX() {
            return this._style.pivotX
        }
        _setPivotY(t) {
            this.getStyle().pivotY = t
        }
        _getPivotY() {
            return this._style.pivotY
        }
        get pivotX() {
            return this._getPivotX()
        }
        set pivotX(t) {
            this._setPivotX(t),
            this.repaint()
        }
        get pivotY() {
            return this._getPivotY()
        }
        set pivotY(t) {
            this._setPivotY(t),
            this.repaint()
        }
        _setAlpha(t) {
            this._style.alpha !== t && (1 !== (this.getStyle().alpha = t) ? this._renderType |= x.ALPHA : this._renderType &= ~x.ALPHA,
            this._setRenderType(this._renderType),
            this.parentRepaint())
        }
        _getAlpha() {
            return this._style.alpha
        }
        get alpha() {
            return this._getAlpha()
        }
        set alpha(t) {
            this._setAlpha(t = t < 0 ? 0 : 1 < t ? 1 : t)
        }
        get visible() {
            return this.get_visible()
        }
        set visible(t) {
            this.set_visible(t)
        }
        get_visible() {
            return this._visible
        }
        set_visible(t) {
            this._visible !== t && (this._visible = t,
            this.parentRepaint(x.REPAINT_ALL))
        }
        _setBlendMode(t) {}
        get blendMode() {
            return this._style.blendMode
        }
        set blendMode(t) {
            this._setBlendMode(t),
            (this.getStyle().blendMode = t) && "source-over" != t ? this._renderType |= x.BLEND : this._renderType &= ~x.BLEND,
            this._setRenderType(this._renderType),
            this.parentRepaint()
        }
        get graphics() {
            return this._graphics || (this.graphics = new Se,
            this._graphics.autoDestroy = !0),
            this._graphics
        }
        _setGraphics(t) {}
        _setGraphicsCallBack() {}
        set graphics(t) {
            this._graphics && (this._graphics._sp = null),
            (this._graphics = t) ? (this._setGraphics(t),
            this._renderType |= x.GRAPHICS,
            t._sp = this) : this._renderType &= ~x.GRAPHICS,
            this._setRenderType(this._renderType),
            this.repaint()
        }
        get scrollRect() {
            return this._style.scrollRect
        }
        _setScrollRect(t) {}
        set scrollRect(t) {
            this.getStyle().scrollRect = t,
            this._setScrollRect(t),
            this.repaint(),
            t ? this._renderType |= x.CLIP : this._renderType &= ~x.CLIP,
            this._setRenderType(this._renderType)
        }
        pos(t, e, i=!1) {
            if (this._x !== t || this._y !== e) {
                if (this.destroyed)
                    return this;
                i ? (this._setX(t),
                this._setY(e),
                this.parentRepaint(x.REPAINT_CACHE),
                (i = this._cacheStyle.maskParent) && i.repaint(x.REPAINT_CACHE)) : (this.x = t,
                this.y = e)
            }
            return this
        }
        pivot(t, e) {
            return this.pivotX = t,
            this.pivotY = e,
            this
        }
        size(t, e) {
            return this.width = t,
            this.height = e,
            this
        }
        scale(t, e, i=!1) {
            var s = this.getStyle();
            if (s.scaleX != t || s.scaleY != e) {
                if (this.destroyed)
                    return this;
                i ? (this._setScaleX(t),
                this._setScaleY(e),
                this._setTranformChange()) : (this.scaleX = t,
                this.scaleY = e)
            }
            return this
        }
        skew(t, e) {
            return this.skewX = t,
            this.skewY = e,
            this
        }
        render(t, e, i) {
            Me.renders[this._renderType]._fun(this, t, e + this._x, i + this._y),
            this._repaint = 0
        }
        drawToCanvas(t, e, i, s) {
            return Oe.drawToCanvas(this, this._renderType, t, e, i, s)
        }
        drawToTexture(t, e, i, s, r=null) {
            return Oe.drawToTexture(this, this._renderType, t, e, i, s, r)
        }
        drawToTexture3D(t, e, i) {
            throw "not implement"
        }
        static drawToCanvas(t, e, i, s, r, a) {
            r = r - t.x | 0,
            a = a - t.y | 0,
            i |= 0,
            s |= 0;
            for (var n = new L, h = (n.size(i, s),
            n.asBitmap = !0,
            n._targets.start(),
            n._targets.clear(0, 0, 0, 0),
            Me.renders[e]._fun(t, n, r, a),
            n.flush(),
            n._targets.end(),
            n._targets.restore(),
            n._targets.getData(0, 0, i, s)), e = (n.destroy(),
            new ImageData(i,s)), o = 4 * i, l = e.data, _ = s - 1, u = _ * o, c = 0; 0 <= _; _--)
                l.set(h.subarray(c, c + o), u),
                u -= o,
                c += o;
            t = new Ie(!0);
            return t.size(i, s),
            t.getContext("2d").putImageData(e, 0, 0),
            t
        }
        static drawToTexture(t, e, i, s, r, a, n=null) {
            Oe.drawtocanvCtx || (Oe.drawtocanvCtx = new L),
            r = r - t.x | 0,
            a = a - t.y | 0,
            i |= 0,
            s |= 0;
            var h = n ? Oe.drawtocanvCtx : new L;
            return h.clear(),
            h.size(i, s),
            n ? h._targets = n : h.asBitmap = !0,
            h._targets && (h._targets.start(),
            h._targets.clear(0, 0, 0, 0),
            Me.renders[e]._fun(t, h, r, a),
            h.flush(),
            h._targets.end(),
            h._targets.restore()),
            n ? (t._repaint = 0,
            n) : (i = new ae(h._targets,ae.INV_UV),
            h.destroy(!0),
            i)
        }
        customRender(t, e, i) {
            this._repaint = x.REPAINT_ALL
        }
        _applyFilters() {}
        get filters() {
            return this._cacheStyle.filters
        }
        _setColorFilter(t) {}
        set filters(t) {
            t && 0 === t.length && (t = null),
            this._cacheStyle.filters != t && (this._getCacheStyle().filters = t ? t.slice() : null,
            t && t.length ? (this._setColorFilter(t[0]),
            this._renderType |= x.FILTERS) : (this._setColorFilter(null),
            this._renderType &= ~x.FILTERS),
            this._setRenderType(this._renderType),
            t && 0 < t.length ? (this._getBit(B.DISPLAY) || this._setBitUp(B.DISPLAY),
            1 == t.length && t[0]instanceof ft || (this._getCacheStyle().cacheForFilters = !0,
            this._checkCanvasEnable())) : this._cacheStyle.cacheForFilters && (this._cacheStyle.cacheForFilters = !1,
            this._checkCanvasEnable()),
            this._getCacheStyle().hasGlowFilter = this._isHaveGlowFilter(),
            this.repaint())
        }
        _isHaveGlowFilter() {
            var t, e;
            if (this.filters)
                for (t = 0; t < this.filters.length; t++)
                    if (this.filters[t].type == mt.GLOW)
                        return !0;
            for (t = 0,
            e = this._children.length; t < e; t++)
                if (this._children[t]._isHaveGlowFilter())
                    return !0;
            return !1
        }
        localToGlobal(t, e=!1, i=null) {
            !0 === e && (t = new q(t.x,t.y));
            var s = this;
            for (i = i || R.stage; s && !s.destroyed && s != i; )
                t = s.toParentPoint(t),
                s = s.parent;
            return t
        }
        globalToLocal(t, e=!1, i=null) {
            e && (t = new q(t.x,t.y));
            var s = this
              , r = [];
            for (i = i || R.stage; s && !s.destroyed && s != i; )
                r.push(s),
                s = s.parent;
            for (var a = r.length - 1; 0 <= a; )
                t = (s = r[a]).fromParentPoint(t),
                a--;
            return t
        }
        toParentPoint(t) {
            if (!t)
                return t;
            t.x -= this.pivotX,
            t.y -= this.pivotY,
            this.transform && this._transform.transformPoint(t),
            t.x += this._x,
            t.y += this._y;
            var e = this._style.scrollRect;
            return e && (t.x -= e.x,
            t.y -= e.y),
            t
        }
        fromParentPoint(t) {
            if (!t)
                return t;
            t.x -= this._x,
            t.y -= this._y;
            var e = this._style.scrollRect;
            return e && (t.x += e.x,
            t.y += e.y),
            this.transform && this._transform.invertTransformPoint(t),
            t.x += this.pivotX,
            t.y += this.pivotY,
            t
        }
        fromStagePoint(t) {
            return t
        }
        on(t, e, i, s=null) {
            return 1 !== this._mouseState && this.isMouseEvent(t) ? (this.mouseEnabled = !0,
            this._setBit(B.HAS_MOUSE, !0),
            this._parent && this._onDisplay(),
            this._createListener(t, e, i, s, !1)) : super.on(t, e, i, s)
        }
        once(t, e, i, s=null) {
            return 1 !== this._mouseState && this.isMouseEvent(t) ? (this.mouseEnabled = !0,
            this._setBit(B.HAS_MOUSE, !0),
            this._parent && this._onDisplay(),
            this._createListener(t, e, i, s, !0)) : super.once(t, e, i, s)
        }
        _onDisplay(t) {
            if (1 !== this._mouseState)
                for (var e = (e = this).parent; e && 1 !== e._mouseState && !e._getBit(B.HAS_MOUSE); )
                    e.mouseEnabled = !0,
                    e._setBit(B.HAS_MOUSE, !0),
                    e = e.parent
        }
        _setParent(t) {
            super._setParent(t),
            t && this._getBit(B.HAS_MOUSE) && this._onDisplay()
        }
        loadImage(t, e=null) {
            var i;
            function s() {
                this.repaint(x.REPAINT_ALL),
                e && e.run()
            }
            return t ? ((i = R.Loader.textureMap[C.formatURL(t)]) || ((i = new ae).load(t),
            R.Loader.cacheTexture(t, i)),
            (this.texture = i).getIsReady() ? s.call(this) : i.once(I.READY, this, s)) : (this.texture = null,
            s.call(this)),
            this
        }
        static fromImage(t) {
            return (new Oe).loadImage(t)
        }
        repaint(t=x.REPAINT_CACHE) {
            this._repaint & t || (this._repaint |= t,
            this.parentRepaint(t)),
            this._cacheStyle && this._cacheStyle.maskParent && this._cacheStyle.maskParent.repaint(t)
        }
        _needRepaint() {
            return this._repaint & x.REPAINT_CACHE && this._cacheStyle.enableCanvasRender && this._cacheStyle.reCache
        }
        _childChanged(t=null) {
            this._children.length ? this._renderType |= x.CHILDS : this._renderType &= ~x.CHILDS,
            this._setRenderType(this._renderType),
            t && this._getBit(B.HAS_ZORDER) && R.systemTimer.callLater(this, this.updateZOrder),
            this.repaint(x.REPAINT_ALL)
        }
        parentRepaint(t=x.REPAINT_CACHE) {
            var e = this._parent;
            !e || e._repaint & t || (e._repaint |= t,
            e.parentRepaint(t))
        }
        get stage() {
            return R.stage
        }
        get hitArea() {
            return this._style.hitArea
        }
        set hitArea(t) {
            this.getStyle().hitArea = t
        }
        _setMask(t) {}
        get mask() {
            return this._cacheStyle.mask
        }
        set mask(t) {
            t && this.mask && this.mask._cacheStyle.maskParent || (this._getCacheStyle().mask = t,
            this._setMask(t),
            this._checkCanvasEnable(),
            t ? t._getCacheStyle().maskParent = this : this.mask && (this.mask._getCacheStyle().maskParent = null),
            this._renderType |= x.MASK,
            this._setRenderType(this._renderType),
            this.parentRepaint(x.REPAINT_ALL))
        }
        get mouseEnabled() {
            return 1 < this._mouseState
        }
        set mouseEnabled(t) {
            this._mouseState = t ? 2 : 1
        }
        startDrag(t=null, e=!1, i=0, s=300, r=null, a=!1, n=.92) {
            this._style.dragging || (this.getStyle().dragging = new R.Dragging),
            this._style.dragging.start(this, t, e, i, s, r, a, n)
        }
        stopDrag() {
            this._style.dragging && this._style.dragging.stop()
        }
        _setDisplay(t) {
            t || this._cacheStyle && (this._cacheStyle.releaseContext(),
            this._cacheStyle.releaseFilterCache(),
            this._cacheStyle.hasGlowFilter && (this._cacheStyle.hasGlowFilter = !1)),
            super._setDisplay(t)
        }
        hitTestPoint(t, e) {
            var i = this.globalToLocal(q.TEMP.setTo(t, e));
            return t = i.x,
            e = i.y,
            (this._style.hitArea || (0 < this._width && 0 < this._height ? E.TEMP.setTo(0, 0, this._width, this._height) : this.getSelfBounds())).contains(t, e)
        }
        getMousePoint() {
            return this.globalToLocal(q.TEMP.setTo(R.stage.mouseX, R.stage.mouseY))
        }
        get globalScaleX() {
            for (var t = 1, e = this; e && e !== R.stage; )
                t *= e.scaleX,
                e = e.parent;
            return t
        }
        get globalRotation() {
            for (var t = 0, e = this; e && e !== R.stage; )
                t += e.rotation,
                e = e.parent;
            return t
        }
        get globalScaleY() {
            for (var t = 1, e = this; e && e !== R.stage; )
                t *= e.scaleY,
                e = e.parent;
            return t
        }
        get mouseX() {
            return this.getMousePoint().x
        }
        get mouseY() {
            return this.getMousePoint().y
        }
        get zOrder() {
            return this._zOrder
        }
        set zOrder(t) {
            this._zOrder != t && (this._zOrder = t,
            this._parent && (t && this._parent._setBit(B.HAS_ZORDER, !0),
            R.systemTimer.callLater(this._parent, this.updateZOrder)))
        }
        get texture() {
            return this._texture
        }
        _setTexture(t) {}
        set texture(t) {
            "string" == typeof t ? this.loadImage(t) : this._texture != t && (this._texture && this._texture._removeReference(),
            (this._texture = t) && t._addReference(),
            this._setTexture(t),
            this._setWidth(this._texture, this.width),
            this._setHeight(this._texture, this.height),
            t ? this._renderType |= x.TEXTURE : this._renderType &= ~x.TEXTURE,
            this._setRenderType(this._renderType),
            this.repaint())
        }
        get viewport() {
            return this._style.viewport
        }
        set viewport(t) {
            var e;
            "string" == typeof t && 3 < (e = t.split(",")).length && (t = new E(parseFloat(e[0]),parseFloat(e[1]),parseFloat(e[2]),parseFloat(e[3]))),
            this.getStyle().viewport = t
        }
        _setRenderType(t) {}
        _setTranformChange() {
            this._tfChanged = !0,
            this._renderType |= x.TRANSFORM,
            this.parentRepaint(x.REPAINT_CACHE)
        }
        _setBgStyleColor(t, e, i, s, r) {}
        _setBorderStyleColor(t, e, i, s, r, a) {}
        captureMouseEvent(t) {
            R.MouseManager.instance.setCapture(this, t)
        }
        releaseMouseEvent() {
            R.MouseManager.instance.releaseCapture()
        }
        set drawCallOptimize(t) {
            this._setBit(B.DRAWCALL_OPTIMIZE, t)
        }
        get drawCallOptimize() {
            return this._getBit(B.DRAWCALL_OPTIMIZE)
        }
    }
    F.regClass("laya.display.Sprite", Oe),
    F.regClass("Laya.Sprite", Oe);
    class Ne extends Be {
        constructor() {
            super(...arguments),
            this.italic = !1
        }
        reset() {
            return super.reset(),
            this.italic = !1,
            this.align = "left",
            this.wordWrap = !1,
            this.leading = 0,
            this.padding = [0, 0, 0, 0],
            this.bgColor = null,
            this.borderColor = null,
            this.asPassword = !1,
            this.stroke = 0,
            this.strokeColor = "#000000",
            this.bold = !1,
            this.underline = !1,
            this.underlineColor = null,
            this.currBitmapFont = null,
            this
        }
        recover() {
            this !== Ne.EMPTY && p.recover("TextStyle", this.reset())
        }
        static create() {
            return p.getItemByClass("TextStyle", Ne)
        }
        render(t, e, i, s) {
            (this.bgColor || this.borderColor) && e.drawRect(i - this.pivotX, s - this.pivotY, t.width, t.height, this.bgColor, this.borderColor, 1)
        }
    }
    Ne.EMPTY = new Ne;
    class O extends Oe {
        constructor() {
            super(),
            this._textWidth = 0,
            this._textHeight = 0,
            this._lines = [],
            this._lineWidths = [],
            this._startX = 0,
            this._startY = 0,
            this._charSize = {},
            this._valign = "top",
            this._fontSize = O.defaultFontSize,
            this._font = O.defaultFont,
            this._color = "#000000",
            this._singleCharRender = !1,
            this.overflow = O.VISIBLE,
            this._style = Ne.EMPTY
        }
        static defaultFontStr() {
            return O.defaultFontSize + "px " + O.defaultFont
        }
        getStyle() {
            return this._style === Ne.EMPTY && (this._style = Ne.create()),
            this._style
        }
        _getTextStyle() {
            return this._style === Ne.EMPTY && (this._style = Ne.create()),
            this._style
        }
        static registerBitmapFont(t, e) {
            O._bitmapFonts || (O._bitmapFonts = {}),
            O._bitmapFonts[t] = e
        }
        static unregisterBitmapFont(t, e=!0) {
            var i;
            O._bitmapFonts && O._bitmapFonts[t] && (i = O._bitmapFonts[t],
            e && i.destroy(),
            delete O._bitmapFonts[t])
        }
        destroy(t=!0) {
            super.destroy(t),
            this._clipPoint = null,
            this._lines = null,
            this._lineWidths = null,
            this._words && this._words.forEach(function(t) {
                t.cleanCache()
            }),
            this._words = null,
            this._charSize = null
        }
        _getBoundPointsM(t=0) {
            var e = E.TEMP;
            return e.setTo(0, 0, this.width, this.height),
            e._getBoundPoints()
        }
        getGraphicBounds(t=0) {
            var e = E.TEMP;
            return e.setTo(0, 0, this.width, this.height),
            e
        }
        get width() {
            return this._width || this.textWidth + this.padding[1] + this.padding[3]
        }
        set width(t) {
            t != this._width && (super.set_width(t),
            this.isChanged = !0,
            this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1))
        }
        _getCSSStyle() {
            return this._style
        }
        get height() {
            return this._height || this.textHeight
        }
        set height(t) {
            t != this._height && (super.set_height(t),
            this.isChanged = !0,
            this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1))
        }
        get textWidth() {
            return this._isChanged && R.systemTimer.runCallLater(this, this.typeset),
            this._textWidth
        }
        get textHeight() {
            return this._isChanged && R.systemTimer.runCallLater(this, this.typeset),
            this._textHeight
        }
        get text() {
            return this._text || ""
        }
        get_text() {
            return this._text || ""
        }
        set_text(t) {
            this._text !== t && (this.lang(t + ""),
            this.isChanged = !0,
            this.event(I.CHANGE),
            this.borderColor && this._setBorderStyleColor(0, 0, this.width, this.height, this.borderColor, 1))
        }
        set text(t) {
            this.set_text(t)
        }
        lang(t, e=0, i, s, r, a, n, h, o, l, _) {
            if (t = O.langPacks && O.langPacks[t] ? O.langPacks[t] : t,
            arguments.length < 2)
                this._text = t;
            else {
                for (var u = 0, c = arguments.length; u < c; u++)
                    t = t.replace("{" + u + "}", arguments[u + 1]);
                this._text = t
            }
        }
        get font() {
            return this._font
        }
        set font(t) {
            this._style.currBitmapFont && (this._getTextStyle().currBitmapFont = null,
            this.scale(1, 1)),
            O._bitmapFonts && O._bitmapFonts[t] && (this._getTextStyle().currBitmapFont = O._bitmapFonts[t]),
            this._font = t,
            this.isChanged = !0
        }
        get fontSize() {
            return this._fontSize
        }
        set fontSize(t) {
            this._fontSize != t && (this._fontSize = t,
            this.isChanged = !0)
        }
        get bold() {
            return this._style.bold
        }
        set bold(t) {
            this._getTextStyle().bold = t,
            this.isChanged = !0
        }
        get color() {
            return this._color
        }
        set color(t) {
            this.set_color(t)
        }
        get_color() {
            return this._color
        }
        set_color(t) {
            this._color != t && (this._color = t,
            !this._isChanged && this._graphics ? this._graphics.replaceTextColor(this.color) : this.isChanged = !0)
        }
        get italic() {
            return this._style.italic
        }
        set italic(t) {
            this._getTextStyle().italic = t,
            this.isChanged = !0
        }
        get align() {
            return this._style.align
        }
        set align(t) {
            this._getTextStyle().align = t,
            this.isChanged = !0
        }
        get valign() {
            return this._valign
        }
        set valign(t) {
            this._valign = t,
            this.isChanged = !0
        }
        get wordWrap() {
            return this._style.wordWrap
        }
        set wordWrap(t) {
            this._getTextStyle().wordWrap = t,
            this.isChanged = !0
        }
        get leading() {
            return this._style.leading
        }
        set leading(t) {
            this._getTextStyle().leading = t,
            this.isChanged = !0
        }
        get padding() {
            return this._style.padding
        }
        set padding(t) {
            if ("string" == typeof t) {
                for (var e, i = t.split(","), s = i.length; i.length < 4; )
                    i.push(0);
                for (e = 0; e < s; e++)
                    i[e] = parseFloat(i[e]) || 0;
                t = i
            }
            this._getTextStyle().padding = t,
            this.isChanged = !0
        }
        get bgColor() {
            return this._style.bgColor
        }
        set bgColor(t) {
            this.set_bgColor(t)
        }
        set_bgColor(t) {
            this._getTextStyle().bgColor = t,
            this._renderType |= x.STYLE,
            this._setBgStyleColor(0, 0, this.width, this.height, t),
            this._setRenderType(this._renderType),
            this.isChanged = !0
        }
        get_bgColor() {
            return this._style.bgColor
        }
        get borderColor() {
            return this._style.borderColor
        }
        set borderColor(t) {
            this._getTextStyle().borderColor = t,
            this._renderType |= x.STYLE,
            this._setBorderStyleColor(0, 0, this.width, this.height, t, 1),
            this._setRenderType(this._renderType),
            this.isChanged = !0
        }
        get stroke() {
            return this._style.stroke
        }
        set stroke(t) {
            this._getTextStyle().stroke = t,
            this.isChanged = !0
        }
        get strokeColor() {
            return this._style.strokeColor
        }
        set strokeColor(t) {
            this._getTextStyle().strokeColor = t,
            this.isChanged = !0
        }
        set isChanged(t) {
            this._isChanged !== t && (this._isChanged = t) && R.systemTimer.callLater(this, this.typeset)
        }
        _getContextFont() {
            return (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + (R.Browser.onIPhone && O.fontFamilyMap[this.font] || this.font)
        }
        _isPassWordMode() {
            var t = this._style.asPassword;
            return t = "prompt"in this && this.prompt == this._text ? !1 : t
        }
        _getPassWordTxt(t) {
            for (var e = "", i = t.length; 0 < i; i--)
                e += "●";
            return e
        }
        _renderText() {
            var t, e = this.padding, i = this._lines.length, s = (this.overflow != O.VISIBLE && (i = Math.min(i, Math.floor((this.height - e[0] - e[2]) / (this.leading + this._charSize.height)) + 1)),
            this.scrollY / (this._charSize.height + this.leading) | 0), r = this.graphics, a = (r.clear(!0),
            this._getContextFont()), n = (R.Browser.context.font = a,
            e[3]), h = "left", o = this._lines, l = this.leading + this._charSize.height, _ = this._style.currBitmapFont, u = (_ && (l = this.leading + _.getMaxHeight()),
            e[0]);
            !_ && 0 < this._width && this._textWidth <= this._width && ("right" == this.align ? (h = "right",
            n = this._width - e[1]) : "center" == this.align && (h = "center",
            n = .5 * this._width + e[3] - e[1]));
            let c = 1;
            _ && _.autoScaleSize && (c = _.fontSize / this.fontSize),
            0 < this._height && ("middle" === (d = this._textHeight > this._height ? "top" : this.valign) ? u = .5 * (this._height - i / c * l) + e[0] - e[2] : "bottom" === d && (u = this._height - i / c * l - e[2])),
            this._clipPoint && (r.save(),
            _ && _.autoScaleSize ? (d = this._width ? this._width - e[3] - e[1] : this._textWidth,
            t = this._height ? this._height - e[0] - e[2] : this._textHeight,
            d *= c,
            t *= c,
            r.clipRect(e[3], e[0], d, t)) : r.clipRect(e[3], e[0], this._width ? this._width - e[3] - e[1] : this._textWidth, this._height ? this._height - e[0] - e[2] : this._textHeight),
            this.repaint());
            for (var d, p = this._style, m = p.asPassword, g = ("prompt"in this && this.prompt == this._text && (m = !1),
            0), f = 0, T = Math.min(this._lines.length, i + s) || 1, x = s; x < T; x++) {
                var v, y = o[x];
                if (m)
                    for (var E = y.length, y = "", C = E; 0 < C; C--)
                        y += "●";
                null == y && (y = ""),
                g = n - (this._clipPoint ? this._clipPoint.x : 0),
                f = u + l * x - (this._clipPoint ? this._clipPoint.y : 0),
                this.underline && this._drawUnderline(h, g, f, x),
                _ ? (E = this.width,
                _.autoScaleSize && (E = this.width * c,
                g *= c,
                f *= c),
                _._drawText(y, this, g, f, this.align, E)) : (this._words || (this._words = []),
                this._words.length > x - s ? v = this._words[x - s] : (v = new he,
                this._words.push(v)),
                v.setText(y),
                v.splitRender = this._singleCharRender,
                p.stroke ? r.fillBorderText(v, g, f, a, this.color, h, p.stroke, p.strokeColor) : r.fillText(v, g, f, a, this.color, h))
            }
            _ && _.autoScaleSize && (d = 1 / c,
            this.scale(d, d)),
            this._clipPoint && r.restore(),
            this._startX = n,
            this._startY = u
        }
        _drawUnderline(t, e, i, s) {
            var r = this._lineWidths[s];
            switch (t) {
            case "center":
                e -= r / 2;
                break;
            case "right":
                e -= r
            }
            i += this._charSize.height,
            this._graphics.drawLine(e, i, e + r, i, this.underlineColor || this.color, 1)
        }
        typeset() {
            if (this._isChanged = !1,
            !this._text)
                return this._clipPoint = null,
                this._textWidth = this._textHeight = 0,
                void this.graphics.clear(!0);
            R.Render.isConchApp ? window.conchTextCanvas.font = this._getContextFont() : R.Browser.context.font = this._getContextFont(),
            this._lines.length = 0,
            this._lineWidths.length = 0,
            this._isPassWordMode() ? this._parseLines(this._getPassWordTxt(this._text)) : this._parseLines(this._text),
            this._evalTextSize(),
            this._checkEnabledViewportOrNot() ? this._clipPoint || (this._clipPoint = new q(0,0)) : this._clipPoint = null,
            this._renderText()
        }
        _evalTextSize() {
            var e, t = Math.max.apply(this, this._lineWidths);
            let i = this._style.currBitmapFont;
            if (i) {
                let t = i.getMaxHeight();
                i.autoScaleSize && (t = this.fontSize),
                e = this._lines.length * (t + this.leading) + this.padding[0] + this.padding[2]
            } else
                e = this._lines.length * (this._charSize.height + this.leading) + this.padding[0] + this.padding[2],
                this._lines.length && (e -= this.leading);
            t == this._textWidth && e == this._textHeight || (this._textWidth = t,
            this._textHeight = e)
        }
        _checkEnabledViewportOrNot() {
            return this.overflow == O.SCROLL && (0 < this._width && this._textWidth > this._width || 0 < this._height && this._textHeight > this._height)
        }
        changeText(t) {
            this._text !== t && (this.lang(t + ""),
            this._graphics && this._graphics.replaceText(this._text) || this.typeset())
        }
        _parseLines(t) {
            for (var e, i = this.wordWrap || this.overflow == O.HIDDEN, s = (i && (e = this._getWordWrapWidth()),
            this._style.currBitmapFont), r = (s ? (this._charSize.width = s.getMaxWidth(),
            this._charSize.height = s.getMaxHeight()) : (s = null,
            s = (R.Render.isConchApp ? window.conchTextCanvas : R.Browser.context).measureText(O._testWord),
            this._charSize.width = (s = s || {
                width: 100
            }).width,
            this._charSize.height = s.height || this.fontSize),
            t.replace(/\r\n/g, "\n").split("\n")), a = 0, n = r.length; a < n; a++) {
                var h = r[a];
                i ? this._parseLine(h, e) : (this._lineWidths.push(this._getTextWidth(h)),
                this._lines.push(h))
            }
        }
        _parseLine(t, e) {
            var i = this._lines
              , s = 0
              , r = 0
              , a = 0
              , n = 0;
            if ((r = this._getTextWidth(t)) <= e)
                return i.push(t),
                void this._lineWidths.push(r);
            r = this._charSize.width;
            for (var s = Math.floor(e / r), a = r = this._getTextWidth(t.substring(0, s = 0 == s ? 1 : s)), h = s, o = t.length; h < o; h++)
                if (e < (a += r = this._getTextWidth(t.charAt(h))))
                    if (this.wordWrap) {
                        var l = t.substring(n, h)
                          , _ = l.charCodeAt(l.length - 1);
                        if (!(_ < 19968 || 40869 < _) || (_ = /(?:[^\s\!-\/])+$/.exec(l)) && (h = _.index + n,
                        0 == _.index ? h += l.length : l = t.substring(n, h)),
                        i.push(l),
                        this._lineWidths.push(a - r),
                        !((n = h) + s < o)) {
                            i.push(t.substring(n, o)),
                            this._lineWidths.push(this._getTextWidth(i[i.length - 1])),
                            n = -1;
                            break
                        }
                        h += s,
                        a = r = this._getTextWidth(t.substring(n, h)),
                        h--
                    } else if (this.overflow == O.HIDDEN)
                        return i.push(t.substring(0, h)),
                        void this._lineWidths.push(this._getTextWidth(i[i.length - 1]));
            this.wordWrap && -1 != n && (i.push(t.substring(n, o)),
            this._lineWidths.push(this._getTextWidth(i[i.length - 1])))
        }
        _getTextWidth(t) {
            var e = this._style.currBitmapFont;
            return e ? e.getTextWidth(t) : (R.Render.isConchApp ? window.conchTextCanvas.measureText(t) : R.Browser.context.measureText(t) || {
                width: 100
            }).width
        }
        _getWordWrapWidth() {
            var t = this.padding
              , e = this._style.currBitmapFont
              , e = e && e.autoScaleSize ? this._width * (e.fontSize / this.fontSize) : this._width;
            return (e = (e = e <= 0 ? this.wordWrap ? 100 : R.Browser.width : e) <= 0 ? 100 : e) - t[3] - t[1]
        }
        getCharPoint(t, e=null) {
            this._isChanged && R.systemTimer.runCallLater(this, this.typeset);
            for (var i = 0, s = this._lines, r = 0, a = 0, n = s.length; a < n; a++) {
                if (t < (i += s[a].length)) {
                    var h = a;
                    break
                }
                r = i
            }
            var o = (this.italic ? "italic " : "") + (this.bold ? "bold " : "") + this.fontSize + "px " + this.font
              , o = (R.Browser.context.font = o,
            this._getTextWidth(this._text.substring(r, t)));
            return (e || new q).setTo(this._startX + o - (this._clipPoint ? this._clipPoint.x : 0), this._startY + h * (this._charSize.height + this.leading) - (this._clipPoint ? this._clipPoint.y : 0))
        }
        set scrollX(t) {
            var e;
            this.overflow != O.SCROLL || this.textWidth < this._width || !this._clipPoint || (t = t < this.padding[3] ? this.padding[3] : t,
            e = this._textWidth - this._width,
            this._clipPoint.x = t = e < t ? e : t,
            this._renderText())
        }
        get scrollX() {
            return this._clipPoint ? this._clipPoint.x : 0
        }
        set scrollY(t) {
            var e;
            this.overflow != O.SCROLL || this.textHeight < this._height || !this._clipPoint || (t = t < this.padding[0] ? this.padding[0] : t,
            e = this._textHeight - this._height,
            this._clipPoint.y = t = e < t ? e : t,
            this._renderText())
        }
        get scrollY() {
            return this._clipPoint ? this._clipPoint.y : 0
        }
        get maxScrollX() {
            return this.textWidth < this._width ? 0 : this._textWidth - this._width
        }
        get maxScrollY() {
            return this.textHeight < this._height ? 0 : this._textHeight - this._height
        }
        get lines() {
            return this._isChanged && this.typeset(),
            this._lines
        }
        get underlineColor() {
            return this._style.underlineColor
        }
        set underlineColor(t) {
            this._getTextStyle().underlineColor = t,
            this._isChanged || this._renderText()
        }
        get underline() {
            return this._style.underline
        }
        set underline(t) {
            this._getTextStyle().underline = t
        }
        set singleCharRender(t) {
            this._singleCharRender = t
        }
        get singleCharRender() {
            return this._singleCharRender
        }
    }
    O.VISIBLE = "visible",
    O.SCROLL = "scroll",
    O.HIDDEN = "hidden",
    O.defaultFontSize = 12,
    O.defaultFont = "Arial",
    O.isComplexText = !1,
    O.fontFamilyMap = {
        "报隶": "报隶-简",
        "黑体": "黑体-简",
        "楷体": "楷体-简",
        "兰亭黑": "兰亭黑-简",
        "隶变": "隶变-简",
        "凌慧体": "凌慧体-简",
        "翩翩体": "翩翩体-简",
        "苹方": "苹方-简",
        "手札体": "手札体-简",
        "宋体": "宋体-简",
        "娃娃体": "娃娃体-简",
        "魏碑": "魏碑-简",
        "行楷": "行楷-简",
        "雅痞": "雅痞-简",
        "圆体": "圆体-简"
    },
    O._testWord = "游",
    O.CharacterCache = !0,
    O.RightToLeft = !1,
    R.regClass(O),
    F.regClass("laya.display.Text", O),
    F.regClass("Laya.Text", O);
    class h extends O {
        constructor() {
            super(),
            this._multiline = !1,
            this._editable = !0,
            this._maxChars = 1e5,
            this._type = "text",
            this._prompt = "",
            this._promptColor = "#A9A9A9",
            this._originColor = "#000000",
            this._content = "",
            h.IOS_IFRAME = R.Browser.onIOS && R.Browser.window.top != R.Browser.window.self,
            this._width = 100,
            this._height = 20,
            this.multiline = !1,
            this.overflow = O.SCROLL,
            this.on(I.MOUSE_DOWN, this, this._onMouseDown),
            this.on(I.UNDISPLAY, this, this._onUnDisplay)
        }
        static __init__() {
            var t;
            h._createInputElement(),
            R.Browser.onMobile && (t = !1,
            (R.Browser.onMiniGame || R.Browser.onBDMiniGame || R.Browser.onQGMiniGame || R.Browser.onKGMiniGame || R.Browser.onVVMiniGame || R.Browser.onAlipayMiniGame || R.Browser.onQQMiniGame || R.Browser.onBLMiniGame || R.Browser.onTTMiniGame || R.Browser.onHWMiniGame || R.Browser.onTBMiniGame) && (t = !0),
            R.Render.canvas.addEventListener(!h.IOS_IFRAME || t ? "touchend" : "click", h._popupInputMethod))
        }
        static _popupInputMethod(t) {
            h.isInputting && h.inputElement.focus()
        }
        static _createInputElement() {
            h._initInput(h.area = R.Browser.createElement("textarea")),
            h._initInput(h.input = R.Browser.createElement("input")),
            h.inputContainer = R.Browser.createElement("div"),
            h.inputContainer.style.position = "absolute",
            h.inputContainer.style.zIndex = "1E5",
            R.Browser.container.appendChild(h.inputContainer),
            h.inputContainer.setPos = function(t, e) {
                h.inputContainer.style.left = t + "px",
                h.inputContainer.style.top = e + "px"
            }
        }
        static _initInput(e) {
            var t = e.style;
            t.cssText = "position:absolute;overflow:hidden;resize:none;transform-origin:0 0;-webkit-transform-origin:0 0;-moz-transform-origin:0 0;-o-transform-origin:0 0;",
            t.resize = "none",
            t.backgroundColor = "transparent",
            t.border = "none",
            t.outline = "none",
            t.zIndex = "1",
            e.addEventListener("input", h._processInputting),
            e.addEventListener("mousemove", h._stopEvent),
            e.addEventListener("mousedown", h._stopEvent),
            e.addEventListener("touchmove", h._stopEvent),
            e.setFontFace = function(t) {
                e.style.fontFamily = t
            }
            ,
            R.Render.isConchApp || (e.setColor = function(t) {
                e.style.color = t
            }
            ,
            e.setFontSize = function(t) {
                e.style.fontSize = t + "px"
            }
            )
        }
        static _processInputting(t) {
            var e, i = h.inputElement.target;
            i && (e = h.inputElement.value,
            i._restrictPattern && (e = e.replace(/\u2006|\x27/g, ""),
            i._restrictPattern.test(e) && (e = e.replace(i._restrictPattern, ""),
            h.inputElement.value = e)),
            i._text = e,
            i.event(I.INPUT))
        }
        static _stopEvent(t) {
            "touchmove" == t.type && t.preventDefault(),
            t.stopPropagation && t.stopPropagation()
        }
        setSelection(t, e) {
            this.focus = !0,
            h.inputElement.selectionStart = t,
            h.inputElement.selectionEnd = e
        }
        get multiline() {
            return this._multiline
        }
        set multiline(t) {
            this._multiline = t,
            this.valign = t ? "top" : "middle"
        }
        get nativeInput() {
            return this._multiline ? h.area : h.input
        }
        _onUnDisplay(t=0) {
            this.focus = !1
        }
        _onMouseDown(t) {
            this.focus = !0
        }
        _syncInputTransform() {
            var t = this.nativeInput
              , e = S.getTransformRelativeToWindow(this, this.padding[3], this.padding[0])
              , i = this._width - this.padding[1] - this.padding[3]
              , s = this._height - this.padding[0] - this.padding[2];
            R.Render.isConchApp ? (t.setScale(e.scaleX, e.scaleY),
            t.setSize(i, s),
            t.setPos(e.x, e.y)) : (h.inputContainer.style.transform = h.inputContainer.style.webkitTransform = "scale(" + e.scaleX + "," + e.scaleY + ") rotate(" + R.stage.canvasDegree + "deg)",
            t.style.width = i + "px",
            t.style.height = s + "px",
            h.inputContainer.style.left = e.x + "px",
            h.inputContainer.style.top = e.y + "px")
        }
        select() {
            this.nativeInput.select()
        }
        get focus() {
            return this._focus
        }
        set focus(t) {
            var e = this.nativeInput;
            this._focus !== t && (t ? (e.target ? e.target._focusOut() : this._setInputMethod(),
            ((e = this.nativeInput).target = this)._focusIn()) : (e.target = null,
            this._focusOut(),
            R.Browser.document.body.scrollTop = 0,
            e.blur(),
            R.Render.isConchApp ? e.setPos(-1e4, -1e4) : h.inputContainer.contains(e) && h.inputContainer.removeChild(e)))
        }
        _setInputMethod() {
            h.input.parentElement && h.inputContainer.removeChild(h.input),
            h.area.parentElement && h.inputContainer.removeChild(h.area),
            R.Browser.onAndroid && (h.input = h.inputElement = R.Browser.createElement("input"),
            h._initInput(h.input)),
            h.inputElement = this._multiline ? h.area : h.input,
            h.inputContainer.appendChild(h.inputElement),
            O.RightToLeft && (h.inputElement.style.direction = "rtl")
        }
        _focusIn() {
            h.isInputting = !0;
            var t = this.nativeInput
              , e = (h.input && (h.input.type = this._type),
            this._focus = !0,
            t.style);
            e.whiteSpace = this.wordWrap ? "pre-wrap" : "nowrap",
            this._setPromptColor(),
            t.readOnly = !this._editable,
            R.Render.isConchApp && (t.setType(this._type),
            t.setForbidEdit(!this._editable)),
            t.maxLength = this._maxChars,
            t.value = this._content,
            t.placeholder = this._prompt,
            R.stage.off(I.KEY_DOWN, this, this._onKeyDown),
            R.stage.on(I.KEY_DOWN, this, this._onKeyDown),
            (R.stage.focus = this).event(I.FOCUS),
            R.Browser.onPC && t.focus(),
            R.Browser.onMiniGame || R.Browser.onBDMiniGame || R.Browser.onQGMiniGame || R.Browser.onKGMiniGame || R.Browser.onVVMiniGame || R.Browser.onAlipayMiniGame || R.Browser.onQQMiniGame || R.Browser.onBLMiniGame || R.Browser.onTTMiniGame || R.Browser.onHWMiniGame || R.Browser.onTBMiniGame || (this._text = null),
            this.typeset(),
            t.setColor(this._originColor),
            t.setFontSize(this.fontSize),
            t.setFontFace(R.Browser.onIPhone && O.fontFamilyMap[this.font] || this.font),
            R.Render.isConchApp && t.setMultiAble && t.setMultiAble(this._multiline),
            e.lineHeight = this.leading + this.fontSize + "px",
            e.fontStyle = this.italic ? "italic" : "normal",
            e.fontWeight = this.bold ? "bold" : "normal",
            e.textAlign = this.align,
            e.padding = "0 0",
            this._syncInputTransform(),
            !R.Render.isConchApp && R.Browser.onPC && R.systemTimer.frameLoop(1, this, this._syncInputTransform)
        }
        _setPromptColor() {
            h.promptStyleDOM = R.Browser.getElementById("promptStyle"),
            h.promptStyleDOM || (h.promptStyleDOM = R.Browser.createElement("style"),
            h.promptStyleDOM.setAttribute("id", "promptStyle"),
            R.Browser.document.head.appendChild(h.promptStyleDOM)),
            h.promptStyleDOM.innerText = "input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {color:" + this._promptColor + "}input:-moz-placeholder, textarea:-moz-placeholder {color:" + this._promptColor + "}input::-moz-placeholder, textarea::-moz-placeholder {color:" + this._promptColor + "}input:-ms-input-placeholder, textarea:-ms-input-placeholder {color:" + this._promptColor + "}"
        }
        _focusOut() {
            h.isInputting && (h.isInputting = !1,
            this._focus = !1,
            this._text = null,
            this._content = this.nativeInput.value,
            this._content ? (super.set_text(this._content),
            super.set_color(this._originColor)) : (super.set_text(this._prompt),
            super.set_color(this._promptColor)),
            R.stage.off(I.KEY_DOWN, this, this._onKeyDown),
            R.stage.focus = null,
            this.event(I.BLUR),
            this.event(I.CHANGE),
            R.Render.isConchApp && this.nativeInput.blur(),
            R.Browser.onPC && R.systemTimer.clear(this, this._syncInputTransform))
        }
        _onKeyDown(t) {
            13 === t.keyCode && (R.Browser.onMobile && !this._multiline && (this.focus = !1),
            this.event(I.ENTER))
        }
        miniGameTxt(t) {
            super.set_color(this._originColor),
            t += "",
            this._multiline || (t = t.replace(/\r?\n/g, "")),
            (this._content = t) ? super.set_text(t) : (super.set_text(this._prompt),
            super.set_color(this.promptColor))
        }
        set text(t) {
            super.set_color(this._originColor),
            t += "",
            this._focus ? (this.nativeInput.value = t || "",
            this.event(I.CHANGE)) : (this._multiline || (t = t.replace(/\r?\n/g, "")),
            (this._content = t) ? super.set_text(t) : (super.set_text(this._prompt),
            super.set_color(this.promptColor)))
        }
        get text() {
            return this._focus ? this.nativeInput.value : this._content || ""
        }
        changeText(t) {
            this._content = t,
            this._focus ? (this.nativeInput.value = t || "",
            this.event(I.CHANGE)) : super.changeText(t)
        }
        set color(t) {
            this._focus && this.nativeInput.setColor(t),
            super.set_color(this._content ? t : this._promptColor),
            this._originColor = t
        }
        get color() {
            return super.color
        }
        set bgColor(t) {
            super.set_bgColor(t),
            R.Render.isConchApp && this.nativeInput.setBgColor(t)
        }
        get bgColor() {
            return super.bgColor
        }
        get restrict() {
            return this._restrictPattern ? this._restrictPattern.source : ""
        }
        set restrict(t) {
            t ? (-1 < (t = "[^" + t + "]").indexOf("^^") && (t = t.replace("^^", "")),
            this._restrictPattern = new RegExp(t,"g")) : this._restrictPattern = null
        }
        set editable(t) {
            this._editable = t,
            R.Render.isConchApp && h.input.setForbidEdit(!t)
        }
        get editable() {
            return this._editable
        }
        get maxChars() {
            return this._maxChars
        }
        set maxChars(t) {
            this._maxChars = t = t <= 0 ? 1e5 : t
        }
        get prompt() {
            return this._prompt
        }
        set prompt(t) {
            !this._text && t && super.set_color(this._promptColor),
            this.promptColor = this._promptColor,
            this._text ? super.set_text(this._text == this._prompt ? t : this._text) : super.set_text(t),
            this._prompt = O.langPacks && O.langPacks[t] ? O.langPacks[t] : t
        }
        get promptColor() {
            return this._promptColor
        }
        set promptColor(t) {
            this._promptColor = t,
            this._content || super.set_color(t)
        }
        get type() {
            return this._type
        }
        set type(t) {
            this._getTextStyle().asPassword = "password" === t,
            this._type = t
        }
    }
    h.TYPE_TEXT = "text",
    h.TYPE_PASSWORD = "password",
    h.TYPE_EMAIL = "email",
    h.TYPE_URL = "url",
    h.TYPE_NUMBER = "number",
    h.TYPE_RANGE = "range",
    h.TYPE_DATE = "date",
    h.TYPE_MONTH = "month",
    h.TYPE_WEEK = "week",
    h.TYPE_TIME = "time",
    h.TYPE_DATE_TIME = "datetime",
    h.TYPE_DATE_TIME_LOCAL = "datetime-local",
    h.TYPE_SEARCH = "search",
    h.IOS_IFRAME = !1,
    h.inputHeight = 45,
    h.isInputting = !1,
    F.regClass("laya.display.Input", h),
    F.regClass("Laya.Input", h);
    class Ue {
        constructor() {
            this.preOvers = [],
            this.preDowns = [],
            this.preRightDowns = [],
            this.enable = !0,
            this._event = new I,
            this._lastClickTime = 0
        }
        _clearTempArrs() {
            Ue._oldArr.length = 0,
            Ue._newArr.length = 0,
            Ue._tEleArr.length = 0
        }
        getTouchFromArr(t, e) {
            for (var i, s = e.length, r = 0; r < s; r++)
                if ((i = e[r]).id == t)
                    return i;
            return null
        }
        removeTouchFromArr(t, e) {
            for (var i = e.length - 1; 0 <= i; i--)
                e[i].id == t && e.splice(i, 1)
        }
        createTouchO(t, e) {
            var i = p.getItem("TouchData") || {};
            return i.id = e,
            i.tar = t,
            i
        }
        onMouseDown(t, e, i=!1) {
            var s, r, a, n;
            this.enable && (a = this.getTouchFromArr(e, this.preOvers),
            n = this.getEles(t, null, Ue._tEleArr),
            a ? a.tar = t : (s = this.createTouchO(t, e),
            this.preOvers.push(s)),
            P.onMobile && this.sendEvents(n, I.MOUSE_OVER),
            r = i ? this.preDowns : this.preRightDowns,
            (a = this.getTouchFromArr(e, r)) ? a.tar = t : (s = this.createTouchO(t, e),
            r.push(s)),
            this.sendEvents(n, i ? I.MOUSE_DOWN : I.RIGHT_MOUSE_DOWN),
            this._clearTempArrs())
        }
        sendEvents(t, e) {
            var i, s, r = t.length;
            for (this._event._stoped = !1,
            s = t[0],
            i = 0; i < r; i++) {
                var a = t[i];
                if (a.destroyed)
                    return;
                if (a.event(e, this._event.setTo(e, a, s)),
                this._event._stoped)
                    break
            }
        }
        getEles(t, e=null, i=null) {
            for (i ? i.length = 0 : i = []; t && t != e; )
                i.push(t),
                t = t.parent;
            return i
        }
        checkMouseOutAndOverOfMove(t, e, i=0) {
            var s, r, a, n, h, o, l;
            if (e != t)
                if (e.contains(t))
                    l = this.getEles(t, e, Ue._tEleArr),
                    this.sendEvents(l, I.MOUSE_OVER);
                else if (t.contains(e))
                    l = this.getEles(e, t, Ue._tEleArr),
                    this.sendEvents(l, I.MOUSE_OUT);
                else {
                    for ((l = Ue._tEleArr).length = 0,
                    n = this.getEles(e, null, Ue._oldArr),
                    h = this.getEles(t, null, Ue._newArr),
                    a = n.length,
                    r = 0; r < a; r++) {
                        if (s = n[r],
                        0 <= (o = h.indexOf(s))) {
                            h.splice(o, h.length - o);
                            break
                        }
                        l.push(s)
                    }
                    0 < l.length && this.sendEvents(l, I.MOUSE_OUT),
                    0 < h.length && this.sendEvents(h, I.MOUSE_OVER)
                }
        }
        onMouseMove(t, e) {
            var i, s;
            this.enable && ((s = this.getTouchFromArr(e, this.preOvers)) ? (this.checkMouseOutAndOverOfMove(t, s.tar),
            s.tar = t,
            i = this.getEles(t, null, Ue._tEleArr)) : (i = this.getEles(t, null, Ue._tEleArr),
            this.sendEvents(i, I.MOUSE_OVER),
            this.preOvers.push(this.createTouchO(t, e))),
            this.sendEvents(i, I.MOUSE_MOVE),
            this._clearTempArrs())
        }
        getLastOvers() {
            return (Ue._tEleArr.length = 0) < this.preOvers.length && this.preOvers[0].tar ? this.getEles(this.preOvers[0].tar, null, Ue._tEleArr) : (Ue._tEleArr.push(R.stage),
            Ue._tEleArr)
        }
        stageMouseOut() {
            var t = this.getLastOvers();
            this.preOvers.length = 0,
            this.sendEvents(t, I.MOUSE_OUT)
        }
        onMouseUp(t, e, i=!1) {
            if (this.enable) {
                var s, r, a, n, h, o, l, _ = P.onMobile, u = this.getEles(t, null, Ue._tEleArr);
                if (this.sendEvents(u, i ? I.MOUSE_UP : I.RIGHT_MOUSE_UP),
                l = i ? this.preDowns : this.preRightDowns,
                s = this.getTouchFromArr(e, l)) {
                    var c = P.now()
                      , d = c - this._lastClickTime < 300;
                    if (this._lastClickTime = c,
                    t == s.tar)
                        o = u;
                    else
                        for (r = this.getEles(s.tar, null, Ue._oldArr),
                        (o = Ue._newArr).length = 0,
                        n = r.length,
                        a = 0; a < n; a++)
                            h = r[a],
                            0 <= u.indexOf(h) && o.push(h);
                    0 < o.length && this.sendEvents(o, i ? I.CLICK : I.RIGHT_CLICK),
                    i && d && this.sendEvents(o, I.DOUBLE_CLICK),
                    this.removeTouchFromArr(e, l),
                    s.tar = null,
                    p.recover("TouchData", s)
                }
                (s = this.getTouchFromArr(e, this.preOvers)) && _ && ((o = this.getEles(s.tar, null, o)) && 0 < o.length && this.sendEvents(o, I.MOUSE_OUT),
                this.removeTouchFromArr(e, this.preOvers),
                s.tar = null,
                p.recover("TouchData", s)),
                this._clearTempArrs()
            }
        }
    }
    Ue.I = new Ue,
    Ue._oldArr = [],
    Ue._newArr = [],
    Ue._tEleArr = [];
    class Ge {
        constructor() {
            this.mouseX = 0,
            this.mouseY = 0,
            this.disableMouseEvent = !1,
            this.mouseDownTime = 0,
            this.mouseMoveAccuracy = 2,
            this._event = new I,
            this._captureSp = null,
            this._captureChain = [],
            this._captureExlusiveMode = !1,
            this._hitCaputreSp = !1,
            this._point = new q,
            this._rect = new E,
            this._lastMoveTimer = 0,
            this._prePoint = new q,
            this._touchIDs = {},
            this._curTouchID = NaN,
            this._id = 1
        }
        __init__(t, e) {
            this._stage = t;
            var i = this;
            e.oncontextmenu = function(t) {
                if (Ge.enabled)
                    return !1
            }
            ,
            e.addEventListener("mousedown", function(t) {
                Ge.enabled && (P.onIE || t.cancelable && t.preventDefault(),
                i.mouseDownTime = P.now(),
                i.runEvent(t))
            }),
            e.addEventListener("mouseup", function(t) {
                Ge.enabled && (t.cancelable && t.preventDefault(),
                i.mouseDownTime = -P.now(),
                i.runEvent(t))
            }, !0),
            e.addEventListener("mousemove", function(t) {
                var e;
                Ge.enabled && (t.cancelable && t.preventDefault(),
                (e = P.now()) - i._lastMoveTimer < 10 || (i._lastMoveTimer = e,
                i.runEvent(t)))
            }, !0),
            e.addEventListener("mouseout", function(t) {
                Ge.enabled && i.runEvent(t)
            }),
            e.addEventListener("mouseover", function(t) {
                Ge.enabled && i.runEvent(t)
            }),
            e.addEventListener("touchstart", function(t) {
                Ge.enabled && (Ge._isFirstTouch || h.isInputting || t.cancelable && t.preventDefault(),
                i.mouseDownTime = P.now(),
                i.runEvent(t))
            }),
            e.addEventListener("touchend", function(t) {
                Ge.enabled ? (Ge._isFirstTouch || h.isInputting || t.cancelable && t.preventDefault(),
                Ge._isFirstTouch = !1,
                i.mouseDownTime = -P.now(),
                i.runEvent(t)) : i._curTouchID = NaN
            }, !0),
            e.addEventListener("touchmove", function(t) {
                Ge.enabled && (t.cancelable && t.preventDefault(),
                i.runEvent(t))
            }, !0),
            e.addEventListener("touchcancel", function(t) {
                Ge.enabled ? (t.cancelable && t.preventDefault(),
                i.runEvent(t)) : i._curTouchID = NaN
            }, !0),
            e.addEventListener("mousewheel", function(t) {
                Ge.enabled && i.runEvent(t)
            }),
            e.addEventListener("DOMMouseScroll", function(t) {
                Ge.enabled && i.runEvent(t)
            })
        }
        initEvent(t, e=null) {
            this._event._stoped = !1,
            this._event.nativeEvent = e || t,
            this._target = null,
            this._point.setTo(t.pageX || t.clientX, t.pageY || t.clientY),
            this._stage._canvasTransform && (this._stage._canvasTransform.invertTransformPoint(this._point),
            this.mouseX = this._point.x,
            this.mouseY = this._point.y),
            this._event.touchId = t.identifier || 0,
            this._tTouchID = this._event.touchId,
            (e = Ue.I._event)._stoped = !1,
            e.nativeEvent = this._event.nativeEvent,
            e.touchId = this._event.touchId
        }
        checkMouseWheel(t) {
            this._event.delta = t.wheelDelta ? .025 * t.wheelDelta : -t.detail;
            for (var e = Ue.I.getLastOvers(), i = 0, s = e.length; i < s; i++) {
                var r = e[i];
                r.event(I.MOUSE_WHEEL, this._event.setTo(I.MOUSE_WHEEL, r, this._target))
            }
        }
        onMouseMove(t) {
            Ue.I.onMouseMove(t, this._tTouchID)
        }
        onMouseDown(t) {
            var e, i;
            h.isInputting && R.stage.focus && R.stage.focus.focus && !R.stage.focus.contains(this._target) && (e = R.stage.focus._tf || R.stage.focus,
            (i = t._tf || t)instanceof h && i.multiline == e.multiline ? e._focusOut() : e.focus = !1),
            Ue.I.onMouseDown(t, this._tTouchID, this._isLeftMouse)
        }
        onMouseUp(t) {
            Ue.I.onMouseUp(t, this._tTouchID, this._isLeftMouse)
        }
        check(t, e, i, s) {
            this._point.setTo(e, i),
            t.fromParentPoint(this._point),
            e = this._point.x,
            i = this._point.y;
            var r = t._style.scrollRect;
            if (r && (this._rect.setTo(r.x, r.y, r.width, r.height),
            !this._rect.contains(e, i)))
                return !1;
            if (!this.disableMouseEvent) {
                if (t.hitTestPrior && !t.mouseThrough && !this.hitTest(t, e, i))
                    return !1;
                for (var a = t._children.length - 1; -1 < a; a--) {
                    var n = t._children[a];
                    if (!n.destroyed && 1 < n._mouseState && n._visible && this.check(n, e, i, s))
                        return !0
                }
                for (a = t._extUIChild.length - 1; 0 <= a; a--) {
                    var h = t._extUIChild[a];
                    if (!h.destroyed && 1 < h._mouseState && h._visible && this.check(h, e, i, s))
                        return !0
                }
            }
            r = !(!t.hitTestPrior || t.mouseThrough || this.disableMouseEvent) || this.hitTest(t, e, i);
            return r ? (this._target = t,
            s.call(this, t),
            this._target == this._hitCaputreSp && (this._hitCaputreSp = !0)) : s === this.onMouseUp && t === this._stage && (this._target = this._stage,
            s.call(this, this._target)),
            r
        }
        hitTest(t, e, i) {
            var s = !1
              , r = (t.scrollRect && (e -= t._style.scrollRect.x,
            i -= t._style.scrollRect.y),
            t._style.hitArea);
            return r && r._hit ? r.contains(e, i) : 0 < t.width && 0 < t.height || t.mouseThrough || r ? (t.mouseThrough ? t.getGraphicBounds() : r || this._rect.setTo(0, 0, t.width, t.height)).contains(e, i) : s
        }
        _checkAllBaseUI(t, e, i) {
            var s;
            return !!this.handleExclusiveCapture(this.mouseX, this.mouseY, i) || (s = this.check(this._stage, this.mouseX, this.mouseY, i),
            this.handleCapture(this.mouseX, this.mouseY, i) || s)
        }
        check3DUI(t, e, i) {
            for (var s = this._stage._3dUI, r = 0, a = !1; r < s.length; r++) {
                var n = s[r];
                !(this._stage._curUIBase = n).destroyed && 1 < n._mouseState && n._visible && (a = a || this.check(n, this.mouseX, this.mouseY, i))
            }
            return this._stage._curUIBase = this._stage,
            a
        }
        handleExclusiveCapture(t, e, i) {
            if (this._captureExlusiveMode && this._captureSp && 0 < this._captureChain.length) {
                var s;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++)
                    (s = this._captureChain[r]).fromParentPoint(this._point);
                return this._target = s,
                i.call(this, s),
                !0
            }
            return !1
        }
        handleCapture(t, e, i) {
            if (!this._hitCaputreSp && this._captureSp && 0 < this._captureChain.length) {
                var s;
                this._point.setTo(t, e);
                for (var r = 0; r < this._captureChain.length; r++)
                    (s = this._captureChain[r]).fromParentPoint(this._point);
                return this._target = s,
                i.call(this, s),
                !0
            }
            return !1
        }
        runEvent(t) {
            switch ("mousemove" !== t.type && (this._prePoint.x = this._prePoint.y = -1e6),
            t.type) {
            case "mousedown":
                this._touchIDs[0] = this._id++,
                Ge._isTouchRespond ? Ge._isTouchRespond = !1 : (this._isLeftMouse = 0 === t.button,
                this.initEvent(t),
                this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                break;
            case "mouseup":
                this._isLeftMouse = 0 === t.button,
                this.initEvent(t),
                this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp);
                break;
            case "mousemove":
                Math.abs(this._prePoint.x - t.clientX) + Math.abs(this._prePoint.y - t.clientY) >= this.mouseMoveAccuracy && (this._prePoint.x = t.clientX,
                this._prePoint.y = t.clientY,
                this.initEvent(t),
                this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                break;
            case "touchstart":
                Ge._isTouchRespond = !0,
                this._isLeftMouse = !0;
                for (var e = t.changedTouches, i = 0, s = e.length; i < s; i++)
                    a = e[i],
                    (Ge.multiTouchEnabled || isNaN(this._curTouchID)) && (this._curTouchID = a.identifier,
                    this._id % 200 == 0 && (this._touchIDs = {}),
                    this._touchIDs[a.identifier] = this._id++,
                    this.initEvent(a, t),
                    this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseDown));
                break;
            case "touchend":
            case "touchcancel":
                Ge._isTouchRespond = !0,
                this._isLeftMouse = !0;
                var r = t.changedTouches;
                for (i = 0,
                s = r.length; i < s; i++) {
                    var a = r[i];
                    !Ge.multiTouchEnabled && a.identifier != this._curTouchID || (this._curTouchID = NaN,
                    this.initEvent(a, t),
                    this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseUp) || this.onMouseUp(null))
                }
                break;
            case "touchmove":
                var n = t.changedTouches;
                for (i = 0,
                s = n.length; i < s; i++)
                    a = n[i],
                    !Ge.multiTouchEnabled && a.identifier != this._curTouchID || (this.initEvent(a, t),
                    this._checkAllBaseUI(this.mouseX, this.mouseY, this.onMouseMove));
                break;
            case "wheel":
            case "mousewheel":
            case "DOMMouseScroll":
                this.checkMouseWheel(t);
                break;
            case "mouseout":
                Ue.I.stageMouseOut();
                break;
            case "mouseover":
                this._stage.event(I.MOUSE_OVER, this._event.setTo(I.MOUSE_OVER, this._stage, this._stage))
            }
        }
        setCapture(t, e=!1) {
            this._captureSp = t,
            this._captureExlusiveMode = e,
            this._captureChain.length = 0,
            this._captureChain.push(t);
            for (var i = t; i != R.stage && i != R.stage._curUIBase && (i = i.parent); )
                this._captureChain.splice(0, 0, i)
        }
        releaseCapture() {
            console.log("release capture"),
            this._captureSp = null
        }
    }
    Ge.instance = new Ge,
    Ge.enabled = !0,
    Ge.multiTouchEnabled = !0,
    Ge._isFirstTouch = !0;
    class ke {
        constructor() {
            this._pool = [],
            this._map = {},
            this._laters = []
        }
        _update() {
            let s = this._laters;
            var t = s.length;
            if (0 < t) {
                for (let e = 0, i = t - 1; e <= i; e++) {
                    let t = s[e];
                    (this._map[t.key] = null) !== t.method && (t.run(),
                    t.clear()),
                    this._pool.push(t),
                    e === i && (i = s.length - 1)
                }
                s.length = 0
            }
        }
        _getHandler(t, e) {
            t = t ? t.$_GID || (t.$_GID = R.Utils.getGID()) : 0,
            e = e.$_TID || (e.$_TID = R.Timer._mid++);
            return this._map[t + "." + e]
        }
        callLater(e, i, s=null) {
            if (null == this._getHandler(e, i)) {
                let t;
                (t = this._pool.length ? this._pool.pop() : new We).caller = e,
                t.method = i,
                t.args = s;
                s = e ? e.$_GID : 0,
                e = i.$_TID;
                t.key = s + "." + e,
                this._map[t.key] = t,
                this._laters.push(t)
            }
        }
        runCallLater(t, e) {
            t = this._getHandler(t, e);
            t && null != t.method && (this._map[t.key] = null,
            t.run(),
            t.clear())
        }
    }
    ke.I = new ke;
    class We {
        clear() {
            this.caller = null,
            this.method = null,
            this.args = null
        }
        run() {
            var t = this.caller;
            if (t && t.destroyed)
                return this.clear();
            var e = this.method
              , i = this.args;
            null != e && (i ? e.apply(t, i) : e.call(t))
        }
    }
    class Ye {
    }
    Ye.createShaderCondition = function(t) {
        return window.Laya._runScript("(function() {return " + t + ";})")
    }
    ,
    Ye.changeWebGLSize = function(t, e) {
        de.onStageResize(t, e)
    }
    ;
    class Ve {
        static setPerformanceDataTool(t) {
            this.performanceTool = t
        }
        static begainSample(t) {
            this.performanceTool && this.performanceTool.enable && this.performanceTool.BegainSample(t)
        }
        static endSample(t) {
            return this.performanceTool && this.performanceTool.enable ? this.performanceTool.EndSample(t) : 0
        }
        static expoertFile(t) {
            if (this.performanceTool)
                return this.performanceTool.enable ? this.performanceTool.exportPerformanceFile() : null
        }
        static showFunSampleFun(t) {
            this.performanceTool.showFunSampleFun(t)
        }
        static set enable(t) {
            this.performanceTool && (this.performanceTool.enable = t)
        }
        static get enable() {
            return !!this.performanceTool && this._enable
        }
        static set enableDataExport(t) {
            this.performanceTool && (this.performanceTool.enableDataExport = t)
        }
        static get enableDataExport() {
            return !!this.performanceTool && this.performanceTool.enableDataExport
        }
    }
    Ve.performanceTool = null,
    Ve._enable = !1,
    Ve.PERFORMANCE_LAYA = "Laya",
    Ve.PERFORMANCE_LAYA_3D = "Laya/3D",
    Ve.PERFORMANCE_LAYA_2D = "Laya/2D",
    Ve.PERFORMANCE_LAYA_3D_PRERENDER = "Laya/3D/PreRender",
    Ve.PERFORMANCE_LAYA_3D_UPDATESCRIPT = "Laya/3D/UpdateScript",
    Ve.PERFORMANCE_LAYA_3D_PHYSICS = "Laya/3D/Physics",
    Ve.PERFORMANCE_LAYA_3D_PHYSICS_SIMULATE = "Laya/3D/Physics/simulate",
    Ve.PERFORMANCE_LAYA_3D_PHYSICS_CHARACTORCOLLISION = "Laya/3D/Physics/updataCharacters&Collisions",
    Ve.PERFORMANCE_LAYA_3D_PHYSICS_EVENTSCRIPTS = "Laya/3D/Physics/eventScripts",
    Ve.PERFORMANCE_LAYA_3D_RENDER = "Laya/3D/Render",
    Ve.PERFORMANCE_LAYA_3D_RENDER_SHADOWMAP = "Laya/3D/Render/ShadowMap",
    Ve.PERFORMANCE_LAYA_3D_RENDER_CLUSTER = "Laya/3D/Render/Cluster",
    Ve.PERFORMANCE_LAYA_3D_RENDER_CULLING = "Laya/3D/Render/Culling",
    Ve.PERFORMANCE_LAYA_3D_RENDER_RENDERDEPTHMDOE = "Laya/3D/Render/RenderDepthMode",
    Ve.PERFORMANCE_LAYA_3D_RENDER_RENDEROPAQUE = "Laya/3D/Render/RenderOpaque",
    Ve.PERFORMANCE_LAYA_3D_RENDER_RENDERCOMMANDBUFFER = "Laya/3D/Render/RenderCommandBuffer",
    Ve.PERFORMANCE_LAYA_3D_RENDER_RENDERTRANSPARENT = "Laya/3D/Render/RenderTransparent",
    Ve.PERFORMANCE_LAYA_3D_RENDER_POSTPROCESS = "Laya/3D/Render/PostProcess",
    window.PerformancePlugin = Ve;
    class N extends Oe {
        constructor() {
            super(),
            this.offset = new q,
            this._frameRate = "fast",
            this.designWidth = 0,
            this.designHeight = 0,
            this.canvasRotation = !1,
            this.canvasDegree = 0,
            this.renderingEnabled = 0,
            this.screenAdaptationEnabled = !0,
            this._canvasTransform = new y,
            this._screenMode = "none",
            this._scaleMode = "noscale",
            this._alignV = "top",
            this._alignH = "left",
            this._bgColor = "black",
            this._mouseMoveTime = 0,
            this._renderCount = 0,
            this._safariOffsetY = 0,
            this._frameStartTime = 0,
            this._previousOrientation = P.window.orientation,
            this._wgColor = [0, 0, 0, 1],
            this._scene3Ds = [],
            this._globalRepaintSet = !1,
            this._globalRepaintGet = !1,
            this._3dUI = [],
            this._curUIBase = null,
            this.useRetinalCanvas = !1,
            super.set_transform(this._createTransform()),
            this.mouseEnabled = !0,
            this.hitTestPrior = !0,
            this.autoSize = !1,
            this._setBit(B.DISPLAYED_INSTAGE, !0),
            this._setBit(B.ACTIVE_INHIERARCHY, !0),
            this._isFocused = !0,
            this._isVisibility = !0,
            this.useRetinalCanvas = n.useRetinalCanvas;
            var t = P.window
              , e = (t.addEventListener("focus", ()=>{
                this._isFocused = !0,
                this.event(I.FOCUS),
                this.event(I.FOCUS_CHANGE)
            }
            ),
            t.addEventListener("blur", ()=>{
                this._isFocused = !1,
                this.event(I.BLUR),
                this.event(I.FOCUS_CHANGE),
                this._isInputting() && (h.inputElement.target.focus = !1)
            }
            ),
            "visibilityState")
              , i = "visibilitychange"
              , s = t.document;
            void 0 !== s.hidden ? (i = "visibilitychange",
            e = "visibilityState") : void 0 !== s.mozHidden ? (i = "mozvisibilitychange",
            e = "mozVisibilityState") : void 0 !== s.msHidden ? (i = "msvisibilitychange",
            e = "msVisibilityState") : void 0 !== s.webkitHidden && (i = "webkitvisibilitychange",
            e = "webkitVisibilityState"),
            t.document.addEventListener(i, ()=>{
                "hidden" == P.document[e] ? (this._isVisibility = !1,
                this._isInputting() && (h.inputElement.target.focus = !1)) : 
                this._isVisibility = !1
                // this.renderingEnabled = this._isVisibility,
                
                this.event(I.VISIBILITY_CHANGE)
                console.log('Check document: ',s.hidden)
            }
            ),
            t.document.addEventListener("resume", ()=>{
                this.renderingEnabled || ("hidden" == P.document[e] ? (this._isVisibility = !1,
                this._isInputting() && (h.inputElement.target.focus = !1)) : this._isVisibility = !0,
                // this.renderingEnabled = this._isVisibility,
                this.event(I.VISIBILITY_CHANGE))
                this.renderingEnabled = false;
                // setTimeout(() => {
                //     this.renderingEnabled = false
                // }, 30 * 1000);
            }
            ),
            t.addEventListener("resize", ()=>{
                var t = P.window.orientation;
                null != t && t != this._previousOrientation && this._isInputting() && (h.inputElement.target.focus = !1),
                this._previousOrientation = t,
                this._isInputting() || (P.onSafari && (this._safariOffsetY = (P.window.__innerHeight || P.document.body.clientHeight || P.document.documentElement.clientHeight) - P.window.innerHeight),
                this._resetCanvas())
            }
            ),
            t.addEventListener("orientationchange", t=>{
                this._resetCanvas()
            }
            ),
            this.on(I.MOUSE_MOVE, this, this._onmouseMove),
            P.onMobile && this.on(I.MOUSE_DOWN, this, this._onmouseMove)
        }
        _isInputting() {
            return P.onMobile && h.isInputting
        }
        set width(t) {
            this.designWidth = t,
            super.set_width(t),
            R.systemTimer.callLater(this, this._changeCanvasSize)
        }
        get width() {
            return super.get_width()
        }
        set height(t) {
            this.designHeight = t,
            super.set_height(t),
            R.systemTimer.callLater(this, this._changeCanvasSize)
        }
        get height() {
            return super.get_height()
        }
        set transform(t) {
            super.set_transform(t)
        }
        get transform() {
            return this._tfChanged && this._adjustTransform(),
            this._transform = this._transform || this._createTransform()
        }
        get isFocused() {
            return this._isFocused
        }
        get isVisibility() {
            return this._isVisibility
        }
        _changeCanvasSize() {
            this.setScreenSize(P.clientWidth * P.pixelRatio, P.clientHeight * P.pixelRatio)
        }
        _resetCanvas() {
            this.screenAdaptationEnabled && this._changeCanvasSize()
        }
        setScreenSize(t, e) {
            var i = !1
              , s = (this._screenMode !== N.SCREEN_NONE && (i = (t / e < 1 ? N.SCREEN_VERTICAL : N.SCREEN_HORIZONTAL) !== this._screenMode) && (s = e,
            e = t,
            t = s),
            this.canvasRotation = i,
            f._mainCanvas)
              , r = s.source.style
              , a = this._canvasTransform.identity()
              , n = this._scaleMode
              , h = t / this.designWidth
              , o = e / this.designHeight
              , l = this.useRetinalCanvas ? t : this.designWidth
              , _ = this.useRetinalCanvas ? e : this.designHeight
              , u = t
              , c = e
              , d = P.pixelRatio;
            switch (this._width = this.designWidth,
            this._height = this.designHeight,
            n) {
            case N.SCALE_NOSCALE:
                h = o = 1,
                u = this.designWidth,
                c = this.designHeight;
                break;
            case N.SCALE_SHOWALL:
                h = o = Math.min(h, o),
                l = u = Math.round(this.designWidth * h),
                _ = c = Math.round(this.designHeight * o);
                break;
            case N.SCALE_NOBORDER:
                h = o = Math.max(h, o),
                u = Math.round(this.designWidth * h),
                c = Math.round(this.designHeight * o);
                break;
            case N.SCALE_FULL:
                h = o = 1,
                this._width = l = t,
                this._height = _ = e;
                break;
            case N.SCALE_FIXED_WIDTH:
                o = h,
                this._height = _ = Math.round(e / h);
                break;
            case N.SCALE_FIXED_HEIGHT:
                h = o,
                this._width = l = Math.round(t / o);
                break;
            case N.SCALE_FIXED_AUTO:
                t / e < this.designWidth / this.designHeight ? (o = h,
                this._height = _ = Math.round(e / h)) : (h = o,
                this._width = l = Math.round(t / o))
            }
            this.useRetinalCanvas && (u = l = t,
            c = _ = e),
            h *= this.scaleX,
            o *= this.scaleY,
            1 === h && 1 === o ? this.transform.identity() : (this.transform.a = this._formatData(h / (u / l)),
            this.transform.d = this._formatData(o / (c / _))),
            s.size(l, _),
            Ye.changeWebGLSize(l, _),
            a.scale(u / l / d, c / _ / d),
            this._alignH === N.ALIGN_LEFT ? this.offset.x = 0 : this._alignH === N.ALIGN_RIGHT ? this.offset.x = t - u : this.offset.x = .5 * (t - u) / d,
            this._alignV === N.ALIGN_TOP ? this.offset.y = 0 : this._alignV === N.ALIGN_BOTTOM ? this.offset.y = e - c : this.offset.y = .5 * (e - c) / d,
            this.offset.x = Math.round(this.offset.x),
            this.offset.y = Math.round(this.offset.y),
            a.translate(this.offset.x, this.offset.y),
            this._safariOffsetY && a.translate(0, this._safariOffsetY),
            this.canvasDegree = 0,
            i && (this._screenMode === N.SCREEN_HORIZONTAL ? (a.rotate(Math.PI / 2),
            a.translate(e / d, 0),
            this.canvasDegree = 90) : (a.rotate(-Math.PI / 2),
            a.translate(0, t / d),
            this.canvasDegree = -90)),
            a.a = this._formatData(a.a),
            a.d = this._formatData(a.d),
            a.tx = this._formatData(a.tx),
            a.ty = this._formatData(a.ty),
            super.set_transform(this.transform),
            r.transformOrigin = r.webkitTransformOrigin = r.msTransformOrigin = r.mozTransformOrigin = r.oTransformOrigin = "0px 0px 0px",
            r.transform = r.webkitTransform = r.msTransform = r.mozTransform = r.oTransform = "matrix(" + a.toString() + ")",
            r.width = l,
            r.height = _,
            this._safariOffsetY && a.translate(0, -this._safariOffsetY),
            a.translate(parseInt(r.left) || 0, parseInt(r.top) || 0),
            this.visible = !0,
            this._repaint |= x.REPAINT_CACHE,
            this.event(I.RESIZE)
        }
        _formatData(t) {
            return Math.abs(t) < 1e-6 ? 0 : Math.abs(1 - t) < .001 ? 0 < t ? 1 : -1 : t
        }
        get scaleMode() {
            return this._scaleMode
        }
        set scaleMode(t) {
            this._scaleMode = t,
            R.systemTimer.callLater(this, this._changeCanvasSize)
        }
        get alignH() {
            return this._alignH
        }
        set alignH(t) {
            this._alignH = t,
            R.systemTimer.callLater(this, this._changeCanvasSize)
        }
        get alignV() {
            return this._alignV
        }
        set alignV(t) {
            this._alignV = t,
            R.systemTimer.callLater(this, this._changeCanvasSize)
        }
        get bgColor() {
            return this._bgColor
        }
        set bgColor(t) {
            this._bgColor = t,
            this._wgColor = t ? gt.create(t).arrColor : null,
            f.canvas.style.background = t || "none"
        }
        get mouseX() {
            return Math.round(Ge.instance.mouseX / this.clientScaleX)
        }
        get mouseY() {
            return Math.round(Ge.instance.mouseY / this.clientScaleY)
        }
        getMousePoint() {
            return q.TEMP.setTo(this.mouseX, this.mouseY)
        }
        get clientScaleX() {
            return this._transform ? this._transform.getScaleX() : 1
        }
        get clientScaleY() {
            return this._transform ? this._transform.getScaleY() : 1
        }
        get screenMode() {
            return this._screenMode
        }
        set screenMode(t) {
            this._screenMode = t
        }
        repaint(t=x.REPAINT_CACHE) {
            this._repaint |= t
        }
        parentRepaint(t=x.REPAINT_CACHE) {}
        _loop() {
            return this._globalRepaintGet = this._globalRepaintSet,
            this._globalRepaintSet = !1,
            this.render(f._context, 0, 0),
            !0
        }
        getFrameTm() {
            return this._frameStartTime
        }
        _onmouseMove(t) {
            this._mouseMoveTime = P.now()
        }
        getTimeFromFrameStart() {
            return P.now() - this._frameStartTime
        }
        set visible(t) {
            //Fix me 6
            // t = true
            this.visible !== t && (super.set_visible(t),
            f._mainCanvas.source.style.visibility = t ? "visible" : "hidden")
        }
        get visible() {
            return super.visible
        }
        render(t, e, i) {
            if (window.conch)
                this.renderToNative(t, e, i);
            else {
                if (this._frameRate === N.FRAME_SLEEP) {
                    var s = P.now();
                    if (!(1e3 <= s - this._frameStartTime))
                        return;
                    this._frameStartTime = s
                } else {
                    if (!this._visible)
                        return this._renderCount++,
                        void (this._renderCount % 5 == 0 && (ke.I._update(),
                        g.loopCount++,
                        Nt.loopCount = g.loopCount,
                        this._updateTimers()));
                    this._frameStartTime = P.now(),
                    Nt.loopStTm = this._frameStartTime
                }
                this._renderCount++;
                var s = (this._frameRate === N.FRAME_MOUSE ? this._frameStartTime - this._mouseMoveTime < 2e3 ? N.FRAME_FAST : N.FRAME_SLOW : this._frameRate) !== N.FRAME_SLOW
                  , r = this._renderCount % 2 == 0;
                if (g.renderSlow = !s,
                s || r) {
                    if (ke.I._update(),
                    g.loopCount++,
                    Nt.loopCount = g.loopCount,
                    Ve.begainSample(Ve.PERFORMANCE_LAYA),
                    this.renderingEnabled) {
                        for (var a = 0, n = this._scene3Ds.length; a < n; a++)
                            this._scene3Ds[a]._update();
                        t.clear(),
                        super.render(t, e, i),
                        g._StatRender.renderNotCanvas(t, e, i)
                    }
                    this.renderingEnabled && (N.clear(this._bgColor),
                    t.flush(),
                    be.instance && be.getInstance().endDispose()),
                    this._updateTimers(),
                    Ve.endSample(Ve.PERFORMANCE_LAYA)
                }
            }
        }
        renderToNative(t, e, i) {
            if (this._renderCount++,
            this._visible) {
                if (this._frameStartTime = P.now(),
                ke.I._update(),
                g.loopCount++,
                Nt.loopCount = g.loopCount,
                this.renderingEnabled) {
                    for (var s = 0, r = this._scene3Ds.length; s < r; s++)
                        this._scene3Ds[s]._update();
                    t.clear(),
                    super.render(t, e, i),
                    g._StatRender.renderNotCanvas(t, e, i)
                }
                this.renderingEnabled && (N.clear(this._bgColor),
                t.flush(),
                be.instance && be.getInstance().endDispose()),
                this._updateTimers()
            } else
                this._renderCount % 5 == 0 && (ke.I._update(),
                g.loopCount++,
                Nt.loopCount = g.loopCount,
                this._updateTimers())
        }
        _updateTimers() {
            R.systemTimer._update(),
            R.startTimer._update(),
            R.physicsTimer._update(),
            R.updateTimer._update(),
            R.lateTimer._update(),
            R.timer._update()
        }
        set fullScreenEnabled(t) {
            var e = P.document
              , i = f.canvas;
            t ? (i.addEventListener("mousedown", this._requestFullscreen),
            i.addEventListener("touchstart", this._requestFullscreen),
            e.addEventListener("fullscreenchange", this._fullScreenChanged),
            e.addEventListener("mozfullscreenchange", this._fullScreenChanged),
            e.addEventListener("webkitfullscreenchange", this._fullScreenChanged),
            e.addEventListener("msfullscreenchange", this._fullScreenChanged)) : (i.removeEventListener("mousedown", this._requestFullscreen),
            i.removeEventListener("touchstart", this._requestFullscreen),
            e.removeEventListener("fullscreenchange", this._fullScreenChanged),
            e.removeEventListener("mozfullscreenchange", this._fullScreenChanged),
            e.removeEventListener("webkitfullscreenchange", this._fullScreenChanged),
            e.removeEventListener("msfullscreenchange", this._fullScreenChanged))
        }
        get frameRate() {
            return R.Render.isConchApp ? this._frameRateNative : this._frameRate
        }
        set frameRate(t) {
            if (R.Render.isConchApp) {
                var e = window.conch;
                switch (t) {
                case N.FRAME_FAST:
                    e.config.setLimitFPS(60);
                    break;
                case N.FRAME_MOUSE:
                    e.config.setMouseFrame(2e3);
                    break;
                case N.FRAME_SLOW:
                    e.config.setSlowFrame(!0);
                    break;
                case N.FRAME_SLEEP:
                    e.config.setLimitFPS(1)
                }
                this._frameRateNative = t
            } else
                this._frameRate = t
        }
        _requestFullscreen() {
            var t = P.document.documentElement;
            t.requestFullscreen ? t.requestFullscreen() : t.mozRequestFullScreen ? t.mozRequestFullScreen() : t.webkitRequestFullscreen ? t.webkitRequestFullscreen() : t.msRequestFullscreen && t.msRequestFullscreen()
        }
        _fullScreenChanged() {
            R.stage.event(I.FULL_SCREEN_CHANGE)
        }
        exitFullscreen() {
            var t = P.document;
            t.exitFullscreen ? t.exitFullscreen() : t.mozCancelFullScreen ? t.mozCancelFullScreen() : t.webkitExitFullscreen && t.webkitExitFullscreen()
        }
        isGlobalRepaint() {
            return this._globalRepaintGet
        }
        setGlobalRepaint() {
            this._globalRepaintSet = !0
        }
        add3DUI(t) {
            t = t.rootView;
            0 <= this._3dUI.indexOf(t) || this._3dUI.push(t)
        }
        remove3DUI(t) {
            t = t.rootView,
            t = this._3dUI.indexOf(t);
            return 0 <= t && (this._3dUI.splice(t, 1),
            !0)
        }
    }
    N.SCALE_NOSCALE = "noscale",
    N.SCALE_EXACTFIT = "exactfit",
    N.SCALE_SHOWALL = "showall",
    N.SCALE_NOBORDER = "noborder",
    N.SCALE_FULL = "full",
    N.SCALE_FIXED_WIDTH = "fixedwidth",
    N.SCALE_FIXED_HEIGHT = "fixedheight",
    N.SCALE_FIXED_AUTO = "fixedauto",
    N.ALIGN_LEFT = "left",
    N.ALIGN_RIGHT = "right",
    N.ALIGN_CENTER = "center",
    N.ALIGN_TOP = "top",
    N.ALIGN_MIDDLE = "middle",
    N.ALIGN_BOTTOM = "bottom",
    N.SCREEN_NONE = "none",
    N.SCREEN_HORIZONTAL = "horizontal",
    N.SCREEN_VERTICAL = "vertical",
    N.FRAME_FAST = "fast",
    N.FRAME_SLOW = "slow",
    N.FRAME_MOUSE = "mouse",
    N.FRAME_SLEEP = "sleep",
    N.clear = function(t) {
        L.set2DRenderConfig();
        var e = d.instance
          , e = (l.worldScissorTest && e.disable(e.SCISSOR_TEST),
        f.context)
          , t = 0 == e._submits._length || n.preserveDrawingBuffer ? gt.create(t).arrColor : R.stage._wgColor;
        t ? e.clearBG(t[0], t[1], t[2], t[3]) : e.clearBG(0, 0, 0, 0),
        l.clear()
    }
    ,
    F.regClass("laya.display.Stage", N),
    F.regClass("Laya.Stage", N);
    class Xe {
        static __init__() {
            Xe._addEvent("keydown"),
            Xe._addEvent("keypress"),
            Xe._addEvent("keyup")
        }
        static _addEvent(e) {
            R.Browser.document.addEventListener(e, function(t) {
                Xe._dispatch(t, e)
            }, !0)
        }
        static _dispatch(t, e) {
            if (Xe.enabled) {
                Xe._event._stoped = !1,
                Xe._event.nativeEvent = t,
                Xe._event.keyCode = t.keyCode || t.which || t.charCode,
                "keydown" === e ? Xe._pressKeys[Xe._event.keyCode] = !0 : "keyup" === e && (Xe._pressKeys[Xe._event.keyCode] = null);
                for (var i = R.stage.focus && null != R.stage.focus.event && R.stage.focus.displayedInStage ? R.stage.focus : R.stage, s = i; s; )
                    s.event(e, Xe._event.setTo(e, s, i)),
                    s = s.parent
            }
        }
        static hasKeyDown(t) {
            return Xe._pressKeys[t]
        }
    }
    Xe._pressKeys = {},
    Xe.enabled = !0,
    Xe._event = new I;
    class He extends i {
        constructor() {
            super(...arguments),
            this.isStopped = !1
        }
        set volume(t) {}
        get volume() {
            return 1
        }
        get position() {
            return 0
        }
        get duration() {
            return 0
        }
        play() {}
        stop() {
            this.completeHandler && this.completeHandler.runWith(!1)
        }
        pause() {}
        resume() {}
        __runComplete(t) {
            t && t.runWith(!0)
        }
    }
    class ze extends He {
        constructor(t) {
            super(),
            this._audio = null,
            this._onEnd = this.__onEnd.bind(this),
            this._resumePlay = this.__resumePlay.bind(this),
            t.addEventListener("ended", this._onEnd),
            this._audio = t
        }
        __onEnd(t) {
            if (1 == this.loops)
                return this.completeHandler && (R.systemTimer.once(10, this, this.__runComplete, [this.completeHandler], !1),
                this.completeHandler = null),
                this.stop(),
                void this.event(I.COMPLETE);
            0 < this.loops && this.loops--,
            this.startTime = 0,
            this.play()
        }
        __resumePlay() {
            if (this._audio && this._audio.removeEventListener("canplay", this._resumePlay),
            !this.isStopped)
                try {
                    this._audio.currentTime = this.startTime,
                    P.container.appendChild(this._audio),
                    this._audio.play()
                } catch (t) {
                    this.event(I.ERROR)
                }
        }
        play() {
            this.isStopped = !1;
            try {
                this._audio.playbackRate = R.SoundManager.playbackRate,
                this._audio.currentTime = this.startTime
            } catch (t) {
                return void this._audio.addEventListener("canplay", this._resumePlay)
            }
            R.SoundManager.addChannel(this),
            P.container.appendChild(this._audio),
            "play"in this._audio && this._audio.play()
        }
        get position() {
            return this._audio ? this._audio.currentTime : 0
        }
        get duration() {
            return this._audio ? this._audio.duration : 0
        }
        stop() {
            super.stop(),
            this.isStopped = !0,
            R.SoundManager.removeChannel(this),
            this.completeHandler = null,
            this._audio && ("pause"in this._audio && R.Render.isConchApp && this._audio.stop(),
            this._audio.pause(),
            this._audio.removeEventListener("ended", this._onEnd),
            this._audio.removeEventListener("canplay", this._resumePlay),
            R.Browser.onIE || this._audio != R.AudioSound._musicAudio && R.Pool.recover("audio:" + this.url, this._audio),
            P.removeElement(this._audio),
            this._audio = null,
            R.SoundManager.autoReleaseSound && R.SoundManager.disposeSoundLater(this.url))
        }
        pause() {
            this.isStopped = !0,
            R.SoundManager.removeChannel(this),
            this._audio && ("pause"in this._audio && this._audio.pause(),
            R.SoundManager.autoReleaseSound && R.SoundManager.disposeSoundLater(this.url))
        }
        resume() {
            var t = this._audio;
            t && (this.isStopped = !1,
            0 == t.readyState && (t.src = this.url,
            t.addEventListener("canplay", this._resumePlay),
            t.load && t.load()),
            R.SoundManager.addChannel(this),
            "play"in t && t.play())
        }
        set volume(t) {
            this._audio && (this._audio.volume = t)
        }
        get volume() {
            return this._audio ? this._audio.volume : 1
        }
    }
    class Ke extends i {
        constructor() {
            super(...arguments),
            this.loaded = !1
        }
        dispose() {
            var t = Ke._audioCache[this.url];
            p.clearBySign("audio:" + this.url),
            t && (f.isConchApp || (t.src = ""),
            delete Ke._audioCache[this.url])
        }
        static _initMusicAudio() {
            Ke._musicAudio || (Ke._musicAudio || (Ke._musicAudio = P.createElement("audio")),
            f.isConchApp || P.document.addEventListener("mousedown", Ke._makeMusicOK))
        }
        static _makeMusicOK() {
            P.document.removeEventListener("mousedown", Ke._makeMusicOK),
            Ke._musicAudio.src ? Ke._musicAudio.play() : (Ke._musicAudio.src = "",
            Ke._musicAudio.load())
        }
        load(t) {
            var e, i;
            function s() {
                a(),
                i.loaded = !0,
                i.event(I.COMPLETE)
            }
            function r() {
                e.load = null,
                a(),
                i.event(I.ERROR)
            }
            function a() {
                e.removeEventListener("canplaythrough", s),
                e.removeEventListener("error", r)
            }
            t = C.formatURL(t),
            (this.url = t) == R.SoundManager._bgMusic ? (Ke._initMusicAudio(),
            (e = Ke._musicAudio).src != t && (delete Ke._audioCache[e.src],
            e = null)) : e = Ke._audioCache[t],
            e && 2 <= e.readyState ? this.event(I.COMPLETE) : (e || (e = t == R.SoundManager._bgMusic ? (Ke._initMusicAudio(),
            Ke._musicAudio) : P.createElement("audio"),
            (Ke._audioCache[t] = e).src = t),
            e.addEventListener("canplaythrough", s),
            e.addEventListener("error", r),
            ((i = this).audio = e).load ? e.load() : r())
        }
        play(t=0, e=0) {
            if (!this.url)
                return null;
            var i;
            if (this.url == R.SoundManager._bgMusic ? "" != (s = Ke._musicAudio).src && s.src != this.url && (delete Ke._audioCache[s.src],
            Ke._audioCache[this.url] = s) : s = Ke._audioCache[this.url],
            !s)
                return null;
            i = p.getItem("audio:" + this.url),
            f.isConchApp ? i || ((i = P.createElement("audio")).src = this.url) : this.url == R.SoundManager._bgMusic ? (Ke._initMusicAudio(),
            (i = Ke._musicAudio).src = this.url) : i = i || s.cloneNode(!0);
            var s = new ze(i);
            return s.url = this.url,
            s.loops = e,
            s.startTime = t,
            s.play(),
            R.SoundManager.addChannel(s),
            s
        }
        get duration() {
            var t = Ke._audioCache[this.url];
            return t ? t.duration : 0
        }
    }
    Ke._audioCache = {};
    class je extends He {
        constructor() {
            super(),
            this.bufferSource = null,
            this._currentTime = 0,
            this._volume = 1,
            this._startTime = 0,
            this._pauseTime = 0,
            this.context = R.WebAudioSound.ctx,
            this._onPlayEnd = S.bind(this.__onPlayEnd, this),
            this.context.createGain ? this.gain = this.context.createGain() : this.gain = this.context.createGainNode()
        }
        play() {
            if (R.SoundManager.addChannel(this),
            this.isStopped = !1,
            this._clearBufferSource(),
            this.audioBuffer) {
                if (this.startTime >= this.duration)
                    return this.stop();
                var t = this.context
                  , e = this.gain
                  , i = t.createBufferSource();
                (this.bufferSource = i).buffer = this.audioBuffer,
                i.connect(e),
                e && e.disconnect(),
                e.connect(t.destination),
                i.onended = this._onPlayEnd,
                this._startTime = P.now(),
                this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(this._volume, this.context.currentTime, je.SetTargetDelay) : this.gain.gain.value = this._volume,
                0 == this.loops && (i.loop = !0),
                i.playbackRate.setTargetAtTime ? i.playbackRate.setTargetAtTime(R.SoundManager.playbackRate, this.context.currentTime, je.SetTargetDelay) : i.playbackRate.value = R.SoundManager.playbackRate,
                i.start(0, this.startTime),
                this._currentTime = 0
            }
        }
        __onPlayEnd() {
            if (1 == this.loops)
                return this.completeHandler && (R.timer.once(10, this, this.__runComplete, [this.completeHandler], !1),
                this.completeHandler = null),
                this.stop(),
                void this.event(I.COMPLETE);
            0 < this.loops && this.loops--,
            this.startTime = 0,
            this.play()
        }
        get position() {
            return this.bufferSource ? (P.now() - this._startTime) / 1e3 + this.startTime : 0
        }
        get duration() {
            return this.audioBuffer ? this.audioBuffer.duration : 0
        }
        _clearBufferSource() {
            var t;
            this.bufferSource && ((t = this.bufferSource).stop ? t.stop(0) : t.noteOff(0),
            t.disconnect(0),
            t.onended = null,
            je._tryCleanFailed || this._tryClearBuffer(t),
            this.bufferSource = null)
        }
        _tryClearBuffer(t) {
            try {
                t.buffer = null
            } catch (t) {
                je._tryCleanFailed = !0
            }
        }
        stop() {
            super.stop(),
            this._clearBufferSource(),
            this.audioBuffer = null,
            this.gain && this.gain.disconnect(),
            this.isStopped = !0,
            R.SoundManager.removeChannel(this),
            this.completeHandler = null,
            R.SoundManager.autoReleaseSound && R.SoundManager.disposeSoundLater(this.url)
        }
        pause() {
            this.isStopped || (this._pauseTime = this.position),
            this._clearBufferSource(),
            this.gain && this.gain.disconnect(),
            this.isStopped = !0,
            R.SoundManager.removeChannel(this),
            R.SoundManager.autoReleaseSound && R.SoundManager.disposeSoundLater(this.url)
        }
        resume() {
            this.startTime = this._pauseTime,
            this.play()
        }
        set volume(t) {
            this._volume = t,
            this.isStopped || (this.gain.gain.setTargetAtTime ? this.gain.gain.setTargetAtTime(t, this.context.currentTime, je.SetTargetDelay) : this.gain.gain.value = t)
        }
        get volume() {
            return this._volume
        }
    }
    je._tryCleanFailed = !1,
    je.SetTargetDelay = .001;
    class s extends i {
        constructor() {
            super(...arguments),
            this.loaded = !1,
            this._disposed = !1
        }
        static decode() {
            s.buffs.length <= 0 || s.isDecoding || (s.isDecoding = !0,
            s.tInfo = s.buffs.shift(),
            s.ctx.decodeAudioData(s.tInfo.buffer, s._done, s._fail))
        }
        static _done(t) {
            s.e.event("loaded:" + s.tInfo.url, t),
            s.isDecoding = !1,
            s.decode()
        }
        static _fail() {
            s.e.event("err:" + s.tInfo.url, null),
            s.isDecoding = !1,
            s.decode()
        }
        static _playEmptySound() {
            var t;
            null != s.ctx && ((t = s.ctx.createBufferSource()).buffer = s._miniBuffer,
            t.connect(s.ctx.destination),
            t.start(0, 0, 0))
        }
        static _unlock() {
            s._unlocked || (s._playEmptySound(),
            "running" == s.ctx.state && (window.document.removeEventListener("mousedown", s._unlock, !0),
            window.document.removeEventListener("touchend", s._unlock, !0),
            window.document.removeEventListener("touchstart", s._unlock, !0),
            s._unlocked = !0))
        }
        static initWebAudio() {
            "running" != s.ctx.state && (s._unlock(),
            window.document.addEventListener("mousedown", s._unlock, !0),
            window.document.addEventListener("touchend", s._unlock, !0),
            window.document.addEventListener("touchstart", s._unlock, !0))
        }
        load(t) {
            var e, i = this;
            t = C.formatURL(t),
            this.url = t,
            this.audioBuffer = s._dataCache[t],
            this.audioBuffer ? this._loaded(this.audioBuffer) : (s.e.on("loaded:" + t, this, this._loaded),
            s.e.on("err:" + t, this, this._err),
            s.__loadingSound[t] || (s.__loadingSound[t] = !0,
            (e = new XMLHttpRequest).open("GET", t, !0),
            e.responseType = "arraybuffer",
            e.onload = function() {
                i._disposed ? i._removeLoadEvents() : (i.data = e.response,
                s.buffs.push({
                    buffer: i.data,
                    url: i.url
                }),
                s.decode())
            }
            ,
            e.onerror = function(t) {
                i._err()
            }
            ,
            e.send()))
        }
        _err() {
            this._removeLoadEvents(),
            s.__loadingSound[this.url] = !1,
            this.event(I.ERROR)
        }
        _loaded(t) {
            this._removeLoadEvents(),
            this._disposed || (this.audioBuffer = t,
            s._dataCache[this.url] = this.audioBuffer,
            this.loaded = !0,
            this.event(I.COMPLETE))
        }
        _removeLoadEvents() {
            s.e.off("loaded:" + this.url, this, this._loaded),
            s.e.off("err:" + this.url, this, this._err)
        }
        __playAfterLoaded() {
            if (this.__toPlays) {
                for (var t, e = this.__toPlays, i = e.length, s = 0; s < i; s++)
                    (t = e[s])[2] && !t[2].isStopped && this.play(t[0], t[1], t[2]);
                this.__toPlays.length = 0
            }
        }
        play(t=0, e=0, i=null) {
            return i = i || new je,
            this.audioBuffer || this.url && (this.__toPlays || (this.__toPlays = []),
            this.__toPlays.push([t, e, i]),
            this.once(I.COMPLETE, this, this.__playAfterLoaded),
            this.load(this.url)),
            i.url = this.url,
            i.loops = e,
            i.audioBuffer = this.audioBuffer,
            i.startTime = t,
            i.play(),
            R.SoundManager.addChannel(i),
            i
        }
        get duration() {
            return this.audioBuffer ? this.audioBuffer.duration : 0
        }
        dispose() {
            this._disposed = !0,
            delete s._dataCache[this.url],
            delete s.__loadingSound[this.url],
            this.audioBuffer = null,
            this.data = null,
            this.__toPlays = []
        }
    }
    s._dataCache = {},
    s.webAudioEnabled = window.AudioContext || window.webkitAudioContext || window.mozAudioContext,
    s.ctx = s.webAudioEnabled ? new (window.AudioContext || window.webkitAudioContext || window.mozAudioContext) : void 0,
    s.buffs = [],
    s.isDecoding = !1,
    s._miniBuffer = s.ctx ? s.ctx.createBuffer(1, 1, 22050) : void 0,
    s.e = new i,
    s._unlocked = !1,
    s.__loadingSound = {};
    class o {
        static __init__() {
            var t = R.Browser.window
              , t = !!(t.AudioContext || t.webkitAudioContext || t.mozAudioContext);
            return t && s.initWebAudio(),
            o._soundClass = t ? s : Ke,
            P.onTBMiniGame || Ke._initMusicAudio(),
            o._musicClass = Ke,
            t
        }
        static addChannel(t) {
            0 <= o._channels.indexOf(t) || o._channels.push(t)
        }
        static removeChannel(t) {
            for (var e = o._channels.length - 1; 0 <= e; e--)
                o._channels[e] == t && o._channels.splice(e, 1)
        }
        static disposeSoundLater(t) {
            o._lastSoundUsedTimeDic[t] = R.Browser.now(),
            o._isCheckingDispose || (o._isCheckingDispose = !0,
            R.timer.loop(5e3, null, o._checkDisposeSound))
        }
        static _checkDisposeSound() {
            var t, e = R.Browser.now(), i = !1;
            for (t in o._lastSoundUsedTimeDic)
                3e4 < e - o._lastSoundUsedTimeDic[t] ? (delete o._lastSoundUsedTimeDic[t],
                o.disposeSoundIfNotUsed(t)) : i = !0;
            i || (o._isCheckingDispose = !1,
            R.timer.clear(null, o._checkDisposeSound))
        }
        static disposeSoundIfNotUsed(t) {
            for (var e = o._channels.length - 1; 0 <= e; e--)
                if (o._channels[e].url == t)
                    return;
            o.destroySound(t)
        }
        static set autoStopMusic(t) {
            R.stage.off(I.BLUR, null, o._stageOnBlur),
            R.stage.off(I.FOCUS, null, o._stageOnFocus)
            R.stage.off(I.VISIBILITY_CHANGE, null, o._visibilityChange)
            // (o._autoStopMusic = t) && (R.stage.on(I.BLUR, null, o._stageOnBlur),
            // R.stage.on(I.FOCUS, null, o._stageOnFocus),
            // R.stage.on(I.VISIBILITY_CHANGE, null, o._visibilityChange))
        }
        static get autoStopMusic() {
            return o._autoStopMusic
        }
        static _visibilityChange() {
            R.stage.isVisibility ? o._stageOnFocus() : o._stageOnBlur()
        }
        static _stageOnBlur() {
            o._isActive = !1,
            o._musicChannel && !o._musicChannel.isStopped && (o._blurPaused = !0,
            o._musicChannel.pause()),
            o.stopAllSound(),
            R.stage.once(I.MOUSE_DOWN, null, o._stageOnFocus)
        }
        static _recoverWebAudio() {
            s.ctx && "running" != s.ctx.state && s.ctx.resume && s.ctx.resume()
        }
        static _stageOnFocus() {
            o._isActive = !0,
            o._recoverWebAudio(),
            R.stage.off(I.MOUSE_DOWN, null, o._stageOnFocus),
            o._blurPaused && o._musicChannel && o._musicChannel.isStopped && (o._blurPaused = !1,
            o._musicChannel.resume())
        }
        static set muted(t) {
            t != o._muted && (t && o.stopAllSound(),
            o.musicMuted = t,
            o._muted = t)
        }
        static get muted() {
            return o._muted
        }
        static set soundMuted(t) {
            o._soundMuted = t
        }
        static get soundMuted() {
            return o._soundMuted
        }
        static set musicMuted(t) {
            t != o._musicMuted && (t ? (o._bgMusic && o._musicChannel && !o._musicChannel.isStopped ? R.Render.isConchApp ? o._musicChannel._audio && (o._musicChannel._audio.muted = !0) : o._musicChannel.pause() : o._musicChannel = null,
            o._musicMuted = t) : (o._musicMuted = t,
            o._bgMusic && o._musicChannel && (R.Render.isConchApp ? o._musicChannel._audio && (o._musicChannel._audio.muted = !1) : o._musicChannel.resume())))
        }
        static get musicMuted() {
            return o._musicMuted
        }
        static get useAudioMusic() {
            return o._useAudioMusic
        }
        static set useAudioMusic(t) {
            o._useAudioMusic = t,
            o._musicClass = t ? Ke : null
        }
        static playSound(t, e=1, i=null, s=null, r=0) {
            if (!o._isActive || !t)
                return null;
            if (o._muted)
                return null;
            if (o._recoverWebAudio(),
            (t = C.formatURL(t)) == o._bgMusic) {
                if (o._musicMuted)
                    return null
            } else {
                if (R.Render.isConchApp) {
                    var a = S.getFileExtension(t);
                    if ("wav" != a && "ogg" != a)
                        return alert("The sound only supports wav or ogg format,for optimal performance reason,please refer to the official website document."),
                        null
                }
                if (o._soundMuted)
                    return null
            }
            var n;
            return P._isMiniGame || (n = R.loader.getRes(t)),
            s = s || o._soundClass,
            n || ((n = new s).load(t),
            P._isMiniGame || R.Loader.cacheRes(t, n)),
            (a = n.play(r, e)) ? (a.url = t,
            a.volume = t == o._bgMusic ? o.musicVolume : o.soundVolume,
            a.completeHandler = i,
            a) : null
        }
        static destroySound(t) {
            var e = R.loader.getRes(t);
            e && (R.Loader.clearRes(t),
            e.dispose())
        }
        static playMusic(t, e=0, i=null, s=0) {
            return t = C.formatURL(t),
            o._bgMusic = t,
            o._musicChannel && o._musicChannel.stop(),
            o._musicChannel = o.playSound(t, e, i, o._musicClass, s)
        }
        static stopSound(t) {
            var e, i;
            for (t = C.formatURL(t),
            e = o._channels.length - 1; 0 <= e; e--)
                (i = o._channels[e]).url == t && i.stop()
        }
        static stopAll() {
            var t;
            for (o._bgMusic = null,
            t = o._channels.length - 1; 0 <= t; t--)
                o._channels[t].stop()
        }
        static stopAllSound() {
            for (var t, e = o._channels.length - 1; 0 <= e; e--)
                (t = o._channels[e]).url != o._bgMusic && t.stop()
        }
        static stopMusic() {
            o._musicChannel && o._musicChannel.stop(),
            o._bgMusic = null
        }
        static setSoundVolume(t, e=null) {
            var i, s;
            if (e)
                e = C.formatURL(e),
                o._setVolume(e, t);
            else
                for (o.soundVolume = t,
                i = o._channels.length - 1; 0 <= i; i--)
                    (s = o._channels[i]).url != o._bgMusic && (s.volume = t)
        }
        static setMusicVolume(t) {
            o.musicVolume = t,
            o._setVolume(o._bgMusic, t)
        }
        static _setVolume(t, e) {
            var i, s;
            for (t = C.formatURL(t),
            i = o._channels.length - 1; 0 <= i; i--)
                (s = o._channels[i]).url == t && (s.volume = e)
        }
    }
    o.musicVolume = 1,
    o.soundVolume = 1,
    o.playbackRate = 1,
    o._useAudioMusic = !0,
    o._muted = !1,
    o._soundMuted = !1,
    o._musicMuted = !1,
    o._bgMusic = null,
    o._musicChannel = null,
    o._channels = [],
    o._blurPaused = !1,
    o._isActive = !0,
    o._lastSoundUsedTimeDic = {},
    o._isCheckingDispose = !1,
    o.autoReleaseSound = !0;
    class qe {
        create() {
            return this.json ? R.SceneUtils.createByData(null, this.json) : null
        }
    }
    class Ze {
        constructor() {
            this._fontCharDic = {},
            this._fontWidthMap = {},
            this._maxWidth = 0,
            this._spaceWidth = 10,
            this.fontSize = 12,
            this.autoScaleSize = !1,
            this.letterSpacing = 0
        }
        loadFont(t, e) {
            this._path = t,
            this._complete = e,
            t && -1 !== t.indexOf(".fnt") ? R.loader.load([{
                url: t,
                type: R.Loader.XML
            }, {
                url: t.replace(".fnt", ".png"),
                type: R.Loader.IMAGE
            }], Q.create(this, this._onLoaded)) : console.error('Bitmap font configuration information must be a ".fnt" file')
        }
        _onLoaded() {
            this.parseFont(R.Loader.getRes(this._path), R.Loader.getRes(this._path.replace(".fnt", ".png"))),
            this._complete && this._complete.run()
        }
        parseFont(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = t.getElementsByTagName("info");
                if (!i[0].getAttributeNode)
                    return this.parseFont2(t, e);
                this.fontSize = parseInt(i[0].getAttributeNode("size").nodeValue);
                for (var i = i[0].getAttributeNode("padding").nodeValue.split(","), s = (this._padding = [parseInt(i[0]), parseInt(i[1]), parseInt(i[2]), parseInt(i[3])],
                t.getElementsByTagName("char")), r = 0, r = 0; r < s.length; r++) {
                    var a = s[r]
                      , n = parseInt(a.getAttributeNode("id").nodeValue)
                      , h = +parseInt(a.getAttributeNode("xoffset").nodeValue)
                      , o = +parseInt(a.getAttributeNode("yoffset").nodeValue)
                      , l = +parseInt(a.getAttributeNode("xadvance").nodeValue)
                      , _ = new E
                      , a = (_.x = parseInt(a.getAttributeNode("x").nodeValue),
                    _.y = parseInt(a.getAttributeNode("y").nodeValue),
                    _.width = parseInt(a.getAttributeNode("width").nodeValue),
                    _.height = parseInt(a.getAttributeNode("height").nodeValue),
                    ae.create(e, _.x, _.y, _.width, _.height, h, o));
                    this._maxWidth = Math.max(this._maxWidth, l + this.letterSpacing),
                    this._fontCharDic[n] = a,
                    this._fontWidthMap[n] = l
                }
            }
        }
        parseFont2(t, e) {
            if (null != t && null != e) {
                this._texture = e;
                var i = t.getElementsByTagName("info");
                this.fontSize = parseInt(i[0].attributes.size.nodeValue);
                for (var i = i[0].attributes.padding.nodeValue.split(","), s = (this._padding = [parseInt(i[0]), parseInt(i[1]), parseInt(i[2]), parseInt(i[3])],
                t.getElementsByTagName("char")), r = 0, r = 0; r < s.length; r++) {
                    var a = s[r].attributes
                      , n = parseInt(a.id.nodeValue)
                      , h = +parseInt(a.xoffset.nodeValue)
                      , o = +parseInt(a.yoffset.nodeValue)
                      , l = +parseInt(a.xadvance.nodeValue)
                      , _ = new E
                      , a = (_.x = parseInt(a.x.nodeValue),
                    _.y = parseInt(a.y.nodeValue),
                    _.width = parseInt(a.width.nodeValue),
                    _.height = parseInt(a.height.nodeValue),
                    ae.create(e, _.x, _.y, _.width, _.height, h, o));
                    this._maxWidth = Math.max(this._maxWidth, l + this.letterSpacing),
                    this._fontCharDic[n] = a,
                    this._fontWidthMap[n] = l
                }
            }
        }
        getCharTexture(t) {
            return this._fontCharDic[t.charCodeAt(0)]
        }
        destroy() {
            if (this._texture) {
                for (var t in this._fontCharDic) {
                    t = this._fontCharDic[t];
                    t && t.destroy()
                }
                this._texture.destroy(),
                this._fontCharDic = null,
                this._fontWidthMap = null,
                this._texture = null,
                this._complete = null,
                this._padding = null
            }
        }
        setSpaceWidth(t) {
            this._spaceWidth = t
        }
        getCharWidth(t) {
            var e = t.charCodeAt(0);
            return this._fontWidthMap[e] ? this._fontWidthMap[e] + this.letterSpacing : " " === t ? this._spaceWidth + this.letterSpacing : 0
        }
        getTextWidth(t) {
            for (var e = 0, i = 0, s = t.length; i < s; i++)
                e += this.getCharWidth(t.charAt(i));
            return e
        }
        getMaxWidth() {
            return this._maxWidth
        }
        getMaxHeight() {
            return this.fontSize
        }
        _drawText(t, e, i, s, r, a) {
            for (var n, h = this.getTextWidth(t), o = "right" === r ? a - h : "center" === r ? (a - h) / 2 : 0, l = 0, _ = 0, u = t.length; _ < u; _++)
                (n = this.getCharTexture(t.charAt(_))) && (e.graphics.drawImage(n, i + l + o, s),
                l += this.getCharWidth(t.charAt(_)))
        }
    }
    F.regClass("laya.display.BitmapFont", Ze),
    F.regClass("Laya.BitmapFont", Ze);
    class Qe extends i {
        constructor() {
            super(...arguments),
            this._http = new XMLHttpRequest
        }
        send(t, e=null, i="get", s="text", r=null) {
            this._responseType = s,
            this._data = null,
            (P.onVVMiniGame || P.onQGMiniGame || P.onQQMiniGame || P.onAlipayMiniGame || P.onBLMiniGame || P.onHWMiniGame || P.onTTMiniGame || P.onTBMiniGame) && (t = Qe._urlEncode(t)),
            this._url = t;
            var a = this
              , n = this._http;
            n.open(i, t, !0);
            let h = !1;
            if (r)
                for (var o = 0; o < r.length; o++)
                    n.setRequestHeader(r[o++], r[o]);
            else
                window.conch || (e && "string" != typeof e ? (n.setRequestHeader("Content-Type", "application/json"),
                e instanceof ArrayBuffer || "string" == typeof e || (h = !0)) : n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"));
            i = "arraybuffer" !== s ? "text" : "arraybuffer";
            n.responseType = i,
            n.dataType && (n.dataType = i),
            n.onerror = function(t) {
                a._onError(t)
            }
            ,
            n.onabort = function(t) {
                a._onAbort(t)
            }
            ,
            n.onprogress = function(t) {
                a._onProgress(t)
            }
            ,
            n.onload = function(t) {
                a._onLoad(t)
            }
            ,
            P.onBLMiniGame && P.onAndroid && !e && (e = {}),
            n.send(h ? JSON.stringify(e) : e)
        }
        _onProgress(t) {
            t && t.lengthComputable && this.event(I.PROGRESS, t.loaded / t.total)
        }
        _onAbort(t) {
            this.error("Request was aborted by user")
        }
        _onError(t) {
            this.error("Request failed Status:" + this._http.status + " text:" + this._http.statusText)
        }
        _onLoad(t) {
            var e = this._http
              , i = void 0 !== e.status ? e.status : 200;
            200 === i || 204 === i || 0 === i ? this.complete() : this.error("[" + e.status + "]" + e.statusText + ":" + e.responseURL)
        }
        error(t) {
            this.clear(),
            console.warn(this.url, t),
            this.event(I.ERROR, t)
        }
        complete() {
            this.clear();
            var e = !0;
            try {
                "json" === this._responseType ? this._data = JSON.parse(this._http.responseText) : "xml" === this._responseType ? this._data = S.parseXMLFromString(this._http.responseText) : this._data = this._http.response || this._http.responseText
            } catch (t) {
                e = !1,
                this.error(t.message)
            }
            e && this.event(I.COMPLETE, this._data instanceof Array ? [this._data] : this._data)
        }
        clear() {
            var t = this._http;
            t.onerror = t.onabort = t.onprogress = t.onload = null
        }
        get url() {
            return this._url
        }
        get data() {
            return this._data
        }
        get http() {
            return this._http
        }
    }
    Qe._urlEncode = encodeURI;
    class U extends i {
        constructor() {
            super(...arguments),
            this._customParse = !1
        }
        static getTypeFromUrl(t) {
            var e = S.getFileExtension(t);
            return e ? U.typeMap[e] : (console.warn("Not recognize the resources suffix", t),
            "text")
        }
        load(t, e=null, i=!0, s=null, r=!1, a=R.WorkerLoader.enable) {
            var n;
            {
                if (t)
                    return U.setGroup(t, "666"),
                    0 !== (this._url = t).indexOf("data:image") || e ? t = C.formatURL(t) : e = U.IMAGE,
                    this._type = e = e || U.getTypeFromUrl(this._url),
                    this._cache = i,
                    this._useWorkerLoader = a,
                    this._data = null,
                    a && R.WorkerLoader.enableWorkerLoader(),
                    e == U.IMAGE ? (n = U.textureMap[t]) && (!n.bitmap || n.bitmap && n.bitmap.destroyed) && (n = null) : n = U.loadedMap[t],
                    !r && n ? (this._data = n,
                    this.event(I.PROGRESS, 1),
                    void this.event(I.COMPLETE, this._data)) : (s && U.setGroup(t, s),
                    null != U.parserMap[e] ? (this._customParse = !0,
                    void (U.parserMap[e]instanceof Q ? U.parserMap[e].runWith(this) : U.parserMap[e].call(null, this))) : void this._loadResourceFilter(e, t));
                this.onLoaded(null)
            }
        }
        _loadResourceFilter(t, e) {
            this._loadResource(t, e)
        }
        _loadResource(t, e) {
            switch (t) {
            case U.IMAGE:
            case "htmlimage":
            case "nativeimage":
                this._loadImage(e);
                break;
            case U.SOUND:
                this._loadSound(e);
                break;
            case U.TTF:
                this._loadTTF(e);
                break;
            case U.ATLAS:
            case U.PREFAB:
            case U.PLF:
                this._loadHttpRequestWhat(e, U.JSON);
                break;
            case U.FONT:
                this._loadHttpRequestWhat(e, U.XML);
                break;
            case U.PLFB:
                this._loadHttpRequestWhat(e, U.BUFFER);
                break;
            default:
                this._loadHttpRequestWhat(e, t)
            }
        }
        _loadHttpRequest(t, e, i, s, r, a, n, h) {
            !P.onVVMiniGame && !P.onHWMiniGame && this._http || (this._http = new Qe),
            a && this._http.on(I.PROGRESS, r, a),
            s && this._http.on(I.COMPLETE, i, s),
            this._http.on(I.ERROR, n, h),
            this._http.send(t, null, "get", e)
        }
        _loadHtmlImage(e, t, i, s, r) {
            function a() {
                var t = n;
                t.onload = null,
                t.onerror = null,
                delete U._imgCache[e]
            }
            var n;
            (n = new P.window.Image).crossOrigin = "",
            n.onload = function() {
                a(),
                i.call(t, n)
            }
            ,
            n.onerror = function() {
                a(),
                r.call(s)
            }
            ,
            n.src = e,
            U._imgCache[e] = n
        }
        _loadHttpRequestWhat(t, e) {
            U.preLoadedMap[t] ? this.onLoaded(U.preLoadedMap[t]) : this._loadHttpRequest(t, e, this, this.onLoaded, this, this.onProgress, this, this.onError)
        }
        _loadTTF(t) {
            t = C.formatURL(t);
            var e = new R.TTFLoader;
            e.complete = Q.create(this, this.onLoaded),
            e.load(t)
        }
        _loadImage(t, e=!0) {
            function i() {
                s.event(I.ERROR, "Load image failed")
            }
            var s = this;
            e && (t = C.formatURL(t));
            "nativeimage" !== this._type && ("ktx" === (e = "bin" == (e = S.getFileExtension(t)) && this._url ? S.getFileExtension(this._url) : e) || "pvr" === e) ? this._loadHttpRequest(t, U.BUFFER, this, this.onLoaded, this, this.onProgress, this, this.onError) : this._loadHtmlImage(t, this, this.onLoaded, this, i)
        }
        _loadSound(t) {
            var e = new o._soundClass
              , i = this;
            function s() {
                e.offAll()
            }
            e.on(I.COMPLETE, this, function() {
                s(),
                i.onLoaded(e)
            }),
            e.on(I.ERROR, this, function() {
                s(),
                e.dispose(),
                i.event(I.ERROR, "Load sound failed")
            }),
            e.load(t)
        }
        onProgress(t) {
            this._type === U.ATLAS ? this.event(I.PROGRESS, .3 * t) : this._originType == U.HIERARCHY ? this.event(I.PROGRESS, t / 3) : this.event(I.PROGRESS, t)
        }
        onError(t) {
            this.event(I.ERROR, t)
        }
        onLoaded(i=null) {
            if ((l = this._type) == U.PLFB)
                this.parsePLFBData(i),
                this.complete(i);
            else if (l == U.PLF)
                this.parsePLFData(i),
                this.complete(i);
            else if (l === U.IMAGE) {
                let e;
                if (i instanceof ArrayBuffer) {
                    let t;
                    switch (o = S.getFileExtension(this._url)) {
                    case "ktx":
                        t = v.TextureFormat.ETC1RGB;
                        break;
                    case "pvr":
                        t = v.TextureFormat.PVRTCRGBA_4BPPV;
                        break;
                    default:
                        return void console.error("unknown format", o)
                    }
                    (e = new rt(0,0,t,!1,!1)).wrapModeU = v.WarpMode.Clamp,
                    e.wrapModeV = v.WarpMode.Clamp,
                    e.setCompressData(i),
                    e._setCreateURL(this.url)
                } else
                    i instanceof rt ? e = i : ((e = new rt(i.width,i.height,1,!1,!1)).wrapModeU = v.WarpMode.Clamp,
                    e.wrapModeV = v.WarpMode.Clamp,
                    e.loadImageSource(i, !0),
                    e._setCreateURL(i.src));
                var t = new ae(e);
                t.url = this._url,
                this.complete(t)
            } else if (l === U.SOUND || "nativeimage" === l)
                this.complete(i);
            else if ("htmlimage" === l) {
                let t = new rt(i.width,i.height,1,!1,!1);
                t.wrapModeU = v.WarpMode.Clamp,
                t.wrapModeV = v.WarpMode.Clamp,
                t.loadImageSource(i, !0),
                t._setCreateURL(i.src),
                this.complete(t)
            } else if (l === U.ATLAS) {
                if (i.frames) {
                    var e = [];
                    if (!this._data) {
                        if ((this._data = i).meta && i.meta.image) {
                            var e = i.meta.image.split(",")
                              , t = 0 <= this._url.indexOf("/") ? "/" : "\\"
                              , t = this._url.lastIndexOf(t)
                              , s = 0 <= t ? this._url.substr(0, t + 1) : ""
                              , r = null;
                            P.onAndroid && i.meta.compressTextureAndroid && (r = ".ktx"),
                            P.onIOS && i.meta.compressTextureIOS && (r = i.meta.astc ? ".ktx" : ".pvr");
                            for (var a = 0, n = e.length; a < n; a++)
                                e[a] = r ? s + e[a].replace(".png", r) : s + e[a]
                        } else
                            e = [this._url.replace(".json", ".png")];
                        e.reverse(),
                        i.toLoads = e,
                        i.pics = []
                    }
                    this.event(I.PROGRESS, .3 + 1 / e.length * .6);
                    var h = C.formatURL(e.pop())
                      , o = S.getFileExtension(h)
                      , l = U.IMAGE;
                    return "pvr" != o && "ktx" != o || (l = U.BUFFER),
                    this._loadResourceFilter(l, h)
                }
                if (!(i instanceof rt))
                    if (i instanceof ArrayBuffer) {
                        h = this._http ? this._http.url : this._url;
                        let t;
                        switch (o = S.getFileExtension(h)) {
                        case "ktx":
                            t = v.TextureFormat.ETC1RGB;
                            break;
                        case "pvr":
                            t = v.TextureFormat.PVRTCRGBA_4BPPV;
                            break;
                        default:
                            return void console.error("unknown format", o)
                        }
                        let e = new rt(0,0,t,!1,!1);
                        e.wrapModeU = v.WarpMode.Clamp,
                        e.wrapModeV = v.WarpMode.Clamp,
                        e.setCompressData(i),
                        e._setCreateURL(h),
                        i = e
                    } else {
                        let t = new rt(i.width,i.height,1,!1,!1);
                        t.wrapModeU = v.WarpMode.Clamp,
                        t.wrapModeV = v.WarpMode.Clamp,
                        t.loadImageSource(i, !0),
                        t._setCreateURL(i.src),
                        i = t
                    }
                if (this._data.pics.push(i),
                0 < this._data.toLoads.length)
                    return this.event(I.PROGRESS, .3 + 1 / this._data.toLoads.length * .6),
                    h = C.formatURL(this._data.toLoads.pop()),
                    o = S.getFileExtension(h),
                    l = U.IMAGE,
                    "pvr" != o && "ktx" != o || (l = U.BUFFER),
                    this._loadResourceFilter(l, h);
                var _, u = this._data.frames, t = this._url.split("?")[0], c = this._data.meta && this._data.meta.prefix ? this._data.meta.prefix : t.substring(0, t.lastIndexOf(".")) + "/", d = this._data.pics, t = C.formatURL(this._url), p = U.atlasMap[t] || (U.atlasMap[t] = []);
                p.dir = c;
                if (this._data.meta && this._data.meta.scale && 1 != this._data.meta.scale)
                    for (var m in _ = parseFloat(this._data.meta.scale),
                    u) {
                        var g, f = u[m], T = d[f.frame.idx || 0];
                        h = c + m,
                        T.scaleRate = _,
                        g = ae._create(T, f.frame.x, f.frame.y, f.frame.w, f.frame.h, f.spriteSourceSize.x, f.spriteSourceSize.y, f.sourceSize.w, f.sourceSize.h, U.getRes(h)),
                        U.cacheTexture(h, g),
                        g.url = h,
                        p.push(h)
                    }
                else
                    for (m in u)
                        T = d[(f = u[m]).frame.idx || 0],
                        h = c + m,
                        g = ae._create(T, f.frame.x, f.frame.y, f.frame.w, f.frame.h, f.spriteSourceSize.x, f.spriteSourceSize.y, f.sourceSize.w, f.sourceSize.h, U.getRes(h)),
                        U.cacheTexture(h, g),
                        g.url = h,
                        p.push(h);
                delete this._data.pics,
                this.complete(this._data)
            } else if (l === U.FONT) {
                if (!i._source)
                    return this._data = i,
                    this.event(I.PROGRESS, .5),
                    this._loadResourceFilter(U.IMAGE, this._url.replace(".fnt", ".png"));
                var t = new Ze
                  , x = (t.parseFont(this._data, new ae(i)),
                this._url.split(".fnt")[0].split("/"))
                  , x = x[x.length - 1];
                O.registerBitmapFont(x, t),
                this._data = t,
                this.complete(this._data)
            } else
                l === U.PREFAB ? ((x = new qe).json = i,
                this.complete(x)) : this.complete(i)
        }
        parsePLFData(t) {
            var e, i, s;
            for (e in t)
                for (i in e,
                s = t[e])
                    U.preLoadedMap[C.formatURL(i)] = s[i]
        }
        parsePLFBData(t) {
            for (var e = new it(t), i = e.getInt32(), s = 0; s < i; s++)
                this.parseOnePLFBFile(e)
        }
        parseOnePLFBFile(t) {
            var e = t.getUTFString()
              , i = t.getInt32()
              , t = t.readArrayBuffer(i);
            U.preLoadedMap[C.formatURL(e)] = t
        }
        complete(t) {
            this._data = t,
            this._customParse ? this.event(I.LOADED, t instanceof Array ? [t] : t) : (U._loaders.push(this),
            U._isWorking || U.checkNext())
        }
        static checkNext() {
            U._isWorking = !0;
            for (var t = P.now(); U._startIndex < U._loaders.length; )
                if (U._loaders[U._startIndex].endLoad(),
                U._startIndex++,
                P.now() - t > U.maxTimeOut)
                    return console.warn("loader callback cost a long time:" + (P.now() - t) + " url=" + U._loaders[U._startIndex - 1].url),
                    void R.systemTimer.frameOnce(1, null, U.checkNext);
            U._loaders.length = 0,
            U._startIndex = 0,
            U._isWorking = !1
        }
        endLoad(t=null) {
            t && (this._data = t),
            this._cache && U.cacheRes(this._url, this._data),
            this.event(I.PROGRESS, 1),
            this.event(I.COMPLETE, this.data instanceof Array ? [this.data] : this.data)
        }
        get url() {
            return this._url
        }
        get type() {
            return this._type
        }
        get cache() {
            return this._cache
        }
        get data() {
            return this._data
        }
        static clearRes(t) {
            t = C.formatURL(t);
            var e = U.getAtlas(t);
            if (e) {
                for (var i = 0, s = e.length; i < s; i++) {
                    var r = e[i]
                      , a = U.getRes(r);
                    delete U.textureMap[r],
                    a && a.destroy()
                }
                e.length = 0,
                delete U.atlasMap[t]
            }
            var n = U.textureMap[t];
            n && (n.destroy(),
            delete U.textureMap[t]),
            U.loadedMap[t] && delete U.loadedMap[t]
        }
        static clearTextureRes(t) {
            t = C.formatURL(t);
            var e = U.getAtlas(t);
            e && 0 < e.length ? e.forEach(function(t) {
                t = U.getRes(t);
                t instanceof ae && t.disposeBitmap()
            }) : (e = U.getRes(t))instanceof ae && e.disposeBitmap()
        }
        static getRes(t) {
            var e = U.textureMap[C.formatURL(t)];
            return e || U.loadedMap[C.formatURL(t)]
        }
        static getAtlas(t) {
            return U.atlasMap[C.formatURL(t)]
        }
        static cacheRes(t, e) {
            t = C.formatURL(t),
            null != U.loadedMap[t] ? console.warn("Resources already exist,is repeated loading:", t) : e instanceof ae ? (U.loadedMap[t] = e.bitmap,
            U.textureMap[t] = e) : U.loadedMap[t] = e
        }
        static cacheResForce(t, e) {
            U.loadedMap[t] = e
        }
        static cacheTexture(t, e) {
            t = C.formatURL(t),
            null != U.textureMap[t] ? console.warn("Resources already exist,is repeated loading:", t) : U.textureMap[t] = e
        }
        static setGroup(t, e) {
            U.groupMap[e] || (U.groupMap[e] = []),
            U.groupMap[e].push(t)
        }
        static clearResByGroup(t) {
            if (U.groupMap[t]) {
                for (var e = U.groupMap[t], i = e.length, s = 0; s < i; s++)
                    U.clearRes(e[s]);
                e.length = 0
            }
        }
    }
    U.TEXT = "text",
    U.JSON = "json",
    U.PREFAB = "prefab",
    U.XML = "xml",
    U.BUFFER = "arraybuffer",
    U.IMAGE = "image",
    U.SOUND = "sound",
    U.ATLAS = "atlas",
    U.FONT = "font",
    U.TTF = "ttf",
    U.PLF = "plf",
    U.PLFB = "plfb",
    U.HIERARCHY = "HIERARCHY",
    U.MESH = "MESH",
    U.MATERIAL = "MATERIAL",
    U.TEXTURE2D = "TEXTURE2D",
    U.TEXTURECUBE = "TEXTURECUBE",
    U.ANIMATIONCLIP = "ANIMATIONCLIP",
    U.AVATAR = "AVATAR",
    U.TERRAINHEIGHTDATA = "TERRAINHEIGHTDATA",
    U.TERRAINRES = "TERRAIN",
    U.typeMap = {
        ttf: "ttf",
        png: "image",
        jpg: "image",
        jpeg: "image",
        ktx: "image",
        pvr: "image",
        txt: "text",
        json: "json",
        prefab: "prefab",
        xml: "xml",
        als: "atlas",
        atlas: "atlas",
        mp3: "sound",
        ogg: "sound",
        wav: "sound",
        part: "json",
        fnt: "font",
        plf: "plf",
        plfb: "plfb",
        scene: "json",
        ani: "json",
        sk: "arraybuffer",
        wasm: "arraybuffer"
    },
    U.parserMap = {},
    U.maxTimeOut = 100,
    U.groupMap = {},
    U.loadedMap = {},
    U.atlasMap = {},
    U.textureMap = {},
    U.preLoadedMap = {},
    U._imgCache = {},
    U._loaders = [],
    U._isWorking = !1,
    U._startIndex = 0;
    class $e {
        static enable(t, e=null) {
            R.loader.load(t, Q.create(null, $e._onInfoLoaded, [e]), null, U.JSON)
        }
        static _onInfoLoaded(t, e) {
            var i, s, r, a, n;
            for (i in e)
                for (s = (r = e[i])[0],
                n = (r = r[1]).length,
                a = 0; a < n; a++)
                    $e._fileLoadDic[s + r[a]] = i;
            t && t.run()
        }
        static getFileLoadPath(t) {
            return $e._fileLoadDic[t] || t
        }
    }
    $e._fileLoadDic = {};
    class Je extends i {
        constructor() {
            super(),
            this.retryNum = 1,
            this.retryDelay = 0,
            this.maxLoader = 5,
            this._loaders = [],
            this._loaderCount = 0,
            this._resInfos = [],
            this._infoPool = [],
            this._maxPriority = 5,
            this._failRes = {},
            this._statInfo = {
                count: 1,
                loaded: 1
            };
            for (var t = 0; t < this._maxPriority; t++)
                this._resInfos[t] = []
        }
        getProgress() {
            return this._statInfo.loaded / this._statInfo.count
        }
        resetProgress() {
            this._statInfo.count = this._statInfo.loaded = 1
        }
        create(t, e=null, i=null, s=null, r=null, a=null, n=1, h=!0) {
            this._create(t, !0, e, i, s, r, a, n, h)
        }
        _create(t, e, i=null, s=null, r=null, a=null, n=null, h=1, o=!0) {
            if (t instanceof Array) {
                var l, _ = !0, u = t, c = u.length, d = 0;
                s && (l = Q.create(s.caller, s ? s.method : null, s.args, !1));
                for (var p = 0; p < c; p++) {
                    var m = u[p];
                    (m = "string" == typeof m ? u[p] = {
                        url: m
                    } : m).progress = 0
                }
                for (p = 0; p < c; p++) {
                    var m = u[p]
                      , g = s ? Q.create(null, function(t, e) {
                        t.progress = e;
                        for (var i = 0, s = 0; s < c; s++)
                            i += u[s].progress;
                        l.runWith(i / c)
                    }, [m], !1) : null
                      , f = s || i ? Q.create(null, function(t, e=null) {
                        d++,
                        t.progress = 1,
                        e || (_ = !1),
                        d === c && i && i.runWith(_)
                    }, [m]) : null;
                    this._createOne(m.url, e, f, g, m.type || r, m.constructParams || a, m.propertyParams || n, m.priority || h, o)
                }
            } else
                this._createOne(t, e, i, s, r, a, n, h, o)
        }
        _createOne(e, i, s=null, t=null, r=null, a=null, n=null, h=1, o=!0) {
            var l = this.getRes(e);
            l ? (!i && l instanceof J && l._addReference(),
            t && t.runWith(1),
            s && s.runWith(l)) : (l = Je.createMap[S.getFilecompatibleExtension(e)] ? S.getFilecompatibleExtension(e) : S.getFileExtension(e),
            (r = r || (Je.createMap[l] ? Je.createMap[l][0] : null)) && U.parserMap[r] ? this._createLoad(e, Q.create(null, function(t) {
                t && (!i && t instanceof J && t._addReference(),
                t._setCreateURL(e)),
                s && s.runWith(t),
                R.loader.event(e)
            }), t, r, a, n, h, o, !0) : this.load(e, s, t, r, h, o))
        }
        load(t, e=null, i=null, s=null, r=1, a=!0, n=null, h=!1, o=R.WorkerLoader.enable) {
            return t instanceof Array ? this._loadAssets(t, e, i, s, r, a, n) : ((s = s || (0 === t.indexOf("data:image") ? U.IMAGE : U.getTypeFromUrl(t))) === U.IMAGE ? (l = U.textureMap[C.formatURL(t)]) && (!l.bitmap || l.bitmap && l.bitmap.destroyed) && (l = null) : l = U.loadedMap[C.formatURL(t)],
            h || null == l ? (_ = t,
            (t = $e.getFileLoadPath(t)) != _ && "nativeimage" !== s ? s = U.ATLAS : _ = null,
            (u = Je._resMap[t]) ? (e && (_ ? e && u._createListener(I.COMPLETE, this, this._resInfoLoaded, [_, e], !1, !1) : e && u._createListener(I.COMPLETE, e.caller, e.method, e.args, !1, !1)),
            i && u._createListener(I.PROGRESS, i.caller, i.method, i.args, !1, !1)) : ((u = this._infoPool.length ? this._infoPool.pop() : new ti).url = t,
            u.type = s,
            u.cache = a,
            u.group = n,
            u.ignoreCache = h,
            u.useWorkerLoader = o,
            u.originalUrl = _,
            e && u.on(I.COMPLETE, e.caller, e.method, e.args),
            i && u.on(I.PROGRESS, i.caller, i.method, i.args),
            Je._resMap[t] = u,
            r = r < this._maxPriority ? r : this._maxPriority - 1,
            this._resInfos[r].push(u),
            this._statInfo.count++,
            this.event(I.PROGRESS, this.getProgress()),
            this._next())) : R.systemTimer.callLater(this, function() {
                i && i.runWith(1),
                e && e.runWith(l instanceof Array ? [l] : l),
                this._loaderCount || this.event(I.COMPLETE)
            }),
            this);
            var l, _, u
        }
        _resInfoLoaded(t, e) {
            e.runWith(U.getRes(t))
        }
        _createLoad(t, e=null, i=null, s=null, r=null, a=null, n=1, h=!0, o=!1) {
            if (t instanceof Array)
                return this._loadAssets(t, e, i, s, n, h);
            var l, _ = U.getRes(t);
            return null != _ ? R.systemTimer.frameOnce(1, this, function() {
                i && i.runWith(1),
                e && e.runWith(_),
                this._loaderCount || this.event(I.COMPLETE)
            }) : (l = Je._resMap[t]) ? (e && l._createListener(I.COMPLETE, e.caller, e.method, e.args, !1, !1),
            i && l._createListener(I.PROGRESS, i.caller, i.method, i.args, !1, !1)) : ((l = this._infoPool.length ? this._infoPool.pop() : new ti).url = t,
            l.type = s,
            l.cache = !1,
            l.ignoreCache = o,
            l.originalUrl = null,
            l.group = null,
            l.createCache = h,
            l.createConstructParams = r,
            l.createPropertyParams = a,
            e && l.on(I.COMPLETE, e.caller, e.method, e.args),
            i && l.on(I.PROGRESS, i.caller, i.method, i.args),
            Je._resMap[t] = l,
            n = n < this._maxPriority ? n : this._maxPriority - 1,
            this._resInfos[n].push(l),
            this._statInfo.count++,
            this.event(I.PROGRESS, this.getProgress()),
            this._next()),
            this
        }
        _next() {
            if (!(this._loaderCount >= this.maxLoader)) {
                for (var t = 0; t < this._maxPriority; t++)
                    for (var e = this._resInfos[t]; 0 < e.length; ) {
                        var i = e.shift();
                        if (i)
                            return this._doLoad(i)
                    }
                this._loaderCount || this.event(I.COMPLETE)
            }
        }
        _doLoad(e) {
            this._loaderCount++;
            var i = this._loaders.length ? this._loaders.pop() : new U
              , s = (i.on(I.COMPLETE, null, r),
            i.on(I.PROGRESS, null, function(t) {
                e.event(I.PROGRESS, t)
            }),
            i.on(I.ERROR, null, function(t) {
                r(null)
            }),
            this);
            function r(t=null) {
                i.offAll(),
                i._data = null,
                i._customParse = !1,
                s._loaders.push(i),
                s._endLoad(e, t instanceof Array ? [t] : t),
                s._loaderCount--,
                s._next()
            }
            i._constructParams = e.createConstructParams,
            i._propertyParams = e.createPropertyParams,
            i._createCache = e.createCache,
            i.load(e.url, e.type, e.cache, e.group, e.ignoreCache, e.useWorkerLoader)
        }
        _endLoad(t, e) {
            var i = t.url;
            if (null == e) {
                var s = this._failRes[i] || 0;
                if (s < this.retryNum)
                    return console.warn("[warn]Retry to load:", i),
                    this._failRes[i] = s + 1,
                    void R.systemTimer.once(this.retryDelay, this, this._addReTry, [t], !1);
                U.clearRes(i),
                console.warn("[error]Failed to load:", i),
                this.event(I.ERROR, i)
            }
            this._failRes[i] && (this._failRes[i] = 0),
            delete Je._resMap[i],
            t.originalUrl && (e = U.getRes(t.originalUrl)),
            t.event(I.COMPLETE, e),
            t.offAll(),
            this._infoPool.push(t),
            this._statInfo.loaded++,
            this.event(I.PROGRESS, this.getProgress())
        }
        _addReTry(t) {
            this._resInfos[this._maxPriority - 1].push(t),
            this._next()
        }
        clearRes(t) {
            U.clearRes(t)
        }
        clearTextureRes(t) {
            U.clearTextureRes(t)
        }
        getRes(t) {
            return U.getRes(t)
        }
        cacheRes(t, e) {
            U.cacheRes(t, e)
        }
        setGroup(t, e) {
            U.setGroup(t, e)
        }
        clearResByGroup(t) {
            U.clearResByGroup(t)
        }
        static cacheRes(t, e) {
            U.cacheRes(t, e)
        }
        clearUnLoaded() {
            for (var t = 0; t < this._maxPriority; t++) {
                for (var e = this._resInfos[t], i = e.length - 1; -1 < i; i--) {
                    var s = e[i];
                    s && (s.offAll(),
                    this._infoPool.push(s))
                }
                e.length = 0
            }
            this._loaderCount = 0,
            Je._resMap = {}
        }
        cancelLoadByUrls(t) {
            if (t)
                for (var e = 0, i = t.length; e < i; e++)
                    this.cancelLoadByUrl(t[e])
        }
        cancelLoadByUrl(t) {
            for (var e = 0; e < this._maxPriority; e++)
                for (var i = this._resInfos[e], s = i.length - 1; -1 < s; s--) {
                    var r = i[s];
                    r && r.url === t && (i[s] = null,
                    r.offAll(),
                    this._infoPool.push(r))
                }
            Je._resMap[t] && delete Je._resMap[t]
        }
        _loadAssets(e, i=null, n=null, s=null, r=1, a=!0, h=null) {
            for (var o = e.length, l = 0, _ = 0, u = [], c = !0, d = 0; d < o; d++) {
                var p = e[d];
                let t;
                (t = "string" == typeof p ? {
                    url: p,
                    type: s,
                    size: 1,
                    priority: r
                } : p).size || (t.size = 1),
                t.progress = 0,
                _ += t.size,
                u.push(t);
                var p = n ? Q.create(null, f, [t], !1) : null
                  , m = i || n ? Q.create(null, g, [t]) : null;
                this.load(t.url, m, p, t.type, t.priority || 1, a, t.group || h, !1, t.useWorkerLoader)
            }
            function g(t, e=null) {
                l++,
                t.progress = 1,
                e || (c = !1),
                l === o && i && i.runWith(c)
            }
            function f(t, e) {
                if (null != n) {
                    t.progress = e;
                    for (var i = 0, s = 0; s < u.length; s++) {
                        var r, a = u[s];
                        a && (r = null == a.progress ? 0 : a.progress,
                        i += null == a.size ? 0 : a.size * r)
                    }
                    t = i / _;
                    n.runWith(t)
                }
            }
            return this
        }
        decodeBitmaps(t) {
            for (var e = t.length, i = R.Render._context, s = 0; s < e; s++) {
                var r = U.getAtlas(t[s]);
                r ? this._decodeTexture(r[0], i) : (r = this.getRes(t[s])) && r instanceof ae && this._decodeTexture(r, i)
            }
        }
        _decodeTexture(t, e) {
            var i = t.bitmap;
            t && i && ((t = i.source || i.image) && t instanceof HTMLImageElement && (e.drawImage(t, 0, 0, 1, 1),
            e.getImageData(0, 0, 1, 1)))
        }
    }
    Je._resMap = {},
    Je.createMap = {
        atlas: [null, U.ATLAS]
    };
    class ti extends i {
    }
    class ei {
        static __init__() {
            return ei._baseClass || (ei._baseClass = ii).init(),
            ei.items = ei._baseClass.items,
            ei.support = ei._baseClass.support,
            ei.support
        }
        static setItem(t, e) {
            ei._baseClass.setItem(t, e)
        }
        static getItem(t) {
            return ei._baseClass.getItem(t)
        }
        static setJSON(t, e) {
            ei._baseClass.setJSON(t, e)
        }
        static getJSON(t) {
            return ei._baseClass.getJSON(t)
        }
        static removeItem(t) {
            ei._baseClass.removeItem(t)
        }
        static clear() {
            ei._baseClass.clear()
        }
    }
    ei.support = !1;
    class ii {
        static init() {
            try {
                ii.support = !0,
                ii.items = window.localStorage,
                ii.setItem("laya", "1"),
                ii.removeItem("laya")
            } catch (t) {
                ii.support = !1
            }
            ii.support || console.log("LocalStorage is not supprot or browser is private mode.")
        }
        static setItem(t, e) {
            try {
                ii.support && ii.items.setItem(t, e)
            } catch (t) {
                console.warn("set localStorage failed", t)
            }
        }
        static getItem(t) {
            return ii.support ? ii.items.getItem(t) : null
        }
        static setJSON(t, e) {
            try {
                ii.support && ii.items.setItem(t, JSON.stringify(e))
            } catch (t) {
                console.warn("set localStorage failed", t)
            }
        }
        static getJSON(e) {
            try {
                return JSON.parse(ii.support ? ii.items.getItem(e) : null)
            } catch (t) {
                return ii.items.getItem(e)
            }
        }
        static removeItem(t) {
            ii.support && ii.items.removeItem(t)
        }
        static clear() {
            ii.support && ii.items.clear()
        }
    }
    ii.support = !1;
    class si {
        load(t) {
            t = (this._url = t).toLowerCase().split(".ttf")[0].split("/");
            this.fontName = t[t.length - 1],
            R.Render.isConchApp ? this._loadConch() : window.FontFace ? this._loadWithFontFace() : this._loadWithCSS()
        }
        _loadConch() {
            this._http = new Qe,
            this._http.on(I.ERROR, this, this._onErr),
            this._http.on(I.COMPLETE, this, this._onHttpLoaded),
            this._http.send(this._url, null, "get", U.BUFFER)
        }
        _onHttpLoaded(t=null) {
            window.conchTextCanvas.setFontFaceFromBuffer(this.fontName, t),
            this._clearHttp(),
            this._complete()
        }
        _clearHttp() {
            this._http && (this._http.off(I.ERROR, this, this._onErr),
            this._http.off(I.COMPLETE, this, this._onHttpLoaded),
            this._http = null)
        }
        _onErr() {
            this._clearHttp(),
            this.err && (this.err.runWith("fail:" + this._url),
            this.err = null)
        }
        _complete() {
            R.systemTimer.clear(this, this._complete),
            R.systemTimer.clear(this, this._checkComplete),
            this._div && this._div.parentNode && (this._div.parentNode.removeChild(this._div),
            this._div = null),
            this.complete && (this.complete.runWith(this),
            this.complete = null)
        }
        _checkComplete() {
            R.Browser.measureText(si._testString, this._fontTxt).width != this._txtWidth && this._complete()
        }
        _loadWithFontFace() {
            var t = new window.FontFace(this.fontName,"url('" + this._url + "')")
              , e = (document.fonts.add(t),
            this);
            t.loaded.then(function() {
                e._complete()
            }),
            t.load()
        }
        _createDiv() {
            this._div = P.createElement("div"),
            this._div.innerHTML = "laya";
            var t = this._div.style;
            t.fontFamily = this.fontName,
            t.position = "absolute",
            t.left = "-100px",
            t.top = "-100px",
            document.body.appendChild(this._div)
        }
        _loadWithCSS() {
            var t = P.createElement("style")
              , e = (t.type = "text/css",
            document.body.appendChild(t),
            t.textContent = "@font-face { font-family:'" + this.fontName + "'; src:url('" + this._url + "');}",
            this._fontTxt = "40px " + this.fontName,
            this._txtWidth = P.measureText(si._testString, this._fontTxt).width,
            this);
            t.onload = function() {
                R.systemTimer.once(1e4, e, e._complete)
            }
            ,
            R.systemTimer.loop(20, this, this._checkComplete),
            this._createDiv()
        }
    }
    si._testString = "LayaTTFFont";
    class ri {
        static linearNone(t, e, i, s) {
            return i * t / s + e
        }
        static linearIn(t, e, i, s) {
            return i * t / s + e
        }
        static linearInOut(t, e, i, s) {
            return i * t / s + e
        }
        static linearOut(t, e, i, s) {
            return i * t / s + e
        }
        static bounceIn(t, e, i, s) {
            return i - ri.bounceOut(s - t, 0, i, s) + e
        }
        static bounceInOut(t, e, i, s) {
            return t < .5 * s ? .5 * ri.bounceIn(2 * t, 0, i, s) + e : .5 * ri.bounceOut(2 * t - s, 0, i, s) + .5 * i + e
        }
        static bounceOut(t, e, i, s) {
            return (t /= s) < 1 / 2.75 ? i * (7.5625 * t * t) + e : t < 2 / 2.75 ? i * (7.5625 * (t -= 1.5 / 2.75) * t + .75) + e : t < 2.5 / 2.75 ? i * (7.5625 * (t -= 2.25 / 2.75) * t + .9375) + e : i * (7.5625 * (t -= 2.625 / 2.75) * t + .984375) + e
        }
        static backIn(t, e, i, s, r=1.70158) {
            return i * (t /= s) * t * ((r + 1) * t - r) + e
        }
        static backInOut(t, e, i, s, r=1.70158) {
            return (t /= .5 * s) < 1 ? .5 * i * (t * t * ((1 + (r *= 1.525)) * t - r)) + e : i / 2 * ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) + e
        }
        static backOut(t, e, i, s, r=1.70158) {
            return i * ((t = t / s - 1) * t * ((r + 1) * t + r) + 1) + e
        }
        static elasticIn(t, e, i, s, r=0, a=0) {
            return 0 == t ? e : 1 == (t /= s) ? e + i : (a = a || .3 * s,
            i = !r || 0 < i && r < i || i < 0 && r < -i ? (r = i,
            a / 4) : a / ri.PI2 * Math.asin(i / r),
            -(r * Math.pow(2, 10 * --t) * Math.sin((t * s - i) * ri.PI2 / a)) + e)
        }
        static elasticInOut(t, e, i, s, r=0, a=0) {
            var n;
            return 0 == t ? e : 2 == (t /= .5 * s) ? e + i : (a = a || s * (.3 * 1.5),
            n = !r || 0 < i && r < i || i < 0 && r < -i ? (r = i,
            a / 4) : a / ri.PI2 * Math.asin(i / r),
            t < 1 ? r * Math.pow(2, 10 * --t) * Math.sin((t * s - n) * ri.PI2 / a) * -.5 + e : r * Math.pow(2, -10 * --t) * Math.sin((t * s - n) * ri.PI2 / a) * .5 + i + e)
        }
        static elasticOut(t, e, i, s, r=0, a=0) {
            var n;
            return 0 == t ? e : 1 == (t /= s) ? e + i : (a = a || .3 * s,
            n = !r || 0 < i && r < i || i < 0 && r < -i ? (r = i,
            a / 4) : a / ri.PI2 * Math.asin(i / r),
            r * Math.pow(2, -10 * t) * Math.sin((t * s - n) * ri.PI2 / a) + i + e)
        }
        static strongIn(t, e, i, s) {
            return i * (t /= s) * t * t * t * t + e
        }
        static strongInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e
        }
        static strongOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t * t * t + 1) + e
        }
        static sineInOut(t, e, i, s) {
            return .5 * -i * (Math.cos(Math.PI * t / s) - 1) + e
        }
        static sineIn(t, e, i, s) {
            return -i * Math.cos(t / s * ri.HALF_PI) + i + e
        }
        static sineOut(t, e, i, s) {
            return i * Math.sin(t / s * ri.HALF_PI) + e
        }
        static quintIn(t, e, i, s) {
            return i * (t /= s) * t * t * t * t + e
        }
        static quintInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t * t + e : .5 * i * ((t -= 2) * t * t * t * t + 2) + e
        }
        static quintOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t * t * t + 1) + e
        }
        static quartIn(t, e, i, s) {
            return i * (t /= s) * t * t * t + e
        }
        static quartInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t * t + e : .5 * -i * ((t -= 2) * t * t * t - 2) + e
        }
        static quartOut(t, e, i, s) {
            return -i * ((t = t / s - 1) * t * t * t - 1) + e
        }
        static cubicIn(t, e, i, s) {
            return i * (t /= s) * t * t + e
        }
        static cubicInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t * t + e : .5 * i * ((t -= 2) * t * t + 2) + e
        }
        static cubicOut(t, e, i, s) {
            return i * ((t = t / s - 1) * t * t + 1) + e
        }
        static quadIn(t, e, i, s) {
            return i * (t /= s) * t + e
        }
        static quadInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * i * t * t + e : .5 * -i * (--t * (t - 2) - 1) + e
        }
        static quadOut(t, e, i, s) {
            return -i * (t /= s) * (t - 2) + e
        }
        static expoIn(t, e, i, s) {
            return 0 == t ? e : i * Math.pow(2, 10 * (t / s - 1)) + e - .001 * i
        }
        static expoInOut(t, e, i, s) {
            return 0 == t ? e : t == s ? e + i : (t /= .5 * s) < 1 ? .5 * i * Math.pow(2, 10 * (t - 1)) + e : .5 * i * (2 - Math.pow(2, -10 * --t)) + e
        }
        static expoOut(t, e, i, s) {
            return t == s ? e + i : i * (1 - Math.pow(2, -10 * t / s)) + e
        }
        static circIn(t, e, i, s) {
            return -i * (Math.sqrt(1 - (t /= s) * t) - 1) + e
        }
        static circInOut(t, e, i, s) {
            return (t /= .5 * s) < 1 ? .5 * -i * (Math.sqrt(1 - t * t) - 1) + e : .5 * i * (Math.sqrt(1 - (t -= 2) * t) + 1) + e
        }
        static circOut(t, e, i, s) {
            return i * Math.sqrt(1 - (t = t / s - 1) * t) + e
        }
    }
    ri.HALF_PI = .5 * Math.PI,
    ri.PI2 = 2 * Math.PI;
    class ai {
        constructor() {
            this.gid = 0,
            this.repeat = 1,
            this._count = 0
        }
        static to(t, e, i, s=null, r=null, a=0, n=!1, h=!0) {
            return p.getItemByClass("tween", ai)._create(t, e, i, s, r, a, n, !0, h, !0)
        }
        static from(t, e, i, s=null, r=null, a=0, n=!1, h=!0) {
            return p.getItemByClass("tween", ai)._create(t, e, i, s, r, a, n, !1, h, !0)
        }
        to(t, e, i, s=null, r=null, a=0, n=!1) {
            return this._create(t, e, i, s, r, a, n, !0, !1, !0)
        }
        from(t, e, i, s=null, r=null, a=0, n=!1) {
            return this._create(t, e, i, s, r, a, n, !1, !1, !0)
        }
        _create(t, e, i, s, r, a, n, h, o, l) {
            if (!t)
                throw new Error("Tween:target is null");
            this._target = t,
            this._duration = i,
            this._ease = s || e.ease || ai.easeNone,
            this._complete = r || e.complete,
            this._delay = a,
            this._props = [],
            this._usedTimer = 0,
            this._startTimer = P.now(),
            this._usedPool = o,
            this._delayParam = null,
            this.update = e.update;
            i = t.$_GID || (t.$_GID = S.getGID());
            return ai.tweenMap[i] ? (n && ai.clearTween(t),
            ai.tweenMap[i].push(this)) : ai.tweenMap[i] = [this],
            l ? a <= 0 ? this.firstStart(t, e, h) : (this._delayParam = [t, e, h],
            R.timer.once(a, this, this.firstStart, this._delayParam)) : this._initProps(t, e, h),
            this
        }
        firstStart(t, e, i) {
            this._delayParam = null,
            t.destroyed ? this.clear() : (this._initProps(t, e, i),
            this._beginLoop())
        }
        _initProps(t, e, i) {
            for (var s in e) {
                var r, a;
                "number" == typeof t[s] && (r = (i ? t : e)[s],
                a = (i ? e : t)[s],
                this._props.push([s, r, a - r]),
                i || (t[s] = r))
            }
        }
        _beginLoop() {
            R.timer.frameLoop(1, this, this._doEase)
        }
        _doEase() {
            this._updateEase(P.now())
        }
        _updateEase(t) {
            var e = this._target;
            if (e) {
                if (e.destroyed)
                    return ai.clearTween(e);
                t = this._usedTimer = t - this._startTimer - this._delay;
                if (!(t < 0)) {
                    if (t >= this._duration)
                        return this.complete();
                    for (var i = 0 < t ? this._ease(t, 0, 1, this._duration) : 0, s = this._props, r = 0, a = s.length; r < a; r++) {
                        var n = s[r];
                        e[n[0]] = n[1] + i * n[2]
                    }
                    this.update && this.update.run()
                }
            }
        }
        set progress(t) {
            t *= this._duration;
            this._startTimer = P.now() - this._delay - t
        }
        complete() {
            if (this._target) {
                R.timer.runTimer(this, this.firstStart);
                for (var t = this._target, e = this._props, i = this._complete, s = 0, r = e.length; s < r; s++) {
                    var a = e[s];
                    t[a[0]] = a[1] + a[2]
                }
                this.update && this.update.run(),
                this._count++,
                0 != this.repeat && this._count >= this.repeat ? (this.clear(),
                i && i.run()) : this.restart()
            }
        }
        pause() {
            R.timer.clear(this, this._beginLoop),
            R.timer.clear(this, this._doEase),
            R.timer.clear(this, this.firstStart);
            var t = P.now() - this._startTimer - this._delay;
            t < 0 && (this._usedTimer = t)
        }
        setStartTime(t) {
            this._startTimer = t
        }
        static clearAll(t) {
            if (t && t.$_GID) {
                var e = ai.tweenMap[t.$_GID];
                if (e) {
                    for (var i = 0, s = e.length; i < s; i++)
                        e[i]._clear();
                    e.length = 0
                }
            }
        }
        static clear(t) {
            t.clear()
        }
        static clearTween(t) {
            ai.clearAll(t)
        }
        clear() {
            this._target && (this._remove(),
            this._clear())
        }
        _clear() {
            this.pause(),
            R.timer.clear(this, this.firstStart),
            this._complete = null,
            this._target = null,
            this._ease = null,
            this._props = null,
            this._delayParam = null,
            this.repeat = 1,
            this._usedPool && (this.update = null,
            p.recover("tween", this))
        }
        recover() {
            this._usedPool = !0,
            this._clear()
        }
        _remove() {
            var t = ai.tweenMap[this._target.$_GID];
            if (t)
                for (var e = 0, i = t.length; e < i; e++)
                    if (t[e] === this) {
                        t.splice(e, 1);
                        break
                    }
        }
        restart() {
            if (this.pause(),
            this._usedTimer = 0,
            this._startTimer = P.now(),
            this._delayParam)
                R.timer.once(this._delay, this, this.firstStart, this._delayParam);
            else {
                for (var t = this._props, e = 0, i = t.length; e < i; e++) {
                    var s = t[e];
                    this._target[s[0]] = s[1]
                }
                R.timer.once(this._delay, this, this._beginLoop)
            }
        }
        resume() {
            this._usedTimer >= this._duration || (this._startTimer = P.now() - this._usedTimer - this._delay,
            this._delayParam ? this._usedTimer < 0 ? R.timer.once(-this._usedTimer, this, this.firstStart, this._delayParam) : this.firstStart.apply(this, this._delayParam) : this._beginLoop())
        }
        static easeNone(t, e, i, s) {
            return i * t / s + e
        }
    }
    ai.tweenMap = [];
    class ni {
        constructor() {
            this.ratio = .92,
            this.maxOffset = 60,
            this._dragging = !1,
            this._clickOnly = !0
        }
        start(t, e, i, s, r, a, n, h=.92) {
            this.clearTimer(),
            this.target = t,
            this.area = e,
            this.hasInertia = i,
            this.elasticDistance = e ? s : 0,
            this.elasticBackTime = r,
            this.data = a,
            this._disableMouseEvent = n,
            this.ratio = h,
            this._parent = t.parent,
            this._clickOnly = !0,
            this._dragging = !0,
            this._elasticRateX = this._elasticRateY = 1,
            this._lastX = this._parent.mouseX,
            this._lastY = this._parent.mouseY,
            R.stage.on(I.MOUSE_UP, this, this.onStageMouseUp),
            R.stage.on(I.MOUSE_OUT, this, this.onStageMouseUp),
            R.systemTimer.frameLoop(1, this, this.loop)
        }
        clearTimer() {
            R.systemTimer.clear(this, this.loop),
            R.systemTimer.clear(this, this.tweenMove),
            this._tween && (this._tween.recover(),
            this._tween = null)
        }
        stop() {
            this._dragging && (Ge.instance.disableMouseEvent = !1,
            R.stage.off(I.MOUSE_UP, this, this.onStageMouseUp),
            R.stage.off(I.MOUSE_OUT, this, this.onStageMouseUp),
            this._dragging = !1,
            this.target && this.area && this.backToArea(),
            this.clear())
        }
        loop() {
            var t = this._parent.getMousePoint()
              , e = t.x
              , t = t.y
              , i = e - this._lastX
              , s = t - this._lastY;
            if (this._clickOnly) {
                if (!(1 < Math.abs(i * R.stage._canvasTransform.getScaleX()) || 1 < Math.abs(s * R.stage._canvasTransform.getScaleY())))
                    return;
                this._clickOnly = !1,
                this._offsets || (this._offsets = []),
                this._offsets.length = 0,
                this.target.event(I.DRAG_START, this.data),
                Ge.instance.disableMouseEvent = this._disableMouseEvent
            } else
                this._offsets.push(i, s);
            0 == i && 0 == s || (this._lastX = e,
            this._lastY = t,
            this.target.x += i * this._elasticRateX,
            this.target.y += s * this._elasticRateY,
            this.area && this.checkArea(),
            this.target.event(I.DRAG_MOVE, this.data))
        }
        checkArea() {
            var t;
            this.elasticDistance <= 0 ? this.backToArea() : (t = this.target._x < this.area.x ? this.area.x - this.target._x : this.target._x > this.area.x + this.area.width ? this.target._x - this.area.x - this.area.width : 0,
            this._elasticRateX = Math.max(0, 1 - t / this.elasticDistance),
            t = this.target._y < this.area.y ? this.area.y - this.target.y : this.target._y > this.area.y + this.area.height ? this.target._y - this.area.y - this.area.height : 0,
            this._elasticRateY = Math.max(0, 1 - t / this.elasticDistance))
        }
        backToArea() {
            this.target.x = Math.min(Math.max(this.target._x, this.area.x), this.area.x + this.area.width),
            this.target.y = Math.min(Math.max(this.target._y, this.area.y), this.area.y + this.area.height)
        }
        onStageMouseUp(t) {
            if (Ge.instance.disableMouseEvent = !1,
            R.stage.off(I.MOUSE_UP, this, this.onStageMouseUp),
            R.stage.off(I.MOUSE_OUT, this, this.onStageMouseUp),
            R.systemTimer.clear(this, this.loop),
            !this._clickOnly && this.target)
                if (this.hasInertia) {
                    this._offsets.length < 1 && this._offsets.push(this._parent.mouseX - this._lastX, this._parent.mouseY - this._lastY),
                    this._offsetX = this._offsetY = 0;
                    for (var e = this._offsets.length, i = Math.min(e, 6), s = this._offsets.length - i, r = e - 1; s < r; r--)
                        this._offsetY += this._offsets[r--],
                        this._offsetX += this._offsets[r];
                    this._offsetX = this._offsetX / i * 2,
                    this._offsetY = this._offsetY / i * 2,
                    Math.abs(this._offsetX) > this.maxOffset && (this._offsetX = 0 < this._offsetX ? this.maxOffset : -this.maxOffset),
                    Math.abs(this._offsetY) > this.maxOffset && (this._offsetY = 0 < this._offsetY ? this.maxOffset : -this.maxOffset),
                    R.systemTimer.frameLoop(1, this, this.tweenMove)
                } else
                    0 < this.elasticDistance ? this.checkElastic() : this.clear()
        }
        checkElastic() {
            var t, e = NaN, i = NaN;
            this.target.x < this.area.x ? e = this.area.x : this.target._x > this.area.x + this.area.width && (e = this.area.x + this.area.width),
            this.target.y < this.area.y ? i = this.area.y : this.target._y > this.area.y + this.area.height && (i = this.area.y + this.area.height),
            isNaN(e) && isNaN(i) ? this.clear() : (t = {},
            isNaN(e) || (t.x = e),
            isNaN(i) || (t.y = i),
            this._tween = ai.to(this.target, t, this.elasticBackTime, ri.sineOut, Q.create(this, this.clear), 0, !1, !1))
        }
        tweenMove() {
            this._offsetX *= this.ratio * this._elasticRateX,
            this._offsetY *= this.ratio * this._elasticRateY,
            this.target.x += this._offsetX,
            this.target.y += this._offsetY,
            this.area && this.checkArea(),
            this.target.event(I.DRAG_MOVE, this.data),
            (Math.abs(this._offsetX) < 1 && Math.abs(this._offsetY) < 1 || this._elasticRateX < .5 || this._elasticRateY < .5) && (R.systemTimer.clear(this, this.tweenMove),
            0 < this.elasticDistance ? this.checkElastic() : this.clear())
        }
        clear() {
            var t;
            this.target && (this.clearTimer(),
            t = this.target,
            this.target = null,
            this._parent = null,
            t.event(I.DRAG_END, this.data))
        }
    }
    class hi {
        constructor() {
            this._id = S.getGID(),
            this._resetComp()
        }
        get id() {
            return this._id
        }
        get enabled() {
            return this._enabled
        }
        set enabled(t) {
            this._enabled != t && (this._enabled = t,
            this.owner && (t ? this.owner.activeInHierarchy && this._onEnable() : this.owner.activeInHierarchy && this._onDisable()))
        }
        get isSingleton() {
            return !0
        }
        get destroyed() {
            return this._destroyed
        }
        _isScript() {
            return !1
        }
        _resetComp() {
            this._indexInList = -1,
            this._enabled = !0,
            this._awaked = !1,
            this.owner = null
        }
        _getIndexInList() {
            return this._indexInList
        }
        _setIndexInList(t) {
            this._indexInList = t
        }
        _onAdded() {}
        _onAwake() {}
        _onEnable() {}
        _onDisable() {}
        _onDestroy() {}
        onReset() {}
        _parse(t, e=0) {}
        _parseInteractive(t=0, e) {}
        _cloneTo(t) {}
        _setActive(t) {
            t ? (this._awaked || (this._awaked = !0,
            this._onAwake()),
            this._enabled && this._onEnable()) : this._enabled && this._onDisable()
        }
        destroy() {
            this.owner && this.owner._destroyComponent(this)
        }
        _destroy() {
            this.owner.activeInHierarchy && this._enabled && this._setActive(!1),
            this._onDestroy(),
            this._destroyed = !0,
            this.onReset !== hi.prototype.onReset ? (this.onReset(),
            this._resetComp(),
            p.recoverByClass(this)) : this._resetComp()
        }
    }
    class oi extends Oe {
        constructor() {
            super(),
            this.wrapMode = 0,
            this._interval = n.animationInterval,
            this._isReverse = !1,
            this._frameRateChanged = !1,
            this._setBitUp(B.DISPLAY)
        }
        play(t=0, e=!0, i="") {
            this._isPlaying = !0,
            this._actionName = i,
            this.index = "string" == typeof t ? this._getFrameByLabel(t) : t,
            this.loop = e,
            this._isReverse = this.wrapMode === oi.WRAP_REVERSE,
            0 == this.index && this._isReverse && (this.index = this.count - 1),
            0 < this.interval && this.timerLoop(this.interval, this, this._frameLoop, null, !0, !0)
        }
        get interval() {
            return this._interval
        }
        set interval(t) {
            this._interval != t && (this._frameRateChanged = !0,
            this._interval = t,
            this._isPlaying && 0 < t && this.timerLoop(t, this, this._frameLoop, null, !0, !0))
        }
        _getFrameByLabel(t) {
            for (var e = 0; e < this._count; e++) {
                var i = this._labels[e];
                if (i && -1 < i.indexOf(t))
                    return e
            }
            return 0
        }
        _frameLoop() {
            if (!this._controlNode || this._controlNode.destroyed)
                this.clearTimer(this, this._frameLoop);
            else {
                if (this._isReverse) {
                    if (this._index--,
                    this._index < 0) {
                        if (!this.loop)
                            return this._index = 0,
                            this.stop(),
                            void this.event(I.COMPLETE);
                        this.wrapMode == oi.WRAP_PINGPONG ? (this._index = 0 < this._count ? 1 : 0,
                        this._isReverse = !1) : this._index = this._count - 1,
                        this.event(I.COMPLETE)
                    }
                } else if (this._index++,
                this._index >= this._count) {
                    if (!this.loop)
                        return this._index--,
                        this.stop(),
                        void this.event(I.COMPLETE);
                    this.wrapMode == oi.WRAP_PINGPONG ? (this._index = 0 <= this._count - 2 ? this._count - 2 : 0,
                    this._isReverse = !0) : this._index = 0,
                    this.event(I.COMPLETE)
                }
                this.index = this._index
            }
        }
        _setControlNode(t) {
            this._controlNode && (this._controlNode.off(I.DISPLAY, this, this._resumePlay),
            this._controlNode.off(I.UNDISPLAY, this, this._resumePlay)),
            (this._controlNode = t) && t != this && (t.on(I.DISPLAY, this, this._resumePlay),
            t.on(I.UNDISPLAY, this, this._resumePlay))
        }
        _setDisplay(t) {
            super._setDisplay(t),
            this._resumePlay()
        }
        _resumePlay() {
            this._isPlaying && (this._controlNode.displayedInStage ? this.play(this._index, this.loop, this._actionName) : this.clearTimer(this, this._frameLoop))
        }
        stop() {
            this._isPlaying = !1,
            this.clearTimer(this, this._frameLoop)
        }
        get isPlaying() {
            return this._isPlaying
        }
        addLabel(t, e) {
            this._labels || (this._labels = {}),
            this._labels[e] || (this._labels[e] = []),
            this._labels[e].push(t)
        }
        removeLabel(t) {
            if (t) {
                if (this._labels)
                    for (var e in this._labels)
                        this._removeLabelFromList(this._labels[e], t)
            } else
                this._labels = null
        }
        _removeLabelFromList(t, e) {
            if (t)
                for (var i = t.length - 1; 0 <= i; i--)
                    t[i] == e && t.splice(i, 1)
        }
        gotoAndStop(t) {
            this.index = "string" == typeof t ? this._getFrameByLabel(t) : t,
            this.stop()
        }
        get index() {
            return this._index
        }
        set index(t) {
            if (this._index = t,
            this._displayToIndex(t),
            this._labels && this._labels[t])
                for (var e = this._labels[t], i = 0, s = e.length; i < s; i++)
                    this.event(I.LABEL, e[i])
        }
        _displayToIndex(t) {}
        get count() {
            return this._count
        }
        clear() {
            return this.stop(),
            this._labels = null,
            this
        }
    }
    oi.WRAP_POSITIVE = 0,
    oi.WRAP_REVERSE = 1,
    oi.WRAP_PINGPONG = 2,
    F.regClass("laya.display.AnimationBase", oi),
    F.regClass("Laya.AnimationBase", oi);
    class li {
        static subtractVector3(t, e, i) {
            i[0] = t[0] - e[0],
            i[1] = t[1] - e[1],
            i[2] = t[2] - e[2]
        }
        static lerp(t, e, i) {
            return t * (1 - i) + e * i
        }
        static scaleVector3(t, e, i) {
            i[0] = t[0] * e,
            i[1] = t[1] * e,
            i[2] = t[2] * e
        }
        static lerpVector3(t, e, i, s) {
            var r = t[0]
              , a = t[1]
              , t = t[2];
            s[0] = r + i * (e[0] - r),
            s[1] = a + i * (e[1] - a),
            s[2] = t + i * (e[2] - t)
        }
        static lerpVector4(t, e, i, s) {
            var r = t[0]
              , a = t[1]
              , n = t[2]
              , t = t[3];
            s[0] = r + i * (e[0] - r),
            s[1] = a + i * (e[1] - a),
            s[2] = n + i * (e[2] - n),
            s[3] = t + i * (e[3] - t)
        }
        static slerpQuaternionArray(t, e, i, s, r, a, n) {
            var h, o, l = t[e + 0], _ = t[e + 1], u = t[e + 2], t = t[e + 3], e = i[s + 0], c = i[s + 1], d = i[s + 2], i = i[s + 3], s = l * e + _ * c + u * d + t * i;
            return s < 0 && (s = -s,
            e = -e,
            c = -c,
            d = -d,
            i = -i),
            s = 1e-6 < 1 - s ? (s = Math.acos(s),
            h = Math.sin(s),
            o = Math.sin((1 - r) * s) / h,
            Math.sin(r * s) / h) : (o = 1 - r,
            r),
            a[n + 0] = o * l + s * e,
            a[n + 1] = o * _ + s * c,
            a[n + 2] = o * u + s * d,
            a[n + 3] = o * t + s * i,
            a
        }
        static getRotation(t, e, i, s) {
            return Math.atan2(s - e, i - t) / Math.PI * 180
        }
        static sortBigFirst(t, e) {
            return t == e ? 0 : t < e ? 1 : -1
        }
        static sortSmallFirst(t, e) {
            return t == e ? 0 : t < e ? -1 : 1
        }
        static sortNumBigFirst(t, e) {
            return parseFloat(e) - parseFloat(t)
        }
        static sortNumSmallFirst(t, e) {
            return parseFloat(t) - parseFloat(e)
        }
        static sortByKey(i, t=!1, e=!0) {
            var s = t ? e ? li.sortNumBigFirst : li.sortBigFirst : e ? li.sortNumSmallFirst : li.sortSmallFirst;
            return function(t, e) {
                return s(t[i], e[i])
            }
        }
    }
    class _i extends oi {
        constructor() {
            super(),
            void 0 === _i._sortIndexFun && (_i._sortIndexFun = li.sortByKey("index", !1, !0))
        }
        static _sortIndexFun(t, e) {
            return t.index - e.index
        }
        _setUp(t, e) {
            this._targetDic = t,
            this._animationData = e,
            this.interval = 1e3 / e.frameRate,
            e.parsed ? (this._count = e.count,
            this._labels = e.labels,
            this._usedFrames = e.animationNewFrames) : (this._usedFrames = [],
            this._calculateDatas(),
            e.parsed = !0,
            e.labels = this._labels,
            e.count = this._count,
            e.animationNewFrames = this._usedFrames)
        }
        clear() {
            return super.clear(),
            this._targetDic = null,
            this._animationData = null,
            this
        }
        _displayToIndex(t) {
            if (this._animationData) {
                (t = t < 0 ? 0 : t) > this._count && (t = this._count);
                for (var e = this._animationData.nodes, i = e.length, s = 0; s < i; s++)
                    this._displayNodeToFrame(e[s], t)
            }
        }
        _displayNodeToFrame(t, e, i=null) {
            var s = (i = i || this._targetDic)[t.target];
            if (s) {
                for (var r, a, n = t.frames, h = t.keys, o = h.length, l = 0; l < o; l++)
                    a = (a = n[r = h[l]]).length > e ? a[e] : a[a.length - 1],
                    s[r] = a;
                var _, u = t.funkeys, o = u.length;
                if (0 != o)
                    for (l = 0; l < o; l++)
                        void 0 !== (_ = n[r = u[l]])[e] && s[r] && s[r].apply(s, _[e])
            }
        }
        _calculateDatas() {
            if (this._animationData) {
                for (var t, e = this._animationData.nodes, i = e.length, s = this._count = 0; s < i; s++)
                    t = e[s],
                    this._calculateKeyFrames(t);
                this._count += 1
            }
        }
        _calculateKeyFrames(t) {
            var e, i = t.keyframes, s = t.target;
            for (e in t.frames || (t.frames = {}),
            t.keys ? t.keys.length = 0 : t.keys = [],
            t.funkeys ? t.funkeys.length = 0 : t.funkeys = [],
            t.initValues || (t.initValues = {}),
            i) {
                var r = -1 != e.indexOf("()")
                  , a = i[e];
                if (r && (e = e.substr(0, e.length - 2)),
                t.frames[e] || (t.frames[e] = []),
                r) {
                    t.funkeys.push(e);
                    for (var n = t.frames[e], h = 0; h < a.length; h++) {
                        var o = a[h];
                        n[o.index] = o.value,
                        o.index > this._count && (this._count = o.index)
                    }
                } else
                    this._targetDic && this._targetDic[s] && (t.initValues[e] = this._targetDic[s][e]),
                    a.sort(_i._sortIndexFun),
                    t.keys.push(e),
                    this._calculateNodePropFrames(a, t.frames[e], e, s)
            }
        }
        resetNodes() {
            if (this._targetDic && this._animationData)
                for (var t, e, i = this._animationData.nodes, s = i.length, r = 0; r < s; r++)
                    if (e = (t = i[r]).initValues) {
                        var a, n = this._targetDic[t.target];
                        if (n)
                            for (a in e)
                                n[a] = e[a]
                    }
        }
        _calculateNodePropFrames(t, e, i, s) {
            var r, a = t.length - 1;
            for (e.length = t[a].index + 1,
            r = 0; r < a; r++)
                this._dealKeyFrame(t[r]),
                this._calculateFrameValues(t[r], t[r + 1], e);
            0 == a && (e[0] = t[0].value,
            this._usedFrames && (this._usedFrames[t[0].index] = !0)),
            this._dealKeyFrame(t[r])
        }
        _dealKeyFrame(t) {
            t.label && "" != t.label && this.addLabel(t.label, t.index)
        }
        _calculateFrameValues(t, e, i) {
            var s, r, a = t.index, n = e.index, h = t.value, o = e.value - t.value, l = n - a, _ = this._usedFrames;
            if (n > this._count && (this._count = n),
            t.tween)
                for (null == (r = ri[t.tweenMethod]) && (r = ri.linearNone),
                s = a; s < n; s++)
                    i[s] = r(s - a, h, o, l),
                    _ && (_[s] = !0);
            else
                for (s = a; s < n; s++)
                    i[s] = h;
            _ && (_[t.index] = !0,
            _[e.index] = !0),
            i[e.index] = e.value
        }
    }
    F.regClass("laya.display.FrameAnimation", _i),
    F.regClass("Laya.FrameAnimation", _i);
    class ui {
        constructor() {
            this._obj = {},
            ui._maps.push(this)
        }
        static __init__() {
            ui.I = new ui,
            ui.supportWeakMap || R.systemTimer.loop(ui.delInterval, null, ui.clearCache)
        }
        static clearCache() {
            for (var t = 0, e = ui._maps.length; t < e; t++)
                ui._maps[t]._obj = {}
        }
        set(t, e) {
            null == t || ui.supportWeakMap || ("string" == typeof t || "number" == typeof t ? this._obj[t] = e : (t.$_GID || (t.$_GID = S.getGID()),
            this._obj[t.$_GID] = e))
        }
        get(t) {
            return null == t ? null : ui.supportWeakMap ? void 0 : "string" == typeof t || "number" == typeof t ? this._obj[t] : this._obj[t.$_GID]
        }
        del(t) {
            null == t || ui.supportWeakMap || ("string" == typeof t || "number" == typeof t ? delete this._obj[t] : delete this._obj[this._obj.$_GID])
        }
        has(t) {
            return null != t && (!ui.supportWeakMap && ("string" == typeof t || "number" == typeof t ? null != this._obj[t] : null != this._obj[this._obj.$_GID]))
        }
    }
    ui.supportWeakMap = !1,
    ui.delInterval = 6e5,
    ui._maps = [];
    class ci {
        static __init() {
            ci._funMap = new ui
        }
        static getBindFun(t) {
            var e, i = ci._funMap.get(t);
            return null == i && (e = (e = '"' + t + '"').replace(/^"\${|}"$/g, "").replace(/\${/g, '"+').replace(/}/g, '+"'),
            i = window.Laya._runScript("(function(data){if(data==null)return;with(data){try{\nreturn " + e + "\n}catch(e){}}})"),
            ci._funMap.set(t, i)),
            i
        }
        static createByData(t, e) {
            var i = pi.create();
            if ((t = ci.createComp(e, t, t, null, i))._setBit(B.NOT_READY, !0),
            "_idMap"in t && (t._idMap = i._idMap),
            e.animations) {
                for (var s, r, a = [], n = e.animations, h = n.length, o = 0; o < h; o++) {
                    switch (s = new _i,
                    r = n[o],
                    s._setUp(i._idMap, r),
                    (t[r.name] = s)._setControlNode(t),
                    r.action) {
                    case 1:
                        s.play(0, !1);
                        break;
                    case 2:
                        s.play(0, !0)
                    }
                    a.push(s)
                }
                t._aniList = a
            }
            return "Scene" === t._$componentType && 0 < t._width && null == e.props.hitTestPrior && !t.mouseThrough && (t.hitTestPrior = !0),
            i.beginLoad(t),
            t
        }
        static createInitTool() {
            return pi.create()
        }
        static createComp(t, e=null, i=null, s=null, r=null) {
            var a, n;
            if ("Scene3D" == t.type || "Sprite3D" == t.type)
                return a = [],
                n = R.Laya.Utils3D._createSceneByJsonForMaker(t, a, r),
                "Sprite3D" == t.type ? R.Laya.StaticBatchManager.combine(n, a) : R.Laya.StaticBatchManager.combine(null, a),
                n;
            if (!(e = e || ci.getCompInstance(t)))
                return t.props && t.props.runtime ? console.warn("runtime not found:" + t.props.runtime) : console.warn("can not create:" + t.type),
                null;
            var h = t.child;
            if (h)
                for (var o = "List" == e._$componentType, l = 0, _ = h.length; l < _; l++) {
                    var u, c, d = h[l];
                    "itemRender"in e && ("render" == d.props.name || "render" === d.props.renderType) ? e.itemRender = d : "Graphic" == d.type ? R.ClassUtils._addGraphicsToSprite(d, e) : R.ClassUtils._isDrawType(d.type) ? R.ClassUtils._addGraphicToSprite(d, e, !0) : (o ? (u = [],
                    c = ci.createComp(d, null, i, u, r),
                    u.length && (c._$bindData = u)) : c = ci.createComp(d, null, i, s, r),
                    "Script" == d.type ? c instanceof hi ? e._addComponentInstance(c) : "owner"in c ? c.owner = e : "target"in c && (c.target = e) : "mask" == d.props.renderType || "mask" == d.props.name ? e.mask = c : c instanceof Fe && e.addChild(c))
                }
            var p, m = t.props;
            for (p in m) {
                var g = m[p];
                "string" == typeof g && (0 <= g.indexOf("@node:") || 0 <= g.indexOf("@Prefab:")) ? r && r.addNodeRef(e, p, g) : ci.setCompValue(e, p, g, i, s)
            }
            return e._afterInited && e._afterInited(),
            t.compId && r && r._idMap && (r._idMap[t.compId] = e),
            e
        }
        static setCompValue(t, e, i, s=null, r=null) {
            if ("string" == typeof i && -1 < i.indexOf("${"))
                if (ci._sheet || (ci._sheet = R.ClassUtils.getClass("laya.data.Table")),
                ci._sheet) {
                    if (r)
                        r.push(t, e, i);
                    else if (s) {
                        -1 == i.indexOf("].") && (i = i.replace(".", "[0]."));
                        for (var a, n = new di(t,e,i), h = (n.exe(s),
                        i.replace(/\[.*?\]\./g, ".")); null != (a = ci._parseWatchData.exec(h)); ) {
                            for (var o = a[1]; null != (l = ci._parseKeyWord.exec(o)); ) {
                                var l = l[0]
                                  , _ = s._watchMap[l] || (s._watchMap[l] = []);
                                _.push(n),
                                ci._sheet.I.notifer.on(l, s, s.changeData, [l])
                            }
                            (_ = s._watchMap[o] || (s._watchMap[o] = [])).push(n),
                            ci._sheet.I.notifer.on(o, s, s.changeData, [o])
                        }
                    }
                } else
                    console.warn("Can not find class Sheet");
            else
                "var" === e && s ? s[i] = t : t[e] = "true" === i || "false" !== i && i
        }
        static getCompInstance(t) {
            if ("UIView" == t.type && t.props && t.props.pageData)
                return ci.createByData(null, t.props.pageData);
            var e, i = t.props && t.props.runtime || t.type, s = R.ClassUtils.getClass(i);
            if (s)
                return "Script" === t.type && s.prototype._doAwake ? ((e = p.createByClass(s))._destroyed = !1,
                e) : t.props && "renderType"in t.props && "instance" == t.props.renderType ? (s.instance || (s.instance = new s),
                s.instance) : new s;
            throw "Can not find class " + i
        }
    }
    ci._parseWatchData = /\${(.*?)}/g,
    ci._parseKeyWord = /[a-zA-Z_][a-zA-Z0-9_]*(?:(?:\.[a-zA-Z_][a-zA-Z0-9_]*)+)/g;
    class di {
        constructor(t, e, i) {
            this.comp = t,
            this.prop = e,
            this.value = i
        }
        exe(t) {
            var e = ci.getBindFun(this.value);
            this.comp[this.prop] = e.call(this, t)
        }
    }
    class pi {
        reset() {
            this._nodeRefList = null,
            this._initList = null,
            this._idMap = null,
            this._loadList = null,
            this._scene = null
        }
        recover() {
            this.reset(),
            p.recover("InitTool", this)
        }
        static create() {
            var t = p.getItemByClass("InitTool", pi);
            return t._idMap = {},
            t
        }
        addLoadRes(t, e=null) {
            this._loadList || (this._loadList = []),
            R.loader.getRes(t) || (e ? this._loadList.push({
                url: t,
                type: e
            }) : this._loadList.push(t))
        }
        addNodeRef(t, e, i) {
            this._nodeRefList || (this._nodeRefList = []),
            this._nodeRefList.push([t, e, i]),
            0 <= i.indexOf("@Prefab:") && this.addLoadRes(i.replace("@Prefab:", ""), U.PREFAB)
        }
        setNodeRef() {
            if (this._nodeRefList)
                if (this._idMap) {
                    for (var t, e = this._nodeRefList.length, i = 0; i < e; i++)
                        (t = this._nodeRefList[i])[0][t[1]] = this.getReferData(t[2]);
                    this._nodeRefList = null
                } else
                    this._nodeRefList = null
        }
        getReferData(t) {
            if (0 <= t.indexOf("@Prefab:"))
                return U.getRes(t.replace("@Prefab:", ""));
            if (0 <= t.indexOf("@arr:")) {
                for (var e, i, s = (e = (t = t.replace("@arr:", "")).split(",")).length, r = 0; r < s; r++)
                    i = e[r],
                    e[r] = i ? this._idMap[i.replace("@node:", "")] : null;
                return e
            }
            return this._idMap[t.replace("@node:", "")]
        }
        addInitItem(t) {
            this._initList || (this._initList = []),
            this._initList.push(t)
        }
        doInits() {
            this._initList && (this._initList = null)
        }
        finish() {
            this.setNodeRef(),
            this.doInits(),
            this._scene._setBit(B.NOT_READY, !1),
            this._scene.parent && this._scene.parent.activeInHierarchy && this._scene.active && this._scene._processActive(),
            this._scene.event("onViewCreated"),
            this.recover()
        }
        beginLoad(t) {
            this._scene = t,
            !this._loadList || this._loadList.length < 1 ? this.finish() : R.loader.load(this._loadList, Q.create(this, this.finish))
        }
    }
    class mi {
        show(t=0, e) {}
        enable() {}
        hide() {}
        set_onclick(t) {}
        isCanvasRender() {
            return !0
        }
        renderNotCanvas(t, e, i) {}
    }
    class gi extends mi {
        constructor() {
            super(...arguments),
            this._show = !1,
            this._useCanvas = !1,
            this._height = 100,
            this._view = []
        }
        show(t=0, e=0) {
            P._isMiniGame || R.Render.isConchApp || (this._useCanvas = !0),
            this._show = !0,
            g._fpsData.length = 60,
            this._view[0] = {
                title: "FPS(WebGL)",
                value: "_fpsStr",
                color: "yellow",
                units: "int"
            },
            this._view[1] = {
                title: "Sprite",
                value: "_spriteStr",
                color: "white",
                units: "int"
            },
            this._view[2] = {
                title: "RenderBatches",
                value: "renderBatches",
                color: "white",
                units: "int"
            },
            this._view[3] = {
                title: "SavedRenderBatches",
                value: "savedRenderBatches",
                color: "white",
                units: "int"
            },
            this._view[4] = {
                title: "CPUMemory",
                value: "cpuMemory",
                color: "yellow",
                units: "M"
            },
            this._view[5] = {
                title: "GPUMemory",
                value: "gpuMemory",
                color: "yellow",
                units: "M"
            },
            this._view[6] = {
                title: "Shader",
                value: "shaderCall",
                color: "white",
                units: "int"
            },
            this._view[7] = {
                title: "Canvas",
                value: "_canvasStr",
                color: "white",
                units: "int"
            },
            f.is3DMode && (this._view[0].title = "FPS(3D)",
            this._view[8] = {
                title: "TriFaces",
                value: "trianglesFaces",
                color: "white",
                units: "int"
            },
            this._view[9] = {
                title: "FrustumCulling",
                value: "frustumCulling",
                color: "white",
                units: "int"
            },
            this._view[10] = {
                title: "OctreeNodeCulling",
                value: "octreeNodeCulling",
                color: "white",
                units: "int"
            }),
            this._useCanvas ? this.createUIPre(t, e) : this.createUI(t, e),
            this.enable()
        }
        createUIPre(t, e) {
            var i = P.pixelRatio;
            this._width = 180 * i,
            this._vx = 120 * i,
            this._height = i * (12 * this._view.length + 3 * i) + 4,
            gi._fontSize = 12 * i;
            for (var s = 0; s < this._view.length; s++)
                this._view[s].x = 4,
                this._view[s].y = s * gi._fontSize + 2 * i;
            this._canvas || (this._canvas = new Ie(!0),
            this._canvas.size(this._width, this._height),
            this._ctx = this._canvas.getContext("2d"),
            this._ctx.textBaseline = "top",
            this._ctx.font = gi._fontSize + "px Arial",
            this._canvas.source.style.cssText = "pointer-events:none;background:rgba(150,150,150,0.8);z-index:100000;position: absolute;direction:ltr;left:" + t + "px;top:" + e + "px;width:" + this._width / i + "px;height:" + this._height / i + "px;"),
            P.onKGMiniGame || P.container.appendChild(this._canvas.source),
            this._first = !0,
            this.loop(),
            this._first = !1
        }
        createUI(t, e) {
            for (var i = this._sp, s = P.pixelRatio, r = (i || (i = new Oe,
            this._leftText = new O,
            this._leftText.pos(5, 5),
            this._leftText.color = "#ffffff",
            i.addChild(this._leftText),
            this._txt = new O,
            this._txt.pos(130 * s, 5),
            this._txt.color = "#ffffff",
            i.addChild(this._txt),
            this._sp = i),
            i.pos(t, e),
            ""), a = 0; a < this._view.length; a++)
                r += this._view[a].title + "\n";
            this._leftText.text = r;
            t = 138 * s,
            e = s * (12 * this._view.length + 3 * s) + 4;
            this._txt.fontSize = gi._fontSize * s,
            this._leftText.fontSize = gi._fontSize * s,
            i.size(t, e),
            i.graphics.clear(),
            i.graphics.alpha(.5),
            i.graphics.drawRect(0, 0, 110 + t, 30 + e, "#999999"),
            i.graphics.alpha(2),
            this.loop()
        }
        enable() {
            R.systemTimer.frameLoop(1, this, this.loop)
        }
        hide() {
            this._show = !1,
            R.systemTimer.clear(this, this.loop),
            this._canvas && P.removeElement(this._canvas.source)
        }
        set_onclick(t) {
            this._sp && this._sp.on("click", this._sp, t),
            this._canvas && (this._canvas.source.onclick = t,
            this._canvas.source.style.pointerEvents = "")
        }
        loop() {
            g._count++;
            var t, e = P.now();
            e - g._timer < 1e3 || (t = g._count,
            g.FPS = Math.round(1e3 * t / (e - g._timer)),
            this._show && (g.trianglesFaces = Math.round(g.trianglesFaces / t),
            this._useCanvas ? g.renderBatches = Math.round(g.renderBatches / t) : g.renderBatches = Math.round(g.renderBatches / t) - 1,
            g.savedRenderBatches = Math.round(g.savedRenderBatches / t),
            g.shaderCall = Math.round(g.shaderCall / t),
            g.spriteRenderUseCacheCount = Math.round(g.spriteRenderUseCacheCount / t),
            g.canvasNormal = Math.round(g.canvasNormal / t),
            g.canvasBitmap = Math.round(g.canvasBitmap / t),
            g.canvasReCache = Math.ceil(g.canvasReCache / t),
            g.frustumCulling = Math.round(g.frustumCulling / t),
            g.octreeNodeCulling = Math.round(g.octreeNodeCulling / t),
            t = 0 < g.FPS ? Math.floor(1e3 / g.FPS).toString() : " ",
            g._fpsStr = g.FPS + (g.renderSlow ? " slow" : "") + " " + t,
            g._spriteStr = g.spriteCount + (g.spriteRenderUseCacheCount ? "/" + g.spriteRenderUseCacheCount : ""),
            g._canvasStr = g.canvasReCache + "/" + g.canvasNormal + "/" + g.canvasBitmap,
            g.cpuMemory = J.cpuMemory,
            g.gpuMemory = J.gpuMemory,
            this._useCanvas ? this.renderInfoPre() : this.renderInfo(),
            g.clear()),
            g._count = 0,
            g._timer = e)
        }
        renderInfoPre() {
            var t, e, i = 0;
            if (this._canvas) {
                var s = this._ctx;
                for (s.clearRect(this._first ? 0 : this._vx, 0, this._width, this._height),
                i = 0; i < this._view.length; i++)
                    t = this._view[i],
                    this._first && (s.fillStyle = "white",
                    s.fillText(t.title, t.x, t.y)),
                    s.fillStyle = t.color,
                    e = g[t.value],
                    "M" == t.units && (e = Math.floor(e / 1048576 * 100) / 100 + " M"),
                    s.fillText(e + "", t.x + this._vx, t.y)
            }
        }
        renderInfo() {
            for (var t = "", e = 0; e < this._view.length; e++) {
                var i = this._view[e]
                  , s = g[i.value];
                "M" == i.units && (s = Math.floor(s / 1048576 * 100) / 100 + " M"),
                t += (s = "K" == i.units ? Math.floor(s / 1024 * 100) / 100 + " K" : s) + "\n"
            }
            this._txt.text = t
        }
        isCanvasRender() {
            return this._useCanvas
        }
        renderNotCanvas(t, e, i) {
            this._show && this._sp && this._sp.render(t, 0, 0)
        }
    }
    gi._fontSize = 12;
    class fi {
        constructor(t=!0) {
            this.scale = 1,
            this.currTimer = Date.now(),
            this.currFrame = 0,
            this._delta = 0,
            this._lastTimer = Date.now(),
            this._map = {},
            this._handlers = [],
            this._temp = [],
            this._count = 0,
            t && fi.gSysTimer && fi.gSysTimer.frameLoop(1, this, this._update)
        }
        get delta() {
            return this._delta
        }
        _update() {
            if (this.scale <= 0)
                return this._lastTimer = Date.now(),
                void (this._delta = 0);
            for (var t = this.currFrame = this.currFrame + this.scale, e = Date.now(), i = 3e4 < e - this._lastTimer, s = (this._delta = (e - this._lastTimer) * this.scale,
            this.currTimer = this.currTimer + this._delta), r = (this._lastTimer = e,
            this._handlers), a = this._count = 0, n = r.length; a < n; a++) {
                var h = r[a];
                if (null !== h.method) {
                    var o = h.userFrame ? t : s;
                    if (o >= h.exeTime)
                        if (h.repeat)
                            if (!h.jumpFrame || i)
                                h.exeTime += h.delay,
                                h.run(!1),
                                o > h.exeTime && (h.exeTime += Math.ceil((o - h.exeTime) / h.delay) * h.delay);
                            else
                                for (; o >= h.exeTime; )
                                    h.exeTime += h.delay,
                                    h.run(!1);
                        else
                            h.run(!0)
                } else
                    this._count++
            }
            (30 < this._count || t % 200 == 0) && this._clearHandlers()
        }
        _clearHandlers() {
            for (var t = this._handlers, e = 0, i = t.length; e < i; e++) {
                var s = t[e];
                null !== s.method ? this._temp.push(s) : this._recoverHandler(s)
            }
            this._handlers = this._temp,
            t.length = 0,
            this._temp = t
        }
        _recoverHandler(t) {
            this._map[t.key] == t && (this._map[t.key] = null),
            t.clear(),
            fi._pool.push(t)
        }
        _create(t, e, i, s, r, a, n) {
            if (!i)
                return r.apply(s, a),
                null;
            if (n) {
                var h = this._getHandler(s, r);
                if (h)
                    return h.repeat = e,
                    h.userFrame = t,
                    h.delay = i,
                    h.caller = s,
                    h.method = r,
                    h.args = a,
                    h.exeTime = i + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer),
                    h
            }
            return (h = 0 < fi._pool.length ? fi._pool.pop() : new Ti).repeat = e,
            h.userFrame = t,
            h.delay = i,
            h.caller = s,
            h.method = r,
            h.args = a,
            h.exeTime = i + (t ? this.currFrame : this.currTimer + Date.now() - this._lastTimer),
            this._indexHandler(h),
            this._handlers.push(h),
            h
        }
        _indexHandler(t) {
            var e = t.caller
              , i = t.method
              , e = e ? e.$_GID || (e.$_GID = R.Utils.getGID()) : 0
              , i = i.$_TID || (i.$_TID = fi._mid++);
            t.key = e + "_" + i,
            this._map[t.key] = t
        }
        once(t, e, i, s=null, r=!0) {
            this._create(!1, !1, t, e, i, s, r)
        }
        loop(t, e, i, s=null, r=!0, a=!1) {
            t = this._create(!1, !0, t, e, i, s, r);
            t && (t.jumpFrame = a)
        }
        frameOnce(t, e, i, s=null, r=!0) {
            this._create(!0, !1, t, e, i, s, r)
        }
        frameLoop(t, e, i, s=null, r=!0) {
            this._create(!0, !0, t, e, i, s, r)
        }
        toString() {
            return " handlers:" + this._handlers.length + " pool:" + fi._pool.length
        }
        clear(t, e) {
            t = this._getHandler(t, e);
            t && (this._map[t.key] = null,
            t.key = "",
            t.clear())
        }
        clearAll(t) {
            if (t)
                for (var e = 0, i = this._handlers.length; e < i; e++) {
                    var s = this._handlers[e];
                    s.caller === t && (this._map[s.key] = null,
                    s.key = "",
                    s.clear())
                }
        }
        _getHandler(t, e) {
            t = t ? t.$_GID || (t.$_GID = R.Utils.getGID()) : 0,
            e = e.$_TID || (e.$_TID = fi._mid++);
            return this._map[t + "_" + e]
        }
        callLater(t, e, i=null) {
            ke.I.callLater(t, e, i)
        }
        runCallLater(t, e) {
            ke.I.runCallLater(t, e)
        }
        runTimer(t, e) {
            t = this._getHandler(t, e);
            t && null != t.method && (this._map[t.key] = null,
            t.run(!0))
        }
        pause() {
            this.scale = 0
        }
        resume() {
            this.scale = 1
        }
    }
    fi.gSysTimer = null,
    fi._pool = [],
    fi._mid = 1;
    class Ti {
        clear() {
            this.caller = null,
            this.method = null,
            this.args = null
        }
        run(t) {
            var e = this.caller;
            if (e && e.destroyed)
                return this.clear();
            var i = this.method
              , s = this.args;
            t && this.clear(),
            null != i && (s ? i.apply(e, s) : i.call(e))
        }
    }
    class xi extends ct {
        constructor(t) {
            super(b.SKINMESH, 0),
            this.offsetX = 300,
            this.offsetY = 0;
            var e = m.mainContext
              , i = 8 * Zt.BYTES_PE;
            this.position = [2, e.FLOAT, !1, i, 0],
            this.texcoord = [2, e.FLOAT, !1, i, 2 * Zt.BYTES_PE],
            this.color = [4, e.FLOAT, !1, i, 4 * Zt.BYTES_PE]
        }
    }
    class vi extends ct {
        constructor(t) {
            super(b.PRIMITIVE, 0),
            this._attribLocation = ["position", 0, "attribColor", 1]
        }
    }
    class yi extends ct {
        constructor(t=0) {
            super(b.TEXTURE2D, t),
            this.strength = 0,
            this.blurInfo = null,
            this.colorMat = null,
            this.colorAlpha = null,
            this._attribLocation = ["posuv", 0, "attribColor", 1, "attribFlags", 2]
        }
        clear() {
            this.texture = null,
            this.shader = null,
            this.defines._value = this.subID
        }
    }
    class Ei {
        constructor(t) {
            this.codes = {},
            this.funs = {},
            this.curUseID = -1,
            this.funnames = "",
            this.script = t;
            for (var e, i = 0; !((i = t.indexOf("#begin", i)) < 0); ) {
                for (e = i + 5; ; ) {
                    if ((e = t.indexOf("#end", e)) < 0)
                        break;
                    if ("i" !== t.charAt(e + 4))
                        break;
                    e += 5
                }
                if (e < 0)
                    throw "add include err,no #end:" + t;
                var s = t.indexOf("\n", i)
                  , r = R.ShaderCompile.splitToWords(t.substr(i, s - i), null);
                "code" == r[1] ? this.codes[r[2]] = t.substr(s + 1, e - s - 1) : "function" == r[1] && (s = t.indexOf("function", i),
                s += "function".length,
                this.funs[r[3]] = t.substr(s + 1, e - s - 1),
                this.funnames += r[3] + ";"),
                i = e + 1
            }
        }
        getWith(t=null) {
            var e = t ? this.codes[t] : this.script;
            if (e)
                return e;
            throw "get with error:" + t
        }
        getFunsScript(t) {
            var e, i = "";
            for (e in this.funs)
                0 <= t.indexOf(e + ";") && (i += this.funs[e]);
            return i
        }
    }
    class Ci {
        constructor(t) {
            this.childs = [],
            this.text = "",
            this.useFuns = "",
            this.z = 0,
            this.includefiles = t
        }
        setParent(t) {
            t.childs.push(this),
            this.z = t.z + 1,
            this.parent = t
        }
        setCondition(t, e) {
            t && (this.conditionType = e,
            t = t.replace(/(\s*$)/g, ""),
            this.condition = function() {
                return this[t]
            }
            ,
            this.condition.__condition = t)
        }
        toscript(t, e) {
            return this._toscript(t, e, ++Ci.__id)
        }
        _toscript(s, r, a) {
            if (this.childs.length < 1 && !this.text)
                return r;
            r.length;
            if (this.condition) {
                var t = !!this.condition.call(s);
                if (!(t = this.conditionType === R.ShaderCompile.IFDEF_ELSE ? !t : t))
                    return r
            }
            if (this.noCompile && this.text && r.push(this.text),
            0 < this.childs.length && this.childs.forEach(function(t, e, i) {
                t._toscript(s, r, a)
            }),
            0 < this.includefiles.length && 0 < this.useFuns.length)
                for (var e, i = 0, n = this.includefiles.length; i < n; i++)
                    this.includefiles[i].curUseID != a && 0 < (e = this.includefiles[i].file.getFunsScript(this.useFuns)).length && (this.includefiles[i].curUseID = a,
                    r[0] = e + r[0]);
            return r
        }
    }
    Ci.__id = 1;
    class Ri {
        constructor(t, e, i) {
            this.defs = {};
            let s = this;
            function r(t) {
                t = t.replace(Ri._clearCR, "");
                var e = []
                  , i = new Ci(e);
                return s._compileToTree(i, t.split("\n"), 0, e, s.defs),
                i
            }
            var a = Date.now();
            this._VS = r(t),
            this._PS = r(e),
            this._nameMap = i,
            2 < Date.now() - a && console.log("ShaderCompile use time:" + (Date.now() - a) + "  size:" + t.length + "/" + e.length)
        }
        static __init__() {
            var t = d.instance;
            Ri.shaderParamsMap = {
                float: t.FLOAT,
                int: t.INT,
                bool: t.BOOL,
                vec2: t.FLOAT_VEC2,
                vec3: t.FLOAT_VEC3,
                vec4: t.FLOAT_VEC4,
                ivec2: t.INT_VEC2,
                ivec3: t.INT_VEC3,
                ivec4: t.INT_VEC4,
                bvec2: t.BOOL_VEC2,
                bvec3: t.BOOL_VEC3,
                bvec4: t.BOOL_VEC4,
                mat2: t.FLOAT_MAT2,
                mat3: t.FLOAT_MAT3,
                mat4: t.FLOAT_MAT4,
                sampler2D: t.SAMPLER_2D,
                samplerCube: t.SAMPLER_CUBE
            }
        }
        static _parseOne(t, e, i, s, r, a) {
            var n = {
                type: Ri.shaderParamsMap[i[s + 1]],
                name: i[s + 2],
                size: isNaN(parseInt(i[s + 3])) ? 1 : parseInt(i[s + 3])
            };
            return a && ("attribute" == r ? t : e).push(n),
            ":" == i[s + 3] && (n.type = i[s + 4],
            s += 2),
            s += 2
        }
        static addInclude(t, e) {
            if (!e || 0 === e.length)
                throw new Error("add shader include file err:" + t);
            if (Ri.includes[t])
                throw new Error("add shader include file err, has add:" + t);
            Ri.includes[t] = new Ei(e)
        }
        static preGetParams(t, e) {
            var i = [t, e]
              , t = {}
              , s = []
              , r = []
              , a = {}
              , n = {};
            t.attributes = s,
            t.uniforms = r,
            t.defines = a;
            for (var h = 0; h < 2; h++) {
                i[h] = i[h].replace(Ri._removeAnnotation, "");
                for (var o = i[h].match(Ri._reg), l = 0, _ = o.length; l < _; l++) {
                    var u = o[l];
                    if ("attribute" != u && "uniform" != u) {
                        if ("#define" == u)
                            n[u = o[++l]] = 1;
                        else if ("#ifdef" == u) {
                            var c;
                            a[c = o[++l]] = a[c] || [];
                            for (l++; l < _; l++)
                                if ("attribute" != (u = o[l]) && "uniform" != u) {
                                    if ("#else" == u)
                                        for (l++; l < _; l++)
                                            if ("attribute" != (u = o[l]) && "uniform" != u) {
                                                if ("#endif" == u)
                                                    break
                                            } else
                                                l = Ri._parseOne(s, r, o, l, u, !n[c])
                                } else
                                    l = Ri._parseOne(s, r, o, l, u, !!n[c])
                        }
                    } else
                        l = Ri._parseOne(s, r, o, l, u, !0)
                }
            }
            return t
        }
        static splitToWords(t, e) {
            for (var i, s, r = [], a = -1, n = 0, h = t.length; n < h; n++)
                if (i = t.charAt(n),
                0 <= " \t=+-*/&%!<>()'\",;".indexOf(i))
                    if (0 <= a && 1 < n - a && (s = t.substr(a, n - a),
                    r.push(s)),
                    '"' == i || "'" == i) {
                        var o = t.indexOf(i, n + 1);
                        if (o < 0)
                            throw "Sharder err:" + t;
                        r.push(t.substr(n + 1, o - n - 1)),
                        n = o,
                        a = -1
                    } else
                        "(" == i && e && 0 < r.length && (s = r[r.length - 1] + ";",
                        "vec4;main;".indexOf(s) < 0 && (e.useFuns += s)),
                        a = -1;
                else
                    a < 0 && (a = n);
            return a < h && 1 < h - a && (s = t.substr(a, h - a),
            r.push(s)),
            r
        }
        _compileToTree(t, e, i, s, r) {
            for (var a, n, h, o, l, _, u, c, d = i; d < e.length; d++)
                if (!((h = e[d]).length < 1) && 0 !== (l = h.indexOf("//"))) {
                    if (0 <= l && (h = h.substr(0, l)),
                    a = _ || new Ci(s),
                    _ = null,
                    a.text = h,
                    a.noCompile = !0,
                    0 <= (l = h.indexOf("#"))) {
                        for (o = "#",
                        c = l + 1,
                        u = h.length; c < u; c++) {
                            var p = h.charAt(c);
                            if (" " === p || "\t" === p || "?" === p)
                                break;
                            o += p
                        }
                        switch (a.name = o) {
                        case "#ifdef":
                        case "#ifndef":
                            if (a.src = h,
                            a.noCompile = null != h.match(/[!&|()=<>]/),
                            a.noCompile ? console.log("function():Boolean{return " + h.substr(l + a.name.length) + "}") : (m = h.replace(/^\s*/, "").split(/\s+/),
                            a.setCondition(m[1], "#ifdef" === o ? Ri.IFDEF_YES : Ri.IFDEF_ELSE),
                            a.text = "//" + a.text),
                            a.setParent(t),
                            t = a,
                            r)
                                for (m = h.substr(c).split(Ri._splitToWordExps3),
                                c = 0; c < m.length; c++)
                                    (h = m[c]).length && (r[h] = !0);
                            continue;
                        case "#if":
                            if (a.src = h,
                            a.noCompile = !0,
                            a.setParent(t),
                            t = a,
                            r)
                                for (m = h.substr(c).split(Ri._splitToWordExps3),
                                c = 0; c < m.length; c++)
                                    (h = m[c]).length && "defined" != h && (r[h] = !0);
                            continue;
                        case "#else":
                            a.src = h,
                            n = (t = t.parent).childs[t.childs.length - 1],
                            a.noCompile = n.noCompile,
                            a.noCompile || (a.condition = n.condition,
                            a.conditionType = n.conditionType == Ri.IFDEF_YES ? Ri.IFDEF_ELSE : Ri.IFDEF_YES,
                            a.text = "//" + a.text + " " + n.text + " " + a.conditionType),
                            a.setParent(t),
                            t = a;
                            continue;
                        case "#endif":
                            n = (t = t.parent).childs[t.childs.length - 1],
                            a.noCompile = n.noCompile,
                            a.noCompile || (a.text = "//" + a.text),
                            a.setParent(t);
                            continue;
                        case "#include":
                            var m = Ri.splitToWords(h, null)
                              , g = Ri.includes[m[1]];
                            if (!g)
                                throw "ShaderCompile error no this include file:" + m[1];
                            if ((l = m[0].indexOf("?")) < 0) {
                                a.setParent(t),
                                h = g.getWith("with" == m[2] ? m[3] : null),
                                this._compileToTree(a, h.split("\n"), 0, s, r),
                                a.text = "";
                                continue
                            }
                            a.setCondition(m[0].substr(l + 1), Ri.IFDEF_YES),
                            a.text = g.getWith("with" == m[2] ? m[3] : null);
                            break;
                        case "#import":
                            g = (m = Ri.splitToWords(h, null))[1],
                            s.push({
                                node: a,
                                file: Ri.includes[g],
                                ofs: a.text.length
                            });
                            continue
                        }
                    } else {
                        if ((n = t.childs[t.childs.length - 1]) && !n.name) {
                            0 < s.length && Ri.splitToWords(h, n),
                            _ = a,
                            n.text += "\n" + h;
                            continue
                        }
                        0 < s.length && Ri.splitToWords(h, a)
                    }
                    a.setParent(t)
                }
        }
        createShader(t, e, i, s) {
            var r = {}
              , a = "";
            if (t)
                for (var n in t)
                    a += "#define " + n + "\n",
                    r[n] = !0;
            var t = this._VS.toscript(r, [])
              , h = this._PS.toscript(r, []);
            return (i || _t.create)(a + t.join("\n"), a + h.join("\n"), e, this._nameMap, s)
        }
    }
    Ri.IFDEF_NO = 0,
    Ri.IFDEF_YES = 1,
    Ri.IFDEF_ELSE = 2,
    Ri.IFDEF_PARENT = 3,
    Ri._removeAnnotation = new RegExp("(/\\*([^*]|[\\r\\\n]|(\\*+([^*/]|[\\r\\n])))*\\*+/)|(//.*)","g"),
    Ri._reg = new RegExp("(\".*\")|('.*')|([#\\w\\*-\\.+/()=<>{}\\\\]+)|([,;:\\\\])","g"),
    Ri._splitToWordExps = new RegExp("[(\".*\")]+|[('.*')]+|([ \\t=\\+\\-*/&%!<>!%(),;])","g"),
    Ri.includes = {},
    Ri._clearCR = new RegExp("\r","g"),
    Ri._splitToWordExps3 = new RegExp("[ \\t=\\+\\-*/&%!<>!%(),;\\|]","g");
    class Ai extends i {
        constructor() {
            super(),
            this.worker = new Worker(Ai.workerPath);
            let e = this;
            this.worker.onmessage = function(t) {
                e.workerMessage(t.data)
            }
        }
        static __init__() {
            return null == Ai._preLoadFun && (!!Worker && (Ai._preLoadFun = U.prototype._loadImage,
            U.prototype._loadImage = Ai.prototype._loadImage,
            Ai.I || (Ai.I = new Ai),
            !0))
        }
        static workerSupported() {
            return !!Worker
        }
        static enableWorkerLoader() {
            Ai._tryEnabled || (Ai.enable = !0,
            Ai._tryEnabled = !0)
        }
        static set enable(t) {
            Ai._enable != t && (Ai._enable = t) && null == Ai._preLoadFun && (Ai._enable = Ai.__init__())
        }
        static get enable() {
            return Ai._enable
        }
        workerMessage(t) {
            if (t)
                switch (t.type) {
                case "Image":
                    this.imageLoaded(t);
                    break;
                case "Disable":
                    Ai.enable = !1;
                    break;
                case "speed":
                    ei.setItem("loadSpeed", t.speed)
                }
        }
        imageLoaded(t) {
            var e;
            t.dataType && "imageBitmap" == t.dataType ? (e = t.imageBitmap,
            this.event(t.url, e)) : this.event(t.url, null)
        }
        loadImage(t) {
            this.worker.postMessage(t)
        }
        _loadImage(i) {
            var s, r = this;
            let a = r.type;
            this._useWorkerLoader && Ai._enable ? (i = C.formatURL(i),
            s = function(t) {
                var e;
                Ai.I.off(i, r, s),
                t ? (e = t,
                "nativeimage" !== a && ((e = new rt).wrapModeU = v.WarpMode.Clamp,
                e.wrapModeV = v.WarpMode.Clamp,
                e.loadImageSource(t, !0)),
                r.onLoaded(e)) : Ai._preLoadFun.call(r, i)
            }
            ,
            Ai.I.on(i, r, s),
            Ai.I.loadImage(i)) : Ai._preLoadFun.call(r, i)
        }
    }
    Ai.workerPath = "libs/workerloader.js",
    Ai._enable = !1,
    Ai._tryEnabled = !1;
    class bi {
        static set cursor(t) {
            bi._style.cursor = t
        }
        static get cursor() {
            return bi._style.cursor
        }
        static __init__() {
            bi._style = P.document.body.style
        }
        static hide() {
            "none" != bi.cursor && (bi._preCursor = bi.cursor,
            bi.cursor = "none")
        }
        static show() {
            "none" == bi.cursor && (bi._preCursor ? bi.cursor = bi._preCursor : bi.cursor = "auto")
        }
    }
    class Si extends Wt {
        constructor(t) {
            super(Si.const_stride, 4 * t * Si.const_stride, 4),
            this.canReuse = !0,
            this.setAttributes(Si._fixattriInfo),
            this.createQuadIB(t),
            this._quadNum = t
        }
        static __init__() {
            var t = d.instance;
            Si._fixattriInfo = [t.FLOAT, 4, 0, t.FLOAT, 3, 16, t.FLOAT, 3, 28, t.FLOAT, 4, 40, t.FLOAT, 4, 56, t.FLOAT, 3, 72, t.FLOAT, 2, 84, t.FLOAT, 4, 92, t.FLOAT, 1, 108, t.FLOAT, 1, 112]
        }
        setMaxParticleNum(t) {
            this._vb._resizeBuffer(4 * t * Si.const_stride, !1),
            this.createQuadIB(t)
        }
        static getAMesh(t) {
            var e;
            return Si._POOL.length ? ((e = Si._POOL.pop()).setMaxParticleNum(t),
            e) : new Si(t)
        }
        releaseMesh() {
            this._vb.setByteLength(0),
            this.vertNum = 0,
            this.indexNum = 0,
            Si._POOL.push(this)
        }
        destroy() {
            this._ib.destroy(),
            this._vb.destroy(),
            this._vb.deleteBuffer()
        }
    }
    Si.const_stride = 116,
    Si._POOL = [];
    class wi extends tt {
    }
    wi.create = function(t, e, i) {
        t = new rt(t,e,i,!1,!1);
        return t.wrapModeU = v.WarpMode.Clamp,
        t.wrapModeV = v.WarpMode.Clamp,
        t
    }
    ;
    class _ {
        static __init(t) {
            t.forEach(function(t) {
                t.__init$ && t.__init$()
            })
        }
        static init(t, e, ...i) {
            if (!_._isinit) {
                _._isinit = !0,
                ArrayBuffer.prototype.slice || (ArrayBuffer.prototype.slice = _._arrayBufferSlice),
                P.__init__();
                var s = P.mainCanvas = new Ie(!0)
                  , r = s.source.style;
                if (r.position = "absolute",
                r.top = r.left = "0px",
                r.background = "#000000",
                P.onKGMiniGame || P.onAlipayMiniGame || P.container.appendChild(s.source),
                P.canvas = new Ie(!0),
                P.context = P.canvas.getContext("2d"),
                P.supportWebAudio = o.__init__(),
                P.supportLocalStorage = ei.__init__(),
                _.systemTimer = new fi(!1),
                v.systemTimer = fi.gSysTimer = _.systemTimer,
                _.startTimer = new fi(!1),
                _.physicsTimer = new fi(!1),
                _.updateTimer = new fi(!1),
                _.lateTimer = new fi(!1),
                _.timer = new fi(!1),
                v.startTimer = R.startTimer = _.startTimer,
                v.lateTimer = R.lateTimer = _.lateTimer,
                v.updateTimer = R.updateTimer = _.updateTimer,
                R.systemTimer = _.systemTimer,
                v.timer = R.timer = _.timer,
                v.physicsTimer = R.physicsTimer = _.physicsTimer,
                _.loader = new Je,
                R.Laya = _,
                v.loader = R.loader = _.loader,
                ui.__init__(),
                ci.__init(),
                bi.__init__(),
                de.inner_enable(),
                i)
                    for (var a = 0, n = i.length; a < n; a++)
                        i[a] && i[a].enable && i[a].enable();
                return R.Render.isConchApp && _.enableNative(),
                _.enableWebGLPlus(),
                Ae.beginCheck(),
                v.stage = _.stage = new N,
                R.stage = _.stage,
                S.gStage = _.stage,
                C.rootPath = C._basePath = _._getUrlPath(),
                Yt.__int__(),
                Xt.__init__(),
                Vt.__init__(),
                _.render = new f(0,0,P.mainCanvas),
                v.render = _.render,
                _.stage.size(t, e),
                window.stage = _.stage,
                m.__init__(),
                Si.__init__(),
                Ri.__init__(),
                Me.__init__(),
                Xe.__init__(),
                Ge.instance.__init__(_.stage, f.canvas),
                h.__init__(),
                o.autoStopMusic = !0,
                g._StatRender = new gi,
                ct._initone(b.TEXTURE2D, yi),
                ct._initone(b.TEXTURE2D | b.FILTERGLOW, yi),
                ct._initone(b.PRIMITIVE, vi),
                ct._initone(b.SKINMESH, xi),
                f.canvas
            }
        }
        static _getUrlPath() {
            return C.getPath(location.protocol + "//" + location.host + location.pathname)
        }
        static _arrayBufferSlice(t, e) {
            e = new Uint8Array(this,t,e - t),
            t = new Uint8Array(e.length);
            return t.set(e),
            t.buffer
        }
        static alertGlobalError(t) {
            var a = 0;
            P.window.onerror = t ? function(t, e, i, s, r) {
                // Fix me 1
                //a++ < 5 && r && this.alert("Oops! something went wrong. please send a screenshot of this information to the developer \n" + t + "\n" + r.stack)
                // a++ < 5 && 
            }
            : null
        }
        static _runScript(t) {
            return P.window[_._evcode](t)
        }
        static enableDebugPanel(t="libs/laya.debugtool.js") {
            var e;
            window.Laya.DebugPanel ? window.Laya.DebugPanel.enable() : ((e = P.createElement("script")).onload = function() {
                window.Laya.DebugPanel.enable()
            }
            ,
            e.src = t,
            P.document.body.appendChild(e))
        }
        static enableWebGLPlus() {
            m.__init_native()
        }
        static enableNative() {
            _.isNativeRender_enable || (_.isNativeRender_enable = !0,
            f.supportWebGLPlusRendering && (_t.prototype.uploadTexture2D = function(t) {
                var e = d.instance;
                e.bindTexture(e.TEXTURE_2D, t)
            }
            ),
            l.width = P.window.innerWidth,
            l.height = P.window.innerHeight,
            P.measureText = function(t, e) {
                return window.conchTextCanvas.font = e,
                window.conchTextCanvas.measureText(t)
            }
            ,
            N.clear = function(t) {
                L.set2DRenderConfig();
                var t = gt.create(t).arrColor
                  , e = d.instance;
                t && e.clearColor(t[0], t[1], t[2], t[3]),
                e.clear(e.COLOR_BUFFER_BIT | e.DEPTH_BUFFER_BIT | e.STENCIL_BUFFER_BIT),
                l.clear()
            }
            ,
            Oe.drawToCanvas = function(t, e, i, s, r, a) {
                r = r - t.x | 0,
                a = a - t.y | 0,
                i |= 0,
                s |= 0;
                var n = new Ie(!1)
                  , h = n.getContext("2d");
                return n.size(i, s),
                h.asBitmap = !0,
                h._targets.start(),
                Me.renders[e]._fun(t, h, r, a),
                h.flush(),
                h._targets.end(),
                h._targets.restore(),
                n
            }
            ,
            Object.defineProperty(nt.prototype, "uv", {
                get: function() {
                    return this._uv
                },
                set: function(t) {
                    this._uv = t
                }
            }),
            Ie.prototype.getTexture = function() {
                return this._texture || (this._texture = this.context._targets,
                this._texture.uv = nt.flipyuv,
                this._texture.bitmap = this._texture),
                this._texture
            }
            )
        }
    }
    _.stage = null,
    _.systemTimer = null,
    _.startTimer = null,
    _.physicsTimer = null,
    _.updateTimer = null,
    _.lateTimer = null,
    _.timer = null,
    _.loader = null,
    _.version = "2.12.2",
    _._isinit = !1,
    _.isWXOpenDataContext = !1,
    _.isWXPosMsg = !1,
    _.__classmap = null,
    _.Config = n,
    _.TextRender = D,
    _.EventDispatcher = i,
    _.SoundChannel = He,
    _.Stage = N,
    _.Render = f,
    _.Browser = P,
    _.Sprite = Oe,
    _.Node = Fe,
    _.Context = L,
    _.WebGL = de,
    _.Handler = Q,
    _.RunDriver = Ye,
    _.Utils = S,
    _.Input = h,
    _.Loader = U,
    _.LocalStorage = ei,
    _.SoundManager = o,
    _.URL = C,
    _.Event = I,
    _.Matrix = y,
    _.HTMLImage = wi,
    (_.Laya = _)._evcode = "eval",
    _.isNativeRender_enable = !1,
    _.__classmap = R.__classMap,
    R.Timer = fi,
    R.Dragging = ni,
    R.GraphicsBounds = T,
    R.Sprite = Oe,
    R.TextRender = D,
    R.Loader = U,
    R.TTFLoader = si,
    R.WebAudioSound = s,
    R.SoundManager = o,
    R.ShaderCompile = Ri,
    R.ClassUtils = F,
    R.SceneUtils = ci,
    R.Context = L,
    R.Render = f,
    R.MouseManager = Ge,
    R.Text = O,
    R.Browser = P,
    R.WebGL = de,
    R.AudioSound = Ke,
    R.Pool = p,
    R.Utils = S,
    R.Graphics = Se,
    R.Submit = Qt,
    R.Stage = N,
    R.Resource = J,
    R.WorkerLoader = Ai;
    var Mi = window._layalibs;
    if (Mi) {
        Mi.sort(function(t, e) {
            return t.i - e.i
        });
        for (var Ii = 0; Ii < Mi.length; Ii++)
            Mi[Ii].f(window, window.document, _)
    }
    let Pi = window;
    Pi.Laya ? (Pi.Laya.Laya = _,
    Object.assign(Pi.Laya, _)) : Pi.Laya = _;
    var Di, t = _.__init, Li = _.init, Bi = _.version, Fi = _.alertGlobalError, Oi = _.enableDebugPanel;
    function Ni(i, s) {
        for (var r = 0, t = s.length; r < t; r += 2)
            "length" == s[r] ? i.length = s[r + 1].call(i) : function() {
                var e = s[r]
                  , t = s[r + 1];
                Object.defineProperty(i, e, {
                    get: function() {
                        return delete this[e],
                        this[e] = t.call(this)
                    },
                    set: function(t) {
                        delete this[e],
                        this[e] = t
                    },
                    enumerable: !0,
                    configurable: !0
                })
            }()
    }
    class Ui extends hi {
        get isSingleton() {
            return !1
        }
        constructor() {
            super()
        }
        onAwake() {}
        onEnable() {}
        onStart() {}
        onUpdate() {}
        onLateUpdate() {}
        onDisable() {}
        onDestroy() {}
    }
    class Gi extends hi {
        get isSingleton() {
            return !1
        }
        _onAwake() {
            this.onAwake(),
            this.onStart !== Gi.prototype.onStart && R.startTimer.callLater(this, this.onStart)
        }
        _onEnable() {
            var t = Gi.prototype;
            this.onTriggerEnter !== t.onTriggerEnter && this.owner.on(I.TRIGGER_ENTER, this, this.onTriggerEnter),
            this.onTriggerStay !== t.onTriggerStay && this.owner.on(I.TRIGGER_STAY, this, this.onTriggerStay),
            this.onTriggerExit !== t.onTriggerExit && this.owner.on(I.TRIGGER_EXIT, this, this.onTriggerExit),
            this.onMouseDown !== t.onMouseDown && this.owner.on(I.MOUSE_DOWN, this, this.onMouseDown),
            this.onMouseUp !== t.onMouseUp && this.owner.on(I.MOUSE_UP, this, this.onMouseUp),
            this.onClick !== t.onClick && this.owner.on(I.CLICK, this, this.onClick),
            this.onStageMouseDown !== t.onStageMouseDown && R.stage.on(I.MOUSE_DOWN, this, this.onStageMouseDown),
            this.onStageMouseUp !== t.onStageMouseUp && R.stage.on(I.MOUSE_UP, this, this.onStageMouseUp),
            this.onStageClick !== t.onStageClick && R.stage.on(I.CLICK, this, this.onStageClick),
            this.onStageMouseMove !== t.onStageMouseMove && R.stage.on(I.MOUSE_MOVE, this, this.onStageMouseMove),
            this.onDoubleClick !== t.onDoubleClick && this.owner.on(I.DOUBLE_CLICK, this, this.onDoubleClick),
            this.onRightClick !== t.onRightClick && this.owner.on(I.RIGHT_CLICK, this, this.onRightClick),
            this.onMouseMove !== t.onMouseMove && this.owner.on(I.MOUSE_MOVE, this, this.onMouseMove),
            this.onMouseOver !== t.onMouseOver && this.owner.on(I.MOUSE_OVER, this, this.onMouseOver),
            this.onMouseOut !== t.onMouseOut && this.owner.on(I.MOUSE_OUT, this, this.onMouseOut),
            this.onKeyDown !== t.onKeyDown && R.stage.on(I.KEY_DOWN, this, this.onKeyDown),
            this.onKeyPress !== t.onKeyPress && R.stage.on(I.KEY_PRESS, this, this.onKeyPress),
            this.onKeyUp !== t.onKeyUp && R.stage.on(I.KEY_UP, this, this.onKeyUp),
            this.onUpdate !== t.onUpdate && R.updateTimer.frameLoop(1, this, this.onUpdate),
            this.onLateUpdate !== t.onLateUpdate && R.lateTimer.frameLoop(1, this, this.onLateUpdate),
            this.onPreRender !== t.onPreRender && R.lateTimer.frameLoop(1, this, this.onPreRender),
            this.onEnable()
        }
        _onDisable() {
            this.owner.offAllCaller(this),
            R.stage.offAllCaller(this),
            R.startTimer.clearAll(this),
            R.updateTimer.clearAll(this),
            R.lateTimer.clearAll(this),
            this.onDisable()
        }
        _isScript() {
            return !0
        }
        _onDestroy() {
            this.onDestroy()
        }
        onAwake() {}
        onEnable() {}
        onStart() {}
        onTriggerEnter(t, e, i) {}
        onTriggerStay(t, e, i) {}
        onTriggerExit(t, e, i) {}
        onMouseDown(t) {}
        onMouseUp(t) {}
        onClick(t) {}
        onStageMouseDown(t) {}
        onStageMouseUp(t) {}
        onStageClick(t) {}
        onStageMouseMove(t) {}
        onDoubleClick(t) {}
        onRightClick(t) {}
        onMouseMove(t) {}
        onMouseOver(t) {}
        onMouseOut(t) {}
        onKeyDown(t) {}
        onKeyPress(t) {}
        onKeyUp(t) {}
        onUpdate() {}
        onLateUpdate() {}
        onPreRender() {}
        onPostRender() {}
        onDisable() {}
        onDestroy() {}
    }
    class ki extends _i {
        constructor() {
            super(...arguments),
            this._nodeIDAniDic = {}
        }
        _parseNodeList(t) {
            this._nodeList || (this._nodeList = []),
            this._nodeDefaultProps[t.compId] = t.props,
            t.compId && this._nodeList.push(t.compId);
            var e = t.child;
            if (e)
                for (var i = e.length, s = 0; s < i; s++)
                    this._parseNodeList(e[s])
        }
        _calGraphicData(t) {
            if (this._setUp(null, t),
            this._createGraphicData(),
            this._nodeIDAniDic)
                for (var e in this._nodeIDAniDic)
                    this._nodeIDAniDic[e] = null
        }
        _createGraphicData() {
            for (var t, e = [], i = this.count, s = (s = this._usedFrames) || [], r = 0; r < i; r++)
                !s[r] && t || (t = this._createFrameGraphic(r)),
                e.push(t);
            this._gList = e
        }
        _createFrameGraphic(t) {
            var e = new Se;
            return ki._rootMatrix || (ki._rootMatrix = new y),
            this._updateNodeGraphic(this._rootNode, t, ki._rootMatrix, e),
            e
        }
        _updateNodeGraphic(t, e, i, s, r=1) {
            var a, n = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId]), h = (n.resultTransform || (n.resultTransform = new y),
            a = n.resultTransform,
            y.mul(n.transform, i, a),
            n.alpha * r);
            if (!(h < .01)) {
                n.skin && (i = this._getTextureByUrl(n.skin)) && (a._checkTransform() ? (s.drawTexture(i, 0, 0, n.width, n.height, a, h),
                n.resultTransform = null) : s.drawTexture(i, a.tx, a.ty, n.width, n.height, null, h));
                var o = t.child;
                if (o)
                    for (var l = o.length, _ = 0; _ < l; _++)
                        this._updateNodeGraphic(o[_], e, a, s, h)
            }
        }
        _updateNoChilds(t, e) {
            var i, s;
            !t.skin || (i = this._getTextureByUrl(t.skin)) && ((s = t.transform)._checkTransform(),
            !s._bTransform ? e.drawTexture(i, s.tx, s.ty, t.width, t.height, null, t.alpha) : e.drawTexture(i, 0, 0, t.width, t.height, s.clone(), t.alpha))
        }
        _updateNodeGraphic2(t, e, i) {
            var s = this._nodeGDic[t.compId] = this._getNodeGraphicData(t.compId, e, this._nodeGDic[t.compId]);
            if (t.child) {
                var r, a, n, h = s.transform, o = (h._checkTransform(),
                a = (r = !h._bTransform) && (0 != h.tx || 0 != h.ty),
                (n = h._bTransform || 1 != s.alpha) && i.save(),
                1 != s.alpha && i.alpha(s.alpha),
                r ? a && i.translate(h.tx, h.ty) : i.transform(h.clone()),
                t.child);
                if (s.skin && (t = this._getTextureByUrl(s.skin)) && i.drawImage(t, 0, 0, s.width, s.height),
                o)
                    for (var l = o.length, _ = 0; _ < l; _++)
                        this._updateNodeGraphic2(o[_], e, i);
                n ? i.restore() : r ? a && i.translate(-h.tx, -h.ty) : i.transform(h.clone().invert())
            } else
                this._updateNoChilds(s, i)
        }
        _calculateKeyFrames(t) {
            super._calculateKeyFrames(t),
            this._nodeIDAniDic[t.target] = t
        }
        getNodeDataByID(t) {
            return this._nodeIDAniDic[t]
        }
        _getParams(t, e, i, s) {
            var r = ki._temParam;
            r.length = e.length;
            for (var a = e.length, n = 0; n < a; n++)
                r[n] = this._getObjVar(t, e[n][0], i, e[n][1], s);
            return r
        }
        _getObjVar(t, e, i, s, r) {
            var a;
            return e in t ? (i >= (a = t[e]).length && (i = a.length - 1),
            t[e][i]) : e in r ? r[e] : s
        }
        _getNodeGraphicData(t, e, i) {
            (i = i || new Wi).transform ? i.transform.identity() : i.transform = new y;
            var s = this.getNodeDataByID(t);
            if (!s)
                return i;
            var s = s.frames
              , s = this._getParams(s, ki._drawTextureCmd, e, this._nodeDefaultProps[t])
              , e = s[0]
              , t = s[5]
              , r = s[6]
              , a = s[13]
              , n = s[14]
              , h = s[7]
              , o = s[8]
              , l = s[9]
              , _ = s[11]
              , u = s[12]
              , c = s[3]
              , d = s[4]
              , p = (0 != c && 0 != d || (e = null),
            -1 == c && (c = 0),
            -1 == d && (d = 0),
            i.skin = e,
            i.width = c,
            i.height = d,
            e && ((p = this._getTextureByUrl(e)) ? (c = c || p.sourceWidth,
            d = d || p.sourceHeight) : console.warn("lost skin:", e, ",you may load pics first")),
            i.alpha = s[10],
            i.transform)
              , e = (0 != n && (r = n * d),
            0 == (t = 0 != a ? a * c : t) && 0 == r || p.translate(-t, -r),
            null);
            return (l || 1 !== h || 1 !== o || _ || u) && ((e = ki._tempMt).identity(),
            e._bTransform = !0,
            n = .0174532922222222 * (l - _),
            d = .0174532922222222 * (l + u),
            a = Math.cos(d),
            c = Math.sin(d),
            t = Math.sin(n),
            r = Math.cos(n),
            e.a = h * a,
            e.b = h * c,
            e.c = -o * t,
            e.d = o * r,
            e.tx = e.ty = 0),
            (p = e ? y.mul(p, e, p) : p).translate(s[1], s[2]),
            i
        }
        _getTextureByUrl(t) {
            return U.getRes(t)
        }
        setAniData(t, e=null) {
            if (t.animations) {
                this._nodeDefaultProps = {},
                this._nodeGDic = {},
                this._nodeList && (this._nodeList.length = 0),
                this._rootNode = t,
                this._parseNodeList(t);
                for (var i, s = {}, r = [], a = t.animations, n = a.length, h = 0; h < n; h++)
                    if (i = a[h],
                    this._labels = null,
                    (!e || e == i.name) && i) {
                        try {
                            this._calGraphicData(i)
                        } catch (t) {
                            console.warn("parse animation fail:" + i.name + ",empty animation created"),
                            this._gList = []
                        }
                        var o = {};
                        o.interval = 1e3 / i.frameRate,
                        o.frames = this._gList,
                        o.labels = this._labels,
                        o.name = i.name,
                        r.push(o),
                        s[i.name] = o
                    }
                this.animationList = r,
                this.animationDic = s
            }
            ki._temParam.length = 0
        }
        parseByData(t) {
            var e = t.nodeRoot
              , i = t.aniO;
            delete t.nodeRoot,
            delete t.aniO,
            this._nodeDefaultProps = {},
            this._nodeGDic = {},
            this._nodeList && (this._nodeList.length = 0),
            this._rootNode = e,
            this._parseNodeList(e),
            this._labels = null;
            try {
                this._calGraphicData(i)
            } catch (t) {
                console.warn("parse animation fail:" + i.name + ",empty animation created"),
                this._gList = []
            }
            e = t;
            return e.interval = 1e3 / i.frameRate,
            e.frames = this._gList,
            e.labels = this._labels,
            e.name = i.name,
            e
        }
        setUpAniData(t) {
            if (t.animations) {
                for (var e, i, s = {}, r = [], a = t.animations, n = a.length, h = 0; h < n; h++)
                    (i = a[h]) && ((e = {}).name = i.name,
                    e.aniO = i,
                    e.nodeRoot = t,
                    r.push(e),
                    s[i.name] = e);
                this.animationList = r,
                this.animationDic = s
            }
        }
        _clear() {
            this.animationList = null,
            this.animationDic = null,
            this._gList = null,
            this._nodeGDic = null
        }
        static parseAnimationByData(t) {
            return ki._I || (ki._I = new ki),
            t = ki._I.parseByData(t),
            ki._I._clear(),
            t
        }
        static parseAnimationData(t) {
            return ki._I || (ki._I = new ki),
            ki._I.setUpAniData(t),
            (t = {}).animationList = ki._I.animationList,
            t.animationDic = ki._I.animationDic,
            ki._I._clear(),
            t
        }
    }
    ki._drawTextureCmd = [["skin", null], ["x", 0], ["y", 0], ["width", -1], ["height", -1], ["pivotX", 0], ["pivotY", 0], ["scaleX", 1], ["scaleY", 1], ["rotation", 0], ["alpha", 1], ["skewX", 0], ["skewY", 0], ["anchorX", 0], ["anchorY", 0]],
    ki._temParam = [],
    ki._tempMt = new y;
    class Wi {
        constructor() {
            this.alpha = 1
        }
    }
    class Yi extends oi {
        constructor() {
            super(),
            this._setControlNode(this)
        }
        destroy(t=!0) {
            this.stop(),
            super.destroy(t),
            this._frames = null,
            this._labels = null
        }
        play(t=0, e=!0, i="") {
            i && this._setFramesFromCache(i, !0),
            super.play(t, e, i)
        }
        _setFramesFromCache(t, e=!1) {
            var i;
            return (t = this._url ? this._url + "#" + t : t) && Yi.framesMap[t] ? ((i = Yi.framesMap[t])instanceof Array ? (this._frames = Yi.framesMap[t],
            this._count = this._frames.length) : (i.nodeRoot && (Yi.framesMap[t] = ki.parseAnimationByData(i),
            i = Yi.framesMap[t]),
            this._frames = i.frames,
            this._count = this._frames.length,
            this._frameRateChanged || (this._interval = i.interval),
            this._labels = this._copyLabels(i.labels)),
            !0) : (e && console.log("ani not found:", t),
            !1)
        }
        _copyLabels(t) {
            if (!t)
                return null;
            var e, i = {};
            for (e in t)
                i[e] = S.copyArray([], t[e]);
            return i
        }
        _frameLoop() {
            this._visible && .01 < this._style.alpha && this._frames && super._frameLoop()
        }
        _displayToIndex(t) {
            this._frames && (this.graphics = this._frames[t])
        }
        get frames() {
            return this._frames
        }
        set frames(t) {
            (this._frames = t) && (this._count = t.length,
            this._actionName && this._setFramesFromCache(this._actionName, !0),
            this.index = this._index)
        }
        set source(t) {
            -1 < t.indexOf(".ani") ? this.loadAnimation(t) : -1 < t.indexOf(".json") || -1 < t.indexOf("als") || -1 < t.indexOf("atlas") ? this.loadAtlas(t) : this.loadImages(t.split(","))
        }
        set autoAnimation(t) {
            this.play(0, !0, t)
        }
        set autoPlay(t) {
            t ? this.play() : this.stop()
        }
        clear() {
            return super.clear(),
            this.stop(),
            this.graphics = null,
            this._frames = null,
            this._labels = null,
            this
        }
        loadImages(t, e="") {
            return this._url = "",
            this._setFramesFromCache(e) || (this.frames = Yi.framesMap[e] || Yi.createFrames(t, e)),
            this
        }
        loadAtlas(e, i=null, s="") {
            this._url = "";
            var r = this;
            function t(t) {
                e === t && (r.frames = Yi.framesMap[s] || Yi.createFrames(e, s),
                i && i.run())
            }
            return r._setFramesFromCache(s) || (U.getAtlas(e) ? t(e) : R.loader.load(e, Q.create(null, t, [e]), null, U.ATLAS)),
            this
        }
        loadAnimation(t, e=null, i=null) {
            this._url = t;
            return this._actionName || (this._actionName = ""),
            this._setFramesFromCache(this._actionName) ? (this._setFramesFromCache(this._actionName, !0),
            this.index = 0,
            e && e.run()) : !i || U.getAtlas(i) ? this._loadAnimationData(t, e, i) : R.loader.load(i, Q.create(this, this._loadAnimationData, [t, e, i]), null, U.ATLAS),
            this
        }
        _loadAnimationData(n, h=null, t=null) {
            var o;
            function e(t) {
                if (U.getRes(t)) {
                    if (n === t) {
                        var e;
                        if (Yi.framesMap[n + "#"])
                            o._setFramesFromCache(o._actionName, !0),
                            o.index = 0,
                            o._resumePlay();
                        else {
                            t = ki.parseAnimationData(U.getRes(n));
                            if (!t)
                                return;
                            for (var i, s = t.animationList, r = s.length, a = 0; a < r; a++)
                                e = s[a],
                                Yi.framesMap[n + "#" + e.name] = e,
                                i = i || e;
                            i && (Yi.framesMap[n + "#"] = i,
                            o._setFramesFromCache(o._actionName, !0),
                            o.index = 0),
                            o._resumePlay()
                        }
                        h && h.run()
                    }
                    U.clearRes(n)
                } else
                    Yi.framesMap[n + "#"] && (o._setFramesFromCache(o._actionName, !0),
                    o.index = 0,
                    o._resumePlay(),
                    h && h.run())
            }
            t && !U.getAtlas(t) ? console.warn("atlas load fail:" + t) : (o = this,
            U.getRes(n) ? e(n) : R.loader.load(n, Q.create(null, e, [n]), null, U.JSON))
        }
        static createFrames(t, e) {
            if ("string" == typeof t) {
                var i = U.getAtlas(t);
                if (i && i.length)
                    for (var s = [], r = 0, a = i.length; r < a; r++) {
                        var n = new Se;
                        n.drawImage(U.getRes(i[r]), 0, 0),
                        s.push(n)
                    }
            } else if (t instanceof Array)
                for (s = [],
                r = 0,
                a = t.length; r < a; r++)
                    (n = new Se).loadImage(t[r], 0, 0),
                    s.push(n);
            return e && (Yi.framesMap[e] = s),
            s
        }
        static clearCache(t) {
            var e, i = t + "#";
            for (e in Yi.framesMap)
                e !== t && 0 !== e.indexOf(i) || delete Yi.framesMap[e]
        }
    }
    Yi.framesMap = {},
    R.regClass(Yi),
    F.regClass("laya.display.Animation", Yi),
    F.regClass("Laya.Animation", Yi);
    class Vi extends _i {
        constructor() {
            super(...arguments),
            this._initData = {}
        }
        set target(t) {
            this._target && this._target.off(Vi.EFFECT_BEGIN, this, this._onOtherBegin),
            this._target = t,
            this._target && this._target.on(Vi.EFFECT_BEGIN, this, this._onOtherBegin),
            this._addEvent()
        }
        get target() {
            return this._target
        }
        _onOtherBegin(t) {
            t !== this && this.stop()
        }
        set playEvent(t) {
            (this._playEvent = t) && this._addEvent()
        }
        _addEvent() {
            this._target && this._playEvent && (this._setControlNode(this._target),
            this._target.on(this._playEvent, this, this._onPlayAction))
        }
        _onPlayAction() {
            this.play(0, !1)
        }
        play(t=0, e=!0, i="") {
            this._target && (this._target.event(Vi.EFFECT_BEGIN, [this]),
            this._recordInitData(),
            super.play(t, e, i))
        }
        _recordInitData() {
            if (this._aniKeys)
                for (var t, e = this._aniKeys.length, i = 0; i < e; i++)
                    t = this._aniKeys[i],
                    this._initData[t] = this._target[t]
        }
        set effectClass(t) {
            this._effectClass = F.getClass(t),
            this._effectClass && (t = this._effectClass.uiView) && (t = t.animations) && t[0] && (t = t[0],
            this._setUp({}, t),
            t.nodes && t.nodes[0] && (this._aniKeys = t.nodes[0].keys))
        }
        set effectData(t) {
            t && (t = t.animations) && t[0] && (t = t[0],
            this._setUp({}, t),
            t.nodes && t.nodes[0] && (this._aniKeys = t.nodes[0].keys))
        }
        _displayToIndex(t) {
            if (this._animationData) {
                (t = t < 0 ? 0 : t) > this._count && (t = this._count);
                for (var e = this._animationData.nodes, i = 1 < (i = e.length) ? 1 : i, s = 0; s < i; s++)
                    this._displayNodeToFrame(e[s], t)
            }
        }
        _displayNodeToFrame(t, e, i=0) {
            if (this._target)
                for (var s, r, a, n, h = this._target, o = t.frames, l = t.keys, _ = l.length, u = t.secondFrames, c = 0; c < _; c++)
                    r = o[s = l[c]],
                    a = -1 == (n = u[s]) ? this._initData[s] : e < n ? (a = (n = t.keyframes[s])[0]).tween ? (null == (a = ri[a.tweenMethod]) && (a = ri.linearNone),
                    n = n[1],
                    a(e, this._initData[s], n.value - this._initData[s], n.index)) : this._initData[s] : r.length > e ? r[e] : r[r.length - 1],
                    h[s] = a
        }
        _calculateKeyFrames(t) {
            super._calculateKeyFrames(t);
            var e, i, s = t.keyframes, r = (t.target,
            {});
            for (e in t.secondFrames = r,
            s)
                (i = s[e]).length <= 1 ? r[e] = -1 : r[e] = i[1].index
        }
    }
    Vi.EFFECT_BEGIN = "effectbegin",
    F.regClass("laya.display.EffectAnimation", Vi),
    F.regClass("Laya.EffectAnimation", Vi);
    class Xi extends i {
        constructor() {
            super(),
            this._completeHandler = new Q(this,this.onOneLoadComplete),
            this.reset()
        }
        reset() {
            this._toLoadList = [],
            this._isLoading = !1,
            this.totalCount = 0
        }
        get leftCount() {
            return this._isLoading ? this._toLoadList.length + 1 : this._toLoadList.length
        }
        get loadedCount() {
            return this.totalCount - this.leftCount
        }
        load(t, e=!1, i=!0) {
            if (t instanceof Array)
                for (var s = t.length, r = 0; r < s; r++)
                    this._addToLoadList(t[r], e);
            else
                this._addToLoadList(t, e);
            i && this._checkNext()
        }
        _addToLoadList(t, e=!1) {
            0 <= this._toLoadList.indexOf(t) || U.getRes(t) || (e ? this._toLoadList.push({
                url: t
            }) : this._toLoadList.push(t),
            this.totalCount++)
        }
        _checkNext() {
            var t;
            this._isLoading || (0 == this._toLoadList.length ? this.event(I.COMPLETE) : "string" == typeof (t = this._toLoadList.pop()) ? this.loadOne(t) : this.loadOne(t.url, !0))
        }
        loadOne(t, e=!1) {
            this._curUrl = t;
            var i = S.getFileExtension(this._curUrl);
            e ? R.loader.create(t, this._completeHandler) : Xi.LoadableExtensions[i] ? R.loader.load(t, this._completeHandler, null, Xi.LoadableExtensions[i]) : t != $e.getFileLoadPath(t) || Xi.No3dLoadTypes[i] || !Je.createMap[i] ? R.loader.load(t, this._completeHandler) : R.loader.create(t, this._completeHandler)
        }
        onOneLoadComplete() {
            this._isLoading = !1,
            U.getRes(this._curUrl) || console.log("Fail to load:", this._curUrl);
            var t, e = S.getFileExtension(this._curUrl);
            Xi.LoadableExtensions[e] && (t = (t = U.getRes(this._curUrl)) && t instanceof qe ? t.json : t) && (t.loadList && this.load(t.loadList, !1, !1),
            t.loadList3D && this.load(t.loadList3D, !0, !1)),
            "sk" == e && this.load(this._curUrl.replace(".sk", ".png"), !1, !1),
            this.event(I.PROGRESS, this.getProgress()),
            this._checkNext()
        }
        getProgress() {
            return this.loadedCount / this.totalCount
        }
    }
    Xi.LoadableExtensions = {
        scene: U.JSON,
        scene3d: U.JSON,
        ani: U.JSON,
        ui: U.JSON,
        prefab: U.PREFAB
    },
    Xi.No3dLoadTypes = {
        png: !0,
        jpg: !0,
        txt: !0
    };
    class Hi extends Oe {
        constructor(t=!0) {
            super(),
            this.autoDestroyAtClosed = !1,
            this.url = null,
            this._viewCreated = !1,
            this._idMap = null,
            this._$componentType = "Scene",
            Hi.unDestroyedScenes.push(this),
            this._scene = this,
            t && this.createChildren()
        }
        createChildren() {}
        static setUIMap(t) {
            var e, i = R.loader.getRes(t);
            if (!i)
                throw "请提前加载uimap的json，再使用该接口设置！";
            for (e in i)
                R.Loader.loadedMap[C.formatURL(e + ".scene")] = i[e]
        }
        loadScene(t) {
            var t = -1 < t.indexOf(".") ? t : t + ".scene"
              , e = R.loader.getRes(t);
            e ? this.createView(e) : (this._setBit(B.NOT_READY, !0),
            R.loader.resetProgress(),
            (e = new Xi).on(I.COMPLETE, this, this._onSceneLoaded, [t]),
            e.load(t))
        }
        _onSceneLoaded(t) {
            this.createView(R.Loader.getRes(t))
        }
        createView(t) {
            t && !this._viewCreated && (this._viewCreated = !0,
            ci.createByData(this, t))
        }
        getNodeByID(t) {
            return this._idMap ? this._idMap[t] : null
        }
        open(t=!0, e=null) {
            t && Hi.closeAll(),
            Hi.root.addChild(this),
            this.onOpened(e)
        }
        onOpened(t) {}
        close(t=null) {
            this.onClosed(t),
            this.autoDestroyAtClosed ? this.destroy() : this.removeSelf()
        }
        onClosed(t=0) {}
        destroy(t=!0) {
            this._idMap = null,
            super.destroy(t);
            for (var e = Hi.unDestroyedScenes, i = e.length - 1; -1 < i; i--)
                if (e[i] === this)
                    return void e.splice(i, 1)
        }
        set scaleX(t) {
            super.get_scaleX() != t && (super.set_scaleX(t),
            this.event(I.RESIZE))
        }
        get scaleX() {
            return super.scaleX
        }
        set scaleY(t) {
            super.get_scaleY() != t && (super.set_scaleY(t),
            this.event(I.RESIZE))
        }
        get scaleY() {
            return super.scaleY
        }
        get width() {
            if (this._width)
                return this._width;
            for (var t = 0, e = this.numChildren - 1; -1 < e; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._x + i.width * i.scaleX, t))
            }
            return t
        }
        set width(t) {
            super.get_width() != t && (super.set_width(t),
            this.callLater(this._sizeChanged))
        }
        get height() {
            if (this._height)
                return this._height;
            for (var t = 0, e = this.numChildren - 1; -1 < e; e--) {
                var i = this.getChildAt(e);
                i._visible && (t = Math.max(i._y + i.height * i.scaleY, t))
            }
            return t
        }
        set height(t) {
            super.get_height() != t && (super.set_height(t),
            this.callLater(this._sizeChanged))
        }
        _sizeChanged() {
            this.event(I.RESIZE)
        }
        static get root() {
            return Hi._root || (Hi._root = R.stage.addChild(new Oe),
            Hi._root.name = "root",
            R.stage.on("resize", null, ()=>{
                Hi._root.size(R.stage.width, R.stage.height),
                Hi._root.event(I.RESIZE)
            }
            ),
            Hi._root.size(R.stage.width, R.stage.height),
            Hi._root.event(I.RESIZE)),
            Hi._root
        }
        get timer() {
            return this._timer || R.timer
        }
        set timer(t) {
            this._timer = t
        }
        static load(r, a=null, e=null) {
            R.loader.resetProgress();
            var n = new Xi;
            function h(t) {
                Hi._loadPage && Hi._loadPage.event("progress", t),
                e && e.runWith(t)
            }
            n.on(I.PROGRESS, null, h),
            n.once(I.COMPLETE, null, function() {
                n.off(I.PROGRESS, null, h);
                var t = R.Loader.getRes(r);
                if (!t)
                    throw "Can not find scene:" + r;
                if (!t.props)
                    throw "Scene data is error:" + r;
                var e = t.props.runtime || t.type
                  , i = R.ClassUtils.getClass(e);
                {
                    var s;
                    s = "instance" == t.props.renderType ? i.instance || (i.instance = new i) : new i
                }
                {
                    if (!(s && s instanceof Fe))
                        throw "Can not find scene:" + e;
                    s.url = r,
                    s._viewCreated ? a && a.runWith(s) : (s.on("onViewCreated", null, function() {
                        a && a.runWith(s)
                    }),
                    s.createView(t)),
                    Hi.hideLoadingPage()
                }
            }),
            n.load(r)
        }
        static open(t, e=!0, i=null, s=null, r=null) {
            var a;
            i instanceof Q && (a = s,
            s = i,
            i = a),
            Hi.showLoadingPage(),
            Hi.load(t, Q.create(null, this._onSceneLoaded, [e, s, i]), r)
        }
        static _onSceneLoaded(t, e, i, s) {
            s.open(t, i),
            e && e.runWith(s)
        }
        static close(t, e="") {
            for (var i = !1, s = Hi.unDestroyedScenes, r = 0, a = s.length; r < a; r++) {
                var n = s[r];
                n && n.parent && n.url === t && n.name == e && (n.close(),
                i = !0)
            }
            return i
        }
        static closeAll() {
            for (var t = Hi.root, e = 0, i = t.numChildren; e < i; e++) {
                var s = t.getChildAt(0);
                s instanceof Hi ? s.close() : s.removeSelf()
            }
        }
        static destroy(t, e="") {
            for (var i = !1, s = [].concat(Hi.unDestroyedScenes), r = 0, a = s.length; r < a; r++) {
                var n = s[r];
                n.url !== t || n.name != e || n.destroyed || (n.destroy(),
                i = !0)
            }
            return i
        }
        static gc() {
            J.destroyUnusedResources()
        }
        static setLoadingPage(t) {
            Hi._loadPage != t && (Hi._loadPage = t)
        }
        static showLoadingPage(t=null, e=500) {
            Hi._loadPage && (R.systemTimer.clear(null, Hi._showLoading),
            R.systemTimer.clear(null, Hi._hideLoading),
            R.systemTimer.once(e, null, Hi._showLoading, [t], !1))
        }
        static _showLoading(t) {
            R.stage.addChild(Hi._loadPage),
            Hi._loadPage.onOpened(t)
        }
        static _hideLoading() {
            Hi._loadPage.close()
        }
        static hideLoadingPage(t=500) {
            Hi._loadPage && (R.systemTimer.clear(null, Hi._showLoading),
            R.systemTimer.clear(null, Hi._hideLoading),
            R.systemTimer.once(t, null, Hi._hideLoading))
        }
    }
    Hi.unDestroyedScenes = [],
    R.regClass(Hi),
    F.regClass("laya.display.Scene", Hi),
    F.regClass("Laya.Scene", Hi);
    class zi {
        static create(t) {
            var e = p.getItemByClass("DrawParticleCmd", zi);
            return e._templ = t,
            e
        }
        recover() {
            this._templ = null,
            p.recover("DrawParticleCmd", this)
        }
        run(t, e, i) {
            t.drawParticle(e, i, this._templ)
        }
        get cmdID() {
            return zi.ID
        }
    }
    zi.ID = "DrawParticleCmd";
    class Ki {
        constructor() {}
        paramChanged() {
            _.systemTimer.callLater(this, this.buildFilter)
        }
        buildFilter() {
            this._target && this.addFilter(this._target)
        }
        addFilter(t) {
            var e;
            t && (t.filters ? (e = t.filters).indexOf(this._filter) < 0 && (e.push(this._filter),
            t.filters = S.copyArray([], e)) : t.filters = [this._filter])
        }
        removeFilter(t) {
            t && (t.filters = null)
        }
        set target(t) {
            this._target != t && (this._target = t,
            this.paramChanged())
        }
    }
    class ji {
        render(t, e, i, s, r) {
            var a = ct.create(b.TEXTURE2D, 0);
            this.setShaderInfo(a, r, t.width, t.height),
            e.drawTarget(t, 0, 0, i, s, y.EMPTY.identity(), a)
        }
        setShaderInfo(t, e, i, s) {
            t.defines.add(mt.BLUR);
            ji.blurinfo[0] = i,
            ji.blurinfo[1] = s,
            t.blurInfo = ji.blurinfo,
            i = e.strength / 3,
            s = i * i;
            e.strength_sig2_2sig2_gauss1[0] = e.strength,
            e.strength_sig2_2sig2_gauss1[1] = s,
            e.strength_sig2_2sig2_gauss1[2] = 2 * s,
            e.strength_sig2_2sig2_gauss1[3] = 1 / (2 * Math.PI * s),
            t.strength_sig2_2sig2_gauss1 = e.strength_sig2_2sig2_gauss1
        }
    }
    ji.blurinfo = new Array(2);
    class qi extends mt {
        constructor(t=4) {
            super(),
            this.strength_sig2_2sig2_gauss1 = [],
            this.strength = t,
            this._glRender = new ji
        }
        get type() {
            return mt.BLUR
        }
        getStrenth_sig2_2sig2_native() {
            this.strength_sig2_native || (this.strength_sig2_native = new Float32Array(4));
            var t = this.strength / 3
              , t = t * t;
            return this.strength_sig2_native[0] = this.strength,
            this.strength_sig2_native[1] = t,
            this.strength_sig2_native[2] = 2 * t,
            this.strength_sig2_native[3] = 1 / (2 * Math.PI * t),
            this.strength_sig2_native
        }
    }
    class Zi extends Ki {
        constructor() {
            super(),
            this._strength = 4,
            this._filter = new qi(this.strength)
        }
        buildFilter() {
            this._filter = new qi(this.strength),
            super.buildFilter()
        }
        get strength() {
            return this._strength
        }
        set strength(t) {
            this._strength = t
        }
    }
    F.regClass("laya.effect.BlurFilterSetter", Zi),
    F.regClass("Laya.BlurFilterSetter", Zi);
    class Qi extends Ki {
        constructor() {
            super(),
            this._brightness = 0,
            this._contrast = 0,
            this._saturation = 0,
            this._hue = 0,
            this._red = 0,
            this._green = 0,
            this._blue = 0,
            this._alpha = 0,
            this._filter = new ft
        }
        buildFilter() {
            this._filter.reset(),
            this._filter.color(this.red, this.green, this.blue, this.alpha),
            this._filter.adjustHue(this.hue),
            this._filter.adjustContrast(this.contrast),
            this._filter.adjustBrightness(this.brightness),
            this._filter.adjustSaturation(this.saturation),
            super.buildFilter()
        }
        get brightness() {
            return this._brightness
        }
        set brightness(t) {
            this._brightness = t,
            this.paramChanged()
        }
        get contrast() {
            return this._contrast
        }
        set contrast(t) {
            this._contrast = t,
            this.paramChanged()
        }
        get saturation() {
            return this._saturation
        }
        set saturation(t) {
            this._saturation = t,
            this.paramChanged()
        }
        get hue() {
            return this._hue
        }
        set hue(t) {
            this._hue = t,
            this.paramChanged()
        }
        get red() {
            return this._red
        }
        set red(t) {
            this._red = t,
            this.paramChanged()
        }
        get green() {
            return this._green
        }
        set green(t) {
            this._green = t,
            this.paramChanged()
        }
        get blue() {
            return this._blue
        }
        set blue(t) {
            this._blue = t,
            this.paramChanged()
        }
        get color() {
            return this._color
        }
        set color(t) {
            this._color = t,
            t = gt.create(t),
            this._red = 255 * t.arrColor[0],
            this._green = 255 * t.arrColor[1],
            this._blue = 255 * t.arrColor[2],
            this.paramChanged()
        }
        get alpha() {
            return this._alpha
        }
        set alpha(t) {
            this._alpha = t,
            this.paramChanged()
        }
    }
    F.regClass("laya.effect.ColorFilterSetter", Qi),
    F.regClass("Laya.ColorFilterSetter", Qi);
    class $i extends hi {
        constructor() {
            super(...arguments),
            this.duration = 1e3,
            this.delay = 0,
            this.repeat = 0,
            this.autoDestroyAtComplete = !0
        }
        _onAwake() {
            this.target = this.target || this.owner,
            this.autoDestroyAtComplete && (this._comlete = Q.create(this.target, this.target.destroy, null, !1)),
            this.eventName ? this.owner.on(this.eventName, this, this._exeTween) : this._exeTween()
        }
        _exeTween() {
            this._tween = this._doTween(),
            this._tween.repeat = this.repeat
        }
        _doTween() {
            return null
        }
        onReset() {
            this.duration = 1e3,
            this.delay = 0,
            this.repeat = 0,
            this.ease = null,
            this.target = null,
            this.eventName && (this.owner.off(this.eventName, this, this._exeTween),
            this.eventName = null),
            this._comlete && (this._comlete.recover(),
            this._comlete = null),
            this._tween && (this._tween.clear(),
            this._tween = null)
        }
    }
    class Ji {
        setShaderInfo(t, e, i, s) {
            t.defines.add(s.type);
            t.u_blurInfo1 = s._sv_blurInfo1;
            var r = s._sv_blurInfo2;
            r[0] = e,
            r[1] = i,
            t.u_blurInfo2 = r,
            t.u_color = s.getColor()
        }
        render(t, e, i, s, r) {
            var a = ct.create(b.TEXTURE2D, 0)
              , r = (this.setShaderInfo(a, i, s, r),
            ct.create(b.TEXTURE2D, 0))
              , n = y.TEMP.identity();
            e.drawTarget(t, 0, 0, i, s, n, a),
            e.drawTarget(t, 0, 0, i, s, n, r)
        }
    }
    class ts extends mt {
        constructor(t, e=4, i=6, s=6) {
            super(),
            this._elements = new Float32Array(9),
            this._sv_blurInfo1 = new Array(4),
            this._sv_blurInfo2 = [0, 0, 1, 0],
            this._color = new gt(t),
            this.blur = Math.min(e, 20),
            this.offX = i,
            this.offY = s,
            this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = this.blur,
            this._sv_blurInfo1[2] = i,
            this._sv_blurInfo1[3] = -s,
            this._glRender = new Ji
        }
        get type() {
            return qi.GLOW
        }
        get offY() {
            return this._elements[6]
        }
        set offY(t) {
            this._elements[6] = t,
            this._sv_blurInfo1[3] = -t
        }
        get offX() {
            return this._elements[5]
        }
        set offX(t) {
            this._elements[5] = t,
            this._sv_blurInfo1[2] = t
        }
        getColor() {
            return this._color.arrColor
        }
        get blur() {
            return this._elements[4]
        }
        set blur(t) {
            this._elements[4] = t,
            this._sv_blurInfo1[0] = this._sv_blurInfo1[1] = t
        }
        getColorNative() {
            this._color_native || (this._color_native = new Float32Array(4));
            var t = this.getColor();
            return this._color_native[0] = t[0],
            this._color_native[1] = t[1],
            this._color_native[2] = t[2],
            this._color_native[3] = t[3],
            this._color_native
        }
        getBlurInfo1Native() {
            return this._blurInof1_native || (this._blurInof1_native = new Float32Array(4)),
            this._blurInof1_native[0] = this._blurInof1_native[1] = this.blur,
            this._blurInof1_native[2] = this.offX,
            this._blurInof1_native[3] = this.offY,
            this._blurInof1_native
        }
        getBlurInfo2Native() {
            return this._blurInof2_native || (this._blurInof2_native = new Float32Array(4)),
            this._blurInof2_native[2] = 1,
            this._blurInof2_native
        }
    }
    class es extends Ki {
        constructor() {
            super(),
            this._color = "#ff0000",
            this._blur = 4,
            this._offX = 6,
            this._offY = 6,
            this._filter = new ts(this._color)
        }
        buildFilter() {
            this._filter = new ts(this.color,this.blur,this.offX,this.offY),
            super.buildFilter()
        }
        get color() {
            return this._color
        }
        set color(t) {
            this._color = t,
            this.paramChanged()
        }
        get blur() {
            return this._blur
        }
        set blur(t) {
            this._blur = t,
            this.paramChanged()
        }
        get offX() {
            return this._offX
        }
        set offX(t) {
            this._offX = t,
            this.paramChanged()
        }
        get offY() {
            return this._offY
        }
        set offY(t) {
            this._offY = t,
            this.paramChanged()
        }
    }
    F.regClass("laya.effect.GlowFilterSetter", es),
    F.regClass("Laya.GlowFilterSetter", es);
    class is {
    }
    is.STANDARD = 0,
    is.LEFT = 1,
    is.RIGHT = 2,
    is.NUM_PAD = 3;
    class e {
    }
    e.NUMBER_0 = 48,
    e.NUMBER_1 = 49,
    e.NUMBER_2 = 50,
    e.NUMBER_3 = 51,
    e.NUMBER_4 = 52,
    e.NUMBER_5 = 53,
    e.NUMBER_6 = 54,
    e.NUMBER_7 = 55,
    e.NUMBER_8 = 56,
    e.NUMBER_9 = 57,
    e.A = 65,
    e.B = 66,
    e.C = 67,
    e.D = 68,
    e.E = 69,
    e.F = 70,
    e.G = 71,
    e.H = 72,
    e.I = 73,
    e.J = 74,
    e.K = 75,
    e.L = 76,
    e.M = 77,
    e.N = 78,
    e.O = 79,
    e.P = 80,
    e.Q = 81,
    e.R = 82,
    e.S = 83,
    e.T = 84,
    e.U = 85,
    e.V = 86,
    e.W = 87,
    e.X = 88,
    e.Y = 89,
    e.Z = 90,
    e.F1 = 112,
    e.F2 = 113,
    e.F3 = 114,
    e.F4 = 115,
    e.F5 = 116,
    e.F6 = 117,
    e.F7 = 118,
    e.F8 = 119,
    e.F9 = 120,
    e.F10 = 121,
    e.F11 = 122,
    e.F12 = 123,
    e.F13 = 124,
    e.F14 = 125,
    e.F15 = 126,
    e.NUMPAD = 21,
    e.NUMPAD_0 = 96,
    e.NUMPAD_1 = 97,
    e.NUMPAD_2 = 98,
    e.NUMPAD_3 = 99,
    e.NUMPAD_4 = 100,
    e.NUMPAD_5 = 101,
    e.NUMPAD_6 = 102,
    e.NUMPAD_7 = 103,
    e.NUMPAD_8 = 104,
    e.NUMPAD_9 = 105,
    e.NUMPAD_ADD = 107,
    e.NUMPAD_DECIMAL = 110,
    e.NUMPAD_DIVIDE = 111,
    e.NUMPAD_ENTER = 108,
    e.NUMPAD_MULTIPLY = 106,
    e.NUMPAD_SUBTRACT = 109,
    e.SEMICOLON = 186,
    e.EQUAL = 187,
    e.COMMA = 188,
    e.MINUS = 189,
    e.PERIOD = 190,
    e.SLASH = 191,
    e.BACKQUOTE = 192,
    e.LEFTBRACKET = 219,
    e.BACKSLASH = 220,
    e.RIGHTBRACKET = 221,
    e.QUOTE = 222,
    e.ALTERNATE = 18,
    e.BACKSPACE = 8,
    e.CAPS_LOCK = 20,
    e.COMMAND = 15,
    e.CONTROL = 17,
    e.DELETE = 46,
    e.ENTER = 13,
    e.ESCAPE = 27,
    e.PAGE_UP = 33,
    e.PAGE_DOWN = 34,
    e.END = 35,
    e.HOME = 36,
    e.LEFT = 37,
    e.UP = 38,
    e.RIGHT = 39,
    e.DOWN = 40,
    e.SHIFT = 16,
    e.SPACE = 32,
    e.TAB = 9,
    e.INSERT = 45;
    class r {
        constructor() {}
        static getMCDName(t) {
            return r._typeToNameDic[t]
        }
        static showRenderTypeInfo(t, e=!1) {
            if (e || !r.showedDic[t]) {
                if (r.showedDic[t] = !0,
                !r._rendertypeToStrDic[t]) {
                    for (var i = [], s = 1; s <= t; )
                        s & t && i.push(r.getMCDName(s & t)),
                        s <<= 1;
                    r._rendertypeToStrDic[t] = i.join(",")
                }
                console.log("cmd:", r._rendertypeToStrDic[t])
            }
        }
        static __init__() {
            r._typeToNameDic[x.ALPHA] = "ALPHA",
            r._typeToNameDic[x.TRANSFORM] = "TRANSFORM",
            r._typeToNameDic[x.TEXTURE] = "TEXTURE",
            r._typeToNameDic[x.GRAPHICS] = "GRAPHICS",
            r._typeToNameDic[x.ONECHILD] = "ONECHILD",
            r._typeToNameDic[x.CHILDS] = "CHILDS",
            r._typeToNameDic[x.TRANSFORM | x.ALPHA] = "TRANSFORM|ALPHA",
            r._typeToNameDic[x.CANVAS] = "CANVAS",
            r._typeToNameDic[x.BLEND] = "BLEND",
            r._typeToNameDic[x.FILTERS] = "FILTERS",
            r._typeToNameDic[x.MASK] = "MASK",
            r._typeToNameDic[x.CLIP] = "CLIP",
            r._typeToNameDic[x.LAYAGL3D] = "LAYAGL3D"
        }
        render(t, e, i) {
            r._addType(this._renderType),
            r.showRenderTypeInfo(this._renderType),
            Me.renders[this._renderType]._fun(this, t, e + this._x, i + this._y),
            this._repaint = 0
        }
        _stageRender(t, e, i) {
            r._countStart(),
            r._PreStageRender.call(R.stage, t, e, i),
            r._countEnd()
        }
        static _countStart() {
            for (var t in r._countDic)
                r._countDic[t] = 0
        }
        static _countEnd() {
            r._i++,
            60 < r._i && (r.showCountInfo(),
            r._i = 0)
        }
        static _addType(t) {
            r._countDic[t] ? r._countDic[t] += 1 : r._countDic[t] = 1
        }
        static showCountInfo() {
            for (var t in console.log("==================="),
            r._countDic)
                console.log("count:" + r._countDic[t]),
                r.showRenderTypeInfo(t, !0)
        }
        static enableQuickTest() {
            r.__init__(),
            Oe.prototype.render = r.prototype.render,
            r._PreStageRender = N.prototype.render,
            N.prototype.render = r.prototype._stageRender
        }
    }
    r.showedDic = {},
    r._rendertypeToStrDic = {},
    r._typeToNameDic = {},
    r._countDic = {},
    r._i = 0;
    class ss extends i {
        load(t) {}
        play(t=0, e) {
            return null
        }
        get duration() {
            return 0
        }
        dispose() {}
    }
    class rs extends Oe {
        constructor() {
            super(),
            this.visible = !1,
            this.on(I.ADDED, this, this._onParentChange),
            this.on(I.REMOVED, this, this._onParentChange)
        }
        _onParentChange() {
            this.target = this.parent
        }
        play(t=1, e=null) {
            isNaN(t) && (t = 1),
            this.url && (this.stop(),
            this._channel = o.playSound(this.url, t, e))
        }
        stop() {
            this._channel && !this._channel.isStopped && this._channel.stop(),
            this._channel = null
        }
        _setPlayAction(t, e, i, s=!0) {
            this[i] && t && (s ? t.on(e, this, this[i]) : t.off(e, this, this[i]))
        }
        _setPlayActions(t, e, i, s=!0) {
            if (t && e)
                for (var r = e.split(","), a = r.length, n = 0; n < a; n++)
                    this._setPlayAction(t, r[n], i, s)
        }
        set playEvent(t) {
            (this._playEvents = t) && this._tar && this._setPlayActions(this._tar, t, "play")
        }
        set target(t) {
            this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !1),
            this._setPlayActions(this._tar, this._stopEvents, "stop", !1)),
            this._tar = t,
            this._tar && (this._setPlayActions(this._tar, this._playEvents, "play", !0),
            this._setPlayActions(this._tar, this._stopEvents, "stop", !0))
        }
        set stopEvent(t) {
            (this._stopEvents = t) && this._tar && this._setPlayActions(this._tar, t, "stop")
        }
    }
    F.regClass("laya.media.SoundNode", rs),
    F.regClass("Laya.SoundNode", rs);
    class as {
        static enable(t, e, i=2) {
            as.type = i,
            R.loader.load(t, Q.create(null, as.onManifestLoaded, [e]), null, U.JSON)
        }
        static onManifestLoaded(t, e) {
            as.manifest = e,
            C.customFormat = as.addVersionPrefix,
            t.run(),
            e || console.warn("资源版本清单文件不存在，不使用资源版本管理。忽略ERR_FILE_NOT_FOUND错误。")
        }
        static addVersionPrefix(t) {
            return as.manifest && as.manifest[t] ? as.type == as.FILENAME_VERSION ? as.manifest[t] : as.manifest[t] + "/" + t : t
        }
    }
    as.FOLDER_VERSION = 1,
    as.FILENAME_VERSION = 2,
    as.type = as.FOLDER_VERSION;
    class ns extends i {
        constructor(t=null, e=0, i=null, s=null) {
            super(),
            this.disableInput = !1,
            this.protocols = [],
            this._byteClass = i || it,
            this.protocols = s,
            this.endian = ns.BIG_ENDIAN,
            t && 0 < e && e < 65535 && this.connect(t, e)
        }
        get input() {
            return this._input
        }
        get output() {
            return this._output
        }
        get connected() {
            return this._connected
        }
        get endian() {
            return this._endian
        }
        set endian(t) {
            this._endian = t,
            null != this._input && (this._input.endian = t),
            null != this._output && (this._output.endian = t)
        }
        connect(t, e) {
            this.connectByUrl("ws://" + t + ":" + e)
        }
        connectByUrl(t) {
            null != this._socket && this.close(),
            this._socket && this.cleanSocket(),
            this.protocols && 0 != this.protocols.length ? this._socket = new P.window.WebSocket(t,this.protocols) : this._socket = new P.window.WebSocket(t),
            this._socket.binaryType = "arraybuffer",
            this._output = new this._byteClass,
            this._output.endian = this.endian,
            this._input = new this._byteClass,
            this._input.endian = this.endian,
            this._addInputPosition = 0,
            this._socket.onopen = t=>{
                this._onOpen(t)
            }
            ,
            this._socket.onmessage = t=>{
                this._onMessage(t)
            }
            ,
            this._socket.onclose = t=>{
                this._onClose(t)
            }
            ,
            this._socket.onerror = t=>{
                this._onError(t)
            }
        }
        cleanSocket() {
            this.close(),
            this._connected = !1,
            this._socket.onopen = null,
            this._socket.onmessage = null,
            this._socket.onclose = null,
            this._socket.onerror = null,
            this._socket = null
        }
        close() {
            if (null != this._socket)
                try {
                    this._socket.close()
                } catch (t) {}
        }
        _onOpen(t) {
            this._connected = !0,
            this.event(I.OPEN, t)
        }
        _onMessage(t) {
            var e;
            t && t.data && (t = t.data,
            this.disableInput && t || (0 < this._input.length && this._input.bytesAvailable < 1 && (this._input.clear(),
            this._addInputPosition = 0),
            e = this._input.pos,
            this._addInputPosition || (this._addInputPosition = 0),
            this._input.pos = this._addInputPosition,
            t && ("string" == typeof t ? this._input.writeUTFBytes(t) : this._input.writeArrayBuffer(t),
            this._addInputPosition = this._input.pos,
            this._input.pos = e)),
            this.event(I.MESSAGE, t))
        }
        _onClose(t) {
            this._connected = !1,
            this.event(I.CLOSE, t)
        }
        _onError(t) {
            this.event(I.ERROR, t)
        }
        send(t) {
            this._socket.send(t)
        }
        flush() {
            if (this._output && 0 < this._output.length) {
                var e;
                try {
                    this._socket && this._socket.send(this._output.__getBuffer().slice(0, this._output.length))
                } catch (t) {
                    e = t
                }
                this._output.endian = this.endian,
                this._output.clear(),
                e && this.event(I.ERROR, e)
            }
        }
    }
    ns.LITTLE_ENDIAN = "littleEndian",
    ns.BIG_ENDIAN = "bigEndian",
    (Di = v.TextureDecodeFormat || (v.TextureDecodeFormat = {}))[Di.Normal = 0] = "Normal",
    Di[Di.RGBM = 1] = "RGBM";
    class hs extends et {
        constructor() {
            var t = d.instance;
            super(t.RGB, !1),
            this._glTextureType = t.TEXTURE_2D,
            this._width = 1,
            this._height = 1,
            this._wrapModeU = this._wrapModeV = v.WarpMode.Clamp,
            this._filterMode = v.FilterMode.Bilinear,
            this._setWarpMode(t.TEXTURE_WRAP_S, this._wrapModeU),
            this._setWarpMode(t.TEXTURE_WRAP_T, this._wrapModeV),
            this._setFilterMode(this._filterMode),
            this._needUpdate = !1,
            this._readyed = !0,
            hs._videoTexturePool.push(this)
        }
        static _update() {
            for (var t = hs._videoTexturePool, e = 0, i = t.length; e < i; e++) {
                var s = t[e];
                s && s._updateVideoData()
            }
        }
        get video() {
            return this._video
        }
        set video(t) {
            t && t instanceof HTMLVideoElement && (this._video = t,
            _.Browser.onMobile && (this._video["x5-playsInline"] = !0,
            this._video["x5-playsinline"] = !0,
            this._video.x5PlaysInline = !0,
            this._video.playsInline = !0,
            this._video["webkit-playsInline"] = !0,
            this._video["webkit-playsinline"] = !0,
            this._video.webkitPlaysInline = !0,
            this._video.playsinline = !0,
            this._video.style.playsInline = !0,
            this._video.crossOrigin = "anonymous",
            this._video.setAttribute("crossorigin", "anonymous"),
            this._video.setAttribute("playsinline", "true"),
            this._video.setAttribute("x5-playsinline", "true"),
            this._video.setAttribute("webkit-playsinline", "true"),
            this._video.autoplay = !0))
        }
        _updateVideoData() {
            var t;
            this._video && this._needUpdate && (t = d.instance,
            m.bindTexture(t, this._glTextureType, this._glTexture),
            t.texImage2D(this._glTextureType, 0, t.RGB, t.RGB, t.UNSIGNED_BYTE, this._video))
        }
        videoPlay() {
            this._video.play(),
            this._needUpdate = !0
        }
        videoPause() {
            this._video.pause(),
            this._needUpdate = !1
        }
        destroy() {
            super.destroy(),
            this._video = null
        }
    }
    hs._videoTexturePool = new Array;
    class os {
        constructor() {
            this.reset()
        }
        setData(t, e, i, s) {
            return this.char = t,
            this.charNum = t.charCodeAt(0),
            this.x = this.y = 0,
            this.width = e,
            this.height = i,
            this.style = s,
            this.isWord = !os._isWordRegExp.test(t),
            this
        }
        reset() {
            return this.x = this.y = this.width = this.height = 0,
            this.isWord = !1,
            this.char = null,
            this.charNum = 0,
            this.style = null,
            this
        }
        recover() {
            p.recover("HTMLChar", this.reset())
        }
        static create() {
            return p.getItemByClass("HTMLChar", os)
        }
        _isChar() {
            return !0
        }
        _getCSSStyle() {
            return this.style
        }
    }
    os._isWordRegExp = new RegExp("[\\w.]","");
    class ls {
        static enable() {
            ls._logdiv || (ls._logdiv = P.createElement("div"),
            ls._logdiv.style.cssText = "border:white;padding:4px;overflow-y:auto;z-index:1000000;background:rgba(100,100,100,0.6);color:white;position: absolute;left:0px;top:0px;width:50%;height:50%;",
            P.document.body.appendChild(ls._logdiv),
            ls._btn = P.createElement("button"),
            ls._btn.innerText = "Hide",
            ls._btn.style.cssText = "z-index:1000001;position: absolute;left:10px;top:10px;",
            ls._btn.onclick = ls.toggle,
            P.document.body.appendChild(ls._btn))
        }
        static toggle() {
            var t = ls._logdiv.style;
            "" === t.display ? (ls._btn.innerText = "Show",
            t.display = "none") : (ls._btn.innerText = "Hide",
            t.display = "")
        }
        static print(t) {
            ls._logdiv && (ls._count >= ls.maxCount && ls.clear(),
            ls._count++,
            ls._logdiv.innerText += t + "\n",
            ls.autoScrollToBottom && ls._logdiv.scrollHeight - ls._logdiv.scrollTop - ls._logdiv.clientHeight < 50 && (ls._logdiv.scrollTop = ls._logdiv.scrollHeight))
        }
        static clear() {
            ls._logdiv.innerText = "",
            ls._count = 0
        }
    }
    ls._count = 0,
    ls.maxCount = 50,
    ls.autoScrollToBottom = !0;
    class _s {
        constructor(t, e, i, s) {
            this.scale = 1,
            this.datas = new Array(300),
            this.datapos = 0,
            this.id = t,
            this.color = e,
            this.name = i,
            this.scale = s
        }
        addData(t) {
            this.datas[this.datapos] = t,
            this.datapos++,
            this.datapos %= 300
        }
    }
    class us extends Oe {
        constructor() {
            super(),
            this.datas = [],
            this.xdata = new Array(us.DATANUM),
            this.ydata = new Array(us.DATANUM),
            this.hud_width = 800,
            this.hud_height = 200,
            this.gMinV = 0,
            this.gMaxV = 100,
            this.textSpace = 40,
            this.sttm = 0,
            (us.inst = this)._renderType |= x.CUSTOM,
            this._setRenderType(this._renderType),
            this._setCustomRender(),
            this.addDataDef(0, 16777215, "frame", 1),
            this.addDataDef(1, 65280, "update", 1),
            this.addDataDef(2, 16711680, "flush", 1),
            us._now = performance ? performance.now.bind(performance) : Date.now
        }
        now() {
            return us._now()
        }
        start() {
            this.sttm = us._now()
        }
        end(t) {
            var e = us._now() - this.sttm;
            this.updateValue(t, e)
        }
        config(t, e) {
            this.hud_width = t,
            this.hud_height = e
        }
        addDataDef(t, e, i, s) {
            this.datas[t] = new _s(t,e,i,s)
        }
        updateValue(t, e) {
            this.datas[t].addData(e)
        }
        v2y(t) {
            this._y,
            this.hud_height,
            this.gMinV,
            this.gMaxV;
            return this._y + this.hud_height * (1 - (t - this.gMinV) / this.gMaxV)
        }
        drawHLine(t, e, i, s) {
            var r = this._x
              , e = (this._x,
            this.hud_width,
            this.v2y(e));
            t.fillText(s, r, e - 6, null, "green", null),
            r += this.textSpace,
            t.fillStyle = i,
            t.fillRect(r, e, this._x + this.hud_width, 1, null)
        }
        customRender(t, e, i) {
            var s = performance.now();
            us._lastTm <= 0 && (us._lastTm = s),
            this.updateValue(0, s - us._lastTm),
            us._lastTm = s,
            t.save(),
            t.fillRect(this._x, this._y, this.hud_width, this.hud_height + 4, "#000000cc"),
            t.globalAlpha = .9,
            this.drawHLine(t, 0, "green", "    0"),
            this.drawHLine(t, 10, "green", "  10"),
            this.drawHLine(t, 16.667, "red", " "),
            this.drawHLine(t, 20, "green", "50|20"),
            this.drawHLine(t, 33.334, "yellow", ""),
            this.drawHLine(t, 16.667 * 3, "yellow", ""),
            this.drawHLine(t, 66.668, "yellow", ""),
            this.drawHLine(t, 50, "green", "20|50"),
            this.drawHLine(t, 100, "green", "10|100");
            for (var r = 0, a = this.datas.length; r < a; r++) {
                var n = this.datas[r];
                if (n) {
                    var h = n.datas.length
                      , o = (this.hud_width - this.textSpace) / h
                      , l = n.datapos
                      , _ = this._x + this.textSpace;
                    t.fillStyle = n.color;
                    for (var u = h; l < u; l++) {
                        var c = this.v2y(n.datas[l] * n.scale);
                        t.fillRect(_, c, o, this.hud_height + this._y - c, null),
                        _ += o
                    }
                    for (l = 0; l < n.datapos; l++)
                        c = this.v2y(n.datas[l] * n.scale),
                        t.fillRect(_, c, o, this.hud_height + this._y - c, null),
                        _ += o
                }
            }
            t.restore()
        }
    }
    us._lastTm = 0,
    us._now = null,
    us.DATANUM = 300,
    us.drawTexTm = 0;
    class cs extends i {
        constructor() {
            super(...arguments),
            this._tweenDic = {},
            this._tweenDataList = [],
            this._currTime = 0,
            this._lastTime = 0,
            this._startTime = 0,
            this._index = 0,
            this._gidIndex = 0,
            this._firstTweenDic = {},
            this._startTimeSort = !1,
            this._endTimeSort = !1,
            this._loopKey = !1,
            this.scale = 1,
            this._frameRate = 60,
            this._frameIndex = 0,
            this._total = 0
        }
        static to(t, e, i, s=null, r=0) {
            return (new cs).to(t, e, i, s, r)
        }
        static from(t, e, i, s=null, r=0) {
            return (new cs).from(t, e, i, s, r)
        }
        to(t, e, i, s=null, r=0) {
            return this._create(t, e, i, s, r, !0)
        }
        from(t, e, i, s=null, r=0) {
            return this._create(t, e, i, s, r, !1)
        }
        _create(t, e, i, s, r, a) {
            var n = p.getItemByClass("tweenData", ds);
            return n.isTo = a,
            n.type = 0,
            n.target = t,
            n.duration = i,
            n.data = e,
            n.startTime = this._startTime + r,
            n.endTime = n.startTime + n.duration,
            n.ease = s,
            this._startTime = Math.max(n.endTime, this._startTime),
            this._tweenDataList.push(n),
            this._startTimeSort = !0,
            this._endTimeSort = !0,
            this
        }
        addLabel(t, e) {
            var i = p.getItemByClass("tweenData", ds);
            return i.type = 1,
            i.data = t,
            i.endTime = i.startTime = this._startTime + e,
            this._labelDic || (this._labelDic = {}),
            this._labelDic[t] = i,
            this._tweenDataList.push(i),
            this
        }
        removeLabel(t) {
            var e;
            this._labelDic && this._labelDic[t] && ((e = this._labelDic[t]) && -1 < (e = this._tweenDataList.indexOf(e)) && this._tweenDataList.splice(e, 1),
            delete this._labelDic[t])
        }
        gotoTime(t) {
            if (null != this._tweenDataList && 0 != this._tweenDataList.length) {
                var e, i, s, r, a;
                for (s in this._firstTweenDic)
                    if (i = this._firstTweenDic[s])
                        for (var n in i)
                            n in i.diyTarget && (i.diyTarget[n] = i[n]);
                for (s in this._tweenDic)
                    (e = this._tweenDic[s]).clear(),
                    delete this._tweenDic[s];
                this._index = 0,
                this._gidIndex = 0,
                this._currTime = t,
                this._lastTime = P.now(),
                null == this._endTweenDataList || this._endTimeSort ? (this._endTimeSort = !1,
                this._endTweenDataList = r = this._tweenDataList.concat(),
                r.sort(function(t, e) {
                    return t.endTime > e.endTime ? 1 : t.endTime < e.endTime ? -1 : 0
                })) : r = this._endTweenDataList;
                for (var h = 0, o = r.length; h < o; h++)
                    if (0 == (a = r[h]).type) {
                        if (!(t >= a.endTime))
                            break;
                        this._index = Math.max(this._index, h + 1);
                        var l = a.data;
                        if (a.isTo)
                            for (var _ in l)
                                a.target[_] = l[_]
                    }
                for (h = 0,
                o = this._tweenDataList.length; h < o; h++)
                    0 == (a = this._tweenDataList[h]).type && t >= a.startTime && t < a.endTime && (this._index = Math.max(this._index, h + 1),
                    this._gidIndex++,
                    (e = p.getItemByClass("tween", ai))._create(a.target, a.data, a.duration, a.ease, Q.create(this, this._animComplete, [this._gidIndex]), 0, !1, a.isTo, !0, !1),
                    e.setStartTime(this._currTime - (t - a.startTime)),
                    e._updateEase(this._currTime),
                    e.gid = this._gidIndex,
                    this._tweenDic[this._gidIndex] = e)
            }
        }
        gotoLabel(t) {
            null != this._labelDic && (t = this._labelDic[t]) && this.gotoTime(t.startTime)
        }
        pause() {
            R.timer.clear(this, this._update)
        }
        resume() {
            this.play(this._currTime, this._loopKey)
        }
        play(t=0, e=!1) {
            if (this._tweenDataList) {
                if (this._startTimeSort) {
                    this._startTimeSort = !1,
                    this._tweenDataList.sort(function(t, e) {
                        return t.startTime > e.startTime ? 1 : t.startTime < e.startTime ? -1 : 0
                    });
                    for (var i = 0, s = this._tweenDataList.length; i < s; i++) {
                        var r = this._tweenDataList[i];
                        if (null != r && 0 == r.type) {
                            var a, n = r.target, h = n.$_GID || (n.$_GID = S.getGID()), o = null;
                            for (a in null == this._firstTweenDic[h] ? ((o = {}).diyTarget = n,
                            this._firstTweenDic[h] = o) : o = this._firstTweenDic[h],
                            r.data)
                                null == o[a] && (o[a] = n[a])
                        }
                    }
                }
                "string" == typeof t ? this.gotoLabel(t) : this.gotoTime(t),
                this._loopKey = e,
                this._lastTime = P.now(),
                R.timer.frameLoop(1, this, this._update)
            }
        }
        _update() {
            if (this._currTime >= this._startTime) {
                if (!this._loopKey) {
                    for (var t in this._tweenDic)
                        (e = this._tweenDic[t]).complete();
                    return this.pause(),
                    void this._complete()
                }
                if (this._complete(),
                !this._tweenDataList)
                    return;
                this.gotoTime(0)
            }
            var e, i = P.now(), s = i - this._lastTime, r = this._currTime += s * this.scale;
            for (t in this._lastTime = i,
            this._tweenDic)
                (e = this._tweenDic[t])._updateEase(r);
            0 != this._tweenDataList.length && this._index < this._tweenDataList.length && (r >= (s = this._tweenDataList[this._index]).startTime && (this._index++,
            0 == s.type ? (this._gidIndex++,
            (e = p.getItemByClass("tween", ai))._create(s.target, s.data, s.duration, s.ease, Q.create(this, this._animComplete, [this._gidIndex]), 0, !1, s.isTo, !0, !1),
            e.setStartTime(r),
            e.gid = this._gidIndex,
            (this._tweenDic[this._gidIndex] = e)._updateEase(r)) : this.event(I.LABEL, s.data)))
        }
        _animComplete(t) {
            this._tweenDic[t] && delete this._tweenDic[t]
        }
        _complete() {
            this.event(I.COMPLETE)
        }
        get index() {
            return this._frameIndex
        }
        set index(t) {
            this._frameIndex = t,
            this.gotoTime(this._frameIndex / this._frameRate * 1e3)
        }
        get total() {
            return this._total = Math.floor(this._startTime / 1e3 * this._frameRate),
            this._total
        }
        reset() {
            if (this._labelDic)
                for (var t in this._labelDic)
                    delete this._labelDic[t];
            for (t in this._tweenDic)
                this._tweenDic[t].clear(),
                delete this._tweenDic[t];
            for (t in this._firstTweenDic)
                delete this._firstTweenDic[t];
            if (this._endTweenDataList = null,
            this._tweenDataList && this._tweenDataList.length)
                for (var e = this._tweenDataList.length, i = 0; i < e; i++)
                    this._tweenDataList[i] && this._tweenDataList[i].destroy();
            this._tweenDataList.length = 0,
            this._currTime = 0,
            this._lastTime = 0,
            this._startTime = 0,
            this._index = 0,
            this._gidIndex = 0,
            this.scale = 1,
            R.timer.clear(this, this._update)
        }
        destroy() {
            this.reset(),
            this._labelDic = null,
            this._tweenDic = null,
            this._tweenDataList = null,
            this._firstTweenDic = null
        }
    }
    class ds {
        constructor() {
            this.type = 0,
            this.isTo = !0
        }
        destroy() {
            this.target = null,
            this.ease = null,
            this.data = null,
            this.isTo = !0,
            this.type = 0,
            p.recover("tweenData", this)
        }
    }
    class ps {
        characterMapContains(t) {
            for (var e = 0; e < ps.charsMap.length; ++e)
                if (ps.charsMap[e][0] === t)
                    return !0;
            return !1
        }
        getCharRep(t) {
            for (var e = 0; e < ps.charsMap.length; ++e)
                if (ps.charsMap[e][0] === t)
                    return ps.charsMap[e];
            return !1
        }
        getCombCharRep(t, e) {
            for (var i = 0; i < ps.combCharsMap.length; ++i)
                if (ps.combCharsMap[i][0][0] === t && ps.combCharsMap[i][0][1] === e)
                    return ps.combCharsMap[i];
            return !1
        }
        isTransparent(t) {
            for (var e = 0; e < ps.transChars.length; ++e)
                if (ps.transChars[e] === t)
                    return !0;
            return !1
        }
        getOriginalCharsFromCode(t) {
            for (var e = 0; e < ps.charsMap.length; ++e)
                if (-1 < ps.charsMap[e].indexOf(t))
                    return String.fromCharCode(ps.charsMap[e][0]);
            for (e = 0; e < ps.combCharsMap.length; ++e)
                if (-1 < ps.combCharsMap[e].indexOf(t))
                    return String.fromCharCode(ps.combCharsMap[e][0][0]) + String.fromCharCode(ps.combCharsMap[e][0][1]);
            return String.fromCharCode(t)
        }
        convertArabic(t) {
            for (var e, i = "", s = 0; s < t.length; ++s) {
                var r = t.charCodeAt(s);
                if (this.characterMapContains(r)) {
                    for (var a = null, n = null, h = s - 1, o = s + 1; 0 <= h && this.isTransparent(t.charCodeAt(h)); --h)
                        ;
                    for ((e = !!(a = 0 <= h ? t.charCodeAt(h) : null) && this.getCharRep(a)) && (null != e[2] || null != e[3]) || (a = null); o < t.length && this.isTransparent(t.charCodeAt(o)); ++o)
                        ;
                    (e = !!(n = o < t.length ? t.charCodeAt(o) : null) && this.getCharRep(n)) && (null != e[3] || null != e[4]) || (n = null),
                    1604 !== r || null == n || 1570 !== n && 1571 !== n && 1573 !== n && 1575 !== n ? (e = this.getCharRep(r),
                    null != a && null != n && null != e[3] ? i += String.fromCharCode(e[3]) : null != a && null != e[4] ? i += String.fromCharCode(e[4]) : null != n && null != e[2] ? i += String.fromCharCode(e[2]) : i += String.fromCharCode(e[1])) : (e = this.getCombCharRep(r, n),
                    i += null != a ? String.fromCharCode(e[4]) : String.fromCharCode(e[1]),
                    ++s)
                } else
                    i += String.fromCharCode(r)
            }
            return i
        }
        convertArabicBack(t) {
            for (var e, i = "", s = 0; s < t.length; ++s)
                e = t.charCodeAt(s),
                i += this.getOriginalCharsFromCode(e);
            return i
        }
    }
    ps.charsMap = [[1569, 65152, null, null, null], [1570, 65153, null, null, 65154], [1571, 65155, null, null, 65156], [1572, 65157, null, null, 65158], [1573, 65159, null, null, 65160], [1574, 65161, 65163, 65164, 65162], [1575, 65165, null, null, 65166], [1576, 65167, 65169, 65170, 65168], [1577, 65171, null, null, 65172], [1578, 65173, 65175, 65176, 65174], [1579, 65177, 65179, 65180, 65178], [1580, 65181, 65183, 65184, 65182], [1581, 65185, 65187, 65188, 65186], [1582, 65189, 65191, 65192, 65190], [1583, 65193, null, null, 65194], [1584, 65195, null, null, 65196], [1585, 65197, null, null, 65198], [1586, 65199, null, null, 65200], [1587, 65201, 65203, 65204, 65202], [1588, 65205, 65207, 65208, 65206], [1589, 65209, 65211, 65212, 65210], [1590, 65213, 65215, 65216, 65214], [1591, 65217, 65219, 65220, 65218], [1592, 65221, 65223, 65224, 65222], [1593, 65225, 65227, 65228, 65226], [1594, 65229, 65231, 65232, 65230], [1600, 1600, 1600, 1600, 1600], [1601, 65233, 65235, 65236, 65234], [1602, 65237, 65239, 65240, 65238], [1603, 65241, 65243, 65244, 65242], [1604, 65245, 65247, 65248, 65246], [1605, 65249, 65251, 65252, 65250], [1606, 65253, 65255, 65256, 65254], [1607, 65257, 65259, 65260, 65258], [1608, 65261, null, null, 65262], [1609, 65263, null, null, 65264], [1610, 65265, 65267, 65268, 65266], [1662, 64342, 64344, 64345, 64343], [1740, 64508, 64510, 64511, 64509], [1670, 64378, 64380, 64381, 64379], [1705, 64398, 64400, 64401, 64399], [1711, 64402, 64404, 64405, 64403], [1688, 64394, null, null, 64395]],
    ps.combCharsMap = [[[1604, 1570], 65269, null, null, 65270], [[1604, 1571], 65271, null, null, 65272], [[1604, 1573], 65273, null, null, 65274], [[1604, 1575], 65275, null, null, 65276]],
    ps.transChars = [1552, 1554, 1555, 1556, 1557, 1611, 1612, 1613, 1614, 1615, 1616, 1617, 1618, 1619, 1620, 1621, 1622, 1623, 1624, 1648, 1750, 1751, 1752, 1753, 1754, 1755, 1756, 1759, 1760, 1761, 1762, 1763, 1764, 1767, 1768, 1770, 1771, 1772, 1773];
    class ms {
        static ArrayMul(t, e, i) {
            if (t)
                if (e)
                    for (var s, r, a, n, h = 0; h < 4; h++)
                        s = t[h],
                        r = t[h + 4],
                        a = t[h + 8],
                        n = t[h + 12],
                        i[h] = s * e[0] + r * e[1] + a * e[2] + n * e[3],
                        i[h + 4] = s * e[4] + r * e[5] + a * e[6] + n * e[7],
                        i[h + 8] = s * e[8] + r * e[9] + a * e[10] + n * e[11],
                        i[h + 12] = s * e[12] + r * e[13] + a * e[14] + n * e[15];
                else
                    ms.copyArray(t, i);
            else
                ms.copyArray(e, i)
        }
        static copyArray(t, e) {
            if (t && e)
                for (var i = 0; i < t.length; i++)
                    e[i] = t[i]
        }
    }
    return v.AlphaCmd = G,
    v.Animation = Yi,
    v.AnimationBase = oi,
    v.ArabicReshaper = ps,
    v.AtlasGrid = ie,
    v.AtlasInfoManager = $e,
    v.AudioSound = Ke,
    v.AudioSoundChannel = ze,
    v.BasePoly = jt,
    v.BaseShader = at,
    v.BaseTexture = et,
    v.Bezier = At,
    v.Bitmap = tt,
    v.BitmapFont = Ze,
    v.BlendMode = A,
    v.BlurFilter = qi,
    v.BlurFilterGLRender = ji,
    v.BlurFilterSetter = Zi,
    v.BoundsStyle = De,
    v.Browser = P,
    v.Buffer = Ot,
    v.Buffer2D = Ut,
    v.BufferState2D = Ft,
    v.BufferStateBase = Bt,
    v.ButtonEffect = class {
        constructor() {
            this._curState = 0,
            this.effectScale = 1.5,
            this.tweenTime = 300
        }
        set target(t) {
            (this._tar = t).on(I.MOUSE_DOWN, this, this.toChangedState),
            t.on(I.MOUSE_UP, this, this.toInitState),
            t.on(I.MOUSE_OUT, this, this.toInitState)
        }
        toChangedState() {
            this._curState = 1,
            this._curTween && ai.clear(this._curTween),
            this._curTween = ai.to(this._tar, {
                scaleX: this.effectScale,
                scaleY: this.effectScale
            }, this.tweenTime, ri[this.effectEase], Q.create(this, this.tweenComplete))
        }
        toInitState() {
            2 != this._curState && (this._curTween && ai.clear(this._curTween),
            this._curState = 2,
            this._curTween = ai.to(this._tar, {
                scaleX: 1,
                scaleY: 1
            }, this.tweenTime, ri[this.backEase], Q.create(this, this.tweenComplete)))
        }
        tweenComplete() {
            this._curState = 0,
            this._curTween = null
        }
    }
    ,
    v.Byte = it,
    v.CONST3D2D = Zt,
    v.CacheManger = Ae,
    v.CacheStyle = Le,
    v.CallLater = ke,
    v.CharRenderInfo = oe,
    v.CharRender_Canvas = _e,
    v.CharRender_Native = ue,
    v.CharSubmitCache = ee,
    v.ClassUtils = F,
    v.ClipRectCmd = Ee,
    v.ColorFilter = ft,
    v.ColorFilterSetter = Qi,
    v.ColorUtils = gt,
    v.CommandEncoder = class {
        constructor(t, e, i, s) {
            this._idata = []
        }
        getArrayData() {
            return this._idata
        }
        getPtrID() {
            return 0
        }
        beginEncoding() {}
        endEncoding() {}
        clearEncoding() {
            this._idata.length = 0
        }
        getCount() {
            return this._idata.length
        }
        add_ShaderValue(t) {
            this._idata.push(t)
        }
        addShaderUniform(t) {
            this.add_ShaderValue(t)
        }
    }
    ,
    v.CommonScript = Ui,
    v.Component = hi,
    v.Config = n,
    v.Const = B,
    v.Context = L,
    v.Dragging = ni,
    v.Draw9GridTexture = ve,
    v.DrawCircleCmd = k,
    v.DrawCurvesCmd = W,
    v.DrawImageCmd = Y,
    v.DrawLineCmd = V,
    v.DrawLinesCmd = X,
    v.DrawParticleCmd = zi,
    v.DrawPathCmd = H,
    v.DrawPieCmd = z,
    v.DrawPolyCmd = K,
    v.DrawRectCmd = j,
    v.DrawStyle = St,
    v.DrawTextureCmd = Tt,
    v.DrawTexturesCmd = Ce,
    v.DrawTrianglesCmd = xe,
    v.Earcut = M,
    v.EarcutNode = qt,
    v.Ease = ri,
    v.EffectAnimation = Vi,
    v.EffectBase = $i,
    v.Event = I,
    v.EventDispatcher = i,
    v.FadeIn = class extends $i {
        _doTween() {
            return this.target.alpha = 0,
            ai.to(this.target, {
                alpha: 1
            }, this.duration, ri[this.ease], this._comlete, this.delay)
        }
    }
    ,
    v.FadeOut = class extends $i {
        _doTween() {
            return this.target.alpha = 1,
            ai.to(this.target, {
                alpha: 0
            }, this.duration, ri[this.ease], this._comlete, this.delay)
        }
    }
    ,
    v.FillTextCmd = Re,
    v.FillTextureCmd = xt,
    v.Filter = mt,
    v.FilterSetterBase = Ki,
    v.FontInfo = ne,
    v.FrameAnimation = _i,
    v.GlowFilter = ts,
    v.GlowFilterGLRender = Ji,
    v.GlowFilterSetter = es,
    v.GrahamScan = bt,
    v.GraphicAnimation = ki,
    v.Graphics = Se,
    v.GraphicsBounds = T,
    v.HTMLCanvas = Ie,
    v.HTMLChar = os,
    v.HTMLImage = wi,
    v.HalfFloatUtils = u,
    v.Handler = Q,
    v.HitArea = Pe,
    v.HttpRequest = Qe,
    v.ICharRender = le,
    v.ILaya = R,
    v.IStatRender = mi,
    v.IndexBuffer2D = Gt,
    v.InlcudeFile = Ei,
    v.Input = h,
    v.KeyBoardManager = Xe,
    v.KeyLocation = is,
    v.Keyboard = e,
    v.Laya = _,
    v.LayaGL = d,
    v.LayaGLQuickRunner = we,
    v.LayaGLRunner = class {
        static uploadShaderUniforms(t, e, i, s) {
            for (var r = i._data, a = e.getArrayData(), n = 0, h = 0, o = a.length; h < o; h++) {
                var l, _ = a[h];
                !s && -1 === _.textureID || null != (l = r[_.dataOffset]) && (n += _.fun.call(_.caller, _, l))
            }
            return n
        }
        static uploadCustomUniform(t, e, i, s) {
            var r = 0
              , e = e[i];
            return e && null != s && (r += e.fun.call(e.caller, e, s)),
            r
        }
        static uploadShaderUniformsForNative(t, e, i) {
            var s = d.UPLOAD_SHADER_UNIFORM_TYPE_ID
              , i = (0 < i._runtimeCopyValues.length && (s = d.UPLOAD_SHADER_UNIFORM_TYPE_DATA),
            i._data);
            return d.instance.uploadShaderUniforms(e, i, s)
        }
    }
    ,
    v.LayaGPU = Te,
    v.Loader = U,
    v.LoaderManager = Je,
    v.LocalStorage = ei,
    v.Log = ls,
    v.MathUtil = li,
    v.MatirxArray = ms,
    v.Matrix = y,
    v.Mesh2D = Wt,
    v.MeshParticle2D = Si,
    v.MeshQuadTexture = Yt,
    v.MeshTexture = Vt,
    v.MeshVG = Xt,
    v.Mouse = bi,
    v.MouseManager = Ge,
    v.Node = Fe,
    v.Path = wt,
    v.PerfData = _s,
    v.PerfHUD = us,
    v.PerformancePlugin = Ve,
    v.Point = q,
    v.Pool = p,
    v.PoolCache = class gs {
        constructor() {
            this.maxCount = 1e3
        }
        getCacheList() {
            return p.getPoolBySign(this.sign)
        }
        tryDispose(t) {
            var e = p.getPoolBySign(this.sign);
            e.length > this.maxCount && e.splice(this.maxCount, e.length - this.maxCount)
        }
        static addPoolCacheManager(t, e=100) {
            var i = new gs;
            i.sign = t,
            i.maxCount = e,
            Ae.regCacheByFunction(S.bind(i.tryDispose, i), S.bind(i.getCacheList, i))
        }
    }
    ,
    v.Prefab = qe,
    v.PrimitiveSV = vi,
    v.QuickTestTool = r,
    v.Rectangle = E,
    v.Render = f,
    v.RenderInfo = Nt,
    v.RenderSprite = Me,
    v.RenderState2D = l,
    v.RenderTexture2D = nt,
    v.Resource = J,
    v.ResourceVersion = as,
    v.RestoreCmd = vt,
    v.RotateCmd = yt,
    v.RunDriver = Ye,
    v.SaveBase = a,
    v.SaveClipRect = It,
    v.SaveCmd = ye,
    v.SaveMark = Pt,
    v.SaveTransform = Dt,
    v.SaveTranslate = Lt,
    v.ScaleCmd = Et,
    v.Scene = Hi,
    v.SceneLoader = Xi,
    v.SceneUtils = ci,
    v.Script = Gi,
    v.Shader = _t,
    v.Shader2D = zt,
    v.Shader2X = ut,
    v.ShaderCompile = Ri,
    v.ShaderDefines2D = b,
    v.ShaderDefinesBase = ot,
    v.ShaderNode = Ci,
    v.ShaderValue = class {
        constructor() {}
    }
    ,
    v.SkinMeshBuffer = Kt,
    v.SkinSV = xi,
    v.Socket = ns,
    v.Sound = ss,
    v.SoundChannel = He,
    v.SoundManager = o,
    v.SoundNode = rs,
    v.Sprite = Oe,
    v.SpriteConst = x,
    v.SpriteStyle = Be,
    v.Stage = N,
    v.Stat = g,
    v.StatUI = gi,
    v.StringKey = lt,
    v.Submit = Qt,
    v.SubmitBase = w,
    v.SubmitCMD = pt,
    v.SubmitCanvas = $t,
    v.SubmitKey = dt,
    v.SubmitTarget = Jt,
    v.SubmitTexture = te,
    v.System = class {
        static changeDefinition(t, e) {
            window.Laya[t] = e,
            window.eval(t + "=classObj")
        }
    }
    ,
    v.SystemUtils = st,
    v.TTFLoader = si,
    v.Text = O,
    v.TextAtlas = re,
    v.TextRender = D,
    v.TextStyle = Ne,
    v.TextTexture = se,
    v.Texture = ae,
    v.Texture2D = rt,
    v.TextureSV = yi,
    v.TimeLine = cs,
    v.Timer = fi,
    v.TouchManager = Ue,
    v.TransformCmd = Ct,
    v.TranslateCmd = Rt,
    v.Tween = ai,
    v.URL = C,
    v.Utils = S,
    v.Value2D = ct,
    v.VectorGraphManager = be,
    v.VertexArrayObject = class {
        constructor() {}
    }
    ,
    v.VertexBuffer2D = kt,
    v.VideoTexture = hs,
    v.WeakObject = ui,
    v.WebAudioSound = s,
    v.WebAudioSoundChannel = je,
    v.WebGL = de,
    v.WebGLCacheAsNormalCanvas = Ht,
    v.WebGLContext = m,
    v.WebGLRTMgr = ht,
    v.WordText = he,
    v.WorkerLoader = Ai,
    v.__init = t,
    v._static = Ni,
    v.alertGlobalError = Fi,
    v.enableDebugPanel = Oi,
    v.init = Li,
    v.isWXOpenDataContext = void 0,
    v.isWXPosMsg = void 0,
    v.version = Bi,
    v.static = Ni,
    v
}({});