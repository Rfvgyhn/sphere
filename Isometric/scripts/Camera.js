function Camera(x, y)
{
	this.X = x || 0;
	this.Y = y || 0;
	
	this.MoveLeft = function()
	{
		this.X++;
	}
	
	this.MoveRight = function()
	{
		this.X--;
	}
	
	this.MoveUp = function()
	{
		this.Y++;
	}
	
	this.MoveDown = function()
	{
		this.Y--;
	}
}