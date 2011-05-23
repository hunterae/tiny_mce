/**
 * editor_plugin_src.js
 *
 * Copyright 2009, Moxiecode Systems AB
 * Released under LGPL License.
 *
 * License: http://tinymce.moxiecode.com/license
 * Contributing: http://tinymce.moxiecode.com/contributing
 */

(function() {
	var DOM = tinymce.DOM, Element = tinymce.dom.Element, Event = tinymce.dom.Event, each = tinymce.each, is = tinymce.is;

	tinymce.create('tinymce.plugins.ColorboxPopups', {
		init : function(ed, url) {
			// Replace window manager
			ed.onBeforeRenderUI.add(function() {
				ed.windowManager = new tinymce.ColorboxWindowManager(ed);
        // DOM.loadCSS(url + '/skins/' + (ed.settings.inlinepopups_skin || 'clearlooks2') + "/window.css");
			});
		},

		getInfo : function() {
			return {
				longname : 'ColorboxPopups',
				author : 'Moxiecode Systems AB',
				authorurl : 'http://tinymce.moxiecode.com',
				infourl : 'http://wiki.moxiecode.com/index.php/TinyMCE:Plugins/inlinepopups',
				version : tinymce.majorVersion + "." + tinymce.minorVersion
			};
		}
	});

	tinymce.create('tinymce.ColorboxWindowManager:tinymce.WindowManager', {
		ColorboxWindowManager : function(ed) {
			var t = this;

			t.parent(ed);
			t.zIndex = 300000;
			t.count = 0;
			t.windows = {};
		},

		open : function(f, p) {
			var t = this, id, opt = '', ed = t.editor, dw = 0, dh = 0, vp, po, mdf, clf, we, w, u;

			f = f || {};
			p = p || {};

			// Run native windows
			if (!f.inline)
				return t.parent(f, p);

			// Only store selection if the type is a normal window
			if (!f.type)
				t.bookmark = ed.selection.getBookmark(1);

			id = DOM.uniqueId();
			vp = DOM.getViewPort();
			f.width = parseInt(f.width || 320);
			f.height = parseInt(f.height || 240) + (tinymce.isIE ? 8 : 0);
			f.min_width = parseInt(f.min_width || 150);
			f.min_height = parseInt(f.min_height || 100);
			f.max_width = parseInt(f.max_width || 2000);
			f.max_height = parseInt(f.max_height || 2000);
			f.left = f.left || Math.round(Math.max(vp.x, vp.x + (vp.w / 2.0) - (f.width / 2.0)));
			f.top = f.top || Math.round(Math.max(vp.y, vp.y + (vp.h / 2.0) - (f.height / 2.0)));
			f.movable = f.resizable = true;
			p.mce_width = f.width;
			p.mce_height = f.height;
			p.mce_inline = true;
			p.mce_window_id = id;
			p.mce_auto_focus = f.auto_focus;

      t.features = f;
      t.params = p;
      t.onOpen.dispatch(t, f, p);
      
			// Add window
			w = t.windows[id] = {
				id : id,
        // mousedown_func : mdf,
        // click_func : clf,
				element : new Element(id, {blocker : 1, container : ed.getContainer()}),
        iframeElement : new Element(id + '_ifr'),
        features : f,
        // deltaWidth : dw,
        // deltaHeight : dh
			};

			t.count++;
			
			$.colorbox({href: (f.file ? f.file : f.url), iframe:true, width: (f.width + 30) + "px", height: (f.height + 30) + "px", onClosed: function() {
			  t.close(w, id, true);
			}}); 

			return w;
		},

		close : function(win, id, closeColorboxCallback) {	  	  
		  var t = this, w, d = DOM.doc, ix = 0, fw, id;

			id = t._findId(id || win);

			// Probably not inline
			if (!t.windows[id]) {
			  if (closeColorboxCallback)
			    return;
			  
				t.parent(win);
				return;
			}

			t.count--;

			if (w = t.windows[id]) {
				t.onClose.dispatch(t);
        // Event.remove(d, 'mousedown', w.mousedownFunc);
        // Event.remove(d, 'click', w.clickFunc);
				Event.clear(id);
				Event.clear(id + '_ifr');

				DOM.setAttrib(id + '_ifr', 'src', 'javascript:""'); // Prevent leak
				w.element.remove();
				delete t.windows[id];
			}		
			
			$.colorbox.close();
		},
		
		setTitle : function(w, ti) {
		  
		},
		
		alert : function(txt, cb, s) {
		  
		},
		
		confirm : function(txt, cb, s) { 
		  
	  },
	  
	  resizeBy : function(dw, dh, id) {
	    
	  },
	  
	  focus : function(id) {
	    
    },

		// Internal functions

    _findId : function(w) {
      var t = this;
     
      if (typeof(w) == 'string')
        return w;
     
      each(t.windows, function(wo) {
        var ifr = DOM.get(wo.id + '_ifr');
     
        // if (ifr && w == ifr.contentWindow) {
          w = wo.id;
          return false;
        // }
      });
     
      return w;
    }
	});

	// Register plugin
	tinymce.PluginManager.add('colorboxpopups', tinymce.plugins.ColorboxPopups);
})();

