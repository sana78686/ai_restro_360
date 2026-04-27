<template>
    <div class="pulse-dashboard">
        <header class="pulse-head">
            <h1 class="pulse-title">{{ $t("main_dashboard.pulse.title") }}</h1>
            <div class="pulse-tabs" role="tablist">
                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'insights'"
                    :class="['pulse-tab', { active: activeTab === 'insights' }]"
                    @click="activeTab = 'insights'"
                >
                    {{ $t("main_dashboard.pulse.insights") }}
                </button>
                <button
                    type="button"
                    role="tab"
                    :aria-selected="activeTab === 'overview'"
                    :class="['pulse-tab', { active: activeTab === 'overview' }]"
                    @click="activeTab = 'overview'"
                >
                    {{ $t("main_dashboard.pulse.overview") }}
                </button>
            </div>
        </header>

        <div class="pulse-toolbar">
            <div class="search-wrap">
                <i class="fas fa-magnifying-glass search-ico" aria-hidden="true" />
                <input
                    v-model="searchQuery"
                    type="search"
                    class="pulse-search"
                    :placeholder="$t('main_dashboard.pulse.searchPlaceholder')"
                    autocomplete="off"
                />
            </div>
            <router-link to="/dashboard/tenants" class="filter-pill">
                <i class="fas fa-location-dot me-2" aria-hidden="true" />
                {{ $t("main_dashboard.pulse.tenantsScope", { count: stats.totalTenants }) }}
            </router-link>
        </div>

        <section v-show="activeTab === 'insights'" class="pulse-insights">
            <div class="kpi-row">
                <article class="kpi-card">
                    <div class="kpi-head">
                        <span>{{ $t("main_dashboard.pulse.healthScore") }}</span>
                        <i class="fas fa-circle-info kpi-info" aria-hidden="true" />
                    </div>
                    <div class="kpi-value-row">
                        <span class="kpi-num">{{ healthScore }}</span>
                        <span class="kpi-suffix text-warn">{{ $t("main_dashboard.pulse.healthAverage") }}</span>
                    </div>
                    <div class="health-track" aria-hidden="true">
                        <div class="health-seg health-seg--bad" />
                        <div class="health-seg health-seg--mid" />
                        <div class="health-seg health-seg--ok" />
                        <div class="health-seg health-seg--fade" />
                        <div class="health-seg health-seg--fade" />
                        <div class="health-marker" :style="{ left: `${healthMarkerPct}%` }" />
                    </div>
                </article>

                <article class="kpi-card">
                    <div class="kpi-head">
                        <span>{{ $t("main_dashboard.stats.suspendedTenants") }}</span>
                        <i class="fas fa-circle-info kpi-info" aria-hidden="true" />
                    </div>
                    <div class="kpi-value-row">
                        <span class="kpi-num">{{ stats.suspendedTenants }}</span>
                    </div>
                    <span class="kpi-badge kpi-badge--danger">
                        {{ $t("main_dashboard.pulse.suspendedHint", { count: stats.suspendedTenants }) }}
                    </span>
                </article>

                <article class="kpi-card">
                    <div class="kpi-head">
                        <span>{{ $t("main_dashboard.stats.pendingTenants") }}</span>
                        <i class="fas fa-circle-info kpi-info" aria-hidden="true" />
                    </div>
                    <div class="kpi-value-row">
                        <span class="kpi-num">{{ stats.pendingTenants }}</span>
                    </div>
                    <p class="kpi-sub">
                        {{ $t("main_dashboard.pulse.pendingHint", { count: stats.pendingTenants }) }}
                    </p>
                </article>

                <article class="kpi-card">
                    <div class="kpi-head">
                        <span>{{ $t("main_dashboard.stats.activeTenants") }}</span>
                        <i class="fas fa-circle-info kpi-info" aria-hidden="true" />
                    </div>
                    <div class="kpi-value-row">
                        <span class="kpi-num">{{ stats.activeTenants }}</span>
                    </div>
                    <p class="kpi-sub">
                        {{ $t("main_dashboard.pulse.activeShare", { pct: activeSharePct }) }}
                    </p>
                </article>

                <article class="kpi-card">
                    <div class="kpi-head">
                        <span>{{ $t("main_dashboard.pulse.userPulse") }}</span>
                        <i class="fas fa-circle-info kpi-info" aria-hidden="true" />
                    </div>
                    <div class="kpi-value-row kpi-value-row--stars">
                        <span class="kpi-num">{{ stats.totalUsers }}</span>
                        <span class="stars" aria-hidden="true">
                            <i
                                v-for="n in 5"
                                :key="n"
                                class="fas fa-star"
                                :class="{ 'star--off': n > filledStars }"
                            />
                        </span>
                    </div>
                    <p class="kpi-sub">
                        {{ $t("main_dashboard.pulse.userHint", { count: stats.totalRoles }) }}
                    </p>
                </article>
            </div>

            <div class="chart-card">
                <div class="chart-head">
                    <h2 class="chart-title">{{ $t("main_dashboard.pulse.trendTitle") }}</h2>
                    <p class="chart-sub">{{ $t("main_dashboard.pulse.trendSubtitle") }}</p>
                </div>
                <div class="chart-body">
                    <div class="y-axis">
                        <span v-for="lbl in yLabels" :key="lbl">{{ lbl }}</span>
                    </div>
                    <svg
                        class="trend-svg"
                        viewBox="0 0 820 260"
                        preserveAspectRatio="none"
                        aria-hidden="true"
                    >
                        <line
                            v-for="(gy, i) in gridY"
                            :key="'g' + i"
                            x1="48"
                            :y1="gy"
                            x2="800"
                            :y2="gy"
                            class="grid-line"
                        />
                        <polyline :points="secondaryPoints" class="line line--ghost" fill="none" />
                        <polyline :points="primaryPoints" class="line line--primary" fill="none" />
                    </svg>
                </div>
            </div>

            <div class="row g-4 mt-1">
                <div class="col-lg-6">
                    <div class="panel-card">
                        <div class="panel-head">
                            <h3>{{ $t("main_dashboard.pulse.recentTitle") }}</h3>
                            <router-link to="/dashboard/tenants" class="panel-link">{{ $t("common.viewAll") }}</router-link>
                        </div>
                        <div class="table-responsive">
                            <table class="table pulse-table mb-0">
                                <thead>
                                    <tr>
                                        <th>{{ $t("tenants.list.name") }}</th>
                                        <th>{{ $t("tenants.list.owner") }}</th>
                                        <th>{{ $t("tenants.list.status") }}</th>
                                        <th>{{ $t("common.actions") }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="tenant in filteredRecentTenants" :key="tenant.id">
                                        <td>
                                            <div class="d-flex align-items-center">
                                                <img
                                                    :src="tenant.logo_url || tenant.logo || '/images/default-restaurant.png'"
                                                    class="tenant-logo me-2"
                                                    :alt="tenant.name"
                                                />
                                                {{ tenant.name }}
                                            </div>
                                        </td>
                                        <td>{{ tenant.owner_name }}</td>
                                        <td>
                                            <span class="badge" :class="getStatusBadgeClass(tenant.status)">
                                                {{ tenant.status }}
                                            </span>
                                        </td>
                                        <td>
                                            <div class="btn-group">
                                                <button
                                                    v-if="tenant.status === 'pending'"
                                                    class="btn btn-sm btn-success"
                                                    type="button"
                                                    @click="approveTenant(tenant)"
                                                >
                                                    <i class="fas fa-check" />
                                                </button>
                                                <button
                                                    v-if="tenant.status === 'active'"
                                                    class="btn btn-sm btn-warning"
                                                    type="button"
                                                    @click="suspendTenant(tenant)"
                                                >
                                                    <i class="fas fa-pause" />
                                                </button>
                                                <button
                                                    v-if="tenant.status === 'suspended'"
                                                    class="btn btn-sm btn-success"
                                                    type="button"
                                                    @click="activateTenant(tenant)"
                                                >
                                                    <i class="fas fa-play" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                    <tr v-if="!filteredRecentTenants.length">
                                        <td colspan="4" class="text-muted py-4 text-center">—</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="panel-card">
                        <div class="panel-head">
                            <h3>{{ $t("main_dashboard.pulse.systemTitle") }}</h3>
                        </div>
                        <ul class="stat-list">
                            <li>
                                <span>{{ $t("main_dashboard.stats.totalUsers") }}</span>
                                <span class="pill pill--blue">{{ stats.totalUsers }}</span>
                            </li>
                            <li>
                                <span>{{ $t("main_dashboard.stats.totalRoles") }}</span>
                                <span class="pill pill--blue">{{ stats.totalRoles }}</span>
                            </li>
                            <li>
                                <span>{{ $t("main_dashboard.stats.activeUsers") }}</span>
                                <span class="pill pill--green">{{ stats.activeUsersToday }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="panel-card mt-4">
                        <div class="panel-head">
                            <h3>{{ $t("main_dashboard.pulse.quickTitle") }}</h3>
                        </div>
                        <div class="quick-grid">
                            <router-link to="/dashboard/tenants" class="quick-tile">
                                <i class="fas fa-store" />
                                <span>{{ $t("main_dashboard.quickActions.manageTenants") }}</span>
                            </router-link>
                            <router-link to="/dashboard/users" class="quick-tile">
                                <i class="fas fa-users" />
                                <span>{{ $t("main_dashboard.quickActions.manageUsers") }}</span>
                            </router-link>
                            <router-link to="/dashboard/roles" class="quick-tile">
                                <i class="fas fa-user-shield" />
                                <span>{{ $t("main_dashboard.quickActions.manageRoles") }}</span>
                            </router-link>
                            <a href="#" class="quick-tile" @click.prevent="clearCache">
                                <i class="fas fa-sync" />
                                <span>{{ $t("main_dashboard.quickActions.clearCache") }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section v-show="activeTab === 'overview'" class="pulse-overview">
            <div class="row g-4">
                <div class="col-md-6">
                    <div class="panel-card">
                        <div class="panel-head">
                            <h3>{{ $t("dashboard.systemStats") }}</h3>
                        </div>
                        <ul class="stat-list">
                            <li>
                                <span>{{ $t("main_dashboard.stats.totalUsers") }}</span>
                                <span class="pill pill--blue">{{ stats.totalUsers }}</span>
                            </li>
                            <li>
                                <span>{{ $t("main_dashboard.stats.totalRoles") }}</span>
                                <span class="pill pill--blue">{{ stats.totalRoles }}</span>
                            </li>
                            <li>
                                <span>{{ $t("main_dashboard.stats.activeUsers") }}</span>
                                <span class="pill pill--green">{{ stats.activeUsersToday }}</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="panel-card">
                        <div class="panel-head">
                            <h3>{{ $t("main_dashboard.quickActions.title") }}</h3>
                        </div>
                        <div class="quick-grid quick-grid--large">
                            <router-link to="/dashboard/tenants" class="quick-tile">
                                <i class="fas fa-store" />
                                <span>{{ $t("main_dashboard.quickActions.manageTenants") }}</span>
                            </router-link>
                            <router-link to="/dashboard/users" class="quick-tile">
                                <i class="fas fa-users" />
                                <span>{{ $t("main_dashboard.quickActions.manageUsers") }}</span>
                            </router-link>
                            <router-link to="/dashboard/roles" class="quick-tile">
                                <i class="fas fa-user-shield" />
                                <span>{{ $t("main_dashboard.quickActions.manageRoles") }}</span>
                            </router-link>
                            <a href="#" class="quick-tile" @click.prevent="clearCache">
                                <i class="fas fa-sync" />
                                <span>{{ $t("main_dashboard.quickActions.clearCache") }}</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import { ref, onMounted, watch, computed } from "vue";
import axios from "axios";
import Swal from "sweetalert2";

export default {
    name: "Dashboard",
    setup() {
        const activeTab = ref("insights");
        const searchQuery = ref("");
        const stats = ref({
            totalTenants: 0,
            activeTenants: 0,
            pendingTenants: 0,
            suspendedTenants: 0,
            totalUsers: 0,
            totalRoles: 0,
            totalPermissions: 0,
            activeUsersToday: 0,
        });
        const recentTenants = ref([]);
        const loading = ref(true);
        const error = ref(null);

        const healthScore = computed(() => {
            const t = stats.value.totalTenants || 0;
            if (!t) return 0;
            return Math.min(100, Math.round((stats.value.activeTenants / t) * 100));
        });

        const healthMarkerPct = computed(() => Math.min(100, Math.max(0, healthScore.value)));

        const activeSharePct = computed(() => {
            const t = stats.value.totalTenants || 0;
            if (!t) return 0;
            return Math.round((stats.value.activeTenants / t) * 100);
        });

        const filledStars = computed(() => {
            const h = healthScore.value;
            if (h >= 85) return 5;
            if (h >= 70) return 4;
            if (h >= 55) return 3;
            if (h >= 40) return 2;
            return 1;
        });

        const chartPrimaryRaw = computed(() => {
            const t = stats.value.totalTenants || 0;
            const u = stats.value.totalUsers || 0;
            const base = Math.max(t + u, 8);
            const ratios = [0.55, 0.6, 0.58, 0.66, 0.64, 0.72, 0.78, 0.74, 0.82, 0.88, 0.91, 0.97];
            return ratios.map((r, i) => Math.round(base * r * (1 + Math.sin(i * 0.55) * 0.07)));
        });

        const chartSecondaryRaw = computed(() =>
            chartPrimaryRaw.value.map((v, i) => Math.round(v * (0.88 - (i % 3) * 0.02)))
        );

        const chartMax = computed(() => {
            const a = chartPrimaryRaw.value;
            const b = chartSecondaryRaw.value;
            return Math.max(10, ...a, ...b) * 1.08;
        });

        const yLabels = computed(() => {
            const max = chartMax.value;
            const step = max / 5;
            const labels = [];
            for (let i = 5; i >= 0; i--) {
                const v = Math.round(step * i);
                labels.push(v >= 1000 ? `${Math.round(v / 1000)}K` : `${v}`);
            }
            return labels;
        });

        const gridY = computed(() => {
            const innerTop = 36;
            const innerH = 180;
            return [0, 1, 2, 3, 4, 5].map((i) => innerTop + (innerH / 5) * i);
        });

        const buildPoints = (vals) => {
            const n = vals.length;
            if (n < 2) return "";
            const padX = 52;
            const padT = 36;
            const w = 800 - padX - 16;
            const h = 180;
            const max = chartMax.value || 1;
            return vals
                .map((v, i) => {
                    const x = padX + (i / (n - 1)) * w;
                    const y = padT + h - (v / max) * h;
                    return `${x},${y}`;
                })
                .join(" ");
        };

        const primaryPoints = computed(() => buildPoints(chartPrimaryRaw.value));
        const secondaryPoints = computed(() => buildPoints(chartSecondaryRaw.value));

        const filteredRecentTenants = computed(() => {
            const q = searchQuery.value.trim().toLowerCase();
            if (!q) return recentTenants.value;
            return recentTenants.value.filter((t) => {
                const name = (t.name || "").toLowerCase();
                const owner = (t.owner_name || "").toLowerCase();
                const st = (t.status || "").toLowerCase();
                return name.includes(q) || owner.includes(q) || st.includes(q);
            });
        });

        const fetchDashboardData = async () => {
            loading.value = true;
            error.value = null;
            try {
                const statsRes = await axios.get("/dashboard/stats");
                if (statsRes.data && statsRes.data.data) {
                    stats.value = statsRes.data.data;
                }
                const tenantsRes = await axios.get("/dashboard/recent-tenants");
                if (tenantsRes.data && tenantsRes.data.data) {
                    const today = new Date().toISOString().slice(0, 10);
                    recentTenants.value = tenantsRes.data.data.filter(
                        (t) => t.created_at && t.created_at.slice(0, 10) === today
                    );
                }
            } catch (err) {
                error.value = "Failed to load dashboard data.";
                console.error("Error fetching dashboard data:", err);
            } finally {
                loading.value = false;
            }
        };

        const getStatusBadgeClass = (status) => {
            const classes = {
                active: "bg-success",
                pending: "bg-warning",
                suspended: "bg-danger",
                trial: "bg-secondary",
                inactive: "bg-secondary",
            };
            return classes[status] || "bg-secondary";
        };

        const approveTenant = async (tenant) => {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to approve this tenant?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, approve",
                cancelButtonText: "Cancel",
            });
            if (result.isConfirmed) {
                try {
                    await axios.patch(`/dashboard/tenants/${tenant.id}/status`, { status: "active" });
                    await fetchDashboardData();
                    Swal.fire({
                        icon: "success",
                        title: "Approved",
                        text: "Tenant has been approved.",
                    });
                } catch (e) {
                    console.error("Error approving tenant:", e);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to approve tenant.",
                    });
                }
            }
        };

        const suspendTenant = async (tenant) => {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Are you sure you want to suspend this tenant?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonText: "Yes, suspend",
                cancelButtonText: "Cancel",
            });
            if (result.isConfirmed) {
                try {
                    await axios.patch(`/dashboard/tenants/${tenant.id}/status`, { status: "suspended" });
                    await fetchDashboardData();
                    Swal.fire({
                        icon: "success",
                        title: "Suspended",
                        text: "Tenant has been suspended.",
                    });
                } catch (e) {
                    console.error("Error suspending tenant:", e);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to suspend tenant.",
                    });
                }
            }
        };

        const activateTenant = async (tenant) => {
            const result = await Swal.fire({
                title: "Are you sure?",
                text: "Do you want to activate this tenant?",
                icon: "question",
                showCancelButton: true,
                confirmButtonText: "Yes, activate",
                cancelButtonText: "Cancel",
            });
            if (result.isConfirmed) {
                try {
                    await axios.patch(`/dashboard/tenants/${tenant.id}/status`, { status: "active" });
                    await fetchDashboardData();
                    Swal.fire({
                        icon: "success",
                        title: "Activated",
                        text: "Tenant has been activated.",
                    });
                } catch (e) {
                    console.error("Error activating tenant:", e);
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "Failed to activate tenant.",
                    });
                }
            }
        };

        const clearCache = async () => {
            try {
                await axios.post("/clear-cache");
                alert("Cache cleared successfully");
            } catch (e) {
                console.error("Error clearing cache:", e);
            }
        };

        onMounted(() => {
            fetchDashboardData();
            watch(
                () => error.value,
                (val) => {
                    if (val) {
                        Swal.fire({
                            icon: "error",
                            title: "Error",
                            text: val,
                        });
                    }
                }
            );
        });

        return {
            activeTab,
            searchQuery,
            stats,
            recentTenants,
            loading,
            error,
            healthScore,
            healthMarkerPct,
            activeSharePct,
            filledStars,
            yLabels,
            gridY,
            primaryPoints,
            secondaryPoints,
            filteredRecentTenants,
            getStatusBadgeClass,
            approveTenant,
            suspendTenant,
            activateTenant,
            clearCache,
        };
    },
};
</script>

