function CharacterLevelGoal()
{
	this.Pp = 0;
	this.Hp = 0;
	this.Attack = 0;
	this.Defense = 0;
	this.Agility = 0;
}

var CharacterLevelGoals = new Array();

CharacterLevelGoals["Isaac"] = new Array();
CharacterLevelGoals["Isaac"]["0"] = new CharacterLevelGoal();
CharacterLevelGoals["Isaac"]["0"].Pp = 20;
CharacterLevelGoals["Isaac"]["0"].Hp = 30;
CharacterLevelGoals["Isaac"]["0"].Attack = 13;
CharacterLevelGoals["Isaac"]["0"].Defense = 6;
CharacterLevelGoals["Isaac"]["0"].Agility = 8;

CharacterLevelGoals["Isaac"]["19"] = new CharacterLevelGoal();
CharacterLevelGoals["Isaac"]["19"].Pp = 80;
CharacterLevelGoals["Isaac"]["19"].Hp = 182;
CharacterLevelGoals["Isaac"]["19"].Attack = 86;
CharacterLevelGoals["Isaac"]["19"].Defense = 38;
CharacterLevelGoals["Isaac"]["19"].Agility = 86;

CharacterLevelGoals["Garet"] = new Array();
CharacterLevelGoals["Garet"]["0"] = new CharacterLevelGoal();
CharacterLevelGoals["Garet"]["0"].Pp = 18;
CharacterLevelGoals["Garet"]["0"].Hp = 33;
CharacterLevelGoals["Garet"]["0"].Attack = 11;
CharacterLevelGoals["Garet"]["0"].Defense = 8;
CharacterLevelGoals["Garet"]["0"].Agility = 6;

CharacterLevelGoals["Garet"]["19"] = new CharacterLevelGoal();
CharacterLevelGoals["Garet"]["19"].Pp = 76;
CharacterLevelGoals["Garet"]["19"].Hp = 191;
CharacterLevelGoals["Garet"]["19"].Attack = 83;
CharacterLevelGoals["Garet"]["19"].Defense = 41;
CharacterLevelGoals["Garet"]["19"].Agility = 76;