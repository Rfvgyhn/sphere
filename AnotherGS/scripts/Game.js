function Game()
{
	this.ScreenHeight = GetScreenHeight();
	this.ScreenWidth  = GetScreenWidth();
	this.GbaHeight    = 160;
	this.GbaWidth     = 240;
	this.GbaX         = (this.ScreenWidth / 2) - (this.GbaWidth / 2); // 0 x coordinate for GBA screen
	this.GbaY         = (this.ScreenHeight / 2) - (this.GbaHeight / 2); // 0 y coordinate for GBA screen
	this.WindowStyle  = LoadWindowStyle("GS.rws");
	this.FontMain     = LoadFont("MainFont.rfn");
	this.FontSystem   = LoadFont("GS.rfn");
}

var Game = new Game();