function ChoiceBox(x, y, w, windowStyle, yesNo)
{
	var items = new Array();
	var selection = 0;
	var arrow = g_images["arrow"];
	this.returnValue = null;
	this.done = false;
	
	this.AddItem = function(text, action)
	{
		var item = new Object;
		item.text = text;
		item.Action = action;
		
		items.push(item);
	}
	
	if (yesNo)
	{
		this.AddItem("Yes", undefined);
		this.AddItem("No", undefined);
		var windowHeight = 42;
	}
	else
		var windowHeight = (items.length * 16) + 10;
	
	this.Update = function()
	{
		if (this.returnValue != null)
			this.done = true;
	}
	
	this.Render = function()
	{
		windowStyle.drawWindow(x, y, w, windowHeight);
		g_images["arrow"].blit(x + 7, 7 + y + (16 * selection));
		
		for (var i = 0; i < items.length; i++)
			DrawText(x + 7 + arrow.width, y + 7 + (i * 16), g_fontBig, items[i].text, Colors.textWhite);
	}
	
	this.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (yesNo)
				{
					if (selection == 0)
						this.returnValue = true;
					else
						this.returnValue =  false
				}
				break;
			}
			
			case Keys.Cancel:
			{
				selection = items.length - 1;
				break;
			}
			
			case Keys.Down:
			{
				if (selection == items.length - 1)
					selection = 0;
				else
					selection++;
				break;
			}
			
			case Keys.Up:
			{
				if (selection == 0)
					selection = items.length - 1;
				else
					selection--;
				break;
			}
		}
	}
}