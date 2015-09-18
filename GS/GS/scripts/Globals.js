var Globals = new Object;

///// Sounds /////
Globals.bgm = new Sound(LoadSound("Music/EmbarkOnAJourney.mp3")); // Background Music
Globals.menuEffects = new Array();
	Globals.menuEffects["Select"] = LoadSound("Effects/MenuSelect.wav");
	Globals.menuEffects["Back"] = LoadSound("Effects/MenuBack.wav");
	Globals.menuEffects["Change"] = LoadSound("Effects/MenuChangeSelection.wav");
	
///// Images /////
Globals.menuImages = new Array();
	Globals.menuImages["Bg1"] = LoadImage("Menu/Bg1.png"); // Background for item and psynergy menus
	
Globals.coolGuys = new Array();  // Player party
Globals.coolGuys.push(Characters["Isaac"]);
Globals.coolGuys.push(Characters["Garet"]);

///// Other /////
Globals.coins = 12345;