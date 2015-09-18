RequireScript("Item.js");
RequireScript("Character.js");
RequireScript("Sound.js");
RequireScript("Globals.js");
RequireScript("Colors.js");
RequireSystemScript("time.js");
RequireScript("Menu.js");

// Constants
const SCREEN_HEIGHT = GetScreenHeight();
const SCREEN_WIDTH  = GetScreenWidth();
const WINDOW_STYLE  = LoadWindowStyle("GS.rws");
const FONT_SYSTEM   = LoadFont("GS.rfn");
const FONT_MAIN     = LoadFont("MainFont.rfn");

function game()
{
	Intro();
	PreLoad();
	
	ClearKeyQueue();
	
	/*
	if (GetFileList().length < 1)
	{
		Goto name char screen
	}
	else*/
		introMenu.Execute();
	
	/* Testzors
	var play = true;
	var font = GetSystemFont();
	var dude = 0;
	
	while(play)
	{
		for (var j = 0; j < coolGuys.length; j++)
		{
			font.drawText(0, j * 30, "Player " + j + " = " + coolGuys[j].name);
			
			
			for (var i = 0; i < coolGuys[j].inventory.length; i++)
			{
				coolGuys[j].inventory[i].icon.blit(10 + (i * 15), 15 + (j * 30), coolGuys[j].inventory[i]);
			}			
		}
		
		if (IsAnyKeyPressed())
		{
			GetKey();
			coolGuys[dude].inventory.push(Items["Herb"]);
			
			if (dude == 0)
				dude = 1;
			else
				dude = 0;
		}
		
		FlipScreen();
	}
	
	*/
	
	// Functions
	function Intro()
	{
		var sphereImage = LoadImage("SphereLogo.png");
		var ninSound    = LoadSound("Effects/Nintendo.wav");
		
		var camelotImage = new Array();
			camelotImage[0] = LoadImage("CamelotLogo1.png");
			camelotImage[1] = LoadImage("CamelotLogo2.png");
			camelotImage[2] = LoadImage("CamelotLogo3.png");
			camelotImage[3] = LoadImage("CamelotLogo4.png");
		var camelotTime = GetTime();
		var camelotIndex = 0;
		
		var sky = LoadImage("IntroSceneSky.png");
		var mtn = LoadImage("IntroSceneMtn.png");
		var border = LoadImage("SceneBorder.png");
		
		var gsImage = LoadImage("GSOpening.png");
		
		var screenTransTime = 2000; // Time to wait between logo screens
		var startTime = GetTime();
		var x = 0;
		var y = 0;
		
	// Sphere image
		ninSound.play(false);
		while (!AreKeysLeft())
		{
			x = (SCREEN_WIDTH / 2) - (sphereImage.width / 2);
			y = (SCREEN_HEIGHT / 2) - (sphereImage.height / 2);
			
			ApplyColorMask(c_black);
			
			sphereImage.blit(x, y);
			
			if (GetTime() - startTime > screenTransTime)
				break;
				
			FlipScreen();
		}
		
		ClearKeyQueue();
		startTime = GetTime();
		
	// Camelot image
		while (!AreKeysLeft())
		{
			x = (SCREEN_WIDTH / 2) - (camelotImage[0].width / 2);
			y = (SCREEN_HEIGHT / 2) - (camelotImage[0].height / 2);
			
			// "Animate" camelot logo
			if (GetTime() - camelotTime > 150)
			{
				if (camelotIndex == 3)
					camelotIndex = 0;
				else
					camelotIndex++;
				
				camelotTime = GetTime();
			}
			
			camelotImage[camelotIndex].blit(x, y);
			
			if (GetTime() - startTime > screenTransTime)
				break;
				
			FlipScreen();
		}
		
		ClearKeyQueue();
		var time = GetTime();
		var timeInterval = 60;
		var x2 = (SCREEN_WIDTH / 2) - (mtn.width / 2);
		var y2 = (SCREEN_HEIGHT / 2) - (mtn.height / 2) - 35;
		x = (SCREEN_WIDTH / 2) - (sky.width / 2);
		y = (SCREEN_HEIGHT / 2) - (sky.height / 2) - 60;
	
		
		// If there aren't any saved games, skip opening sequence and goto name char screen
		//if (GetFileList.length < 1)
			//return;
		
		
	// Opening sequence
		while (!AreKeysLeft())
		{
			if ((GetTime() - time > timeInterval) && (y < (SCREEN_HEIGHT / 2) - (sky.height / 2) + 30))
			{
				y2 += 2;
				y += 1.5;
				time = GetTime();
			}
			
			else if (y >= (SCREEN_HEIGHT / 2) - (sky.height / 2) + 30)
				break;
			
			
			sky.blit(x, y);
			mtn.blit(x2, y2);
			/*
				Glare goes here
			*/
			border.blit(0, 0);
			
			FlipScreen();
		}
		
	// Flash white and back
		var flashed = false;
		var goneWhite = false;
		var alphaChanger = 10;
		var alpha = 0;
		
		while (!flashed)
		{			
			if (!goneWhite)
			{
				sky.blit(x, y);
				mtn.blit(x2, y2);
				
				alpha += alphaChanger;
				
				if (alpha >= 255)
				{
					goneWhite = true;
					x = (SCREEN_WIDTH / 2) - (gsImage.width / 2);
					y = (SCREEN_HEIGHT / 2) - (gsImage.height / 2);
				}
			}
			else
			{
				gsImage.blit(x, y);
				
				alpha -= alphaChanger;
				
				if (alpha <= 5)
					flashed = true;
			}
			ApplyColorMask(CreateColor(255, 255, 255, alpha));
			
			border.blit(0, 0);
			
			FlipScreen();
		}
		
		ClearKeyQueue();
		var time = GetTime();
		var alphaChanger = 17;
		var alpha = 255;
		var timeInterval = 20;
		
	// Show GS image
		while (!AreKeysLeft())
		{			
			if (GetTime() - time > timeInterval)
			{
				if (alpha >= 255)
				{
					alphaChanger *= -1;
					Delay(300);
				}
				else if (c_black.alpha <= 0)
					alphaChanger *= -1;
					
				alpha += alphaChanger;
				c_black.alpha = alpha;
				c_white.alpha = alpha;
				
				time = GetTime();
			}
			
			gsImage.blit(x, y);
			
			FONT_MAIN.setColorMask(c_black);
			FONT_MAIN.drawText(SCREEN_WIDTH / 2 - (FONT_MAIN.getStringWidth("Press Any Button") / 2) + 1, SCREEN_HEIGHT / 2 + 40 + 1, "Press Any Button");
			FONT_MAIN.setColorMask(c_white);
			FONT_MAIN.drawText(SCREEN_WIDTH / 2 - (FONT_MAIN.getStringWidth("Press Any Button") / 2), SCREEN_HEIGHT / 2 + 40, "Press Any Button");
			
			border.blit (0, 0);
			
			FlipScreen();
		}
		
		ClearKeyQueue();
		timeInterval = 90;
		time = GetTime();
		c_black.alpha = 255;
		c_white.alpha = 255;
		alphaChanger = 17;
		alpha = 0;
		
	// Fade to black
		while (alpha < 255)
		{
			gsImage.blit(x, y);
			border.blit(0, 0);
			ApplyColorMask(CreateColor(0, 0, 0, alpha));
			
			if (GetTime() - time > timeInterval)
			{
				alpha += alphaChanger;
				time = GetTime();
			}
			
			FlipScreen();
		}
		
		FONT_MAIN.setColorMask(c_white);
	}
	
	function PreLoad()
	{
		
	}
}

