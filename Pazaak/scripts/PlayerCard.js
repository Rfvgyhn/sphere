function PlayerCard(card)
{
	var theCard = new Card();
	
	for (var i in card)
		theCard[i] = card[i];
		
	this.card = theCard;
	this.amount = 1;
}