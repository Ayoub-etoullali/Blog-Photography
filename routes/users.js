var express = require('express');
var router = express.Router();

//const users = require('../data/users.json')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

/* GET users listing. */

router.get('/', async(req, res) => {
    const users = await prisma.user.findMany()
    res.json(users)
});

router.get('/:id', async(req, res) => {
    const id = +req.params.id
    const user = await prisma.user.findUnique({
        where: { id },
    })
    res.json(user)
});

router.delete('/:id', async(req, res) => {
    const id = +req.params.id
    const user = await prisma.user.delete({
        where: { id },
    })
    res.json(user)
});
router.post('/', async(req, res) => {
    const { email, name } = req.body
    const result = await prisma.user.create({
        data: {
            email,
            name,
        },
    })
    res.send(result)
});
router.patch("/:id", async(req, res) => {
    var id = +req.params.id;
    const { email, name, role } = req.body;
    const user = await prisma.user.update({
        where: { id },
        data: {
            email,
            name,
            role,
        },
    })
    res.send(user)
});


module.exports = router;