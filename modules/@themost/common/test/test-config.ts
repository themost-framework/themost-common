/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
import {assert} from "chai";
import {join} from "path";
import "source-map-support/register";
import {ConfigurationBase} from "../config";
import {PathUtils, TraceUtils} from "../utils";
describe("test configuration", ()=> {

    it("should create new configuration", ()=> {
        const config = new ConfigurationBase(PathUtils.join(__dirname,"config"));
        assert.equal(config.getConfigurationPath(), join(__dirname,"config"));
    });
    it("should use ConfigurationBase.setSourceAt", ()=> {
        const config = new ConfigurationBase(PathUtils.join(__dirname,"config"));
        config.setSourceAt("settings/groupA/settingA", true);
        assert.equal(config.getSourceAt("settings/groupA/settingA"), true);
        assert.notEqual(config.getSourceAt("settings/groupA/settingA"), false);
    });
});
