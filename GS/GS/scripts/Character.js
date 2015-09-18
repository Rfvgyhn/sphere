function Character()
{
	this.spriteset = "";
	this.name      = "";
	this.Class     = "";
	this.icon      = "";
	this.level     = 0;
	this.tHp       = 0; // Total HP
	this.hp        = 0; // Current HP
	this.tPp       = 0; // Total PP
	this.pp        = 0; // Current PP
	this.exp       = 0;
	this.inventory = new Array();
}

var Characters = new Array();

Characters["Isaac"] = new Character();
	Characters["Isaac"].spriteset = LoadSpriteset("isaac.rss");
	Characters["Isaac"].name = "Isaac";
	Characters["Isaac"].Class = "Squire";
	Characters["Isaac"].icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Isaac"].level = 12;
	Characters["Isaac"].tHp = 200;
	Characters["Isaac"].hp = 132;
	Characters["Isaac"].tPp = 56;
	Characters["Isaac"].pp = 14;
	Characters["Isaac"].exp = 6800
	Characters["Isaac"].inventory.push(Items["Apple"]);
	Characters["Isaac"].inventory.push(Items["Herb"]);
	
Characters["Garet"] = new Character();
	Characters["Garet"].name = "Garet";
	Characters["Garet"].Class = "Soldier";
	Characters["Garet"].icon = LoadImage("Faces/Isaac-icon.png");
	Characters["Garet"].level = 17;
	Characters["Garet"].tHp = 300;
	Characters["Garet"].hp = 100;
	Characters["Garet"].tPp = 23;
	Characters["Garet"].pp = 4;
	Characters["Garet"].exp = 123;
	Characters["Garet"].inventory.push(Items["Herb"]);