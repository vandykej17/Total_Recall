<html lang="en"><head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1">

	<title>Inquiry</title>

	<link rel="stylesheet" href="resources/css/nw-authorization-center.min.css">
	<link rel="stylesheet" href="resources/css/bootstrap-3.1/bootstrap.css"/>
	<link rel="stylesheet" href="resources/css/themes/ui-framework-theme.css"/>
	<link rel="stylesheet" href="resources/css/application.css"/>
	<link rel="stylesheet" href="resources/css/bootstrap-toggle.css"/>
	<link rel="stylesheet" href="resources/css/agentcenter-custom.css"/>
	<script type="text/javascript" src="resources/js/jquery-1.8.3.min.js"></script>

	<link rel="stylesheet" href="resources/css/workspace.css">
	<script type="text/javascript" src="resources/js/modernizr-2.7.1.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.custom.functions.js"></script>
	<script type="text/javascript" src="resources/js/forms.js"></script>
	<script type="text/javascript" src="resources/js/toggler.jquery.js"></script>
	<script type="text/javascript" src="resources/js/owl.carousel.js"></script>
	<script type="text/javascript" src="resources/js/coverages-picker.jquery.js"></script>
	<script type="text/javascript" src="resources/js/tabs.js"></script>
	<script type="text/javascript" src="resources/js/wait-cancel.js"></script>
	<script type="text/javascript" src="resources/js/edit-history.jquery.js"></script>
	<script type="text/javascript" src="resources/js/editCoverages.js"></script>
	<script type="text/javascript" src="resources/js/inline-help.js"></script>
	<script type="text/javascript" src="resources/js/persist.min.js"></script>
	<script type="text/javascript" src="resources/js/propertyCoveragesEBI.js"></script>
	<script type="text/javascript" src="resources/js/accordion.js"></script>
	<script type="text/javascript" src="resources/js/nwjs.global.js"></script>
	<script type="text/javascript" src="resources/js/jquery-ui.min.js"></script>
	<script type="text/javascript" src="resources/js/ip.js"></script>
	<script type="text/javascript" src="resources/js/nwjs.coverages.js"></script>
	<script type="text/javascript" src="resources/js/jquery-ui-1.11.4.custom.c2chat.min.js"></script>
	<script type="text/javascript" src="resources/js/moment.min.js"></script>
	<script type="text/javascript" src="resources/js/moment-timezone-with-data.min.js"></script>
	<script type="text/javascript" src="resources/js/jquery.ui.touch-punch.min.js"></script>
	<script type="text/javascript" src="resources/js/matchMedia.min.js"></script>
	<script type="text/javascript" src="resources/js/matchMedia.addListener.min.js"></script>
	<script type="text/javascript" src="resources/js/billingCommon.js"></script>
	<script type="text/javascript" src="resources/js/billsAndPayments.js"></script>
	<script type="text/javascript" src="resources/js/enquire-2.1.0.min.js"></script>
	<script type="text/javascript" src="resources/js/rvOverview.js"></script>
	<script type="text/javascript" src="resources/js/rvEBIEvents.js"></script>
	<script type="text/javascript" src="resources/js/boatOverview.js"></script>
	<script type="text/javascript" src="resources/js/boatEBIEvents.js"></script>
	<script type="text/javascript" src="resources/js/mcEBIEvents.js"></script>
</head>

<body style="padding-top: 127px;" class="">

<div class="navbar-fixed-top">
	<nav class="navbar navbar-default navbar-utility hidden-xs" role="navigation">
		<div class="container">
			<div class="row">
				<div class="col-xs-12">
					<div class="navbar-header">
						<div class="navbar-header-info">
							<a href="/WorkspaceAC/search/index" class="brand">Inquiry</a>

							<span class="context ">PAB040, 29900</span>

						</div>
					</div>

					<div class="collapse navbar-collapse bs-example-navbar-collapse-2">
						<ul class="nav navbar-nav navbar-right utilityLinks">

							<li class="utility-link"><a href="javascript:window.print();">Print</a></li>


							<li class="utility-link"><a href="#">Help</a>
							</li>


							<li class="utility-link"><a href="#">Close</a>
							</li>


						</ul>
					</div>
				</div>
			</div>
		</div>
	</nav>
	<nav class="navbar navbar-default navbar-main" role="navigation">
		<div class="container">
			<div class="row">
				<div class="col-xs-3 col-md-3 col-lg-2">
					<div class="navbar-header">
						<div class="navbar-header-info visible-xs">
							<a href="/WorkspaceAC/search/index" class="brand">Inquiry</a>
							<span class="context">PAB040, 29900</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</nav>
