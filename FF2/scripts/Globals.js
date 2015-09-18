function Random(min, max)
{
	return Math.round((Math.random() * (max - min)) + min)
}

Array.prototype.Contains = function(item)
{
	for (var i = 0; i < this.length; i++)
	{
		if (this[i] == item)
			return true;
	}
	
	return false;
}

Array.prototype.IndexOf = function(item)
{
	for (var i = 0; i < this.length; i++)
	{
		if (this[i] == item)
			return i;
	}
	
	return -1;
}

Array.prototype.Clear = function()
{
	this.length = 0;
}

function DrawText(x, y, font, color, string)
{
	var theFont = font;
	
	theFont.setColorMask(Color.Black);
	theFont.drawText(x + 1, y, string);
	theFont.drawText(x, y + 1, string);
	theFont.setColorMask(color);
	theFont.drawText(x, y, string);
}

// Right aligns text
function DrawTextRight(x, y, font, color, text)
{
	DrawText(x - font.getStringWidth(text), y, font, color, text);
}

// Centers Text
function DrawTextCenter(x, y, font, color, text)
{
	DrawText(x - font.getStringWidth(text) / 2, y, font, color, text);
}

function ClearKeyQueue()
{
	while (AreKeysLeft())
		GetKey();
}