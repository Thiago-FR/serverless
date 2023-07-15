import { prismaClientDB } from '../db/db.js'

export const findFirstUserRepository = async (email) => {
    const user = await prismaClientDB.employee.findFirst({
        where: {
            email
        }
    });

    return user;
}

export const getTerminationRepository = async (user, dataDeRecisao) => {
    return new Promise((resolve) => resolve(
        prismaClientDB.employee.findMany({
            where: {
                AND: [
                    { emailDoGestor: user.email },
                    { dataDeAdmissao : { lte: new Date(dataDeRecisao) }},
                    { OR: [
                        { dataDeRecisao : { equals: null }},
                        { dataDeRecisao: { gt: new Date(dataDeRecisao)} }
                    ]}
                ]
            },
        })
    ));
}

export const createRepository = async (data) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        cargo
    } =  data;

    const employee = await prismaClientDB.employee.create({
        data: {
            status,
            nome,
            email,
            emailDoGestor,
            dataDeAdmissao,
            dataDeRecisao,
            cargo
        }
    });

    return employee;
}