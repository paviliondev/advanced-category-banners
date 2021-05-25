import Component from "@ember/component";
import discourseComputed from "discourse-common/utils/decorators";
import { userPath } from "discourse/lib/url";

export default Component.extend({
  classNames: 'category-featured-user',

  @discourseComputed("featuredUser.user.username")
  userPath(username) {
    return userPath(username);
  }
});