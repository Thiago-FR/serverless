import { createRepository, findFirstUserRepository, getTerminationRepository } from './employee_repository.js';

export const findFirstUserService = async (email) => {
    const user = await findFirstUserRepository(email);

    return user;
}

const headcountAndTurnover = async (user, mes, ano, active='Active') => {
    const day = active === 'Active' ? '01' : '31'
    const employee = await getTerminationRepository(user, `${ano}-${mes}-${day}`);
    
    if (employee.length) {
        const employeeAll = employee.map(async(element) => await headcountAndTurnover(element, mes, ano, active));

        const resultEmployeeAll = await Promise.all(employeeAll);

        resultEmployeeAll.forEach((element) => employee.push(...element));
    }  

    return employee;
}

export const headcountService = async (data) => {
    const { user, ano } = data;
    
    const headcount = [];
    const turnover = [];

    for (let i = 1; i <= 12; i += 1) {
        const employeeActive = await headcountAndTurnover(user, i, ano, 'Active');
        const employeeInactive = await headcountAndTurnover(user, i, ano, 'Inactive');

        const headcountCount = Math.round((employeeActive.length + employeeInactive.length) / 2);
        const turnoverCount = parseFloat((employeeInactive.length / headcountCount).toFixed(4));

        headcount.push({
            x: i,
            y: headcountCount,
        });

        turnover.push({
            x: i,
            y: turnoverCount,
        });
    }

    await Promise.all(headcount);

    return {
        headcount: {
            id: ano,
            color: "hsl(291, 70%, 50%)",
            data: headcount
        },
        turnover: {
            id: ano,
            color: "hsl(291, 70%, 50%)",
            data: turnover
        }
    };
}

export const createService = async (data) => {
    const employee = await createRepository(data);

    return employee;
}