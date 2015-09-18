/*
 * Option object for main menu
 */
 
function Option()
{
	this.name = "";
	this.options = new Array();
	this.optionSelection = 0;
}

var options = new Array();
	options[0] = new Option();
	options[0].name = "Text Speed";
	options[0].options[0] = "Slow";
	options[0].options[1] = "Medium";
	options[0].options[2] = "Fast";
	options[0].optionSelection = 2;
	
	options[1] = new Option();
	options[1].name = "Battle Scene";
	options[1].options[0] = "On";
	options[1].options[1] = "Off";
	options[1].optionSelection = 0;
	
	options[2] = new Option();
	options[2].name = "Battle Style";
	options[2].options[0] = "Shift";
	options[2].options[1] = "Set";
	options[2].optionSelection = 0;
	
	options[3] = new Option();
	options[3].name = "Button Mode";
	options[3].options[0] = "Help";
	options[3].options[1] = "AS";
	options[3].options[2] = "A=Z";
	options[3].optionSelection = 0;
	
	options[4] = new Option();
	options[4].name = "Frame";
	options[4].options = g_windowStyles;
	options[4].optionSelection = 0;
	
	options[5] = new Option();
	options[5].name = "Clock";
	options[5].options[0] = "12-Hour";
	options[5].options[1] = "24-Hour";
	
	options[6] = new Option();
	options[6].name = "Cancel";
	options[6].options[0] = "";