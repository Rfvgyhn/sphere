function Menu(soundSelect)
{
	if (this instanceof Menu == false)
		return new Menu();
		
	// default properties
	this.font            = GetSystemFont(); //LoadFont(font);
	this.window_style    = GetSystemWindowStyle();//LoadWindowStyle(window);
	this.arrow           = GetSystemArrow();//LoadImage(arrow);
	this.up_arrow        = GetSystemUpArrow();
	this.down_arrow      = GetSystemDownArrow();
	this.items           = new Array();
	this.vars            = new Object;
	this.selection       = 0;
	this.done            = false;
	this.firstStep       = false;  // First time through execute loop has passed
	
	this.soundSelect     = soundSelect || Globals.menuEffects["Select"];
	this.soundCancel     = Globals.menuEffects["Back"];
	this.soundChange     = Globals.menuEffects["Change"];
	
	this.Initialize      = function() {  }  // Initialize fields
	this.PreRender       = function() {  }  // Background
	this.Render          = function() {  }
	this.PostRender      = function() {  }  // Foreground
	this.KeyUp           = function() {  }
	this.KeyDown         = function() {  }
	this.KeyLeft         = function() {  }
	this.KeyRight        = function() {  }
	this.KeyAccept       = function() {  }
	this.KeyCancel       = function() {  }
	this.KeyGbaL         = function() {  }
	this.KeyGbaR         = function() {  }
}

// Add An Item To The Menu
Menu.prototype.AddItem = function(name, action, color, icon) 
{
	var item = new Object;
	item.name     = name;
	item.Action   = action;// || function () {  };
	item.color    = color || c_white;
	item.icon     = LoadImage(icon);
	this.items[this.items.length] = item;
}

// Execute Menu
Menu.prototype.Execute = function() 
{	
	this.done = false;
	this.firstStep = false;
	this.Initialize();
	
	while (!this.done) 
	{
		this.PreRender();
		this.Render();
		this.PostRender();

		FlipScreen();
		
		this.firstStep = true;
		
		// handle keypresses
		while (AreKeysLeft()) 
		{
			switch (GetKey()) 
			{
				case KEY_Z: 
				{
					this.soundSelect.play(false);
					this.KeyAccept();
					break;
				}
				case KEY_X:
				{
					this.soundCancel.play(false);
					this.KeyCancel();
					break;
				}
				case KEY_A:
				{
					this.KeyGbaL();
					break;
				}
				case KEY_S:
				{
					this.KeyGbaR();
					break;
				}
				case KEY_DOWN: 
				{
					this.soundChange.stop();
					this.soundChange.play(false);
					this.KeyDown();
					break;
				}
				case KEY_UP: 
				{
					this.soundChange.stop();
					this.soundChange.play(false);
					this.KeyUp();
					break;
				}
				case KEY_RIGHT:
				{
					this.soundChange.stop();
					this.soundChange.play(false);
					this.KeyRight();
					break;
				}
				case KEY_LEFT:
				{
					this.soundChange.stop();
					this.soundChange.play(false);
					this.KeyLeft();
					break;
				}
			}
		} // end handle input
	}
}

///////////////////////
///// Intro Menu //////
{
var introMenu = new Menu();
	
	introMenu.Initialize = function()
	{
		this.vars.background = LoadImage("IntroMenuLogo.png");
		this.vars.iconHeight = this.items[0].icon.height;
		this.vars.iconWidth = this.items[0].icon.width;
		this.vars.menuLength = this.items.length * this.vars.iconWidth + 70;  // Plus 70 is width of text window
		this.vars.x = (SCREEN_WIDTH / 2) - (this.vars.menuLength / 2);
		this.vars.y = SCREEN_HEIGHT - this.vars.iconHeight;
		this.vars.timeInterval = 90;
		this.vars.transFactor = 2;
		this.vars.direction = 1;
		this.vars.time = GetTime();
		this.vars.fontPadding = 8;
		
		if (!Globals.bgm.IsPlaying())
		{
			Globals.bgm.SetSound(LoadSound("Music/EmbarkOnAJourney.mp3"));
			Globals.bgm.Play(true);
		}
	}
	
	introMenu.PreRender = function()
	{
		with (this.vars) 
		{
			ApplyColorMask(c_black);
			background.blit((SCREEN_WIDTH / 2) - (background.width / 2), (SCREEN_HEIGHT / 2) - (background.height / 2));
		}
	}
	
	introMenu.Render = function()
	{
		with (this.vars) 
		{
			var xTrans = x + iconWidth * this.selection;
		
			if (GetTime() - time > timeInterval)
			{
				if (transFactor == 1 || transFactor == 2)
					direction *= -1;
				
				transFactor += direction;
				
				time = GetTime();
			}
			
			for (var i = 0; i < this.items.length; i++)
				this.items[i].icon.blit(x + iconWidth * i, y);
			
			WINDOW_STYLE.drawWindow(x + iconWidth * this.items.length + 7, y + 7, 56, 10); // Plus 7s are to make up for window borders being drawn outside width and height
			this.items[this.selection].icon.transformBlit(xTrans - transFactor, y - transFactor, xTrans + iconWidth + transFactor, y - transFactor, xTrans + iconWidth + transFactor, y + iconHeight, xTrans - transFactor, y + iconHeight);
		}
	}
	
	introMenu.PostRender = function()
	{
		with (this.vars)
		{		
			DrawText(x + iconWidth * this.items.length + fontPadding, y + fontPadding, FONT_SYSTEM, c_white, this.items[this.selection].name);
		}
	}
	
	introMenu.KeyRight = function()
	{
		if (this.selection < this.items.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	introMenu.KeyLeft = function()
	{	
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = this.items.length - 1;
	}
	
	introMenu.KeyAccept = function()
	{
		this.items[this.selection].Action();
	}
	
	function IntroMenuNewGame()
	{
		Globals.bgm.FadeOut(50);
		CreatePerson("Isaac", "isaac.rss", false);
		AttachCamera("Isaac");
		AttachInput("Isaac");
		SetTalkActivationKey(KEY_Z);
		//BindKey(KEY_Z, "mainMenu.Execute()", "");
		BindKey(KEY_CTRL, "mainMenu.Execute()", "");
		MapEngine("map1.rmp", 60);
	}
	
	function IntroMenuContinue()
	{
		continueMenu.Execute();
	}

	function IntroMenuErase()
	{
		if (YesNo())
		{
			DrawText(20, 20, FONT_SYSTEM, c_white, "Yes");
		}
		else
			DrawText(20, 20, FONT_SYSTEM, c_white, "No");
			
		FlipScreen();
		GetKey();
	}
	
	function IntroMenuBattle()
	{
		
	}
	
	if (GetFileList().length < 5)
		introMenu.AddItem("New Game", IntroMenuNewGame, c_white, "MenuIcons/NewQuest.gif");
	
	introMenu.AddItem("Continue", IntroMenuContinue, c_white, "MenuIcons/Continue.gif");
	
	if (GetFileList().length < 5)
		introMenu.AddItem("Copy", function() {}, c_white, "MenuIcons/CopyFile.gif");
		
	introMenu.AddItem("Erase",    IntroMenuErase, c_white, "MenuIcons/EraseFile.gif");
	introMenu.AddItem("Battle",   IntroMenuBattle, c_white, "MenuIcons/Battle.gif");
}
/// End Intro Menu ////
///////////////////////

///////////////////////
/// Continue Menu /////
{
var continueMenu = new Menu();
	/*
		Add menu items based on save files
	*/
	continueMenu.Initialize = function()
	{
		this.vars.background   = LoadImage("IntroMenuLogo.png");
		this.vars.timeInterval = 85;
		this.vars.timeInterval2 = 500;
		this.vars.bouncy       = LoadImage("BouncyContinue.png");
		this.vars.yFactor      = 3;
		this.vars.direction    = 1;
		this.vars.rand         = 0;
		this.vars.time         = GetTime();
		this.vars.time2        = GetTime();
		this.vars.fileList     = GetFileList();
		this.vars.length       = this.vars.fileList.length;
		this.vars.files        = new Array();
		this.vars.menuStrings  = new Array();
		this.vars.sprites      = new Array();
		this.vars.image        = 3;
		
		for (var i = 0; i < this.vars.length; i++)
		{
			this.vars.menuStrings[i] = new Array();
			this.vars.sprites[i] = new Array();
		}
		
		for (var i = 0; i < this.vars.length; i++)
		{
			this.vars.files = OpenFile(this.vars.fileList[i]);
			var keyCount = this.vars.files.getNumKeys();
						
			this.vars.menuStrings[i]["name"]     = this.vars.files.read("player0Name", "");
			this.vars.menuStrings[i]["class"]    = this.vars.files.read("player0Class", "");
			this.vars.menuStrings[i]["level"]    = this.vars.files.read("player0Level", "");
			this.vars.menuStrings[i]["time"]     = this.vars.files.read("", "Time");
			this.vars.menuStrings[i]["coins"]    = this.vars.files.read("coins", "");
			this.vars.menuStrings[i]["location"] = this.vars.files.read("location", "");
			
			this.vars.sprites[i][0] = LoadSpriteset(this.vars.files.read("player0Sprite", "noSprite.rss"));
			this.vars.sprites[i][1] = LoadSpriteset(this.vars.files.read("player1Sprite", "noSprite.rss"));
			this.vars.sprites[i][2] = LoadSpriteset(this.vars.files.read("player2Sprite", "noSprite.rss"));
			this.vars.sprites[i][3] = LoadSpriteset(this.vars.files.read("player3Sprite", "noSprite.rss"));
			
			this.vars.files.close();
		}
	}
	
	continueMenu.PreRender = function()
	{
		with (this.vars)
		{
			ApplyColorMask(c_black);
			background.blit((SCREEN_WIDTH / 2) - (background.width / 2), (SCREEN_HEIGHT / 2) - (background.height / 2));
		}
		
		WINDOW_STYLE.drawWindow(15, 23, SCREEN_WIDTH - 30, 90);
		WINDOW_STYLE.drawWindow(15, SCREEN_HEIGHT - 73, 98, 58);
		WINDOW_STYLE.drawWindow(SCREEN_WIDTH - 105, SCREEN_HEIGHT - 73, 90, 10);
		WINDOW_STYLE.drawWindow(SCREEN_WIDTH - 105, SCREEN_HEIGHT - 41, 90, 26);
	}
	
	continueMenu.Render = function()
	{		
		with (this.vars)
		{
			/*
				Draw selection seperators
			*/
			
			if (GetTime() - time >= timeInterval)
			{
				if (yFactor == 0 || yFactor == 3)
					direction *= -1;
				
				yFactor += direction;
				time = GetTime();
			}
			
			if (GetTime() - time2 >= timeInterval2)
			{
				// Make sure frames go to next frame in animation properly
				if (image == 2) // Blink frame
				{
					timeInterval2 = 1000;
					image = 3;
				}
				else if (image == 4) // Look down1
				{
					timeInterval2 = 1000;
					image = 3;
				}
				//else if (image == 48) // Look down2
					//image = 49;
				else
				{
					rand = Math.floor(Math.random() * 10);
					
					if (rand > 4)
					{
						timeInterval2 = 1000;
						rand = 3;
					}
						
					image = sprites[0][0].directions[8].frames[rand].index;
					
					if (image == 2)
						timeInterval2 = 150;
					else if (image == 4)
						timeInterval2 = 250;
					else
						timeInterval2 = 400;
				}
				
				time2 = GetTime();
			}
			
			sprites[0][0].images[image].blit(SCREEN_WIDTH - 104, SCREEN_HEIGHT - 93);
			DrawText(0, 0, FONT_SYSTEM, c_white, image);
			DrawText(0, 10, FONT_SYSTEM, c_white, timeInterval2);
						
			bouncy.blit((SCREEN_WIDTH / 2) - (bouncy.width / 2), yFactor);
			Rectangle(16, 24 + (18 * this.selection), SCREEN_WIDTH - 32, 8, c_darkerPink);
			
			/*
				Draw selection animation
			*/
			
			/*
				Draw djinn
			*/
		}
	}
	
	continueMenu.PostRender = function()
	{
		with (this.vars)
		{
			if (length > 5)
				length = 5;
			
			if (length < 6)
			{
				for (var i = length; i < 5; i++)
					DrawText(25, 24 + (18 * i), FONT_MAIN, c_white, "(No save data)");
			}		
		
			for (var i = 0; i < length; i++)
			{
				DrawText(25, 24 + (18 * i), FONT_MAIN, c_white, menuStrings[i]["name"]);
				DrawText(76, 24 + (18 * i), FONT_MAIN, c_white, menuStrings[i]["location"]);
			}
			
			DrawText(16, SCREEN_HEIGHT - 72, FONT_SYSTEM, c_white, menuStrings[this.selection]["name"]);
			DrawText(16, SCREEN_HEIGHT - 72, FONT_SYSTEM, c_white, menuStrings[this.selection]["name"]);
			DrawText(16, SCREEN_HEIGHT - 56, FONT_SYSTEM, c_white, menuStrings[this.selection]["class"]);
			DrawText(16, SCREEN_HEIGHT - 39, FONT_SYSTEM, c_white, "Play Time:");
			DrawText(16, SCREEN_HEIGHT - 24, FONT_SYSTEM, c_white, menuStrings[this.selection]["coins"] + "Coins");
			DrawText(88, SCREEN_HEIGHT - 72, FONT_SYSTEM, c_white, "L " + menuStrings[this.selection]["level"]);
			DrawText(80, SCREEN_HEIGHT - 32, FONT_SYSTEM, c_white, menuStrings[this.selection]["time"]);
		}
	}
	
	continueMenu.KeyDown = function()
	{
		if (this.selection == this.vars.length - 1)
			this.selection = 0;
		else
			this.selection++;
	}
	
	continueMenu.KeyUp = function()
	{
		if (this.selection == 0)
			this.selection = this.vars.length - 1;
		else
			this.selection--;
	}
	
	continueMenu.KeyCancel = function()
	{
		Globals.menuEffects["Back"].play(false);
		this.done = true;
	}
	
	continueMenu.KeyAccept = function()
	{		
		var bg = GrabImage(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
		bg.blit(0, 0);
		
		FONT_SYSTEM.drawText(20, 20, "No Maps!! LOL");
		FlipScreen();
		GetKey();
	}
}
// End Continue Menu //
///////////////////////

///////////////////////
////// Main Menu //////

var mainMenu = new Menu();
{
	mainMenu.Initialize = function()
	{
		this.vars.seperator    = LoadImage("VerticalSeperator.png");
		this.vars.iconHeight   = this.items[0].icon.height;
		this.vars.iconWidth    = this.items[0].icon.width;
		this.vars.menuLength   = this.items.length * this.vars.iconWidth + 70;  // Plus 70 is width of text window
		this.vars.x            = (SCREEN_WIDTH / 2) - (this.vars.menuLength / 2);
		this.vars.y            = SCREEN_HEIGHT - this.vars.iconHeight;
		this.vars.timeInterval = 90;
		this.vars.transFactor  = 2;
		this.vars.direction    = 1;
		this.vars.time         = GetTime();
		this.vars.fontPadding  = 8;
	}
	
	mainMenu.PreRender = function()
	{
		if (IsMapEngineRunning())
		{
			UpdateMapEngine();
			RenderMap();
		}
		else
			Abort("Map Engine Isn't Running");
	}
	
	mainMenu.Render = function()
	{
		with (this.vars) 
		{
			var xTrans = x + iconWidth * this.selection;
		
			if (GetTime() - time > timeInterval)
			{
				if (transFactor == 1 || transFactor == 2)
					direction *= -1;
				
				transFactor += direction;
				
				time = GetTime();
			}
			
			for (var i = 0; i < this.items.length; i++)
				this.items[i].icon.blit(x + iconWidth * i, y);
			
			WINDOW_STYLE.drawWindow(x + iconWidth * this.items.length + 7, y + 7, 56, 10); // Plus 7s are to make up for window borders being drawn outside width and height
			this.items[this.selection].icon.transformBlit(xTrans - transFactor, y - transFactor, xTrans + iconWidth + transFactor, y - transFactor, xTrans + iconWidth + transFactor, y + iconHeight, xTrans - transFactor, y + iconHeight);
			
			WINDOW_STYLE.drawWindow(SCREEN_WIDTH - 8 - ((43 * Globals.coolGuys.length) + (4 * (Globals.coolGuys.length - 1))), 7, (43 * Globals.coolGuys.length) + (4 * (Globals.coolGuys.length - 1)) + 1, 26);
			
			// Draw HP and PP bars
			for (var i = 0; i < Globals.coolGuys.length; i++)
			{
				Rectangle((SCREEN_WIDTH - 48) - (48 * i), 21, 40, 3, c_red);
				Rectangle((SCREEN_WIDTH - 48) - (48 * i), 29, 40, 3, c_red);
				Rectangle((SCREEN_WIDTH - 48) - (48 * i), 21, (Globals.coolGuys[Globals.coolGuys.length - i - 1].hp / Globals.coolGuys[Globals.coolGuys.length - i - 1].tHp) * 40, 3, c_blue);
				Rectangle((SCREEN_WIDTH - 48) - (48 * i), 29, (Globals.coolGuys[Globals.coolGuys.length - i - 1].pp / Globals.coolGuys[Globals.coolGuys.length - i - 1].tPp) * 40, 3, c_blue);
			}
		}
	}
	
	mainMenu.PostRender = function()
	{
		with (this.vars)
		{		
			DrawText(x + iconWidth * this.items.length + fontPadding, y + fontPadding, FONT_SYSTEM, c_white, this.items[this.selection].name);
			
			// Draw character seperators
			for (var i = 1; i < Globals.coolGuys.length; i++)
				this.vars.seperator.blit(SCREEN_WIDTH - 6 - (i * 48), 4);
				
			// Draw HP PP and Name
			for (var i = 0; i < Globals.coolGuys.length; i++)
			{
				DrawText((SCREEN_WIDTH - 48) - (48 * i), 8,   FONT_SYSTEM, c_white, Globals.coolGuys[Globals.coolGuys.length - i - 1].name);
				DrawText((SCREEN_WIDTH - 48) - (48 * i), 16,  FONT_SYSTEM, c_white, "HP");
				DrawText((SCREEN_WIDTH - 48) - (48 * i), 24,  FONT_SYSTEM, c_white, "PP");
				DrawText((SCREEN_WIDTH - 8 - (FONT_SYSTEM.getStringWidth(Globals.coolGuys[Globals.coolGuys.length - i - 1].hp) + 3)) - (48 * i), 16, FONT_SYSTEM, c_white, Globals.coolGuys[Globals.coolGuys.length - i - 1].hp);
				DrawText((SCREEN_WIDTH - 8 - (FONT_SYSTEM.getStringWidth(Globals.coolGuys[Globals.coolGuys.length - i - 1].pp) + 3)) - (48 * i), 24, FONT_SYSTEM, c_white, Globals.coolGuys[Globals.coolGuys.length - i - 1].pp);
			}
		}
	}
	
	mainMenu.KeyRight = function()
	{
		if (this.selection < this.items.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	mainMenu.KeyLeft = function()
	{	
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = this.items.length - 1;
	}
	
	mainMenu.KeyAccept = function()
	{
		this.items[this.selection].Action();
	}
	
	mainMenu.KeyCancel = function()
	{
		this.done = true;
	}
	
	function ItemMenu()
	{
		itemMenu.Execute();
	}
	mainMenu.AddItem("Psynergy", function() {}, c_white, "MenuIcons/Psynergy.gif");
	mainMenu.AddItem("Djinn",    function() {}, c_white, "MenuIcons/Djinn.gif");
	mainMenu.AddItem("Item",     ItemMenu, c_white, "MenuIcons/Item.gif");
	mainMenu.AddItem("Status",   function() {}, c_white, "MenuIcons/Status.gif");	
}
//// End Main Menu ////
///////////////////////

///////////////////////
////// Item Menu //////
var itemMenu = new Menu();
{
	itemMenu.Initialize = function()
	{
		this.vars.menuWidth = Globals.menuImages["Bg1"].width;
		this.vars.menuHeight = Globals.menuImages["Bg1"].height;
		this.vars.statsPaddingX = 8;
		this.vars.statsPaddingY = 48;
		this.vars.iconHeight = 32;
		this.vars.iconWidth = 32;
		this.vars.menuX = (SCREEN_WIDTH / 2) - (this.vars.menuWidth / 2);
		this.vars.menuY = (SCREEN_HEIGHT / 2) - (this.vars.menuHeight / 2);
	}
	
	itemMenu.PreRender = function()
	{
		if (IsMapEngineRunning())
		{
			UpdateMapEngine();
			RenderMap();
		}
		else
			Abort("Map Engine Isn't Running");
			
		ApplyColorMask(c_tBlack);			
		Globals.menuImages["Bg1"].blit(this.vars.menuX, this.vars.menuY);
	}
	
	itemMenu.Render = function()
	{
		var iconX = 0;
		var iconY = 0;
		
		with (this.vars)
		{
			Globals.coolGuys[this.selection].icon.blit(menuX + statsPaddingX, menuY + statsPaddingY);
			
			for (var i = 0; i < Globals.coolGuys[this.selection].inventory.length; i++)
			{
				if (i % 5 == 0 && i != 0)
				{
					iconX = 0;
					iconY++;
				}

				Globals.coolGuys[this.selection].inventory[i].icon.blit(menuX + 117 + (24 * iconX), menuY + 41 + (16 * iconY));
				iconX++;
			}
		}
	}
	
	itemMenu.PostRender = function()
	{
		with (this.vars)
		{
			DrawText(menuX + 112, menuY + 8, FONT_SYSTEM, c_white, "Whose Item?");
			
			DrawText(menuX + statsPaddingX + iconWidth, menuY + statsPaddingY, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].name);
			DrawText(menuX + statsPaddingX + iconWidth + 8, menuY + statsPaddingY + 17, FONT_SYSTEM, c_white, "Lv");
			DrawTextRight(menuX + statsPaddingX + 86, menuY + statsPaddingY + 17, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].level);
			DrawText(menuX + statsPaddingX, menuY + iconHeight + statsPaddingY, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].Class);
			
			DrawText(menuX + statsPaddingX, menuY + iconHeight + statsPaddingY + 8, FONT_SYSTEM, c_white, "HP");
			DrawTextRight(menuX + statsPaddingX + 44, menuY + statsPaddingY + iconHeight + 8, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].hp);
			DrawText(menuX + statsPaddingX + 48, menuY + statsPaddingY + 40, FONT_SYSTEM, c_white, "/");
			DrawTextRight(menuX + statsPaddingX + 84, menuY + statsPaddingY + iconHeight + 8, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].tHp);
			
			DrawText(menuX + statsPaddingX, menuY + statsPaddingY + iconHeight + 16, FONT_SYSTEM, c_white, "PP");
			DrawTextRight(menuX + statsPaddingX + 44, menuY + statsPaddingY + iconHeight + 16, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].pp);
			DrawText(menuX + statsPaddingX + 48, menuY + statsPaddingY + 48, FONT_SYSTEM, c_white, "/");
			DrawTextRight(menuX + statsPaddingX + 84, menuY + statsPaddingY + iconHeight + 16, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].tPp);
			
			DrawText(menuX + statsPaddingX, menuY + statsPaddingY + iconHeight + 32, FONT_SYSTEM, c_white, "Exp");
			DrawTextRight(menuX + statsPaddingX + 86, menuY + statsPaddingY + iconHeight + 40, FONT_SYSTEM, c_white, Globals.coolGuys[this.selection].exp);
			
			DrawTextRight(menuX + 62, menuY + 144, FONT_SYSTEM, c_white, Globals.coins);
			DrawText(menuX + 72, menuY + 144, FONT_SYSTEM, c_white, "Coins");
		}
	}
	
	itemMenu.KeyRight = function()
	{
		if (this.selection < Globals.coolGuys.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	itemMenu.KeyLeft = function()
	{
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = Globals.coolGuys.length - 1;
	}
	
	itemMenu.KeyGbaL = function()
	{
		
	}
	
	itemMenu.KeyGbaR = function()
	{
		
	}
	
	itemMenu.KeyAccept = function()
	{
		
	}
	
	itemMenu.KeyCancel = function()
	{
		this.done = true;
	}
}
//// End Item Menu ////
///////////////////////