const { createRepository, findFirstUserRepository, getTerminationRepository } = require( './employee_repository.js');

const findFirstUserService = async (db, email) => {
    const user = await findFirstUserRepository(db, email);

    return user;
}

const headcountAndTurnover = async (db, user, mes, ano, active='Active') => {
    const day = active === 'Active' ? '01' : '31'    
    const employee = await getTerminationRepository(db, user, `${ano}-${mes}-${day}`);
    
    if (employee.length) {
        const employeeAll = employee.map(async(element) => await headcountAndTurnover(db, element, mes, ano, active));

        const resultEmployeeAll = await Promise.all(employeeAll);

        resultEmployeeAll.forEach((element) => employee.push(...element));
    }  

    return employee;
}

const headcountService = async (db, data) => {
    const { user, ano } = data;
    
    const headcount = [];
    const turnover = [];

    for (let mes = 1; mes <= 12; mes += 1) {
        const employeeActive = await headcountAndTurnover(db, user, mes, ano, 'Active');
        const employeeInactive = await headcountAndTurnover(db, user, mes, ano, 'Inactive');

        const headcountCount = Math.round((employeeActive.length + employeeInactive.length) / 2);
        const turnoverCount = parseFloat((employeeInactive.length / headcountCount).toFixed(4));

        const date = new Date(ano, mes - 1, 1)
        const month = date.toLocaleString('default', { month: 'long' });

        headcount.push({
            x: month,
            y: headcountCount,
        });

        turnover.push({
            x: month,
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

const createService = async (db, data) => {
    const employee = await createRepository(db, data);

    return employee;
}

module.exports = { findFirstUserService, headcountService, createService }