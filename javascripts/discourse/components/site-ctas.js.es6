import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { defaultHomepage } from "discourse/lib/utilities";
import { gt } from "@ember/object/computed";

export default Component.extend({
  classNames: ['site-ctas'],
  isDiscovery: gt('discoveryPath.length', 1),

  @discourseComputed('currentPath')
  discoveryPath(currentPath) {
    return currentPath.split('discovery.');
  },

  @discourseComputed('discoveryPath.[]')
  home(discoveryPath) {
    return discoveryPath.length && discoveryPath[1] === defaultHomepage(); 
  },

  @discourseComputed('home')
  display(home) {
    return home ? 'full' : settings.site_cta_links_display;
  },

  @discourseComputed('home', 'siteCtas', 'isDiscovery')
  showCtas(home, siteCtas, isDiscovery) {
    return siteCtas.length && isDiscovery && (
      home || settings.site_cta_links_display !== 'home'
    );
  },

  @discourseComputed
  siteCtas() {
    return settings.site_cta_links.split('|').filter(s => s)
      .map(s => {
        let parts = s.split('~~');
        return {
          label: parts[0],
          url: parts[1],
          image_src: parts[2]
        }
      });
  }
});