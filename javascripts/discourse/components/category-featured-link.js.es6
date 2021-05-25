import Component from "@ember/component";
import DiscourseURL from "discourse/lib/url";
import { notEmpty } from "@ember/object/computed";

export default Component.extend({
  classNames: "category-featured-link",
  hasDescription: notEmpty("link.description"),

  click() {
    DiscourseURL.routeTo(this.link.href);
  }
});