var g_tiles = new Array();

RequireScript("tiles.js");
RequireScript("Menu.js");
RequireScript("Level.js");
RequireScript("Movement.js");
RequireScript("Colors.js");

///// Sounds Needed /////
/*
	Open Lock
	Water Splash
	Beat Level
	Block into water
	Get Item
	Button Press
*/
/////////////////////////

// Constants
var SCREEN_WIDTH  = GetScreenWidth();
var SCREEN_HEIGHT = GetScreenHeight();

// Globals
var g_CameraX = 0;
var g_CameraY = 0;
var g_play = true;  // When false, exit sphere
var g_mainLayer = 2;
var g_currentLevel = 1;
var g_level = levels[0];

	// Images
var g_MenuPicture;
	var g_MenuPictureW;
var g_levelEditor;
var g_EditorButtonHover;
	// Sounds
var g_soundEesh;

// Start Game
function game()
{
    // Pre-load Stuff That Needs to be Pre-loaded
    loadTheStuff();
    
	// Load Menu Stuff
	var bg   = LoadImage("mainBackground.png");
	var menu = new Menu("window.rws", "Arrow.png");
	menu.addItem("Play Default Levels", g_level.start);
	menu.addItem("Play Custom Levels", help);
	menu.addItem("Level Editor", g_level.startEditor);
	menu.addItem("Help", help);
	menu.addItem("Quit", quit);

	while (g_play)
	{
		bg.blit(0, 0);
		
		// Blit Main Menu
		menu.execute(20, 20);
	}
}

// Load the Stuff
function loadTheStuff()
{
	// Images
	g_MenuPicture  = LoadImage("score panel.gif");
	g_MenuPictureW = g_MenuPicture.width;
	g_EditorButtonHover = LoadImage("ButtonHover.png");
	
	// Sounds
	g_soundEesh = LoadSound("Eesh.wav");
	
	// Other

}
// Help Screen
function help()
{
	message("Does this work?", true);
}

// Quit Game
function quit()
{
	g_play = false;
}

// Return To Main Menu
function exitToMainMenu()
{
	if(GetCurrentMap() != "editor.rmp")
	{
		DestroyPerson("Chubbo");
		SetRenderScript("");
		SetUpdateScript("")
		UnbindKey(KEY_LEFT);
		UnbindKey(KEY_RIGHT);
		UnbindKey(KEY_UP);
		UnbindKey(KEY_DOWN);
		ExitMapEngine();
	}
	else
	{
		SetRenderScript("");
		SetUpdateScript("")
		ExitMapEngine();
	}
}

// Write Text To The Screen
function message(text, bigMessage, x, y)
{
	var window = LoadWindowStyle("window.rws");
	var font   = GetSystemFont();
	var width  = SCREEN_WIDTH - 20;
	var height = bigMessage == true ? SCREEN_HEIGHT - 20 : 50;
	var xPos   = x || (SCREEN_WIDTH / 2) - (width / 2) + 10;
	var yPos   = y || 20;
	var done   = false;
	var bg     = LoadImage("mainBackground.png");
	
	while (!done)
	{
		if (IsMapEngineRunning())
			RenderMap();
		else
			bg.blit(0, 0);
		window.drawWindow(xPos, yPos, width - 20, height - 20);
		font.drawTextBox(xPos, yPos, width - 20, height - 20, 0, text);
		
		FlipScreen();
		
		while (AreKeysLeft())
		{
			if (GetKey() == KEY_ENTER)
				done = true;
		}
	}
}