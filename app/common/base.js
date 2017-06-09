class Base {
    constructor() {
        this.routes = [];
    }

    setRouter(method, router, action) {
        this.routes.push({
            method: method,
            router: router,
            action: action.bind(this)
        })
    }
}

module.exports = Base;