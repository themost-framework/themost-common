"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @license
 * MOST Web Framework 2.0 Codename Blueshift
 * Copyright (c) 2017, THEMOST LP All rights reserved
 *
 * Use of this source code is governed by an BSD-3-Clause license that can be
 * found in the LICENSE file at https://themost.io/license
 */
var chai_1 = require("chai");
var path_1 = require("path");
require("source-map-support/register");
var config_1 = require("../config");
var utils_1 = require("../utils");
describe("test configuration", function () {
    it("should create new configuration", function () {
        var config = new config_1.ConfigurationBase(utils_1.PathUtils.join(__dirname, "config"));
        chai_1.assert.equal(config.getConfigurationPath(), path_1.join(__dirname, "config"));
    });
    it("should use ConfigurationBase.setSourceAt", function () {
        var config = new config_1.ConfigurationBase(utils_1.PathUtils.join(__dirname, "config"));
        config.setSourceAt("settings/groupA/settingA", true);
        chai_1.assert.equal(config.getSourceAt("settings/groupA/settingA"), true);
        chai_1.assert.notEqual(config.getSourceAt("settings/groupA/settingA"), false);
    });
});
//# sourceMappingURL=test-config.js.map