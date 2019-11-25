class Observable {
    constructor() {      
            this._listener = [];
    }


    initProperties() {
        for (let key of Object.keys(this)) {
            Object.defineProperty(this, key, 
            {
                get: () => this[`_${key}`],
                set: (value) => {
                    this[`_${key}`] = value;
                    this.dispatch()
                }
            })
        }
    }

    onChange(listener) {
        this._listener.push(listener)
    }

    dispatch() {
        for (let listener of this._listener) {
            if (typeof listener === 'function') listener(this)
        }
    }
}

class Test extends Observable {
    constructor() {
            super()
        this.boom = "baba"
        this.initProperties()
    }
}

const test = new Test()

console.info(test)

test.onChange((v) => console.info("boom a changé", v))

setTimeout(() => {
	//boom.
}, 
3000)