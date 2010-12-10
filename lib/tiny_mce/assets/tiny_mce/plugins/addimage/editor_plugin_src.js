/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */
 
addImagePlugin = null;

(function() {
  var window;
  
	tinymce.create('tinymce.plugins.AddImagePlugin', {
		init : function(ed, url) {
		  addImagePlugin = this;
		  
			// Register commands
			ed.addCommand('mceAddImage', function() {
				// Internal image object like a flash placeholder
				if (ed.dom.getAttrib(ed.selection.getNode(), 'class').indexOf('mceItem') != -1)
					return;

				window = ed.windowManager.open({
				  file: ed.getParam('add_image_path'),
          // file : url + '/image.htm',
					width : 760 + parseInt(ed.getLang('advimage.delta_width', 0)),
					height : 600 + parseInt(ed.getLang('advimage.delta_height', 0)),
					inline : 1
				}, {
					plugin_url : url
				});
			});

			// Register buttons
			ed.addButton('image', {
				title : 'addimage.image_desc',
				image : url + '/img/image.gif',
				cmd : 'mceAddImage'
			});
		},

		getInfo : function() {
			return {
				longname : 'Add image',
				author : 'Andrew Hunter',
				authorurl : 'http://www.captico.com',
				infourl : 'http://www.captico.com',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		},
		
		insertAndClose : function(src, link) {
		  var ed = tinyMCE.activeEditor, f = document.forms[0], nl = f.elements, v, args = {}, el;

  		el = ed.selection.getNode();

  		if (el && el.nodeName == 'IMG') {
  			ed.dom.setAttribs(el, args);
  		} else {
  		  if (link) 
  		    ed.execCommand('mceInsertContent', false, '<a href=' + link + '><img src=' + src + ' /></a>', {skip_undo : 1});
  		  else
  		    ed.execCommand('mceInsertContent', false, '<img src=' + src + ' />', {skip_undo : 1});
  			ed.undoManager.add();
  		}

      tinyMCE.activeEditor.windowManager.close(window, window.id);
  	}
	});
	
	// Register plugin
	tinymce.PluginManager.add('addimage', tinymce.plugins.AddImagePlugin);
})();