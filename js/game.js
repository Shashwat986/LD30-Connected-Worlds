map_heaven = {};
map_hell = {};
map_earth = {};
me = {};
game_status = "earth";
game_list = [];
my_power = { "heaven":50, "hell":50, "earth":100 };
glob_level = 1;
seed = Math.floor(Math.random()*10+1);

num_levels = 4;

function load(level)
{
	glob_level = (typeof level !== "undefined") ? level : glob_level;	// Chrome compatibility.

	// Welcome message
	$("div.navbar").addClass("navbar-fixed-top");
	$("#alert").hide();
	$(".message").hide();
	$("#welcome-jt").show();
	$("#game-body").hide();



	var paramArray = window.location.search.substring(1)

	// Skipping welcome message if need be. It gets irritating during testing.
	if ((paramArray && paramArray == "start") || (level != 1))
	{
		show_game();
	}

	// Initialize starting conditions
	game_status = "earth";
	game_list = [];
	my_power = { "heaven":50, "hell":50, "earth":100 };
	seed = Math.floor(Math.random()*10+1);
	
	// Load resources
	game_list = []
	$(".game").each(function(){
		game_list.push(this.id);
	});

	load_level(glob_level);

	for (key in map_heaven)
		if (map_heaven[key] == "me")
			me["heaven"] = key;

	for (key in map_earth)
		if (map_earth[key] == "me")
			me["earth"] = key;

	for (key in map_hell)
		if (map_hell[key] == "me")
			me["hell"] = key;

	game_status = "earth";
	refresh();
	earth();
}

function load_level(level)
{
	level = (typeof level !== "undefined") ? level : 0;	// Chrome compatibility.

	switch (level)
	{
		case 0:
			init();
			break;
		case 1:
			map_hell = {"36":"me"};
			map_earth = {"11":"me"};
			map_heaven = {"36":"me"};
			break;
		case 2:
			map_hell = {"11":"me"};
			map_earth = {"11":"me", "13":"g10"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 3:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 4:
			map_hell = {"11":"me", "15":"e40", "21":"e49"};
			map_earth = {"11":"me", "13":"g30", "14":"b10", "15":"g25", "22":"g24"};
			map_heaven = {"11":"me", "26":"e99"};
			break;
		case 5:
			map_hell = {"11":"me", "12":"e51", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 6:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 7:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 8:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 9:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		case 10:
			map_hell = {"11":"me", "15":"e34", "21":"e59"};
			map_earth = {"11":"me", "13":"g60", "24":"b10", "33":"g30"};
			map_heaven = {"11":"me", "24":"e59"};
			break;
		default:
			break;
	}
}

function init()
{
	map_heaven = {"11":"me"};
	map_hell = {"11":"me"};
	map_earth = {"11":"me"};
	// Hell
	block_list = []
	$(".game").each(function(){
		block_list.push(this.id);
	});
	block_list.splice(0,1);	// Remove first element.

	var number_of_enemies = Math.floor(Math.random() * 6) + 3;

	for (var i = 0; i < number_of_enemies; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 100);
		map_hell[block_list[key]] = "e"+parseInt(power);
		block_list.splice(key,1);
	}

	// Earth
	block_list = []
	$(".game").each(function(){
		block_list.push(this.id);
	});
	block_list.splice(0,1);	// Remove first element (me)

	var number_of_good = Math.floor(Math.random() * 4) + 2;
	var number_of_bad = Math.floor(Math.random() * 4) + 2;

	for (var i = 0; i < number_of_good; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 100);
		map_earth[block_list[key]] = "g"+parseInt(power);
		block_list.splice(key,1);
	}
	for (var i = 0; i < number_of_bad; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 100);
		map_earth[block_list[key]] = "b"+parseInt(power);
		block_list.splice(key,1);
	}

	// Heaven
	block_list = []
	$(".game").each(function(){
		block_list.push(this.id);
	});
	block_list.splice(0,1);	// Remove first element.

	var number_of_enemies = Math.floor(Math.random() * 6) + 3;

	for (var i = 0; i < number_of_enemies; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 100);
		map_heaven[block_list[key]] = "e"+parseInt(power);
		block_list.splice(key,1);
	}
}

