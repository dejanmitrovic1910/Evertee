/**
 * When a bundle app renders multiple product forms with the same ID,
 * only one form can be targeted and settings may apply only to the last product.
 * This script gives each duplicate form a unique ID (e.g. id-0, id-1) so each
 * form is distinct and bundle settings apply per product.
 */
(function () {
  function ensureUniqueFormIds() {
    var forms = document.querySelectorAll('form[data-type="add-to-cart-form"]');
    var idCount = {};
    var idNextIndex = {};

    forms.forEach(function (form) {
      var id = form.id || 'product-form-bundle';
      idCount[id] = (idCount[id] || 0) + 1;
    });

    forms.forEach(function (form) {
      var id = form.id || 'product-form-bundle';
      if (idCount[id] > 1) {
        var idx = idNextIndex[id] = (idNextIndex[id] || 0);
        idNextIndex[id] += 1;
        form.id = id + '-' + idx;
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', ensureUniqueFormIds);
  } else {
    ensureUniqueFormIds();
  }

  document.addEventListener('shopify:section:load', ensureUniqueFormIds);
})();
