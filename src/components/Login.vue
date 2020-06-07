<template>
    <div class="row mt-3">
        <div class="col-md-12 col-lg-12">
            <div class="card">
                <div class="card-body">
                    <img class="mx-auto d-block" src="../assets/icon.png" alt="">
                    <form @submit.prevent="onSubmit">
                        <div class="form-group">
                            <label for="email">邮箱</label>
                            <input type="email" class="form-control" v-model="email">   
                        </div>
                        <div class="form-group">
                            <label for="password">密码</label>
                            <input type="password" class="form-control" v-model="password">   
                        </div>
                    
                        <button type="submit" class="btn btn-block btn-success">登录</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            email:'',
            password:'',
        }
    },
    //组件内的守卫
    beforeRouteEnter:(to,from,next)=>{
        // this.$store.dispatch("setUser",null)
        next(vm=>{
            vm.$store.dispatch("setUser",null)
        })
    },
    methods:{
        onSubmit(){
            axios.get("/user.json").then(res=>{
                // console.log(res.data);
                const users=[];
                const data = res.data;
                for(let key in data){
                    const user = data[key];
                    // console.log(user);
                    users.push(user)
                }
                // console.log(users);

                let result = users.filter((user)=>{
                    return user.password === this.password && user.email===this.email
                });
                // console.log(result)
                if(result!=null && result.length>0){
                    this.$store.dispatch("setUser",result[0].email)
                    this.$router.push({name:"homeLink"})
                }else{
                    alert("账号或密码不正确！")
                    this.$store.dispatch("setUser",null)
                }
            })
        }
    }
}
</script>
