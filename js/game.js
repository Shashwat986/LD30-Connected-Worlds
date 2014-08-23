function heaven()
{
	$(".game").removeClass("hell earth");
	$(".game").addClass("heaven");
	$("#nav-heaven").addClass("active");
	$("#nav-earth").removeClass("active");
	$("#nav-hell").removeClass("active");
}

function earth()
{
	$(".game").removeClass("hell heaven");
	$(".game").addClass("earth");
	$("#nav-heaven").removeClass("active");
	$("#nav-earth").addClass("active");
	$("#nav-hell").removeClass("active");
}

function hell()
{
	$(".game").removeClass("heaven earth");
	$(".game").addClass("hell");
	$("#nav-heaven").removeClass("active");
	$("#nav-earth").removeClass("active");
	$("#nav-hell").addClass("active");
}