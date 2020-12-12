const exhbs = require('express-handlebars');



const hbs = exhbs({
  helpers: {},
  defaultLayout: 'main',
  extname: '.hbs'
});
export default hbs;
