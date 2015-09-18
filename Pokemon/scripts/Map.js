function Map()
{
	this.battleBg = null;
	var inputPerson = null;
	var stepsToMove = 0;
	var cmdMove  = null;
	var cmdFace = null;
	var ledge = false;	// If on tile south of current posistion is a ledge
	
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
				
			// Queue command
			if (stepsToMove > 0)
			{
				QueuePersonCommand(inputPerson, cmdMove, true);
				stepsToMove -= GetPersonSpeedX(inputPerson);
				
				if (stepsToMove == 0)
				{	
					if (IsIgnoringTileObstructions(inputPerson))
						IgnoreTileObstructions(inputPerson, false);
						
					AttachInput(inputPerson);
				}
			}
			// Set command
			else
			{
				cmdFace = null;
				cmdMove = null;
			
				if (IsKeyPressed(Keys.Right))
				{
					if (!IsPersonObstructed(inputPerson, x + tileWidth, y))
						cmdMove = COMMAND_MOVE_EAST;
					
					cmdFace = COMMAND_FACE_EAST;
				}
				else if (IsKeyPressed(Keys.Left))
				{
					if (!IsPersonObstructed(inputPerson, x - tileWidth, y))
						cmdMove = COMMAND_MOVE_WEST;
					
					cmdFace = COMMAND_FACE_WEST;
				}
				else if (IsKeyPressed(Keys.Up))
				{
					if (!IsPersonObstructed(inputPerson, x, y - tileWidth))
						cmdMove = COMMAND_MOVE_NORTH;
					
					cmdFace = COMMAND_FACE_NORTH;
				}
				else if (IsKeyPressed(Keys.Down))
				{
					if (!IsPersonObstructed(inputPerson, x, y + tileWidth))
						cmdMove = COMMAND_MOVE_SOUTH;
					else if (GetTileName(GetTile((x - x % tileWidth) / tileWidth, (y - (y % tileWidth) + tileWidth) / tileWidth, 2)) == "Ledge")
					{
						cmdMove = COMMAND_MOVE_SOUTH;
						ledge = true;
					}
					
					cmdFace = COMMAND_FACE_SOUTH;
				}
				else if (IsKeyPressed(Keys.Start))
					Screen.GiveFocus(menuMain);
				
				// Don't let user interfere with movement
				// Hop over ledge
				if (ledge)
				{
					/*
						TODO: Change to jumping sprite
					*/
					DetachInput();
					stepsToMove = tileWidth * 2;
					IgnoreTileObstructions(inputPerson, true);
					ledge = false;
				}
				else if (cmdMove != null)
				{
					DetachInput();					
					stepsToMove = tileWidth;
				}
				
				if (cmdFace != null)
					QueuePersonCommand(inputPerson, cmdFace, true);
			}
		}
	}
}

var Map = new Map();