<style scoped>
.pulse-dashboard {
    max-width: 1400px;
    margin: 0 auto;
}

.pulse-head {
    margin-bottom: 0.5rem;
}

.pulse-title {
    font-size: 2rem;
    font-weight: 700;
    letter-spacing: -0.02em;
    color: #111827;
    margin: 0 0 1rem;
}

.pulse-tabs {
    display: flex;
    gap: 1.5rem;
    border-bottom: 1px solid #e5e7eb;
}

.pulse-tab {
    border: none;
    background: none;
    padding: 0.5rem 0 0.75rem;
    font-size: 0.95rem;
    font-weight: 500;
    color: #6b7280;
    cursor: pointer;
    position: relative;
    margin-bottom: -1px;
}

.pulse-tab.active {
    color: #059669;
}

.pulse-tab.active::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: 2px;
    background: #059669;
    border-radius: 2px 2px 0 0;
}

.pulse-toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
    margin: 1.25rem 0 1.5rem;
}

.search-wrap {
    flex: 1;
    min-width: 220px;
    position: relative;
}

.search-ico {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #9ca3af;
    font-size: 0.95rem;
    pointer-events: none;
}

.pulse-search {
    width: 100%;
    border: 1px solid #e5e7eb;
    border-radius: 999px;
    padding: 0.65rem 1rem 0.65rem 2.5rem;
    font-size: 0.95rem;
    background: #fff;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
}

