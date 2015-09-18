function Sprite(sprite)
{
	var spriteSet = sprite;
	var delay = 0;
	var delayModifier = 1;
	var currentFrame = 0;
	var direction = 0;
	var x = 0;
	var y = 0;
	this.done = false;
	
	this.Render = function()
	{
		sprite.images[sprite.directions[direction].frames[currentFrame].index].blit(x, y);
	}
	
	this.Update = function()
	{
		delay += delayModifier;
		
		if (delay >= sprite.directions[direction].frames[currentFrame].delay)
		{
			delay = 0;
			currentFrame++;
			
			if (currentFrame == sprite.directions[direction].frames.length)
				currentFrame = 0;
		}			
	}
	
	this.DoKey = function(key)
	{
		
	}
	
	this.SetLocation = function(xx, yy, dir)
	{
		x = xx;
		y = yy;
		
		for (var i = 0; i < sprite.directions.length; i++)
		{
			if (sprite.directions[i].name == dir)
			{
				direction = i;
				return;
			}
		}
		
		throw "Sprite.SetDirection(x, y, direction): direction does not exist.";
	}
}