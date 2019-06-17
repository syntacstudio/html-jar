"use strict"
/**
** Creating pagination by array
** Pagination by url 
** @Parameter [array , count , paginatename , req = request ]
**/
const Paginate = async  function(data,count,name,req) {
	const page  = req.query[name] ? req.query[name] : 1;
	const result  = {};
		  result.data = [];
		  result.paginate = {};
	for (var i = 0; i < data.length; i++) {
		if (i >= ((page * count) - count) && i < (page*count)  ) {
			result.data.push(data[i]);
		}

		
	}
	result.paginate.name = name;
	result.paginate.current = page;
	result.paginate.limit = Math.ceil(data.length / count);
	result.paginate.size = data.length;
	return result;
}
module.exports = {
	Paginate
}  