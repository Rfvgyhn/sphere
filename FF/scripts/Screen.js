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
		if (this.inputs.length > 0)
		{
			if (!this.blockInput)
			{
				while (AreKeysLeft())
					this.inputs[this.inputs.length - 1].DoKey(GetKey());
			}
			else
				ClearKeyQueue();
		}
		else
			Map.UpdateMovement();
		
		for (var i = 0; i < this.thingsToRender.length; i++)
			this.thingsToRender[i].Update();
			
		for (var i = 0; i < this.effectsRender.length; i++)
			this.effectsRender[i].Update();
	}
	
	this.Render = function()
	{
		if (IsMapEngineRunning())
			RenderMap();
		
		for (var i = 0; i < this.thingsToRender.length; i++)
		{				
			this.thingsToRender[i].Render();	
		}
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
			
			if (IsMapEngineRunning())
				UpdateMapEngine();
				
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
		
		obj.Done = false;
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
		
		effect.Done = false;
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
		
		while (!effect.Done)
			this.FlipScreen();
			
		this.RemoveEffect(effect);
		this.RemoveInput(effect);
		effect.Done = false;
	}
	
	this.GiveFocus = function (obj)
	{
		this.AddRender(obj);
		this.AddInput(obj);

		if (obj.Initialize != undefined)
		{
			if (!obj.Initialized)
				obj.Initialize();
		}
		
		while (!obj.Done)
			this.FlipScreen();
			
		ClearKeyQueue();
		this.RemoveRender(obj);
		this.RemoveInput(obj);
		//obj.initialized = false;
		obj.Done = false;
		
	}
	
	this.RemoveAll = function()
	{
		this.thingsToRender = new Array();
		this.effectsRender = new Array();
		this.inputs = new Array();
	}
}

var Screen = new Screen();