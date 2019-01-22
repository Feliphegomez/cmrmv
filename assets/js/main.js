function formatMoneyGlobal(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
    d = d == undefined ? "." : d,
    t = t == undefined ? "," : t,
    s = n < 0 ? "-" : "",
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
    j = (j = i.length) > 3 ? j % 3 : 0;

  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};
/* ---------------------------------------------------------------------------------- */
var apiMV = axios.create({
	baseURL: '/api/api.php/records',
});

var LogIn = Vue.extend({
	template: '#page-LogIn',
	data: function () {
		return {
			
		};
	},
	created: function () {
		var self = this;
	},
	computed: {
	}
});

var Home = Vue.extend({
	template: '#page-Home',
	data: function () {
		return {
			
		};
	},
	created: function () {
		var self = this;
	},
	computed: {
		/*
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.content.indexOf(this.searchKey) !== -1;
			},this);
		}*/
	}
});

var Settings = Vue.extend({
	template: '#page-Settings',
	data: function () {
		return {
		};
	},
	created: function () {
		var self = this;
	},
});

var Profile = Vue.extend({
	template: '#page-Profile',
	data: function () {
		return {
			userData: this.$parent.sessionData,
		};
	},
	created: function () {
		var self = this;
	},
});

var Help = Vue.extend({
	template: '#page-Help',
	data: function () {
		return {
		};
	},
	created: function () {
		var self = this;
	},
});

// ------------ ARL INICIO ------------------------------------- 
var ARL_List = Vue.extend({
  template: '#page-ARL',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/arl').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var ARL_View = Vue.extend({
	template: '#view-ARL',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findArl();
	},
	methods: {
		findArl: function(){
			var self = this;
			var idArl = self.$route.params.arl_id;
			
			console.log(idArl);
			
			apiMV.get('/arl/' + idArl).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/ARL');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/ARL');
			});
		}
	}
});

var ARL_Add = Vue.extend({
	template: '#add-ARL',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		}
	},
	methods: {
		createARL: function() {
			var post = this.post;
			apiMV.post('/arl', post).then(function (response) {
				post.id = response.data;
				router.push('/ARL');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var ARL_Edit = Vue.extend({
	template: '#edit-ARL',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findArl();
	},
	methods: {
		updateARL: function () {
			var post = this.post;
			apiMV.put('/arl/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/ARL');
		},
		findArl: function(){
			var self = this;
			var idArl = self.$route.params.arl_id;
			
			console.log(idArl);
			
			apiMV.get('/arl/' + idArl).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/ARL');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/ARL');
			});
		}
	}
});

var ARL_Delete = Vue.extend({
	template: '#delete-ARL',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findArl();
	},
	methods: {
		deleteARL: function () {
			var post = this.post;
			
			apiMV.delete('/arl/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/ARL');
			location.reload();
		},
		findArl: function(){
			var self = this;
			var idArl = self.$route.params.arl_id;
			
			apiMV.get('/arl/' + idArl).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/ARL');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/ARL');
			});
		}
	}
});
// ------------ ARL FIN ------------------------------------- 

// ------------ CATEGORIAS DE VEHICULOS INICIO ------------------------------------- 
var VH_Cats_List = Vue.extend({
  template: '#page-VH-Cats',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/categorys_vehicles').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var VH_Cats_View = Vue.extend({
	template: '#view-VH-Cats',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findCatsVH();
	},
	methods: {
		findCatsVH: function(){
			var self = this;
			var idCatsVH = self.$route.params.cat_vh_id;
			
			apiMV.get('/categorys_vehicles/' + idCatsVH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Vehicles/Categories');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles/Categories');
			});
		}
	}
});

var VH_Cats_Add = Vue.extend({
	template: '#add-VH-Cats',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createCatVH: function() {
			var post = this.post;
			apiMV.post('/categorys_vehicles', post).then(function (response) {
				post.id = response.data;
				router.push('/Vehicles/Categories');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var VH_Cats_Edit = Vue.extend({
	template: '#edit-VH-Cats',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findCatsVH();
	},
	methods: {
		updateCatVH: function () {
			var post = this.post;
			apiMV.put('/categorys_vehicles/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Vehicles/Categories');
		},
		findCatsVH: function(){
			var self = this;
			var idCatsVH = self.$route.params.cat_vh_id;
			
			apiMV.get('/categorys_vehicles/' + idCatsVH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Vehicles/Categories');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles/Categories');
			});
		}
	}
});

var VH_Cats_Delete = Vue.extend({
	template: '#delete-VH-Cats',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findCatsVH();
	},
	methods: {
		deleteCatVH: function () {
			var post = this.post;
			
			apiMV.delete('/categorys_vehicles/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Vehicles/Categories');
			location.reload();
		},
		findCatsVH: function(){
			var self = this;
			var idCatsVH = self.$route.params.cat_vh_id;
			
			apiMV.get('/categorys_vehicles/' + idCatsVH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Vehicles/Categories');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles/Categories');
			});
		}
	}
});
// ------------ CATEGORIAS DE VEHICULOS FIN ------------------------------------- 

// ------------ EPS INICIO ------------------------------------- 
var EPS_List = Vue.extend({
  template: '#page-EPS',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/eps').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var EPS_View = Vue.extend({
	template: '#view-EPS',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findEps();
	},
	methods: {
		findEps: function(){
			var self = this;
			var idEps = self.$route.params.eps_id;
			
			apiMV.get('/eps/' + idEps).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/EPS');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/EPS');
			});
		}
	}
});

var EPS_Add = Vue.extend({
	template: '#add-EPS',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		}
	},
	methods: {
		createEPS: function() {
			var post = this.post;
			apiMV.post('/eps', post).then(function (response) {
				post.id = response.data;
				router.push('/EPS');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var EPS_Edit = Vue.extend({
	template: '#edit-EPS',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findEps();
	},
	methods: {
		updateEPS: function () {
			var post = this.post;
			apiMV.put('/eps/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/EPS');
		},
		findEps: function(){
			var self = this;
			var idEps = self.$route.params.eps_id;
			
			apiMV.get('/eps/' + idEps).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/EPS');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/EPS');
			});
		}
	}
});

var EPS_Delete = Vue.extend({
	template: '#delete-EPS',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findEps();
	},
	methods: {
		deleteEPS: function () {
			var post = this.post;
			
			apiMV.delete('/eps/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/EPS');
			location.reload();
		},
		findEps: function(){
			var self = this;
			var idEps = self.$route.params.eps_id;
			
			apiMV.get('/eps/' + idEps).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/EPS');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/EPS');
			});
		}
	}
});
// ------------ EPS FIN ------------------------------------- 

// ------------ CAJAS DE COMPENSACION INICIO ------------------------------------- 
var FundsCompensation_List = Vue.extend({
	template: '#page-FundsCompensation',
	data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
	mounted: function () {
		var self = this;
		apiMV.get('/funds_compensations').then(function (response) {
			self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error.response);
		});
	},
	computed: {
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
			},this);
		}
	}
});

var FundsCompensation_View = Vue.extend({
	template: '#view-FundsCompensation',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findFundCompensation();
	},
	methods: {
		findFundCompensation: function(){
			var self = this;
			var idFundCompensation = self.$route.params.fund_compensation_id;
			
			apiMV.get('/funds_compensations/' + idFundCompensation).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Compensations');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Compensations');
			});
		}
	}
});

var FundsCompensation_Add = Vue.extend({
	template: '#add-FundsCompensation',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		}
	},
	methods: {
		createFundCompensation: function() {
			var post = this.post;
			apiMV.post('/funds_compensations', post).then(function (response) {
				post.id = response.data;
				router.push('/Funds/Compensations');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var FundsCompensation_Edit = Vue.extend({
	template: '#edit-FundsCompensation',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundCompensation();
	},
	methods: {
		updateFundCompensation: function () {
			var post = this.post;
			apiMV.put('/funds_compensations/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Compensations');
		},
		findFundCompensation: function(){
			var self = this;
			var idFundCompensation = self.$route.params.fund_compensation_id;
			
			apiMV.get('/funds_compensations/' + idFundCompensation).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Compensations');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Compensations');
			});
		}
	}
});

var FundsCompensation_Delete = Vue.extend({
	template: '#delete-FundsCompensation',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundCompensation();
	},
	methods: {
		deleteFundCompensation: function () {
			var post = this.post;
			
			apiMV.delete('/funds_compensations/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Compensations');
			location.reload();
		},
		findFundCompensation: function(){
			var self = this;
			var idFundCompensation = self.$route.params.fund_compensation_id;
			
			apiMV.get('/funds_compensations/' + idFundCompensation).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Compensations');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Compensations');
			});
		}
	}
});
// ------------ CAJAS DE COMPENSACION FIN ------------------------------------- 

// ------------ CAJAS DE PENSION INICIO ------------------------------------- 
var FundsPension_List = Vue.extend({
	template: '#page-FundsPension',
	data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
	mounted: function () {
		var self = this;
		apiMV.get('/funds_pensions').then(function (response) {
			self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error.response);
		});
	},
	computed: {
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
			},this);
		}
	}
});

var FundsPension_View = Vue.extend({
	template: '#view-FundsPension',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findFundPension();
	},
	methods: {
		findFundPension: function(){
			var self = this;
			var idFundPension = self.$route.params.fund_pension_id;
			
			apiMV.get('/funds_pensions/' + idFundPension).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Pension');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Pension');
			});
		}
	}
});

var FundsPension_Add = Vue.extend({
	template: '#add-FundsPension',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		}
	},
	methods: {
		createFundPension: function() {
			var post = this.post;
			apiMV.post('/funds_pensions', post).then(function (response) {
				post.id = response.data;
				router.push('/Funds/Pension');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var FundsPension_Edit = Vue.extend({
	template: '#edit-FundsPension',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundPension();
	},
	methods: {
		updateFundPension: function () {
			var post = this.post;
			apiMV.put('/funds_pensions/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Pension');
		},
		findFundPension: function(){
			var self = this;
			var idFundPension = self.$route.params.fund_pension_id;
			
			apiMV.get('/funds_pensions/' + idFundPension).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Pension');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Pension');
			});
		}
	}
});

var FundsPension_Delete = Vue.extend({
	template: '#delete-FundsPension',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundPension();
	},
	methods: {
		deleteFundPension: function () {
			var post = this.post;
			
			apiMV.delete('/funds_pensions/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Pension');
			location.reload();
		},
		findFundPension: function(){
			var self = this;
			var idFundPension = self.$route.params.fund_pension_id;
			
			apiMV.get('/funds_pensions/' + idFundPension).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Pension');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Pension');
			});
		}
	}
});
// ------------ CAJAS DE PENSION FIN ------------------------------------- 

// ------------ CAJAS DE CESANTIAS INICIO ------------------------------------- 
var FundsSeverances_List = Vue.extend({
	template: '#page-FundSeverances',
	data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
	mounted: function () {
		var self = this;
		apiMV.get('/funds_severances').then(function (response) {
			self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error.response);
		});
	},
	computed: {
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
			},this);
		}
	}
});

var FundsSeverances_View = Vue.extend({
	template: '#view-FundSeverances',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findFundSeverances();
	},
	methods: {
		findFundSeverances: function(){
			var self = this;
			var idFundSeverances = self.$route.params.fund_severances_id;
			
			apiMV.get('/funds_severances/' + idFundSeverances).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Severances');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Severances');
			});
		}
	}
});

var FundsSeverances_Add = Vue.extend({
	template: '#add-FundSeverances',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		}
	},
	methods: {
		createFundSeverance: function() {
			var post = this.post;
			apiMV.post('/funds_severances', post).then(function (response) {
				post.id = response.data;
				router.push('/Funds/Severances');
			}).catch(function (error) {
				console.log(error.response);
			});
			
		}
	}
});

var FundsSeverances_Edit = Vue.extend({
	template: '#edit-FundSeverances',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundSeverances();
	},
	methods: {
		updateFundSeverance: function () {
			var post = this.post;
			apiMV.put('/funds_severances/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Severances');
		},
		findFundSeverances: function(){
			var self = this;
			var idFundSeverances = self.$route.params.fund_severances_id;
			
			apiMV.get('/funds_severances/' + idFundSeverances).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Severances');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Severances');
			});
		}
	}
});

var FundsSeverances_Delete = Vue.extend({
	template: '#delete-FundSeverances',
	data: function () {
		return {
			post: {
				id: 0,
				code: '',
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findFundSeverances();
	},
	methods: {
		deleteFundSeverance: function () {
			var post = this.post;
			
			apiMV.delete('/funds_severances/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Funds/Severances');
			location.reload();
		},
		findFundSeverances: function(){
			var self = this;
			var idFundSeverances = self.$route.params.fund_severances_id;
			
			apiMV.get('/funds_severances/' + idFundSeverances).then(function (response) {
				if(!response.data.id || !response.data.code || !response.data.name)
				{
					router.push('/Funds/Severances');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Funds/Severances');
			});
		}
	}
});
// ------------ CAJAS DE CESANTIAS FIN ------------------------------------- 

// ------------ GEO - DEPARTAMENTOS INICIO ------------------------------------- 
var GEO_Departments_List = Vue.extend({
  template: '#page-GEO-Departments',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/geo_departments').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var GEO_Departments_View = Vue.extend({
	template: '#view-GEO-Departments',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findDepartmentGEO();
	},
	methods: {
		findDepartmentGEO: function(){
			var self = this;
			var idDepartmentGEO = self.$route.params.geo_department_id;
			
			apiMV.get('/geo_departments/' + idDepartmentGEO).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Departments');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Departments');
			});
		}
	}
});

