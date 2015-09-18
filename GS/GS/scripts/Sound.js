function Sound(sound)
{
	this.sound = sound;
}

/*
	Sound.SetSound
	Changes the current sound to a new sound
	@param (sound) Sound to change to 
			soundObject.SetSound(LoadSound("TheSound.mp3"));
*/
Sound.prototype.SetSound = function(sound)
{
	this.sound = sound;
}

/*/
 *	Sound.Play
 *	Plays current sound
 *	@param (repeat) Loop through sound
 *			soundObject.Play(true);
/*/
Sound.prototype.Play = function(repeat)
{
	this.sound.play(repeat, true);
}

Sound.prototype.IsPlaying = function()
{
	return this.sound.isPlaying();
}

/*
	Sound.FadeOut
	Lowers the volume to zero in a fade fashion
	@param (time) How long it takes to fade out in milliseconds
			soundObject.FadeOut(3000);
*/
Sound.prototype.FadeOut = function(time)
{
	var volume = 255;//this.sound.getVolume();
	var lastTime = GetTime();
	
	while (volume >= 0)
	{
		if (GetTime() - lastTime > time)
		{
			volume -= 17;
			this.sound.setVolume(volume);
			lastTime = GetTime();
		}
		
		DrawText(0, 0, FONT_SYSTEM, c_white, volume);
		FlipScreen();
	}
}

/*
	Sound.GetSound
	Get current sound
			soundObject.GetSound();
*/
Sound.prototype.GetSound = function()
{
	return this.sound;
}