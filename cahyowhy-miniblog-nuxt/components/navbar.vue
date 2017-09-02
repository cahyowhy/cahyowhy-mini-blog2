<template>
    <header class="header navbar-fixed-top">
        <!-- Navbar -->
        <nav class="navbar" role="navigation">
            <div class="container">
                <!-- Brand and toggle get grouped for better mobile display -->
                <div class="menu-container js_nav-item">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".nav-collapse">
                        <span class="sr-only">Toggle navigation</span>
                        <span class="toggle-icon"></span>
                    </button>
                    <!-- Logo -->
                    <div class="logo">
                        <nuxt-link class="logo-wrap" to="/">
                            <img class="logo-img" src="~assets/img/logo.png" alt="Asentus Logo">
                        </nuxt-link>
                    </div>
                    <!-- End Logo -->
                </div>
                <!-- Collect the nav links, forms, and other content for toggling -->
                <div class="collapse navbar-collapse nav-collapse">
                    <div class="menu-container">
                        <ul class="nav navbar-nav navbar-nav-right">
                            <li class="js_nav-item nav-item">
                                <nuxt-link class="nav-item-child nav-item-hover" to="/post">
                                    Post
                                </nuxt-link>
                            </li>

                            <li class="js_nav-item nav-item login">
                                <nuxt-link class="nav-item-child nav-item-hover" to="/timeline">
                                    Linimasa
                                </nuxt-link>
                            </li>
                            <li class="js_nav-item nav-item user">
                                <nuxt-link class="nav-item-child nav-item-hover" to="/profile">
                                    Profile
                                </nuxt-link>
                            </li>
                            <li class="js_nav-item nav-item">
                                <a @click="onLogOut" class="nav-item-child nav-item-hover">Keluar</a>
                            </li>

                            <li class="js_nav-item nav-item login">
                                <nuxt-link class="nav-item-child nav-item-hover" to="/login">
                                    Masuk
                                </nuxt-link>
                            </li>
                            <li class="js_nav-item nav-item login">
                                <nuxt-link class="nav-item-child nav-item-hover" to="/sign-up">
                                    Registrasi
                                </nuxt-link>
                            </li>
                            <!--<li class="js_nav-item nav-item">-->
                                <!--<div class="search-wrapp-nav">-->
                                    <!--<div class="input-group">-->
                                        <!--<span @click="onsearch" class="input-group-addon" id="basic-addon1">-->
                                        <!--<i class="ion-ios-search-strong ion"></i>-->
                                        <!--</span>-->
                                        <!--<input type="text" class="form-control" @enter="onsearch" placeholder="Cari...">-->
                                    <!--</div>-->
                                <!--</div>-->
                            <!--</li>-->
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script>
    export default {
        methods: {
            onLogOut(){
                console.log("something great");
            },
            onsearch(){
                console.log("something great");
            }
        }
    }
</script>
