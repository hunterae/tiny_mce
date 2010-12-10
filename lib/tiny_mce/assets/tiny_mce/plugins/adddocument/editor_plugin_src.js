/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
 
addDocumentPlugin = null;

(function() {
  var window;
  
	tinymce.create('tinymce.plugins.AddDocumentPlugin', {
		init : function(ed, url) {
		  addDocumentPlugin = this;
		  
			// Register commands
			ed.addCommand('mceAddDocument', function() {
				// Internal image object like a flash placeholder
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
					return;

				window = ed.windowManager.open({
				  file: ed.getParam('add_document_path'),
					width : 760 + parseInt(ed.getLang('advdocument.delta_width', 0)),
					height : 600 + parseInt(ed.getLang('advdocument.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('document', {
				title : 'adddocument.document_desc',
				image : url + '/img/document.gif',
				cmd : 'mceAddDocument'
			});
		},

		getInfo : function() {
			return {
				longname : 'Add document',
				author : 'Andrew Hunter',
				authorurl : 'http://www.captico.com',
				infourl : 'http://www.captico.com',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},
		
		insertAndClose : function(src, title) {
		  var ed = tinyMCE.activeEditor, f = document.forms[0], nl = f.elements, v, args = {}, el;

  		el = ed.selection.getNode();

  		if (el && el.nodeName == 'IMG') {
  			ed.dom.setAttribs(el, args);
  		} else {
  			ed.execCommand('mceInsertContent', false, '<a href="' + src + '">' + title + '</a>', {skip_undo : 1});
  			ed.undoManager.add();
  		}

      tinyMCE.activeEditor.windowManager.close(window, window.id);
  	}
	});
	
	// Register plugin
	tinymce.PluginManager.add('adddocument', tinymce.plugins.AddDocumentPlugin);
})();