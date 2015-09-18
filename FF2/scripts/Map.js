function Map()
{
	this.BattleBg = null;
	var inputPerson = null;
	var stepsToMove = 0;
	
	this.GoTo = function(map)
	{
		if (IsMapEngineRunning())
			ChangeMap(map);
		else
			MapEngine(map, 60);
	}
	
	this.AttachInput = function(person)
	{
		inputPerson = person;
		AttachInput(person);
		SetPersonFrameRevert(person, 1)
	}
	
	this.DetachInput = function()
	{
		if (inputPerson != null)
			DetachInput();
	}
	
	this.UpdateMovement = function()
	{
		if (inputPerson != null)
		{
			var tileWidth = GetTileWidth();
			var x = GetPersonX(inputPerson);
			var y = GetPersonY(inputPerson);
			
			// Run key is pressed
			if (IsKeyPressed(Keys.Cancel))
			{
				/*
					TODO: Change to running sprite
				*/
				SetPersonSpeed(inputPerson, 2);
			}
			else
			{
				/*
					TODO: Change to normal sprite
				*/
				SetPersonSpeed(inputPerson, 1);
			}
		}
	}
}

var Map = new Map();