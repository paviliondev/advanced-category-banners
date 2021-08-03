import Component from "@ember/component";
import { not, and, equal } from "@ember/object/computed";
import DiscourseURL from "discourse/lib/url";

export default Component.extend({
  attributeBindings: ['url:href', 'label:title'],
  classNameBindings: [':site-cta', 'display'],
  tagName: 'a',
  notMinimized: not('minimized'),
  showImage: and('cta.image_src', 'full'),
  showLabel: not('site.mobileView'),
  minimized: equal('display', 'minimized'),
  full: equal('display', 'full'),

  click() {
    DiscourseURL.routeTo(this.cta.url);
  }
});