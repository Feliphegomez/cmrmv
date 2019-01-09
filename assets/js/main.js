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
		/*
		api.get('/contacts').then(function (response) {
			posts = self.posts = response.data.records;
		}).catch(function (error) {
			console.log(error);
		});
		*/
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