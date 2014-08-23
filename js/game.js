map_heaven = {};
map_hell = {};
map_earth = {};
game_status = "earth";

function load()
{
	// Welcome message
	$(".message").hide();
	$("#welcome-jt").show();
	$("#game-body").hide();
	var paramArray = window.location.search.substring(1)

	// Skipping welcome message if need be. It gets irritating during testing.
	if (paramArray){
		switch(paramArray){
			case "start":
				show_game();
				break;
			case "w2":
				show_welc2();
				break;
			default:
				break;
		}
	}
	
	// Load resources
	map_earth["11"]="me";
	map_heaven["11"]="me";
	map_hell["11"]="me";

	// Hell
	block_list = []
	$(".game").each(function(){
		block_list.push(this.id);
	});

	block_list.splice(0,1);	// Remove first element.

	var number_of_enemies = Math.floor(Math.random() * 6) + 3;

	for (var i = 0; i < number_of_enemies; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 101);
		map_hell[block_list[key]] = "e"+parseInt(power);
		block_list.splice(key,1);
	};

	// Heaven
	block_list = []
	$(".game").each(function(){
		block_list.push(this.id);
	});

	block_list.splice(0,1);	// Remove first element.

	var number_of_enemies = Math.floor(Math.random() * 6) + 3;

	for (var i = 0; i < number_of_enemies; i++) {
		var key = Math.floor(Math.random() * block_list.length);
		var power = Math.floor(Math.random() * 101);
		map_heaven[block_list[key]] = "e"+parseInt(power);
		block_list.splice(key,1);
	};

	game_status = "earth";
	refresh();
}

function to_html(map_char)
{
	switch(true)
	{
		case(map_char == "me"):
			return '<img src="images/f_'+game_status+'.png" class="sprite" alt="You"/>';
		case(typeof map_char === "undefined"):
			return "";
		case(map_char.charAt(0) == "e"):
			val = Math.floor(Math.random() * 7) + 1;
			return '<img src="images/enemy'+val+'.png" class="sprite" alt="Power '+map_char.substring(1)+'"/><br/>'+map_char.substring(1);
		default:
			return "";
	}
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
	clear = typeof clear !== "undefined" ? a : 0;	// Chrome compatibility.
	
	$(".game").html("");
	if (clear == 0)
		$(".game").html(function(){
			switch(game_status){
				case "heaven":
					return to_html(map_heaven[this.id]);
					break;
				case "hell":
					return to_html(map_hell[this.id]);
					break;
				case "earth":
					return to_html(map_earth[this.id]);
					break;
				default:
					return "";
					break;
			}
		});
}

