import { createService, findFirstUserService, headcountService } from './employee_service.js'

export const login = async (e) => {
    const { email } = JSON.parse(e.body);

    const result = await findFirstUserService(email);

    return result ? {
        statusCode: 200,
        body: JSON.stringify(result)
    } : {
        statusCode: 401,
        body: JSON.stringify({ message: "Acesso não permitido" })
    };
}

export const headcountController = async (e) => {
    const { email, ano } = JSON.parse(e.body);

    const user = await findFirstUserService(email);

    if (!user) return {
        statusCode: 401,
        body: JSON.stringify({ message: "Acesso não permitido" })
    }

    const result = await headcountService({ user, ano });

    return {
        statusCode: 200,
        body: JSON.stringify({ result })
    };    
}

export const create = async (e) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        cargo
    } = JSON.parse(e.body);

    const result = await createService({
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
