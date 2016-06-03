({
    baseUrl: "../js",
    name: "app",
    out: "../js/script.min.js",
    paths: {
      'Model': '../js/modules/Model',
      'View': '../js/modules/View',
      'Controller': '../js/modules/Controller',
      'jquery': 'https://code.jquery.com/jquery-2.2.4.min',
      'tmpl': 'libs/microTemplates',
      'requireLib': 'libs/require'
      },
    include: ["requireLib"]
})
