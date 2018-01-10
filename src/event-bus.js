/**
 * @file Message broker implementation
 * @name event-bus.js
 * @author Fred GUILLAUME <guillaume.frederic@gmail.com>
 * @license MIT
 * @copyright 2018 Frédéric GUILLAUME
 */

'use strict';
const logger = require('../vendor/logger/index');

/**
 * @class EventBus
 */
class EventBus {

    /**
     * Initialise map object putting in relations actions (keys) and an array of
     * callbacks (handlers)
     */
    constructor() {
        this.handlers = {};
    }

    /**
     * Register a new callback to the defined action
     * @fun
     * @param  {string} action The action to be associated with the handler
     * @param  {function} handler The handler to register
     * @return {object}        Self-reference for object chaining
     */
    on(action, handler) {
        logger.debug('EventBus.on function');

        if (!this.handlers[action]) {
            this.handlers[action] = [ handler ];
        }
        else {
            this.handlers[action].push(handler);
        }
        return this;
    }

    /**
     * Trigger the callbacks associated with the actions passed in parameters
     * @param  {...string} params Mix of actions and parameters values. The
     * actions values must be positioned before the parameters ones.
     * @return {object}        Self-reference for object chaining
     */
    emit(...params) {
        logger.debug('EventBus.emit function');

        const result = this._splitEmitParams(params);
        if(result) {
            const [actions, args] = result;
            for (let action of actions) {
                this._emitSingleAction(action, ...args)
            }
        }
        return this;
    }

    /**
     * Trigger the callbacks associated with a single action
     * @private
     * @param  {string}    action The action to trigger
     * @param  {...string} params The params to pass to each callback
     * @return {object}           Self-reference for object chaining
     */
    _emitSingleAction(action, ...params) {
        logger.debug('EventBus._emitSingleAction function');

        let callbacks = this.handlers[action];

        if (callbacks !== undefined) {
            callbacks.map((handler) => {
                handler(...params);
            })
        }
        return this;
    }

    /**
     * Helper function that splits the mixed actions and parameters values.
     * The actions values must be positioned before the parameters ones.
     * @private
     * @param  {array} params Mixed actions and parameters values
     * @return {array} An array containing nested arrays actions and params
     */
    _splitEmitParams(params) {
        logger.debug('EventBus._splitEmitParams function');

        const actions = [];

        if (params) {

            // Iterate through first params while they are defined on the
            // handlers map object.
            // Assign them to an actions array
            while(params.length && this.handlers[params[0]]) {
                actions.push(params.shift());
            }

            // The 'params' array passed as a parameter does not contain anymore
            // actions, we can straightly pass it as the second nested array
            return [actions, params];
        }
        return null;
    }
}

module.exports = EventBus;
