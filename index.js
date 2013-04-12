
/**
 * Flash
 * Flash messages.
 * 
 * @copyright 2013 David Rojas
 * @license MIT
 */

'use strict';

/*
 * Module dependencies
 */

var Core = require('core');

/*
 * Private
 */

/**
 * @method flash
 * @description 
 *   Flash a message.
 * 
 * @return {Flash} this for chaining
 * @api private
 */

var flash = function(data){
  var el = document.createElement('div');
  el.className = 'animated flash';
  upgrade(el, data, false, true, ' ');
  document.body && document.body.appendChild(el);
  return this;
};

/**
 * @method upgrade
 * @description 
 *   Upgrade a base object using a patch.
 * 
 * @api private
 */

var upgrade = function(base, patch, force, additive, stringGlue) {
  for (var prop in patch) {
    if (patch.hasOwnProperty(prop)) {
      if (! base.hasOwnProperty(prop) || force){
        base[prop] = patch[prop];
      }
      if (additive && ! force) {
        switch (typeof base[prop]) {
          case 'string':
            base[prop] += (stringGlue || '') + patch[prop];
            break;
          case 'number':
            base[prop] += + patch[prop];
            break;
        }
      }
    }
  }
};

/**
 * @constructor Flash
 */

var Flash = function() {};

/*
 * Inherit from Core
 */

Flash.prototype = new Core();
 
/**
 * @method onChangeStatus
 * @description 
 *   Switch on|off flash events.
 * 
 * @api public
 */

Flash.prototype.events.on('change status', function onChangeStatus(event) {
  if (event.target instanceof Flash) {
    switch (event.data.success) {
      case 'running':
        event.target.events.on('flash', flash);
        break;
      case 'stopped':
        event.target.events.off('flash', flash);
        break;
    }
  }
});

/*
 * Expose `Flash`
 */

module.exports = Flash;
