function MessageBox(text)
{
	var maxWidth = SCREEN_WIDTH - 50;
	var stringWidth = g_font.getStringWidth(text);
	
	if (stringWidth < maxWidth)
		var windowWidth = stringWidth + 20;
	else
		var windowWidth = maxWidth;
	
	var windowHeight = Math.ceil(stringWidth / windowWidth) * 15;
	var windowX = (SCREEN_WIDTH / 2) - (windowWidth / 2);
	var windowY = (SCREEN_HEIGHT / 2) - (windowHeight / 2);
	this.done = false;
	
	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		
	}
}