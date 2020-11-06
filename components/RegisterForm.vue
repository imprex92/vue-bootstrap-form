<template>
	<div class="container p-3">
		<div class="container form-container m-auto">
			<div v-show="registerSuccessful" class="">
				<p class="successful-message">Thanks for registering. We also sent you a confirmation by email</p>
			</div>
			<div v-show="showForm">
				<div class="">
					<p class="form-section-description">Information about yourself and company name</p>
					<hr>
				</div>
			<form>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="supplierName">Supplier name</label>
						<input autocomplete="organization" v-model.lazy="userInfo.supplierName" type="text" class="form-control" id="supplierName">
					</div>
				</div>
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
				</div>
			<div v-if="userInfo.type !== 'Choose...'">
				<div>
					<p class="form-section-description">Information about <span v-if="userInfo.supplierName === null || userInfo.supplierName === ''">your company</span><span v-else>{{userInfo.supplierName}}</span></p>
					<hr>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
					
					</div>
					<div class="message is-success" v-show="userInfo.address">
                <div class="message-body">{{ userInfo.address }}</div>
            </div>
				</div>
						<hr>
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
					<!-- <div class="form-group">
						<label for="inputAddress2">Address 2</label>
						<input autocomplete="address-line2" type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
					</div> -->
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
						<textarea v-model="userInfo.comments" name="" id="" class="form-control" rows="3" placeholder="Enter comment or dates the offer is available"></textarea>
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<div class="custom-file">
							<input type="file" ref="myFiles" @change="previewFiles" class="custom-file-input" id="customFileLangHTML file" accept="application/pdf">
							<label class="custom-file-label" for="customFileLangHTML" data-browse="Select file"><span v-if="this.userInfo.filePDF === null">Select a PDF file</span><span v-else>File selected!</span></label>
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
					<div v-if="userInfo.type !== 'Wholesaler' && userInfo.type !== 'Choose...' && userInfo.type !== 'Hotel'" class="form-group col-md-3">
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
						<label for="inputRooms">Rooms available</label>
						<input v-model.number="userInfo.roomsAvailable" type="number" class="form-control" id="inputRooms" placeholder="Enter number">
					</div>
				</div>
					<client-only>
						<!-- TODO -->
				<div v-if="userInfo.type === 'Bus company'">
					<div class="form-row bus-section mb-3 mt-3 col-md-12">							
						<div class="form-group col-md-4">
							<label for="seats-slider">Seats</label>
							<vue-slider id="seats-slider" class="col-md-12" ref="slider" v-model="userInfo.busSettings.busSeats" v-bind="sliderOptions" :tooltipFormatter="'{value}'" ></vue-slider>
							<p>{{ userInfo.priceRange }}</p>
						</div>
						<div class="form-group col-md-4">
							<label for="price-slider">Daily price range</label>
							<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.busSettings.busPrice" v-bind="sliderOptions" :min="0" :max="1000" :interval="10" ></vue-slider>
							<p>{{ userInfo.priceRange }}</p>
						</div>											
					</div>
				</div>
					</client-only>

				<div v-if="userInfo.type === 'Wholesaler'" class="from-row">
					<div class="form-row col-md-12">
						<div class="form-group col-md-4">
							<label for="price-slider">Enter price range for groups</label>
							<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.wholePriceRange" v-bind="sliderOptions" :interval="10" :min="0" :max="2000"></vue-slider>
							<p>{{ userInfo.priceRange }}</p>
						</div>
					</div>
				</div>
				<div v-if="userInfo.type === 'Hotel'" class="from-row">
					<div class="form-row col-md-12">
						<div class="form-group col-md-4">
							<label for="price-slider">Enter price range for groups</label>
							<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.hotelPriceRange" v-bind="sliderOptions" :min="10" :max="150"></vue-slider>
							<p>{{ userInfo.priceRange }}</p>
						</div>
					</div>
				</div>
				<div v-if="userInfo.type === 'Wholesaler'" class="form-row wholeseller-section">
					<div class="form-group col-md-6">
						<client-only>
							<label class="typo__label" for="ajax">Countries working with</label>
							<multiselect v-model="userInfo.selectedCountries" id="ajax" label="name" track-by="code" placeholder="Type to search for a country" open-direction="bottom" :options="countries" :multiple="true" :searchable="true" :loading="isLoading" :internal-search="false" :clear-on-select="false" :close-on-select="false" :options-limit="300" :limit="3" :limit-text="limitText" :max-height="600" :show-no-results="false" :hide-selected="true" @search-change="asyncFind">
								<template slot="tag" slot-scope="{ option, remove }"><span class="custom__tag"><span>{{ option.name }}</span><span class="custom__remove" @click="remove(option)">❌</span></span></template>
								<template slot="clear" slot-scope="props">
								<div class="multiselect__clear" v-if="userInfo.selectedCountries.length" @mousedown.prevent.stop="clearAll(props.search)"></div>
								</template><span slot="noResult">Oops! No elements found. Consider changing the search query.</span>
							</multiselect>
							<pre class="language-json"><code>{{ userInfo.selectedCountries  }}</code></pre>
						</client-only>
					</div>
				</div>
				<!-- <div class="form-row">
					<div class="form-group col-md-6">
						<label for="create-userName">Enter E-mail</label>
						<input autocomplete="password" v-model="userInfo.email" type="text" class="form-control" id="create-userName">
					</div>
				</div> -->
  			<button @click.prevent="onSubmit" type="submit" class="btn btn-primary col-md-2 mt-2 mb-3">Submit</button>
			</div>
			</form>
			
			</div>
			<!-- <div>{{userInfo}}</div> -->
			<div>
				<!-- <multiselect v-model="multiselectValue" :options="multiselectOptions"></multiselect> -->
				
			</div>
		</div>
	</div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
