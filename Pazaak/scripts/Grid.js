RequireScript("Coordinate.js");

function Grid()
{
	this.chooseDeck = new GridDeck();
	
	this.InitializeGrids = function()
	{
		this.chooseDeck.X = 583;
		this.chooseDeck.Y = 83;
		this.chooseDeck.Width = 100;
		this.chooseDeck.Height = 100;
		this.chooseDeck.Deck = player.gameDeck;
		
		for (var i = 0; i < 4; i++) // Rows
		{
			this.chooseDeck.SnapTo[i] = new Array();
			
			for (var j = 0; j < 6; j++) // Columns
				this.chooseDeck.SnapTo[i][j] = new Coordinate(70 + (j * 80), 85 + (i * 85));
		}
	}
	
	this.CurrentGrid = function()
	{
		if (Game.State == State.ChooseDeck)
		{
			return this.chooseDeck;
		}
		else if (Game.State == State.InGame)
		{
			
		}
	}
}

function GridDeck()
{
	this.SnapTo = new Array();
	
	// Coords for card drag-to location
	this.X = 0;
	this.Y = 0;
	this.Width = 0;
	this.Height = 0;
	this.Deck = null;
}

var Grid = new Grid();