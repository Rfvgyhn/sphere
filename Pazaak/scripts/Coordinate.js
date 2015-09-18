function Coordinate(x, y)
{
	this.x = x || 0;
	this.y = y || 0;
	
	this.X = function()
	{
		return this.x;
	}
	
	this.Y = function()
	{
		return this.y;
	}
}