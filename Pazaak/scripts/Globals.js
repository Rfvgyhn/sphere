const SCREEN_WIDTH  = GetScreenWidth();
const SCREEN_HEIGHT = GetScreenHeight();

var cardHighlight = LoadImage("CardHighlight.png").createSurface();
var g_font = LoadFont("dialogfont16x16.rfn");
var g_done = false;
var g_instructions = "The object of the game is to have the face up cards total higher than the opponent's hand " +
					 "without exceeding a total of 20. If a player's total is greater than 20 at the end of a turn " +
					 "(a 'BUST'), the opponent wins the set. A player must win three sets to win the match. When " +
					 "the match begins, four of the  cards from the side deck will be randomly drawn to form the " +
					 "player's HAND during the match.\n\n" +
					 "The first card is automatically drawn from the main deck and placed face up. After each card " +
					 "is played, an additional card can be played from the HAND by dragging the card up into the " +
					 "area when the currently played cards are displayed. Playing a HAND card is optional. Also, you " +
					 "can only play one HAND card per turn. The player can also click END TURN to end the turn, OR " +
					 "click STAND to stay with the current total. This continues until one player wins the set. Ties " +
					 "do not count.\n\n" +
					 "Cards from the player's hand can only be used once, so the four cards must last the entire match.";

function DrawText(x, y, font, string, color, rightAlign)
{
	var color = color || Colors.White;
	
	if (rightAlign)
		x -= font.getStringWidth(string);
	
	font.setColorMask(color);
	font.drawText(x, y, string);
}

// Draws wrapped text
function DrawTextBox(x, y, w, h, font, string, color)
{
	var color = color || Colors.White;
	
	font.setColorMask(color);
	font.drawTextBox(x, y, w, h, 0, string);
}

function Random(min, max)
{
	return Math.round((Math.random() * (max - min)) + min)
}

function RectangleNoFill(x, y, w, h, color)
{
	Line(x, y, x + y, y, color);
	//Line(x, y + h, );
	//Line();
	//Line();
}