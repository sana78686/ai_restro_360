<template>
    <!-- Banner Section (Hero) -->
    <section
        class="main-banner-section position-relative d-flex align-items-end justify-content-center"
        style="
            min-height: 260px;
            width: 100vw;
            left: 50%;
            right: 50%;
            margin-left: -50vw;
            margin-right: -50vw;
            background: url('/Mox_files/menu.jpg') center center/cover no-repeat;
        "
    >
        <div
            class="position-absolute top-0 start-0 w-100 h-100"
            style="background: rgba(0, 0, 0, 0.45); z-index: 1"
        ></div>
        <div class="container position-relative" style="z-index: 2">
            <div class="row align-items-end">
                <div class="col-12 col-md-12 mx-auto">
                    <div v-if="loading" class="text-center py-5 text-white">
                        <div class="spinner-border text-light" role="status">
                            <span class="visually-hidden">{{$t('recentRestaurants.loading')}}</span>
                        </div>
                    </div>
                    <div
                        v-else-if="tenantSettings"
                        class="text-white d-flex align-items-center p-3 p-md-4 shadow-lg position-relative"
                        style="margin-top: 120px"
                    >
                        <img
                            v-if="
                                tenantSettings.logo_url || tenantSettings.logo
                            "
                            :src="
                                tenantSettings.logo_url || tenantSettings.logo
                            "
                            :alt="tenantSettings.business_name + ' Logo'"
                            class="shadow-sm me-3"
                            style="height: 80px; object-fit: cover"
                        />
                        <img
                            v-else
                            src="/assets/logo/airestro360.png"
                            :alt="tenantSettings.business_name + ' Logo'"
                            class="shadow-sm me-3"
                            style="
                                width: 100px;
                                height: 80px;
                                object-fit: cover;
                            "
                        />

                        <div class="flex-grow-1">
                            <div class="d-flex align-items-center mb-1">
                                <h3
                                    class="mb-0 fw-bold"
                                    style="font-size: 2rem"
                                >
                                    {{ tenantSettings.business_name }}
                                </h3>
                                <span
                                    class="badge ms-2"
                                    :class="{
                                        'bg-success': tenantSettings.is_active,
                                        'bg-warning': !tenantSettings.is_active,
                                    }"
                                    style="font-size: 0.9rem"
                                >
                                    {{
                                        tenantSettings.is_active
                                            ? "OPEN"
                                            : "CLOSED"
                                    }}
                                </span>
                            </div>
                            <div
                                class="mb-1"
                                style="font-size: 1.05rem"
                                v-if="tenantSettings.address"
                            >
                                <i class="fas fa-map-marker-alt me-1"></i>
                                {{ tenantSettings.address }}
                            </div>
                            <div
                                class="mb-1"
                                style="font-size: 1.05rem"
                                v-if="tenantSettings.country"
                            >
                                <i class="fas fa-globe me-1"></i>
                                {{ tenantSettings.country }}
                            </div>
                        </div>
                        <div
                            class="ms-auto d-none d-md-block"
                            v-if="tenantSettings.pickup_start_end_time"
                        >
                            <span
                                class="badge bg-danger px-3 py-2"
                                style="font-size: 1.1rem"
                                >Pick:
                                {{ tenantSettings.pickup_start_end_time }}</span
                            >
                        </div>
                    </div>
                    <div v-else class="text-center py-5 text-white">
                        <p>{{$t('landing.unableToLoadRestaurant')}}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Breadcrumbs below banner -->
    <div class="container">
        <nav aria-label="breadcrumb" class="mt-2 mb-0">
            <ol
                class="breadcrumb align-items-center"
                style="background: transparent"
            >
                <li class="breadcrumb-item">
                    <router-link to="/" class="text-danger"
                        ><i class="fas fa-home"></i> {{ $t('landing.home') }}</router-link
                    >
                </li>
                <li
                    v-if="tenantSettings && tenantSettings.country"
                    class="breadcrumb-item"
                >
                    <span class="text-danger">{{
                        tenantSettings.country
                    }}</span>
                </li>
                <li
                    v-if="tenantSettings && tenantSettings.business_name"
                    class="breadcrumb-item active text-danger"
                    aria-current="page"
                >
                    {{ tenantSettings.business_name }}
                </li>
            </ol>
        </nav>
    </div>

    <section class="menu-section py-5">
        <div class="container">
            <!-- Category Tabs -->
            <ul class="nav nav-tabs mb-4 justify-content-center" role="tablist">
                <li
                    class="nav-item"
                    v-for="cat in categories"
                    :key="cat.id ?? 'all'"
                    role="presentation"
                >
                    <button
                        class="nav-link"
                        :class="{ active: selectedCategory.id === cat.id }"
                        @click="selectedCategory = cat"
                        type="button"
                        role="tab"
                    >
                        {{ cat.name }}
                    </button>
                </li>
            </ul>
            <!-- Filter/Sort Bar -->
            <div
                class="filter-bar d-flex justify-content-between align-items-center mb-4 p-2 bg-white rounded shadow-sm flex-wrap"
            >
                <div>
                    <div class="dropdown d-inline me-2">
                        <button
                            class="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {{$t('landing.sortBy')}}
                            {{
                                sortBy === "default"
                                    ? "Default"
                                    : sortBy === "price_low_high"
                                    ? "Price: Low to High"
                                    : sortBy === "price_high_low"
                                    ? "Price: High to Low"
                                    : "Rating"
                            }}
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="handleSort('default')"
                                    >{{$t('landing.default')}}</a
                                >
                            </li>
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="
                                        handleSort('price_low_high')
                                    "
                                    >{{$t('landing.priceLowToHigh')}}</a
                                >
                            </li>
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="
                                        handleSort('price_high_low')
                                    "
                                    >{{$t('landing.priceHighToLow')}}</a
                                >
                            </li>
                            <li>
                                <a
                                    class="dropdown-item"
                                    href="#"
                                    @click.prevent="handleSort('rating')"
                                    >{{$t('landing.rating')}}</a
                                >
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="d-flex align-items-center flex-wrap">
                    <div class="dropdown d-inline me-3">
                        <button
                            class="btn btn-outline-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                        >
                            {{$t('landing.show12')}}
                        </button>
                        <ul class="dropdown-menu">
                            <li>
                                <a class="dropdown-item" href="#">  {{$t('landing.show6')}}</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">  {{$t('landing.show12')}}</a>
                            </li>
                            <li>
                                <a class="dropdown-item" href="#">  {{$t('landing.show24')}}</a>
                            </li>
                        </ul>
                    </div>
                    <button
                        class="btn btn-link text-dark px-2"
                        :class="{ active: viewMode === 'grid' }"
                        @click="viewMode = 'grid'"
                        title="Grid View"
                    >
                        <i class="material-icons">grid_view</i>
                    </button>
                    <button
                        class="btn btn-link text-dark px-2"
                        :class="{ active: viewMode === 'list' }"
                        @click="viewMode = 'list'"
                        title="List View"
                    >
                        <i class="material-icons">view_list</i>
                    </button>
                </div>
            </div>
            <!-- Menu Items Grid/List -->
            <div
                v-if="filteredMenuItems.length > 0 && viewMode === 'grid'"
                class="row g-4"
            >
                <div
                    class="col-12 col-sm-6 col-lg-3"
                    v-for="item in filteredMenuItems"
                    :key="item.id"
                >
                    <div class="card h-100 shadow-sm border-0">
                        <div class="position-relative">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                class="card-img-top"
                                :alt="item.name"
                                style="object-fit: cover; height: 180px"
                            />
                            <span
                                v-if="item.discount"
                                class="badge bg-danger position-absolute top-0 start-0 m-2"
                                >{{ item.discount }}{{ $t('percentOff') }}</span
                            >
                        </div>
                        <div class="card-body d-flex flex-column">
                            <h5
                                class="card-title"
                                style="font-size: 1.1rem; font-weight: bold"
                            >
                                {{ item.name }}
                            </h5>
                            <p
                                class="card-text text-muted mb-2"
                                style="font-size: 0.95rem"
                            >
                                {{ item.description }}
                            </p>
                            <ul
                                class="list-unstyled mb-2"
                                style="font-size: 0.95rem"
                            >
                                <li>
                                    <span
                                        class="material-icons text-danger"
                                        style="
                                            font-size: 1.1em;
                                            vertical-align: middle;
                                        "
                                        >local_offer</span
                                    >
                                    <b>{{ $t('landing.category') }}</b> {{ item.category?.name }}
                                </li>
                                <li>
                                    <span
                                        class="material-icons text-danger"
                                        style="
                                            font-size: 1.1em;
                                            vertical-align: middle;
                                        "
                                        >check_circle</span
                                    >
                                    <b>{{ $t('landing.availability') }}</b>
                                    {{
                                        item.is_active
                                            ? "Available"
                                            : "Unavailable"
                                    }}
                                </li>
                            </ul>
                            <div class="mt-auto">
                                <div
                                    class="d-flex align-items-center justify-content-between mb-2"
                                >
                                    <span
                                        class="text-muted"
                                        style="font-size: 0.95rem"
                                        >{{  $t('landing.customerReview') }}</span
                                    >
                                    <span
                                        class="text-warning"
                                        style="font-size: 1.1rem"
                                        >★★★★★</span
                                    >
                                </div>
                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >
                                    <span
                                        class="fw-bold text-danger"
                                        style="font-size: 1.15rem"
                                    >
                                        {{
                                            tenantSettings?.currency_symbol ||
                                            "$"
                                        }}&nbsp;{{ item.price }}
                                    </span>
                                    <div>
                                        <button
                                            class="btn btn-link text-danger p-0 me-2"
                                        >
                                            <i class="material-icons"
                                                >favorite_border</i
                                            >
                                        </button>
                                        <button
                                            class="btn btn-link text-danger p-0"
                                            @click="addToCart(item)"
                                        >
                                            <i class="material-icons"
                                                >shopping_cart</i
                                            >
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                v-else-if="filteredMenuItems.length > 0 && viewMode === 'list'"
                class="list-view-menu"
            >
                <div
                    class="card mb-4 shadow-sm border-0 list-menu-card"
                    v-for="item in filteredMenuItems"
                    :key="item.id"
                >
                    <div class="row g-0 align-items-center">
                        <div class="col-md-4 col-lg-3">
                            <img
                                v-if="item.image"
                                :src="item.image"
                                class="img-fluid rounded-start w-100"
                                :alt="item.name"
                                style="
                                    object-fit: cover;
                                    height: 100%;
                                    min-height: 180px;
                                "
                            />
                        </div>
                        <div class="col-md-8 col-lg-9">
                            <div class="card-body">
                                <h5
                                    class="card-title mb-2"
                                    style="font-size: 1.2rem; font-weight: bold"
                                >
                                    {{ item.name }}
                                </h5>
                                <p
                                    class="card-text text-muted mb-2"
                                    style="font-size: 0.98rem"
                                >
                                    {{ item.description }}
                                </p>
                                <div
                                    class="d-flex flex-wrap align-items-center mb-2 mt-3"
                                >
                                    <span class="me-3"
                                        ><span
                                            class="material-icons text-danger align-middle"
                                            >local_offer</span
                                        >
                                        <b>{{ $t('landing.category') }}</b>
                                        {{ item.category?.name }}</span
                                    >
                                    <span class="me-3"
                                        ><span
                                            class="material-icons text-danger align-middle"
                                            >check_circle</span
                                        >
                                        <b>{{ $t('landing.availability') }}</b>
                                        {{
                                            item.is_active
                                                ? "Available"
                                                : "Unavailable"
                                        }}</span
                                    >
                                    <span class="me-3"
                                        ><span class="text-muted"
                                            >{{ $t('CustomerReview') }}</span
                                        >
                                        <span class="text-warning"
                                            >★★★★★</span
                                        ></span
                                    >
                                </div>
                                <div
                                    class="d-flex align-items-center justify-content-between"
                                >
                                    <span
                                        class="fw-bold text-danger"
                                        style="font-size: 1.15rem"
                                    >
                                        {{
                                            tenantSettings?.currency_symbol ||
                                            "$"
                                        }}&nbsp;{{ item.price }}
                                    </span>
                                    <div>
                                        <button
                                            class="btn btn-link text-danger p-0 me-2"
                                        >
                                            <i class="material-icons"
                                                >favorite_border</i
                                            >
                                        </button>
                                        <button
                                            class="btn btn-link text-danger p-0"
                                            @click="addToCart(item)"
                                        >
                                            <i class="material-icons"
                                                >shopping_cart</i
                                            >
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div v-else class="text-center text-muted py-5">
                {{ $t('landing.noProductsFound') }}
            </div>
        </div>
    </section>

    <!-- Reservation Section -->
    <section class="reservation-section py-5">
        <div class="container">
            <div class="reservation-card mx-auto">
                <h2 class="text-center reservation-title">{{ $t('Reservation') }}</h2>
                <div class="text-center reservation-subtitle mb-4">
                   {{ $t('reservation.subtitle') }}
                </div>
                <form
                    @submit.prevent="handleReservation"
                    autocomplete="off"
                    class="container"
                >
                    <div class="row g-3 mb-3">
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="reservation.full_name"
                                    required
                                    :placeholder="$t('reservation.fullName')"
                                    id="reservationFullName"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                    :title="$t('reservation.fullNameTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-user"></i
                                ></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="text"
                                    class="form-control"
                                    v-model="reservation.phone_number"
                                    required
                                    :placeholder="$t('reservation.phoneNumber')"
                                    id="reservationPhone"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                    :title="$t('reservation.phoneNumberTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-phone"></i
                                ></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="email"
                                    class="form-control"
                                    v-model="reservation.email"
                                    required
                                    :placeholder="$t('reservation.email')"
                                    id="reservationEmail"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                   :title="$t('reservation.emailTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-envelope"></i
                                ></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="date"
                                    class="form-control"
                                    v-model="reservation.date"
                                    required
                                    :placeholder="$t('reservation.date')"
                                    id="reservationDate"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                    :title="$t('reservation.dateTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-calendar"></i
                                ></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="time"
                                    class="form-control"
                                    v-model="reservation.time"
                                    required
                                    :placeholder="$t('reservation.time')"
                                    id="reservationTime"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                    :title="$t('reservation.timeTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-clock"></i
                                ></span>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="input-group">
                                <input
                                    type="number"
                                    min="1"
                                    class="form-control"
                                    v-model="reservation.guests"
                                    required
                                    :placeholder="$t('reservation.guests')"
                                    id="reservationGuests"
                                    :disabled="reservationLoading"
                                    data-bs-toggle="tooltip"
                                    :title="$t('reservation.guestsTip')"
                                />
                                <span class="input-group-text"
                                    ><i class="fas fa-users"></i
                                ></span>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <textarea
                            class="form-control"
                            v-model="reservation.message"
                            rows="3"
                            required
                            :placeholder="$t('reservation.message')"
                            id="reservationMessage"
                            :disabled="reservationLoading"
                            data-bs-toggle="tooltip"
                            :title="$t('reservation.messageTip')"
                        ></textarea>
                    </div>
                    <div class="d-grid mb-2">
                        <button
                            type="submit"
                            class="btn btn-danger"
                            :disabled="reservationLoading"

                        >
                            <span v-if="reservationLoading"
                                ><span
                                    class="spinner-border spinner-border-sm me-2"
                                ></span
                                >{{ $t('common.Processing') }}</span
                            >

                            <span v-else>{{ $t('landing.makeReservation') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

    <!-- Enhanced Map Modal with Search -->
    <div
    v-if="showLocationModal"
    class="modal fade show" style="display: block; background: rgba(0,0,0,0.5);" @click.self="closeModal">
        <div class="modal-dialog modal-lg modal-dialog-centered">
            <div class="modal-content p-3">
                <div class="modal-header">
                    <h5 class="modal-title">{{ $t('SelectYourDeliveryLocation') }}</h5>
                    <button type="button" class="btn-close" @click="closeModal"></button>
                </div>
                <div class="modal-body">
                    <!-- Map Search Bar -->
                    <div class="map-search-container mb-3">
                        <div class="input-group">
                            <input
                                type="text"
                                class="form-control"
                                v-model="mapSearchQuery"
                                placeholder="Search for homes, businesses, landmarks..."
                                @input="onMapSearchInput"
                                @focus="onMapSearchFocus"
                                ref="mapSearchInput"
                            />
                            <button class="btn btn-outline-secondary" type="button" @click="clearMapSearch">
                                <i class="fas fa-times"></i>
                            </button>
                        </div>

                        <!-- Map Search Results -->
                        <div v-if="showMapSearchResults && mapSearchPredictions.length > 0" class="map-search-results">
                            <div
                                v-for="prediction in mapSearchPredictions"
                                :key="prediction.place_id"
                                class="map-search-item"
                                @mousedown="selectMapLocation(prediction)"
                            >
                                <div class="map-search-icon">
                                    <i :class="getPlaceIcon(prediction.types)"></i>
                                </div>
                                <div class="map-search-content">
                                    <div class="fw-bold">{{ prediction.structured_formatting.main_text }}</div>
                                    <div class="text-muted small">{{ prediction.structured_formatting.secondary_text }}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <p class="text-muted mb-2">Drag the red marker to your location or click on the map.</p>
                    <div id="deliveryMap" style="height: 400px; width: 100%; border-radius: 10px;"></div>

                    <div class="mt-3 text-center">
                        <p v-if="deliveryMessage" :class="deliveryAllowed ? 'text-success' : 'text-danger'">
                            {{ deliveryMessage }}
                        </p>
                        <div class="d-flex gap-2 justify-content-center">
                            <button class="btn btn-secondary mt-2" @click="closeModal">
                                {{$t('SkipforNow')}}
                            </button>
                            <button
                                class="btn btn-success mt-2"
                                :disabled="!deliveryAllowed"
                                @click="confirmLocation"
                            >
                                {{$t('ConfirmLocation')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<!-- <script>
import { ref, onMounted, computed, inject, nextTick } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { Tooltip } from "bootstrap";
import { useCart } from "../../composables/useCart";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default {
    name: "TenantLanding",
    setup() {
        const loading = ref(true);
        const tenantSettings = ref(null);
        const categories = ref([{ id: null, name: "All Categories" }]);
        const products = ref([]);
        const selectedCategory = ref({ id: null, name: "All Categories" });
        const viewMode = ref("grid");
        const sortBy = ref("default");

        // Enhanced Map related variables
        const showLocationModal = ref(false);
        const deliveryAllowed = ref(false);
        const deliveryMessage = ref("");
        const map = ref(null);
        const marker = ref(null);
        const circle = ref(null);
        const userLocation = ref(null);

        // Map Search variables
        const mapSearchQuery = ref("");
        const mapSearchPredictions = ref([]);
        const showMapSearchResults = ref(false);
        const mapSearchDebounceTimer = ref(null);
        const mapSearchInput = ref(null);

        // Google Places services
        const autocompleteService = ref(null);
        const placesService = ref(null);
        const geocoder = ref(null);

        const reservation = ref({
            full_name: "",
            phone_number: "",
            email: "",
            date: "",
            time: "",
            guests: "",
            message: "",
        });
        const reservationLoading = ref(false);
        const cart = inject("cart", useCart());

        // Custom red marker icon
        const redMarkerIcon = L.icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        // Load Google Maps Script
        const loadGoogleMapsScript = () => {
            if (window.google && window.google.maps && window.google.maps.places) {
                initializeGoogleServices();
                return;
            }

            const existingScript = document.querySelector('script[src*="maps.google.com/maps/api/js"]');
            if (existingScript) {
                existingScript.remove();
            }

            const script = document.createElement('script');
            script.src = `https://maps.google.com/maps/api/js?key=AIzaSyCZDgTTb7vm0co-2yHGinkgSs_yDTNtbSo&libraries=places&callback=initGoogleMaps`;
            script.async = true;
            script.defer = true;

            window.initGoogleMaps = () => {
                initializeGoogleServices();
            };

            document.head.appendChild(script);
        };

        // Initialize Google Services
        const initializeGoogleServices = () => {
            if (window.google && window.google.maps) {
                autocompleteService.value = new window.google.maps.places.AutocompleteService();
                placesService.value = new window.google.maps.places.PlacesService(document.createElement('div'));
                geocoder.value = new window.google.maps.Geocoder();
                console.log('Google Maps services initialized');
            }
        };

        // Map Search functionality
        const onMapSearchInput = () => {
            if (mapSearchDebounceTimer.value) {
                clearTimeout(mapSearchDebounceTimer.value);
            }

            if (!mapSearchQuery.value || mapSearchQuery.value.length < 2) {
                mapSearchPredictions.value = [];
                showMapSearchResults.value = false;
                return;
            }

            mapSearchDebounceTimer.value = setTimeout(() => {
                getMapSearchPredictions(mapSearchQuery.value);
            }, 300);
        };

        const onMapSearchFocus = () => {
            if (mapSearchQuery.value && mapSearchQuery.value.length >= 2 && mapSearchPredictions.value.length > 0) {
                showMapSearchResults.value = true;
            }
        };

        const getMapSearchPredictions = (input) => {
            if (!autocompleteService.value) {
                console.error('Autocomplete service not available');
                return;
            }

            const request = {
                input: input,
                types: ['address', 'establishment', 'geocode', 'point_of_interest'], // Search all types of places
                componentRestrictions: {
                    country: ['pk', 'us', 'ca', 'gb', 'au', 'ae', 'sa', 'in'] // Multiple countries
                }
            };

            autocompleteService.value.getPlacePredictions(
                request,
                (predictions, status) => {
                    if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                        mapSearchPredictions.value = predictions.slice(0, 8);
                        showMapSearchResults.value = true;
                        console.log('Map search predictions:', predictions);
                    } else {
                        mapSearchPredictions.value = [];
                        showMapSearchResults.value = false;
                    }
                }
            );
        };

        const selectMapLocation = (prediction) => {
            console.log('Selected map location:', prediction);
            mapSearchQuery.value = prediction.description;
            showMapSearchResults.value = false;

            if (placesService.value) {
                placesService.value.getDetails(
                    {
                        placeId: prediction.place_id,
                        fields: ['geometry', 'formatted_address', 'name']
                    },
                    (place, status) => {
                        if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
                            const location = place.geometry.location;
                            const lat = location.lat();
                            const lng = location.lng();

                            // Move map to selected location
                            map.value.setView([lat, lng], 16);
                            marker.value.setLatLng([lat, lng]);
                            userLocation.value = { lat, lng };

                            // Check delivery area
                            checkDeliveryArea(lat, lng);

                            // Update address display
                            deliveryMessage.value = `Selected: ${place.formatted_address}`;
                        }
                    }
                );
            }
        };

        const clearMapSearch = () => {
            mapSearchQuery.value = "";
            mapSearchPredictions.value = [];
            showMapSearchResults.value = false;
        };

        // Get place icon based on type
        const getPlaceIcon = (types) => {
            if (types.includes('street_address') || types.includes('premise')) {
                return 'fas fa-home text-primary';
            } else if (types.includes('subpremise')) {
                return 'fas fa-building text-info';
            } else if (types.includes('establishment') || types.includes('point_of_interest')) {
                return 'fas fa-store text-warning';
            } else if (types.includes('geocode')) {
                return 'fas fa-map-marker-alt text-success';
            } else if (types.includes('route')) {
                return 'fas fa-road text-secondary';
            } else if (types.includes('locality') || types.includes('sublocality')) {
                return 'fas fa-city text-info';
            } else {
                return 'fas fa-map-marker-alt text-muted';
            }
        };

        // Show toast when product is added
        const addToCart = (product) => {
            cart.addToCart(product);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Added to cart!",
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
            });
        };

        const fetchTenantSettings = async () => {
            try {
                const response = await axios.get("/tenant/get-tenant-details");
                if (response.data.success && response.data.data) {
                    tenantSettings.value = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching tenant settings:", error);
                tenantSettings.value = null;
            } finally {
                loading.value = false;
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("/tenant/public/categories", {
                    params: { is_active: true },
                });
                if (response.data.success) {
                    const cats = response.data.data.data;
                    categories.value = [
                        { id: null, name: "All Categories" },
                        ...cats,
                    ];
                    if (
                        !categories.value.some(
                            (cat) => cat.id === selectedCategory.value.id
                        )
                    ) {
                        selectedCategory.value = categories.value[0];
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const params = { is_active: true };
                const response = await axios.get("/tenant/public/products", {
                    params,
                });
                if (response.data.success) {
                    products.value = response.data.data.data;
                } else {
                    products.value = [];
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                products.value = [];
            }
        };

        // Initialize map after component is mounted and tenant settings are loaded
        const initMap = () => {
            if (!tenantSettings.value || !tenantSettings.value.latitude || !tenantSettings.value.longitude) {
                console.error("Restaurant location not available");
                return;
            }

            // Wait for DOM to be ready
            nextTick(() => {
                const mapElement = document.getElementById('deliveryMap');
                if (!mapElement) {
                    console.error("Map element not found");
                    return;
                }

                // Initialize the map centered on restaurant
                map.value = L.map('deliveryMap').setView(
                    [tenantSettings.value.latitude, tenantSettings.value.longitude],
                    13
                );

                // Add map layer (OpenStreetMap)
                L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                    attribution: "© OpenStreetMap contributors",
                }).addTo(map.value);

                // Draw delivery area circle (default 1.5km radius)
                const deliveryRadius = tenantSettings.value.delivery_radius || 1.5;
                circle.value = L.circle(
                    [tenantSettings.value.latitude, tenantSettings.value.longitude],
                    {
                        color: "green",
                        fillColor: "#bdf5c3",
                        fillOpacity: 0.3,
                        radius: deliveryRadius * 1000, // km to m
                    }
                ).addTo(map.value);

                // Add draggable marker for user (initially at restaurant location)
                marker.value = L.marker(
                    [tenantSettings.value.latitude, tenantSettings.value.longitude],
                    {
                        draggable: true,
                        autoPan: true,
                        title: "Your Location",
                        icon: redMarkerIcon
                    }
                ).addTo(map.value);

                // Set initial user location
                userLocation.value = {
                    lat: tenantSettings.value.latitude,
                    lng: tenantSettings.value.longitude
                };

                // Check initial delivery area
                checkDeliveryArea(tenantSettings.value.latitude, tenantSettings.value.longitude);

                // On marker drag
                marker.value.on("dragend", async (e) => {
                    const { lat, lng } = e.target.getLatLng();
                    userLocation.value = { lat, lng };
                    await checkDeliveryArea(lat, lng);
                });

                // On map click
                map.value.on("click", async (e) => {
                    const { lat, lng } = e.latlng;
                    marker.value.setLatLng([lat, lng]);
                    userLocation.value = { lat, lng };
                    await checkDeliveryArea(lat, lng);

                    // Reverse geocode to get address
                    if (geocoder.value) {
                        const latlng = new window.google.maps.LatLng(lat, lng);
                        geocoder.value.geocode({ location: latlng }, (results, status) => {
                            if (status === 'OK' && results[0]) {
                                deliveryMessage.value = `Selected: ${results[0].formatted_address}`;
                            }
                        });
                    }
                });

                // Try to detect user automatically
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        (pos) => {
                            const lat = pos.coords.latitude;
                            const lng = pos.coords.longitude;
                            marker.value.setLatLng([lat, lng]);
                            map.value.setView([lat, lng], 13);
                            userLocation.value = { lat, lng };
                            checkDeliveryArea(lat, lng);
                        },
                        (error) => {
                            console.log("Geolocation error:", error);
                            // Keep default restaurant location
                        },
                        {
                            timeout: 10000,
                            enableHighAccuracy: false
                        }
                    );
                }
            });
        };

        // Delivery area check using Haversine formula
        const checkDeliveryArea = async (lat, lng) => {
            deliveryMessage.value = "Checking delivery area...";
            try {
                const restaurantLat = tenantSettings.value.latitude;
                const restaurantLng = tenantSettings.value.longitude;
                const deliveryRadius = tenantSettings.value.delivery_radius || 1.5;

                // Calculate distance using Haversine formula
                const distance = calculateDistance(restaurantLat, restaurantLng, lat, lng);

                if (distance <= deliveryRadius) {
                    deliveryAllowed.value = true;
                    deliveryMessage.value = `Great! We deliver to your location (${distance.toFixed(1)}km away)`;
                } else {
                    deliveryAllowed.value = false;
                    deliveryMessage.value = `Sorry! We only deliver within ${deliveryRadius}km (you're ${distance.toFixed(1)}km away)`;
                }
            } catch (err) {
                console.error("Error checking delivery area:", err);
                deliveryAllowed.value = false;
                deliveryMessage.value = "Error checking delivery area.";
            }
        };

        // Calculate distance using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Earth's radius in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };

        // Confirm location
        const confirmLocation = () => {
            if (!userLocation.value || !deliveryAllowed.value) return;

            localStorage.setItem("user_location", JSON.stringify(userLocation.value));
            localStorage.setItem("delivery_available", "true");
            localStorage.setItem("delivery_restaurant_id", tenantSettings.value.id);

            Swal.fire({
                icon: "success",
                title: "Location Saved!",
                text: "You can now continue browsing and ordering.",
                confirmButtonColor: "#28a745",
            });
            showLocationModal.value = false;
        };

        // Close modal manually
        const closeModal = () => {
            showLocationModal.value = false;
            // Store that user skipped location selection
            localStorage.setItem("location_modal_shown", "true");

            // Clear search
            mapSearchQuery.value = "";
            mapSearchPredictions.value = [];
            showMapSearchResults.value = false;
        };

        // Show modal only if not shown before and restaurant has location
        const shouldShowModal = () => {
            const alreadyShown = localStorage.getItem("location_modal_shown");
            const hasLocation = tenantSettings.value && tenantSettings.value.latitude && tenantSettings.value.longitude;
            return !alreadyShown && hasLocation;
        };

        // Watch for category change and filter products client-side
        const filteredMenuItems = computed(() => {
            let filtered = [...products.value];
            if (selectedCategory.value && selectedCategory.value.id) {
                filtered = filtered.filter(
                    (item) => item.category_id === selectedCategory.value.id
                );
            }
            switch (sortBy.value) {
                case "price_low_high":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case "price_high_low":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case "rating":
                    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                default:
                    filtered.sort((a, b) => a.sort_order - b.sort_order);
            }
            return filtered;
        });

        const handleSort = (sortType) => {
            sortBy.value = sortType;
        };

        const handleReservation = async () => {
            reservationLoading.value = true;
            try {
                const response = await axios.post("/tenant/reservation", {
                    full_name: reservation.value.full_name,
                    phone_number: reservation.value.phone_number,
                    email: reservation.value.email,
                    date: reservation.value.date,
                    time: reservation.value.time,
                    guests: parseInt(reservation.value.guests, 10),
                    message: reservation.value.message,
                });
                if (response.data.success) {
                    await Swal.fire({
                        icon: "success",
                        title: "Reservation Submitted!",
                        text: response.data.message,
                        confirmButtonColor: "#c62828",
                    });
                    reservation.value = {
                        full_name: "",
                        phone_number: "",
                        email: "",
                        date: "",
                        time: "",
                        guests: "",
                        message: "",
                    };
                } else {
                    throw new Error(
                        response.data.message || "Submission failed."
                    );
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        error.response?.data?.message ||
                        "Something went wrong! Please try again.",
                    confirmButtonColor: "#c62828",
                });
            } finally {
                reservationLoading.value = false;
            }
        };

        onMounted(async () => {
            await fetchTenantSettings();
            await fetchCategories();
            await fetchProducts();

            // Load Google Maps
            loadGoogleMapsScript();

            // Initialize map after tenant settings are loaded
            if (tenantSettings.value && shouldShowModal()) {
                showLocationModal.value = true;
                // Small delay to ensure modal is rendered before initializing map
                setTimeout(() => {
                    initMap();
                }, 100);
            }

            document
                .querySelectorAll('[data-bs-toggle="tooltip"]')
                .forEach((el) => {
                    new Tooltip(el);
                });
        });

        return {
            loading,
            tenantSettings,
            categories,
            selectedCategory,
            viewMode,
            filteredMenuItems,
            handleSort,
            reservation,
            reservationLoading,
            handleReservation,
            cart,
            addToCart,
            showLocationModal,
            deliveryAllowed,
            deliveryMessage,
            closeModal,
            confirmLocation,
            // Map Search
            mapSearchQuery,
            mapSearchPredictions,
            showMapSearchResults,
            mapSearchInput,
            onMapSearchInput,
            onMapSearchFocus,
            selectMapLocation,
            clearMapSearch,
            getPlaceIcon,
        };
    },
};
</script> -->