var GEO_Departments_Add = Vue.extend({
	template: '#add-GEO-Departments',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createDepartmentGEO: function() {
			var post = this.post;
			apiMV.post('/geo_departments', post).then(function (response) {
				post.id = response.data;
				router.push('/GEO/Departments');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var GEO_Departments_Edit = Vue.extend({
	template: '#edit-GEO-Departments',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findDepartmentGEO();
	},
	methods: {
		updateDepartmentGEO: function () {
			var post = this.post;
			apiMV.put('/geo_departments/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/GEO/Departments');
		},
		findDepartmentGEO: function(){
			var self = this;
			var idDepartmentGEO = self.$route.params.geo_department_id;
			
			apiMV.get('/geo_departments/' + idDepartmentGEO).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Departments');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Departments');
			});
		}
	}
});

var GEO_Departments_Delete = Vue.extend({
	template: '#delete-GEO-Departments',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findDepartmentGEO();
	},
	methods: {
		deleteDepartmentGEO: function () {
			var post = this.post;
			
			apiMV.delete('/geo_departments/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/GEO/Departments');
			location.reload();
		},
		findDepartmentGEO: function(){
			var self = this;
			var idDepartmentGEO = self.$route.params.geo_department_id;
			
			apiMV.get('/geo_departments/' + idDepartmentGEO).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Departments');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Departments');
			});
		}
	}
});
// ------------ GEO - DEPARTAMENTOS FIN ------------------------------------- 

// ------------ GEO - CIUDADES INICIO ------------------------------------- 
var GEO_Citys_List = Vue.extend({
  template: '#page-GEO-Citys',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/geo_citys?order=department,asc&order=name,asc', {
		params: {
			join: 'geo_departments',
		}
	}).then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var GEO_Citys_View = Vue.extend({
	template: '#view-GEO-Citys',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				department: 0,
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findDepartmentGEO();
	},
	methods: {
		findDepartmentGEO: function(){
			var self = this;
			var idCityGEO = self.$route.params.geo_city_id;
			
			apiMV.get('/geo_citys/' + idCityGEO, {
				params: {
					join: 'geo_departments'
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Citys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Citys');
			});
		}
	}
});

var GEO_Citys_Add = Vue.extend({
	template: '#add-GEO-Citys',
	data: function () {
		return {
			selectOptions: {
				departments: [],
			},
			post: {
				department: 0,
				name: '',
			}
		}
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/geo_departments', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.departments = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createDepartmentGEO: function() {
			var post = this.post;
			apiMV.post('/geo_citys', post).then(function (response) {
				post.id = response.data;
				router.push('/GEO/Citys');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var GEO_Citys_Edit = Vue.extend({
	template: '#edit-GEO-Citys',
	data: function () {
		return {
			selectOptions: {
				departments: [],
			},
			post: {
				id: 0,
				department: 0,
				name: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findCityGEO();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/geo_departments', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.departments = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateCityGEO: function () {
			var post = this.post;
			apiMV.put('/geo_citys/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/GEO/Citys');
		},
		findCityGEO: function(){
			var self = this;
			var idCityGEO = self.$route.params.geo_city_id;
			
			apiMV.get('/geo_citys/' + idCityGEO).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Citys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Citys');
			});
		}
	}
});

var GEO_Citys_Delete = Vue.extend({
	template: '#delete-GEO-Citys',
	data: function () {
		return {
			post: {
				id: 0,
				department: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findCityGEO();
	},
	methods: {
		deleteCityGEO: function () {
			var post = this.post;
			
			apiMV.delete('/geo_citys/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/GEO/Citys');
			location.reload();
		},
		findCityGEO: function(){
			var self = this;
			var idCityGEO = self.$route.params.geo_city_id;
			
			apiMV.get('/geo_citys/' + idCityGEO).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/GEO/Citys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/GEO/Citys');
			});
		}
	}
});
// ------------ GEO - CIUDADES FIN ------------------------------------- 

// ------------ ESTADOS -  EMPLEADOS INICIO ------------------------------------- 
var Status_Employees_List = Vue.extend({
  template: '#page-StatusEmployees',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/status_employees').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Status_Employees_View = Vue.extend({
	template: '#view-StatusEmployees',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusEmployee();
	},
	methods: {
		findStatusEmployee: function(){
			var self = this;
			var idStatusEmployee = self.$route.params.status_employee_id;
			
			apiMV.get('/status_employees/' + idStatusEmployee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Employees');
			});
		}
	}
});

var Status_Employees_Add = Vue.extend({
	template: '#add-StatusEmployees',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createStatusEmployee: function() {
			var post = this.post;
			apiMV.post('/status_employees', post).then(function (response) {
				post.id = response.data;
				router.push('/Status/Employees');
			}).catch(function (error) {
				console.log(error.response);
			});			
		}
	}
});

var Status_Employees_Edit = Vue.extend({
	template: '#edit-StatusEmployees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusEmployee();
	},
	methods: {
		updateStatusEmployee: function () {
			var post = this.post;
			apiMV.put('/status_employees/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Employees');
		},
		findStatusEmployee: function(){
			var self = this;
			var idStatusEmployee = self.$route.params.status_employee_id;
			
			apiMV.get('/status_employees/' + idStatusEmployee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Employees');
			});
		}
	}
});

var Status_Employees_Delete = Vue.extend({
	template: '#delete-StatusEmployees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusEmployee();
	},
	methods: {
		deleteStatusEmployee: function () {
			var post = this.post;
			
			apiMV.delete('/status_employees/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Employees');
			location.reload();
		},
		findStatusEmployee: function(){
			var self = this;
			var idStatusEmployee = self.$route.params.status_employee_id;
			
			apiMV.get('/status_employees/' + idStatusEmployee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Employees');
			});
		}
	}
});
// ------------ ESTADOS -  EMPLEADOS FIN ------------------------------------- 

// ------------ ESTADOS -  SERVICIOS INICIO ------------------------------------- 
var Status_Services_List = Vue.extend({
  template: '#page-StatusServices',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/status_services').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Status_Services_View = Vue.extend({
	template: '#view-StatusServices',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusService();
	},
	methods: {
		findStatusService: function(){
			var self = this;
			var idStatusService = self.$route.params.status_service_id;
			
			apiMV.get('/status_services/' + idStatusService).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Services');
			});
		}
	}
});

var Status_Services_Add = Vue.extend({
	template: '#add-StatusServices',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createStatusService: function() {
			var post = this.post;
			apiMV.post('/status_services', post).then(function (response) {
				post.id = response.data;
				router.push('/Status/Services');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Status_Services_Edit = Vue.extend({
	template: '#edit-StatusServices',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusService();
	},
	methods: {
		updateStatusService: function () {
			var post = this.post;
			apiMV.put('/status_services/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Services');
		},
		findStatusService: function(){
			var self = this;
			var idStatusService = self.$route.params.status_service_id;
			
			apiMV.get('/status_services/' + idStatusService).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Services');
			});
		}
	}
});

var Status_Services_Delete = Vue.extend({
	template: '#delete-StatusServices',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusService();
	},
	methods: {
		deleteStatusService: function () {
			var post = this.post;
			
			apiMV.delete('/status_services/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Services');
			location.reload();
		},
		findStatusService: function(){
			var self = this;
			var idStatusService = self.$route.params.status_service_id;
			
			apiMV.get('/status_services/' + idStatusService).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Services');
			});
		}
	}
});
// ------------ ESTADOS -  SERVICIOS FIN ------------------------------------- 

// ------------ ESTADOS -  SERVICIOS INICIO ------------------------------------- 
var Status_Vehicles_List = Vue.extend({
  template: '#page-StatusVehicles',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/status_vehicles').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Status_Vehicles_View = Vue.extend({
	template: '#view-StatusVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusVehicle();
	},
	methods: {
		findStatusVehicle: function(){
			var self = this;
			var idStatusVehicle = self.$route.params.status_vehicle_id;
			
			apiMV.get('/status_vehicles/' + idStatusVehicle).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Vehicles');
			});
		}
	}
});

var Status_Vehicles_Add = Vue.extend({
	template: '#add-StatusVehicles',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createStatusVehicle: function() {
			var post = this.post;
			apiMV.post('/status_vehicles', post).then(function (response) {
				post.id = response.data;
				router.push('/Status/Vehicles');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Status_Vehicles_Edit = Vue.extend({
	template: '#edit-StatusVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusVehicle();
	},
	methods: {
		updateStatusVehicle: function () {
			var post = this.post;
			apiMV.put('/status_vehicles/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Vehicles');
		},
		findStatusVehicle: function(){
			var self = this;
			var idStatusVehicle = self.$route.params.status_vehicle_id;
			
			apiMV.get('/status_vehicles/' + idStatusVehicle).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Vehicles');
			});
		}
	}
});

var Status_Vehicles_Delete = Vue.extend({
	template: '#delete-StatusVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findStatusVehicle();
	},
	methods: {
		deleteStatusVehicle: function () {
			var post = this.post;
			
			apiMV.delete('/status_vehicles/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Status/Vehicles');
			location.reload();
		},
		findStatusVehicle: function(){
			var self = this;
			var idStatusVehicle = self.$route.params.status_vehicle_id;
			
			apiMV.get('/status_vehicles/' + idStatusVehicle).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Status/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Status/Vehicles');
			});
		}
	}
});
// ------------ ESTADOS -  SERVICIOS FIN ------------------------------------- 

// ------------ TIPOS - SANGRE INICIO ------------------------------------- 
var Types_Bloods_List = Vue.extend({
  template: '#page-TypesBloods',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_bloods').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Bloods_View = Vue.extend({
	template: '#view-TypesBloods',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBlood();
	},
	methods: {
		findTypesBlood: function(){
			var self = this;
			var idTypesBlood = self.$route.params.type_blood_id;
			
			apiMV.get('/types_bloods/' + idTypesBlood).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Bloods');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Bloods');
			});
		}
	}
});

var Types_Bloods_Add = Vue.extend({
	template: '#add-TypesBloods',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesBlood: function() {
			var post = this.post;
			apiMV.post('/types_bloods', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/Bloods');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_Bloods_Edit = Vue.extend({
	template: '#edit-TypesBloods',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBlood();
	},
	methods: {
		updateTypesBlood: function () {
			var post = this.post;
			apiMV.put('/types_bloods/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Bloods');
		},
		findTypesBlood: function(){
			var self = this;
			var idTypesBlood = self.$route.params.type_blood_id;
			
			apiMV.get('/types_bloods/' + idTypesBlood).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Bloods');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Bloods');
			});
		}
	}
});

var Types_Bloods_Delete = Vue.extend({
	template: '#delete-TypesBloods',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBlood();
	},
	methods: {
		deleteTypesBlood: function () {
			var post = this.post;
			
			apiMV.delete('/types_bloods/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Bloods');
			location.reload();
		},
		findTypesBlood: function(){
			var self = this;
			var idTypesBlood = self.$route.params.type_blood_id;
			
			apiMV.get('/types_bloods/' + idTypesBlood).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Bloods');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Bloods');
			});
		}
	}
});
// ------------ TIPOS - SANGRE FIN ------------------------------------- 

// ------------ TIPOS - SANGRE INICIO ------------------------------------- 
var Types_BloodsRH_List = Vue.extend({
  template: '#page-TypesBloodsRH',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_bloods_rhs').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_BloodsRH_View = Vue.extend({
	template: '#view-TypesBloodsRH',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBloodRH();
	},
	methods: {
		findTypesBloodRH: function(){
			var self = this;
			var idTypesBloodRH = self.$route.params.type_blood_rh_id;
			
			apiMV.get('/types_bloods_rhs/' + idTypesBloodRH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/BloodsRH');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/BloodsRH');
			});
		}
	}
});

var Types_BloodsRH_Add = Vue.extend({
	template: '#add-TypesBloodsRH',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesBloodRH: function() {
			var post = this.post;
			apiMV.post('/types_bloods_rhs', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/BloodsRH');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_BloodsRH_Edit = Vue.extend({
	template: '#edit-TypesBloodsRH',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBloodRH();
	},
	methods: {
		updateTypesBloodRH: function () {
			var post = this.post;
			apiMV.put('/types_bloods_rhs/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/BloodsRH');
		},
		findTypesBloodRH: function(){
			var self = this;
			var idTypesBloodRH = self.$route.params.type_blood_rh_id;
			
			apiMV.get('/types_bloods_rhs/' + idTypesBloodRH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/BloodsRH');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/BloodsRH');
			});
		}
	}
});

var Types_BloodsRH_Delete = Vue.extend({
	template: '#delete-TypesBloodsRH',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesBloodRH();
	},
	methods: {
		deleteTypesBloodRH: function () {
			var post = this.post;
			
			apiMV.delete('/types_bloods_rhs/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/BloodsRH');
			location.reload();
		},
		findTypesBloodRH: function(){
			var self = this;
			var idTypesBloodRH = self.$route.params.type_blood_rh_id;
			
			apiMV.get('/types_bloods_rhs/' + idTypesBloodRH).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/BloodsRH');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/BloodsRH');
			});
		}
	}
});
// ------------ TIPOS - SANGRE FIN ------------------------------------- 

// ------------ TIPOS - CLIENTES INICIO ------------------------------------- 
var Types_Clients_List = Vue.extend({
  template: '#page-TypesClients',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_clients').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Clients_View = Vue.extend({
	template: '#view-TypesClients',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesClient();
	},
	methods: {
		findTypesClient: function(){
			var self = this;
			var idTypesClient = self.$route.params.type_client_id;
			
			apiMV.get('/types_clients/' + idTypesClient).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Clients');
			});
		}
	}
});

var Types_Clients_Add = Vue.extend({
	template: '#add-TypesClients',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesClient: function() {
			var post = this.post;
			apiMV.post('/types_clients', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/Clients');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_Clients_Edit = Vue.extend({
	template: '#edit-TypesClients',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesClient();
	},
	methods: {
		updateTypesClient: function () {
			var post = this.post;
			apiMV.put('/types_clients/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Clients');
		},
		findTypesClient: function(){
			var self = this;
			var idTypesClient = self.$route.params.type_client_id;
			
			apiMV.get('/types_clients/' + idTypesClient).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Clients');
			});
		}
	}
});

