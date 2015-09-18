function Random(min, max)
{
	return Math.round((Math.random() * (max - min)) + min)
}

Array.prototype.ContainsItem = function(item)
{
	for (var i = 0; i < this.length; i++)
	{
		if (this[i] == item)
			return true;
	}
	
	return false;
}

Array.prototype.RemoveFront = function()
{
	this.shift();
}

Array.prototype.Clear = function()
{
	for (var i = 0; i <= this.length; i++)
		this.pop();
}

function DrawText(x, y, font, color, string)
{
	var theFont = font;
	
	theFont.setColorMask(Colors.Black);
	theFont.drawText(x + 1, y + 1, string);
	theFont.setColorMask(color);
	theFont.drawText(x, y, string);
}