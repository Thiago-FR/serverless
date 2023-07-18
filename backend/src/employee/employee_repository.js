const findFirstUserRepository = async (db, email) => {
    const user = await db.findFirst({
        where: {
            email
        }
    });

    return user;
}

const getTerminationRepository = async (db, user, searchDate) => {
    return new Promise((resolve) => resolve(
        db.findMany({
            where: {
                AND: [
                    { emailDoGestor: user.email },
                    { dataDeAdmissao : { lte: new Date(searchDate) }},
                    { OR: [
                        { dataDeRecisao : { equals: null }},
                        { dataDeRecisao: { gt: new Date(searchDate)} }
                    ]}
                ]
            },
        })
    ));
}

const createRepository = async (db, data) => {
    const {
        status,
        nome,
        email,
        emailDoGestor,
        dataDeAdmissao,
        dataDeRecisao,
        cargo
    } =  data;

    const employee = await db.create({
        data: {
            status,
            nome,
            email,
            emailDoGestor,
            dataDeAdmissao,
            dataDeRecisao,
            cargo
        }
    });

    return employee;
}

module.exports = { findFirstUserRepository, getTerminationRepository, createRepository }