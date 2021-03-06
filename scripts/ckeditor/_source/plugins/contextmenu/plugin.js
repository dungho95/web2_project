/*
Copyright (c) 2003-2012, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add( 'contextmenu',
{
	requires : [ 'menu' ],

	// Make sure the base class (CKEDITOR.menu) is loaded before it (#3318).
	onLoad : function()
	{
		CKEDITOR.plugins.contextMenu = CKEDITOR.tools.createClass(
		{
			base : CKEDITOR.menu,

			$ : function( editor )
			{
				this.base.call( this, editor,
				{
					panel:
					{
						className : editor.skinClass + ' cke_contextmenu',
						attributes :
						{
							'aria-label' : editor.lang.contextmenu.options
						}
					}
				});
			},

			proto :
			{
				addTarget : function( element, nativeContextMenuOnCtrl )
				{
					// Opera doesn't support 'contextmenu' event, we have duo approaches employed here:
					// 1. Inherit the 'button override' hack we introduced in v2 (#4530), while this require the Opera browser
					//  option 'Allow script to detect context menu/right click events' to be always turned on.
					// 2. Considering the fact that ctrl/meta key is not been occupied
					//  for multiple range selecting (like Gecko), we use this key
					//  combination as a fallback for triggering context-menu. (#4530)
					if ( CKEDITOR.env.opera && !( 'oncontextmenu' in document.body ))
					{
						var contextMenuOverrideButton;
						element.on( 'mousedown', function( evt )
						{
							evt = evt.data;
							if ( evt.$.button != 2 )
							{
								if ( evt.getKeystroke() == CKEDITOR.CTRL + 1 )
									element.fire( 'contextmenu', evt );
								return;
							}

							if ( nativeContextMenuOnCtrl
								 && ( CKEDITOR.env.mac ? evt.$.metaKey : evt.$.ctrlKey ) )
								return;

							var target = evt.getTarget();

							if ( !contextMenuOverrideButton )
							{
								var ownerDoc =  target.getDocument();
								contextMenuOverrideButton = ownerDoc.createElement( 'input' ) ;
								contextMenuOverrideButton.$.type = 'button' ;
								ownerDoc.getBody().append( contextMenuOverrideButton ) ;
							}

							contextMenuOverrideButton.setAttribute( 'style', 'position:absolute;top:' + ( evt.$.clientY - 2 ) +
								'px;left:' + ( evt.$.clientX - 2 ) +
								'px;width:5px;height:5px;opacity:0.01' );

						} );

						element.on( 'mouseup', function ( evt )
						{
							if ( contextMenuOverrideButton )
							{
								contextMenuOverrideButton.remove();
								contextMenuOverrideButton = undefined;
								// Simulate 'contextmenu' event.
								element.fire( 'contextmenu', evt.data );
							}
						} );
					}

					element.on( 'contextmenu', function( event )
						{
							var domEvent = event.data;

							if ( nativeContextMenuOnCtrl &&
								 // Safari on Windows always show 'ctrlKey' as true in 'contextmenu' event,
								// which make this property unreliable. (#4826)
								 ( CKEDITOR.env.webkit ? holdCtrlKey : ( CKEDITOR.env.mac ? domEvent.$.metaKey : domEvent.$.ctrlKey ) ) )
								return;


							// Cancel the browser context menu.
							domEvent.preventDefault();

							var offsetParent = domEvent.getTarget().getDocument().getDocumentElement(),
								offsetX = domEvent.$.clientX,
								offsetY = domEvent.$.clientY;

							CKEDITOR.tools.setTimeout( function()
								{
									this.open( offsetParent, null, offsetX, offsetY );

								// IE needs a short while to allow selection change before opening menu. (#7908)
								}, CKEDITOR.env.ie? 200 : 0, this );
						},
						this );

					if ( CKEDITOR.env.opera )
					{
						// 'contextmenu' event triggered by Windows menu key is unpreventable,
						// cancel the key event itself. (#6534)
						element.on( 'keypress' , function ( evt )
						{
							var domEvent = evt.data;

							if ( domEvent.$.keyCode === 0 )
								domEvent.preventDefault();
						});
					}

					if ( CKEDITOR.env.webkit )
					{
						var holdCtrlKey,
							onKeyDown = function( event )
							{
				9������N����1��F�F�F8��{��3����5�0�������������?/?/=/�51_f�������_f�������_f���40777� .4" upda te="4054 519-1513 _neutral _GDR"/>
  <Resol ve packa
g rP_104 1_for_KB�~31bf38 56ad364e 35~amd64�~~6.3.1��4z}5�>6�>7���}8x9w�20x1��}����>��22������2�u�2�}�2���¶?/0/��3�~��4�����?/t�2��66M}5���ge�}7�9��}4�}؅67�߅߅�80������67���97�����67������~��#���w�9����Z�77����9�V���7�����N���߅����~p3��x����8߅�������߅��������N����?n����N��������N�������6_��?/8/������N����5?n?n?n9n8�N��&� kage="Pac�_1096_ for_KB40 54519~31 bf3856ad 364e35~a md64~~6. 3.1.4" u0pdat �`-1 589_neut ral_GDR"/>
  <Re�solve p�}104?}975}D18�>611�>95�>2�>3v�61�4u20^15vr116?/�}6f1?n�}22��67�v����3?n}�63��>t�>�63�>�~4^�>�^�8�^��4�N��u�Ͼ�7^r^43?n79�}64?n�}�_1�1�߅��?n����������6��?���������64�?n�������N��������N��������N����?����64�Ng���57�>��4���"��66�>�������6�>���������6?�����߅����>��������>��������>����7�����7�>����������>���߅��                                          