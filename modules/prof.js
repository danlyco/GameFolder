class Observable {
    constructor() {
        // Array avec toutes les fonctions a exec lors du dispatch du changement
        // effectué dans le setter des propriétés
        // Un listener est ajouté avec la méthode onChange(listener)
        this._listeners = [];
    }

    // Méthode pour rendre les propriétés d'un observable réactive
    initProperties() {
        // On itère parmis les propriétés de l'objet de type Observable
        for (let key of Object.keys(this)) {
            // On store la valeur de la propriété
            const value = this[key];
            // On vérifie si la clé itérée est l'array des listeners ou la methode de dispatch
            // Si oui, on passe directement a la clé suivante pour éviter un conflit
        	if (['_listeners', 'dispatch'].includes(key)) continue;
            // On prend chaque propriété de l'objet (sauf _listeners[] et dispatch()) 
            // et attribue un
            // Getter qui renvoie la valeur
            // Setter qui met la nouvelle propriété ET dispatch l'evenement
            Object.defineProperty(this, key, 
            {
                get: () => this[`_${key}`] || value,
                set: (value) => {
                    this[`_${key}`] = value;
                    this.dispatch()
                }
            })

            // Si la clé obsérvée est bien un observable,
            // On bind le this pour rendre récursif
            if (value instanceof Observable) {
                this[key].onChange(this.dispatch.bind(this))
            }
        }
    }

    // Méthode pour ajouter une fonction au _listeners[] de l'objet
    // qui sera déclenchée lors du changement d'une valeur
    onChange(listener) {
        this._listeners.push(listener)
    }

    // Méthode dispatch appelée dans le setter d'une propriété observable
    // Qui sert a call toutes les fonctions du _listeners[] d'un objet observable
    dispatch() {
        for (let listener of this._listeners) {
            if (typeof listener === 'function') listener(this)
        }
    }
}

class Test extends Observable {
    constructor() {
            super()
        // on crée une propriété boom dans un objet de classe Test
        this.boom = "baba"
        // on rend observable les propriétés d'un objet
        this.initProperties()
        // les propriétés initiée après ne seront pas observable
        this.non = 'non'
    }
}

const test = new Test()

// on ajoute un listener qui va envoyer un message dans la console 
// a chaque changement d'une propriété 
// de l'objet test
test.onChange((v) => console.info("test a changé", v))

