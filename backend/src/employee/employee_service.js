import { createRepository, findFirstUserRepository, getTerminationRepository } from './employee_repository.js';

export const findFirstUserService = async (email) => {
    const user = await findFirstUserRepository(email);

    return user;
}

const headcount = async (user, mes, ano) => {
    const employeeActive = await getTerminationRepository(user, `${ano}-${mes}-01`);
    
    const employeeInactive = await getTerminationRepository(user, `${ano}-${mes}-31`);

    return Math.round((employeeActive + employeeInactive) / 2);    
}

export const headcountService = async (data) => {
    const { user, ano } = data;
    
    const all = [];

    for (let i = 1; i <= 12; i += 1) {
        all.push({
            mes: i,
            count: await headcount(user, i, ano)
        })
    }

    const result = await Promise.all(all);

    return result;  
}

export const createService = async (data) => {
    const employee = await createRepository(data);

    return employee;
}