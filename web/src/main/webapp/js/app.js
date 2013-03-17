var INITIALIZED = false;

var JSON_INDENT_LEVEL = 2;
var app_crfJson;
var app_odmRenderer;
var app_basicDefinitions;
var app_codeLists;
var app_itemGroupDefs;
var app_itemGroupMap;
var app_templateNames = 
['print_form_def','print_item_def','print_item_def_3col','e_form_def','e_item_def','e_item_def_3col'];
var mode = 'BLANK_SINGLE_CRF';

debug("console debugging enabled.");

/***********      @JQUERY INIT    *******************/
$(document).ready(function() {
  if (INITIALIZED == false) {
    INITIALIZED = true;
    RenderUtil.loadTemplates(app_templateNames, function() {
      Backbone.history.start();
      getPrintableContent();
    });
  }
});
  
  
function getPrintableContent() {
  $.get(app_contextPath + '/rest/metadata/json/view/' + app_studyOID, {}, function(data) {
    $('#form_wrapper').css({display: "block"});
    app_odmRenderer = new ODMRenderer(data);
    $('#form_wrapper').html(app_odmRenderer.renderPrintableForm(mode));
   });
}