var Types_Clients_Delete = Vue.extend({
	template: '#delete-TypesClients',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesClient();
	},
	methods: {
		deleteTypesClient: function () {
			var post = this.post;
			
			apiMV.delete('/types_clients/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Clients');
			location.reload();
		},
		findTypesClient: function(){
			var self = this;
			var idTypesClient = self.$route.params.type_client_id;
			
			apiMV.get('/types_clients/' + idTypesClient).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Clients');
			});
		}
	}
});
// ------------ TIPOS - CLIENTES FIN ------------------------------------- 

// ------------ TIPOS - CONTACTOS INICIO ------------------------------------- 
var Types_Contacts_List = Vue.extend({
  template: '#page-TypesContacts',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_contacts').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Contacts_View = Vue.extend({
	template: '#view-TypesContacts',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesContact();
	},
	methods: {
		findTypesContact: function(){
			var self = this;
			var idTypesContact = self.$route.params.type_contact_id;
			
			apiMV.get('/types_contacts/' + idTypesContact).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Contacts');
			});
		}
	}
});

var Types_Contacts_Add = Vue.extend({
	template: '#add-TypesContacts',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesContact: function() {
			var post = this.post;
			apiMV.post('/types_contacts', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/Contacts');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_Contacts_Edit = Vue.extend({
	template: '#edit-TypesContacts',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesContact();
	},
	methods: {
		updateTypesContact: function () {
			var post = this.post;
			apiMV.put('/types_contacts/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Contacts');
		},
		findTypesContact: function(){
			var self = this;
			var idTypesContact = self.$route.params.type_contact_id;
			
			apiMV.get('/types_contacts/' + idTypesContact).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Contacts');
			});
		}
	}
});

var Types_Contacts_Delete = Vue.extend({
	template: '#delete-TypesContacts',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesContact();
	},
	methods: {
		deleteTypesContact: function () {
			var post = this.post;
			
			apiMV.delete('/types_contacts/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Contacts');
			location.reload();
		},
		findTypesContact: function(){
			var self = this;
			var idTypesContact = self.$route.params.type_contact_id;
			
			apiMV.get('/types_contacts/' + idTypesContact).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Contacts');
			});
		}
	}
});
// ------------ TIPOS - CONTACTOS FIN ------------------------------------- 

// ------------ TIPOS - COMBUSTIBLES INICIO ------------------------------------- 
var Types_Fuels_List = Vue.extend({
  template: '#page-TypesFuels',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_fuels').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Fuels_View = Vue.extend({
	template: '#view-TypesFuels',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesFuel();
	},
	methods: {
		findTypesFuel: function(){
			var self = this;
			var idTypesFuel = self.$route.params.type_fuel_id;
			
			apiMV.get('/types_fuels/' + idTypesFuel).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Fuels');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Fuels');
			});
		}
	}
});

var Types_Fuels_Add = Vue.extend({
	template: '#add-TypesFuels',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesFuel: function() {
			var post = this.post;
			apiMV.post('/types_fuels', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/Fuels');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_Fuels_Edit = Vue.extend({
	template: '#edit-TypesFuels',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesFuel();
	},
	methods: {
		updateTypesFuel: function () {
			var post = this.post;
			apiMV.put('/types_fuels/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Fuels');
		},
		findTypesFuel: function(){
			var self = this;
			var idTypesFuel = self.$route.params.type_fuel_id;
			
			apiMV.get('/types_fuels/' + idTypesFuel).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Fuels');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Fuels');
			});
		}
	}
});

var Types_Fuels_Delete = Vue.extend({
	template: '#delete-TypesFuels',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesFuel();
	},
	methods: {
		deleteTypesFuel: function () {
			var post = this.post;
			
			apiMV.delete('/types_fuels/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Fuels');
			location.reload();
		},
		findTypesFuel: function(){
			var self = this;
			var idTypesFuel = self.$route.params.type_fuel_id;
			
			apiMV.get('/types_fuels/' + idTypesFuel).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Fuels');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Fuels');
			});
		}
	}
});
// ------------ TIPOS - COMBUSTIBLES FIN ------------------------------------- 

// ------------ TIPOS - IDENTIFICACIONES INICIO ------------------------------------- 
var Types_Identifications_List = Vue.extend({
  template: '#page-TypesIdentifications',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_identifications').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Identifications_View = Vue.extend({
	template: '#view-TypesIdentifications',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesIdentification();
	},
	methods: {
		findTypesIdentification: function(){
			var self = this;
			var idTypesIdentification = self.$route.params.type_identification_id;
			
			apiMV.get('/types_identifications/' + idTypesIdentification).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Identifications');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Identifications');
			});
		}
	}
});

var Types_Identifications_Add = Vue.extend({
	template: '#add-TypesIdentifications',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesIdentification: function() {
			var post = this.post;
			apiMV.post('/types_identifications', post).then(function (response) {
				post.id = response.data;
				router.push('/Types/Identifications');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Types_Identifications_Edit = Vue.extend({
	template: '#edit-TypesIdentifications',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesIdentification();
	},
	methods: {
		updateTypesIdentification: function () {
			var post = this.post;
			apiMV.put('/types_identifications/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Identifications');
		},
		findTypesIdentification: function(){
			var self = this;
			var idTypesIdentification = self.$route.params.type_identification_id;
			
			apiMV.get('/types_identifications/' + idTypesIdentification).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Identifications');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Identifications');
			});
		}
	}
});

var Types_Identifications_Delete = Vue.extend({
	template: '#delete-TypesIdentifications',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesIdentification();
	},
	methods: {
		deleteTypesIdentification: function () {
			var post = this.post;
			
			apiMV.delete('/types_identifications/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Identifications');
			location.reload();
		},
		findTypesIdentification: function(){
			var self = this;
			var idTypesIdentification = self.$route.params.type_identification_id;
			
			apiMV.get('/types_identifications/' + idTypesIdentification).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Identifications');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Identifications');
			});
		}
	}
});
// ------------ TIPOS - IDENTIFICACIONES FIN ------------------------------------- 

// ------------ TIPOS - MEDICIONES INICIO ------------------------------------- 
var Types_Meditions_List = Vue.extend({
  template: '#page-TypesMeditions',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_meditions').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Meditions_View = Vue.extend({
	template: '#view-TypesMeditions',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				code: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesMedition();
	},
	methods: {
		findTypesMedition: function(){
			var self = this;
			var idTypesMedition = self.$route.params.type_medition_id;
			
			apiMV.get('/types_meditions/' + idTypesMedition).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Meditions');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Meditions');
			});
		}
	}
});

var Types_Meditions_Add = Vue.extend({
	template: '#add-TypesMeditions',
	data: function () {
		return {
			post: {
				name: '',
				code: '',
			}
		}
	},
	methods: {
		createTypesMedition: function() {
			var post = this.post;
			apiMV.post('/types_meditions', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Meditions');
		}
	}
});

var Types_Meditions_Edit = Vue.extend({
	template: '#edit-TypesMeditions',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				code: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesMedition();
	},
	methods: {
		updateTypesMedition: function () {
			var post = this.post;
			apiMV.put('/types_meditions/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Meditions');
		},
		findTypesMedition: function(){
			var self = this;
			var idTypesMedition = self.$route.params.type_medition_id;
			
			apiMV.get('/types_meditions/' + idTypesMedition).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Meditions');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Meditions');
			});
		}
	}
});

var Types_Meditions_Delete = Vue.extend({
	template: '#delete-TypesMeditions',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				code: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesMedition();
	},
	methods: {
		deleteTypesMedition: function () {
			var post = this.post;
			
			apiMV.delete('/types_meditions/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Meditions');
			location.reload();
		},
		findTypesMedition: function(){
			var self = this;
			var idTypesMedition = self.$route.params.type_medition_id;
			
			apiMV.get('/types_meditions/' + idTypesMedition).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Meditions');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Meditions');
			});
		}
	}
});
// ------------ TIPOS - MEDICIONES FIN ------------------------------------- 

// ------------ TIPOS - SOCIEDADES INICIO ------------------------------------- 
var Types_Societys_List = Vue.extend({
  template: '#page-TypesSocietys',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_societys').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Societys_View = Vue.extend({
	template: '#view-TypesSocietys',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesSociety();
	},
	methods: {
		findTypesSociety: function(){
			var self = this;
			var idTypesSocietys = self.$route.params.type_society_id;
			
			apiMV.get('/types_societys/' + idTypesSocietys).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Societys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Societys');
			});
		}
	}
});

var Types_Societys_Add = Vue.extend({
	template: '#add-TypesSocietys',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesSociety: function() {
			var post = this.post;
			apiMV.post('/types_societys', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Societys');
		}
	}
});

var Types_Societys_Edit = Vue.extend({
	template: '#edit-TypesSocietys',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesSociety();
	},
	methods: {
		updateTypesSociety: function () {
			var post = this.post;
			apiMV.put('/types_societys/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Societys');
		},
		findTypesSociety: function(){
			var self = this;
			var idTypesSocietys = self.$route.params.type_society_id;
			
			apiMV.get('/types_societys/' + idTypesSocietys).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Societys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Societys');
			});
		}
	}
});

var Types_Societys_Delete = Vue.extend({
	template: '#delete-TypesSocietys',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesSociety();
	},
	methods: {
		deleteTypesSociety: function () {
			var post = this.post;
			
			apiMV.delete('/types_societys/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Societys');
			location.reload();
		},
		findTypesSociety: function(){
			var self = this;
			var idTypesSocietys = self.$route.params.type_society_id;
			
			apiMV.get('/types_societys/' + idTypesSocietys).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Societys');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Societys');
			});
		}
	}
});
// ------------ TIPOS - SOCIEDADES FIN ------------------------------------- 

// ------------ TIPOS - VEHICULOS - INICIO ------------------------------------- 
var Types_Vehicles_List = Vue.extend({
  template: '#page-TypesVehicles',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_vehicles').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Vehicles_View = Vue.extend({
	template: '#view-TypesVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesVehicle();
	},
	methods: {
		findTypesVehicle: function(){
			var self = this;
			var idTypesVehicles = self.$route.params.type_vehicle_id;
			
			apiMV.get('/types_vehicles/' + idTypesVehicles).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Vehicles');
			});
		}
	}
});

var Types_Vehicles_Add = Vue.extend({
	template: '#add-TypesVehicles',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesVehicle: function() {
			var post = this.post;
			apiMV.post('/types_vehicles', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Vehicles');
		}
	}
});

var Types_Vehicles_Edit = Vue.extend({
	template: '#edit-TypesVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesVehicle();
	},
	methods: {
		updateTypesVehicle: function () {
			var post = this.post;
			apiMV.put('/types_vehicles/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Vehicles');
		},
		findTypesVehicle: function(){
			var self = this;
			var idTypesVehicles = self.$route.params.type_vehicle_id;
			
			apiMV.get('/types_vehicles/' + idTypesVehicles).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Vehicles');
			});
		}
	}
});

var Types_Vehicles_Delete = Vue.extend({
	template: '#delete-TypesVehicles',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesVehicle();
	},
	methods: {
		deleteTypesVehicle: function () {
			var post = this.post;
			
			apiMV.delete('/types_vehicles/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Vehicles');
			location.reload();
		},
		findTypesVehicle: function(){
			var self = this;
			var idTypesVehicles = self.$route.params.type_vehicle_id;
			
			apiMV.get('/types_vehicles/' + idTypesVehicles).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Vehicles');
			});
		}
	}
});
// ------------ TIPOS - VEHICULOS - FIN ------------------------------------- 

// ------------ TIPOS - CARGOS - INICIO ------------------------------------- 
var Types_Charges_List = Vue.extend({
  template: '#page-TypesCharges',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/types_charges').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Types_Charges_View = Vue.extend({
	template: '#view-TypesCharges',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesCharge();
	},
	methods: {
		findTypesCharge: function(){
			var self = this;
			var idTypesCharge = self.$route.params.type_charge_id;
			
			apiMV.get('/types_charges/' + idTypesCharge).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Charges');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Charges');
			});
		}
	}
});

var Types_Charges_Add = Vue.extend({
	template: '#add-TypesCharges',
	data: function () {
		return {
			post: {
				name: '',
			}
		}
	},
	methods: {
		createTypesCharge: function() {
			var post = this.post;
			apiMV.post('/types_charges', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Charges');
		}
	}
});

var Types_Charges_Edit = Vue.extend({
	template: '#edit-TypesCharges',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesCharge();
	},
	methods: {
		updateTypesCharge: function () {
			var post = this.post;
			apiMV.put('/types_charges/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Charges');
		},
		findTypesCharge: function(){
			var self = this;
			var idTypesCharge = self.$route.params.type_charge_id;
			
			apiMV.get('/types_charges/' + idTypesCharge).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Charges');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Charges');
			});
		}
	}
});

var Types_Charges_Delete = Vue.extend({
	template: '#delete-TypesCharges',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findTypesCharge();
	},
	methods: {
		deleteTypesCharge: function () {
			var post = this.post;
			
			apiMV.delete('/types_charges/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Types/Charges');
			location.reload();
		},
		findTypesCharge: function(){
			var self = this;
			var idTypesCharge = self.$route.params.type_charge_id;
			
			apiMV.get('/types_charges/' + idTypesCharge).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Types/Charges');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Types/Charges');
			});
		}
	}
});
// ------------ TIPOS - CARGOS - FIN ------------------------------------- 

// ------------ ACCIONES DE DESEMPEÑO - INICIO ------------------------------------- 
var Actions_Performance_Employees_List = Vue.extend({
	template: '#page-Actions_Performance_Employees',
	data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
	mounted: function () {
		var self = this;
		apiMV.get('/actions_performances_employees').then(function (response) {
			self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error.response);
		});
	},
	computed: {
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
			},this);
		}
	}
});

