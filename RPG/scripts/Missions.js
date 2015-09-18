function Mission()
{
  this.name     = "";
  this.desc     = undefined;
  this.progress = 0;
  this.exp      = 0;
  this.time     = 0;
  this.active   = false;
  this.complete = false;
}

var Missions = new Array();
  Missions[0] = new Mission();
  Missions[0].name     = "One";
  Missions[0].desc     = new Array();
  Missions[0].desc[0]  = "\t TESRTEG asdgsadg afsdgasdfg sdfgfdgdsf gsdfargsdf sfd gsdfgsdfg sdf gsdg sdfg sdf gsd fg sd fgsdfg dsf gsdf gsg sdfg fsd gdfs gdsfgs df gsdfgsdf gsf g sdfsdf  sdf gsdfg sdfg sdfg sdfg sdgsdfg sdfg fds gsd gdsdfg gdg sgsdf dfs sdf gsdf sdfgsdfgsdfg  dsfg sdf gsdf s fsdf gsdfg sdf gdsfgsdf gsd fgfd gsdfg sdfgsdf g sdf dfg sg sdf g dfg sdg sdfg sdf gsdfsdfg sdfg gsdfg sdf gsdf gfdsg sdf g sdfsdf gdsf g dsg dsg sdf gsdfg";
  Missions[0].desc[1]  = "\t Desc two";
  Missions[0].desc[2]  = "";
  Missions[0].desc[3]  = "";
  Missions[0].progress = 0;
  Missions[0].exp      = 0;
  Missions[0].time     = 40;
  Missions[0].active   = true;
  Missions[0].complete = true;
  
  Missions[1] = new Mission();
  Missions[1].name     = "Two";
  Missions[1].desc     = new Array();
  Missions[1].desc[0]  = "";
  Missions[1].desc[1]  = "";
  Missions[1].desc[2]  = "";
  Missions[1].desc[3]  = "";
  Missions[1].progress = 0;
  Missions[1].exp      = 0;
  Missions[1].time     = 1;
  Missions[1].active   = true;
  Missions[1].complete = true;
  
  Missions[2] = new Mission();
  Missions[2].name     = "Three";
  Missions[2].desc     = new Array();
  Missions[2].desc[0]  = "";
  Missions[2].desc[1]  = "";
  Missions[2].desc[2]  = "";
  Missions[2].desc[3]  = "";
  Missions[2].progress = 0;
  Missions[2].exp      = 0;
  Missions[2].time     = 5;
  Missions[2].active   = true;
  Missions[2].complete = true;
  
  Missions[3] = new Mission();
  Missions[3].name     = "Four";
  Missions[3].desc     = new Array();
  Missions[3].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[3].desc[1]  = "";
  Missions[3].desc[2]  = "";
  Missions[3].desc[3]  = "";
  Missions[3].progress = 0;
  Missions[3].exp      = 0;
  Missions[3].time     = 234;
  Missions[3].active   = true;
  Missions[3].complete = false;
  
  Missions[4] = new Mission();
  Missions[4].name     = "Five";
  Missions[4].desc     = new Array();
  Missions[4].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[4].desc[1]  = "";
  Missions[4].desc[2]  = "";
  Missions[4].desc[3]  = "";
  Missions[4].progress = 0;
  Missions[4].exp      = 0;
  Missions[4].time     = 1000;
  Missions[4].active   = true;
  Missions[4].complete = false;
  
  Missions[5] = new Mission();
  Missions[5].name     = "Six";
  Missions[5].desc     = new Array();
  Missions[5].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[5].desc[1]  = "";
  Missions[5].desc[2]  = "";
  Missions[5].desc[3]  = "";
  Missions[5].progress = 0;
  Missions[5].exp      = 0;
  Missions[5].time     = 907;
  Missions[5].active   = true;
  Missions[5].complete = false;
  
  Missions[6] = new Mission();
  Missions[6].name     = "Seven";
  Missions[6].desc     = new Array();
  Missions[6].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[6].desc[1]  = "";
  Missions[6].desc[2]  = "";
  Missions[6].desc[3]  = "";
  Missions[6].progress = 0;
  Missions[6].exp      = 0;
  Missions[6].time     = 156;
  Missions[6].active   = true;
  Missions[6].complete = false;
  
  Missions[7] = new Mission();
  Missions[7].name     = "Eight";
  Missions[7].desc     = new Array();
  Missions[7].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[7].desc[1]  = "";
  Missions[7].desc[2]  = "";
  Missions[7].desc[3]  = "";
  Missions[7].progress = 0;
  Missions[7].exp      = 0;
  Missions[7].time     = 256;
  Missions[7].active   = true;
  Missions[7].complete = false;
  
  Missions[8] = new Mission();
  Missions[8].name     = "Nine";
  Missions[8].desc     = new Array();
  Missions[8].desc[0]  = "\tasdlkjfhasdjklfh";
  Missions[8].desc[1]  = "";
  Missions[8].desc[2]  = "";
  Missions[8].desc[3]  = "";
  Missions[8].progress = 0;
  Missions[8].exp      = 0;
  Missions[8].time     = 356;
  Missions[8].active   = true;
  Missions[8].complete = false;
  

