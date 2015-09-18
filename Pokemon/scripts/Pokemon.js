function Pokemon()
{
	this.name          = "";
	this.sex           = "";
	this.item          = "";
	this.findPlace     = "";
	this.growSpeed     = "";
	this.ability       = "";
	this.status        = "";
	this.evolveTo      = "";
	this.height        = "";
	this.weight        = "";
	this.footPrint     = "";
	this.cry           = "";
	this.sprite        = "";
	this.spriteBack    = "";
	this.ot            = "";
	this.nature        = "";
	this.desc          = "";
	this.species       = ""; // Charmander = Lizard Pokemon
	this.nature        = "";
	this.findLevel     = 0;
	this.level         = 0;
	this.hp            = 0;
	this.maxHp         = 0;
	this.attack        = 0;
	this.defense       = 0;
	this.spAttack      = 0;
	this.spDefense     = 0;
	this.speed         = 0;
	this.evade         = 0;
	this.stageAcc      = 0;
	this.stageSpd      = 0;
	this.stageAtk      = 0;
	this.stageDef      = 0;
	this.stageSpAtk    = 0;
	this.stageSpDef    = 0;
	this.stageEvd      = 0;
	this.exp           = 0;
	this.expToNext     = 0;
	this.otId          = 0;
	this.baseExp       = 0;
	this.baseHp        = 0;
	this.baseAtk       = 0;
	this.baseDef       = 0;
	this.baseSpAtk     = 0;
	this.baseSpDef     = 0;
	this.baseSpeed     = 0;
	this.ivHp          = 0;
	this.ivAtk         = 0;
	this.ivDef         = 0;
	this.ivSpAtk       = 0;
	this.ivSpDef       = 0;
	this.ivSpeed       = 0;
	this.evHp          = 0;
	this.evAtk         = 0;
	this.evDef         = 0;
	this.evSpAtk       = 0;
	this.evSpDef       = 0;
	this.evSpeed       = 0;
	this.evolveAtLevel = 0;
	this.inDex         = false;
	this.lockedOn      = false; // Is attack locked on in battle
	this.criticalItem  = 0;  // Will pkmns item effect critical hits (for damage formula)
	this.focused       = 0;  // Has pkmn used focused energy in battle (for damage formula)
	this.moves         = new Array();
	this.type          = null;
	this.type2         = null;
	this.totalPp       = 0;
	this.dexNumber     = 0;
	this.natDexNumber  = 0;
		
	this.TotalPp = function()
	{
		var total = 0;
		
		for (var i = 0; i < this.moves.length; i++)
			total += this.moves[i].pp;
			
		return total;
	}
	
	this.ExpWon = function(wild)
	{
		if (wild)
			var wildModifier = 1;
		else
			var wildModifier = 1.5;
			
		if (this.otId == characters["MainChar"].id)
			var trainer = 1;
		else
			var trainer = 1.5;
			
		return Math.round(((this.baseExp * this.level) * trainer * wildModifier) / 7);
	}
	
	this.ExpToNext = function()
	{
		var exp = 0;
		
		switch (this.growSpeed)
		{
			case "Erratic": { exp = Math.floor(0.6 * Math.pow(this.level + 1, 3)); break; }
			case "Fast":    { exp = Math.floor(0.8 * Math.pow(this.level + 1, 3)); break; }
			case "mFast":   { exp = Math.pow(this.level + 1, 3); break; }
			case "Medium":  { exp = Math.floor((1.2 * Math.pow(this.level + 1, 3)) - (15 * Math.pow(this.level + 1, 2)) + (100 * (this.level + 1)) - 140); break; }
			case "mSlow":   { exp = Math.floor(1.25 * Math.pow(this.level + 1, 3)); break; }
			case "Slow":    { exp = Math.floor(1.64 * Math.pow(this.level + 1, 3)); break; }
		}
		
		return exp;
	}
	
	this.StartExp = function()
	{
		var exp = 0;
		
		switch (this.growSpeed)
		{
			case "Erratic": { exp = Math.floor(0.6 * Math.pow(this.level, 3)); break; }
			case "Fast":    { exp = Math.floor(0.8 * Math.pow(this.level, 3)); break; }
			case "mFast":   { exp = Math.pow(this.level, 3); break; }
			case "Medium":  { exp = Math.floor((1.2 * Math.pow(this.level, 3)) - (15 * Math.pow(this.level, 2)) + (100 * this.level) - 140); break; }
			case "mSlow":   { exp = Math.floor(1.25 * Math.pow(this.level, 3)); break; }
			case "Slow":    { exp = Math.floor(1.64 * Math.pow(this.level, 3)); break; }
		}
		
		return exp;
	}
	
	this.LevelUp = function()
	{
		this.level++;
		this.expToNext = this.ExpToNext();
		
		if (this.level >= this.evolveAtLevel && this.evolveAtLevel != 0)
			this.Evolve();
		else
			this.CalcStats();
	}
	
	this.Evolve = function()
	{
		Screen.GiveFocus(new Evolve(this));
	}
	
	this.AddExp = function(amount)
	{
		this.exp += amount;
		
		if (this.exp >= this.expToNext)
			this.LevelUp();
	}
	
	this.CalcStats = function()
	{
		with (Math)
		{
			var stats = new Array();
				stats["HP"]        = floor((((this.baseHp * 2 + this.ivHp    + floor(this.evHp / 4)) * this.level) / 100) + 10 + this.level);
				stats["Attack"]    = floor(floor((((this.baseAtk   * 2 + this.ivAtk   + floor(this.evAtk   / 4)) * this.level) / 100) + 5) * this.nature.attack);
				stats["Defense"]   = floor(floor((((this.baseDef   * 2 + this.ivDef   + floor(this.evDef   / 4)) * this.level) / 100) + 5) * this.nature.defense);
				stats["SpAttack"]  = floor(floor((((this.baseSpAtk * 2 + this.ivSpAtk + floor(this.evSpAtk / 4)) * this.level) / 100) + 5) * this.nature.spAttack);
				stats["SpDefense"] = floor(floor((((this.baseSpDef * 2 + this.ivSpDef + floor(this.evSpDef / 4)) * this.level) / 100) + 5) * this.nature.spDefense);
				stats["Speed"]     = floor(floor((((this.baseSpeed * 2 + this.ivSpeed + floor(this.evSpeed / 4)) * this.level) / 100) + 5) * this.nature.speed);
		}
		
		var statIncrease = new Array();
			statIncrease["HP"]        = stats["HP"]        - this.maxHp;
			statIncrease["Attack"]    = stats["Attack"]    - this.attack;
			statIncrease["Defense"]   = stats["Defense"]   - this.defense;
			statIncrease["SpAttack"]  = stats["SpAttack"]  - this.spAttack;
			statIncrease["SpDefense"] = stats["SpDefense"] - this.spDefense;
			statIncrease["Speed"]     = stats["Speed"]     - this.speed;
			
		this.hp       += stats["HP"] - this.maxHp;
		this.maxHp     = stats["HP"];
		this.attack    = stats["Attack"];
		this.defense   = stats["Defense"];
		this.spAttack  = stats["SpAttack"];
		this.spDefense = stats["SpDefense"];
		this.speed     = stats["Speed"];
		
		return statIncrease;
	}
		
			
	this.Clone = function()
	{
		var copyOfPokemon = new Pokemon();
		
		for (var property in this)
			copyOfPokemon[property] = this[property];

		copyOfPokemon.ivHp	  = Random(1, 31);
		copyOfPokemon.ivAtk	  = Random(1, 31);
		copyOfPokemon.ivDef	  = Random(1, 31);
		copyOfPokemon.ivSpAtk = Random(1, 31);
		copyOfPokemon.ivSpDef = Random(1, 31);
		copyOfPokemon.ivSpeed = Random(1, 31);
		copyOfPokemon.nature  = pkmnNatures[Random(0, 24)].Clone();
		copyOfPokemon.CalcStats();
		copyOfPokemon.exp       = copyOfPokemon.StartExp();
		copyOfPokemon.expToNext = copyOfPokemon.ExpToNext();
		
		return copyOfPokemon;
	}
	
	this.EvolveStats = function()
	{
		var temp = new Pokemon();
		var evolveId = this.evolveTo;
		
		for (var property in this)
			temp[property] = this[property];
		
		for (var property in pokemon[evolveId])
			this[property] = pokemon[evolveId][property];
			
		// ???Do evolved pkm keep old IVs or get new random ones???
		this.ivHp      = temp.ivHp;
		this.ivAtk     = temp.ivAtk;
		this.ivDef     = temp.ivDef;
		this.ivSpAtk   = temp.ivSpAtk;
		this.ivSpDef   = temp.ivSpDef;
		this.ivSpeed   = temp.ivSpeed;
		this.evHp      = temp.evHp;
		this.evAtk     = temp.evAtk;
		this.evDef     = temp.evDef;
		this.evSpAtk   = temp.evSpAtk;
		this.evSpDef   = temp.evSpDef;
		this.evSpeed   = temp.evSpeed;
		this.sex       = temp.sex;
		this.findPlace = temp.findPlace;
		this.findLevel = temp.findLevel;
		this.ability   = temp.ability;
		this.status    = temp.status;
		this.moves     = temp.moves;
		this.nature    = temp.nature.Clone();
		this.level     = temp.level;
		this.ot        = temp.ot;
		this.otId      = temp.otId;
		this.CalcStats();
		this.exp       = temp.exp;
		this.expToNext = temp.ExpToNext();
	}
}

