const SCREEN_HEIGHT = GetScreenHeight();
const SCREEN_WIDTH  = GetScreenWidth();
const GBA_HEIGHT    = 160;
const GBA_WIDTH     = 240;
const GBA_X         = (SCREEN_WIDTH / 2) - (GBA_WIDTH / 2); // 0 x coordinate for GBA screen
const GBA_Y         = (SCREEN_HEIGHT / 2) - (GBA_HEIGHT / 2); // 0 y coordinate for GBA screen

var g_time = new Time();

///// Keys /////
var g_keyAccept = KEY_Z;
var g_keyCancel = KEY_X;
var g_keyGbaL   = KEY_A;
var g_keyGbaR   = KEY_S;
var g_keyStart  = KEY_ENTER;
var g_keySelect = KEY_BACKSPACE;

///// Options /////
var g_textSpeed   = "Fast";
var g_battleScene = "On";
var g_battleStyle = "Shift";
var g_buttonMode  = "Help";
var g_timeFormat  = "12-Hour";

var g_windowStyles = new Array();
	g_windowStyles[0] = "Type 1";
	g_windowStyles[1] = "Type 2";
	g_windowStyles[2] = "Type 3";
	g_windowStyles[3] = "Type 4";
	g_windowStyles[4] = "Type 5";
	g_windowStyles[5] = "Type 6";
	g_windowStyles[6] = "Type 7";
	g_windowStyles[7] = "Type 8";
	g_windowStyles[8] = "Type 9";
	g_windowStyles[9] = "Type10";
var g_windowStyleColors = new Array();
	g_windowStyleColors["Orange"] = LoadWindowStyle("Orange.rws");
var g_windowStyle     = LoadWindowStyle(g_windowStyles[0] + ".rws");
var g_windowStyleConvo = LoadWindowStyle("Convo.rws");
var g_windowStyleDesc = LoadWindowStyle("Desc.rws");
var g_windowStylePlain = LoadWindowStyle("Plain.rws");
var g_windowStyleBattle = LoadWindowStyle("BattleText.rws");

var g_fontBig   = LoadFont("BigFont.rfn");
var g_fontSmall = LoadFont("SmallFont.rfn");

///// Images /////
var g_images = new Array();

	g_images["hpBar"]     = LoadImage("hpBar.png");
	g_images["arrow"]     = LoadImage("SelectionArrow.png");
	g_images["arrowGrey"] = LoadImage("SelectionArrowGrey.png");
	
	g_images["menuBagBg"]             = LoadImage("Menu/BagBg.png");
	g_images["menuBagPackItems"]      = LoadImage("Menu/BagPackLeft.png");
	g_images["menuBagPackKey Items"]  = LoadImage("Menu/BagPackMiddle.png");
	g_images["menuBagPackPok` Balls"] = LoadImage("Menu/BagPackMiddle.png");
	g_images["menuBagPanel"]          = LoadImage("Menu/BagPanel.png");
	g_images["menuBagRedArrowLeft"]   = LoadImage("Menu/BagRedArrowLeft.png");
	g_images["menuBagRedArrowRight"]  = LoadImage("Menu/BagRedArrowRight.png");
	g_images["menuBagRedArrowUp"]     = LoadImage("Menu/BagRedArrowUp.png");
	g_images["menuBagRedArrowDown"]   = LoadImage("Menu/BagRedArrowDown.png");
	g_images["menuBagSelected"]       = LoadImage("Menu/BagSelected.png"); // Key item registered icon
	g_images["menuBagIconBg"]         = LoadImage("Menu/BagIconBg.png");
	
	g_images["menuPkmnSelectBackground"] = LoadImage("Menu/PkmnSelectBackground.png");
	g_images["menuPkmnSelectBg"]         = LoadImage("Menu/PkmnSelectBg.png");
	g_images["menuPkmnSelectOne"]        = LoadImage("Menu/PkmnSelectOne.png");
	g_images["menuPkmnSelectBorder"]     = LoadImage("Menu/PkmnSelectBorder.png");
	g_images["menuTrainerCardFront"]     = LoadImage("Menu/TrainerCardFront.png");
	g_images["menuTrainerCardBack"]      = LoadImage("Menu/TrainerCardBack.png");
	
///// Functions /////
function Random(min, max)
{
	return Math.round((Math.random() * (max - min)) + min)
}

Array.prototype.ContainsItem = function(item)
{
	for (var i = 0; i < this.length; i++)
	{
		if (this[i] == item)
			return true;
	}
	
	return false;
}

// Draws text
function DrawText(x, y, font, string, color, rightAlign)
{
	var color = color || Colors.textWhite;
	var shadowColor = Colors.textGray;
	
	if (rightAlign)
		x -= font.getStringWidth(string);
	
	switch(color)
	{
		case Colors.textWhite: {shadowColor = Colors.textBlack; break;}
		case Colors.textRed:   {shadowColor = Colors.textRedShadow; break;}
	}
	
	font.setColorMask(shadowColor);
	font.drawText(x + 1, y, string);
	font.drawText(x, y + 1, string);
	font.drawText(x + 1, y + 1, string);
	font.setColorMask(color);
	font.drawText(x, y, string);
}

// Draws wrapped text
function DrawTextBox(x, y, w, h, font, string, color)
{
	var color = color || Colors.textWhite;
	var shadowColor;
	
	switch(color)
	{
		case Colors.textWhite: {shadowColor = Colors.textBlack; break;}
		case Colors.textBlack: {shadowColor = Colors.textGray; break;}
		case Colors.textRed:   {shadowColor = Colors.textRedShadow; break;}
	}
	
	font.setColorMask(shadowColor);
	font.drawTextBox(x + 1, y, w, h, 0, string);
	font.drawTextBox(x, y + 1, w, h, 0, string);
	font.drawTextBox(x + 1, y + 1, w, h, 0, string);
	font.setColorMask(color);
	font.drawTextBox(x, y, w, h, 0, string);
}


function Message(x, y, w, xPad, yPad, font, text, windowStyle, color)
{
	var message = new MessageBox(x, y, w, xPad, yPad, g_fontBig, text, windowStyle, color);
	
	Screen.GiveFocus(message);
}

// Draws wrapped text char by char
function ConvoBox(string, color)
{
	var textColor = color || Colors.textBlack;
	var message = new MessageBox(GBA_X + 16, SCREEN_HEIGHT - 33, 208, 0, -6, g_fontBig, string, g_windowStyleConvo, textColor);
	
	Screen.GiveFocus(message);
}

function Delay(milliseconds)
{
  var start = GetTime();
  while (start + milliseconds > GetTime()) {}
}

function ClearKeyQueue()
{
	while (AreKeysLeft()) { GetKey(); }
}

// Delays engine until a value from keyArray is pressed
function WaitForKeys(key, onMap)
{
	var keyPressed = false;
	var key = GetKey();
	
	for (var i = 0; i < keysArray.length; i++)
	{
		if (key == keysArray[i]) 
		{
			keyPressed = true;
			break;
		}
	}
		
	if (keyPressed)
		ClearKeyQueue();
	else
	{
		if (onMap)
			UpdateMapEngine();
		WaitForKeys(keysArray, onMap);
	}
}

// Removes Whitespace from the beginning of a string
function TrimWhiteSpace(str) 
{  
	if(str.charAt(0) == " ")
		str = TrimWhiteSpace(str.substring(1));

	return str;
}
	