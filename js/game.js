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
	
	// Load resources
	map_earth["11"]="Hello";
	game_status = "earth";
	$(".game").each(function(){
		$(this).html(""+ map_earth[this.id]);
	});
	refresh();
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
					return map_heaven[this.id];
					break;
				case "hell":
					return map_hell[this.id];
					break;
				case "earth":
					return map_earth[this.id];
					break;
				default:
					return "";
					break;
			}
		});
}