var Actions_Performance_Employees_View = Vue.extend({
	template: '#view-Actions_Performance_Employees',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
			},
		};
	},
	computed: function () {
		var self = this;
		self.findAction_Performance_Employee();
	},
	methods: {
		findAction_Performance_Employee: function(){
			var self = this;
			var idAction_Performance_Employee = self.$route.params.action_performance_employee_id;
			
			apiMV.get('/actions_performances_employees/' + idAction_Performance_Employee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Employees/Actions/Performances/');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees/Actions/Performances/');
			});
		}
	}
});

var Actions_Performance_Employees_Add = Vue.extend({
	template: '#add-Actions_Performance_Employees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		}
	},
	methods: {
		createAction_Performance_Employee: function() {
			var post = this.post;
			apiMV.post('/actions_performances_employees', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees/Actions/Performances/');
		}
	}
});

var Actions_Performance_Employees_Edit = Vue.extend({
	template: '#edit-Actions_Performance_Employees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findAction_Performance_Employee();
	},
	methods: {
		updateAction_Performance_Employee: function () {
			var post = this.post;
			apiMV.put('/actions_performances_employees/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees/Actions/Performances/');
		},
		findAction_Performance_Employee: function(){
			var self = this;
			var idAction_Performance_Employee = self.$route.params.action_performance_employee_id;
			
			apiMV.get('/actions_performances_employees/' + idAction_Performance_Employee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Employees/Actions/Performances/');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees/Actions/Performances/');
			});
		}
	}
});

var Actions_Performance_Employees_Delete = Vue.extend({
	template: '#delete-Actions_Performance_Employees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findAction_Performance_Employee();
	},
	methods: {
		deleteAction_Performance_Employee: function () {
			var post = this.post;
			
			apiMV.delete('/actions_performances_employees/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees/Actions/Performances/');
			location.reload();
		},
		findAction_Performance_Employee: function(){
			var self = this;
			var idAction_Performance_Employee = self.$route.params.action_performance_employee_id;
			
			apiMV.get('/actions_performances_employees/' + idAction_Performance_Employee).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Employees/Actions/Performances/');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees/Actions/Performances/');
			});
		}
	}
});
// ------------ ACCIONES DE DESEMPEÑO - FIN ------------------------------------- 

// ------------ SERVICIOS - INICIO ------------------------------------- 
var Services_List = Vue.extend({
  template: '#page-Services',
  data: function () {
    return {
        posts: [],
        searchKey: '',
    };
  },
  created: function () {
    var self = this;
    apiMV.get('/services', {
      params: {
        join:[
          'types_meditions',
        ],
      }
    }).then(function (response) {
      self.posts = response.data.records;
    }).catch(function (error) {
      console.log(error.response);
    });
    
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Services_View = Vue.extend({
	template: '#view-Services',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: {
					id: 0,
					name: '',
					code: '',
				},
				price: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.findService();
	},
	methods: {
		findService: function(){
			var self = this;
			var idService = self.$route.params.service_id;
			
			apiMV.get('/services/' + idService, {
				params: {
					join: 'types_meditions'
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Services');
			});
		}
	}
});

var Services_Add = Vue.extend({
	template: '#add-Services',
	data: function () {
		return {
			selectOptions: {
				types_meditions: [],
			},
			post: {
				name: '',
				description: '',
				type_medition: 0,
				price: '',
			}
		}
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_meditions', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_meditions = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createService: function() {
			var post = this.post;
			apiMV.post('/services', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Services');
		}
	}
});

var Services_Edit = Vue.extend({
	template: '#edit-Services',
	data: function () {
		return {
			selectOptions: {
				types_meditions: [],
			},
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: 0,
				price: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findService();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_meditions', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_meditions = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateService: function () {
			var post = this.post;
			apiMV.put('/services/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Services');
		},
		findService: function(){
			var self = this;
			var idService = self.$route.params.service_id;
			
			apiMV.get('/services/' + idService).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Services');
			});
		}
	}
});

var Services_Delete = Vue.extend({
	template: '#delete-Services',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: 0,
				price: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findService();
	},
	methods: {
		deleteService: function () {
			var post = this.post;
			
			apiMV.delete('/services/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Services');
			location.reload();
		},
		findService: function(){
			var self = this;
			var idService = self.$route.params.service_id;
			
			apiMV.get('/services/' + idService).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Services');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Services');
			});
		}
	}
});
// ------------ SERVICIOS - FIN ------------------------------------- 

