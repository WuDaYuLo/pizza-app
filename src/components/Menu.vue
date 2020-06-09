<template>
    <div class="row">
        <!-- 菜单栏 -->
        <div class="col-sm-12 col-md-8">
            <table class="table">
                <thead class="thead-default">
                    <tr>
                        <th>尺寸</th>
                        <th>价格</th>
                        <th>加入</th>
                    </tr> 
                </thead>
                <tbody v-for="(item,index) in getMenuItem" :key="index">
                    <tr>
                        <td><Strong>{{item.name}}</Strong></td>
                    </tr>
                    <tr v-for="(option,index) in item.options" :key="index">
                        <td>{{option.size}}</td>
                        <td>{{option.price}}</td>
                        <td><button @click="addToBasket(item,option)" class="btn btn-sm btn-outline-success">+</button></td>
                    </tr>
                </tbody>
            </table>
            <!-- {{baskets}} -->
        </div>
        <!-- 购物车 -->
        <div class="col-sm-12 col-md-4">
            <div v-if="baskets.length>0">
                <table class="table">
                    <thead class="thead-default">
                        <tr>
                            <th>数量</th>
                            <th>品种</th>
                            <th>价格</th>
                        </tr>
                    </thead>
                    <tbody v-for="(item,index) in baskets" :key="index">
                        <tr>
                            <td>
                                <button @click="decreaseQuantity(item)" class="btn btn-sm btn-default">-</button>
                                <span>{{item.quantity}}</span>
                                <button @click="increaseQuantity(item)" class="btn btn-sm btn-default">+</button>
                            </td>
                            <td>{{item.name}}{{item.size}}</td>
                            <td>{{item.quantity * item.price}}</td>
                        </tr>
                    </tbody>
                    <!-- {{baskets}} -->
                </table>
                
                <p>总价：{{total + "RMB"}}</p>
                <button class="btn btn-success btn-block">提交</button>
            </div>
           <div v-else>
               <p>{{basketText}}</p>
           </div>
        </div>
    </div>
</template>

<script>
import axios  from "axios"
export default {
    data(){
        return{
            baskets:[],
            basketText:"购物车没有任何商品",
            // getMenuItem:{}
        }
    },
    computed:{
        getMenuItem(){
            // 在vuex获取数据
            // return this.$store.state.menuItems
            // 通过getters获取数据
            return this.$store.getters.getMenuItems
        },
        total(){
            let totalCost =0

            for(let index in this.baskets){
                let individualItem = this.baskets[index]
                totalCost += individualItem.quantity * individualItem.price
            }
            return totalCost;
        }
    },
    created(){
        this.fetchData();
    },
    methods:{
        fetchData(){
            // fetch("https://wd6476367811srrfgf.wilddogio.com/menu.json")
            // .then(res => {
            //     return res.json()
            // })
            // .then(data =>{
            //     this.getMenuItem = data;
            // })
            // axios.get('menu.json').then(res => this.getMenuItem = res.data);

            // this.http.get("menu.json").then(res => this.getMenuItem = res.data)
            // 将请求下来的数据存储在vuex中
            this.http.get("/menu")
                .then(res => {
                    


                    console.log("data=",res.data);

                    var dataArr =[];
                    for(var i=0;i<res.data.length;i++){
                        
                        dataArr[i] = {
                            'name':res.data[i].name,
                            'description':res.data[i].description,
                            'options':[{
                                'size':res.data[i].size_one,
                                'price':res.data[i].price_one,
                            },{
                                'size':res.data[i].size_two,
                                'price':res.data[i].price_two,
                            }]
                        }
                    }

                    console.log("dataArr=",dataArr);
                    this.$store.commit("setMenuItems",dataArr)
                 })
        },
        addToBasket(item,option){
            let basket = {
                name:item.name,
                size:option.size,
                price:option.price,
                quantity:1,
            }
            let result = this.baskets.filter((basket)=>{
                return basket.name === item.name && basket.price === option.price && basket.size===option.size
            })
            if(this.baskets.length>0){
                if(result!=null && result.length>0){
                    result[0].quantity++
                }else{
                    this.baskets.push(basket)
                }
            }else{
                this.baskets.push(basket)
            }
            
        },
        decreaseQuantity(item){
            item.quantity--
            if(item.quantity < 1){
                this.removeFromBasket(item);
            }
        },
        increaseQuantity(item){
            item.quantity++;
        },
        removeFromBasket(item){
            this.baskets.splice(this.baskets.indexOf(item),1)
        }
    },
}
</script>