.pulse-search:focus {
    outline: none;
    border-color: #059669;
    box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.15);
}

.filter-pill {
    display: inline-flex;
    align-items: center;
    padding: 0.55rem 1.15rem;
    border-radius: 999px;
    background: #fff;
    border: 1px solid #e5e7eb;
    color: #374151;
    text-decoration: none;
    font-size: 0.9rem;
    font-weight: 500;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    white-space: nowrap;
}

.filter-pill:hover {
    border-color: #059669;
    color: #059669;
}

.kpi-row {
    display: grid;
    grid-template-columns: repeat(5, minmax(0, 1fr));
    gap: 1rem;
    margin-bottom: 1.25rem;
}

@media (max-width: 1200px) {
    .kpi-row {
        grid-template-columns: repeat(3, minmax(0, 1fr));
    }
}

@media (max-width: 768px) {
    .kpi-row {
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }
}

@media (max-width: 480px) {
    .kpi-row {
        grid-template-columns: 1fr;
    }
}

.kpi-card {
    background: #fff;
    border-radius: 14px;
    padding: 1.1rem 1.15rem;
    border: 1px solid #eef0f3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
}

.kpi-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.8rem;
    font-weight: 600;
    color: #6b7280;
    margin-bottom: 0.5rem;
}

.kpi-info {
    color: #d1d5db;
    font-size: 0.75rem;
}

