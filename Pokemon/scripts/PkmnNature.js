function PkmnNature()
{
	this.name          = "";
	this.attack        = 0;
	this.defense       = 0;
	this.spAttack      = 0;
	this.spDefense     = 0;
	this.speed         = 0;
	this.likedBlock    = "";
	this.dislikedBlock = "";
	
	this.Clone = function()
	{
		var copy = new PkmnNature();
		
		for (var property in this)
			copy[property] = this[property];
		/*
			copy.name          = this.name;
			copy.attack        = this.attack;
			copy.defense       = this.defense;
			copy.spAttack      = this.spAttack;
			copy.spDefense     = this.spDefense;
			copy.speed         = this.speed;
			copy.likedBlock    = this.likedBlock;
			copy.dislikedBlock = this.dislikedBlock;
		*/
			
		return copy;
	}
}

var pkmnNatures = new Array();
	pkmnNatures[0] = new PkmnNature();
	pkmnNatures[0].name          = "Hardy";
	pkmnNatures[0].attack        = 1;
	pkmnNatures[0].defense       = 1;
	pkmnNatures[0].spAttack      = 1;
	pkmnNatures[0].spDefense     = 1;
	pkmnNatures[0].speed         = 1;
	pkmnNatures[0].likedBlock    = "";
	pkmnNatures[0].dislikedBlock = "";
	
	pkmnNatures[1] = new PkmnNature();
	pkmnNatures[1].name          = "Docile";
	pkmnNatures[1].attack        = 1;
	pkmnNatures[1].defense       = 1;
	pkmnNatures[1].spAttack      = 1;
	pkmnNatures[1].spDefense     = 1;
	pkmnNatures[1].speed         = 1;
	pkmnNatures[1].likedBlock    = "";
	pkmnNatures[1].dislikedBlock = "";
	
	pkmnNatures[2] = new PkmnNature();
	pkmnNatures[2].name          = "Serious";
	pkmnNatures[2].attack        = 1;
	pkmnNatures[2].defense       = 1;
	pkmnNatures[2].spAttack      = 1;
	pkmnNatures[2].spDefense     = 1;
	pkmnNatures[2].speed         = 1;
	pkmnNatures[2].likedBlock    = "";
	pkmnNatures[2].dislikedBlock = "";
	
	pkmnNatures[3] = new PkmnNature();
	pkmnNatures[3].name          = "Bashful";
	pkmnNatures[3].attack        = 1;
	pkmnNatures[3].defense       = 1;
	pkmnNatures[3].spAttack      = 1;
	pkmnNatures[3].spDefense     = 1;
	pkmnNatures[3].speed         = 1;
	pkmnNatures[3].likedBlock    = "";
	pkmnNatures[3].dislikedBlock = "";
	
	pkmnNatures[4] = new PkmnNature();
	pkmnNatures[4].name          = "Quirky";
	pkmnNatures[4].attack        = 1;
	pkmnNatures[4].defense       = 1;
	pkmnNatures[4].spAttack      = 1;
	pkmnNatures[4].spDefense     = 1;
	pkmnNatures[4].speed         = 1;
	pkmnNatures[4].likedBlock    = "";
	pkmnNatures[4].dislikedBlock = "";
	
	pkmnNatures[5] = new PkmnNature();
	pkmnNatures[5].name          = "Lonely";
	pkmnNatures[5].attack        = 1.1;
	pkmnNatures[5].defense       = 0.9;
	pkmnNatures[5].spAttack      = 1;
	pkmnNatures[5].spDefense     = 1;
	pkmnNatures[5].speed         = 1;
	pkmnNatures[5].likedBlock    = "";
	pkmnNatures[5].dislikedBlock = "";
	
	pkmnNatures[6] = new PkmnNature();
	pkmnNatures[6].name          = "Brave";
	pkmnNatures[6].attack        = 1.1;
	pkmnNatures[6].defense       = 1;
	pkmnNatures[6].spAttack      = 1;
	pkmnNatures[6].spDefense     = 1;
	pkmnNatures[6].speed         = 0.9;
	pkmnNatures[6].likedBlock    = "";
	pkmnNatures[6].dislikedBlock = "";
	
	pkmnNatures[7] = new PkmnNature();
	pkmnNatures[7].name          = "Adament";
	pkmnNatures[7].attack        = 1.1;
	pkmnNatures[7].defense       = 1;
	pkmnNatures[7].spAttack      = 0.9;
	pkmnNatures[7].spDefense     = 1;
	pkmnNatures[7].speed         = 1;
	pkmnNatures[7].likedBlock    = "";
	pkmnNatures[7].dislikedBlock = "";
	
	pkmnNatures[8] = new PkmnNature();
	pkmnNatures[8].name          = "Naughty";
	pkmnNatures[8].attack        = 1.1;
	pkmnNatures[8].defense       = 1;
	pkmnNatures[8].spAttack      = 1;
	pkmnNatures[8].spDefense     = 0.9;
	pkmnNatures[8].speed         = 1;
	pkmnNatures[8].likedBlock    = "";
	pkmnNatures[8].dislikedBlock = "";
	
	pkmnNatures[9] = new PkmnNature();
	pkmnNatures[9].name          = "Bold";
	pkmnNatures[9].attack        = 0.9;
	pkmnNatures[9].defense       = 1.1;
	pkmnNatures[9].spAttack      = 1;
	pkmnNatures[9].spDefense     = 1;
	pkmnNatures[9].speed         = 1;
	pkmnNatures[9].likedBlock    = "";
	pkmnNatures[9].dislikedBlock = "";
	
	pkmnNatures[10] = new PkmnNature();
	pkmnNatures[10].name          = "Relaxed";
	pkmnNatures[10].attack        = 1;
	pkmnNatures[10].defense       = 1.1;
	pkmnNatures[10].spAttack      = 1;
	pkmnNatures[10].spDefense     = 1;
	pkmnNatures[10].speed         = 0.9;
	pkmnNatures[10].likedBlock    = "";
	pkmnNatures[10].dislikedBlock = "";
	
	pkmnNatures[11] = new PkmnNature();
	pkmnNatures[11].name          = "Impish";
	pkmnNatures[11].attack        = 1;
	pkmnNatures[11].defense       = 1.1;
	pkmnNatures[11].spAttack      = 0.9;
	pkmnNatures[11].spDefense     = 1;
	pkmnNatures[11].speed         = 1;
	pkmnNatures[11].likedBlock    = "";
	pkmnNatures[11].dislikedBlock = "";
	
	pkmnNatures[12] = new PkmnNature();
	pkmnNatures[12].name          = "Lax";
	pkmnNatures[12].attack        = 1;
	pkmnNatures[12].defense       = 1.1;
	pkmnNatures[12].spAttack      = 1;
	pkmnNatures[12].spDefense     = 0.9;
	pkmnNatures[12].speed         = 1;
	pkmnNatures[12].likedBlock    = "";
	pkmnNatures[12].dislikedBlock = "";
	
	pkmnNatures[13] = new PkmnNature();
	pkmnNatures[13].name          = "Timid";
	pkmnNatures[13].attack        = 0.9;
	pkmnNatures[13].defense       = 1;
	pkmnNatures[13].spAttack      = 1;
	pkmnNatures[13].spDefense     = 1;
	pkmnNatures[13].speed         = 1.1;
	pkmnNatures[13].likedBlock    = "";
	pkmnNatures[13].dislikedBlock = "";
	
	pkmnNatures[14] = new PkmnNature();
	pkmnNatures[14].name          = "Hasty";
	pkmnNatures[14].attack        = 1;
	pkmnNatures[14].defense       = 0.9;
	pkmnNatures[14].spAttack      = 1;
	pkmnNatures[14].spDefense     = 1;
	pkmnNatures[14].speed         = 1.1;
	pkmnNatures[14].likedBlock    = "";
	pkmnNatures[14].dislikedBlock = "";
	
	pkmnNatures[15] = new PkmnNature();
	pkmnNatures[15].name          = "Jolly";
	pkmnNatures[15].attack        = 1;
	pkmnNatures[15].defense       = 1;
	pkmnNatures[15].spAttack      = 0.9;
	pkmnNatures[15].spDefense     = 1;
	pkmnNatures[15].speed         = 1.1;
	pkmnNatures[15].likedBlock    = "";
	pkmnNatures[15].dislikedBlock = "";
	
	pkmnNatures[16] = new PkmnNature();
	pkmnNatures[16].name          = "Naive";
	pkmnNatures[16].attack        = 1;
	pkmnNatures[16].defense       = 1;
	pkmnNatures[16].spAttack      = 1;
	pkmnNatures[16].spDefense     = 0.9;
	pkmnNatures[16].speed         = 1.1;
	pkmnNatures[16].likedBlock    = "";
	pkmnNatures[16].dislikedBlock = "";
	
	pkmnNatures[17] = new PkmnNature();
	pkmnNatures[17].name          = "Modest";
	pkmnNatures[17].attack        = 0.9;
	pkmnNatures[17].defense       = 1;
	pkmnNatures[17].spAttack      = 1.1;
	pkmnNatures[17].spDefense     = 1;
	pkmnNatures[17].speed         = 1;
	pkmnNatures[17].likedBlock    = "";
	pkmnNatures[17].dislikedBlock = "";
	
	pkmnNatures[18] = new PkmnNature();
	pkmnNatures[18].name          = "Mild";
	pkmnNatures[18].attack        = 1;
	pkmnNatures[18].defense       = 0.9;
	pkmnNatures[18].spAttack      = 1.1;
	pkmnNatures[18].spDefense     = 1;
	pkmnNatures[18].speed         = 1;
	pkmnNatures[18].likedBlock    = "";
	pkmnNatures[18].dislikedBlock = "";
	
	pkmnNatures[19] = new PkmnNature();
	pkmnNatures[19].name          = "Quiet";
	pkmnNatures[19].attack        = 1;
	pkmnNatures[19].defense       = 1;
	pkmnNatures[19].spAttack      = 1.1;
	pkmnNatures[19].spDefense     = 1;
	pkmnNatures[19].speed         = 0.9;
	pkmnNatures[19].likedBlock    = "";
	pkmnNatures[19].dislikedBlock = "";
	
	pkmnNatures[20] = new PkmnNature();
	pkmnNatures[20].name          = "Rash";
	pkmnNatures[20].attack        = 1;
	pkmnNatures[20].defense       = 1;
	pkmnNatures[20].spAttack      = 1.1;
	pkmnNatures[20].spDefense     = 0.9;
	pkmnNatures[20].speed         = 1;
	pkmnNatures[20].likedBlock    = "";
	pkmnNatures[20].dislikedBlock = "";
	
	pkmnNatures[21] = new PkmnNature();
	pkmnNatures[21].name          = "Calm";
	pkmnNatures[21].attack        = 0.9;
	pkmnNatures[21].defense       = 1;
	pkmnNatures[21].spAttack      = 1;
	pkmnNatures[21].spDefense     = 1.1;
	pkmnNatures[21].speed         = 1;
	pkmnNatures[21].likedBlock    = "";
	pkmnNatures[21].dislikedBlock = "";
	
	pkmnNatures[22] = new PkmnNature();
	pkmnNatures[22].name          = "Gentle";
	pkmnNatures[22].attack        = 1;
	pkmnNatures[22].defense       = 0.9;
	pkmnNatures[22].spAttack      = 1;
	pkmnNatures[22].spDefense     = 1.1;
	pkmnNatures[22].speed         = 1;
	pkmnNatures[22].likedBlock    = "";
	pkmnNatures[22].dislikedBlock = "";
	
	pkmnNatures[23] = new PkmnNature();
	pkmnNatures[23].name          = "Sassy";
	pkmnNatures[23].attack        = 1;
	pkmnNatures[23].defense       = 1;
	pkmnNatures[23].spAttack      = 1;
	pkmnNatures[23].spDefense     = 1.1;
	pkmnNatures[23].speed         = 0.9;
	pkmnNatures[23].likedBlock    = "";
	pkmnNatures[23].dislikedBlock = "";
	
	pkmnNatures[24] = new PkmnNature();
	pkmnNatures[24].name          = "Careful";
	pkmnNatures[24].attack        = 1;
	pkmnNatures[24].defense       = 1;
	pkmnNatures[24].spAttack      = 0.9;
	pkmnNatures[24].spDefense     = 1;
	pkmnNatures[24].speed         = 1.1;
	pkmnNatures[24].likedBlock    = "";
	pkmnNatures[24].dislikedBlock = "";
	