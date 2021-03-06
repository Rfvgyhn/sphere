// Game clock object by WIP
// This is a function that will create a game clock object.
// Just use the function clock.getTime() and it will
// return an object with seconds, minutes and hours
// Note: You must start the clock before it will give
// the correct time

function Clock()
{
	this.started = 0;
	this.seconds = 0;
	this.minutes = 0;
	this.hours   = 0;
	this.total   = 0;
	this.paused  = false;
}

// Example: var GameClock = new Clock();

Clock.prototype.Start = function()
{
	this.started = GetTime();
}

// Example: GameClock.start();

Clock.prototype.GetTime = function(a)
{
	var current = this.total + GetTime() - this.started;
	var secs = "";
	var mins = "";
	var hours = "";
	if (Math.floor((current)/1000 + this.seconds) % 60 < 10)
	{
		secs += "0";
	}
	secs += Math.floor((current)/1000 + this.seconds) % 60;
	 if (Math.floor((current/1000+this.seconds)/60 + this.minutes) % 60 < 10)
	{
		mins += "0";
	}
	 mins += Math.floor((current/1000+this.seconds)/60 + this.minutes) % 60;
	//if (Math.floor((current)/1000/60/60 + this.hours) % 60 < 100)
	//{
	//	hours += "0";
	//}
	//if (Math.floor((current)/1000/60/60 + this.hours) % 60 < 10)
	//{
	//	hours += "0";
	//}
	hours += Math.floor(((current/1000+this.seconds)/60+this.minutes)/60 + this.hours) % 60;
	if (a == true)
	{
		return [hours, mins, secs];
	}
	else
		return hours + ":" + mins + ":" + secs;
}

Clock.prototype.Pause = function()
{
    if (this.paused == false)
    {
      this.total += GetTime() - this.started;
      this.paused = true;
    }
}

Clock.prototype.Unpause = function()
{
    if (this.paused == true)
    {
      this.started = GetTime();
      this.paused = false;
    }
}
  

// Roboto Edit: Lines 38, 42, 51 changed by rjt from spheredev.net
//              Hashed out lines 43 - 50 to remove preceding zeros on hour count
//              Added pause and unpause functions

// Example:
// font.drawText(10, 10, clock.getTime());
//
// Every time you want to start keeping track of time, 
// start the clock. If you are loading a game, you should
// load the time into the clock object. That way, it can keep
// correct time with a loaded game.
//
// clock.getTime(true) returns the time in an array
// Example:
// var time = clock.getTime(true);
// font.drawText(10, 10, time[0]); // Hours
// font.drawText(10, 20, time[1]); // Minutes
// font.drawText(10, 30, time[2]); // Seconds