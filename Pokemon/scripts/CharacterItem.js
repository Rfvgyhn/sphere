function CharacterItem(item, amount)
{
	this.item = item;
	this.amount = amount;

	this.Clone = function()
	{
		return new CharacterItem(this.item, this.amount);
	}
}