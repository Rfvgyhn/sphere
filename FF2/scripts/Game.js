function Game()
{
	this.ScreenHeight = GetScreenHeight();
	this.ScreenWidth  = GetScreenWidth();
	this.GbaHeight    = 160;
	this.GbaWidth     = 240;
	this.GbaX         = (this.ScreenWidth / 2) - (this.GbaWidth / 2); // 0 x coordinate for GBA screen
	this.GbaY         = (this.ScreenHeight / 2) - (this.GbaHeight / 2); // 0 y coordinate for GBA screen
	this.WindowStyle  = LoadWindowStyle("Main.rws");
	this.FontMain     = LoadFont("Main.rfn");
	this.FontBold     = LoadFont("Bold.rfn");
	this.FontBattleSmall = LoadFont("BattleSmall.rfn"); // *
	this.Party		  = new Array(Characters["Cloud"], Characters["Vincent"], Characters["Cid"]);
}

var Game = new Game();