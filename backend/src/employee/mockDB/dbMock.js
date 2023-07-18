const db = require('./data.json')

const findFirst = (data) => {
    const employee = db.employees.find((e) => e.email === data.where.email);

    return employee;
}

const findMany = (data) => {
    const employee = db.employees.filter((e) =>
        e.emailDoGestor === data.where.AND[0].emailDoGestor
        && new Date(e.dataDeAdmissao) <= new Date(data.where.AND[1].dataDeAdmissao.lte)
        && (
            e.dataDeRecisao === null
            || new Date(e.dataDeRecisao) > new Date(data.where.AND[1].dataDeAdmissao.lte)
        )
    );

    return employee;
}

module.exports = { findFirst, findMany };