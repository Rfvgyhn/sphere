function Queue()
{
	var items = new Array();
	
	this.Enqueue = function(item)
	{
		items.push(item);
	}
	
	this.Dequeue = function()
	{
		if (items.length > 0)
			return items.shift();
		else
			throw "No items in queue.";
	}
	
	this.Peek = function()
	{
		if (items.length > 0)
			return items[0];
		else
			throw "No items in queue.";
	}
	
	this.Count = function()
	{
		return items.length;
	}
}