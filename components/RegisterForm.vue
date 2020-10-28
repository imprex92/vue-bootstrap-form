<template>
	<div class="container p-3">
		<div class="container form-container m-auto">
			<button @click="modeChange()" class="btn btn-primary mb-3">Already a user</button>
			<div v-show="!alreadyUser">
			<form @submit.prevent="onSubmit">
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="fName">Firstname</label>
						<input autocomplete="name" v-model="userInfo.fName" type="text" class="form-control" id="fName">
					</div>
					<div class="form-group col-md-4">
						<label for="lName">Lastname</label>
						<input autocomplete="family-name" v-model="userInfo.lName" type="text" class="form-control" id="lName">
					</div>
					<div class="form-group col-md-4">
						<label for="supplierName">Supplier name</label>
						<input autocomplete="organization" v-model="userInfo.supplierName" type="text" class="form-control" id="supplierName">
					</div>
				</div>
					<div class="form-group">
						<label for="inputAddress">Address</label>
						<input autocomplete="address-line1" v-model="userInfo.address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
					</div>
					<div class="form-group">
						<label for="inputAddress2">Address 2</label>
						<input autocomplete="address-line2" type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
					</div>
				<div class="form-row">
					<div class="form-group col-md-5">
						<label for="inputCity">City</label>
						<input autocomplete="address-level2" v-model="userInfo.city" type="text" class="form-control" id="inputCity">
					</div>
					<!-- <div class="form-group col-md-4">
						<label for="inputState">State</label>
						<select autocomplete="address-level1" id="inputState" class="form-control">
							<option selected>Choose...</option>
							<option>...</option>
						</select>
					</div> -->
					<div class="form-group col-md-2">
						<label for="inputZip">Zip</label>
						<input autocomplete="postal-code" v-model="userInfo.zip" type="text" class="form-control" id="inputZip">
					</div>
					<div class="form-group col-md-2">
						<label for="inputTel">Telephone</label>
						<input v-model.number="userInfo.tel" maxlength="14" autocomplete="tel" class="form-control" type="tel" placeholder="1-(555)-555-5555" id="inputTel" number>
					</div>
				</div>
				<!-- <div class="form-group">
					<div class="form-check">
					<input class="form-check-input" type="checkbox" id="gridCheck">
					<label class="form-check-label" for="gridCheck">
						Check me out
					</label>
					</div>
				</div> -->
				<div class="form-row">
					<div class="form-group col-md-2">
						<label for="inputType">Type</label>
						<select v-model="userInfo.type" id="inputType" class="form-control">
							<option selected>Choose...</option>
							<option>Hotel</option>
							<option>Excursion provider</option>
							<option>Bus company</option>
							<option>Restaurant</option>
							<option>Wholesaler</option>
						</select>
					</div>
					<div v-if="userInfo.type === 'Hotel'" class="form-group col-md-2">
						<label for="inputStars">Stars</label>
						<select v-model="userInfo.stars" id="inputStars" class="form-control">
							<option selected>Choose...</option>
							<option>1 Star</option>
							<option>2 Stars</option>
							<option>3 Stars</option>
							<option>4 Stars</option>
							<option>5 Stars</option>
							<option>6 Stars</option>
							<option>7 Stars</option>
						</select>
					</div>
					<div v-if="userInfo.type === 'Hotel'" class="form-group col-md-3">
						<label for="inputStars">Max amount of travelers</label>
						<select v-model="userInfo.maxTravelers" id="inputStars" class="form-control">
							<option selected>Choose...</option>
							<option>10 travelers</option>
							<option>20 travelers</option>
							<option>30 travelers</option>
							<option>40 travelers</option>
							<option>50 travelers</option>
							<option>60 travelers</option>
							<option>70 travelers</option>
							<option>80 travelers</option>
							<option>90 travelers</option>
							<option>90+ travelers</option>
						</select>
					</div>
					<div class="form-row col-md-12">
					<div class="form-group col-md-4">
						<!-- <label for="formControlRange">Example Range input</label>
						<input type="range" class="form-control-range" id="formControlRange"> -->
						<label for="price-slider">Enter min - max price</label>
						<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.priceRange" v-bind="options"></vue-slider>
						<p>{{ userInfo.priceRange }}</p>
					</div>
					</div>
				</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<div class="custom-file">
								<input type="file" ref="myFiles" @change="previewFiles" class="custom-file-input" id="customFileLangHTML file" accept="application/pdf">
								<label class="custom-file-label" for="customFileLangHTML" data-browse="Select file"><span v-if="this.$refs.myFiles === null">File selected!</span><span v-else>Select a PDF file</span></label>
							</div>
						</div>
					</div>
					<div class="form-row">
						<div class="form-group col-md-6">
							<label for="create-userName">Enter E-mail</label>
							<input autocomplete="password" v-model="userInfo.email" type="text" class="form-control" id="create-userName">
						</div>
						<div class="form-group col-md-6">
							<label for="create-password">Create password</label>
							<input autocomplete="current-password" v-model="userInfo.password" type="password" class="form-control" id="create-password">
						</div>
					</div>
					<div class="form-row">
						<!-- <client-only>
						<div v-if="field1" class="alert alert-info">
    						Current Value: {{field1}}
						</div>
						<place-autocomplete-field v-model="field1" placeholder="Enter an an address, zipcode, or location" label="Address" name="field1" api-key="AIzaSyCb6j872yUQWkJEo7o5IYTJsyc3qVQjbqE"></place-autocomplete-field></client-only> -->
					</div>
  			<button type="submit" class="btn btn-primary col-md-2 mt-2">Submit</button>
			</form>
			</div>
			<div v-show="alreadyUser">
			<form @submit.prevent="onSubmit">
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="userName">E-mail</label>
						<input autocomplete="password" v-model="userInfo.email" type="text" class="form-control" id="userName">
					</div>
					<div class="form-group col-md-4">
						<label for="password">Password</label>
						<input autocomplete="current-password" v-model="userInfo.password" type="password" class="form-control" id="password">
					</div>
				<button type="submit" class="btn btn-primary col-md-2 login-btn">Log in</button>
				</div>
			</form>
			</div>
			<div>{{userInfo}}</div>
			<client-only>
			<place-autocomplete-field
    v-model="field2"
    label="Address"
    name="field2"
    api-key="AIzaSyAhSv9zWvisiTXRPRw6K8AE0DCmrRMpQcU"
    placeholder="Enter an an address, zipcode, or location"
    v-place-autofill:street="street"
    v-place-autofill:city="city"
    v-place-autofill:state="state"
    v-place-autofill:zipcode="zip"
    v-place-autofill:country="country">
