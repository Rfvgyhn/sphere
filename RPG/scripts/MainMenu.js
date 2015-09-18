////////////////////
// MainMenu.js
// When CTRL is pressed
// This menu appears
////////////////////

// Var for quit menu
var gBack;

function Menu()
{
  if (this instanceof Menu == false)
    return new Menu();
}

function Icon()
{
  this.spot  = 0;
  this.x     = 0;
  this.image = "";
  this.desc  = "";
  this.exe   = function() {};
}

///// EXP COUNTER (TEMP) /////
function counter()
{
  var blah = 0;
  for (var i = 1; i <=99; i++)
  {
    blah += Math.pow(i * 10, 2) / 4;
  }
  return blah;
}
//////////////////////////////

// Generates bar width for HP and MP
function bars(who, what)
{
  if (what == "HP")
    if (who.HP > 1)
      return Math.ceil(who.HP / who.THP * 58);
      
    else if (who.HP == 0)
      return 0;
      
    else
      return 1;
  else
    if (who.MP > 1)
      return Math.ceil(who.MP / who.TMP * 58);
      
    else if (who.MP == 0)
      return 0;
      
    else
     return 1;
}

Menu.prototype.execute = function()
{
  // Init vars
  var background  = LoadImage("Menu/Menu.png")
  var selection   = 4;
  var scrollRight = false;   // if true, scroll menu icons right
  var scrollLeft  = false;   // if true, scroll menu icons left
  var tempx       = 0;       // how much to scroll menu icons
  var sound = LoadSound("Swish.mid");
  var sound2 = LoadSound("scroll.wav");
  
  var icons = new Array();
    icons[0] = new Icon();
    icons[0].image = LoadImage("Menu/mQuit.png");
    icons[0].spot  = 0;
    icons[0].x     = 37;
    icons[0].desc  = "Quit";
    icons[0].exe   = quit;
      
    icons[1] = new Icon();
    icons[1].image = LoadImage("Menu/mOptions.png");
    icons[1].spot  = 1;
    icons[1].x     = 65;
    icons[1].desc  = "Options";
    icons[1].exe   = options;
    
    icons[2] = new Icon();
    icons[2].image = LoadImage("Menu/mParty.png");
    icons[2].spot  = 2;
    icons[2].x     = 93;
    icons[2].desc  = "Party";
    icons[2].exe   = party;
    
    icons[3] = new Icon();
    icons[3].image = LoadImage("Menu/mMissions.png");
    icons[3].spot  = 3;
    icons[3].x     = 121;
    icons[3].desc  = "Missions";
    icons[3].exe   = missions;
   
    icons[4] = new Icon();
    icons[4].image = LoadImage("Menu/mItems.png");
    icons[4].spot  = 4;
    icons[4].x     = 149;
    icons[4].desc  = "Items";
    icons[4].exe   = items;
      
    icons[5] = new Icon();
    icons[5].image = LoadImage("Menu/mEquip.png");
    icons[5].spot  = 5;
    icons[5].x     = 177;
    icons[5].desc  = "Equip";
    icons[5].exe   = equip;
    
    icons[6] = new Icon();
    icons[6].image = LoadImage("Menu/mAbilities.png");
    icons[6].spot  = 6;
    icons[6].x     = 205;
    icons[6].desc  = "Abilities";
    icons[6].exe   = abilities;
    
    icons[7] = new Icon();
    icons[7].image = LoadImage("Menu/mDevelop.png");
    icons[7].spot  = 7;
    icons[7].x     = 233;
    icons[7].desc  = "Status";
    icons[7].exe   = status;
    
    icons[8] = new Icon();
    icons[8].image = LoadImage("Menu/mQuit.png");
    icons[8].spot  = 8;
    icons[8].x     = 261;
    icons[8].desc  = "Save";
    icons[8].exe   = save; // Called from SaveLoad.js
  
  while(true)
  {
    // Update Timer
    var clock = gTime.getTime(true);
    
    // Draw the stuff
      // Blit the map
    RenderMap();
    
      // Blit the menu back
    Rectangle(6, 6, 308, 228, gWinColor);
    background.blit(0, 0);
    
    // Scroll the icons
    if (scrollRight)
    {
      if (tempx <= 27)
        tempx += 2;
      else
      {
        sound.play(false);
        for (var i = 0; i <= 8; i++)
        {
          if (icons[i].x < 261)
            icons[i].x += tempx;
          else
            icons[i].x = 37;
        }
        if (selection == 0)
          selection = 8;
        else
          selection--;
        tempx = 0;
        scrollRight = false;
      }
    }
    
    if (scrollLeft)
    {
      if (tempx >= -27)
        tempx -= 2;
      else
      {
        sound.play(false);
        for (var i = 0; i <= 8; i++)
        {
          if (icons[i].x > 37)
            icons[i].x += tempx;
          else
            icons[i].x = 261;
        }
        if (selection == 8)
          selection = 0;
        else
          selection++;
        tempx = 0;
        scrollLeft = false;
      }
    }
    
      // Blit the menu icons
    for (var i = 0; i <= 8; i++)
    {
      if (icons[i].x < 38 || icons[i].x > 260)
        icons[i].image.blitMask(icons[i].x + tempx, 10, mTrans1);
      
      else if (icons[i].x < 94 || icons[i].x > 206)
        icons[i].image.blitMask(icons[i].x + tempx, 10, mTrans2);
      
      else if (icons[i].x < 122 || icons[i].x > 176)  
        icons[i].image.blitMask(icons[i].x + tempx, 10, mTrans3);
      
      else
        icons[i].image.blit(icons[i].x + tempx, 10);
    }
    
     // Blit the HP, MP, nEXP, nDP bars and Icons
    coolGuys[0].Icon.blit(60, 52);
    coolGuys[1].Icon.blit(60, 108);
    coolGuys[2].Icon.blit(60, 164);
    
    Rectangle(127,  56, bars(coolGuys[0], "HP"), 2, mGreen);
    Rectangle(127,  67, bars(coolGuys[0], "MP"), 2, mBlue);
    Rectangle(127,  78, coolGuys[0].pEXP / coolGuys[0].nEXP * 58, 2, mYellow);
    Rectangle(127,  89, coolGuys[0].TDP  / coolGuys[0].nDP  * 58, 2, mOrange);
    
    Rectangle(127, 112, bars(coolGuys[1], "HP"), 2, mGreen);
    Rectangle(127, 123, bars(coolGuys[1], "MP"), 2, mBlue);
    Rectangle(127, 134, coolGuys[1].pEXP / coolGuys[1].nEXP * 58, 2, mYellow);
    Rectangle(127, 145, coolGuys[1].TDP  / coolGuys[1].nDP  * 58, 2, mOrange);
    
    Rectangle(127, 168, bars(coolGuys[2], "HP"), 2, mGreen);
    Rectangle(127, 179, bars(coolGuys[2], "MP"), 2, mBlue);
    Rectangle(127, 190, coolGuys[2].pEXP / coolGuys[2].nEXP * 58, 2, mYellow);
    Rectangle(127, 201, coolGuys[2].TDP  / coolGuys[2].nDP  * 58, 2, mOrange);
    
      // Draw the text
      
        // Names and Classes
    Text(264 - gFont2.getStringWidth(coolGuys[0].Name), 41,  "stroke", coolGuys[0].Name);
    Text(264 - gFont2.getStringWidth(coolGuys[1].Name), 97,  "stroke", coolGuys[1].Name);
    Text(264 - gFont2.getStringWidth(coolGuys[2].Name), 153, "stroke", coolGuys[2].Name);
    
    Text(264 - gFont2.getStringWidth(coolGuys[0].Class), 49,  "text", coolGuys[0].Class);
    Text(264 - gFont2.getStringWidth(coolGuys[1].Class), 105, "text", coolGuys[1].Class);
    Text(264 - gFont2.getStringWidth(coolGuys[2].Class), 161, "text", coolGuys[2].Class);
    
        // HP, MP, Next Lv, Next DP
    Text(159 - gFont1.getStringWidth(coolGuys[0].HP + "/"), 45, "num", coolGuys[0].HP, coolGuys[0].THP);
    Text(186 - gFont1.getStringWidth(coolGuys[0].THP),      45, "num", coolGuys[0].THP);
    Text(159 - gFont1.getStringWidth(coolGuys[0].MP + "/"), 56, "num", coolGuys[0].MP, coolGuys[0].TMP);
    Text(186 - gFont1.getStringWidth(coolGuys[0].TMP),      56, "num", coolGuys[0].TMP);
    Text(186 - (gFont1.getStringWidth(coolGuys[0].nEXP - coolGuys[0].pEXP)), 67, "num", coolGuys[0].nEXP - coolGuys[0].pEXP);
    Text(186 - (gFont1.getStringWidth(coolGuys[0].nDP  - coolGuys[0].TDP)),  78, "num", coolGuys[0].nDP - coolGuys[0].TDP);
    
    Text(159 - gFont1.getStringWidth(coolGuys[1].HP + "/"), 101, "num", coolGuys[1].HP, coolGuys[1].THP);
    Text(186 - gFont1.getStringWidth(coolGuys[1].THP),      101, "num", coolGuys[1].THP);    
    Text(159 - gFont1.getStringWidth(coolGuys[1].MP + "/"), 112, "num", coolGuys[1].MP, coolGuys[1].TMP);
    Text(186 - gFont1.getStringWidth(coolGuys[1].TMP),      112, "num", coolGuys[1].TMP);
    Text(186 - (gFont1.getStringWidth(coolGuys[1].nEXP - coolGuys[1].pEXP)), 123, "num", coolGuys[1].nEXP - coolGuys[1].pEXP);
    Text(186 - (gFont1.getStringWidth(coolGuys[1].nDP  - coolGuys[1].TDP)),  134, "num", coolGuys[1].nDP - coolGuys[1].TDP);
    
    Text(159 - gFont1.getStringWidth(coolGuys[2].HP + "/"), 157, "num", coolGuys[2].HP, coolGuys[2].THP);
    Text(186 - gFont1.getStringWidth(coolGuys[2].THP),      157, "num", coolGuys[2].THP);    
    Text(159 - gFont1.getStringWidth(coolGuys[2].MP + "/"), 168, "num", coolGuys[2].MP, coolGuys[2].TMP);
    Text(186 - gFont1.getStringWidth(coolGuys[2].TMP),      168, "num", coolGuys[2].TMP);
    Text(186 - (gFont1.getStringWidth(coolGuys[2].nEXP - coolGuys[2].pEXP)), 179, "num", coolGuys[2].nEXP - coolGuys[2].pEXP);
    Text(186 - (gFont1.getStringWidth(coolGuys[2].nDP  - coolGuys[2].TDP)),  190, "num", coolGuys[2].nDP - coolGuys[2].TDP);
    
    Text(155, 45,  "num", "/");
    Text(155, 56,  "num", "/");
    Text(155, 101, "num", "/");
    Text(155, 112, "num", "/");
    Text(155, 157, "num", "/");
    Text(155, 168, "num", "/");
    
        // Level and DP
    Text(208, 71,  "num", coolGuys[0].Level);
    Text(208, 82,  "num", coolGuys[0].DP);
    
    Text(208, 126, "num", coolGuys[1].Level);
    Text(208, 138, "num", coolGuys[1].DP);
    
    Text(208, 182, "num", coolGuys[2].Level);
    Text(208, 194, "num", coolGuys[2].DP);
    
        // Time Played
    Text(291 - (gFont2.getStringWidth(clock[0]) + gFont2.getStringWidth(clock[1])), 222, "text", clock[0]);
    Text(291 - (gFont2.getStringWidth(clock[1])), 222, "text", ":" + clock[1]);
    Text(294, 222, "text", ":" + clock[2]);
        
        // Funds and Description of Current Menu Selection
    Text(210 - gFont1.getStringWidth(gFunds) / 2, 222, "text", gFunds);
    Text(12, 222, "text", icons[selection].desc);
    
    // Grab background for quit menu
    gBack = GrabImage(0, 0, 320, 240);
    Text(50, 150, "text", coolGuys[0].Weapon);
    FlipScreen();
    
    // Keypresses
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_RIGHT:
        {
          scrollLeft = true;
          break;
        }
        
        case KEY_LEFT:
        {
          scrollRight = true;
          break;
        }
        
        case KEY_Z:
        {
          //var subMenu = new 
          icons[selection].exe();
          //subMenu.execute();
          break;
        }
        
        case KEY_X:
        {
          return;
        }
      } // End Switch
    } // End while keys
  } // End while true
} // End Menu.execute