function Evolve(pkmn)
{
	this.done = false;
	this.background = Map.battleBg.createSurface();
	this.evolving = false;
	this.evolved = false;
	this.message = new MessageBox(GBA_X + 16, GBA_Y + GBA_HEIGHT - 33, 208, 0, -6, g_fontBig, "What?\n" + pkmn.name + " is evolving!", g_windowStyleConvo, Colors.textBlack);
	this.messageEvolved = new MessageBox(GBA_X + 16, GBA_Y + GBA_HEIGHT - 33, 208, 0, -6, g_fontBig, pkmn.name + " evolved to " + pokemon[pkmn.evolveTo].name + ". Yeehaw!", g_windowStyleConvo, Colors.textBlack);
	this.messageStopped = new MessageBox(GBA_X + 16, GBA_Y + GBA_HEIGHT - 33, 208, 0, -6, g_fontBig, "Huh?\n" + pkmn.name + " stopped evolving!", g_windowStyleConvo, Colors.textBlack);
	this.initialized = false;
	this.startTime = GetTime();
	this.evolveTime = 3000;  // Takes 18 seconds to evolve???
	this.waitTime = 1500;  // Time to wait after first textbox has been shown
	
	this.Initialize = function()
	{
		Screen.AddRender(this.message);
		this.startTime = GetTime();
		this.background.flipHorizontally();
		this.background.resize(GBA_WIDTH, GBA_HEIGHT);
		this.initialized = true;
	}
	
	this.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				
				break;
			}
			
			case Keys.Cancel:
			{	
				if (this.evolving)
				{
					this.evolving = false;
					this.evolved = false;
					Screen.RemoveRender(this.message);
					Screen.GiveFocus(this.messageStopped);
					this.done = true;
				}
				
				break;
			}
		}
	}
	
	this._PreRender = function()
	{
		Rectangle(GBA_X, GBA_Y, GBA_WIDTH, GBA_HEIGHT, Colors.black);
		this.background.blit(GBA_X, GBA_Y);
	}
	
	this._Render = function()
	{
		if (this.evolving)
		{
			/*
				TODO: Animation stuff
			*/
		}
		else
			pkmn.sprite.blit(GBA_X + (GBA_WIDTH / 2) - (pkmn.sprite.width / 2), GBA_Y + (GBA_HEIGHT / 2) - (pkmn.sprite.height / 2));
	}
	
	this._PostRender = function()
	{
		GetSystemFont().drawText(0, 20, this.evolving);
		GetSystemFont().drawText(0, 30, this.startTime);
		
		if (this.evolving)
			DrawText(50, 120, g_fontBig, "Nifty animation stuff here", Colors.textBlack, false);
	}
	
	this.Render = function()
	{
		this._PreRender();
		this._Render();
		this._PostRender();
	}
	
	this.Update = function()
	{			
		if (this.evolving)
		{
			if (GetTime() > this.startTime + this.evolveTime)
			{
				pkmn.EvolveStats();

				this.evolving = false;
				this.evolved = true;
			}
		}
		else
		{
			if (this.evolved)
			{
				this.evolved = false;
				Screen.GiveFocus(this.messageEvolved);
				Screen.RemoveRender(this.message);
				this.done = true;
			}
			else if (GetTime() > this.startTime + this.waitTime && Screen.HasInput(this))
			{
				this.startTime = GetTime();
				this.evolving = true;
			}
		}
	}
}
///// Pokemon /////

