function categorySettingEnabled(category, settingObj) {
  return category && (
    (settingObj[category.slug] || '').match(/all|no_sub/) ||
    (category.parentCategory && (settingObj[category.parentCategory.slug] || '').match(/all|only_sub/))
  );
}

function categorySettingObj(setting) {
  return setting.split("|").reduce(function(result, c) {
    let parts = c.split(':');
    if (parts.length === 2) {
      result[parts[0]] = parts[1];
    }
    return result;
  }, {});
}

export {
  categorySettingEnabled,
  categorySettingObj
}