<script>
import { ref, onMounted, computed, inject, nextTick } from "vue";
import axios from "axios";
import Swal from "sweetalert2";
import { Tooltip } from "bootstrap";
import { useCart } from "../../composables/useCart";
import L from "leaflet";
import 'leaflet/dist/leaflet.css';

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default {
    name: "TenantLanding",
    setup() {
        const loading = ref(true);
        const tenantSettings = ref(null);
        const categories = ref([{ id: null, name: "All Categories" }]);
        const products = ref([]);
        const selectedCategory = ref({ id: null, name: "All Categories" });
        const viewMode = ref("grid");
        const sortBy = ref("default");

        // Enhanced Map related variables
        const showLocationModal = ref(false);
        const deliveryAllowed = ref(false);
        const deliveryMessage = ref("");
        const map = ref(null);
        const marker = ref(null);
        const circle = ref(null);
        const userLocation = ref(null);

        // Map Search variables
        const mapSearchQuery = ref("");
        const mapSearchPredictions = ref([]);
        const showMapSearchResults = ref(false);
        const mapSearchLoading = ref(false);
        const mapSearchDebounceTimer = ref(null);
        const mapSearchInput = ref(null);

        const reservation = ref({
            full_name: "",
            phone_number: "",
            email: "",
            date: "",
            time: "",
            guests: "",
            message: "",
        });
        const reservationLoading = ref(false);
        const cart = inject("cart", useCart());

        // Custom red marker icon
        const redMarkerIcon = L.icon({
            iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
            shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
        });

        // ENHANCED FREE Location Search using MULTIPLE free geocoding services
        const searchLocations = async (query) => {
            if (!query || query.length < 2) {
                return [];
            }

            console.log('Searching for:', query);

            try {
                // Try multiple free geocoding services in parallel
                const searchPromises = [
                    // OpenStreetMap Nominatim (Primary)
                    fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&addressdetails=1&countrycodes=`)
                        .then(r => r.ok ? r.json() : [])
                        .catch(() => []),

                    // LocationIQ (Free tier - no key needed for small usage)
                    fetch(`https://us1.locationiq.com/v1/search.php?key=pk.8f875631317a6e53a2f5d64d2b48a9e4&q=${encodeURIComponent(query)}&format=json&limit=5`)
                        .then(r => r.ok ? r.json() : [])
                        .catch(() => []),

                    // OpenCage Data (Free tier - generous limits)
                    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(query)}&key=6d43b3ff33e84f54b25f61b4c8f21b82&limit=5&no_annotations=1`)
                        .then(r => r.ok ? r.json().then(d => d.results) : [])
                        .catch(() => [])
                ];

                // Wait for all searches to complete
                const results = await Promise.allSettled(searchPromises);

                let allLocations = [];

                // Process OpenStreetMap results
                if (results[0].status === 'fulfilled' && results[0].value) {
                    allLocations = allLocations.concat(results[0].value.map(item => ({
                        place_id: item.place_id || `osm_${item.osm_id}`,
                        name: item.display_name.split(',')[0],
                        display_name: item.display_name,
                        lat: parseFloat(item.lat),
                        lon: parseFloat(item.lon),
                        type: item.type || item.class,
                        class: item.class,
                        source: 'osm',
                        importance: item.importance || 0
                    })));
                }

                // Process LocationIQ results
                if (results[1].status === 'fulfilled' && results[1].value) {
                    allLocations = allLocations.concat(results[1].value.map(item => ({
                        place_id: `liq_${item.place_id}`,
                        name: item.display_name.split(',')[0],
                        display_name: item.display_name,
                        lat: parseFloat(item.lat),
                        lon: parseFloat(item.lon),
                        type: item.type,
                        class: item.class,
                        source: 'locationiq',
                        importance: item.importance || 0.5
                    })));
                }

                // Process OpenCage results
                if (results[2].status === 'fulfilled' && results[2].value) {
                    allLocations = allLocations.concat(results[2].value.map(item => ({
                        place_id: `oc_${item.annotations.geohash}`,
                        name: item.formatted.split(',')[0],
                        display_name: item.formatted,
                        lat: parseFloat(item.geometry.lat),
                        lon: parseFloat(item.geometry.lng),
                        type: item.components._type || 'venue',
                        class: item.components._category || 'place',
                        source: 'opencage',
                        importance: item.confidence || 0.5
                    })));
                }

                // Remove duplicates based on coordinates and name similarity
                const uniqueLocations = allLocations.filter((location, index, self) =>
                    index === self.findIndex(t =>
                        Math.abs(t.lat - location.lat) < 0.001 &&
                        Math.abs(t.lon - location.lon) < 0.001 &&
                        t.name === location.name
                    )
                );

                // Sort by importance/confidence
                uniqueLocations.sort((a, b) => (b.importance || 0) - (a.importance || 0));

                console.log(`Found ${uniqueLocations.length} locations for: ${query}`);
                return uniqueLocations.slice(0, 8);

            } catch (error) {
                console.error('Error searching locations:', error);
                // Fallback to basic OpenStreetMap search
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=8&addressdetails=1`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        return data.map(item => ({
                            place_id: item.place_id,
                            name: item.display_name.split(',')[0],
                            display_name: item.display_name,
                            lat: parseFloat(item.lat),
                            lon: parseFloat(item.lon),
                            type: item.type,
                            class: item.class,
                            source: 'osm_fallback',
                            importance: item.importance || 0
                        }));
                    }
                } catch (fallbackError) {
                    console.error('Fallback search also failed:', fallbackError);
                }
                return [];
            }
        };

        // Enhanced Map Search functionality
        const onMapSearchInput = () => {
            if (mapSearchDebounceTimer.value) {
                clearTimeout(mapSearchDebounceTimer.value);
            }

            if (!mapSearchQuery.value || mapSearchQuery.value.length < 2) {
                mapSearchPredictions.value = [];
                showMapSearchResults.value = false;
                mapSearchLoading.value = false;
                return;
            }

            mapSearchLoading.value = true;
            showMapSearchResults.value = true;

            mapSearchDebounceTimer.value = setTimeout(async () => {
                const results = await searchLocations(mapSearchQuery.value);
                mapSearchPredictions.value = results;
                mapSearchLoading.value = false;

                // If no results, show helpful message
                if (results.length === 0 && mapSearchQuery.value.length >= 2) {
                    console.log('No results found for:', mapSearchQuery.value);
                }
            }, 600);
        };

        const onMapSearchFocus = () => {
            if (mapSearchQuery.value && mapSearchQuery.value.length >= 2) {
                showMapSearchResults.value = true;
            }
        };

        const selectMapLocation = async (prediction) => {
            console.log('Selected map location:', prediction);
            mapSearchQuery.value = prediction.display_name;
            showMapSearchResults.value = false;
            mapSearchLoading.value = true;

            try {
                if (map.value) {
                    const lat = prediction.lat;
                    const lng = prediction.lon;

                    // Smoothly move map to selected location
                    map.value.setView([lat, lng], 16, {
                        animate: true,
                        duration: 1
                    });

                    if (marker.value) {
                        marker.value.setLatLng([lat, lng]);
                    }
                    userLocation.value = { lat, lng };

                    // Check delivery area
                    await checkDeliveryArea(lat, lng);

                    // Update address display
                    deliveryMessage.value = `Selected: ${prediction.display_name}`;

                    // Show success feedback
                    Swal.fire({
                        toast: true,
                        position: 'top-end',
                        icon: 'success',
                        title: 'Location selected!',
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            } catch (error) {
                console.error('Error selecting location:', error);
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: 'Error selecting location',
                    showConfirmButton: false,
                    timer: 2000
                });
            } finally {
                mapSearchLoading.value = false;
            }
        };

        const clearMapSearch = () => {
            mapSearchQuery.value = "";
            mapSearchPredictions.value = [];
            showMapSearchResults.value = false;
            mapSearchLoading.value = false;
        };

        // Enhanced place icon mapping
        const getPlaceIcon = (type) => {
            const typeMap = {
                // OSM types
                'house': 'fas fa-home text-primary',
                'apartment': 'fas fa-building text-info',
                'commercial': 'fas fa-store text-warning',
                'restaurant': 'fas fa-utensils text-danger',
                'cafe': 'fas fa-coffee text-brown',
                'hotel': 'fas fa-hotel text-info',
                'school': 'fas fa-school text-success',
                'university': 'fas fa-graduation-cap text-success',
                'hospital': 'fas fa-hospital text-danger',
                'pharmacy': 'fas fa-clinic-medical text-info',
                'supermarket': 'fas fa-shopping-cart text-success',
                'mall': 'fas fa-shopping-bag text-warning',
                'bank': 'fas fa-university text-success',
                'atm': 'fas fa-money-bill-wave text-success',
                'park': 'fas fa-tree text-success',
                'cinema': 'fas fa-film text-purple',
                'theatre': 'fas fa-theater-masks text-purple',
                'museum': 'fas fa-landmark text-brown',
                'library': 'fas fa-book text-info',
                'stadium': 'fas fa-football-ball text-warning',
                'bus_station': 'fas fa-bus text-success',
                'train_station': 'fas fa-train text-success',
                'airport': 'fas fa-plane text-info',
                'parking': 'fas fa-parking text-secondary',

                // Additional types
                'venue': 'fas fa-map-marker-alt text-primary',
                'building': 'fas fa-building text-info',
                'city': 'fas fa-city text-info',
                'town': 'fas fa-town text-info',
                'village': 'fas fa-home text-info',
                'suburb': 'fas fa-map-marker-alt text-success',
                'neighborhood': 'fas fa-map-marker-alt text-success',

                // LocationIQ types
                'amenity': 'fas fa-star text-warning',
                'tourism': 'fas fa-camera text-purple',
                'shop': 'fas fa-shopping-cart text-success',
                'office': 'fas fa-briefcase text-info',
                'industrial': 'fas fa-industry text-secondary',
                'residential': 'fas fa-home text-primary'
            };

            return typeMap[type] || 'fas fa-map-marker-alt text-muted';
        };

        // Show toast when product is added
        const addToCart = (product) => {
            cart.addToCart(product);
            Swal.fire({
                toast: true,
                position: "top-end",
                icon: "success",
                title: "Added to cart!",
                showConfirmButton: false,
                timer: 1200,
                timerProgressBar: true,
            });
        };

        const fetchTenantSettings = async () => {
            try {
                const response = await axios.get("/tenant/get-tenant-details");
                if (response.data.success && response.data.data) {
                    tenantSettings.value = response.data.data;
                }
            } catch (error) {
                console.error("Error fetching tenant settings:", error);
                tenantSettings.value = null;
            } finally {
                loading.value = false;
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get("/tenant/public/categories", {
                    params: { is_active: true },
                });
                if (response.data.success) {
                    const cats = response.data.data.data;
                    categories.value = [
                        { id: null, name: "All Categories" },
                        ...cats,
                    ];
                    if (
                        !categories.value.some(
                            (cat) => cat.id === selectedCategory.value.id
                        )
                    ) {
                        selectedCategory.value = categories.value[0];
                    }
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            }
        };

        const fetchProducts = async () => {
            try {
                const params = { is_active: true };
                const response = await axios.get("/tenant/public/products", {
                    params,
                });
                if (response.data.success) {
                    products.value = response.data.data.data;
                } else {
                    products.value = [];
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                products.value = [];
            }
        };

        // Initialize map after component is mounted and tenant settings are loaded
        // const initMap = async () => {
        //     if (!tenantSettings.value || !tenantSettings.value.latitude || !tenantSettings.value.longitude) {
        //         console.error("Restaurant location not available");
        //         return;
        //     }

        //     // Wait for DOM to be ready
        //     await nextTick();
        //     const mapElement = document.getElementById('deliveryMap');
        //     if (!mapElement) {
        //         console.error("Map element not found");
        //         return;
        //     }

        //     try {
        //         // Initialize the map centered on restaurant
        //         map.value = L.map('deliveryMap').setView(
        //             [tenantSettings.value.latitude, tenantSettings.value.longitude],
        //             13
        //         );

        //         // Add map layer (OpenStreetMap)
        //         L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        //             attribution: "© OpenStreetMap contributors",
        //         }).addTo(map.value);

        //         // Draw delivery area circle (default 1.5km radius)
        //         const deliveryRadius = tenantSettings.value.delivery_radius || 1.5;
        //         circle.value = L.circle(
        //             [tenantSettings.value.latitude, tenantSettings.value.longitude],
        //             {
        //                 color: "green",
        //                 fillColor: "#bdf5c3",
        //                 fillOpacity: 0.3,
        //                 radius: deliveryRadius * 1000, // km to m
        //             }
        //         ).addTo(map.value);

        //         // Add draggable marker for user (initially at restaurant location)
        //         marker.value = L.marker(
        //             [tenantSettings.value.latitude, tenantSettings.value.longitude],
        //             {
        //                 draggable: true,
        //                 autoPan: true,
        //                 title: "Your Location",
        //                 icon: redMarkerIcon
        //             }
        //         ).addTo(map.value);

        //         // Set initial user location
        //         userLocation.value = {
        //             lat: tenantSettings.value.latitude,
        //             lng: tenantSettings.value.longitude
        //         };

        //         // Check initial delivery area
        //         checkDeliveryArea(tenantSettings.value.latitude, tenantSettings.value.longitude);

        //         // On marker drag
        //         marker.value.on("dragend", async (e) => {
        //             const { lat, lng } = e.target.getLatLng();
        //             userLocation.value = { lat, lng };
        //             await checkDeliveryArea(lat, lng);

        //             // Get address for dragged location
        //             try {
        //                 const response = await fetch(
        //                     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        //                 );
        //                 if (response.ok) {
        //                     const data = await response.json();
        //                     deliveryMessage.value = `Selected: ${data.display_name}`;
        //                     mapSearchQuery.value = data.display_name;
        //                 }
        //             } catch (error) {
        //                 console.error('Error reverse geocoding:', error);
        //                 deliveryMessage.value = `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        //             }
        //         });

        //         // On map click
        //         map.value.on("click", async (e) => {
        //             const { lat, lng } = e.latlng;
        //             marker.value.setLatLng([lat, lng]);
        //             userLocation.value = { lat, lng };
        //             await checkDeliveryArea(lat, lng);

        //             // Get address for clicked location
        //             try {
        //                 const response = await fetch(
        //                     `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        //                 );
        //                 if (response.ok) {
        //                     const data = await response.json();
        //                     deliveryMessage.value = `Selected: ${data.display_name}`;
        //                     mapSearchQuery.value = data.display_name;
        //                 }
        //             } catch (error) {
        //                 console.error('Error reverse geocoding:', error);
        //                 deliveryMessage.value = `Location: ${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        //             }
        //         });

        //         // Try to detect user automatically
        //         if (navigator.geolocation) {
        //             navigator.geolocation.getCurrentPosition(
        //                 async (pos) => {
        //                     const lat = pos.coords.latitude;
        //                     const lng = pos.coords.longitude;
        //                     marker.value.setLatLng([lat, lng]);
        //                     map.value.setView([lat, lng], 13);
        //                     userLocation.value = { lat, lng };
        //                     await checkDeliveryArea(lat, lng);

        //                     // Get address for current location
        //                     try {
        //                         const response = await fetch(
        //                             `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
        //                         );
        //                         if (response.ok) {
        //                             const data = await response.json();
        //                             deliveryMessage.value = `Detected: ${data.display_name}`;
        //                             mapSearchQuery.value = data.display_name;
        //                         }
        //                     } catch (error) {
        //                         console.error('Error reverse geocoding:', error);
        //                     }
        //                 },
        //                 (error) => {
        //                     console.log("Geolocation error:", error);
        //                     // Keep default restaurant location
        //                 },
        //                 {
        //                     timeout: 10000,
        //                     enableHighAccuracy: true
        //                 }
        //             );
        //         }

        //         console.log('Map initialized successfully');

        //     } catch (error) {
        //         console.error('Error initializing map:', error);
        //     }
        // };

        // Delivery area check using Haversine formula
        const checkDeliveryArea = async (lat, lng) => {
            deliveryMessage.value = "Checking delivery area...";
            try {
                const restaurantLat = tenantSettings.value.latitude;
                const restaurantLng = tenantSettings.value.longitude;
                const deliveryRadius = tenantSettings.value.delivery_radius || 1.5;

                // Calculate distance using Haversine formula
                const distance = calculateDistance(restaurantLat, restaurantLng, lat, lng);

                if (distance <= deliveryRadius) {
                    deliveryAllowed.value = true;
                    deliveryMessage.value = `Great! We deliver to your location (${distance.toFixed(1)}km away)`;
                } else {
                    deliveryAllowed.value = false;
                    deliveryMessage.value = `Sorry! We only deliver within ${deliveryRadius}km (you're ${distance.toFixed(1)}km away)`;
                }
            } catch (err) {
                console.error("Error checking delivery area:", err);
                deliveryAllowed.value = false;
                deliveryMessage.value = "Error checking delivery area.";
            }
        };

        // Calculate distance using Haversine formula
        const calculateDistance = (lat1, lon1, lat2, lon2) => {
            const R = 6371; // Earth's radius in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLon = (lon2 - lon1) * Math.PI / 180;
            const a =
                Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(dLon/2) * Math.sin(dLon/2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
            return R * c;
        };

        // Confirm location
        const confirmLocation = () => {
            if (!userLocation.value || !deliveryAllowed.value) return;

            localStorage.setItem("user_location", JSON.stringify(userLocation.value));
            localStorage.setItem("delivery_available", "true");
            localStorage.setItem("delivery_restaurant_id", tenantSettings.value.id);

            Swal.fire({
                icon: "success",
                title: "Location Saved!",
                text: "You can now continue browsing and ordering.",
                confirmButtonColor: "#28a745",
            });
            showLocationModal.value = false;
        };

        // Close modal manually
        const closeModal = () => {
            showLocationModal.value = false;
            // Store that user skipped location selection
            localStorage.setItem("location_modal_shown", "true");

            // Clear search
            mapSearchQuery.value = "";
            mapSearchPredictions.value = [];
            showMapSearchResults.value = false;
            mapSearchLoading.value = false;
        };

        // Show modal only if not shown before and restaurant has location
        const shouldShowModal = () => {
            const alreadyShown = localStorage.getItem("location_modal_shown");
            const hasLocation = tenantSettings.value && tenantSettings.value.latitude && tenantSettings.value.longitude;
            return !alreadyShown && hasLocation;
        };

        // Watch for category change and filter products client-side
        const filteredMenuItems = computed(() => {
            let filtered = [...products.value];
            if (selectedCategory.value && selectedCategory.value.id) {
                filtered = filtered.filter(
                    (item) => item.category_id === selectedCategory.value.id
                );
            }
            switch (sortBy.value) {
                case "price_low_high":
                    filtered.sort((a, b) => a.price - b.price);
                    break;
                case "price_high_low":
                    filtered.sort((a, b) => b.price - a.price);
                    break;
                case "rating":
                    filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
                    break;
                default:
                    filtered.sort((a, b) => a.sort_order - b.sort_order);
            }
            return filtered;
        });

        const handleSort = (sortType) => {
            sortBy.value = sortType;
        };

        const handleReservation = async () => {
            reservationLoading.value = true;
            try {
                const response = await axios.post("/tenant/reservation", {
                    full_name: reservation.value.full_name,
                    phone_number: reservation.value.phone_number,
                    email: reservation.value.email,
                    date: reservation.value.date,
                    time: reservation.value.time,
                    guests: parseInt(reservation.value.guests, 10),
                    message: reservation.value.message,
                });
                if (response.data.success) {
                    await Swal.fire({
                        icon: "success",
                        title: "Reservation Submitted!",
                        text: response.data.message,
                        confirmButtonColor: "#c62828",
                    });
                    reservation.value = {
                        full_name: "",
                        phone_number: "",
                        email: "",
                        date: "",
                        time: "",
                        guests: "",
                        message: "",
                    };
                } else {
                    throw new Error(
                        response.data.message || "Submission failed."
                    );
                }
            } catch (error) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text:
                        error.response?.data?.message ||
                        "Something went wrong! Please try again.",
                    confirmButtonColor: "#c62828",
                });
            } finally {
                reservationLoading.value = false;
            }
        };

        onMounted(async () => {
            await fetchTenantSettings();
            await fetchCategories();
            await fetchProducts();

            // Initialize map after tenant settings are loaded
            if (tenantSettings.value && shouldShowModal()) {
                showLocationModal.value = true;
                // Small delay to ensure modal is rendered before initializing map
                setTimeout(() => {
                    initMap();
                }, 100);
            }

            document
                .querySelectorAll('[data-bs-toggle="tooltip"]')
                .forEach((el) => {
                    new Tooltip(el);
                });
        });

        return {
            loading,
            tenantSettings,
            categories,
            selectedCategory,
            viewMode,
            filteredMenuItems,
            handleSort,
            reservation,
            reservationLoading,
            handleReservation,
            cart,
            addToCart,
            showLocationModal,
            deliveryAllowed,
            deliveryMessage,
            closeModal,
            confirmLocation,
            // Map Search
            mapSearchQuery,
            mapSearchPredictions,
            showMapSearchResults,
            mapSearchLoading,
            mapSearchInput,
            onMapSearchInput,
            onMapSearchFocus,
            selectMapLocation,
            clearMapSearch,
            getPlaceIcon,
        };
    },
};
</script>
<style scoped>
.tenant-landing {
    min-height: 100vh;
    background-color: #f3f4f6;
}
.main-banner-section {
    overflow: hidden; /* Prevent banner overflow on small screens */
}
.menu-section {
    background: #fff;
}
.menu-section .nav-tabs .nav-link {
    font-weight: 500;
    color: #333;
    border: none;
    border-bottom: 2px solid transparent;
}
.menu-section .nav-tabs .nav-link.active {
    color: #d9534f;
    border-bottom-color: #d9534f;
}
.menu-section .nav-tabs .nav-link:hover {
    border-color: transparent;
}
.filter-bar .btn-outline-secondary {
    color: #555;
    border-color: #ccc;
}
.filter-bar .btn-link {
    color: #555;
}
.filter-bar .btn-link.active {
    color: #d9534f;
}
.list-menu-card img {
    width: 100%; /* Ensure image takes full width of its column */
}

