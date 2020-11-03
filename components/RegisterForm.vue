<template>
	<div class="container p-3">
		<div class="container form-container m-auto">
			<button @click="modeChange" class="btn btn-primary mb-3"><span v-if="!alreadyUser">Already a user</span><span v-else>Register</span></button>
			<div v-show="!alreadyUser">
				<div class="">
					<p class="form-section-description">Information about yourself and company name</p>
					<hr>
				</div>
			<form>
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
						<input autocomplete="organization" v-model.lazy="userInfo.supplierName" type="text" class="form-control" id="supplierName">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-4">
						<label for="inputTel">Telephone</label>
						<input v-model.number="userInfo.tel" maxlength="14" autocomplete="tel" class="form-control" type="tel" placeholder="1-(555)-555-5555" id="inputTel" number>
					</div>
				</div>
				<div>
					<p class="form-section-description">Information about <span v-if="userInfo.supplierName === null || userInfo.supplierName === ''">your company</span><span v-else>{{userInfo.supplierName}}</span></p>
					<hr>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<label for="inputAddressAutocomplet">Autocomplete your address</label>
						<client-only>
							<place-autocomplete-field
								autocomplete="address-line1"
								id="inputAddressAutocomplet"
								api-key="AIzaSyDHL-FHcfS_ZS5RrlZxvKSoT42-gTCxy_M"
								placeholder="Enter an address, zipcode, or location"
								v-place-autofill:street="userInfo.address"
								v-place-autofill:city="userInfo.city"
								v-place-autofill:state="userInfo.state"
								v-place-autofill:zipcode="userInfo.zip"
								v-place-autofill:country="userInfo.country"
								v-place-autofill:latitude="userInfo.geo.lat"
								v-place-autofill:longitude="userInfo.geo.long">
							</place-autocomplete-field>
						</client-only>
					</div>
				</div>
						<hr>
					<div class="form-group">
						<label for="inputAddress">Address</label>
						<input autocomplete="address-line1" v-model="userInfo.address" type="text" class="form-control" id="inputAddress" placeholder="1234 Main St">
					</div>
					<div class="form-group">
						<label for="inputAddress2">Address 2</label>
						<input autocomplete="address-line2" type="text" class="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor">
					</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="inputCity">City</label>
						<input autocomplete="address-level2" v-model="userInfo.city" type="text" class="form-control" id="inputCity">
					</div>
					<div class="form-group col-md-3">
						<label for="inputState">State</label>
						<input autocomplete="address-level1" v-model="userInfo.state" type="text" class="form-control" id="inputState">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-3">
						<label for="inputZip">Zip</label>
						<input autocomplete="postal-code" v-model="userInfo.zip" type="text" class="form-control" id="inputZip">
					</div>
					<div class="form-group col-md-3">
						<label for="inputCountry">Country</label>
						<input autocomplete="country-name" v-model="userInfo.country" type="text" class="form-control" id="inputCountry">
					</div>
				</div>
				<div class="form-row">
					<div class="form-group col-md-6">
						<textarea name="" id="" class="form-control" rows="3" placeholder="Enter comment or dates the offer is available"></textarea>
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
					<div v-if="userInfo.type !== 'Wholesaler' && userInfo.type !== 'Choose...'" class="form-group col-md-3">
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
				<div v-if="userInfo.type === 'Bus company'">
					<button @click.prevent="addBus" class="btn btn-primary col-md-2 mt-2 mb-3">Add another bus</button>
					<div v-for="(bus, counter) in userInfo.busSettings" v-bind:key="counter" class="form-row bus-section mb-3 mt-3">							
						<div  class="form-group col-md-2">
							<label for="inputBusType">{{counter + 1}}. Bustype</label>
							<input v-model="userInfo.busSettings[counter].busType" id="inputBusType" class="form-control">
						</div>
						<div class="form-group col-md-2">
							<label for="inputBusSeats">Seats</label>
							<input v-model="userInfo.busSettings[counter].busSeats" type="number" class="form-control" id="inputBusSeats">
						</div>
						<div class="form-group col-md-2">
							<label for="inputBusPrice">Bus price </label>
							
							<input v-model="userInfo.busSettings[counter].busPrice" type="number" class="form-control" id="inputBusPrice">
						</div>
						<div class="form-group col-md-1">
							<span class="d-flex" @click="deleteBus(counter)">
								<img class="remove-button justify-content-between" src="data:image/svg+xml;base64,PHN2ZyBoZWlnaHQ9IjUxMS45OTk5OHB0IiB2aWV3Qm94PSIxIDEgNTExLjk5OTk4IDUxMS45OTk5OCIgd2lkdGg9IjUxMS45OTk5OHB0IiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Im0yNTYgMGMtMTQxLjM4NjcxOSAwLTI1NiAxMTQuNjEzMjgxLTI1NiAyNTZzMTE0LjYxMzI4MSAyNTYgMjU2IDI1NiAyNTYtMTE0LjYxMzI4MSAyNTYtMjU2Yy0uMTY3OTY5LTE0MS4zMTY0MDYtMTE0LjY4MzU5NC0yNTUuODMyMDMxLTI1Ni0yNTZ6bTAgNDgwYy0xMjMuNzEwOTM4IDAtMjI0LTEwMC4yODkwNjItMjI0LTIyNHMxMDAuMjg5MDYyLTIyNCAyMjQtMjI0IDIyNCAxMDAuMjg5MDYyIDIyNCAyMjRjLS4xMzI4MTIgMTIzLjY1NjI1LTEwMC4zNDM3NSAyMjMuODY3MTg4LTIyNCAyMjR6bTAgMCIvPjxwYXRoIGQ9Im0zODAuNDQ5MjE5IDEzMS41NTA3ODFjLTYuMjUtNi4yNDYwOTMtMTYuMzc4OTA3LTYuMjQ2MDkzLTIyLjYyNSAwbC0xMDEuODI0MjE5IDEwMS44MjQyMTktMTAxLjgyNDIxOS0xMDEuODI0MjE5Yy02LjE0MDYyNS02LjM1NTQ2OS0xNi4yNjk1MzEtNi41MzEyNS0yMi42MjUtLjM5MDYyNS02LjM1NTQ2OSA2LjEzNjcxOS02LjUzMTI1IDE2LjI2NTYyNS0uMzkwNjI1IDIyLjYyMTA5NC4xMjg5MDYuMTMyODEyLjI1NzgxMy4yNjU2MjUuMzkwNjI1LjM5NDUzMWwxMDEuODI0MjE5IDEwMS44MjQyMTktMTAxLjgyNDIxOSAxMDEuODI0MjE5Yy02LjM1NTQ2OSA2LjEzNjcxOS02LjUzMTI1IDE2LjI2NTYyNS0uMzkwNjI1IDIyLjYyNSA2LjEzNjcxOSA2LjM1NTQ2OSAxNi4yNjU2MjUgNi41MzEyNSAyMi42MjEwOTQuMzkwNjI1LjEzMjgxMi0uMTI4OTA2LjI2NTYyNS0uMjU3ODEzLjM5NDUzMS0uMzkwNjI1bDEwMS44MjQyMTktMTAxLjgyNDIxOSAxMDEuODI0MjE5IDEwMS44MjQyMTljNi4zNTU0NjkgNi4xMzY3MTkgMTYuNDg0Mzc1IDUuOTYwOTM3IDIyLjYyMTA5My0uMzk0NTMxIDUuOTg4MjgyLTYuMTk5MjE5IDUuOTg4MjgyLTE2LjAzMTI1IDAtMjIuMjMwNDY5bC0xMDEuODIwMzEyLTEwMS44MjQyMTkgMTAxLjgyNDIxOS0xMDEuODI0MjE5YzYuMjQ2MDkzLTYuMjQ2MDkzIDYuMjQ2MDkzLTE2LjM3NSAwLTIyLjYyNXptMCAwIi8+PC9zdmc+"/>	
							</span>
						</div>											
					</div>
				</div>
					</client-only>

				<div v-if="userInfo.type !== 'Bus company' && userInfo.type !== 'Choose...'" class="from-row">
					<div class="form-row col-md-12">
						<div class="form-group col-md-4">
							<label for="price-slider">Enter price range for groups</label>
							<vue-slider id="price-slider" class="col-md-12" ref="slider" v-model="userInfo.priceRange" v-bind="options"></vue-slider>
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
				<div>
					<p class="form-section-description">Create your own login</p>
					<hr>
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
  			<button @click.prevent="onSubmit" type="submit" class="btn btn-primary col-md-2 mt-2 mb-3">Submit</button>
			</form>
			</div>
			<div v-show="alreadyUser">
				<div>
					<p class="form-section-description">Enter login information</p>
					<hr>
				</div>
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
			<div>
				<!-- <multiselect v-model="multiselectValue" :options="multiselectOptions"></multiselect> -->
				
			</div>
		</div>
	</div>
</template>

<script>
import VueSlider from 'vue-slider-component/dist-css/vue-slider-component.umd.min.js'
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
		VueSlider
	},
 	data() {
		return {
			countries: [],
			isLoading: false,
			counter: 1,
			isAuthorized: false,
			alreadyUser: false,
			userInfo: {
				fName: null,
				lName: null,
				supplierName: null,
				address: null,
				city: null,
				state: null,
				country: null,
				zip: null,
				geo: { long: null, lat: null },
				maxTravelers: 'Choose...',
				roomsAvailable: null,
				priceRange: [10, 42],
				type: 'Choose...',
				selectedCountries: [],
				busSettings:[ {id: 1, busType: null, busSeats: null, busPrice: null}],	
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
		},
		addBus(){
			this.counter++
			this.userInfo.busSettings.push({
				id: this.counter,
				busType: null,
				busSeats: null,
				busPrice: null
    		})
		},
		deleteBus(counter){ 
			this.counter--
    		this.userInfo.busSettings.splice(counter,1);
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