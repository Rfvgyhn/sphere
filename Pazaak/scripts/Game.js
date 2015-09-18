function Game()
{
	this.State = State.MainMenu;
}

var Game = new Game();

// Sudo Enum
function State()
{
	this.MainMenu = "MainMenu";
	this.ChooseDeck = "ChooseDeck";
	this.InGame = "InGame";
}

var State = new State();