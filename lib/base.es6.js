class Base {
  constructor (opts) {
    this.callbacks = {}
  }

  on (key, fn) {
    if (!this.callbacks[key]) {
      this.callbacks[key] = []
    }

    this.callbacks[key].push(fn)
  }

  trigger () {
    let key = Array.prototype.shift.call(arguments)
    let fns = this.callbacks[key]

    for (let i = 0, cb; cb = fns[i++];) {
      cb.apply(this, arguments);
    }
  }
}

module.exports = Base