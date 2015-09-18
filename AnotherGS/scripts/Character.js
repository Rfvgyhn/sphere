function Character(hp, pp, atk, def, agl, luck)
{
	var baseHp = hp;
	var basePp = pp;
	var baseAtk = atk;
	var baseDef = def;
	var baseAgl = agl;
	var baseLuck = luck;
	this.Type = null;
	this.SpriteSet = "";
	this.SpriteSetBattle = "";
	this.Name      = "";
	this.Class     = "";
	this.Icon      = "";
	this.Level     = 0;
	this.THp       = 0; // Total HP
	this.Hp        = 0; // Current HP
	this.TPp       = 0; // Total PP
	this.Pp        = 0; // Current PP
	this.Attack    = 0;
	this.Defense   = 0;
	this.Agility   = 0;
	this.Luck      = 0;
	this.Exp       = 0;
	this.Inventory = new Array();
	
	this.Clone = function()
	{
		var copy = new Character();
		
		for (var property in this)
			copy[property] = this[property];
		
		return copy;
	}
	
	this.LevelUp = function()
	{
		
	}
}

var Characters = new Array();

// Sudo enum
var CharacterType = { Hero:0, Enemy:1 };

Characters["Isaac"] = new Character(30, 20, 13, 6, 8, 3);
	Characters["Isaac"].Type = CharacterType.Hero;
	Characters["Isaac"].SpriteSet = LoadSpriteset("isaac.rss");
	Characters["Isaac"].SpriteSetBattle = LoadSpriteset("Battle/IsaacSwordBack.rss");
	Characters["Isaac"].Name = "Isaac";
	Characters["Isaac"].Class = "Squire";
	Characters["Isaac"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Isaac"].Level = 12;
	Characters["Isaac"].THp = 200;
	Characters["Isaac"].Hp = 132;
	Characters["Isaac"].TPp = 56;
	Characters["Isaac"].Pp = 14;
	Characters["Isaac"].Exp = 6800;
	
Characters["Garet"] = new Character(33, 18, 11, 8, 6, 2);
	Characters["Garet"].Type = CharacterType.Hero;
	Characters["Garet"].Name = "Garet";
	Characters["Garet"].Class = "Soldier";
	Characters["Garet"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Garet"].Level = 17;
	Characters["Garet"].THp = 300;
	Characters["Garet"].Hp = 100;
	Characters["Garet"].TPp = 23;
	Characters["Garet"].Pp = 4;
	Characters["Garet"].Exp = 123;
	
Characters["SkyDragon"] = new Character(0, 0, 0, 0, 0, 0);
	Characters["SkyDragon"].Type = CharacterType.Enemy;
	Characters["SkyDragon"].Name = "Sky Dragon";
	Characters["SkyDragon"].Class = "Soldier";
	Characters["SkyDragon"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["SkyDragon"].Level = 17;
	Characters["SkyDragon"].THp = 300;
	Characters["SkyDragon"].Hp = 100;
	Characters["SkyDragon"].TPp = 23;
	Characters["SkyDragon"].Pp = 4;
	Characters["SkyDragon"].Exp = 123;