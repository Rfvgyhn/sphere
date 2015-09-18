function MessageBox(x, y, w, xPad, yPad, font, string, windowStyle, color)
{
	var lines         = WrapString(string, w);
	var boxes         = BoxCount(lines);
	var windowHeight  = Math.ceil(lines.length / boxes.length) * 14 + yPad * 2;
	var speed         = 0;
	var arrowModifier = -1;
	var arrowYOffset  = 0;
	var startTime     = GetTime();
	var delay         = 90;
	var arrow         = LoadImage("TextArrow.png");
	var completed     = false;
	var canInput      = false;
	this.done         = false;
	this.waiting      = false;  // Waiting for input after text has been drawn
	this.currentChar  = 0;
	this.currentLine  = 0;
	this.currentBox   = 0;
	
	if (windowHeight < Math.ceil(2 / boxes.length) * 14 + yPad * 2)
		windowHeight = Math.ceil(2 / boxes.length) * 14 + yPad * 2;	
	
	this.DoKey = function(key)
	{
		if (Screen.HasInput(this) && (key == Keys.Accept || key == Keys.Cancel))
		{
			if (canInput)
			{
				if (this.waiting)
					this.waiting = false;
				else
					this.done = true;
			}
		}
	}
	
	this.Update = function()
	{
		if (!completed)
		{
			switch(g_textSpeed)
			{
				case "Slow":   { speed = 0.2;break; }
				case "Medium": { speed = 0.5; break; }
				case "Fast":   { speed = 1; break; }
			}
			
			if (this.waiting)
			{
				if (GetTime() > startTime + delay)
				{
					if (arrowYOffset == 0 || arrowYOffset == 3)
						arrowModifier *= -1;
						
					arrowYOffset += arrowModifier;
					startTime = GetTime();
				}
			}
			
			else
			{
				this.currentChar += speed;
				canInput = false;
				
				if (Math.floor(this.currentChar) >= boxes[this.currentBox][this.currentLine].length)
				{
					this.currentLine++;
					this.currentChar = 0;
					
					if (this.currentLine == boxes[this.currentBox].length)
					{
						this.currentBox++;
						
						if (this.currentBox == boxes.length) // Reached last textBox
							completed = true;
						else
						{
							this.currentLine = 0;
							this.waiting = true;
						}
						
						canInput = true;
					}
				}
			}
		}
	}
	
	this.Render = function()
	{
		if (this.waiting)
		{
			windowStyle.drawWindow(x, y, w, windowHeight);
			
			for (var i = 0; i < boxes[this.currentBox - 1].length; i++)
				DrawText(x + xPad, y + yPad + (i * 14), font, boxes[this.currentBox - 1][i], color);

			// Draw bouncing arrow
			arrow.blit(x + xPad + font.getStringWidth(boxes[this.currentBox - 1][this.currentLine]) + 2, (y + yPad - 1) + ((this.currentBox) * 16) + arrowYOffset);
		}
		else
		{
			windowStyle.drawWindow(x, y, w, windowHeight);

			if (!completed)
			{
				for (var i = 0; i < this.currentLine; i++)
					DrawText(x + xPad, y + yPad + (i * 14), font, boxes[this.currentBox][i], color);
				
				DrawText(x + xPad, y + yPad + (this.currentLine * 14), font, boxes[this.currentBox][this.currentLine].substr(0, this.currentChar), color);
			}
			else
			{
				for (var i = 0; i < this.currentLine; i++)
					DrawText(x + xPad, y + yPad + (i * 14), font, boxes[this.currentBox - 1][i], color);	
			}
		}
	}
	
	function BoxCount(lines, perBox)
	{
		var boxes = new Array();
		var linesPerBox = perBox || 2;
		
		for (var i = 0; i < lines.length; i++)
		{
			if (i % linesPerBox == 0)
				boxes.push(new Array());
				
			boxes[boxes.length - 1].push(lines[i]);
		}
		
		return boxes;
	}
	
	function WrapString(text, maxWidth, perBox)
	{
		if (text == "")
			Abort("MessageBox.WrapString: Input text must not be null.");
			
		var linesPerBox = perBox || 2;
		var lines = new Array();
		var line = "";
		var width = 0;
		
		for (var i = 0; i < text.length; i++)
		{
			var character = text.charAt(i);
			
			if (character == '\n')
			{
				lines.push(line);
				line = "";
				width = 0;
			}
			else
			{
				width += font.getStringWidth(character);
				
				if (width > maxWidth)
				{
					lines.push(line.substr(0, line.lastIndexOf(' ')));
					line = line.substr(line.lastIndexOf(' ') + 1) + character;
					width = font.getStringWidth(line);
				}
				else
				{
					line += character;
				}
			}
		}
		
		if (line != '') 
			lines.push(line);
		
		for (var i = 0; i < lines.length; i++)
			lines[i] = TrimWhiteSpace(lines[i]);
			
		return lines;
	}
}