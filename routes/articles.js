var express = require('express');
var router = express.Router();

//const articles = require('../data/articles.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET articles listing. */

router.get('/', async(req, res) => {
    const articles = await prisma.article.findMany()
    res.json(articles)
});

router.get('/:id', async(req, res) => {
    const id = +req.params.id
    const articles = await prisma.article.findUnique({
        where: { id },
    })
    res.json(articles)
});

router.delete('/:id', async(req, res) => {
    const id = +req.params.id
    const articles = await prisma.article.delete({
        where: { id },
    })
    res.json(articles)
});
router.post('/', async(req, res) => {
    const { titre,
        content,
        image } = req.body
    const result = await prisma.article.create({
        data: {
            titre,
            content,
            image
        },
    })
    res.send(result)
});
router.patch("/:id", async(req, res) => {
    var id = +req.params.id;
    const { titre,
        content,
        image } = req.body;
    const articles = await prisma.article.update({
        where: { id },
        data: {
            titre,
            content,
            image },
    })
    res.send(articles)
});


module.exports = router;