// Store active missions
var activeMissions = new Array();

// Find out what missions are active
function getActive()
{
  activeMissions.splice(0, activeMissions.length);
  
  if (gShowMiss == 0) // Order by time
  {
    var array = new Array(Missions.length);
    
    for (var i = 0; i < Missions.length; i++)
      array[i] = Missions[i].time;
    
    array.sort(compareNumbers);
    
    for(var i = 0; i < Missions.length; i++)
    {
      for (var j = 0; j < Missions.length; j++)
      {
        if (array[i] == Missions[j].time)
        {
          if (Missions[j].active)
          {
            activeMissions.push(Missions[j]);
            break;
          }
        }
      }
    }
  }
  
  else if (gShowMiss == 1) // Order by ABC
  {
    var array = new Array(Missions.length);
    
    for (var i = 0; i < Missions.length; i++)
      array[i] = Missions[i].name;
    
    array.sort();
    
    for(var i = 0; i < Missions.length; i++)
    {
      for (var j = 0; j < Missions.length; j++)
      {
        if (array[i] == Missions[j].name)
        {
          if (Missions[j].active)
          {
            activeMissions.push(Missions[j]);
            break;
          }
        }
      }
    }
  }
  
  else if (gShowMiss == 2) // Order by default
  {
    for (var i = 0; i < Missions.length; i++)
    {
      if (Missions[i].active)
        activeMissions.push(Missions[i]);
    }
  }
  
  return activeMissions;
}

// Store completed missions
var completeMissions = new Array();

// Find out what missions are complete
function getComplete()
{
  completeMissions.splice(0, completeMissions.length);
  
  if (gShowMiss == 0) // Order by time
  {    
    var array = new Array(Missions.length);
    
    for (var i = 0; i < Missions.length; i++)
      array[i] = Missions[i].time;
    
    array.sort(compareNumbers);
    
    for(var i = 0; i < Missions.length; i++)
    {
      for (var j = 0; j < Missions.length; j++)
      {
        if (array[i] == Missions[j].time)
        {
          if (Missions[j].complete)
          {
            completeMissions.push(Missions[j]);
            break;
          }
        }
      }
    }        
  }

  else if (gShowMiss == 1) // Order by ABC
  {
    var array = new Array(Missions.length);
    
    for (var i = 0; i < Missions.length; i++)
      array[i] = Missions[i].name;
    
    array.sort();
    
    for(var i = 0; i < Missions.length; i++)
    {
      for (var j = 0; j < Missions.length; j++)
      {
        if (array[i] == Missions[j].name)
        {
          if (Missions[j].complete)
          {
            completeMissions.push(Missions[j]);
            break;
          }
        }
      }
    }
  }

  else if (gShowMiss == 2) // Order by default
  {
    for (var i = 0; i < Missions.length; i++)
    {
      if (Missions[i].complete)
        completeMissions.push(Missions[i]);
    }
  }
 
  return completeMissions;
}

function compareNumbers(a, b) 
{
   return a - b;
}
