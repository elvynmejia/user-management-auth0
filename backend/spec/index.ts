require('dotenv').config({ path: './.env' });

import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../server';
import chaiAsPromised from 'chai-as-promised';

chai.use(chaiAsPromised);
chai.use(chaiHttp);

let request: any;

//
// beforeEach(() => {
//   request = chai.request(server);
// });
//
// afterEach(() => {
//   request.close();
// });

if (!request) {
  request = chai.request(server);
}

export default request;