.kpi-value-row {
    display: flex;
    align-items: baseline;
    flex-wrap: wrap;
    gap: 0.35rem;
    margin-bottom: 0.35rem;
}

.kpi-value-row--stars {
    align-items: center;
}

.kpi-num {
    font-size: 1.65rem;
    font-weight: 700;
    color: #111827;
    line-height: 1.2;
}

.kpi-suffix {
    font-size: 0.85rem;
    font-weight: 600;
}

.text-warn {
    color: #ca8a04;
}

.kpi-sub {
    margin: 0;
    font-size: 0.78rem;
    color: #9ca3af;
}

.kpi-badge {
    display: inline-block;
    font-size: 0.72rem;
    font-weight: 600;
    padding: 0.2rem 0.5rem;
    border-radius: 6px;
}

.kpi-badge--danger {
    background: #fef2f2;
    color: #dc2626;
}

.health-track {
    display: flex;
    height: 8px;
    border-radius: 6px;
    overflow: visible;
    margin-top: 0.65rem;
    position: relative;
    gap: 3px;
}

.health-seg {
    flex: 1;
    border-radius: 3px;
    min-height: 8px;
}

.health-seg--bad {
    background: #fecaca;
}

.health-seg--mid {
    background: #fde047;
}

.health-seg--ok {
    background: #4ade80;
}

