function Card()
{
	this.text = "";
	this.graphic = null;
	this.value = 0;
	this.desc = "";
	this.row = 0;
	this.col = 0;
	
	this.Update = function()
	{
		
	}
	
	this.Render = function()
	{
		
	}
	
	this.Use = function(player)
	{
		player.score += this.value;
	}
}

var Cards = new Array();
	Cards["P1"] = new Card();
	Cards["P1"].text = "+1";
	Cards["P1"].graphic = LoadImage("CardBlue.png");
	Cards["P1"].value = 1;
	Cards["P1"].row = 0;
	Cards["P1"].col = 0;
	
	Cards["P2"] = new Card();
	Cards["P2"].text = "+2";
	Cards["P2"].graphic = LoadImage("CardBlue.png");
	Cards["P2"].value = 2;
	Cards["P2"].row = 0;
	Cards["P2"].col = 1;
	
	Cards["P3"] = new Card();
	Cards["P3"].text = "+3";
	Cards["P3"].graphic = LoadImage("CardBlue.png");
	Cards["P3"].value = 3;
	Cards["P3"].row = 0;
	Cards["P3"].col = 2;
	
	Cards["P4"] = new Card();
	Cards["P4"].text = "+4";
	Cards["P4"].graphic = LoadImage("CardBlue.png");
	Cards["P4"].value = 4;
	Cards["P4"].row = 0;
	Cards["P4"].col = 3;
	
	Cards["P5"] = new Card();
	Cards["P5"].text = "+5";
	Cards["P5"].graphic = LoadImage("CardBlue.png");
	Cards["P5"].value = 5;
	Cards["P5"].row = 0;
	Cards["P5"].col = 4;
	
	Cards["P6"] = new Card();
	Cards["P6"].text = "+6";
	Cards["P6"].graphic = LoadImage("CardBlue.png");
	Cards["P6"].value = 6;
	Cards["P6"].row = 0;
	Cards["P6"].col = 5;
	
	Cards["M1"] = new Card();
	Cards["M1"].text = "-1";
	Cards["M1"].graphic = LoadImage("CardRed.png");
	Cards["M1"].value = -1;
	Cards["M1"].row = 1;
	Cards["M1"].col = 0;
	
	Cards["M2"] = new Card();
	Cards["M2"].text = "-2";
	Cards["M2"].graphic = LoadImage("CardRed.png");
	Cards["M2"].value = -2;
	Cards["M2"].row = 1;
	Cards["M2"].col = 1;
	
	Cards["M3"] = new Card();
	Cards["M3"].text = "-3";
	Cards["M3"].graphic = LoadImage("CardRed.png");
	Cards["M3"].value = -3;
	Cards["M3"].row = 1;
	Cards["M3"].col = 2;
	
	Cards["M4"] = new Card();
	Cards["M4"].text = "-4";
	Cards["M4"].graphic = LoadImage("CardRed.png");
	Cards["M4"].value = -4;
	Cards["M4"].row = 1;
	Cards["M4"].col = 3;
	
	Cards["M5"] = new Card();
	Cards["M5"].text = "-5";
	Cards["M5"].graphic = LoadImage("CardRed.png");
	Cards["M5"].value = -5;
	Cards["M5"].row = 1;
	Cards["M5"].col = 4;
	
	Cards["M6"] = new Card();
	Cards["M6"].text = "-6";
	Cards["M6"].graphic = LoadImage("CardRed.png");
	Cards["M6"].value = -6;
	Cards["M6"].row = 1;
	Cards["M6"].col = 5;
	
	Cards["PM1"] = new Card();
	Cards["PM2"] = new Card();
	Cards["PM3"] = new Card();
	Cards["PM4"] = new Card();
	Cards["PM5"] = new Card();
	Cards["PM6"] = new Card();
	Cards["1T"] = new Card();
	Cards["D"] = new Card();
	Cards["24"] = new Card();
	Cards["36"] = new Card();
	Cards["12"] = new Card();