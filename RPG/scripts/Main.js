RequireSystemScript("time.js")
RequireScript("Clock.js");
RequireScript("colors.js");
RequireScript("MainMenu.js");
RequireScript("Missions.js");
RequireScript("Items.js");
RequireScript("Players.js");
RequireScript("SaveLoad.js");

////////// Globals //////////
var gFont1     = LoadFont("MenuNumbers.rfn");
var gFont2     = LoadFont("MenuText.rfn");
var gFont3     = LoadFont("MenuDesc.rfn");
var gFont4     = GetSystemFont();
var gFont5     = LoadFont("Big.rfn");
var gSelWindow = LoadWindowStyle("Selection.rws");
var gShowMiss  = 0;  // Options - Show mission by:
var gFunds     = 2345;
var gTime      = new Clock();
  //gTime.hours = 23;

// game()
// This does ...
function game() 
{
  CreatePerson("isaac","isaac.rss", false);
  AttachInput("isaac");
  AttachCamera("isaac");
  BindKey(KEY_CTRL, "MainMenu()", "");
  intro();
} // End game


// MainMenu()
// Creates a new instance of Menu()
// Called from MainMenu.js
function MainMenu()
{
  var menu = new Menu();
  menu.execute();
} // End MainMenu

function intro()
{
  ApplyColorMask(Black);
  /*
  for (var i = 0; i <= 50; i ++)
  {
   var x = 160 - gFont2.getStringWidth("INTRODUCTION!");
   var y = 120 - gFont2.getHeight();
   var string = "INTRODUCTION!";
    gFont2.setColorMask(CreateColor(255, 255, 255, 255 - i*6));
    gFont2.drawZoomedText(x - i*4, y + i/4, i/4, string);
    Delay(100);
    FlipScreen();
  }
  */
  var selection  = 1;
  var window = LoadWindowStyle("Window.rws");
  var arrow = LoadImage("SelArrow.png");
  var sound = LoadSound("Chime Up.mid");
  
  while(true)
  {
    // Blit the stuff
    //gBack.blit(0, 0);
    Rectangle(0, 0, 320, 240, mQuit);
    //window.drawWindow(149, 117, 30, 22);
    arrow.blit(144, 117 + 9 * selection);
    
    // Draw options
    Text(141, 105, "text", "Load?");
    Text(155, 115, "text", "Yes");
    Text(155, 124, "text", "No");
    Text(155, 133, "text", "Exit");
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_DOWN:
        {
          if (selection == 2)
            selection = 0;
          else
            selection++;
          break;
        }
        
        case KEY_UP:
        {
          if (selection == 0)
            selection = 2;
          else
            selection--;
          break;
        }
        
        case KEY_Z:
        {
          if (selection == 0)
          {
            load("save"); // Called from SaveLoad.js
            gTime.start();
            MapEngine("test2.rmp",60);
          }
          else if (selection == 1)
          {
            sound.play(false);
            coolGuys[0] = Players[0];
            coolGuys[1] = Players[1];
            coolGuys[2] = Players[2];
            
            Players[0].Name = createName(6, false, "LARRY");
            Delay(500);
            Players[1].Name = createName(6, false, "Blah");
            Delay(500);
            Players[2].Name = createName(6, false, "LARY");
            gTime.start();
            MapEngine("test2.rmp",60);
          }
          else
            Exit();
        }
        
        case KEY_X:
        {
          selection = 1;
          break;
        }
      } // End switch
    } // End while keys
  } // End while true
  
  
}
// Text()
// Text function that draws all
// sorts of different fonts with
// drop shadows and such
function Text(x, y, font, str, type, color)
{
  // font = "num" "stroke" "big" or "text"
  if (color == undefined)
    color = White;
    
  if (font == "num")
  {
    if (type != undefined)
    {
      if (str <= type * .2)
      {
        gFont1.setColorMask(Black);
        gFont1.drawText(x + 1, y + 1, str);
        gFont1.setColorMask(fYellow);
        gFont1.drawText(x, y, str);
       }
      else
      {
        gFont1.setColorMask(Black);
        gFont1.drawText(x + 1, y + 1, str);
        gFont1.setColorMask(color);
        gFont1.drawText(x, y, str);
      }
    }
    else
    {
      gFont1.setColorMask(Black);
      gFont1.drawText(x + 1, y + 1, str);
      gFont1.setColorMask(color);
      gFont1.drawText(x, y, str);
    }
  }
  else if (font == "text")
  {
    if (type != undefined)
    {
      gFont2.setColorMask(Black);
      gFont2.drawTextBox(x + 1, y + 1, 142, 164, type, str);
      gFont2.setColorMask(color);
      gFont2.drawTextBox(x, y, 142, 164, type, str);
    }
    else
    {
      gFont2.setColorMask(Black);
      gFont2.drawText(x + 1, y + 1, str);
      gFont2.setColorMask(color);
      gFont2.drawText(x, y, str);
    }
  }

  else if (font == "stroke")
  {
    gFont2.setColorMask(Black);
    gFont2.drawText(x + 1, y,     str);
    gFont2.drawText(x - 1, y,     str);
    gFont2.drawText(x    , y + 1, str);
    gFont2.drawText(x    , y - 1, str);
    gFont2.setColorMask(color);
    gFont2.drawText(x, y, str);
  }
  else if (font == "big")
  {
    gFont5.setColorMask(Black);
    gFont5.drawText(x + 1, y + 1, str);
    gFont5.setColorMask(color);
    gFont5.drawText(x, y, str);
  }
  else
  {
    gFont4.setColorMask(Black);
    gFont4.drawText(x + 2, y + 2, str);
    gFont4.setColorMask(color);
    gFont4.drawText(x, y, str);
  }
} // End Text

