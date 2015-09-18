RequireScript("Timer.js");

function Level(title, password, number, width, height, timeLimit, cookies)
{
	this.title     		 = title;
	this.password  		 = password;
	this.number    		 = number;
	this.width     		 = width;
	this.height    		 = height;
	this.timeLimit 		 = timeLimit;
	this.cookies   		 = cookies;
	this.timeLeft        = timeLimit;
	this.font            = LoadFont("hooge.rfn");
	this.fontHelp        = GetSystemFont();
	this.blueKey    	 = 0;
	this.redKey     	 = 0;
	this.yellowKey     	 = 0;
	this.greenKey   	 = 0;
	this.hasFlippers     = false;
	this.hasFireBoots    = false;
	this.hasSuctionBoots = false;
	this.hasIceSkates    = false;
	this.onHelp          = false;
	this.helpString      = "abcasdfasdfasdfasdfasdfsfd";
	this.startPos   	 = false;  // Has the start posistion been found
	this.timer      	 = new Timer();
	this.tries      	 = 0;
	this.score      	 = 0;
	
	// Level Editor Vars
	this.tiles           = new Array();
	this.tile            = new Tile("Floor", 0);
	this.tileSecondary   = new Tile("Floor", 0);
	this.onMouseOver     = "";
	this.mouseX          = 0;
	this.mouseY          = 0;
	
	// Methods
	
	// Public Methods
	this.showPreImage = function()
	{
		var startLevel = false;
	
		while (!startLevel)
		{
			RenderMap();
			// Blit TextBox Containing name and password(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
			FlipScreen();
			
			while(AreKeysLeft())
			{
				GetKey();
				startLevel = true;
			}
		}
		
		this.timer.start();
	}

	this.start = function()
	{
		if (!IsMapEngineRunning())
		{
			BindKey(KEY_LEFT,   "moveLeft()",   "release()");	
			BindKey(KEY_RIGHT,  "moveRight()",  "release()");
			BindKey(KEY_DOWN,   "moveDown()",   "release()");
			BindKey(KEY_UP,     "moveUp()",     "release()");
			BindKey(KEY_ESCAPE, "g_level.inGameMenu()", "release()");
			CreatePerson("Chubbo", "Chubbo.rss", false);
			SetTalkActivationKey (KEY_ENTER);
			SetPersonSpeed("Chubbo", 32);
			SetRenderScript("theRenderScript()");
			SetUpdateScript("theUpdateScript()");
			MapEngine("map.rmp", 60);
		}
		else
			ChangeMap("map.rmp");
	}
	
	this.startEditor = function()
	{
		if (!IsMapEngineRunning())
		{
			createTiles();
			g_levelEditor = LoadImage("LevelEditor.png");
			SetMousePosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
			BindKey(KEY_LEFT,   "editorLeft()",   "release()");	
			BindKey(KEY_RIGHT,  "editorRight()",  "release()");
			BindKey(KEY_DOWN,   "editorDown()",   "release()");
			BindKey(KEY_UP,     "editorUp()",     "release()");
			BindKey(KEY_ESCAPE, "g_level.inGameMenu()", "release()");
			//CreatePerson("Chubbo", "Chubbo.rss", false);
			//SetTalkActivationKey (KEY_ENTER);
			//SetPersonSpeed("Chubbo", 32);
			SetRenderScript("theEditorRenderScript()");
			SetUpdateScript("theEditorUpdateScript()");
			MapEngine("editor.rmp", 60);
		}
	}
	
	this.loadMapFromFile = function(file)
	{
		var lvl = OpenFile(file);
		this.width = lvl.read("width", 10);
		this.height = lvl.read("height", 10);
		var defaultString = "";
		var row = "";
		var tile = 0;
		var y = 0;  // Y value in the map and key value of file
		
		for (var i = 0; i < this.width; i++)
			defaultString += ".";
		
		for (var x = 0; x < this.width; x++)
		{
			row = lvl.read(y, defaultString);
			tile = convertNameToTile(row.charAt(x));
			
			// Check for start posistion
			if (this.startPos)
			{
				SetPersonX("Chubbo", x * 32 + 15);
				SetPersonY("Chubbo", y * 32 + 15);
				SetPersonDirection("Chubbo", "South");
				this.startPos = false;
			}
			
			SetTile(x, y, g_mainLayer, tile);
			
			if (x == this.width - 1)
			{
				x = -1;
				
				if (y < this.height - 1)
					y++;
				else
				{
					// Show error message if file contains erroneus tiles
					this.time = lvl.read("time", 200);
					this.cookies = lvl.read("cookies", 10);
					lvl.close();
					return;
				}
			}
		}
	}
	
	this.saveMapToFile = function(file)
	{
		var lvl = OpenFile(file + ".txt");
		var tile = "";
		stringValue = "";
		
		for (var y = 0; y < 100; y++)
		{
			for (var x = 0; x < 100; x++)
			{
				stringValue += convertTileToName(GetTile(x, y, g_mainLayer));
			}
			
			lvl.write(y, stringValue);
			stringValue = "";
		}
		
		lvl.write("width", 100);
		lvl.write("height", 100);
		lvl.write("time", this.timeLimit);
		lvl.write("cookies", this.cookies);
		lvl.flush();
		lvl.close();
	}
	
	this.finish = function()
	{
		g_level.figureScore();
		g_currentLevel++;
		
		if (defaultLevels)
			this.loadMapFromFile(this.getLevelName(g_currentLevel) + ".txt");
		else
			exitToMainMenu();
	}
	
	this.restart = function()
	{
		this.timeLeft = this.timeLimit;
		this.tries++;
		g_level.start(g_currentLevel);
	}
	
	this.decrementCookies = function()
	{
		this.cookies--;
	}
	
	this.inGameMenu = function()
	{
		var menu = new Menu("window.rws", "Arrow.png");
		//menu.addItem("Resume Level", );
		menu.addItem("Restart Level", this.restart);
		//menu.addItem("Help", );
		menu.addItem("Quit", exitToMainMenu);
		
		menu.execute(20, 20);
	}
	
	this.getLevelName = function(number)
	{
		return levels[number - 1].name;
	}
	
	this.figureScore = function()
	{
		var timeBonus = 0;
		var tryBonus = 0;
		
		//timeBonus = 
	}
	
	// Private Methods

	function createTiles()
	{
		this.tiles = new Array();
		this.tiles["Floor"]         = new Tile("Floor", 0);
		this.tiles["Wall"]          = new Tile("Wall", 1);
		this.tiles["Water"]         = new Tile("Water", 2);
		this.tiles["Fire"]          = new Tile("Fire", 4);
		this.tiles["IceTL"]         = new Tile("Ice TopLeft", 5);
		this.tiles["IceBL"]         = new Tile("Ice Bottom Left", 6);
		this.tiles["Ice"]           = new Tile("Ice", 7);
		this.tiles["IceTR"]         = new Tile("Ice TopRight", 8);
		this.tiles["IceBR"]         = new Tile("Ice BottomRight", 9);
		this.tiles["YellowKey"]     = new Tile("Yellow Key", 10);
		this.tiles["RedKey"]        = new Tile("Red Key", 11);
		this.tiles["BlueKey"]       = new Tile("Blue Key", 12);
		this.tiles["GreenKey"]      = new Tile("Green Key", 13);
		this.tiles["YellowLock"]    = new Tile("Yellow Lock", 14);
		this.tiles["RedLock"]       = new Tile("Red Lock", 15);
		this.tiles["BlueLock"]      = new Tile("Blue Lock", 16);
		this.tiles["GreenLock"]     = new Tile("Green Lock", 17);
		this.tiles["CookieLock"]    = new Tile("Cookie Lock", 18);
		this.tiles["Cookie"]        = new Tile("Cookie", 19);
		this.tiles["SuctionBoot"]   = new Tile("Suction Boots", 20);
		this.tiles["IceSkate"]      = new Tile("Ice Skates", 21);
		this.tiles["FireBoot"]      = new Tile("Fire Boots", 22);
		this.tiles["Flipper"]       = new Tile("Flippers", 23);
		this.tiles["Portal"]        = new Tile("Portal", 24);
		this.tiles["Hint"]          = new Tile("Hint", 26);
		this.tiles["MovableBlock"]  = new Tile("Movable Block", 27);
		this.tiles["ForceUp"]       = new Tile("Force Up", 28);
		this.tiles["ForceRight"]    = new Tile("Force Right", 29);
		this.tiles["ForceLeft"]     = new Tile("Force Left", 30);
		this.tiles["ForceDown"]     = new Tile("Force Down", 31);
		this.tiles["Mud"]           = new Tile("Mud", 32);
		this.tiles["FakeWall"]      = new Tile("Fake Wall", 33);
		this.tiles["FakeWallB"]     = new Tile("Fake Wall B", 34);
		this.tiles["ToggleWallOn"]  = new Tile("Toggle Wall On", 35);
		this.tiles["ToggleWallOff"] = new Tile("Toggle Wall Off", 36);
		this.tiles["ToggleWallBtn"] = new Tile("Toggle Wall Btn", 37);
		
		this.tile = this.tiles["Floor"];
		this.tileSecondary = this.tiles["Floor"];
	}
	
	function convertNameToTile(name)
	{
		switch (name)
		{
			case "1":      // Wall
				return 1;
			case "2":      // Water
				return 2;
			case "3":      // Splash
				return 3;
			case "4":      // Fire
				return 4;
			case "5":      // Ice_TopLeft
				return 5;
			case "6":      // Ice_BottomLeft
				return 6;
			case "7":      // Ice
				return 7;
			case "8":      // Ice_TopRight
				return 8;
			case "9":      // Ice_BottomRight
				return 9;
			case "q":      // Key_Yellow
				return 10;
			case "w":      // Key_Red
				return 11;
			case "e":      // Key_Blue
				return 12;
			case "r":      // Key_Green
				return 13;
			case "t":      // Lock_Yellow
				return 14;
			case "y":      // Lock_Red
				return 15;
			case "u":      // Lock_Blue
				return 16;
			case "i":      // Lock_Green
				return 17;
			case "o":      // Cookie Lock
				return 18;
			case "p":      // Cookie
				return 19;
			case "[":      // Suction Boot
				return 20;
			case "]":      // Ice Skate
				return 21;
			case "a":      // Fire Boot
				return 22;
			case "s":      // Flippers
				return 23;
			case "d":      // Portal1
				return 24;
			case "f":      // Portal2
				return 25;
			case "g":      // Help
				return 26;
			case "h":      // Movable Block
				return 27;
			case "j":      // Force_Up
				return 28;
			case "k":      // Force_Right
				return 29;
			case "l":      // Force_Left
				return 30;
			case "z":      // Force_Down
				return 31;
			case "x":      // Mud
				return 32;
			case "c":      // Fake_Wall
				return 33;
			case "v":      // Fake_Wall_Breakable
				return 34;
			case "b":      // Toggle_Wall On
				return 35;
			case "n":      // Toggle_Wall Off
				return 36;
			case "m":      // Toggle_Wall Button
				return 37;
			case ",":      // Transparent
				return 38;
			case "!":      // Start Posistion
			{
				this.startPos = true;
				return 0;
			}
			default:
				return 0;
		}
	}
	
	function convertTileToName(tile)
	{
		switch (tile)
		{
			case 1:      // Wall
				return "1";
			case 2:      // Water
				return "2";
			case 3:      // Splash
				return "3";
			case 4:      // Fire
				return "4";
			case 5:      // Ice_TopLeft
				return "5";
			case 6:      // Ice_BottomLeft
				return "6";
			case 7:      // Ice
				return "7";
			case 8:      // Ice_TopRight
				return "8";
			case 9:      // Ice_BottomRight
				return "9";
			case 10:      // Key_Yellow
				return "q";
			case 11:      // Key_Red
				return "w";
			case 12:      // Key_Blue
				return "e";
			case 13:      // Key_Green
				return "r";
			case 14:      // Lock_Yellow
				return "t";
			case 15:      // Lock_Red
				return "y";
			case 16:      // Lock_Blue
				return "u";
			case 17:      // Lock_Green
				return "i";
			case 18:      // Cookie Lock
				return "o";
			case 19:      // Cookie
				return "p";
			case 20:      // Suction Boot
				return "[";
			case 21:      // Ice Skate
				return "]";
			case 22:      // Fire Boot
				return "a";
			case 23:      // Flippers
				return "s";
			case 24:      // Portal1
				return "d";
			case 25:      // Portal2
				return "f";
			case 26:      // Help
				return "g";
			case 27:      // Movable Block
				return "h";
			case 28:      // Force_Up
				return "j";
			case 29:      // Force_Right
				return "k";
			case 30:      // Force_Left
				return "l";
			case 31:      // Force_Down
				return "z";
			case 32:      // Mud
				return "x";
			case 33:      // Fake_Wall
				return "c";
			case 34:      // Fake_Wall_Breakable
				return "v";
			case 35:      // Toggle_Wall On
				return "b";
			case 36:      // Toggle_Wall Off
				return "n";
			case 37:      // Toggle_Wall Button
				return "m";
			case 38:      // Transparent
				return ",";
			case "!":      // Start Posistion
			{
				//this.startPos = true;
				//return 0;
			}
			default:
				return ".";
		}
	}
}

