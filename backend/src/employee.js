import { prismaClientDB } from "./db.js"

export const findAll = async (e) => {
    const result = await prismaClientDB.employee.findMany();

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
}

export const create = async (e) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        cargo
    } = JSON.parse(e.body);

    const result = await prismaClientDB.employee.create({
        data: {
            status,
            nome,
            email,
            emailDoGestor,
            dataDeAdmissao,
            cargo
        }
    });

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
}
