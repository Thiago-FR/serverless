import { PrismaClient } from '@prisma/client'

import fs from 'fs'

const prisma = new PrismaClient()

const convertDate = (date) => {
    const [d, m, a] = date.split('/');

    return [m, d, a].join('-');
}

const getRole = (role) => {
  const roleType = {
    "Diretor": 1,
    "Supervisor": 2,
    "Engenheiro": 3,
    'Designer': 4,
    "Analista": 5,
    "Estagiário": 6,
  }

  return roleType[role];
}

async function main() {
  await prisma.role.createMany({
      data: [
        { role: "Diretor" },
        { role: "Supervisor" },
        { role: "Engenheiro" },
        { role: "Designer" },
        { role: "Analista" },
        { role: "Estagiário" },
      ]
  });

  fs.readFile('./prisma/seed.csv', 'utf8', async (err, data) => {
      if (err) {
        console.error(err)
        return
      }
      const table = []
      for (const [index, row] of data.split('\n').entries()) {
          if (!index) continue;

          const column = row.split(',')
          const roleId = column[7][column[7].length -1] === '\r' ? getRole(column[7].slice(0, -1)) : getRole(column[7])

          table.push({
              status: column[1],
              nome: column[2],
              email: column[3],
              emailDoGestor: column[4],
              dataDeAdmissao: new Date(convertDate(column[5])),
              dataDeRecisao: column[6] ? new Date(convertDate(column[6])): null,
              roleId
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