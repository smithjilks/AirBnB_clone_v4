$( document ).ready(function() {
    let amenities = {};
    $('input[type="checkbox"]').change(function() {
        if (this.checked) {
	    amenities[$(this).attr('data-id')] = $(this).attr('data-name');
        } else {
            delete amenities[$(this).attr('data-id')];
        }
        if (Object.keys(amenities).length >= 0) {
            $("DIV.amenities H4").text(Object.values(amenities).join(', '));
        }
    });


    $('button').click(function() {
        $('section.places article').remove();
        filterByAmenity(Object.keys(amenities));
    });

    filterByAmenity([]);

    function filterByAmenity(amenities) {
        $.ajax({
            type: 'POST',
            url: 'http://192.168.8.103:5001/api/v1/places_search/',
            data: JSON.stringify({"amenities": amenities}),
            dataType: 'json',
            contentType: 'application/json',
        })
        .done(function(places) {
            places.forEach(place => {
                $(`<article>
                    <div class='title_box'>
                        <h2>${place.name}</h2>
                        <div class='price_by_night'>$${place.price_by_night}</div>
                    </div>
                    <div class='information'>
                        <div class='max_guest'>${place.max_guest}</div>
                        <div class='number_rooms'>${place.number_rooms} </div>
                        <div class='number_bathrooms'>${place.number_bathrooms} </div>
                    </div>
                    <div class='description'>
                        ${place.description}
                    </div>
                </article>`).appendTo('section.places');
            });
        })
    }

});

$.get('http://0.0.0.0:5001/api/v1/status/', function(data)
{
    if (data.status == "OK"){
	$('#api_status').addClass('available');
    } else {
	$('#api_status').removeClass('available');
    }
});