function key_pressed(key)
{
	switch(key)
	{
		case 37:
			// Left
			var ind = game_list.indexOf(me[game_status]);
			eval('check1 = map_'+game_status+'[game_list[ind-1]];');
			eval('check = map_'+game_status+'[game_list[ind]];');
			if ((ind-1) < 0)	// If next block is empty
				return 0;
			else if (!check1)
			{
				eval('map_'+game_status+'[game_list[ind]] = "";');
				eval('map_'+game_status+'[game_list[ind-1]] = "me";');
				me[game_status] = game_list[ind-1];
				refresh();
				return 0;
			}
			else
				return 0;
		case 39:
			// Right
			var ind = game_list.indexOf(me[game_status]);
			eval('check1 = map_'+game_status+'[game_list[ind+1]];');
			eval('check = map_'+game_status+'[game_list[ind]];');
			if ((ind+1) >= game_list.length)	// If at the end of the board
				return 0;
			else if (!check1)	// If next block is empty
			{
				eval('map_'+game_status+'[game_list[ind]] = "";');
				eval('map_'+game_status+'[game_list[ind+1]] = "me";');
				me[game_status] = game_list[ind+1];
				refresh();
				return 0;
			}
			else if (check1.charAt(0) == 'e')	// If next block has enemy
			{
				power = parseInt(check1.substring(1));
				if (power < my_power[game_status])
				{
					send_post("Alien Destroyed!");
					eval('map_'+game_status+'[game_list[ind]] = "";');
					eval('map_'+game_status+'[game_list[ind+1]] = "me";');
					me[game_status] = game_list[ind+1];
					refresh();
					return 0;
				}
			}
			else if (check1.charAt(0) == 'b' || check1.charAt(0) == 'g')	// If next block has ability
			{
				power = parseInt(check1.substring(1));
				switch(check1.charAt(0))
				{
					case 'b':
						q = deed_query('bad', power);
						if (q==0)
							break;
						my_power["hell"] += power;
						my_power["heaven"] -= power;
						send_post("Naughty, naughty!");
						break;
					case 'g':
						q = deed_query('good', power);
						if (q==0)
							break;
						my_power["hell"] -= power;
						my_power["heaven"] += power;
						send_post("Good boy!");
						break;
					default:
						return 0;
				}
				eval('map_'+game_status+'[game_list[ind]] = "";');
				eval('map_'+game_status+'[game_list[ind+1]] = "me";');
				me[game_status] = game_list[ind+1];
				refresh();
				return 0;
			}
			else
				return 0;
		default:
			return 0;
	}
}

function deed_query(deed, power)
{
	var decision = confirm("Perform "+deed+" deed? Adds "+power+" power.");
	if (decision)
		return 1;
	else
		return 0;
}

function send_post(txt, perm)
{
	perm = typeof (perm !== "undefined") ? perm : 0;

	$("#alert").html(txt);
	if (perm)
		$("#alert").fadeIn();
	else
		$("#alert").fadeIn().delay(1000).fadeOut();
}

function show_welc2()
{
	$(".message").hide();
	$("#welcome2-jt").show();
	$("#game-body").hide();
}

function show_game()
{
	$(".message").hide();
	$("#message-jt").show();
	$("#game-body").show();
}

function heaven()
{
	game_status = "heaven";
	$(".game").removeClass("hell earth");
	$(".game").addClass("heaven");
	$("#nav-heaven").addClass("active");
	$("#nav-earth").removeClass("active");
	$("#nav-hell").removeClass("active");
	refresh();
}

function earth()
{
	game_status = "earth";
	$(".game").removeClass("hell heaven");
	$(".game").addClass("earth");
	$("#nav-heaven").removeClass("active");
	$("#nav-earth").addClass("active");
	$("#nav-hell").removeClass("active");
	refresh();
}

