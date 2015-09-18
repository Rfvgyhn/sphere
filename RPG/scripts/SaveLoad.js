var file = OpenFile("save.txt");
var parLength = notSoCool.length;

function save()
{
  var clock = gTime.getTime(true);
  
  
  // Time
  file.write("hr", clock[0]);
  file.write("min", clock[1]);
  file.write("sec", clock[2]);
  
  // Party
  file.write("member1", coolGuys[0].Num);
  file.write("member2", coolGuys[1].Num);
  file.write("member3", coolGuys[2].Num);
  
  for (var i = 0; i <= parLength; i++)
    file.write("member" + (i + 4), notSoCool[i].Num);
  
  // Treasure 
  
  
  // Player's Stats
  for (var i = 0; i < 7; i++)
  {
    file.write("player" + i + "Name",   Players[i].Name);
    file.write("player" + i + "Class",  Players[i].Class);
    file.write("player" + i + "Weapon", Players[i].Weapon);
    file.write("player" + i + "Armor",  Players[i].Armor);
    file.write("player" + i + "Access", Players[i].Access);
    file.write("player" + i + "Head",   Players[i].Head);
    file.write("player" + i + "Lv",     Players[i].Level);
    file.write("player" + i + "HP",     Players[i].HP);
    file.write("player" + i + "THP",    Players[i].THP);
    file.write("player" + i + "MP",     Players[i].MP);
    file.write("player" + i + "TMP",    Players[i].TMP);
    file.write("player" + i + "DP",     Players[i].DP);
    file.write("player" + i + "TDP",    Players[i].TDP);
    file.write("player" + i + "EXP",    Players[i].EXP);
    file.write("player" + i + "pEXP",   Players[i].pEXP);
    file.write("player" + i + "ATK",    Players[i].ATK);
    file.write("player" + i + "DEF",    Players[i].DEF);
    file.write("player" + i + "AGL",    Players[i].AGL);
    file.write("player" + i + "ACC",    Players[i].ACC);
    file.write("player" + i + "Luck",   Players[i].Luck);
    file.write("player" + i + "Party",  Players[i].Party);
    file.write("player" + i + "Secret", Players[i].Secret);
  }
  
}

