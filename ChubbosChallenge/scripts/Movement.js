function checkNewTile(direction)
{
	var face       = "";
	var command    = null;
	
	switch (direction)
	{
		case "left":
		{
			face = "West";
			command = COMMAND_MOVE_WEST;
			break;
		}
		
		case "right":
		{
			face = "East";
			command = COMMAND_MOVE_EAST;
			break;
		}
		
		case "up":
		{
			face = "North";
			command = COMMAND_MOVE_NORTH;
			break;
		}
		
		case "down":
		{
			face = "South";
			command = COMMAND_MOVE_SOUTH;
			break;
		}
	}
	
	var obstructed = isChubboObstructed(face);
	
	SetPersonDirection("Chubbo", face);
	
	if (obstructed < 1)
	{
		//for (var i = 0; i < GetTileHeight() / 4; i++)
		//{
			QueuePersonCommand("Chubbo", command, false);
		//}
		
		QueuePersonScript("Chubbo", "endOfMove()", false);
	}
}

function isChubboObstructed(direction)
{
	var x  = 0;
	var x2 = 0;  // For changing tiles
	var y  = 0;
	var y2 = 0;  // For changing tiles
	
	switch (direction)
	{
		case "West":
		{
			x = GetPersonX("Chubbo") - 15;
			x2 = (x - 32) / 32;
			y = GetPersonY("Chubbo");
			y2 = y / 32;
			break;
		}
		
		case "East":
		{
			x = GetPersonX("Chubbo") - 15 + 32;
			x2 = x / 32;
			y = GetPersonY("Chubbo");
			y2 = y / 32;
			break;
		}
		
		case "North":
		{
			x = GetPersonX("Chubbo");
			x2 = x / 32;
			y = GetPersonY("Chubbo") - 15;
			y2 = (y - 32) / 32;
			break;
		}
		
		case "South":
		{
			x = GetPersonX("Chubbo");
			x2 = x / 32;
			y = GetPersonY("Chubbo") - 15 + 32;
			y2 = y / 32;
			break;
		}
	}
	
	if (IsPersonObstructed("Chubbo", x, y))
	{
		//GetObstructingTile("Chubbo", x, y);
		switch (GetObstructingTile("Chubbo", x, y))
		{
			case 1:  // Wall
			{
				g_soundEesh.play(false);
				break;
			}
			
			case 14:  // Yellow_Lock
			{	
				if (g_level.yellowKey > 0)
				{
					// Play unlock sound
					SetTile(x2, y2, g_mainLayer, 0);
					g_level.yellowKey--;
				}
				else
					return 1;
				break;
			}
			case 15:  // Red_Lock
			{	
				if (g_level.redKey > 0)
				{
					// Play unlock sound
					SetTile(x2, y2, g_mainLayer, 0);
					g_level.redKey--;
				}
				else
					return 1;
				break;
			}
			case 16:  // Blue_Lock
			{	
				if (g_level.blueKey > 0)
				{
					// Play unlock sound
					SetTile(x2, y2, g_mainLayer, 0);
					g_level.blueKey--;
				}
				else
					return 1;
				break;
			}
			case 17:  // Green_Lock
			{	
				if (g_level.greenKey > 0)
				{
					// Play unlock sound
					SetTile(x2, y2, g_mainLayer, 0);
				}
				else
					return 1;
				break;
			}
			case 18:  // Cookie_Lock
			{
				if (g_level.cookies == 0)
				{
					// Play unlock portal sound
					SetTile(x2, y2, g_mainLayer, 0);
				}
				else
					g_soundEesh.play(false);
				break;
			}
			
			case 27:  // Movable Block
			{
				
				break;
			}
			case 33:  // Fake_Wall
			{
				SetTile(x2, y2, g_mainLayer, 1);
				break;
			}
			case 34:  // Fake_Wall Breakable
			{
				SetTile(x2, y2, g_mainLayer, 0);
				break;
			}
		}
	}

	return GetObstructingTile("Chubbo", x, y);
}

function checkCurrentTile()
{
	var x = GetPersonX("Chubbo") / 32;
	var y = GetPersonY("Chubbo") / 32;
	var newTile = GetTile(x, y, g_mainLayer);
	var restart = false;
	
	if (newTile == 26)
		g_level.onHelp = true;
	else
		g_level.onHelp = false;
	
	switch (newTile)
	{
		case 2: // Water
		{
			SetPersonVisible("Chubbo", false);
			SetTile(x, y, g_mainLayer, 3);  // Change tile to splash
			message("Chubbo can't swim without flippers", false);
			restart = true;
			break;
		}
		case 19: // Cookie
		{
			SetTile(x, y, g_mainLayer, 0);
			
			if (g_level.cookies > 0)
				g_level.decrementCookies();
			break;
		}
		case 20: // Force Boot
		{
			SetTile(x, y, g_mainLayer, 0);
			g_level.hasForceBoots = true;
			break;
		}
		case 21: // Ice Skate
		{
			SetTile(x, y, g_mainLayer, 0);
			g_level.hasIceSkates = true;
			break;
		}
		case 22: // Fire Boot
		{
			SetTile(x, y, g_mainLayer, 0);
			g_level.hasFireBoots = true;
			break;
		}
		case 23: // Flippers
		{
			SetTile(x, y, g_mainLayer, 0);
			g_level.hasFlippers = true;
			break;
		}
		case 28: // Force_Up
		{
			moveUp();
			break;
		}
		case 29: // Force_Right
		{
			moveRight();
			break;
		}
		case 30: // Force_Left
		{
			moveLeft();
			break;
		}
		case 31: // Force_Down
		{
			moveDown();
			break;
		}
		case 37:  // Toggle_Wall Button
		{
			var g = 0;
			for (var i = 0; i < level.width; i++)
			{
				if (GetTile(i, g, g_mainLayer) == 36)
					SetTile(i, g, mg_ainLayer, 35);
				else if(GetTile(i, g, g_mainLayer) == 35)
					SetTile(i, g, g_mainLayer, 36);
				
				if (i == level.width - 1)
				{
					i = -1;
					
					if (g < level.height - 1)
						g++;
					else
						break;
				}
			}
			break;
		}
	}
	
	if (restart)
		g_level.restart();
}

function moveLeft() 
{
	if(GetCurrentMap() != "editor.rmp")
	{
		if (IsCommandQueueEmpty("Chubbo"))
		{
			checkNewTile("left");
		}
	}
}

function moveRight() 
{
	if(GetCurrentMap() != "editor.rmp")
	{
		if (IsCommandQueueEmpty("Chubbo"))
		{
			checkNewTile("right");
		}
	}
}

function moveUp() 
{
	if(GetCurrentMap() != "editor.rmp")
	{
		if (IsCommandQueueEmpty("Chubbo"))
		{
			checkNewTile("up");
		}
	}
}

function moveDown() 
{
	if(GetCurrentMap() != "editor.rmp")
	{
		if (IsCommandQueueEmpty("Chubbo"))
		{
			checkNewTile("down");
		}
	}
}

function endOfMove()
{
	checkCurrentTile();
}

///////////////////
// Movement functions for level editor
///////////////////
function editorLeft()
{

}

function editorRight()
{

}

function editorUp()
{

}

function editorDown()
{

}

function release() 
{
  /*if(GetCurrentMap()!="editor.rmp")
  {
    if(ShowInvis==true)
    {
      var x=GetPersonX("chara1")
      var y=GetPersonY("chara1")
      x=x/32;
      y=y/32;
      if(GetTile(x, y, MainLayer)!=48)
      {
        ShowInvis=false;
        HideInvisible();
      }
    }
  }*/
}