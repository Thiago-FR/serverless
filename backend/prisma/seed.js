const { PrismaClient } = require('@prisma/client');

const fs =require('fs');

const prisma = new PrismaClient();

const convertDate = (date) => {
    const [d, m, a] = date.split('/');

    return [m, d, a].join('-');
}

async function main() {
  fs.readFile('./prisma/seed.csv', 'utf8', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const table = []
      for (const [index, row] of data.split('\n').entries()) {
          if (!index) continue;

          const column = row.split(',')

          table.push({
              status: column[1],
              nome: column[2],
              email: column[3],
              emailDoGestor: column[4],
              dataDeAdmissao: new Date(convertDate(column[5])),
              dataDeRecisao: column[6] ? new Date(convertDate(column[6])): null,
              cargo: column[7]
          })
      }

      await prisma.employee.createMany({
          data: table
      })
    })    
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })