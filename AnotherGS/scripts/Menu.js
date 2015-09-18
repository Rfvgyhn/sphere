function Menu()
{
	this.selection = 0;
	this.done = false;
	this.items = new Array();
	this.vars = new Object;
	this.initialized = false;
	this.Hide = false;
	
	this.AddItem = function(item, action, desc, icon)
	{
		var theItem = new Object;
		theItem.item     = item;
		theItem.Action   = action;// || function () {  };
		theItem.desc     = desc;
		
		if (icon != undefined)
			theItem.icon = icon;
			
		this.items[this.items.length] = theItem;
	}
	
	this.HasItems = function()
	{
		if (this.items.length > 0)
			return true;
		return false;
	}
	
	this.Initialize = function()
	{
		
	}

	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		if (!this.Hide)
		{
			this._PreRender();
			this._Render();
			this._PostRender();
		}
	}
	
	this.Action = function()
	{
		
	}
}

var introMenu = new Menu(); {
	introMenu.Initialize = function()
	{
		if (GetFileList().length < 5)
		introMenu.AddItem("New Game", function() { introMenu.done = true; }, Colors.White, LoadImage("Menu/Icons/NewQuest.gif"));
		
		introMenu.AddItem("Continue", function() {}, Colors.White, LoadImage("Menu/Icons/Continue.gif"));
		
		if (GetFileList().length < 5)
			introMenu.AddItem("Copy", function() {}, Colors.White, LoadImage("Menu/Icons/CopyFile.gif"));
			
		introMenu.AddItem("Erase",    function() {}, Colors.White, LoadImage("Menu/Icons/EraseFile.gif"));
		introMenu.AddItem("Battle",   function() {}, Colors.White, LoadImage("Menu/Icons/Battle.gif"));
		this.vars.background = LoadImage("IntroMenuLogo.png");
		this.vars.iconHeight = this.items[0].icon.height;
		this.vars.iconWidth = this.items[0].icon.width;
		this.vars.menuLength = this.items.length * this.vars.iconWidth + 70;  // Plus 70 is width of text window
		this.vars.x = (Game.ScreenWidth / 2) - (this.vars.menuLength / 2);
		this.vars.y = Game.ScreenHeight - this.vars.iconHeight;
		this.vars.timeInterval = 90;
		this.vars.transFactor = 2;
		this.vars.direction = 1;
		this.vars.time = GetTime();
		this.vars.fontPadding = 8;
		this.vars.xTrans = 0;
		
		this.initialized = true;
		/*
		if (!Globals.bgm.IsPlaying())
		{
			Globals.bgm.SetSound(LoadSound("Music/EmbarkOnAJourney.mp3"));
			Globals.bgm.Play(true);
		}*/
	}
	
	introMenu.Update = function()
	{
		with (this.vars) 
		{
			xTrans = x + iconWidth * this.selection;
		
			if (GetTime() - time > timeInterval)
			{
				if (transFactor == 1 || transFactor == 2)
					direction *= -1;
				
				transFactor += direction;
				
				time = GetTime();
			}
		}
	}
	
	introMenu._PreRender = function()
	{
	
	}
	
	introMenu._Render = function()
	{
		with (this.vars) 
		{
			for (var i = 0; i < this.items.length; i++)
				this.items[i].icon.blit(x + iconWidth * i, y);
			
			Game.WindowStyle.drawWindow(x + iconWidth * this.items.length + 7, y + 7, 56, 10); // Plus 7s are to make up for window borders being drawn outside width and height
			this.items[this.selection].icon.transformBlit(xTrans - transFactor, y - transFactor, xTrans + iconWidth + transFactor, y - transFactor, xTrans + iconWidth + transFactor, y + iconHeight, xTrans - transFactor, y + iconHeight);
		}
	}
	
	introMenu._PostRender = function()
	{
		with (this.vars)
		{		
			DrawText(x + iconWidth * this.items.length + fontPadding, y + fontPadding, Game.FontSystem, Colors.White, this.items[this.selection].item);
		}
	}
	
	introMenu.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				this.items[this.selection].Action();
				
				break;
			}
			
			case Keys.Cancel:
			{
				
				break;
			}
			
			case Keys.Select:
			{
				
				
				break;
			}
			
			case Keys.Right:
			{
				if (this.selection < this.items.length - 1) 
					this.selection++;
				else
					this.selection = 0;
				
				break;
			}
			
			case Keys.Left:
			{
				if (this.selection > 0) 
					this.selection--;
				else
					this.selection = this.items.length - 1;
				
				break;
			}
			
			case Keys.Up:
			{
				
				
				break;
			}
			
			case Keys.Down:
			{
				
					
				break;
			}
		}
	}
}
var menuMain = new Menu();

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
		DrawText(20, 20, Game.FontSystem, Colors.White, "Yes");
	}
	else
		DrawText(20, 20, Game.FontSystem, Colors.White, "No");
		
	FlipScreen();
	GetKey();
}

function IntroMenuBattle()
{
	
}