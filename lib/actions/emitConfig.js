"use strict";
const { messages } = require('elasticio-node');

exports.process = processAction;

/**
 * Executes the action's logic by sending a request to the Petstore API and emitting response to the platform.
 * The function returns a Promise sending a request and resolving the response as platform message.
 *
 * @param msg incoming messages which is empty for triggers
 * @param cfg object to retrieve triggers configuration values, such as apiKey and pet status
 * @returns promise resolving a message to be emitted to the platform
 */
function processAction(msg, cfg) {

    // access the configuration data frome the field defined in credentials section of component.json
    const configData = cfg.configData;

    if (!configData) {
        throw new Error('Config data is required.');
    }

    console.log('About to emit config data as a body');

    this.emit('data', messages.newMessageWithBody(configData));
}
