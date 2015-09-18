RequireScript("Grid.js");

function Button(x, y, w, h, click, text, graphic, hover, row, col)
{
	this.origX = x;
	this.origY = y;
	this.x = x;
	this.y = y;
	this.row = row;// || -1;
	this.col = col;// || -1;
	this.width = w;
	this.height = h;
	this.text = text;
	this.yellow = CreateColor(248, 255, 0 , 255);
	this.textColor = Colors.TextBlue;
	this.graphic = graphic;
	this.hover = hover;
	this.active = false;	// Being controlled by mouse
	this.timer = GetTime();
	this.alpha = 100;
	this.alphaChanger = -1;
	
	this.Update = function()
	{
		if (Mouse.x >= this.x && Mouse.x <= this.x + this.width && Mouse.y >= this.y && Mouse.y <= this.y + this.height)
		{
			this.OnMouseOver();
			
			if (IsMouseButtonPressed(MOUSE_LEFT))
			{
				if (Mouse.button == null)
				{
					this.active = true;
					Mouse.button = this;
				}
					
				this.Click();
			}
			else
			{
				Mouse.button = null;
				this.active = false;
								
				if (this.row != undefined)
					this.SnapToGrid();
			}
		}
		else
		{
			this.OnMouseOff();
		}
	}
	
	this.Render = function()
	{
		DrawText(this.x + (this.width / 2) - (g_font.getStringWidth(this.text) / 2), this.y, g_font, this.text, this.textColor, false);
		
		if (this.graphic != undefined)
		{
			this.graphic.blit(this.x, this.y);
			DrawText(this.x + (this.width / 2) - (g_font.getStringWidth(this.text) / 2), this.y + 24, g_font, this.text, this.White, false);
		}
			
		if (this.hover != undefined && Mouse.button == null)
			this.hover.blit(this.x, this.y);
	}
	
	this.Click = click;
	
	this.OnMouseOver = function()
	{
		if (this.hover != undefined)
		{			
			if (GetTime() > this.timer + 5)
			{
				this.alpha += (this.alphaChanger * 17);
				this.timer = GetTime();
				
				if (this.alpha <= 0 || this.alpha >= 255)
					this.alphaChanger *= -1;
					
				if (this.alpha < 0)
					this.alpha = 1;
					
				this.hover.setAlpha(this.alpha);
			}
		}
		else
		{
			this.textColor = this.yellow;
			
			if (GetTime() > this.timer + 5)
			{
				this.yellow.alpha += this.alphaChanger;
				this.timer = GetTime();
				
				if (this.yellow.alpha <= 100 || this.yellow.alpha >= 255)
					this.alphaChanger *= -1;
			}
		}
	}
	
	this.OnMouseOff = function()
	{
		if (this.hover != undefined)
		{
			this.alpha = 0;
			this.hover.setAlpha(0);
		}
		else
		{
			this.yellow.alpha = 255;
			this.textColor = Colors.TextBlue;
		}
			
		this.alphaChanger = -1;
		this.timer = GetTime();
	}
	
	this.SnapToGrid = function()
	{
		var cg = Grid.CurrentGrid();
		
		if (this.x >= cg.X && this.y >= cg.Y && this.x <= cg.X + cg.Width && this.y <= cg.Y + cg.Height)
			cg.Deck.Add(this);
		else
		{
			this.x = cg.SnapTo[this.row][this.col].X();
			this.y = cg.SnapTo[this.row][this.col].Y();
		}
	}
}