/* Enhanced Map Search Styles */
.map-search-container {
    position: relative;
}

.map-search-results {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border: 1px solid #ddd;
    border-radius: 0 0 8px 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    max-height: 300px;
    overflow-y: auto;
    margin-top: 2px;
}

.map-search-item {
    padding: 12px 16px;
    cursor: pointer;
    border-bottom: 1px solid #f0f0f0;
    display: flex;
    align-items: flex-start;
    gap: 12px;
    transition: background-color 0.2s ease;
}

.map-search-item:hover {
    background-color: #f8f9fa;
    border-left: 3px solid #d9534f;
}

.map-search-item:last-child {
    border-bottom: none;
}

.map-search-icon {
    width: 20px;
    text-align: center;
    padding-top: 2px;
    flex-shrink: 0;
}

.map-search-icon i {
    font-size: 1rem;
}

.map-search-content {
    flex: 1;
    min-width: 0;
}

.map-search-content .fw-bold {
    font-size: 0.9rem;
    color: #333;
    margin-bottom: 2px;
}

.map-search-content .text-muted {
    font-size: 0.8rem;
    color: #666;
}

@media (max-width: 1199px) {
    .col-lg-3 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
    }
}
@media (max-width: 991px) {
    .col-lg-3,
    .col-md-6 {
        flex: 0 0 50%;
        max-width: 50%;
    }
}
@media (max-width: 767px) {
    .main-banner-section {
        margin-left: calc(-50vw + 50%) !important;
        margin-right: calc(-50vw + 50%) !important;
        width: 100vw !important;
        left: auto !important;
        right: auto !important;
        min-height: 200px;
    }
    .main-banner-section .container {
        padding-left: 15px;
        padding-right: 15px;
    }
    .main-banner-section .text-white {
        margin-top: 80px !important;
        padding: 1rem !important;
    }
    .main-banner-section img {
        height: 60px !important;
        width: auto !important;
    }
    .main-banner-section h3 {
        font-size: 1.5rem !important;
    }
    .main-banner-section .badge {
        font-size: 0.8rem !important;
        padding: 0.25rem 0.5rem !important;
    }
    .list-menu-card img {
        height: 180px !important;
        width: 100% !important;
        object-fit: cover;
    }
    .col-lg-3,
    .col-md-6,
    .col-12,
    .col-sm-6 {
        flex: 0 0 100%;
        max-width: 100%;
    }

    .map-search-results {
        max-height: 250px;
    }

    .map-search-item {
        padding: 10px 12px;
    }
    
    .filter-bar {
        flex-direction: column;
        gap: 0.75rem;
    }
    
    .filter-bar > div {
        width: 100%;
    }
    
    .nav-tabs {
        flex-wrap: wrap;
    }
    
    .nav-tabs .nav-link {
        font-size: 0.9rem;
        padding: 0.5rem 0.75rem;
    }
    
    .reservation-card {
        padding: 1.5rem 1rem !important;
    }
    
    .reservation-title {
        font-size: 1.5rem;
    }
    
    .modal-dialog {
        margin: 0.5rem;
    }
    
    #deliveryMap {
        height: 300px !important;
    }
}

