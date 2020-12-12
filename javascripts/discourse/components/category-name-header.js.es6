import Component from '@ember/component';
import { scheduleOnce } from "@ember/runloop";

export default Component.extend({
  classNames: 'category-name-header',
  
  didInsertElement() {
    scheduleOnce('afterRender', () => {
      let $el = $(this.element);
                  
      if (this.category.uploaded_logo) {
        $el.insertAfter('section.category-heading .category-logo');
        $('section.category-heading').addClass('has-logo');
        $('section.category-heading .category-name-header, section.category-heading p').wrapAll('<div class="category-heading-details"></div>');
      } else {
        $el.appendTo('section.category-heading');    
      }
    });
  }
})