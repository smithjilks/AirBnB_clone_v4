$( document ).ready(function() {
    let amenities = {};
    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
	    amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
	console.log(amenities);
        if (Object.keys(amenities).length >= 0) {
            $("DIV.amenities H4").text(Object.values(amenities).join(', '));
        }
    });
});
