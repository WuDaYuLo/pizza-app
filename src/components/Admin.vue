<template>
    <div class="row">
        <div class="col-sm-12 col-md-8">
            <!-- mew pizza -->
            <app-new-pizza></app-new-pizza>
        </div>
        <div class="col-sm-12 col-md-4">
            <!-- 品种展示 -->
            <h3 class="text-muted my-5">菜单</h3>
            <table class="table">
                <thead class="table table-default">
                    <tr>
                        <th>品种</th>
                        <th>删除</th>
                    </tr>
                </thead>
                <tbody v-for="(item,index) in getMenuItem" :key="index">
                    <tr>
                        <td>{{item.name}}</td>
                        <td>
                            <button @click="deleteData(item)" class="btn btn-sm btn-outline-danger">&times</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NewPizza from './NewPizza'
export default {
    data(){
        return{
            // getMenuItem:[]
        }
    },
    computed:{
         getMenuItem:{
             get(){              
                //  return this.$store.state.menuItems

                // 通过getters获取数据
                return this.$store.getters.getMenuItems
             },
             set(){

             }
        },
    },
    created(){
        fetch("https://wd6476367811srrfgf.wilddogio.com/menu.json")
        .then(res => {
            return res.json()
        })
        .then(data => {
            let menuItemArray =[];
            for(var key in data){
                // console.log(data[key])
                data[key].id = key;
                menuItemArray.push(data[key]);
            }

            // this.getMenuItem = menuItemArray;

            // 数据同步
            this.$store.commit("setMenuItems",menuItemArray)
        })
    },
    methods:{
        deleteData(item){
            fetch("https://wd6476367811srrfgf.wilddogio.com/menu/"+ item.id +"/.json",{
                method:"DELETE",
                headers:{
                    'Content-type':"application/json"
                }
            })
            .then(res => res.json())
            // .then(data =>this.$router.push({name:"menuLink"}))
            .then(data =>{
                this.$store.commit("removeMenuItems",item)
            })
            // .then(data => console.log(data))
            .catch(err => console.log(err))
        }
    },
    components:{
        "app-new-pizza":NewPizza
    }
    // beforeRouteEnter:(to,from,next)=>{
    //     // alert('hello '+this.name);
    //     next(vm=>{
    //         alert(vm.name);
    //     })
    // }

    // beforeRouteLeave:(to,from,next)=>{
    //     if(confirm("确定要离开吗？")){
    //         next();
    //     }else{
    //         next(false);
    //     }
    // }
}
</script>
