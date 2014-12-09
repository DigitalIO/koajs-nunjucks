"use strict";
/**
 * Koa-Nunjucks middleware
 *
 * @module KoaNunjucks
 * @copyright (c) 2014 Faeson Inc.
 * @licence MIT
 */

// Modules
var nunjucks = require('nunjucks');
var Promise = require('promise');

/**
 * Koa Nunjucks Class
 *
 * @param {object} oCtx - Koa Context
 * @param {string} [sPath] - Path string
 * @param {object} [oOpts] - Options
 * @constructor
 */
function KoaNunjucks(oCtx, sPath, oOpts) {

    // Configure Nunjucks
    this.enviornment = nunjucks.configure(sPath, oOpts);

    // Save context
    this._ctx = oCtx;
}

/**
 * Render Nunjucks view
 *
 * @param {string} sName - Name of view file
 * @param {object} [oContext] - Context object
 *
 * @example yield this.render('home.html', { username: 'Bob' });
 */
KoaNunjucks.prototype.render = function *(sName, oContext) {
    this._ctx.body = yield new Promise(this._renderPromise.bind(this, sName, oContext));
};

/**
 * Render promise.
 * Simple wrapper for the render function.
 *
 * @param {string} sName - Name of view file
 * @param {object} oCtx - Context object
 * @param {function} fResolve - Promise resolve
 * @param {function} fReject - Promise reject
 */
KoaNunjucks.prototype._renderPromise = function (sName, oCtx, fResolve, fReject) {
    this.enviornment.render(sName, oCtx,
        function (err, res) {

            // Reject on errors
            if (err) {
                fReject(err);
            }

            // Resolve with result
            fResolve(res);
        }
    );
};

/**
 * Create a Koa middleware function.
 *
 * The middleware will inject a render function into the context.
 * It will also add the Nunjucks environment to the context.
 *
 * @param {string} [sPath] - Views path
 * @param {object} [oOpts] - Nunjucks options object
 * @returns {Function} Koa Middleware
 */
module.exports = function (sPath, oOpts) {
    return function *(next) {
        // Create new KoaNunjucks instance
        var Instance = new KoaNunjucks(this, sPath, oOpts);

        // Bind to context
        this.render = Instance.render.bind(Instance);

        // Bind the environment object to the context
        this.nunjucks = Instance.enviornment;

        // Yield next
        yield next;
    }
};