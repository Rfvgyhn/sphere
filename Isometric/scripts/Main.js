RequireScript("Color.js");
RequireScript("Game.js");
RequireScript("Camera.js");
RequireScript("Screen.js");
RequireScript("Keys.js");
RequireScript("Map.js");

function game()
{	
	Screen.GiveFocus(new Map(50, 50, [ "Grass.png", "Water.png", "Ground.png" ]));
}

function Cell(texture)
{
	this.Texture = texture;
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

function Random(min, max)
{
	return Math.round((Math.random() * (max - min)) + min)
}
