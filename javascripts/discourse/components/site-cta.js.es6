import Component from "@ember/component";
import { not, equal, or } from "@ember/object/computed";
import DiscourseURL from "discourse/lib/url";

export default Component.extend({
  attributeBindings: ['url:href', 'label:title'],
  classNameBindings: [':site-cta', 'display'],
  tagName: 'a',
  notMinimized: not('minimized'),
  showImage: or('cta.image_src'),
  showLabel: not('site.mobileView'),
  minimized: equal('display', 'minimized'),
  full: equal('display', 'full'),

  click() {
    DiscourseURL.routeTo(this.cta.url);
  }
});