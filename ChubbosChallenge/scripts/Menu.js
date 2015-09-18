EvaluateSystemScript("colors.js");

function Menu(window, arrow)
{
	if (this instanceof Menu == false)
		return new Menu();
		
	// default properties
	this.font            = GetSystemFont(); //LoadFont(font);
	this.window_style    = LoadWindowStyle(window);
	this.arrow           = LoadImage(arrow);
	this.up_arrow        = GetSystemUpArrow();
	this.down_arrow      = GetSystemDownArrow();
	this.items           = new Array();
	
	this.escape_function = function() {  }
	
	this.longestItem     = function()
	{
		with(this)
		{
			var temp = items[0].name;
	
			for (var i = 0; i < items.length; i++)
			{
				if (items[i].name.length > temp.length)
					temp = items[i].name;
			}
		
			return font.getStringWidth(temp);
		}
	}
}

// Add An Item To The Menu
Menu.prototype.addItem = function(name, callback, color) 
{
	var item = new Object;
	item.name     = name;
	item.callback = callback;
	item.color    = color || White;
	this.items[this.items.length] = item;
}

// Execute Menu
Menu.prototype.execute = function(x, y) 
{
	with (this) 
	{
		var background    = GrabImage(0, 0, GetScreenWidth(), GetScreenHeight());
		var text_height   = font.getHeight();
		var arrowWidth    = arrow.width;
		var padding       = 5;
		var width         = longestItem() + arrowWidth + padding;
		var height        = (text_height + 1) * items.length;
		var height2       = 0;  // To scroll window open
		var selection     = 0;
		var opened        = false;  // Has window been drawn for the first time
		
		while (true) 
		{
			// draw background
			background.blit(0, 0);
			
			// draw the window
			if (!opened)
			{
				if (height2 >= height)
					opened = true;
				else
				{
					window_style.drawWindow(x, y, width, height2);
					height2 += 1;
				}
			}
				
			else
				window_style.drawWindow(x, y, width, height);
			
			// draw the menu items
			for (var i = 0; i < items.length; i++) 
			{
				if (i < items.length) 
				{
					font.setColorMask(Black);
					font.drawText(x + arrowWidth + 1, y + i * text_height + 1, items[i].name);
					font.setColorMask(items[i].color);
					font.drawText(x + arrowWidth ,    y + i * text_height,     items[i].name);
				}
			}
			
			// draw the selection arrow
			arrow.blit(x - padding, y + selection * text_height);

			FlipScreen();
			
			// handle keypresses
			while (AreKeysLeft()) 
			{
				switch (GetKey()) 
				{
					case KEY_ENTER: 
					{
						var item = items[selection];
						item.callback();
						return;
					}
					case KEY_ESCAPE: 
					{
						escape_function();
						return;
					}
					case KEY_DOWN: 
					{
						if (selection < items.length - 1) 
							selection++;
						else
							selection = 0;
						break;
					}
					case KEY_UP: 
					{
						if (selection > 0) 
							selection--;
						else
							selection = items.length - 1;
						break;
					}
				}
			} // end handle input
		}
	} // end with
}

