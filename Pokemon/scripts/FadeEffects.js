function FadeIn(color)
{
	this.done = false;
	var alpha = 255;
	var color = color || CreateColor(0, 0, 0, 255);
	
	this.DoKey = function() {}
	
	this.Update = function()
	{
		alpha -= 20;
		
		if (alpha <= 0)
			this.done = true;
		else
			color.alpha = alpha;
	}
	
	this.Render = function()
	{
		Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, color)
	}
}

function FadeOut(color)
{
	this.done = false;
	var alpha = 0;
	var color = color || CreateColor(0, 0, 0, 0);
	
	
	this.DoKey = function() {}
	this.Update = function()
	{
		alpha += 20;
		
		if (alpha >= 255)
			this.done = true;
		else
			color.alpha = alpha;
	}
	
	this.Render = function()
	{
		Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT, color)
	}
}

function FadeOutWipeUp()
{
	this.done = false;
	var transColor = CreateColor(0, 0, 0, 0);
	var color = CreateColor(0, 0, 0, 255);
	var height = 50;
	var y = SCREEN_HEIGHT + height;
	
	this.DoKey = function() {}
	
	this.Update = function()
	{
		y -= 15;
		
		if (y <= -height)
			this.done = true;
	}
	
	this.Render = function()
	{
		GradientRectangle(0, y - height, SCREEN_WIDTH, height, transColor, transColor, color, color);
		Rectangle(0, y, SCREEN_WIDTH, SCREEN_HEIGHT - y, color)
	}
}

function FadeInWipeUp()
{
	this.done = false;
	var transColor = CreateColor(0, 0, 0, 0);
	var color = CreateColor(0, 0, 0, 255);
	var height = 50;
	var y = 0;
	
	this.DoKey = function() {}
	
	this.Update = function()
	{
		y += 15;
		
		if (y >=  SCREEN_HEIGHT + height)
			this.done = true;
	}
	
	this.Render = function()
	{
		GradientRectangle(0, SCREEN_HEIGHT - y, SCREEN_WIDTH, height, color, color, transColor, transColor);
		Rectangle(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT - y, color)
	}
}

function FadeOutWipeDown(color)
{
	this.done = false;
	var transColor = CreateColor(0, 0, 0, 0);
	var color = CreateColor(0, 0, 0, 255);
	var height = 50;
	var y = -height;
	
	this.DoKey = function() {}
	
	this.Update = function()
	{
		y += 15;
		
		if (y >= SCREEN_HEIGHT + height)
			this.done = true;
	}
	
	this.Render = function()
	{
		GradientRectangle(0, y, SCREEN_WIDTH, height, color, color, transColor, transColor);
		Rectangle(0, 0, 320, y, color);
	}
}

function FadeSliceIn()
{
	this.done = false;
	var color = CreateColor(0, 0, 0, 255)
	var recHeight = 2;
	var recWidth  = SCREEN_WIDTH;
	
	this.DoKey = function() {}
	
	this.Update = function()
	{
		if (recWidth <= 0)
			this.done = true;
		
		recWidth -= 15;
	}
	
	this.Render = function()
	{
		for (var i = 0; i < SCREEN_HEIGHT / 2; i++)
		{
			if (i % 2 == 0)
				Rectangle(0, i * 2, recWidth, recHeight, color);
			else
				Rectangle(SCREEN_WIDTH - recWidth, i * 2, recWidth, recHeight, color);
		}
	}
	
}