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
	this.MaxHp       = 0;
	this.Hp        = 0;
	this.MaxMp       = 0;
	this.Mp        = 0;
	this.Attack    = 5;
	this.Defense   = 0;
	this.Agility   = 0;
	this.Luck      = 0;
	this.Exp       = 0;
	this.BattleCommands = new Array(BattleActions["Attack"], BattleActions["Magic"]);
	this.Status    = new Array();
	
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
var CharacterStatus = { Normal:0, Poison:1, Haste:2, Slow:3, Stop:4 };

Characters["Cloud"] = new Character(30, 20, 13, 6, 8, 3);
	Characters["Cloud"].Type = CharacterType.Hero;
	Characters["Cloud"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	//Characters["Cloud"].SpriteSetBattle = LoadSpriteset("Battle/IsaacSwordBack.rss");
	Characters["Cloud"].Name = "Cloud";
	Characters["Cloud"].Class = "Squire";
	//Characters["Cloud"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Cloud"].Level = 12;
	Characters["Cloud"].MaxHp = 9999;
	Characters["Cloud"].Hp = 8999;
	Characters["Cloud"].MaxMp = 56;
	Characters["Cloud"].Mp = 14;
	Characters["Cloud"].Exp = 6800;
	Characters["Cloud"].Status.push(CharacterStatus.Slow);
	
Characters["Vincent"] = new Character(33, 18, 11, 8, 6, 2);
	Characters["Vincent"].Type = CharacterType.Hero;
	Characters["Vincent"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	Characters["Vincent"].Name = "Vincent";
	Characters["Vincent"].Class = "Soldier";
	//Characters["Vincent"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Vincent"].Level = 17;
	Characters["Vincent"].MaxHp = 300;
	Characters["Vincent"].Hp = 0;
	Characters["Vincent"].MaxMp = 23;
	Characters["Vincent"].Mp = 4;
	Characters["Vincent"].Exp = 123;
	Characters["Vincent"].Status.push(CharacterStatus.Slow);
	
Characters["Cid"] = new Character(0, 0, 0, 0, 0, 0);
	Characters["Cid"].Type = CharacterType.Enemy;
	Characters["Cid"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	Characters["Cid"].Name = "Cid";
	Characters["Cid"].Class = "Soldier";
	//Characters["Cid"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Cid"].Level = 17;
	Characters["Cid"].MaxHp = 300;
	Characters["Cid"].Hp = 100;
	Characters["Cid"].MaxMp = 23;
	Characters["Cid"].Mp = 4;
	Characters["Cid"].Exp = 123;
	Characters["Cid"].Status.push(CharacterStatus.Haste);
	
Characters["BadGuy1"] = new Character(0, 0, 0, 0, 0, 0);
	Characters["BadGuy1"].Type = CharacterType.Enemy;
	Characters["BadGuy1"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	Characters["BadGuy1"].Name = "BadGuy1";
	Characters["BadGuy1"].Class = "Soldier";
	//Characters["BadGuy1"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["BadGuy1"].Level = 17;
	Characters["BadGuy1"].MaxHp = 300;
	Characters["BadGuy1"].Hp = 100;
	Characters["BadGuy1"].MaxMp = 23;
	Characters["BadGuy1"].Mp = 4;
	Characters["BadGuy1"].Exp = 123;
	Characters["BadGuy1"].Status.push(CharacterStatus.Haste);
	
Characters["BadGuy2"] = new Character(0, 0, 0, 0, 0, 0);
	Characters["BadGuy2"].Type = CharacterType.Enemy;
	Characters["BadGuy2"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	Characters["BadGuy2"].Name = "BadGuy2";
	Characters["BadGuy2"].Class = "Soldier";
	//Characters["BadGuy2"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["BadGuy2"].Level = 17;
	Characters["BadGuy2"].MaxHp = 700;
	Characters["BadGuy2"].Hp = 500;
	Characters["BadGuy2"].MaxMp = 23;
	Characters["BadGuy2"].Mp = 4;
	Characters["BadGuy2"].Exp = 123;
	Characters["BadGuy2"].Status.push(CharacterStatus.Haste);
	
Characters["BadGuy3"] = new Character(0, 0, 0, 0, 0, 0);
	Characters["BadGuy3"].Type = CharacterType.Enemy;
	Characters["BadGuy3"].SpriteSet = new Sprite(LoadSpriteset("Cloud.rss"));
	Characters["BadGuy3"].Name = "BadGuy3";
	Characters["BadGuy3"].Class = "Soldier";
	//Characters["BadGuy3"].Icon = LoadImage("Faces/Isaac-icon.png");
	Characters["BadGuy3"].Level = 17;
	Characters["BadGuy3"].MaxHp = 5000;
	Characters["BadGuy3"].Hp = 5000;
	Characters["BadGuy3"].MaxMp = 23;
	Characters["BadGuy3"].Mp = 4;
	Characters["BadGuy3"].Exp = 123;
	Characters["BadGuy3"].Status.push(CharacterStatus.Haste);