/**
 * WordPress plugin.
 */

(function() {
	var DOM = tinymce.DOM;

	tinymce.create('tinymce.plugins.Captico', {
		mceTout : 0,

		init : function(ed, url) {
		  var tbId = ed.getParam('wordpress_adv_toolbar');
	    var t = this;

	   // Hides the specified toolbar and resizes the iframe
	    ed.onPostRender.add(function() {
        var adv_toolbar = ed.controlManager.get(tbId);
        if ( ed.getParam('wordpress_adv_hidden', 1) && adv_toolbar ) {
          DOM.hide(adv_toolbar.id);
          t._resizeIframe(ed, tbId, 28);
        }
      });

      ed.addButton('wp_adv', {
        title : 'wordpress.wp_adv_desc',
        image : url + '/img/toolbars.gif',
        onclick : function() {
          var cm = ed.controlManager;
          var id = cm.get(tbId).id;

          if ( DOM.isHidden(id) ) {
            cm.setActive('wp_adv', 1);
            DOM.show(id);
            t._resizeIframe(ed, tbId, -28);
          } else {
            cm.setActive('wp_adv', 0);
            DOM.hide(id);
            t._resizeIframe(ed, tbId, 28);
          }
        }
      });
	  
	   // Add Media buttons
      ed.addButton('add_media', {
        title : 'wordpress.add_media',
        image : url + '/img/media.gif',
        onclick : function() {

        }
     });
     
     ed.addButton('add_image', {
       title : 'wordpress.add_image',
       image : url + '/img/image.gif',
       onclick : function() {
         $('#add-image').click();
       }
     });
     
     ed.addButton('add_video', {
       title : 'wordpress.add_image',
       image : url + '/img/video.gif',
       onclick : function() {
         $('#add-image').click();
       }
     });
      
     ed.addButton('add_audio', {
       title : 'wordpress.add_audio',
       image : url + '/img/audio.gif',
       onclick : function() {
         $('#add-image').click();
       }
     }); 
     
     // Add Media buttons to fullscreen
     ed.onBeforeExecCommand.add(function(ed, cmd, ui, val) {
       var DOM = tinymce.DOM;
       if ( 'mceFullScreen' != cmd ) return;
       if ( 'mce_fullscreen' != ed.id && DOM.get('add-audio') && DOM.get('add-video') && DOM.get('add-image') && DOM.get('add-media') && ed.settings.theme_advanced_buttons1.indexOf('add_video') == -1) 
         ed.settings.theme_advanced_buttons1 += ',|,add_image,add_video,add_audio,add_media';
     });
		},

		getInfo : function() {
			return {
				longname : 'Captico Plugin',
				author : 'Andrew Hunter', // Modified wordpress version
				authorurl : 'http://captico.com',
				infourl : 'http://captico.com',
				version : '3.0'
			};
		},

		// Resizes the iframe by a relative height value
		_resizeIframe : function(ed, tb_id, dy) {
			var ifr = ed.getContentAreaContainer().firstChild;

			DOM.setStyle(ifr, 'height', ifr.clientHeight + dy); // Resize iframe
			ed.theme.deltaHeight += dy; // For resize cookie
		},
	});

	// Register plugin
	tinymce.PluginManager.add('captico', tinymce.plugins.Captico);
})();