.health-seg--fade {
    background: #d1fae5;
    opacity: 0.65;
}

.health-marker {
    position: absolute;
    top: -4px;
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 7px solid #111827;
    transform: translateX(-50%);
    margin-left: 0;
}

.stars {
    margin-left: 0.25rem;
    color: #eab308;
    font-size: 0.85rem;
    letter-spacing: 1px;
}

.stars .star--off {
    color: #e5e7eb;
}

.chart-card {
    background: #fff;
    border-radius: 16px;
    border: 1px solid #eef0f3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    padding: 1.25rem 1.5rem 1rem;
    margin-bottom: 1.25rem;
}

.chart-head {
    margin-bottom: 0.75rem;
}

.chart-title {
    font-size: 1rem;
    font-weight: 600;
    margin: 0 0 0.2rem;
    color: #111827;
}

.chart-sub {
    margin: 0;
    font-size: 0.8rem;
    color: #9ca3af;
}

.chart-body {
    display: flex;
    gap: 0.5rem;
    align-items: stretch;
    min-height: 220px;
}

.y-axis {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 0.7rem;
    color: #9ca3af;
    padding: 0.25rem 0;
    width: 2rem;
    flex-shrink: 0;
    text-align: right;
}

.trend-svg {
    flex: 1;
    width: 100%;
    height: 220px;
}

