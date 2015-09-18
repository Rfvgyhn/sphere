function Menu()
{
	this.selection = 0;
	this.done = false;
	this.items = new Array();
	this.pokeball = LoadImage("Pokeball.png");
	this.vars = new Object;
	this.initialized = false;
	
	this.AddItem = function(item, action, desc, icon)
	{
		var theItem = new Object;
		theItem.item     = item;
		theItem.Action   = action;// || function () {  };
		theItem.desc     = desc;
		
		if (icon != undefined)
			theItem.icon = icon;
			
		this.items[this.items.length] = theItem;
	}
	
	this.HasItems = function()
	{
		if (this.items.length > 0)
			return true;
		return false;
	}
	
	this.Initialize = function()
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
	
	this.Action = function()
	{
		
	}
}

var menuMain = new Menu();
{
	menuMain.Initialize = function()
	{
		this.items = new Array();
		this.AddItem("POKEDEX", undefined, "A device that records Pokemon secrets upon meeting or catching them.");
		this.AddItem("POK`MON", function() { Screen.GiveFocus(menuPkmnSelect); }, "Check and organize Pokemon that are traveling with you in your party.");
		this.AddItem("BAG",     function() { Screen.GiveFocus(menuBag); },        "Equipped with pockets for storing items you bought, recieved or found.");
		this.AddItem(characters["MainChar"].name.toUpperCase(),    undefined,     "Check your money and other game data.");
		this.AddItem("SAVE",    undefined, "Save your game with a complete record of your progress to take a break.");
		this.AddItem("OPTION",  function() { Screen.GiveFocus(menuOptions); }, "Adjust various game settings such as text, speed, game rules, etc.");
		this.AddItem("EXIT",    undefined, "Close this MENU window.");
		
		this.initialized = true;
	}
	menuMain.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.selection != this.items.length - 1)
				{
					this.items[this.selection].Action();
				}
				else
				{
					Delay(100); // Prevents "Talking" to anything on the map
					this.done = true;
				}
					
				break;
			}
			
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection == 0)
					this.selection = this.items.length - 1;
				else
					this.selection--;
				
				break;
			}
			
			case Keys.Down:
			{
				if (this.selection == this.items.length - 1)
					this.selection = 0;
				else
					this.selection++;
					
				break;
			}
		}
	}
	
	menuMain._PreRender = function()
	{
		
	}
	
	menuMain._Render = function()
	{
		g_windowStyle.drawWindow(SCREEN_WIDTH - 68, 7, 61, 106); // Menu border
		g_windowStyle.drawWindow(7, 7, 53, 16);  // Time border
		g_windowStyleDesc.drawWindow(1, SCREEN_HEIGHT - 37, SCREEN_WIDTH - 2, 34);
		this.pokeball.blit(SCREEN_WIDTH - 69, 9 + (this.selection * 15));
	}
	
	menuMain._PostRender = function()
	{
		DrawText(0, 30, g_fontSmall, "abcdefghijklmnopqrstuvwxyz1234567890", Colors.textWhite);
		DrawText(0, 40, g_fontSmall, "abcdefghijklmnopqrstuvwxyz".toUpperCase(), Colors.textWhite);
		DrawText(0, 130, g_fontBig, "abcdefghijklmnopqrstuvwxyz", Colors.textWhite);
		DrawText(0, 140, g_fontBig, "abcdefghijklmnopqrstuvwxyz 1234567890 ()-?\'\":;!,".toUpperCase(), Colors.textWhite);
		DrawText(0, 150, GetSystemFont(), "abcdefghijklmnopqrstuvwxyz 1234567890 ()-?\'\":;!,".toUpperCase(), Colors.textWhite);
		// Draw time
		DrawText(9, 9, g_fontBig, g_time.TheTime(g_timeFormat), Colors.textBlack);
		
		// Draw menu options
		for (var i = 0; i < this.items.length; i++)
			DrawText(SCREEN_WIDTH - 56, 9 + (i * 15), g_fontBig, this.items[i].item, Colors.textBlack);
		
		// Draw item description
		DrawTextBox(2, SCREEN_HEIGHT - 32, SCREEN_WIDTH - 2, 24, g_fontBig, this.items[this.selection].desc, Colors.textWhite);
	}
}

var menuPkmnSelect = new Menu();
{
	menuPkmnSelect.Initialize = function()
	{
		this.items = new Array();
	
		for (var i = 0; i < characters["MainChar"].pokemon.length; i++)
			this.AddItem(characters["MainChar"].pokemon[i], undefined, "");
			
		this.AddItem("Cancel", undefined, "");
		
		this.selection = 0;
		this.vars.lastSelection = 1;
	}
	
	menuPkmnSelect.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.selection == this.items.length - 1)
					this.done = true;
				else
					Screen.GiveFocus(menuPkmnSelected);

				break;
			}
			
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
			
			case Keys.Right:
			{
				if (this.vars.lastSelection == this.items.length - 1)
					this.vars.lastSelection = 1;
					
				if (this.selection == 0)
					this.selection = this.vars.lastSelection;
					
				break;
			}
			
			case Keys.Left:
			{
				if (this.selection < this.items.length - 1)
					this.selection = 0;
					
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection == 0)
					this.selection = this.items.length - 1;
				else
					this.selection--;
					
				this.vars.lastSelection = this.selection;
				
				break;
			}
			
			case Keys.Down:
			{
				if (this.selection == this.items.length - 1)
				{
					this.selection = 0;
					this.vars.lastSelection = 1;
				}
				else
				{
					this.selection++;
					this.vars.lastSelection = this.selection;
				}
					
				break;
			}
		}
	}
	
	menuPkmnSelect.Update = function()
	{
		
	}
	
	menuPkmnSelect._PreRender = function()
	{
		RenderMap();
		
		g_images["menuPkmnSelectBackground"].blit(GBA_X, GBA_Y);
		
		for (var i = 1; i < this.items.length - 1; i++)
		{
			// Pkmn Bg
			g_images["menuPkmnSelectBg"].blit(GBA_X + 98, GBA_Y + 12 + ((i - 1) * 24));
		}
	}
	
	menuPkmnSelect._Render = function()
	{
		var color;
		var colorDark;
		var hpRatio = this.items[0].item.hp / this.items[0].item.maxHp;
		
		if (hpRatio >= 0.5)
		{
			color = Colors.hpGreen;
			colorDark = Colors.hpGreenDark;
		}
		else if (hpRatio >= 0.25)
		{
			color = Colors.hpYellow;
			colorDark = Colors.hpYellowDark;
		}				
		else
		{
			color = Colors.hpRed;
			colorDark = Colors.hpRedDark;
		}
		
		with (this.vars)
		{
			g_images["menuPkmnSelectOne"].blit(GBA_X + 8, GBA_Y + 26);
			
			for (var i = 0; i < 5; i++)
			{
				g_images["menuPkmnSelectBorder"].blit(GBA_X + GBA_WIDTH - 2 - g_images["menuPkmnSelectBorder"].width, GBA_Y + 10 + ((g_images["menuPkmnSelectBorder"].height + 2) * i));
			}
			
			// Highlighted rectangle for selected pkmn
			if (this.selection > 0 && this.selection < this.items.length - 1)
				Rectangle(GBA_X + 98, GBA_Y + 12 + ((this.selection - 1) * 24), 138, 18, Colors.menuPkmnSelected);
			else if (this.selection == this.items.length - 1)
				Rectangle(GBA_X + 98, GBA_Y + 102 + ((this.selection - 1) * 24), 138, 18, Colors.menuPkmnSelected);
			else
				Rectangle(GBA_X + 11, GBA_Y + 29 + ((this.selection) * 24), 72, 43, Colors.menuPkmnSelected);
			
			// Hp Border
			g_images["hpBar"].blit(GBA_X + 17, GBA_Y + 57);
			
			// Hp Bar
			Rectangle(GBA_X + 32, GBA_Y + 59, hpRatio * 48, 1, colorDark);
			Rectangle(GBA_X + 32, GBA_Y + 60, hpRatio * 48, 2, color);
			
			for (var i = 1; i < this.items.length - 1; i++)
			{				
				// Hp Borders
				g_images["hpBar"].blit(GBA_X + 169, GBA_Y + 16 + ((i - 1) * 24));
				
				hpRatio = this.items[i].item.hp / this.items[i].item.maxHp;
				
				if (hpRatio >= 0.5)
				{
					color = Colors.hpGreen;
					colorDark = Colors.hpGreenDark;
				}
				else if (hpRatio >= 0.25)
				{
					color = Colors.hpYellow;
					colorDark = Colors.hpYellowDark;
				}				
				else
				{
					color = Colors.hpRed;
					colorDark = Colors.hpRedDark;
				}
				
				// Hp Bars
				Rectangle(GBA_X + 184, GBA_Y + 18 + (24 * (i - 1)), hpRatio * 48, 1, colorDark);
				Rectangle(GBA_X + 184, GBA_Y + 19 + (24 * (i - 1)), hpRatio * 48, 2, color);
			}
			
			g_windowStylePlain.drawWindow(GBA_X + 5, GBA_Y + 133, 174, 22);
			
			// Blit Border
			if (this.selection == 0)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 10, GBA_Y + 28, g_images["menuPkmnSelectOne"].width - 4, g_images["menuPkmnSelectOne"].height - 4);
			else if (this.selection > 0 && this.selection < this.items.length - 1)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 98, GBA_Y + 12 + (24 * (this.selection - 1)), g_images["menuPkmnSelectBorder"].width - 4, g_images["menuPkmnSelectBorder"].height - 4);
			else if (this.selection == this.items.length - 1)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 191, GBA_Y + 134, 40, 12);
		}
	}
	
	menuPkmnSelect._PostRender = function()
	{
		with (this.vars)
		{
			DrawText(GBA_X + 32, GBA_Y + 39, g_fontSmall, this.items[0].item.name.toUpperCase(), Colors.textWhite);
			DrawText(GBA_X + 81 - g_fontSmall.getStringWidth(this.items[0].item.maxHp), GBA_Y + 63, g_fontSmall, this.items[0].item.maxHp, Colors.textWhite);
			DrawText(GBA_X + 61, GBA_Y + 63, g_fontSmall, "/", Colors.textWhite);
			DrawText(GBA_X + 61 - g_fontSmall.getStringWidth(this.items[0].item.hp), GBA_Y + 63, g_fontSmall, this.items[0].item.hp, Colors.textWhite);
			
			for (var i = 1; i < this.items.length - 1; i++)
			{			
				DrawText(GBA_X + 118, GBA_Y + 15 + (24 * (i - 1)), g_fontSmall, this.items[i].item.name.toUpperCase(), Colors.textWhite);
				DrawText(GBA_X + 128, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "Lv" + this.items[i].item.level, Colors.textWhite);
				DrawText(GBA_X + 233 - g_fontSmall.getStringWidth(this.items[i].item.maxHp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].item.maxHp, Colors.textWhite);
				DrawText(GBA_X + 213, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "/", Colors.textWhite);
				DrawText(GBA_X + 213 - g_fontSmall.getStringWidth(this.items[i].item.hp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].item.hp, Colors.textWhite);
			}
			
			DrawText(GBA_X + 8, GBA_Y + 138, g_fontBig, "Choose a POK`MON", Colors.textBlack);
			
			// Cancel option
			DrawText(GBA_X + 204, GBA_Y + 140, g_fontSmall, this.items[this.items.length - 1].item.toUpperCase(), Colors.textWhite);
			
		}
	}
}

