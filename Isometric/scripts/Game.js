function Game()
{
	this.ScreenHeight = GetScreenHeight();
	this.ScreenWidth  = GetScreenWidth();
	this.WindowStyle  = GetSystemWindowStyle();
	this.FontMain     = GetSystemFont();
}

var Game = new Game();