'use strict';

var tslib = require('tslib');
var core = require('@awesome-cordova-plugins/core');
var i0 = require('@angular/core');

function _interopNamespaceDefault(e) {
    var n = Object.create(null);
    if (e) {
        Object.keys(e).forEach(function (k) {
            if (k !== 'default') {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () { return e[k]; }
                });
            }
        });
    }
    n.default = e;
    return Object.freeze(n);
}

var i0__namespace = /*#__PURE__*/_interopNamespaceDefault(i0);

var Health = /** @class */ (function (_super) {
    tslib.__extends(Health, _super);
    function Health() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Health.prototype.isAvailable = function () { return core.cordova(this, "isAvailable", { "callbackOrder": "reverse" }, arguments); };
    Health.prototype.promptInstallFit = function () { return core.cordova(this, "promptInstallFit", { "callbackOrder": "reverse" }, arguments); };
    Health.prototype.requestAuthorization = function (datatypes) { return core.cordova(this, "requestAuthorization", {}, arguments); };
    Health.prototype.isAuthorized = function (datatypes) { return core.cordova(this, "isAuthorized", {}, arguments); };
    Health.prototype.query = function (queryOptions) { return core.cordova(this, "query", {}, arguments); };
    Health.prototype.queryAggregated = function (queryOptionsAggregated) { return core.cordova(this, "queryAggregated", {}, arguments); };
    Health.prototype.store = function (storeOptions) { return core.cordova(this, "store", {}, arguments); };
    Health.ɵfac = i0__namespace.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Health, deps: null, target: i0__namespace.ɵɵFactoryTarget.Injectable });
    Health.ɵprov = i0__namespace.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Health });
    Health.pluginName = "Health";
    Health.plugin = "cordova-plugin-health";
    Health.pluginRef = "navigator.health";
    Health.repo = "https://github.com/dariosalvi78/cordova-plugin-health";
    Health.platforms = ["Android", "iOS"];
    Health = tslib.__decorate([], Health);
    return Health;
}(core.AwesomeCordovaNativePlugin));
i0__namespace.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "12.2.16", ngImport: i0__namespace, type: Health, decorators: [{
            type: i0.Injectable
        }], propDecorators: { isAvailable: [], promptInstallFit: [], requestAuthorization: [], isAuthorized: [], query: [], queryAggregated: [], store: [] } });

exports.Health = Health;
