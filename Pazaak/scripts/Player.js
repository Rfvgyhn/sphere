RequireScript("Deck.js");

function Player()
{
	this.name       = "";
	this.score      = 0;
	this.roundWins  = 0;
	this.wins       = 0;
	this.losses     = 0;
	this.deck       = new Deck(); // All of players cards
	this.gameDeck   = new Deck(); // Cards available when in game
	this.hand       = new Deck(); // 4 random cards from gameDeck
	this.cardsDealt = 0;
	
	this.CreateHand = function()
	{
		
	}
}

var player = new Player();
	player.name = "Pazaak Champ";
	player.deck.Add(new PlayerCard(Cards["P1"]));
	player.deck.Add(new PlayerCard(Cards["P2"]));
	player.deck.Add(new PlayerCard(Cards["P3"]));
	player.deck.Add(new PlayerCard(Cards["P4"]));
	player.deck.Add(new PlayerCard(Cards["P4"]));
	player.deck.Add(new PlayerCard(Cards["P6"]));
	player.deck.Add(new PlayerCard(Cards["M1"]));
	
var opponent = new Player();
	opponent.name = "Opponent";
	opponent.deck.Add(new PlayerCard(Cards["P2"]));