var menuPkmnSelected = new Menu();
{
	menuPkmnSelected.Initialize = function()
	{
		this.items = new Array()
		
		if (characters["MainChar"].battling)
		{
			
		}
		else
		{
			this.AddItem("SUMMARY", function(){ Screen.GiveFocus(menuPkmnSummary); }, "");
			this.AddItem("SWITCH",  undefined, "");
			this.AddItem("ITEM",    undefined, "");
			this.AddItem("CANCEL",  undefined, "");
		}
		
		this.selection = 0;
		this.vars.pokeball = LoadImage("Pokeball.png");
	}
	
	menuPkmnSelected.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Down:
			{
				if (this.selection == this.items.length - 1)
					this.selection = 0;
				else
					this.selection++;
			
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection == 0)
					this.selection = this.items.length - 1;
				else
					this.selection--;
					
				break;
			}
			
			case Keys.Accept:
			{
				if (this.selection == this.items.length - 1)
					this.done = true;
				else
					this.items[this.selection].Action();
					
				break;
			}
			
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
		}
	}

	menuPkmnSelected._PreRender = function()
	{
		// Draw text window
		g_windowStylePlain.drawWindow(GBA_X + 5, GBA_Y + 133, 134, 22);

		// Draw Menu Window
		g_windowStyle.drawWindow(GBA_X + 151, GBA_Y + 87, 82, 66);
	}
	
	menuPkmnSelected._Render = function()
	{
					
		//// Draw Border
		//if (pkmnSelectMenu.selection == 0)
			//g_windowStyleColors["Orange"].drawWindow(GBA_X + 10, GBA_Y + 28, g_images["menuPkmnSelectOne"].width - 4, g_images["menuPkmnSelectOne"].height - 4);
		//else if (pkmnSelectMenu.selection > 0 && pkmnSelectMenu.selection < pkmnSelectMenu.items.length - 1)
			//g_windowStyleColors["Orange"].drawWindow(GBA_X + 98, GBA_Y + 12 + (24 * (pkmnSelectMenu.selection - 1)), g_images["menuPkmnSelectBorder"].width - 4, g_images["menuPkmnSelectBorder"].height - 4);
			
		// Draw selection arrow
		this.vars.pokeball.blit(GBA_X + 152, GBA_Y + 91 + (this.selection * 16));
	}
	
	menuPkmnSelected._PostRender = function()
	{
		DrawText(GBA_X + 8, GBA_Y + 138, g_fontBig, "Do what with this PKMN?", Colors.textBlack);
			
		// Draw options
		for (var i = 0; i < this.items.length; i++)
			DrawText(GBA_X + 166, GBA_Y + 91 + (i * 16), g_fontBig, this.items[i].item.toUpperCase(), Colors.textBlack);
	}
}

var menuPkmnSummary = new Menu();
{
	menuPkmnSummary.Initialize = function()
	{
		this.vars.section = 0; // 0=info 1=skills 2=moves
		this.vars.pkmnIndex = menuPkmnSelect.selection;
		this.vars.selectedPkmn = characters["MainChar"].pokemon[this.vars.pkmnIndex].item;
		this.vars.pkmnLength = characters["MainChar"].pokemon.length;
		this.vars.infoBg = LoadImage("Menu/SummaryInfoBg.png");
		this.vars.skillsBg = LoadImage("Menu/SummarySkillsBg.png");
	}
	
	menuPkmnSummary.Update = function()
	{
		this.vars.selectedPkmn = characters["MainChar"].pokemon[this.vars.pkmnIndex];
	}
	
	menuPkmnSummary.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.vars.section == 0)
					this.done = true;
				else if (this.vars.section == 2)
				{}
				
				break;
			}
			
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
			
			case Keys.Right:
			{
				if (this.vars.section == 2)
					this.vars.section = 0;
				else
					this.vars.section++;
					
				break;
			}
			
			case Keys.Left:
			{
				if (this.vars.section == 0)
					this.vars.section = 2;
				else
					this.vars.section--;
					
				break;
			}
			
			case Keys.Down:
			{
				if (this.vars.pkmnIndex == this.vars.pkmnLength - 1)
					this.vars.pkmnIndex = 0;
				else
					this.vars.pkmnIndex++;
					
				break;
			}
			
			case Keys.Up:
			{
				if (this.vars.pkmnIndex == 0)
					this.vars.pkmnIndex = this.vars.pkmnLength - 1;
				else
					this.vars.pkmnIndex--;
				break;
			}
		}
	}
	
	menuPkmnSummary._PreRender = function()
	{
		if (this.vars.section == 0) // Info
		{
			this.vars.infoBg.blit(GBA_X, GBA_Y);
		}
		else if (this.vars.section == 1) // Skills
		{
			this.vars.skillsBg.blit(GBA_X, GBA_Y);
		}
		else if (this.vars.section == 2) // Moves
		{
			
		}
	}
	
	menuPkmnSummary._Render = function()
	{
		with (this.vars.selectedPkmn)
		{
			/* 
				TODO:
				Draw pokeball at (GBA_X + 100, GBA_Y + 82);
			*/ 
			sprite.blit(GBA_X + 4 + (56 - (sprite.width / 2)), GBA_Y + 33 + (31 - (sprite.height / 2)));
			
			if (this.vars.section == 0) // Info
			{
				type.icon.blit(GBA_X + 167, GBA_Y + 51);
					
				if (type2 != null)
					type2.icon.blit(GBA_X + 203, GBA_Y + 51)
			}
			else if (this.vars.section == 1) // Skills
			{
				var color;
				var colorDark;
				var hpRatio = hp / maxHp;
				
				if (hpRatio >= 0.5)
				{
					color = Colors.hpGreen;
					colorDark = Colors.hpGreenDark;
				}
				else if (hpRatio >= 0.25)
				{
					color = Colors.hpYellow;
					colorDark = Colors.hpYellowDark;
				}				
				else
				{
					color = Colors.hpRed;
					colorDark = Colors.hpRedDark;
				}
				// Hp bar
				Rectangle(GBA_X + 184, GBA_Y + 34, hpRatio * 48, 1, colorDark);
				Rectangle(GBA_X + 184, GBA_Y + 35, hpRatio * 48, 2, color);
				
				// Exp bar
				Rectangle(GBA_X + 168, GBA_Y + 130, 64 * ((exp - StartExp()) / (expToNext - StartExp())), 3, Colors.expBarBlue);
			}
			else if (this.vars.section == 2) // Moves
			{
				
			}
		}
	}
	
	menuPkmnSummary._PostRender = function()
	{
		with (this.vars.selectedPkmn)
		{
			DrawText(GBA_X + 14,  GBA_Y + 19,  g_fontBig, level, Colors.textWhite);
			DrawText(GBA_X + 40,  GBA_Y + 19,  g_fontBig, name.toUpperCase(), Colors.textWhite);
			
			/*
				TODO: Draw sex at (GBA_X + 105, GBA_Y + 19);
			*/
				
			if (this.vars.section == 0) // Info
			{
				var metInStr = "Met in " + findPlace.toUpperCase() + " at Lv " + findLevel + ".";
				DrawText(GBA_X + 167, GBA_Y + 21,  g_fontBig, dexNumber,                              Colors.textBlack);
				DrawText(GBA_X + 167, GBA_Y + 36,  g_fontBig, name.toUpperCase(),                     Colors.textBlack);
				DrawText(GBA_X + 167, GBA_Y + 66,  g_fontBig, ot.toUpperCase(),                       Colors.textBlack);
				DrawText(GBA_X + 167, GBA_Y + 81,  g_fontBig, otId,                                   Colors.textBlack);
				DrawText(GBA_X + 167, GBA_Y + 96,  g_fontBig, item.toUpperCase(),                     Colors.textBlack);
				DrawText(GBA_X + 8,   GBA_Y + 116, g_fontBig, nature.name.toUpperCase() + " nature.", Colors.textBlack);
				DrawText(GBA_X + 8,   GBA_Y + 130, g_fontBig, metInStr,                               Colors.textBlack);
			}
			else if (this.vars.section == 1) // Skills
			{
				DrawText(GBA_X + 236, GBA_Y + 21,  g_fontBig, hp + "/" + maxHp, Colors.textBlack, true);  // Hp          (236, 21)
				DrawText(GBA_X + 236, GBA_Y + 39,  g_fontBig, attack,           Colors.textBlack, true);  // Attack      (, 39)
				DrawText(GBA_X + 236, GBA_Y + 52,  g_fontBig, defense,          Colors.textBlack, true);  // def         (, 54)
				DrawText(GBA_X + 236, GBA_Y + 65,  g_fontBig, spAttack,         Colors.textBlack, true);  // spatk       (, 69)
				DrawText(GBA_X + 236, GBA_Y + 78,  g_fontBig, spDefense,        Colors.textBlack, true);  // spDef       (, 84)
				DrawText(GBA_X + 236, GBA_Y + 91,  g_fontBig, speed,            Colors.textBlack, true);  // spped       (, 99)
				DrawText(GBA_X + 236, GBA_Y + 104, g_fontBig, exp,              Colors.textBlack, true);  // exp         (, 114)
				DrawText(GBA_X + 236, GBA_Y + 117, g_fontBig, expToNext - exp,  Colors.textBlack, true);  // exp to next (, 129)
				DrawText(GBA_X + 74,  GBA_Y + 130, g_fontBig, dexNumber,        Colors.textBlack);		  // ability     (74, 130)
				DrawText(GBA_X + 10,  GBA_Y + 144, g_fontBig, dexNumber,        Colors.textBlack);		  // abilityDesc (10, 144)
			}
			else if (this.vars.section == 2) // Moves
			{
				
			}
		}
	}
}