/* Android-specific fixes */
@supports (-webkit-touch-callout: none) {
  /* iOS specific */
}

/* Android Chrome/WebView compatibility */
@media screen and (-webkit-min-device-pixel-ratio: 0) {
  .main-banner-section,
  .menu-section,
  .reservation-section {
    -webkit-transform: translateZ(0);
    transform: translateZ(0);
    -webkit-font-smoothing: antialiased;
  }
  
  .card,
  .reservation-card {
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
  }
  
  input, textarea, select {
    -webkit-appearance: none;
    -webkit-border-radius: 4px;
    border-radius: 4px;
  }
  
  button, .btn {
    -webkit-tap-highlight-color: rgba(198, 40, 40, 0.2);
    touch-action: manipulation;
  }
  
  .nav-link,
  .nav-tabs .nav-link {
    -webkit-tap-highlight-color: rgba(198, 40, 40, 0.1);
    touch-action: manipulation;
  }
  
  img {
    -webkit-user-select: none;
    user-select: none;
    max-width: 100%;
    height: auto;
  }
}

/* Android device-specific breakpoints */
@media screen and (max-width: 480px) and (-webkit-min-device-pixel-ratio: 0) {
  .main-banner-section .text-white {
    margin-top: 50px !important;
    padding: 0.5rem !important;
  }
  .main-banner-section img {
    height: 40px !important;
  }
  .main-banner-section h3 {
    font-size: 1.1rem !important;
  }
  .filter-bar {
    padding: 0.5rem !important;
  }
  .nav-tabs .nav-link {
    font-size: 0.8rem;
    padding: 0.35rem 0.5rem;
  }
  .reservation-card {
    padding: 0.75rem 0.5rem !important;
  }
  .input-group-text {
    padding: 0.4rem;
    font-size: 0.85rem;
  }
  .form-control {
    font-size: 0.85rem;
    padding: 0.4rem;
  }
}

