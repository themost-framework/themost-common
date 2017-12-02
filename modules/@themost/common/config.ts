/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import * as _ from "lodash";
import "source-map-support/register";
import * as Symbol from "symbol";
import {AbstractClassError} from "./errors";
import {Args, PathUtils, TraceUtils} from "./utils";

const configProperty = Symbol("config");
const currentConfiguration = Symbol("current");
const configPathProperty = Symbol("configurationPath");
const executionPathProperty = Symbol("executionPath");
const strategiesProperty = Symbol("strategies");

/**
 * @class
 */
export class ConfigurationBase {
    /**
     * Gets the current configuration
     * @returns ConfigurationBase - An instance of DataConfiguration class which represents the current data configuration
     */
    public static getCurrent(): ConfigurationBase {
        if (_.isNil(ConfigurationBase[currentConfiguration])) {
            ConfigurationBase[currentConfiguration] = new ConfigurationBase();
        }
        return ConfigurationBase[currentConfiguration];
    }
    /**
     * Sets the current configuration
     * @param {ConfigurationBase} configuration
     * @returns ConfigurationBase - An instance of ApplicationConfiguration class which represents the current configuration
     */
    public static setCurrent(configuration: ConfigurationBase) {
        if (configuration instanceof ConfigurationBase) {
            if (!configuration.hasStrategy(ModuleLoaderStrategy)) {
                configuration.useStrategy(ModuleLoaderStrategy, DefaultModuleLoaderStrategy);
            }
            ConfigurationBase[currentConfiguration] = configuration;
            return ConfigurationBase[currentConfiguration];
        }
        throw new TypeError("Invalid argument. Expected an instance of DataConfiguration class.");
    }
    /**
     * @constructor
     * @param {string=} configPath
     */
    constructor(configPath?: string) {

        //init strategies
        this[strategiesProperty] = { };

        this[configPathProperty] = configPath || PathUtils.join(process.cwd(),"config");
        TraceUtils.debug("Initializing configuration under %s.", this[configPathProperty]);

        this[executionPathProperty] = PathUtils.join(this[configPathProperty],"..");
        TraceUtils.debug("Setting execution path under %s.", this[executionPathProperty]);

        //load default module loader strategy
        this.useStrategy(ModuleLoaderStrategy, DefaultModuleLoaderStrategy);

        //get configuration source
        let configSourcePath;
        try {
            let env = "production";
            //node.js mode
            if (typeof process !== "undefined" && process.env) {
                env = process.env.NODE_ENV || "production";
            } else if (typeof window !== "undefined" && window.hasOwnProperty("env")) {
                /* tslint:disable:no-string-literal */
                env = window["env"].BROWSER_ENV || "production";
                /* tslint:enable:no-string-literal */
            }
            configSourcePath = PathUtils.join(this[configPathProperty], "app." + env + ".json");
            TraceUtils.debug("Validating environment configuration source on %s.", configSourcePath);
            this[configProperty] = require(configSourcePath);
        } catch (err) {
            if (err.code === "MODULE_NOT_FOUND") {
                TraceUtils.log("The environment specific configuration cannot be found or is inaccesible.");
                try {
                    configSourcePath = PathUtils.join(this[configPathProperty], "app.json");
                    TraceUtils.debug("Validating application configuration source on %s.", configSourcePath);
                    this[configProperty] = require(configSourcePath);
                } catch(err) {
                    if (err.code === "MODULE_NOT_FOUND") {
                        TraceUtils.log("The default application configuration cannot be found or is inaccesible.");
                    } else {
                        TraceUtils.error("An error occured while trying to open default application configuration.");
                        TraceUtils.error(err);
                    }
                    TraceUtils.debug("Initializing empty configuration");
                    this[configProperty] = { };
                }
            } else {
                TraceUtils.error("An error occured while trying to open application configuration.");
                TraceUtils.error(err);
                //load default configuration
                this[configProperty] = { };
            }
        }
        //initialize settings object
        this[configProperty].settings = this[configProperty].settings || { };
    }
    /**
     * Register a configuration strategy
     * @param {Function|*} configStrategyCtor
     * @param {Function|*} strategyCtor
     * @returns ConfigurationBase
     */
    public useStrategy(configStrategyCtor: any, strategyCtor: any) {
        Args.notFunction(configStrategyCtor,"Configuration strategy constructor");
        Args.notFunction(strategyCtor,"Strategy constructor");
        this[strategiesProperty][`${configStrategyCtor.name}`] = new strategyCtor(this);
        return this;
    }