///// Template /////
/*
	pokemon[] = new Pokemon();
	pokemon[].name          = "";
	pokemon[].sex           = "";
	pokemon[].item          = "";
	pokemon[].findPlace     = "";
	pokemon[].findLevel     = "";
	pokemon[].ability       = "";
	pokemon[].status        = "";
	pokemon[].evolveTo      = "";
	pokemon[].desc          = "";
	pokemon[].species       = "";
	pokemon[].height        = "";
	pokemon[].weight        = "";
	pokemon[].footPrint     = "";
	pokemon[].cry           = "";
	pokemon[].sprite        = "";//LoadImage("Battle/sprites/.png");
	pokemon[].spriteBack    = "";//LoadImage("Battle/sprites/Back.png");
	pokemon[].ot            = "";
	pokemon[].growSpeed     = "";
	pokemon[].evolveAtLevel = 0;
	pokemon[].level         = 0;
	pokemon[].hp            = 0;
	pokemon[].maxHp         = 0;
	pokemon[].attack        = 0;
	pokemon[].defense       = 0;
	pokemon[].spAttack      = 0;
	pokemon[].spDefense     = 0;
	pokemon[].speed         = 0;
	pokemon[].evade         = 0;
	pokemon[].stageAcc      = 0;
	pokemon[].stageSpd      = 0;
	pokemon[].stageAtk      = 0;
	pokemon[].stageDef      = 0;
	pokemon[].stageSpAtk    = 0;
	pokemon[].stageSpDef    = 0;
	pokemon[].stageEvd      = 0;
	pokemon[].exp           = 0;
	pokemon[].expToNext     = 0;
	pokemon[].otId          = 0;
	pokemon[].baseExp       = 0;
	pokemon[].baseHp        = 0;
	pokemon[].baseAtk       = 0;
	pokemon[].baseDef       = 0;
	pokemon[].baseSpAtk     = 0;
	pokemon[].baseSpDef     = 0;
	pokemon[].baseSpeed     = 0;
	pokemon[].ivHp			= 0;
	pokemon[].ivAtk			= 0;
	pokemon[].ivDef			= 0;
	pokemon[].ivSpAtk		= 0;
	pokemon[].ivSpDef		= 0;
	pokemon[].ivSpeed		= 0;
	pokemon[].evHp			= 0;
	pokemon[].evAtk			= 0;
	pokemon[].evDef			= 0;
	pokemon[].evSpAtk		= 0;
	pokemon[].evSpDef		= 0;
	pokemon[].evSpeed		= 0;
	pokemon[].totalPp       = 0;
	pokemon[].dexNumber     = 0;
	pokemon[].natDexNumber  = 0;
	pokemon[].criticalItem  = 0;
	pokemon[].focused       = 0;
	pokemon[].inDex         = false;
	pokemon[].lockedOn      = false;
	pokemon[].moves         = new Array();
	pokemon[].type          = null;
	pokemon[].type2         = null;
*/
////////////////////
	
