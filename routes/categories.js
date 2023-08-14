var express = require('express');
var router = express.Router();

//const categories = require('../data/categories.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET categories listing. */

router.get('/', async(req, res) => {
    const categories = await prisma.categorie.findMany()
    res.json(categories)
});

router.get('/:id', async(req, res) => {
    const id = +req.params.id
    const categorie = await prisma.categorie.findUnique({
        where: { id },
    })
    res.json(categorie)
});

router.delete('/:id', async(req, res) => {
    const id = +req.params.id
    const categorie = await prisma.categorie.delete({
        where: { id },
    })
    res.json(categorie)
});
router.post('/', async(req, res) => {
    const { name } = req.body
    const result = await prisma.categorie.create({
        data: {
            name
        },
    })
    res.send(result)
});
router.patch("/:id", async(req, res) => {
    var id = +req.params.id;
    const { name } = req.body;
    const categorie = await prisma.categorie.update({
        where: { id },
        data: {
            name
        },
    })
    res.send(categorie)
});


module.exports = router;