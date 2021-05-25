import Component from '@ember/component';
import { scheduleOnce } from "@ember/runloop";
import discourseComputed from "discourse-common/utils/decorators";
import { notEmpty } from "@ember/object/computed";
import { ajax } from "discourse/lib/ajax";
import { userPath } from "discourse/lib/url";

const SETTING_CONNECTOR = "~~";

export default Component.extend({
  classNames: 'advanced-category-header',
  showFeaturedUsers: notEmpty("featuredUsers"),
  showFeaturedLinks: notEmpty("featuredLinks"),

  init() {
    this._super(...arguments);

    if (settings.featured_users) {
      let featuredUsers = {}

      settings.featured_users.split('|').map(u => {
        let parts = u.split(SETTING_CONNECTOR);
        featuredUsers[parts[0]] = parts[1];
      });

      ajax(`/user-cards?user_ids=${Object.keys(featuredUsers).join(',')}`)
        .then(result => {
          this.set("featuredUsers", result.users.map(user => {
            return {
              user,
              label: featuredUsers[user.id]
            }
          }));
        });
    }
  },

  didInsertElement() {
    scheduleOnce('afterRender', () => {
      let $el = $(this.element);
      $el.appendTo('section.category-heading');

      if (this.category.uploaded_logo) {
        $('section.category-heading').addClass('has-logo');  
      }

      $('section.category-heading .advanced-category-header, section.category-heading p').wrapAll('<div class="category-heading-details"></div>');
    });
  },

  @discourseComputed
  featuredLinks() {
    const settingList = settings.featured_links.split("|");
    if (!settingList) return [];

    return settingList.map(l => {
      let parts = l.split(SETTING_CONNECTOR);
      return {
        label: parts[0],
        title: parts[0],
        href: parts[1]
      }
    });
  },

  @discourseComputed('category.description')
  showDescription(description) {
    return description && settings.show_description;
  }
})