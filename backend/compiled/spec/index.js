"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require('dotenv').config({ path: './.env' });
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const server_1 = __importDefault(require("../server"));
const chai_as_promised_1 = __importDefault(require("chai-as-promised"));
chai_1.default.use(chai_as_promised_1.default);
chai_1.default.use(chai_http_1.default);
let request;
//
// beforeEach(() => {
//   request = chai.request(server);
// });
//
// afterEach(() => {
//   request.close();
// });
if (!request) {
    request = chai_1.default.request(server_1.default);
}
exports.default = request;
