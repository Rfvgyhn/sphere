function Animation(x, y, spriteSet, skippable)
{
	var delay = 0;
	var delayModifier = 1;
	var currentFrame = 0;
	var sprite = LoadSpriteset(spriteSet);
	this.done = false;
	
	this.Render = function()
	{
		sprite.images[sprite.directions[0].frames[currentFrame].index].blit(x, y);
	}
	
	this.Update = function()
	{
		delay += delayModifier;
		
		if (delay >= sprite.directions[0].frames[currentFrame].delay)
		{
			delay = 0;
			currentFrame++;
			
			if (currentFrame == sprite.directions[0].frames.length - 1)
				this.done = true;
		}			
	}
	
	this.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
				if (skippable)
					this.done = true;
					
				break;
			
			case Keys.Cancel:
				delayModifier = sprite.directions[0].frames[0].delay - 1;
				break;
				
			default:
				delayModifier = 1;
		}
	}
}