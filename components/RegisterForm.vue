<template>	
	<div class="container form-container m-auto">
		
			<p v-show="registerSuccessful" class="successful-message">Thanks for registering. A confirmation has been sent to your e-mail.</p>
			<p v-show="registerError" class="successful-message">Something went wrong! Please try again later.</p>
	
		
		<div v-show="showForm">
			<input v-model="userInfo.id" type="hidden" id="custId" name="custId" value="">
			<div class="">
				<p class="form-section-description">Information about your company</p>
				<hr>
			</div>
		<form>
			<div class="form-row">
				<div class="form-group col-md-4">
						<label for="supplierName">Supplier name</label>
						<input :class="status($v.userInfo.supplierName)" v-model.lazy.trim="$v.userInfo.supplierName.$model" autocomplete="organization" type="text" class="form-control" id="supplierName">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-3">
					
					<label for="inputType">Type</label>
					<select v-model="userInfo.type" id="inputType" class="form-control">
						<option selected>Choose...</option>
						<option>Hotel</option>
						<option>Excursion provider</option>
						<option>Bus company</option>
						<option>Restaurant</option>
						<option>Wholesaler</option>
						<option>DMC</option>
						<option>Local guide</option>
					</select>
				</div>
			</div>
		<div v-if="userInfo.type !== 'Choose...'">
			<div>
				<p class="form-section-description">Information about <span v-if="userInfo.supplierName === null || userInfo.supplierName === ''">your company</span><span v-else>{{userInfo.supplierName}}</span></p>
				<hr>
			</div>
			<div class="form-group">
				<label for="map">Address</label>
				<client-only>
					<vue-google-autocomplete
					id="map"
					autocomplete="address-line1"
					ref="userInfo.address"
					classname="form-control"
					placeholder="Start typing"
					v-on:placechanged="getAddressData"
					v-model="userInfo.address.route">
					</vue-google-autocomplete>
				</client-only>
			</div>
			<div class="form-row">
				<div class="form-group col-md-3">
					<label for="inputCity">City</label>
					<input autocomplete="address-level2" v-model="userInfo.address.locality" type="text" class="form-control" id="inputCity">
				</div>
				<div class="form-group col-md-3">
					<label for="inputState">State</label>
					<input autocomplete="address-level1" v-model="userInfo.address.administrative_area_level_1" type="text" class="form-control" id="inputState">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-3">
					<label for="inputZip">Zip</label>
					<input autocomplete="postal-code" v-model="userInfo.address.postal_code" type="text" class="form-control" id="inputZip">
				</div>
				<div class="form-group col-md-3">
					<label for="inputCountry">Country</label>
					<input autocomplete="country-name" v-model="userInfo.address.country" type="text" class="form-control" id="inputCountry">
				</div>
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<textarea :class="status($v.userInfo.comments)" v-model.trim="$v.userInfo.comments.$model" name="" id="" class="form-control" rows="3" placeholder="Specify your subsidies for tour operators. E.g. rewards, free nights, free meals, and other volume discounts."></textarea>
				</div>
			</div>
			<div v-if="userInfo.type !== 'Local guide'" class="form-row">
				<div class="form-group col-md-6">
					<div class="custom-file">
						<input type="file" ref="myFiles" @change="previewFiles" class="custom-file-input" id="customFileLangHTML file" accept="application/pdf">
						<label class="custom-file-label" for="customFileLangHTML" data-browse="Select file"><span v-if="this.userInfo.filePDF === null">Sales prospect as PDF (optional)</span><span v-else>File selected!</span></label>
					</div>
				</div>
			</div>
			<div class="form-row hotel-section">
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
				<div v-if="userInfo.type !== 'Wholesaler' && userInfo.type !== 'Choose...' && userInfo.type !== 'Hotel' && userInfo.type !== 'DMC' && userInfo.type !== 'Local guide'" class="form-group col-md-3">
					<label for="inputTravelers">Max travelers</label>
					<select v-model="userInfo.maxTravelers" id="inputTravelers" class="form-control">
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
				<div v-if="userInfo.type === 'Hotel'" class="form-group col-md-2">
					<label for="inputRooms">Rooms</label>
					<input v-model.number="userInfo.roomsAvailable" type="number" class="form-control" id="inputRooms" placeholder="Enter number">
				</div>
			</div>
			<client-only>
				<div v-if="userInfo.type === 'Bus company'">
					<div class="form-row bus-section mb-3 mt-3 col-md-12">							
						<div class="form-group col-md-4 pr-3">
							<label for="seats-slider">Bus size (seats min/max)</label>
							<vue-slider id="seats-slider" class="col-md-12" ref="slider" v-model="userInfo.busSettings.busSeats" v-bind="sliderOptions" :tooltipFormatter="'{value}'" :process-style="{ backgroundColor: '#253551' }" :tooltip-style="{ backgroundColor: '#253551', borderColor: '#253551' }"></vue-slider>
						</div>
						<div class="form-group col-md-4 ml-3">
							<label for="price-slider">Daily price range</label>
							<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.busSettings.busPrice" v-bind="sliderOptions" :min="0" :max="1000" :interval="10" :process-style="{ backgroundColor: '#253551' }" :tooltip-style="{ backgroundColor: '#253551', borderColor: '#253551' }"></vue-slider>
						</div>											
					</div>
				</div>
			</client-only>
			<div v-if="userInfo.type === 'Wholesaler' || userInfo.type === 'DMC'" class="from-row">
				<div class="form-row col-md-12">
					<div class="form-group col-md-4">
						<label for="price-slider">Enter price range for groups per person</label>
						<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.wholePriceRange" v-bind="sliderOptions" :interval="10" :min="0" :max="2000" :process-style="{ backgroundColor: '#253551' }" :tooltip-style="{ backgroundColor: '#253551', borderColor: '#253551' }"></vue-slider>
					</div>
				</div>
			</div>
			<div v-if="userInfo.type === 'Hotel'" class="from-row">
				<div class="form-row col-md-12">
					<div class="form-group col-md-4">
						<label for="price-slider">Enter price range for groups</label>
						<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.hotelPriceRange" v-bind="sliderOptions" :min="10" :max="150" :process-style="{ backgroundColor: '#253551' }" :tooltip-style="{ backgroundColor: '#253551', borderColor: '#253551' }"></vue-slider>
					</div>
				</div>
			</div>
			<div v-if="userInfo.type === 'Wholesaler' || userInfo.type === 'DMC' || userInfo.type === 'Local guide'" class="mt-3 form-row wholeseller-section">
				<div class="form-group col-md-6">
					<label class="typo__label" for="inputActiveMarkets">Active markets</label>
					<textarea v-model="userInfo.activeMarkets" id="inputActiveMarkets" class="form-control" rows="3" placeholder="Specify countries or regions."></textarea>
				</div>
			</div>
			<div class="">
				<p class="form-section-description">Contact details</p>
				<hr>
			</div>
			<div class="form-row">
				<div class="form-group col-md-3">
					<label for="inputName">Name</label>
					<input autocomplete="given-name" :class="status($v.userInfo.name)" v-model.trim="$v.userInfo.name.$model" type="text" class="form-control" id="inputName">
				</div>
				<div class="form-group col-md-3">
					<label for="inputTel">Phone</label>
					<input autocomplete="tel" :class="status($v.userInfo.phone)" v-model.lazy.trim="$v.userInfo.phone.$model" type="text" class="form-control" id="inputTel">
				</div>					
			</div>
			<div class="form-row">
				<div class="form-group col-md-6">
					<label for="inputEmail">Enter E-mail</label>
					<input autocomplete="email" :class="status($v.userInfo.email)" v-model.lazy.trim="$v.userInfo.email.$model" type="text" class="form-control" id="inputEmail">
				</div>
			</div>
		<button @click.prevent="onSubmit" type="submit" class="btn btn-primary col-md-2 mt-2 mb-3">Submit</button>
		</div>
		</form>		
		</div>
	</div>	
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
	 head: {
  	},
	components: {
		VueSlider,
		VueGoogleAutocomplete: () => import('vue-google-autocomplete')
	},
 	data() {
		return {
			userExisting: true,
			userID: null,
			countries: [],
			isLoading: false,
			registerSuccessful: false,
			registerError: false,
			showForm: true,
			userInfo: {
				id: null,
				address: { route: null, locality: null, administrative_area_level_1: null, country: null, postal_code: null, latitude: null, longitude: null },
				supplierName: null,
				comments: null,
				maxTravelers: 'Choose...',
				roomsAvailable: null,
				hotelPriceRange: [10, 150],
				wholePriceRange: [0, 2000],
				type: 'Choose...',
				activeMarkets: null,
				busSettings: { busSeats: [10, 100], busPrice: [0, 1000] },	
				stars: 'Choose...',
				filePDF: null,
				email: null,
				name: null,
				phone: null
			},
			// slider
			sliderOptions: {
				dotSize: 14,
				width: 'auto',
				height: 4,
				contained: false,
				direction: 'ltr',
				data: null,
				dataLabel: 'label',
				dataValue: 'value',
				disabled: false,
				clickable: true,
				duration: 0.5,
				adsorb: false,
				lazy: false,
				tooltip: 'always',
				tooltipPlacement: 'bottom',
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
				// min: 10,
				// max: 150,
				// interval: 1,
			},
		}
  },
					validations:{
						userInfo: {
							supplierName: {required},
							comments: {required},
							email: {required, email},
							name: {required, min: minLength(2)},
							phone: {required},
						}
					},
