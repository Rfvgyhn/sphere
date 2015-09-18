RequireScript("Colors.js");
RequireScript("Game.js");
RequireScript("Button.js");
RequireScript("Card.js");
RequireScript("Menu.js");
RequireScript("Mouse.js");
RequireScript("MessageBox.js");
RequireScript("PlayerCard.js");
RequireScript("Player.js");
RequireScript("Screen.js");
RequireScript("Globals.js");

function game()
{
	Grid.InitializeGrids();
	SetMousePosition(SCREEN_WIDTH / 2, SCREEN_HEIGHT / 2);
	Screen.AddInput(Mouse);
	
	Screen.GiveFocus(menuMain);
	
	while (!g_done)
	{
		Screen.FlipScreen();
	}
}