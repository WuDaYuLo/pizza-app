<template>
    <div class="card text-dark bg-light mb-3">
        <div class="card-header">联系我们</div>
        <div class="card-body">
            <h4 class="card-title">联系我们</h4>
            <p class="card-body">1234567@qq.com</p>
        </div>
        <div>
            <router-link :to="{name:'Phone'}">电话</router-link>
            <router-link :to="{name:'PersonName'}">联系人</router-link>
        </div>
        <router-view></router-view>
    </div>
</template>