</div>

<div class="container page-container">
	<div class="row">
		<div class="col-xs-12 page-content">
			<div id="headerError" class="alert alert-error hidden"></div>
			<ul id="tabSection" class="nav nav-tabs hidden-xs">
				<li class="">
					<a href="#clientList" id="clientListTab" data-toggle="tab" aria-expanded="false">
						<span class="icon icon-caret-right hidden-sm hidden-md hidden-lg"></span>
						<span class="icon icon-caret-down hidden-sm hidden-md hidden-lg"></span>
						Client List
					</a>
				</li>
				<li class="">
					<a href="#client" id="clientTab" data-toggle="tab" aria-expanded="true">
						<span class="icon icon-caret-right hidden-sm hidden-md hidden-lg"></span>
						<span class="icon icon-caret-down hidden-sm hidden-md hidden-lg"></span>
						Client Information
					</a>
				</li>
				<li class="active">
					<a href="#recall" id="recallTab" data-toggle="tab" aria-expanded="true">
						<span class="icon icon-caret-right hidden-sm hidden-md hidden-lg"></span>
						<span class="icon icon-caret-down hidden-sm hidden-md hidden-lg"></span>
						Recall Information
					</a>
				</li>
			</ul><div class="panel-group visible-xs" id="tabSection-accordion"></div>
			<div class="tab-content hidden-xs">
				<div class="tab-pane fade" id="clientList">


					<h1 class="page-header">Client List</h1>
					<table class="table footable table-striped table-hover desktop footable-loaded">
						<thead>
						<tr>
							<th data-class="expand" data-sort-initial="ascending" id="clientSearchName" class="footable-visible footable-first-column footable-sortable footable-sorted">Name<span class="footable-sort-indicator"></span></th>
							<th data-type="numeric" id="clientSearchBirthdate" class="footable-visible footable-sortable">Birthdate<span class="footable-sort-indicator"></span></th>
							<th data-hide="phone, tablet" id="clientSearchAddress" class="footable-visible footable-sortable">Address<span class="footable-sort-indicator"></span></th>
							<th data-hide="phone, tablet" data-type="numeric" id="clientSearchPhoneNumber" class="footable-visible footable-sortable">Phone Number<span class="footable-sort-indicator"></span></th>
							<th data-hide="phone" data-type="numeric" id="clientSearchLastUpdate" class="footable-visible footable-last-column footable-sortable">Last Updated<span class="footable-sort-indicator"></span></th>
						</tr>
						</thead>
						<tbody>


						<tr class="footable-even">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=22344698">  ROYSTER AARON - PARTNER</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								2462 UNION AVE<br>

								DUNCOMBE, IA 50532-7542629
							</td>
							<td class="footable-visible">515-835-0950</td>
							<td data-value="1524456000000" class="footable-visible footable-last-column">04/23/2018</td>
						</tr><tr class="footable-odd">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=22344698">  ROYSTER ADAM - PARTNER</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								2462 UNION AVE<br>

								DUNCOMBE, IA 50532-7542629
							</td>
							<td class="footable-visible">515-835-0950</td>
							<td data-value="1524456000000" class="footable-visible footable-last-column">04/23/2018</td>
						</tr><tr class="footable-even">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=22344698">  ROYSTER ALLAN - PARTNER</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								2462 UNION AVE<br>

								DUNCOMBE, IA 50532-7542629
							</td>
							<td class="footable-visible">515-835-0950</td>
							<td data-value="1524456000000" class="footable-visible footable-last-column">04/23/2018</td>
						</tr><tr class="footable-odd">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=15153645">  ROYSTER CONSTRUCTION</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								825 NW BUCKEYE AVE<br>

								EARLHAM, IA 50072-1137257
							</td>
							<td class="footable-visible">515-758-2045</td>
							<td data-value="1351828800000" class="footable-visible footable-last-column">11/02/2012</td>
						</tr><tr class="footable-even">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=22344698">  ROYSTER DWIGHT - PARTNER</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								2462 UNION AVE<br>

								DUNCOMBE, IA 50532-7542629
							</td>
							<td class="footable-visible">515-835-0950</td>
							<td data-value="1524456000000" class="footable-visible footable-last-column">04/23/2018</td>
						</tr><tr class="footable-odd">
							<td class="expand footable-visible footable-first-column"><span class="footable-toggle"></span>
								<a href="javascript:void(0)" class="clientClickableRow" data-url="/WorkspaceAC/client/clientSearch?searchType=householdSearch&amp;household=22344698">  ROYSTER MARSHA - PARTNER</a>
							</td>
							<td data-value="-2208988800000" class="footable-visible">N/A</td>
							<td class="footable-visible">
								2462 UNION AVE<br>

								DUNCOMBE, IA 50532-7542629
							</td>
							<td class="footable-visible">515-835-0950</td>
							<td data-value="1524456000000" class="footable-visible footable-last-column">04/23/2018</td>
						</tr></tbody>
					</table>

				</div>
				<div class="tab-pane fade in active" id="recallInfo">


					<h1 class="page-header">Recall Information</h1>


					<div class="panel-group">
						<div class="panel panel-default">
							<div class="panel-heading collapsible">
								<h4 class="panel-title">
									<a data-toggle="collapse" href="#clientGlance">
										<span class="icon icon-caret-right"></span><span class="icon icon-caret-down"></span>
										Client At-A-Glance
									</a>
								</h4>
							</div>

							<div id="clientGlance" class="panel-collapse in">
								<div class="panel-body">
									<div class="row">
										<div class="col-sm-8">
											<div class="panel panel-minimal">
												<div class="panel-heading">
													Client Information
												</div>

												<div class="panel-body row-repeat">

													<div class="row">
														<div class="col-sm-6 col-md-4">
															Client Number:
														</div>

														<div class="col-sm-6 col-md-8">
															22344698
														</div>
													</div>

													<div class="row">
														<div class="col-sm-6 col-md-4">
															Last Updated:
														</div>

														<div class="col-sm-6 col-md-8">
															04/23/2018
														</div>
													</div>

													<div class="row">
														<div class="col-sm-6 col-md-4">
															Paperless Policy Preference:
														</div>

														<div class="col-sm-6 col-md-8">
															No
														</div>
													</div>

												</div>
											</div>
										</div>

										<div class="col-sm-4">
											<div class="panel panel-minimal">
												<div class="panel-heading">
													Address Information
												</div>

												<div class="panel-body">
													<div class="row">
														<div class="col-xs-12">


															2462 UNION AVE<br>





															DUNCOMBE, IA 50532-7542629

															<br>515-835-0950<br>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>

					<div id="recallSection" class="hidden">

						<div class="row">
							<div class="col-xs-12">
								<div class="panel panel-default">
									<div class="panel-heading">
										<h3 class="panel-title">Recall Information</h3>
									</div>

									<div class="panel-body">
										<table class="table table-striped" id="recallTable">
											<thead>
											<tr>
												<th>Year/Make/Model</th>
												<th>Vin</th>
												<th>Recall Message</th>
												<th>Acknowledge</th>
											</tr>
											</thead>
											<tbody>
											</tbody>
										</table>
										<a href="https://www.chevrolet.com/dealer-locator#?searchTerm=55408&searchType=postalCode" target="_blank">Find your nearest service center</a>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>

