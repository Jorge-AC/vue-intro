var eventBus = new Vue();

Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true
        }
    },
    template: `
    <div class="product">
        <div class="product-image">
            <a v-bind:href="link" target="_blank" rel="noopener noreferrer">
                <img v-bind:src="image" v-bind:alt="imgAlt">
            </a>
        </div>
        <div class="product-info">
            <h1>
                {{title}}
            </h1>
            <p v-if="inStock">On stock</p>
            <p v-else>Out of stock</p>
            Details:
            <ul>
                <li v-for="detail in details"> {{detail}}</li>
            </ul>
            Product Variants:
            <div class="color-box"
                v-for="(variant, index) in variants" 
                :key="variant.variantId"
                :style="{background: variant.variantColor}"
                @mouseover="changeImage(index)">
            </div>
            <div>Shipping: {{shipping}}</div>
            
            <button v-on:click="addToCart" :class="{disabledButton: !inStock}" :disabled="!inStock">Add to Cart</button>
        </div>
        <review-tab :reviews="reviews"></review-tab>        
    </div>`,
    data: function() {
        return {
            product: "812 Turbo",
            brand: "Ferrari",
            selectedVariant: 0,
            link: "https://vuejs.org",
            imgAlt: "green-sock",
            details: [
                "80% Cotton",
                "20% Polyester",
                "Gender-neutral"
            ],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "Green",
                    variantImage:"./assets/vmSocks-green-onWhite.jpg",
                    variantQuantity: 10
                },
                {
                    variantId: 2235,
                    variantColor: "Blue",
                    variantImage:"./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 20
                }
            ],
            sizes: ["S", "M", "L", "XL"],
            reviews: []
        }
    },
    methods: {
        addToCart: function() {
            this.$emit("add-to-cart", this.variants[this.selectedVariant].variantId)
        },
        changeImage: function(index) {
            this.selectedVariant = index;
        }
    },
    computed: {
        title: function(){
            return this.brand + " " + this.product 
        },
        image: function(){
            return this.variants[this.selectedVariant].variantImage
        },
        inStock: function(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping: function() {
            return this.premium ? "Free" : "$2.99"
        }
    },
    mounted: function() {
        eventBus.$on('review-added', review => {
            this.reviews.push(review)
        })
    }
    
});

Vue.component("review-product", {
    template: `
    
    <form class="review-form" @submit.prevent="onSubmit">
    <div v-show="errors.length">
        <p>Please review the followine error(s)</p>
        <ul>
            <li v-for="error in errors">{{error}}</li>
        </ul>
    </div>
      <p>
        <label for="name">Name:</label>
        <input id="name" v-model="name" placeholder="name">
      </p>
      
      <p>
        <label for="review">Review:</label>      
        <textarea id="review" v-model="review"></textarea>
      </p>
      
      <p>
        <label for="rating">Rating:</label>
        <select id="rating" v-model.number="rating">
          <option>5</option>
          <option>4</option>
          <option>3</option>
          <option>2</option>
          <option>1</option>
        </select>
      </p>
          
      <p>
        <input type="submit" value="Submit">  
      </p>    
    
    </form>`,
    data: function(){
        return {
            rating: null,
            review: null,
            name: null,
            errors: []
        }
    },
    methods: {
        onSubmit: function() {
            this.errors = [];

            if(this.rating && this.review && this.name) {
                let review = {
                    rating: this.rating,
                    review: this.review,
                    name: this.name
                }
    
                this.rating = null,
                this.review = null,
                this.name = null
    
                eventBus.$emit("review-added", review)
            } else {
                if(!this.name) { this.errors.push("Name is required")}
                if(!this.review) { this.errors.push("Review is required")}
                if(!this.rating) { this.errors.push("Rating is required")}
            }
        }
    }
})

Vue.component('review-tab', {
    props: {
        reviews: {
            type: Array,
            required: true
        }
    },
    template: `
        <div>
            <div>
                <ul>
                    <span class="tab" v-for="(tab, index) in tabs" :key="index" @click="setSelectedTab(tab)" :class="{activeTab: selectedTab === tab}" >{{tab}}</span>
                </ul>
            </div>
            <div v-show="selectedTab === 'Reviews'">
                <h2>Reviews</h2>
                <p v-show="!reviews.length">No reviews yet</p>
                <ul>
                    <li v-for="review in reviews">
                        <p>{{review.name}}</p>
                        <p>{{review.review}}</p>
                        <p>{{review.rating}}</p>
                    </li>
                </ul>
            </div>
            <review-product v-show="selectedTab === 'Make a review'"></review-product>
        </div>
    `,
    data: function(){
        return {
            tabs: ["Make a review", "Reviews"],
            selectedTab: "Reviews"
        }
    },
    methods: {
        setSelectedTab: function(tab){
            this.selectedTab = tab;
        }
    }
});

var app = new Vue({
    el: "#my-app",
    data: {
        premium: false,
        cart: []
    },
    methods: {
        updateCart: function(id) {
            this.cart.push(id)
        }
    }
});