RequireScript("Queue.js");
RequireScript("Animation.js");
RequireScript("Colors.js");
RequireScript("Keys.js");
RequireScript("Sprite.js");
RequireScript("BattleAction.js");
RequireScript("Character.js");
RequireScript("Battler.js");
RequireScript("Game.js");
RequireScript("Globals.js");
RequireScript("Menu.js");
RequireScript("Map.js");
RequireScript("Screen.js");
RequireScript("Battle.js");

function game()
{
	Map.BattleBg = LoadImage("Battle/Backgrounds/map.png");
	var bgBattleMusic = LoadSound("Music/ThoseWhoFightFurther.ogg");
	var battle = new Battle(new Array("BadGuy1", "BadGuy1", "BadGuy1", "BadGuy2", "BadGuy3", "BadGuy3"), bgBattleMusic);
	Screen.GiveFocus(battle);
}