// createName()
// Creates names for characters
function createName(maxLength, atMap, defaultName)
{
  var name  = "";
  var error = "";
  
  if (defaultName != undefined)
    name = defaultName;
    
  while (true)
  {
    if (atMap == true)
      RenderMap();
  
    if (AreKeysLeft())
    { 
    if (IsKeyPressed(KEY_ENTER))
    {
      if (name.length > 0)
        return name;
    }
    
    if (name.length < maxLength)        
      name += GetKeyString(GetKey(), IsKeyPressed(KEY_SHIFT));
    else
      error = "Char limit reached!";
      
    if (IsKeyPressed(KEY_BACKSPACE)) 
      name = name.slice(0, name.length - 1) + name.slice(name.length + 1);
    }
    
    Text(5, 5, "text", "Enter Hero's Name: " + name);
    Text(5, 15, "text", error);

    FlipScreen();
  }
} 

function yesNo(title, yes, no, bg, x ,y, width, height)
{
	// Init vars
  var selection  = 1;
  var window     = LoadWindowStyle("Window.rws");
  var arrow      = LoadImage("SelArrow.png");
  
  while(true)
  {
    // Blit the stuff
    bg.blit(0, 0);
    Rectangle(0, 0, 320, 240, mQuit);
    window.drawWindow(x, y, width, height);
    arrow.blit(x - 5, y + 9 * selection);
    
    // Draw text
    Text(141, 105, "text", title);
    Text(155, 115, "text", "Yes");
    Text(155, 124, "text", "No");
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_DOWN:
        {
          if (selection == 0)
            selection = 1;
          else
            selection = 0;
          break;
        }
        
        case KEY_UP:
        {
          if (selection == 1)
            selection = 0;
          else
            selection = 1;
          break;
        }
        
        case KEY_Z:
        {
          if (selection == 0)
            yes();
          else
          {
						if(gTime.paused)
							gTime.unpause();
							
						if(no == "return")
							return;
							
            no();
            break;
          }
        }
        
        case KEY_X:
        {
          selection = 1;
          break;
        }
      } // End switch
    } // End while keys
  } // End while true
}

function getMillis()
{
  var clock = gTime.getTime(true);

  return ((clock[2] * 1000) + (clock[1] * 1000 * 60) + (clock[0] * 1000 * 60 * 60));
}