var pokemon = new Array();
	
	pokemon[001] = new Pokemon();
	pokemon[001].name          = "Bulbasaur";
	pokemon[001].sex           = "Male";
	pokemon[001].item          = "";
	pokemon[001].findPlace     = "Hooha Town";
	pokemon[001].ability       = "";
	pokemon[001].status        = "Normal";
	pokemon[001].evolveTo      = 002;
	pokemon[001].desc          = "";
	pokemon[001].species       = "";
	pokemon[001].height        = "";
	pokemon[001].weight        = "";
	pokemon[001].footPrint     = "";
	pokemon[001].cry           = "";
	pokemon[001].sprite        = LoadImage("Battle/sprites/Bulbasaur.png");
	pokemon[001].spriteBack    = "";//LoadImage("Battle/sprites/BulbasuarBack.png");
	pokemon[001].ot            = "Blargo";
	pokemon[001].growSpeed     = "Medium";
	pokemon[001].findLevel     = 5;
	pokemon[001].evolveAtLevel = 7;
	pokemon[001].level         = 5;
	pokemon[001].hp            = 0;
	pokemon[001].maxHp         = 0;
	pokemon[001].attack        = 0;
	pokemon[001].defense       = 0;
	pokemon[001].spAttack      = 0;
	pokemon[001].spDefense     = 0;
	pokemon[001].speed         = 0;
	pokemon[001].evade         = 5;
	pokemon[001].stageAcc      = 0;
	pokemon[001].stageSpd      = 0;
	pokemon[001].stageAtk      = 0;
	pokemon[001].stageDef      = 0;
	pokemon[001].stageSpAtk    = 0;
	pokemon[001].stageSpDef    = 0;
	pokemon[001].stageEvd      = 0;
	pokemon[001].exp           = 0;
	pokemon[001].expToNext     = 0;
	pokemon[001].otId          = 12345;
	pokemon[001].baseExp       = 64;
	pokemon[001].baseHp        = 45;
	pokemon[001].baseAtk       = 49;
	pokemon[001].baseDef       = 49;
	pokemon[001].baseSpAtk     = 65;
	pokemon[001].baseSpDef     = 65;
	pokemon[001].baseSpeed     = 45;
	pokemon[001].ivHp		   = 0;
	pokemon[001].ivAtk		   = 0;
	pokemon[001].ivDef		   = 0;
	pokemon[001].ivSpAtk	   = 0;
	pokemon[001].ivSpDef	   = 0;
	pokemon[001].ivSpeed	   = 0;
	pokemon[001].evHp		   = 0;
	pokemon[001].evAtk		   = 0;
	pokemon[001].evDef		   = 0;
	pokemon[001].evSpAtk	   = 0;
	pokemon[001].evSpDef	   = 0;
	pokemon[001].evSpeed	   = 0;
	pokemon[001].totalPp       = 0;
	pokemon[001].dexNumber     = "001";
	pokemon[001].natDexNumber  = 001;
	pokemon[001].criticalItem  = 0;
	pokemon[001].focused       = 0;
	pokemon[001].inDex         = false;
	pokemon[001].lockedOn      = false;
	pokemon[001].moves         = new Array(pkmnMoves["Flamethrower"].Clone(), pkmnMoves["Flamethrower"].Clone());
	pokemon[001].type          = pkmnTypes["Grass"];
	pokemon[001].type2         = null;
	
	pokemon[002] = new Pokemon();
	pokemon[002].name          = "Ivysaur";
	pokemon[002].sex           = "";
	pokemon[002].item          = "";
	pokemon[002].findPlace     = "";
	pokemon[002].findLevel     = "";
	pokemon[002].ability       = "";
	pokemon[002].status        = "";
	pokemon[002].evolveTo      = "";
	pokemon[002].desc          = "";
	pokemon[002].species       = "";
	pokemon[002].height        = "";
	pokemon[002].weight        = "";
	pokemon[002].footPrint     = "";
	pokemon[002].cry           = "";
	pokemon[002].sprite        = LoadImage("Battle/sprites/Ivysaur.png");
	pokemon[002].spriteBack    = "";
	pokemon[002].ot            = "";
	pokemon[002].growSpeed     = "Medium";
	pokemon[002].evolveAtLevel = 36;
	pokemon[002].level         = 0;
	pokemon[002].hp            = 0;
	pokemon[002].maxHp         = 0;
	pokemon[002].attack        = 0;
	pokemon[002].defense       = 0;
	pokemon[002].spAttack      = 0;
	pokemon[002].spDefense     = 0;
	pokemon[002].speed         = 0;
	pokemon[002].evade         = 0;
	pokemon[002].stageAcc      = 0;
	pokemon[002].stageSpd      = 0;
	pokemon[002].stageAtk      = 0;
	pokemon[002].stageDef      = 0;
	pokemon[002].stageSpAtk    = 0;
	pokemon[002].stageSpDef    = 0;
	pokemon[002].stageEvd      = 0;
	pokemon[002].exp           = 0;
	pokemon[002].expToNext     = 0;
	pokemon[002].otId          = 0;
	pokemon[002].baseExp       = 141;
	pokemon[002].baseHp        = 60;
	pokemon[002].baseAtk       = 62;
	pokemon[002].baseDef       = 63;
	pokemon[002].baseSpAtk     = 80;
	pokemon[002].baseSpDef     = 80;
	pokemon[002].baseSpeed     = 80;
	pokemon[002].ivHp		   = 0;
	pokemon[002].ivAtk		   = 0;
	pokemon[002].ivDef		   = 0;
	pokemon[002].ivSpAtk	   = 0;
	pokemon[002].ivSpDef	   = 0;
	pokemon[002].ivSpeed	   = 0;
	pokemon[002].evHp		   = 0;
	pokemon[002].evAtk		   = 0;
	pokemon[002].evDef		   = 0;
	pokemon[002].evSpAtk	   = 0;
	pokemon[002].evSpDef	   = 0;
	pokemon[002].evSpeed	   = 0;
	pokemon[002].totalPp       = 0;
	pokemon[002].dexNumber     = "002";
	pokemon[002].natDexNumber  = 002;
	pokemon[002].criticalItem  = 0;
	pokemon[002].focused       = 0;
	pokemon[002].inDex         = false;
	pokemon[002].lockedOn      = false;
	pokemon[002].moves         = new Array();
	pokemon[002].type          = pkmnTypes["Grass"];
	pokemon[002].type2         = pkmnTypes["Poison"];
	
	pokemon[016] = new Pokemon();
	pokemon[016].name          = "Pidgey";
	pokemon[016].sex           = "Male";
	pokemon[016].findPlace     = "The Wild Zoo";
	pokemon[016].ability       = "";
	pokemon[016].status        = "Normal";
	pokemon[016].evolveTo      = "Pidgeotto";
	pokemon[016].desc          = "";
	pokemon[016].species       = "";
	pokemon[016].height        = "";
	pokemon[016].weight        = "";
	pokemon[016].footPrint     = "";
	pokemon[016].cry           = "";
	pokemon[016].sprite        = LoadImage("Battle/sprites/Pidgey.png");
	pokemon[016].spriteBack    = "";//LoadImage("Battle/sprites/pidgeyBack.png");
	pokemon[016].ot            = "Lont";
	pokemon[016].growSpeed     = "Erratic";
	pokemon[016].findLevel     = 2;
	pokemon[016].evolveAtLevel = 0;
	pokemon[016].level         = 3;
	pokemon[016].hp            = 0;
	pokemon[016].maxHp         = 0;
	pokemon[016].attack        = 0;
	pokemon[016].defense       = 0;
	pokemon[016].spAttack      = 0;
	pokemon[016].spDefense     = 0;
	pokemon[016].speed         = 0;
	pokemon[016].evade         = 3;
	pokemon[016].stageAcc      = 0;
	pokemon[016].stageSpd      = 0;
	pokemon[016].stageAtk      = 0;
	pokemon[016].stageDef      = 0;
	pokemon[016].stageSpAtk    = 0;
	pokemon[016].stageSpDef    = 0;
	pokemon[016].stageEvd      = 0;
	pokemon[016].exp           = 0;
	pokemon[016].expToNext     = 0;
	pokemon[016].otId          = 12345;
	pokemon[016].baseExp       = 55;
	pokemon[016].baseHp        = 40;
	pokemon[016].baseAtk       = 45;
	pokemon[016].baseDef       = 40;
	pokemon[016].baseSpAtk     = 35;
	pokemon[016].baseSpDef     = 35;
	pokemon[016].baseSpeed     = 56;
	pokemon[016].ivHp		   = 0;
	pokemon[016].ivAtk		   = 0;
	pokemon[016].ivDef		   = 0;
	pokemon[016].ivSpAtk	   = 0;
	pokemon[016].ivSpDef	   = 0;
	pokemon[016].ivSpeed	   = 0;
	pokemon[016].evHp		   = 0;
	pokemon[016].evAtk		   = 0;
	pokemon[016].evDef		   = 0;
	pokemon[016].evSpAtk	   = 0;
	pokemon[016].evSpDef	   = 0;
	pokemon[016].evSpeed	   = 0;
	pokemon[016].totalPp       = 0;
	pokemon[016].dexNumber     = "016";
	pokemon[016].natDexNumber  = 016;
	pokemon[016].criticalItem  = 0;
	pokemon[016].focused       = 0;
	pokemon[016].inDex         = false;
	pokemon[016].lockedOn      = false;
	pokemon[016].moves         = new Array(pkmnMoves["Flamethrower"].Clone());
	pokemon[016].type          = pkmnTypes["Flying"];
	pokemon[016].type2         = null;
	pokemon[016].item          = "";