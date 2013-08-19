/**
* Outreach jQuery plug-in
* Description
*
* @author Jean-Christophe Nicolas <mrjcnicolas@gmail.com>
* @homepage http://bite-software.co.uk/$plugin/
* @version 0.1.0
* @license MIT http://opensource.org/licenses/MIT
* @date 2013-08-19
*/
(function($) {

$.fn.outreach = function(options){

	var el = $(this),	
		process = new Plugin(el,options);
	
	window.onscroll = function(){
		process.scroller()
	}
	window.onresize = function(){
		process.resize()
	}
			
	return this.el;	
}

var Plugin = function(me,options){

	var config = {
		target:'li',	
		anchor:'a',
		direction:'alt'
	}
	this.cfg = $.extend(config,options);

	this.el = me;
	this.floats = [];
	this.width = window.innerWidth;
	
	this.init();
}

Plugin.prototype.init = function(){

	var anchors = this.configureAnchors();
	this.configureFloats(anchors);
}
Plugin.prototype.configureFloats = function(anchors){
	
	$this = this;

	$this.el.css({
		'position':'absolute',
		'top':0

	}).children('li').each(function(i){

		$li = $(this);

		var obj = {
			li:$li,
			index:i,
			visible:true,
			alignment:($this.cfg.direction == 'alt')? (i % 2 == 0)? 'left' : 'right' : $this.cfg.direction
		}
		$position = obj.alignment;

		$li.css({
			'list-style':'none',
			'position':'absolute',
			'display':'none',
			'width':$this.width,
			$position:'0px'
		})
		
		$this.floats[i] = $this.positionFloat(obj,anchors[i]);

	})
	
}
Plugin.prototype.positionFloat = function(obj,$a){

	$top = $a.offset();

	obj.li.css({top:$top.top})

	$.extend(obj,$top);

	// ready

	obj.li.css({
		'transition':'all .4s',
		'display':'block'
	})


	return obj;

}
Plugin.prototype.configureAnchors = function(){

	var anchors = [];

	$(this.cfg.target).children(this.cfg.anchor).each(function(i){
		anchors[i] = $(this);
	})

	return anchors;
}
Plugin.prototype.scroller = function(){
	
	// console.log(
 //        'scroll', window.pageYOffset,
 //        'visible height',window.innerHeight,
 //        'page height',document.documentElement.scrollHeight,
 //        'total',window.pageYOffset + window.innerHeight,
 //        'focus',(window.pageYOffset + window.innerHeight) - window.innerHeight/2
 //    );

	var focus = (window.pageYOffset + window.innerHeight) - window.innerHeight/2,
		$this = this;

    for(var i=0;i<this.floats.length;i++){

    	var float = this.floats[i];

    	if(float.visible){

    		if(focus >= float.top){

    			float.visible = false;
    			var $margin = 'margin-left';//+float.alignment;
    			var m = $margin.toString();
    			var length = (float.index % 2 == 0)? $this.width : -$this.width;
    			float.li.css(
    				m , length
    			);
    		}

    	}

    	
	}
}
Plugin.prototype.resize = function(){
	this.width = window.innerWidth;
}


})(jQuery);