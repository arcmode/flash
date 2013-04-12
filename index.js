
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
      var hasProperty = base.hasOwnProperty(prop);
      if (base[prop] instanceof Object) {
        for (var child in base[prop]) {
          upgrade(base[prop], patch[prop], force, additive, stringGlue);
          return;
        }
      } else{
        if (((force) || (! hasProperty)) && (! additive)) {
          base[prop] = patch[prop];
        }
        if ((! force) && additive && hasProperty) {
          base[prop] += (base[prop].constructor(stringGlue)) + patch[prop];
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