///// Global Functions /////

function ClearKeyQueue()
{
	while (AreKeysLeft())
		GetKey();
}

function DrawText(x, y, font, color, string)
{
	var theFont = font;
	
	theFont.setColorMask(c_black);
	theFont.drawText(x + 1, y + 1, string);
	theFont.setColorMask(color);
	theFont.drawText(x, y, string);
}

function YesNo(yesFunction, noFunction)
{
	var menu = new Menu();
	
	menu.Initialize = function()
	{
		this.vars.background   = GrabImage(0, 0, SCREEN_WIDTH, SCREEN_HEIGHT);
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
		this.vars.returnValue  = false;
	}
	
	menu.PreRender = function()
	{
		with (this.vars) 
		{
			if (IsMapEngineRunning())
			{
				UpdateMapEngine();
				RenderMap();
			}
			else
				background.blit(0, 0);
		}
	}
	
	menu.Render = function()
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
	
	menu.PostRender = function()
	{
		with (this.vars)
		{		
			DrawText(x + iconWidth * this.items.length + fontPadding, y + fontPadding, FONT_SYSTEM, c_white, this.items[this.selection].name);
		}
	}
	
	menu.KeyRight = function()
	{
		if (this.selection < this.items.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	menu.KeyLeft = function()
	{	
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = this.items.length - 1;
	}
	
	menu.KeyAccept = function()
	{
		if (this.selection == 0)
			this.vars.returnValue = true;
		else
			this.vars.returnValue = false;
		
		this.done = true;
	}
	
	menu.KeyCancel = function()
	{
		this.selection = 1;
	}
	
	menu.AddItem("Yes", undefined, c_white, "MenuIcons/Yes.gif");
	menu.AddItem("No", undefined, c_white, "MenuIcons/no.gif");
	
	menu.Execute();
	
	return menu.vars.returnValue;
}

// Right aligns text
function DrawTextRight(x, y, font, color, text)
{
	DrawText(x - font.getStringWidth(text), y, font, color, text);
}