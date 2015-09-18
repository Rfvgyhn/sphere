function Menu()
{
	this.done = false;
	this.bg = null;
	this.initialized = false;
	this.buttons = new Array();
	
	this.Init = function()
	{
		
	}
	
	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		this._PreRender();
		this._Render();
		this._PostRender();
	}
	
	this.AddButton = function(button)
	{
		this.buttons.push(button);
	}
}

var menuMain = new Menu();
{
	menuMain.bg = LoadImage("PazaakMenuBg.png");
	
	menuMain.Init = function()
	{
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 220, 200, 20, function() { Game.State = State.ChooseDeck; Screen.GiveFocus(chooseDeck); }, "Arcade"));
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 251, 200, 20, function() { Screen.GiveFocus(chooseDeck); }, "Campaign"));
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 282, 200, 20, function() { Screen.GiveFocus(chooseDeck); }, "Configure"));
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 313, 200, 20, function() { Screen.GiveFocus(menuInstructions); }, "Instructions"));
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 344, 200, 20, function() { Screen.RemoveAll(); g_done = true; }, "Quit"));
		
		this.initialized = true;
	}
	
	menuMain._PreRender = function()
	{
		ApplyColorMask(Colors.Black);
	}
	
	menuMain._Render = function()
	{
		this.bg.blit((SCREEN_WIDTH / 2) - (this.bg.width / 2), (SCREEN_HEIGHT / 2) - (this.bg.height / 2));
	}
	
	menuMain._PostRender = function()
	{
		for (var i = 0; i < this.buttons.length; i++)
		{
			this.buttons[i].Update();
			this.buttons[i].Render();
		}
	}
}
	
var chooseDeck = new Menu();
{
	chooseDeck.bg = LoadImage("PnlPazaakset.png");
	
	chooseDeck.Init = function()
	{
		var row = 0;
		var col = 0;
		var card = 0;
		
		for (var i = 0; i < 4; i++) // Rows
		{
			for (var j = 0; j < 6; j++) // Columns
			{
				if (player.deck.Cards[card] != undefined)
				{
					if (Math.abs(player.deck.Cards[card].card.value) == j + 1)
					{
						
						this.AddButton(new Button(70 + (j * 80),	// x
												  85 + (i * 85),	// y
												  66,	// w
												  80,	// h
												  function(){},	// click
												  player.deck.Cards[card].card.text,	// text
												  player.deck.Cards[card].card.graphic.createSurface(), 	// graphic
												  LoadImage("CardHighlight.png").createSurface(), 	// hover
												  i, 	// row
												  j)); 	// col

						
						card++;
					}
				}
			}
		}
				
		this.initialized = true;
	}
	
	chooseDeck.Update = function()
	{
		var activeButtonIndex;
		
		for (var i = 0; i < this.buttons.length; i++)
		{
			if (this.buttons[i].active)
				activeButtonIndex = i;
				
			this.buttons[i].Update();
		}
	}
	
	chooseDeck._PreRender = function()
	{
		this.bg.blit((SCREEN_WIDTH / 2) - (this.bg.width / 2), (SCREEN_HEIGHT / 2) - (this.bg.height / 2));
	}
	
	chooseDeck._Render = function()
	{
		var activeButtonIndex = -1;
		
		for (var i = 0; i < this.buttons.length; i++)
		{
			if (!this.buttons[i].active)
			{
				this.buttons[i].Render();
				DrawText(this.buttons[i].x + this.buttons[i].width - g_font.getStringWidth(player.deck.Cards[i].amount) - 2, this.buttons[i].y + this.buttons[i].height - 16 - 2, g_font, player.deck.Cards[i].amount, Colors.White);
			}
			else
				activeButtonIndex = i;
		}
		
		// Draw active button on top
		if (activeButtonIndex >= 0)
		{
			this.buttons[activeButtonIndex].Render();
			DrawText(this.buttons[activeButtonIndex].x + this.buttons[activeButtonIndex].width - g_font.getStringWidth(player.deck.Cards[activeButtonIndex].amount) - 2, this.buttons[activeButtonIndex].y + this.buttons[activeButtonIndex].height - 16 - 2, g_font, player.deck.Cards[activeButtonIndex].amount, Colors.White);
			DrawText(this.buttons[activeButtonIndex].x + this.buttons[activeButtonIndex].width - g_font.getStringWidth(player.deck.Cards[activeButtonIndex].amount) - 2, this.buttons[activeButtonIndex].y + this.buttons[activeButtonIndex].height - 16 - 2, g_font, player.deck.Cards[activeButtonIndex].amount, Colors.White);
		}
	}
	
	chooseDeck._PostRender = function()
	{

	}
}

var menuInstructions = new Menu();
{
	menuInstructions.bg = LoadImage("InstructionsBg.png");
	
	menuInstructions.Init = function()
	{
		this.AddButton(new Button((SCREEN_WIDTH / 2) - 100, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 220, 200, 20, function() { menuInstructions.done = true; }, "Arcade"));
		
		this.initialized = true;
	}
	
	menuInstructions._PreRender = function()
	{
		
	}
	
	menuInstructions._Render = function()
	{
		this.bg.blit((SCREEN_WIDTH / 2) - 320, (SCREEN_HEIGHT / 2) - 240);
		
		for (var i = 0; i < this.buttons.length; i++)
		{
			this.buttons[i].Update();
			this.buttons[i].Render();
		}
	}
	
	menuInstructions._PostRender = function()
	{
		DrawTextBox((SCREEN_WIDTH / 2) - (this.bg.width / 2) + 10, (SCREEN_HEIGHT / 2) - (this.bg.height / 2) + 100, 630, 380, g_font, g_instructions);
	}
}