import { createRepository, findFirstUserRepository, getTerminationRepository } from './employee_repository.js';

export const findFirstUserService = async (email) => {
    const user = await findFirstUserRepository(email);

    return user;
}

const headcountAndTurnover = async (user, mes, ano) => {
    const employeeActive = await getTerminationRepository(user, `${ano}-${mes}-01`);
    
    const employeeInactive = await getTerminationRepository(user, `${ano}-${mes}-31`);

    const headcount = Math.round((employeeActive + employeeInactive) / 2);

    return {
        headcount,
        turnover: parseFloat((employeeInactive / headcount).toFixed(4))
    };    
}

export const headcountService = async (data) => {
    const { user, ano } = data;
    
    const all = [];

    for (let i = 1; i <= 12; i += 1) {
        const { headcount, turnover } = await headcountAndTurnover(user, i, ano);

        all.push({
            mes: i,
            headcount,
            turnover
        })
    }

    const result = await Promise.all(all);

    return result;  
}

export const createService = async (data) => {
    const employee = await createRepository(data);

    return employee;
}