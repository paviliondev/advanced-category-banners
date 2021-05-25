import Component from '@ember/component';
import { scheduleOnce } from "@ember/runloop";
import discourseComputed, { observes, on } from "discourse-common/utils/decorators";
import { notEmpty } from "@ember/object/computed";
import { ajax } from "discourse/lib/ajax";
import { userPath } from "discourse/lib/url";

const SETTING_CONNECTOR = "~~";

export default Component.extend({
  classNames: 'advanced-category-header',
  showFeaturedUsers: notEmpty("featuredUsers"),
  showFeaturedLinks: notEmpty("featuredLinks"),

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

  @on('init')
  @observes("category.slug")
  setCategoryFeaturedUser() {
    if (settings.featured_users) {
      const featuredUsers = {};
      const slug = this.category.slug;

      settings.featured_users.split('|').map(u => {
        let parts = u.split(SETTING_CONNECTOR);
        if (parts[0] === slug) {
          featuredUsers[parts[1]] = parts[2];
        }
      });

      if (Object.keys(featuredUsers).length > 0) {
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
    }
  },

  @discourseComputed('category.slug')
  featuredLinks(categorySlug) {
    const settingList = settings.featured_links.split("|");
    if (!settingList) return [];

    return settingList.reduce((result, l) => {
      let parts = l.split(SETTING_CONNECTOR);

      if (categorySlug === parts[0]) {
        result.push({
          label: parts[1],
          title: parts[1],
          href: parts[2]
        })
      }

      return result;
    }, []);
  },

  @discourseComputed('category.description')
  showDescription(description) {
    return description && settings.show_description;
  }
})