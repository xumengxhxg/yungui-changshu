<!-- 我的待办 -->
<template>
  <div class="login">
    <div>
      <div class="title">
        物联网智能云柜管理平台
        <i>Undetained&nbsp;&nbsp;&nbsp;Person&nbsp;&nbsp;&nbsp;Control&nbsp;&nbsp;&nbsp;System</i>
      </div>
      <div class="line"></div>
      <div class="circle"></div>
      <div class="icon"></div>
    </div>
    <div>
      <div class="box-r">
        <div class="login-title">用户登录</div>
        <form action="">
            <div class="login-account">
                <input type="text" id="policeNumber" name="policeNumber" placeholder="请输入账号"  v-model="account">
                <i>账号</i>
                <span><img src="../assets/images/account.png" alt=""></span>
            </div>
            <div class="login-pwd">
                <input type="password" id="password" name="password" placeholder="请输入密码" v-model="password">
                <i>密码</i>
                <span><img src="../assets/images/pwd.png" alt=""></span>
            </div>
            <!-- <div class="login-radio">
              <el-radio v-model="radio" label="1">前台系统</el-radio>
              <el-radio v-model="radio" label="2">后台系统</el-radio>
            </div> -->
        </form>
        <div class="login-btn">
          <button type="button" id="submit" @click="login">登&nbsp;&nbsp;&nbsp;录</button>
        </div>
      </div>
    </div>
    <div class="company">
        ©苏州展亚信息技术有限公司
    </div>
  </div>
</template>

<script>
import { login, getInfo } from '@/api/login'
export default {
  data () {
    return {
      account: '',
      password: '',
      // radio: '1'
    }
  },
  created() {
    localStorage.clear()
  },
  methods: {
    login() {
      // this.$router.push({name: 'indexHome'})
      // localStorage.setItem('page', 'back')
      // console.log(11111)
      if(!this.password || !this.account) {
        this.$message({
          message: '请输入用户名和密码',
          type: 'warning'
        })
        return
      }
      let data = {
        code: '',
        password: this.password,
        username: this.account,
        uuid: ''
      }
      login(data).then((res) => {
        if (res.code === 200) {
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          if (res.token) {
            localStorage.setItem('token', res.token)
            this.getInfo()
          }
          this.$router.push({name: 'caseManagement'})
          localStorage.setItem('page', 'back')
          
          // if (this.radio === '1') { // 前台
          //   this.$router.push({name: 'frontDesk'})
          //   localStorage.setItem('page', 'front')
          // } else { // 后台
          //   this.$router.push({name: 'indexHome'})
          //   localStorage.setItem('page', 'back')
          // }
        } else {
          if (res.msg == 'user.password.not.match:') {
            this.$message({
              message: '账号或密码不正确',
              type: 'warning'
            })
          } else {
            this.$message({
              message: 'error',
              type: 'warning'
            })
          }
          return false
        }
         
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    },
    getInfo() {
      getInfo().then((res) => {
        if (res.result) {
          // localStorage.setItem('userInfo', { userName: res.user.userName, userNo: res.user.userNo })
          localStorage.setItem('userName', res.user.userName)
          localStorage.setItem('dataPermits', JSON.stringify(res.user.dataPermits))
          localStorage.setItem('userNo', res.user.userNo)
          localStorage.setItem('deptNo', res.user.deptId)
          localStorage.setItem('userId', res.user.userId)
        } else {
          this.$message({
            message: res.message || res.msg,
            type: 'warning'
          })
        }
      }).catch((err) => {
        this.$message({
          message: err,
          type: 'warning'
        })
      })
    }
  }
}

</script>

<style scoped>
.login {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: url('../assets/images/login1.png') 100% 100%;
}
.title {
  width: 350px;
  height: 40px;
  font-size: 29px;
  color: #08CBD7;
  position: absolute;
  left: 121px;
  top: 149px;
  text-align: center;
  line-height: 40px;
}
.title i {
  width: 300px;
  height: 40px;
  display: block;
  font-style: normal;
  font-size: 13px;
  position: absolute;
  left: -7px;
  top: 27px;
  text-align: center;
  line-height: 40px;
  color: #00A5B8;
}
.line {
  width: 363px;
  height: 138px;
  background: url('../assets/images/line1.png');
  position: absolute;
  left: 150px;
  top: 209px;
}
.circle {
  width: 389px;
  height: 390px;
  background: url('../assets/images/circle1.png');
  border-radius: 50%;
  position: absolute;
  left: 460px;
  top: 250px;
  animation: rotate linear 8s infinite;
}
.icon {
  width: 180px;
  height: 183px;
  background: url('../assets/images/icon.png');
  position: absolute;
  left: 570px;
  top: 348px;
}
.box-r {
  background: url('../assets/images/login_box1.png');
  width: 447px;
  height: 470px;
  position: absolute;
  top: 50%;
  right: 108px;
  margin-top: -250px;
}
.login-title {
  width: 305px;
  height: 56px;
  position: absolute;
  top: 40px;
  left: 50%;
  margin-left: -150px;
  text-align: center;
  font-size: 27px;
  line-height: 56px;
  color: #08CBD7;
}
form {
  background-color: rgba(97,231,253,0.00);
  border-radius: 4px;
}
.login-account {
  width: 305px;
  height: 57px;
  position: absolute;
  top: 126px;
  left: 50%;
  margin-left: -150px;
  text-align: center;
  line-height: 56px;
  overflow: hidden;
  border: 1px solid #08CBD7;
  background: transparent;
  border-radius: 4px;
}
.login-account input {
  width: 305px;
  height: 54px;
  /* background: url('../assets/images/attr.png'); */
  background: transparent;
  padding-left: 60px;
  color: #fff;
  background-color: transparent;
  border: 0
}
.login-account span, .login-pwd span {
  position: absolute;
  top: 0;
  right: 20px;
}
.login-account span img, .login-pwd span img {
  border: none;
  vertical-align: middle;
}
.login-account i {
  font-style: normal;
  position: absolute;
  top: 0;
  left: 20px;
  color: #08CBD7;
}
.login-pwd {
  width: 305px;
  height: 57px;
  position: absolute;
  top: 221px;
  left: 50%;
  margin-left: -150px;
  text-align: center;
  line-height: 56px;
  overflow: hidden;
  border: 1px solid #08CBD7;
  border-radius: 4px;
}
.login-pwd input {
  width: 305px;
  height: 56px;
  /* background: url('../assets/images/attr.png'); */
  background: transparent;
  padding-left: 60px;
  color: #fff;
  border: 0;
}
.login-pwd i {
  font-style: normal;
  position: absolute;
  top: 0;
  left: 20px;
  color: #08CBD7;
}
.login-btn button {
  width: 296px;
  height: 47px;
  position: absolute;
  bottom: 97px;
  left: 50%;
  margin-left: -143px;
  text-align: center;
  line-height: 47px;
  background: url('../assets/images/login_btn.png');
  font-size: 18px;
  border: none;
  color: #fff;
  cursor: pointer;
}
.login-radio {
  position: absolute;
  top: 290px;
  left: 100px;
}
.company {
  width: 234px;
  height: 24px;
  color: #08CBD7;
  font-size: 14px;
  text-align: center;
  position: absolute;
  left: 50%;
  bottom: 10px;
  margin-left: -127px;
}
input:-internal-autofill-previewed,
input:-internal-autofill-selected {
    -webkit-text-fill-color: #FFFFFF !important;
    transition: background-color 5000s ease-in-out 0s !important;
    background-color: #08CBD7;
}
.el-radio {
  color: #08CBD7 !important;
}
</style>
  