function Item()
{
	this.name = "";
	this.desc = "";
	this.selected = false;  // Is Key Item selected for shortcut key
	this.icon = "";
	this.type = ""; // Items, KeyItems, Balls, TMs, Berries
	
	this.Use = function(pokemon) { }
}

Item.prototype.Clone = function()
{
	var copyOfItem = new Item();
	
	for (var property in this)
		copyOfItem[property] = this[property]
	/*
	copyOfItem.name     = this.name;
	copyOfItem.desc     = this.desc;
	copyOfItem.selected = this.selected;
	copyOfItem.icon     = this.icon;
	copyOfItem.type     = this.type;
	copyOfItem.Use      = this.Use;
	*/
	
	return copyOfItem;
}

var items = new Array();
	items["Potion"] = new Item();
	items["Potion"].name     = "Potion";
	items["Potion"].desc     = "A spray-type wound medicine.\nIt restores the HP of one POK`MON by 20 points.";
	items["Potion"].selected = false;
	items["Potion"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["Potion"].type     = "Items";
	items["Potion"].Use = function(pokemon)
	{
		var text = "";
		
		if (pokemon.hp != pokemon.maxHp)
		{
			if (pokemon.hp + 20 > pokemon.maxHp)
			{
				text = pokemon.name.toUpperCase() + "'s HP was restored\nby " + (pokemon.maxHp - pokemon.hp) + " point(s).";
				pokemon.hp += pokemon.maxHp - pokemon.hp;				
			}
			else
			{
				pokemon.hp += 20;
				text = pokemon.name.toUpperCase() + "'s HP was restored\nby 20 point(s).";
			}
			
			characters["MainChar"].TakeItem("Potion", 1);
			bagMenu.RefreshItems();
		}
		else
			text = "It won't have any effect.";
			
		return text;
	}
	
	items["HyperPotion"] = new Item();
	items["HyperPotion"].name     = "Hyper Potion";
	items["HyperPotion"].desc     = "A spray-type wound medicine.\nIt restores the HP of one POK`MON by 200 points.";
	items["HyperPotion"].selected = false;
	items["HyperPotion"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["HyperPotion"].type     = "Items";
	items["HyperPotion"].Use = function(pokemon)
	{
		var text = "";
		
		if (pokemon.hp != pokemon.maxHp)
		{
			if (pokemon.hp + 200 > pokemon.maxHp)
			{
				text = pokemon.name.toUpperCase() + "'s HP was restored\nby " + (pokemon.maxHp - pokemon.hp) + " point(s).";
				pokemon.hp += pokemon.maxHp - pokemon.hp;				
			}
			else
			{
				pokemon.hp += 200;
				text = pokemon.name.toUpperCase() + "'s HP was restored\nby 200 point(s).";
			}
			
			characters["MainChar"].TakeItem("HyperPotion", 1);
			bagMenu.RefreshItems();
		}
		else
			text = "It won't have any effect.";
			
		return text;
	}
	
	items["Potion2"] = new Item();
	items["Potion2"].name     = "Potion2";
	items["Potion2"].desc     = "A spray-type wound medicine. It restorse the HP of one POK`MON by 200 points.";
	items["Potion2"].selected = false;
	items["Potion2"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["Potion2"].type     = "Items";
	
	items["FullRestore"] = new Item();
	items["FullRestore"].name     = "Full Restore";
	items["FullRestore"].desc     = "A medicine that fully restores the HP and heals any status problems of one POK`MON.";
	items["FullRestore"].selected = false;
	items["FullRestore"].icon     = LoadImage("Icons/Items/FullRestore.png");
	items["FullRestore"].type     = "Items";
	
	items["HyperPotion2"] = new Item();
	items["HyperPotion2"].name     = "Hyper Potion2";
	items["HyperPotion2"].desc     = "";
	items["HyperPotion2"].selected = false;
	items["HyperPotion2"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["HyperPotion2"].type     = "Items";
	
	items["Potion3"] = new Item();
	items["Potion3"].name     = "Potion3";
	items["Potion3"].desc     = "";
	items["Potion3"].selected = false;
	items["Potion3"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["Potion3"].type     = "Items";
	
	items["HyperPotion3"] = new Item();
	items["HyperPotion3"].name     = "Hyper Potion3";
	items["HyperPotion3"].desc     = "";
	items["HyperPotion3"].selected = false;
	items["HyperPotion3"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["HyperPotion3"].type     = "Items";
	
	items["Bicycle"] = new Item();
	items["Bicycle"].name     = "Bicycle";
	items["Bicycle"].desc     = "";
	items["Bicycle"].selected = true;
	items["Bicycle"].icon     = LoadImage("Icons/Items/HyperPotion.png");
	items["Bicycle"].type     = "Key Items";