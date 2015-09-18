var secToLoad = GetTime();
RequireScript("Clock.js");
RequireScript("Screen.js");
RequireScript("Map.js");
RequireScript("Keys.js");
RequireScript("MessageBox.js");
RequireScript("Colors.js");
RequireScript("ChoiceBox.js");
RequireScript("FadeEffects.js");
RequireScript("PkmnType.js");
RequireScript("PkmnMove.js");
RequireScript("PkmnNature.js");
RequireScript("Time.js");
RequireScript("Globals.js");
RequireScript("Pokemon.js");
RequireScript("CharacterItem.js");
RequireScript("Item.js");
RequireScript("Character.js");
RequireScript("Menu.js");
RequireScript("Option.js");
RequireScript("Battle.js");

secToLoad = GetTime() - secToLoad;

function game()
{
	
	SetTalkActivationKey(Keys.Accept);
	CreatePerson("Dude", "Gold.rss", false);
	SetRenderScript("Screen.Render();" +
					"GetSystemFont().drawText(0, 10, \"Seconds to load game: \" + (secToLoad / 1000));");
	SetUpdateScript("Screen.Update();");
	Map.AttachInput("Dude");
	Map.GoTo("Test.rmp");
}