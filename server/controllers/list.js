class List {
    show(ctx) {
        ctx.type = 'application/json';
        ctx.body = {
            a: 'dsa',
            b: 123,
            c: ['1','d'],
            param: ctx.params.id
        };
    }
}

module.exports = new List();