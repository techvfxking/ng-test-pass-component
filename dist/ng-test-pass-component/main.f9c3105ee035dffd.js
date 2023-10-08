'use strict'
;(self.webpackChunkng_test_pass_component =
  self.webpackChunkng_test_pass_component || []).push([
  [179],
  {
    191: () => {
      function J(e) {
        return 'function' == typeof e
      }
      function po(e) {
        const n = e((r) => {
          Error.call(r), (r.stack = new Error().stack)
        })
        return (
          (n.prototype = Object.create(Error.prototype)),
          (n.prototype.constructor = n),
          n
        )
      }
      const go = po(
        (e) =>
          function (n) {
            e(this),
              (this.message = n
                ? `${n.length} errors occurred during unsubscription:\n${n
                    .map((r, o) => `${o + 1}) ${r.toString()}`)
                    .join('\n  ')}`
                : ''),
              (this.name = 'UnsubscriptionError'),
              (this.errors = n)
          }
      )
      function ur(e, t) {
        if (e) {
          const n = e.indexOf(t)
          0 <= n && e.splice(n, 1)
        }
      }
      class ot {
        constructor(t) {
          ;(this.initialTeardown = t),
            (this.closed = !1),
            (this._parentage = null),
            (this._finalizers = null)
        }
        unsubscribe() {
          let t
          if (!this.closed) {
            this.closed = !0
            const { _parentage: n } = this
            if (n)
              if (((this._parentage = null), Array.isArray(n)))
                for (const i of n) i.remove(this)
              else n.remove(this)
            const { initialTeardown: r } = this
            if (J(r))
              try {
                r()
              } catch (i) {
                t = i instanceof go ? i.errors : [i]
              }
            const { _finalizers: o } = this
            if (o) {
              this._finalizers = null
              for (const i of o)
                try {
                  qc(i)
                } catch (s) {
                  ;(t = t ?? []),
                    s instanceof go ? (t = [...t, ...s.errors]) : t.push(s)
                }
            }
            if (t) throw new go(t)
          }
        }
        add(t) {
          var n
          if (t && t !== this)
            if (this.closed) qc(t)
            else {
              if (t instanceof ot) {
                if (t.closed || t._hasParent(this)) return
                t._addParent(this)
              }
              ;(this._finalizers =
                null !== (n = this._finalizers) && void 0 !== n ? n : []).push(
                t
              )
            }
        }
        _hasParent(t) {
          const { _parentage: n } = this
          return n === t || (Array.isArray(n) && n.includes(t))
        }
        _addParent(t) {
          const { _parentage: n } = this
          this._parentage = Array.isArray(n) ? (n.push(t), n) : n ? [n, t] : t
        }
        _removeParent(t) {
          const { _parentage: n } = this
          n === t ? (this._parentage = null) : Array.isArray(n) && ur(n, t)
        }
        remove(t) {
          const { _finalizers: n } = this
          n && ur(n, t), t instanceof ot && t._removeParent(this)
        }
      }
      ot.EMPTY = (() => {
        const e = new ot()
        return (e.closed = !0), e
      })()
      const Gc = ot.EMPTY
      function zc(e) {
        return (
          e instanceof ot ||
          (e && 'closed' in e && J(e.remove) && J(e.add) && J(e.unsubscribe))
        )
      }
      function qc(e) {
        J(e) ? e() : e.unsubscribe()
      }
      const Wt = {
          onUnhandledError: null,
          onStoppedNotification: null,
          Promise: void 0,
          useDeprecatedSynchronousErrorHandling: !1,
          useDeprecatedNextContext: !1,
        },
        mo = {
          setTimeout(e, t, ...n) {
            const { delegate: r } = mo
            return r?.setTimeout
              ? r.setTimeout(e, t, ...n)
              : setTimeout(e, t, ...n)
          },
          clearTimeout(e) {
            const { delegate: t } = mo
            return (t?.clearTimeout || clearTimeout)(e)
          },
          delegate: void 0,
        }
      function Wc(e) {
        mo.setTimeout(() => {
          const { onUnhandledError: t } = Wt
          if (!t) throw e
          t(e)
        })
      }
      function Zc() {}
      const Jy = cs('C', void 0, void 0)
      function cs(e, t, n) {
        return { kind: e, value: t, error: n }
      }
      let Zt = null
      function yo(e) {
        if (Wt.useDeprecatedSynchronousErrorHandling) {
          const t = !Zt
          if ((t && (Zt = { errorThrown: !1, error: null }), e(), t)) {
            const { errorThrown: n, error: r } = Zt
            if (((Zt = null), n)) throw r
          }
        } else e()
      }
      class ls extends ot {
        constructor(t) {
          super(),
            (this.isStopped = !1),
            t
              ? ((this.destination = t), zc(t) && t.add(this))
              : (this.destination = sD)
        }
        static create(t, n, r) {
          return new cr(t, n, r)
        }
        next(t) {
          this.isStopped
            ? fs(
                (function tD(e) {
                  return cs('N', e, void 0)
                })(t),
                this
              )
            : this._next(t)
        }
        error(t) {
          this.isStopped
            ? fs(
                (function eD(e) {
                  return cs('E', void 0, e)
                })(t),
                this
              )
            : ((this.isStopped = !0), this._error(t))
        }
        complete() {
          this.isStopped
            ? fs(Jy, this)
            : ((this.isStopped = !0), this._complete())
        }
        unsubscribe() {
          this.closed ||
            ((this.isStopped = !0),
            super.unsubscribe(),
            (this.destination = null))
        }
        _next(t) {
          this.destination.next(t)
        }
        _error(t) {
          try {
            this.destination.error(t)
          } finally {
            this.unsubscribe()
          }
        }
        _complete() {
          try {
            this.destination.complete()
          } finally {
            this.unsubscribe()
          }
        }
      }
      const rD = Function.prototype.bind
      function ds(e, t) {
        return rD.call(e, t)
      }
      class oD {
        constructor(t) {
          this.partialObserver = t
        }
        next(t) {
          const { partialObserver: n } = this
          if (n.next)
            try {
              n.next(t)
            } catch (r) {
              Do(r)
            }
        }
        error(t) {
          const { partialObserver: n } = this
          if (n.error)
            try {
              n.error(t)
            } catch (r) {
              Do(r)
            }
          else Do(t)
        }
        complete() {
          const { partialObserver: t } = this
          if (t.complete)
            try {
              t.complete()
            } catch (n) {
              Do(n)
            }
        }
      }
      class cr extends ls {
        constructor(t, n, r) {
          let o
          if ((super(), J(t) || !t))
            o = { next: t ?? void 0, error: n ?? void 0, complete: r ?? void 0 }
          else {
            let i
            this && Wt.useDeprecatedNextContext
              ? ((i = Object.create(t)),
                (i.unsubscribe = () => this.unsubscribe()),
                (o = {
                  next: t.next && ds(t.next, i),
                  error: t.error && ds(t.error, i),
                  complete: t.complete && ds(t.complete, i),
                }))
              : (o = t)
          }
          this.destination = new oD(o)
        }
      }
      function Do(e) {
        Wt.useDeprecatedSynchronousErrorHandling
          ? (function nD(e) {
              Wt.useDeprecatedSynchronousErrorHandling &&
                Zt &&
                ((Zt.errorThrown = !0), (Zt.error = e))
            })(e)
          : Wc(e)
      }
      function fs(e, t) {
        const { onStoppedNotification: n } = Wt
        n && mo.setTimeout(() => n(e, t))
      }
      const sD = {
          closed: !0,
          next: Zc,
          error: function iD(e) {
            throw e
          },
          complete: Zc,
        },
        hs =
          ('function' == typeof Symbol && Symbol.observable) || '@@observable'
      function ps(e) {
        return e
      }
      let Me = (() => {
        class e {
          constructor(n) {
            n && (this._subscribe = n)
          }
          lift(n) {
            const r = new e()
            return (r.source = this), (r.operator = n), r
          }
          subscribe(n, r, o) {
            const i = (function uD(e) {
              return (
                (e && e instanceof ls) ||
                ((function aD(e) {
                  return e && J(e.next) && J(e.error) && J(e.complete)
                })(e) &&
                  zc(e))
              )
            })(n)
              ? n
              : new cr(n, r, o)
            return (
              yo(() => {
                const { operator: s, source: a } = this
                i.add(
                  s
                    ? s.call(i, a)
                    : a
                    ? this._subscribe(i)
                    : this._trySubscribe(i)
                )
              }),
              i
            )
          }
          _trySubscribe(n) {
            try {
              return this._subscribe(n)
            } catch (r) {
              n.error(r)
            }
          }
          forEach(n, r) {
            return new (r = Qc(r))((o, i) => {
              const s = new cr({
                next: (a) => {
                  try {
                    n(a)
                  } catch (u) {
                    i(u), s.unsubscribe()
                  }
                },
                error: i,
                complete: o,
              })
              this.subscribe(s)
            })
          }
          _subscribe(n) {
            var r
            return null === (r = this.source) || void 0 === r
              ? void 0
              : r.subscribe(n)
          }
          [hs]() {
            return this
          }
          pipe(...n) {
            return (function Yc(e) {
              return 0 === e.length
                ? ps
                : 1 === e.length
                ? e[0]
                : function (n) {
                    return e.reduce((r, o) => o(r), n)
                  }
            })(n)(this)
          }
          toPromise(n) {
            return new (n = Qc(n))((r, o) => {
              let i
              this.subscribe(
                (s) => (i = s),
                (s) => o(s),
                () => r(i)
              )
            })
          }
        }
        return (e.create = (t) => new e(t)), e
      })()
      function Qc(e) {
        var t
        return null !== (t = e ?? Wt.Promise) && void 0 !== t ? t : Promise
      }
      const cD = po(
        (e) =>
          function () {
            e(this),
              (this.name = 'ObjectUnsubscribedError'),
              (this.message = 'object unsubscribed')
          }
      )
      let vo = (() => {
        class e extends Me {
          constructor() {
            super(),
              (this.closed = !1),
              (this.currentObservers = null),
              (this.observers = []),
              (this.isStopped = !1),
              (this.hasError = !1),
              (this.thrownError = null)
          }
          lift(n) {
            const r = new Kc(this, this)
            return (r.operator = n), r
          }
          _throwIfClosed() {
            if (this.closed) throw new cD()
          }
          next(n) {
            yo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.currentObservers ||
                  (this.currentObservers = Array.from(this.observers))
                for (const r of this.currentObservers) r.next(n)
              }
            })
          }
          error(n) {
            yo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                ;(this.hasError = this.isStopped = !0), (this.thrownError = n)
                const { observers: r } = this
                for (; r.length; ) r.shift().error(n)
              }
            })
          }
          complete() {
            yo(() => {
              if ((this._throwIfClosed(), !this.isStopped)) {
                this.isStopped = !0
                const { observers: n } = this
                for (; n.length; ) n.shift().complete()
              }
            })
          }
          unsubscribe() {
            ;(this.isStopped = this.closed = !0),
              (this.observers = this.currentObservers = null)
          }
          get observed() {
            var n
            return (
              (null === (n = this.observers) || void 0 === n
                ? void 0
                : n.length) > 0
            )
          }
          _trySubscribe(n) {
            return this._throwIfClosed(), super._trySubscribe(n)
          }
          _subscribe(n) {
            return (
              this._throwIfClosed(),
              this._checkFinalizedStatuses(n),
              this._innerSubscribe(n)
            )
          }
          _innerSubscribe(n) {
            const { hasError: r, isStopped: o, observers: i } = this
            return r || o
              ? Gc
              : ((this.currentObservers = null),
                i.push(n),
                new ot(() => {
                  ;(this.currentObservers = null), ur(i, n)
                }))
          }
          _checkFinalizedStatuses(n) {
            const { hasError: r, thrownError: o, isStopped: i } = this
            r ? n.error(o) : i && n.complete()
          }
          asObservable() {
            const n = new Me()
            return (n.source = this), n
          }
        }
        return (e.create = (t, n) => new Kc(t, n)), e
      })()
      class Kc extends vo {
        constructor(t, n) {
          super(), (this.destination = t), (this.source = n)
        }
        next(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.next) ||
            void 0 === r ||
            r.call(n, t)
        }
        error(t) {
          var n, r
          null ===
            (r =
              null === (n = this.destination) || void 0 === n
                ? void 0
                : n.error) ||
            void 0 === r ||
            r.call(n, t)
        }
        complete() {
          var t, n
          null ===
            (n =
              null === (t = this.destination) || void 0 === t
                ? void 0
                : t.complete) ||
            void 0 === n ||
            n.call(t)
        }
        _subscribe(t) {
          var n, r
          return null !==
            (r =
              null === (n = this.source) || void 0 === n
                ? void 0
                : n.subscribe(t)) && void 0 !== r
            ? r
            : Gc
        }
      }
      function Yt(e) {
        return (t) => {
          if (
            (function lD(e) {
              return J(e?.lift)
            })(t)
          )
            return t.lift(function (n) {
              try {
                return e(n, this)
              } catch (r) {
                this.error(r)
              }
            })
          throw new TypeError('Unable to lift unknown Observable type')
        }
      }
      function Qt(e, t, n, r, o) {
        return new dD(e, t, n, r, o)
      }
      class dD extends ls {
        constructor(t, n, r, o, i, s) {
          super(t),
            (this.onFinalize = i),
            (this.shouldUnsubscribe = s),
            (this._next = n
              ? function (a) {
                  try {
                    n(a)
                  } catch (u) {
                    t.error(u)
                  }
                }
              : super._next),
            (this._error = o
              ? function (a) {
                  try {
                    o(a)
                  } catch (u) {
                    t.error(u)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._error),
            (this._complete = r
              ? function () {
                  try {
                    r()
                  } catch (a) {
                    t.error(a)
                  } finally {
                    this.unsubscribe()
                  }
                }
              : super._complete)
        }
        unsubscribe() {
          var t
          if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
            const { closed: n } = this
            super.unsubscribe(),
              !n &&
                (null === (t = this.onFinalize) || void 0 === t || t.call(this))
          }
        }
      }
      function Ft(e) {
        return this instanceof Ft ? ((this.v = e), this) : new Ft(e)
      }
      function tl(e) {
        if (!Symbol.asyncIterator)
          throw new TypeError('Symbol.asyncIterator is not defined.')
        var n,
          t = e[Symbol.asyncIterator]
        return t
          ? t.call(e)
          : ((e = (function Ds(e) {
              var t = 'function' == typeof Symbol && Symbol.iterator,
                n = t && e[t],
                r = 0
              if (n) return n.call(e)
              if (e && 'number' == typeof e.length)
                return {
                  next: function () {
                    return (
                      e && r >= e.length && (e = void 0),
                      { value: e && e[r++], done: !e }
                    )
                  },
                }
              throw new TypeError(
                t
                  ? 'Object is not iterable.'
                  : 'Symbol.iterator is not defined.'
              )
            })(e)),
            (n = {}),
            r('next'),
            r('throw'),
            r('return'),
            (n[Symbol.asyncIterator] = function () {
              return this
            }),
            n)
        function r(i) {
          n[i] =
            e[i] &&
            function (s) {
              return new Promise(function (a, u) {
                !(function o(i, s, a, u) {
                  Promise.resolve(u).then(function (c) {
                    i({ value: c, done: a })
                  }, s)
                })(a, u, (s = e[i](s)).done, s.value)
              })
            }
        }
      }
      'function' == typeof SuppressedError && SuppressedError
      const nl = (e) =>
        e && 'number' == typeof e.length && 'function' != typeof e
      function rl(e) {
        return J(e?.then)
      }
      function ol(e) {
        return J(e[hs])
      }
      function il(e) {
        return Symbol.asyncIterator && J(e?.[Symbol.asyncIterator])
      }
      function sl(e) {
        return new TypeError(
          `You provided ${
            null !== e && 'object' == typeof e ? 'an invalid object' : `'${e}'`
          } where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.`
        )
      }
      const al = (function RD() {
        return 'function' == typeof Symbol && Symbol.iterator
          ? Symbol.iterator
          : '@@iterator'
      })()
      function ul(e) {
        return J(e?.[al])
      }
      function cl(e) {
        return (function el(e, t, n) {
          if (!Symbol.asyncIterator)
            throw new TypeError('Symbol.asyncIterator is not defined.')
          var o,
            r = n.apply(e, t || []),
            i = []
          return (
            (o = {}),
            s('next'),
            s('throw'),
            s('return'),
            (o[Symbol.asyncIterator] = function () {
              return this
            }),
            o
          )
          function s(f) {
            r[f] &&
              (o[f] = function (h) {
                return new Promise(function (p, g) {
                  i.push([f, h, p, g]) > 1 || a(f, h)
                })
              })
          }
          function a(f, h) {
            try {
              !(function u(f) {
                f.value instanceof Ft
                  ? Promise.resolve(f.value.v).then(c, l)
                  : d(i[0][2], f)
              })(r[f](h))
            } catch (p) {
              d(i[0][3], p)
            }
          }
          function c(f) {
            a('next', f)
          }
          function l(f) {
            a('throw', f)
          }
          function d(f, h) {
            f(h), i.shift(), i.length && a(i[0][0], i[0][1])
          }
        })(this, arguments, function* () {
          const n = e.getReader()
          try {
            for (;;) {
              const { value: r, done: o } = yield Ft(n.read())
              if (o) return yield Ft(void 0)
              yield yield Ft(r)
            }
          } finally {
            n.releaseLock()
          }
        })
      }
      function ll(e) {
        return J(e?.getReader)
      }
      function Dt(e) {
        if (e instanceof Me) return e
        if (null != e) {
          if (ol(e))
            return (function FD(e) {
              return new Me((t) => {
                const n = e[hs]()
                if (J(n.subscribe)) return n.subscribe(t)
                throw new TypeError(
                  'Provided object does not correctly implement Symbol.observable'
                )
              })
            })(e)
          if (nl(e))
            return (function LD(e) {
              return new Me((t) => {
                for (let n = 0; n < e.length && !t.closed; n++) t.next(e[n])
                t.complete()
              })
            })(e)
          if (rl(e))
            return (function kD(e) {
              return new Me((t) => {
                e.then(
                  (n) => {
                    t.closed || (t.next(n), t.complete())
                  },
                  (n) => t.error(n)
                ).then(null, Wc)
              })
            })(e)
          if (il(e)) return dl(e)
          if (ul(e))
            return (function jD(e) {
              return new Me((t) => {
                for (const n of e) if ((t.next(n), t.closed)) return
                t.complete()
              })
            })(e)
          if (ll(e))
            return (function VD(e) {
              return dl(cl(e))
            })(e)
        }
        throw sl(e)
      }
      function dl(e) {
        return new Me((t) => {
          ;(function HD(e, t) {
            var n, r, o, i
            return (function Xc(e, t, n, r) {
              return new (n || (n = Promise))(function (i, s) {
                function a(l) {
                  try {
                    c(r.next(l))
                  } catch (d) {
                    s(d)
                  }
                }
                function u(l) {
                  try {
                    c(r.throw(l))
                  } catch (d) {
                    s(d)
                  }
                }
                function c(l) {
                  l.done
                    ? i(l.value)
                    : (function o(i) {
                        return i instanceof n
                          ? i
                          : new n(function (s) {
                              s(i)
                            })
                      })(l.value).then(a, u)
                }
                c((r = r.apply(e, t || [])).next())
              })
            })(this, void 0, void 0, function* () {
              try {
                for (n = tl(e); !(r = yield n.next()).done; )
                  if ((t.next(r.value), t.closed)) return
              } catch (s) {
                o = { error: s }
              } finally {
                try {
                  r && !r.done && (i = n.return) && (yield i.call(n))
                } finally {
                  if (o) throw o.error
                }
              }
              t.complete()
            })
          })(e, t).catch((n) => t.error(n))
        })
      }
      function Lt(e, t, n, r = 0, o = !1) {
        const i = t.schedule(function () {
          n(), o ? e.add(this.schedule(null, r)) : this.unsubscribe()
        }, r)
        if ((e.add(i), !o)) return i
      }
      function fl(e, t, n = 1 / 0) {
        return J(t)
          ? fl(
              (r, o) =>
                (function fD(e, t) {
                  return Yt((n, r) => {
                    let o = 0
                    n.subscribe(
                      Qt(r, (i) => {
                        r.next(e.call(t, i, o++))
                      })
                    )
                  })
                })((i, s) => t(r, i, o, s))(Dt(e(r, o))),
              n
            )
          : ('number' == typeof t && (n = t),
            Yt((r, o) =>
              (function BD(e, t, n, r, o, i, s, a) {
                const u = []
                let c = 0,
                  l = 0,
                  d = !1
                const f = () => {
                    d && !u.length && !c && t.complete()
                  },
                  h = (g) => (c < r ? p(g) : u.push(g)),
                  p = (g) => {
                    i && t.next(g), c++
                    let D = !1
                    Dt(n(g, l++)).subscribe(
                      Qt(
                        t,
                        (v) => {
                          o?.(v), i ? h(v) : t.next(v)
                        },
                        () => {
                          D = !0
                        },
                        void 0,
                        () => {
                          if (D)
                            try {
                              for (c--; u.length && c < r; ) {
                                const v = u.shift()
                                s ? Lt(t, s, () => p(v)) : p(v)
                              }
                              f()
                            } catch (v) {
                              t.error(v)
                            }
                        }
                      )
                    )
                  }
                return (
                  e.subscribe(
                    Qt(t, h, () => {
                      ;(d = !0), f()
                    })
                  ),
                  () => {
                    a?.()
                  }
                )
              })(r, o, e, n)
            ))
      }
      const hl = new Me((e) => e.complete())
      function vs(e) {
        return e[e.length - 1]
      }
      function pl(e) {
        return (function GD(e) {
          return e && J(e.schedule)
        })(vs(e))
          ? e.pop()
          : void 0
      }
      function gl(e, t = 0) {
        return Yt((n, r) => {
          n.subscribe(
            Qt(
              r,
              (o) => Lt(r, e, () => r.next(o), t),
              () => Lt(r, e, () => r.complete(), t),
              (o) => Lt(r, e, () => r.error(o), t)
            )
          )
        })
      }
      function ml(e, t = 0) {
        return Yt((n, r) => {
          r.add(e.schedule(() => n.subscribe(r), t))
        })
      }
      function yl(e, t) {
        if (!e) throw new Error('Iterable cannot be null')
        return new Me((n) => {
          Lt(n, t, () => {
            const r = e[Symbol.asyncIterator]()
            Lt(
              n,
              t,
              () => {
                r.next().then((o) => {
                  o.done ? n.complete() : n.next(o.value)
                })
              },
              0,
              !0
            )
          })
        })
      }
      function Dl(e, t) {
        return t
          ? (function KD(e, t) {
              if (null != e) {
                if (ol(e))
                  return (function qD(e, t) {
                    return Dt(e).pipe(ml(t), gl(t))
                  })(e, t)
                if (nl(e))
                  return (function ZD(e, t) {
                    return new Me((n) => {
                      let r = 0
                      return t.schedule(function () {
                        r === e.length
                          ? n.complete()
                          : (n.next(e[r++]), n.closed || this.schedule())
                      })
                    })
                  })(e, t)
                if (rl(e))
                  return (function WD(e, t) {
                    return Dt(e).pipe(ml(t), gl(t))
                  })(e, t)
                if (il(e)) return yl(e, t)
                if (ul(e))
                  return (function YD(e, t) {
                    return new Me((n) => {
                      let r
                      return (
                        Lt(n, t, () => {
                          ;(r = e[al]()),
                            Lt(
                              n,
                              t,
                              () => {
                                let o, i
                                try {
                                  ;({ value: o, done: i } = r.next())
                                } catch (s) {
                                  return void n.error(s)
                                }
                                i ? n.complete() : n.next(o)
                              },
                              0,
                              !0
                            )
                        }),
                        () => J(r?.return) && r.return()
                      )
                    })
                  })(e, t)
                if (ll(e))
                  return (function QD(e, t) {
                    return yl(cl(e), t)
                  })(e, t)
              }
              throw sl(e)
            })(e, t)
          : Dt(e)
      }
      function XD(...e) {
        const t = pl(e),
          n = (function zD(e, t) {
            return 'number' == typeof vs(e) ? e.pop() : t
          })(e, 1 / 0),
          r = e
        return r.length
          ? 1 === r.length
            ? Dt(r[0])
            : (function $D(e = 1 / 0) {
                return fl(ps, e)
              })(n)(Dl(r, t))
          : hl
      }
      class JD extends vo {
        constructor(t) {
          super(), (this._value = t)
        }
        get value() {
          return this.getValue()
        }
        _subscribe(t) {
          const n = super._subscribe(t)
          return !n.closed && t.next(this._value), n
        }
        getValue() {
          const { hasError: t, thrownError: n, _value: r } = this
          if (t) throw n
          return this._throwIfClosed(), r
        }
        next(t) {
          super.next((this._value = t))
        }
      }
      function vl(e = {}) {
        const {
          connector: t = () => new vo(),
          resetOnError: n = !0,
          resetOnComplete: r = !0,
          resetOnRefCountZero: o = !0,
        } = e
        return (i) => {
          let s,
            a,
            u,
            c = 0,
            l = !1,
            d = !1
          const f = () => {
              a?.unsubscribe(), (a = void 0)
            },
            h = () => {
              f(), (s = u = void 0), (l = d = !1)
            },
            p = () => {
              const g = s
              h(), g?.unsubscribe()
            }
          return Yt((g, D) => {
            c++, !d && !l && f()
            const v = (u = u ?? t())
            D.add(() => {
              c--, 0 === c && !d && !l && (a = ws(p, o))
            }),
              v.subscribe(D),
              !s &&
                c > 0 &&
                ((s = new cr({
                  next: (m) => v.next(m),
                  error: (m) => {
                    ;(d = !0), f(), (a = ws(h, n, m)), v.error(m)
                  },
                  complete: () => {
                    ;(l = !0), f(), (a = ws(h, r)), v.complete()
                  },
                })),
                Dt(g).subscribe(s))
          })(i)
        }
      }
      function ws(e, t, ...n) {
        if (!0 === t) return void e()
        if (!1 === t) return
        const r = new cr({
          next: () => {
            r.unsubscribe(), e()
          },
        })
        return Dt(t(...n)).subscribe(r)
      }
      function rv(e, t) {
        return e === t
      }
      function U(e) {
        for (let t in e) if (e[t] === U) return t
        throw Error('Could not find renamed property on target object.')
      }
      function ae(e) {
        if ('string' == typeof e) return e
        if (Array.isArray(e)) return '[' + e.map(ae).join(', ') + ']'
        if (null == e) return '' + e
        if (e.overriddenName) return `${e.overriddenName}`
        if (e.name) return `${e.name}`
        const t = e.toString()
        if (null == t) return '' + t
        const n = t.indexOf('\n')
        return -1 === n ? t : t.substring(0, n)
      }
      function Es(e, t) {
        return null == e || '' === e
          ? null === t
            ? ''
            : t
          : null == t || '' === t
          ? e
          : e + ' ' + t
      }
      const ov = U({ __forward_ref__: U })
      function Cs(e) {
        return (
          (e.__forward_ref__ = Cs),
          (e.toString = function () {
            return ae(this())
          }),
          e
        )
      }
      function b(e) {
        return (function _s(e) {
          return (
            'function' == typeof e &&
            e.hasOwnProperty(ov) &&
            e.__forward_ref__ === Cs
          )
        })(e)
          ? e()
          : e
      }
      function Is(e) {
        return e && !!e.ɵproviders
      }
      const wl = 'https://g.co/ng/security#xss'
      class E extends Error {
        constructor(t, n) {
          super(
            (function Eo(e, t) {
              return `NG0${Math.abs(e)}${t ? ': ' + t : ''}`
            })(t, n)
          ),
            (this.code = t)
        }
      }
      function S(e) {
        return 'string' == typeof e ? e : null == e ? '' : String(e)
      }
      function Ms(e, t) {
        throw new E(-201, !1)
      }
      function Be(e, t) {
        null == e &&
          (function _(e, t, n, r) {
            throw new Error(
              `ASSERTION ERROR: ${e}` +
                (null == r ? '' : ` [Expected=> ${n} ${r} ${t} <=Actual]`)
            )
          })(t, e, null, '!=')
      }
      function G(e) {
        return {
          token: e.token,
          providedIn: e.providedIn || null,
          factory: e.factory,
          value: void 0,
        }
      }
      function dn(e) {
        return { providers: e.providers || [], imports: e.imports || [] }
      }
      function Co(e) {
        return El(e, Io) || El(e, Cl)
      }
      function El(e, t) {
        return e.hasOwnProperty(t) ? e[t] : null
      }
      function _o(e) {
        return e && (e.hasOwnProperty(bs) || e.hasOwnProperty(dv))
          ? e[bs]
          : null
      }
      const Io = U({ ɵprov: U }),
        bs = U({ ɵinj: U }),
        Cl = U({ ngInjectableDef: U }),
        dv = U({ ngInjectorDef: U })
      var L = (function (e) {
        return (
          (e[(e.Default = 0)] = 'Default'),
          (e[(e.Host = 1)] = 'Host'),
          (e[(e.Self = 2)] = 'Self'),
          (e[(e.SkipSelf = 4)] = 'SkipSelf'),
          (e[(e.Optional = 8)] = 'Optional'),
          e
        )
      })(L || {})
      let Ss
      function be(e) {
        const t = Ss
        return (Ss = e), t
      }
      function Il(e, t, n) {
        const r = Co(e)
        return r && 'root' == r.providedIn
          ? void 0 === r.value
            ? (r.value = r.factory())
            : r.value
          : n & L.Optional
          ? null
          : void 0 !== t
          ? t
          : void Ms(ae(e))
      }
      const q = globalThis,
        lr = {},
        Os = '__NG_DI_FLAG__',
        Mo = 'ngTempTokenPath',
        pv = /\n/gm,
        bl = '__source'
      let fn
      function kt(e) {
        const t = fn
        return (fn = e), t
      }
      function yv(e, t = L.Default) {
        if (void 0 === fn) throw new E(-203, !1)
        return null === fn
          ? Il(e, void 0, t)
          : fn.get(e, t & L.Optional ? null : void 0, t)
      }
      function P(e, t = L.Default) {
        return (
          (function _l() {
            return Ss
          })() || yv
        )(b(e), t)
      }
      function W(e, t = L.Default) {
        return P(e, bo(t))
      }
      function bo(e) {
        return typeof e > 'u' || 'number' == typeof e
          ? e
          : 0 |
              (e.optional && 8) |
              (e.host && 1) |
              (e.self && 2) |
              (e.skipSelf && 4)
      }
      function Ps(e) {
        const t = []
        for (let n = 0; n < e.length; n++) {
          const r = b(e[n])
          if (Array.isArray(r)) {
            if (0 === r.length) throw new E(900, !1)
            let o,
              i = L.Default
            for (let s = 0; s < r.length; s++) {
              const a = r[s],
                u = Dv(a)
              'number' == typeof u
                ? -1 === u
                  ? (o = a.token)
                  : (i |= u)
                : (o = a)
            }
            t.push(P(o, i))
          } else t.push(P(r))
        }
        return t
      }
      function Dv(e) {
        return e[Os]
      }
      function vt(e) {
        return { toString: e }.toString()
      }
      var So = (function (e) {
          return (
            (e[(e.OnPush = 0)] = 'OnPush'), (e[(e.Default = 1)] = 'Default'), e
          )
        })(So || {}),
        Ye = (function (e) {
          return (
            (e[(e.Emulated = 0)] = 'Emulated'),
            (e[(e.None = 2)] = 'None'),
            (e[(e.ShadowDom = 3)] = 'ShadowDom'),
            e
          )
        })(Ye || {})
      const it = {},
        V = [],
        To = U({ ɵcmp: U }),
        Rs = U({ ɵdir: U }),
        Fs = U({ ɵpipe: U }),
        Tl = U({ ɵmod: U }),
        wt = U({ ɵfac: U }),
        fr = U({ __NG_ELEMENT_ID__: U }),
        Nl = U({ __NG_ENV_ID__: U })
      function Al(e, t, n) {
        let r = e.length
        for (;;) {
          const o = e.indexOf(t, n)
          if (-1 === o) return o
          if (0 === o || e.charCodeAt(o - 1) <= 32) {
            const i = t.length
            if (o + i === r || e.charCodeAt(o + i) <= 32) return o
          }
          n = o + 1
        }
      }
      function Ls(e, t, n) {
        let r = 0
        for (; r < n.length; ) {
          const o = n[r]
          if ('number' == typeof o) {
            if (0 !== o) break
            r++
            const i = n[r++],
              s = n[r++],
              a = n[r++]
            e.setAttribute(t, s, a, i)
          } else {
            const i = o,
              s = n[++r]
            Ol(i) ? e.setProperty(t, i, s) : e.setAttribute(t, i, s), r++
          }
        }
        return r
      }
      function xl(e) {
        return 3 === e || 4 === e || 6 === e
      }
      function Ol(e) {
        return 64 === e.charCodeAt(0)
      }
      function hr(e, t) {
        if (null !== t && 0 !== t.length)
          if (null === e || 0 === e.length) e = t.slice()
          else {
            let n = -1
            for (let r = 0; r < t.length; r++) {
              const o = t[r]
              'number' == typeof o
                ? (n = o)
                : 0 === n ||
                  Pl(e, n, o, null, -1 === n || 2 === n ? t[++r] : null)
            }
          }
        return e
      }
      function Pl(e, t, n, r, o) {
        let i = 0,
          s = e.length
        if (-1 === t) s = -1
        else
          for (; i < e.length; ) {
            const a = e[i++]
            if ('number' == typeof a) {
              if (a === t) {
                s = -1
                break
              }
              if (a > t) {
                s = i - 1
                break
              }
            }
          }
        for (; i < e.length; ) {
          const a = e[i]
          if ('number' == typeof a) break
          if (a === n) {
            if (null === r) return void (null !== o && (e[i + 1] = o))
            if (r === e[i + 1]) return void (e[i + 2] = o)
          }
          i++, null !== r && i++, null !== o && i++
        }
        ;-1 !== s && (e.splice(s, 0, t), (i = s + 1)),
          e.splice(i++, 0, n),
          null !== r && e.splice(i++, 0, r),
          null !== o && e.splice(i++, 0, o)
      }
      const Rl = 'ng-template'
      function Ev(e, t, n) {
        let r = 0,
          o = !0
        for (; r < e.length; ) {
          let i = e[r++]
          if ('string' == typeof i && o) {
            const s = e[r++]
            if (n && 'class' === i && -1 !== Al(s.toLowerCase(), t, 0))
              return !0
          } else {
            if (1 === i) {
              for (; r < e.length && 'string' == typeof (i = e[r++]); )
                if (i.toLowerCase() === t) return !0
              return !1
            }
            'number' == typeof i && (o = !1)
          }
        }
        return !1
      }
      function Fl(e) {
        return 4 === e.type && e.value !== Rl
      }
      function Cv(e, t, n) {
        return t === (4 !== e.type || n ? e.value : Rl)
      }
      function _v(e, t, n) {
        let r = 4
        const o = e.attrs || [],
          i = (function bv(e) {
            for (let t = 0; t < e.length; t++) if (xl(e[t])) return t
            return e.length
          })(o)
        let s = !1
        for (let a = 0; a < t.length; a++) {
          const u = t[a]
          if ('number' != typeof u) {
            if (!s)
              if (4 & r) {
                if (
                  ((r = 2 | (1 & r)),
                  ('' !== u && !Cv(e, u, n)) || ('' === u && 1 === t.length))
                ) {
                  if (Qe(r)) return !1
                  s = !0
                }
              } else {
                const c = 8 & r ? u : t[++a]
                if (8 & r && null !== e.attrs) {
                  if (!Ev(e.attrs, c, n)) {
                    if (Qe(r)) return !1
                    s = !0
                  }
                  continue
                }
                const d = Iv(8 & r ? 'class' : u, o, Fl(e), n)
                if (-1 === d) {
                  if (Qe(r)) return !1
                  s = !0
                  continue
                }
                if ('' !== c) {
                  let f
                  f = d > i ? '' : o[d + 1].toLowerCase()
                  const h = 8 & r ? f : null
                  if ((h && -1 !== Al(h, c, 0)) || (2 & r && c !== f)) {
                    if (Qe(r)) return !1
                    s = !0
                  }
                }
              }
          } else {
            if (!s && !Qe(r) && !Qe(u)) return !1
            if (s && Qe(u)) continue
            ;(s = !1), (r = u | (1 & r))
          }
        }
        return Qe(r) || s
      }
      function Qe(e) {
        return 0 == (1 & e)
      }
      function Iv(e, t, n, r) {
        if (null === t) return -1
        let o = 0
        if (r || !n) {
          let i = !1
          for (; o < t.length; ) {
            const s = t[o]
            if (s === e) return o
            if (3 === s || 6 === s) i = !0
            else {
              if (1 === s || 2 === s) {
                let a = t[++o]
                for (; 'string' == typeof a; ) a = t[++o]
                continue
              }
              if (4 === s) break
              if (0 === s) {
                o += 4
                continue
              }
            }
            o += i ? 1 : 2
          }
          return -1
        }
        return (function Sv(e, t) {
          let n = e.indexOf(4)
          if (n > -1)
            for (n++; n < e.length; ) {
              const r = e[n]
              if ('number' == typeof r) return -1
              if (r === t) return n
              n++
            }
          return -1
        })(t, e)
      }
      function Ll(e, t, n = !1) {
        for (let r = 0; r < t.length; r++) if (_v(e, t[r], n)) return !0
        return !1
      }
      function kl(e, t) {
        return e ? ':not(' + t.trim() + ')' : t
      }
      function Nv(e) {
        let t = e[0],
          n = 1,
          r = 2,
          o = '',
          i = !1
        for (; n < e.length; ) {
          let s = e[n]
          if ('string' == typeof s)
            if (2 & r) {
              const a = e[++n]
              o += '[' + s + (a.length > 0 ? '="' + a + '"' : '') + ']'
            } else 8 & r ? (o += '.' + s) : 4 & r && (o += ' ' + s)
          else
            '' !== o && !Qe(s) && ((t += kl(i, o)), (o = '')),
              (r = s),
              (i = i || !Qe(r))
          n++
        }
        return '' !== o && (t += kl(i, o)), t
      }
      function No(e) {
        return vt(() => {
          const t = Vl(e),
            n = {
              ...t,
              decls: e.decls,
              vars: e.vars,
              template: e.template,
              consts: e.consts || null,
              ngContentSelectors: e.ngContentSelectors,
              onPush: e.changeDetection === So.OnPush,
              directiveDefs: null,
              pipeDefs: null,
              dependencies: (t.standalone && e.dependencies) || null,
              getStandaloneInjector: null,
              signals: e.signals ?? !1,
              data: e.data || {},
              encapsulation: e.encapsulation || Ye.Emulated,
              styles: e.styles || V,
              _: null,
              schemas: e.schemas || null,
              tView: null,
              id: '',
            }
          Hl(n)
          const r = e.dependencies
          return (
            (n.directiveDefs = Ao(r, !1)),
            (n.pipeDefs = Ao(r, !0)),
            (n.id = (function kv(e) {
              let t = 0
              const n = [
                e.selectors,
                e.ngContentSelectors,
                e.hostVars,
                e.hostAttrs,
                e.consts,
                e.vars,
                e.decls,
                e.encapsulation,
                e.standalone,
                e.signals,
                e.exportAs,
                JSON.stringify(e.inputs),
                JSON.stringify(e.outputs),
                Object.getOwnPropertyNames(e.type.prototype),
                !!e.contentQueries,
                !!e.viewQuery,
              ].join('|')
              for (const o of n) t = (Math.imul(31, t) + o.charCodeAt(0)) << 0
              return (t += 2147483648), 'c' + t
            })(n)),
            n
          )
        })
      }
      function Pv(e) {
        return k(e) || le(e)
      }
      function Rv(e) {
        return null !== e
      }
      function pr(e) {
        return vt(() => ({
          type: e.type,
          bootstrap: e.bootstrap || V,
          declarations: e.declarations || V,
          imports: e.imports || V,
          exports: e.exports || V,
          transitiveCompileScopes: null,
          schemas: e.schemas || null,
          id: e.id || null,
        }))
      }
      function jl(e, t) {
        if (null == e) return it
        const n = {}
        for (const r in e)
          if (e.hasOwnProperty(r)) {
            let o = e[r],
              i = o
            Array.isArray(o) && ((i = o[1]), (o = o[0])),
              (n[o] = r),
              t && (t[o] = i)
          }
        return n
      }
      function $e(e) {
        return vt(() => {
          const t = Vl(e)
          return Hl(t), t
        })
      }
      function k(e) {
        return e[To] || null
      }
      function le(e) {
        return e[Rs] || null
      }
      function ye(e) {
        return e[Fs] || null
      }
      function Vl(e) {
        const t = {}
        return {
          type: e.type,
          providersResolver: null,
          factory: null,
          hostBindings: e.hostBindings || null,
          hostVars: e.hostVars || 0,
          hostAttrs: e.hostAttrs || null,
          contentQueries: e.contentQueries || null,
          declaredInputs: t,
          inputTransforms: null,
          inputConfig: e.inputs || it,
          exportAs: e.exportAs || null,
          standalone: !0 === e.standalone,
          signals: !0 === e.signals,
          selectors: e.selectors || V,
          viewQuery: e.viewQuery || null,
          features: e.features || null,
          setInput: null,
          findHostDirectiveDefs: null,
          hostDirectives: null,
          inputs: jl(e.inputs, t),
          outputs: jl(e.outputs),
        }
      }
      function Hl(e) {
        e.features?.forEach((t) => t(e))
      }
      function Ao(e, t) {
        if (!e) return null
        const n = t ? ye : Pv
        return () =>
          ('function' == typeof e ? e() : e).map((r) => n(r)).filter(Rv)
      }
      const ee = 0,
        w = 1,
        x = 2,
        K = 3,
        Ke = 4,
        mr = 5,
        pe = 6,
        hn = 7,
        re = 8,
        jt = 9,
        pn = 10,
        T = 11,
        yr = 12,
        Bl = 13,
        gn = 14,
        oe = 15,
        Dr = 16,
        mn = 17,
        st = 18,
        vr = 19,
        $l = 20,
        Vt = 21,
        Et = 22,
        wr = 23,
        Er = 24,
        R = 25,
        ks = 1,
        Ul = 2,
        at = 7,
        yn = 9,
        de = 11
      function Te(e) {
        return Array.isArray(e) && 'object' == typeof e[ks]
      }
      function De(e) {
        return Array.isArray(e) && !0 === e[ks]
      }
      function js(e) {
        return 0 != (4 & e.flags)
      }
      function Xt(e) {
        return e.componentOffset > -1
      }
      function Oo(e) {
        return 1 == (1 & e.flags)
      }
      function Xe(e) {
        return !!e.template
      }
      function Vs(e) {
        return 0 != (512 & e[x])
      }
      function Jt(e, t) {
        return e.hasOwnProperty(wt) ? e[wt] : null
      }
      let fe = null,
        Po = !1
      function Ue(e) {
        const t = fe
        return (fe = e), t
      }
      const ql = {
        version: 0,
        dirty: !1,
        producerNode: void 0,
        producerLastReadVersion: void 0,
        producerIndexOfThis: void 0,
        nextProducerIndex: 0,
        liveConsumerNode: void 0,
        liveConsumerIndexOfThis: void 0,
        consumerAllowSignalWrites: !1,
        consumerIsAlwaysLive: !1,
        producerMustRecompute: () => !1,
        producerRecomputeValue: () => {},
        consumerMarkedDirty: () => {},
      }
      function Zl(e) {
        if (!_r(e) || e.dirty) {
          if (!e.producerMustRecompute(e) && !Kl(e)) return void (e.dirty = !1)
          e.producerRecomputeValue(e), (e.dirty = !1)
        }
      }
      function Ql(e) {
        ;(e.dirty = !0),
          (function Yl(e) {
            if (void 0 === e.liveConsumerNode) return
            const t = Po
            Po = !0
            try {
              for (const n of e.liveConsumerNode) n.dirty || Ql(n)
            } finally {
              Po = t
            }
          })(e),
          e.consumerMarkedDirty?.(e)
      }
      function Bs(e) {
        return e && (e.nextProducerIndex = 0), Ue(e)
      }
      function $s(e, t) {
        if (
          (Ue(t),
          e &&
            void 0 !== e.producerNode &&
            void 0 !== e.producerIndexOfThis &&
            void 0 !== e.producerLastReadVersion)
        ) {
          if (_r(e))
            for (let n = e.nextProducerIndex; n < e.producerNode.length; n++)
              Ro(e.producerNode[n], e.producerIndexOfThis[n])
          for (; e.producerNode.length > e.nextProducerIndex; )
            e.producerNode.pop(),
              e.producerLastReadVersion.pop(),
              e.producerIndexOfThis.pop()
        }
      }
      function Kl(e) {
        Dn(e)
        for (let t = 0; t < e.producerNode.length; t++) {
          const n = e.producerNode[t],
            r = e.producerLastReadVersion[t]
          if (r !== n.version || (Zl(n), r !== n.version)) return !0
        }
        return !1
      }
      function Xl(e) {
        if ((Dn(e), _r(e)))
          for (let t = 0; t < e.producerNode.length; t++)
            Ro(e.producerNode[t], e.producerIndexOfThis[t])
        ;(e.producerNode.length =
          e.producerLastReadVersion.length =
          e.producerIndexOfThis.length =
            0),
          e.liveConsumerNode &&
            (e.liveConsumerNode.length = e.liveConsumerIndexOfThis.length = 0)
      }
      function Ro(e, t) {
        if (
          ((function ed(e) {
            ;(e.liveConsumerNode ??= []), (e.liveConsumerIndexOfThis ??= [])
          })(e),
          Dn(e),
          1 === e.liveConsumerNode.length)
        )
          for (let r = 0; r < e.producerNode.length; r++)
            Ro(e.producerNode[r], e.producerIndexOfThis[r])
        const n = e.liveConsumerNode.length - 1
        if (
          ((e.liveConsumerNode[t] = e.liveConsumerNode[n]),
          (e.liveConsumerIndexOfThis[t] = e.liveConsumerIndexOfThis[n]),
          e.liveConsumerNode.length--,
          e.liveConsumerIndexOfThis.length--,
          t < e.liveConsumerNode.length)
        ) {
          const r = e.liveConsumerIndexOfThis[t],
            o = e.liveConsumerNode[t]
          Dn(o), (o.producerIndexOfThis[r] = t)
        }
      }
      function _r(e) {
        return e.consumerIsAlwaysLive || (e?.liveConsumerNode?.length ?? 0) > 0
      }
      function Dn(e) {
        ;(e.producerNode ??= []),
          (e.producerIndexOfThis ??= []),
          (e.producerLastReadVersion ??= [])
      }
      let td = null
      const id = () => {},
        Qv = (() => ({
          ...ql,
          consumerIsAlwaysLive: !0,
          consumerAllowSignalWrites: !1,
          consumerMarkedDirty: (e) => {
            e.schedule(e.ref)
          },
          hasRun: !1,
          cleanupFn: id,
        }))()
      class Kv {
        constructor(t, n, r) {
          ;(this.previousValue = t),
            (this.currentValue = n),
            (this.firstChange = r)
        }
        isFirstChange() {
          return this.firstChange
        }
      }
      function Ir() {
        return sd
      }
      function sd(e) {
        return e.type.prototype.ngOnChanges && (e.setInput = Jv), Xv
      }
      function Xv() {
        const e = ud(this),
          t = e?.current
        if (t) {
          const n = e.previous
          if (n === it) e.previous = t
          else for (let r in t) n[r] = t[r]
          ;(e.current = null), this.ngOnChanges(t)
        }
      }
      function Jv(e, t, n, r) {
        const o = this.declaredInputs[n],
          i =
            ud(e) ||
            (function ew(e, t) {
              return (e[ad] = t)
            })(e, { previous: it, current: null }),
          s = i.current || (i.current = {}),
          a = i.previous,
          u = a[o]
        ;(s[o] = new Kv(u && u.currentValue, t, a === it)), (e[r] = t)
      }
      Ir.ngInherit = !0
      const ad = '__ngSimpleChanges__'
      function ud(e) {
        return e[ad] || null
      }
      const ut = function (e, t, n) {}
      function Z(e) {
        for (; Array.isArray(e); ) e = e[ee]
        return e
      }
      function Ne(e, t) {
        return Z(t[e.index])
      }
      function dd(e, t) {
        return e.data[t]
      }
      function Le(e, t) {
        const n = t[e]
        return Te(n) ? n : n[ee]
      }
      function Bt(e, t) {
        return null == t ? null : e[t]
      }
      function fd(e) {
        e[mn] = 0
      }
      function sw(e) {
        1024 & e[x] || ((e[x] |= 1024), pd(e, 1))
      }
      function hd(e) {
        1024 & e[x] && ((e[x] &= -1025), pd(e, -1))
      }
      function pd(e, t) {
        let n = e[K]
        if (null === n) return
        n[mr] += t
        let r = n
        for (
          n = n[K];
          null !== n && ((1 === t && 1 === r[mr]) || (-1 === t && 0 === r[mr]));

        )
          (n[mr] += t), (r = n), (n = n[K])
      }
      const I = {
        lFrame: Sd(null),
        bindingsEnabled: !0,
        skipHydrationRootTNode: null,
      }
      function yd() {
        return I.bindingsEnabled
      }
      function y() {
        return I.lFrame.lView
      }
      function j() {
        return I.lFrame.tView
      }
      function he() {
        let e = wd()
        for (; null !== e && 64 === e.type; ) e = e.parent
        return e
      }
      function wd() {
        return I.lFrame.currentTNode
      }
      function ct(e, t) {
        const n = I.lFrame
        ;(n.currentTNode = e), (n.isParent = t)
      }
      function Ws() {
        return I.lFrame.isParent
      }
      function En() {
        return I.lFrame.bindingIndex++
      }
      function Dw(e, t) {
        const n = I.lFrame
        ;(n.bindingIndex = n.bindingRootIndex = e), Ys(t)
      }
      function Ys(e) {
        I.lFrame.currentDirectiveIndex = e
      }
      function Ks(e) {
        I.lFrame.currentQueryIndex = e
      }
      function ww(e) {
        const t = e[w]
        return 2 === t.type ? t.declTNode : 1 === t.type ? e[pe] : null
      }
      function Md(e, t, n) {
        if (n & L.SkipSelf) {
          let o = t,
            i = e
          for (
            ;
            !((o = o.parent),
            null !== o ||
              n & L.Host ||
              ((o = ww(i)), null === o || ((i = i[gn]), 10 & o.type)));

          );
          if (null === o) return !1
          ;(t = o), (e = i)
        }
        const r = (I.lFrame = bd())
        return (r.currentTNode = t), (r.lView = e), !0
      }
      function Xs(e) {
        const t = bd(),
          n = e[w]
        ;(I.lFrame = t),
          (t.currentTNode = n.firstChild),
          (t.lView = e),
          (t.tView = n),
          (t.contextLView = e),
          (t.bindingIndex = n.bindingStartIndex),
          (t.inI18n = !1)
      }
      function bd() {
        const e = I.lFrame,
          t = null === e ? null : e.child
        return null === t ? Sd(e) : t
      }
      function Sd(e) {
        const t = {
          currentTNode: null,
          isParent: !0,
          lView: null,
          tView: null,
          selectedIndex: -1,
          contextLView: null,
          elementDepthCount: 0,
          currentNamespace: null,
          currentDirectiveIndex: -1,
          bindingRootIndex: -1,
          bindingIndex: -1,
          currentQueryIndex: 0,
          parent: e,
          child: null,
          inI18n: !1,
        }
        return null !== e && (e.child = t), t
      }
      function Td() {
        const e = I.lFrame
        return (
          (I.lFrame = e.parent), (e.currentTNode = null), (e.lView = null), e
        )
      }
      const Nd = Td
      function Js() {
        const e = Td()
        ;(e.isParent = !0),
          (e.tView = null),
          (e.selectedIndex = -1),
          (e.contextLView = null),
          (e.elementDepthCount = 0),
          (e.currentDirectiveIndex = -1),
          (e.currentNamespace = null),
          (e.bindingRootIndex = -1),
          (e.bindingIndex = -1),
          (e.currentQueryIndex = 0)
      }
      function we() {
        return I.lFrame.selectedIndex
      }
      function en(e) {
        I.lFrame.selectedIndex = e
      }
      let xd = !0
      function Lo() {
        return xd
      }
      function $t(e) {
        xd = e
      }
      function ko(e, t) {
        for (let n = t.directiveStart, r = t.directiveEnd; n < r; n++) {
          const i = e.data[n].type.prototype,
            {
              ngAfterContentInit: s,
              ngAfterContentChecked: a,
              ngAfterViewInit: u,
              ngAfterViewChecked: c,
              ngOnDestroy: l,
            } = i
          s && (e.contentHooks ??= []).push(-n, s),
            a &&
              ((e.contentHooks ??= []).push(n, a),
              (e.contentCheckHooks ??= []).push(n, a)),
            u && (e.viewHooks ??= []).push(-n, u),
            c &&
              ((e.viewHooks ??= []).push(n, c),
              (e.viewCheckHooks ??= []).push(n, c)),
            null != l && (e.destroyHooks ??= []).push(n, l)
        }
      }
      function jo(e, t, n) {
        Od(e, t, 3, n)
      }
      function Vo(e, t, n, r) {
        ;(3 & e[x]) === n && Od(e, t, n, r)
      }
      function ea(e, t) {
        let n = e[x]
        ;(3 & n) === t && ((n &= 8191), (n += 1), (e[x] = n))
      }
      function Od(e, t, n, r) {
        const i = r ?? -1,
          s = t.length - 1
        let a = 0
        for (let u = void 0 !== r ? 65535 & e[mn] : 0; u < s; u++)
          if ('number' == typeof t[u + 1]) {
            if (((a = t[u]), null != r && a >= r)) break
          } else
            t[u] < 0 && (e[mn] += 65536),
              (a < i || -1 == i) &&
                (Tw(e, n, t, u), (e[mn] = (4294901760 & e[mn]) + u + 2)),
              u++
      }
      function Pd(e, t) {
        ut(4, e, t)
        const n = Ue(null)
        try {
          t.call(e)
        } finally {
          Ue(n), ut(5, e, t)
        }
      }
      function Tw(e, t, n, r) {
        const o = n[r] < 0,
          i = n[r + 1],
          a = e[o ? -n[r] : n[r]]
        o
          ? e[x] >> 13 < e[mn] >> 16 &&
            (3 & e[x]) === t &&
            ((e[x] += 8192), Pd(a, i))
          : Pd(a, i)
      }
      const Cn = -1
      class br {
        constructor(t, n, r) {
          ;(this.factory = t),
            (this.resolving = !1),
            (this.canSeeViewProviders = n),
            (this.injectImpl = r)
        }
      }
      function na(e) {
        return e !== Cn
      }
      function Sr(e) {
        return 32767 & e
      }
      function Tr(e, t) {
        let n = (function Ow(e) {
            return e >> 16
          })(e),
          r = t
        for (; n > 0; ) (r = r[gn]), n--
        return r
      }
      let ra = !0
      function Ho(e) {
        const t = ra
        return (ra = e), t
      }
      const Rd = 255,
        Fd = 5
      let Pw = 0
      const lt = {}
      function Bo(e, t) {
        const n = Ld(e, t)
        if (-1 !== n) return n
        const r = t[w]
        r.firstCreatePass &&
          ((e.injectorIndex = t.length),
          oa(r.data, e),
          oa(t, null),
          oa(r.blueprint, null))
        const o = $o(e, t),
          i = e.injectorIndex
        if (na(o)) {
          const s = Sr(o),
            a = Tr(o, t),
            u = a[w].data
          for (let c = 0; c < 8; c++) t[i + c] = a[s + c] | u[s + c]
        }
        return (t[i + 8] = o), i
      }
      function oa(e, t) {
        e.push(0, 0, 0, 0, 0, 0, 0, 0, t)
      }
      function Ld(e, t) {
        return -1 === e.injectorIndex ||
          (e.parent && e.parent.injectorIndex === e.injectorIndex) ||
          null === t[e.injectorIndex + 8]
          ? -1
          : e.injectorIndex
      }
      function $o(e, t) {
        if (e.parent && -1 !== e.parent.injectorIndex)
          return e.parent.injectorIndex
        let n = 0,
          r = null,
          o = t
        for (; null !== o; ) {
          if (((r = Ud(o)), null === r)) return Cn
          if ((n++, (o = o[gn]), -1 !== r.injectorIndex))
            return r.injectorIndex | (n << 16)
        }
        return Cn
      }
      function ia(e, t, n) {
        !(function Rw(e, t, n) {
          let r
          'string' == typeof n
            ? (r = n.charCodeAt(0) || 0)
            : n.hasOwnProperty(fr) && (r = n[fr]),
            null == r && (r = n[fr] = Pw++)
          const o = r & Rd
          t.data[e + (o >> Fd)] |= 1 << o
        })(e, t, n)
      }
      function kd(e, t, n) {
        if (n & L.Optional || void 0 !== e) return e
        Ms()
      }
      function jd(e, t, n, r) {
        if (
          (n & L.Optional && void 0 === r && (r = null),
          !(n & (L.Self | L.Host)))
        ) {
          const o = e[jt],
            i = be(void 0)
          try {
            return o ? o.get(t, r, n & L.Optional) : Il(t, r, n & L.Optional)
          } finally {
            be(i)
          }
        }
        return kd(r, 0, n)
      }
      function Vd(e, t, n, r = L.Default, o) {
        if (null !== e) {
          if (2048 & t[x] && !(r & L.Self)) {
            const s = (function Bw(e, t, n, r, o) {
              let i = e,
                s = t
              for (
                ;
                null !== i && null !== s && 2048 & s[x] && !(512 & s[x]);

              ) {
                const a = Hd(i, s, n, r | L.Self, lt)
                if (a !== lt) return a
                let u = i.parent
                if (!u) {
                  const c = s[$l]
                  if (c) {
                    const l = c.get(n, lt, r)
                    if (l !== lt) return l
                  }
                  ;(u = Ud(s)), (s = s[gn])
                }
                i = u
              }
              return o
            })(e, t, n, r, lt)
            if (s !== lt) return s
          }
          const i = Hd(e, t, n, r, lt)
          if (i !== lt) return i
        }
        return jd(t, n, r, o)
      }
      function Hd(e, t, n, r, o) {
        const i = (function kw(e) {
          if ('string' == typeof e) return e.charCodeAt(0) || 0
          const t = e.hasOwnProperty(fr) ? e[fr] : void 0
          return 'number' == typeof t ? (t >= 0 ? t & Rd : Vw) : t
        })(n)
        if ('function' == typeof i) {
          if (!Md(t, e, r)) return r & L.Host ? kd(o, 0, r) : jd(t, n, r, o)
          try {
            let s
            if (((s = i(r)), null != s || r & L.Optional)) return s
            Ms()
          } finally {
            Nd()
          }
        } else if ('number' == typeof i) {
          let s = null,
            a = Ld(e, t),
            u = Cn,
            c = r & L.Host ? t[oe][pe] : null
          for (
            (-1 === a || r & L.SkipSelf) &&
            ((u = -1 === a ? $o(e, t) : t[a + 8]),
            u !== Cn && $d(r, !1)
              ? ((s = t[w]), (a = Sr(u)), (t = Tr(u, t)))
              : (a = -1));
            -1 !== a;

          ) {
            const l = t[w]
            if (Bd(i, a, l.data)) {
              const d = Lw(a, t, n, s, r, c)
              if (d !== lt) return d
            }
            ;(u = t[a + 8]),
              u !== Cn && $d(r, t[w].data[a + 8] === c) && Bd(i, a, t)
                ? ((s = l), (a = Sr(u)), (t = Tr(u, t)))
                : (a = -1)
          }
        }
        return o
      }
      function Lw(e, t, n, r, o, i) {
        const s = t[w],
          a = s.data[e + 8],
          l = (function Uo(e, t, n, r, o) {
            const i = e.providerIndexes,
              s = t.data,
              a = 1048575 & i,
              u = e.directiveStart,
              l = i >> 20,
              f = o ? a + l : e.directiveEnd
            for (let h = r ? a : a + l; h < f; h++) {
              const p = s[h]
              if ((h < u && n === p) || (h >= u && p.type === n)) return h
            }
            if (o) {
              const h = s[u]
              if (h && Xe(h) && h.type === n) return u
            }
            return null
          })(
            a,
            s,
            n,
            null == r ? Xt(a) && ra : r != s && 0 != (3 & a.type),
            o & L.Host && i === a
          )
        return null !== l ? tn(t, s, l, a) : lt
      }
      function tn(e, t, n, r) {
        let o = e[n]
        const i = t.data
        if (
          (function Nw(e) {
            return e instanceof br
          })(o)
        ) {
          const s = o
          s.resolving &&
            (function iv(e, t) {
              const n = t ? `. Dependency path: ${t.join(' > ')} > ${e}` : ''
              throw new E(
                -200,
                `Circular dependency in DI detected for ${e}${n}`
              )
            })(
              (function $(e) {
                return 'function' == typeof e
                  ? e.name || e.toString()
                  : 'object' == typeof e &&
                    null != e &&
                    'function' == typeof e.type
                  ? e.type.name || e.type.toString()
                  : S(e)
              })(i[n])
            )
          const a = Ho(s.canSeeViewProviders)
          s.resolving = !0
          const c = s.injectImpl ? be(s.injectImpl) : null
          Md(e, r, L.Default)
          try {
            ;(o = e[n] = s.factory(void 0, i, e, r)),
              t.firstCreatePass &&
                n >= r.directiveStart &&
                (function Sw(e, t, n) {
                  const {
                    ngOnChanges: r,
                    ngOnInit: o,
                    ngDoCheck: i,
                  } = t.type.prototype
                  if (r) {
                    const s = sd(t)
                    ;(n.preOrderHooks ??= []).push(e, s),
                      (n.preOrderCheckHooks ??= []).push(e, s)
                  }
                  o && (n.preOrderHooks ??= []).push(0 - e, o),
                    i &&
                      ((n.preOrderHooks ??= []).push(e, i),
                      (n.preOrderCheckHooks ??= []).push(e, i))
                })(n, i[n], t)
          } finally {
            null !== c && be(c), Ho(a), (s.resolving = !1), Nd()
          }
        }
        return o
      }
      function Bd(e, t, n) {
        return !!(n[t + (e >> Fd)] & (1 << e))
      }
      function $d(e, t) {
        return !(e & L.Self || (e & L.Host && t))
      }
      class Ee {
        constructor(t, n) {
          ;(this._tNode = t), (this._lView = n)
        }
        get(t, n, r) {
          return Vd(this._tNode, this._lView, t, bo(r), n)
        }
      }
      function Vw() {
        return new Ee(he(), y())
      }
      function Ud(e) {
        const t = e[w],
          n = t.type
        return 2 === n ? t.declTNode : 1 === n ? e[pe] : null
      }
      function Tn(e, t) {
        e.forEach((n) => (Array.isArray(n) ? Tn(n, t) : t(n)))
      }
      function zd(e, t, n) {
        t >= e.length ? e.push(n) : e.splice(t, 0, n)
      }
      function Go(e, t) {
        return t >= e.length - 1 ? e.pop() : e.splice(t, 1)[0]
      }
      function Qo(e) {
        return 128 == (128 & e.flags)
      }
      var Ut = (function (e) {
        return (
          (e[(e.Important = 1)] = 'Important'),
          (e[(e.DashCase = 2)] = 'DashCase'),
          e
        )
      })(Ut || {})
      const ma = new Map()
      let DE = 0
      const Da = '__ngContext__'
      function ge(e, t) {
        Te(t)
          ? ((e[Da] = t[vr]),
            (function wE(e) {
              ma.set(e[vr], e)
            })(t))
          : (e[Da] = t)
      }
      let va
      function wa(e, t) {
        return va(e, t)
      }
      function Rr(e) {
        const t = e[K]
        return De(t) ? t[K] : t
      }
      function hf(e) {
        return gf(e[yr])
      }
      function pf(e) {
        return gf(e[Ke])
      }
      function gf(e) {
        for (; null !== e && !De(e); ) e = e[Ke]
        return e
      }
      function On(e, t, n, r, o) {
        if (null != r) {
          let i,
            s = !1
          De(r) ? (i = r) : Te(r) && ((s = !0), (r = r[ee]))
          const a = Z(r)
          0 === e && null !== n
            ? null == o
              ? vf(t, n, a)
              : nn(t, n, a, o || null, !0)
            : 1 === e && null !== n
            ? nn(t, n, a, o || null, !0)
            : 2 === e
            ? (function ri(e, t, n) {
                const r = ti(e, t)
                r &&
                  (function VE(e, t, n, r) {
                    e.removeChild(t, n, r)
                  })(e, r, t, n)
              })(t, a, s)
            : 3 === e && t.destroyNode(a),
            null != i &&
              (function $E(e, t, n, r, o) {
                const i = n[at]
                i !== Z(n) && On(t, e, r, i, o)
                for (let a = de; a < n.length; a++) {
                  const u = n[a]
                  Lr(u[w], u, e, t, r, i)
                }
              })(t, e, i, n, o)
        }
      }
      function Jo(e, t, n) {
        return e.createElement(t, n)
      }
      function yf(e, t) {
        const n = e[yn],
          r = n.indexOf(t)
        hd(t), n.splice(r, 1)
      }
      function ei(e, t) {
        if (e.length <= de) return
        const n = de + t,
          r = e[n]
        if (r) {
          const o = r[Dr]
          null !== o && o !== e && yf(o, r), t > 0 && (e[n - 1][Ke] = r[Ke])
          const i = Go(e, de + t)
          !(function xE(e, t) {
            Lr(e, t, t[T], 2, null, null), (t[ee] = null), (t[pe] = null)
          })(r[w], r)
          const s = i[st]
          null !== s && s.detachView(i[w]),
            (r[K] = null),
            (r[Ke] = null),
            (r[x] &= -129)
        }
        return r
      }
      function Ca(e, t) {
        if (!(256 & t[x])) {
          const n = t[T]
          t[wr] && Xl(t[wr]),
            t[Er] && Xl(t[Er]),
            n.destroyNode && Lr(e, t, n, 3, null, null),
            (function RE(e) {
              let t = e[yr]
              if (!t) return _a(e[w], e)
              for (; t; ) {
                let n = null
                if (Te(t)) n = t[yr]
                else {
                  const r = t[de]
                  r && (n = r)
                }
                if (!n) {
                  for (; t && !t[Ke] && t !== e; )
                    Te(t) && _a(t[w], t), (t = t[K])
                  null === t && (t = e), Te(t) && _a(t[w], t), (n = t && t[Ke])
                }
                t = n
              }
            })(t)
        }
      }
      function _a(e, t) {
        if (!(256 & t[x])) {
          ;(t[x] &= -129),
            (t[x] |= 256),
            (function jE(e, t) {
              let n
              if (null != e && null != (n = e.destroyHooks))
                for (let r = 0; r < n.length; r += 2) {
                  const o = t[n[r]]
                  if (!(o instanceof br)) {
                    const i = n[r + 1]
                    if (Array.isArray(i))
                      for (let s = 0; s < i.length; s += 2) {
                        const a = o[i[s]],
                          u = i[s + 1]
                        ut(4, a, u)
                        try {
                          u.call(a)
                        } finally {
                          ut(5, a, u)
                        }
                      }
                    else {
                      ut(4, o, i)
                      try {
                        i.call(o)
                      } finally {
                        ut(5, o, i)
                      }
                    }
                  }
                }
            })(e, t),
            (function kE(e, t) {
              const n = e.cleanup,
                r = t[hn]
              if (null !== n)
                for (let i = 0; i < n.length - 1; i += 2)
                  if ('string' == typeof n[i]) {
                    const s = n[i + 3]
                    s >= 0 ? r[s]() : r[-s].unsubscribe(), (i += 2)
                  } else n[i].call(r[n[i + 1]])
              null !== r && (t[hn] = null)
              const o = t[Vt]
              if (null !== o) {
                t[Vt] = null
                for (let i = 0; i < o.length; i++) (0, o[i])()
              }
            })(e, t),
            1 === t[w].type && t[T].destroy()
          const n = t[Dr]
          if (null !== n && De(t[K])) {
            n !== t[K] && yf(n, t)
            const r = t[st]
            null !== r && r.detachView(e)
          }
          !(function EE(e) {
            ma.delete(e[vr])
          })(t)
        }
      }
      function Ia(e, t, n) {
        return (function Df(e, t, n) {
          let r = t
          for (; null !== r && 40 & r.type; ) r = (t = r).parent
          if (null === r) return n[ee]
          {
            const { componentOffset: o } = r
            if (o > -1) {
              const { encapsulation: i } = e.data[r.directiveStart + o]
              if (i === Ye.None || i === Ye.Emulated) return null
            }
            return Ne(r, n)
          }
        })(e, t.parent, n)
      }
      function nn(e, t, n, r, o) {
        e.insertBefore(t, n, r, o)
      }
      function vf(e, t, n) {
        e.appendChild(t, n)
      }
      function wf(e, t, n, r, o) {
        null !== r ? nn(e, t, n, r, o) : vf(e, t, n)
      }
      function ti(e, t) {
        return e.parentNode(t)
      }
      let Ma,
        oi,
        Na,
        ii,
        _f = function Cf(e, t, n) {
          return 40 & e.type ? Ne(e, n) : null
        }
      function ni(e, t, n, r) {
        const o = Ia(e, r, t),
          i = t[T],
          a = (function Ef(e, t, n) {
            return _f(e, t, n)
          })(r.parent || t[pe], r, t)
        if (null != o)
          if (Array.isArray(n))
            for (let u = 0; u < n.length; u++) wf(i, o, n[u], a, !1)
          else wf(i, o, n, a, !1)
        void 0 !== Ma && Ma(i, r, t, n, o)
      }
      function Fr(e, t) {
        if (null !== t) {
          const n = t.type
          if (3 & n) return Ne(t, e)
          if (4 & n) return ba(-1, e[t.index])
          if (8 & n) {
            const r = t.child
            if (null !== r) return Fr(e, r)
            {
              const o = e[t.index]
              return De(o) ? ba(-1, o) : Z(o)
            }
          }
          if (32 & n) return wa(t, e)() || Z(e[t.index])
          {
            const r = Mf(e, t)
            return null !== r
              ? Array.isArray(r)
                ? r[0]
                : Fr(Rr(e[oe]), r)
              : Fr(e, t.next)
          }
        }
        return null
      }
      function Mf(e, t) {
        return null !== t ? e[oe][pe].projection[t.projection] : null
      }
      function ba(e, t) {
        const n = de + e + 1
        if (n < t.length) {
          const r = t[n],
            o = r[w].firstChild
          if (null !== o) return Fr(r, o)
        }
        return t[at]
      }
      function Sa(e, t, n, r, o, i, s) {
        for (; null != n; ) {
          const a = r[n.index],
            u = n.type
          if (
            (s && 0 === t && (a && ge(Z(a), r), (n.flags |= 2)),
            32 != (32 & n.flags))
          )
            if (8 & u) Sa(e, t, n.child, r, o, i, !1), On(t, e, o, a, i)
            else if (32 & u) {
              const c = wa(n, r)
              let l
              for (; (l = c()); ) On(t, e, o, l, i)
              On(t, e, o, a, i)
            } else 16 & u ? Sf(e, t, r, n, o, i) : On(t, e, o, a, i)
          n = s ? n.projectionNext : n.next
        }
      }
      function Lr(e, t, n, r, o, i) {
        Sa(n, r, e.firstChild, t, o, i, !1)
      }
      function Sf(e, t, n, r, o, i) {
        const s = n[oe],
          u = s[pe].projection[r.projection]
        if (Array.isArray(u))
          for (let c = 0; c < u.length; c++) On(t, e, o, u[c], i)
        else {
          let c = u
          const l = s[K]
          Qo(r) && (c.flags |= 128), Sa(e, t, c, l, o, i, !0)
        }
      }
      function Tf(e, t, n) {
        '' === n ? e.removeAttribute(t, 'class') : e.setAttribute(t, 'class', n)
      }
      function Nf(e, t, n) {
        const { mergedAttrs: r, classes: o, styles: i } = n
        null !== r && Ls(e, t, r),
          null !== o && Tf(e, t, o),
          null !== i &&
            (function GE(e, t, n) {
              e.setAttribute(t, 'style', n)
            })(e, t, i)
      }
      function Pn(e) {
        return (
          (function Ta() {
            if (void 0 === oi && ((oi = null), q.trustedTypes))
              try {
                oi = q.trustedTypes.createPolicy('angular', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return oi
          })()?.createHTML(e) || e
        )
      }
      function Rn() {
        if (void 0 !== Na) return Na
        if (typeof document < 'u') return document
        throw new E(210, !1)
      }
      function Af(e) {
        return (
          (function Aa() {
            if (void 0 === ii && ((ii = null), q.trustedTypes))
              try {
                ii = q.trustedTypes.createPolicy('angular#unsafe-bypass', {
                  createHTML: (e) => e,
                  createScript: (e) => e,
                  createScriptURL: (e) => e,
                })
              } catch {}
            return ii
          })()?.createHTML(e) || e
        )
      }
      class rn {
        constructor(t) {
          this.changingThisBreaksApplicationSecurity = t
        }
        toString() {
          return `SafeValue must use [property]=binding: ${this.changingThisBreaksApplicationSecurity} (see ${wl})`
        }
      }
      class YE extends rn {
        getTypeName() {
          return 'HTML'
        }
      }
      class QE extends rn {
        getTypeName() {
          return 'Style'
        }
      }
      class KE extends rn {
        getTypeName() {
          return 'Script'
        }
      }
      class XE extends rn {
        getTypeName() {
          return 'URL'
        }
      }
      class JE extends rn {
        getTypeName() {
          return 'ResourceURL'
        }
      }
      function je(e) {
        return e instanceof rn ? e.changingThisBreaksApplicationSecurity : e
      }
      function dt(e, t) {
        const n = (function eC(e) {
          return (e instanceof rn && e.getTypeName()) || null
        })(e)
        if (null != n && n !== t) {
          if ('ResourceURL' === n && 'URL' === t) return !0
          throw new Error(`Required a safe ${t}, got a ${n} (see ${wl})`)
        }
        return n === t
      }
      class sC {
        constructor(t) {
          this.inertDocumentHelper = t
        }
        getInertBodyElement(t) {
          t = '<body><remove></remove>' + t
          try {
            const n = new window.DOMParser().parseFromString(
              Pn(t),
              'text/html'
            ).body
            return null === n
              ? this.inertDocumentHelper.getInertBodyElement(t)
              : (n.removeChild(n.firstChild), n)
          } catch {
            return null
          }
        }
      }
      class aC {
        constructor(t) {
          ;(this.defaultDoc = t),
            (this.inertDocument =
              this.defaultDoc.implementation.createHTMLDocument(
                'sanitization-inert'
              ))
        }
        getInertBodyElement(t) {
          const n = this.inertDocument.createElement('template')
          return (n.innerHTML = Pn(t)), n
        }
      }
      const cC = /^(?!javascript:)(?:[a-z0-9+.-]+:|[^&:\/?#]*(?:[\/?#]|$))/i
      function si(e) {
        return (e = String(e)).match(cC) ? e : 'unsafe:' + e
      }
      function It(e) {
        const t = {}
        for (const n of e.split(',')) t[n] = !0
        return t
      }
      function kr(...e) {
        const t = {}
        for (const n of e) for (const r in n) n.hasOwnProperty(r) && (t[r] = !0)
        return t
      }
      const Rf = It('area,br,col,hr,img,wbr'),
        Ff = It('colgroup,dd,dt,li,p,tbody,td,tfoot,th,thead,tr'),
        Lf = It('rp,rt'),
        xa = kr(
          Rf,
          kr(
            Ff,
            It(
              'address,article,aside,blockquote,caption,center,del,details,dialog,dir,div,dl,figure,figcaption,footer,h1,h2,h3,h4,h5,h6,header,hgroup,hr,ins,main,map,menu,nav,ol,pre,section,summary,table,ul'
            )
          ),
          kr(
            Lf,
            It(
              'a,abbr,acronym,audio,b,bdi,bdo,big,br,cite,code,del,dfn,em,font,i,img,ins,kbd,label,map,mark,picture,q,ruby,rp,rt,s,samp,small,source,span,strike,strong,sub,sup,time,track,tt,u,var,video'
            )
          ),
          kr(Lf, Ff)
        ),
        Oa = It('background,cite,href,itemtype,longdesc,poster,src,xlink:href'),
        kf = kr(
          Oa,
          It(
            'abbr,accesskey,align,alt,autoplay,axis,bgcolor,border,cellpadding,cellspacing,class,clear,color,cols,colspan,compact,controls,coords,datetime,default,dir,download,face,headers,height,hidden,hreflang,hspace,ismap,itemscope,itemprop,kind,label,lang,language,loop,media,muted,nohref,nowrap,open,preload,rel,rev,role,rows,rowspan,rules,scope,scrolling,shape,size,sizes,span,srclang,srcset,start,summary,tabindex,target,title,translate,type,usemap,valign,value,vspace,width'
          ),
          It(
            'aria-activedescendant,aria-atomic,aria-autocomplete,aria-busy,aria-checked,aria-colcount,aria-colindex,aria-colspan,aria-controls,aria-current,aria-describedby,aria-details,aria-disabled,aria-dropeffect,aria-errormessage,aria-expanded,aria-flowto,aria-grabbed,aria-haspopup,aria-hidden,aria-invalid,aria-keyshortcuts,aria-label,aria-labelledby,aria-level,aria-live,aria-modal,aria-multiline,aria-multiselectable,aria-orientation,aria-owns,aria-placeholder,aria-posinset,aria-pressed,aria-readonly,aria-relevant,aria-required,aria-roledescription,aria-rowcount,aria-rowindex,aria-rowspan,aria-selected,aria-setsize,aria-sort,aria-valuemax,aria-valuemin,aria-valuenow,aria-valuetext'
          )
        ),
        lC = It('script,style,template')
      class dC {
        constructor() {
          ;(this.sanitizedSomething = !1), (this.buf = [])
        }
        sanitizeChildren(t) {
          let n = t.firstChild,
            r = !0
          for (; n; )
            if (
              (n.nodeType === Node.ELEMENT_NODE
                ? (r = this.startElement(n))
                : n.nodeType === Node.TEXT_NODE
                ? this.chars(n.nodeValue)
                : (this.sanitizedSomething = !0),
              r && n.firstChild)
            )
              n = n.firstChild
            else
              for (; n; ) {
                n.nodeType === Node.ELEMENT_NODE && this.endElement(n)
                let o = this.checkClobberedElement(n, n.nextSibling)
                if (o) {
                  n = o
                  break
                }
                n = this.checkClobberedElement(n, n.parentNode)
              }
          return this.buf.join('')
        }
        startElement(t) {
          const n = t.nodeName.toLowerCase()
          if (!xa.hasOwnProperty(n))
            return (this.sanitizedSomething = !0), !lC.hasOwnProperty(n)
          this.buf.push('<'), this.buf.push(n)
          const r = t.attributes
          for (let o = 0; o < r.length; o++) {
            const i = r.item(o),
              s = i.name,
              a = s.toLowerCase()
            if (!kf.hasOwnProperty(a)) {
              this.sanitizedSomething = !0
              continue
            }
            let u = i.value
            Oa[a] && (u = si(u)), this.buf.push(' ', s, '="', jf(u), '"')
          }
          return this.buf.push('>'), !0
        }
        endElement(t) {
          const n = t.nodeName.toLowerCase()
          xa.hasOwnProperty(n) &&
            !Rf.hasOwnProperty(n) &&
            (this.buf.push('</'), this.buf.push(n), this.buf.push('>'))
        }
        chars(t) {
          this.buf.push(jf(t))
        }
        checkClobberedElement(t, n) {
          if (
            n &&
            (t.compareDocumentPosition(n) &
              Node.DOCUMENT_POSITION_CONTAINED_BY) ===
              Node.DOCUMENT_POSITION_CONTAINED_BY
          )
            throw new Error(
              `Failed to sanitize html because the element is clobbered: ${t.outerHTML}`
            )
          return n
        }
      }
      const fC = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g,
        hC = /([^\#-~ |!])/g
      function jf(e) {
        return e
          .replace(/&/g, '&amp;')
          .replace(fC, function (t) {
            return (
              '&#' +
              (1024 * (t.charCodeAt(0) - 55296) +
                (t.charCodeAt(1) - 56320) +
                65536) +
              ';'
            )
          })
          .replace(hC, function (t) {
            return '&#' + t.charCodeAt(0) + ';'
          })
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
      }
      let ai
      function Vf(e, t) {
        let n = null
        try {
          ai =
            ai ||
            (function Pf(e) {
              const t = new aC(e)
              return (function uC() {
                try {
                  return !!new window.DOMParser().parseFromString(
                    Pn(''),
                    'text/html'
                  )
                } catch {
                  return !1
                }
              })()
                ? new sC(t)
                : t
            })(e)
          let r = t ? String(t) : ''
          n = ai.getInertBodyElement(r)
          let o = 5,
            i = r
          do {
            if (0 === o)
              throw new Error(
                'Failed to sanitize html because the input is unstable'
              )
            o--, (r = i), (i = n.innerHTML), (n = ai.getInertBodyElement(r))
          } while (r !== i)
          return Pn(new dC().sanitizeChildren(Pa(n) || n))
        } finally {
          if (n) {
            const r = Pa(n) || n
            for (; r.firstChild; ) r.removeChild(r.firstChild)
          }
        }
      }
      function Pa(e) {
        return 'content' in e &&
          (function pC(e) {
            return e.nodeType === Node.ELEMENT_NODE && 'TEMPLATE' === e.nodeName
          })(e)
          ? e.content
          : null
      }
      var ze = (function (e) {
        return (
          (e[(e.NONE = 0)] = 'NONE'),
          (e[(e.HTML = 1)] = 'HTML'),
          (e[(e.STYLE = 2)] = 'STYLE'),
          (e[(e.SCRIPT = 3)] = 'SCRIPT'),
          (e[(e.URL = 4)] = 'URL'),
          (e[(e.RESOURCE_URL = 5)] = 'RESOURCE_URL'),
          e
        )
      })(ze || {})
      function Hf(e) {
        const t = (function jr() {
          const e = y()
          return e && e[pn].sanitizer
        })()
        return t
          ? Af(t.sanitize(ze.HTML, e) || '')
          : dt(e, 'HTML')
          ? Af(je(e))
          : Vf(Rn(), S(e))
      }
      class N {
        constructor(t, n) {
          ;(this._desc = t),
            (this.ngMetadataName = 'InjectionToken'),
            (this.ɵprov = void 0),
            'number' == typeof n
              ? (this.__NG_ELEMENT_ID__ = n)
              : void 0 !== n &&
                (this.ɵprov = G({
                  token: this,
                  providedIn: n.providedIn || 'root',
                  factory: n.factory,
                }))
        }
        get multi() {
          return this
        }
        toString() {
          return `InjectionToken ${this._desc}`
        }
      }
      const ui = new N('ENVIRONMENT_INITIALIZER'),
        Uf = new N('INJECTOR', -1),
        Gf = new N('INJECTOR_DEF_TYPES')
      class Ra {
        get(t, n = lr) {
          if (n === lr) {
            const r = new Error(`NullInjectorError: No provider for ${ae(t)}!`)
            throw ((r.name = 'NullInjectorError'), r)
          }
          return n
        }
      }
      function EC(...e) {
        return { ɵproviders: qf(0, e), ɵfromNgModule: !0 }
      }
      function qf(e, ...t) {
        const n = [],
          r = new Set()
        let o
        const i = (s) => {
          n.push(s)
        }
        return (
          Tn(t, (s) => {
            const a = s
            ci(a, i, [], r) && ((o ||= []), o.push(a))
          }),
          void 0 !== o && Wf(o, i),
          n
        )
      }
      function Wf(e, t) {
        for (let n = 0; n < e.length; n++) {
          const { ngModule: r, providers: o } = e[n]
          Fa(o, (i) => {
            t(i, r)
          })
        }
      }
      function ci(e, t, n, r) {
        if (!(e = b(e))) return !1
        let o = null,
          i = _o(e)
        const s = !i && k(e)
        if (i || s) {
          if (s && !s.standalone) return !1
          o = e
        } else {
          const u = e.ngModule
          if (((i = _o(u)), !i)) return !1
          o = u
        }
        const a = r.has(o)
        if (s) {
          if (a) return !1
          if ((r.add(o), s.dependencies)) {
            const u =
              'function' == typeof s.dependencies
                ? s.dependencies()
                : s.dependencies
            for (const c of u) ci(c, t, n, r)
          }
        } else {
          if (!i) return !1
          {
            if (null != i.imports && !a) {
              let c
              r.add(o)
              try {
                Tn(i.imports, (l) => {
                  ci(l, t, n, r) && ((c ||= []), c.push(l))
                })
              } finally {
              }
              void 0 !== c && Wf(c, t)
            }
            if (!a) {
              const c = Jt(o) || (() => new o())
              t({ provide: o, useFactory: c, deps: V }, o),
                t({ provide: Gf, useValue: o, multi: !0 }, o),
                t({ provide: ui, useValue: () => P(o), multi: !0 }, o)
            }
            const u = i.providers
            if (null != u && !a) {
              const c = e
              Fa(u, (l) => {
                t(l, c)
              })
            }
          }
        }
        return o !== e && void 0 !== e.providers
      }
      function Fa(e, t) {
        for (let n of e)
          Is(n) && (n = n.ɵproviders), Array.isArray(n) ? Fa(n, t) : t(n)
      }
      const CC = U({ provide: String, useValue: U })
      function La(e) {
        return null !== e && 'object' == typeof e && CC in e
      }
      function on(e) {
        return 'function' == typeof e
      }
      const ka = new N('Set Injector scope.'),
        li = {},
        IC = {}
      let ja
      function di() {
        return void 0 === ja && (ja = new Ra()), ja
      }
      class Mt {}
      class fi extends Mt {
        get destroyed() {
          return this._destroyed
        }
        constructor(t, n, r, o) {
          super(),
            (this.parent = n),
            (this.source = r),
            (this.scopes = o),
            (this.records = new Map()),
            (this._ngOnDestroyHooks = new Set()),
            (this._onDestroyHooks = []),
            (this._destroyed = !1),
            Ha(t, (s) => this.processProvider(s)),
            this.records.set(Uf, Fn(void 0, this)),
            o.has('environment') && this.records.set(Mt, Fn(void 0, this))
          const i = this.records.get(ka)
          null != i && 'string' == typeof i.value && this.scopes.add(i.value),
            (this.injectorDefTypes = new Set(this.get(Gf.multi, V, L.Self)))
        }
        destroy() {
          this.assertNotDestroyed(), (this._destroyed = !0)
          try {
            for (const n of this._ngOnDestroyHooks) n.ngOnDestroy()
            const t = this._onDestroyHooks
            this._onDestroyHooks = []
            for (const n of t) n()
          } finally {
            this.records.clear(),
              this._ngOnDestroyHooks.clear(),
              this.injectorDefTypes.clear()
          }
        }
        onDestroy(t) {
          return (
            this.assertNotDestroyed(),
            this._onDestroyHooks.push(t),
            () => this.removeOnDestroy(t)
          )
        }
        runInContext(t) {
          this.assertNotDestroyed()
          const n = kt(this),
            r = be(void 0)
          try {
            return t()
          } finally {
            kt(n), be(r)
          }
        }
        get(t, n = lr, r = L.Default) {
          if ((this.assertNotDestroyed(), t.hasOwnProperty(Nl)))
            return t[Nl](this)
          r = bo(r)
          const i = kt(this),
            s = be(void 0)
          try {
            if (!(r & L.SkipSelf)) {
              let u = this.records.get(t)
              if (void 0 === u) {
                const c =
                  (function NC(e) {
                    return (
                      'function' == typeof e ||
                      ('object' == typeof e && e instanceof N)
                    )
                  })(t) && Co(t)
                ;(u = c && this.injectableDefInScope(c) ? Fn(Va(t), li) : null),
                  this.records.set(t, u)
              }
              if (null != u) return this.hydrate(t, u)
            }
            return (r & L.Self ? di() : this.parent).get(
              t,
              (n = r & L.Optional && n === lr ? null : n)
            )
          } catch (a) {
            if ('NullInjectorError' === a.name) {
              if (((a[Mo] = a[Mo] || []).unshift(ae(t)), i)) throw a
              return (function vv(e, t, n, r) {
                const o = e[Mo]
                throw (
                  (t[bl] && o.unshift(t[bl]),
                  (e.message = (function wv(e, t, n, r = null) {
                    e =
                      e && '\n' === e.charAt(0) && '\u0275' == e.charAt(1)
                        ? e.slice(2)
                        : e
                    let o = ae(t)
                    if (Array.isArray(t)) o = t.map(ae).join(' -> ')
                    else if ('object' == typeof t) {
                      let i = []
                      for (let s in t)
                        if (t.hasOwnProperty(s)) {
                          let a = t[s]
                          i.push(
                            s +
                              ':' +
                              ('string' == typeof a ? JSON.stringify(a) : ae(a))
                          )
                        }
                      o = `{${i.join(', ')}}`
                    }
                    return `${n}${r ? '(' + r + ')' : ''}[${o}]: ${e.replace(
                      pv,
                      '\n  '
                    )}`
                  })('\n' + e.message, o, n, r)),
                  (e.ngTokenPath = o),
                  (e[Mo] = null),
                  e)
                )
              })(a, t, 'R3InjectorError', this.source)
            }
            throw a
          } finally {
            be(s), kt(i)
          }
        }
        resolveInjectorInitializers() {
          const t = kt(this),
            n = be(void 0)
          try {
            const o = this.get(ui.multi, V, L.Self)
            for (const i of o) i()
          } finally {
            kt(t), be(n)
          }
        }
        toString() {
          const t = [],
            n = this.records
          for (const r of n.keys()) t.push(ae(r))
          return `R3Injector[${t.join(', ')}]`
        }
        assertNotDestroyed() {
          if (this._destroyed) throw new E(205, !1)
        }
        processProvider(t) {
          let n = on((t = b(t))) ? t : b(t && t.provide)
          const r = (function bC(e) {
            return La(e)
              ? Fn(void 0, e.useValue)
              : Fn(
                  (function Qf(e, t, n) {
                    let r
                    if (on(e)) {
                      const o = b(e)
                      return Jt(o) || Va(o)
                    }
                    if (La(e)) r = () => b(e.useValue)
                    else if (
                      (function Yf(e) {
                        return !(!e || !e.useFactory)
                      })(e)
                    )
                      r = () => e.useFactory(...Ps(e.deps || []))
                    else if (
                      (function Zf(e) {
                        return !(!e || !e.useExisting)
                      })(e)
                    )
                      r = () => P(b(e.useExisting))
                    else {
                      const o = b(e && (e.useClass || e.provide))
                      if (
                        !(function SC(e) {
                          return !!e.deps
                        })(e)
                      )
                        return Jt(o) || Va(o)
                      r = () => new o(...Ps(e.deps))
                    }
                    return r
                  })(e),
                  li
                )
          })(t)
          if (on(t) || !0 !== t.multi) this.records.get(n)
          else {
            let o = this.records.get(n)
            o ||
              ((o = Fn(void 0, li, !0)),
              (o.factory = () => Ps(o.multi)),
              this.records.set(n, o)),
              (n = t),
              o.multi.push(t)
          }
          this.records.set(n, r)
        }
        hydrate(t, n) {
          return (
            n.value === li && ((n.value = IC), (n.value = n.factory())),
            'object' == typeof n.value &&
              n.value &&
              (function TC(e) {
                return (
                  null !== e &&
                  'object' == typeof e &&
                  'function' == typeof e.ngOnDestroy
                )
              })(n.value) &&
              this._ngOnDestroyHooks.add(n.value),
            n.value
          )
        }
        injectableDefInScope(t) {
          if (!t.providedIn) return !1
          const n = b(t.providedIn)
          return 'string' == typeof n
            ? 'any' === n || this.scopes.has(n)
            : this.injectorDefTypes.has(n)
        }
        removeOnDestroy(t) {
          const n = this._onDestroyHooks.indexOf(t)
          ;-1 !== n && this._onDestroyHooks.splice(n, 1)
        }
      }
      function Va(e) {
        const t = Co(e),
          n = null !== t ? t.factory : Jt(e)
        if (null !== n) return n
        if (e instanceof N) throw new E(204, !1)
        if (e instanceof Function)
          return (function MC(e) {
            const t = e.length
            if (t > 0)
              throw (
                ((function xr(e, t) {
                  const n = []
                  for (let r = 0; r < e; r++) n.push(t)
                  return n
                })(t, '?'),
                new E(204, !1))
              )
            const n = (function lv(e) {
              return (e && (e[Io] || e[Cl])) || null
            })(e)
            return null !== n ? () => n.factory(e) : () => new e()
          })(e)
        throw new E(204, !1)
      }
      function Fn(e, t, n = !1) {
        return { factory: e, value: t, multi: n ? [] : void 0 }
      }
      function Ha(e, t) {
        for (const n of e)
          Array.isArray(n) ? Ha(n, t) : n && Is(n) ? Ha(n.ɵproviders, t) : t(n)
      }
      const hi = new N('AppId', { providedIn: 'root', factory: () => AC }),
        AC = 'ng',
        Kf = new N('Platform Initializer'),
        Ln = new N('Platform ID', {
          providedIn: 'platform',
          factory: () => 'unknown',
        }),
        Xf = new N('CSP nonce', {
          providedIn: 'root',
          factory: () =>
            Rn()
              .body?.querySelector('[ngCspNonce]')
              ?.getAttribute('ngCspNonce') || null,
        })
      let Jf = (e, t, n) => null
      function Za(e, t, n = !1) {
        return Jf(e, t, n)
      }
      class HC {}
      class nh {}
      class $C {
        resolveComponentFactory(t) {
          throw (function BC(e) {
            const t = Error(`No component factory found for ${ae(e)}.`)
            return (t.ngComponent = e), t
          })(t)
        }
      }
      let vi = (() => {
        class e {
          static #e = (this.NULL = new $C())
        }
        return e
      })()
      function UC() {
        return Vn(he(), y())
      }
      function Vn(e, t) {
        return new Hn(Ne(e, t))
      }
      let Hn = (() => {
        class e {
          constructor(n) {
            this.nativeElement = n
          }
          static #e = (this.__NG_ELEMENT_ID__ = UC)
        }
        return e
      })()
      class oh {}
      let Ka = (() => {
          class e {
            constructor() {
              this.destroyNode = null
            }
            static #e = (this.__NG_ELEMENT_ID__ = () =>
              (function zC() {
                const e = y(),
                  n = Le(he().index, e)
                return (Te(n) ? n : e)[T]
              })())
          }
          return e
        })(),
        qC = (() => {
          class e {
            static #e = (this.ɵprov = G({
              token: e,
              providedIn: 'root',
              factory: () => null,
            }))
          }
          return e
        })()
      class Xa {
        constructor(t) {
          ;(this.full = t),
            (this.major = t.split('.')[0]),
            (this.minor = t.split('.')[1]),
            (this.patch = t.split('.').slice(2).join('.'))
        }
      }
      const WC = new Xa('16.2.7'),
        Ja = {}
      function uh(e, t = null, n = null, r) {
        const o = ch(e, t, n, r)
        return o.resolveInjectorInitializers(), o
      }
      function ch(e, t = null, n = null, r, o = new Set()) {
        const i = [n || V, EC(e)]
        return (
          (r = r || ('object' == typeof e ? void 0 : ae(e))),
          new fi(i, t || di(), r || null, o)
        )
      }
      let Je = (() => {
        class e {
          static #e = (this.THROW_IF_NOT_FOUND = lr)
          static #t = (this.NULL = new Ra())
          static create(n, r) {
            if (Array.isArray(n)) return uh({ name: '' }, r, n, '')
            {
              const o = n.name ?? ''
              return uh({ name: o }, n.parent, n.providers, o)
            }
          }
          static #n = (this.ɵprov = G({
            token: e,
            providedIn: 'any',
            factory: () => P(Uf),
          }))
          static #r = (this.__NG_ELEMENT_ID__ = -1)
        }
        return e
      })()
      function tu(e) {
        return e.ngOriginalError
      }
      class bt {
        constructor() {
          this._console = console
        }
        handleError(t) {
          const n = this._findOriginalError(t)
          this._console.error('ERROR', t),
            n && this._console.error('ORIGINAL ERROR', n)
        }
        _findOriginalError(t) {
          let n = t && tu(t)
          for (; n && tu(n); ) n = tu(n)
          return n || null
        }
      }
      function ru(e) {
        return (t) => {
          setTimeout(e, void 0, t)
        }
      }
      const ft = class e_ extends vo {
        constructor(t = !1) {
          super(), (this.__isAsync = t)
        }
        emit(t) {
          super.next(t)
        }
        subscribe(t, n, r) {
          let o = t,
            i = n || (() => null),
            s = r
          if (t && 'object' == typeof t) {
            const u = t
            ;(o = u.next?.bind(u)),
              (i = u.error?.bind(u)),
              (s = u.complete?.bind(u))
          }
          this.__isAsync && ((i = ru(i)), o && (o = ru(o)), s && (s = ru(s)))
          const a = super.subscribe({ next: o, error: i, complete: s })
          return t instanceof ot && t.add(a), a
        }
      }
      function dh(...e) {}
      class te {
        constructor({
          enableLongStackTrace: t = !1,
          shouldCoalesceEventChangeDetection: n = !1,
          shouldCoalesceRunChangeDetection: r = !1,
        }) {
          if (
            ((this.hasPendingMacrotasks = !1),
            (this.hasPendingMicrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ft(!1)),
            (this.onMicrotaskEmpty = new ft(!1)),
            (this.onStable = new ft(!1)),
            (this.onError = new ft(!1)),
            typeof Zone > 'u')
          )
            throw new E(908, !1)
          Zone.assertZonePatched()
          const o = this
          ;(o._nesting = 0),
            (o._outer = o._inner = Zone.current),
            Zone.TaskTrackingZoneSpec &&
              (o._inner = o._inner.fork(new Zone.TaskTrackingZoneSpec())),
            t &&
              Zone.longStackTraceZoneSpec &&
              (o._inner = o._inner.fork(Zone.longStackTraceZoneSpec)),
            (o.shouldCoalesceEventChangeDetection = !r && n),
            (o.shouldCoalesceRunChangeDetection = r),
            (o.lastRequestAnimationFrameId = -1),
            (o.nativeRequestAnimationFrame = (function t_() {
              const e = 'function' == typeof q.requestAnimationFrame
              let t = q[e ? 'requestAnimationFrame' : 'setTimeout'],
                n = q[e ? 'cancelAnimationFrame' : 'clearTimeout']
              if (typeof Zone < 'u' && t && n) {
                const r = t[Zone.__symbol__('OriginalDelegate')]
                r && (t = r)
                const o = n[Zone.__symbol__('OriginalDelegate')]
                o && (n = o)
              }
              return {
                nativeRequestAnimationFrame: t,
                nativeCancelAnimationFrame: n,
              }
            })().nativeRequestAnimationFrame),
            (function o_(e) {
              const t = () => {
                !(function r_(e) {
                  e.isCheckStableRunning ||
                    -1 !== e.lastRequestAnimationFrameId ||
                    ((e.lastRequestAnimationFrameId =
                      e.nativeRequestAnimationFrame.call(q, () => {
                        e.fakeTopEventTask ||
                          (e.fakeTopEventTask = Zone.root.scheduleEventTask(
                            'fakeTopEventTask',
                            () => {
                              ;(e.lastRequestAnimationFrameId = -1),
                                iu(e),
                                (e.isCheckStableRunning = !0),
                                ou(e),
                                (e.isCheckStableRunning = !1)
                            },
                            void 0,
                            () => {},
                            () => {}
                          )),
                          e.fakeTopEventTask.invoke()
                      })),
                    iu(e))
                })(e)
              }
              e._inner = e._inner.fork({
                name: 'angular',
                properties: { isAngularZone: !0 },
                onInvokeTask: (n, r, o, i, s, a) => {
                  if (
                    (function s_(e) {
                      return (
                        !(!Array.isArray(e) || 1 !== e.length) &&
                        !0 === e[0].data?.__ignore_ng_zone__
                      )
                    })(a)
                  )
                    return n.invokeTask(o, i, s, a)
                  try {
                    return fh(e), n.invokeTask(o, i, s, a)
                  } finally {
                    ;((e.shouldCoalesceEventChangeDetection &&
                      'eventTask' === i.type) ||
                      e.shouldCoalesceRunChangeDetection) &&
                      t(),
                      hh(e)
                  }
                },
                onInvoke: (n, r, o, i, s, a, u) => {
                  try {
                    return fh(e), n.invoke(o, i, s, a, u)
                  } finally {
                    e.shouldCoalesceRunChangeDetection && t(), hh(e)
                  }
                },
                onHasTask: (n, r, o, i) => {
                  n.hasTask(o, i),
                    r === o &&
                      ('microTask' == i.change
                        ? ((e._hasPendingMicrotasks = i.microTask),
                          iu(e),
                          ou(e))
                        : 'macroTask' == i.change &&
                          (e.hasPendingMacrotasks = i.macroTask))
                },
                onHandleError: (n, r, o, i) => (
                  n.handleError(o, i),
                  e.runOutsideAngular(() => e.onError.emit(i)),
                  !1
                ),
              })
            })(o)
        }
        static isInAngularZone() {
          return typeof Zone < 'u' && !0 === Zone.current.get('isAngularZone')
        }
        static assertInAngularZone() {
          if (!te.isInAngularZone()) throw new E(909, !1)
        }
        static assertNotInAngularZone() {
          if (te.isInAngularZone()) throw new E(909, !1)
        }
        run(t, n, r) {
          return this._inner.run(t, n, r)
        }
        runTask(t, n, r, o) {
          const i = this._inner,
            s = i.scheduleEventTask('NgZoneEvent: ' + o, t, n_, dh, dh)
          try {
            return i.runTask(s, n, r)
          } finally {
            i.cancelTask(s)
          }
        }
        runGuarded(t, n, r) {
          return this._inner.runGuarded(t, n, r)
        }
        runOutsideAngular(t) {
          return this._outer.run(t)
        }
      }
      const n_ = {}
      function ou(e) {
        if (0 == e._nesting && !e.hasPendingMicrotasks && !e.isStable)
          try {
            e._nesting++, e.onMicrotaskEmpty.emit(null)
          } finally {
            if ((e._nesting--, !e.hasPendingMicrotasks))
              try {
                e.runOutsideAngular(() => e.onStable.emit(null))
              } finally {
                e.isStable = !0
              }
          }
      }
      function iu(e) {
        e.hasPendingMicrotasks = !!(
          e._hasPendingMicrotasks ||
          ((e.shouldCoalesceEventChangeDetection ||
            e.shouldCoalesceRunChangeDetection) &&
            -1 !== e.lastRequestAnimationFrameId)
        )
      }
      function fh(e) {
        e._nesting++, e.isStable && ((e.isStable = !1), e.onUnstable.emit(null))
      }
      function hh(e) {
        e._nesting--, ou(e)
      }
      class i_ {
        constructor() {
          ;(this.hasPendingMicrotasks = !1),
            (this.hasPendingMacrotasks = !1),
            (this.isStable = !0),
            (this.onUnstable = new ft()),
            (this.onMicrotaskEmpty = new ft()),
            (this.onStable = new ft()),
            (this.onError = new ft())
        }
        run(t, n, r) {
          return t.apply(n, r)
        }
        runGuarded(t, n, r) {
          return t.apply(n, r)
        }
        runOutsideAngular(t) {
          return t()
        }
        runTask(t, n, r, o) {
          return t.apply(n, r)
        }
      }
      const ph = new N('', { providedIn: 'root', factory: gh })
      function gh() {
        const e = W(te)
        let t = !0
        return XD(
          new Me((o) => {
            ;(t =
              e.isStable && !e.hasPendingMacrotasks && !e.hasPendingMicrotasks),
              e.runOutsideAngular(() => {
                o.next(t), o.complete()
              })
          }),
          new Me((o) => {
            let i
            e.runOutsideAngular(() => {
              i = e.onStable.subscribe(() => {
                te.assertNotInAngularZone(),
                  queueMicrotask(() => {
                    !t &&
                      !e.hasPendingMacrotasks &&
                      !e.hasPendingMicrotasks &&
                      ((t = !0), o.next(!0))
                  })
              })
            })
            const s = e.onUnstable.subscribe(() => {
              te.assertInAngularZone(),
                t &&
                  ((t = !1),
                  e.runOutsideAngular(() => {
                    o.next(!1)
                  }))
            })
            return () => {
              i.unsubscribe(), s.unsubscribe()
            }
          }).pipe(vl())
        )
      }
      let su = (() => {
        class e {
          constructor() {
            ;(this.renderDepth = 0), (this.handler = null)
          }
          begin() {
            this.handler?.validateBegin(), this.renderDepth++
          }
          end() {
            this.renderDepth--,
              0 === this.renderDepth && this.handler?.execute()
          }
          ngOnDestroy() {
            this.handler?.destroy(), (this.handler = null)
          }
          static #e = (this.ɵprov = G({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }))
        }
        return e
      })()
      function Br(e) {
        for (; e; ) {
          e[x] |= 64
          const t = Rr(e)
          if (Vs(e) && !t) return e
          e = t
        }
        return null
      }
      const wh = new N('', { providedIn: 'root', factory: () => !1 })
      let Ei = null
      function Ih(e, t) {
        return e[t] ?? Sh()
      }
      function Mh(e, t) {
        const n = Sh()
        n.producerNode?.length && ((e[t] = Ei), (n.lView = e), (Ei = bh()))
      }
      const m_ = {
        ...ql,
        consumerIsAlwaysLive: !0,
        consumerMarkedDirty: (e) => {
          Br(e.lView)
        },
        lView: null,
      }
      function bh() {
        return Object.create(m_)
      }
      function Sh() {
        return (Ei ??= bh()), Ei
      }
      const A = {}
      function au(e) {
        Th(j(), y(), we() + e, !1)
      }
      function Th(e, t, n, r) {
        if (!r)
          if (3 == (3 & t[x])) {
            const i = e.preOrderCheckHooks
            null !== i && jo(t, i, n)
          } else {
            const i = e.preOrderHooks
            null !== i && Vo(t, i, 0, n)
          }
        en(n)
      }
      function O(e, t = L.Default) {
        const n = y()
        return null === n ? P(e, t) : Vd(he(), n, b(e), t)
      }
      function Ci(e, t, n, r, o, i, s, a, u, c, l) {
        const d = t.blueprint.slice()
        return (
          (d[ee] = o),
          (d[x] = 140 | r),
          (null !== c || (e && 2048 & e[x])) && (d[x] |= 2048),
          fd(d),
          (d[K] = d[gn] = e),
          (d[re] = n),
          (d[pn] = s || (e && e[pn])),
          (d[T] = a || (e && e[T])),
          (d[jt] = u || (e && e[jt]) || null),
          (d[pe] = i),
          (d[vr] = (function vE() {
            return DE++
          })()),
          (d[Et] = l),
          (d[$l] = c),
          (d[oe] = 2 == t.type ? e[oe] : d),
          d
        )
      }
      function Un(e, t, n, r, o) {
        let i = e.data[t]
        if (null === i)
          (i = (function uu(e, t, n, r, o) {
            const i = wd(),
              s = Ws(),
              u = (e.data[t] = (function M_(e, t, n, r, o, i) {
                let s = t ? t.injectorIndex : -1,
                  a = 0
                return (
                  (function wn() {
                    return null !== I.skipHydrationRootTNode
                  })() && (a |= 128),
                  {
                    type: n,
                    index: r,
                    insertBeforeIndex: null,
                    injectorIndex: s,
                    directiveStart: -1,
                    directiveEnd: -1,
                    directiveStylingLast: -1,
                    componentOffset: -1,
                    propertyBindings: null,
                    flags: a,
                    providerIndexes: 0,
                    value: o,
                    attrs: i,
                    mergedAttrs: null,
                    localNames: null,
                    initialInputs: void 0,
                    inputs: null,
                    outputs: null,
                    tView: null,
                    next: null,
                    prev: null,
                    projectionNext: null,
                    child: null,
                    parent: t,
                    projection: null,
                    styles: null,
                    stylesWithoutHost: null,
                    residualStyles: void 0,
                    classes: null,
                    classesWithoutHost: null,
                    residualClasses: void 0,
                    classBindings: 0,
                    styleBindings: 0,
                  }
                )
              })(0, s ? i : i && i.parent, n, t, r, o))
            return (
              null === e.firstChild && (e.firstChild = u),
              null !== i &&
                (s
                  ? null == i.child && null !== u.parent && (i.child = u)
                  : null === i.next && ((i.next = u), (u.prev = i))),
              u
            )
          })(e, t, n, r, o)),
            (function yw() {
              return I.lFrame.inI18n
            })() && (i.flags |= 32)
        else if (64 & i.type) {
          ;(i.type = n), (i.value = r), (i.attrs = o)
          const s = (function Mr() {
            const e = I.lFrame,
              t = e.currentTNode
            return e.isParent ? t : t.parent
          })()
          i.injectorIndex = null === s ? -1 : s.injectorIndex
        }
        return ct(i, !0), i
      }
      function $r(e, t, n, r) {
        if (0 === n) return -1
        const o = t.length
        for (let i = 0; i < n; i++)
          t.push(r), e.blueprint.push(r), e.data.push(null)
        return o
      }
      function Nh(e, t, n, r, o) {
        const i = Ih(t, wr),
          s = we(),
          a = 2 & r
        try {
          en(-1), a && t.length > R && Th(e, t, R, !1), ut(a ? 2 : 0, o)
          const c = a ? i : null,
            l = Bs(c)
          try {
            null !== c && (c.dirty = !1), n(r, o)
          } finally {
            $s(c, l)
          }
        } finally {
          a && null === t[wr] && Mh(t, wr), en(s), ut(a ? 3 : 1, o)
        }
      }
      function cu(e, t, n) {
        if (js(t)) {
          const r = Ue(null)
          try {
            const i = t.directiveEnd
            for (let s = t.directiveStart; s < i; s++) {
              const a = e.data[s]
              a.contentQueries && a.contentQueries(1, n[s], s)
            }
          } finally {
            Ue(r)
          }
        }
      }
      function lu(e, t, n) {
        yd() &&
          ((function O_(e, t, n, r) {
            const o = n.directiveStart,
              i = n.directiveEnd
            Xt(n) &&
              (function V_(e, t, n) {
                const r = Ne(t, e),
                  o = Ah(n)
                let s = 16
                n.signals ? (s = 4096) : n.onPush && (s = 64)
                const a = _i(
                  e,
                  Ci(
                    e,
                    o,
                    null,
                    s,
                    r,
                    t,
                    null,
                    e[pn].rendererFactory.createRenderer(r, n),
                    null,
                    null,
                    null
                  )
                )
                e[t.index] = a
              })(t, n, e.data[o + n.componentOffset]),
              e.firstCreatePass || Bo(n, t),
              ge(r, t)
            const s = n.initialInputs
            for (let a = o; a < i; a++) {
              const u = e.data[a],
                c = tn(t, e, a, n)
              ge(c, t),
                null !== s && H_(0, a - o, c, u, 0, s),
                Xe(u) && (Le(n.index, t)[re] = tn(t, e, a, n))
            }
          })(e, t, n, Ne(n, t)),
          64 == (64 & n.flags) && Fh(e, t, n))
      }
      function du(e, t, n = Ne) {
        const r = t.localNames
        if (null !== r) {
          let o = t.index + 1
          for (let i = 0; i < r.length; i += 2) {
            const s = r[i + 1],
              a = -1 === s ? n(t, e) : e[s]
            e[o++] = a
          }
        }
      }
      function Ah(e) {
        const t = e.tView
        return null === t || t.incompleteFirstPass
          ? (e.tView = fu(
              1,
              null,
              e.template,
              e.decls,
              e.vars,
              e.directiveDefs,
              e.pipeDefs,
              e.viewQuery,
              e.schemas,
              e.consts,
              e.id
            ))
          : t
      }
      function fu(e, t, n, r, o, i, s, a, u, c, l) {
        const d = R + r,
          f = d + o,
          h = (function v_(e, t) {
            const n = []
            for (let r = 0; r < t; r++) n.push(r < e ? null : A)
            return n
          })(d, f),
          p = 'function' == typeof c ? c() : c
        return (h[w] = {
          type: e,
          blueprint: h,
          template: n,
          queries: null,
          viewQuery: a,
          declTNode: t,
          data: h.slice().fill(null, d),
          bindingStartIndex: d,
          expandoStartIndex: f,
          hostBindingOpCodes: null,
          firstCreatePass: !0,
          firstUpdatePass: !0,
          staticViewQueries: !1,
          staticContentQueries: !1,
          preOrderHooks: null,
          preOrderCheckHooks: null,
          contentHooks: null,
          contentCheckHooks: null,
          viewHooks: null,
          viewCheckHooks: null,
          destroyHooks: null,
          cleanup: null,
          contentQueries: null,
          components: null,
          directiveRegistry: 'function' == typeof i ? i() : i,
          pipeRegistry: 'function' == typeof s ? s() : s,
          firstChild: null,
          schemas: u,
          consts: p,
          incompleteFirstPass: !1,
          ssrId: l,
        })
      }
      let xh = (e) => null
      function Oh(e, t, n, r) {
        for (let o in e)
          if (e.hasOwnProperty(o)) {
            n = null === n ? {} : n
            const i = e[o]
            null === r
              ? Ph(n, t, o, i)
              : r.hasOwnProperty(o) && Ph(n, t, r[o], i)
          }
        return n
      }
      function Ph(e, t, n, r) {
        e.hasOwnProperty(n) ? e[n].push(t, r) : (e[n] = [t, r])
      }
      function hu(e, t, n, r) {
        if (yd()) {
          const o = null === r ? null : { '': -1 },
            i = (function R_(e, t) {
              const n = e.directiveRegistry
              let r = null,
                o = null
              if (n)
                for (let i = 0; i < n.length; i++) {
                  const s = n[i]
                  if (Ll(t, s.selectors, !1))
                    if ((r || (r = []), Xe(s)))
                      if (null !== s.findHostDirectiveDefs) {
                        const a = []
                        ;(o = o || new Map()),
                          s.findHostDirectiveDefs(s, a, o),
                          r.unshift(...a, s),
                          pu(e, t, a.length)
                      } else r.unshift(s), pu(e, t, 0)
                    else
                      (o = o || new Map()),
                        s.findHostDirectiveDefs?.(s, r, o),
                        r.push(s)
                }
              return null === r ? null : [r, o]
            })(e, n)
          let s, a
          null === i ? (s = a = null) : ([s, a] = i),
            null !== s && Rh(e, t, n, s, o, a),
            o &&
              (function F_(e, t, n) {
                if (t) {
                  const r = (e.localNames = [])
                  for (let o = 0; o < t.length; o += 2) {
                    const i = n[t[o + 1]]
                    if (null == i) throw new E(-301, !1)
                    r.push(t[o], i)
                  }
                }
              })(n, r, o)
        }
        n.mergedAttrs = hr(n.mergedAttrs, n.attrs)
      }
      function Rh(e, t, n, r, o, i) {
        for (let c = 0; c < r.length; c++) ia(Bo(n, t), e, r[c].type)
        !(function k_(e, t, n) {
          ;(e.flags |= 1),
            (e.directiveStart = t),
            (e.directiveEnd = t + n),
            (e.providerIndexes = t)
        })(n, e.data.length, r.length)
        for (let c = 0; c < r.length; c++) {
          const l = r[c]
          l.providersResolver && l.providersResolver(l)
        }
        let s = !1,
          a = !1,
          u = $r(e, t, r.length, null)
        for (let c = 0; c < r.length; c++) {
          const l = r[c]
          ;(n.mergedAttrs = hr(n.mergedAttrs, l.hostAttrs)),
            j_(e, n, t, u, l),
            L_(u, l, o),
            null !== l.contentQueries && (n.flags |= 4),
            (null !== l.hostBindings ||
              null !== l.hostAttrs ||
              0 !== l.hostVars) &&
              (n.flags |= 64)
          const d = l.type.prototype
          !s &&
            (d.ngOnChanges || d.ngOnInit || d.ngDoCheck) &&
            ((e.preOrderHooks ??= []).push(n.index), (s = !0)),
            !a &&
              (d.ngOnChanges || d.ngDoCheck) &&
              ((e.preOrderCheckHooks ??= []).push(n.index), (a = !0)),
            u++
        }
        !(function b_(e, t, n) {
          const o = t.directiveEnd,
            i = e.data,
            s = t.attrs,
            a = []
          let u = null,
            c = null
          for (let l = t.directiveStart; l < o; l++) {
            const d = i[l],
              f = n ? n.get(d) : null,
              p = f ? f.outputs : null
            ;(u = Oh(d.inputs, l, u, f ? f.inputs : null)),
              (c = Oh(d.outputs, l, c, p))
            const g = null === u || null === s || Fl(t) ? null : B_(u, l, s)
            a.push(g)
          }
          null !== u &&
            (u.hasOwnProperty('class') && (t.flags |= 8),
            u.hasOwnProperty('style') && (t.flags |= 16)),
            (t.initialInputs = a),
            (t.inputs = u),
            (t.outputs = c)
        })(e, n, i)
      }
      function Fh(e, t, n) {
        const r = n.directiveStart,
          o = n.directiveEnd,
          i = n.index,
          s = (function vw() {
            return I.lFrame.currentDirectiveIndex
          })()
        try {
          en(i)
          for (let a = r; a < o; a++) {
            const u = e.data[a],
              c = t[a]
            Ys(a),
              (null !== u.hostBindings ||
                0 !== u.hostVars ||
                null !== u.hostAttrs) &&
                P_(u, c)
          }
        } finally {
          en(-1), Ys(s)
        }
      }
      function P_(e, t) {
        null !== e.hostBindings && e.hostBindings(1, t)
      }
      function pu(e, t, n) {
        ;(t.componentOffset = n), (e.components ??= []).push(t.index)
      }
      function L_(e, t, n) {
        if (n) {
          if (t.exportAs)
            for (let r = 0; r < t.exportAs.length; r++) n[t.exportAs[r]] = e
          Xe(t) && (n[''] = e)
        }
      }
      function j_(e, t, n, r, o) {
        e.data[r] = o
        const i = o.factory || (o.factory = Jt(o.type)),
          s = new br(i, Xe(o), O)
        ;(e.blueprint[r] = s),
          (n[r] = s),
          (function A_(e, t, n, r, o) {
            const i = o.hostBindings
            if (i) {
              let s = e.hostBindingOpCodes
              null === s && (s = e.hostBindingOpCodes = [])
              const a = ~t.index
              ;(function x_(e) {
                let t = e.length
                for (; t > 0; ) {
                  const n = e[--t]
                  if ('number' == typeof n && n < 0) return n
                }
                return 0
              })(s) != a && s.push(a),
                s.push(n, r, i)
            }
          })(e, t, r, $r(e, n, o.hostVars, A), o)
      }
      function H_(e, t, n, r, o, i) {
        const s = i[t]
        if (null !== s)
          for (let a = 0; a < s.length; ) Lh(r, n, s[a++], s[a++], s[a++])
      }
      function Lh(e, t, n, r, o) {
        const i = Ue(null)
        try {
          const s = e.inputTransforms
          null !== s && s.hasOwnProperty(r) && (o = s[r].call(t, o)),
            null !== e.setInput ? e.setInput(t, o, n, r) : (t[r] = o)
        } finally {
          Ue(i)
        }
      }
      function B_(e, t, n) {
        let r = null,
          o = 0
        for (; o < n.length; ) {
          const i = n[o]
          if (0 !== i)
            if (5 !== i) {
              if ('number' == typeof i) break
              if (e.hasOwnProperty(i)) {
                null === r && (r = [])
                const s = e[i]
                for (let a = 0; a < s.length; a += 2)
                  if (s[a] === t) {
                    r.push(i, s[a + 1], n[o + 1])
                    break
                  }
              }
              o += 2
            } else o += 2
          else o += 4
        }
        return r
      }
      function kh(e, t, n, r) {
        return [e, !0, !1, t, null, 0, r, n, null, null, null]
      }
      function jh(e, t) {
        const n = e.contentQueries
        if (null !== n)
          for (let r = 0; r < n.length; r += 2) {
            const i = n[r + 1]
            if (-1 !== i) {
              const s = e.data[i]
              Ks(n[r]), s.contentQueries(2, t[i], i)
            }
          }
      }
      function _i(e, t) {
        return e[yr] ? (e[Bl][Ke] = t) : (e[yr] = t), (e[Bl] = t), t
      }
      function mu(e, t, n) {
        Ks(0)
        const r = Ue(null)
        try {
          t(e, n)
        } finally {
          Ue(r)
        }
      }
      function $h(e, t) {
        const n = e[jt],
          r = n ? n.get(bt, null) : null
        r && r.handleError(t)
      }
      function yu(e, t, n, r, o) {
        for (let i = 0; i < n.length; ) {
          const s = n[i++],
            a = n[i++]
          Lh(e.data[s], t[s], r, a, o)
        }
      }
      function Tt(e, t, n) {
        const r = (function Fo(e, t) {
          return Z(t[e])
        })(t, e)
        !(function mf(e, t, n) {
          e.setValue(t, n)
        })(e[T], r, n)
      }
      function $_(e, t) {
        const n = Le(t, e),
          r = n[w]
        !(function U_(e, t) {
          for (let n = t.length; n < e.blueprint.length; n++)
            t.push(e.blueprint[n])
        })(r, n)
        const o = n[ee]
        null !== o && null === n[Et] && (n[Et] = Za(o, n[jt])), Du(r, n, n[re])
      }
      function Du(e, t, n) {
        Xs(t)
        try {
          const r = e.viewQuery
          null !== r && mu(1, r, n)
          const o = e.template
          null !== o && Nh(e, t, o, 1, n),
            e.firstCreatePass && (e.firstCreatePass = !1),
            e.staticContentQueries && jh(e, t),
            e.staticViewQueries && mu(2, e.viewQuery, n)
          const i = e.components
          null !== i &&
            (function G_(e, t) {
              for (let n = 0; n < t.length; n++) $_(e, t[n])
            })(t, i)
        } catch (r) {
          throw (
            (e.firstCreatePass &&
              ((e.incompleteFirstPass = !0), (e.firstCreatePass = !1)),
            r)
          )
        } finally {
          ;(t[x] &= -5), Js()
        }
      }
      let Uh = (() => {
        class e {
          constructor() {
            ;(this.all = new Set()), (this.queue = new Map())
          }
          create(n, r, o) {
            const i = typeof Zone > 'u' ? null : Zone.current,
              s = (function Yv(e, t, n) {
                const r = Object.create(Qv)
                n && (r.consumerAllowSignalWrites = !0),
                  (r.fn = e),
                  (r.schedule = t)
                const o = (s) => {
                  r.cleanupFn = s
                }
                return (
                  (r.ref = {
                    notify: () => Ql(r),
                    run: () => {
                      if (((r.dirty = !1), r.hasRun && !Kl(r))) return
                      r.hasRun = !0
                      const s = Bs(r)
                      try {
                        r.cleanupFn(), (r.cleanupFn = id), r.fn(o)
                      } finally {
                        $s(r, s)
                      }
                    },
                    cleanup: () => r.cleanupFn(),
                  }),
                  r.ref
                )
              })(
                n,
                (c) => {
                  this.all.has(c) && this.queue.set(c, i)
                },
                o
              )
            let a
            this.all.add(s), s.notify()
            const u = () => {
              s.cleanup(), a?.(), this.all.delete(s), this.queue.delete(s)
            }
            return (a = r?.onDestroy(u)), { destroy: u }
          }
          flush() {
            if (0 !== this.queue.size)
              for (const [n, r] of this.queue)
                this.queue.delete(n), r ? r.run(() => n.run()) : n.run()
          }
          get isQueueEmpty() {
            return 0 === this.queue.size
          }
          static #e = (this.ɵprov = G({
            token: e,
            providedIn: 'root',
            factory: () => new e(),
          }))
        }
        return e
      })()
      function Ii(e, t, n) {
        let r = n ? e.styles : null,
          o = n ? e.classes : null,
          i = 0
        if (null !== t)
          for (let s = 0; s < t.length; s++) {
            const a = t[s]
            'number' == typeof a
              ? (i = a)
              : 1 == i
              ? (o = Es(o, a))
              : 2 == i && (r = Es(r, a + ': ' + t[++s] + ';'))
          }
        n ? (e.styles = r) : (e.stylesWithoutHost = r),
          n ? (e.classes = o) : (e.classesWithoutHost = o)
      }
      function Ur(e, t, n, r, o = !1) {
        for (; null !== n; ) {
          const i = t[n.index]
          null !== i && r.push(Z(i)), De(i) && Gh(i, r)
          const s = n.type
          if (8 & s) Ur(e, t, n.child, r)
          else if (32 & s) {
            const a = wa(n, t)
            let u
            for (; (u = a()); ) r.push(u)
          } else if (16 & s) {
            const a = Mf(t, n)
            if (Array.isArray(a)) r.push(...a)
            else {
              const u = Rr(t[oe])
              Ur(u[w], u, a, r, !0)
            }
          }
          n = o ? n.projectionNext : n.next
        }
        return r
      }
      function Gh(e, t) {
        for (let n = de; n < e.length; n++) {
          const r = e[n],
            o = r[w].firstChild
          null !== o && Ur(r[w], r, o, t)
        }
        e[at] !== e[ee] && t.push(e[at])
      }
      function Mi(e, t, n, r = !0) {
        const o = t[pn],
          i = o.rendererFactory,
          s = o.afterRenderEventManager
        i.begin?.(), s?.begin()
        try {
          zh(e, t, e.template, n)
        } catch (u) {
          throw (r && $h(t, u), u)
        } finally {
          i.end?.(), o.effectManager?.flush(), s?.end()
        }
      }
      function zh(e, t, n, r) {
        const o = t[x]
        if (256 != (256 & o)) {
          t[pn].effectManager?.flush(), Xs(t)
          try {
            fd(t),
              (function Cd(e) {
                return (I.lFrame.bindingIndex = e)
              })(e.bindingStartIndex),
              null !== n && Nh(e, t, n, 2, r)
            const s = 3 == (3 & o)
            if (s) {
              const c = e.preOrderCheckHooks
              null !== c && jo(t, c, null)
            } else {
              const c = e.preOrderHooks
              null !== c && Vo(t, c, 0, null), ea(t, 0)
            }
            if (
              ((function W_(e) {
                for (let t = hf(e); null !== t; t = pf(t)) {
                  if (!t[Ul]) continue
                  const n = t[yn]
                  for (let r = 0; r < n.length; r++) {
                    sw(n[r])
                  }
                }
              })(t),
              qh(t, 2),
              null !== e.contentQueries && jh(e, t),
              s)
            ) {
              const c = e.contentCheckHooks
              null !== c && jo(t, c)
            } else {
              const c = e.contentHooks
              null !== c && Vo(t, c, 1), ea(t, 1)
            }
            !(function D_(e, t) {
              const n = e.hostBindingOpCodes
              if (null === n) return
              const r = Ih(t, Er)
              try {
                for (let o = 0; o < n.length; o++) {
                  const i = n[o]
                  if (i < 0) en(~i)
                  else {
                    const s = i,
                      a = n[++o],
                      u = n[++o]
                    Dw(a, s), (r.dirty = !1)
                    const c = Bs(r)
                    try {
                      u(2, t[s])
                    } finally {
                      $s(r, c)
                    }
                  }
                }
              } finally {
                null === t[Er] && Mh(t, Er), en(-1)
              }
            })(e, t)
            const a = e.components
            null !== a && Zh(t, a, 0)
            const u = e.viewQuery
            if ((null !== u && mu(2, u, r), s)) {
              const c = e.viewCheckHooks
              null !== c && jo(t, c)
            } else {
              const c = e.viewHooks
              null !== c && Vo(t, c, 2), ea(t, 2)
            }
            !0 === e.firstUpdatePass && (e.firstUpdatePass = !1),
              (t[x] &= -73),
              hd(t)
          } finally {
            Js()
          }
        }
      }
      function qh(e, t) {
        for (let n = hf(e); null !== n; n = pf(n))
          for (let r = de; r < n.length; r++) Wh(n[r], t)
      }
      function Z_(e, t, n) {
        Wh(Le(t, e), n)
      }
      function Wh(e, t) {
        if (
          !(function ow(e) {
            return 128 == (128 & e[x])
          })(e)
        )
          return
        const n = e[w],
          r = e[x]
        if ((80 & r && 0 === t) || 1024 & r || 2 === t)
          zh(n, e, n.template, e[re])
        else if (e[mr] > 0) {
          qh(e, 1)
          const o = n.components
          null !== o && Zh(e, o, 1)
        }
      }
      function Zh(e, t, n) {
        for (let r = 0; r < t.length; r++) Z_(e, t[r], n)
      }
      class Gr {
        get rootNodes() {
          const t = this._lView,
            n = t[w]
          return Ur(n, t, n.firstChild, [])
        }
        constructor(t, n) {
          ;(this._lView = t),
            (this._cdRefInjectingView = n),
            (this._appRef = null),
            (this._attachedToViewContainer = !1)
        }
        get context() {
          return this._lView[re]
        }
        set context(t) {
          this._lView[re] = t
        }
        get destroyed() {
          return 256 == (256 & this._lView[x])
        }
        destroy() {
          if (this._appRef) this._appRef.detachView(this)
          else if (this._attachedToViewContainer) {
            const t = this._lView[K]
            if (De(t)) {
              const n = t[8],
                r = n ? n.indexOf(this) : -1
              r > -1 && (ei(t, r), Go(n, r))
            }
            this._attachedToViewContainer = !1
          }
          Ca(this._lView[w], this._lView)
        }
        onDestroy(t) {
          !(function gd(e, t) {
            if (256 == (256 & e[x])) throw new E(911, !1)
            null === e[Vt] && (e[Vt] = []), e[Vt].push(t)
          })(this._lView, t)
        }
        markForCheck() {
          Br(this._cdRefInjectingView || this._lView)
        }
        detach() {
          this._lView[x] &= -129
        }
        reattach() {
          this._lView[x] |= 128
        }
        detectChanges() {
          Mi(this._lView[w], this._lView, this.context)
        }
        checkNoChanges() {}
        attachToViewContainerRef() {
          if (this._appRef) throw new E(902, !1)
          this._attachedToViewContainer = !0
        }
        detachFromAppRef() {
          ;(this._appRef = null),
            (function PE(e, t) {
              Lr(e, t, t[T], 2, null, null)
            })(this._lView[w], this._lView)
        }
        attachToAppRef(t) {
          if (this._attachedToViewContainer) throw new E(902, !1)
          this._appRef = t
        }
      }
      class Y_ extends Gr {
        constructor(t) {
          super(t), (this._view = t)
        }
        detectChanges() {
          const t = this._view
          Mi(t[w], t, t[re], !1)
        }
        checkNoChanges() {}
        get context() {
          return null
        }
      }
      class Yh extends vi {
        constructor(t) {
          super(), (this.ngModule = t)
        }
        resolveComponentFactory(t) {
          const n = k(t)
          return new zr(n, this.ngModule)
        }
      }
      function Qh(e) {
        const t = []
        for (let n in e)
          e.hasOwnProperty(n) && t.push({ propName: e[n], templateName: n })
        return t
      }
      class K_ {
        constructor(t, n) {
          ;(this.injector = t), (this.parentInjector = n)
        }
        get(t, n, r) {
          r = bo(r)
          const o = this.injector.get(t, Ja, r)
          return o !== Ja || n === Ja ? o : this.parentInjector.get(t, n, r)
        }
      }
      class zr extends nh {
        get inputs() {
          const t = this.componentDef,
            n = t.inputTransforms,
            r = Qh(t.inputs)
          if (null !== n)
            for (const o of r)
              n.hasOwnProperty(o.propName) && (o.transform = n[o.propName])
          return r
        }
        get outputs() {
          return Qh(this.componentDef.outputs)
        }
        constructor(t, n) {
          super(),
            (this.componentDef = t),
            (this.ngModule = n),
            (this.componentType = t.type),
            (this.selector = (function Av(e) {
              return e.map(Nv).join(',')
            })(t.selectors)),
            (this.ngContentSelectors = t.ngContentSelectors
              ? t.ngContentSelectors
              : []),
            (this.isBoundToModule = !!n)
        }
        create(t, n, r, o) {
          let i = (o = o || this.ngModule) instanceof Mt ? o : o?.injector
          i &&
            null !== this.componentDef.getStandaloneInjector &&
            (i = this.componentDef.getStandaloneInjector(i) || i)
          const s = i ? new K_(t, i) : t,
            a = s.get(oh, null)
          if (null === a) throw new E(407, !1)
          const d = {
              rendererFactory: a,
              sanitizer: s.get(qC, null),
              effectManager: s.get(Uh, null),
              afterRenderEventManager: s.get(su, null),
            },
            f = a.createRenderer(null, this.componentDef),
            h = this.componentDef.selectors[0][0] || 'div',
            p = r
              ? (function w_(e, t, n, r) {
                  const i = r.get(wh, !1) || n === Ye.ShadowDom,
                    s = e.selectRootElement(t, i)
                  return (
                    (function E_(e) {
                      xh(e)
                    })(s),
                    s
                  )
                })(f, r, this.componentDef.encapsulation, s)
              : Jo(
                  f,
                  h,
                  (function Q_(e) {
                    const t = e.toLowerCase()
                    return 'svg' === t ? 'svg' : 'math' === t ? 'math' : null
                  })(h)
                ),
            v = this.componentDef.signals
              ? 4608
              : this.componentDef.onPush
              ? 576
              : 528
          let m = null
          null !== p && (m = Za(p, s, !0))
          const C = fu(0, null, null, 1, 0, null, null, null, null, null, null),
            M = Ci(null, C, null, v, null, null, d, f, s, null, m)
          let F, Pe
          Xs(M)
          try {
            const Rt = this.componentDef
            let ar,
              Uc = null
            Rt.findHostDirectiveDefs
              ? ((ar = []),
                (Uc = new Map()),
                Rt.findHostDirectiveDefs(Rt, ar, Uc),
                ar.push(Rt))
              : (ar = [Rt])
            const qA = (function J_(e, t) {
                const n = e[w],
                  r = R
                return (e[r] = t), Un(n, r, 2, '#host', null)
              })(M, p),
              WA = (function eI(e, t, n, r, o, i, s) {
                const a = o[w]
                !(function tI(e, t, n, r) {
                  for (const o of e)
                    t.mergedAttrs = hr(t.mergedAttrs, o.hostAttrs)
                  null !== t.mergedAttrs &&
                    (Ii(t, t.mergedAttrs, !0), null !== n && Nf(r, n, t))
                })(r, e, t, s)
                let u = null
                null !== t && (u = Za(t, o[jt]))
                const c = i.rendererFactory.createRenderer(t, n)
                let l = 16
                n.signals ? (l = 4096) : n.onPush && (l = 64)
                const d = Ci(
                  o,
                  Ah(n),
                  null,
                  l,
                  o[e.index],
                  e,
                  i,
                  c,
                  null,
                  null,
                  u
                )
                return (
                  a.firstCreatePass && pu(a, e, r.length - 1),
                  _i(o, d),
                  (o[e.index] = d)
                )
              })(qA, p, Rt, ar, M, d, f)
            ;(Pe = dd(C, R)),
              p &&
                (function rI(e, t, n, r) {
                  if (r) Ls(e, n, ['ng-version', WC.full])
                  else {
                    const { attrs: o, classes: i } = (function xv(e) {
                      const t = [],
                        n = []
                      let r = 1,
                        o = 2
                      for (; r < e.length; ) {
                        let i = e[r]
                        if ('string' == typeof i)
                          2 === o
                            ? '' !== i && t.push(i, e[++r])
                            : 8 === o && n.push(i)
                        else {
                          if (!Qe(o)) break
                          o = i
                        }
                        r++
                      }
                      return { attrs: t, classes: n }
                    })(t.selectors[0])
                    o && Ls(e, n, o), i && i.length > 0 && Tf(e, n, i.join(' '))
                  }
                })(f, Rt, p, r),
              void 0 !== n &&
                (function oI(e, t, n) {
                  const r = (e.projection = [])
                  for (let o = 0; o < t.length; o++) {
                    const i = n[o]
                    r.push(null != i ? Array.from(i) : null)
                  }
                })(Pe, this.ngContentSelectors, n),
              (F = (function nI(e, t, n, r, o, i) {
                const s = he(),
                  a = o[w],
                  u = Ne(s, o)
                Rh(a, o, s, n, null, r)
                for (let l = 0; l < n.length; l++)
                  ge(tn(o, a, s.directiveStart + l, s), o)
                Fh(a, o, s), u && ge(u, o)
                const c = tn(o, a, s.directiveStart + s.componentOffset, s)
                if (((e[re] = o[re] = c), null !== i))
                  for (const l of i) l(c, t)
                return cu(a, s, e), c
              })(WA, Rt, ar, Uc, M, [iI])),
              Du(C, M, null)
          } finally {
            Js()
          }
          return new X_(this.componentType, F, Vn(Pe, M), M, Pe)
        }
      }
      class X_ extends HC {
        constructor(t, n, r, o, i) {
          super(),
            (this.location = r),
            (this._rootLView = o),
            (this._tNode = i),
            (this.previousInputValues = null),
            (this.instance = n),
            (this.hostView = this.changeDetectorRef = new Y_(o)),
            (this.componentType = t)
        }
        setInput(t, n) {
          const r = this._tNode.inputs
          let o
          if (null !== r && (o = r[t])) {
            if (
              ((this.previousInputValues ??= new Map()),
              this.previousInputValues.has(t) &&
                Object.is(this.previousInputValues.get(t), n))
            )
              return
            const i = this._rootLView
            yu(i[w], i, o, t, n),
              this.previousInputValues.set(t, n),
              Br(Le(this._tNode.index, i))
          }
        }
        get injector() {
          return new Ee(this._tNode, this._rootLView)
        }
        destroy() {
          this.hostView.destroy()
        }
        onDestroy(t) {
          this.hostView.onDestroy(t)
        }
      }
      function iI() {
        const e = he()
        ko(y()[w], e)
      }
      function me(e, t, n) {
        return !Object.is(e[t], n) && ((e[t] = n), !0)
      }
      let mp = function yp(e, t, n, r) {
        return $t(!0), t[T].createComment('')
      }
      function Qr(e, t, n) {
        const r = y()
        return (
          me(r, En(), t) &&
            (function Ve(e, t, n, r, o, i, s, a) {
              const u = Ne(t, n)
              let l,
                c = t.inputs
              !a && null != c && (l = c[r])
                ? (yu(e, n, l, r, o),
                  Xt(t) &&
                    (function T_(e, t) {
                      const n = Le(t, e)
                      16 & n[x] || (n[x] |= 64)
                    })(n, t.index))
                : 3 & t.type &&
                  ((r = (function S_(e) {
                    return 'class' === e
                      ? 'className'
                      : 'for' === e
                      ? 'htmlFor'
                      : 'formaction' === e
                      ? 'formAction'
                      : 'innerHtml' === e
                      ? 'innerHTML'
                      : 'readonly' === e
                      ? 'readOnly'
                      : 'tabindex' === e
                      ? 'tabIndex'
                      : e
                  })(r)),
                  (o = null != s ? s(o, t.value || '', r) : o),
                  i.setProperty(u, r, o))
            })(
              j(),
              (function X() {
                const e = I.lFrame
                return dd(e.tView, e.selectedIndex)
              })(),
              r,
              e,
              t,
              r[T],
              n,
              !1
            ),
          Qr
        )
      }
      function Mu(e, t, n, r, o) {
        const s = o ? 'class' : 'style'
        yu(e, n, t.inputs[s], s, r)
      }
      function Jn(e, t, n, r) {
        const o = y(),
          i = j(),
          s = R + e,
          a = o[T],
          u = i.firstCreatePass
            ? (function HI(e, t, n, r, o, i) {
                const s = t.consts,
                  u = Un(t, e, 2, r, Bt(s, o))
                return (
                  hu(t, n, u, Bt(s, i)),
                  null !== u.attrs && Ii(u, u.attrs, !1),
                  null !== u.mergedAttrs && Ii(u, u.mergedAttrs, !0),
                  null !== t.queries && t.queries.elementStart(t, u),
                  u
                )
              })(s, i, o, t, n, r)
            : i.data[s],
          c = Dp(i, o, u, a, t, e)
        o[s] = c
        const l = Oo(u)
        return (
          ct(u, !0),
          Nf(a, c, u),
          32 != (32 & u.flags) && Lo() && ni(i, o, c, u),
          0 ===
            (function uw() {
              return I.lFrame.elementDepthCount
            })() && ge(c, o),
          (function cw() {
            I.lFrame.elementDepthCount++
          })(),
          l && (lu(i, o, u), cu(i, u, o)),
          null !== r && du(o, u),
          Jn
        )
      }
      function er() {
        let e = he()
        Ws()
          ? (function Zs() {
              I.lFrame.isParent = !1
            })()
          : ((e = e.parent), ct(e, !1))
        const t = e
        ;(function dw(e) {
          return I.skipHydrationRootTNode === e
        })(t) &&
          (function gw() {
            I.skipHydrationRootTNode = null
          })(),
          (function lw() {
            I.lFrame.elementDepthCount--
          })()
        const n = j()
        return (
          n.firstCreatePass && (ko(n, e), js(e) && n.queries.elementEnd(e)),
          null != t.classesWithoutHost &&
            (function Aw(e) {
              return 0 != (8 & e.flags)
            })(t) &&
            Mu(n, t, y(), t.classesWithoutHost, !0),
          null != t.stylesWithoutHost &&
            (function xw(e) {
              return 0 != (16 & e.flags)
            })(t) &&
            Mu(n, t, y(), t.stylesWithoutHost, !1),
          er
        )
      }
      function Oi(e, t, n, r) {
        return Jn(e, t, n, r), er(), Oi
      }
      let Dp = (e, t, n, r, o, i) => (
        $t(!0),
        Jo(
          r,
          o,
          (function Ad() {
            return I.lFrame.currentNamespace
          })()
        )
      )
      function Tu(e) {
        return !!e && 'function' == typeof e.then
      }
      function Cp(e) {
        return !!e && 'function' == typeof e.subscribe
      }
      function Pi(e, t, n, r) {
        const o = y(),
          i = j(),
          s = he()
        return (
          (function Ip(e, t, n, r, o, i, s) {
            const a = Oo(r),
              c =
                e.firstCreatePass &&
                (function Hh(e) {
                  return e.cleanup || (e.cleanup = [])
                })(e),
              l = t[re],
              d = (function Vh(e) {
                return e[hn] || (e[hn] = [])
              })(t)
            let f = !0
            if (3 & r.type || s) {
              const g = Ne(r, t),
                D = s ? s(g) : g,
                v = d.length,
                m = s ? (M) => s(Z(M[r.index])) : r.index
              let C = null
              if (
                (!s &&
                  a &&
                  (C = (function qI(e, t, n, r) {
                    const o = e.cleanup
                    if (null != o)
                      for (let i = 0; i < o.length - 1; i += 2) {
                        const s = o[i]
                        if (s === n && o[i + 1] === r) {
                          const a = t[hn],
                            u = o[i + 2]
                          return a.length > u ? a[u] : null
                        }
                        'string' == typeof s && (i += 2)
                      }
                    return null
                  })(e, t, o, r.index)),
                null !== C)
              )
                ((C.__ngLastListenerFn__ || C).__ngNextListenerFn__ = i),
                  (C.__ngLastListenerFn__ = i),
                  (f = !1)
              else {
                i = bp(r, t, l, i, !1)
                const M = n.listen(D, o, i)
                d.push(i, M), c && c.push(o, m, v, v + 1)
              }
            } else i = bp(r, t, l, i, !1)
            const h = r.outputs
            let p
            if (f && null !== h && (p = h[o])) {
              const g = p.length
              if (g)
                for (let D = 0; D < g; D += 2) {
                  const F = t[p[D]][p[D + 1]].subscribe(i),
                    Pe = d.length
                  d.push(i, F), c && c.push(o, r.index, Pe, -(Pe + 1))
                }
            }
          })(i, o, o[T], s, e, t, r),
          Pi
        )
      }
      function Mp(e, t, n, r) {
        try {
          return ut(6, t, n), !1 !== n(r)
        } catch (o) {
          return $h(e, o), !1
        } finally {
          ut(7, t, n)
        }
      }
      function bp(e, t, n, r, o) {
        return function i(s) {
          if (s === Function) return r
          Br(e.componentOffset > -1 ? Le(e.index, t) : t)
          let u = Mp(t, n, r, s),
            c = i.__ngNextListenerFn__
          for (; c; ) (u = Mp(t, n, c, s) && u), (c = c.__ngNextListenerFn__)
          return o && !1 === u && s.preventDefault(), u
        }
      }
      function Nu(e = 1) {
        return (function Ew(e) {
          return (I.lFrame.contextLView = (function Cw(e, t) {
            for (; e > 0; ) (t = t[gn]), e--
            return t
          })(e, I.lFrame.contextLView))[re]
        })(e)
      }
      function Fu(e, t = '') {
        const n = y(),
          r = j(),
          o = e + R,
          i = r.firstCreatePass ? Un(r, o, 1, t, null) : r.data[o],
          s = Kp(r, n, i, t, e)
        ;(n[o] = s), Lo() && ni(r, n, s, i), ct(i, !1)
      }
      let Kp = (e, t, n, r, o) => (
        $t(!0),
        (function Xo(e, t) {
          return e.createText(t)
        })(t[T], r)
      )
      function Lu(e) {
        return ku('', e, ''), Lu
      }
      function ku(e, t, n) {
        const r = y(),
          o = (function zn(e, t, n, r) {
            return me(e, En(), n) ? t + S(n) + r : A
          })(r, e, t, n)
        return o !== A && Tt(r, we(), o), ku
      }
      const rr = 'en-US'
      let vg = rr
      class cn {}
      class Hb {}
      class Gu extends cn {
        constructor(t, n, r) {
          super(),
            (this._parent = n),
            (this._bootstrapComponents = []),
            (this.destroyCbs = []),
            (this.componentFactoryResolver = new Yh(this))
          const o = (function Fe(e, t) {
            const n = e[Tl] || null
            if (!n && !0 === t)
              throw new Error(
                `Type ${ae(e)} does not have '\u0275mod' property.`
              )
            return n
          })(t)
          ;(this._bootstrapComponents = (function St(e) {
            return e instanceof Function ? e() : e
          })(o.bootstrap)),
            (this._r3Injector = ch(
              t,
              n,
              [
                { provide: cn, useValue: this },
                { provide: vi, useValue: this.componentFactoryResolver },
                ...r,
              ],
              ae(t),
              new Set(['environment'])
            )),
            this._r3Injector.resolveInjectorInitializers(),
            (this.instance = this._r3Injector.get(t))
        }
        get injector() {
          return this._r3Injector
        }
        destroy() {
          const t = this._r3Injector
          !t.destroyed && t.destroy(),
            this.destroyCbs.forEach((n) => n()),
            (this.destroyCbs = null)
        }
        onDestroy(t) {
          this.destroyCbs.push(t)
        }
      }
      class zu extends Hb {
        constructor(t) {
          super(), (this.moduleType = t)
        }
        create(t) {
          return new Gu(this.moduleType, t, [])
        }
      }
      function w0(e, t, n, r = !0) {
        const o = t[w]
        if (
          ((function FE(e, t, n, r) {
            const o = de + r,
              i = n.length
            r > 0 && (n[o - 1][Ke] = t),
              r < i - de
                ? ((t[Ke] = n[o]), zd(n, de + r, t))
                : (n.push(t), (t[Ke] = null)),
              (t[K] = n)
            const s = t[Dr]
            null !== s &&
              n !== s &&
              (function LE(e, t) {
                const n = e[yn]
                t[oe] !== t[K][K][oe] && (e[Ul] = !0),
                  null === n ? (e[yn] = [t]) : n.push(t)
              })(s, t)
            const a = t[st]
            null !== a && a.insertView(e), (t[x] |= 128)
          })(o, t, e, n),
          r)
        ) {
          const i = ba(n, e),
            s = t[T],
            a = ti(s, e[at])
          null !== a &&
            (function OE(e, t, n, r, o, i) {
              ;(r[ee] = o), (r[pe] = t), Lr(e, r, n, 1, o, i)
            })(o, e[pe], s, t, a, i)
        }
      }
      Symbol
      let Nt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = _0)
        }
        return e
      })()
      const E0 = Nt,
        C0 = class extends E0 {
          constructor(t, n, r) {
            super(),
              (this._declarationLView = t),
              (this._declarationTContainer = n),
              (this.elementRef = r)
          }
          get ssrId() {
            return this._declarationTContainer.tView?.ssrId || null
          }
          createEmbeddedView(t, n) {
            return this.createEmbeddedViewImpl(t, n)
          }
          createEmbeddedViewImpl(t, n, r) {
            const o = (function v0(e, t, n, r) {
              const o = t.tView,
                a = Ci(
                  e,
                  o,
                  n,
                  4096 & e[x] ? 4096 : 16,
                  null,
                  t,
                  null,
                  null,
                  null,
                  r?.injector ?? null,
                  r?.hydrationInfo ?? null
                )
              a[Dr] = e[t.index]
              const c = e[st]
              return (
                null !== c && (a[st] = c.createEmbeddedView(o)), Du(o, a, n), a
              )
            })(this._declarationLView, this._declarationTContainer, t, {
              injector: n,
              hydrationInfo: r,
            })
            return new Gr(o)
          }
        }
      function _0() {
        return (function Hi(e, t) {
          return 4 & e.type ? new C0(t, e, Vn(e, t)) : null
        })(he(), y())
      }
      let yt = (() => {
        class e {
          static #e = (this.__NG_ELEMENT_ID__ = N0)
        }
        return e
      })()
      function N0() {
        return (function cm(e, t) {
          let n
          const r = t[e.index]
          return (
            De(r)
              ? (n = r)
              : ((n = kh(r, t, null, e)), (t[e.index] = n), _i(t, n)),
            lm(n, t, e, r),
            new am(n, e, t)
          )
        })(he(), y())
      }
      const A0 = yt,
        am = class extends A0 {
          constructor(t, n, r) {
            super(),
              (this._lContainer = t),
              (this._hostTNode = n),
              (this._hostLView = r)
          }
          get element() {
            return Vn(this._hostTNode, this._hostLView)
          }
          get injector() {
            return new Ee(this._hostTNode, this._hostLView)
          }
          get parentInjector() {
            const t = $o(this._hostTNode, this._hostLView)
            if (na(t)) {
              const n = Tr(t, this._hostLView),
                r = Sr(t)
              return new Ee(n[w].data[r + 8], n)
            }
            return new Ee(null, this._hostLView)
          }
          clear() {
            for (; this.length > 0; ) this.remove(this.length - 1)
          }
          get(t) {
            const n = um(this._lContainer)
            return (null !== n && n[t]) || null
          }
          get length() {
            return this._lContainer.length - de
          }
          createEmbeddedView(t, n, r) {
            let o, i
            'number' == typeof r
              ? (o = r)
              : null != r && ((o = r.index), (i = r.injector))
            const a = t.createEmbeddedViewImpl(n || {}, i, null)
            return this.insertImpl(a, o, false), a
          }
          createComponent(t, n, r, o, i) {
            const s =
              t &&
              !(function Ar(e) {
                return 'function' == typeof e
              })(t)
            let a
            if (s) a = n
            else {
              const g = n || {}
              ;(a = g.index),
                (r = g.injector),
                (o = g.projectableNodes),
                (i = g.environmentInjector || g.ngModuleRef)
            }
            const u = s ? t : new zr(k(t)),
              c = r || this.parentInjector
            if (!i && null == u.ngModule) {
              const D = (s ? c : this.parentInjector).get(Mt, null)
              D && (i = D)
            }
            k(u.componentType ?? {})
            const h = u.create(c, o, null, i)
            return this.insertImpl(h.hostView, a, false), h
          }
          insert(t, n) {
            return this.insertImpl(t, n, !1)
          }
          insertImpl(t, n, r) {
            const o = t._lView
            if (
              (function iw(e) {
                return De(e[K])
              })(o)
            ) {
              const u = this.indexOf(t)
              if (-1 !== u) this.detach(u)
              else {
                const c = o[K],
                  l = new am(c, c[pe], c[K])
                l.detach(l.indexOf(t))
              }
            }
            const s = this._adjustIndex(n),
              a = this._lContainer
            return (
              w0(a, o, s, !r), t.attachToViewContainerRef(), zd(Zu(a), s, t), t
            )
          }
          move(t, n) {
            return this.insert(t, n)
          }
          indexOf(t) {
            const n = um(this._lContainer)
            return null !== n ? n.indexOf(t) : -1
          }
          remove(t) {
            const n = this._adjustIndex(t, -1),
              r = ei(this._lContainer, n)
            r && (Go(Zu(this._lContainer), n), Ca(r[w], r))
          }
          detach(t) {
            const n = this._adjustIndex(t, -1),
              r = ei(this._lContainer, n)
            return r && null != Go(Zu(this._lContainer), n) ? new Gr(r) : null
          }
          _adjustIndex(t, n = 0) {
            return t ?? this.length + n
          }
        }
      function um(e) {
        return e[8]
      }
      function Zu(e) {
        return e[8] || (e[8] = [])
      }
      let lm = function dm(e, t, n, r) {
        if (e[at]) return
        let o
        ;(o =
          8 & n.type
            ? Z(r)
            : (function x0(e, t) {
                const n = e[T],
                  r = n.createComment(''),
                  o = Ne(t, e)
                return (
                  nn(
                    n,
                    ti(n, o),
                    r,
                    (function HE(e, t) {
                      return e.nextSibling(t)
                    })(n, o),
                    !1
                  ),
                  r
                )
              })(t, n)),
          (e[at] = o)
      }
      const dS = new N('Application Initializer')
      let oc = (() => {
        class e {
          constructor() {
            ;(this.initialized = !1),
              (this.done = !1),
              (this.donePromise = new Promise((n, r) => {
                ;(this.resolve = n), (this.reject = r)
              })),
              (this.appInits = W(dS, { optional: !0 }) ?? [])
          }
          runInitializers() {
            if (this.initialized) return
            const n = []
            for (const o of this.appInits) {
              const i = o()
              if (Tu(i)) n.push(i)
              else if (Cp(i)) {
                const s = new Promise((a, u) => {
                  i.subscribe({ complete: a, error: u })
                })
                n.push(s)
              }
            }
            const r = () => {
              ;(this.done = !0), this.resolve()
            }
            Promise.all(n)
              .then(() => {
                r()
              })
              .catch((o) => {
                this.reject(o)
              }),
              0 === n.length && r(),
              (this.initialized = !0)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = G({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const At = new N('LocaleId', {
        providedIn: 'root',
        factory: () =>
          W(At, L.Optional | L.SkipSelf) ||
          (function hS() {
            return (typeof $localize < 'u' && $localize.locale) || rr
          })(),
      })
      let mS = (() => {
        class e {
          constructor() {
            ;(this.taskId = 0),
              (this.pendingTasks = new Set()),
              (this.hasPendingTasks = new JD(!1))
          }
          add() {
            this.hasPendingTasks.next(!0)
            const n = this.taskId++
            return this.pendingTasks.add(n), n
          }
          remove(n) {
            this.pendingTasks.delete(n),
              0 === this.pendingTasks.size && this.hasPendingTasks.next(!1)
          }
          ngOnDestroy() {
            this.pendingTasks.clear(), this.hasPendingTasks.next(!1)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = G({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const km = new N(''),
        Gi = new N('')
      let cc,
        ac = (() => {
          class e {
            constructor(n, r, o) {
              ;(this._ngZone = n),
                (this.registry = r),
                (this._pendingCount = 0),
                (this._isZoneStable = !0),
                (this._didWork = !1),
                (this._callbacks = []),
                (this.taskTrackingZone = null),
                cc ||
                  ((function kS(e) {
                    cc = e
                  })(o),
                  o.addToWindow(r)),
                this._watchAngularEvents(),
                n.run(() => {
                  this.taskTrackingZone =
                    typeof Zone > 'u'
                      ? null
                      : Zone.current.get('TaskTrackingZone')
                })
            }
            _watchAngularEvents() {
              this._ngZone.onUnstable.subscribe({
                next: () => {
                  ;(this._didWork = !0), (this._isZoneStable = !1)
                },
              }),
                this._ngZone.runOutsideAngular(() => {
                  this._ngZone.onStable.subscribe({
                    next: () => {
                      te.assertNotInAngularZone(),
                        queueMicrotask(() => {
                          ;(this._isZoneStable = !0),
                            this._runCallbacksIfReady()
                        })
                    },
                  })
                })
            }
            increasePendingRequestCount() {
              return (
                (this._pendingCount += 1),
                (this._didWork = !0),
                this._pendingCount
              )
            }
            decreasePendingRequestCount() {
              if (((this._pendingCount -= 1), this._pendingCount < 0))
                throw new Error('pending async requests below zero')
              return this._runCallbacksIfReady(), this._pendingCount
            }
            isStable() {
              return (
                this._isZoneStable &&
                0 === this._pendingCount &&
                !this._ngZone.hasPendingMacrotasks
              )
            }
            _runCallbacksIfReady() {
              if (this.isStable())
                queueMicrotask(() => {
                  for (; 0 !== this._callbacks.length; ) {
                    let n = this._callbacks.pop()
                    clearTimeout(n.timeoutId), n.doneCb(this._didWork)
                  }
                  this._didWork = !1
                })
              else {
                let n = this.getPendingTasks()
                ;(this._callbacks = this._callbacks.filter(
                  (r) =>
                    !r.updateCb ||
                    !r.updateCb(n) ||
                    (clearTimeout(r.timeoutId), !1)
                )),
                  (this._didWork = !0)
              }
            }
            getPendingTasks() {
              return this.taskTrackingZone
                ? this.taskTrackingZone.macroTasks.map((n) => ({
                    source: n.source,
                    creationLocation: n.creationLocation,
                    data: n.data,
                  }))
                : []
            }
            addCallback(n, r, o) {
              let i = -1
              r &&
                r > 0 &&
                (i = setTimeout(() => {
                  ;(this._callbacks = this._callbacks.filter(
                    (s) => s.timeoutId !== i
                  )),
                    n(this._didWork, this.getPendingTasks())
                }, r)),
                this._callbacks.push({ doneCb: n, timeoutId: i, updateCb: o })
            }
            whenStable(n, r, o) {
              if (o && !this.taskTrackingZone)
                throw new Error(
                  'Task tracking zone is required when passing an update callback to whenStable(). Is "zone.js/plugins/task-tracking" loaded?'
                )
              this.addCallback(n, r, o), this._runCallbacksIfReady()
            }
            getPendingRequestCount() {
              return this._pendingCount
            }
            registerApplication(n) {
              this.registry.registerApplication(n, this)
            }
            unregisterApplication(n) {
              this.registry.unregisterApplication(n)
            }
            findProviders(n, r, o) {
              return []
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(P(te), P(uc), P(Gi))
            })
            static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
          }
          return e
        })(),
        uc = (() => {
          class e {
            constructor() {
              this._applications = new Map()
            }
            registerApplication(n, r) {
              this._applications.set(n, r)
            }
            unregisterApplication(n) {
              this._applications.delete(n)
            }
            unregisterAllApplications() {
              this._applications.clear()
            }
            getTestability(n) {
              return this._applications.get(n) || null
            }
            getAllTestabilities() {
              return Array.from(this._applications.values())
            }
            getAllRootElements() {
              return Array.from(this._applications.keys())
            }
            findTestabilityInTree(n, r = !0) {
              return cc?.findTestabilityInTree(this, n, r) ?? null
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = G({
              token: e,
              factory: e.ɵfac,
              providedIn: 'platform',
            }))
          }
          return e
        })(),
        zt = null
      const jm = new N('AllowMultipleToken'),
        lc = new N('PlatformDestroyListeners'),
        Vm = new N('appBootstrapListener')
      function $m(e, t, n = []) {
        const r = `Platform: ${t}`,
          o = new N(r)
        return (i = []) => {
          let s = dc()
          if (!s || s.injector.get(jm, !1)) {
            const a = [...n, ...i, { provide: o, useValue: !0 }]
            e
              ? e(a)
              : (function HS(e) {
                  if (zt && !zt.get(jm, !1)) throw new E(400, !1)
                  ;(function Hm() {
                    !(function Gv(e) {
                      td = e
                    })(() => {
                      throw new E(600, !1)
                    })
                  })(),
                    (zt = e)
                  const t = e.get(Gm)
                  ;(function Bm(e) {
                    e.get(Kf, null)?.forEach((n) => n())
                  })(e)
                })(
                  (function Um(e = [], t) {
                    return Je.create({
                      name: t,
                      providers: [
                        { provide: ka, useValue: 'platform' },
                        { provide: lc, useValue: new Set([() => (zt = null)]) },
                        ...e,
                      ],
                    })
                  })(a, r)
                )
          }
          return (function $S(e) {
            const t = dc()
            if (!t) throw new E(401, !1)
            return t
          })()
        }
      }
      function dc() {
        return zt?.get(Gm) ?? null
      }
      let Gm = (() => {
        class e {
          constructor(n) {
            ;(this._injector = n),
              (this._modules = []),
              (this._destroyListeners = []),
              (this._destroyed = !1)
          }
          bootstrapModuleFactory(n, r) {
            const o = (function US(e = 'zone.js', t) {
              return 'noop' === e ? new i_() : 'zone.js' === e ? new te(t) : e
            })(
              r?.ngZone,
              (function zm(e) {
                return {
                  enableLongStackTrace: !1,
                  shouldCoalesceEventChangeDetection: e?.eventCoalescing ?? !1,
                  shouldCoalesceRunChangeDetection: e?.runCoalescing ?? !1,
                }
              })({
                eventCoalescing: r?.ngZoneEventCoalescing,
                runCoalescing: r?.ngZoneRunCoalescing,
              })
            )
            return o.run(() => {
              const i = (function $b(e, t, n) {
                  return new Gu(e, t, n)
                })(
                  n.moduleType,
                  this.injector,
                  (function Qm(e) {
                    return [
                      { provide: te, useFactory: e },
                      {
                        provide: ui,
                        multi: !0,
                        useFactory: () => {
                          const t = W(zS, { optional: !0 })
                          return () => t.initialize()
                        },
                      },
                      { provide: Ym, useFactory: GS },
                      { provide: ph, useFactory: gh },
                    ]
                  })(() => o)
                ),
                s = i.injector.get(bt, null)
              return (
                o.runOutsideAngular(() => {
                  const a = o.onError.subscribe({
                    next: (u) => {
                      s.handleError(u)
                    },
                  })
                  i.onDestroy(() => {
                    zi(this._modules, i), a.unsubscribe()
                  })
                }),
                (function qm(e, t, n) {
                  try {
                    const r = n()
                    return Tu(r)
                      ? r.catch((o) => {
                          throw (t.runOutsideAngular(() => e.handleError(o)), o)
                        })
                      : r
                  } catch (r) {
                    throw (t.runOutsideAngular(() => e.handleError(r)), r)
                  }
                })(s, o, () => {
                  const a = i.injector.get(oc)
                  return (
                    a.runInitializers(),
                    a.donePromise.then(
                      () => (
                        (function wg(e) {
                          Be(e, 'Expected localeId to be defined'),
                            'string' == typeof e &&
                              (vg = e.toLowerCase().replace(/_/g, '-'))
                        })(i.injector.get(At, rr) || rr),
                        this._moduleDoBootstrap(i),
                        i
                      )
                    )
                  )
                })
              )
            })
          }
          bootstrapModule(n, r = []) {
            const o = Wm({}, r)
            return (function jS(e, t, n) {
              const r = new zu(n)
              return Promise.resolve(r)
            })(0, 0, n).then((i) => this.bootstrapModuleFactory(i, o))
          }
          _moduleDoBootstrap(n) {
            const r = n.injector.get(ao)
            if (n._bootstrapComponents.length > 0)
              n._bootstrapComponents.forEach((o) => r.bootstrap(o))
            else {
              if (!n.instance.ngDoBootstrap) throw new E(-403, !1)
              n.instance.ngDoBootstrap(r)
            }
            this._modules.push(n)
          }
          onDestroy(n) {
            this._destroyListeners.push(n)
          }
          get injector() {
            return this._injector
          }
          destroy() {
            if (this._destroyed) throw new E(404, !1)
            this._modules.slice().forEach((r) => r.destroy()),
              this._destroyListeners.forEach((r) => r())
            const n = this._injector.get(lc, null)
            n && (n.forEach((r) => r()), n.clear()), (this._destroyed = !0)
          }
          get destroyed() {
            return this._destroyed
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(Je))
          })
          static #t = (this.ɵprov = G({
            token: e,
            factory: e.ɵfac,
            providedIn: 'platform',
          }))
        }
        return e
      })()
      function Wm(e, t) {
        return Array.isArray(t) ? t.reduce(Wm, e) : { ...e, ...t }
      }
      let ao = (() => {
        class e {
          constructor() {
            ;(this._bootstrapListeners = []),
              (this._runningTick = !1),
              (this._destroyed = !1),
              (this._destroyListeners = []),
              (this._views = []),
              (this.internalErrorHandler = W(Ym)),
              (this.zoneIsStable = W(ph)),
              (this.componentTypes = []),
              (this.components = []),
              (this.isStable = W(mS).hasPendingTasks.pipe(
                (function tv(e, t) {
                  return Yt((n, r) => {
                    let o = null,
                      i = 0,
                      s = !1
                    const a = () => s && !o && r.complete()
                    n.subscribe(
                      Qt(
                        r,
                        (u) => {
                          o?.unsubscribe()
                          let c = 0
                          const l = i++
                          Dt(e(u, l)).subscribe(
                            (o = Qt(
                              r,
                              (d) => r.next(t ? t(u, d, l, c++) : d),
                              () => {
                                ;(o = null), a()
                              }
                            ))
                          )
                        },
                        () => {
                          ;(s = !0), a()
                        }
                      )
                    )
                  })
                })((n) =>
                  n
                    ? (function ev(...e) {
                        return Dl(e, pl(e))
                      })(!1)
                    : this.zoneIsStable
                ),
                (function nv(e, t = ps) {
                  return (
                    (e = e ?? rv),
                    Yt((n, r) => {
                      let o,
                        i = !0
                      n.subscribe(
                        Qt(r, (s) => {
                          const a = t(s)
                          ;(i || !e(o, a)) && ((i = !1), (o = a), r.next(s))
                        })
                      )
                    })
                  )
                })(),
                vl()
              )),
              (this._injector = W(Mt))
          }
          get destroyed() {
            return this._destroyed
          }
          get injector() {
            return this._injector
          }
          bootstrap(n, r) {
            const o = n instanceof nh
            if (!this._injector.get(oc).done)
              throw (
                (!o &&
                  (function gr(e) {
                    const t = k(e) || le(e) || ye(e)
                    return null !== t && t.standalone
                  })(n),
                new E(405, !1))
              )
            let s
            ;(s = o ? n : this._injector.get(vi).resolveComponentFactory(n)),
              this.componentTypes.push(s.componentType)
            const a = (function VS(e) {
                return e.isBoundToModule
              })(s)
                ? void 0
                : this._injector.get(cn),
              c = s.create(Je.NULL, [], r || s.selector, a),
              l = c.location.nativeElement,
              d = c.injector.get(km, null)
            return (
              d?.registerApplication(l),
              c.onDestroy(() => {
                this.detachView(c.hostView),
                  zi(this.components, c),
                  d?.unregisterApplication(l)
              }),
              this._loadComponent(c),
              c
            )
          }
          tick() {
            if (this._runningTick) throw new E(101, !1)
            try {
              this._runningTick = !0
              for (let n of this._views) n.detectChanges()
            } catch (n) {
              this.internalErrorHandler(n)
            } finally {
              this._runningTick = !1
            }
          }
          attachView(n) {
            const r = n
            this._views.push(r), r.attachToAppRef(this)
          }
          detachView(n) {
            const r = n
            zi(this._views, r), r.detachFromAppRef()
          }
          _loadComponent(n) {
            this.attachView(n.hostView), this.tick(), this.components.push(n)
            const r = this._injector.get(Vm, [])
            r.push(...this._bootstrapListeners), r.forEach((o) => o(n))
          }
          ngOnDestroy() {
            if (!this._destroyed)
              try {
                this._destroyListeners.forEach((n) => n()),
                  this._views.slice().forEach((n) => n.destroy())
              } finally {
                ;(this._destroyed = !0),
                  (this._views = []),
                  (this._bootstrapListeners = []),
                  (this._destroyListeners = [])
              }
          }
          onDestroy(n) {
            return (
              this._destroyListeners.push(n),
              () => zi(this._destroyListeners, n)
            )
          }
          destroy() {
            if (this._destroyed) throw new E(406, !1)
            const n = this._injector
            n.destroy && !n.destroyed && n.destroy()
          }
          get viewCount() {
            return this._views.length
          }
          warnIfDestroyed() {}
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = G({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      function zi(e, t) {
        const n = e.indexOf(t)
        n > -1 && e.splice(n, 1)
      }
      const Ym = new N('', {
        providedIn: 'root',
        factory: () => W(bt).handleError.bind(void 0),
      })
      function GS() {
        const e = W(te),
          t = W(bt)
        return (n) => e.runOutsideAngular(() => t.handleError(n))
      }
      let zS = (() => {
        class e {
          constructor() {
            ;(this.zone = W(te)), (this.applicationRef = W(ao))
          }
          initialize() {
            this._onMicrotaskEmptySubscription ||
              (this._onMicrotaskEmptySubscription =
                this.zone.onMicrotaskEmpty.subscribe({
                  next: () => {
                    this.zone.run(() => {
                      this.applicationRef.tick()
                    })
                  },
                }))
          }
          ngOnDestroy() {
            this._onMicrotaskEmptySubscription?.unsubscribe()
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵprov = G({
            token: e,
            factory: e.ɵfac,
            providedIn: 'root',
          }))
        }
        return e
      })()
      const uT = $m(null, 'core', [])
      let cT = (() => {
          class e {
            constructor(n) {}
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(P(ao))
            })
            static #t = (this.ɵmod = pr({ type: e }))
            static #n = (this.ɵinj = dn({}))
          }
          return e
        })(),
        yc = null
      function Dc() {
        return yc
      }
      class CT {}
      const xt = new N('DocumentToken')
      let My = (() => {
        class e {
          constructor(n, r) {
            ;(this._viewContainer = n),
              (this._context = new hN()),
              (this._thenTemplateRef = null),
              (this._elseTemplateRef = null),
              (this._thenViewRef = null),
              (this._elseViewRef = null),
              (this._thenTemplateRef = r)
          }
          set ngIf(n) {
            ;(this._context.$implicit = this._context.ngIf = n),
              this._updateView()
          }
          set ngIfThen(n) {
            by('ngIfThen', n),
              (this._thenTemplateRef = n),
              (this._thenViewRef = null),
              this._updateView()
          }
          set ngIfElse(n) {
            by('ngIfElse', n),
              (this._elseTemplateRef = n),
              (this._elseViewRef = null),
              this._updateView()
          }
          _updateView() {
            this._context.$implicit
              ? this._thenViewRef ||
                (this._viewContainer.clear(),
                (this._elseViewRef = null),
                this._thenTemplateRef &&
                  (this._thenViewRef = this._viewContainer.createEmbeddedView(
                    this._thenTemplateRef,
                    this._context
                  )))
              : this._elseViewRef ||
                (this._viewContainer.clear(),
                (this._thenViewRef = null),
                this._elseTemplateRef &&
                  (this._elseViewRef = this._viewContainer.createEmbeddedView(
                    this._elseTemplateRef,
                    this._context
                  )))
          }
          static ngTemplateContextGuard(n, r) {
            return !0
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(O(yt), O(Nt))
          })
          static #t = (this.ɵdir = $e({
            type: e,
            selectors: [['', 'ngIf', '']],
            inputs: {
              ngIf: 'ngIf',
              ngIfThen: 'ngIfThen',
              ngIfElse: 'ngIfElse',
            },
            standalone: !0,
          }))
        }
        return e
      })()
      class hN {
        constructor() {
          ;(this.$implicit = null), (this.ngIf = null)
        }
      }
      function by(e, t) {
        if (t && !t.createEmbeddedView)
          throw new Error(
            `${e} must be a TemplateRef, but received '${ae(t)}'.`
          )
      }
      let jN = (() => {
        class e {
          static #e = (this.ɵfac = function (r) {
            return new (r || e)()
          })
          static #t = (this.ɵmod = pr({ type: e }))
          static #n = (this.ɵinj = dn({}))
        }
        return e
      })()
      function Ay(e) {
        return 'server' === e
      }
      class fA extends CT {
        constructor() {
          super(...arguments), (this.supportsDOMEvents = !0)
        }
      }
      class Fc extends fA {
        static makeCurrent() {
          !(function ET(e) {
            yc || (yc = e)
          })(new Fc())
        }
        onAndCancel(t, n, r) {
          return (
            t.addEventListener(n, r),
            () => {
              t.removeEventListener(n, r)
            }
          )
        }
        dispatchEvent(t, n) {
          t.dispatchEvent(n)
        }
        remove(t) {
          t.parentNode && t.parentNode.removeChild(t)
        }
        createElement(t, n) {
          return (n = n || this.getDefaultDocument()).createElement(t)
        }
        createHtmlDocument() {
          return document.implementation.createHTMLDocument('fakeTitle')
        }
        getDefaultDocument() {
          return document
        }
        isElementNode(t) {
          return t.nodeType === Node.ELEMENT_NODE
        }
        isShadowRoot(t) {
          return t instanceof DocumentFragment
        }
        getGlobalEventTarget(t, n) {
          return 'window' === n
            ? window
            : 'document' === n
            ? t
            : 'body' === n
            ? t.body
            : null
        }
        getBaseHref(t) {
          const n = (function hA() {
            return (
              (ho = ho || document.querySelector('base')),
              ho ? ho.getAttribute('href') : null
            )
          })()
          return null == n
            ? null
            : (function pA(e) {
                ;(us = us || document.createElement('a')),
                  us.setAttribute('href', e)
                const t = us.pathname
                return '/' === t.charAt(0) ? t : `/${t}`
              })(n)
        }
        resetBaseElement() {
          ho = null
        }
        getUserAgent() {
          return window.navigator.userAgent
        }
        getCookie(t) {
          return (function uN(e, t) {
            t = encodeURIComponent(t)
            for (const n of e.split(';')) {
              const r = n.indexOf('='),
                [o, i] = -1 == r ? [n, ''] : [n.slice(0, r), n.slice(r + 1)]
              if (o.trim() === t) return decodeURIComponent(i)
            }
            return null
          })(document.cookie, t)
        }
      }
      let us,
        ho = null,
        mA = (() => {
          class e {
            build() {
              return new XMLHttpRequest()
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
          }
          return e
        })()
      const Lc = new N('EventManagerPlugins')
      let Fy = (() => {
        class e {
          constructor(n, r) {
            ;(this._zone = r),
              (this._eventNameToPlugin = new Map()),
              n.forEach((o) => {
                o.manager = this
              }),
              (this._plugins = n.slice().reverse())
          }
          addEventListener(n, r, o) {
            return this._findPluginFor(r).addEventListener(n, r, o)
          }
          getZone() {
            return this._zone
          }
          _findPluginFor(n) {
            let r = this._eventNameToPlugin.get(n)
            if (r) return r
            if (((r = this._plugins.find((i) => i.supports(n))), !r))
              throw new E(5101, !1)
            return this._eventNameToPlugin.set(n, r), r
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(Lc), P(te))
          })
          static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      class Ly {
        constructor(t) {
          this._doc = t
        }
      }
      const kc = 'ng-app-id'
      let ky = (() => {
        class e {
          constructor(n, r, o, i = {}) {
            ;(this.doc = n),
              (this.appId = r),
              (this.nonce = o),
              (this.platformId = i),
              (this.styleRef = new Map()),
              (this.hostNodes = new Set()),
              (this.styleNodesInDOM = this.collectServerRenderedStyles()),
              (this.platformIsServer = Ay(i)),
              this.resetHostNodes()
          }
          addStyles(n) {
            for (const r of n)
              1 === this.changeUsageCount(r, 1) && this.onStyleAdded(r)
          }
          removeStyles(n) {
            for (const r of n)
              this.changeUsageCount(r, -1) <= 0 && this.onStyleRemoved(r)
          }
          ngOnDestroy() {
            const n = this.styleNodesInDOM
            n && (n.forEach((r) => r.remove()), n.clear())
            for (const r of this.getAllStyles()) this.onStyleRemoved(r)
            this.resetHostNodes()
          }
          addHost(n) {
            this.hostNodes.add(n)
            for (const r of this.getAllStyles()) this.addStyleToHost(n, r)
          }
          removeHost(n) {
            this.hostNodes.delete(n)
          }
          getAllStyles() {
            return this.styleRef.keys()
          }
          onStyleAdded(n) {
            for (const r of this.hostNodes) this.addStyleToHost(r, n)
          }
          onStyleRemoved(n) {
            const r = this.styleRef
            r.get(n)?.elements?.forEach((o) => o.remove()), r.delete(n)
          }
          collectServerRenderedStyles() {
            const n = this.doc.head?.querySelectorAll(
              `style[${kc}="${this.appId}"]`
            )
            if (n?.length) {
              const r = new Map()
              return (
                n.forEach((o) => {
                  null != o.textContent && r.set(o.textContent, o)
                }),
                r
              )
            }
            return null
          }
          changeUsageCount(n, r) {
            const o = this.styleRef
            if (o.has(n)) {
              const i = o.get(n)
              return (i.usage += r), i.usage
            }
            return o.set(n, { usage: r, elements: [] }), r
          }
          getStyleElement(n, r) {
            const o = this.styleNodesInDOM,
              i = o?.get(r)
            if (i?.parentNode === n)
              return o.delete(r), i.removeAttribute(kc), i
            {
              const s = this.doc.createElement('style')
              return (
                this.nonce && s.setAttribute('nonce', this.nonce),
                (s.textContent = r),
                this.platformIsServer && s.setAttribute(kc, this.appId),
                s
              )
            }
          }
          addStyleToHost(n, r) {
            const o = this.getStyleElement(n, r)
            n.appendChild(o)
            const i = this.styleRef,
              s = i.get(r)?.elements
            s ? s.push(o) : i.set(r, { elements: [o], usage: 1 })
          }
          resetHostNodes() {
            const n = this.hostNodes
            n.clear(), n.add(this.doc.head)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(xt), P(hi), P(Xf, 8), P(Ln))
          })
          static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const jc = {
          svg: 'http://www.w3.org/2000/svg',
          xhtml: 'http://www.w3.org/1999/xhtml',
          xlink: 'http://www.w3.org/1999/xlink',
          xml: 'http://www.w3.org/XML/1998/namespace',
          xmlns: 'http://www.w3.org/2000/xmlns/',
          math: 'http://www.w3.org/1998/MathML/',
        },
        Vc = /%COMP%/g,
        wA = new N('RemoveStylesOnCompDestroy', {
          providedIn: 'root',
          factory: () => !1,
        })
      function Vy(e, t) {
        return t.map((n) => n.replace(Vc, e))
      }
      let Hy = (() => {
        class e {
          constructor(n, r, o, i, s, a, u, c = null) {
            ;(this.eventManager = n),
              (this.sharedStylesHost = r),
              (this.appId = o),
              (this.removeStylesOnCompDestroy = i),
              (this.doc = s),
              (this.platformId = a),
              (this.ngZone = u),
              (this.nonce = c),
              (this.rendererByCompId = new Map()),
              (this.platformIsServer = Ay(a)),
              (this.defaultRenderer = new Hc(n, s, u, this.platformIsServer))
          }
          createRenderer(n, r) {
            if (!n || !r) return this.defaultRenderer
            this.platformIsServer &&
              r.encapsulation === Ye.ShadowDom &&
              (r = { ...r, encapsulation: Ye.Emulated })
            const o = this.getOrCreateRenderer(n, r)
            return (
              o instanceof $y
                ? o.applyToHost(n)
                : o instanceof Bc && o.applyStyles(),
              o
            )
          }
          getOrCreateRenderer(n, r) {
            const o = this.rendererByCompId
            let i = o.get(r.id)
            if (!i) {
              const s = this.doc,
                a = this.ngZone,
                u = this.eventManager,
                c = this.sharedStylesHost,
                l = this.removeStylesOnCompDestroy,
                d = this.platformIsServer
              switch (r.encapsulation) {
                case Ye.Emulated:
                  i = new $y(u, c, r, this.appId, l, s, a, d)
                  break
                case Ye.ShadowDom:
                  return new IA(u, c, n, r, s, a, this.nonce, d)
                default:
                  i = new Bc(u, c, r, l, s, a, d)
              }
              o.set(r.id, i)
            }
            return i
          }
          ngOnDestroy() {
            this.rendererByCompId.clear()
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(
              P(Fy),
              P(ky),
              P(hi),
              P(wA),
              P(xt),
              P(Ln),
              P(te),
              P(Xf)
            )
          })
          static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      class Hc {
        constructor(t, n, r, o) {
          ;(this.eventManager = t),
            (this.doc = n),
            (this.ngZone = r),
            (this.platformIsServer = o),
            (this.data = Object.create(null)),
            (this.destroyNode = null)
        }
        destroy() {}
        createElement(t, n) {
          return n
            ? this.doc.createElementNS(jc[n] || n, t)
            : this.doc.createElement(t)
        }
        createComment(t) {
          return this.doc.createComment(t)
        }
        createText(t) {
          return this.doc.createTextNode(t)
        }
        appendChild(t, n) {
          ;(By(t) ? t.content : t).appendChild(n)
        }
        insertBefore(t, n, r) {
          t && (By(t) ? t.content : t).insertBefore(n, r)
        }
        removeChild(t, n) {
          t && t.removeChild(n)
        }
        selectRootElement(t, n) {
          let r = 'string' == typeof t ? this.doc.querySelector(t) : t
          if (!r) throw new E(-5104, !1)
          return n || (r.textContent = ''), r
        }
        parentNode(t) {
          return t.parentNode
        }
        nextSibling(t) {
          return t.nextSibling
        }
        setAttribute(t, n, r, o) {
          if (o) {
            n = o + ':' + n
            const i = jc[o]
            i ? t.setAttributeNS(i, n, r) : t.setAttribute(n, r)
          } else t.setAttribute(n, r)
        }
        removeAttribute(t, n, r) {
          if (r) {
            const o = jc[r]
            o ? t.removeAttributeNS(o, n) : t.removeAttribute(`${r}:${n}`)
          } else t.removeAttribute(n)
        }
        addClass(t, n) {
          t.classList.add(n)
        }
        removeClass(t, n) {
          t.classList.remove(n)
        }
        setStyle(t, n, r, o) {
          o & (Ut.DashCase | Ut.Important)
            ? t.style.setProperty(n, r, o & Ut.Important ? 'important' : '')
            : (t.style[n] = r)
        }
        removeStyle(t, n, r) {
          r & Ut.DashCase ? t.style.removeProperty(n) : (t.style[n] = '')
        }
        setProperty(t, n, r) {
          t[n] = r
        }
        setValue(t, n) {
          t.nodeValue = n
        }
        listen(t, n, r) {
          if (
            'string' == typeof t &&
            !(t = Dc().getGlobalEventTarget(this.doc, t))
          )
            throw new Error(`Unsupported event target ${t} for event ${n}`)
          return this.eventManager.addEventListener(
            t,
            n,
            this.decoratePreventDefault(r)
          )
        }
        decoratePreventDefault(t) {
          return (n) => {
            if ('__ngUnwrap__' === n) return t
            !1 ===
              (this.platformIsServer
                ? this.ngZone.runGuarded(() => t(n))
                : t(n)) && n.preventDefault()
          }
        }
      }
      function By(e) {
        return 'TEMPLATE' === e.tagName && void 0 !== e.content
      }
      class IA extends Hc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, u),
            (this.sharedStylesHost = n),
            (this.hostEl = r),
            (this.shadowRoot = r.attachShadow({ mode: 'open' })),
            this.sharedStylesHost.addHost(this.shadowRoot)
          const c = Vy(o.id, o.styles)
          for (const l of c) {
            const d = document.createElement('style')
            a && d.setAttribute('nonce', a),
              (d.textContent = l),
              this.shadowRoot.appendChild(d)
          }
        }
        nodeOrShadowRoot(t) {
          return t === this.hostEl ? this.shadowRoot : t
        }
        appendChild(t, n) {
          return super.appendChild(this.nodeOrShadowRoot(t), n)
        }
        insertBefore(t, n, r) {
          return super.insertBefore(this.nodeOrShadowRoot(t), n, r)
        }
        removeChild(t, n) {
          return super.removeChild(this.nodeOrShadowRoot(t), n)
        }
        parentNode(t) {
          return this.nodeOrShadowRoot(
            super.parentNode(this.nodeOrShadowRoot(t))
          )
        }
        destroy() {
          this.sharedStylesHost.removeHost(this.shadowRoot)
        }
      }
      class Bc extends Hc {
        constructor(t, n, r, o, i, s, a, u) {
          super(t, i, s, a),
            (this.sharedStylesHost = n),
            (this.removeStylesOnCompDestroy = o),
            (this.styles = u ? Vy(u, r.styles) : r.styles)
        }
        applyStyles() {
          this.sharedStylesHost.addStyles(this.styles)
        }
        destroy() {
          this.removeStylesOnCompDestroy &&
            this.sharedStylesHost.removeStyles(this.styles)
        }
      }
      class $y extends Bc {
        constructor(t, n, r, o, i, s, a, u) {
          const c = o + '-' + r.id
          super(t, n, r, i, s, a, u, c),
            (this.contentAttr = (function EA(e) {
              return '_ngcontent-%COMP%'.replace(Vc, e)
            })(c)),
            (this.hostAttr = (function CA(e) {
              return '_nghost-%COMP%'.replace(Vc, e)
            })(c))
        }
        applyToHost(t) {
          this.applyStyles(), this.setAttribute(t, this.hostAttr, '')
        }
        createElement(t, n) {
          const r = super.createElement(t, n)
          return super.setAttribute(r, this.contentAttr, ''), r
        }
      }
      let MA = (() => {
        class e extends Ly {
          constructor(n) {
            super(n)
          }
          supports(n) {
            return !0
          }
          addEventListener(n, r, o) {
            return (
              n.addEventListener(r, o, !1),
              () => this.removeEventListener(n, r, o)
            )
          }
          removeEventListener(n, r, o) {
            return n.removeEventListener(r, o)
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(xt))
          })
          static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const Uy = ['alt', 'control', 'meta', 'shift'],
        bA = {
          '\b': 'Backspace',
          '\t': 'Tab',
          '\x7f': 'Delete',
          '\x1b': 'Escape',
          Del: 'Delete',
          Esc: 'Escape',
          Left: 'ArrowLeft',
          Right: 'ArrowRight',
          Up: 'ArrowUp',
          Down: 'ArrowDown',
          Menu: 'ContextMenu',
          Scroll: 'ScrollLock',
          Win: 'OS',
        },
        SA = {
          alt: (e) => e.altKey,
          control: (e) => e.ctrlKey,
          meta: (e) => e.metaKey,
          shift: (e) => e.shiftKey,
        }
      let TA = (() => {
        class e extends Ly {
          constructor(n) {
            super(n)
          }
          supports(n) {
            return null != e.parseEventName(n)
          }
          addEventListener(n, r, o) {
            const i = e.parseEventName(r),
              s = e.eventCallback(i.fullKey, o, this.manager.getZone())
            return this.manager
              .getZone()
              .runOutsideAngular(() => Dc().onAndCancel(n, i.domEventName, s))
          }
          static parseEventName(n) {
            const r = n.toLowerCase().split('.'),
              o = r.shift()
            if (0 === r.length || ('keydown' !== o && 'keyup' !== o))
              return null
            const i = e._normalizeKey(r.pop())
            let s = '',
              a = r.indexOf('code')
            if (
              (a > -1 && (r.splice(a, 1), (s = 'code.')),
              Uy.forEach((c) => {
                const l = r.indexOf(c)
                l > -1 && (r.splice(l, 1), (s += c + '.'))
              }),
              (s += i),
              0 != r.length || 0 === i.length)
            )
              return null
            const u = {}
            return (u.domEventName = o), (u.fullKey = s), u
          }
          static matchEventFullKeyCode(n, r) {
            let o = bA[n.key] || n.key,
              i = ''
            return (
              r.indexOf('code.') > -1 && ((o = n.code), (i = 'code.')),
              !(null == o || !o) &&
                ((o = o.toLowerCase()),
                ' ' === o ? (o = 'space') : '.' === o && (o = 'dot'),
                Uy.forEach((s) => {
                  s !== o && (0, SA[s])(n) && (i += s + '.')
                }),
                (i += o),
                i === r)
            )
          }
          static eventCallback(n, r, o) {
            return (i) => {
              e.matchEventFullKeyCode(i, n) && o.runGuarded(() => r(i))
            }
          }
          static _normalizeKey(n) {
            return 'esc' === n ? 'escape' : n
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(xt))
          })
          static #t = (this.ɵprov = G({ token: e, factory: e.ɵfac }))
        }
        return e
      })()
      const OA = $m(uT, 'browser', [
          { provide: Ln, useValue: 'browser' },
          {
            provide: Kf,
            useValue: function NA() {
              Fc.makeCurrent()
            },
            multi: !0,
          },
          {
            provide: xt,
            useFactory: function xA() {
              return (
                (function ZE(e) {
                  Na = e
                })(document),
                document
              )
            },
            deps: [],
          },
        ]),
        PA = new N(''),
        qy = [
          {
            provide: Gi,
            useClass: class gA {
              addToWindow(t) {
                ;(q.getAngularTestability = (r, o = !0) => {
                  const i = t.findTestabilityInTree(r, o)
                  if (null == i) throw new E(5103, !1)
                  return i
                }),
                  (q.getAllAngularTestabilities = () =>
                    t.getAllTestabilities()),
                  (q.getAllAngularRootElements = () => t.getAllRootElements()),
                  q.frameworkStabilizers || (q.frameworkStabilizers = []),
                  q.frameworkStabilizers.push((r) => {
                    const o = q.getAllAngularTestabilities()
                    let i = o.length,
                      s = !1
                    const a = function (u) {
                      ;(s = s || u), i--, 0 == i && r(s)
                    }
                    o.forEach((u) => {
                      u.whenStable(a)
                    })
                  })
              }
              findTestabilityInTree(t, n, r) {
                return null == n
                  ? null
                  : t.getTestability(n) ??
                      (r
                        ? Dc().isShadowRoot(n)
                          ? this.findTestabilityInTree(t, n.host, !0)
                          : this.findTestabilityInTree(t, n.parentElement, !0)
                        : null)
              }
            },
            deps: [],
          },
          { provide: km, useClass: ac, deps: [te, uc, Gi] },
          { provide: ac, useClass: ac, deps: [te, uc, Gi] },
        ],
        Wy = [
          { provide: ka, useValue: 'root' },
          {
            provide: bt,
            useFactory: function AA() {
              return new bt()
            },
            deps: [],
          },
          { provide: Lc, useClass: MA, multi: !0, deps: [xt, te, Ln] },
          { provide: Lc, useClass: TA, multi: !0, deps: [xt] },
          Hy,
          ky,
          Fy,
          { provide: oh, useExisting: Hy },
          { provide: class UN {}, useClass: mA, deps: [] },
          [],
        ]
      let RA = (() => {
        class e {
          constructor(n) {}
          static withServerTransition(n) {
            return {
              ngModule: e,
              providers: [{ provide: hi, useValue: n.appId }],
            }
          }
          static #e = (this.ɵfac = function (r) {
            return new (r || e)(P(PA, 12))
          })
          static #t = (this.ɵmod = pr({ type: e }))
          static #n = (this.ɵinj = dn({
            providers: [...Wy, ...qy],
            imports: [jN, cT],
          }))
        }
        return e
      })()
      typeof window < 'u' && window
      let Qy = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵprov = G({
              token: e,
              factory: function (r) {
                let o = null
                return (o = r ? new (r || e)() : P(Ky)), o
              },
              providedIn: 'root',
            }))
          }
          return e
        })(),
        Ky = (() => {
          class e extends Qy {
            constructor(n) {
              super(), (this._doc = n)
            }
            sanitize(n, r) {
              if (null == r) return null
              switch (n) {
                case ze.NONE:
                  return r
                case ze.HTML:
                  return dt(r, 'HTML')
                    ? je(r)
                    : Vf(this._doc, String(r)).toString()
                case ze.STYLE:
                  return dt(r, 'Style') ? je(r) : r
                case ze.SCRIPT:
                  if (dt(r, 'Script')) return je(r)
                  throw new E(5200, !1)
                case ze.URL:
                  return dt(r, 'URL') ? je(r) : si(String(r))
                case ze.RESOURCE_URL:
                  if (dt(r, 'ResourceURL')) return je(r)
                  throw new E(5201, !1)
                default:
                  throw new E(5202, !1)
              }
            }
            bypassSecurityTrustHtml(n) {
              return (function tC(e) {
                return new YE(e)
              })(n)
            }
            bypassSecurityTrustStyle(n) {
              return (function nC(e) {
                return new QE(e)
              })(n)
            }
            bypassSecurityTrustScript(n) {
              return (function rC(e) {
                return new KE(e)
              })(n)
            }
            bypassSecurityTrustUrl(n) {
              return (function oC(e) {
                return new XE(e)
              })(n)
            }
            bypassSecurityTrustResourceUrl(n) {
              return (function iC(e) {
                return new JE(e)
              })(n)
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(P(xt))
            })
            static #t = (this.ɵprov = G({
              token: e,
              factory: function (r) {
                let o = null
                return (
                  (o = r
                    ? new r()
                    : (function HA(e) {
                        return new Ky(e.get(xt))
                      })(P(Je))),
                  o
                )
              },
              providedIn: 'root',
            }))
          }
          return e
        })(),
        BA = (() => {
          class e {
            constructor(n, r) {
              ;(this.sanitizer = n),
                (this.renderer = r),
                (this.closeModalEvent = new ft())
            }
            ngOnChanges() {
              this.sanitizedModalBody = this.sanitizer.bypassSecurityTrustHtml(
                this.modalBody
              )
            }
            closeModal() {
              this.closeModalEvent.emit()
            }
            renderHtml(n) {
              const r = this.renderer.createElement('div')
              return (
                this.renderer.appendChild(
                  r,
                  this.sanitizer.bypassSecurityTrustHtml(n)
                ),
                r.innerHTML
              )
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)(O(Qy), O(Ka))
            })
            static #t = (this.ɵcmp = No({
              type: e,
              selectors: [['app-child']],
              inputs: { modalTitle: 'modalTitle', modalBody: 'modalBody' },
              outputs: { closeModalEvent: 'closeModalEvent' },
              features: [Ir],
              decls: 7,
              vars: 2,
              consts: [
                [1, 'modal'],
                [1, 'modal-content'],
                [3, 'innerHTML'],
                [3, 'click'],
              ],
              template: function (r, o) {
                1 & r &&
                  (Jn(0, 'div', 0)(1, 'div', 1)(2, 'h2'),
                  Fu(3),
                  er(),
                  Oi(4, 'div', 2),
                  Jn(5, 'button', 3),
                  Pi('click', function () {
                    return o.closeModal()
                  }),
                  Fu(6, 'Close'),
                  er()()()),
                  2 & r &&
                    (au(3),
                    Lu(o.modalTitle),
                    au(1),
                    Qr('innerHTML', o.renderHtml(o.modalBody), Hf))
              },
              encapsulation: 2,
            }))
          }
          return e
        })()
      function $A(e, t) {
        if (1 & e) {
          const n = (function Ep() {
            return y()
          })()
          Jn(0, 'app-child', 1),
            Pi('closeModalEvent', function () {
              return (
                (function Dd(e) {
                  return (I.lFrame.contextLView = e), e[re]
                })(n),
                (function vd(e) {
                  return (I.lFrame.contextLView = null), e
                })((Nu().showModal = !1))
              )
            }),
            er()
        }
        if (2 & e) {
          const n = Nu()
          Qr('modalTitle', n.modalTitle)('modalBody', n.modalBody)
        }
      }
      let UA = (() => {
          class e {
            constructor() {
              ;(this.showModal = !0),
                (this.modalTitle = 'Example Modal'),
                (this.modalBody =
                  '<p>This is the modal body content with <strong>HTML</strong>.</p>')
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵcmp = No({
              type: e,
              selectors: [['app-parent']],
              decls: 1,
              vars: 1,
              consts: [
                [3, 'modalTitle', 'modalBody', 'closeModalEvent', 4, 'ngIf'],
                [3, 'modalTitle', 'modalBody', 'closeModalEvent'],
              ],
              template: function (r, o) {
                1 & r &&
                  (function gp(e, t, n, r, o, i, s, a) {
                    const u = y(),
                      c = j(),
                      l = e + R,
                      d = c.firstCreatePass
                        ? (function FI(e, t, n, r, o, i, s, a, u) {
                            const c = t.consts,
                              l = Un(t, e, 4, s || null, Bt(c, a))
                            hu(t, n, l, Bt(c, u)), ko(t, l)
                            const d = (l.tView = fu(
                              2,
                              l,
                              r,
                              o,
                              i,
                              t.directiveRegistry,
                              t.pipeRegistry,
                              null,
                              t.schemas,
                              c,
                              null
                            ))
                            return (
                              null !== t.queries &&
                                (t.queries.template(t, l),
                                (d.queries = t.queries.embeddedTView(l))),
                              l
                            )
                          })(l, c, u, t, n, r, o, i, s)
                        : c.data[l]
                    ct(d, !1)
                    const f = mp(c, u, d, e)
                    Lo() && ni(c, u, f, d),
                      ge(f, u),
                      _i(u, (u[l] = kh(f, u, f, d))),
                      Oo(d) && lu(c, u, d),
                      null != s && du(u, d, a)
                  })(0, $A, 1, 2, 'app-child', 0),
                  2 & r && Qr('ngIf', o.showModal)
              },
              dependencies: [My, BA],
              encapsulation: 2,
            }))
          }
          return e
        })(),
        GA = (() => {
          class e {
            constructor() {
              this.title = 'ng-test-pass-component'
            }
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵcmp = No({
              type: e,
              selectors: [['app-root']],
              decls: 1,
              vars: 0,
              template: function (r, o) {
                1 & r && Oi(0, 'app-parent')
              },
              dependencies: [UA],
              encapsulation: 2,
            }))
          }
          return e
        })(),
        zA = (() => {
          class e {
            static #e = (this.ɵfac = function (r) {
              return new (r || e)()
            })
            static #t = (this.ɵmod = pr({ type: e, bootstrap: [GA] }))
            static #n = (this.ɵinj = dn({ imports: [RA] }))
          }
          return e
        })()
      OA()
        .bootstrapModule(zA)
        .catch((e) => console.error(e))
    },
  },
  (J) => {
    J((J.s = 191))
  },
])
