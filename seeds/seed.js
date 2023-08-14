const { faker } = require('@faker-js/faker')

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const users = Array.from({ lenget: 10 }).map(() => ({
        nome: faker.lorem.firstName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: "AUTHOR"
    }))
   
    const categories = Array.from({ length: 4 }).map(() => ({
        nome: faker.name.jobArea()
    }))

const commentaires = Array.from({ lenget: 20 }).map(() => ({
    email: faker.internet.email(),
    content: faker.lorem.paragraph()
}))
const articles = Array.from({ lenget: 100 }).map(() => ({
    titre: faker.lorem.lines(),
    contenu: faker.lorem.paragraph(),
    image: faker.image.Abstract(),
    published: faker.datatype.boolean()
})) 
async function main() {
    await prisma.user.deleteMany();
    await prisma.article.deleteMany();
    await prisma.commentaire.deleteMany();
    await prisma.categorie.deleteMany();

    await prisma.user.create()
    };

async function main() {
    await prisma.user.deleteMany();
    await prisma.article.deleteMany();
    await prisma.commentaire.deleteMany();
    await prisma.categorie.deleteMany();

    await prisma.user.create({
        data: {

            email: faker.internet.email(),
            name: faker.name.firstName(),
            password: faker.internet.password(),
            role: "ADMIN",
        },
    });
    for (let i = 0; i < 10; i++) {
        await prisma.user.create({
            data: {

                email: faker.internet.email(),
                name: faker.name.firstName(),
                password: faker.internet.password(),
                role: "AUTHOR",
            },
        });
    }
    for (let i = 0; i < 100; i++) {
        await prisma.article.create({
            data: {
                titre: faker.lorem.lines(),
                contenu: faker.lorem.paragraph(),
                image: faker.image.imageUrl(),
                published: faker.datatype.boolean()
            },
        });
    }
    for (let i = 0; i < 10; i++) {
        await prisma.categorie.create({
            data: {
                name: faker.name.jobArea()
            },
        });
    }
}
main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async() => {
        await prisma.$disconnect();
    });