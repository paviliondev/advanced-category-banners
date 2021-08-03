import { withPluginApi } from "discourse/lib/plugin-api";
import { getOwner } from 'discourse-common/lib/get-owner';
import { categorySettingEnabled, categorySettingObj } from '../../lib/category-settings';

export default {
  setupComponent(attrs, component) {
    const controller = getOwner(this).lookup("controller:navigation/category");
    const showHeaderFor = categorySettingObj(settings.show_category_banner)

    let category = attrs.category;
    component.set('showHeader', categorySettingEnabled(category, showHeaderFor));

    controller.addObserver("category", function () {
      if (component._state === 'destroying') return;
      component.set('showHeader', categorySettingEnabled(controller.get("category"), showHeaderFor));
    });
  }
}