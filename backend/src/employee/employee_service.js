const { createRepository, findFirstUserRepository, getTerminationRepository } = require( './employee_repository.js');
const { getRedis, setRedis } = require('../db/lib/chache.js')

const findFirstUserService = async (db, email) => {
    const user = await findFirstUserRepository(db, email);

    return user;
}

const headcountAndTurnover = async (db, user, month, year, active='Active') => {
    const day = active === 'Active' ? '01' : '31'    
    const employee = await getTerminationRepository(db, user, `${year}-${month}-${day}`);
    
    if (employee.length) {
        const employeeAll = employee.map(async(element) => await headcountAndTurnover(db, element, month, year, active));

        const resultEmployeeAll = await Promise.all(employeeAll);

        resultEmployeeAll.forEach((element) => employee.push(...element));
    }  

    return employee;
}

const headcountService = async (db, data) => {
    const { user, year } = data;
    
    const headcount = [];
    const turnover = [];

    const cacheKey = `user:${user.email}-${year}`;
    const cacheUser = await getRedis(cacheKey);

    if (cacheUser)
        return JSON.parse(cacheUser)

    for (let month = 1; month <= 12; month += 1) {
        const employeeActive = await headcountAndTurnover(db, user, month, year, 'Active');
        const employeeInactive = await headcountAndTurnover(db, user, month, year, 'Inactive');

        const headcountCount = Math.round((employeeActive.length + employeeInactive.length) / 2);
        const turnoverCount = parseFloat((employeeInactive.length / headcountCount).toFixed(4));

        const date = new Date(year, month - 1, 1)
        const monthText = date.toLocaleString('default', { month: 'long' });

        headcount.push({
            x: monthText,
            y: headcountCount,
        });

        turnover.push({
            x: monthText,
            y: turnoverCount,
        });
    }

    await Promise.all(headcount);

    const res = {
        headcount: {
            id: year,
            color: "hsl(291, 70%, 50%)",
            data: headcount
        },
        turnover: {
            id: year,
            color: "hsl(291, 70%, 50%)",
            data: turnover
        }
    }

    await setRedis(cacheKey, JSON.stringify(res))

    console.timeEnd()

    return res;
}

const createService = async (db, data) => {
    const employee = await createRepository(db, data);

    return employee;
}

module.exports = { findFirstUserService, headcountService, createService }