import Component from '@ember/component';
import { scheduleOnce } from "@ember/runloop";
import discourseComputed, { observes, on } from "discourse-common/utils/decorators";
import { notEmpty, or } from "@ember/object/computed";
import { ajax } from "discourse/lib/ajax";
import { userPath } from "discourse/lib/url";
import { categorySettingEnabled, categorySettingObj } from '../lib/category-settings';

const SETTING_CONNECTOR = "~~";

export default Component.extend({
  classNames: 'advanced-category-header',
  showFeaturedUsers: notEmpty("featuredUsers"),
  showFeaturedLinks: notEmpty("featuredLinks"),
  showMeta: or("showLogo", "showFeaturedLinks", "showFeaturedUsers"),

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

  @discourseComputed('category')
  showDescription(category) {
    return categorySettingEnabled(category, categorySettingObj(settings.show_category_description));
  },

  @discourseComputed('category')
  showLogo(category) {
    return categorySettingEnabled(category, categorySettingObj(settings.show_category_logo));
  }
})