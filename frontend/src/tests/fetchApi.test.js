import { auth, getData } from '../services/fetchApi';
import { authMock, getDataMock } from './mocks/fetchApi.mock';
  
  describe('Test FetchApi Auth', () => {
    const EMAIL = 'teste@teste.com';
    const ANO = '2020';

    describe('Test fetchFindAll', () => {    
      it('Test fetchFindAll - OK', async () => {
        const EMAIL = 'teste@teste.com';

        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(authMock),
        });
    
        const result = await auth(EMAIL);

        expect(EMAIL).toStrictEqual(result.email);
      });
    });
  
    describe('Test FetchApi getDate', () => {  
      it('Test FetchApi - OK', async () => {
        jest.spyOn(global, 'fetch');
        global.fetch.mockResolvedValue({
          json: jest.fn().mockResolvedValue(getDataMock),
        });
    
        const result = await getData(EMAIL, ANO);

        expect(result).toStrictEqual(getDataMock);
      });
    });
  });