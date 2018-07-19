var fireEbiForMyContactsWhenClick = {
		init: function() {
			$("#contact-Us").click(function(e) {
				fireEbiForMyContactsWhenClick.fireEBIEvent();
			});
		},

		initForNavigation: function() {
			$("#mobileContactUs").click(function(e) {
				fireEbiForMyContactsWhenClick.fireEBIEvent();
			});
		},
		
		fireEBIEvent: function() {
			$.ajax({
				type: "POST",
				url: "/myaccount/portfolio/FireEbiForMyContacts.action"
			});
		}
};