</place-autocomplete-field>

<div class="card w-30">
    <div class="card-body">
        <p><b class="card-title">Enter an address above and watch the fields below get auto-filled...</b></p>

        <p>
            <label>Street</label><br>
            <input name="street" v-model="street" class="form-control"/>
        </p>
        <p>
            <label>Addr2</label><br>
            <input name="addr2" v-model="addr2" class="form-control"/>
        </p>
        <p>
            <label>City</label><br>
            <input name="city" v-model="city" class="form-control"/>
        </p>
        <p>
            <label>State</label><br>
            <input name="state" v-model="state" class="form-control"/>
        </p>
        <p>
            <label>Zip</label><br>
            <input name="zip" v-model="zip" class="form-control"/>
        </p>
        <p>
            <label>United States</label><br>
            <input name="country" v-model="country" class="form-control"/>
        </p>
    </div>
</div>
</client-only>
		</div>
	</div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
export default {
	 head: {
    script: [
      {
        src: 'https://www.jsdelivr.com/package/npm/vue-place-autocomplete'
      }
    ],
    link: [
      {
        rel: 'text/html',
        href: 'https://www.jsdelivr.com/package/npm/vue-place-autocomplete'
      }
    ]
  },
	components: {
		VueSlider
	},
 	data() {
		return {
			street: '',
			addr2: '',
			city: '',
			state: '',
			zip: '',
			country: '',
			field1: '',
			field2: '',
			alreadyUser: false,
			userInfo: {
				fName: null,
				lName: null,
				supplierName: null,
				address: null,
				city: null,
				zip: null,
				geo: { long: null, lat: null },
				maxTravelers: 'Choose...',
				priceRange: [10, 42],
				type: 'Choose...',
				offerDate: null,
				stars: 'Choose...',
				filePDF: null,
				tel: null,
				email: null,
				password: null
			},
			// slider
			priceRange: [0, 50],
			options: {
				dotSize: 14,
				width: 'auto',
				height: 4,
				contained: false,
				direction: 'ltr',
				data: null,
				dataLabel: 'label',
				dataValue: 'value',
				min: 0,
				max: 50,
				interval: 1,
				disabled: false,
				clickable: true,
				duration: 0.5,
				adsorb: false,
				lazy: false,
				tooltip: 'active',
				tooltipPlacement: 'top',
				tooltipFormatter: '{value}€',
				useKeyboard: false,
				keydownHook: null,
				dragOnClick: false,
				enableCross: false,
				fixed: false,
				minRange: void 0,
				maxRange: void 0,
				order: true,
				marks: false,
				dotOptions: void 0,
				dotAttrs: void 0,
				process: true,
				dotStyle: void 0,
				railStyle: void 0,
				processStyle: void 0,
				tooltipStyle: void 0,
				stepStyle: void 0,
				stepActiveStyle: void 0,
				labelStyle: void 0,
				labelActiveStyle: void 0,
      		}
		}
  },
  created() {
  },
  	methods: {
		// create () {
		//   this.$emit('create', { id: this.titleOfNewToDo, title: this.titleOfNewToDo})
		//   this.titleOfNewToDo = ''
		// }
		created: function (){
			
		},
		onSubmit(){
			console.log(this.userInfo);
			this.$axios.post('api/api/api', this.userInfo)
				.then((Response) => {console.log(Response)})
				.catch((err) => {console.log(err)})
		},
		previewFiles(){
			this.userInfo.filePDF = this.$refs.myFiles.files[0]
			console.log(this.$refs.myFiles.files[0]);
		},
		modeChange(){
			this.alreadyUser = !this.alreadyUser
		}
  	},
}
</script>

<style lang="css" scoped>
@media (max-width: 768px){
	.login-btn{
		height: 38px;
		width: 126px;
		margin-top: auto;
		margin-left: auto;
		margin-right: auto;
	}
}
@media (min-width: 768px){
	.login-btn{
		height: 38px;
		width: 126px;
		margin-top: 31px;
		margin-left: auto;
		margin-right: auto;
	}
}
</style>