function PkmnMove()
{
	this.name      = "";
	this.attack    = 0;
	this.defense   = 0;
	this.speed     = 0;
	this.spAttack  = 0;
	this.spDefense = 0;
	this.accuracy  = 0;
	this.criticalHr = 0;
	this.type      = "";
	this.pp        = 0;
	this.maxPp     = 0;
	this.text      = "";
	
	this.CalculateCritical = function(giver, receiver)
	{
		var value = 0;
		
		if (!this.attack == 0)
			Math.min(1 + (giver.criticalItem * 2) + (this.criticalHr * 3) + giver.focused, 5);
	
		switch(value)
		{
			case 1:  { value = .0625; break; }
			case 2:  { value = .125; break; }
			case 3:  { value = .25; break; }
			case 4:  { value = .332; break; }
			case 5:  { value = .5; break; }
			default: { value = 0; }
		}
		
		return value;
	}
	
	this.CalculateEffectiveness = function(receiver, value)
	{
		var effectiveness = 0;
		var text = "";
		
		// Calculate Effectiveness
		if (receiver.type2 != null)
			effectiveness = this.type.Multiplier(receiver.type.name) * this.type.Multiplier(receiver.type2.name);
		else
			effectiveness = this.type.Multiplier(receiver.type.name);
		
		if (effectiveness >= 2)
			text = "It's super effective!";
		else if (effectiveness < 1 && effectiveness > 0)
			text = "It's not very effective...";
		else if (effectiveness == 0)
			text = "It doesn't effect foe " + receiver.name + "...";
		
		if (value == "text")
			return text;
		else
			return effectiveness;
	}
	
	this.CalculateMissRate = function(giver)
	{
		return (3 / (giver.stageAcc + 3)) * (this.accuracy / 100);
	}
	
	this.CalculateDamage = function(giver, receiver)
	{
		var stab = 1;
		var extra = 1;
		var effectiveness = this.CalculateEffectiveness(receiver, "");
		
		// Use sp stats or normal stats
		if (normalAttacks.ContainsItem(this.type.name))
		{
			var attack = giver.attack;
			var defense = reveiver.defense;
		}
		else if (specialAttacks.ContainsItem(this.type.name))
		{
			 var attack = giver.spAttack;
			 var defense = receiver.spDefense;
		}
		else
			Abort("pkmnMoves_object.CalculateDamage(): pkmnMove contains invalid attack type.");
		
		// Calculate if the attack is the same type as one of the pkmn's types
		if (this.type.name == giver.type || this.type.name == giver.type2)
			stab = 1.5;
			
		with (Math)
			return floor((min(floor(((2 + floor(0.4 * giver.level)) * attack * this.attack) / defense / 50), 997) + 2) * stab * effectiveness * extra * (Random(217, 255) / 255));
	}
	
	this.Use = function(giver, receiver)
	{
		var criticalHit = false;
		var returnArray = new Array();
		var text = "";
		
		// Calculate if attack misses		
		if (Math.random() > this.CalculateMissRate(giver))
			text = "Missed Sucka!";
		else
		{
			// Calculate critical hit
			if (Math.random() > 1 - this.CalculateCritical(giver, receiver))
				criticalHit = true;
				
			var damage = this.CalculateDamage(giver, receiver);
			
			if (criticalHit)
			{
				text = "Critical Hit!\n\n";
				damage *= 2;
			}
				
			text += this.CalculateEffectiveness(receiver, "text");
		}
		returnArray[0] = text;
		returnArray[1] = damage;
		return returnArray;
	}
	
	this.Clone = function()
	{
		var newMove = new PkmnMove();
		
		for (var property in this)
			newMove[property] = this[property];
		
		return newMove;
	}
}

var normalAttacks  = new Array("Normal", "Fighting", "Bug", "Rock", "Ground", "Flying", "Steel", "Poison", "Ghost");
var specialAttacks = new Array("Psychic", "Fire", "Electric", "Water", "Ice", "Dark", "Dragon", "Grass");

var pkmnMoves = new Array();
	pkmnMoves["Flamethrower"] = new PkmnMove();
	pkmnMoves["Flamethrower"].name = "Flamethrower";
	pkmnMoves["Flamethrower"].attack = 90;
	pkmnMoves["Flamethrower"].defense = 0;
	pkmnMoves["Flamethrower"].speed = 0;
	pkmnMoves["Flamethrower"].spAttack = 0;
	pkmnMoves["Flamethrower"].spDefense = 0;
	pkmnMoves["Flamethrower"].accuracy = 95;
	pkmnMoves["Flamethrower"].criticalHr = 0;
	pkmnMoves["Flamethrower"].type = pkmnTypes["Fire"];
	pkmnMoves["Flamethrower"].pp = 1;
	pkmnMoves["Flamethrower"].maxPp = 15;
	
	pkmnMoves["Poison"] = new PkmnMove();
	pkmnMoves["Poison"].name = "Poison";
	pkmnMoves["Poison"].attack = 0;
	pkmnMoves["Poison"].defense = 0;
	pkmnMoves["Poison"].speed = 0;
	pkmnMoves["Poison"].spAttack = 0;
	pkmnMoves["Poison"].spDefense = 0;
	pkmnMoves["Poison"].accuracy = 95;
	pkmnMoves["Poison"].criticalHr = 0;
	pkmnMoves["Poison"].type = pkmnTypes["Fire"];
	pkmnMoves["Poison"].pp = 1;
	pkmnMoves["Poison"].maxPp = 15;
	pkmnMoves["Poison"].text = "";
	
	pkmnMoves["Struggle"] = new PkmnMove();
	pkmnMoves["Struggle"].name = "Struggle";
	pkmnMoves["Struggle"].attack = 90;
	pkmnMoves["Struggle"].defense = 0;
	pkmnMoves["Struggle"].speed = 0;
	pkmnMoves["Struggle"].spAttack = 0;
	pkmnMoves["Struggle"].spDefense = 0;
	pkmnMoves["Struggle"].accuracy = 95;
	pkmnMoves["Struggle"].criticalHr = 20;
	pkmnMoves["Struggle"].type = pkmnTypes["Fire"];
	pkmnMoves["Struggle"].pp = 0;
	pkmnMoves["Struggle"].maxPp = 0;