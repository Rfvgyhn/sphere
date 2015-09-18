function Menu()
{
	this.Selection = 0;
	this.Done = false;
	this.items = new Array();
	this.vars = new Object;
	this.Initialized = false;
	this.Cursor = LoadImage("Cursor.png");
	this.Hide = false;
	
	this.AddItem = function(item, action, desc, icon)
	{
		var theItem = new Object;
		theItem.item     = item;
		theItem.Action   = action;// || function () {  };
		theItem.desc     = desc;
		
		if (icon != undefined)
			theItem.icon = icon;
			
		this.items[this.items.length] = theItem;
	}
	
	this.HasItems = function()
	{
		if (this.items.length > 0)
			return true;
		return false;
	}
	
	this.Initialize = function()
	{
		
	}

	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		if (!this.Hide)
		{
			this._PreRender();
			this._Render();
			this._PostRender();
		}
	}
	
	this.Action = function()
	{
		
	}
}

var introMenu = new Menu(); {
	introMenu.Initialize = function()
	{
		
	}
	
	introMenu.Update = function()
	{
		
	}
	
	introMenu._PreRender = function()
	{
	
	}
	
	introMenu._Render = function()
	{
		
	}
	
	introMenu._PostRender = function()
	{
		
	}
	
	introMenu.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				this.items[this.Selection].Action();
				
				break;
			}
			
			case Keys.Cancel:
			{
				
				break;
			}
			
			case Keys.Select:
			{
				
				
				break;
			}
			
			case Keys.Right:
			{
				if (this.Selection < this.items.length - 1) 
					this.Selection++;
				else
					this.Selection = 0;
				
				break;
			}
			
			case Keys.Left:
			{
				if (this.Selection > 0) 
					this.Selection--;
				else
					this.Selection = this.items.length - 1;
				
				break;
			}
			
			case Keys.Up:
			{
				
				
				break;
			}
			
			case Keys.Down:
			{
				
					
				break;
			}
		}
	}
}