<script>
	var policyNumber = 'PPNM0064806423';
	var numRecalls = 0;
	var acknowledgedRecalls = 1;
	$.ajax({
		url: 'getRecalls/' + policyNumber,
		type: 'GET',
		dataType: 'json',
		success: function (data) {
			$.each(data, function (index, value) {
				var theDatas = data[index];
				console.log(theDatas);
				$('#recallTable > tbody:last-child').append('<tr id="recallRow' +theDatas['userVehicleRecallId']+ '"><td>' + theDatas['year'] + ' ' + theDatas['make'] + ' ' + theDatas['model'] +
						'</td><td>'+theDatas['vin'] + '</td><td>' + theDatas['reason'] + '</td><td>' + '<button id="' + theDatas['userVehicleRecallId'] +
						'" type="submit" onclick="acknowledgeRecall(' + theDatas['userVehicleRecallId'] + ')" class="btn-primary btn-lg">Acknowledge</button>' +
						'</td></tr>');
				numRecalls++;
			});

			if (numRecalls) {
				$('#recallSection').removeClass('hidden');
			}

		}
	});

	function acknowledgeRecall(vehicleRecallId) {
		$.ajax({
			url: 'updateUserVehicleRecallById/' + vehicleRecallId + '/2',
			type: 'GET',
			dataType: 'json',
			success: function (data) {
				$('#recallRow' + vehicleRecallId).remove();
				acknowledgedRecalls++;
			}
		});
		console.log([acknowledgedRecalls, numRecalls]);
		if (acknowledgedRecalls === numRecalls) {
			$('#recallSection').addClass('hidden');
		}
	}
</script>
</html>