////////// SubMenus //////////

////////// Template //////////
/*
  // Init vars
  
  while(true)
  {
    // Blit the stuff
    
    // Draw text
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_UP:
        {
          
          break;
        }
        
        case KEY_DOWN:
        {
          
          break;
        }
        
        case KEY_RIGHT:
        {
          
          break;
        }
        
        case KEY_LEFT:
        {
          
          break;
        }
        
        case KEY_Z:
        {
          
          break;
        }
        
        case KEY_X:
        {
          
          break;
        }
      } // End switch
    } // End while keys
  } // End while true
*/
//////////////////////////////

function quit() 
{
  // Pause timer
  gTime.pause();
  
  yesNo("Quit?", Exit, "return", gBack, 149, 117, 30, 22);
  
} // End quit

function options()
{
  // Init vars
    var selection    = 0;
    var $missions    = new Array(3);
      $missions[0]   = "Time";
      $missions[1]   = "ABC";
      $missions[2]   = "Default";
    
  while(true)
  {
    
    // Blit the stuff
      ApplyColorMask(gWinColor);
      Rectangle(10, 23 + (20 * selection), 5, 5, Orange); 
      
      
    // Draw text
      Text(20, 20, "text", "Red: "   + gWinColor.red);
      Text(20, 40, "text", "Green: " + gWinColor.green);
      Text(20, 60, "text", "Blue: "  + gWinColor.blue);
      Text(20, 80, "text", "alpha "  + gWinColor.alpha);
      Text(20, 100, "text", "Order Missions by:");
      for (var i = 0; i < 3; i++)
        Text(40 + (50 * i), 112, "text", $missions[i]);
      Text(40 + (50 * gShowMiss), 112, "text", $missions[gShowMiss], undefined, Yellow);
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_UP:
        {
          if (selection == 0)
            selection = 4;
          else
            selection--;
          break;
        }
        
        case KEY_DOWN:
        {
          if (selection == 4)
            selection = 0;
          else
            selection++;
          break;
        }
        
        case KEY_RIGHT:
        {
          switch(selection)
          {
            case 0:
            {
              gWinColor.red += 10;
              break;
            }
            
            case 1:
            {
              gWinColor.green += 10;
              break;
            }
            
            case 2:
            {
              gWinColor.blue += 10;
              break;
            }
            
            case 3:
            {
              gWinColor.alpha += 10;
              break;
            }

            case 4:
            {
              if (gShowMiss == 2)
                gShowMiss = 0;
              else
                gShowMiss++;
              break;
            }

          } // End switch
          break;
        }
        
        case KEY_LEFT:
        {
          switch(selection)
          {
            case 0:
            {
              gWinColor.red -= 10;
              break;
            }
            
            case 1:
            {
              gWinColor.green -= 10;
              break;
            }
            
            case 2:
            {
              gWinColor.blue -= 10;
              break;
            }
            
            case 3:
            {
              gWinColor.alpha -= 10;
              break;
            }
            
            case 4:
            {
              if (gShowMiss == 0)
                gShowMiss = 2;
              else
                gShowMiss--;
              break;
            }
          } // End switch
          break;
        }
        
        case KEY_Z:
        {
          
          break;
        }
        
        case KEY_X:
        {
          return;
          break;
        }
      } // End switch
    } // End while keys
  } // End while true
} // End options