function theRenderScript()
{
	Rectangle(320, 0, SCREEN_WIDTH - 320, SCREEN_HEIGHT, CreateColor(0, 0, 0, 255));
	Rectangle(0, 320, SCREEN_WIDTH, 320, CreateColor(0, 0, 0, 255));
	
	// Blit Menu Background on the Right of the Screen
	g_MenuPicture.blit(SCREEN_WIDTH - g_MenuPictureW, 0);
	
	// Draw Current Level, Time Left, Cookies Left
	g_level.font.setColorMask(c_white);
	g_level.font.drawText(SCREEN_WIDTH - (36 + g_level.font.getStringWidth(g_currentLevel)), 25, g_currentLevel);
	
	if (g_level.timeLeft < 10)
		g_level.font.setColorMask(c_red);
	g_level.font.drawText(SCREEN_WIDTH - 52, 92, parseInt(g_level.timeLeft % 10));
	g_level.font.drawText(SCREEN_WIDTH - 70, 92, parseInt((g_level.timeLeft % 100) / 10));
	g_level.font.drawText(SCREEN_WIDTH - 88, 92, Math.floor(g_level.timeLeft / 100));
	
	if (!g_level.onHelp)
	{
		if (g_level.cookies < 1)
			g_level.font.setColorMask(c_grey);
		else
			g_level.font.setColorMask(c_white);
		g_level.font.drawText(SCREEN_WIDTH - (36 + g_level.font.getStringWidth(g_level.cookies)), 186, g_level.cookies);
	}
	else
	{
		Rectangle(SCREEN_WIDTH - 111, 119, 93, 104, c_grey);
		Rectangle(SCREEN_WIDTH - 109, 121, 89, 100, c_black);
		g_level.fontHelp.setColorMask(c_blue);
		g_level.fontHelp.drawTextBox(SCREEN_WIDTH - 107, 123, 87, 100, 3, ":Tip:\n" + g_level.helpString);
	}
	
	//GetSystemFont().drawText(10, 30, g_level.timer.getSeconds());
	//GetSystemFont().drawText(30, 30, GetPersonY("Chubbo") - 15);
	//GetSystemFont().drawText(10, 50, test3);
	
}

