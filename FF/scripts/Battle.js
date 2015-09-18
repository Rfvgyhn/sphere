function Battle(baddies, music)
{	
	var enemies = new Array();
	var party = new Array();
	var menuQueue = new Queue();
	var turnQueue = new Queue();
	var spriteSetDir = "BattleIdle";
	var delay = 200;
	var highlightName = true;
	var currentTime = GetTime();
	var activeEntity = null;
	var bgMusic = music || LoadSound("Music/Fighting.ogg");
	var timeMode = BattleTimeMode.Active;
	var enemySelection = -1;	// Enemy's target
	var heroSelection = -1;	// Current hero's target
	
	var battleBarBg = LoadImage("Battle/BattleBarBg.png");
	var barrierBg = LoadImage("Battle/BarrierBg.png");
	
	var menuEnemySelect = new Menu(); {
		menuEnemySelect.Initialize = function()
		{
			this.items.Clear();
			this.Selection = 0;
			
			for (var i = 0; i < enemies.length; i++)
				this.AddItem(enemies[i].Entity, function() { }, Colors.White);
			
		}
		
		menuEnemySelect.Update = function(){}
		
		menuEnemySelect._PreRender = function(){}
		
		menuEnemySelect._Render = function()
		{
			
		}
		
		menuEnemySelect._PostRender = function()
		{
			DrawTextCenter(Game.ScreenWidth / 2, 168, Game.FontMain, Colors.White, this.items[this.Selection].item.Name);
		}
		
		menuEnemySelect.DoKey = function(key)
		{
			switch (key)
			{
				case Keys.Accept:
				{
					enemySelection = this.Selection;
					this.Done = true;
					break;
				}
				
				case Keys.Cancel:
				{
					this.Done = true;
					break;
				}
				
				case Keys.Select:
				{
					
					
					break;
				}
				
				case Keys.Right:
				{
					if (this.Selection < this.items.length - 1) 
						this.Selection++;
					else
						this.Selection = 0;
					
					break;
				}
				
				case Keys.Left:
				{
					if (this.Selection > 0) 
						this.Selection--;
					else
						this.Selection = this.items.length - 1;
					
					break;
				}
				
				case Keys.Up:
				{
					
					
					break;
				}
				
				case Keys.Down:
				{
					
						
					break;
				}
			}
		}
	}
	var menuAttack = new Menu(); {
		menuAttack.Initialize = function()
		{			
			for (var i = 0; i < activeEntity.Entity.BattleCommands.length; i++)
				this.AddItem(activeEntity.Entity.BattleCommands[i], function() { }, Colors.White);
			
			
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			this.AddItem(activeEntity.Entity.BattleCommands[0], function() { }, Colors.White);
			
			
			this.Selection = 0;
			this.vars.columns = Math.ceil(this.items.length / 4);	
			this.vars.row = 0;
			this.vars.column = 0;
			
			
			
			//this.initialized = true;
		}
		
		menuAttack.Update = function()
		{
			
		}
		
		menuAttack._PreRender = function()
		{
		
		}
		
		menuAttack._Render = function()
		{
			Game.WindowStyle.drawWindow(75, 187, 54 + ((this.vars.columns - 1) * 50), 50);
		}
		
		menuAttack._PostRender = function()
		{
			var rowCounter = 0;
			var colCounter = 0;
			
			for (var i = 0; i < this.items.length; i++)
			{
				if (i % 4 == 0 && i != 0)
				{
					rowCounter = 0;
					colCounter++;
				}
					
				DrawText(78 + 50 * colCounter, 190 + 12 * rowCounter, Game.FontMain, Colors.White, this.items[i].item.Name);
				
				rowCounter++;
			}
			
			this.Cursor.blit(53 + 50 * this.vars.column, 190 + 12 * this.vars.row);
			
			if (Screen.HasInput(this))
				DrawTextCenter(Game.ScreenWidth / 2, 168, Game.FontMain, Colors.White, this.items[this.Selection].item.Description);
				
			// Debug
			GetSystemFont().drawText(150, 10, "Selection: " + this.Selection);
			GetSystemFont().drawText(150, 20, "Row: " + this.vars.row);
			GetSystemFont().drawText(150, 30, "Column: " + this.vars.column);
			GetSystemFont().drawText(150, 40, "Columns: " + this.vars.columns);
			GetSystemFont().drawText(150, 50, "Item Count: " + this.items.length);
		}
		
		menuAttack.DoKey = function(key)
		{
			switch (key)
			{
				case Keys.Accept:
				{
					var menuItem = null;
					
					if (this.items[this.Selection].item.Menu)
						menuItem = this.items[this.Selection].item.Action();
						
					Screen.GiveFocus(menuEnemySelect);
					
					if (enemySelection > -1)
					{
						
						var target = new Array(enemies[enemySelection]);
						var damage = 0;
						
						if (this.items[this.Selection].item.AttacksAll)
							target = enemies;
							
						if (menuItem != null)
							damage = menuItem.Action(activeEntity, target);
						else
							damage = this.items[this.Selection].item.Action(activeEntity, target);
						
						activeEntity.Mp -= this.items[this.Selection].item.MpCost;
						
						for (var i = 0; i < target.length; i++)
							target[i].Entity.Hp -= damage[i];
						
						// Remove enemy(s) if dead
						// Need to traverse backwards so splicing doesn't interfere with array index
						for (var i = enemies.length - 1; i >= 0; i--)
						{
							if (enemies[i].Entity.Hp <= 0)
								enemies.splice(i, 1);
						}
						
							
						this.Done = true;
						enemySelection = -1;
					}
					break;
				}
				
				case Keys.Cancel:
				{
					
					break;
				}
				
				case Keys.Select:
				{
					
					
					break;
				}
				
				case Keys.Right:
				{
					if (this.vars.column == this.vars.columns - 1)
					{
						this.Selection -= this.vars.column * 4;
						this.vars.column = 0;
					}
					else
					{
						if (this.Selection + 4 > this.items.length - 1)
						{
							this.Selection = this.items.length - 1;
							this.vars.row = (this.items.length % 4) - 1;
							this.vars.column = this.vars.columns - 1;
						}
						else
						{
							this.vars.column++;
							this.Selection += 4;
						}
					}
					
					break;
				}
				
				case Keys.Left:
				{
					if (this.vars.column == 0)
					{
						if (this.Selection + (this.vars.columns - 1) * 4 > this.items.length - 1)
						{
							this.vars.column = this.vars.columns - 1;
							this.Selection = this.items.length - 1;
							this.vars.row = (this.items.length % 4) - 1;
						}
						else
						{
							this.vars.column = this.vars.columns - 1;
							this.Selection += 4 * (this.vars.columns - 1);
						}
					}
					else
					{
						this.vars.column--;
						this.Selection -= 4;
					}
					
					break;
				}
				
				case Keys.Up:
				{
					if (this.vars.row == 0)
					{
						if (this.vars.column == this.vars.columns - 1 && this.vars.columns > 1)
						{
							this.vars.row = (this.items.length % 4) - 1;
							this.Selection += (this.items.length % 4) - 1;
						}
						else if (this.vars.columns > 1)
						{
							this.vars.row = 3;
							this.Selection += 3;
						}
						else
						{
							this.vars.row = this.items.length - 1;
							this.Selection = this.items.length - 1;
						}
						
					}
					else
					{
						this.vars.row--;
						this.Selection--;
					}
					
					break;
				}
				
				case Keys.Down:
				{
					if (this.vars.row == 3 || this.Selection == this.items.length - 1)
					{
						if (this.vars.column == this.vars.columns - 1 && this.vars.columns > 1)
						{
							this.vars.row = 0;
							this.Selection -= (this.items.length % 4) - 1;
						}
						else if (this.vars.columns > 1)
						{
							this.vars.row = 0;
							this.Selection -= 3;
						}
						else
						{
							this.vars.row = 0;
							this.Selection = 0;
						}
					}
					else
					{
						this.vars.row++;
						this.Selection++;
					}
						
					break;
				}
			}
		}
	}
	
	this.Initialize = function()
	{
		// Add enemies to enemy array
		for (var i = 0; i < baddies.length; i++)
			enemies.push(new Battler(Characters[baddies[i]].Clone()));
			
		// Rename Enemies
		RenameEnemies();
		
		// Add party members to party array
		for (var i = 0; i < Game.Party.length; i++)
			party.push(new Battler(Game.Party[i]));
		
		bgMusic.play(true);
		
		// Add sprites
		for (var i = 0; i < enemies.length; i++)
		{
			//enemies[i].Entity.SpriteSet.SetLocation(20, 40 + i * 20, "BattleIdle");
			//Screen.AddRender(enemies[i].Entity.SpriteSet);
		}
			
		for (var i = 0; i < party.length; i++)
		{
			party[i].Entity.SpriteSet.SetLocation(220, 80 + i * 20, "BattleIdle");
			Screen.AddRender(party[i].Entity.SpriteSet);
		}
		
		this.initialized = true;
	}
	
	this.Render = function()
	{
		this._PreRender();
		this._Render();
		this._PostRender();
	}
	
	this.Update = function()
	{
		if (GetTime() - delay > currentTime)
		{
			highlightName = !highlightName;
			currentTime = GetTime();
		}
		
		// Show attack menu
		if (menuQueue.Count() > 0 && activeEntity == null)
		{
			activeEntity = menuQueue.Dequeue();
			Screen.GiveFocus(menuAttack);
			activeEntity.ResetTimer();
			activeEntity = null;
			menuAttack.initialized = false;
			menuAttack.items.Clear();
		}
		
		// Update party timers
		for (var i = 0; i < party.length; i++)
		{
			if (party[i].Entity.Hp > 0 && timeMode == BattleTimeMode.Active)
			{
				if (party[i].UpdateTimer(party[i].Entity.Status))
					menuQueue.Enqueue(party[i]);
			}		
		}
		
		// Update enemy timers
		for (var i = 0; i < enemies.length; i++)
		{
			if (BattleTimeMode.Active)
			{
				if (enemies[i].UpdateTimer(enemies[i].Entity.Status))
					turnQueue.Enqueue(enemies[i]);
			}
		}
	}
	
	this._PreRender = function()
	{
		
		Map.BattleBg.blit(0, 0);
	}
	
	this._Render = function()
	{
		// Windows
		Game.WindowStyle.drawWindow(3, 164, 314, 18);
		Game.WindowStyle.drawWindow(3, 188, 131, 50);
		Game.WindowStyle.drawWindow(140, 188, 177, 50);
		
		
		for (var i = 0; i < party.length; i++)
		{
			// Hp/Mp rectangles
			Rectangle(144, 203 + 16 * i, 60, 2, Colors.DarkRed);
			Rectangle(144, 203 + 16 * i, 60, 1, Colors.Black);
			Rectangle(207, 203 + 16 * i, 30, 2, Colors.DarkRed);
			Rectangle(207, 203 + 16 * i, 30, 1, Colors.Black);
			
			// Gradients
			if (party[i].Entity.Hp > 0)
				GradientRectangle(144, 203 + 16 * i, (party[i].Entity.Hp / party[i].Entity.MaxHp) * 60, 2, Colors.HpBlue, Colors.White, Colors.White, Colors.HpBlue);
				
			if (party[i].Entity.Mp > 0)
				GradientRectangle(207, 203 + 16 * i, (party[i].Entity.Hp / party[i].Entity.MaxHp) * 30, 2, Colors.MpGreen, Colors.White, Colors.White, Colors.MpGreen);
			
			// Barriers
			barrierBg.blit(95, 193 + 16 * i);
			
			// Limits
			battleBarBg.blit(238, 194 + 16 * i);
			
			// Timers
			battleBarBg.blit(277, 194 + 16 * i);
			Rectangle(280, 196 + 16 * i, party[i].CurrentTime / party[i].MaxTime * 32, 5, Colors.Yellow);
		}
	}
	
	this._PostRender = function()
	{
		var fontColor;
		
		// Column titles (name, hp, mp, etc)
		DrawText(14, 188, Game.FontBattleSmall, Colors.LightGrey, "name");
		DrawText(93, 188, Game.FontBattleSmall, Colors.LightGrey, "barrier");
		DrawText(144, 188, Game.FontBattleSmall, Colors.LightGrey, "hp");
		DrawText(210, 188, Game.FontBattleSmall, Colors.LightGrey, "mp");
		DrawText(240, 188, Game.FontBattleSmall, Colors.LightGrey, "limit");
		DrawText(279, 188, Game.FontBattleSmall, Colors.LightGrey, timeMode);
		
		for (var i = 0; i < party.length; i++)
		{
			// Change font color based on hp
			if (party[i].Entity.Hp == 0)
				fontColor = Colors.Red;
			else if (party[i].Entity.Hp / party[i].Entity.MaxHp <= (1 / 3))
				fontColor = Colors.Yellow;
			else
				fontColor = Colors.White;
				
			// Names
			DrawText(14, 194 + 16 * i, Game.FontMain, fontColor, party[i].Entity.Name);
			
			if (activeEntity != null && activeEntity.Entity.Name == party[i].Entity.Name && highlightName)
				DrawText(14,  194 + 16 * i, Game.FontMain, Colors.Grey, party[i].Entity.Name);
			
			// HP
			DrawTextRight(172, 194 + 16 * i, Game.FontBold, fontColor, party[i].Entity.Hp);
			DrawText(172, 194 + 16 * i, Game.FontBold, Colors.Grey, "/");
			DrawTextRight(204, 194 + 16 * i, Game.FontBold, fontColor, party[i].Entity.MaxHp);
			
			// MP
			DrawTextRight(236, 194 + 16 * i, Game.FontBold, fontColor, party[i].Entity.Mp);
		}
		
		// Debug
			// Enemies Stuff
		for (var i = 0; i < enemies.length; i++)
			DrawText(10, 20 + i * 15, GetSystemFont(), Colors.White, enemies[i].Entity.Name + ": " + enemies[i].Entity.Hp);		
	}
	
	this.DoKey = function()
	{
		
	}
	
	// Renames duplicate enemies (e.g Bat A, Bat B, Bat C)
	function RenameEnemies()
	{
		var aList = new Array(); // List to hold names that need the letter "A" appended to them
		var nameIndex = 0;
		var letterIndex = 66;	// Ascii Char value
		var counter = 1;
		
		enemies.sort();
		
		for (var i = 0; i < enemies.length; i++)
		{
			if (nameIndex + counter < enemies.length)
			{
				if (enemies[nameIndex].Entity.Name == enemies[nameIndex + counter].Entity.Name)
				{
					if (letterIndex == 66)
						aList.push(nameIndex);
						
					enemies[nameIndex + counter].Entity.Name += " " + String.fromCharCode(letterIndex);
					letterIndex++;
					counter++;
				}
				else
				{
					nameIndex = i;
					letterIndex = 66;
					counter = 1;
				}
			}
		}
		
		for (var i = 0; i < aList.length; i++)
			enemies[aList[i]].Entity.Name += " A";
			
		
	}
}

// Sudo enum
var TurnPrecedence = { None:0, Normal:1, High:2 };
var BattleTimeMode = { Active:"time", Wait:"wait" };