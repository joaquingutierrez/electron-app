const Store = require('electron-store');

const productSchema = {
	code: {
        type: 'string',
	},
    title: {
        type: 'string'
	},
    description: {
        type: "string"
    },
    stock: {
        type: "number"
    }
};

const store = new Store({productSchema});

module.exports = {
    store
}