// ------------ VEHICULOS INICIO ------------------------------------- 
var Vehicles_List = Vue.extend({
  template: '#page-Vehicles',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/vehicles', {
		params: {
			join: [
				'types_vehicles',
				'types_fuels',
				'contacts',
				'status_vehicles',
			],
		}
	}).then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.license_plate.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Vehicles_View = Vue.extend({
	template: '#view-Vehicles',
	data: function () {
		return {
			post: {
				id: 0,
				license_plate: '',
				brand: '',
				model: '',
				type_vehicle: {
					id: 0,
					name: '',
				},
				passangers_capacity: 0,
				type_fuel: {
					id: 0,
					name: '',
				},
				cilindraje: '',
				holder: {
					id: 0,
					first_name: '',
					second_name: '',
					surname: '',
					second_surname: '',
					phone: '',
					phone_mobile: '',
					mail: '',
				},
				propietary: {
					id: 0,
					first_name: '',
					second_name: '',
					surname: '',
					second_surname: '',
					phone: '',
					phone_mobile: '',
					mail: '',
				},
				card_propiety_number: '',
				chassis_number: '',
				soat_number: '',
				third_party_number: '',
				soat_date_expiration: '',
				third_party_date_expiration: '',
				capacity_with_enhancement: '',
				capacity_without_enhancement: '',
				base_weight: '',
				rent_cost: '',
				status: {
					id: 0,
					name: '',
				},
			},
			galery_vehicles: [],
			crew: [],
		};
	},
	mounted: function () {
		var self = this;
		self.findVehicle();
	},
	methods: {
		findVehicle: function(){
			var self = this;
			var idVehicles = self.$route.params.vehicle_id;
			
			apiMV.get('/vehicles/' + idVehicles, {
				params: {
					join: [
						'types_vehicles',
						'types_fuels',
						'contacts',
						'status_vehicles',
					],
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.license_plate)
				{
					router.push('/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles');
			});
			
			apiMV.get('/crew_vehicles', {
				params: {
					filter: [
						'vehicle,eq,' + idVehicles,
					],
					join: [
						'employees',
						'types_charges',
					],
				}
			}).then(function (response) {
				self.crew = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/galery_vehicles', {
				params: {
					filter: [
						'vehicle,eq,' + idVehicles,
					],
					join: [
						//'pictures',
					],
				}
			}).then(function (response) {
				self.galery_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
		}
	}
});

var Vehicles_Add = Vue.extend({
	template: '#add-Vehicles',
	data: function () {
		return {
			selectOptions: {
				types_vehicles: [],
				types_fuels: [],
				contacts: [],
				status_vehicles: [],
			},
			post: {
				license_plate: '',
				brand: '',
				model: '',
				type_vehicle: 0,
				passangers_capacity: 0,
				type_fuel: 0,
				cilindraje: '',
				holder: 0,
				propietary: 0,
				card_propiety_number: '',
				chassis_number: '',
				soat_number: '',
				third_party_number: '',
				soat_date_expiration: '',
				third_party_date_expiration: '',
				capacity_with_enhancement: '',
				capacity_without_enhancement: '',
				base_weight: '',
				rent_cost: '',
				status: 0,
			},
		}
	},
	mounted: function(){
		var self = this;
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_vehicles', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/types_fuels', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_fuels = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/contacts', {
				params: {
					order: 'identification_number,asc',
				}
			}).then(function (response) {
				self.selectOptions.contacts = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/status_vehicles', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.status_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createVehicle: function() {
			var post = this.post;
			apiMV.post('/vehicles', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Vehicles');
		}
	}
});

var Vehicles_Edit = Vue.extend({
	template: '#edit-Vehicles',
	data: function () {
		return {
			selectOptions: {
				types_vehicles: [],
				types_fuels: [],
				contacts: [],
				employees: [],
				status_vehicles: [],
				types_charges: [],
			},
			post_crew: {
				vehicle: 0,
				charge: 0,
				employee: 0,
			},
			post: {
				id: 0,
				license_plate: '',
				brand: '',
				model: '',
				type_vehicle: 0,
				passangers_capacity: 0,
				type_fuel: 0,
				cilindraje: '',
				holder: 0,
				propietary: 0,
				card_propiety_number: '',
				chassis_number: '',
				soat_number: '',
				third_party_number: '',
				soat_date_expiration: '',
				third_party_date_expiration: '',
				capacity_with_enhancement: '',
				capacity_without_enhancement: '',
				base_weight: '',
				rent_cost: '',
				status: 0,
			},
			crew: [],
			image_preview: {
				name: '',
				size: 0,
				src: '',
				type: '',
			},
			galery_vehicles: [],
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findVehicle();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_vehicles', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/types_fuels', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_fuels = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/types_charges', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_charges = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/contacts', {
				params: {
					order: 'identification_number,asc',
				}
			}).then(function (response) {
				self.selectOptions.contacts = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/employees', {
				params: {
					
				}
			}).then(function (response) {
				self.selectOptions.employees = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/status_vehicles', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.status_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateVehicle: function () {
			var post = this.post;
			apiMV.put('/vehicles/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Vehicles');
		},
		includeCrewVehicle: function () {
			var self = this;
			console.log(self.post_crew);
			
			apiMV.post('/crew_vehicles', self.post_crew).then(function (response) {
				// post.id = response.data;
				$("#includeCrewVehicle-Fast").hide();
				self.post_crew.charge = 0;
				self.post_crew.employee = 0;
				self.findVehicle();
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
			
		},
		findVehicle: function(){
			var self = this;
			var idVehicles = self.$route.params.vehicle_id;
			
			apiMV.get('/vehicles/' + idVehicles).then(function (response) {
				if(!response.data.id || !response.data.license_plate)
				{
					router.push('/Vehicles');
				}
				else
				{
					self.post = response.data;
					self.post_crew.vehicle = response.data.id;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles');
			});
			
			apiMV.get('/crew_vehicles', {
				params: {
					filter: [
						'vehicle,eq,' + idVehicles,
					],
					join: [
						'employees',
						'types_charges',
					],
				}
			}).then(function (response) {
				self.crew = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/galery_vehicles', {
				params: {
					filter: [
						'vehicle,eq,' + idVehicles,
					],
					join: [
						//'pictures',
					],
				}
			}).then(function (response) {
				self.galery_vehicles = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		changeImage: function(e){
			var self = this;
			var image = e;
			var file = image.target.files[0];
			var reader = new FileReader();
			// Set preview image into the popover data-content

			reader.onload = function (e) {
				self.image_preview.name = file.name;
				self.image_preview.size = file.size;
				self.image_preview.src = e.target.result;
				self.image_preview.type = file.type;
				//img.attr('src', e.target.result);
				///$(".image-preview-filename").val(file.name);
				$(".image-preview-input-title").text("Subir Otra");

				//$(".image-preview").attr("data-content",$(img)[0].outerHTML).popover("show");


				apiMV.post('/pictures', self.image_preview).then(function (response) {
					var imageId = response.data;
					var tempInsert = {};
					
					tempInsert.picture = imageId;
					tempInsert.vehicle = self.post.id;
					
					apiMV.post('/galery_vehicles', tempInsert).then(function (response) {
						var imageId = response.data;
						//location.reload();
						self.findVehicle();
					}).catch(function (error) {
						console.log(error.response);
					});

				}).catch(function (error) {
					console.log(error.response);
				});
			}        
			reader.readAsDataURL(file);
		}
	}
});

var Vehicles_Delete = Vue.extend({
	template: '#delete-Vehicles',
	data: function () {
		return {
			post: {
				id: 0,
				license_plate: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findVehicle();
	},
	methods: {
		deleteVehicle: function () {
			var post = this.post;
			
			apiMV.delete('/vehicles/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Vehicles');
			location.reload();
		},
		findVehicle: function(){
			var self = this;
			var idVehicles = self.$route.params.vehicle_id;
			
			apiMV.get('/vehicles/' + idVehicles).then(function (response) {
				if(!response.data.id || !response.data.license_plate)
				{
					router.push('/Vehicles');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles');
			});
		}
	}
});

var Crew_Vehicle_Delete = Vue.extend({
	template: '#delete-includeCrewVehicle',
	data: function () {
		return {
			post: {
				id: 0,
				charge: 0,
				vehicle: 0,
				employee: 0,
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findCrewVehicle();
	},
	methods: {
		deleteCrewVehicle: function () {
			var self = this;
			var idCrewVehicles = self.$route.params.vehicle_id;
			var post = this.post;
			
			apiMV.delete('/crew_vehicles/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
				router.push('/Vehicles/' + idCrewVehicles + '/edit');
		},
		findCrewVehicle: function(){
			var self = this;
			var idCrewVehicles = self.$route.params.crew_vehicle_id;
			
			apiMV.get('/crew_vehicles/' + idCrewVehicles).then(function (response) {
				if(!response.data.id || !response.data.charge)
				{
					router.push('/Vehicles/' + idCrewVehicles + '/edit');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Vehicles/' + idCrewVehicles + '/edit');
			});
		}
	}
});

var Galery_Vehicles_Delete = Vue.extend({
    template: '#GaleryVehicles-delete',
    data: function () {
        return {
            vehicle_id: this.$route.params.vehicle_id,
            post: {
                id: 0,
            },
            vehicle_id: this.$route.params.vehicle_id,
            galery_vehicles_id: this.$route.params.galery_vehicles_id,
        };
    },
    methods: {
        deletegalery_vehicles: function () {
          var self = this;
          var galery_vehiclesId = self.galery_vehicles_id;          
          apiMV.delete('/galery_vehicles/' + galery_vehiclesId).then(function (response) {
            
          }).catch(function (error) {
            console.log(error.response);
          });
          
          router.push('/Vehicles/' + self.vehicle_id + '/edit');
          // router.push('/');
          // location.reload();
        }
    },
	mounted: function(){
   		var self = this;		
		apiMV.get('/vehicles?join=galery_vehicles,employee_charges&join=crew_vehicles,employee_charges,persons', {
			params: {
				filter: [
					'id,eq,' + self.$route.params.vehicle_id
				],
				//join: 'employee_charges,persons,crew_vehicles'
			}
		}).then(function (response) {
		  self.post = response.data.records[0];
		}).catch(function (error) {
		  console.log(error.response);
		});
	}
});
// ------------ VEHICULOS FIN ------------------------------------- 

// ------------ TIPOS - CLIENTES INICIO ------------------------------------- 
var Contacts_List = Vue.extend({
  template: '#page-Contacts',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/contacts').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.identification_number.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Contacts_View = Vue.extend({
	template: '#view-Contacts',
	data: function () {
		return {
			post: {
				id: 0,
				identification_type: {
					id: 0,
					name: '',
				},
				identification_number: '',
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				phone: '',
				phone_mobile: '',
				mail: '',
				department: {
					id: 0,
					name: '',
				},
				city: {
					id: 0,
					name: '',
				},
				address: '',
				geo_address: '',
			},
			post_contacts: [],
		};
	},
	mounted: function () {
		var self = this;
		self.findContact();
	},
	methods: {
		findContact: function(){
			var self = this;
			var idContact = self.$route.params.contact_id;
			
			apiMV.get('/contacts/' + idContact, {
				params: {
					join: [
						'types_identifications',
						'geo_departments',
						'geo_citys',
					],
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.identification_number)
				{
					router.push('/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
				//router.push('/Contacts');
			});
		}
	}
});

var Contacts_Add = Vue.extend({
	template: '#add-Contacts',
	data: function () {
		return {
			selectOptions: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [
					{
						id: 0,
						name: 'Selecciona el department',
					},
				],
			},
			post: {
				id: 0,
				identification_type: 0,
				identification_number: '',
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				phone: '',
				phone_mobile: '',
				mail: '',
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
			}
		}
	},
	mounted: function(){
		var self = this;
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_identifications', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_identifications = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/geo_departments', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.geo_departments = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createContact: function() {
			var post = this.post;
			apiMV.post('/contacts', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Contacts');
		}
	}
});

var Contacts_Edit = Vue.extend({
	template: '#edit-Contacts',
	data: function () {
		return {
			selectOptions: {
				types_identifications: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: 0,
				identification_type: 0,
				identification_number: '',
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				phone: '',
				phone_mobile: '',
				mail: '',
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findContact();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_identifications', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_identifications = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/geo_departments', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.geo_departments = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
			
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateContact: function () {
			var post = this.post;
			apiMV.put('/contacts/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Contacts');
		},
		findContact: function(){
			var self = this;
			var idContact = self.$route.params.contact_id;
			
			apiMV.get('/contacts/' + idContact).then(function (response) {
				if(!response.data.id || !response.data.identification_number)
				{
					router.push('/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Contacts');
			});
		}
	}
});

var Contacts_Delete = Vue.extend({
	template: '#delete-Contacts',
	data: function () {
		return {
			post: {
				id: 0,
				identification_type: 0,
				identification_number: '',
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				phone: '',
				phone_mobile: '',
				mail: '',
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findContact();
	},
	methods: {
		deleteContact: function () {
			var post = this.post;
			
			apiMV.delete('/contacts/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Contacts');
			location.reload();
		},
		findContact: function(){
			var self = this;
			var idContact = self.$route.params.contact_id;
			
			apiMV.get('/contacts/' + idContact).then(function (response) {
				if(!response.data.id || !response.data.identification_number)
				{
					router.push('/Contacts');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Contacts');
			});
		}
	}
});
// ------------ TIPOS - CLIENTES FIN ------------------------------------- 

// ------------ EMPLEADOS - INICIO ------------------------------------- 
var Employees_List = Vue.extend({
  template: '#page-Employees',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/employees').then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.first_name.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Employees_View = Vue.extend({
	template: '#view-Employees',
	data: function () {
		return {
			post: {
				id: 0,
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				identification_type: {
					id: 0,
					name: '',
				},
				identification_number: '',
				identification_date_expedition: '',
				birthdate: '',
				blood_type: {
					id: 0,
					name: '',
				},
				blood_rh: {
					id: 0,
					name: '',
				},
				mail: '',
				number_phone: '',
				number_mobile: '',
				company_date_entry: '',
				company_date_out: '',
				company_mail: '',
				company_number_phone: '',
				company_number_mobile: '',
				avatar: 0,
				status: {
					id: 0,
					name: '',
				},
				eps: {
					id: 0,
					name: '',
				},
				arl: {
					id: 0,
					name: '',
				},
				pension_fund: {
					id: 0,
					name: '',
				},
				compensation_fund: {
					id: 0,
					name: '',
				},
				severance_fund: {
					id: 0,
					name: '',
				},
				department: {
					id: 0,
					name: '',
				},
				city: {
					id: 0,
					name: '',
				},
				address: '',
				geo_address: '',
				observations: '',
			},
			post_contacts: [],
			contracted_staff: [],
			performances_employees: [],
		};
	},
	mounted: function () {
		var self = this;
		self.findEmployee();
	},
	methods: {
		findEmployee: function(){
			var self = this;
			var idEmployee = self.$route.params.employee_id;
			
			apiMV.get('/employees/' + idEmployee, {
				params: {
					join: [
						'types_identifications',
						'types_bloods',
						'types_bloods_rhs',
						'status_employees',
						'eps',
						'arl',
						'funds_pensions',
						'funds_compensations',
						'funds_severances',
						'geo_departments',
						'geo_citys',
					],
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.first_name)
				{
					router.push('/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees');
			});
			
			apiMV.get('/crew_employees', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'contacts',
						'types_contacts',
					],
				}
			}).then(function (response) {
				self.post_contacts = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/contracted_staff', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'contracts_employees',
						'types_charges',
						'contracts_employees,terms_contrats_employees',
					],
				}
			}).then(function (response) {
				self.contracted_staff = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/performances_employees', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'reasons_performances_employees',
						'actions_performances_employees',
					],
				}
			}).then(function (response) {
				self.performances_employees = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Employees_Add = Vue.extend({
	template: '#add-Employees',
	data: function () {
		return {
			selectOptions: {
				types_identifications: [],
				types_bloods: [],
				types_bloods_rhs: [],
				status_employees: [],
				eps: [],
				arl: [],
				funds_pensions: [],
				funds_compensations: [],
				funds_severances: [],
				geo_departments: [],
				geo_citys: [],
			},
			post: {
				id: 0,
				first_name: '',
				second_name: '',
				surname: '',
				second_surname: '',
				identification_type: 0,
				identification_number: '',
				identification_date_expedition: '',
				birthdate: '',
				blood_type: 0,
				blood_rh: 0,
				mail: '',
				number_phone: '',
				number_mobile: '',
				company_date_entry: '',
				company_date_out: '',
				company_mail: '',
				company_number_phone: '',
				company_number_mobile: '',
				avatar: 0,
				status: 0,
				eps: 0,
				arl: 0,
				pension_fund: 0,
				compensation_fund: 0,
				severance_fund: 0,
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
				observations: '',
			},
		}
	},
	methods: {
		createEmployee: function() {
			var post = this.post;
			apiMV.post('/employees', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees');
		},
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_identifications', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_identifications = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_bloods', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_bloods = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/types_bloods_rhs', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_bloods_rhs = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/status_employees', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.status_employees = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/eps', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.eps = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/arl', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.arl = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/funds_pensions', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_pensions = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/funds_compensations', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_compensations = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/funds_severances', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_severances = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			
			apiMV.get('/geo_departments', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_departments = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
	},
	mounted: function(){
		var self = this;
		self.loadSelects();
	},
});

var Employees_Edit = Vue.extend({
	template: '#edit-Employees',
	data: function () {
		return {
			selectOptions: {
				types_identifications: [],
				types_bloods: [],
				types_bloods_rhs: [],
				status_employees: [],
				eps: [],
				arl: [],
				funds_pensions: [],
				funds_compensations: [],
				funds_severances: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
				types_contacts: [],
				contracted_staff: [],
				types_contracts: [],
				contracts_employees: [],
				reasons_performances_employees: [],
				actions_performances_employees: [],
			},
			post: {
				id: 0,
				name: ''
			},
			post_contacts: [],
			post_crew: {
				employee: this.$route.params.employee_id,
				contact: 0,
			},
			contracted_staff: [],
			post_contracted_staff: {
				employee: this.$route.params.employee_id,
				contract_employee: 0,
				type_charge: 0,
				date_start: '',
				date_end: '',
			},
			performances_employees: [],
			post_performances_employees: {
				employee: this.$route.params.employee_id,
				reason: 0,
				date_start: '',
				date_end: '',
				action_taken: 0,
				notes: '',
			},
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findEmployee();
	},
	methods: {
		includeContractEmployee: function () {
			var self = this;
			if(self.post_contracted_staff.date_end == '' || self.post_contracted_staff.date_end == 0){
				delete self.post_contracted_staff.date_end;
			}
			
			apiMV.post('/contracted_staff', self.post_contracted_staff).then(function (response) {
				// post.id = response.data;
				$("#includeContractEmployee-Fast").hide();
				self.findEmployee();
				self.contract_employee.type_charge = 0;
				self.contract_employee.date_start = '';
				self.contract_employee.date_end = '';
				self.contract_employee.contract_employee = 0;
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
			
		},
		includeCrewEmployee: function () {
			var self = this;
			
			apiMV.post('/crew_employees', self.post_crew).then(function (response) {
				// post.id = response.data;
				$("#includeCrewEmployee-Fast").hide();
				self.post_crew.contact = 0;
				self.findEmployee();
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
			
		},
		updateEmployee: function () {
			var post = this.post;
			apiMV.put('/employees/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees');
		},
		findEmployee: function(){
			var self = this;
			var idEmployee = self.$route.params.employee_id;
			
			apiMV.get('/employees/' + idEmployee).then(function (response) {
				if(!response.data.id || !response.data.first_name)
				{
					router.push('/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees');
			});
			
			apiMV.get('/crew_employees', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'contacts',
						'types_contacts',
					],
				}
			}).then(function (response) {
				self.post_contacts = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/contracted_staff', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'contracts_employees',
						'types_charges',
						'contracts_employees,terms_contrats_employees',
					],
				}
			}).then(function (response) {
				self.contracted_staff = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/performances_employees', {
				params: {
					filter: 'employee,eq,' + idEmployee,
					join: [
						'reasons_performances_employees',
						'actions_performances_employees',
					],
				}
			}).then(function (response) {
				self.performances_employees = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			$('#includeCrewEmployee-Fast').hide();
			$('#includeContractEmployee-Fast').hide();
			$('#includePerformancesEmployee-Fast').hide();
		},
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_identifications', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_identifications = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_bloods', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_bloods = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/types_bloods_rhs', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_bloods_rhs = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/status_employees', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.status_employees = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/eps', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.eps = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/arl', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.arl = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/funds_pensions', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_pensions = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/funds_compensations', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_compensations = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/funds_severances', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.funds_severances = response.data.records; })
				.catch(function (error) { console.log(error.response); });
						
			apiMV.get('/geo_departments', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_departments = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/geo_citys', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_citys = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/contacts', { params: { order: 'identification_number,asc', } })
				.then(function (response) { self.selectOptions.contacts = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/types_contacts', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_contacts = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/contracted_staff', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.contracted_staff = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/types_charges', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_charges = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/contracts_employees', { params: { order: 'name,asc', join: 'terms_contrats_employees' } })
				.then(function (response) { self.selectOptions.contracts_employees = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/reasons_performances_employees', { params: { order: 'name,asc', join: 'terms_contrats_employees' } })
				.then(function (response) { self.selectOptions.reasons_performances_employees = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/actions_performances_employees', { params: { order: 'name,asc', join: 'terms_contrats_employees' } })
				.then(function (response) { self.selectOptions.actions_performances_employees = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		includePerformancesEmployee: function () {
			var self = this;
			if(self.post_performances_employees.date_end == '' || self.post_performances_employees.date_end == 0){
				delete self.post_performances_employees.date_end;
			}
			
			apiMV.post('/performances_employees', self.post_performances_employees).then(function (response) {
				// post.id = response.data;
				$("#includePerformancesEmployee-Fast").hide();
				self.findEmployee();
				self.post_performances_employees.reason = 0;
				self.post_performances_employees.action_taken = 0;
				self.post_performances_employees.date_start = '';
				self.post_performances_employees.date_end = '';
				self.post_performances_employees.notes = '';
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
			
		},
	}
});

var Employees_Delete = Vue.extend({
	template: '#delete-Employees',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findEmployee();
	},
	methods: {
		deleteEmployee: function () {
			var post = this.post;
			
			apiMV.delete('/employees/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees');
			location.reload();
		},
		findEmployee: function(){
			var self = this;
			var idEmployee = self.$route.params.employee_id;
			
			apiMV.get('/employees/' + idEmployee).then(function (response) {
				if(!response.data.id || !response.data.first_name)
				{
					router.push('/Employees');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Employees');
			});
		}
	}
});

var Employees_Contacts_Delete = Vue.extend({
	template: '#delete-EmployeesContacts',
	data: function () {
		return {
			post: {
				id: 0,
				employee: '',
				contact: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findEmployeeContact();
	},
	methods: {
		deleteEmployeeContact: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/crew_employees/' + self.$route.params.employee_contact_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees/' + self.$route.params.employee_id + '/Edit');
		},
		findEmployeeContact: function(){
			var self = this;
			var idEmployeeContact = self.$route.params.employee_contact_id;
			
			apiMV.get('/crew_employees/' + idEmployeeContact).then(function (response) {
				if(!response.data.id || !response.data.first_name)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var ContractedStaff_Delete = Vue.extend({
	template: '#delete-ContractedStaff',
	data: function () {
		return {
			post: {
				id: 0,
				employee: 0,
				contract_employee: 0,
				type_charge: 0,
				date_start: '',
				date_end: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findContractedStaff();
	},
	methods: {
		deleteContractedStaff: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/contracted_staff/' + self.$route.params.contracted_staff_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Employees/' + self.$route.params.employee_id + '/Edit');
		},
		findContractedStaff: function(){
			var self = this;
			var idContractedStaff = self.$route.params.contracted_staff_id;
			
			apiMV.get('/contracted_staff/' + idContractedStaff).then(function (response) {
				if(!response.data.id || !response.data.first_name)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});
// ------------ EMPLEADOS - FIN ------------------------------------- 

// ------------ CLIENTES - INICIO ------------------------------------- 
var Clients_List = Vue.extend({
  template: '#page-Clients',
  data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
  mounted: function () {
    var self = this;
    apiMV.get('/clients', {
		params: {
			join: [
				'types_clients',
				'types_identifications',
			]
		}
	}).then(function (response) {
		self.posts = response.data.records;
    }).catch(function (error) {
		console.log(error.response);
    });
  },
  computed: {
    filteredposts: function () {
      return this.posts.filter(function (post) {
        return this.searchKey=='' || post.social_reason.indexOf(this.searchKey) !== -1;
      },this);
    }
  }
});

var Clients_View = Vue.extend({
	template: '#view-Clients',
	data: function () {
		return {
			post: {
				type: {
					id: 0,
					name: '',
				},
				identification_type: {
					id: 0,
					name: '',
				},
				identification_number: '',
				social_reason: '',
				tradename: '',
				society_type: {
					id: 0,
					name: '',
				},
				department: {
					id: 0,
					name: '',
				},
				city: {
					id: 0,
					department: 0,
					name: '',
				},
				address: '',
				geo_address: '',
				legal_representative: {
					id: 0,
					first_name: '',
					second_name: '',
					surname: '',
					second_surname: '',
					phone: '',
					phone_mobile: '',
					mail: '',
				},
				contact_principal: {
					id: 0,
					first_name: '',
					second_name: '',
					surname: '',
					second_surname: '',
					phone: '',
					phone_mobile: '',
					mail: '',
				},
				enable_audit: 0,
			},
			crew_clients: [],
			redicated_clients: [],
			auditors_clients: [],
			services_clients: [],
		};
	},
	mounted: function () {
		var self = this;
		self.findClients();
	},
	methods: {
		findClients: function(){
			var self = this;
			var idClient = self.$route.params.client_id;
			
			apiMV.get('/clients/' + idClient, {
				params: {
					join: [
						'types_clients',
						'types_identifications',
						'types_societys',
						'geo_departments',
						'geo_citys',
						'contacts',
					],
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.social_reason)
				{
					router.push('/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Clients');
			});
			
			apiMV.get('/crew_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'contacts',
						'types_contacts',
					],
				}
			}).then(function (response) {
				self.crew_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/redicated_clients', {
				params: {
					filter: 'client,eq,' + idClient,
				}
			}).then(function (response) {
				self.redicated_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/auditors_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'contacts',
					],
				}
			}).then(function (response) {
				self.auditors_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/services_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'services',
						'attributes_services_clients',
						'attributes_services_clients,attributes',
					],
				}
			}).then(function (response) {
				self.services_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Clients_Add = Vue.extend({
	template: '#add-Clients',
	data: function () {
		return {
			selectOptions: {
				types_clients: [],
				types_identifications: [],
				types_societys: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
			},
			post: {
				type: 0,
				identification_type: 0,
				identification_number: '',
				social_reason: '',
				tradename: '',
				society_type: 0,
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
				legal_representative: 0,
				contact_principal: 0,
				contact_alternative: 0,
				enable_audit: 0,
			}
		}
	},
	mounted: function(){
		var self = this;
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_clients', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_clients = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_identifications', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_identifications = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_societys', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_societys = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/geo_departments', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_departments = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/contacts', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.contacts = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createClient: function() {
			var post = this.post;
			apiMV.post('/clients', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients');
		}
	}
});

var Clients_Edit = Vue.extend({
	template: '#edit-Clients',
	data: function () {
		return {
			selectOptions: {
				types_clients: [],
				types_identifications: [],
				types_societys: [],
				geo_departments: [],
				geo_citys: [],
				contacts: [],
				types_contacts: [],
				types_repeats_services_clients: [],
			},
			post: {
				id: 0,
				type: 0,
				identification_type: 0,
				identification_number: '',
				social_reason: '',
				tradename: '',
				society_type: 0,
				department: 0,
				city: 0,
				address: '',
				geo_address: '',
				legal_representative: 0,
				contact_principal: 0,
				contact_alternative: 0,
				enable_audit: 0,
			},
			crew_clients: [],
			redicated_clients: [],
			auditors_clients: [],
			services_clients: [],
			post_crew_clients: {
				client: this.$route.params.client_id,
				contact: 0,
				type_contact: 0,
			},
			post_redicated_clients: {
				client: this.$route.params.client_id,
				consecutive: '',
				name: '',
				object: '',
				description_service: '',
				date_start: '',
				date_end: '',
				additional_notes: '',
			},
			post_auditors_clients: {
				contact: 0,
				client: this.$route.params.client_id,
			},
			calc: {
				subService: 0,
				subTotalAttributes: 0,
			}
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findClients();
	},
	methods: {
		formatMoney: function(n, c, d, t){
			var c = isNaN(c = Math.abs(c)) ? 2 : c,
				d = d == undefined ? "." : d,
				t = t == undefined ? "," : t,
				s = n < 0 ? "-" : "",
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
				j = (j = i.length) > 3 ? j % 3 : 0;

			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		},
		sumarTodo: function(number){
			var self = this;
			
			
			self.services_clients.forEach(function(element) {
				var priceService = element.service.price;
				var quantityService = element.quantity;
				var subtotalService = priceService * quantityService;
				var attributesService = element.attributes_services_clients;
				
				self.calc.subService = self.calc.subService + subtotalService;
				
				attributesService.forEach(function(element2) {
					var priceAttribute = element2.attribute.price;
					var quantityAttribute = element2.quantity;
					var subtotalAttribute = priceAttribute * quantityAttribute;
					
					self.calc.subTotalAttributes = self.calc.subTotalAttributes + subtotalAttribute;
				});
			});

			
		},
		sumaServicio: function(number){
			var self = this;
			self.calc.subService = self.calc.subService + number;			
			self.calc.subTotal = self.calc.subService + self.calc.subTotalAttributes;
		},
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/types_clients', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_clients = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_identifications', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_identifications = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_societys', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_societys = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/geo_departments', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_departments = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/geo_citys', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.geo_citys = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/contacts', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.contacts = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
			apiMV.get('/types_contacts', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.types_contacts = response.data.records; })
				.catch(function (error) { console.log(error.response); });
				
		},
		loadCitys: function(){
			var self = this;
			
			apiMV.get('/geo_citys', {
				params: {
					order: 'name,asc',
					filter: 'department,eq,' + self.post.department,
				}
			}).then(function (response) {
				self.selectOptions.geo_citys = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateClient: function () {
			var post = this.post;
			apiMV.put('/clients/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients');
		},
		findClients: function(){
			var self = this;
			var idClient = self.$route.params.client_id;
			
			apiMV.get('/clients/' + idClient).then(function (response) {
				if(!response.data.id || !response.data.social_reason)
				{
					router.push('/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Clients');
			});
			
			apiMV.get('/crew_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'contacts',
						'types_contacts',
					],
				}
			}).then(function (response) {
				self.crew_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/redicated_clients', {
				params: {
					filter: 'client,eq,' + idClient,
				}
			}).then(function (response) {
				self.redicated_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/auditors_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'contacts',
					],
				}
			}).then(function (response) {
				self.auditors_clients = response.data.records;
				
			}).catch(function (error) {
				console.log(error.response);
			});
			
			apiMV.get('/services_clients', {
				params: {
					filter: 'client,eq,' + idClient,
					join: [
						'services',
						'attributes_services_clients',
						'attributes_services_clients,attributes',
						'types_repeats_services_clients',
					],
				}
			}).then(function (response) {
				self.services_clients = response.data.records;
				self.sumarTodo();
			}).catch(function (error) {
				console.log(error.response);
			});
			
			$("#includeContactClient-Fast").hide();
			$("#includeRedicatedClient-Fast").hide();
			$("#includeAuditorClient-Fast").hide();
		},
		includeContactClient: function(){
			var self = this;
			
			apiMV.post('/crew_clients', self.post_crew_clients).then(function (response) {
				// post.id = response.data;
				$("#includeContactClient-Fast").hide();
				self.findClients();
				self.post_crew_clients.contact = 0;
				self.post_crew_clients.type_contact = 0;
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
		},
		includeRedicatedClient: function(){
			var self = this;
			
			apiMV.post('/redicated_clients', self.post_redicated_clients).then(function (response) {
				// post.id = response.data;
				$("#includeRedicatedClient-Fast").hide();
				self.findClients();
				self.post_redicated_clients.consecutive = '';
				self.post_redicated_clients.name = '';
				self.post_redicated_clients.object = '';
				self.post_redicated_clients.description_service = '';
				self.post_redicated_clients.date_start = '';
				self.post_redicated_clients.date_end = '';
				self.post_redicated_clients.additional_notes = '';
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
		},
		includeAuditorClient: function(){
			var self = this;
			
			apiMV.post('/auditors_clients', self.post_auditors_clients).then(function (response) {
				// post.id = response.data;
				$("#includeAuditorClient-Fast").hide();
				self.findClients();
				self.post_auditors_clients.contact = 0;
			}).catch(function (error) {
				console.log(error.response);
				console.log(error.response);
			});
		},
	}
});

var Clients_Delete = Vue.extend({
	template: '#delete-Clients',
	data: function () {
		return {
			post: {
				id: 0,
				social_reason: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findClients();
	},
	methods: {
		deleteClient: function () {
			var post = this.post;
			
			apiMV.delete('/clients/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients');
			location.reload();
		},
		findClients: function(){
			var self = this;
			var idClient = self.$route.params.client_id;
			
			apiMV.get('/clients/' + idClient).then(function (response) {
				if(!response.data.id || !response.data.social_reason)
				{
					router.push('/Clients');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Clients');
			});
		}
	}
});

var Clients_Contacts_Delete = Vue.extend({
	template: '#delete-ClientsContacts',
	data: function () {
		return {
			post: {
				id: 0,
				client: 0,
				contact: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findClientContact();
	},
	methods: {
		deleteClientsContacts: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/crew_clients/' + self.$route.params.client_contact_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients/' + self.$route.params.client_id + '/Edit');
		},
		findClientContact: function(){
			var self = this;
			var idClientContact = self.$route.params.client_contact_id;
			
			apiMV.get('/crew_clients/' + idClientContact).then(function (response) {
				if(!response.data.id || !response.data.contact)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Clients_Redicated_Delete = Vue.extend({
	template: '#delete-RedicatedClients',
	data: function () {
		return {
			post: {
				id: 0,
				client: 0,
				consecutive: '',
				name: '',
				object: '',
				description_service: '',
				date_start: '',
				date_end: '',
				additional_notes: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findRedicatedClients();
	},
	methods: {
		deleteRedicatedClients: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/redicated_clients/' + self.$route.params.redicated_client_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients/' + self.$route.params.client_id + '/Edit');
		},
		findRedicatedClients: function(){
			var self = this;
			var idRedicatedClients = self.$route.params.redicated_client_id;
			
			apiMV.get('/redicated_clients/' + idRedicatedClients).then(function (response) {
				if(!response.data.id || !response.data.contact)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Clients_Auditors_Delete = Vue.extend({
	template: '#delete-ClientsAuditors',
	data: function () {
		return {
			post: {
				id: 0,
				client: 0,
				contact: 0,
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findClientsAuditors();
	},
	methods: {
		deleteClientsAuditors: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/auditors_clients/' + self.$route.params.auditor_client_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients/' + self.$route.params.client_id + '/Edit');
		},
		findClientsAuditors: function(){
			var self = this;
			var idClientsAuditors = self.$route.params.auditor_client_id;
			
			apiMV.get('/auditors_clients/' + idClientsAuditors).then(function (response) {
				if(!response.data.id || !response.data.contact)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Clients_Attributes_Services_Delete = Vue.extend({
	template: '#delete-AttributesServicesClients',
	data: function () {
		return {
			post: {
				id: 0,
				service_client: 0,
				attribute: 0,
				quantity: 0,
				date_start: '',
				date_end: '',
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findClientsAttributesServices();
	},
	methods: {
		deleteClientsAttributesServices: function () {
			var self = this;
			var post = this.post;
			
			apiMV.delete('/attributes_services_clients/' + self.$route.params.client_attribute_service_id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients/' + self.$route.params.client_id + '/Edit');
		},
		findClientsAttributesServices: function(){
			var self = this;
			var idClientsAttributesServices = self.$route.params.client_attribute_service_id;
			
			apiMV.get('/attributes_services_clients/' + idClientsAttributesServices).then(function (response) {
				if(!response.data.id)
				{
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});

var Clients_Attributes_Services_Add = Vue.extend({
	template: '#add-AttributesServicesClients',
	data: function () {
		return {
			selectOptions: {
				attributes: [],
			},
			post: {
				service_client: this.$route.params.client_service_id,
				attribute: 0,
				quantity: 0,
				date_start: '',
				date_end: '',
			},
		}
	},
	mounted: function(){
		var self = this;
		
		self.loadSelects();
	},
	methods: {
		formatMoney: function(n, c, d, t){
			var c = isNaN(c = Math.abs(c)) ? 2 : c,
				d = d == undefined ? "." : d,
				t = t == undefined ? "," : t,
				s = n < 0 ? "-" : "",
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
				j = (j = i.length) > 3 ? j % 3 : 0;

			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		},
		calulator_result: function(){
			var self = this;
			
			select.total;
		},
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/attributes', { params: { order: 'name,asc', } })
				.then(function (response) { self.selectOptions.attributes = response.data.records; })
				.catch(function (error) { console.log(error.response); });
		},
		createAttributesServicesClients: function() {
			var self = this;
			var post = this.post;
			
			if(post.date_start == '' || post.date_start == 0){ delete post.date_start; };
			if(post.date_end == '' || post.date_end == 0){ delete post.date_end; };
			
			apiMV.post('/attributes_services_clients', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Clients/' + self.$route.params.client_id + '/Edit');
		}
	}
});

var Clients_Services_Add = Vue.extend({
	template: '#add-ServicesClients',
	data: function () {
		return {
			selectOptions: {
				services: [],
				types_repeats_services_clients: [],
			},
			post: {
				client: this.$route.params.client_id,
				service: 0,
				quantity: 0,
				date_start: '',
				date_end: '',
			},
		}
	},
	mounted: function(){
		var self = this;
		self.loadSelects();
	},
	methods: {
		formatMoney: function(n, c, d, t){
			var c = isNaN(c = Math.abs(c)) ? 2 : c,
				d = d == undefined ? "." : d,
				t = t == undefined ? "," : t,
				s = n < 0 ? "-" : "",
				i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
				j = (j = i.length) > 3 ? j % 3 : 0;

			return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
		},
		loadSelects: function(){
			var self = this;
			
			apiMV.get('/services', {
				params: {
					join: [
						'types_meditions'
					],
					order: 'name,asc',
				}
			})
				.then(function (response) { self.selectOptions.services = response.data.records; })
				.catch(function (error) { console.log(error.response); });
			
			apiMV.get('/types_repeats_services_clients', {
				params: {
					join: [
					],
					order: 'name,asc',
				}
			})
				.then(function (response) { self.selectOptions.types_repeats_services_clients = response.data.records; })
				.catch(function (error) { console.log(error.response); });
		},
		createServicesClients: function() {
			var self = this;
			var post = this.post;
			
			if(post.date_start == '' || post.date_start == 0){ delete post.date_start; };
			if(post.date_end == '' || post.date_end == 0){ delete post.date_end; };
			
			apiMV.post('/services_clients', post).then(function (response) {
				post.id = response.data;
				
				router.push('/Clients/' + self.$route.params.client_id + '/Edit');
			}).catch(function (error) {
				console.log(error.response);
			});
		}
	}
});
// ------------ CLIENTES - FIN ------------------------------------- 

// ------------ CONCEPTOS - INICIO ------------------------------------- 
var Attributes_List = Vue.extend({
	template: '#page-Attributes',
	data: function () {
    return {
		posts: [],
		searchKey: ''
	};
  },
	mounted: function () {
		var self = this;
		apiMV.get('/attributes', {
				params: {
					join: [
						'types_meditions',
					],
				}
			}).then(function (response) {
			self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error.response);
		});
	},
	computed: {
		filteredposts: function () {
			return this.posts.filter(function (post) {
				return this.searchKey=='' || post.name.indexOf(this.searchKey) !== -1;
			},this);
		}
	}
});

var Attributes_View = Vue.extend({
	template: '#view-Attributes',
	data: function () {
		return {
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: {
					id: 0,
					name: '',
					code: '',
				},
				price: 1.0,
			},
		};
	},
	mounted: function () {	
		var self = this;
		self.findAttribute();
	},
	methods: {
		findAttribute: function(){
			var self = this;
			var idAttribute = self.$route.params.attribute_id;
			
			apiMV.get('/attributes/' + idAttribute, {
				params: {
					join: [
						'types_meditions',
					]
				}
			}).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Attributes');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Attributes');
			});
		}
	}
});

var Attributes_Add = Vue.extend({
	template: '#add-Attributes',
	data: function () {
		return {
			selectOptions: {
				types_meditions: [],
			},
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: 0,
				price: 0,
			}
		}
	},
	mounted: function(){
		var self = this;
		
		self.loadSelects();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_meditions', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_meditions = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		createAttribute: function() {
			var post = this.post;
			apiMV.post('/attributes', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Attributes');
		}
	}
});

var Attributes_Edit = Vue.extend({
	template: '#edit-Attributes',
	data: function () {
		return {
			selectOptions: {
				types_meditions: [],
			},
			post: {
				id: 0,
				name: '',
				description: '',
				type_medition: 0,
				price: 0,
			}
		};
	},
	mounted: function () {
		var self = this;
		self.loadSelects();
		self.findAttribute();
	},
	methods: {
		loadSelects: function(){
			var self = this;
			apiMV.get('/types_meditions', {
				params: {
					order: 'name,asc',
				}
			}).then(function (response) {
				self.selectOptions.types_meditions = response.data.records;
			}).catch(function (error) {
				console.log(error.response);
			});
		},
		updateAttribute: function () {
			var post = this.post;
			apiMV.put('/attributes/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Attributes');
		},
		findAttribute: function(){
			var self = this;
			var idAttribute = self.$route.params.attribute_id;
			
			apiMV.get('/attributes/' + idAttribute).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Attributes');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Attributes');
			});
		}
	}
});

var Attributes_Delete = Vue.extend({
	template: '#delete-Attributes',
	data: function () {
		return {
			post: {
				id: 0,
				name: ''
			}
		};
	},
	mounted: function () {
		var self = this;
		self.findAttribute();
	},
	methods: {
		deleteAttribute: function () {
			var post = this.post;
			
			apiMV.delete('/attributes/' + post.id).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error.response);
			});
			router.push('/Attributes');
			location.reload();
		},
		findAttribute: function(){
			var self = this;
			var idAttribute = self.$route.params.attribute_id;
			
			apiMV.get('/attributes/' + idAttribute).then(function (response) {
				if(!response.data.id || !response.data.name)
				{
					router.push('/Attributes');
				}
				else
				{
					self.post = response.data;
				}
			}).catch(function (error) {
				console.log(error.response);
				router.push('/Attributes');
			});
		}
	}
});
// ------------ CONCEPTOS - FIN ------------------------------------- 

var router = new VueRouter({routes:[
	{ path: '/', component: Home, name: 'Home'},
	{ path: '/Settings', component: Settings, name: 'Settings'},
	{ path: '/Profile', component: Profile, name: 'Profile'},
	{ path: '/Help', component: Help, name: 'Help'},
	{ path: '/LogIn', component: LogIn, name: 'LogIn'},
	
	{ path: '/ARL', component: ARL_List, name: 'ARL-List'},
	{ path: '/ARL/:arl_id', component: ARL_View, name: 'ARL-View'},
	{ path: '/ARL/add', component: ARL_Add, name: 'ARL-Add'},
	{ path: '/ARL/:arl_id/edit', component: ARL_Edit, name: 'ARL-Edit'},
	{ path: '/ARL/:arl_id/delete', component: ARL_Delete, name: 'ARL-Delete'},
	
	{ path: '/Vehicles/Categories', component: VH_Cats_List, name: 'VH-Categories-List'},
	{ path: '/Vehicles/Categories/:cat_vh_id', component: VH_Cats_View, name: 'VH-Categories-View'},
	{ path: '/Vehicles/Categories/add', component: VH_Cats_Add, name: 'VH-Categories-Add'},
	{ path: '/Vehicles/Categories/:cat_vh_id/edit', component: VH_Cats_Edit, name: 'VH-Categories-Edit'},
	{ path: '/ehicles/Categories/:cat_vh_id/delete', component: VH_Cats_Delete, name: 'VH-Categories-Delete'},
	
	{ path: '/EPS', component: EPS_List, name: 'EPS-List'},
	{ path: '/EPS/:eps_id', component: EPS_View, name: 'EPS-View'},
	{ path: '/EPS/add', component: EPS_Add, name: 'EPS-Add'},
	{ path: '/EPS/:eps_id/edit', component: EPS_Edit, name: 'EPS-Edit'},
	{ path: '/EPS/:eps_id/delete', component: EPS_Delete, name: 'EPS-Delete'},
	
	{ path: '/Funds/Compensations', component: FundsCompensation_List, name: 'FundsCompensation-List'},
	{ path: '/Funds/Compensations/:fund_compensation_id', component: FundsCompensation_View, name: 'FundsCompensation-View'},
	{ path: '/Funds/Compensations/add', component: FundsCompensation_Add, name: 'FundsCompensation-Add'},
	{ path: '/Funds/Compensations/:fund_compensation_id/edit', component: FundsCompensation_Edit, name: 'FundsCompensation-Edit'},
	{ path: '/Funds/Compensations/:fund_compensation_id/delete', component: FundsCompensation_Delete, name: 'FundsCompensation-Delete'},
	
	{ path: '/Funds/Pension', component: FundsPension_List, name: 'FundsPension-List'},
	{ path: '/Funds/Pension/:fund_pension_id', component: FundsPension_View, name: 'FundsPension-View'},
	{ path: '/Funds/Pension/add', component: FundsPension_Add, name: 'FundsPension-Add'},
	{ path: '/Funds/Pension/:fund_pension_id/edit', component: FundsPension_Edit, name: 'FundsPension-Edit'},
	{ path: '/Funds/Pension/:fund_pension_id/delete', component: FundsPension_Delete, name: 'FundsPension-Delete'},
	
	{ path: '/Funds/Severances', component: FundsSeverances_List, name: 'FundSeverances-List'},
	{ path: '/Funds/Severances/:fund_severances_id', component: FundsSeverances_View, name: 'FundSeverances-View'},
	{ path: '/Funds/Severances/add', component: FundsSeverances_Add, name: 'FundSeverances-Add'},
	{ path: '/Funds/Severances/:fund_severances_id/edit', component: FundsSeverances_Edit, name: 'FundSeverances-Edit'},
	{ path: '/Funds/Severances/:fund_severances_id/delete', component: FundsSeverances_Delete, name: 'FundSeverances-Delete'},
	
	{ path: '/GEO/Departments', component: GEO_Departments_List, name: 'DepartmentsGEO-List'},
	{ path: '/GEO/Departments/:geo_department_id', component: GEO_Departments_View, name: 'DepartmentsGEO-View'},
	{ path: '/GEO/Departments/add', component: GEO_Departments_Add, name: 'DepartmentsGEO-Add'},
	{ path: '/GEO/Departments/:geo_department_id/edit', component: GEO_Departments_Edit, name: 'DepartmentsGEO-Edit'},
	{ path: '/GEO/Departments/:geo_department_id/delete', component: GEO_Departments_Delete, name: 'DepartmentsGEO-Delete'},
	
	{ path: '/GEO/Citys', component: GEO_Citys_List, name: 'CitysGEO-List'},
	{ path: '/GEO/Citys/:geo_city_id', component: GEO_Citys_View, name: 'CitysGEO-View'},
	{ path: '/GEO/Citys/add', component: GEO_Citys_Add, name: 'CitysGEO-Add'},
	{ path: '/GEO/Citys/:geo_city_id/edit', component: GEO_Citys_Edit, name: 'CitysGEO-Edit'},
	{ path: '/GEO/Citys/:geo_city_id/delete', component: GEO_Citys_Delete, name: 'CitysGEO-Delete'},
	
	{ path: '/Status/Employees', component: Status_Employees_List, name: 'StatusEmployees-List'},
	{ path: '/Status/Employees/:status_employee_id', component: Status_Employees_View, name: 'StatusEmployees-View'},
	{ path: '/Status/Employees/add', component: Status_Employees_Add, name: 'StatusEmployees-Add'},
	{ path: '/Status/Employees/:status_employee_id/edit', component: Status_Employees_Edit, name: 'StatusEmployees-Edit'},
	{ path: '/Status/Employees/:status_employee_id/delete', component: Status_Employees_Delete, name: 'StatusEmployees-Delete'},
	
	{ path: '/Status/Services', component: Status_Services_List, name: 'StatusServices-List'},
	{ path: '/Status/Services/:status_service_id', component: Status_Services_View, name: 'StatusServices-View'},
	{ path: '/Status/Services/add', component: Status_Services_Add, name: 'StatusServices-Add'},
	{ path: '/Status/Services/:status_service_id/edit', component: Status_Services_Edit, name: 'StatusServices-Edit'},
	{ path: '/Status/Services/:status_service_id/delete', component: Status_Services_Delete, name: 'StatusServices-Delete'},
	
	{ path: '/Status/Vehicles', component: Status_Vehicles_List, name: 'StatusVehicles-List'},
	{ path: '/Status/Vehicles/:status_vehicle_id', component: Status_Vehicles_View, name: 'StatusVehicles-View'},
	{ path: '/Status/Vehicles/add', component: Status_Vehicles_Add, name: 'StatusVehicles-Add'},
	{ path: '/Status/Vehicles/:status_vehicle_id/edit', component: Status_Vehicles_Edit, name: 'StatusVehicles-Edit'},
	{ path: '/Status/Vehicles/:status_vehicle_id/delete', component: Status_Vehicles_Delete, name: 'StatusVehicles-Delete'},
	
	{ path: '/Types/Bloods', component: Types_Bloods_List, name: 'TypesBloods-List'},
	{ path: '/Types/Bloods/:type_blood_id', component: Types_Bloods_View, name: 'TypesBloods-View'},
	{ path: '/Types/Bloods/add', component: Types_Bloods_Add, name: 'TypesBloods-Add'},
	{ path: '/Types/Bloods/:type_blood_id/edit', component: Types_Bloods_Edit, name: 'TypesBloods-Edit'},
	{ path: '/Types/Bloods/:type_blood_id/delete', component: Types_Bloods_Delete, name: 'TypesBloods-Delete'},

	{ path: '/Types/BloodsRH', component: Types_BloodsRH_List, name: 'TypesBloodsRH-List'},
	{ path: '/Types/BloodsRH/:type_blood_rh_id', component: Types_BloodsRH_View, name: 'TypesBloodsRH-View'},
	{ path: '/Types/BloodsRH/add', component: Types_BloodsRH_Add, name: 'TypesBloodsRH-Add'},
	{ path: '/Types/BloodsRH/:type_blood_rh_id/edit', component: Types_BloodsRH_Edit, name: 'TypesBloodsRH-Edit'},
	{ path: '/Types/BloodsRH/:type_blood_rh_id/delete', component: Types_BloodsRH_Delete, name: 'TypesBloodsRH-Delete'},
	
	{ path: '/Types/Clients', component: Types_Clients_List, name: 'TypesClients-List'},
	{ path: '/Types/Clients/:type_client_id', component: Types_Clients_View, name: 'TypesClients-View'},
	{ path: '/Types/Clients/add', component: Types_Clients_Add, name: 'TypesClients-Add'},
	{ path: '/Types/Clients/:type_client_id/edit', component: Types_Clients_Edit, name: 'TypesClients-Edit'},
	{ path: '/Types/Clients/:type_client_id/delete', component: Types_Clients_Delete, name: 'TypesClients-Delete'},
	
	{ path: '/Types/Contacts', component: Types_Contacts_List, name: 'TypesContacts-List'},
	{ path: '/Types/Contacts/:type_contact_id', component: Types_Contacts_View, name: 'TypesContacts-View'},
	{ path: '/Types/Contacts/add', component: Types_Contacts_Add, name: 'TypesContacts-Add'},
	{ path: '/Types/Contacts/:type_contact_id/edit', component: Types_Contacts_Edit, name: 'TypesContacts-Edit'},
	{ path: '/Types/Contacts/:type_contact_id/delete', component: Types_Contacts_Delete, name: 'TypesContacts-Delete'},
	
	{ path: '/Types/Fuels', component: Types_Fuels_List, name: 'TypesFuels-List'},
	{ path: '/Types/Fuels/:type_fuel_id', component: Types_Fuels_View, name: 'TypesFuels-View'},
	{ path: '/Types/Fuels/add', component: Types_Fuels_Add, name: 'TypesFuels-Add'},
	{ path: '/Types/Fuels/:type_fuel_id/edit', component: Types_Fuels_Edit, name: 'TypesFuels-Edit'},
	{ path: '/Types/Fuels/:type_fuel_id/delete', component: Types_Fuels_Delete, name: 'TypesFuels-Delete'},
	
	{ path: '/Types/Identifications', component: Types_Identifications_List, name: 'TypesIdentifications-List'},
	{ path: '/Types/Identifications/:type_identification_id', component: Types_Identifications_View, name: 'TypesIdentifications-View'},
	{ path: '/Types/Identifications/add', component: Types_Identifications_Add, name: 'TypesIdentifications-Add'},
	{ path: '/Types/Identifications/:type_identification_id/edit', component: Types_Identifications_Edit, name: 'TypesIdentifications-Edit'},
	{ path: '/Types/Identifications/:type_identification_id/delete', component: Types_Identifications_Delete, name: 'TypesIdentifications-Delete'},
	
	{ path: '/Types/Meditions', component: Types_Meditions_List, name: 'TypesMeditions-List'},
	{ path: '/Types/Meditions/:type_medition_id', component: Types_Meditions_View, name: 'TypesMeditions-View'},
	{ path: '/Types/Meditions/add', component: Types_Meditions_Add, name: 'TypesMeditions-Add'},
	{ path: '/Types/Meditions/:type_medition_id/edit', component: Types_Meditions_Edit, name: 'TypesMeditions-Edit'},
	{ path: '/Types/Meditions/:type_medition_id/delete', component: Types_Meditions_Delete, name: 'TypesMeditions-Delete'},
		
	{ path: '/Types/Societys', component: Types_Societys_List, name: 'TypesSocietys-List'},
	{ path: '/Types/Societys/:type_society_id', component: Types_Societys_View, name: 'TypesSocietys-View'},
	{ path: '/Types/Societys/add', component: Types_Societys_Add, name: 'TypesSocietys-Add'},
	{ path: '/Types/Societys/:type_society_id/edit', component: Types_Societys_Edit, name: 'TypesSocietys-Edit'},
	{ path: '/Types/Societys/:type_society_id/delete', component: Types_Societys_Delete, name: 'TypesSocietys-Delete'},
	
	{ path: '/Types/Vehicles', component: Types_Vehicles_List, name: 'TypesVehicles-List'},
	{ path: '/Types/Vehicles/:type_vehicle_id', component: Types_Vehicles_View, name: 'TypesVehicles-View'},
	{ path: '/Types/Vehicles/add', component: Types_Vehicles_Add, name: 'TypesVehicles-Add'},
	{ path: '/Types/Vehicles/:type_vehicle_id/edit', component: Types_Vehicles_Edit, name: 'TypesVehicles-Edit'},
	{ path: '/Types/Vehicles/:type_vehicle_id/delete', component: Types_Vehicles_Delete, name: 'TypesVehicles-Delete'},
	
	{ path: '/Services', component: Services_List, name: 'Services-List'},
	{ path: '/Services/:service_id', component: Services_View, name: 'Services-View'},
	{ path: '/Services/add', component: Services_Add, name: 'Services-Add'},
	{ path: '/Services/:service_id/edit', component: Services_Edit, name: 'Services-Edit'},
	{ path: '/Services/:service_id/delete', component: Services_Delete, name: 'Services-Delete'},
	
	{ path: '/Vehicles', component: Vehicles_List, name: 'Vehicles-List'},
	{ path: '/Vehicles/:vehicle_id', component: Vehicles_View, name: 'Vehicles-View'},
	{ path: '/Vehicles/add', component: Vehicles_Add, name: 'Vehicles-Add'},
	{ path: '/Vehicles/:vehicle_id/edit', component: Vehicles_Edit, name: 'Vehicles-Edit'},
	{ path: '/Vehicles/:vehicle_id/delete', component: Vehicles_Delete, name: 'Vehicles-Delete'},
	{ path: '/Vehicles/:vehicle_id/crew/:crew_vehicle_id/delete', component: Crew_Vehicle_Delete, name: 'includeCrewVehicle-Delete'},
	{ path: '/Vehicles/:vehicle_id/picture/:galery_vehicles_id/delete', component: Galery_Vehicles_Delete, name: 'GaleryVehicles-delete'},
	
	{ path: '/Contacts', component: Contacts_List, name: 'Contacts-List'},
	{ path: '/Contacts/:contact_id', component: Contacts_View, name: 'Contacts-View'},
	{ path: '/Contacts/add', component: Contacts_Add, name: 'Contacts-Add'},
	{ path: '/Contacts/:contact_id/edit', component: Contacts_Edit, name: 'Contacts-Edit'},
	{ path: '/Contacts/:contact_id/delete', component: Contacts_Delete, name: 'Contacts-Delete'},
	
	{ path: '/Types/Charges', component: Types_Charges_List, name: 'TypesCharges-List'},
	{ path: '/Types/Charges/:type_charge_id', component: Types_Charges_View, name: 'TypesCharges-View'},
	{ path: '/Types/Charges/add', component: Types_Charges_Add, name: 'TypesCharges-Add'},
	{ path: '/Types/Charges/:type_charge_id/edit', component: Types_Charges_Edit, name: 'TypesCharges-Edit'},
	{ path: '/Types/Charges/:type_charge_id/delete', component: Types_Charges_Delete, name: 'TypesCharges-Delete'},
	
	{ path: '/Employees', component: Employees_List, name: 'Employees-List'},
	{ path: '/Employees/:employee_id', component: Employees_View, name: 'Employees-View'},
	{ path: '/Employees/add', component: Employees_Add, name: 'Employees-Add'},
	{ path: '/Employees/:employee_id/edit', component: Employees_Edit, name: 'Employees-Edit'},
	{ path: '/Employees/:employee_id/delete', component: Employees_Delete, name: 'Employees-Delete'},
	{ path: '/Employees/:employee_id/Contact/:employee_contact_id/delete', component: Employees_Contacts_Delete, name: 'EmployeesContacts-Delete'},
	{ path: '/Employees/:employee_id/ContractedStaff/:contracted_staff_id/delete', component: ContractedStaff_Delete, name: 'ContractedStaff-Delete'},
	
	{ path: '/Clients', component: Clients_List, name: 'Clients-List'},
	{ path: '/Clients/:client_id', component: Clients_View, name: 'Clients-View'},
	{ path: '/Clients/add', component: Clients_Add, name: 'Clients-Add'},
	{ path: '/Clients/:client_id/edit', component: Clients_Edit, name: 'Clients-Edit'},
	{ path: '/Clients/:client_id/delete', component: Clients_Delete, name: 'Clients-Delete'},
	{ path: '/Clients/:client_id/Contact/:client_contact_id/delete', component: Clients_Contacts_Delete, name: 'ClientsContacts-Delete'},
	{ path: '/Clients/:client_id/Redicated/:redicated_client_id/delete', component: Clients_Redicated_Delete, name: 'RedicatedClients-Delete'},
	{ path: '/Clients/:client_id/Auditors/:auditor_client_id/delete', component: Clients_Auditors_Delete, name: 'ClientsAuditors-Delete'},
	{ path: '/Clients/:client_id/AttributesServices/:client_attribute_service_id/delete', component: Clients_Attributes_Services_Delete, name: 'AttributesServicesClients-Delete'},
	{ path: '/Clients/:client_id/AttributesServices/:client_service_id/add', component: Clients_Attributes_Services_Add, name: 'AttributesServicesClients-Add'},
	{ path: '/Clients/:client_id/Services/add', component: Clients_Services_Add, name: 'ServicesClients-Add'},
	
	{ path: '/Employees/Actions/Performances/', component: Actions_Performance_Employees_List, name: 'Actions_Performance_Employees-List'},
	{ path: '/Employees/Actions/Performances/:action_performance_employee_id', component: Actions_Performance_Employees_View, name: 'Actions_Performance_Employees-View'},
	{ path: '/Employees/Actions/Performances/add', component: Actions_Performance_Employees_Add, name: 'Actions_Performance_Employees-Add'},
	{ path: '/Employees/Actions/Performances/:action_performance_employee_id/edit', component: Actions_Performance_Employees_Edit, name: 'Actions_Performance_Employees-Edit'},
	{ path: '/Employees/Actions/Performances/:action_performance_employee_id/delete', component: Actions_Performance_Employees_Delete, name: 'Actions_Performance_Employees-Delete'},
	
	{ path: '/Attributes', component: Attributes_List, name: 'Attributes-List'},
	{ path: '/Attributes/:attribute_id', component: Attributes_View, name: 'Attributes-View'},
	{ path: '/Attributes/add', component: Attributes_Add, name: 'Attributes-Add'},
	{ path: '/Attributes/:attribute_id/edit', component: Attributes_Edit, name: 'Attributes-Edit'},
	{ path: '/Attributes/:attribute_id/delete', component: Attributes_Delete, name: 'Attributes-Delete'},
	
]});

var appRender = new Vue({
	data: function () {
		return {
			status: null,
			forms: {
				login: {
					nick: '',
					hash: ''
				}
			},
			sessionData: {
				id: 0,
				nick: '',
				hash: '',
			}
		};
	},
	router:router,
	methods: {
		clearSession: function(){
			var self = this;
			delete localStorage.cmrmv;
			location.reload();
		},
		saveSession: function (dataSession) {
			var self = this;
			
			if(!dataSession.id || !dataSession.nick || !dataSession.hash)
			{
				$.notify("Datos incompletos para guardar la sesion.!", "error");
			}
			else
			{
				// localStorage.cmrmv = JSON.stringify(dataSession);
				localStorage.setItem('cmrmv', JSON.stringify(dataSession));
				self.sessionData = dataSession;
				self.checkerSession();
				router.push('/');
			}
		},
		submitLogIn: function(){
			var self = this;
			
			var sessionUserLogin = self.forms.login.nick;
			var sessionPassLogin = self.forms.login.hash;
			
			if(sessionUserLogin.length > 0 && sessionPassLogin.length > 0)
			{
				apiMV.get('/users', {
					params: {
						filter: [
							'nick,eq,' + sessionUserLogin,
							'hash,eq,' + sessionPassLogin,
						]
					}
				}).then(function (response) {
					if(!response.data.records[0])
					{
						$.notify("Datos incorrectos!", "error");
					}
					else
					{
						var userData = response.data.records[0];
						self.saveSession(userData);
					}
				}).catch(function (error) {
				  console.log(error.response);
				});
			}
			else
			{
				$.notify("Completa los campos", "error");
			}
		},
		checkerSession: function(){
			var self = this;
		
			if(!localStorage.cmrmv)
				{
					self.status = 'not_connect';
					router.push('/LogIn');
				}
			else
				{
					self.status = 'connect';						
					self.reloadSession();
				}
			// console.log(self.status);
		},
		reloadSession: function(){
			var self = this;
			
			if(!localStorage.cmrmv)
			{
				$.notify("No se encontro variable para recargar la sesion.", "error");
			}
			else
			{
				// localStorage.cmrmv = JSON.stringify(dataSession);
				var dataSession = JSON.parse(localStorage.cmrmv)
				self.sessionData = dataSession;
			}
		}
	},
	created: function () {
		var self = this;
		self.checkerSession();
		
		var azul = setInterval(function(){
			self.checkerSession();
		}, 3000);
		
	},
}).$mount('#app');
// ------------------------- 