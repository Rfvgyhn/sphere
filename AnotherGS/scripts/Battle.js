function Battle()
{
	//characters["MainChar"].battling = true;
	this.Enemies       = null;
	var actionList    = new Array();
	var messageQueue = new Array();
	var tempMessageQueue = new Array();
	var messageQueueY = Game.GbaY + 138;
	var messageQueueTimer = 0;
	var updateMessageQueuePos = false;
	var showMenus = false;
	var selectedEnemy = 0;
	var selectedHero  = 0;
	var background    = Map.battleBg; //bg;
	this.done          = false;
	this.initialized = false;
	var turnOption    = ""; // What the player choose to do on their turn
	var intro         = false;  // Gone through the battle intro
	var waiting       = false;
	
	var menuAttackFlee = new Menu(); {
		menuAttackFlee.Initialize = function()
		{
			menuAttackFlee.AddItem("Fight", function() { menuAttackFlee.Hide = true;
														 Screen.GiveFocus(menuOptions);
													   }, Colors.White, LoadImage("Menu/Icons/Fight.gif"));
			
			// if (secondar party length > 0)
				menuAttackFlee.AddItem("Switch", function() {}, Colors.White, LoadImage("Menu/Icons/Switch.gif"));
				
			menuAttackFlee.AddItem("Flee",    function() {}, Colors.White, LoadImage("Menu/Icons/Flee.gif"));
			menuAttackFlee.AddItem("Status",   function() {}, Colors.White, LoadImage("Menu/Icons/Status.gif"));

			this.vars.iconHeight = this.items[0].icon.height;
			this.vars.iconWidth = this.items[0].icon.width;
			this.vars.menuLength = this.items.length * this.vars.iconWidth + 70;  // Plus 70 is width of text window
			this.vars.x = (Game.ScreenWidth / 2) - (this.vars.menuLength / 2);
			this.vars.y = Game.GbaY + Game.GbaHeight - this.vars.iconHeight;
			this.vars.timeInterval = 90;
			this.vars.transFactor = 2;
			this.vars.direction = 1;
			this.vars.time = GetTime();
			this.vars.fontPadding = 8;
			this.vars.xTrans = 0;
			
			this.initialized = true;
		}
		
		menuAttackFlee.Update = function()
		{
			with (this.vars) 
			{
				xTrans = x + iconWidth * this.selection;
			
				if (GetTime() - time > timeInterval)
				{
					if (transFactor == 1 || transFactor == 2)
						direction *= -1;
					
					transFactor += direction;
					
					time = GetTime();
				}
			}
		}
		
		menuAttackFlee._PreRender = function()
		{
		
		}
		
		menuAttackFlee._Render = function()
		{
			with (this.vars) 
			{
				for (var i = 0; i < this.items.length; i++)
					this.items[i].icon.blit(x + iconWidth * i, y);
				
				Game.WindowStyle.drawWindow(x + iconWidth * this.items.length + 7, y + 7, 56, 10); // Plus 7s are to make up for window borders being drawn outside width and height
				this.items[this.selection].icon.transformBlit(xTrans - transFactor, y - transFactor, xTrans + iconWidth + transFactor, y - transFactor, xTrans + iconWidth + transFactor, y + iconHeight, xTrans - transFactor, y + iconHeight);
			}
		}
		
		menuAttackFlee._PostRender = function()
		{
			with (this.vars)
			{		
				DrawText(x + iconWidth * this.items.length + fontPadding, y + fontPadding, Game.FontSystem, Colors.White, this.items[this.selection].item);
			}
		}
		
		menuAttackFlee.DoKey = function(key)
		{
			switch (key)
			{
				case Keys.Accept:
				{
					this.items[this.selection].Action();
					
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
					if (this.selection < this.items.length - 1) 
						this.selection++;
					else
						this.selection = 0;
					
					break;
				}
				
				case Keys.Left:
				{
					if (this.selection > 0) 
						this.selection--;
					else
						this.selection = this.items.length - 1;
					
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
	var menuOptions   = new Menu();
	
	this.Initialize = function()
	{
		for (var i = 0; i < this.Enemies.length; i++)
		{
			tempMessageQueue.push(new BattleMessage(this.Enemies[i].Name + " appeared!", true));
		}
		
		messageQueueTimer = GetTime();
		
		this.initialized = true;
	}
	
	this.Render = function()
	{
		if (intro)
		{
			
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
		var currentTime = GetTime();
		
		if (updateMessageQueuePos)
			{
				if (messageQueueY == Game.GbaY + 125)
				{
					messageQueue.RemoveFront();
					messageQueueY = Game.GbaY + 138;
					updateMessageQueuePos = false;
				}
				else if (currentTime > messageQueueTimer + 15)
				{
					messageQueueTimer = GetTime();
					messageQueueY -= 1;
				}
			}
			
		if (!waiting)
		{
			
			if (tempMessageQueue.length > 0)
				ReadMessageQueue();
			else if (actionList.length == 0 && Screen.HasInput(this))
			{
				tempMessageQueue.Clear();
				messageQueue.Clear();
				Screen.GiveFocus(menuAttackFlee);
			}
			else
			{
				
			}
		}		
	}
	
	this._PreRender = function()
	{
		Rectangle(Game.GbaX, Game.GbaY, Game.GbaWidth, Game.GbaHeight, Colors.Black);
		
		for (var i = 0; i < messageQueue.length; i++)
			Game.FontSystem.drawText(Game.GbaX + 3, messageQueueY + i * 13, messageQueue[i].Message);
		
		Map.BattleBg.blit(Game.GbaX - 16, Game.GbaY + 16);
	}
	
	this._Render = function()
	{
		if (waiting)
		{
			// Render cursor
		}
	}
	
	this._PostRender = function()
	{
		/*
			TODO: 	Char stats, window, icons
					Menu
					
		*/
	}
	
	function ReadMessageQueue() 
	{
		for (var i = 0; i < tempMessageQueue.length; i++)
		{
			messageQueue.push(tempMessageQueue[i]);
			
			if (messageQueue.length > 2)
				updateMessageQueuePos = true;
			
			if (tempMessageQueue[i].WaitForKeyPress)
			{
				tempMessageQueue.RemoveFront();
				waiting = true;
				break;
			}
		}
	}
	
	this.DoKey = function(key)
	{
		if (waiting && (key == Keys.Accept || key == Keys.Cancel))
			waiting = false;
		
		else
		{
			switch(key)
			{
				
			}
		}
	}
	
	this.DoTurn = function(fromWho, onWho)
	{
		
	}
	
	function SortTurnList()
	{
		// Sort based on agility
		for(var i = turnList.length - 1; i > 0; i--) 
		{
			for(var j = 0; j < i; j++)
			{
				if(turnList[j + 1].FromWho.Agility > turnList[j].FromWho.Agility)
				{
					var temp = new BattleTurn(turnList[j].Precedence, turnList[j].Selection, turnList[j].FromWho, turnList[j].OnWho);
					
					turnList[j] = turnList[j + 1];
					turnList[j + 1] = temp;
				}
			}
		}
		
		// Sort based on turn precedence
		for(var i = turnList.length - 1; i > 0; i--) 
		{
			for(var j = 0; j < i; j++)
			{
				if(turnList[j + 1].Precedence > turnList[j].Precedence)
				{
					var temp = new BattleTurn(turnList[j].Precedence, turnList[j].Selection, turnList[j].FromWho, turnList[j].OnWho);
					
					turnList[j] = turnList[j + 1];
					turnList[j + 1] = temp;
				}
			}
		}
	}
}

var Battle = new Battle();

function BattleMessage(message, waitForKeyPress)
{
	this.Message = message;
	this.WaitForKeyPress = waitForKeyPress;
}

function BattleTurn(precedence, selection, fromWho, onWho)
{
	this.Precedence = precedence;
	this.Selection = selection;
	this.FromWho = fromWho;
	this.OnWho = onWho;
}

// Sudo enum
var TurnPrecedence = { None:0, Normal:1, High:2 };