RequireScript("Console.js");

function game()
{
	Console.init()
	Console.addCommand("Map", "Changes Map", "map mapName", function(parms) {
		if (!parms)
			return "needs map name";

		ChangeMap(parms[0] + ".rmp");
	});
	SetRenderScript("LeRenderScript();");
	SetUpdateScript("LeUpdateScript();");
	
	MapEngine("map.rmp", 60);
}

function LeRenderScript()
{
	Console.render();
}

function LeUpdateScript()
{
	Console.update();
	
	while (AreKeysLeft())
	{
		if (GetKey() == KEY_TILDE)
			Console.toggle();
	}
}