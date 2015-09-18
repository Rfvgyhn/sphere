function Screen()
{
	this.thingsToRender = new Array();
	this.effectsRender = new Array();
	this.inputs = new Array();
	this.startTime = GetTime();
	this.frameDelay = 15;
	this.blockInput = false;
	
	this.Update = function()
	{
		for (var i = 0; i < this.thingsToRender.length; i++)
			this.thingsToRender[i].Update();
			
		for (var i = 0; i < this.effectsRender.length; i++)
			this.effectsRender[i].Update();
			
		Mouse.Update();
	}
	
	this.Render = function()
	{
		if (IsMapEngineRunning())
			RenderMap();
		
		for (var i = 0; i < this.thingsToRender.length; i++)
		{
			// If mainMenu is behind a mainMenu option, don't render it to save lots o fps
			if (this.thingsToRender[i] == menuMain && i != this.thingsToRender.length - 1)
				continue;
				
			this.thingsToRender[i].Render();
		}
		
		Mouse.Render();
	}
	
	this.RemoveAll = function()
	{
		for (var i = 0; i < this.thingsToRender.length; i++)
			this.thingsToRender[i].done = true;
			
		for (var i = 0; i < this.effectsRender.length; i++)
			this.effectsRender[i].done = true;
		
		for (var i = 0; i < this.inputs.length; i++)
			this.inputs[i].done = true;
		
		this.thingsToRender = new Array();
		this.inputs = new Array();
		this.effectsRender = new Array();
	}
	
	this.EffectRender = function()
	{
		for (var i = 0; i < this.effectsRender.length; i++)
			this.effectsRender[i].Render();
	}
	
	this.FlipScreen = function()
	{
		if (GetTime() > this.startTime + this.frameDelay)
		{
			this.Update();
			//UpdateMapEngine();
			this.startTime = GetTime();
		}
		
		this.Render();
		this.EffectRender();
		FlipScreen();
	}
	
	this.AddRender = function(obj)
	{
		this.thingsToRender.push(obj);
	}
	
	this.RemoveRender = function(obj)
	{
		for (var i = 0; i < this.thingsToRender.length; i++)
		{
			if (this.thingsToRender[i] == obj)
			{
				this.thingsToRender.splice(i, 1);
			}	
		}
		
		obj.done = false;
	}
	
	this.AddEffect = function(effect)
	{
		this.effectsRender.push(effect);
	}
	
	this.RemoveEffect = function(effect)
	{
		for (var i = 0; i < this.effectsRender.length; i++)
		{
			if (this.effectsRender[i] == effect)
			{
				this.effectsRender.splice(i, 1);
			}	
		}
		
		effect.done = false;
	}
	
	this.AddInput = function(obj)
	{
		this.inputs.push(obj);
	}
	
	this.RemoveInput = function(obj)
	{
		for (var i = 0; i < this.inputs.length; i++)
		{
			if (this.inputs[i] == obj)
			{
				this.inputs.splice(i, 1);
			}	
		}
	}
	
	this.HasInput = function(obj)
	{
		return this.inputs[this.inputs.length - 1] == obj;
	}
	
	this.GiveEffectFocus = function(effect)
	{
		this.AddEffect(effect);
		this.AddInput(effect);
		
		while (!effect.done)
			this.FlipScreen();
			
		this.RemoveEffect(effect);
		this.RemoveInput(effect);
		effect.done = false;
	}
	
	this.GiveFocus = function (obj)
	{
		this.AddRender(obj);
		//this.AddInput(obj);
		
		if (obj instanceof Menu)
		{
			if (!obj.initialized)
				obj.Init();
		}
		
		while (!obj.done)
			this.FlipScreen();
			
		//ClearKeyQueue();
		this.RemoveRender(obj);
		//this.RemoveInput(obj);
		obj.done = false;
		
	}
}

var Screen = new Screen();