import { createRepository, findFirstUserRepository, getTerminationRepository } from './employee_repository.js';

export const findFirstUserService = async (email) => {
    const user = await findFirstUserRepository(email);

    return user;
}

const headcountAndTurnover = async (user, mes, ano, active='Active') => {
    const day = active === 'Active' ? '01' : '31'
    const employeeActive = await getTerminationRepository(user, `${ano}-${mes}-${day}`);
    
    if (employeeActive.length) {
        const employeeActiveAll = employeeActive.map(async(element) => await headcountAndTurnover(element, mes, ano, active))

        const resultEmployeeActiveAll = await Promise.all(employeeActiveAll)

        resultEmployeeActiveAll.forEach((element) => employeeActive.push(...element))
    }  

    return employeeActive
}

export const headcountService = async (data) => {
    const { user, ano } = data;
    
    const all = [];

    for (let i = 1; i <= 12; i += 1) {
        const employeeActive = await headcountAndTurnover(user, i, ano, 'Active')
        const employeeInactive = await headcountAndTurnover(user, i, ano, 'Inactive')

        const headcount = Math.round((employeeActive.length + employeeInactive.length) / 2);
        const turnover = parseFloat((employeeInactive.length / headcount).toFixed(4))

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