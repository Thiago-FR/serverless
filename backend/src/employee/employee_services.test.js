const service = require('./employee_service');
const db = require('./mockDB/dbMock')
const chai = require('chai');

const { expect } = chai;

describe('Test employee service', () => {
  it('Test findFirstUserService function', async () => {
    const EMAIL = 'test2@teste.com';

    const data = await service.findFirstUserService(db, EMAIL)

    expect(data).to.be.a('object');
    expect(data.email).equal(EMAIL);

    console.log(JSON.stringify(data));
  });

  it('Test headcountService function', async () => {
    const data = await service.headcountService(db, {
        user: { email: 'test2@teste.com' },
        ano: 2021
    })

    expect(data).to.be.a('object');
    expect(data).to.have.property('headcount')
    expect(data).to.have.property('turnover')

    const { headcount, turnover } = data;

    expect(headcount).to.be.a('object');
    expect(headcount).to.have.property('id')
    expect(headcount).to.have.property('color')
    expect(headcount).to.have.property('data')

    expect(turnover).to.be.a('object');
    expect(turnover).to.have.property('id')
    expect(turnover).to.have.property('color')
    expect(turnover).to.have.property('data')

    expect(headcount.data).to.be.a('array');
    expect(turnover.data).to.be.a('array');
  });  

  // it('', async () => {
  //   return wrapped.run({
  //     body: JSON.stringify({ email: 'daniellewinters@kpis.tech' })
  //   }).then((response) => {
  //     console.log("response", response);
  //     expect(response).to.not.be.empty;
  //     expect(response.body).to.not.be.empty;
  //     // expect(JSON.parse(response.body).result).to.be.eql(JSON.parse({ result: "OK" }));
  //   });
  // });
});
