require('./bootstrap');
import Hello from './components/Hello';

const app = new Vue({
	el: "#app",
	components: {
		hello: Hello
	}
});

if(DEVELOPMENT) {
	if(module.hot) {
		module.hot.accept();
	}
}