var menuBag = new Menu();
{
	menuBag.Initialize = function()
	{
		this.vars.switchArrowLeft = LoadImage("Menu/SmallRedArrowLeft.png");
		this.vars.switchArrowRight = LoadImage("Menu/SmallRedArrowRight.png");
		this.vars.arrow = g_images["arrow"];
		this.vars.switchItem = false; // Does player want to re-order items
		this.vars.showArrows = true;  // Show red arrows
		this.vars.switchItemIndex = 0; // Index of item to re-order
		this.vars.section = "Items";
		this.vars.offset = 0;
		this.vars.selection1 = 0; // Last selection of Items bag
		this.vars.selection2 = 0; // Last selection of Key Items bag
		this.vars.selection3 = 0; // Last selection of Balls bag
		this.vars.arrowOffset = 0;
		this.vars.arrowOffsetMax = 3; // Pixels to move until switching directions
		this.vars.arrowModifier = -1;
		this.vars.time = GetTime();
		this.vars.delayTime = 80;
		
		this.initialized = true;
		this.RefreshItems();
	}

	menuBag.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				// Swap Items
				if (this.vars.switchItem)
				{
					if (this.selection != this.items.length - 1)
					{
						var switchItem = characters["MainChar"].inventory[this.vars.section][this.vars.switchItemIndex].Clone();
						var switchItem2 = characters["MainChar"].inventory[this.vars.section][this.selection].Clone();
						
						characters["MainChar"].inventory[this.vars.section].splice(this.vars.switchItemIndex, 1, switchItem2);
						characters["MainChar"].inventory[this.vars.section].splice(this.selection, 1, switchItem);
						
						this.vars.switchItem = false;
						this.RefreshItems();
					}
				}
				// Use Item
				else
				{
					if (this.selection == this.items.length - 1)
						this.done = true;
					else
					{
						this.vars.arrow = g_images["arrowGrey"];
						this.items[this.selection].Action();
					}
				}
				
				break;
			}
			
			case Keys.Cancel:
			{
				if (this.vars.switchItem)
					this.vars.switchItem = false;
				else
					this.done = true;
				break;
			}
			
			case Keys.Select:
			{
				if (this.selection != this.items.length - 1)
				{
					this.vars.switchItemIndex = this.selection;
					this.vars.switchItem = !this.vars.switchItem;
				}
				
				break;
			}
			
			case Keys.Right:
			{
				if (!this.vars.switchItem)
				{
					if (this.vars.section == "Items")
					{
						this.vars.selection1 = this.selection;
						this.selection = this.vars.selection2;
						this.vars.section = "Key Items";
					}
					else if (this.vars.section == "Key Items")
					{
						this.vars.selection2 = this.selection;
						this.selection = this.vars.selection3;
						this.vars.section = "Pok` Balls";
					}
					else
					{
						this.vars.selection3 = this.selection;
						this.selection = this.vars.selection1;
						this.vars.section = "Items";
					}
						
					this.RefreshItems();
				}
				
				break;
			}
			
			case Keys.Left:
			{
				if (!this.vars.switchItem)
				{
					if (this.vars.section == "Items")
					{
						this.vars.selection1 = this.selection;
						this.selection = this.vars.selection3;
						this.vars.section = "Pok` Balls";
					}
					else if (this.vars.section == "Key Items")
					{
						this.vars.selection2 = this.selection;
						this.selection = this.vars.selection1;
						this.vars.section = "Items";
					}
					else
					{
						this.vars.selection3 = this.selection;
						this.selection = this.vars.selection2;
						this.vars.section = "Key Items";
					}
						
					this.RefreshItems();
				}
				
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection != 0)			
					this.selection--;
				
				break;
			}
			
			case Keys.Down:
			{
				if (this.selection != this.items.length - 1)		
					this.selection++;
					
				break;
			}
		}
	}
	
	menuBag.RefreshItems = function()
	{
		this.items = new Array();
		
		with (characters["MainChar"])
		{
			for (var i = 0; i < inventory[this.vars.section].length; i++)
				this.AddItem(inventory[this.vars.section][i], function(){ Screen.GiveFocus(menuBagSelected); }, inventory[this.vars.section][i].item.desc, inventory[this.vars.section][i].item.icon);
			
			this.AddItem("CANCEL", undefined, "CLOSE BAG.", LoadImage("Icons/Items/BagCancel.png"));
		}
	}
	
	menuBag.Update = function()
	{
		if (this.selection > 3 && this.items.length > 6 && this.items.length - this.selection > 2)
			this.vars.offset = this.selection - 3;
		else if (this.items.length - this.selection <= 3 && this.items.length > 6)
			this.vars.offset = this.items.length - 6;
		else if (this.selection <= 3)
			this.vars.offset = 0;
			
		if (GetTime() - this.vars.time > this.vars.delayTime)
		{
			if (this.vars.arrowOffset == this.vars.arrowOffsetMax || this.vars.arrowOffset == 0)
				this.vars.arrowModifier *= -1;
				
			this.vars.arrowOffset += this.vars.arrowModifier;
			this.vars.time = GetTime();
		}
	}
	
	menuBag._PreRender = function()
	{			
		RenderMap();
		g_images["menuBagBg"].blit(GBA_X, GBA_Y);
	}
	
	menuBag._Render = function()
	{
		// Draw Item Panel
		g_images["menuBagPanel"].blit(GBA_X + 3, GBA_Y + 1);
		
		// Draw Backpack
		g_images["menuBagPack" + this.vars.section].blit(GBA_X + 11, GBA_Y + 39);
		
		// Draw Desc Window
		g_windowStyleDesc.drawWindow(GBA_X + 1, GBA_Y + 115, GBA_WIDTH - 2, 42);
		
		// Draw Icon Bg
		g_images["menuBagIconBg"].blit(GBA_X + 6, GBA_Y + 122);
		
		// Draw Item Icon
		this.items[this.selection].icon.blit(GBA_X + 7, GBA_Y + 123);	
		
		// Draw switchItem Bar If Needed
		if (this.vars.switchItem)
		{
			this.vars.switchArrowRight.blit(GBA_X + 90, GBA_Y + 4 + ((this.selection - this.vars.offset) * 16))
			Rectangle(GBA_X + 94, GBA_Y + 7 + ((this.selection - this.vars.offset) * 16), 132, 2, c_grey);
			this.vars.switchArrowLeft.blit(GBA_X + 226, GBA_Y + 4 + ((this.selection - this.vars.offset) * 16))
		}
		// Draw Selection Arrow
		if (this.vars.switchItem)
		{
			if (this.vars.switchItemIndex - this.vars.offset >= 0 && this.vars.switchItemIndex - this.vars.offset < 6)
				g_images["arrowGrey"].blit(GBA_X + 90, GBA_Y + 12 + ((this.vars.switchItemIndex - this.vars.offset) * 16));
		}
		else
			this.vars.arrow.blit(GBA_X + 90, GBA_Y + 12 + ((this.selection - this.vars.offset) * 16));
	}
	
	menuBag._PostRender = function()
	{
		var sectionWidth = g_fontBig.getStringWidth(this.vars.section);

		// Draw Section
		DrawText(GBA_X + (44 - sectionWidth / 2), GBA_Y + 10, g_fontBig, this.vars.section.toUpperCase(), Colors.textWhite);
		
		// Draw Items And Amount
		for (var i = this.vars.offset; i < this.vars.offset + 6; i++)
		{
			if (i >= this.items.length - 1)
			{
				DrawText(GBA_X + 97, GBA_Y + 11 + ((i - this.vars.offset) * 16), g_fontBig, this.items[i].item, Colors.textBlack);
				break;
			}
			
			DrawText(GBA_X + 97, GBA_Y + 11 + ((i - this.vars.offset) * 16), g_fontBig, this.items[i].item.item.name.toUpperCase(), Colors.textBlack);
			
			if (this.vars.section != "Key Items")
			{
				DrawText(GBA_X + 199, GBA_Y + 10 + ((i - this.vars.offset) * 16), g_fontBig, "x", Colors.textBlack);
				DrawText(GBA_X + 221 - g_fontSmall.getStringWidth(this.items[i].item.amount), GBA_Y + 13 + ((i - this.vars.offset) * 16), g_fontSmall, this.items[i].item.amount, Colors.textBlack);
			}
			else if (this.items[i].item.item.selected)
				g_images["menuBagSelected"].blit(GBA_X + 201, GBA_Y + 10 + ((i - this.vars.offset) * 16));	
		}
		
		// Draw Red Arrows If Needed
		if (this.vars.showArrows)
		{
			if (this.vars.offset > 0)
				g_images["menuBagRedArrowUp"].blit(GBA_X + 153, GBA_Y + 1 + this.vars.arrowOffset);
			if (this.items.length > 6 && this.selection < this.items.length - 3)
				g_images["menuBagRedArrowDown"].blit(GBA_X + 153, GBA_Y + 100 - this.vars.arrowOffset);
		
			g_images["menuBagRedArrowRight"].blit(GBA_X + 71 - this.vars.arrowOffset, GBA_Y + 65);
			g_images["menuBagRedArrowLeft"].blit(GBA_X + 1 + this.vars.arrowOffset, GBA_Y + 65);
		}
		
		// Draw Description
		DrawTextBox(GBA_X + 40, GBA_Y + 116, 195, 39, g_fontBig, this.items[this.selection].desc, Colors.textWhite);
	}
}

var menuBagSelected = new Menu();
{
	menuBagSelected.Initialize = function()
	{
		this.selection = 0;
		this.vars.pokeball = LoadImage("Pokeball.png");
		var section = menuBag.vars.section;
		menuBag.vars.showArrows = false;
		
		menuBagSelected.items = new Array();
	
		if (section == "Items")
		{
			menuBagSelected.AddItem("Use",    undefined, "");
			menuBagSelected.AddItem("Give",   undefined, "");
			menuBagSelected.AddItem("Toss",   undefined, "");
			menuBagSelected.AddItem("Cancel", undefined, "");
		}
		else if (section == "Key Items")
		{
			menuBagSelected.AddItem("Use",      undefined, "");
			menuBagSelected.AddItem("Register", undefined, "");
			menuBagSelected.AddItem("Cancel",   undefined, "");
		}
		else if (section == "Pok` Balls")
		{
			menuBagSelected.AddItem("Give",   undefined, "");
			menuBagSelected.AddItem("Toss",   undefined, "");
			menuBagSelected.AddItem("Cancel", undefined, "");
		}
		else
			Abort("BagSelectedExecute(): Can't add items for undefined section");
	}
	
	menuBagSelected.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.selection != this.items.length - 1)
					this.items[this.selection].Action();
				else
				{
					menuBag.vars.arrow = g_images["arrow"];
					menuBag.vars.showArrows = true;
					this.done = true;
				}
					
				break;
			}
			
			case Keys.Cancel:
			{
				menuBag.vars.arrow = g_images["arrow"];
				menuBag.vars.showArrows = true;
				this.done = true;
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection == 0)
					this.selection = this.items.length - 1;
				else
					this.selection--;
				
				break;
			}
			
			case Keys.Down:
			{
				if (this.selection == this.items.length - 1)
					this.selection = 0;
				else
					this.selection++;
					
				break;
			}
		}
	}
	
	menuBagSelected.Update = function()
	{
		
	}
	
	menuBagSelected._PreRender = function()
	{
		// Draw Selected Item Window
		g_windowStylePlain.drawWindow(GBA_X + 45, GBA_Y + 117, 118, 38);
		
		// Draw Options Window
		g_windowStyle.drawWindow(GBA_X + 175, GBA_Y + (GBA_HEIGHT - 6 - (4 + (this.items.length * 16))), 58, 3 + (this.items.length * 16));
	}
	
	menuBagSelected._Render = function()
	{
		// Draw Pokeball
		this.vars.pokeball.blit(GBA_X + 176, GBA_Y + (GBA_HEIGHT - 4 - (4 + ((this.items.length - this.selection) * 16))));
	}
	
	menuBagSelected._PostRender = function()
	{
		DrawTextBox(GBA_X + 48, GBA_Y + 123, 112, 26, g_fontBig, menuBag.items[menuBag.selection].item.item.name.toUpperCase() + " is\nselected.", Colors.textBlack);
		// Draw Options
		for (var i = 0; i < this.items.length; i++)
			DrawText(GBA_X + 190, GBA_Y + (GBA_HEIGHT - 4 - (4 + ((this.items.length - i) * 16))), g_fontBig, this.items[i].item.toUpperCase(), Colors.textBlack);
	}
}

