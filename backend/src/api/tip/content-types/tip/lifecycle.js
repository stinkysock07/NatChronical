const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const window = new JSDOM('').window;
const DOMPurify = createDOMPurify(window);

module.exports = {
  beforeCreate(event) {
    const { data } = event.params;

    // Sanitize the fields before they are saved to the database
    if (data.description) {
      data.description = DOMPurify.sanitize(data.description);
    }

    if (data.name) {
      data.name = DOMPurify.sanitize(data.name);
    }

    // You can also add validation here
    if (data.contact_email && data.contact_email !== 'Anonymous') {
      data.contact_email = DOMPurify.sanitize(data.contact_email);
    }
  },

  beforeUpdate(event) {
    const { data } = event.params;

    // Also sanitize on updates to prevent later injections
    if (data.description) {
      data.description = DOMPurify.sanitize(data.description);
    }
  },
};