function load(what)
{
  if (what == "save")
  {
    // Time
    gTime.hours   = file.read("hr", 0);
    gTime.minutes = file.read("min", 0);
    gTime.seconds = file.read("sec", 0);
  
    // Party
    coolGuys[0] = Players[file.read("member1", 0)];
    coolGuys[1] = Players[file.read("member2", 0)];
    coolGuys[2] = Players[file.read("member3", 0)];
  
    for (var i = 0; i <= parLength; i++)
      notSoCool[i] = Players[file.read("member" + (i + 4), 0)];
  
    // Treasure
  
    // Player's Stats
    for(var i = 0; i < 7; i++)
    {
      Players[i].Name   = file.read("player" + i + "Name",   "");
      Players[i].Class  = file.read("player" + i + "Class",  "");
      Players[i].Weapon = file.read("player" + i + "Weapon", "");
      Players[i].Armor  = file.read("player" + i + "Armor",  "");
      Players[i].Access = file.read("player" + i + "Access", "");
      Players[i].Head   = file.read("player" + i + "Head",   "");
      Players[i].Level  = file.read("player" + i + "Lv",     0);
      Players[i].HP     = file.read("player" + i + "HP",     0);
      Players[i].THP    = file.read("player" + i + "THP",    0);
      Players[i].MP     = file.read("player" + i + "MP",     0);
      Players[i].TMP    = file.read("player" + i + "TMP",    0);
      Players[i].DP     = file.read("player" + i + "DP",     0);
      Players[i].TDP    = file.read("player" + i + "TDP",    0);
      Players[i].EXP    = file.read("player" + i + "EXP",    0);
      Players[i].pEXP   = file.read("player" + i + "pEXP",   0);
      Players[i].ATK    = file.read("player" + i + "ATK",    0);
      Players[i].DEF    = file.read("player" + i + "DEF",    0);
      Players[i].AGL    = file.read("player" + i + "AGL",    0);
      Players[i].ACC    = file.read("player" + i + "ACC",    0);
      Players[i].Luck   = file.read("player" + i + "Luck",   0);
      Players[i].Party  = file.read("player" + i + "Party",  false);
      Players[i].Secret = file.read("player" + i + "Secret", false);
    }
  }
  /*
  else if (what == "default")
  {
    // Time
    //gTime = new Clock();
  
    // Party
    coolGuys[0] = Players[0];
    coolGuys[1] = Players[1];
    coolGuys[2] = Players[2];
  
    //notSoCool = new Array();
  
    // Treasure

    // Player's Stats
    Players[0].Name   = "";
    Players[0].Icon   = LoadImage("Face1.png");
    Players[0].Class  = "";
    Players[0].Type   = "";
    Players[0].Weapon = "";
    Players[0].Armor  = "";
    Players[0].Access = "";
    Players[0].Head   = "";
    Players[0].Level  = 50;
    Players[0].HP     = 0;
    Players[0].THP    = 50;
    Players[0].MP     = 3;
    Players[0].TMP    = 15;
    Players[0].DP     = 3;
    Players[0].TDP    = 38;
    Players[0].EXP    = 8208750;
    Players[0].pEXP   = 3500;
    Players[0].ATK    = 15;
    Players[0].DEF    = 16;
    Players[0].AGL    = 7;
    Players[0].ACC    = 8;
    Players[0].Luck   = 4;
    Players[0].Num   = 0;
    Players[0].Party  = true;
    Players[0].Secret = false;
  
    Players[1].Name   = "";
    Players[1].Icon   = LoadImage("Face2.png");
    Players[1].Class  = "";
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
    Players[1].EXP    = 1400;
    Players[1].pEXP   = 300;
    Players[1].ATK    = 0;
    Players[1].DEF    = 0;
    Players[1].AGL    = 0;
    Players[1].ACC    = 0;
    Players[1].Luck   = 0;
    Players[1].Num   = 1;
    Players[1].Party  = true;
    Players[1].Secret = false;
  
    Players[2].Name   = "";
    Players[2].Icon   = LoadImage("Face3.png");
    Players[2].Class  = "";
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
    Players[2].EXP    = 624;
    Players[2].pEXP   = 326;
    Players[2].ATK    = 0;
    Players[2].DEF    = 0;
    Players[2].AGL    = 0;
    Players[2].ACC    = 0;
    Players[2].Luck   = 0;
    Players[2].Num   = 2;
    Players[2].Party  = true;
    Players[2].Secret = false;
  
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
    Players[3].EXP    = 1400;
    Players[3].pEXP   = 300;
    Players[3].ATK    = 0;
    Players[3].DEF    = 0;
    Players[3].AGL    = 0;
    Players[3].ACC    = 0;
    Players[3].Luck   = 0;
    Players[3].Num   = 3;
    Players[3].Party  = false;
    Players[3].Secret = false;
  
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
    Players[4].EXP    = 624;
    Players[4].pEXP   = 326;
    Players[4].ATK    = 0;
    Players[4].DEF    = 0;
    Players[4].AGL    = 0;
    Players[4].ACC    = 0;
    Players[4].Luck   = 0;
    Players[4].Num   = 4;
    Players[4].Party  = false;
    Players[4].Secret = false;
  
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
    Players[5].EXP    = 1400;
    Players[5].pEXP   = 300;
    Players[5].ATK    = 0;
    Players[5].DEF    = 0;
    Players[5].AGL    = 0;
    Players[5].ACC    = 0;
    Players[5].Luck   = 0;
    Players[5].Num   = 5;
    Players[5].Party  = false;
    Players[5].Secret = false;
  
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
    Players[6].EXP    = 624;
    Players[6].pEXP   = 326;
    Players[6].ATK    = 0;
    Players[6].DEF    = 0;
    Players[6].AGL    = 0;
    Players[6].ACC    = 0;
    Players[6].Luck   = 0;
    Players[6].Num    = 6;
    Players[6].Party  = false;
    Players[6].Secret = false;
  }*/
  else
    Abort("Specify Load() Parameter");
}