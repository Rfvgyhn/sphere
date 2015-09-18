function Deck()
{
	this.Cards = new Array();

	this.Add = function(card)
	{
		this.Cards.push(card);
	}
	
	this.InDeck = function(card)
	{
		for (var i = 0; i < this.Cards.length; i++)
		{
			if (card.value == this.Cards[i].card.value)
				return true;
		}
		
		return false;
	}
}