.grid-line {
    stroke: #f3f4f6;
    stroke-width: 1;
}

.line {
    stroke-width: 2.5;
    stroke-linecap: round;
    stroke-linejoin: round;
}

.line--primary {
    stroke: #2563eb;
}

.line--ghost {
    stroke: #d1d5db;
    stroke-dasharray: 6 6;
    stroke-width: 2;
}

.panel-card {
    background: #fff;
    border-radius: 14px;
    border: 1px solid #eef0f3;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.04);
    overflow: hidden;
}

.panel-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 1.15rem;
    border-bottom: 1px solid #f3f4f6;
}

.panel-head h3 {
    margin: 0;
    font-size: 0.95rem;
    font-weight: 600;
    color: #111827;
}

.panel-link {
    font-size: 0.85rem;
    font-weight: 500;
    color: #059669;
    text-decoration: none;
}

.panel-link:hover {
    text-decoration: underline;
}

.pulse-table thead th {
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: #9ca3af;
    border-bottom-width: 1px;
}

.pulse-table td {
    vertical-align: middle;
    font-size: 0.875rem;
}

.stat-list {
    list-style: none;
    margin: 0;
    padding: 0.5rem 0;
}

.stat-list li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.65rem 1.15rem;
    font-size: 0.9rem;
    color: #374151;
    border-bottom: 1px solid #f9fafb;
}

.stat-list li:last-child {
    border-bottom: none;
}

.pill {
    font-size: 0.8rem;
    font-weight: 600;
    padding: 0.25rem 0.65rem;
    border-radius: 999px;
}

.pill--blue {
    background: #eff6ff;
    color: #2563eb;
}

.pill--green {
    background: #ecfdf5;
    color: #059669;
}

.quick-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 0.75rem;
    padding: 1rem;
}

.quick-grid--large {
    grid-template-columns: repeat(2, 1fr);
}

.quick-tile {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    padding: 1.1rem;
    border-radius: 12px;
    background: #f9fafb;
    color: #374151;
    text-decoration: none;
    font-size: 0.8rem;
    font-weight: 500;
    text-align: center;
    transition: background 0.15s ease, transform 0.15s ease;
    border: 1px solid transparent;
}

.quick-tile:hover {
    background: #f3f4f6;
    transform: translateY(-1px);
    color: #059669;
}

.quick-tile i {
    font-size: 1.25rem;
    color: #059669;
}

.tenant-logo {
    width: 30px;
    height: 30px;
    object-fit: cover;
    border-radius: 6px;
}
</style>
