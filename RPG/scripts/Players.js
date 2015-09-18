////////////////////
// Players.js
// Stats for all heros
// and monsters go here
////////////////////

function Player()
{
  this.Name   = "";          // Name
  this.Icon   = "";          // Icon of Player
  this.Class  = "";          // Class
  this.Type   = "";          // Type of Player (Hero or Monster)
  this.Weapon = "";          // Equiped Weapon
  this.Armor  = "";          // Equiped Armor
  this.Head   = "";          // Equiped Head Gear
  this.Access = "";          // Equiped accessory
  this.Equip  = new Array(); // Is able to equip
  this.HP     = 0;           // Hit Points
  this.THP    = 0;           // Total Hit Points
  this.MP     = 0;           // Magic Points
  this.TMP    = 0;           // Total Magic Points
  this.DP     = 0;           // Development Points
  this.TDP    = 0;           // Total Development Points For Menu Bar Calc (per level)
  this.nDP    = 0            // Points to next DP gained
  this.EXP    = 0;           // Experience Points
  this.nEXP   = 0            // Points to next level
  this.pEXP   = 0;           // Experience Points For Menu Bar Calc (per level)
  this.ATK    = 0;           // Attack Points
  this.DEF    = 0;           // Defense Points
  this.AGL    = 0;           // Agility Points
  this.ACC    = 0;           // Accuracy Points
  this.Level  = 0;           // Level
  this.Luck   = 0;           // Luck Points
  this.Num    = 0;
  this.Party  = false;       // Is the Player in the Main Party
  this.Secret = false;       // Is the Player able to be in party yet
}

Player.prototype.equip = function(type, type2, what)
{ 
  // type = weapon, armor, head, access
  // type2 = type of type1 eg sword, staff, light armor, heavy armor
  // what = type name
  var equipable = false;
  
  for (var i = 0; i < this.Equip.length; i++)
  {
    if (type2 == this.Equip[i])
    {
      equipable = true;
      break;
    }
  }
  
  if (equipable)
  {
    switch(type)
    {
      case "Weapon":
      {
        this.Weapon = what;
        break;
      }
    }
  }
}