function theUpdateScript()
{	
	SetCameraX(GetPersonX("Chubbo") + 160);
	SetCameraY(GetPersonY("Chubbo") + 128);
	
	if (g_level.timer.getSeconds() >= 1 && g_level.timeLeft > 0)
	{
		g_level.timeLeft--;
		g_level.timer = new Timer();
		g_level.timer.start();
	}
	
	else if (g_level.timeLeft <= 0)
	{
		message("You ran out of time!", false);
		level.restart();
	}
}

function theEditorRenderScript()
{
	this.mouseX = GetMouseX();
	this.mouseY = GetMouseY();
	g_levelEditor.blit(0, 0);
	
	// Draw current tile square box
	if (this.mouseX <= 448 && this.mouseY <= 448)
	{
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32),      c_pink);
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32)     , this.mouseY - (this.mouseY % 32) + 31, c_pink);
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32) + 31, this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32) + 31, c_pink);
		Line(this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32) + 31, c_pink);
	}
	
	// Draw current tile selection box
	else if (this.mouseX >= 480 && this.mouseX <= 607 && this.mouseY >= 96 && this.mouseY <= 383)
	{
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32),      c_pink);
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32)     , this.mouseY - (this.mouseY % 32) + 31, c_pink);
		Line(this.mouseX - (this.mouseX % 32),      this.mouseY - (this.mouseY % 32) + 31, this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32) + 31, c_pink);
		Line(this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32),      this.mouseX - (this.mouseX % 32) + 31, this.mouseY - (this.mouseY % 32) + 31, c_pink);
	}
	
	// Draw mouseOvers on option buttons
	else if (this.mouseX >= 484 && this.mouseX < 529 && this.mouseY >= 5 && this.mouseY <= 18)
		g_EditorButtonHover.blit(484, 5);
		
	else if (this.mouseX >= 529 && this.mouseX < 574 && this.mouseY >= 5 && this.mouseY <= 18)
		g_EditorButtonHover.blit(529, 5);
	
		// Clear
	else if (this.mouseX >= 574 && this.mouseX < 619 && this.mouseY >= 5 && this.mouseY <= 18)
		g_EditorButtonHover.blit(574, 5);
	
		// Load
	else if (this.mouseX >= 484 && this.mouseX < 529 && this.mouseY >= 18 && this.mouseY <= 31)
		g_EditorButtonHover.blit(484, 18);
	
		// Options
	else if (this.mouseX >= 529 && this.mouseX < 574 && this.mouseY >= 18 && this.mouseY <= 31)
		g_EditorButtonHover.blit(529, 18);
	
		// Quit
	else if (this.mouseX >= 574 && this.mouseX < 619 && this.mouseY >= 18 && this.mouseY <= 31)
		g_EditorButtonHover.blit(574, 18);
	
	// Draw mouse
	Rectangle(this.mouseX, this.mouseY, 10, 10, c_green);
	
	// Draw current tile selection
	GetSystemFont().drawText(510, 41, this.tile.name);		
}

