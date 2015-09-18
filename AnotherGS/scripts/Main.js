//RequireScript("Clock.js");
RequireScript("Animation.js");
RequireScript("Character.js");
RequireScript("Screen.js");
RequireScript("Game.js");
RequireScript("Globals.js");
RequireScript("Colors.js");
RequireScript("Keys.js");
RequireScript("Map.js");
RequireScript("Menu.js");
RequireScript("Battle.js");
//RequireScript("MessageBox.js");
//RequireScript("ChoiceBox.js");
//RequireScript("FadeEffects.js");
//RequireScript("Time.js");
//RequireScript("CharacterItem.js");
//RequireScript("Item.js");
//RequireScript("Option.js");

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
		Screen.GiveFocus(introMenu);
		
	SetTalkActivationKey(Keys.Accept);
	CreatePerson("Dude", "isaac.rss", false);
    SetRenderScript("Screen.Render();");
    SetUpdateScript("Screen.Update();");
    Map.AttachInput("Dude");
    Map.GoTo("map1.rmp");
}

function ClearKeyQueue()
{
	while (AreKeysLeft())
		GetKey();
}

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
		x = (Game.ScreenWidth / 2) - (sphereImage.width / 2);
		y = (Game.ScreenHeight / 2) - (sphereImage.height / 2);
		
		ApplyColorMask(Colors.Black);
		
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
		x = (Game.ScreenWidth / 2) - (camelotImage[0].width / 2);
		y = (Game.ScreenHeight / 2) - (camelotImage[0].height / 2);
		
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
	var x2 = (Game.ScreenWidth / 2) - (mtn.width / 2);
	var y2 = (Game.ScreenHeight / 2) - (mtn.height / 2) - 35;
	x = (Game.ScreenWidth / 2) - (sky.width / 2);
	y = (Game.ScreenHeight / 2) - (sky.height / 2) - 60;

	
	// If there aren't any saved games, skip opening sequence and goto name char screen
	//if (GetFileList.length < 1)
		//return;
	
	
// Opening sequence
	while (!AreKeysLeft())
	{
		if ((GetTime() - time > timeInterval) && (y < (Game.ScreenHeight / 2) - (sky.height / 2) + 30))
		{
			y2 += 2;
			y += 1.5;
			time = GetTime();
		}
		
		else if (y >= (Game.ScreenHeight / 2) - (sky.height / 2) + 30)
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
				x = (Game.ScreenWidth / 2) - (gsImage.width / 2);
				y = (Game.ScreenHeight / 2) - (gsImage.height / 2);
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
	var timeInterval = 50;
	
// Show GS image
	while (!AreKeysLeft())
	{			
		if (GetTime() - time > timeInterval)
		{
			if (alpha >= 255)
				alphaChanger *= -1;
			else if (Colors.Black.alpha <= 0)
				alphaChanger *= -1;
				
			alpha += alphaChanger;
			Colors.Black.alpha = alpha;
			Colors.White.alpha = alpha;
			
			time = GetTime();
		}
		
		gsImage.blit(x, y);
		
		Game.FontMain.setColorMask(Colors.Black);
		Game.FontMain.drawText(Game.ScreenWidth / 2 - (Game.FontMain.getStringWidth("Press Any Button") / 2) + 1, Game.ScreenHeight / 2 + 40 + 1, "Press Any Button");
		Game.FontMain.setColorMask(Colors.White);
		Game.FontMain.drawText(Game.ScreenWidth / 2 - (Game.FontMain.getStringWidth("Press Any Button") / 2), Game.ScreenHeight / 2 + 40, "Press Any Button");
		
		border.blit (0, 0);
		
		FlipScreen();
	}
	
	ClearKeyQueue();
	timeInterval = 90;
	time = GetTime();
	Colors.Black.alpha = 255;
	Colors.White.alpha = 255;
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
	
	Game.FontMain.setColorMask(Colors.White);
}

function PreLoad()
{
	
}