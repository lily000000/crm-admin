<template>
  <div id="customercont">
    <!-- <p class="customertite">{{addTitile}}</p> -->
    <!-- <el-steps :active="active" finish-status="success"  style="margin-top: 20px">
      <el-step title="1家长信息"></el-step>
      <el-step title="2孩子信息"></el-step>
      <el-step title="3保存／保存并新增推课"></el-step>
    </el-steps> -->
    <div>
      <ul class="steps-item">
        <li>① 家长信息</li>
        <li>></li>
        <li>② 孩子信息</li>
        <li>></li>
        <li>③ 保存／保存并新增推课</li>
      </ul>
    </div>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="家长信息">
        <parents-from
          :options="options"
          :listByCodeData="listByCodeData"
          @onChange="onParentsChange"
          :readonly="readonly"
          :title="addTitile"
        ></parents-from>
      </el-tab-pane>
      <el-tab-pane label="学生信息">
        <students-from
          :readonly="readonly"
          :listByCodeData="listByCodeData"
          :title="addTitile"
          :options="options"
          @onChange="onstudentsChange"
        ></students-from>
      </el-tab-pane>
    </el-tabs>
    <div class="btn-save">
      <el-button type="primary" :disabled="readonly" @click="submitForm()">保存</el-button>
      <el-button type="primary" :disabled="readonly" @click="onSubmitClass()">保存并新增推课</el-button>
      <el-button @click="onRecall">取消</el-button>
    </div>
  </div>
</template>
<script>
import studentsFrom from "./components/studentsFrom";
import parentsFrom from "./components/parentsFrom.vue";
import { constants } from "crypto";
export default {
  components: {
    studentsFrom,
    parentsFrom,
  },
  data() {
    return {
      readonly: false,
      lessonToast:false,
      labelPosition: "right",
      addTitile: "新增客户",
      inputWrapList: [{}],
      active: 1,
      options: [],
      listByCodeData: [],
      flag: false,
      pFrome: {},
      cFrome: {},
      formWrapData: {},
      rules: {
        chatName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ]
      }
    };
  },

  mounted() {
    this.customerType();
    this.plistByCodeReq();
    this.sysAreaReq();
  },
  methods: {
    onstudentsChange(e) {
      this.cFrome = e;
    },
    onParentsChange(e) {
      this.pFrome = e;
    },
    handleClick(tab, event) {
      // console.log(tab.label)
      //if (this.active++ > 1) this.active = 1;
    },
    onSubmitClass() {
      this.lessonToast = true;
      
    },
    onRecall(){
      this.$router.push('/customer')
    },
    radioChange(e) {
      console.log(e);
    },
    customerType() {
      //1新增2编辑3查看
      if (this.$route.query.type == "1") {
        this.readonly = false;
        this.addTitile = "新增客户";
      } else if (this.$route.query.type == "2") {
        this.readonly = false;
        this.addTitile = "编辑客户";
      } else {
        this.readonly = true;
        this.addTitile = "查看信息";
      }
    },
    submitForm() {
      const address = this.pFrome.address[this.pFrome.address.length - 1] || "";
      const channel = this.pFrome.channel[this.pFrome.channel.length - 1] || "";
      const grade = this.cFrome.grade[this.cFrome.grade.length - 1] || "";
      const city = this.cFrome.city[this.cFrome.city.length - 1] || "";
      const params = Object.assign({}, this.pFrome, {
        address,
        channel,
        child: Object.assign({},this.cFrome,{grade:grade},{city:city})
      },);
      console.log(this.pFrome, params);
      if(this.pFrome.wechatId == ""){
        this.$message({
          message: '请输入微信号',
          type: 'warning'
        }); 
        return;
      }
      if(this.pFrome.channel == ""){
        this.$message({
          message: '请选择渠道号',
          type: 'warning'
        }); 
        return;
      }
      this.CustomeReq(params);
    },
    plistByCodeReq() {
      const params =
        "channel,familyRole,job,eduBackground,parentalNeeds,learnAttitude,childTutorAttitude,parentalEduLeavel,famEduType, econViability,investWillingness,econViability,class,parentalType";
      this.$API.listByCodeReq({ codes: params }).then(res => {   
        const { data, msg, status } = res;
        if(status == 200){
          this.listByCodeData = data;
          console.log('code字典',data)
        }else{
          this.$message.error(msg);
        }
      });
    },
    sysAreaReq() {
      this.$API.treeListReq({}).then(res => {
        const { data, msg, status } = res;
        if (status == 200) {
          this.options = data || [];
        }else{
          this.$message.error(msg);
        }
      });
    },
    CustomeReq(params) {
      this.$API.saveCustomeReq(params).then(res => {
        const { data, msg, status }= res;
        if (status == 200) {
        }else{
          this.$message.error(msg);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.form-item {
  display: flex;
  justify-content: flex-start;
}
.el-form-item__content {
  width: 200px;
}
.el-input--small .el-input__inner {
  width: 200px !important;
}
.warn {
  color: #f56c6c;
}
.customertite {
  color: #606266;
  margin-bottom: 10px;
}
.serial {
  margin-left: 30px;
}
.btn-save {
  width: 200px;
  display: flex;
  justify-content: space-around;
  margin: auto;
  margin-top: 10px;
}
.steps-item{
  display: flex;
  justify-content: space-between;
  line-height: 40px;
  width: 50%;
  margin: auto;
  li{
    line-height: 40px;
    font-size: 16px
  }
}
</style>
