/* eslint-disable global-require */

const fs = require('fs');
const chai = require('chai');
const sinon = require('sinon');
const logger = require('@elastic.io/component-logger')();

const {expect} = chai;
const {messages} = require('elasticio-node');
const emitConfig = require('../lib/actions/emitConfig');

describe('emitConfig', () => {
  let inputConfigDataMessage;
  let lastCall;
  let configuration;

  beforeEach(async () => {
    lastCall.reset();
  });

  after(async () => {
    messages.newMessageWithBody.restore();
  });

  before(async () => {

    inputConfigDataMessage = await fs.readFileSync('./spec/sample/input.json', 'utf8');

    lastCall = sinon.stub(messages, 'newMessageWithBody')
      .returns(Promise.resolve());

    configuration = {
      configData: inputConfigDataMessage
    };
  });

  const emitter = {
    emit: sinon.spy(),
  };

  it('emitConfig ', async () => {
    const inputConfigDataMessageJson = JSON.parse(inputConfigDataMessage);
    await emitConfig.process.call({ emit: emitter.emit, logger }, inputConfigDataMessageJson, configuration, {});

    expect(JSON.stringify(lastCall.lastCall.args[0]))
      .to
      .eql(
        '{"Account":{"Account Name":"Firefly","Order":[{"OrderID":"order103","Product":[{"Product Name":"Bowler Hat","ProductID":858383,"SKU":"0406654608","Description":{"Colour":"Purple","Width":300,"Height":200,"Depth":210,"Weight":0.75},"Price":34.45,"Quantity":2},{"Product Name":"Trilby hat","ProductID":858236,"SKU":"0406634348","Description":{"Colour":"Orange","Width":300,"Height":200,"Depth":210,"Weight":0.6},"Price":21.67,"Quantity":1}]},{"OrderID":"order104","Product":[{"Product Name":"Bowler Hat","ProductID":858383,"SKU":"040657863","Description":{"Colour":"Purple","Width":300,"Height":200,"Depth":210,"Weight":0.75},"Price":34.45,"Quantity":4},{"ProductID":345664,"SKU":"0406654603","Product Name":"Cloak","Description":{"Colour":"Black","Width":30,"Height":20,"Depth":210,"Weight":2},"Price":107.99,"Quantity":1}]}]}}',
      );
  });
});