var menuOptions = new Menu();
{
	menuOptions.Initialize = function()
	{
		this.selection = 0;
		
		if (!this.HasItems())
		{
			for (var i = 0; i < options.length; i++)
				this.AddItem(options[i], undefined, "");
		}
	}
	
	menuOptions.Update = function()
	{
		
	}
	
	menuOptions.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				this.done = true;
				break;
			}
			
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
			
			case Keys.Select:
			{
				
				break;
			}
			
			case Keys.Start:
			{
				
				break;
			}
			
			case Keys.Up:
			{
				if (this.selection == 0)
					this.selection = this.items.length - 1;
				else
					this.selection--;
				
				break;
			}
			
			case Keys.Down:
			{
				if (this.selection == this.items.length - 1)
					this.selection = 0;
				else
					this.selection++;
					
				break;
			}
			
			case Keys.Right:
			{
				if (this.items[this.selection].item.optionSelection == this.items[this.selection].item.options.length - 1)
					this.items[this.selection].item.optionSelection = 0;
				else
					this.items[this.selection].item.optionSelection++;
					
				switch (this.selection)
				{
					case 0:	g_textSpeed = this.items[0].item.options[this.items[0].item.optionSelection];
					case 1: g_battleScene = this.items[1].item.options[this.items[1].item.optionSelection];
					case 2: g_battleStyle = this.items[2].item.options[this.items[2].item.optionSelection];
					case 3: g_buttonMode = this.items[3].item.options[this.items[3].item.optionSelection];
					case 4: g_windowStyle = LoadWindowStyle(this.items[4].item.options[this.items[4].item.optionSelection] + ".rws");
					case 5: g_timeFormat = this.items[5].item.options[this.items[5].item.optionSelection];
				}
				
				break;
			}
			
			case Keys.Left:
			{
				if (this.items[this.selection].item.optionSelection == 0)
					this.items[this.selection].item.optionSelection = this.items[this.selection].item.options.length - 1;
				else
					this.items[this.selection].item.optionSelection--;
					
				switch (this.selection)
				{
					case 0:	g_textSpeed = this.items[0].item.options[this.items[0].item.optionSelection];
					case 1: g_battleScene = this.items[1].item.options[this.items[1].item.optionSelection];
					case 2: g_battleStyle = this.items[2].item.options[this.items[2].item.optionSelection];
					case 3: g_buttonMode = this.items[3].item.options[this.items[3].item.optionSelection];
					case 4: g_windowStyle = LoadWindowStyle(this.items[4].item.options[this.items[4].item.optionSelection] + ".rws");
					case 5: g_timeFormat = this.items[5].item.options[this.items[5].item.optionSelection];
				}
				
				break;
			}
		}
	}
	
	menuOptions._PreRender = function()
	{
		
	}
	
	menuOptions._Render = function()
	{
		Rectangle(GBA_X, GBA_Y, GBA_WIDTH, 16, Colors.menuBlue);
		g_windowStylePlain.drawWindow(GBA_X + 13, GBA_Y + 21, 214, 21);
		g_windowStyle.drawWindow(GBA_X + 15, GBA_Y + 55, 210, 98);
		Rectangle(GBA_X + 16, GBA_Y + 56, 208, 96, Colors.menuBgBlue);
		Rectangle(GBA_X + 16, GBA_Y + 58 + (this.selection * 13), 208, 14, Colors.offWhite);
	}
	
	menuOptions._PostRender = function()
	{
		DrawText(GBA_X + 24, GBA_Y + 26, g_fontBig, "OPTIONS", Colors.textBlack);

		for (var i = 0; i < this.items.length; i++)
		{
			if (i == this.items.length - 1)
				DrawText(GBA_X + 24, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].item.name.toUpperCase(), Colors.textBlack);
			else
			{
				DrawText(GBA_X + 24, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].item.name.toUpperCase(), Colors.textBlack);
				DrawText(GBA_X + 146, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].item.options[this.items[i].item.optionSelection].toUpperCase(), Colors.textRed);
			}
		}
	}
}
/*
function Menu(soundSelect)
{
	if (this instanceof Menu == false)
		return new Menu();
		
	// default properties
	this.items           = new Array();
	this.vars            = new Object;
	this.selection       = 0;
	this.done            = false;
	this.firstStep       = false;  // First time through execute loop has passed
	this.hasFocus        = true;  // Used for the battle system.  Hides the menu when false
	
	//this.soundSelect     = soundSelect || Globals.menuEffects["Select"];
	//this.soundCancel     = Globals.menuEffects["Back"];
	//this.soundChange     = Globals.menuEffects["Change"];
	
	this.Initialize      = function() {  }  // Initialize fields
	this.PreRender       = function() {  }  // Background
	this.Render          = function() {  }
	this.PostRender      = function() {  }  // Foreground
	this.Refresh         = function() { this.PreRender(); this.Render(); this.PostRender(); }
	this.ExtraRender     = function() {  }
	this.KeyUp           = function() {  }
	this.KeyDown         = function() {  }
	this.KeyLeft         = function() {  }
	this.KeyRight        = function() {  }
	this.KeySelect       = function() {  }
	this.KeyStart        = function() {  }
	this.KeyAccept       = function() {  }
	this.KeyCancel       = function() {  }
	this.KeyGbaL         = function() {  }
	this.KeyGbaR         = function() {  }
}

// Add An Item To The Menu
Menu.prototype.AddItem = function(name, action, desc, icon) 
{
	var item = new Object;
	item.name     = name;
	item.Action   = action;// || function () {  };
	item.desc     = desc;
	
	if (icon != undefined)
		item.icon = icon;
		
	this.items[this.items.length] = item;
}

Menu.prototype.HasItems = function()
{
	if (this.items.length > 0)
		return true;
	return false;
}

// Execute Menu
Menu.prototype.Execute = function() 
{	
	ClearKeyQueue();
	
	this.hasFocus = true;
	this.done = false;
	this.firstStep = false;
	this.Initialize();
	var delay = 19;
	var startTime = GetTime();
	
	while (!this.done) 
	{
		if (IsMapEngineRunning())
		{
			if (GetTime() > startTime + delay)
			{
				UpdateMapEngine();
				startTime = GetTime();
			}
				
			RenderMap();
		}
		
		this.PreRender();
		this.Render();
		this.PostRender();
		this.ExtraRender();

		FlipScreen();
		
		this.firstStep = true;
		
		// handle keypresses
		while (AreKeysLeft()) 
		{
			switch (GetKey()) 
			{
				case g_keyAccept: 
				{
					//this.soundSelect.play(false);
					this.KeyAccept();
					break;
				}
				case g_keyCancel:
				{
					//this.soundCancel.play(false);
					this.KeyCancel();
					break;
				}
				case g_keyGbaL:
				{
					this.KeyGbaL();
					break;
				}
				case g_keyGbaR:
				{
					this.KeyGbaR();
					break;
				}
				case g_keySelect:
				{
					this.KeySelect();
					break;
				}
				case g_keyStart:
				{
					this.KeyStart();
					break;
				}
				case KEY_DOWN: 
				{
					//this.soundChange.stop();
					//this.soundChange.play(false);
					this.KeyDown();
					break;
				}
				case KEY_UP: 
				{
					//this.soundChange.stop();
					//this.soundChange.play(false);
					this.KeyUp();
					break;
				}
				case KEY_RIGHT:
				{
					//this.soundChange.stop();
					//this.soundChange.play(false);
					this.KeyRight();
					break;
				}
				case KEY_LEFT:
				{
					//this.soundChange.stop();
					//this.soundChange.play(false);
					this.KeyLeft();
					break;
				}
			}
		} // end handle input
	}
}
*/
/*
///////////////////////
///// Intro Menu //////
{
var introMenu = new Menu();
	
	introMenu.Initialize = function()
	{
		
	}
	
	introMenu.PreRender = function()
	{
		with (this.vars) 
		{
			
		}
	}
	
	introMenu.Render = function()
	{
		with (this.vars) 
		{
			
		}
	}
	
	introMenu.PostRender = function()
	{
		with (this.vars)
		{		
			
		}
	}
	
	introMenu.KeyUp = function()
	{
		if (this.selection < this.items.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	introMenu.KeyDown = function()
	{	
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = this.items.length - 1;
	}
	
	introMenu.KeyAccept = function()
	{
		this.items[this.selection].Action();
	}
}
*/
/*
/// End Intro Menu ////
///////////////////////

///////////////////////
////// Main Menu //////
{
var mainMenu = new Menu();

	mainMenu.Initialize = function()
	{
		this.vars.pokeball = LoadImage("Pokeball.png");
	}
	
	mainMenu.PreRender = function()
	{
		
	}
	
	mainMenu.Render = function()
	{
		g_windowStyle.drawWindow(SCREEN_WIDTH - 68, 7, 61, 106); // Menu border
		g_windowStyle.drawWindow(7, 7, 53, 16);  // Time border
		g_windowStyleDesc.drawWindow(1, SCREEN_HEIGHT - 37, SCREEN_WIDTH - 2, 34);
		this.vars.pokeball.blit(SCREEN_WIDTH - 69, 9 + (this.selection * 15));
	}
	
	mainMenu.PostRender = function()
	{
		DrawText(0, 30, g_fontSmall, "abcdefghijklmnopqrstuvwxyz1234567890", c_whiteText);
		DrawText(0, 40, g_fontSmall, "abcdefghijklmnopqrstuvwxyz".toUpperCase(), c_whiteText);
		DrawText(0, 130, g_fontBig, "abcdefghijklmnopqrstuvwxyz", c_whiteText);
		DrawText(0, 140, g_fontBig, "abcdefghijklmnopqrstuvwxyz 1234567890 ()-?\'\":;!,".toUpperCase(), c_whiteText);
		DrawText(0, 150, GetSystemFont(), "abcdefghijklmnopqrstuvwxyz 1234567890 ()-?\'\":;!,".toUpperCase(), c_whiteText);
		// Draw time
		DrawText(9, 9, g_fontBig, g_time.TheTime(g_timeFormat), c_blackText);
		
		// Draw menu options
		for (var i = 0; i < this.items.length; i++)
			DrawText(SCREEN_WIDTH - 56, 9 + (i * 15), g_fontBig, this.items[i].name, c_blackText);
		
		// Draw item description
		DrawTextBox(2, SCREEN_HEIGHT - 32, SCREEN_WIDTH - 2, 24, g_fontBig, this.items[this.selection].desc, c_whiteText);
	}
	
	mainMenu.KeyDown = function()
	{
		if (this.selection < this.items.length - 1) 
			this.selection++;
		else
			this.selection = 0;
	}
	
	mainMenu.KeyUp = function()
	{	
		if (this.selection > 0) 
			this.selection--;
		else
			this.selection = this.items.length - 1;
	}
	
	mainMenu.KeyAccept = function()
	{
		if (this.selection == this.items.length - 1)
			this.done = true;
		else
			this.items[this.selection].Action();
	}
	
	mainMenu.KeyCancel = function()
	{
		this.done = true;
	}
	
	mainMenu.AddItem("POKEDEX", undefined, "A device that records Pokemon secrets upon meeting or catching them.");
	mainMenu.AddItem("POK`MON", PkmnSelectExecute, "Check and organize Pokemon that are traveling with you in your party.");
	mainMenu.AddItem("BAG",     BagExecute, "Equipped with pockets for storing items you bought, recieved or found.");
	mainMenu.AddItem(characters["MainChar"].name.toUpperCase(),    TrainerCardExecute, "Check your money and other game data.");
	mainMenu.AddItem("SAVE",    undefined, "Save your game with a complete record of your progress to take a break.");
	mainMenu.AddItem("OPTION",  OptionsExecute, "Adjust various game settings such as text, speed, game rules, etc.");
	mainMenu.AddItem("EXIT",    undefined, "Close this MENU window.");
}	
//// End Main Menu ////
///////////////////////
*/
/*
///////////////////////
///// tCard Menu //////
{
var trainerCardMenu = new Menu();

	trainerCardMenu.Initialize = function()
	{
		this.vars.currentCard = "Front";
		this.vars.menuX       = SCREEN_WIDTH / 2 - g_images["menuTrainerCardFront"].width / 2;
		this.vars.menuY       = SCREEN_HEIGHT / 2 - g_images["menuTrainerCardFront"].height / 2;
	}
	
	trainerCardMenu.PreRender = function()
	{
		
	}
	
	trainerCardMenu.Render = function()
	{
		with (this.vars)
		{
			if (currentCard == "Front")
			{
				g_images["menuTrainerCardFront"].blit(menuX, menuY);
			}
			else
			{
				g_images["menuTrainerCardBack"].blit(menuX, menuY);			
			}
		}
	}
	
	trainerCardMenu.PostRender = function()
	{
		with (this.vars)
		{
			if (currentCard == "Front")
			{
				DrawText((menuX + 80) - g_fontBig.getStringWidth(characters["MainChar"].name), menuY + 34, g_fontBig, characters["MainChar"].name, c_blackText);
				DrawText((menuX + 137) - g_fontBig.getStringWidth("$" + characters["MainChar"].money), menuY + 60, g_fontBig, "$" + characters["MainChar"].money, c_blackText);
			}
			else
			{
				g_images["menuTrainerCardBack"].blit(menuX, menuY);			
			}
		}
	}
	
	trainerCardMenu.KeyAccept = function()
	{
		if (this.vars.currentCard == "Front")
			this.vars.currentCard = "Back";
		else
			this.done = true;
	}
	
	trainerCardMenu.KeyCancel = function()
	{
		if (this.vars.currentCard == "Front")
			this.done = true;
		else
			this.vars.currentCard = "Front";
	}
}	
/// End tCard Menu ////
///////////////////////
*/
/*
///////////////////////
/// PkmnSelect Menu ///
{
var pkmnSelectMenu = new Menu();

	pkmnSelectMenu.Initialize = function()
	{
		this.selection = 0;
		this.vars.lastSelection = 1;
	}
	
	pkmnSelectMenu.PreRender = function()
	{
		g_images["menuPkmnSelectBackground"].blit(GBA_X, GBA_Y);
		
		for (var i = 1; i < this.items.length - 1; i++)
		{
			// Pkmn Bg
			g_images["menuPkmnSelectBg"].blit(GBA_X + 98, GBA_Y + 12 + ((i - 1) * 24));
		}
	}
	
	pkmnSelectMenu.Render = function()
	{
		var color;
		var colorDark;
		var hpRatio = this.items[0].name.hp / this.items[0].name.maxHp;
		
		if (hpRatio >= 0.5)
		{
			color = c_hpGreen;
			colorDark = c_hpGreenDark;
		}
		else if (hpRatio >= 0.25)
		{
			color = c_hpYellow;
			colorDark = c_hpYellowDark;
		}				
		else
		{
			color = c_hpRed;
			colorDark = c_hpRedDark;
		}
		
		with (this.vars)
		{
			g_images["menuPkmnSelectOne"].blit(GBA_X + 8, GBA_Y + 26);
			
			for (var i = 0; i < 5; i++)
			{
				g_images["menuPkmnSelectBorder"].blit(GBA_X + GBA_WIDTH - 2 - g_images["menuPkmnSelectBorder"].width, GBA_Y + 10 + ((g_images["menuPkmnSelectBorder"].height + 2) * i));
			}
			
			// Highlighted rectangle for selected pkmn
			if (this.selection > 0 && this.selection < this.items.length - 1)
				Rectangle(GBA_X + 98, GBA_Y + 12 + ((this.selection - 1) * 24), 138, 18, c_menuPkmnSelected);
			else if (this.selection == this.items.length - 1)
				Rectangle(GBA_X + 98, GBA_Y + 102 + ((this.selection - 1) * 24), 138, 18, c_menuPkmnSelected);
			else
				Rectangle(GBA_X + 11, GBA_Y + 29 + ((this.selection) * 24), 72, 43, c_menuPkmnSelected);
			
			// Hp Border
			g_images["hpBar"].blit(GBA_X + 17, GBA_Y + 57);
			
			// Hp Bar
			Rectangle(GBA_X + 32, GBA_Y + 59, hpRatio * 48, 1, colorDark);
			Rectangle(GBA_X + 32, GBA_Y + 60, hpRatio * 48, 2, color);
			
			for (var i = 1; i < this.items.length - 1; i++)
			{				
				// Hp Borders
				g_images["hpBar"].blit(GBA_X + 169, GBA_Y + 16 + ((i - 1) * 24));
				
				hpRatio = this.items[i].name.hp / this.items[i].name.maxHp;
				
				if (hpRatio >= 0.5)
				{
					color = c_hpGreen;
					colorDark = c_hpGreenDark;
				}
				else if (hpRatio >= 0.25)
				{
					color = c_hpYellow;
					colorDark = c_hpYellowDark;
				}				
				else
				{
					color = c_hpRed;
					colorDark = c_hpRedDark;
				}
				
				// Hp Bars
				Rectangle(GBA_X + 184, GBA_Y + 18 + (24 * (i - 1)), hpRatio * 48, 1, colorDark);
				Rectangle(GBA_X + 184, GBA_Y + 19 + (24 * (i - 1)), hpRatio * 48, 2, color);
			}
			
			g_windowStylePlain.drawWindow(GBA_X + 5, GBA_Y + 133, 174, 22);
			
			// Blit Border
			if (this.selection == 0)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 10, GBA_Y + 28, g_images["menuPkmnSelectOne"].width - 4, g_images["menuPkmnSelectOne"].height - 4);
			else if (this.selection > 0 && this.selection < this.items.length - 1)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 98, GBA_Y + 12 + (24 * (this.selection - 1)), g_images["menuPkmnSelectBorder"].width - 4, g_images["menuPkmnSelectBorder"].height - 4);
			else if (this.selection == this.items.length - 1)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 191, GBA_Y + 134, 40, 12);
		}
	}
	
	pkmnSelectMenu.PostRender = function()
	{		
		with (this.vars)
		{
			DrawText(GBA_X + 32, GBA_Y + 39, g_fontSmall, this.items[0].name.name.toUpperCase(), c_whiteText);
			DrawText(GBA_X + 81 - g_fontSmall.getStringWidth(this.items[0].name.maxHp), GBA_Y + 63, g_fontSmall, this.items[0].name.maxHp, c_whiteText);
			DrawText(GBA_X + 61, GBA_Y + 63, g_fontSmall, "/", c_whiteText);
			DrawText(GBA_X + 61 - g_fontSmall.getStringWidth(this.items[0].name.hp), GBA_Y + 63, g_fontSmall, this.items[0].name.hp, c_whiteText);
			
			for (var i = 1; i < this.items.length - 1; i++)
			{			
				DrawText(GBA_X + 118, GBA_Y + 15 + (24 * (i - 1)), g_fontSmall, this.items[i].name.name.toUpperCase(), c_whiteText);
				DrawText(GBA_X + 128, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "Lv" + this.items[i].name.level, c_whiteText);
				DrawText(GBA_X + 233 - g_fontSmall.getStringWidth(this.items[i].name.maxHp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].name.maxHp, c_whiteText);
				DrawText(GBA_X + 213, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "/", c_whiteText);
				DrawText(GBA_X + 213 - g_fontSmall.getStringWidth(this.items[i].name.hp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].name.hp, c_whiteText);
			}
			
			DrawText(GBA_X + 8, GBA_Y + 138, g_fontBig, "Choose a POK`MON", c_blackText);
			
			// Cancel option
			DrawText(GBA_X + 204, GBA_Y + 140, g_fontSmall, this.items[this.items.length - 1].name.toUpperCase(), c_whiteText);
			
		}
	}
	
	pkmnSelectMenu.KeyRight = function()
	{
		if (this.vars.lastSelection == this.items.length - 1)
			this.vars.lastSelection = 1;
			
		if (this.selection == 0)
			this.selection = this.vars.lastSelection;
	}
	
	pkmnSelectMenu.KeyLeft = function()
	{
		if (this.selection < this.items.length - 1)
		this.selection = 0;
	}
	
	pkmnSelectMenu.KeyDown = function()
	{
		if (this.selection == this.items.length - 1)
		{
			this.selection = 0;
			this.vars.lastSelection = 1;
		}
		else
		{
			this.selection++;
			this.vars.lastSelection = this.selection;
		}
	}
	
	pkmnSelectMenu.KeyUp = function()
	{
		if (this.selection == 0)
			this.selection = this.items.length - 1;
		else
			this.selection--;
			
		this.vars.lastSelection = this.selection;
	}
	
	pkmnSelectMenu.KeyAccept = function()
	{
		if (this.selection == this.items.length - 1)
			this.done = true;
		else
			this.items[this.selection].Action();
	}
	
	pkmnSelectMenu.KeyCancel = function()
	{
		this.done = true;
	}
}	
// End PkmnSelect Menu 
///////////////////////
*/
/*
///////// Sub /////////
// PkmnSelected Menu //
{
var pkmnSelectedMenu = new Menu();

	pkmnSelectedMenu.Initialize = function()
	{
		this.selection = 0;
		this.vars.pokeball = LoadImage("Pokeball.png");
	}
	
	pkmnSelectedMenu.PreRender = function()
	{
		g_images["menuPkmnSelectBackground"].blit(GBA_X, GBA_Y);
		
		for (var i = 1; i < pkmnSelectMenu.items.length - 1; i++)
		{
			// Pkmn Bg
			g_images["menuPkmnSelectBg"].blit(GBA_X + 98, GBA_Y + 12 + ((i - 1) * 24));
		}
	}
	
	pkmnSelectedMenu.Render = function()
	{
		var color;
		var colorDark;
		var hpRatio = pkmnSelectMenu.items[0].name.hp / pkmnSelectMenu.items[0].name.maxHp;
		
		if (hpRatio >= 0.5)
		{
			color = c_hpGreen;
			colorDark = c_hpGreenDark;
		}
		else if (hpRatio >= 0.25)
		{
			color = c_hpYellow;
			colorDark = c_hpYellowDark;
		}				
		else
		{
			color = c_hpRed;
			colorDark = c_hpRedDark;
		}
		
		with (this.vars)
		{
			g_images["menuPkmnSelectOne"].blit(GBA_X + 8, GBA_Y + 26);
			
			for (var i = 0; i < 5; i++)
			{
				g_images["menuPkmnSelectBorder"].blit(GBA_X + GBA_WIDTH - 2 - g_images["menuPkmnSelectBorder"].width, GBA_Y + 10 + ((g_images["menuPkmnSelectBorder"].height + 2) * i));
			}
			
			// Highlighted rectangle for selected pkmn
			if (pkmnSelectMenu.selection > 0 && pkmnSelectMenu.selection < pkmnSelectMenu.items.length - 1)
				Rectangle(GBA_X + 98, GBA_Y + 12 + ((pkmnSelectMenu.selection - 1) * 24), 138, 18, c_menuPkmnSelected);
			else
				Rectangle(GBA_X + 11, GBA_Y + 29 + ((pkmnSelectMenu.selection) * 24), 72, 43, c_menuPkmnSelected);
			
			// Hp Border
			g_images["hpBar"].blit(GBA_X + 17, GBA_Y + 57);
			
			// Hp Bar
			Rectangle(GBA_X + 32, GBA_Y + 59, hpRatio * 48, 1, colorDark);
			Rectangle(GBA_X + 32, GBA_Y + 60, hpRatio * 48, 2, color);
			
			for (var i = 1; i < pkmnSelectMenu.items.length - 1; i++)
			{	
				// If hp bars are covered by menu, don't draw them
				if (i < 4)
				{
					// Hp Borders
					g_images["hpBar"].blit(GBA_X + 169, GBA_Y + 16 + ((i - 1) * 24));
					
					hpRatio = pkmnSelectMenu.items[i].name.hp / pkmnSelectMenu.items[i].name.maxHp;
					
					if (hpRatio >= 0.5)
					{
						color = c_hpGreen;
						colorDark = c_hpGreenDark;
					}
					else if (hpRatio >= 0.25)
					{
						color = c_hpYellow;
						colorDark = c_hpYellowDark;
					}				
					else
					{
						color = c_hpRed;
						colorDark = c_hpRedDark;
					}
					
					// Hp Bars
					Rectangle(GBA_X + 184, GBA_Y + 18 + (24 * (i - 1)), hpRatio * 48, 1, colorDark);
					Rectangle(GBA_X + 184, GBA_Y + 19 + (24 * (i - 1)), hpRatio * 48, 2, color);
				}
			}
			
			// Draw text window
			g_windowStylePlain.drawWindow(GBA_X + 5, GBA_Y + 133, 134, 22);
			
			// Draw Border
			if (pkmnSelectMenu.selection == 0)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 10, GBA_Y + 28, g_images["menuPkmnSelectOne"].width - 4, g_images["menuPkmnSelectOne"].height - 4);
			else if (pkmnSelectMenu.selection > 0 && pkmnSelectMenu.selection < pkmnSelectMenu.items.length - 1)
				g_windowStyleColors["Orange"].drawWindow(GBA_X + 98, GBA_Y + 12 + (24 * (pkmnSelectMenu.selection - 1)), g_images["menuPkmnSelectBorder"].width - 4, g_images["menuPkmnSelectBorder"].height - 4);
				
			// Draw Menu Window
			g_windowStyle.drawWindow(GBA_X + 151, GBA_Y + 87, 82, 66);
			
			// Draw selection arrow
			pokeball.blit(GBA_X + 152, GBA_Y + 91 + (this.selection * 16));
		}
	}
	
	pkmnSelectedMenu.PostRender = function()
	{

			DrawText(GBA_X + 32, GBA_Y + 39, g_fontSmall, pkmnSelectMenu.items[0].name.name.toUpperCase(), c_whiteText);
			DrawText(GBA_X + 81 - g_fontSmall.getStringWidth(pkmnSelectMenu.items[0].name.maxHp), GBA_Y + 63, g_fontSmall, pkmnSelectMenu.items[0].name.maxHp, c_whiteText);
			DrawText(GBA_X + 61, GBA_Y + 63, g_fontSmall, "/", c_whiteText);
			DrawText(GBA_X + 61 - g_fontSmall.getStringWidth(pkmnSelectMenu.items[0].name.hp), GBA_Y + 63, g_fontSmall, pkmnSelectMenu.items[0].name.hp, c_whiteText);
			
			for (var i = 1; i < pkmnSelectMenu.items.length - 1; i++)
			{	
				DrawText(GBA_X + 118, GBA_Y + 15 + (24 * (i - 1)), g_fontSmall, pkmnSelectMenu.items[i].name.name.toUpperCase(), c_whiteText);
				DrawText(GBA_X + 128, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "Lv" + pkmnSelectMenu.items[i].name.level, c_whiteText);
				
				// If HP is behind menu, don't draw it
				if (i < 4)
				{	
					DrawText(GBA_X + 233 - g_fontSmall.getStringWidth(pkmnSelectMenu.items[i].name.maxHp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, pkmnSelectMenu.items[i].name.maxHp, c_whiteText);
					DrawText(GBA_X + 213, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "/", c_whiteText);
					DrawText(GBA_X + 213 - g_fontSmall.getStringWidth(pkmnSelectMenu.items[i].name.hp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, pkmnSelectMenu.items[i].name.hp, c_whiteText);
				}
			}
			
			DrawText(GBA_X + 8, GBA_Y + 138, g_fontBig, "Do what with this PKMN?", c_blackText);
			
			// Draw options
			for (var i = 0; i < this.items.length; i++)
				DrawText(GBA_X + 166, GBA_Y + 91 + (i * 16), g_fontBig, this.items[i].name.toUpperCase(), c_blackText);
			
	}
	
	pkmnSelectedMenu.KeyDown = function()
	{
		if (this.selection == this.items.length - 1)
			this.selection = 0;
		else
			this.selection++;
	}
	
	pkmnSelectedMenu.KeyUp = function()
	{
		if (this.selection == 0)
			this.selection = this.items.length - 1;
		else
			this.selection--;
	}
	
	pkmnSelectedMenu.KeyAccept = function()
	{
		if (this.selection == this.items.length - 1)
			this.done = true;
		else
			this.items[this.selection].Action();
	}
	
	pkmnSelectedMenu.KeyCancel = function()
	{
		this.done = true;
	}
}
// End PkmnSelected Menu 
///////////////////////
*/
/*
///////////////////////
/////// Bag Menu //////
{
var bagMenu = new Menu();
	bagMenu.Initialize = function()
	{
		this.vars.switchArrowLeft = LoadImage("Menu/SmallRedArrowLeft.png");
		this.vars.switchArrowRight = LoadImage("Menu/SmallRedArrowRight.png");
		this.vars.switchItem = false; // Does player want to re-order items
		this.vars.switchItemIndex = 0; // Index of item to re-order
		this.vars.section = "Items";
		this.vars.offset = 0;
		this.vars.selection1 = 0; // Last selection of Items bag
		this.vars.selection2 = 0; // Last selection of Key Items bag
		this.vars.selection3 = 0; // Last selection of Balls bag
		this.vars.arrowOffset = 0;
		this.vars.arrowOffsetMax = 3; // Pixels to move until switching directions
		this.vars.arrowModifier = -1;
		this.vars.time = GetTime();
		this.vars.delayTime = 80;
		
		this.RefreshItems();
	}
	
	bagMenu.RefreshItems = function()
	{
		this.items = new Array();
		
		with (characters["MainChar"])
		{
			for (var i = 0; i < inventory[this.vars.section].length; i++)
				bagMenu.AddItem(inventory[this.vars.section][i], BagSelectedExecute, inventory[this.vars.section][i].item.desc, inventory[this.vars.section][i].item.icon);
			
			bagMenu.AddItem("CANCEL", undefined, "CLOSE BAG.", LoadImage("Icons/Items/BagCancel.png"));
		}
	}
	
	bagMenu.PreRender = function()
	{			
		g_images["menuBagBg"].blit(GBA_X, GBA_Y);
	}
	
	bagMenu.Render = function()
	{
		// Draw Item Panel
		g_images["menuBagPanel"].blit(GBA_X + 3, GBA_Y + 1);
		
		// Draw Backpack
		g_images["menuBagPack" + this.vars.section].blit(GBA_X + 11, GBA_Y + 39);
		
		// Draw Desc Window
		g_windowStyleDesc.drawWindow(GBA_X + 1, GBA_Y + 115, GBA_WIDTH - 2, 42);
		
		// Draw Icon Bg
		g_images["menuBagIconBg"].blit(GBA_X + 6, GBA_Y + 122);
		
		// Draw Item Icon
		this.items[this.selection].icon.blit(GBA_X + 7, GBA_Y + 123);	
		
		// Draw switchItem Bar If Needed
		if (this.vars.switchItem)
		{
			this.vars.switchArrowRight.blit(GBA_X + 90, GBA_Y + 4 + ((this.selection - this.vars.offset) * 16))
			Rectangle(GBA_X + 94, GBA_Y + 7 + ((this.selection - this.vars.offset) * 16), 132, 2, c_grey);
			this.vars.switchArrowLeft.blit(GBA_X + 226, GBA_Y + 4 + ((this.selection - this.vars.offset) * 16))
		}
		// Draw Selection Arrow
		if (this.vars.switchItem)
		{
			if (this.vars.switchItemIndex - this.vars.offset >= 0 && this.vars.switchItemIndex - this.vars.offset < 6)
				g_images["arrowGrey"].blit(GBA_X + 90, GBA_Y + 12 + ((this.vars.switchItemIndex - this.vars.offset) * 16));
		}
		else
			g_images["arrow"].blit(GBA_X + 90, GBA_Y + 12 + ((this.selection - this.vars.offset) * 16));
	}
	
	bagMenu.PostRender = function()
	{
		var sectionWidth = g_fontBig.getStringWidth(this.vars.section);
		
		if (this.selection > 3 && this.items.length > 6 && this.items.length - this.selection > 2)
			this.vars.offset = this.selection - 3;
		else if (this.items.length - this.selection <= 3 && this.items.length > 6)
			this.vars.offset = this.items.length - 6;
		else if (this.selection <= 3)
			this.vars.offset = 0;
			
		// Draw Section
		DrawText(GBA_X + (44 - sectionWidth / 2), GBA_Y + 10, g_fontBig, this.vars.section.toUpperCase(), c_whiteText);
		
		// Draw Items And Amount
		for (var i = this.vars.offset; i < this.vars.offset + 6; i++)
		{
			if (i >= this.items.length - 1)
			{
				DrawText(GBA_X + 97, GBA_Y + 11 + ((i - this.vars.offset) * 16), g_fontBig, this.items[i].name, c_blackText);
				break;
			}
			
			DrawText(GBA_X + 97, GBA_Y + 11 + ((i - this.vars.offset) * 16), g_fontBig, this.items[i].name.item.name.toUpperCase(), c_blackText);
			
			if (this.vars.section != "Key Items")
			{
				DrawText(GBA_X + 199, GBA_Y + 10 + ((i - this.vars.offset) * 16), g_fontBig, "x", c_blackText);
				DrawText(GBA_X + 221 - g_fontSmall.getStringWidth(this.items[i].name.amount), GBA_Y + 13 + ((i - this.vars.offset) * 16), g_fontSmall, this.items[i].name.amount, c_blackText);
			}
			else if (this.items[i].name.item.selected)
				g_images["menuBagSelected"].blit(GBA_X + 201, GBA_Y + 10 + ((i - this.vars.offset) * 16));	
		}
		
		// Draw Red Arrows If Needed
		if (GetTime() - this.vars.time > this.vars.delayTime)
		{
			if (this.vars.arrowOffset == this.vars.arrowOffsetMax || this.vars.arrowOffset == 0)
				this.vars.arrowModifier *= -1;
				
			this.vars.arrowOffset += this.vars.arrowModifier;
			this.vars.time = GetTime();
		}
		
		if (this.vars.offset > 0)
			g_images["menuBagRedArrowUp"].blit(GBA_X + 153, GBA_Y + 1 + this.vars.arrowOffset);
		if (this.items.length > 6 && this.selection < this.items.length - 3)
			g_images["menuBagRedArrowDown"].blit(GBA_X + 153, GBA_Y + 100 - this.vars.arrowOffset);
		
		g_images["menuBagRedArrowRight"].blit(GBA_X + 71 - this.vars.arrowOffset, GBA_Y + 65);
		g_images["menuBagRedArrowLeft"].blit(GBA_X + 1 + this.vars.arrowOffset, GBA_Y + 65);
		
		// Draw Description
		DrawTextBox(GBA_X + 40, GBA_Y + 116, 195, 39, g_fontBig, this.items[this.selection].desc, c_whiteText);
	}
	
	bagMenu.KeyAccept = function()
	{
		// Swap Items
		if (this.vars.switchItem)
		{
			if (this.selection != this.items.length - 1)
			{
				var switchItem = characters["MainChar"].inventory[this.vars.section][this.vars.switchItemIndex].Clone();
				var switchItem2 = characters["MainChar"].inventory[this.vars.section][this.selection].Clone();
				
				characters["MainChar"].inventory[this.vars.section].splice(this.vars.switchItemIndex, 1, switchItem2);
				characters["MainChar"].inventory[this.vars.section].splice(this.selection, 1, switchItem);
				
				this.vars.switchItem = false;
				this.RefreshItems();
			}
		}
		// Use Item
		else
		{
			if (this.selection == this.items.length - 1)
				this.done = true;
			else
				this.items[this.selection].Action(this.vars.section);
		}
	}
	
	bagMenu.KeyCancel = function()
	{
		if (this.vars.switchItem)
			this.vars.switchItem = false;
		else
			this.done = true;
	}
	
	bagMenu.KeySelect = function()
	{
		if (this.selection != this.items.length - 1)
		{
			this.vars.switchItemIndex = this.selection;
			this.vars.switchItem = !this.vars.switchItem;
		}
	}
	
	bagMenu.KeyRight = function()
	{
		if (!this.vars.switchItem)
		{
			if (this.vars.section == "Items")
			{
				this.vars.selection1 = this.selection;
				this.selection = this.vars.selection2;
				this.vars.section = "Key Items";
			}
			else if (this.vars.section == "Key Items")
			{
				this.vars.selection2 = this.selection;
				this.selection = this.vars.selection3;
				this.vars.section = "Pok` Balls";
			}
			else
			{
				this.vars.selection3 = this.selection;
				this.selection = this.vars.selection1;
				this.vars.section = "Items";
			}
				
			this.RefreshItems();
		}
	}
	
	bagMenu.KeyLeft = function()
	{
		if (!this.vars.switchItem)
		{
			if (this.vars.section == "Items")
			{
				this.vars.selection1 = this.selection;
				this.selection = this.vars.selection3;
				this.vars.section = "Pok` Balls";
			}
			else if (this.vars.section == "Key Items")
			{
				this.vars.selection2 = this.selection;
				this.selection = this.vars.selection1;
				this.vars.section = "Items";
			}
			else
			{
				this.vars.selection3 = this.selection;
				this.selection = this.vars.selection2;
				this.vars.section = "Key Items";
			}
				
			this.RefreshItems();
		}
	}
	
	bagMenu.KeyUp = function()
	{
		if (this.selection != 0)
		{			
			this.selection--;
		}
	}
	
	bagMenu.KeyDown = function()
	{
		if (this.selection != this.items.length - 1)
		{			
			this.selection++;
		}
	}
}
///// End Bag Menu ////
///////////////////////
*/
/*
///////// Sub /////////
/// BagSelected Menu //
{
var bagSelectedMenu = new Menu()
	bagSelectedMenu.Initialize = function()
	{
		this.selection = 0;
		this.vars.pokeball = LoadImage("Pokeball.png");
	}
	
	bagSelectedMenu.PreRender = function()
	{
		g_images["menuBagBg"].blit(GBA_X, GBA_Y);
	}
	
	bagSelectedMenu.Render = function()
	{
		// Draw Item Panel
		g_images["menuBagPanel"].blit(GBA_X + 3, GBA_Y + 1);
		
		// Draw Backpack
		g_images["menuBagPack" + bagMenu.vars.section].blit(GBA_X + 11, GBA_Y + 39);
		
		// Draw Desc Window
		g_windowStyleDesc.drawWindow(GBA_X + 1, GBA_Y + 115, GBA_WIDTH - 2, 42);
		
		// Draw Selected Window
		g_windowStylePlain.drawWindow(GBA_X + 45, GBA_Y + 117, 118, 38);
		
		// Draw Icon Bg
		g_images["menuBagIconBg"].blit(GBA_X + 6, GBA_Y + 122);
		
		// Draw Item Icon
		bagMenu.items[bagMenu.selection].icon.blit(GBA_X + 7, GBA_Y + 123);
		
		// Draw Selected Arrow
		g_images["arrowGrey"].blit(GBA_X + 90, GBA_Y + 12 + ((bagMenu.selection - bagMenu.vars.offset) * 16));
	}
	
	bagSelectedMenu.PostRender = function()
	{
		var sectionWidth = g_fontBig.getStringWidth(bagMenu.vars.section);
		
		// Draw Section
		DrawText(GBA_X + (44 - sectionWidth / 2), GBA_Y + 10, g_fontBig, bagMenu.vars.section.toUpperCase(), c_whiteText);
		
		// Draw Items And Amount
		for (var i = bagMenu.vars.offset; i < bagMenu.vars.offset + 6; i++)
		{
			if (i >= bagMenu.items.length - 1)
			{
				DrawText(GBA_X + 97, GBA_Y + 11 + ((i - bagMenu.vars.offset) * 16), g_fontBig, bagMenu.items[i].name, c_blackText);
				break;
			}
			
			DrawText(GBA_X + 97, GBA_Y + 11 + ((i - bagMenu.vars.offset) * 16), g_fontBig, bagMenu.items[i].name.item.name.toUpperCase(), c_blackText);
			
			if (bagMenu.vars.section != "Key Items")
			{
				DrawText(GBA_X + 199, GBA_Y + 10 + ((i - bagMenu.vars.offset) * 16), g_fontBig, "x", c_blackText);
				DrawText(GBA_X + 221 - g_fontSmall.getStringWidth(bagMenu.items[i].name.amount), GBA_Y + 13 + ((i - bagMenu.vars.offset) * 16), g_fontSmall, bagMenu.items[i].name.amount, c_blackText);
			}
			else if (bagMenu.items[i].name.item.selected)
				g_images["menuBagSelected"].blit(GBA_X + 201, GBA_Y + 10 + ((i - bagMenu.vars.offset) * 16));	
		}
		
		// Draw Selected Item Text
		DrawTextBox(GBA_X + 48, GBA_Y + 123, 112, 26, g_fontBig, bagMenu.items[bagMenu.selection].name.item.name.toUpperCase() + " is\nselected.", c_blackText);
		
		// Draw Options Window
		g_windowStyle.drawWindow(GBA_X + 175, GBA_Y + (GBA_HEIGHT - 6 - (4 + (this.items.length * 16))), 58, 3 + (this.items.length * 16));
		
		// Draw Pokeball
		this.vars.pokeball.blit(GBA_X + 176, GBA_Y + (GBA_HEIGHT - 4 - (4 + ((this.items.length - this.selection) * 16))));
		
		// Draw Options
		for (var i = 0; i < this.items.length; i++)
			DrawText(GBA_X + 190, GBA_Y + (GBA_HEIGHT - 4 - (4 + ((this.items.length - i) * 16))), g_fontBig, this.items[i].name.toUpperCase(), c_blackText);
			
		GetSystemFont().drawText(0, 0, this.selection);
	}
	
	bagSelectedMenu.KeyAccept = function()
	{
		if (this.selection == this.items.length - 1)
			this.done = true;
		else
			this.items[this.selection].Action(characters["MainChar"].inventory[bagMenu.vars.section][bagMenu.selection]);
	}
	
	bagSelectedMenu.KeyCancel = function()
	{
		this.done = true;
	}
	
	bagSelectedMenu.KeyDown = function()
	{
		if (this.selection == this.items.length - 1)
			this.selection = 0;
		else
			this.selection++;
	}
	
	bagSelectedMenu.KeyUp = function()
	{
		if (this.selection == 0)
			this.selection = this.items.length - 1;
		else
			this.selection--;
	}
}
// End BagSelected Menu
///////////////////////
*/
/*
///////////////////////
//// Use Item Menu ////
{
var useItemMenu = new Menu();
	useItemMenu.Initialize = function()
	{
		this.vars.lastSelection = 1;
		this.vars.usedItem = false;
		this.vars.usedItemText = "";
	}
	
	useItemMenu.PreRender = pkmnSelectMenu.PreRender;
	
	useItemMenu.Render = pkmnSelectMenu.Render;
	
	useItemMenu.PostRender = function()
	{		
		with (this.vars)
		{
			DrawText(GBA_X + 32, GBA_Y + 39, g_fontSmall, this.items[0].name.name.toUpperCase(), c_whiteText);
			DrawText(GBA_X + 81 - g_fontSmall.getStringWidth(this.items[0].name.maxHp), GBA_Y + 63, g_fontSmall, this.items[0].name.maxHp, c_whiteText);
			DrawText(GBA_X + 61, GBA_Y + 63, g_fontSmall, "/", c_whiteText);
			DrawText(GBA_X + 61 - g_fontSmall.getStringWidth(this.items[0].name.hp), GBA_Y + 63, g_fontSmall, this.items[0].name.hp, c_whiteText);
			
			for (var i = 1; i < this.items.length - 1; i++)
			{			
				DrawText(GBA_X + 118, GBA_Y + 15 + (24 * (i - 1)), g_fontSmall, this.items[i].name.name.toUpperCase(), c_whiteText);
				DrawText(GBA_X + 128, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "Lv" + this.items[i].name.level, c_whiteText);
				DrawText(GBA_X + 233 - g_fontSmall.getStringWidth(this.items[i].name.maxHp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].name.maxHp, c_whiteText);
				DrawText(GBA_X + 213, GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, "/", c_whiteText);
				DrawText(GBA_X + 213 - g_fontSmall.getStringWidth(this.items[i].name.hp), GBA_Y + 23 + (24 * (i - 1)), g_fontSmall, this.items[i].name.hp, c_whiteText);
			}
			
			DrawText(GBA_X + 8, GBA_Y + 138, g_fontBig, "Use on which POK`MON?", c_blackText);
			
			// Cancel option
			DrawText(GBA_X + 204, GBA_Y + 140, g_fontSmall, this.items[this.items.length - 1].name.toUpperCase(), c_whiteText);
		}
	}
	
	useItemMenu.ExtraRender = function()
	{
		if (this.vars.usedItem)
		{
			// DrawConvoBox show how much healed
			DrawConvoBox(GBA_X + 7, GBA_Y + 119, 226, 34, 5, g_fontBig, this.vars.usedItemText, c_blackText, g_windowStyle, this);
			bagSelectedMenu.done = true;
			this.done = true;
		}	
	}
	
	useItemMenu.KeyRight = function()
	{
		if (!this.vars.usedItem)
		{
			if (this.vars.lastSelection == this.items.length - 1)
				this.vars.lastSelection = 1;
				
			if (this.selection == 0)
				this.selection = this.vars.lastSelection;
		}
	}
	
	useItemMenu.KeyLeft = function()
	{
		if (!this.vars.usedItem)
		{
			if (this.selection < this.items.length - 1)
				this.selection = 0;
		}
	}
	
	useItemMenu.KeyDown = function()
	{
		if (!this.vars.usedItem)
		{
			if (this.selection == this.items.length - 1)
			{
				this.selection = 0;
				this.vars.lastSelection = 1;
			}
			else
			{
				this.selection++;
				this.vars.lastSelection = this.selection;
			}
		}
	}
	
	useItemMenu.KeyUp = function()
	{
		if (!this.vars.usedItem)
		{
			if (this.selection == 0)
				this.selection = this.items.length - 1;
			else
				this.selection--;
				
			this.vars.lastSelection = this.selection;
		}
	}
	
	useItemMenu.KeyAccept = function()
	{
		if (this.selection == this.items.length - 1)
			this.done = true;
		else if (this.vars.usedItem)
			this.done = true;
		else
		{
			this.vars.usedItemText = this.vars.itemToUse.item.Use(this.items[this.selection].name);
			this.vars.usedItem = true;
		}
	}
	
	useItemMenu.KeyCancel = function()
	{
		bagSelectedMenu.done = true;
		this.done = true;
	}
}
// End Use Item Menu //
///////////////////////
*/
/*
///////////////////////
///// Options Menu ////
{
var optionsMenu = new Menu();
	optionsMenu.Initialize = function()
	{
		this.selection = 0;
	}
	
	optionsMenu.PreRender = function()
	{
		
	}
	
	optionsMenu.Render = function()
	{
		Rectangle(GBA_X, GBA_Y, GBA_WIDTH, 16, c_menuBlue);
		g_windowStylePlain.drawWindow(GBA_X + 13, GBA_Y + 21, 214, 21);
		g_windowStyle.drawWindow(GBA_X + 15, GBA_Y + 55, 210, 98);
		Rectangle(GBA_X + 16, GBA_Y + 56, 208, 96, c_menuBgBlue);
		Rectangle(GBA_X + 16, GBA_Y + 58 + (this.selection * 13), 208, 14, c_offWhite);
	}
	
	optionsMenu.PostRender = function()
	{
		DrawText(GBA_X + 24, GBA_Y + 26, g_fontBig, "OPTIONS", c_blackText);

		for (var i = 0; i < this.items.length; i++)
		{
			if (i == this.items.length - 1)
				DrawText(GBA_X + 24, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].name.name.toUpperCase(), c_blackText);
			else
			{
				DrawText(GBA_X + 24, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].name.name.toUpperCase(), c_blackText);
				DrawText(GBA_X + 146, GBA_Y + 59 + (i * 13), g_fontBig, this.items[i].name.options[this.items[i].name.optionSelection].toUpperCase(), c_redText);
			}
		}
	}
	
	optionsMenu.KeyDown = function()
	{
		if (this.selection == this.items.length - 1)
			this.selection = 0;
		else
			this.selection++;
	}
	
	optionsMenu.KeyUp = function()
	{
		if (this.selection == 0)
			this.selection = this.items.length - 1;
		else
			this.selection--;
	}
	
	optionsMenu.KeyRight  = function()
	{
		if (this.items[this.selection].name.optionSelection == this.items[this.selection].name.options.length - 1)
			this.items[this.selection].name.optionSelection = 0;
		else
			this.items[this.selection].name.optionSelection++;
			
		switch (this.selection)
		{
			case 0:	g_textSpeed = this.items[0].name.options[this.items[0].name.optionSelection];
			case 1: g_battleScene = this.items[1].name.options[this.items[1].name.optionSelection];
			case 2: g_battleStyle = this.items[2].name.options[this.items[2].name.optionSelection];
			case 3: g_buttonMode = this.items[3].name.options[this.items[3].name.optionSelection];
			case 4: g_windowStyle = LoadWindowStyle(this.items[4].name.options[this.items[4].name.optionSelection] + ".rws");
			case 5: g_timeFormat = this.items[5].name.options[this.items[5].name.optionSelection];
		}
	}
	
	optionsMenu.KeyLeft = function()
	{
		if (this.items[this.selection].name.optionSelection == 0)
			this.items[this.selection].name.optionSelection = this.items[this.selection].name.options.length - 1;
		else
			this.items[this.selection].name.optionSelection--;
			
		switch (this.selection)
		{
			case 0:	g_textSpeed = this.items[0].name.options[this.items[0].name.optionSelection];
			case 1: g_battleScene = this.items[1].name.options[this.items[1].name.optionSelection];
			case 2: g_battleStyle = this.items[2].name.options[this.items[2].name.optionSelection];
			case 3: g_buttonMode = this.items[3].name.options[this.items[3].name.optionSelection];
			case 4: g_windowStyle = LoadWindowStyle(this.items[4].name.options[this.items[4].name.optionSelection] + ".rws");
			case 5: g_timeFormat = this.items[5].name.options[this.items[5].name.optionSelection];
		}
	}
	
	optionsMenu.KeyAccept = function()
	{
		this.done = true;
	}
	
	optionsMenu.KeyCancel = function()
	{
		this.done = true;
	}
}
/// End Options Menu //
///////////////////////
*/
/*
function PkmnSelectExecute()
{
	pkmnSelectMenu.items = new Array();
	
	for (var i = 0; i < characters["MainChar"].pokemon.length; i++)
		pkmnSelectMenu.AddItem(characters["MainChar"].pokemon[i], PkmnSelectedExecute, "");
		
	pkmnSelectMenu.AddItem("Cancel", undefined, "");
	pkmnSelectMenu.Execute();
}

function UseItemExecute(theItem)
{
	useItemMenu.items = new Array();
	
	for (var i = 0; i < characters["MainChar"].pokemon.length; i++)
		useItemMenu.AddItem(characters["MainChar"].pokemon[i], undefined, "");
		
	useItemMenu.AddItem("Cancel", undefined, "");
	useItemMenu.vars.itemToUse = theItem;
	useItemMenu.Execute();
}

function PkmnSelectedExecute()
{
	var selectedPkmn = pkmnSelectMenu.items[pkmnSelectMenu.selection].name;
	
	if (!pkmnSelectedMenu.HasItems())
	{
		pkmnSelectedMenu.AddItem("Summary", undefined, "");
		pkmnSelectedMenu.AddItem("Switch",  undefined, "");
		pkmnSelectedMenu.AddItem("Item",    undefined, "");
		pkmnSelectedMenu.AddItem("Cancel",  undefined, "");
	}
	
	pkmnSelectedMenu.Execute();
}

function BagExecute()
{
	bagMenu.items = new Array();
	
	bagMenu.Execute();
}

function BagSelectedExecute(section)
{
	bagSelectedMenu.items = new Array();
	
	if (section == "Items")
	{
		bagSelectedMenu.AddItem("Use",    UseItemExecute, "");
		bagSelectedMenu.AddItem("Give",   undefined, "");
		bagSelectedMenu.AddItem("Toss",   undefined, "");
		bagSelectedMenu.AddItem("Cancel", undefined, "");
	}
	else if (section == "Key Items")
	{
		bagSelectedMenu.AddItem("Use",      undefined, "");
		bagSelectedMenu.AddItem("Register", undefined, "");
		bagSelectedMenu.AddItem("Cancel",   undefined, "");
	}
	else if (section == "Pok` Balls")
	{
		bagSelectedMenu.AddItem("Give",   undefined, "");
		bagSelectedMenu.AddItem("Toss",   undefined, "");
		bagSelectedMenu.AddItem("Cancel", undefined, "");
	}
	else
		Abort("BagSelectedExecute(): Can't add items for undefined section");
	
	bagSelectedMenu.Execute();
}

function TrainerCardExecute()
{
	trainerCardMenu.Execute();
}

function OptionsExecute()
{
	if (!optionsMenu.HasItems())
	{
		for (var i = 0; i < options.length; i++)
			optionsMenu.AddItem(options[i], undefined, "");
	}
	
	optionsMenu.Execute();
}*/