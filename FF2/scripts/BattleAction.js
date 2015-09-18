function BattleAction(data)
{
	this.Name = data.name || "Error";
	this.Description = data.description || "Error";
	this.MpCost = data.mpCost || 0;
	this.Menu = data.menu || false;
	this.Action = data.action || function() { Abort("BattleAction.Constructor(): No Action() method defined"); };
	this.AttacksAll = data.attacksAll || false;
}

var BattleActions = new Array();

BattleActions["Attack"] = new BattleAction({
							name: "Attack",
							description: "Attack with equipped weapon",
							action: function(attacker, targets) 
							{
								var damage = new Array();
								
								for (var i = 0; i < targets.length; i++)
									damage.push(attacker.Entity.Attack * Random(1, 20));
									
								return damage;
							}
							});
BattleActions["Fire"] = new BattleAction({
							name: "Fire",
							description: "Use fire",
							mpCost: 2,
							action: function(attacker, targets) 
							{
								return new Array(100);
							}
							});							
BattleActions["Magic"] = new BattleAction({
							name: "Magic",
							description: "Magic",
							menu: true,
							action: function(attacker, targets) 
							{
								//for (var i = 0; i < targets.length; i++)
									//attacker.Entity.Mp--;
								var magicMenu = new Menu(); {
								magicMenu.Initialize = function()
								{			
									//for (var i = 0; i < activeEntity.Entity.BattleCommands.length; i++)
										this.AddItem(BattleActions["Fire"], function() { }, Color.White);
																		
									this.Selection = 0;
									this.vars.columns = Math.ceil(this.items.length / 4);	
									this.vars.row = 0;
									this.vars.column = 0;
									
									
									
									//this.initialized = true;
								}
								
								magicMenu.Update = function()
								{
									
								}
								
								magicMenu._PreRender = function()
								{
								
								}
								
								magicMenu._Render = function()
								{
									Game.WindowStyle.drawWindow(75, 187, 54 + ((this.vars.columns - 1) * 50), 50);
								}
								
								magicMenu._PostRender = function()
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
											
										DrawText(78 + 50 * colCounter, 190 + 12 * rowCounter, Game.FontMain, Color.White, this.items[i].item.Name);
										
										rowCounter++;
									}
									
									this.Cursor.blit(53 + 50 * this.vars.column, 190 + 12 * this.vars.row);
									
									if (Screen.HasInput(this))
										DrawTextCenter(Game.ScreenWidth / 2, 168, Game.FontMain, Color.White, this.items[this.Selection].item.Description);
								}
								
								magicMenu.DoKey = function(key)
								{
									switch (key)
									{
										case Key.Accept:
										{/*
											Screen.GiveFocus(menuEnemySelect);
											
											if (enemySelection > -1)
											{
												var target = new Array(enemies[enemySelection]);
												
												if (this.items[this.Selection].item.AttacksAll)
													target = enemies;
													
												this.items[this.Selection].item.Action(activeEntity, target);
												
												// Remove enemy(s) if dead
												// Need to traverse backwards so splicing doesn't interfere with array index
												for (var i = enemies.length - 1; i >= 0; i--)
												{
													if (enemies[i].Entity.Hp <= 0)
														enemies.splice(i, 1);
												}
												
													
												this.Done = true;
												enemySelection = -1;
											}*/
											this.Done = true;
											break;
										}
										
										case Key.Cancel:
										{
											
											break;
										}
										
										case Key.Select:
										{
											
											
											break;
										}
										
										case Key.Right:
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
										
										case Key.Left:
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
										
										case Key.Up:
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
										
										case Key.Down:
										{
											if (this.Selection > 0) 
												this.Selection--;
											else
												this.Selection = this.items.length - 1;
												
											break;
										}
									}
								}
								
								Screen.GiveFocus(magicMenu);

								return magicMenu.items[magicMenu.Selection].item;
							}
							}
							});