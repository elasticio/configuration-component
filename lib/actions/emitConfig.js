/**
 * Executes the action's logic by specifying configuration data as a credential object and emitting it as a message.
 */
exports.process = async function process(msg, cfg) {

  // Access the configuration data from the field defined in credentials section of component.json
  const configData = cfg.configData;
  const jsonConfigData = JSON.parse(configData);

  if (!configData) {
    throw new Error('Config data is required');
  }

  const message = messages.newMessageWithBody(jsonConfigData);
  this.logger.info('Successfully emitted data as a body');
  await this.emit('data', message);
}
