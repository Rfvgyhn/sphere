function Item()
{
	this.name = "";
	this.description = "";
	this.icon = "";
}

var Items = new Array();

Items["Apple"] = new Item();
	Items["Apple"].name        = "Apple";
	Items["Apple"].description = "Raises Attack";
	Items["Apple"].icon        = LoadImage("Icons/Apple-icon.gif");
	
Items["Herb"] = new Item();
	Items["Herb"].name        = "Herb";
	Items["Herb"].description = "Restores 50hp";
	Items["Herb"].icon        = LoadImage("Icons/Herb.gif");