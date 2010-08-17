;(function($){
	$.fn.selectbox = function(options){
		return this.each(function(){
			if (!!$(this).data("selectbox")) 
				return;
			
			var obj = makeselectbox(this, options);

			$(this).data("selectbox", obj);
			
		})
	};
	
	function makeselectbox(element, options){
		options = $.extend({
			itemCssClass: 'selectbox-item',
			textCssClass: 'selectbox-text',
			iconCssClass: 'selectbox-icon',
			getKey: function(item){return item},
			getText: function(item){return item},
		}, options || {});

		return new selectbox(element, options);
	}
	
	function selectbox(element, options)
	{
		this.element = element;
		this.object = $(element);
		this.options = options;
		this.list = {};
		this.keyElementMap = {};
	}
	
	selectbox.prototype = {
		
		add: function(item)
		{
			var key = this.options.getKey(item);
			
			if(!key) return;
			
			if (!this.list[key]) {
				this.list[key] = item;
				
				var element = this.drawItem(item);
				
				this.keyElementMap[key] = element;
			}
		},
		
		remove: function(key)
		{
			var element = this.keyElementMap[key];
			
			element.remove();
			
			delete this.list[key];
			
			delete this.keyElementMap[key];
		},
		
		removeAll: function()
		{
			var _self = this;
			$.each(this.list, function(key){
				_self.remove(key);
			});
		},
		
		getData: function()
		{
			return this.list;
		},
		
		setData: function(data)
		{
			this.removeAll();
			
			var _self = this;
			$.each(data, function(){
				_self.add(this);
			});
		},
				
		drawItem: function(item)
		{
			var key = this.options.getKey(item);
			var text = this.options.getText(item);
			
			var itemObject = $('<span class="selectbox-item"></span>');
			itemObject.append($('<span class="selectbox-text"></span>').html(text));
			var closeIcon = $('<span class="selectbox-icon">X</span>');
			itemObject.append(closeIcon);
		
			this.object.append(itemObject);
			
			var _self = this;
			
			closeIcon
				.data('key', key)
				.click(function()
				{
					_self.remove(key);
				});
			
			return itemObject;
		},
		
	};
})(jQuery);
