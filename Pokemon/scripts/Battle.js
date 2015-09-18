function Battle(enemyArray, bg, wild)
{
	characters["MainChar"].battling = true;
	var heros         = characters["MainChar"].pokemon;
	var enemies       = enemyArray;
	var hpHeroColor    = Colors.hpGreen;
	var hpEnemyColor   = Colors.hpGreen;
	var hpHeroColorD   = Colors.hpGreen;
	var hpEnemyColorD  = Colors.hpGreen;
	var hpHeroRatio    = 0;
	var hpEnemyRatio   = 0;
	var turnDamage     = 0;
	var damageAnim     = false;
	this.selectedEnemy = 0;
	this.selectedHero  = 0;
	this.pokemonUsed   = new Array();
	this.background    = Map.battleBg; //bg;
	this.attackUsed    = "";
	this.struggle      = false;
	this.enemyIsDead   = false;
	this.doubleBattle  = false;
	this.chooseOption  = false;
	this.done          = false;
	this.attack        = "";
	this.attack2       = ""; // If it is a double battle
	this.turnOption    = ""; // What the player choose to do on their turn
	this.menuOptions   = new Menu();
	this.menuAttacks   = new Menu();
	this.intro         = false;  // Gone through the battle intro
	
	var attackMenu = new Menu(); {
	
	for (var i = 0; i < heros[0].moves.length; i++)
			attackMenu.AddItem(heros[0].moves[i], function(){ TakeTurn("Attack"); }, "");
			
	attackMenu.Initialize = function()
	{
		this.vars.row = 0;
		this.vars.column = 0;
		
		if (this.selection > 1)
			this.vars.row = 1;
		
		if (this.selection % 2 != 0 && this.selection > 0)
			this.vars.column = 1;
	}
	attackMenu._PreRender = function()
	{
		
	}
	
	attackMenu._Render = function()
	{
		// Attacks Window
		g_windowStyle.drawWindow(GBA_X + 7, GBA_Y + 119, 146, 34);
		// Move Info Window
		g_windowStyle.drawWindow(GBA_X + 167, GBA_Y + 119, 66, 34);
		// selection arrow
		g_images["arrow"].blit(GBA_X + 9 + (this.vars.column * 72), GBA_Y + 124 + (this.vars.row * 16));
	}
	
	attackMenu._PostRender = function()
	{
		// Draw Attacks
		var attackSpot = 0;
		for (var i = 0; i < 2; i++)
		{
			for (var j = 0; j < 2; j++)
			{
				if (this.items[attackSpot] != undefined)
					DrawText(GBA_X + 16 + (j * 72), GBA_Y + 125 + (i * 16), g_fontSmall, this.items[i + j].item.name.toUpperCase(), Colors.textBlack);
				else
					DrawText(GBA_X + 16 + (j * 72), GBA_Y + 125 + (i * 16), g_fontSmall, "-", Colors.textBlack);
					
				attackSpot++;
			}
		}
		
		DrawText(GBA_X + 16, GBA_Y + 125, g_fontSmall, this.items[0].item.name.toUpperCase(), Colors.textBlack);
		// Draw Attack Info
		DrawText(GBA_X + 168, GBA_Y + 126, g_fontSmall, "PP", Colors.textBlack);
		DrawText(GBA_X + 232 - g_fontBig.getStringWidth(this.items[this.selection].item.maxPp), GBA_Y + 122, g_fontBig, this.items[this.selection].item.maxPp, Colors.textBlack);
		DrawText(GBA_X + 214, GBA_Y + 122, g_fontBig, "/", Colors.textBlack);
		DrawText(GBA_X + 214 - g_fontBig.getStringWidth(this.items[this.selection].item.pp), GBA_Y + 122, g_fontBig, this.items[this.selection].item.pp, Colors.textBlack);
		DrawText(GBA_X + 168, GBA_Y + 144, g_fontSmall, "TYPE/", Colors.textBlack);
		DrawText(GBA_X + 192, GBA_Y + 142, g_fontBig, this.items[this.selection].item.type.name.toUpperCase(), Colors.textBlack);
	}
	
	attackMenu.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.items[this.selection].item.pp < 1)
					Message(GBA_X + 9, GBA_Y + 119, 223, 2, 3, g_fontBig, "Not enough PP!", g_windowStyleBattle, Colors.textWhite);			
				else
				{
					this.done = true;
					this.items[this.selection].Action();
				}
					
				break;
			}
			case Keys.Cancel:
			{
				this.done = true;
				break;
			}
			case Keys.Right:
			{
				if (this.vars.column == 0)
				{
					this.vars.column = 1;
					this.selection += 1;
				}
				else
				{
					this.vars.column = 0;
					this.selection -= 1;
				}
				break;
			}
			case Keys.Left:
			{
				if (this.vars.column == 0)
				{
					this.vars.column = 1;
					this.selection += 1;
				}
				else
				{
					this.vars.column = 0;
					this.selection -= 1;
				}
				break;
			}
			case Keys.Up:
			{
				if (this.vars.row == 0)
				{
					this.vars.row = 1;
					this.selection += 2;
				}
				else
				{
					this.vars.row = 0;
					this.selection -= 2;
				}
				break;
			}
			case Keys.Down:
			{
				if (this.vars.row == 0)
				{
					this.vars.row = 1;
					this.selection += 2;
				}
				else
				{
					this.vars.row = 0;
					this.selection -= 2;
				}
				break;
			}
		}
	}
	}
	
	var optionsMenu = new Menu(); {
	optionsMenu.AddItem("FIGHT", function(){ Screen.GiveFocus(attackMenu); });
	optionsMenu.AddItem("BAG", function(){ Screen.GiveFocus(menuBag); });
	optionsMenu.AddItem("POK`MON", undefined);
	optionsMenu.AddItem("RUN", undefined);
	
	optionsMenu._PreRender = function()
	{
		g_windowStyle.drawWindow(GBA_X + 128, GBA_Y + 119, 105, 34);
	}
	
	optionsMenu._Render = function()
	{
		// selection arrow
		g_images["arrow"].blit(GBA_X + 129 + (this.vars.column * 56), GBA_Y + 124 + (this.vars.row * 16));
	}
	
	optionsMenu._PostRender = function()
	{
		// DrawText menu items
		DrawText(GBA_X + 136, GBA_Y + 123, g_fontBig, this.items[0].item, Colors.textBlack);
		DrawText(GBA_X + 192, GBA_Y + 123, g_fontBig, this.items[1].item, Colors.textBlack);
		DrawText(GBA_X + 136, GBA_Y + 139, g_fontBig, this.items[2].item, Colors.textBlack);
		DrawText(GBA_X + 192, GBA_Y + 139, g_fontBig, this.items[3].item, Colors.textBlack);
	}
	
	optionsMenu.Initialize = function()
	{
		this.vars.row = 0;
		this.vars.column = 0;
		
		if (this.selection > 1)
			this.vars.row = 1;
		
		if (this.selection % 2 == 0 && this.selection > 0)
			this.vars.column = 1;
	}
	
	optionsMenu.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Accept:
			{
				if (this.selection == 0 && heros[0].TotalPp() < 1)
				{
					Message(GBA_X + 8, GBA_Y + 119, 223, 2, 3, g_fontBig, "STRUGGLE!", g_windowStyleBattle, Colors.textWhite);
					//this.done = true;
					//struggle = true;
					//TakeTurn("Attack");
				}				
				else
					this.items[this.selection].Action();
					
				break;
			}
			case Keys.Cancel:
			{
				//this.vars.row = 1;
				//this.vars.column = 1;
				//this.selection = this.items.length - 1;
				this.done = true;
				break;
			}
			case Keys.Right:
			{
				if (this.vars.column == 0)
				{
					this.vars.column = 1;
					this.selection += 1;
				}
				else
				{
					this.vars.column = 0;
					this.selection -= 1;
				}
				break;
			}
			case Keys.Left:
			{
				if (this.vars.column == 0)
				{
					this.vars.column = 1;
					this.selection += 1;
				}
				else
				{
					this.vars.column = 0;
					this.selection -= 1;
				}
				break;
			}
			case Keys.Up:
			{
				if (this.vars.row == 0)
				{
					this.vars.row = 1;
					this.selection += 2;
				}
				else
				{
					this.vars.row = 0;
					this.selection -= 2;
				}
				break;
			}
			case Keys.Down:
			{
				if (this.vars.row == 0)
				{
					this.vars.row = 1;
					this.selection += 2;
				}
				else
				{
					this.vars.row = 0;
					this.selection -= 2;
				}
				break;
			}
		}
	}
	}
	
	function TakeTurn(doWhat)
	{
		switch (doWhat)
		{
			case "Attack":
			{				
				var text = "";
				
				if (this.struggle)
				{
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, heros[0].name.toUpperCase() + " used\nSTRUGGLE!", Colors.textWhite, g_windowStyleBattle, this.menuAttacks);
					text = pkmnMoves["Struggle"].Use(heros[0], this.enemies[0]);
				}
				else
				{
					attackMenu.items[attackMenu.selection].item.pp--;
					text = heros[0].name.toUpperCase() + " used\n" + attackMenu.items[attackMenu.selection].item.name.toUpperCase() + "!";
					Screen.blockInput = true;
					
					var values = attackMenu.items[attackMenu.selection].item.Use(heros[0], enemies[0]);
					damageAnim = true;
					turnDamage = values[1];
					
					Message(GBA_X + 9, GBA_Y + 119, 223, 2, 3, g_fontBig, text, g_windowStyleBattle, Colors.textWhite);
					text = values[0];
					
					if (text != "")
						Message(GBA_X + 9, GBA_Y + 119, 223, 2, 3, g_fontBig, text, g_windowStyleBattle, Colors.textWhite);
						
				}
		
				
				break;
			}
			case "Bag":
			{
				
				break;
			}
			case "Pkmn":
			{
				
				break;
			}
			case "Run":
			{
				
				break;
			}
		}
	}
	
	this.EnemyTurn = function(doWhat)
	{
		switch (doWhat)
		{
			case "Attack":
			{
				if (wild)
					var prefix = "Wild ";
				else
					var prefix = "Foe ";
					
				if (this.enemies[0].TotalPp() < 1)
				{
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, prefix + this.enemies[0].name.toUpperCase() + " used\nSTRUGGLE!", Colors.textWhite, g_windowStyleBattle, this.menuAttacks);
					var text = pkmnMoves["Struggle"].Use(this.enemies[0], this.heros[0]);
				}
				else
				{
					
					/// Choose Attack
					this.enemies[0].moves[0].pp--;
					
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, prefix + this.enemies[0].name.toUpperCase() + " used\n" + this.enemies[0].moves[0].name.toUpperCase() + "!", Colors.textWhite, g_windowStyleBattle, this.menuAttacks);
					
					/// Draw attack anim
					var text = this.enemies[0].moves[0].Use(this.enemies[0], this.heros[0]);
				}

				DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, text, Colors.textWhite, g_windowStyleBattle, this.menuAttacks);
				break;
			}
			case "Bag":
			{
				
				break;
			}
			case "Pkmn":
			{
				
				break;
			}
			case "Run":
			{
				
				break;
			}
		}
	}
	
	this.Render = function()
	{
		if (!this.intro)
		{
			this.intro = true;
		}
		else
		{
			this._PreRender();
			this._Render();
			this._PostRender();
			
		}
	}
	
	this.Update = function()
	{
		if (this.chooseOption == false)
		{
			this.chooseOption = true;
			Screen.GiveFocus(optionsMenu);
		}
		
		/*
			TODO: Attack animation
		*/
		
		if (damageAnim)
		{
			enemies[0].hp -= .1;
			turnDamage -= .1;
			
			if (turnDamage <= 0)
			{
				turnDamage = 0;
				damageAnim = false;
				Screen.blockInput = false;
			}
		}
		
		hpHeroRatio = heros[this.selectedHero].hp / heros[this.selectedHero].maxHp;
		hpEnemyRatio = enemies[0].hp / enemies[0].maxHp
		
		if (hpHeroRatio >= 0.5)
		{
			hpHeroColor = Colors.hpGreen;
			hpHeroColorD = Colors.hpGreenDark;
		}
		else if (hpHeroRatio >= 0.25)
		{
			hpHeroColor = Colors.hpYellow;
			hpHeroColorD = Colors.hpYellowDark;
		}				
		else
		{
			hpHeroColor = Colors.hpRed;
			hpHeroColorD = Colors.hpRedDark;
		}
		
		if (hpEnemyRatio >= 0.5)
		{
			hpEnemyColor = Colors.hpGreen;
			hpEnemyColorD = Colors.hpGreenDark;
		}
		else if (hpEnemyRatio >= 0.25)
		{
			hpEnemyColor = Colors.hpYellow;
			hpEnemyColorD = Colors.hpYellowDark;
		}				
		else
		{
			hpEnemyColor = Colors.hpRed;
			hpEnemyColorD = Colors.hpRedDark;
		}
	}
	
	this.DoKey = function(key)
	{
		switch (key)
		{
			case Keys.Cancel:
			{
				characters["MainChar"].battling = false;
				this.done = true;
				break;
			}
		}
	}
	
	this._PreRender = function()
	{
		// background
		this.background.blit(GBA_X, GBA_Y);
		Rectangle(GBA_X, GBA_Y + 112, GBA_WIDTH, GBA_HEIGHT - 112, Colors.black);
		g_windowStyleBattle.drawWindow(GBA_X + 8, GBA_Y + 119, 224, 34);
	}
	
	this._Render = function()
	{
		// sprites
		enemies[0].sprite.blit(GBA_X + 150, GBA_Y + 30);
		//this.heros[0].sprite.blit(GBA_X + 30, GBA_Y + 130 + yModifier);
		
		// Hp Bar
		Rectangle(GBA_X + 52, GBA_Y + 32, hpEnemyRatio * 48, 1, hpEnemyColorD);
		Rectangle(GBA_X + 52, GBA_Y + 33, hpEnemyRatio * 48, 2, hpEnemyColor);
		Rectangle(GBA_X + 174, GBA_Y + 91, hpHeroRatio * 48, 1, hpHeroColorD);
		Rectangle(GBA_X + 174, GBA_Y + 92, hpHeroRatio * 48, 2, hpHeroColor);
	}
	
	this._PostRender = function()
	{
		// DrawText - pkmn details
		DrawText(GBA_X + 20, GBA_Y + 21, g_fontSmall, enemies[0].name.toUpperCase(), Colors.textBlack);
		DrawText(GBA_X + 86, GBA_Y + 21, g_fontSmall, "Lv" + enemies[0].level, Colors.textBlack);
		DrawText(GBA_X + 142, GBA_Y + 79, g_fontSmall, heros[0].name.toUpperCase(), Colors.textBlack);
		DrawText(GBA_X + 203, GBA_Y + 79, g_fontSmall, "Lv" + heros[0].level, Colors.textBlack);
		DrawText(GBA_X + 186, GBA_Y + 97, g_fontSmall, heros[0].hp + "/" + heros[0].maxHp, Colors.textBlack);
	}
}
	/*
	this.AllEnemiesAreDead = function()
	{
		for (var i = 0; i < this.enemies.length; i++)
		{
			if (this.enemies[i].hp > 0)
				return false;
		}
		
		return true;
	}
	
	this.TakeTurn = function(doWhat)
	{
		switch (doWhat)
		{
			case "Attack":
			{
				ClearKeyQueue();
				
				var text = "";
				
				if (this.struggle)
				{
					this.menuAttacks.hasFocus = false;
					this.turnText.push(this.heros[0].name.toUpperCase() + " used\nSTRUGGLE!");
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, this.heros[0].name.toUpperCase() + " used\nSTRUGGLE!", c_whiteText, g_windowStyleBattle, this.menuAttacks);
					text = pkmnMoves["Struggle"].Use(this.heros[0], this.enemies[0]);
				}
				else
				{
					this.menuAttacks.items[this.menuAttacks.selection].name.pp--;
					this.turnText.push(this.heros[0].name.toUpperCase() + " used\n" + this.menuAttacks.items[this.menuAttacks.selection].name.name.toUpperCase() + "!");
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, this.turnText[0], c_whiteText, g_windowStyleBattle, this.menuAttacks);
					
					/// Draw Attack Anim
					
					text = this.menuAttacks.items[this.menuAttacks.selection].name.Use(this.heros[0], this.enemies[0]);
					
					if (text != "")
						this.turnText.push(text);
					
				}
 
				DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, text, c_whiteText, g_windowStyleBattle, this.menuAttacks);
				break;
			}
			case "Bag":
			{
				
				break;
			}
			case "Pkmn":
			{
				
				break;
			}
			case "Run":
			{
				
				break;
			}
		}
	}
	
	this.EnemyTurn = function(doWhat)
	{
		switch (doWhat)
		{
			case "Attack":
			{
				if (wild)
					var prefix = "Wild ";
				else
					var prefix = "Foe ";
					
				if (this.enemies[0].TotalPp() < 1)
				{
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, prefix + this.enemies[0].name.toUpperCase() + " used\nSTRUGGLE!", c_whiteText, g_windowStyleBattle, this.menuAttacks);
					var text = pkmnMoves["Struggle"].Use(this.enemies[0], this.heros[0]);
				}
				else
				{
					
					/// Choose Attack
					this.enemies[0].moves[0].pp--;
					
					DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, prefix + this.enemies[0].name.toUpperCase() + " used\n" + this.enemies[0].moves[0].name.toUpperCase() + "!", c_whiteText, g_windowStyleBattle, this.menuAttacks);
					
					/// Draw attack anim
					var text = this.enemies[0].moves[0].Use(this.enemies[0], this.heros[0]);
				}

				DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, text, c_whiteText, g_windowStyleBattle, this.menuAttacks);
				break;
			}
			case "Bag":
			{
				
				break;
			}
			case "Pkmn":
			{
				
				break;
			}
			case "Run":
			{
				
				break;
			}
		}
	}
	*/
	/*
	this.TryToRun = function()
	{
		this.done = true;
	}
	
	this.UpdateEnemyStatus = function()
	{
		/// Hp Bar animation
		
		if (this.enemies[this.selectedEnemy].hp < 1)
		{
			var done = false;
			var startTime = GetTime(); // Timer for sprite animation
			var delay = 50; // Delay for sprite animation
			var startTime2 = GetTime(); // Timer for updateMapEngine
			var delay2 = 19; // Delay for UpdateMapEngine
			var yValue = 0;
			this.enemyIsDead = true;
			
			while (!done)
			{
				if (GetTime() > startTime + delay)
				{
					yValue += 5;
					startTime = GetTime();
				}
				
				this.menuAttacks.PreRender();
				this.menuAttacks.Render();
				
				this.enemies[this.selectedEnemy].sprite.blit(GBA_X + 150, GBA_Y + 30 + yValue);
				
				this.menuAttacks.PostRender();
				Rectangle(GBA_X, GBA_Y + 112, GBA_WIDTH, GBA_HEIGHT - 112, c_black);
				g_windowStyleBattle.drawWindow(GBA_X + 9, GBA_Y + 119, 223, 34);
				
				//if (this.struggle)
				//{
				//	DrawText(GBA_X + 13, GBA_Y + 123, g_fontBig, this.heros[0].name.toUpperCase() + " used", c_whiteText);
				//	DrawText(GBA_X + 13, GBA_Y + 137, g_fontBig, "STRUGGLE!", c_whiteText);
				//}
				//else
				//{
				//	DrawText(GBA_X + 13, GBA_Y + 123, g_fontBig, this.heros[this.selectedHero].name.toUpperCase() + " used", c_whiteText);
				//	DrawText(GBA_X + 13, GBA_Y + 137, g_fontBig, this.menuAttacks.items[this.menuAttacks.selection].name.name.toUpperCase() + "!", c_whiteText);
				//}
				
				DrawTextBox(GBA_X + 13, GBA_Y + 123, 223, 34, g_fontBig, this.turnText[this.turnText.length - 1], c_whiteText);
				//DrawText(GBA_X + 13, GBA_Y + 137, g_fontBig, this.menuAttacks.items[this.menuAttacks.selection].name.name.toUpperCase() + "!", c_whiteText);
					
				FlipScreen();
				
				if (yValue > this.enemies[this.selectedEnemy].sprite.height)
					done = true;
			}
			
			if (wild)
			{
				var endText = "Foe " + this.enemies[this.selectedEnemy].name.toUpperCase() + "\nfainted!\n" + this.heros[this.selectedHero].name.toUpperCase() + " gained\n" + this.enemies[this.selectedEnemy].ExpWon(wild) + " EXP. points!";
						
				DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, endText, c_whiteText, g_windowStyleBattle, this.menuAttacks);
				this.heros[this.selectedHero].exp += this.enemies[this.selectedEnemy].ExpWon(wild);
				
				if (this.heros[this.selectedHero].exp > this.heros[this.selectedHero].expToNext)
				{
					var doneLeveling = false;
					
					while (!doneLeveling)
					{
						this.heros[this.selectedHero].level++;
						this.heros[this.selectedHero].ExpToNext();
						
						var levelStats = this.heros[this.selectedHero].CalcStats();
						
						with(this.heros[this.selectedHero])
						{
							var levelText = "MAX HP  + " + levelStats["HP"]     + "\n" +
											"ATTACK  + " + levelStats["Attack"]  + "\n" +
											"DEFENSE + " + levelStats["Defense"] + "\n" +
											"SP ATK  + " + levelStats["SpAttack"] + "\n" +
											"SP DEF  + " + levelStats["SpDefense"] + "\n" +
											"SPEED   + " + levelStats["Speed"];
							
							
							var newLevelText = "MAX. HP  " + (maxHp)     + "\n" +
											   "ATTACK   " + (attack)    + "\n" +
											   "DEFENSE  " + (defense)   + "\n" +
											   "SP. ATK  " + (spAttack)  + "\n" +
											   "SP. DEF  " + (spDefense) + "\n" +
											   "SPEED    " + (speed);
						}
						
						var grewToText = this.heros[this.selectedHero].name.toUpperCase() + " grew to\nLV. " + this.heros[this.selectedHero].level + "!";
								
						DrawConvoBox(GBA_X + 9, GBA_Y + 119, 223, 34, 4, g_fontBig, grewToText, c_whiteText, g_windowStyleBattle, this.menuAttacks);
						
						ClearKeyQueue();
						Delay(200);
						while(!IsKeyPressed(g_keyAccept))
						{
							this.menuAttacks.PreRender();
							this.menuAttacks.Render();
							this.menuAttacks.PostRender();
							g_windowStyleBattle.drawWindow(GBA_Y + 9, GBA_Y + 119, 223, 34);
							DrawTextBox(GBA_X + 13, GBA_Y + 123, 223, 34, g_fontBig, grewToText, c_whiteText);
							g_windowStyle.drawWindow(GBA_X + 151, GBA_Y + 63, 82, 90);
							DrawTextBox(GBA_X + 153, GBA_Y + 67, 80, 86, g_fontBig, levelText, Colors.textBlack);
							FlipScreen();
						}
						ClearKeyQueue();
						Delay(200);
						while(!IsKeyPressed(g_keyAccept))
						{
							this.menuAttacks.PreRender();
							this.menuAttacks.Render();
							this.menuAttacks.PostRender();
							g_windowStyleBattle.drawWindow(GBA_Y + 9, GBA_Y + 119, 223, 34);
							DrawTextBox(GBA_X + 13, GBA_Y + 123, 223, 34, g_fontBig, grewToText, c_whiteText);
							g_windowStyle.drawWindow(GBA_X + 151, GBA_Y + 63, 82, 90);
							DrawTextBox(GBA_X + 153, GBA_Y + 67, 80, 86, g_fontBig, newLevelText, Colors.textBlack);
							FlipScreen();
						}
						
						if (this.heros[this.selectedHero].expToNext > this.heros[this.selectedHero].exp)
							doneLeveling = true;
					}
				}
						
			}
			else
			{
				
				
			}
		}
	}
	*/
	/*
	this.Execute = function()
	{
		// draw bg
		
		// draw slideIn
		// draw enemy sprite
		// draw enemy hud
		// draw player back sprite
		// DrawConvoBox - blah blah appeared
		// Draw throw pkmn animation
		
		while (!this.done)
		{		
			this.turnText = new Array();
			this.menuAttacks.Initialize();	
			this.menuOptions.Execute();			
			
			this.TakeTurn(this.turnOption);
			this.UpdateEnemyStatus();
			this.enemyIsDead = false;
			if (this.AllEnemiesAreDead())
			{
				/// Hand out mulah
				this.done = true;
			}
			else
			{			
				this.EnemyTurn("Attack");
			}
		}
		
		this.enemies[0].hp = this.enemies[0].maxHp;
		this.enemies[0].moves[0].pp = this.enemies[0].moves[0].maxPp;
		
	}
	*/
	/*
	with (this)
	{
		for (var i = 0; i < heros[0].moves.length; i++)
			menuAttacks.AddItem(heros[0].moves[i], function(){ TakeTurn("Attack"); }, "");
	
		menuOptions.AddItem("FIGHT", function(){ menuAttacks.Execute(); }, "");
		menuOptions.AddItem("BAG", BagExecute, "");
		menuOptions.AddItem("POK`MON", PkmnSelectExecute, "");this.vars.row = 0;
			this.vars.column = 0;
			this.vars.startTime = GetTime();
			this.vars.delay = 19;
			
			if (this.selection > 1)
				this.vars.row = 1;
			
			if (this.selection % 2 == 0 && this.selection > 0)
				this.vars.column = 1;
		menuOptions.AddItem("RUN", TryToRun, "");
	
		menuOptions.Initialize = function() 
		{
			
		}
		
		menuOptions.PreRender = function()
		{
			// background
			background.blit(GBA_X, GBA_Y);
			// sprites
			enemies[0].sprite.blit(GBA_X + 150, GBA_Y + 30);
			// blackBg
			Rectangle(GBA_X, GBA_Y + 112, GBA_WIDTH, GBA_HEIGHT - 112, c_black);
		}
		
		menuOptions.Render = function()
		{
			
			if (this.hasFocus)
			{
				// Draw what will pkmn Window
				g_windowStyleBattle.drawWindow(GBA_X + 9, GBA_Y + 119, 224, 34);
				// OptionTextbox
				g_windowStyle.drawWindow(GBA_X + 128, GBA_Y + 119, 105, 34);
				// selection arrow
				g_images["arrow"].blit(GBA_X + 129 + (this.vars.column * 56), GBA_Y + 124 + (this.vars.row * 16));
			}
			// hud bgs
			// hp and exp rectangles
			// hasPkmn pokeball
		}
		
		menuOptions.PostRender = function()
		{
			// DrawText - what will pkmn do
			DrawTextBox(GBA_X + 14, GBA_Y + 123, 106, 34, g_fontBig, "What will\n" + heros[0].name.toUpperCase() + " do?", c_whiteText);
			// DrawText menu items
			DrawText(GBA_X + 136, GBA_Y + 123, g_fontBig, this.items[0].name, Colors.textBlack);
			DrawText(GBA_X + 192, GBA_Y + 123, g_fontBig, this.items[1].name, Colors.textBlack);
			DrawText(GBA_X + 136, GBA_Y + 139, g_fontBig, this.items[2].name, Colors.textBlack);
			DrawText(GBA_X + 192, GBA_Y + 139, g_fontBig, this.items[3].name, Colors.textBlack);
			// DrawText - pkmn details
			DrawText(GBA_X + 20, GBA_Y + 21, g_fontSmall, enemies[0].name.toUpperCase(), Colors.textBlack);
			DrawText(GBA_X + 86, GBA_Y + 21, g_fontSmall, "Lv" + enemies[0].level, Colors.textBlack);
			DrawText(GBA_X + 142, GBA_Y + 79, g_fontSmall, heros[0].name.toUpperCase(), Colors.textBlack);
			DrawText(GBA_X + 203, GBA_Y + 79, g_fontSmall, "Lv" + heros[0].level, Colors.textBlack);
			DrawText(GBA_X + 186, GBA_Y + 97, g_fontSmall, heros[0].hp + "/" + heros[0].maxHp, Colors.textBlack);
			
			// Remove next line
			DrawText(GBA_X + 50, GBA_Y + 50, g_fontSmall, enemies[0].hp + "/" + enemies[0].maxHp, Colors.textBlack);
			
		}
		
		menuOptions.KeyAccept = function()
		{
			if (this.selection == 0 && heros[0].TotalPp() < 1)
			{
				this.done = true;
				struggle = true;
				TakeTurn("Attack");
			}				
			else
				this.items[this.selection].Action();
		}
		
		menuOptions.KeyCancel = function()
		{
			this.vars.row = 1;
			this.vars.column = 1;
			this.selection = this.items.length - 1;
		}
		
		menuOptions.KeyDown = function()
		{
			if (this.vars.row == 0)
			{
				this.vars.row = 1;
				this.selection += 2;
			}
			else
			{
				this.vars.row = 0;
				this.selection -= 2;
			}
		}
		menuOptions.KeyUp = menuOptions.KeyDown;
		
		menuOptions.KeyRight = function()
		{
			if (this.vars.column == 0)
			{
				this.vars.column = 1;
				this.selection += 1;
			}
			else
			{
				this.vars.column = 0;
				this.selection -= 1;
			}
		}
		
		menuOptions.KeyLeft = menuOptions.KeyRight;*/
	/*
		menuAttacks.Initialize = function() 
		{
			this.vars.row = 0;
			this.vars.column = 0;
			this.vars.startTime = GetTime();
			this.vars.delay = 19;
			
			if (this.selection > 1)
				this.vars.row = 1;
			
			if (this.selection % 2 != 0 && this.selection > 0)
				this.vars.column = 1;
		}
		
		menuAttacks.PreRender = function()
		{
			if (IsMapEngineRunning())
			{
				if (GetTime() > this.vars.startTime + this.vars.delay)
				{
					UpdateMapEngine();
					this.vars.startTime = GetTime();
				}
					
				RenderMap();
			}
			
			// background
			background.blit(GBA_X, GBA_Y);
			// sprites
			if (!enemyIsDead)
				enemies[0].sprite.blit(GBA_X + 150, GBA_Y + 30);
			// blackBg
			Rectangle(GBA_X, GBA_Y + 112, GBA_WIDTH, GBA_HEIGHT - 112, c_black);
		}
		
		menuAttacks.Render = function()
		{
			if (this.hasFocus)
			{
				// Attacks Window
				g_windowStyle.drawWindow(GBA_X + 7, GBA_Y + 119, 146, 34);
				// Move Info Window
				g_windowStyle.drawWindow(GBA_X + 167, GBA_Y + 119, 66, 34);
				// selection arrow
				g_images["arrow"].blit(GBA_X + 9 + (this.vars.column * 72), GBA_Y + 124 + (this.vars.row * 16));
			}
		}
		
		menuAttacks.PostRender = function()
		{
			// Draw Attacks
			var attackSpot = 0;
			for (var i = 0; i < 2; i++)
			{
				for (var j = 0; j < 2; j++)
				{
					if (this.items[attackSpot] != undefined)
						DrawText(GBA_X + 16 + (j * 72), GBA_Y + 125 + (i * 16), g_fontSmall, this.items[i + j].name.name.toUpperCase(), Colors.textBlack);
					else
						DrawText(GBA_X + 16 + (j * 72), GBA_Y + 125 + (i * 16), g_fontSmall, "-", Colors.textBlack);
						
					attackSpot++;
				}
			}
			
			DrawText(GBA_X + 16, GBA_Y + 125, g_fontSmall, this.items[0].name.name.toUpperCase(), Colors.textBlack);
			// Draw Attack Info
			DrawText(GBA_X + 168, GBA_Y + 126, g_fontSmall, "PP", Colors.textBlack);
			DrawText(GBA_X + 232 - g_fontBig.getStringWidth(this.items[this.selection].name.maxPp), GBA_Y + 122, g_fontBig, this.items[this.selection].name.maxPp, Colors.textBlack);
			DrawText(GBA_X + 214, GBA_Y + 122, g_fontBig, "/", Colors.textBlack);
			DrawText(GBA_X + 214 - g_fontBig.getStringWidth(this.items[this.selection].name.pp), GBA_Y + 122, g_fontBig, this.items[this.selection].name.pp, Colors.textBlack);
			DrawText(GBA_X + 168, GBA_Y + 144, g_fontSmall, "TYPE/", Colors.textBlack);
			DrawText(GBA_X + 192, GBA_Y + 142, g_fontBig, this.items[this.selection].name.type.name.toUpperCase(), Colors.textBlack);

			// DrawText - pkmn details
			DrawText(GBA_X + 20, GBA_Y + 21, g_fontSmall, enemies[0].name.toUpperCase(), Colors.textBlack);
			DrawText(GBA_X + 86, GBA_Y + 21, g_fontSmall, "Lv" + enemies[0].level, Colors.textBlack);
			DrawText(GBA_X + 142, GBA_Y + 79, g_fontSmall, heros[0].name.toUpperCase(), Colors.textBlack);
			DrawText(GBA_X + 203, GBA_Y + 79, g_fontSmall, "Lv" + heros[0].level, Colors.textBlack);
			DrawText(GBA_X + 186, GBA_Y + 97, g_fontSmall, heros[0].hp + "/" + heros[0].maxHp, Colors.textBlack);
			
			DrawText(GBA_X + 50, GBA_Y + 50, g_fontSmall, enemies[0].hp + "/" + enemies[0].maxHp, Colors.textBlack);
		}
		
		menuAttacks.KeyCancel = function()
		{
			this.done = true;
		}
		
		menuAttacks.KeyDown = function()
		{
			if (this.vars.row == 0 && this.selection + 2 < this.items.length)
			{
				this.vars.row = 1;
				this.selection += 2;
			}
			else if (this.vars.row > 0)
			{
				this.vars.row = 0;
				this.selection -= 2;
			}
		}
		menuAttacks.KeyUp = menuAttacks.KeyDown;
		
		menuAttacks.KeyRight = function()
		{
			if (this.vars.column == 0 && this.selection + 1 < this.items.length)
			{
				this.vars.column = 1;
				this.selection += 1;
			}
			else if (this.vars.column > 0)
			{
				this.vars.column = 0;
				this.selection -= 1;
			}
		}
		
		menuAttacks.KeyLeft = menuAttacks.KeyRight;
		
		menuAttacks.KeyAccept = function()
		{
			if (this.items[this.selection].name.pp > 0)
			{
				this.hasFocus = false;
				this.done = true;
				menuOptions.done = true;
				this.items[this.selection].Action();
			}
			else
				DrawConvoBox(GBA_X + 9, GBA_Y + 119, 224, 34, 4, g_fontBig, "There's no PP left for this move!", c_whiteText, g_windowStyleBattle, menuAttacks);
		}
	}
}*/