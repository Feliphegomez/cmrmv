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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/ARL');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Vehicles/Categories');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/EPS');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
			console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Funds/Compensations');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
			console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Funds/Pension');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
			console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Funds/Severances');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/GEO/Departments');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
				console.log(error);
			});
		},
		createDepartmentGEO: function() {
			var post = this.post;
			apiMV.post('/geo_citys', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/GEO/Citys');
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
				console.log(error);
			});
		},
		updateCityGEO: function () {
			var post = this.post;
			apiMV.put('/geo_citys/' + post.id, post).then(function (response) {
				console.log(response.data);
			}).catch(function (error) {
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Status/Employees');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Status/Services');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Status/Vehicles');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/Bloods');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/BloodsRH');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/Clients');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/Contacts');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/Fuels');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				console.log(error);
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
			}).catch(function (error) {
				console.log(error);
			});
			router.push('/Types/Identifications');
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
				console.log(error);
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
		console.log(error);
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
				title: '',
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
				console.log(error);
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
				title: '',
			}
		}
	},
	methods: {
		createTypesMedition: function() {
			var post = this.post;
			apiMV.post('/types_meditions', post).then(function (response) {
				post.id = response.data;
			}).catch(function (error) {
				console.log(error);
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
				title: '',
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
				console.log(error);
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
				console.log(error);
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
				title: '',
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
				console.log(error);
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
				console.log(error);
				router.push('/Types/Meditions');
			});
		}
	}
});
// ------------ TIPOS - MEDICIONES FIN ------------------------------------- 



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
				  console.log(error);
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