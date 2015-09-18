function Character()
{
	this.name = "";
	this.id   = 0;
	this.money = 0;
	this.pokemon = new Array();
	this.inventory = new Array();
	this.inventory["Items"] = new Array();
	this.inventory["Key Items"] = new Array();
	this.inventory["Pok` Balls"] = new Array();
	this.inventory["Berries"] = new Array();
	this.inventory["TMs"] = new Array();
	this.sex     = "";
	this.battling = false;
	
	this.HasItemInInventory = function(theItem)
	{		
		for (var i = 0; i < this.inventory[theItem.type].length; i++)
		{
			if (this.inventory[theItem.type][i].item.name == theItem.name)
				return true;
		}
		
		return false;
	}
	
	this.ItemIndex = function(theItem)
	{
		var index;
		
		if (this.HasItemInInventory(theItem))
		{
			for (var i = 0; i < this.inventory[theItem.type].length; i++)
			{
				if (this.inventory[theItem.type][i].item.name == theItem.name)
				{
					index = i;
					break;
				}
			}
			
			return index;
		}
		else
			Abort("character_object.ItemIndex(): Character does not have item in inventory");
	}
	
	this.GiveItem = function(item, amount)
	{
		var givenItem = items[item].Clone();
		
		if (this.HasItemInInventory(givenItem))
		{
			var index = this.ItemIndex(givenItem);
			
			this.inventory[givenItem.type][index].amount += amount;
		}
		else
			this.inventory[givenItem.type].push(new CharacterItem(givenItem, amount));
	}
	
	this.TakeItem = function(theItem, amount)
	{
		var takeItem = items[theItem].Clone();
		
		if (this.HasItemInInventory(takeItem))
		{
			var index = this.ItemIndex(takeItem);
			
			if (this.inventory[takeItem.type][index].amount < amount)
				Abort("character_object.TakeItem(): Character does not have enough items to take");	
			else if (this.inventory[takeItem.type][index].amount == amount)
				this.inventory[takeItem.type].splice(index, 1);	
			else
				this.inventory[takeItem.type][index].amount -= amount;
		}
		else
			Abort("character_object.TakeItem(): Character does not have item to take");
	}
}

var characters = new Array();
	
characters["MainChar"] = new Character();
	characters["MainChar"].name  = "Lont";
	characters["MainChar"].id    = 12345;
	characters["MainChar"].money = 2345;
	characters["MainChar"].pokemon[0] = pokemon[001].Clone();
	characters["MainChar"].pokemon[1] = pokemon[016].Clone();
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["HyperPotion"].Clone(), 15));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["HyperPotion3"].Clone(), 32));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["HyperPotion2"].Clone(), 99));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["Potion"].Clone(), 2));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["Potion2"].Clone(), 2));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["FullRestore"].Clone(), 5));
	characters["MainChar"].inventory["Items"].push(new CharacterItem(items["Potion3"].Clone(), 7));
	characters["MainChar"].inventory["Key Items"].push(new CharacterItem(items["Bicycle"].Clone(), 1));
	characters["MainChar"].sex   = "Boy";