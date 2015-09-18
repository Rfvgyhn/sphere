function PkmnType()
{
	this.name = "";
	this.strength = new Array();  // Types it is strong against
	this.weakness = new Array();  // Types that are weak against it
	this.immune   = new Array();  // Types it is immune to
	this.icon     = null;
	
	// Battle Damage Multiplier
	this.Multiplier = function(type)
	{
		if (this.strength.ContainsItem(type))
			return 2;
		else if (this.weakness.ContainsItem(type))
			return 0.5;
		else if (this.immune.ContainsItem(type))
			return 0;
		else
			return 1;
	}
}

var pkmnTypes = new Array();
	pkmnTypes["Grass"] = new PkmnType();
	pkmnTypes["Grass"].name     = "Grass";
	pkmnTypes["Grass"].strength = new Array("Ground", "Rock", "Water");
	pkmnTypes["Grass"].weakness = new Array("Rock", "Steel", "Electric");
	pkmnTypes["Grass"].immune   = new Array();
	pkmnTypes["Grass"].icon     = LoadImage("Icons/Types/Grass.png");
	
	pkmnTypes["Poison"] = new PkmnType();
	pkmnTypes["Poison"].name     = "Poison";
	pkmnTypes["Poison"].strength = new Array("Grass");
	pkmnTypes["Poison"].weakness = new Array("Ghost", "Ground", "Poison", "Rock");
	pkmnTypes["Poison"].immune   = new Array();
	pkmnTypes["Poison"].icon     = LoadImage("Icons/Types/Poison.png");
	
	pkmnTypes["Flying"] = new PkmnType();
	pkmnTypes["Flying"].name     = "Flying";
	pkmnTypes["Flying"].strength = new Array("Bug", "Fighting", "Grass");
	pkmnTypes["Flying"].weakness = new Array("Electric", "Rock", "Steel");
	pkmnTypes["Flying"].immune   = new Array();
	pkmnTypes["Flying"].icon     = LoadImage("Icons/Types/Flying.png");
	
	pkmnTypes["Fire"] = new PkmnType();
	pkmnTypes["Fire"].name     = "Fire";
	pkmnTypes["Fire"].strength = new Array("Bug", "Steel", "Grass", "Ice");
	pkmnTypes["Fire"].weakness = new Array("Rock", "Dragon", "Fire", "Water");
	pkmnTypes["Fire"].immune   = new Array();
	pkmnTypes["Fire"].icon     = LoadImage("Icons/Types/Fire.png");
	