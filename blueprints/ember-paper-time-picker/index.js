/* eslint-env node */
'use strict';

module.exports = {
  normalizeEntityName: function() {},

  afterInstall: function() {
    return this.addAddonToProject("ember-snap-svg", "0.0.6").then(() => {
			return this.addAddonToProject("busy-utils", "2.4.1");
		});
  }
};
