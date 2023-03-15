
  cordova.define('cordova/plugin_list', function(require, exports, module) {
    module.exports = [
      {
          "id": "cordova-plugin-health.health",
          "file": "plugins/cordova-plugin-health/www/android/health.js",
          "pluginId": "cordova-plugin-health",
        "clobbers": [
          "navigator.health"
        ]
        }
    ];
    module.exports.metadata =
    // TOP OF METADATA
    {
      "cordova-plugin-health": "2.1.0"
    };
    // BOTTOM OF METADATA
    });
    