function Timer()
{
  this.started  = 0;
  this.total    = 0;
  this.paused   = false;
}

Timer.prototype.start = function()
{
	this.started = GetTime();
}

Timer.prototype.pause = function() 
{
  if (!this.paused) 
  {
    this.total += (GetTime() - this.started);
    this.paused = true;
  }
}

Timer.prototype.unpause = function() 
{
  if (this.paused) 
  {
    this.started = GetTime();
    this.paused = false;
  }
}

Timer.prototype.getSeconds = function() 
{
  if (this.paused) 
    return this.total / 1000;
    
  else 
    return (this.total + (GetTime() - this.started)) / 1000;
}