@media (max-width: 575px) {
    .main-banner-section {
        min-height: 180px;
    }
    .main-banner-section .text-white {
        margin-top: 60px !important;
        padding: 0.75rem !important;
        flex-direction: column !important;
        text-align: center !important;
    }
    .main-banner-section img {
        height: 50px !important;
        margin-bottom: 0.5rem !important;
        margin-right: 0 !important;
    }
    .main-banner-section h3 {
        font-size: 1.25rem !important;
    }
    .main-banner-section .badge {
        font-size: 0.75rem !important;
    }
    .breadcrumb {
        font-size: 0.85rem;
        padding: 0.5rem 0;
    }
    .nav-tabs .nav-link {
        font-size: 0.85rem;
        padding: 0.4rem 0.6rem;
    }
    .filter-bar {
        padding: 0.75rem !important;
    }
    .filter-bar .btn {
        font-size: 0.85rem;
        padding: 0.4rem 0.75rem;
    }
    .card-title {
        font-size: 1rem !important;
    }
    .card-text {
        font-size: 0.85rem !important;
    }
    .reservation-card {
        padding: 1rem 0.75rem !important;
    }
    .reservation-title {
        font-size: 1.25rem;
    }
    .reservation-subtitle {
        font-size: 0.9rem;
    }
    .input-group-text {
        padding: 0.5rem;
    }
    .form-control {
        font-size: 0.9rem;
    }
    .btn-danger {
        font-size: 0.9rem;
        padding: 0.5rem 1rem;
    }
    .modal-dialog {
        margin: 0.25rem;
    }
    .modal-content {
        padding: 0.75rem !important;
    }
    #deliveryMap {
        height: 250px !important;
    }
    .map-search-results {
        max-height: 200px;
    }
}
.reservation-section {
    background: #faf9f7;
}
.reservation-card {
    background: #fff;
    border-radius: 12px;
    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.1);
    padding: 2.5rem 2rem 1.5rem 2rem;
    max-width: 1100px;
    margin: 0 auto;
    border: 1.5px solid #e0e0e0;
}
.reservation-title {
    font-family: "Playfair Display", serif;
    font-weight: bold;
    color: #222;
    font-size: 2.2rem;
    margin-bottom: 0.5rem;
    border-bottom: 3px solid #c62828;
    padding-bottom: 0.2rem;
}
.reservation-subtitle {
    color: #666;
    font-size: 1.08rem;
}
.reservation-callout {
    background: #f5f5f5;
    border-top: 1.5px solid #eee;
    padding: 1rem 0 0.5rem 0;
    color: #c62828;
    font-size: 1.08rem;
}

/* Modal Responsive Styles */
.modal-dialog {
    max-width: 90vw;
}

.modal-content {
    border-radius: 12px;
}

.modal-header {
    padding: 1rem;
}

.modal-body {
    padding: 1rem;
}

@media (max-width: 991.98px) {
    .reservation-card {
        padding: 1.2rem 0.5rem 1rem 0.5rem;
        max-width: 99vw;
    }
    .modal-dialog {
        max-width: 95vw;
    }
}
@media (max-width: 767.98px) {
    .reservation-title {
        font-size: 1.5rem;
    }
    .reservation-card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
        padding: 1rem 0.2rem 0.5rem 0.2rem;
    }
    .modal-dialog {
        max-width: 98vw;
        margin: 0.5rem auto;
    }
    .modal-header h5 {
        font-size: 1rem;
    }
    .modal-body {
        padding: 0.75rem;
    }
    .map-search-container {
        margin-bottom: 0.75rem;
    }
    .map-search-container .form-control {
        font-size: 0.9rem;
    }
}
</style>
