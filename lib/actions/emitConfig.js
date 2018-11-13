const {messages} = require('elasticio-node');

exports.process = processAction;

/**
 * Executes the action's logic by specifying configuration data as a credential object and emitting it as a message.
 */
function processAction(msg, cfg) {

  // Access the configuration data from the field defined in credentials section of component.json
  const configData = cfg.configData;
  const jsonConfigData = JSON.parse(configData);

  if (!configData) {
    throw new Error('Config data is required.');
  }

  console.log('About to emit config data as a body');
  this.emit('data', messages.newMessageWithBody(jsonConfigData));
}
