function Battler(character)
{
	this.Entity = character;
	this.CurrentTime = 1;
	var baseTimerModifier = 5;
	var statusTimerModifier = 0;
	this.MaxTime = 1000;
	
	this.UpdateTimer = function(status)
	{
		if (this.CurrentTime != this.MaxTime)
		{
			if (status.Contains(CharacterStatus.Stop))
				return false;
			else if (status.Contains(CharacterStatus.Haste))
				statusTimerModifier = 5;					
			else if (status.Contains(CharacterStatus.Slow))
				statusTimerModifier = -2;					
			else
				statusTimerModifier = 0;
			
			this.CurrentTime += baseTimerModifier + statusTimerModifier;
			
			if (this.CurrentTime >= this.MaxTime)
			{
				this.CurrentTime = this.MaxTime;
				return true;
			}
			
			return false;
		}
	}
	
	this.ResetTimer = function()
	{
		this.CurrentTime = 1;
	}
}