const { prismaClientDB } = require('../db/db.js');
const { createService, findFirstUserService, headcountService } = require('./employee_service.js');

const login = async (e) => {
    const { email } = JSON.parse(e.body);

    const result = await findFirstUserService(prismaClientDB.employee, email);

    return result ? {
        statusCode: 200,
        body: JSON.stringify(result)
    } : {
        statusCode: 401,
        body: JSON.stringify({ message: "Acesso não permitido" })
    };
}

const headcountController = async (e) => {
    const { email, year } = JSON.parse(e.body);

    const user = await findFirstUserService(prismaClientDB.employee, email);

    if (!user) return {
        statusCode: 401,
        body: JSON.stringify({ message: "Acesso não permitido" })
    }

    const result = await headcountService(prismaClientDB.employee, { user, year });

    return {
        statusCode: 200,
        body: JSON.stringify({ result })
    };    
}

const create = async (e) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        cargo
    } = JSON.parse(e.body);

    const result = await createService(prismaClientDB.employee, {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        cargo
    })

    return {
        statusCode: 200,
        body: JSON.stringify(result)
    };
}

module.exports = { login, create, headcountController }
