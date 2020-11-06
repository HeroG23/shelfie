module.exports = {
    createProduct: (req, res, next) =>{
        const db = req.app.get('db');
        const {product_name, price, img_url} = req.body;

        db.create_product([product_name, price, img_url])
        .then (() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(`You can't sit here`)
            console.log(err)
        });
    },

    findProduct: (req, res, next) => {
        const db = req.app.get('db');
        const {id} = req.params;

        db.find_product(id)
        .then(product => res.status(200).send(product))
        .catch(err => {
            res.status(500).send(`There's a snake in my boot`)
            console.log(err)
        });
    },
    findProducts: (req, res) => {
        const db = req.app.get('db');

        db.find_products()
        .then(products => res.status(200).send(products))
        .catch(err => {
            res.status(500).send(`There's a troll in the dungeon`)
            console.log(err)
        });
    },
    updateProduct: (req, res) =>{
        const db = req.app.get('db');
        const {id} = req.params;
        const {desc} = req.query;

        db.update_product([id, desc])
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(`Exterminate, exterminate`)
            console.log(err)
        });
    },

    deleteProduct: (req, res) => {
        const db = req.app.get('db');
        const {id} = req.params;

        db.delete_product(id)
        .then(() => res.sendStatus(200))
        .catch(err => {
            res.status(500).send(`You're doing it wrong!!`)
            console.log(err)
        })
    }
}