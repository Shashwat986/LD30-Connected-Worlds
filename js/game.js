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
	game_status = "earth";
	refresh();
}

function to_html(map_char)
{
	switch(map_char)
	{
		case("me"):
			return '<img src="images/f_earth.png" class="sprite" alt="You"/>';
			break;
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
function refresh(clear = 0)
{
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

