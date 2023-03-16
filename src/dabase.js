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
store.path = "./src/db/config.json"

module.exports = {
    store
}