function Time()
{
	this.date = new Date();
	this.hour = 0;
	this.minutes = 0;
	this.postFix = "";
}

Time.prototype.TheTime = function(timeFormat)
{
	this.date = new Date();
	this.hour = this.date.getHours();
	this.minutes = this.date.getMinutes();
	
	if (timeFormat == "12-Hour")
	{
		if (this.hour > 12)
		{
			this.hour -= 12;
			this.postFix = "PM";
		}
		else if (this.hour == 12)
			this.postFix = "PM";
		else
			this.postFix = "AM";
	}
	else if (timeFormat == "24-Hour")
		this.postFix = "";
	else
		Abort("Invalid timeFormat in 'Time_object.TheTime(timeFormat)'");
		
	if (this.minutes < 10)
	{
		var minute = this.minutes;
		this.minutes = "0" + minute;
	}
	
	return this.hour + ":" + this.minutes + " " + this.postFix;
}

Time.prototype.Hours = function()
{
	this.date = new Date();
	
	return this.date.getHours();
}

Time.prototype.Minutes = function()
{
	this.date = new Date();
	
	return this.date.getMinutes();
}
	