import { prismaClientDB } from '../db/db.js'

export const findFirstUserRepository = async (email) => {
    const user = await prismaClientDB.employee.findFirst({
        where: {
            email
        },
        include: {
            role: true
        }
    });

    return user;
}

export const getTerminationRepository = async (user, dataDeRecisao) => {
    const employee = await prismaClientDB.employee.count({
        where: {
            OR: [
                { emailDoGestor: user.email },
                { roleId: { gt: user.roleId }},
            ],
            AND: [
                { dataDeAdmissao : { lte: new Date(dataDeRecisao) }},
                { OR: [
                    { dataDeRecisao : { equals: null }},
                    { dataDeRecisao: { gt: new Date(dataDeRecisao)} }
                ]}
            ]
        },
    });

    return employee;
}

export const createRepository = async (data) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        roleId
    } =  data;

    const employee = await prismaClientDB.employee.create({
        data: {
            status,
            nome,
            email,
            emailDoGestor,
            dataDeAdmissao,
            dataDeRecisao,
            roleId
        }
    });

    return employee;
}