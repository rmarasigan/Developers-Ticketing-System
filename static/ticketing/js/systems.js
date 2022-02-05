var url = "/admin/api/d/system/read/?"
$.get(url, function (index, response) {
    var system = JSON.parse(index).result
    $.each(system, function (key, value) {
        $("#system-append").append(`
		<div class="col-lg-4 col-md-6 col-sm-12 col-12 mb-3 mb-3  system-card__card">
		<div class="card system__card">
			<div class="card-body system-card__header">
			  <h5 class="card-title system-card__title"> ` + value.SystemName + `</h5>
			  <p class="card-text system-card__description"> ` + value.Description + `</p>
			  <div class="d-grip gap-2 mx-auto">
				<a href="`+ value.SystemURL + `" class="btn system-card__link" target="_blank">System Link</a>
			  </div>
			</div>
		</div>
	</div>
		`)
    })
})