function hell()
{
	game_status = "hell";
	$(".game").removeClass("heaven earth");
	$(".game").addClass("hell");
	$("#nav-heaven").removeClass("active");
	$("#nav-earth").removeClass("active");
	$("#nav-hell").addClass("active");
	refresh();
}

// If refresh is called with a parameter, it clears the screen,
// Else it redraws the screen's status
function refresh(clear)
{
	clear = (typeof clear !== "undefined") ? clear : 0;	// Chrome compatibility.

	$(".game").html("");
	if (clear == 0)
		$(".game").html(function(){
			switch(game_status){
				case "heaven":
					return to_html(map_heaven[this.id],seed);
					break;
				case "hell":
					return to_html(map_hell[this.id],seed);
					break;
				case "earth":
					return to_html(map_earth[this.id],seed);
					break;
				default:
					return "";
					break;
			}
		});

	my_power["heaven"] = (my_power["heaven"] > 100) ? 100 : my_power["heaven"];
	my_power["hell"] = (my_power["hell"] > 100) ? 100 : my_power["hell"];
	my_power["heaven"] = (my_power["heaven"] < 0) ? 0 : my_power["heaven"];
	my_power["hell"] = (my_power["hell"] < 0) ? 0 : my_power["hell"];

	$("#heaven-health").css("width",my_power["heaven"]+"%");
	$("#heaven-health").html('<span>Heaven: '+my_power["heaven"]+'/100</span>');
	$("#earth-health").css("width",my_power["earth"]+"%");
	$("#earth-health").html('<span>Earth: '+my_power["earth"]+'/100</span>');
	$("#hell-health").css("width",my_power["hell"]+"%");
	$("#hell-health").html('<span>Hell: '+my_power["hell"]+'/100</span>');

	$("#level").html(""+glob_level);

	$(".sprite").css("width","90px");
	$(".sprite").css("height","90px");

	var eg = end_game_check()
	if(eg==1)
	{
		if (glob_level == num_levels)
			send_post('Victory! You have completed all the levels!',1);
		else
			send_post('Victory! <a href="javascript:load('+(glob_level+1)+')">Next Level</a>',1);

		end_game();
		// Victory
	}
	else if (eg==-1)
	{
		send_post('Defeat! <a href="javascript:load('+glob_level+')">Retry</a>',1);
		end_game();
		// Loss
	}
	else
	{
		// Nothing
	}
}

function to_html(map_char, seed)
{
	Math.seed = seed;
	switch(true)
	{
		case(!map_char):
			return "";
		case(map_char == "me"):
			return '<img src="images/f_'+game_status+'.png" class="sprite" alt="You"/>';
		case(typeof map_char === "undefined"):
			return "";
		case(map_char.charAt(0) == "e"):
			val = Math.floor(Math.seededRandom() * 5) + 1;
			return '<img src="images/enemy'+val+'.png" class="sprite" alt="Power '+map_char.substring(1)+'"/><br/>'+map_char.substring(1);
		case(map_char.charAt(0) == 'g'):
			return '<img src="images/good1.png" class="sprite" alt="Power '+map_char.substring(1)+'"/><br/>'+map_char.substring(1);
		case(map_char.charAt(0) == 'b'):
			return '<img src="images/bad1.png" class="sprite" alt="Power '+map_char.substring(1)+'"/><br/>'+map_char.substring(1);
		default:
			return "";
	}
}

// http://indiegamr.com/generate-repeatable-random-numbers-in-js/
Math.seededRandom = function(max, min) {
    max = max || 1;
    min = min || 0;
 
    Math.seed = (Math.seed * 9301 + 49297) % 233280;
    var rnd = Math.seed / 233280;
 
    return min + rnd * (max - min);
}

function end_game()
{
	$("div.navbar").removeClass("navbar-fixed-top");
	$("#game-body").hide();
	$(".message").hide();
}

function end_game_check()
{
	if ((me["heaven"] == "36") && (me["earth"] == "36") && (me["hell"] == "36"))
		return 1;
	if ((my_power["heaven"] == 0) || (my_power["earth"] == 0) || (my_power["hell"] == 0))
		return -1;
	return 0;
}