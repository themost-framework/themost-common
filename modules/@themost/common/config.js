"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
var _ = require("lodash");
require("source-map-support/register");
var Symbol = require("symbol");
var errors_1 = require("./errors");
var utils_1 = require("./utils");
var configProperty = Symbol("config");
var currentConfiguration = Symbol("current");
var configPathProperty = Symbol("configurationPath");
var executionPathProperty = Symbol("executionPath");
var strategiesProperty = Symbol("strategies");
/**
 * @class
 */
var ConfigurationBase = /** @class */ (function () {
    /**
     * @constructor
     * @param {string=} configPath
     */
    function ConfigurationBase(configPath) {
        //init strategies
        this[strategiesProperty] = {};
        this[configPathProperty] = configPath || utils_1.PathUtils.join(process.cwd(), "config");
        utils_1.TraceUtils.debug("Initializing configuration under %s.", this[configPathProperty]);
        this[executionPathProperty] = utils_1.PathUtils.join(this[configPathProperty], "..");
        utils_1.TraceUtils.debug("Setting execution path under %s.", this[executionPathProperty]);
        //load default module loader strategy
        this.useStrategy(ModuleLoaderStrategy, DefaultModuleLoaderStrategy);
        //get configuration source
        var configSourcePath;
        try {
            var env = "production";
            //node.js mode
            if (typeof process !== "undefined" && process.env) {
                env = process.env.NODE_ENV || "production";
            }
            else if (typeof window !== "undefined" && window.hasOwnProperty("env")) {
                /* tslint:disable:no-string-literal */
                env = window["env"].BROWSER_ENV || "production";
                /* tslint:enable:no-string-literal */
            }
            configSourcePath = utils_1.PathUtils.join(this[configPathProperty], "app." + env + ".json");
            utils_1.TraceUtils.debug("Validating environment configuration source on %s.", configSourcePath);
            this[configProperty] = require(configSourcePath);
        }
        catch (err) {
            if (err.code === "MODULE_NOT_FOUND") {
                utils_1.TraceUtils.log("The environment specific configuration cannot be found or is inaccesible.");
                try {
                    configSourcePath = utils_1.PathUtils.join(this[configPathProperty], "app.json");
                    utils_1.TraceUtils.debug("Validating application configuration source on %s.", configSourcePath);
                    this[configProperty] = require(configSourcePath);
                }
                catch (err) {
                    if (err.code === "MODULE_NOT_FOUND") {
                        utils_1.TraceUtils.log("The default application configuration cannot be found or is inaccesible.");
                    }
                    else {
                        utils_1.TraceUtils.error("An error occured while trying to open default application configuration.");
                        utils_1.TraceUtils.error(err);
                    }
                    utils_1.TraceUtils.debug("Initializing empty configuration");
                    this[configProperty] = {};
                }
            }
            else {
                utils_1.TraceUtils.error("An error occured while trying to open application configuration.");
                utils_1.TraceUtils.error(err);
                //load default configuration
                this[configProperty] = {};
            }
        }
        //initialize settings object
        this[configProperty].settings = this[configProperty].settings || {};
    }
    /**
     * Gets the current configuration
     * @returns ConfigurationBase - An instance of DataConfiguration class which represents the current data configuration
     */
    ConfigurationBase.getCurrent = function () {
        if (_.isNil(ConfigurationBase[currentConfiguration])) {
            ConfigurationBase[currentConfiguration] = new ConfigurationBase();
        }
        return ConfigurationBase[currentConfiguration];
    };
    /**
     * Sets the current configuration
     * @param {ConfigurationBase} configuration
     * @returns ConfigurationBase - An instance of ApplicationConfiguration class which represents the current configuration
     */
    ConfigurationBase.setCurrent = function (configuration) {
        if (configuration instanceof ConfigurationBase) {
            if (!configuration.hasStrategy(ModuleLoaderStrategy)) {
                configuration.useStrategy(ModuleLoaderStrategy, DefaultModuleLoaderStrategy);
            }
            ConfigurationBase[currentConfiguration] = configuration;
            return ConfigurationBase[currentConfiguration];
        }
        throw new TypeError("Invalid argument. Expected an instance of DataConfiguration class.");
    };
    /**
     * Register a configuration strategy
     * @param {Function|*} configStrategyCtor
     * @param {Function|*} strategyCtor
     * @returns ConfigurationBase
     */
    ConfigurationBase.prototype.useStrategy = function (configStrategyCtor, strategyCtor) {
        utils_1.Args.notFunction(configStrategyCtor, "Configuration strategy constructor");
        utils_1.Args.notFunction(strategyCtor, "Strategy constructor");
        this[strategiesProperty]["" + configStrategyCtor.name] = new strategyCtor(this);
        return this;
    };
    /**
     * Gets a configuration strategy
     * @param {Function|*} configStrategyCtor
     * @returns {ConfigurationStrategy|*}
     */
    ConfigurationBase.prototype.getStrategy = function (configStrategyCtor) {
        utils_1.Args.notFunction(configStrategyCtor, "Configuration strategy constructor");
        return this[strategiesProperty]["" + configStrategyCtor.name];
    };
    /**
     * Gets a configuration strategy
     * @param {Function} configStrategyCtor
     */
    ConfigurationBase.prototype.hasStrategy = function (configStrategyCtor) {
        utils_1.Args.notFunction(configStrategyCtor, "Configuration strategy constructor");
        return typeof this[strategiesProperty]["" + configStrategyCtor.name] !== "undefined";
    };
    Object.defineProperty(ConfigurationBase.prototype, "settings", {
        get: function () {
            return this.getSourceAt("settings");
        },
        enumerable: true,
        configurable: true
    });
    /**
     * Returns the configuration source object
     * @returns {*}
     */
    ConfigurationBase.prototype.getSource = function () {
        return this[configProperty];
    };
    /**
     * Returns the source configuration object based on the given path (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @returns {Object|Array}
     */
    ConfigurationBase.prototype.getSourceAt = function (p) {
        return _.at(this[configProperty], p.replace(/\//, "."))[0];
    };
    /**
     * Returns a boolean which indicates whether the specified  object path exists or not (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @returns {boolean}
     */
    ConfigurationBase.prototype.hasSourceAt = function (p) {
        return _.isObject(_.at(this[configProperty], p.replace(/\//, "."))[0]);
    };
    /**
     * Sets the config value to the specified object path (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @param {*} value
     * @returns {Object}
     */
    ConfigurationBase.prototype.setSourceAt = function (p, value) {
        return _.set(this[configProperty], p, value);
    };
    /**
     * Sets the current execution path
     * @param {string} p
     */
    ConfigurationBase.prototype.setExecutionPath = function (p) {
        this[executionPathProperty] = p;
        return this;
    };
    /**
     * Gets the current execution path
     * @returns {string}
     */
    ConfigurationBase.prototype.getExecutionPath = function () {
        return this[executionPathProperty];
    };
    /**
     * Gets the current configuration path
     * @returns {string}
     */
    ConfigurationBase.prototype.getConfigurationPath = function () {
        return this[configPathProperty];
    };
    return ConfigurationBase;
}());
exports.ConfigurationBase = ConfigurationBase;
/**
 * @class
 */
var ConfigurationStrategy = /** @class */ (function () {
    /**
     * @constructor
     * @param {ConfigurationBase} config
     */
    function ConfigurationStrategy(config) {
        var _newTarget = this.constructor;
        utils_1.Args.check(_newTarget !== ConfigurationStrategy, new errors_1.AbstractClassError());
        utils_1.Args.notNull(config, "Configuration");
        this[configProperty] = config;
    }
    /**
     * @returns {ConfigurationBase}
     */
    ConfigurationStrategy.prototype.getConfiguration = function () {
        return this[configProperty];
    };
    return ConfigurationStrategy;
}());
exports.ConfigurationStrategy = ConfigurationStrategy;
var ModuleLoaderStrategy = /** @class */ (function (_super) {
    __extends(ModuleLoaderStrategy, _super);
    /**
     *
     * @param {ConfigurationBase} config
     */
    function ModuleLoaderStrategy(config) {
        return _super.call(this, config) || this;
    }
    /**
     * @param {string} modulePath
     * @returns {*}
     */
    ModuleLoaderStrategy.prototype.require = function (modulePath) {
        utils_1.Args.notEmpty(modulePath, "Module Path");
        if (!/^.\//i.test(modulePath)) {
            //load module which is not starting with ./
            return require(modulePath);
        }
        return require(utils_1.PathUtils.join(this.getConfiguration().getExecutionPath(), modulePath));
    };
    return ModuleLoaderStrategy;
}(ConfigurationStrategy));
exports.ModuleLoaderStrategy = ModuleLoaderStrategy;
var DefaultModuleLoaderStrategy = /** @class */ (function (_super) {
    __extends(DefaultModuleLoaderStrategy, _super);
    /**
     *
     * @param {ConfigurationBase} config
     */
    function DefaultModuleLoaderStrategy(config) {
        return _super.call(this, config) || this;
    }
    return DefaultModuleLoaderStrategy;
}(ModuleLoaderStrategy));
exports.DefaultModuleLoaderStrategy = DefaultModuleLoaderStrategy;
//# sourceMappingURL=config.js.map