mounted() {
	console.log('Goodmorning');
	if(this.$route.query.id){
		console.log('id found! ', this.$route.query.id);
		this.userID = this.$route.query.id
		this.$axios.get(`https://api.rolfsbuss.se/rolfsapi/v2/web/sv/supplier-get/${this.userID}`)
			.then((Response) => {
				console.log(Response)
				console.log(`Successfully found user ${this.userID}!`)
				if(Response.data.success){
					console.log(Response.data.data);
					Response.data.data.id = this.userID
					this.userInfo = Response.data.data
					// document.getElementById('custId').value = this.userID
				console.log(this.userInfo);
				}else{
					console.log('something is wrong');
					alert('User does not exist!');
					this.userExisting = false
					}
			})
			.catch((err) => {
				console.log(err)
				console.log('User does not exist ', err)
			})
	}else{
		console.log('User does not exist! ', this.$route.query.id);
	}
  },
  	methods: {
		  /**
        * When the location found
        * @param {Object} addressData Data of the found location
        * @param {Object} placeResultData PlaceResult object
        * @param {String} id Input container ID
        */
	   
		getAddressData(addressData, placeResultData, id) {
			if(addressData.locality){
				console.log('locality finns redan mer!');
				this.userInfo.address = addressData
				console.log(addressData);
				console.log(placeResultData);
				console.log(this.userInfo.address);
				console.log(this.userInfo.address.country);
			}
			else{

				console.log('locality finns inte, tar från plan B');
				this.userInfo.address = addressData
				console.log(addressData);
				console.log(placeResultData);
				console.log(this.userInfo.address);
				console.log(this.userInfo.address.country);
				if(placeResultData.address_components.find(el => el.types.includes("postal_town"))){
					console.log('inne i else och if');
				let findCity = placeResultData.address_components.find(el => el.types.includes("postal_town"));
				this.userInfo.address.locality = findCity.long_name
				console.log('this is the found city ', findCity.long_name);
				}else{
					console.log('inne i failsafe');
					this.userInfo.address = addressData
				}
			}

			//finns locality i addressdat?
			//om ej gå igenom placeresultdata och leta efter sublocality
			//skapa adressdata.locality = sublocality
    	},
		created: function (){
			console.log('Goodmorning');
		},
		onSubmit(){
			// Validation check
			this.$v.userInfo.$touch();
			console.log(this.$v.userInfo.$error);
			if(!this.$v.userInfo.$error){
				console.log('skickar skiten!');
				console.log(this.userInfo);
				console.log(this.userID);
				this.$axios.post('https://api.rolfsbuss.se/rolfsapi/v2/web/sv/supplier-register', this.userInfo)
					.then((Response) => {
						if(Response.data.success){
						console.log('response from server', Response)
						this.showForm = false
						this.registerSuccessful = true
						}else if(!Response.data.success){
							console.log('response from server', Response)
							this.showForm = false
							this.registerError = true
						}
					})
					.catch((err) => {
						console.log(err)
						alert('Something went wrong ', err)
					})
				}else{
					console.log('något har gott åt helvete');
				}
		},
		previewFiles(){
			this.userInfo.filePDF = this.$refs.myFiles.files[0]
			console.log(this.$refs.myFiles.files[0]);
		},
		status(validation) {
    	return {
      	error: validation.$error,
        dirty: validation.$dirty
      }
    }
  }
  	
}
</script>

<style lang="css" scoped>
button{
	background-color: #253551;
	color: #fff;
}
*{
	font-family: 'Poppins', sans-serif;
}
.successful-message{
	text-align: center;
	margin: auto;
	font-weight: bold;
	padding-top: 50vh;
}
.form-section-description{
  font-size: 1.5em;
  margin-top: 0.83em;
  margin-bottom: 0;
  margin-left: 0;
  margin-right: 0;
  font-weight: bold;
}
hr{
	border-top: 3px solid #000;
	border-radius: 5px;
	margin-top: 0;
}
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
.remove-button{
	height: 1em;
	cursor: pointer;
}
.error{
	border-color: red;
  background: #FDD;
}
</style> 