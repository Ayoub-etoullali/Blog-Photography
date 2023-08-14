var express = require('express');
var router = express.Router();

//const commentaires = require('../data/commentaires.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET commentaires listing. */

router.get('/', async(req, res) => {
    const commentaires = await prisma.commentaire.findMany()
    res.json(commentaires)
});

router.get('/:id', async(req, res) => {
    const id = +req.params.id
    const commentaire = await prisma.commentaire.findUnique({
        where: { id },
    })
    res.json(commentaire)
});

router.delete('/:id', async(req, res) => {
    const id = +req.params.id
    const commentaire = await prisma.commentaire.delete({
        where: { id },
    })
    res.json(commentaire)
});
router.post('/', async(req, res) => {
    const { email, content } = req.body
    const result = await prisma.commentaire.create({
        data: {
            email,
            content
        },
    })
    res.send(result)
});
router.patch("/:id", async(req, res) => {
    var id = +req.params.id;
    const { email, content } = req.body;
    const commentaire = await prisma.commentaire.update({
        where: { id },
        data: {
            email,
            content
        },
    })
    res.send(commentaire)
});


module.exports = router;