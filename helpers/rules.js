// config to env 
edge.global("config",function(req =  false){
	return req ? process.env[req] : process.env ;
}) 
// csrftoken
edge.global("csrf",function() {
	return '<input type="hidden" name="_csrf" value="'+process.env.csrfToken+'">';
})
// Route
edge.global("route",function(req =  false) {
	return req ? Routes[req] : Routes ;
})
// method field
edge.global("method",function(method) {
	return `<input type="hidden" name="_method" value="${method}">`;
})
// pagination
edge.global("paginate",function(paginate,param={next:null,prev:null}) {
	paginate =  paginate.paginate
	let template = `
		<nav aria-label="Page navigation example">
		  <ul class="pagination justify-content-center">
		    <li class="page-item ${paginate.current <= 1  ?  "disabled" : "" }">
		      <a class="page-link" href="?${paginate.name}=${paginate.current >= 1 ? (parseInt(paginate.current) - 1) : paginate.current }" tabindex="-1">
				${param["prev"] ? param["prev"] : "Previous" }
		      </a>
		    </li>
	`;
	for (var i = 0; i < paginate.limit ; i++) {
		template += `
				<li class="page-item ${paginate.current == (i+1) ? "active" : ""}"><a class="page-link " href="?${paginate.name}=${i + 1}">${i + 1}</a></li>
		`
	}
	template += `
			<li class="page-item ${paginate.current >= paginate.limit ?  "disabled" : "" }" >
		      <a class="page-link "  href="?${paginate.name}=${paginate.current < paginate.limit ? (parseInt(paginate.current) + 1) : paginate.current }">
				${param["next"] ? param["next"] : "Next" }
		      </a>
		    </li>
		  </ul>
		</nav>
		`
	return template;
})


/**
** Put new helpers at this 
**/