Player.prototype.useItem = function(what)
{
  switch(Items[what].Type)
  {
    case "Stat":
    {
      
      break;
    }
    
    case "Battle":
    {
      
      break;
    }
  }
}
////////// Template //////////
/*
  Players[] = new Player();
  Players[].Name   = "";
  Players[].Icon   = LoadImage("");
  Players[].Class  = "";
  Players[].Type   = "";
  Players[].Weapon = "";
  Players[].Armor  = "";
  Players[].Access = "";
  Players[].Head   = "";
  Players[].Level  = 0;
  Players[].HP     = 0;
  Players[].THP    = 0;
  Players[].MP     = 0;
  Players[].TMP    = 0;
  Players[].DP     = 0;
  Players[].TDP    = 0;
  Players[].nDP    = (Players[].Level * 10 + pow(Players[].Level, 2)) / Players[].Level;
  Players[].EXP    = 0;
  Players[].nEXP   = pow(Players[].Level * 10, 2) / 4;
  Players[].pEXP   = 0;
  Players[].ATK    = 0;
  Players[].DEF    = 0;
  Players[].AGL    = 0;
  Players[].ACC    = 0;
  Players[].Luck   = 0;
  Players[].Party  = false;
  Players[].Secret = false;
*/
with(Math)
{

var Players = new Array()
  Players[0] = new Player();
  Players[0].Name   = "";
  Players[0].Icon   = LoadImage("Face1.png");
  Players[0].Class  = "fgjhfgj";
  Players[0].Type   = "";
  Players[0].Weapon = "Weaponsdg";
  Players[0].Armor  = "";
  Players[0].Access = "";
  Players[0].Head   = "";
  Players[0].Equip  = new Array("Staff", "Sword");
  Players[0].Level  = 50;
  Players[0].HP     = 0;
  Players[0].THP    = 50;
  Players[0].MP     = 3;
  Players[0].TMP    = 15;
  Players[0].DP     = 3;
  Players[0].TDP    = 38;
  Players[0].nDP    = (Players[0].Level * 10 + pow(Players[0].Level, 2)) / Players[0].Level;
  Players[0].EXP    = 8208750;
  Players[0].nEXP   = pow(Players[0].Level * 10, 2) / 4;
  Players[0].pEXP   = 3500;
  Players[0].ATK    = 15;
  Players[0].DEF    = 16;
  Players[0].AGL    = 7;
  Players[0].ACC    = 8;
  Players[0].Luck   = 4;
  Players[0].Party  = true;
  
  Players[1] = new Player();
  Players[1].Name   = "";
  Players[1].Icon   = LoadImage("Face2.png");
  Players[1].Class  = "sdg";
  Players[1].Type   = "";
  Players[1].Weapon = "";
  Players[1].Armor  = "";
  Players[1].Access = "";
  Players[1].Head   = "";
  Players[1].Level  = 12;
  Players[1].HP     = 23;
  Players[1].THP    = 46;
  Players[1].MP     = 29;
  Players[1].TMP    = 30;
  Players[1].DP     = 0;
  Players[1].TDP    = 4;
  Players[1].nDP    = (Players[1].Level * 10 + pow(Players[1].Level, 2)) / Players[1].Level;
  Players[1].EXP    = 1400;
  Players[1].nEXP   = pow(Players[1].Level * 10, 2) / 4;
  Players[1].pEXP   = 300;
  Players[1].ATK    = 0;
  Players[1].DEF    = 0;
  Players[1].AGL    = 0;
  Players[1].ACC    = 0;
  Players[1].Luck   = 0;
  Players[1].Party  = true;
  
  Players[2] = new Player();
  Players[2].Name   = "";
  Players[2].Icon   = LoadImage("Face3.png");
  Players[2].Class  = "SDSG";
  Players[2].Type   = "";
  Players[2].Weapon = "";
  Players[2].Armor  = "";
  Players[2].Access = "";
  Players[2].Head   = "";
  Players[2].Level  = 4;
  Players[2].HP     = 2;
  Players[2].THP    = 19;
  Players[2].MP     = 14;
  Players[2].TMP    = 27;
  Players[2].DP     = 0;
  Players[2].TDP    = 7;
  Players[2].nDP    = (Players[2].Level * 10 + pow(Players[2].Level, 2)) / Players[2].Level;
  Players[2].EXP    = 624;
  Players[2].nEXP   = pow(Players[2].Level * 10, 2) / 4;
  Players[2].pEXP   = 326;
  Players[2].ATK    = 0;
  Players[2].DEF    = 0;
  Players[2].AGL    = 0;
  Players[2].ACC    = 0;
  Players[2].Luck   = 0;
  Players[2].Party  = true;
  
  Players[3] = new Player();
  Players[3].Name   = "Player4";
  Players[3].Icon   = LoadImage("Face4.png");
  Players[3].Class  = "";
  Players[3].Type   = "";
  Players[3].Weapon = "";
  Players[3].Armor  = "";
  Players[3].Access = "";
  Players[3].Head   = "";
  Players[3].Level  = 12;
  Players[3].HP     = 23;
  Players[3].THP    = 46;
  Players[3].MP     = 29;
  Players[3].TMP    = 30;
  Players[3].DP     = 0;
  Players[3].TDP    = 4;
  Players[3].nDP    = (Players[3].Level * 10 + pow(Players[3].Level, 2)) / Players[3].Level;
  Players[3].EXP    = 1400;
  Players[3].nEXP   = pow(Players[3].Level * 10, 2) / 4;
  Players[3].pEXP   = 300;
  Players[3].ATK    = 0;
  Players[3].DEF    = 0;
  Players[3].AGL    = 0;
  Players[3].ACC    = 0;
  Players[3].Luck   = 0;
  Players[3].Party  = false;
  
  Players[4] = new Player();
  Players[4].Name   = "Player5";
  Players[4].Icon   = LoadImage("Face5.png");
  Players[4].Class  = "";
  Players[4].Type   = "";
  Players[4].Weapon = "";
  Players[4].Armor  = "";
  Players[4].Access = "";
  Players[4].Head   = "";
  Players[4].Level  = 4;
  Players[4].HP     = 2;
  Players[4].THP    = 19;
  Players[4].MP     = 14;
  Players[4].TMP    = 27;
  Players[4].DP     = 0;
  Players[4].TDP    = 7;
  Players[4].nDP    = (Players[4].Level * 10 + pow(Players[4].Level, 2)) / Players[4].Level;
  Players[4].EXP    = 624;
  Players[4].nEXP   = pow(Players[4].Level * 10, 2) / 4;
  Players[4].pEXP   = 326;
  Players[4].ATK    = 0;
  Players[4].DEF    = 0;
  Players[4].AGL    = 0;
  Players[4].ACC    = 0;
  Players[4].Luck   = 0;
  Players[4].Party  = false;
  
  Players[5] = new Player();
  Players[5].Name   = "Player6";
  Players[5].Icon   = LoadImage("Face6.png");
  Players[5].Class  = "";
  Players[5].Type   = "";
  Players[5].Weapon = "";
  Players[5].Armor  = "";
  Players[5].Access = "";
  Players[5].Head   = "";
  Players[5].Level  = 12;
  Players[5].HP     = 23;
  Players[5].THP    = 46;
  Players[5].MP     = 29;
  Players[5].TMP    = 30;
  Players[5].DP     = 0;
  Players[5].TDP    = 4;
  Players[5].nDP    = (Players[5].Level * 10 + pow(Players[5].Level, 2)) / Players[5].Level;
  Players[5].EXP    = 1400;
  Players[5].nEXP   = pow(Players[5].Level * 10, 2) / 4;
  Players[5].pEXP   = 300;
  Players[5].ATK    = 0;
  Players[5].DEF    = 0;
  Players[5].AGL    = 0;
  Players[5].ACC    = 0;
  Players[5].Luck   = 0;
  Players[5].Party  = false;
  
  Players[6] = new Player();
  Players[6].Name   = "Player7";
  Players[6].Icon   = LoadImage("Face7.png");
  Players[6].Class  = "";
  Players[6].Type   = "";
  Players[6].Weapon = "";
  Players[6].Armor  = "";
  Players[6].Access = "";
  Players[6].Head   = "";
  Players[6].Level  = 4;
  Players[6].HP     = 2;
  Players[6].THP    = 19;
  Players[6].MP     = 14;
  Players[6].TMP    = 27;
  Players[6].DP     = 0;
  Players[6].TDP    = 7;
  Players[6].nDP    = (Players[6].Level * 10 + pow(Players[6].Level, 2)) / Players[6].Level;
  Players[6].EXP    = 624;
  Players[6].nEXP   = pow(Players[6].Level * 10, 2) / 4;
  Players[6].pEXP   = 326;
  Players[6].ATK    = 0;
  Players[6].DEF    = 0;
  Players[6].AGL    = 0;
  Players[6].ACC    = 0;
  Players[6].Luck   = 0;
  Players[6].Party  = false;
  
} // End With Math

var coolGuys = new Array();  // Players in active party
var notSoCool = new Array(); // Players not in active party
//inParty();

// inParty()
// This stores which characters
// are in the active party
/*
function inParty()
{
  var c = 0;
  var n = 0;
  
  for (var i = 0; i < Players.length; i++)
  {
    if (Players[i].Party)
    {
      coolGuys[c] = Players[i];  // Add to active party array
      c++;
    }
    else
    {
      if (Players[i].Secret == false)
      {
        notSoCool[n] = Players[i]; // Add to inactive party array
        n++;
      }
    }
  } // End for
} // End inParty
*/