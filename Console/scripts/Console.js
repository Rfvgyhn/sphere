Array.prototype.clear = function() {
	this.length = 0;
}

String.prototype.trim = function () {
    return this.replace(/^\s*/, "").replace(/\s*$/, "");
}

String.prototype.rightPad = function(padString, length) {
	var str = this;
	
    while (str.length < length)
        str = str + padString;
        
    return str;
}

function isArray(obj) {
	return Object.prototype.toString.call(obj) === "[object Array]";
}

function Console()
{
	var lines          = [];
	var commands       = [];
	var commandHistory = [];
	var longestCmdName = 0;
	var maxHistory	   = 10;
	var visible        = false;
	var font           = GetSystemFont();
	var image          = null;
	var height         = GetScreenHeight() / 2;
	var keyString      = "";
	var cursorVisible  = true;
	var startTime      = GetTime();
	var cursorDelay    = 400;
	var cursorPos      = 0;
	var upKey          = 1;
	var color = {
		Trim: CreateColor(90, 90, 90, 200),
		Background: CreateColor(0, 0, 0, 200),
		InputBg: CreateColor(0, 0, 0, 215),
		BorderDark: CreateColor(35, 35, 35, 200),
		BorderLight: CreateColor(158, 158, 158, 200)
	};
	
	function addLine(line, indent)
	{
		var pad = indent ? " " : "";
		
		if (isArray(line))
		{
			for (var i = 0; i < line.length; i++)
				lines.push(pad + line[i]);
		}
		else
			lines.push(pad + line);
	}
	
	function addCmdHistory(line)
	{
		if (commandHistory.length == maxHistory)
			commandHistory.shift();
			
		commandHistory.push(line);
	}
	
	function doCommand(command)
	{
		var parms = command.trim().split(" ");
		var cmd = commands[parms[0].toLowerCase()];
		
		if (cmd)
		{
			var result;
			
			if (parms.length > 1)
				result = cmd.action(parms.slice(1));
			else
				result = cmd.action();
			
			if (result)
				addLine(result, true);
		}
		else
		{
			var result;
			
			if (parms.length > 1)
			{
				eval(parms[0] + "=" + parms[1]);
				result = parms[1];
			}
			else
			{
				try
				{
					result = eval(parms[0]);
				}
				catch (ex)
				{
					result = "Unknown Command '" + parms[0] + "'";
				}
			}
			
			addLine(result, true);
		}
	}
	
	this.addCommand = function(cmd, desc, usage, action)
	{
		if (cmd.length > longestCmdName)
			longestCmdName = cmd.length;
			
		commands[cmd.toLowerCase()] = {command: cmd, desc: desc, usage: usage, action: action};
	}
	
	this.toggle = function()
	{
		visible = !visible;
	}
	
	this.init = function()
	{		
		this.addCommand("Help", "Lists all commands or info for a particular command", "help commandName", function(data)
		{
			if (data && commands[data[0].toLowerCase()])
			{
				var cmd = commands[data[0].toLowerCase()]
				return [cmd.desc, "Usage: " + cmd.usage];
			}
				
			var cmds = [];
			
			for (var i in commands)
				cmds.push(commands[i].command.rightPad(" ", longestCmdName + 4) + commands[i].desc);
			
			return cmds;
		});
		this.addCommand("Clear", "Clears log", "clear", function()
		{
			lines.clear();
			return false;
		});	
	}
	
	this.render = function()
	{
		if (!visible)
			return;
			
		
		if (IsMapEngineRunning())
			RenderMap();
		
		Rectangle(0, 0, 8,                     height - 40,   color.Trim);
		Rectangle(8, 0, 1,                     height - 40,   color.BorderDark);	
		Rectangle(9, 0, GetScreenWidth() - 18, height - 41,   color.Background);
		Rectangle(GetScreenWidth() - 9, 0, 1,  height - 40,   color.BorderLight);
		Rectangle(GetScreenWidth() - 8, 0, 8,  height - 40,   color.Trim);
		Rectangle(GetScreenWidth() - 8, height - 32, 8, 24,   color.Trim);
		Rectangle(GetScreenWidth() - 9, height - 32, 1, 24,   color.BorderLight);
		Rectangle(9, height - 41,  GetScreenWidth() - 18, 1,  color.BorderLight);
		Rectangle(9, height - 32,  GetScreenWidth() - 18, 23, color.InputBg);
		Rectangle(9, height - 9,   GetScreenWidth() - 18, 1,  color.BorderLight);
		Rectangle(0, height - 40,  GetScreenWidth(), 8,       color.Trim);
		Rectangle(0, height - 8,   GetScreenWidth(), 8,       color.Trim);
		Rectangle(0, height - 32,  8, 24,                     color.Trim);
		Rectangle(8, height - 32,  1, 24,                     color.BorderDark);
		
		var line = height - font.getHeight() - 30;
		
		if (lines.length * font.getHeight() < line)
			line = lines.length * font.getHeight();
			
		for (var i = lines.length - 1; i >= 0; i--)
		{
			if (line > 5)
			{
				line -= font.getHeight();
				font.drawText(10, line, lines[i]);
			}
		}
		
		font.drawText(10, height - font.getHeight() - 15, keyString);
		
		if (cursorVisible)
			font.drawText(10 + font.getStringWidth(keyString.substr(0, cursorPos)), height - font.getHeight() - 15, "|");
	}
	
	this.update = function()
	{
		if (!visible)
			return;
			
		// Update cursor state
		if (GetTime() > startTime + cursorDelay)
		{
			startTime = GetTime();
			cursorVisible = !cursorVisible;
		}
		
		while (AreKeysLeft())
		{
			var key = GetKey();
			
			switch (key)
			{
				case KEY_TILDE:
				{
					upKey = 1;
					keyString = "";
					this.toggle();
					break;
				}
				
				case KEY_BACKSPACE:
				{
					keyString = keyString.substr(0, keyString.length - 1);
					break;
				}
				
				// Previous commands
				case KEY_UP:
				{
					if (commandHistory.length > 0)
					{
						keyString = commandHistory[commandHistory.length - upKey];
						cursorPos = keyString.length;
					}
					
					if (upKey < commandHistory.length)
						upKey++;
						
					break;
				}
				
				case KEY_ENTER:
				{
					cursorPos = 0;
					addLine(keyString);
					addCmdHistory(keyString);
					
					try
					{
						doCommand(keyString.toLowerCase());
					}
					catch (ex)
					{
						addLine(" " + ex);
					}
					
					keyString = "";
					break;
				}
				
				case KEY_LEFT:
				{
					if (cursorPos > 0)
						cursorPos--;
					
					break;
				}
				
				case KEY_RIGHT:
				{
					if (cursorPos < keyString.length)
						cursorPos++;
					
					break;
				}
				
				default:
				{
					var temp = keyString.substr(cursorPos, keyString.length);
					keyString = keyString.substr(0, cursorPos);
					keyString += GetKeyString(key, IsKeyPressed(KEY_SHIFT));
					keyString += temp;
					cursorPos++;
				}
			}
		}
	}
}

var Console = new Console();