import VueGoogleAutocomplete from 'vue-google-autocomplete'
import 'vue-slider-component/dist-css/vue-slider-component.css'
import 'vue-slider-component/theme/default.css'
import "vue-multiselect/dist/vue-multiselect.min.css"
import { ajaxFindCountry } from './countriesApi'
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
			showForm: true,
			userInfo: {
				address: { route: null, locality: null, administrative_area_level_1: null, country: null, postal_code: null, latitude: null, longitude: null },
				supplierName: null,
				comments: null,
				maxTravelers: 'Choose...',
				roomsAvailable: null,
				hotelPriceRange: [10, 150],
				wholePriceRange: [0, 2000],
				type: 'Choose...',
				selectedCountries: [],
				busSettings: { busSeats: [10, 100], busPrice: [0, 1000] },	
				offerDate: null,
				stars: 'Choose...',
				filePDF: null,
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
				this.userInfo = Response.data.data
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
				let findCity = placeResultData.address_components.find(el => el.types.includes("postal_town"));
				this.userInfo.address.locality = findCity.long_name
				console.log('this is the found city ', findCity.long_name );
			}

			//finns locality i addressdat?
			//om ej gå igenom placeresultdata och leta efter sublocality
			//skapa adressdata.locality = sublocality
    	},
		created: function (){
			console.log('Goodmorning');
		},
		onSubmit(){
			console.log(this.userInfo);
			this.$axios.post('https://api.rolfsbuss.se/rolfsapi/v2/web/sv/supplier-register', this.userInfo)
				.then((Response) => {
					console.log(Response)
					// alert('Successful!')
					this.showForm = false
					this.registerSuccessful = true
				})
				.catch((err) => {
					console.log(err)
					alert('Something went wrong ', err)
				})
		},
		previewFiles(){
			this.userInfo.filePDF = this.$refs.myFiles.files[0]
			console.log(this.$refs.myFiles.files[0]);
		},
		limitText (count) {
      return `and ${count} other countries`
    },
    asyncFind (query) {
      this.isLoading = true
      ajaxFindCountry(query).then(response => {
        this.countries = response
        this.isLoading = false
      })
    },
    clearAll () {
      this.selectedCountries = []
    }
  }
  	
}
</script>

<style lang="css" scoped>
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
</style> 