function Map(_width, _height, textureNames)
{
	this.Done = false;
	this.Initialized = false;
	var tileWidth;
	var tileDepth;
	var map = [];
	var textures = [];
	var height = _height || 50;
	var width = _width || 50;
	var camera;
	
	this.Initialize = function()
	{
		for (var i = 0; i < textureNames.length; i++)
		{
			textures[i] = LoadImage(textureNames[i]);
			tileWidth = textures[i].width;
			tileDepth = textures[i].height;
		}
		
		camera = new Camera(tileWidth * (width - 1) + (tileWidth / 2), (Game.ScreenHeight / 2  - (height * tileDepth / 2)));
	
		for (var x = 0; x < width; x++)
		{
			map[x] = [];
			
			for (var y = 0; y < height; y++)
				map[x][y] = new Cell(textures[Random(0, textures.length - 1)]);
		}
		
		this.Initialized = true;
	}
	
	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		var screenX;
		var screenY;
		
		for (var x = 0; x < width; x++)
		{
			for (var y = 0; y < height; y++)
			{
				// Iso coordinates
				screenX = camera.X - (x - y + height) * (tileWidth / 2);
				screenY = camera.Y + (x + y) * (tileDepth / 2);
				
				map[x][y].Texture.blit(screenX, screenY);
			}
		}
	}
	
	this.DoKey = function()
	{
		switch (GetKey())
		{
			case Keys.Right:
				camera.MoveRight();
				break;
				
			case Keys.Left:
				camera.MoveLeft();
				break;
				
			case Keys.Up:
				camera.MoveUp();
				break;
			
			case Keys.Down:
				camera.MoveDown();
				break;
		}
	}
}