function theEditorUpdateScript()
{
	this.mouseX = GetMouseX();
	this.mouseY = GetMouseY();
	
	if (IsMouseButtonPressed(MOUSE_LEFT))
	{
		// Current tile square
		if (this.mouseX <= 448 && this.mouseY <= 448)
		{
			SetTile((this.mouseX - (this.mouseX % 32)) / 32, (this.mouseY - (this.mouseY % 32)) / 32, g_mainLayer, this.tile.number);
		}
		
		// Current tile selection
		else if (this.mouseX >= 480 && this.mouseX <= 607 && this.mouseY >= 96 && this.mouseY <= 383)
		{
			tileX = this.mouseX - (this.mouseX % 32);
			tileY = this.mouseY - (this.mouseY % 32);
			
			switch (tileY)
			{
				case 96:
				{
					if (tileX == 480)
						this.tile = this.tiles["Floor"];
					else if (tileX == 512)
						this.tile = this.tiles["Wall"]; // Wall
					else if (tileX == 544)
						this.tile = this.tiles["Water"]; // Water
					else if (tileX == 576)
						this.tile = this.tiles["Fire"]; // Fire
					break;
				}
				case 128:
				{
					if (tileX == 480)
						this.tile = this.tiles["BlueLock"]; // Blue_lock
					else if (tileX == 512)
						this.tile = this.tiles["GreenLock"]; // Green_lock
					else if (tileX == 544)
						this.tile = this.tiles["YellowLock"]; // Yellow_lock
					else if (tileX == 576)
						this.tile = this.tiles["RedLock"]; // Red_lock
					break;
				}
				case 160:
				{
					if (tileX == 480)
						this.tile = this.tiles["GreenKey"]; // Green_key
					else if (tileX == 512)
						this.tile = this.tiles["YellowKey"]; // Yellow_key
					else if (tileX == 544)
						this.tile = this.tiles["RedKey"]; // Red_key
					else if (tileX == 576)
						this.tile = this.tiles["BlueKey"]; // Blue_key
					break;
				}
				case 192:
				{
					if (tileX == 480)
						this.tile = this.tiles["Flipper"]; // Flipper
					else if (tileX == 512)
						this.tile = this.tiles["SuctionBoot"]; // Suction Boot
					else if (tileX == 544)
						this.tile = this.tiles["IceSkate"]; // Ice Skate
					else if (tileX == 576)
						this.tile = this.tiles["FireBoot"]; // Fire Boot
					break;
				}
				case 224:
				{
					if (tileX == 480)
						this.tile = this.tiles["ForceUp"]; // Force_up
					else if (tileX == 512)
						this.tile = this.tiles["ForceRight"]; // Force_right
					else if (tileX == 544)
						this.tile = this.tiles["ForceLeft"]; // Force_left
					else if (tileX == 576)
						this.tile = this.tiles["ForceDown"]; // Force_down
					break;
				}
				case 256:
				{
					if (tileX == 480)
						this.tile = this.tiles["Hint"]; // Help
					else if (tileX == 512)
						this.tile = this.tiles["MovableBlock"]; // Movable Block
					else if (tileX == 544)
						this.tile = this.tiles["Mud"]; // Mud
					else if (tileX == 576)
						this.tile = this.tiles["IceTL"]; // Ice_TopLeft
					break;
				}
				case 288:
				{
					if (tileX == 480)
						this.tile = this.tiles["IceBL"]; // Ice_BottomLeft
					else if (tileX == 512)
						this.tile = this.tiles["Ice"]; // Ice
					else if (tileX == 544)
						this.tile = this.tiles["IceTR"]; // Ice_TopRight
					else if (tileX == 576)
						this.tile = this.tiles["IceBR"]; // Ice_BottomRight
					break;
				}
				case 320:
				{
					if (tileX == 480)
						this.tile = this.tiles["FakeWallB"]; // Fake_Wall_Breakable
					else if (tileX == 512)
						this.tile = this.tiles["FakeWall"]; // Fake_Wall
					else if (tileX == 544)
						this.tile = this.tiles["ToggleWallOff"]; // Toggle_Wall Off
					else if (tileX == 576)
						this.tile = this.tiles["ToggleWallBtn"]; // Toggle_Wall Button
					break;
				}
				case 352:
				{
					if (tileX == 480)
						this.tile = this.tiles["Portal"]; // Portal
					else if (tileX == 512)
						this.tile = this.tiles["CookieLock"]; // Cookie_Lock
					else if (tileX == 544)
						this.tile = this.tiles["Cookie"]; // Cookie
					else if (tileX == 576)
						this.tile = this.tiles["ToggleWallOn"]; // Toggle_Wall On
					break;
				}
			}
		}
		
		//  Option Buttons
			// Save
		else if (this.mouseX >= 484 && this.mouseX <= 529 && this.mouseY >= 5 && this.mouseY <= 18)
		{
			optionButton("Save");
		}
		
			// Test
		else if (this.mouseX >= 530 && this.mouseX <= 574 && this.mouseY >= 5 && this.mouseY <= 18)
		{
			optionButton("Test");
		}
		
			// Clear
		else if (this.mouseX >= 575 && this.mouseX <= 619 && this.mouseY >= 5 && this.mouseY <= 18)
		{
			optionButton("Clear");
		}
		
			// Load
		else if (this.mouseX >= 484 && this.mouseX <= 529 && this.mouseY >= 18 && this.mouseY <= 31)
		{
			optionButton("Load");
		}
		
			// Options
		else if (this.mouseX >= 530 && this.mouseX <= 574 && this.mouseY >= 18 && this.mouseY <= 31)
		{
			optionButton("Options");
		}
		
			// Quit
		else if (this.mouseX >= 575 && this.mouseX <= 619 && this.mouseY >= 18 && this.mouseY <= 31)
		{
			optionButton("Quit");
		}
	}
	
	else if (IsMouseButtonPressed(MOUSE_RIGHT))
	{
		// Current tile square
		if (this.mouseX <= 448 && this.mouseY <= 448)
			SetTile((this.mouseX - (this.mouseX % 32)) / 32, (this.mouseY - (this.mouseY % 32)) / 32, g_mainLayer, this.tileSecondary.number);
		
		// Current tile selection
		else if (this.mouseX >= 480 && this.mouseX <= 607 && this.mouseY >= 96 && this.mouseY <= 383)
		{
			tileX = this.mouseX - (this.mouseX % 32);
			tileY = this.mouseY - (this.mouseY % 32);
			
			switch (tileY)
			{
				case 96:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["Floor"];
					else if (tileX == 512)
						this.tileSecondary = this.tiles["Wall"]; // Wall
					else if (tileX == 544)
						this.tileSecondary = this.tiles["Water"]; // Water
					else if (tileX == 576)
						this.tileSecondary = this.tiles["Fire"]; // Fire
					break;
				}
				case 128:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["BlueLock"]; // Blue_lock
					else if (tileX == 512)
						this.tileSecondary = this.tiles["GreenLock"]; // Green_lock
					else if (tileX == 544)
						this.tileSecondary = this.tiles["YellowLock"]; // Yellow_lock
					else if (tileX == 576)
						this.tileSecondary = this.tiles["RedLock"]; // Red_lock
					break;
				}
				case 160:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["GreenKey"]; // Green_key
					else if (tileX == 512)
						this.tileSecondary = this.tiles["YellowKey"]; // Yellow_key
					else if (tileX == 544)
						this.tileSecondary = this.tiles["RedKey"]; // Red_key
					else if (tileX == 576)
						this.tileSecondary = this.tiles["BlueKey"]; // Blue_key
					break;
				}
				case 192:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["Flipper"]; // Flipper
					else if (tileX == 512)
						this.tileSecondary = this.tiles["SuctionBoot"]; // Suction Boot
					else if (tileX == 544)
						this.tileSecondary = this.tiles["IceSkate"]; // Ice Skate
					else if (tileX == 576)
						this.tileSecondary = this.tiles["FireBoot"]; // Fire Boot
					break;
				}
				case 224:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["ForceUp"]; // Force_up
					else if (tileX == 512)
						this.tileSecondary = this.tiles["ForceRight"]; // Force_right
					else if (tileX == 544)
						this.tileSecondary = this.tiles["ForceLeft"]; // Force_left
					else if (tileX == 576)
						this.tileSecondary = this.tiles["ForceDown"]; // Force_down
					break;
				}
				case 256:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["Hint"]; // Help
					else if (tileX == 512)
						this.tileSecondary = this.tiles["MovableBlock"]; // Movable Block
					else if (tileX == 544)
						this.tileSecondary = this.tiles["Mud"]; // Mud
					else if (tileX == 576)
						this.tileSecondary = this.tiles["IceTL"]; // Ice_TopLeft
					break;
				}
				case 288:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["IceBL"]; // Ice_BottomLeft
					else if (tileX == 512)
						this.tileSecondary = this.tiles["Ice"]; // Ice
					else if (tileX == 544)
						this.tileSecondary = this.tiles["IceTR"]; // Ice_TopRight
					else if (tileX == 576)
						this.tileSecondary = this.tiles["IceBR"]; // Ice_BottomRight
					break;
				}
				case 320:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["FakeWallB"]; // Fake_Wall_Breakable
					else if (tileX == 512)
						this.tileSecondary = this.tiles["FakeWall"]; // Fake_Wall
					else if (tileX == 544)
						this.tileSecondary = this.tiles["ToggleWallOff"]; // Toggle_Wall Off
					else if (tileX == 576)
						this.tileSecondary = this.tiles["ToggleWallBtn"]; // Toggle_Wall Button
					break;
				}
				case 352:
				{
					if (tileX == 480)
						this.tileSecondary = this.tiles["Portal"]; // Portal
					else if (tileX == 512)
						this.tileSecondary = this.tiles["CookieLock"]; // Cookie_Lock
					else if (tileX == 544)
						this.tileSecondary = this.tiles["Cookie"]; // Cookie
					else if (tileX == 576)
						this.tileSecondary = this.tiles["ToggleWallOn"]; // Toggle_Wall On
					break;
				}
			}
		}
	}
	
	else if (IsMouseButtonPressed(MOUSE_MIDDLE))
	{
		if (this.mouseX <= 488 && this.mouseY <= 448)
			SetTile((this.mouseX - (this.mouseX % 32)) / 32, (this.mouseY - (this.mouseY % 32)) / 32, g_mainLayer, 0);
	}
}

function optionButton(action)
{
	switch (action)
	{
		case "Save":
		{
			g_level.saveMapToFile("test");
			break;
		}
		
		case "Test":
		{
			
			break;
		}
		
		case "Clear":
		{
			for (var x = 0; x < 100; x++)
			{
				for (var y = 0; y < 100; y++)
					SetTile(x, y, g_mainLayer, 0)
			}
			break;
		}
		
		case "Load":
		{
			
			break;
		}
		
		case "Options":
		{
			
			break;
		}
		
		case "Quit":
		{
			exitToMainMenu();
			break;
		}
	}
}

var levels = new Array();
levels[0] = new Level("Level1", "1234", 1, 20, 20, 220, 10);