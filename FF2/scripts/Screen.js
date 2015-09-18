function Screen()
{
	this.thingsToRender = [];
	this.inputs = [];
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