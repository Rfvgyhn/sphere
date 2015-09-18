function Map()
{
	this.battleBg = null;
	var inputPerson = null;
	var stepsToMove = 0;
	//var cmdMove  = null;
	//var cmdFace = null;
	this.jumping = false;	// If person is jumping
	
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
			
			if (!this.jumping)
			{
				var canJumpLedge = CanJumpLedge(x, y, tileWidth, inputPerson);
				
				if (canJumpLedge != "no")
				{
					/*
						TODO: Change to jumping sprite
					*/
					// Don't let user interfere with jumping movement
					DetachInput();
					IgnoreTileObstructions(inputPerson, true);
					this.jumping = true;
					
					switch (canJumpLedge)
					{
						case "right":
							for (var i = 0; i < tileWidth * 2; i++)
								QueuePersonCommand(inputPerson, COMMAND_MOVE_EAST, false);
							break;
						case "left":
							
							break;
						case "down":
							
							break;
						case "up":
							
							break;
					}
				}
			}
			else if (IsCommandQueueEmpty(inputPerson))
			{
				this.jumping = false;
				this.AttachInput(inputPerson);
				IgnoreTileObstructions(inputPerson, false);
			}
		}
	}
	
	function CanJumpLedge(x, y, tileWidth, inputPerson)
	{
		var layer = GetPersonLayer(inputPerson);
		
		// Check right
		if (IsPersonObstructed(inputPerson, x + 1, y))
		{
			//Abort("x = " + GetPersonX(inputPerson) + " Stuff = " + (x - (x % tileWidth) + tileWidth * 2) / tileWidth);
			if (GetTile((x - (x % tileWidth) + tileWidth * 2) / tileWidth, (y - (y % tileWidth)) / tileWidth, layer) > -1 &&
				!IsPersonObstructed(inputPerson, (x - (x % tileWidth) + tileWidth) / tileWidth, (y - (y % tileWidth)) / tileWidth))
				return "right";
		}
		
		// Check left
		if (IsPersonObstructed(inputPerson, x - 1, y))
		{
			if (GetTile((x - (x % tileWidth) - tileWidth) / tileWidth, (y - (y % tileWidth)) / tileWidth, layer) > -1 &&
				!IsPersonObstructed(inputPerson, (x - (x % tileWidth) - tileWidth) / tileWidth, (y - (y % tileWidth)) / tileWidth))
				return "left";
		}
		
		// Check down
		if (IsPersonObstructed(inputPerson, x, y + 1))
		{
			if (GetTile((x - x % tileWidth) / tileWidth, (y - (y % tileWidth) + tileWidth) / tileWidth, layer) > -1 &&
				!IsPersonObstructed(inputPerson, (x - x % tileWidth) / tileWidth, (y - (y % tileWidth) + tileWidth) / tileWidth))
				return "down";
		}
		
		// Check up
		if (IsPersonObstructed(inputPerson, x, y - 1))
		{
			if (GetTile((x - x % tileWidth) / tileWidth, (y - (y % tileWidth) - tileWidth) / tileWidth, layer) > -1 &&
				!IsPersonObstructed(inputPerson, (x - x % tileWidth) / tileWidth, (y - (y % tileWidth) - tileWidth) / tileWidth))
				return "up";
		}
		
		return "no";
	}
}

var Map = new Map();