function party()
{
  spare = new Array();
  // Init vars
  var background = LoadImage("Menu/Menu-Party.png");
  var arrow      = LoadImage("Party-Arrow.png");
  var arrow2     = LoadImage("Party-Arrow2.png");
  var selection  = 0;
  var column     = 1;
  var temp       = 0;  // To remember the selection in the right column
  var length     = notSoCool.length;
  var sWindow    = LoadImage("Menu/Stats-Window.png");
  var width      = gFont1.getStringWidth;
  var width2     = gFont2.getStringWidth;
  var aSpot      = 0; // Move the arrow back and forth
  
  
  while(true)
  {
    // Blit the stuff
    RenderMap();
    Rectangle(6, 6, 308, 228, gWinColor);
    background.blit(0, 0);
      
    coolGuys[0].Icon.blit(184, 16);
    coolGuys[1].Icon.blit(184, 72);
    coolGuys[2].Icon.blit(184, 128);
      
    // Draw text
      // HP and MP
    Text(276 - width(coolGuys[0].HP + "/"), 13, "num", coolGuys[0].HP, coolGuys[0].THP);
    Text(305 - width(coolGuys[0].THP),      13, "num", coolGuys[0].THP);
    Text(276 - width(coolGuys[0].MP + "/"), 24, "num", coolGuys[0].MP, coolGuys[0].TMP);
    Text(305 - width(coolGuys[0].TMP),      24, "num", coolGuys[0].TMP);
    
    Text(276 - width(coolGuys[1].HP + "/"), 69, "num", coolGuys[1].HP, coolGuys[1].THP);
    Text(305 - width(coolGuys[1].THP),      69, "num", coolGuys[1].THP);
    Text(276 - width(coolGuys[1].MP + "/"), 80, "num", coolGuys[1].MP, coolGuys[1].TMP);
    Text(305 - width(coolGuys[1].TMP),      80, "num", coolGuys[1].TMP);
    
    Text(276 - width(coolGuys[2].HP + "/"), 125, "num", coolGuys[2].HP, coolGuys[2].THP);
    Text(305 - width(coolGuys[2].THP),      125, "num", coolGuys[2].THP);
    Text(276 - width(coolGuys[2].MP + "/"), 136, "num", coolGuys[2].MP, coolGuys[2].TMP);
    Text(305 - width(coolGuys[2].TMP),      136, "num", coolGuys[2].TMP);
    
    Text(272, 13,  "num", "/");
    Text(272, 24,  "num", "/");
    Text(272, 69,  "num", "/");
    Text(272, 80,  "num", "/");
    Text(272, 125, "num", "/");
    Text(272, 136, "num", "/");
    
       
    Text(246, 35,  "num", coolGuys[0].Level);
    Text(246, 46,  "num", coolGuys[0].DP);
    
    Text(246, 91,  "num", coolGuys[1].Level);
    Text(246, 102, "num", coolGuys[1].DP);
    
    Text(246, 147, "num", coolGuys[2].Level);
    Text(246, 158, "num", coolGuys[2].DP);
    
    for (var i = 0; i < length; i++)
    { 
      sWindow.blit(9, 9 + (56 * i));
      notSoCool[i].Icon.blit(16, 16 + (56 * i));
      Text(108 - width(notSoCool[i].HP + "/"), 13 + (56 * i), "num", notSoCool[i].HP, notSoCool[i].THP);
      Text(137 - width(notSoCool[i].THP),      13 + (56 * i), "num", notSoCool[i].THP);
      Text(108 - width(notSoCool[i].MP + "/"), 24 + (56 * i), "num", notSoCool[i].MP, notSoCool[i].TMP);
      Text(137 - width(notSoCool[i].TMP),      24 + (56 * i), "num", notSoCool[i].TMP);
      Text(104, 13 + (56 * i), "num", "/");
      Text(104, 24 + (56 * i), "num", "/");
      Text(78,  35 + (56 * i), "num", notSoCool[i].Level);
      Text(78,  46 + (56 * i), "num", notSoCool[i].DP);
    }
    
    gSelWindow.drawWindow(25 + (168 * column), 25 + (56 * selection), 102, 22);
    
    if (aSpot >= 1)
      aSpot = -1;
    else
      aSpot += .03;
    
    if (column == 1)
      arrow.blit(165 + aSpot,  30 + (56 * selection));
    else
      arrow2.blit(144 + aSpot, 30 + (56 * selection));
    
    Text(305 - width2(coolGuys[0].Name), 5,    "stroke", coolGuys[0].Name);
    Text(305 - width2(coolGuys[1].Name), 61,   "stroke", coolGuys[1].Name);
    Text(305 - width2(coolGuys[2].Name), 117,  "stroke", coolGuys[2].Name);
    
    for (var i = 0; i < length; i++)
    { 
      Text(137 - width2(notSoCool[i].Name), 5 + (56 * i), "stroke", notSoCool[i].Name);
    }
    
      // Draw attack and such
    if (column == 1)
    {
      Text(234 - width2(coolGuys[selection].ATK),  185,  "num", coolGuys[selection].ATK);
      Text(234 - width2(coolGuys[selection].DEF),  196,  "num", coolGuys[selection].DEF);
      Text(234 - width2(coolGuys[selection].AGL),  209,  "num", coolGuys[selection].AGL);
      Text(234 - width2(coolGuys[selection].Luck), 221,  "num", coolGuys[selection].Luck);
    }
    else
    {
      Text(234 - width2(notSoCool[selection].ATK),  185,  "num", notSoCool[selection].ATK);
      Text(234 - width2(notSoCool[selection].DEF),  196,  "num", notSoCool[selection].DEF);
      Text(234 - width2(notSoCool[selection].AGL),  209,  "num", notSoCool[selection].AGL);
      Text(234 - width2(notSoCool[selection].Luck), 221,  "num", notSoCool[selection].Luck);
    }
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_UP:
        {
          if (column == 1)
          {
            if (selection == 0)
              selection = 2;
            else
              selection--;
          }
          else
          {
            if (selection == 0)
              selection = length - 1;
            else
              selection--;
          }
          break;
        }
        
        case KEY_DOWN:
        {
          if (column == 1)
          {
            if (selection == 2)
              selection = 0;
            else
              selection++;
          }
          else
          {
            if (selection == length - 1)
              selection = 0;
            else
              selection++;
          }
          break;
        }
        
        case KEY_Z:
        {
          if (notSoCool.length > 0)
          {
            if (column == 1)
            {
              temp = selection;
              coolGuys[selection].Party = false;
              spare.push(coolGuys[selection]);
              column = 0;
              selection = 0;
            }
            else
            {
              notSoCool[selection].Party = true;
              coolGuys.splice(temp, 1, notSoCool[selection]);
              notSoCool.splice(selection, 1, spare[0]);
              spare.pop();
              column = 1;
              selection = 0;
            }
           }
          break;
        }
        
        case KEY_X:
        {
          if (column == 0)
          {
            coolGuys[temp].Party = true;
            selection = temp;
            column = 1;
            break;
          }
          else
          {
            return;
          }
        }
      } // End switch
    } // End while keys
  } // End while true
} // End party

