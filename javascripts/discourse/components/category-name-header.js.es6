import Component from '@ember/component';
import { scheduleOnce } from "@ember/runloop";

export default Component.extend({
  classNames: 'category-name-header',
  
  didInsertElement() {
    scheduleOnce('afterRender', () => {
      let $el = $(this.element);
      $el.appendTo('section.category-heading');
      
      if (this.category.uploaded_logo) {
        $('section.category-heading').addClass('has-logo');  
      }
      
      $('section.category-heading .category-name-header, section.category-heading p').wrapAll('<div class="category-heading-details"></div>');
    });
  }
})