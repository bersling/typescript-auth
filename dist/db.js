"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tsdbadapter_1 = require("tsdbadapter");
const db = require('../properties/local.properties').db;
var bla;
(function (bla_1) {
    function bla() {
        return tsdbadapter_1.dbadapter(db);
    }
    bla_1.bla = bla;
    ;
})(bla = exports.bla || (exports.bla = {}));