function missions()
{
  // Init vars
  var background  = LoadImage("Menu/Menu-Missions.png");
  //var arrow       = LoadImage("SelArrow.png");
  //var sArrowUp    = LoadImage("");
  //var sArrowUp2   = LoadImage(""); // Inactive
  //var sArrowDown  = LoadImage("");
  //var sArrowDown2 = LoadImage(""); // Inactive
  var window      = LoadImage("Menu/Menu-Missions-Border.png");
  var section     = getActive();
  var active      = getActive();
  var complete    = getComplete();
  var secLength   = section.length;
  var desc        = "";
  var toggle      = "complete"; // Active or completed
  var toggle2     = "Active";   // Opposite of toggle
  var offset      = 0;          // To scroll the desc box if needed
  var offset2     = 0;          // To scroll the missions if needed
  var offsetLimit = 0;          // To limit the amount of missions shown
  var selection   = 0;
  var column      = 0;
  var counter     = 0;
  
  while(true)
  {  
    secLength = section.length;     
    counter = 0;
    
    if (secLength > 7)
    {
      for (var i = offset2; i < offset2 + 7; i++)
      {
        if (toggle == "complete")
          section[counter] = active[i];
        else
          section[counter] = complete[i];
        counter++;
      }
    }

    // Blit the stuff
    RenderMap();
    Rectangle(6, 6, 308, 228, gWinColor);
    background.blit(0, 0);
    
    
    // Draw text
      if (secLength == 0)
        if (toggle == "complete")
          desc = "\n  No Active Missions";
        else
          desc = "\n No Completed Missions";
      else
        desc = section[selection].desc[section[selection].progress];
      
      for (var i = 0; i < secLength; i++)
      {
        if (i < 7)
        {
          window.blit(9, 9 + (31 * i));
          Text(17, 13 + (31 * i), "big", section[i].name);
        }
      }
      
      if (column == 0)
      {
        Text(157 - gFont2.getStringWidth(toggle2 + " Missions"), -2, "stroke", toggle2 + " Missions", undefined, Yellow);
        Text(249, -2, "stroke", "Description");
      }
      else
      {
        Text(157 - gFont2.getStringWidth(toggle2 + " Missions"), -2, "stroke", toggle2 + " Missions");
        Text(249, -2, "stroke", "Description", undefined, Yellow);
      }
      
      Text(168, 7,   "text", desc, offset);          // Description
      Text(209, 187, "text", getActive().length);    // Show how many missions are active
      Text(234, 198, "text", getComplete().length);  // Show how many missions are complete
      Text(260, 221, "text", toggle);                // Switch to ___
      
      gSelWindow.drawWindow(25, 25 + (31 * selection), 102, -6);
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_UP:
        {
          if (column == 0)
          {
            if (selection == 0)
              if (secLength < 8)
                selection = secLength - 1;
              else if (offset2 > 0)
              {
                offset2 = 0;
              }
              else
              {
                selection = 6;
                offset2 = secLength - 7;
              }
            else
              selection--;
          }
          else
          {
            if (offset < 0)
              offset += 11;
          }
          break;
        }
        
        case KEY_DOWN:
        {
          if (column == 0)
          {
            if (selection == 6)
            {
              if (selection == secLength - 1 - offset2)
              {
                selection = 0;
                offset2 = 0;
              }
              else
                offset2++;
            }
            else if (selection == secLength - 1)
              selection = 0;
            else
              selection++;            
          }
          else
          {
            if (gFont2.getStringHeight(desc, 142) > 164)
              if ((gFont2.getStringHeight(desc, 142) - 164) * -1 < offset)
                offset -= 11;
          }
          break;
        }
        
        case KEY_RIGHT:
        {
          if (column == 0)
          {
            if (toggle == "complete")
            {
              selection = 0;
              toggle = "active";
              toggle2 = "Complete";
              section = complete;
            }
            else
            {
              selection = 0;
              toggle = "complete";
              toggle2 = "Active"
              section = active;
            }
          } 
          break;
        }
        
        case KEY_LEFT:
        {
          if (column == 0)
          {
            if (toggle == "complete")
            {
              selection = 0;
              toggle = "active";
              toggle2 = "Complete";
              section = complete;
            }
            else
            {
              selection = 0;
              toggle = "complete";
              toggle2 = "Active"
              section = active;
            }
          } 
          break;
        }
        
        case KEY_Z:
        {
          if (section.length > 0)
          {
            if (column == 0)
              column = 1;
          }
          break;
        }
        
        case KEY_X:
        {
          if (column == 1)
            column = 0;
          else
            return;
          break;
        }
      } // End switch
    } // End while keys
  } // End while true
} // End missions

function items()
{
  var background = LoadImage("Menu/Menu.png");
  
  while(true)
  {
    RenderMap();
    Rectangle(6, 6, 308, 228, gWinColor);
    background.blit(0, 0);
    Text(20, 20, "num", "BLAHHHHH");
    
    FlipScreen();
    
    while(AreKeysLeft())
    {
      switch(GetKey())
      {
        case KEY_X:
        {
          return;
        }
      }
    }
  }
} // End items

function equip()
{
  coolGuys[0].equip("Weapon", "Sword", "Sword");
} // End equip

function abilities()
{
  
} // End abilities

function status()
{
  
} // End status