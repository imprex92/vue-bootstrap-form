<template>
  <p>hello user <i>{{userID}}</i></p>
</template>

<script>
export default {
	// data(){
	// 	return {
	// 		userID: null,
	// 		existingUserData: null,
	// 	}
	// },
	// created(){
	// 	console.log(this.$route.path)
	// 	console.log('Goodmorning');
	// 	// if(this.$route.path === '/suplier-get/*')
	// 	// console.log(this.$route.path)
	// 	if(this.$route.params.id){
	// 		console.log('id found ', this.$route.params.id);
	// 		this.userID = this.$route.params.id
	// 		this.$axios.get(`https://api.rolfsbuss.se/rolfsapi/v2/web/sv/supplier-get/${this.userID}`)
	// 			.then((Response) => {
	// 				console.log(Response)
	// 				console.log(`Successfully found user ${this.userID}!`)
	// 				this.existingUserData = Response.data.data
	// 				console.log(this.existingUserData);
	// 			})
	// 			.catch((err) => {
	// 				console.log(err)
	// 				console.log('User does not exist ', err)
	// 			})
	// 	}else{
	// 		console.log('No id found ', this.$route.params.id);
	// 	}
	// }
}
</script>

<style>

</style>