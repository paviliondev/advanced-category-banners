import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwner } from 'discourse-common/lib/get-owner';

export default {
  setupComponent(attrs, component) {
    const controller = getOwner(this).lookup("controller:navigation/category");
    const showHeaderFor = settings.show_header.split("|").reduce(function(result, c) {
      let parts = c.split(':');

      if (parts.length === 2) {
        result[parts[0]] = parts[1];
      }

      return result;
    }, {});
    console.log(Object.keys(showHeaderFor).length === 0)
    function showHeader(category) {
      return category && (
        Object.keys(showHeaderFor).length === 0 || (
          (showHeaderFor[category.slug] || '').match(/all|no_sub/) ||
          (category.parentCategory && (showHeaderFor[category.parentCategory.slug] || '').match(/all|only_sub/))
        )
      );
    }

    let category = attrs.category;
    component.set('showHeader', showHeader(category));

    controller.addObserver("category", function () {
      if (this._state === 'destroying') return;
      component.set('showHeader', showHeader(controller.get("category")));
    });
  }
}