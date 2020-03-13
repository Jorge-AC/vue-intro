var app = new Vue({
    el: "#my-app",
    data: {
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
                variantQuantity: 0
            },
            {
                variantId: 2235,
                variantColor: "Blue",
                variantImage:"./assets/vmSocks-blue-onWhite.jpg",
                variantQuantity: 20
            }
        ],
        sizes: ["S", "M", "L", "XL"],
        cart: 0
    },
    methods: {
        addToCart: function() {
            this.cart += 1
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
        }
    }
});

var product = new Vue.Component('product', {
    template: "<div>holi</div>"
})