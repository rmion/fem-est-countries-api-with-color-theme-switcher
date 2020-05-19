let app = new Vue({
    el: "#app",
    data: {
        countries: [],
        filteredCountries: [],
        regionFilter: '',
        searchedCountry: '',
        country: null,
        regions: [
            "Africa",
            "Americas",
            "Asia",
            "Europe",
            "Oceania"
        ]
    },
    filters: {
        number(val) {
            return numeral(val).format('0,0');
        }
    },
    mounted() {
        this.fetchCountries();
    },
    methods: {
        fetchCountries() {
            fetch('https://restcountries.eu/rest/v2/all?fields=name;capital;population;region;flag')
                .then(response => response.json())
                .then(data => {
                    this.countries = data;
                    this.filteredCountries = data;
                })
        },
        filterByRegion() {
            this.country = null;
            if (this.regionFilter === "") {
                this.fetchCountries();
            } else {
            fetch(`https://restcountries.eu/rest/v2/region/${this.regionFilter}?fields=name;capital;population;region;flag`)
                .then(response => response.json())
                .then(data => {
                    this.countries = data;
                    this.filteredCountries = data;
                })
            }
        },
        fetchCountryDetails(name, isBorder) {
            if (isBorder) {
                fetch(`https://restcountries.eu/rest/v2/alpha/${name}?fields=name;population;topLevelDomain;capital;region;subregion;borders;nativeName;currencies;languages;flag;`)
                    .then(response => response.json())
                    .then(data => {
                        this.country = data;
                    })
            } else {
                fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true&fields=name;population;topLevelDomain;capital;region;subregion;borders;nativeName;currencies;languages;flag;`)
                    .then(response => response.json())
                    .then(data => {
                        this.country = data[0];
                    })
            }
        }
    },
    watch: {
        searchedCountry(newCountry, oldCountry) {
            this.country = null;
            this.filteredCountries = this.countries.filter(country => country.name.toUpperCase().indexOf(newCountry.toUpperCase()) !== -1)
        }
    }
})