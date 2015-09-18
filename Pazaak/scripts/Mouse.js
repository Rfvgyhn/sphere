function Mouse()
{
	this.x = 0;
	this.y = 0;
	this.graphic = LoadImage("Cursor.png");
	this.button = null;
	this.pressed = false;
	this.attached = false;
	this.oldX = 0;
	this.oldY = 0;

	this.Update = function()
	{
		this.oldX = this.x;
		this.oldY = this.y;
		this.x = GetMouseX();
		this.y = GetMouseY();
		
		if (this.button != null)
		{
			this.button.x += this.x - this.oldX;
			this.button.y += this.y - this.oldY;
		}
	}
	
	this.Render = function()
	{
		this.graphic.blit(this.x, this.y);
	}
}

var Mouse = new Mouse();