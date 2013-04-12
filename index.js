
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

var Emitter = require('emitter');

/*
 * Utils
 */

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

var Flash = function() {
  this.events = new Emitter();
};

/**
 * @method init
 * @description 
 *   Adopt events from parent and listen flash events.
 * 
 * @return {Flash} this for chaining
 * @api public
 */

Flash.prototype.init = function(core){
  this.joinEvents(core);
  this.listenFlash();
  return this;
};

/**
 * @method joinEvents
 * @description 
 *   Adopt events from parent.
 * 
 * @return {Flash} this for chaining
 * @api public
 */
Flash.prototype.joinEvents = function(obj) {
  if (obj.hasOwnProperty('events')) {
    this.events = obj.events;
  }
  return this;
};

/**
 * @method listenFlash
 * @description 
 *   Listen flash events.
 * 
 * @return {Flash} this for chaining
 * @api public
 */
Flash.prototype.listenFlash = function() {
  this.events.on('flash', flash);
  return this;
};

/**
 * @method flash
 * @description 
 *   Flash a message.
 * 
 * @return {Flash} this for chaining
 * @api public
 */

Flash.prototype.flash = function(data){
  var el = document.createElement('div');
  el.className = 'animated flash';
  upgrade(el, data, false, true, ' ');
  document.body && document.body.appendChild(el);
  return this;
};

/*
 * Expose `Flash`
 */

module.exports = Flash;