    /**
     * Gets a configuration strategy
     * @param {Function|*} configStrategyCtor
     * @returns {ConfigurationStrategy|*}
     */
    public getStrategy(configStrategyCtor: any): any {
        Args.notFunction(configStrategyCtor,"Configuration strategy constructor");
        return this[strategiesProperty][`${configStrategyCtor.name}`];
    }

    /**
     * Gets a configuration strategy
     * @param {Function} configStrategyCtor
     */
    public hasStrategy(configStrategyCtor) {
        Args.notFunction(configStrategyCtor,"Configuration strategy constructor");
        return typeof this[strategiesProperty][`${configStrategyCtor.name}`] !== "undefined";
    }

    get settings(): any {
        return this.getSourceAt("settings");
    }

    /**
     * Returns the configuration source object
     * @returns {*}
     */
    public getSource(): any {
        return this[configProperty];
    }

    /**
     * Returns the source configuration object based on the given path (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @returns {Object|Array}
     */
    public getSourceAt(p: string): any {
        return _.at(this[configProperty],p.replace(/\//,"."))[0];
    }

    /**
     * Returns a boolean which indicates whether the specified  object path exists or not (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @returns {boolean}
     */
    public hasSourceAt(p: string): boolean {
        return _.isObject(_.at(this[configProperty],p.replace(/\//,"."))[0]);
    }

    /**
     * Sets the config value to the specified object path (e.g. settings.auth.cookieName or settings/auth/cookieName)
     * @param {string} p - A string which represents an object path
     * @param {*} value
     * @returns {Object}
     */
    public setSourceAt(p, value): any {
        return _.set(this[configProperty], p, value);
    }

    /**
     * Sets the current execution path
     * @param {string} p
     */
    public setExecutionPath(p: string): ConfigurationBase {
        this[executionPathProperty] = p;
        return this;
    }

    /**
     * Gets the current execution path
     * @returns {string}
     */
    public getExecutionPath(): string {
        return this[executionPathProperty];
    }

    /**
     * Gets the current configuration path
     * @returns {string}
     */
    public getConfigurationPath(): string {
        return this[configPathProperty];
    }
}

/**
 * @class
 */
export class ConfigurationStrategy {
    /**
     * @constructor
     * @param {ConfigurationBase} config
     */
    constructor(config: ConfigurationBase) {
        Args.check(new.target !== ConfigurationStrategy, new AbstractClassError());
        Args.notNull(config, "Configuration");
        this[configProperty] = config;

    }

    /**
     * @returns {ConfigurationBase}
     */
    public getConfiguration(): ConfigurationBase {
        return this[configProperty];
    }

}

export class ModuleLoaderStrategy extends ConfigurationStrategy {
    /**
     *
     * @param {ConfigurationBase} config
     */
    constructor(config: ConfigurationBase) {
        super(config);
    }

    /**
     * @param {string} modulePath
     * @returns {*}
     */
    public require(modulePath): any {
        Args.notEmpty(modulePath,"Module Path");
        if (!/^.\//i.test(modulePath)) {
            //load module which is not starting with ./
            return require(modulePath);
        }
        return require(PathUtils.join(this.getConfiguration().getExecutionPath(),modulePath));
    }

}

export class DefaultModuleLoaderStrategy extends ModuleLoaderStrategy {
    /**
     *
     * @param {ConfigurationBase} config
     */
    constructor(config) {
        super(config);
    }
}
