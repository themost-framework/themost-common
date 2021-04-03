import {ConfigurationBase} from './config';

export declare abstract class IApplication {
    /**
     * Registers an application strategy e.g. an singleton service which to be used in application context
     * @param {Function} serviceCtor
     * @param {Function} strategyCtor
     * @returns IApplication
     */
    abstract useStrategy(serviceCtor: void, strategyCtor: void): this;
    /**
     * @param {Function} serviceCtor
     * @returns {boolean}
     */
    abstract hasStrategy(serviceCtor: void): boolean;

    /**
     * @param serviceCtor
     */
    abstract getStrategy<T>(serviceCtor: new() => T): T;

    /**
     * Gets the configuration of this application
     * @returns {ConfigurationBase}
     */
    abstract getConfiguration(): ConfigurationBase;
}

export declare abstract class IApplicationService {
    /**
     * Gets the application of this service
     * @returns {ApplicationBase}
     */
    abstract getApplication(): ApplicationBase;
}


// tslint:disable-next-line:ban-types
export declare type ApplicationServiceConstructor<T> = Function & { prototype: T };

export declare interface ApplicationBase {

    readonly configuration: ConfigurationBase;

    useStrategy(serviceCtor: ApplicationServiceConstructor<any>, strategyCtor: ApplicationServiceConstructor<any>): this;

    useService(serviceCtor: ApplicationServiceConstructor<any>): this;

    hasService<T>(serviceCtor: ApplicationServiceConstructor<T>): boolean;

    getService<T>(serviceCtor: ApplicationServiceConstructor<T>): T;

    getConfiguration(): ConfigurationBase;
}

export declare class ApplicationService implements IApplicationService {
    readonly application: ApplicationBase;
    /**
     * @constructor
     * @param {ApplicationBase=} app
     */
    constructor(app: ApplicationBase);
    /**
     * Gets the application of this service
     * @returns {ApplicationBase}
     */
    getApplication(): ApplicationBase;
}


